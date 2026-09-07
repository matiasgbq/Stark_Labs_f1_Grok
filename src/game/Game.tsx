import { Canvas } from "@react-three/fiber";
import { Pause as PauseIcon, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { unlockAudio } from "./audio";
import { Hud } from "./Hud";
import { mountInput, setTouchSteer, setTouchThrottle } from "./input";
import { attachControlsProbe, resetWorld, setPhase, startGrid } from "./sim";
import { useRace } from "./store";
import { World } from "./World";

export function Game() {
  const [client, setClient] = useState(false);
  const phase = useRace((s) => s.phase);

  useEffect(() => {
    setClient(true);
    const unsub = mountInput();
    attachControlsProbe();
    resetWorld();
    return unsub;
  }, []);

  useEffect(() => {
    const onVis = () => {
      if (document.visibilityState === "visible") unlockAudio();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== "Escape") return;
      if (phase === "racing") setPhase("paused");
      else if (phase === "paused") setPhase("racing");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase]);

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-asphalt text-fg">
      {client ? (
        <Canvas
          className="absolute inset-0 touch-none"
          shadows
          dpr={[1, 1.6]}
          camera={{ fov: 62, near: 0.15, far: 420, position: [0, 2.8, 82] }}
          gl={{ antialias: true, powerPreference: "high-performance" }}
        >
          <World />
        </Canvas>
      ) : (
        <div className="absolute inset-0 bg-asphalt" />
      )}
      <Hud />
      {phase === "menu" && <Menu onStart={begin} />}
      {phase === "paused" && <Pause />}
      {phase === "finish" && <Finish />}
      {(phase === "racing" || phase === "countdown") && <TouchPad />}
      {(phase === "racing" || phase === "paused") && (
        <button
          type="button"
          aria-label={phase === "paused" ? "Resume race" : "Pause race"}
          className="absolute right-4 top-28 z-20 flex h-10 items-center gap-2 rounded-[10px] border border-border bg-asphalt/70 px-3 text-sm text-fg backdrop-blur-sm sm:top-4 sm:h-11 sm:px-4"
          onClick={() => setPhase(phase === "paused" ? "racing" : "paused")}
        >
          {phase === "paused" ? <Play className="size-4" /> : <PauseIcon className="size-4" />}
          {phase === "paused" ? "Resume" : "Pause"}
        </button>
      )}
    </main>
  );
}

function begin() {
  unlockAudio();
  startGrid();
}

function Menu({ onStart }: { onStart: () => void }) {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-asphalt/55 px-5 backdrop-blur-[2px]">
      <div className="w-full max-w-[520px] rounded-[28px] bg-elevated/92 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-alpine">Stark Labs</p>
        <h1 className="mt-2 font-display text-[64px] leading-[0.9] tracking-tight text-balance">STARK F1</h1>
        <p className="mt-3 max-w-[42ch] text-pretty text-sm leading-relaxed text-muted">
          You are Franco Colapinto. Three laps around Circuito Costero against
          Max Verstappen, Oscar Piastri and Lewis Hamilton. Stay on the black stuff.
        </p>
        <ul className="mt-5 grid grid-cols-4 gap-2 text-center text-[11px] uppercase tracking-wider">
          <li className="rounded-[16px] bg-panel px-2 py-3">
            <span className="block font-display text-2xl text-alpine">43</span>
            Colapinto
          </li>
          <li className="rounded-[16px] bg-panel px-2 py-3">
            <span className="block font-display text-2xl text-bull">1</span>
            Verstappen
          </li>
          <li className="rounded-[16px] bg-panel px-2 py-3">
            <span className="block font-display text-2xl text-papaya">81</span>
            Piastri
          </li>
          <li className="rounded-[16px] bg-panel px-2 py-3">
            <span className="block font-display text-2xl text-ferrari">44</span>
            Hamilton
          </li>
        </ul>
        <p className="mt-5 text-xs leading-relaxed text-subtle">
          W / Up accelerate · S / Down brake · A / Left · D / Right · Shift boost · Esc pause
        </p>
        <Button className="mt-6 w-full" onClick={onStart}>
          Start race
        </Button>
      </div>
    </div>
  );
}

