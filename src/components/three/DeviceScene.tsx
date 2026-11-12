'use client';

import { Suspense, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  PresentationControls,
  RoundedBox,
  useTexture,
  useVideoTexture,
} from '@react-three/drei';
import * as THREE from 'three';
import type { Media, Project } from '@/lib/data';

const CRIMSON = '#8B253B';
const ROSE = '#E35D7A';

/** Rounded-rectangle shape centred on the origin. */
function roundedRect(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

/** Flat rounded-rect geometry with UVs normalised to 0..1 so a texture maps edge to edge. */
function useScreenGeometry(w: number, h: number, r: number) {
  return useMemo(() => {
    const g = new THREE.ShapeGeometry(roundedRect(w, h, r), 12);
    const pos = g.attributes.position;
    const uv = g.attributes.uv;
    for (let i = 0; i < pos.count; i++) uv.setXY(i, pos.getX(i) / w + 0.5, pos.getY(i) / h + 0.5);
    uv.needsUpdate = true;
    return g;
  }, [w, h, r]);
}

/** "object-fit: cover" for a texture of size iw×ih on a screen of aspect `sa`. */
function fitCover(tex: THREE.Texture, iw: number, ih: number, sa: number) {
  const ia = iw / ih || sa;
  tex.repeat.set(1, 1);
  tex.offset.set(0, 0);
  if (ia > sa) {
    tex.repeat.x = sa / ia;
    tex.offset.x = (1 - tex.repeat.x) / 2;
  } else {
    tex.repeat.y = ia / sa;
    tex.offset.y = (1 - tex.repeat.y) / 2;
  }
  tex.needsUpdate = true;
}

type ScreenSize = { w: number; h: number; r: number };

function VideoScreen({ src, w, h, r, active }: ScreenSize & { src: string; active: boolean }) {
  const tex = useVideoTexture(src, { muted: true, loop: true, playsInline: true, crossOrigin: 'anonymous', start: false });
  const geo = useScreenGeometry(w, h, r);

  useLayoutEffect(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    const v = tex.image as HTMLVideoElement;
    fitCover(tex, v.videoWidth, v.videoHeight, w / h);
  }, [tex, w, h]);

  // Only decode video while this screen is mounted and on-screen
  useEffect(() => {
    const v = tex.image as HTMLVideoElement;
    if (active) {
      v.currentTime = 0;
      v.play().catch(() => {});
    } else v.pause();
    return () => v.pause();
  }, [tex, active]);

  return (
    <mesh geometry={geo}>
      <meshBasicMaterial map={tex} toneMapped={false} />
    </mesh>
  );
}

/** Screenshot slideshow: crossfades to the next screenshot whenever `slide` changes. */
function SlidesScreen({ srcs, slide, w, h, r }: ScreenSize & { srcs: string[]; slide: number }) {
  const textures = useTexture(srcs);
  const geo = useScreenGeometry(w, h, r);
  const gl = useThree((st) => st.gl);
  const base = useRef<THREE.MeshBasicMaterial>(null);
  const top = useRef<THREE.MeshBasicMaterial>(null);
  const anim = useRef({ from: slide, to: slide, t: 1 });

  useLayoutEffect(() => {
    const aniso = gl.capabilities.getMaxAnisotropy();
    textures.forEach((tx) => {
      tx.colorSpace = THREE.SRGBColorSpace;
      tx.anisotropy = Math.min(8, aniso);
      const img = tx.image as HTMLImageElement;
      fitCover(tx, img.width, img.height, w / h);
    });
  }, [textures, w, h, gl]);

  useEffect(() => {
    const a = anim.current;
    if (a.to === slide) return;
    a.from = a.to;
    a.to = slide;
    a.t = 0;
  }, [slide]);

  useFrame((_, d) => {
    const a = anim.current;
    a.t = Math.min(1, a.t + d * 1.4);
    const e = 1 - Math.pow(1 - a.t, 3);
    if (base.current) base.current.map = textures[a.from % textures.length];
    if (top.current) {
      top.current.map = textures[a.to % textures.length];
      top.current.opacity = e;
    }
  });

  return (
    <group>
      <mesh geometry={geo}>
        <meshBasicMaterial ref={base} map={textures[slide % textures.length]} toneMapped={false} />
      </mesh>
      <mesh geometry={geo} position-z={0.0005}>
        <meshBasicMaterial ref={top} map={textures[slide % textures.length]} toneMapped={false} transparent />
      </mesh>
    </group>
  );
}

