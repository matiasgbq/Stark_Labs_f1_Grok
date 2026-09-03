let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let sfx: GainNode | null = null;
let engineOsc: OscillatorNode | null = null;
let engineGain: GainNode | null = null;
let engineFilter: BiquadFilterNode | null = null;

function graph() {
  if (!ctx || !master) return null;
  return { ctx, master, sfx: sfx! };
}

export function unlockAudio() {
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new AC({ latencyHint: "interactive" });
    master = ctx.createGain();
    master.gain.value = 0.55;
    master.connect(ctx.destination);
    sfx = ctx.createGain();
    sfx.gain.value = 0.8;
    sfx.connect(master);
  }
  if (ctx.state === "suspended") void ctx.resume();
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

export function setEngine(speed: number, throttle: number, racing: boolean) {
  if (!ctx || !engineOsc || !engineGain || !engineFilter) return;
  const t = ctx.currentTime;
  if (!racing) {
    engineGain.gain.setTargetAtTime(0, t, 0.08);
    return;
  }
  const abs = Math.abs(speed);
  const freq = 48 + abs * 4.4 + Math.max(0, throttle) * 18;
  engineOsc.frequency.setTargetAtTime(freq, t, 0.05);
  engineFilter.frequency.setTargetAtTime(280 + abs * 8, t, 0.08);
  const vol = 0.012 + Math.min(0.07, abs * 0.0011) + Math.max(0, throttle) * 0.02;
  engineGain.gain.setTargetAtTime(vol, t, 0.06);
}

function beep(freq: number, dur: number, vol = 0.12, type: OscillatorType = "square") {
  const g = graph();
  if (!g) return;
  const o = g.ctx.createOscillator();
  const gain = g.ctx.createGain();
  o.type = type;
  o.frequency.value = freq;
  gain.gain.setValueAtTime(vol, g.ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, g.ctx.currentTime + dur);
  o.connect(gain);
  gain.connect(g.sfx);
  o.start();
  o.stop(g.ctx.currentTime + dur);
}

export function chirpCountdown(stage: number) {
  beep(stage <= 0 ? 880 : 420, stage <= 0 ? 0.28 : 0.12, 0.14, "square");
}

export function thud() {
  beep(90, 0.16, 0.18, "sine");
}

export function finishFanfare() {
  beep(523, 0.18, 0.1);
  setTimeout(() => beep(659, 0.18, 0.1), 90);
  setTimeout(() => beep(784, 0.4, 0.12), 180);
}
