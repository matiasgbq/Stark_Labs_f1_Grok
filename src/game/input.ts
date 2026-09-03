const held = new Set<string>();
let override: Set<string> | null = null;
let touchSteer = 0;
let touchThrottle = 0;

const GAME_KEYS = new Set([
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
  "Escape",
]);

function onKeyDown(e: KeyboardEvent) {
  if (GAME_KEYS.has(e.code)) e.preventDefault();
  held.add(e.code);
}

function onKeyUp(e: KeyboardEvent) {
  held.delete(e.code);
}

function clear() {
  held.clear();
  touchSteer = 0;
  touchThrottle = 0;
}

export function mountInput() {
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

export function setKeys(codes: string[]) {
  override = codes.length ? new Set(codes) : null;
}

export function setTouchSteer(v: number) {
  touchSteer = Math.max(-1, Math.min(1, v));
}

export function setTouchThrottle(v: number) {
  touchThrottle = Math.max(-1, Math.min(1, v));
}

export function consumeEscape(): boolean {
  const k = override ?? held;
  if (!k.has("Escape")) return false;
  held.delete("Escape");
  return true;
}

export function readActions() {
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
    boost,
  };
}
