import * as THREE from "three";
import { BARRIER, CHECKPOINTS, TRACK_HALF } from "./constants";

/** Closed circuit, start/finish heading world −Z. */
const CONTROL: [number, number][] = [
  [0, 70],
  [0, -40],
  [0, -170],
  [12, -250],
  [70, -295],
  [145, -290],
  [200, -245],
  [225, -175],
  [210, -115],
  [175, -85],
  [210, -45],
  [250, 10],
  [270, 90],
  [255, 165],
  [195, 205],
  [125, 210],
  [60, 180],
  [15, 135],
  [-30, 95],
  [-70, 40],
  [-85, -25],
  [-70, -85],
  [-30, -55],
  [-8, 10],
];

export type Sample = {
  x: number;
  z: number;
  tx: number;
  tz: number;
  nx: number;
  nz: number;
  dist: number;
  yaw: number;
  t: number;
};

function catmull(p0: number, p1: number, p2: number, p3: number, t: number) {
  const t2 = t * t;
  const t3 = t2 * t;
  return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
}

function buildSamples(stepsPerSeg = 22): Sample[] {
  const n = CONTROL.length;
  const raw: { x: number; z: number }[] = [];
  for (let i = 0; i < n; i++) {
    const p0 = CONTROL[(i - 1 + n) % n];
    const p1 = CONTROL[i];
    const p2 = CONTROL[(i + 1) % n];
    const p3 = CONTROL[(i + 2) % n];
    for (let s = 0; s < stepsPerSeg; s++) {
      const t = s / stepsPerSeg;
      raw.push({
        x: catmull(p0[0], p1[0], p2[0], p3[0], t),
        z: catmull(p0[1], p1[1], p2[1], p3[1], t),
      });
    }
  }
  const samples: Sample[] = [];
  let dist = 0;
  for (let i = 0; i < raw.length; i++) {
    const a = raw[i];
    const b = raw[(i + 1) % raw.length];
    const dx = b.x - a.x;
    const dz = b.z - a.z;
    const len = Math.hypot(dx, dz) || 1;
    const tx = dx / len;
    const tz = dz / len;
    const nx = tz;
    const nz = -tx;
    const yaw = Math.atan2(-tx, -tz);
    samples.push({ x: a.x, z: a.z, tx, tz, nx, nz, dist, yaw, t: 0 });
    dist += len;
  }
  const total = dist;
  for (const s of samples) s.t = s.dist / total;
  return samples;
}

export const SAMPLES = buildSamples();
export const TRACK_LENGTH = SAMPLES[SAMPLES.length - 1].dist + Math.hypot(
  SAMPLES[0].x - SAMPLES[SAMPLES.length - 1].x,
  SAMPLES[0].z - SAMPLES[SAMPLES.length - 1].z,
);

export function sampleAt(progress: number): Sample {
  const t = ((progress % 1) + 1) % 1;
  const d = t * TRACK_LENGTH;
  let lo = 0;
  let hi = SAMPLES.length - 1;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (SAMPLES[mid].dist <= d) lo = mid;
    else hi = mid - 1;
  }
  const a = SAMPLES[lo];
  const b = SAMPLES[(lo + 1) % SAMPLES.length];
  const span = (b.dist > a.dist ? b.dist - a.dist : TRACK_LENGTH - a.dist) || 1;
  const u = Math.max(0, Math.min(1, (d - a.dist) / span));
  const x = a.x + (b.x - a.x) * u;
  const z = a.z + (b.z - a.z) * u;
  let tx = a.tx + (b.tx - a.tx) * u;
  let tz = a.tz + (b.tz - a.tz) * u;
  const tl = Math.hypot(tx, tz) || 1;
  tx /= tl;
  tz /= tl;
  return {
    x,
    z,
    tx,
    tz,
    nx: tz,
    nz: -tx,
    dist: d,
    yaw: Math.atan2(-tx, -tz),
    t,
  };
}

export function closest(x: number, z: number, hint = 0): { sample: Sample; index: number; lat: number } {
  const n = SAMPLES.length;
  const start = Math.max(0, Math.min(n - 1, hint));
  let best = start;
  let bestD = Infinity;
  const window = 48;
  for (let k = -window; k <= window; k++) {
    const i = (start + k + n * 4) % n;
    const s = SAMPLES[i];
    const d = (s.x - x) * (s.x - x) + (s.z - z) * (s.z - z);
    if (d < bestD) {
      bestD = d;
      best = i;
    }
  }
  const s = SAMPLES[best];
  const lat = (x - s.x) * s.nx + (z - s.z) * s.nz;
  return { sample: s, index: best, lat };
}

