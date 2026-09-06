import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import test from "node:test";

// The browser resolves extensionless TS imports; let Node run the same track.
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (context.parentURL?.includes("/src/game/") && specifier.startsWith("./") && !specifier.endsWith(".ts")) {
      return nextResolve(`${specifier}.ts`, context);
    }
    return nextResolve(specifier, context);
  },
});

const { SAMPLES, TRACK_LENGTH, barrierPosts, scatterOutside } = await import("../src/game/track.ts");
const { TRACK_HALF, BARRIER } = await import("../src/game/constants.ts");
const center = SAMPLES.map(({ x, z }) => [x, z]);
const EPSILON = 1e-8;
const cross = (a, b, c) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);

function pointSegmentDistance(p, a, b) {
  const dx = b[0] - a[0];
  const dz = b[1] - a[1];
  const lengthSquared = dx * dx + dz * dz;
  const t = lengthSquared ? Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dz) / lengthSquared)) : 0;
  return Math.hypot(p[0] - a[0] - dx * t, p[1] - a[1] - dz * t);
}

function segmentDistance(a, b, c, d) {
  if (cross(a, b, c) * cross(a, b, d) < 0 && cross(c, d, a) * cross(c, d, b) < 0) return 0;
  return Math.min(pointSegmentDistance(a, c, d), pointSegmentDistance(b, c, d), pointSegmentDistance(c, a, b), pointSegmentDistance(d, a, b));
}

function assertSimpleLoop(points, label) {
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 2; j < points.length; j++) {
      if (i === 0 && j === points.length - 1) continue;
      assert.ok(segmentDistance(points[i], points[(i + 1) % points.length], points[j], points[(j + 1) % points.length]) > EPSILON, `${label}: segments ${i} and ${j} intersect`);
    }
  }
}

function centerDistance(p) {
  return Math.min(...center.map((a, i) => pointSegmentDistance(p, a, center[(i + 1) % center.length])));
}

function rectangle(x, z, halfWidth, halfLength, yaw = 0) {
  return [[-halfWidth, -halfLength], [halfWidth, -halfLength], [halfWidth, halfLength], [-halfWidth, halfLength]].map(([lx, lz]) => [x + lx * Math.cos(yaw) + lz * Math.sin(yaw), z - lx * Math.sin(yaw) + lz * Math.cos(yaw)]);
}

function assertFootprintClear(corners, label) {
  for (let i = 0; i < center.length; i++) {
    const a = center[i];
    const b = center[(i + 1) % center.length];
    const sides = corners.map((c, j) => cross(c, corners[(j + 1) % corners.length], a));
    assert.ok(!(sides.every((s) => s >= 0) || sides.every((s) => s <= 0)), `${label}: centerline is inside footprint`);
    for (let j = 0; j < corners.length; j++) {
      assert.ok(segmentDistance(a, b, corners[j], corners[(j + 1) % corners.length]) > TRACK_HALF, `${label}: footprint overlaps asphalt at segment ${i}`);
    }
  }
}

test("the centerline and both asphalt/barrier edges form simple closed loops", () => {
  assertSimpleLoop(center, "centerline");
  for (const offset of [-TRACK_HALF, TRACK_HALF, -BARRIER, BARRIER]) {
    assertSimpleLoop(SAMPLES.map((s) => [s.x + s.nx * offset, s.z + s.nz * offset]), `offset ${offset}`);
  }
});

test("the full-width road stays regular through every corner and the finish seam", () => {
  for (let i = 0; i < SAMPLES.length; i++) {
    const a = SAMPLES[i];
    const b = SAMPLES[(i + 1) % SAMPLES.length];
    const step = Math.hypot(b.x - a.x, b.z - a.z);
    assert.ok(step > EPSILON, `zero-length segment ${i}`);
    assert.ok(Math.abs(Math.hypot(a.nx, a.nz) - 1) < EPSILON, `non-unit normal ${i}`);
    assert.ok(Math.abs(a.tx * a.nx + a.tz * a.nz) < EPSILON, `non-perpendicular normal ${i}`);
    const angle = Math.acos(Math.max(-1, Math.min(1, a.tx * b.tx + a.tz * b.tz)));
    assert.ok(angle < Math.PI / 2, `cusp at segment ${i}`);
    if (angle > EPSILON) {
      const next = SAMPLES[(i + 2) % SAMPLES.length];
      const nextStep = Math.hypot(next.x - b.x, next.z - b.z);
      assert.ok((step + nextStep) / (2 * angle) > BARRIER, `corner ${i} is tighter than the barrier offset`);
    }
  }
  assert.deepEqual(center[0], [0, 70]);
  assert.ok(SAMPLES[0].tz < -0.99, "start points down the original straight");
  assert.ok(TRACK_LENGTH > 1000, "the circuit remains a full-size lap");
});

