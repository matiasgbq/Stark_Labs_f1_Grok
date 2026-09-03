import {
  ACCEL,
  BARRIER,
  BOOST_SPEED,
  BRAKE,
  CAR_RADIUS,
  CHECKPOINTS,
  DRAG,
  MAX_SPEED,
  TOTAL_LAPS,
  TRACK_HALF,
  TURN_RATE,
} from "./constants";
import { readActions, setKeys } from "./input";
import { closest, CP_AT, place, sampleAt, TRACK_LENGTH, type Sample } from "./track";
import { chirpCountdown, finishFanfare, setEngine, thud } from "./audio";
import { useRace, type Phase } from "./store";

export type CarSim = {
  id: "player" | "max" | "oscar";
  name: string;
  color: string;
  x: number;
  z: number;
  yaw: number;
  vx: number;
  vz: number;
  speed: number;
  steer: number;
  throttle: number;
  progress: number;
  hint: number;
  lap: number;
  nextCp: number;
  finished: boolean;
  finishTime: number;
  lapStart: number;
  lastLap: number;
  bestLap: number;
  status: string;
  look: number;
  cornerBrake: number;
  top: number;
  aggression: number;
};

type World = {
  phase: Phase;
  time: number;
  countdown: number;
  countBeep: number;
  player: CarSim;
  max: CarSim;
  oscar: CarSim;
  trauma: number;
};

function car(
  id: CarSim["id"],
  name: string,
  color: string,
  progress: number,
  lat: number,
  extras: Partial<CarSim>,
): CarSim {
  const p = place(progress, lat);
  return {
    id,
    name,
    color,
    x: p.x,
    z: p.z,
    yaw: p.yaw,
    vx: 0,
    vz: 0,
    speed: 0,
    steer: 0,
    throttle: 0,
    progress,
    hint: 0,
    lap: 0,
    nextCp: 1,
    finished: false,
    finishTime: 0,
    lapStart: 0,
    lastLap: 0,
    bestLap: 0,
    status: "GRID",
    look: 0.035,
    cornerBrake: 0.55,
    top: 58,
    aggression: 1,
    ...extras,
  };
}

function wrapPi(a: number) {
  while (a > Math.PI) a -= Math.PI * 2;
  while (a < -Math.PI) a += Math.PI * 2;
  return a;
}

function makeWorld(): World {
  return {
    phase: "menu",
    time: 0,
    countdown: 3,
    countBeep: 4,
    trauma: 0,
    player: car("player", "Franco Colapinto", "#3db4ff", 0.0, -2.2, {
      look: 0.03,
      top: 64,
    }),
    max: car("max", "Max Verstappen", "#d32535", 0.016, 2.1, {
      look: 0.042,
      cornerBrake: 0.42,
      top: 61,
      aggression: 1.12,
      status: "CRUISE",
    }),
    oscar: car("oscar", "Oscar Piastri", "#ff7a1a", 0.008, -2.2, {
      look: 0.038,
      cornerBrake: 0.5,
      top: 59.5,
      aggression: 1.02,
      status: "CLEAN PACE",
    }),
  };
}

let world = makeWorld();
let hudAcc = 0;

export function getWorld() {
  return world;
}

export function resetWorld() {
  world = makeWorld();
  pushHud(true);
}

export function startGrid() {
  const qa = typeof location !== "undefined" && /(?:\?|&)qa=1(?:&|$)/.test(location.search);
  world.phase = qa ? "racing" : "countdown";
  world.countdown = qa ? 0 : 3;
  world.countBeep = 4;
  world.time = 0;
  world.player.lapStart = 0;
  world.max.lapStart = 0;
  world.oscar.lapStart = 0;
  useRace.getState().patch({ phase: world.phase, countdown: 3 });
}

export function setPhase(phase: Phase) {
  if (world.phase === "finish") return;
  world.phase = phase;
  useRace.getState().patch({ phase });
}

