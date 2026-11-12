'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Lightformer, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const CRIMSON = '#8B253B';
const ROSE = '#E35D7A';

function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // points on a thick spherical shell
      const r = 3.2 + Math.random() * 4.5;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      p[i * 3] = r * Math.sin(ph) * Math.cos(th);
      p[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      p[i * 3 + 2] = r * Math.cos(ph);
    }
    return p;
  }, [count]);

  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#F5F5F5" transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function Core() {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);

  useFrame((state, d) => {
    const { pointer } = state;
    const scroll = Math.min(window.scrollY / window.innerHeight, 1.5);
    if (group.current) {
      // Follow the pointer, and drift/tilt away as the page scrolls
      group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, pointer.x * 0.5 + scroll * 1.2, 3, d);
      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -pointer.y * 0.35 + scroll * 0.3, 3, d);
      group.current.position.y = THREE.MathUtils.damp(group.current.position.y, scroll * 1.6, 4, d);
    }
    if (shell.current) {
      shell.current.rotation.x += d * 0.08;
      shell.current.rotation.y -= d * 0.12;
    }
    if (ring1.current) ring1.current.rotation.z += d * 0.25;
    if (ring2.current) ring2.current.rotation.z -= d * 0.18;
  });

  return (
    <group ref={group}>
      <Float speed={1.6} rotationIntensity={0.6} floatIntensity={0.9}>
        <mesh>
          <icosahedronGeometry args={[1.35, 64]} />
          <MeshDistortMaterial color={CRIMSON} distort={0.38} speed={1.8} roughness={0.12} metalness={0.85} envMapIntensity={1.4} />
        </mesh>

        <mesh ref={shell} scale={1.95}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#F5F5F5" wireframe transparent opacity={0.08} />
        </mesh>

        <mesh ref={ring1} rotation={[Math.PI / 2.3, 0.2, 0]}>
          <torusGeometry args={[2.45, 0.008, 16, 200]} />
          <meshBasicMaterial color={ROSE} transparent opacity={0.9} toneMapped={false} />
        </mesh>
        <mesh ref={ring2} rotation={[Math.PI / 1.7, -0.5, 0.4]}>
          <torusGeometry args={[2.85, 0.004, 16, 200]} />
          <meshBasicMaterial color="#F5F5F5" transparent opacity={0.35} />
        </mesh>
        {/* satellite */}
        <group rotation={[Math.PI / 2.3, 0.2, 0]}>
          <Satellite />
        </group>
      </Float>
    </group>
  );
}

function Satellite() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 0.6;
    if (ref.current) ref.current.position.set(Math.cos(t) * 2.45, Math.sin(t) * 2.45, 0);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.07, 24, 24]} />
      <meshBasicMaterial color={ROSE} toneMapped={false} />
    </mesh>
  );
}

export default function HeroScene({ active, compact }: { active: boolean; compact: boolean }) {
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7.5], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.25} />
      <pointLight position={[-4, 2, 3]} intensity={40} color={ROSE} />
      <directionalLight position={[4, 4, 2]} intensity={1.6} color="#ffffff" />

      <group position={compact ? [0, 0.6, -1.5] : [2.2, 0, 0]}>
        <Core />
      </group>
      <Particles count={compact ? 700 : 1600} />

      {/* Studio reflections built from light panels — no external HDR download */}
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={3} position={[0, 4, -6]} scale={[10, 2, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={6} position={[-5, 0, 2]} scale={[2, 8, 1]} color={ROSE} />
        <Lightformer form="ring" intensity={4} position={[5, 1, 3]} scale={3} color="#ffffff" />
      </Environment>
    </Canvas>
  );
}
