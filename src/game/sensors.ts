import { TRACK_HALF } from "./constants";
import { closest, sampleAt, TRACK_LENGTH } from "./track";

export type SensorVehicle = {
  x: number;
  z: number;
  yaw: number;
  speed: number;
  progress: number;
  hint?: number;
};

export type TrackProbe = {
  distance: number;
  centerOffset: number;
  headingError: number;
  curve: number;
};

export type TrackSensors = {
  speed: number;
  normalizedSpeed: number;
  progress: number;
  lateralOffset: number;
  leftClearance: number;
  rightClearance: number;
  offTrack: boolean;
  headingError: number;
  curveDirection: "left" | "right" | "straight";
  curveStrength: number;
  probes: TrackProbe[];
};

const PROBE_DISTANCES = [8, 18, 32, 50];
const HEADING_LOOKAHEAD = 10;
const HEADING_SCALE = Math.PI * 2;

function wrapAngle(angle: number) {
  while (angle > Math.PI) angle -= HEADING_SCALE;
  while (angle < -Math.PI) angle += HEADING_SCALE;
  return angle;
}

function headingError(vehicle: SensorVehicle, progress: number) {
  return wrapAngle(sampleAt(progress).yaw - vehicle.yaw);
}

function signedCenterOffset(vehicle: SensorVehicle, progress: number) {
  const target = sampleAt(progress);
  return (vehicle.x - target.x) * target.nx + (vehicle.z - target.z) * target.nz;
}

export function readTrackSensors(vehicle: SensorVehicle): TrackSensors {
  const current = closest(vehicle.x, vehicle.z, vehicle.hint ?? 0);
  const lateralOffset = current.lat;
  const probes = PROBE_DISTANCES.map((distance) => {
    const progress = (vehicle.progress + distance / TRACK_LENGTH) % 1;
    const target = sampleAt(progress);
    const curve = wrapAngle(target.yaw - current.sample.yaw);
    return {
      distance,
      centerOffset: signedCenterOffset(vehicle, progress),
      headingError: headingError(vehicle, progress),
      curve,
    };
  });
  const nearCurve = probes[1]?.curve ?? 0;
  const curveStrength = Math.min(1, Math.abs(nearCurve) / 0.8);
  return {
    speed: Math.abs(vehicle.speed),
    normalizedSpeed: Math.min(1, Math.abs(vehicle.speed) / 64),
    progress: vehicle.progress,
    lateralOffset,
    leftClearance: TRACK_HALF + lateralOffset,
    rightClearance: TRACK_HALF - lateralOffset,
    offTrack: Math.abs(lateralOffset) > TRACK_HALF,
    headingError: headingError(vehicle, vehicle.progress + HEADING_LOOKAHEAD / TRACK_LENGTH),
    curveDirection:
      Math.abs(nearCurve) < 0.08 ? "straight" : nearCurve > 0 ? "left" : "right",
    curveStrength,
    probes,
  };
}