test("trees keep their entire canopy outside every section of asphalt", () => {
  for (const seed of [1, 3, 42, 2026]) {
    const trees = scatterOutside(42, 18, 34, seed);
    assert.equal(trees.length, 42, `seed ${seed} fills the scene`);
    assert.deepEqual(trees, scatterOutside(42, 18, 34, seed), "placement stays deterministic");
    for (const [i, tree] of trees.entries()) {
      assert.ok(centerDistance([tree.x, tree.z]) > TRACK_HALF + 1.4 * tree.s, `seed ${seed}, tree ${i} canopy overlaps asphalt`);
    }
  }
});

test("the existing grandstands and finish gantry supports clear the road", () => {
  // Actual ground footprints in World.tsx; the overhead beam remains above cars.
  assertFootprintClear(rectangle(18, 20, 3, 24), "right grandstand");
  assertFootprintClear(rectangle(-18, 8, 2.75, 18, 0.08), "left grandstand");
  for (const x of [-8.5, 8.5]) assertFootprintClear(rectangle(x, 72, 0.225, 0.225), `gantry support ${x}`);
});

test("barrier post footprints do not protrude onto another part of the road", () => {
  for (const [i, matrix] of barrierPosts().entries()) {
    // World.tsx uses a 0.18 × 1.1 × 1.4 box for each post.
    const m = matrix.elements;
    const footprint = [[-0.09, -0.7], [0.09, -0.7], [0.09, 0.7], [-0.09, 0.7]].map(([x, z]) => [m[0] * x + m[8] * z + m[12], m[2] * x + m[10] * z + m[14]]);
    assertFootprintClear(footprint, `barrier post ${i}`);
  }
});

test("the player can drive two complete circuits with both rivals present", async () => {
  const { getWorld, resetWorld, startGrid, stepSim } = await import("../src/game/sim.ts");
  const { sampleAt } = await import("../src/game/track.ts");
  const { setTouchSteer, setTouchThrottle } = await import("../src/game/input.ts");
  resetWorld();
  startGrid();
  let covered = 0;
  let previous = 0;
  try {
    // Drive through production inputs/physics, never teleport or edit progress.
    for (let frame = 0; frame < 18000 && covered < 2.02; frame++) {
      const car = getWorld().player;
      const target = sampleAt(car.progress + 12 / TRACK_LENGTH);
      const error = Math.atan2(-(target.x - car.x), -(target.z - car.z)) - car.yaw;
      setTouchSteer(Math.max(-1, Math.min(1, Math.atan2(Math.sin(error), Math.cos(error)) * 2.5)));
      setTouchThrottle(car.speed < 22 ? 1 : 0);
      stepSim(1 / 60);
      let delta = car.progress - previous;
      if (delta < -0.5) delta += 1;
      if (delta > 0.5) delta -= 1;
      covered += delta;
      previous = car.progress;
      assert.ok(centerDistance([car.x, car.z]) < TRACK_HALF - 0.95, "player must stay inside the asphalt");
    }
    assert.ok(covered >= 2.02, `completed only ${covered.toFixed(2)} circuits`);
    assert.equal(getWorld().player.lap, 2);
    for (const id of ["max", "oscar"]) {
      const rival = getWorld()[id];
      assert.equal(rival.id, id);
      assert.ok(Number.isFinite(rival.x) && Number.isFinite(rival.z));
    }
  } finally {
    setTouchSteer(0);
    setTouchThrottle(0);
    resetWorld();
  }
});
