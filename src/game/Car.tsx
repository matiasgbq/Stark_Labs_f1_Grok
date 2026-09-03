import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { LIVERIES, type LiveryId } from "./constants";
import type { CarSim } from "./sim";

function Wheel({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.34, 0.34, 0.28, 12]} />
        <meshStandardMaterial color="#111111" roughness={0.7} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.18, 0.18, 0.3, 10]} />
        <meshStandardMaterial color="#c8ccd2" metalness={0.7} roughness={0.25} />
      </mesh>
    </group>
  );
}

export function F1Car({
  livery,
  car,
}: {
  livery: LiveryId;
  car: () => CarSim;
}) {
  const group = useRef<THREE.Group>(null);
  const spin = useRef(0);
  const wheels = useRef<THREE.Group>(null);
  const colors = LIVERIES[livery];
  const spawn = car();

  useFrame((_, dt) => {
    const c = car();
    const g = group.current;
    if (!g) return;
    g.position.set(c.x, 0.02, c.z);
    g.rotation.order = "YXZ";
    g.rotation.y = c.yaw;
    g.rotation.z = THREE.MathUtils.damp(g.rotation.z, -c.steer * 0.1, 8, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -c.throttle * 0.03, 8, dt);
    spin.current += c.speed * dt * 1.8;
    if (wheels.current) {
      wheels.current.children.forEach((w, i) => {
        w.rotation.x = spin.current;
        if (i < 2) w.rotation.y = c.steer * 0.35;
      });
    }
  });

  return (
    <group ref={group} position={[spawn.x, 0.02, spawn.z]} rotation={[0, spawn.yaw, 0]} scale={1.15}>
      {/* Nose toward local −Z so yaw=0 faces world −Z */}
      <mesh position={[0, 0.28, -1.7]} castShadow>
        <boxGeometry args={[0.28, 0.16, 1.15]} />
        <meshStandardMaterial color={colors.body} metalness={0.35} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.22, -2.25]} castShadow>
        <boxGeometry args={[0.18, 0.1, 0.45]} />
        <meshStandardMaterial color={colors.body} metalness={0.35} roughness={0.4} />
      </mesh>
      {/* Front wing */}
      <mesh position={[0, 0.12, -2.45]} castShadow>
        <boxGeometry args={[1.85, 0.05, 0.38]} />
        <meshStandardMaterial color={colors.dark} metalness={0.2} roughness={0.45} />
      </mesh>
      <mesh position={[-0.9, 0.2, -2.45]} castShadow>
        <boxGeometry args={[0.06, 0.22, 0.4]} />
        <meshStandardMaterial color={colors.accent} />
      </mesh>
      <mesh position={[0.9, 0.2, -2.45]} castShadow>
        <boxGeometry args={[0.06, 0.22, 0.4]} />
        <meshStandardMaterial color={colors.accent} />
      </mesh>
      {/* Chassis / tub */}
      <mesh position={[0, 0.38, -0.15]} castShadow>
        <boxGeometry args={[0.72, 0.28, 2.1]} />
        <meshStandardMaterial color={colors.body} metalness={0.3} roughness={0.38} />
      </mesh>
      <mesh position={[0, 0.22, -0.2]} castShadow>
        <boxGeometry args={[1.15, 0.12, 2.4]} />
        <meshStandardMaterial color={colors.dark} roughness={0.6} />
      </mesh>
      {/* Sidepods */}
      <mesh position={[-0.55, 0.36, 0.15]} castShadow>
        <boxGeometry args={[0.42, 0.32, 1.5]} />
        <meshStandardMaterial color={colors.body} metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0.55, 0.36, 0.15]} castShadow>
        <boxGeometry args={[0.42, 0.32, 1.5]} />
        <meshStandardMaterial color={colors.body} metalness={0.3} roughness={0.4} />
      </mesh>
      {/* Halo + cockpit */}
      <mesh position={[0, 0.62, -0.35]} castShadow>
        <boxGeometry args={[0.55, 0.08, 0.85]} />
        <meshStandardMaterial color="#c5c8ce" metalness={0.7} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.72, -0.55]}>
        <sphereGeometry args={[0.16, 10, 8]} />
        <meshStandardMaterial color={colors.accent} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.72, -0.62]}>
        <boxGeometry args={[0.18, 0.08, 0.08]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      {/* Engine cover / shark fin */}
      <mesh position={[0, 0.55, 0.85]} castShadow>
        <boxGeometry args={[0.5, 0.38, 1.2]} />
        <meshStandardMaterial color={colors.body} metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.82, 1.05]} castShadow>
        <boxGeometry args={[0.05, 0.28, 0.7]} />
        <meshStandardMaterial color={colors.dark} />
      </mesh>
      {/* Rear wing */}
      <mesh position={[0, 0.95, 1.7]} castShadow>
        <boxGeometry args={[1.55, 0.07, 0.32]} />
        <meshStandardMaterial color={colors.dark} metalness={0.25} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.78, 1.7]} castShadow>
        <boxGeometry args={[1.45, 0.05, 0.26]} />
        <meshStandardMaterial color={colors.accent} />
      </mesh>
      <mesh position={[-0.76, 0.7, 1.7]} castShadow>
        <boxGeometry args={[0.06, 0.55, 0.36]} />
        <meshStandardMaterial color={colors.body} />
      </mesh>
      <mesh position={[0.76, 0.7, 1.7]} castShadow>
        <boxGeometry args={[0.06, 0.55, 0.36]} />
        <meshStandardMaterial color={colors.body} />
      </mesh>
      <group ref={wheels}>
        <Wheel position={[-0.78, 0.34, -1.35]} />
        <Wheel position={[0.78, 0.34, -1.35]} />
        <Wheel position={[-0.82, 0.36, 1.15]} scale={1.08} />
        <Wheel position={[0.82, 0.36, 1.15]} scale={1.08} />
      </group>
    </group>
  );
}