function ScreenPlaceholder({ w, h, r }: { w: number; h: number; r: number }) {
  const geo = useScreenGeometry(w, h, r);
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  useFrame(({ clock }) => {
    if (mat.current) mat.current.opacity = 0.35 + Math.sin(clock.elapsedTime * 4) * 0.25;
  });
  return (
    <mesh geometry={geo}>
      <meshBasicMaterial ref={mat} color={CRIMSON} transparent toneMapped={false} />
    </mesh>
  );
}

type ScreenProps = ScreenSize & { media: Media; slide: number; active: boolean };

function Screen({ media, slide, active, ...size }: ScreenProps) {
  return (
    <Suspense fallback={<ScreenPlaceholder {...size} />}>
      {media.type === 'video' ? (
        <VideoScreen src={media.src} active={active} {...size} />
      ) : (
        <SlidesScreen srcs={media.slides.map((s) => s.src)} slide={slide} {...size} />
      )}
    </Suspense>
  );
}

/** Extruded rounded slab lying flat (thickness along Y), centred on the origin. */
function useSlab(w: number, d: number, r: number, thickness: number, flat = true) {
  return useMemo(() => {
    const bevel = Math.min(0.012, thickness / 4);
    const g = new THREE.ExtrudeGeometry(roundedRect(w - bevel * 2, d - bevel * 2, r), {
      depth: thickness - bevel * 2,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 4,
      curveSegments: 20,
    });
    g.center();
    if (flat) g.rotateX(-Math.PI / 2);
    return g;
  }, [w, d, r, thickness, flat]);
}

function useFlatRounded(w: number, h: number, r: number) {
  return useMemo(() => {
    const g = new THREE.ShapeGeometry(roundedRect(w, h, r), 12);
    g.rotateX(-Math.PI / 2);
    return g;
  }, [w, h, r]);
}

// MacBook-style silver aluminium
const aluminium = { color: '#c3c5ca', metalness: 0.82, roughness: 0.3 } as const;

type Key = { x: number; z: number; w: number; d: number };

function Keyboard() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const keys = useMemo(() => {
    const k: Key[] = [];
    const cx = (c: number) => (c - 6.5) * 0.2;
    for (let c = 0; c < 14; c++) k.push({ x: cx(c), z: -0.83, w: 0.17, d: 0.08 }); // function row
    [-0.68, -0.49, -0.3, -0.11].forEach((z) => {
      for (let c = 0; c < 14; c++) k.push({ x: cx(c), z, w: 0.17, d: 0.16 });
    });
    for (const c of [0, 1, 2, 3, 10, 11, 12, 13]) k.push({ x: cx(c), z: 0.08, w: 0.17, d: 0.16 });
    k.push({ x: 0, z: 0.08, w: 1.17, d: 0.16 }); // space bar
    return k;
  }, []);

  useLayoutEffect(() => {
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    keys.forEach((k, i) => {
      m.compose(new THREE.Vector3(k.x, 0, k.z), q, new THREE.Vector3(k.w, 1, k.d));
      ref.current!.setMatrixAt(i, m);
    });
    ref.current!.instanceMatrix.needsUpdate = true;
  }, [keys]);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, keys.length]} position={[0, 0.089, 0]}>
      <boxGeometry args={[1, 0.014, 1]} />
      <meshStandardMaterial color="#0b0b0c" roughness={0.55} metalness={0.15} />
    </instancedMesh>
  );
}

/** Perforated speaker grilles either side of the keyboard. */
function SpeakerGrilles() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const cols = 4;
  const rows = 34;
  useLayoutEffect(() => {
    const m = new THREE.Matrix4();
    let i = 0;
    for (const side of [-1, 1])
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++) {
          m.makeTranslation(side * (1.55 + (c - 1.5) * 0.03), 0, -0.88 + r * 0.03);
          ref.current!.setMatrixAt(i++, m);
        }
    ref.current!.instanceMatrix.needsUpdate = true;
  }, []);
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, cols * rows * 2]} position={[0, 0.0805, 0]}>
      <cylinderGeometry args={[0.007, 0.007, 0.002, 8]} />
      <meshBasicMaterial color="#2a2b2e" />
    </instancedMesh>
  );
}