function integrate(c: CarSim, dt: number, steer: number, throttle: number, boost: boolean) {
  c.steer = steer;
  c.throttle = throttle;
  const reverse = c.speed >= 0 ? 1 : -1;
  const speedAbs = Math.abs(c.speed);
  const speedFactor = Math.min(1, Math.max(0.18, speedAbs / 14)) * (1.12 - 0.38 * Math.min(1, speedAbs / MAX_SPEED));
  c.yaw += steer * TURN_RATE * speedFactor * reverse * dt;

  const fx = -Math.sin(c.yaw);
  const fz = -Math.cos(c.yaw);
  const rx = Math.cos(c.yaw);
  const rz = -Math.sin(c.yaw);

  let fwd = c.vx * fx + c.vz * fz;
  let lat = c.vx * rx + c.vz * rz;
  const sliding = Math.abs(lat) > 4.2 || Math.abs(steer) > 0.75 && speedAbs > 28;
  const grip = sliding ? 3.2 : 9.5;
  lat *= Math.exp(-grip * dt);

  const cap = boost && throttle > 0.2 ? BOOST_SPEED : c.top;
  if (throttle > 0) fwd += throttle * ACCEL * dt;
  else if (throttle < 0) fwd += throttle * BRAKE * dt;
  else fwd *= Math.exp(-DRAG * 1.6 * dt);
  fwd *= Math.exp(-DRAG * dt);
  if (fwd > cap) fwd = cap;
  if (fwd < -12) fwd = -12;

  c.vx = fx * fwd + rx * lat;
  c.vz = fz * fwd + rz * lat;
  c.x += c.vx * dt;
  c.z += c.vz * dt;
  c.speed = fwd;

  const hit = closest(c.x, c.z, c.hint);
  c.hint = hit.index;
  const s = hit.sample;
  let lateral = hit.lat;
  const limit = TRACK_HALF - CAR_RADIUS * 0.35;
  c.progress = s.t;

  if (Math.abs(lateral) > limit) {
    const over = Math.abs(lateral) - limit;
    const grass = Math.min(1, over / 4);
    c.vx *= 1 - grass * 1.8 * dt;
    c.vz *= 1 - grass * 1.8 * dt;
    c.speed *= 1 - grass * 1.6 * dt;
    world.trauma = Math.max(world.trauma, 0.12 + grass * 0.25);
    if (c.id === "player") c.status = "OFF TRACK";
  } else if (c.id === "player" && c.status === "OFF TRACK") {
    c.status = "RACING";
  }

  const wall = BARRIER - CAR_RADIUS;
  if (Math.abs(lateral) > wall) {
    const sign = lateral > 0 ? 1 : -1;
    const push = Math.abs(lateral) - wall;
    c.x -= s.nx * sign * push;
    c.z -= s.nz * sign * push;
    const vn = c.vx * s.nx + c.vz * s.nz;
    c.vx -= s.nx * vn * 1.35;
    c.vz -= s.nz * vn * 1.35;
    c.speed *= 0.55;
    lateral = wall * sign;
    world.trauma = Math.max(world.trauma, 0.45);
    if (c.id === "player") thud();
  }

  gateCheck(c, s, world.time);
}

function gateCheck(c: CarSim, s: Sample, time: number) {
  if (c.finished) return;
  const cp = CP_AT[c.nextCp];
  const dist = Math.min(
    Math.abs(s.t - cp),
    1 - Math.abs(s.t - cp),
  );
  if (dist < 0.03) {
    if (c.nextCp === 0) {
      c.lap += 1;
      const lapTime = time - c.lapStart;
      if (c.lap > 0 && c.lapStart > 0) {
        c.lastLap = lapTime;
        if (c.bestLap === 0 || lapTime < c.bestLap) c.bestLap = lapTime;
      }
      c.lapStart = time;
      if (c.lap >= TOTAL_LAPS) {
        c.finished = true;
        c.finishTime = time;
        c.status = "FINISHED";
        c.speed *= 0.4;
      }
    }
    c.nextCp = (c.nextCp + 1) % CHECKPOINTS;
  }
}

function driveAi(c: CarSim, dt: number, playerProg: number) {
  if (c.finished) {
    integrate(c, dt, 0, -0.2, false);
    return;
  }
  const look = sampleAt((c.progress + c.look) % 1);
  const dx = look.x - c.x;
  const dz = look.z - c.z;
  const desired = Math.atan2(-dx, -dz);
  const err = wrapPi(desired - c.yaw);
  const steer = Math.max(-1, Math.min(1, err * 2.4 * c.aggression));
  const corner = Math.abs(steer);
  let throttle = 1 - corner * c.cornerBrake;
  const raceLead = wrapPiProg(c.progress - playerProg) + (c.lap - world.player.lap);
  if (raceLead > 0.18) throttle *= 0.9;
  if (raceLead < -0.12) throttle = Math.min(1, throttle + 0.12);
  if (c.speed < 8) throttle = 1;
  integrate(c, dt, steer, throttle, false);

  if (corner > 0.7 && c.speed > 30) c.status = c.id === "max" ? "MAX AGGRESSIVE" : "PRECISION ATTACK";
  else if (raceLead < -0.04) c.status = c.id === "max" ? "CHASE MODE" : "CLINICAL HUNT";
  else c.status = c.id === "max" ? "CRUISE" : "CLEAN PACE";
}

function wrapPiProg(a: number) {
  while (a > 0.5) a -= 1;
  while (a < -0.5) a += 1;
  return a;
}

