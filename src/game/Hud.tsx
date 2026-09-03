import { useEffect, useRef } from "react";
import { TOTAL_LAPS } from "./constants";
import { SAMPLES } from "./track";
import { getWorld } from "./sim";
import { useRace } from "./store";

function fmt(t: number) {
  if (!t || !isFinite(t)) return "—";
  const m = Math.floor(t / 60);
  const s = t - m * 60;
  return `${m}:${s.toFixed(2).padStart(5, "0")}`;
}

function gapLabel(m: number) {
  if (Math.abs(m) < 2) return "WHEEL";
  const sign = m > 0 ? "+" : "−";
  return `${sign}${Math.abs(m).toFixed(0)} m`;
}

export function Hud() {
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

  return (
    <div className="pointer-events-none absolute inset-0 z-10 font-sans text-fg">
      <div className="flex items-start justify-between gap-3 p-4 sm:p-5">
        <div className="rounded-[20px] bg-asphalt/72 px-4 py-3 backdrop-blur-sm">
          <p className="font-display text-[42px] leading-none tracking-tight">
            P{place}
          </p>
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-alpine">
            Colapinto
          </p>
          <p className="mt-1 text-xs text-muted">{status}</p>
        </div>
        <div className="rounded-[20px] bg-asphalt/72 px-4 py-3 text-center backdrop-blur-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">Lap</p>
          <p className="font-display text-[34px] leading-none tabular-nums">
            {lap}
            <span className="text-lg text-muted"> / {TOTAL_LAPS}</span>
          </p>
          <p className="mt-1 text-xs tabular-nums text-muted">Best {fmt(bestLap)}</p>
        </div>
        <div className="rounded-[20px] bg-asphalt/72 px-4 py-3 text-right backdrop-blur-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">Time</p>
          <p className="font-display text-[34px] leading-none tabular-nums">{fmt(time)}</p>
        </div>
      </div>

      <div className="absolute bottom-5 left-4 right-4 flex items-end justify-between gap-3 sm:bottom-7 sm:left-5 sm:right-5">
        <div className="rounded-[20px] bg-asphalt/72 px-4 py-3 backdrop-blur-sm">
          <p className="font-display text-[40px] leading-none tabular-nums">
            {Math.round(speed)}
            <span className="ml-1 text-base text-muted">km/h</span>
          </p>
        </div>
        <Minimap />
        <div className="hidden min-w-[200px] space-y-2 rounded-[20px] bg-asphalt/72 px-3 py-3 backdrop-blur-sm sm:block">
          {rivals.map((r) => (
            <div key={r.name} className="flex items-center justify-between gap-3 text-xs">
              <span className="flex items-center gap-2">
                <span className="size-2 rounded-full" style={{ background: r.color }} />
                <span className="font-medium">P{r.place} {r.name.split(" ").pop()}</span>
              </span>
              <span className="tabular-nums text-muted">{gapLabel(r.gap)}</span>
            </div>
          ))}
        </div>
      </div>

      {phase === "countdown" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-display text-[120px] leading-none text-fg drop-shadow-lg">
            {countdown > 0.2 ? Math.ceil(countdown) : "GO"}
          </p>
        </div>
      )}
    </div>
  );
}

function Minimap() {
  const ref = useRef<HTMLCanvasElement>(null);
  const phase = useRace((s) => s.phase);

  useEffect(() => {
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
    const sx = (w - pad * 2) / (maxX - minX);
    const sz = (h - pad * 2) / (maxZ - minZ);
    const sc = Math.min(sx, sz);
    const mapX = (x: number) => pad + (x - minX) * sc;
    const mapZ = (z: number) => pad + (z - minZ) * sc;

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
      const dots: { x: number; z: number; color: string; yaw?: number; r: number }[] = [
        { x: world.max.x, z: world.max.z, color: "#d32535", r: 3.2 },
        { x: world.oscar.x, z: world.oscar.z, color: "#ff7a1a", r: 3.2 },
        { x: world.player.x, z: world.player.z, color: "#3db4ff", yaw: world.player.yaw, r: 4.4 },
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

  return (
    <canvas
      ref={ref}
      width={168}
      height={132}
      className="rounded-[16px] opacity-90"
      aria-hidden
    />
  );
}
