import { create } from "zustand";
import { TOTAL_LAPS } from "./constants";

export type Phase = "menu" | "countdown" | "racing" | "paused" | "finish";

export type RivalHud = {
  name: string;
  status: string;
  gap: number;
  place: number;
  color: string;
};

export type RaceHud = {
  phase: Phase;
  countdown: number;
  lap: number;
  totalLaps: number;
  time: number;
  lastLap: number;
  bestLap: number;
  speed: number;
  place: number;
  status: string;
  rivals: RivalHud[];
  winner: string;
  results: { name: string; time: number; place: number; color: string }[];
};

const empty: RaceHud = {
  phase: "menu",
  countdown: 3,
  lap: 1,
  totalLaps: TOTAL_LAPS,
  time: 0,
  lastLap: 0,
  bestLap: 0,
  speed: 0,
  place: 3,
  status: "GRID",
  rivals: [],
  winner: "",
  results: [],
};

export const useRace = create<RaceHud & { patch: (p: Partial<RaceHud>) => void }>((set) => ({
  ...empty,
  patch: (p) => set(p),
}));

export function resetHud() {
  useRace.setState({ ...empty, patch: useRace.getState().patch });
}