function Laptop({ media, slide, active, progress }: { media: Media; slide: number; active: boolean; progress: React.RefObject<number> }) {
  const lid = useRef<THREE.Group>(null);
  const base = useSlab(3.4, 2.4, 0.16, 0.08);
  const lidSlab = useSlab(3.4, 2.15, 0.16, 0.04, false);
  const well = useFlatRounded(2.86, 1.13, 0.05);
  const trackpad = useFlatRounded(1.5, 0.8, 0.05);
  const bezel = useScreenGeometry(3.36, 2.11, 0.14);

  useFrame(() => {
    // lid opens slightly after the device has spun in
    const p = THREE.MathUtils.clamp((progress.current - 0.25) / 0.75, 0, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    if (lid.current) lid.current.rotation.x = THREE.MathUtils.lerp(Math.PI / 2, -0.24, eased);
  });

  return (
    <group position={[0, -1.03, 0.2]}>
      {/* unibody base */}
      <mesh geometry={base} position={[0, 0.04, 0]}>
        <meshStandardMaterial {...aluminium} />
      </mesh>
      {/* recessed keyboard well */}
      <mesh geometry={well} position={[0, 0.0802, -0.37]}>
        <meshStandardMaterial color="#77797e" metalness={0.7} roughness={0.45} />
      </mesh>
      <Keyboard />
      <SpeakerGrilles />
      {/* glass trackpad */}
      <mesh geometry={trackpad} position={[0, 0.0802, 0.7]}>
        <meshStandardMaterial color="#b4b6bb" metalness={0.6} roughness={0.18} />
      </mesh>
      {/* hinge */}
      <mesh position={[0, 0.07, -1.17]} rotation-z={Math.PI / 2}>
        <cylinderGeometry args={[0.035, 0.035, 2.7, 24]} />
        <meshStandardMaterial color="#1d1e21" metalness={0.6} roughness={0.4} />
      </mesh>

      <group ref={lid} position={[0, 0.085, -1.17]} rotation-x={Math.PI / 2}>
        <mesh geometry={lidSlab} position={[0, 1.075, 0]}>
          <meshStandardMaterial {...aluminium} />
        </mesh>
        {/* edge-to-edge black glass bezel */}
        <mesh geometry={bezel} position={[0, 1.075, 0.0205]}>
          <meshStandardMaterial color="#030303" metalness={0.3} roughness={0.08} />
        </mesh>
        {/* 16:9 display — matches the screenshots and demo videos, so nothing gets cropped */}
        <group position={[0, 1.145, 0.0215]}>
          <Screen media={media} slide={slide} w={3.22} h={1.811} r={0.03} active={active} />
        </group>
        <mesh position={[0, 2.1, 0.0212]}>
          <circleGeometry args={[0.012, 16]} />
          <meshBasicMaterial color="#1c1c1c" />
        </mesh>
        {/* brand mark on the back of the lid */}
        <mesh position={[0, 1.075, -0.0205]} rotation-y={Math.PI}>
          <circleGeometry args={[0.12, 48]} />
          <meshStandardMaterial color={CRIMSON} metalness={0.9} roughness={0.15} emissive={CRIMSON} emissiveIntensity={0.4} />
        </mesh>
      </group>
    </group>
  );
}

// Phone screenshots / recordings are ~720×1550 (aspect ≈ 0.4645). The display uses that exact
// aspect so nothing is cropped, and the body is sized around it.
const PHONE_SCREEN_ASPECT = 0.4645;
const PHONE_SCREEN_W = 1.1;
const PHONE_SCREEN_H = PHONE_SCREEN_W / PHONE_SCREEN_ASPECT; // ≈ 2.368
const PHONE_SIDE_BORDER = 0.035; // thin black glass on the sides
const PHONE_END_BORDER = 0.09; // slightly thicker black glass top and bottom

function Phone({ media, slide, active }: { media: Media; slide: number; active: boolean }) {
  const bevel = 0.02;
  // outer face = glass size; the extruded shape is inset by the bevel
  const faceW = PHONE_SCREEN_W + PHONE_SIDE_BORDER * 2;
  const faceH = PHONE_SCREEN_H + PHONE_END_BORDER * 2;
  const body = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(roundedRect(faceW - bevel * 2, faceH - bevel * 2, 0.17), {
      depth: 0.07,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 6,
      curveSegments: 24,
    });
    g.center();
    return g;
  }, [faceW, faceH]);
  const glass = useScreenGeometry(faceW - 0.012, faceH - 0.012, 0.18);

  return (
    <group rotation={[0, 0, 0.04]}>
      <mesh geometry={body}>
        <meshStandardMaterial color="#3a1420" metalness={0.95} roughness={0.25} />
      </mesh>
      {/* black front glass — forms the border around the display */}
      <mesh geometry={glass} position={[0, 0, 0.0555]}>
        <meshStandardMaterial color="#030303" metalness={0.3} roughness={0.08} />
      </mesh>
      <group position={[0, 0, 0.0565]}>
        <Screen media={media} slide={slide} w={PHONE_SCREEN_W} h={PHONE_SCREEN_H} r={0.12} active={active} />
      </group>
      {/* camera module on the back */}
      <RoundedBox args={[0.42, 0.42, 0.04]} radius={0.015} position={[-0.24, faceH / 2 - 0.32, -0.07]}>
        <meshStandardMaterial color="#2a0e17" metalness={0.9} roughness={0.2} />
      </RoundedBox>
    </group>
  );
}

