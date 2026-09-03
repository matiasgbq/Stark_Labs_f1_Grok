export const TOTAL_LAPS = 3;
export const CHECKPOINTS = 12;
export const TRACK_HALF = 7.6;
export const BARRIER = TRACK_HALF + 1.55;
export const CAR_RADIUS = 0.95;
export const MAX_SPEED = 64;
export const BOOST_SPEED = 74;
export const ACCEL = 32;
export const BRAKE = 48;
export const DRAG = 0.55;
export const TURN_RATE = 1.55;
export const FIXED_DT = 1 / 60;
export const HUD_HZ = 12;

export const LIVERIES = {
  alpine: {
    body: "#1390e8",
    accent: "#ff6b9d",
    dark: "#0c1520",
    number: "43",
    label: "Franco Colapinto",
    team: "Alpine",
  },
  navy: {
    body: "#1b2458",
    accent: "#d32535",
    dark: "#07090f",
    number: "1",
    label: "Max Verstappen",
    team: "Navy Bull",
  },
  papaya: {
    body: "#ff7a1a",
    accent: "#1a120c",
    dark: "#1a120c",
    number: "81",
    label: "Oscar Piastri",
    team: "Papaya",
  },
} as const;

export type LiveryId = keyof typeof LIVERIES;
