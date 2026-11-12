'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

// Bandung, Indonesia
const LAT = -6.9;
const LON = 107.6;

function latLon(lat: number, lon: number, r: number) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon + 180);
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
}

function Globe() {
  const group = useRef<THREE.Group>(null);
  const pulse = useRef<THREE.Mesh>(null);

  // Fibonacci-sphere dot cloud
  const dots = useMemo(() => {
    const n = 1400;
    const p = new Float32Array(n * 3);
    const g = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      p[i * 3] = Math.cos(g * i) * r * 1.5;
      p[i * 3 + 1] = y * 1.5;
      p[i * 3 + 2] = Math.sin(g * i) * r * 1.5;
    }
    return p;
  }, []);

  const home = useMemo(() => latLon(LAT, LON, 1.5), []);
  const arcs = useMemo(() => {
    // arcs from Bandung to a few hubs — "flexible across time zones"
    const targets = [
      [51.5, -0.1],
      [40.7, -74],
      [35.7, 139.7],
      [25.2, 55.3],
      [38.6, 68.8],
    ];
    return targets.map(([la, lo]) => {
      const end = latLon(la, lo, 1.5);
      const mid = home.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(2.3);
      return new THREE.QuadraticBezierCurve3(home, mid, end).getPoints(48);
    });
  }, [home]);

  // Orient the pulse ring flat against the globe surface
  const ringFacing = useMemo(
    () => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), home.clone().normalize()),
    [home],
  );

  // Face Bandung toward the camera initially
  const initialY = useMemo(() => -THREE.MathUtils.degToRad(LON + 90), []);

  useFrame(({ clock }, d) => {
    if (group.current) group.current.rotation.y += d * 0.12;
    if (pulse.current) {
      const s = 1 + ((clock.elapsedTime * 0.8) % 1) * 3;
      pulse.current.scale.setScalar(s);
      (pulse.current.material as THREE.MeshBasicMaterial).opacity = 1 - ((clock.elapsedTime * 0.8) % 1);
    }
  });

  return (
    <group rotation={[0.35, 0, 0]}>
      <group ref={group} rotation={[0, initialY, 0]}>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[dots, 3]} />
          </bufferGeometry>
          <pointsMaterial size={0.022} color="#F5F5F5" transparent opacity={0.45} sizeAttenuation />
        </points>
        <mesh>
          <sphereGeometry args={[1.48, 48, 48]} />
          <meshBasicMaterial color="#111111" />
        </mesh>
        {arcs.map((pts, i) => (
          <Line key={i} points={pts} color="#E35D7A" lineWidth={1.2} transparent opacity={0.8} />
        ))}
        <mesh position={home}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#E35D7A" />
        </mesh>
        <mesh ref={pulse} position={home} quaternion={ringFacing}>
          <ringGeometry args={[0.05, 0.065, 32]} />
          <meshBasicMaterial color="#E35D7A" transparent side={THREE.DoubleSide} />
        </mesh>
      </group>
      {/* atmosphere halo */}
      <mesh scale={1.62}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial color="#8B253B" transparent opacity={0.08} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

export default function GlobeScene({ active }: { active: boolean }) {
  return (
    <Canvas frameloop={active ? 'always' : 'never'} dpr={[1, 1.75]} camera={{ position: [0, 0, 4.4], fov: 45 }} gl={{ alpha: true }}>
      <Globe />
    </Canvas>
  );
}