/** Mounted fresh per project (keyed), animates itself in. */
function Device({ project, slide, active }: { project: Project; slide: number; active: boolean }) {
  const group = useRef<THREE.Group>(null);
  const progress = useRef(0);
  const { viewport } = useThree();
  const target = project.device === 'laptop' ? Math.min(1, viewport.width / 4.1) : Math.min(0.95, viewport.height / 3.4);

  useFrame((_, d) => {
    progress.current = Math.min(progress.current + d * 0.9, 1);
    const e = 1 - Math.pow(1 - progress.current, 4);
    if (!group.current) return;
    group.current.rotation.y = (1 - e) * -Math.PI * 0.9 + (project.device === 'laptop' ? -0.32 : 0.28);
    group.current.position.y = (1 - e) * -0.6;
    group.current.scale.setScalar(target * (0.75 + 0.25 * e));
  });

  return (
    <group ref={group}>
      {project.device === 'laptop' ? (
        <Laptop media={project.media} slide={slide} active={active} progress={progress} />
      ) : (
        <Phone media={project.media} slide={slide} active={active} />
      )}
    </group>
  );
}

function Pedestal() {
  const ring = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (ring.current) ring.current.rotation.z += d * 0.3;
  });
  return (
    <group position={[0, -1.32, 0]} rotation-x={-Math.PI / 2}>
      <mesh>
        <circleGeometry args={[2.3, 64]} />
        <meshBasicMaterial color={CRIMSON} transparent opacity={0.08} />
      </mesh>
      <mesh>
        <ringGeometry args={[2.25, 2.29, 128]} />
        <meshBasicMaterial color={ROSE} toneMapped={false} />
      </mesh>
      <mesh ref={ring}>
        <ringGeometry args={[2.45, 2.47, 128, 1, 0, Math.PI * 1.3]} />
        <meshBasicMaterial color="#F5F5F5" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

function LookAt() {
  const { camera } = useThree();
  useEffect(() => camera.lookAt(0, -0.15, 0), [camera]);
  return null;
}

export default function DeviceScene({
  project,
  index,
  slide,
  active,
}: {
  project: Project;
  index: number;
  slide: number;
  active: boolean;
}) {
  return (
    <Canvas frameloop={active ? 'always' : 'never'} dpr={[1, 1.75]} camera={{ position: [0, 1.1, 7], fov: 34 }} gl={{ alpha: true, antialias: true }}>
      <LookAt />
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 5, 4]} intensity={1.6} />
      <pointLight position={[-3, 1, 2]} intensity={25} color={ROSE} />

      <PresentationControls
        global={false}
        cursor={false}
        snap
        speed={1.4}
        polar={[-0.15, 0.35]}
        azimuth={[-0.9, 0.9]}
      >
        <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.5} floatingRange={[-0.05, 0.08]}>
          <Device key={index} project={project} slide={slide} active={active} />
        </Float>
      </PresentationControls>

      <Pedestal />
      <ContactShadows position={[0, -1.31, 0]} opacity={0.6} scale={8} blur={2.6} far={2.5} color="#000" />

      <Environment resolution={256}>
        <Lightformer form="rect" intensity={3} position={[0, 5, -4]} scale={[10, 3, 1]} />
        <Lightformer form="rect" intensity={5} position={[-5, 1, 1]} scale={[2, 6, 1]} color={ROSE} />
        <Lightformer form="rect" intensity={2} position={[5, 2, 3]} scale={[3, 5, 1]} />
      </Environment>
    </Canvas>
  );
}
