import { i as __toESM } from "../_runtime.mjs";
import { a as BoxGeometry, c as CylinderGeometry, d as MeshStandardMaterial, f as Object3D, g as require_react, h as require_jsx_runtime, l as Float32BufferAttribute, n as useFrame, o as BufferGeometry, p as Vector3, r as useThree, s as ConeGeometry, t as Canvas, u as MathUtils } from "../_libs/@react-three/fiber+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BPlNL6G9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-medium tracking-wide transition-transform duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alpine/70 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98]", {
	variants: {
		variant: {
			primary: "bg-fg text-asphalt hover:bg-paper shadow-[0_1px_0_rgba(255,255,255,0.12)]",
			alpine: "bg-alpine text-asphalt hover:bg-alpine/90",
			ghost: "bg-transparent text-fg border border-border hover:bg-elevated"
		},
		size: {
			md: "h-11 px-5 text-sm rounded-[var(--radius-sm)]",
			lg: "h-12 px-6 text-base rounded-[var(--radius-md)]"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "lg"
	}
});
function Button({ className, variant, size, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
var ctx = null;
var master = null;
var sfx = null;
var engineOsc = null;
var engineGain = null;
var engineFilter = null;
function graph() {
	if (!ctx || !master) return null;
	return {
		ctx,
		master,
		sfx
	};
}
function unlockAudio() {
	if (!ctx) {
		ctx = new (window.AudioContext || window.webkitAudioContext)({ latencyHint: "interactive" });
		master = ctx.createGain();
		master.gain.value = .55;
		master.connect(ctx.destination);
		sfx = ctx.createGain();
		sfx.gain.value = .8;
		sfx.connect(master);
	}
	if (ctx.state === "suspended") ctx.resume();
	if (!engineOsc && ctx && master) {
		engineOsc = ctx.createOscillator();
		engineOsc.type = "sawtooth";
		engineOsc.frequency.value = 40;
		engineFilter = ctx.createBiquadFilter();
		engineFilter.type = "lowpass";
		engineFilter.frequency.value = 420;
		engineGain = ctx.createGain();
		engineGain.gain.value = 0;
		engineOsc.connect(engineFilter);
		engineFilter.connect(engineGain);
		engineGain.connect(master);
		engineOsc.start();
	}
}
function setEngine(speed, throttle, racing) {
	if (!ctx || !engineOsc || !engineGain || !engineFilter) return;
	const t = ctx.currentTime;
	if (!racing) {
		engineGain.gain.setTargetAtTime(0, t, .08);
		return;
	}
	const abs = Math.abs(speed);
	const freq = 48 + abs * 4.4 + Math.max(0, throttle) * 18;
	engineOsc.frequency.setTargetAtTime(freq, t, .05);
	engineFilter.frequency.setTargetAtTime(280 + abs * 8, t, .08);
	const vol = .012 + Math.min(.07, abs * .0011) + Math.max(0, throttle) * .02;
	engineGain.gain.setTargetAtTime(vol, t, .06);
}
function beep(freq, dur, vol = .12, type = "square") {
	const g = graph();
	if (!g) return;
	const o = g.ctx.createOscillator();
	const gain = g.ctx.createGain();
	o.type = type;
	o.frequency.value = freq;
	gain.gain.setValueAtTime(vol, g.ctx.currentTime);
	gain.gain.exponentialRampToValueAtTime(1e-4, g.ctx.currentTime + dur);
	o.connect(gain);
	gain.connect(g.sfx);
	o.start();
	o.stop(g.ctx.currentTime + dur);
}
function chirpCountdown(stage) {
	beep(stage <= 0 ? 880 : 420, stage <= 0 ? .28 : .12, .14, "square");
}
function thud() {
	beep(90, .16, .18, "sine");
}
function finishFanfare() {
	beep(523, .18, .1);
	setTimeout(() => beep(659, .18, .1), 90);
	setTimeout(() => beep(784, .4, .12), 180);
}
var TRACK_HALF = 7.6;
var BARRIER = 9.15;
var CAR_RADIUS = .95;
var DRAG = .55;
var TURN_RATE = 1.55;
var FIXED_DT = 1 / 60;
var LIVERIES = {
	alpine: {
		body: "#1390e8",
		accent: "#ff6b9d",
		dark: "#0c1520",
		number: "43",
		label: "Franco Colapinto",
		team: "Alpine"
	},
	navy: {
		body: "#1b2458",
		accent: "#d32535",
		dark: "#07090f",
		number: "1",
		label: "Max Verstappen",
		team: "Navy Bull"
	},
	papaya: {
		body: "#ff7a1a",
		accent: "#1a120c",
		dark: "#1a120c",
		number: "81",
		label: "Oscar Piastri",
		team: "Papaya"
	}
};
/** Closed circuit, start/finish heading world −Z. */
var CONTROL = [
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
	[-8, 10]
];
function catmull(p0, p1, p2, p3, t) {
	const t2 = t * t;
	const t3 = t2 * t;
	return .5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
}
function buildSamples(stepsPerSeg = 22) {
	const n = CONTROL.length;
	const raw = [];
	for (let i = 0; i < n; i++) {
		const p0 = CONTROL[(i - 1 + n) % n];
		const p1 = CONTROL[i];
		const p2 = CONTROL[(i + 1) % n];
		const p3 = CONTROL[(i + 2) % n];
		for (let s = 0; s < stepsPerSeg; s++) {
			const t = s / stepsPerSeg;
			raw.push({
				x: catmull(p0[0], p1[0], p2[0], p3[0], t),
				z: catmull(p0[1], p1[1], p2[1], p3[1], t)
			});
		}
	}
	const samples = [];
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
		samples.push({
			x: a.x,
			z: a.z,
			tx,
			tz,
			nx,
			nz,
			dist,
			yaw,
			t: 0
		});
		dist += len;
	}
	const total = dist;
	for (const s of samples) s.t = s.dist / total;
	return samples;
}
var SAMPLES = buildSamples();
var TRACK_LENGTH = SAMPLES[SAMPLES.length - 1].dist + Math.hypot(SAMPLES[0].x - SAMPLES[SAMPLES.length - 1].x, SAMPLES[0].z - SAMPLES[SAMPLES.length - 1].z);
function sampleAt(progress) {
	const t = (progress % 1 + 1) % 1;
	const d = t * TRACK_LENGTH;
	let lo = 0;
	let hi = SAMPLES.length - 1;
	while (lo < hi) {
		const mid = lo + hi + 1 >> 1;
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
		t
	};
}
function closest(x, z, hint = 0) {
	const n = SAMPLES.length;
	const start = Math.max(0, Math.min(n - 1, hint));
	let best = start;
	let bestD = Infinity;
	const window = 48;
	for (let k = -48; k <= window; k++) {
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
	return {
		sample: s,
		index: best,
		lat
	};
}
function place(progress, lateral) {
	const s = sampleAt(progress);
	return {
		x: s.x + s.nx * lateral,
		z: s.z + s.nz * lateral,
		yaw: s.yaw,
		sample: s
	};
}
function ribbon(half, y, extra = 0) {
	const n = SAMPLES.length;
	const pos = [];
	const nrm = [];
	const uv = [];
	const idx = [];
	for (let i = 0; i <= n; i++) {
		const s = SAMPLES[i % n];
		const w = half + extra;
		pos.push(s.x - s.nx * w, y, s.z - s.nz * w);
		pos.push(s.x + s.nx * w, y, s.z + s.nz * w);
		nrm.push(0, 1, 0, 0, 1, 0);
		const v = s.dist * .12;
		uv.push(0, v, 1, v);
	}
	for (let i = 0; i < n; i++) {
		const a = i * 2;
		idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
	}
	const g = new BufferGeometry();
	g.setAttribute("position", new Float32BufferAttribute(pos, 3));
	g.setAttribute("normal", new Float32BufferAttribute(nrm, 3));
	g.setAttribute("uv", new Float32BufferAttribute(uv, 2));
	g.setIndex(idx);
	return g;
}
function makeAsphalt() {
	return ribbon(TRACK_HALF, .02);
}
function makeRunoff() {
	return ribbon(TRACK_HALF + 7.5, 0);
}
function makeCurbs() {
	const n = SAMPLES.length;
	const pos = [];
	const nrm = [];
	const col = [];
	const idx = [];
	const curbW = .55;
	let v = 0;
	const pushEdge = (sign) => {
		for (let i = 0; i <= n; i++) {
			const s = SAMPLES[i % n];
			const inner = TRACK_HALF - .08;
			const c0 = inner;
			const c1 = inner + curbW;
			const ox = s.nx * sign;
			const oz = s.nz * sign;
			pos.push(s.x + ox * c0, .035, s.z + oz * c0);
			pos.push(s.x + ox * c1, .05, s.z + oz * c1);
			nrm.push(0, 1, 0, 0, 1, 0);
			const stripe = Math.floor(s.dist / 2.4) % 2 === 0;
			const r = stripe ? .86 : .94;
			const g = stripe ? .12 : .94;
			const b = stripe ? .14 : .94;
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
	const g = new BufferGeometry();
	g.setAttribute("position", new Float32BufferAttribute(pos, 3));
	g.setAttribute("normal", new Float32BufferAttribute(nrm, 3));
	g.setAttribute("color", new Float32BufferAttribute(col, 3));
	g.setIndex(idx);
	return g;
}
function barrierPosts() {
	const mats = [];
	const dummy = new Object3D();
	for (let i = 0; i < SAMPLES.length; i += 3) {
		const s = SAMPLES[i];
		for (const sign of [-1, 1]) {
			dummy.position.set(s.x + s.nx * sign * BARRIER, .55, s.z + s.nz * sign * BARRIER);
			dummy.rotation.set(0, s.yaw, 0);
			dummy.scale.set(1, 1, 1);
			dummy.updateMatrix();
			mats.push(dummy.matrix.clone());
		}
	}
	return mats;
}
function scatterOutside(count, minR, maxR, seed = 1) {
	const pts = [];
	let r = seed;
	const rand = () => {
		r = r * 16807 % 2147483647;
		return (r - 1) / 2147483646;
	};
	for (let i = 0; i < count; i++) {
		const s = SAMPLES[Math.floor(rand() * SAMPLES.length)];
		const sign = rand() > .5 ? 1 : -1;
		const off = minR + rand() * (maxR - minR);
		pts.push({
			x: s.x + s.nx * sign * off,
			z: s.z + s.nz * sign * off,
			y: 0,
			rot: rand() * Math.PI * 2,
			s: .75 + rand() * .7
		});
	}
	return pts;
}
var CP_AT = Array.from({ length: 12 }, (_, i) => i / 12);
var held = /* @__PURE__ */ new Set();
var override = null;
var touchSteer = 0;
var touchThrottle = 0;
var GAME_KEYS = /* @__PURE__ */ new Set([
	"KeyW",
	"KeyA",
	"KeyS",
	"KeyD",
	"ArrowUp",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight",
	"ShiftLeft",
	"ShiftRight",
	"Space",
	"Escape"
]);
function onKeyDown(e) {
	if (GAME_KEYS.has(e.code)) e.preventDefault();
	held.add(e.code);
}
function onKeyUp(e) {
	held.delete(e.code);
}
function clear() {
	held.clear();
	touchSteer = 0;
	touchThrottle = 0;
}
function mountInput() {
	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);
	window.addEventListener("blur", clear);
	document.addEventListener("visibilitychange", () => {
		if (document.hidden) clear();
	});
	return () => {
		window.removeEventListener("keydown", onKeyDown);
		window.removeEventListener("keyup", onKeyUp);
		window.removeEventListener("blur", clear);
	};
}
function setKeys(codes) {
	override = codes.length ? new Set(codes) : null;
}
function setTouchSteer(v) {
	touchSteer = Math.max(-1, Math.min(1, v));
}
function setTouchThrottle(v) {
	touchThrottle = Math.max(-1, Math.min(1, v));
}
function readActions() {
	const k = override ?? held;
	let steer = override ? 0 : touchSteer;
	let throttle = override ? 0 : touchThrottle;
	if (k.has("KeyA") || k.has("ArrowLeft")) steer += 1;
	if (k.has("KeyD") || k.has("ArrowRight")) steer -= 1;
	if (k.has("KeyW") || k.has("ArrowUp")) throttle += 1;
	if (k.has("KeyS") || k.has("ArrowDown")) throttle -= 1;
	const boost = k.has("ShiftLeft") || k.has("ShiftRight") || k.has("Space");
	return {
		steer: Math.max(-1, Math.min(1, steer)),
		throttle: Math.max(-1, Math.min(1, throttle)),
		boost
	};
}
var empty = {
	phase: "menu",
	countdown: 3,
	lap: 1,
	totalLaps: 3,
	time: 0,
	lastLap: 0,
	bestLap: 0,
	speed: 0,
	place: 3,
	status: "GRID",
	rivals: [],
	winner: "",
	results: []
};
var useRace = create((set) => ({
	...empty,
	patch: (p) => set(p)
}));
function car(id, name, color, progress, lat, extras) {
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
		look: .035,
		cornerBrake: .55,
		top: 58,
		aggression: 1,
		...extras
	};
}
function wrapPi(a) {
	while (a > Math.PI) a -= Math.PI * 2;
	while (a < -Math.PI) a += Math.PI * 2;
	return a;
}
function makeWorld() {
	return {
		phase: "menu",
		time: 0,
		countdown: 3,
		countBeep: 4,
		trauma: 0,
		player: car("player", "Franco Colapinto", "#3db4ff", 0, -2.2, {
			look: .03,
			top: 64
		}),
		max: car("max", "Max Verstappen", "#d32535", .016, 2.1, {
			look: .042,
			cornerBrake: .42,
			top: 61,
			aggression: 1.12,
			status: "CRUISE"
		}),
		oscar: car("oscar", "Oscar Piastri", "#ff7a1a", .008, -2.2, {
			look: .038,
			cornerBrake: .5,
			top: 59.5,
			aggression: 1.02,
			status: "CLEAN PACE"
		})
	};
}
var world = makeWorld();
var hudAcc = 0;
function getWorld() {
	return world;
}
function resetWorld() {
	world = makeWorld();
	pushHud(true);
}
function startGrid() {
	const qa = typeof location !== "undefined" && /(?:\?|&)qa=1(?:&|$)/.test(location.search);
	world.phase = qa ? "racing" : "countdown";
	world.countdown = qa ? 0 : 3;
	world.countBeep = 4;
	world.time = 0;
	world.player.lapStart = 0;
	world.max.lapStart = 0;
	world.oscar.lapStart = 0;
	useRace.getState().patch({
		phase: world.phase,
		countdown: 3
	});
}
function setPhase(phase) {
	if (world.phase === "finish") return;
	world.phase = phase;
	useRace.getState().patch({ phase });
}
function integrate(c, dt, steer, throttle, boost) {
	c.steer = steer;
	c.throttle = throttle;
	const reverse = c.speed >= 0 ? 1 : -1;
	const speedAbs = Math.abs(c.speed);
	const speedFactor = Math.min(1, Math.max(.18, speedAbs / 14)) * (1.12 - .38 * Math.min(1, speedAbs / 64));
	c.yaw += steer * TURN_RATE * speedFactor * reverse * dt;
	const fx = -Math.sin(c.yaw);
	const fz = -Math.cos(c.yaw);
	const rx = Math.cos(c.yaw);
	const rz = -Math.sin(c.yaw);
	let fwd = c.vx * fx + c.vz * fz;
	let lat = c.vx * rx + c.vz * rz;
	lat *= Math.exp(-(Math.abs(lat) > 4.2 || Math.abs(steer) > .75 && speedAbs > 28 ? 3.2 : 9.5) * dt);
	const cap = boost && throttle > .2 ? 74 : c.top;
	if (throttle > 0) fwd += throttle * 32 * dt;
	else if (throttle < 0) fwd += throttle * 48 * dt;
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
	const limit = TRACK_HALF - CAR_RADIUS * .35;
	c.progress = s.t;
	if (Math.abs(lateral) > limit) {
		const over = Math.abs(lateral) - limit;
		const grass = Math.min(1, over / 4);
		c.vx *= 1 - grass * 1.8 * dt;
		c.vz *= 1 - grass * 1.8 * dt;
		c.speed *= 1 - grass * 1.6 * dt;
		world.trauma = Math.max(world.trauma, .12 + grass * .25);
		if (c.id === "player") c.status = "OFF TRACK";
	} else if (c.id === "player" && c.status === "OFF TRACK") c.status = "RACING";
	const wall = BARRIER - CAR_RADIUS;
	if (Math.abs(lateral) > wall) {
		const sign = lateral > 0 ? 1 : -1;
		const push = Math.abs(lateral) - wall;
		c.x -= s.nx * sign * push;
		c.z -= s.nz * sign * push;
		const vn = c.vx * s.nx + c.vz * s.nz;
		c.vx -= s.nx * vn * 1.35;
		c.vz -= s.nz * vn * 1.35;
		c.speed *= .55;
		lateral = wall * sign;
		world.trauma = Math.max(world.trauma, .45);
		if (c.id === "player") thud();
	}
	gateCheck(c, s, world.time);
}
function gateCheck(c, s, time) {
	if (c.finished) return;
	const cp = CP_AT[c.nextCp];
	if (Math.min(Math.abs(s.t - cp), 1 - Math.abs(s.t - cp)) < .03) {
		if (c.nextCp === 0) {
			c.lap += 1;
			const lapTime = time - c.lapStart;
			if (c.lap > 0 && c.lapStart > 0) {
				c.lastLap = lapTime;
				if (c.bestLap === 0 || lapTime < c.bestLap) c.bestLap = lapTime;
			}
			c.lapStart = time;
			if (c.lap >= 3) {
				c.finished = true;
				c.finishTime = time;
				c.status = "FINISHED";
				c.speed *= .4;
			}
		}
		c.nextCp = (c.nextCp + 1) % 12;
	}
}
function driveAi(c, dt, playerProg) {
	if (c.finished) {
		integrate(c, dt, 0, -.2, false);
		return;
	}
	const look = sampleAt((c.progress + c.look) % 1);
	const dx = look.x - c.x;
	const dz = look.z - c.z;
	const err = wrapPi(Math.atan2(-dx, -dz) - c.yaw);
	const steer = Math.max(-1, Math.min(1, err * 2.4 * c.aggression));
	const corner = Math.abs(steer);
	let throttle = 1 - corner * c.cornerBrake;
	const raceLead = wrapPiProg(c.progress - playerProg) + (c.lap - world.player.lap);
	if (raceLead > .18) throttle *= .9;
	if (raceLead < -.12) throttle = Math.min(1, throttle + .12);
	if (c.speed < 8) throttle = 1;
	integrate(c, dt, steer, throttle, false);
	if (corner > .7 && c.speed > 30) c.status = c.id === "max" ? "MAX AGGRESSIVE" : "PRECISION ATTACK";
	else if (raceLead < -.04) c.status = c.id === "max" ? "CHASE MODE" : "CLINICAL HUNT";
	else c.status = c.id === "max" ? "CRUISE" : "CLEAN PACE";
}
function wrapPiProg(a) {
	while (a > .5) a -= 1;
	while (a < -.5) a += 1;
	return a;
}
function separate(a, b) {
	const dx = a.x - b.x;
	const dz = a.z - b.z;
	const d = Math.hypot(dx, dz);
	const min = CAR_RADIUS * 2.05;
	if (d < .001 || d >= min) return;
	const nx = dx / d;
	const nz = dz / d;
	const push = (min - d) * .5;
	a.x += nx * push;
	a.z += nz * push;
	b.x -= nx * push;
	b.z -= nz * push;
	const rel = (a.vx - b.vx) * nx + (a.vz - b.vz) * nz;
	if (rel < 0) {
		a.vx -= nx * rel * .5;
		a.vz -= nz * rel * .5;
		b.vx += nx * rel * .5;
		b.vz += nz * rel * .5;
	}
}
function raceOrder() {
	const cars = [
		world.player,
		world.max,
		world.oscar
	];
	cars.sort((a, b) => {
		if (a.finished && b.finished) return a.finishTime - b.finishTime;
		if (a.finished) return -1;
		if (b.finished) return 1;
		const sa = a.lap + a.progress;
		return b.lap + b.progress - sa;
	});
	return cars;
}
function gapMeters(a, b) {
	const da = (a.lap + a.progress) * TRACK_LENGTH;
	return (b.lap + b.progress) * TRACK_LENGTH - da;
}
function stepSim(dt) {
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
				color: c.color
			}))
		});
	}
	hudAcc += dt;
	if (hudAcc > 1 / 12) {
		hudAcc = 0;
		pushHud(false);
	}
}
function pushHud(force) {
	const order = raceOrder();
	const place = order.findIndex((c) => c.id === "player") + 1;
	const rivals = order.filter((c) => c.id !== "player").map((c) => ({
		name: c.name,
		status: c.status,
		gap: gapMeters(world.player, c),
		place: order.findIndex((o) => o.id === c.id) + 1,
		color: c.color
	}));
	useRace.getState().patch({
		phase: world.phase,
		countdown: Math.max(0, world.countdown),
		lap: Math.min(3, world.player.lap + 1),
		time: world.time,
		lastLap: world.player.lastLap,
		bestLap: world.player.bestLap,
		speed: Math.abs(world.player.speed) * 4.55,
		place,
		status: world.player.status,
		rivals,
		winner: world.phase === "finish" ? useRace.getState().winner : "",
		results: world.phase === "finish" ? useRace.getState().results : []
	});
}
function attachControlsProbe() {
	const w = window;
	w.__controlsTest = {
		getYaw: () => world.player.yaw,
		getSpeed: () => world.player.speed,
		setKeys: (codes) => {
			if (world.phase === "menu") startGrid();
			if (world.phase === "countdown") {
				world.phase = "racing";
				world.countdown = 0;
			}
			setKeys(codes);
		}
	};
}
function fmt(t) {
	if (!t || !isFinite(t)) return "—";
	const m = Math.floor(t / 60);
	return `${m}:${(t - m * 60).toFixed(2).padStart(5, "0")}`;
}
function gapLabel(m) {
	if (Math.abs(m) < 2) return "WHEEL";
	return `${m > 0 ? "+" : "−"}${Math.abs(m).toFixed(0)} m`;
}
function Hud() {
	const phase = useRace((s) => s.phase);
	const lap = useRace((s) => s.lap);
	const time = useRace((s) => s.time);
	const bestLap = useRace((s) => s.bestLap);
	const speed = useRace((s) => s.speed);
	const place = useRace((s) => s.place);
	const status = useRace((s) => s.status);
	const rivals = useRace((s) => s.rivals);
	const countdown = useRace((s) => s.countdown);
	if (phase === "menu" || phase === "finish") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-0 z-10 font-sans text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3 p-4 sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[20px] bg-asphalt/72 px-4 py-3 backdrop-blur-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display text-[42px] leading-none tracking-tight",
								children: ["P", place]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-alpine",
								children: "Colapinto"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted",
								children: status
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[20px] bg-asphalt/72 px-4 py-3 text-center backdrop-blur-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-semibold uppercase tracking-[0.2em] text-muted",
								children: "Lap"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display text-[34px] leading-none tabular-nums",
								children: [lap, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-lg text-muted",
									children: [" / ", 3]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs tabular-nums text-muted",
								children: ["Best ", fmt(bestLap)]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[20px] bg-asphalt/72 px-4 py-3 text-right backdrop-blur-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-semibold uppercase tracking-[0.2em] text-muted",
							children: "Time"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-[34px] leading-none tabular-nums",
							children: fmt(time)
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute bottom-5 left-4 right-4 flex items-end justify-between gap-3 sm:bottom-7 sm:left-5 sm:right-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-[20px] bg-asphalt/72 px-4 py-3 backdrop-blur-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-[40px] leading-none tabular-nums",
							children: [Math.round(speed), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-1 text-base text-muted",
								children: "km/h"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minimap, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden min-w-[200px] space-y-2 rounded-[20px] bg-asphalt/72 px-3 py-3 backdrop-blur-sm sm:block",
						children: rivals.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "size-2 rounded-full",
									style: { background: r.color }
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-medium",
									children: [
										"P",
										r.place,
										" ",
										r.name.split(" ").pop()
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums text-muted",
								children: gapLabel(r.gap)
							})]
						}, r.name))
					})
				]
			}),
			phase === "countdown" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 flex items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-[120px] leading-none text-fg drop-shadow-lg",
					children: countdown > .2 ? Math.ceil(countdown) : "GO"
				})
			})
		]
	});
}
function Minimap() {
	const ref = (0, import_react.useRef)(null);
	const phase = useRace((s) => s.phase);
	(0, import_react.useEffect)(() => {
		const canvas = ref.current;
		if (!canvas) return;
		let raf = 0;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
		for (const s of SAMPLES) {
			if (s.x < minX) minX = s.x;
			if (s.x > maxX) maxX = s.x;
			if (s.z < minZ) minZ = s.z;
			if (s.z > maxZ) maxZ = s.z;
		}
		const pad = 18;
		const w = canvas.width;
		const h = canvas.height;
		const sx = (w - 36) / (maxX - minX);
		const sz = (h - 36) / (maxZ - minZ);
		const sc = Math.min(sx, sz);
		const mapX = (x) => pad + (x - minX) * sc;
		const mapZ = (z) => pad + (z - minZ) * sc;
		const draw = () => {
			ctx.clearRect(0, 0, w, h);
			ctx.fillStyle = "rgba(11,12,14,0.55)";
			ctx.beginPath();
			ctx.roundRect(0, 0, w, h, 16);
			ctx.fill();
			ctx.strokeStyle = "rgba(243,244,246,0.35)";
			ctx.lineWidth = 3;
			ctx.lineJoin = "round";
			ctx.beginPath();
			SAMPLES.forEach((s, i) => {
				const x = mapX(s.x);
				const y = mapZ(s.z);
				if (i === 0) ctx.moveTo(x, y);
				else ctx.lineTo(x, y);
			});
			ctx.closePath();
			ctx.stroke();
			const world = getWorld();
			const dots = [
				{
					x: world.max.x,
					z: world.max.z,
					color: "#d32535",
					r: 3.2
				},
				{
					x: world.oscar.x,
					z: world.oscar.z,
					color: "#ff7a1a",
					r: 3.2
				},
				{
					x: world.player.x,
					z: world.player.z,
					color: "#3db4ff",
					yaw: world.player.yaw,
					r: 4.4
				}
			];
			for (const d of dots) {
				const x = mapX(d.x);
				const y = mapZ(d.z);
				ctx.fillStyle = d.color;
				if (d.yaw != null) {
					ctx.save();
					ctx.translate(x, y);
					ctx.rotate(d.yaw);
					ctx.beginPath();
					ctx.moveTo(0, -6);
					ctx.lineTo(4, 5);
					ctx.lineTo(-4, 5);
					ctx.closePath();
					ctx.fill();
					ctx.restore();
				} else {
					ctx.beginPath();
					ctx.arc(x, y, d.r, 0, Math.PI * 2);
					ctx.fill();
				}
			}
			raf = requestAnimationFrame(draw);
		};
		draw();
		return () => cancelAnimationFrame(raf);
	}, [phase]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref,
		width: 168,
		height: 132,
		className: "rounded-[16px] opacity-90",
		"aria-hidden": true
	});
}
function Wheel({ position, scale = 1 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		scale,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				0,
				0,
				Math.PI / 2
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.34,
				.34,
				.28,
				12
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#111111",
				roughness: .7
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				0,
				0,
				Math.PI / 2
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.18,
				.18,
				.3,
				10
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#c8ccd2",
				metalness: .7,
				roughness: .25
			})]
		})]
	});
}
function F1Car({ livery, car }) {
	const group = (0, import_react.useRef)(null);
	const spin = (0, import_react.useRef)(0);
	const wheels = (0, import_react.useRef)(null);
	const colors = LIVERIES[livery];
	useFrame((_, dt) => {
		const c = car();
		const g = group.current;
		if (!g) return;
		g.position.set(c.x, .02, c.z);
		g.rotation.order = "YXZ";
		g.rotation.y = c.yaw;
		g.rotation.z = MathUtils.damp(g.rotation.z, -c.steer * .1, 8, dt);
		g.rotation.x = MathUtils.damp(g.rotation.x, -c.throttle * .03, 8, dt);
		spin.current += c.speed * dt * 1.8;
		if (wheels.current) wheels.current.children.forEach((w, i) => {
			w.rotation.x = spin.current;
			if (i < 2) w.rotation.y = c.steer * .35;
		});
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref: group,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.28,
					-1.7
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.28,
					.16,
					1.15
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: colors.body,
					metalness: .35,
					roughness: .4
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.22,
					-2.25
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.18,
					.1,
					.45
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: colors.body,
					metalness: .35,
					roughness: .4
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.12,
					-2.45
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1.85,
					.05,
					.38
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: colors.dark,
					metalness: .2,
					roughness: .45
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.9,
					.2,
					-2.45
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.06,
					.22,
					.4
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: colors.accent })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.9,
					.2,
					-2.45
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.06,
					.22,
					.4
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: colors.accent })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.38,
					-.15
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.72,
					.28,
					2.1
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: colors.body,
					metalness: .3,
					roughness: .38
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.22,
					-.2
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1.15,
					.12,
					2.4
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: colors.dark,
					roughness: .6
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.55,
					.36,
					.15
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.42,
					.32,
					1.5
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: colors.body,
					metalness: .3,
					roughness: .4
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.55,
					.36,
					.15
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.42,
					.32,
					1.5
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: colors.body,
					metalness: .3,
					roughness: .4
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.62,
					-.35
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.55,
					.08,
					.85
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#c5c8ce",
					metalness: .7,
					roughness: .2
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.72,
					-.55
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.16,
					10,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: colors.accent,
					roughness: .35
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.72,
					-.62
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.18,
					.08,
					.08
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#111" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.55,
					.85
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.5,
					.38,
					1.2
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: colors.body,
					metalness: .3,
					roughness: .4
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.82,
					1.05
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.05,
					.28,
					.7
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: colors.dark })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.95,
					1.7
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1.55,
					.07,
					.32
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: colors.dark,
					metalness: .25,
					roughness: .4
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.78,
					1.7
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1.45,
					.05,
					.26
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: colors.accent })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.76,
					.7,
					1.7
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.06,
					.55,
					.36
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: colors.body })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.76,
					.7,
					1.7
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.06,
					.55,
					.36
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: colors.body })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				ref: wheels,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wheel, { position: [
						-.78,
						.34,
						-1.35
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wheel, { position: [
						.78,
						.34,
						-1.35
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wheel, {
						position: [
							-.82,
							.36,
							1.15
						],
						scale: 1.08
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wheel, {
						position: [
							.82,
							.36,
							1.15
						],
						scale: 1.08
					})
				]
			})
		]
	});
}
var _cam = new Vector3();
var _look = new Vector3();
var _fwd = new Vector3();
var dummy = new Object3D();
function InstancedFromMatrices({ matrices, geometry, material, cast = false }) {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useLayoutEffect)(() => {
		const mesh = ref.current;
		if (!mesh) return;
		matrices.forEach((m, i) => mesh.setMatrixAt(i, m));
		mesh.instanceMatrix.needsUpdate = true;
	}, [matrices]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("instancedMesh", {
		ref,
		args: [
			geometry,
			material,
			matrices.length
		],
		castShadow: cast,
		receiveShadow: true
	});
}
function Trees() {
	const pts = (0, import_react.useMemo)(() => scatterOutside(42, 18, 34, 3), []);
	const geo = (0, import_react.useMemo)(() => new ConeGeometry(1.4, 4.2, 6), []);
	const trunk = (0, import_react.useMemo)(() => new CylinderGeometry(.22, .28, 1.1, 6), []);
	const leafMat = (0, import_react.useMemo)(() => new MeshStandardMaterial({
		color: "#2f6b3a",
		flatShading: true
	}), []);
	const trunkMat = (0, import_react.useMemo)(() => new MeshStandardMaterial({
		color: "#4a3424",
		flatShading: true
	}), []);
	const leafRef = (0, import_react.useRef)(null);
	const trunkRef = (0, import_react.useRef)(null);
	(0, import_react.useLayoutEffect)(() => {
		pts.forEach((p, i) => {
			dummy.position.set(p.x, 2.4, p.z);
			dummy.rotation.set(0, p.rot, 0);
			dummy.scale.set(p.s, p.s, p.s);
			dummy.updateMatrix();
			leafRef.current?.setMatrixAt(i, dummy.matrix);
			dummy.position.set(p.x, .55, p.z);
			dummy.scale.set(p.s, 1, p.s);
			dummy.updateMatrix();
			trunkRef.current?.setMatrixAt(i, dummy.matrix);
		});
		if (leafRef.current) leafRef.current.instanceMatrix.needsUpdate = true;
		if (trunkRef.current) trunkRef.current.instanceMatrix.needsUpdate = true;
	}, [pts]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("instancedMesh", {
		ref: leafRef,
		args: [
			geo,
			leafMat,
			pts.length
		],
		castShadow: true
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("instancedMesh", {
		ref: trunkRef,
		args: [
			trunk,
			trunkMat,
			pts.length
		]
	})] });
}
function Grandstands() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				18,
				3.2,
				20
			],
			rotation: [
				0,
				0,
				0
			],
			castShadow: true,
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				6,
				6.4,
				48
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#cfd3d8",
				roughness: .7
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-18,
				2.6,
				8
			],
			rotation: [
				0,
				.08,
				0
			],
			castShadow: true,
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				5.5,
				5.2,
				36
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#b7bcc4",
				roughness: .7
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				6.6,
				72
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				18,
				.4,
				1.2
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#1a1c22" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-8.5,
				3.3,
				72
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.45,
				6.6,
				.45
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#2a2d34" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				8.5,
				3.3,
				72
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.45,
				6.6,
				.45
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#2a2d34" })]
		}),
		[
			-4,
			-1.3,
			1.3,
			4
		].map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				x,
				6.35,
				72
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.28,
				10,
				8
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: i < 3 ? "#d32535" : "#5dcaa8",
				emissive: i < 3 ? "#d32535" : "#5dcaa8",
				emissiveIntensity: .7
			})]
		}, x))
	] });
}
function TrackMesh() {
	const asphalt = (0, import_react.useMemo)(() => makeAsphalt(), []);
	const curbs = (0, import_react.useMemo)(() => makeCurbs(), []);
	const runoff = (0, import_react.useMemo)(() => makeRunoff(), []);
	const posts = (0, import_react.useMemo)(() => barrierPosts(), []);
	const postGeo = (0, import_react.useMemo)(() => new BoxGeometry(.18, 1.1, 1.4), []);
	const postMat = (0, import_react.useMemo)(() => new MeshStandardMaterial({
		color: "#d8dbe0",
		metalness: .15,
		roughness: .55
	}), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: runoff,
			receiveShadow: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#3b7a3f",
				roughness: .95
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: asphalt,
			receiveShadow: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#2a2d33",
				roughness: .82,
				metalness: .08
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: curbs,
			receiveShadow: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				vertexColors: true,
				roughness: .45
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstancedFromMatrices, {
			matrices: posts,
			geometry: postGeo,
			material: postMat
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.04,
				70
			],
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [14.8, 2.4] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#e8eaee",
				roughness: .6
			})]
		})
	] });
}
function ChaseCam() {
	const { camera } = useThree();
	const fov = (0, import_react.useRef)(62);
	useFrame((_, dt) => {
		const w = getWorld();
		const p = w.player;
		const fx = -Math.sin(p.yaw);
		const fz = -Math.cos(p.yaw);
		_fwd.set(fx, 0, fz);
		const dist = 8.4 + Math.min(3.2, Math.abs(p.speed) * .03);
		const height = 2.6 + Math.min(1.1, Math.abs(p.speed) * .012);
		_cam.set(p.x, 0, p.z).addScaledVector(_fwd, -dist);
		_cam.y = height;
		const shake = w.trauma * w.trauma;
		if (shake > .002) {
			_cam.x += (Math.random() - .5) * shake * .7;
			_cam.y += (Math.random() - .5) * shake * .35;
		}
		camera.position.lerp(_cam, 1 - Math.exp(-3.4 * dt));
		_look.set(p.x, .7, p.z).addScaledVector(_fwd, 6.5);
		camera.lookAt(_look);
		const targetFov = 58 + Math.min(16, Math.abs(p.speed) * .22);
		fov.current += (targetFov - fov.current) * (1 - Math.exp(-3 * dt));
		camera.fov = fov.current;
		camera.updateProjectionMatrix();
	});
	return null;
}
function SimTicker() {
	const acc = (0, import_react.useRef)(0);
	useFrame((_, dt) => {
		acc.current += Math.min(dt, .1);
		const STEP = FIXED_DT;
		let guard = 0;
		while (acc.current >= STEP && guard++ < 8) {
			stepSim(STEP);
			acc.current -= STEP;
		}
	});
	return null;
}
function World() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("color", {
			attach: "background",
			args: ["#6d8aa8"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("fog", {
			attach: "fog",
			args: [
				"#6d8aa8",
				70,
				340
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hemisphereLight", { args: [
			"#ffd9b0",
			"#3d4a38",
			.7
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				70,
				48,
				28
			],
			intensity: 1.55,
			castShadow: true,
			"shadow-mapSize": [1024, 1024],
			"shadow-camera-near": 2,
			"shadow-camera-far": 260,
			"shadow-camera-left": -80,
			"shadow-camera-right": 80,
			"shadow-camera-top": 80,
			"shadow-camera-bottom": -80
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: .22 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				0,
				-.02,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [420, 48] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#3a7d42",
				roughness: 1
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrackMesh, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trees, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grandstands, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F1Car, {
			livery: "alpine",
			car: () => getWorld().player
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F1Car, {
			livery: "navy",
			car: () => getWorld().max
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F1Car, {
			livery: "papaya",
			car: () => getWorld().oscar
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChaseCam, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimTicker, {})
	] });
}
function Game() {
	const [client, setClient] = (0, import_react.useState)(false);
	const phase = useRace((s) => s.phase);
	(0, import_react.useEffect)(() => {
		setClient(true);
		const unsub = mountInput();
		attachControlsProbe();
		resetWorld();
		return unsub;
	}, []);
	(0, import_react.useEffect)(() => {
		const onVis = () => {
			if (document.visibilityState === "visible") unlockAudio();
		};
		document.addEventListener("visibilitychange", onVis);
		return () => document.removeEventListener("visibilitychange", onVis);
	}, []);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.code !== "Escape") return;
			if (phase === "racing") setPhase("paused");
			else if (phase === "paused") setPhase("racing");
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [phase]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative h-dvh w-full overflow-hidden bg-asphalt text-fg",
		children: [
			client ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, {
				className: "absolute inset-0 touch-none",
				shadows: true,
				dpr: [1, 1.6],
				camera: {
					fov: 62,
					near: .15,
					far: 420,
					position: [
						0,
						6,
						16
					]
				},
				gl: {
					antialias: true,
					powerPreference: "high-performance"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(World, {})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-asphalt" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hud, {}),
			phase === "menu" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { onStart: begin }),
			phase === "paused" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, {}),
			phase === "finish" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Finish, {}),
			(phase === "racing" || phase === "countdown") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TouchPad, {}),
			(phase === "racing" || phase === "paused") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "absolute right-4 top-4 z-20 hidden h-11 rounded-[10px] border border-border bg-asphalt/70 px-4 text-sm text-fg backdrop-blur-sm sm:block",
				onClick: () => setPhase(phase === "paused" ? "racing" : "paused"),
				children: phase === "paused" ? "Resume" : "Pause"
			})
		]
	});
}
function begin() {
	unlockAudio();
	startGrid();
}
function Menu({ onStart }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 z-30 flex items-center justify-center bg-asphalt/55 px-5 backdrop-blur-[2px]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-[520px] rounded-[28px] bg-elevated/92 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.45)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-semibold uppercase tracking-[0.28em] text-alpine",
					children: "Stark Labs"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-[64px] leading-[0.9] tracking-tight text-balance",
					children: "STARK F1"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-[42ch] text-pretty text-sm leading-relaxed text-muted",
					children: "You are Franco Colapinto. Three laps around Circuito Costero against Max Verstappen and Oscar Piastri. Stay on the black stuff."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-5 grid grid-cols-3 gap-2 text-center text-[11px] uppercase tracking-wider",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-[16px] bg-panel px-2 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-display text-2xl text-alpine",
								children: "43"
							}), "Colapinto"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-[16px] bg-panel px-2 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-display text-2xl text-bull",
								children: "1"
							}), "Verstappen"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-[16px] bg-panel px-2 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-display text-2xl text-papaya",
								children: "81"
							}), "Piastri"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-xs leading-relaxed text-subtle",
					children: "W / Up accelerate · S / Down brake · A / Left · D / Right · Shift boost · Esc pause"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-6 w-full",
					onClick: onStart,
					children: "Start race"
				})
			]
		})
	});
}
function Pause() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 z-30 flex items-center justify-center bg-asphalt/50 px-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-[360px] rounded-[24px] bg-elevated p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl",
					children: "Paused"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Esc or Resume to get back on the racing line."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => setPhase("racing"),
						children: "Resume"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: () => {
							resetWorld();
						},
						children: "Back to grid"
					})]
				})
			]
		})
	});
}
function Finish() {
	const winner = useRace((s) => s.winner);
	const results = useRace((s) => s.results);
	const time = useRace((s) => s.time);
	const youWon = winner === "Franco Colapinto";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 z-30 flex items-center justify-center bg-asphalt/60 px-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-[420px] rounded-[28px] bg-elevated p-7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-semibold uppercase tracking-[0.22em] text-alpine",
					children: "Chequered flag"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-5xl leading-none",
					children: youWon ? "You win" : "Race over"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: youWon ? "Colapinto takes Circuito Costero." : `${winner} gets there first.`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-5 space-y-2",
					children: results.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between rounded-[14px] bg-panel px-3 py-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-display text-xl tabular-nums",
									children: ["P", r.place]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "size-2 rounded-full",
									style: { background: r.color }
								}),
								r.name
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums text-muted",
							children: [r.time.toFixed(2), "s"]
						})]
					}, r.name))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-xs text-subtle",
					children: [
						"Race time ",
						time.toFixed(2),
						"s"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-5 w-full",
					onClick: () => {
						resetWorld();
					},
					children: "Race again"
				})
			]
		})
	});
}
function TouchPad() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-between p-4 sm:hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-auto flex flex-col gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoldButton, {
				label: "Brake",
				onHold: (v) => setTouchThrottle(v ? -1 : 0)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoldButton, {
				label: "Throttle",
				accent: true,
				onHold: (v) => setTouchThrottle(v ? 1 : 0)
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SteerStick, {})]
	});
}
function HoldButton({ label, onHold, accent }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: `h-14 min-w-[108px] rounded-[16px] border border-border px-4 text-sm font-medium backdrop-blur-sm ${accent ? "bg-alpine/90 text-asphalt" : "bg-asphalt/70 text-fg"}`,
		onPointerDown: (e) => {
			e.currentTarget.setPointerCapture(e.pointerId);
			onHold(true);
		},
		onPointerUp: () => onHold(false),
		onPointerCancel: () => onHold(false),
		children: label
	});
}
function SteerStick() {
	const origin = (0, import_react.useRef)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-auto flex h-[120px] w-[148px] items-center justify-center rounded-[24px] border border-border bg-asphalt/70 text-xs uppercase tracking-wider text-muted backdrop-blur-sm",
		onPointerDown: (e) => {
			e.currentTarget.setPointerCapture(e.pointerId);
			origin.current = e.clientX;
		},
		onPointerMove: (e) => {
			if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
			const dx = e.clientX - origin.current;
			setTouchSteer(Math.max(-1, Math.min(1, -dx / 64)));
		},
		onPointerUp: () => setTouchSteer(0),
		onPointerCancel: () => setTouchSteer(0),
		children: "Steer"
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Game, {});
}
//#endregion
export { Home as component };
