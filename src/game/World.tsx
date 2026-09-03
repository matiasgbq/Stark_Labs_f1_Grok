import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { F1Car } from "./Car";
import { FIXED_DT } from "./constants";
import { getWorld, stepSim } from "./sim";
import {
  barrierPosts,
  makeAsphalt,
  makeCurbs,
  makeRunoff,
  scatterOutside,
} from "./track";

const _cam = new THREE.Vector3();
const _look = new THREE.Vector3();
const _fwd = new THREE.Vector3();
const dummy = new THREE.Object3D();

function InstancedFromMatrices({
  matrices,
  geometry,
  material,
  cast = false,
}: {
  matrices: THREE.Matrix4[];
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
  cast?: boolean;
}) {
  const ref = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    matrices.forEach((m, i) => mesh.setMatrixAt(i, m));
    mesh.instanceMatrix.needsUpdate = true;
  }, [matrices]);
  return (
    <instancedMesh ref={ref} args={[geometry, material, matrices.length]} castShadow={cast} receiveShadow />
  );
}

function Trees() {
  const pts = useMemo(() => scatterOutside(42, 18, 34, 3), []);
  const geo = useMemo(() => new THREE.ConeGeometry(1.4, 4.2, 6), []);
  const trunk = useMemo(() => new THREE.CylinderGeometry(0.22, 0.28, 1.1, 6), []);
  const leafMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#2f6b3a", flatShading: true }),
    [],
  );
  const trunkMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#4a3424", flatShading: true }),
    [],
  );
  const leafRef = useRef<THREE.InstancedMesh>(null);
  const trunkRef = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    pts.forEach((p, i) => {
      dummy.position.set(p.x, 2.4, p.z);
      dummy.rotation.set(0, p.rot, 0);
      dummy.scale.set(p.s, p.s, p.s);
      dummy.updateMatrix();
      leafRef.current?.setMatrixAt(i, dummy.matrix);
      dummy.position.set(p.x, 0.55, p.z);
      dummy.scale.set(p.s, 1, p.s);
      dummy.updateMatrix();
      trunkRef.current?.setMatrixAt(i, dummy.matrix);
    });
    if (leafRef.current) leafRef.current.instanceMatrix.needsUpdate = true;
    if (trunkRef.current) trunkRef.current.instanceMatrix.needsUpdate = true;
  }, [pts]);
  return (
    <>
      <instancedMesh ref={leafRef} args={[geo, leafMat, pts.length]} castShadow />
      <instancedMesh ref={trunkRef} args={[trunk, trunkMat, pts.length]} />
    </>
  );
}