export function place(progress: number, lateral: number) {
  const s = sampleAt(progress);
  return {
    x: s.x + s.nx * lateral,
    z: s.z + s.nz * lateral,
    yaw: s.yaw,
    sample: s,
  };
}

function ribbon(half: number, y: number, extra = 0): THREE.BufferGeometry {
  const n = SAMPLES.length;
  const pos: number[] = [];
  const nrm: number[] = [];
  const uv: number[] = [];
  const idx: number[] = [];
  for (let i = 0; i <= n; i++) {
    const s = SAMPLES[i % n];
    const w = half + extra;
    pos.push(s.x - s.nx * w, y, s.z - s.nz * w);
    pos.push(s.x + s.nx * w, y, s.z + s.nz * w);
    nrm.push(0, 1, 0, 0, 1, 0);
    const v = s.dist * 0.12;
    uv.push(0, v, 1, v);
  }
  for (let i = 0; i < n; i++) {
    const a = i * 2;
    idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("normal", new THREE.Float32BufferAttribute(nrm, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  return g;
}

export function makeAsphalt(): THREE.BufferGeometry {
  return ribbon(TRACK_HALF, 0.02);
}

export function makeRunoff(): THREE.BufferGeometry {
  return ribbon(TRACK_HALF + 7.5, 0.0);
}

export function makeCurbs(): THREE.BufferGeometry {
  const n = SAMPLES.length;
  const pos: number[] = [];
  const nrm: number[] = [];
  const col: number[] = [];
  const idx: number[] = [];
  const curbW = 0.55;
  let v = 0;
  const pushEdge = (sign: number) => {
    for (let i = 0; i <= n; i++) {
      const s = SAMPLES[i % n];
      const inner = TRACK_HALF - 0.08;
      const c0 = inner;
      const c1 = inner + curbW;
      const ox = s.nx * sign;
      const oz = s.nz * sign;
      pos.push(s.x + ox * c0, 0.035, s.z + oz * c0);
      pos.push(s.x + ox * c1, 0.05, s.z + oz * c1);
      nrm.push(0, 1, 0, 0, 1, 0);
      const stripe = Math.floor(s.dist / 2.4) % 2 === 0;
      const r = stripe ? 0.86 : 0.94;
      const g = stripe ? 0.12 : 0.94;
      const b = stripe ? 0.14 : 0.94;
      col.push(r, g, b, r, g, b);
    }
    const base = v;
    for (let i = 0; i < n; i++) {
      const a = base + i * 2;
      idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
    }
    v += (n + 1) * 2;
  };
  pushEdge(-1);
  pushEdge(1);
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("normal", new THREE.Float32BufferAttribute(nrm, 3));
  g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
  g.setIndex(idx);
  return g;
}

export function barrierPosts(): THREE.Matrix4[] {
  const mats: THREE.Matrix4[] = [];
  const dummy = new THREE.Object3D();
  for (let i = 0; i < SAMPLES.length; i += 3) {
    const s = SAMPLES[i];
    for (const sign of [-1, 1] as const) {
      dummy.position.set(s.x + s.nx * sign * BARRIER, 0.55, s.z + s.nz * sign * BARRIER);
      dummy.rotation.set(0, s.yaw, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      mats.push(dummy.matrix.clone());
    }
  }
  return mats;
}

export function scatterOutside(count: number, minR: number, maxR: number, seed = 1) {
  const pts: { x: number; z: number; y: number; rot: number; s: number }[] = [];
  let r = seed;
  const rand = () => {
    r = (r * 16807) % 2147483647;
    return (r - 1) / 2147483646;
  };
  for (let i = 0; i < count; i++) {
    const s = SAMPLES[Math.floor(rand() * SAMPLES.length)];
    const sign = rand() > 0.5 ? 1 : -1;
    const off = minR + rand() * (maxR - minR);
    pts.push({
      x: s.x + s.nx * sign * off,
      z: s.z + s.nz * sign * off,
      y: 0,
      rot: rand() * Math.PI * 2,
      s: 0.75 + rand() * 0.7,
    });
  }
  return pts;
}

export const CP_AT = Array.from({ length: CHECKPOINTS }, (_, i) => i / CHECKPOINTS);