function Pause() {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-asphalt/50 px-5">
      <div className="w-full max-w-[360px] rounded-[24px] bg-elevated p-6">
        <h2 className="font-display text-4xl">Paused</h2>
        <p className="mt-2 text-sm text-muted">Esc or Resume to get back on the racing line.</p>
        <div className="mt-5 flex flex-col gap-2">
          <Button onClick={() => setPhase("racing")}>Resume</Button>
          <Button
            variant="ghost"
            onClick={() => {
              resetWorld();
            }}
          >
            Back to grid
          </Button>
        </div>
      </div>
    </div>
  );
}

function Finish() {
  const winner = useRace((s) => s.winner);
  const results = useRace((s) => s.results);
  const time = useRace((s) => s.time);
  const youWon = winner === "Franco Colapinto";
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-asphalt/60 px-5">
      <div className="w-full max-w-[420px] rounded-[28px] bg-elevated p-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-alpine">Chequered flag</p>
        <h2 className="mt-1 font-display text-5xl leading-none">
          {youWon ? "You win" : "Race over"}
        </h2>
        <p className="mt-2 text-sm text-muted">
          {youWon ? "Colapinto takes Circuito Costero." : `${winner} gets there first.`}
        </p>
        <ol className="mt-5 space-y-2">
          {results.map((r) => (
            <li
              key={r.name}
              className="flex items-center justify-between rounded-[14px] bg-panel px-3 py-2 text-sm"
            >
              <span className="flex items-center gap-2">
                <span className="font-display text-xl tabular-nums">P{r.place}</span>
                <span className="size-2 rounded-full" style={{ background: r.color }} />
                {r.name}
              </span>
              <span className="tabular-nums text-muted">{r.time.toFixed(2)}s</span>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-xs text-subtle">Race time {time.toFixed(2)}s</p>
        <Button
          className="mt-5 w-full"
          onClick={() => {
            resetWorld();
          }}
        >
          Race again
        </Button>
      </div>
    </div>
  );
}

function TouchPad() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-end p-4 sm:hidden">
      <VirtualJoystick />
    </div>
  );
}

function VirtualJoystick() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const activePointer = useRef<number | null>(null);
  const radius = 58;

  const updateFromPointer = (clientX: number, clientY: number, rect: DOMRect) => {
    const dx = clientX - (rect.left + rect.width / 2);
    const dy = clientY - (rect.top + rect.height / 2);
    const distance = Math.hypot(dx, dy);
    const scale = distance > radius ? radius / distance : 1;
    const x = dx * scale;
    const y = dy * scale;
    setOffset({ x, y });
    setTouchSteer(Math.max(-1, Math.min(1, -x / radius)));
    setTouchThrottle(Math.max(-1, Math.min(1, -y / radius)));
  };

  const release = () => {
    activePointer.current = null;
    setOffset({ x: 0, y: 0 });
    setTouchSteer(0);
    setTouchThrottle(0);
  };

  return (
    <div
      role="application"
      aria-label="Virtual driving joystick"
      className="pointer-events-auto flex h-[152px] w-[152px] touch-none items-center justify-center rounded-full border border-border bg-asphalt/75 backdrop-blur-sm"
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        activePointer.current = e.pointerId;
        updateFromPointer(e.clientX, e.clientY, e.currentTarget.getBoundingClientRect());
      }}
      onPointerMove={(e) => {
        if (activePointer.current !== e.pointerId) return;
        updateFromPointer(e.clientX, e.clientY, e.currentTarget.getBoundingClientRect());
      }}
      onPointerUp={release}
      onPointerCancel={release}
    >
      <div className="pointer-events-none absolute text-[9px] font-semibold uppercase tracking-[0.18em] text-muted">
        Drive
      </div>
      <div
        className="pointer-events-none h-14 w-14 rounded-full border-2 border-alpine bg-alpine/90 shadow-[0_0_24px_rgba(61,180,255,0.45)] transition-transform duration-75"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      />
    </div>
  );
}