function Grandstands() {
  return (
    <group>
      <mesh position={[18, 3.2, 20]} rotation={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[6, 6.4, 48]} />
        <meshStandardMaterial color="#cfd3d8" roughness={0.7} />
      </mesh>
      <mesh position={[-18, 2.6, 8]} rotation={[0, 0.08, 0]} castShadow receiveShadow>
        <boxGeometry args={[5.5, 5.2, 36]} />
        <meshStandardMaterial color="#b7bcc4" roughness={0.7} />
      </mesh>
      <mesh position={[0, 6.6, 72]} receiveShadow>
        <boxGeometry args={[18, 0.4, 1.2]} />
        <meshStandardMaterial color="#1a1c22" />
      </mesh>
      <mesh position={[-8.5, 3.3, 72]}>
        <boxGeometry args={[0.45, 6.6, 0.45]} />
        <meshStandardMaterial color="#2a2d34" />
      </mesh>
      <mesh position={[8.5, 3.3, 72]}>
        <boxGeometry args={[0.45, 6.6, 0.45]} />
        <meshStandardMaterial color="#2a2d34" />
      </mesh>
      {[-4, -1.3, 1.3, 4].map((x, i) => (
        <mesh key={x} position={[x, 6.35, 72]}>
          <sphereGeometry args={[0.28, 10, 8]} />
          <meshStandardMaterial
            color={i < 3 ? "#d32535" : "#5dcaa8"}
            emissive={i < 3 ? "#d32535" : "#5dcaa8"}
            emissiveIntensity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

function TrackMesh() {
  const asphalt = useMemo(() => makeAsphalt(), []);
  const curbs = useMemo(() => makeCurbs(), []);
  const runoff = useMemo(() => makeRunoff(), []);
  const posts = useMemo(() => barrierPosts(), []);
  const postGeo = useMemo(() => new THREE.BoxGeometry(0.18, 1.1, 1.4), []);
  const postMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#d8dbe0", metalness: 0.15, roughness: 0.55 }),
    [],
  );
  return (
    <group>
      <mesh geometry={runoff} receiveShadow>
        <meshStandardMaterial color="#3b7a3f" roughness={0.95} />
      </mesh>
      <mesh geometry={asphalt} receiveShadow>
        <meshStandardMaterial color="#3a3e46" roughness={0.78} metalness={0.06} />
      </mesh>
      <mesh geometry={curbs} receiveShadow>
        <meshStandardMaterial vertexColors roughness={0.45} />
      </mesh>
      <InstancedFromMatrices matrices={posts} geometry={postGeo} material={postMat} />
      {/* start/finish paint */}
      <mesh position={[0, 0.04, 70]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14.8, 2.4]} />
        <meshStandardMaterial color="#e8eaee" roughness={0.6} />
      </mesh>
    </group>
  );
}

function ChaseCam() {
  const { camera } = useThree();
  const fov = useRef(62);
  const primed = useRef(false);
  useFrame((_, dt) => {
    const w = getWorld();
    const p = w.player;
    const fx = -Math.sin(p.yaw);
    const fz = -Math.cos(p.yaw);
    _fwd.set(fx, 0, fz);
    const dist = 8.4 + Math.min(3.2, Math.abs(p.speed) * 0.03);
    const height = 2.6 + Math.min(1.1, Math.abs(p.speed) * 0.012);
    _cam.set(p.x, 0, p.z).addScaledVector(_fwd, -dist);
    _cam.y = height;
    const shake = w.trauma * w.trauma;
    if (shake > 0.002) {
      _cam.x += (Math.random() - 0.5) * shake * 0.7;
      _cam.y += (Math.random() - 0.5) * shake * 0.35;
    }
    const persp = camera as THREE.PerspectiveCamera;
    if (!primed.current) {
      camera.position.copy(_cam);
      primed.current = true;
    } else {
      camera.position.lerp(_cam, 1 - Math.exp(-3.4 * dt));
    }
    _look.set(p.x, 0.7, p.z).addScaledVector(_fwd, 6.5);
    camera.lookAt(_look);
    const targetFov = 58 + Math.min(16, Math.abs(p.speed) * 0.22);
    fov.current += (targetFov - fov.current) * (1 - Math.exp(-3 * dt));
    persp.fov = fov.current;
    persp.updateProjectionMatrix();
  });
  return null;
}

function SimTicker() {
  const acc = useRef(0);
  useFrame((_, dt) => {
    const d = Math.min(dt, 0.1);
    acc.current += d;
    const STEP = FIXED_DT;
    let guard = 0;
    while (acc.current >= STEP && guard++ < 8) {
      stepSim(STEP);
      acc.current -= STEP;
    }
  });
  return null;
}

export function World() {
  return (
    <>
      <color attach="background" args={["#6d8aa8"]} />
      <fog attach="fog" args={["#6d8aa8", 70, 340]} />
      <hemisphereLight args={["#ffd9b0", "#3d4a38", 0.7]} />
      <directionalLight
        position={[70, 48, 28]}
        intensity={1.55}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={2}
        shadow-camera-far={260}
        shadow-camera-left={-80}
        shadow-camera-right={80}
        shadow-camera-top={80}
        shadow-camera-bottom={-80}
      />
      <ambientLight intensity={0.22} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <circleGeometry args={[420, 48]} />
        <meshStandardMaterial color="#3a7d42" roughness={1} />
      </mesh>
      <TrackMesh />
      <Trees />
      <Grandstands />
      <F1Car livery="alpine" car={() => getWorld().player} />
      <F1Car livery="navy" car={() => getWorld().max} />
      <F1Car livery="papaya" car={() => getWorld().oscar} />
      <ChaseCam />
      <SimTicker />
    </>
  );
}