function separate(a: CarSim, b: CarSim) {
  const dx = a.x - b.x;
  const dz = a.z - b.z;
  const d = Math.hypot(dx, dz);
  const min = CAR_RADIUS * 2.05;
  if (d < 0.001 || d >= min) return;
  const nx = dx / d;
  const nz = dz / d;
  const push = (min - d) * 0.5;
  a.x += nx * push;
  a.z += nz * push;
  b.x -= nx * push;
  b.z -= nz * push;
  const rel = (a.vx - b.vx) * nx + (a.vz - b.vz) * nz;
  if (rel < 0) {
    a.vx -= nx * rel * 0.5;
    a.vz -= nz * rel * 0.5;
    b.vx += nx * rel * 0.5;
    b.vz += nz * rel * 0.5;
  }
}

function raceOrder(): CarSim[] {
  const cars = [world.player, world.max, world.oscar];
  cars.sort((a, b) => {
    if (a.finished && b.finished) return a.finishTime - b.finishTime;
    if (a.finished) return -1;
    if (b.finished) return 1;
    const sa = a.lap + a.progress;
    const sb = b.lap + b.progress;
    return sb - sa;
  });
  return cars;
}

function gapMeters(a: CarSim, b: CarSim) {
  const da = (a.lap + a.progress) * TRACK_LENGTH;
  const db = (b.lap + b.progress) * TRACK_LENGTH;
  return db - da;
}

export function stepSim(dt: number) {
  if (world.phase === "menu" || world.phase === "paused" || world.phase === "finish") {
    setEngine(0, 0, false);
    return;
  }

  if (world.phase === "countdown") {
    world.countdown -= dt;
    const stage = Math.ceil(world.countdown);
    if (stage < world.countBeep && stage >= 0) {
      world.countBeep = stage;
      chirpCountdown(stage);
    }
    if (world.countdown <= 0) {
      world.phase = "racing";
      world.time = 0;
      world.player.status = "RACING";
      world.player.lapStart = 0;
      world.max.lapStart = 0;
      world.oscar.lapStart = 0;
    }
    pushHud(true);
    return;
  }

  world.time += dt;
  world.trauma = Math.max(0, world.trauma - dt * 1.8);

  const act = readActions();
  integrate(world.player, dt, act.steer, act.throttle, act.boost);
  if (act.boost && world.player.speed > 40) world.player.status = "OVERTAKE MODE";
  else if (world.player.status !== "OFF TRACK") world.player.status = "RACING";

  driveAi(world.max, dt, world.player.progress);
  driveAi(world.oscar, dt, world.player.progress);

  separate(world.player, world.max);
  separate(world.player, world.oscar);
  separate(world.max, world.oscar);

  setEngine(world.player.speed, act.throttle, true);

  if (world.player.finished && world.phase === "racing") {
    world.phase = "finish";
    finishFanfare();
    const order = raceOrder();
    useRace.getState().patch({
      phase: "finish",
      winner: order[0].name,
      results: order.map((c, i) => ({
        name: c.name,
        time: c.finished ? c.finishTime : world.time,
        place: i + 1,
        color: c.color,
      })),
    });
  }

  hudAcc += dt;
  if (hudAcc > 1 / 12) {
    hudAcc = 0;
    pushHud(false);
  }
}

function pushHud(force: boolean) {
  const order = raceOrder();
  const place = order.findIndex((c) => c.id === "player") + 1;
  const rivals = order
    .filter((c) => c.id !== "player")
    .map((c) => ({
      name: c.name,
      status: c.status,
      gap: gapMeters(world.player, c),
      place: order.findIndex((o) => o.id === c.id) + 1,
      color: c.color,
    }));
  useRace.getState().patch({
    phase: world.phase,
    countdown: Math.max(0, world.countdown),
    lap: Math.min(TOTAL_LAPS, world.player.lap + 1),
    time: world.time,
    lastLap: world.player.lastLap,
    bestLap: world.player.bestLap,
    speed: Math.abs(world.player.speed) * 4.55,
    place,
    status: world.player.status,
    rivals,
    winner: world.phase === "finish" ? useRace.getState().winner : "",
    results: world.phase === "finish" ? useRace.getState().results : [],
  });
}

export function attachControlsProbe() {
  const w = window as Window & {
    __controlsTest?: {
      getYaw: () => number;
      getSpeed: () => number;
      setKeys: (codes: string[]) => void;
    };
  };
  w.__controlsTest = {
    getYaw: () => world.player.yaw,
    getSpeed: () => world.player.speed,
    setKeys: (codes: string[]) => {
      if (world.phase === "menu") startGrid();
      if (world.phase === "countdown") {
        world.phase = "racing";
        world.countdown = 0;
      }
      setKeys(codes);
    },
  };
}

export { TRACK_LENGTH };
