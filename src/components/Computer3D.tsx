'use client'

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import React, { Suspense } from 'react';
import * as THREE from 'three';

// Helper component to load the GLB and map an image or video to the screen
function ComputerModelWithMedia({ mediaUrl, isVideo, videoElement }: { mediaUrl: string, isVideo: boolean, videoElement?: HTMLVideoElement | null }) {
  const gltf = useGLTF('/glb/laptop.glb');
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const screenNode = gltf.nodes['screen glass_screen_0'] as THREE.Mesh;

  // Responsive scale
  const [scale, setScale] = useState<[number, number, number]>([6, 6, 6]);
  // Responsive plane size for screen
  const [planeSize, setPlaneSize] = useState<[number, number]>([1.14, 0.7]);
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 640) {
        setScale([4, 4, 4]); // phone
        setPlaneSize([0.28, 0.17]); // phone screen size
      } else if (window.innerWidth <= 1024) {
        setScale([4.5, 4.5, 4.5]); // tablet
        setPlaneSize([0.85, 0.52]); // tablet screen size
      } else {
        setScale([6, 6, 6]); // laptop/desktop
        setPlaneSize([0.3, 0.17]); // laptop screen size
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Hide the original screen mesh
  React.useEffect(() => {
    if (screenNode) {
      screenNode.visible = false;
    }
  }, [screenNode]);

  // Set up texture for image or video
  React.useEffect(() => {
    if (isVideo && videoElement) {
      const videoTexture = new THREE.VideoTexture(videoElement);
      videoTexture.minFilter = THREE.LinearFilter;
      videoTexture.magFilter = THREE.LinearFilter;
      videoTexture.format = THREE.RGBAFormat;
      setTexture(videoTexture);
    } else if (!isVideo && mediaUrl) {
      const imgTexture = new THREE.TextureLoader().load(mediaUrl);
      setTexture(imgTexture);
    }
  }, [mediaUrl, isVideo, videoElement]);

  // Default values in case screenNode is missing
  let rotation: [number, number, number] = [0, 0, 0];
  let position: [number, number, number] = [0.1, 0.57, 0.02];
  
  function handleResponsivePosition() {
    if(window.innerWidth <= 640) {
      // phone
      position = [0.02, 0.54, 0.02];
    } else if(window.innerWidth <= 1024) {
      // tablet
      position = [0.11, 0.57, 0.02];
    } else {
      // laptop
      position = [0.12, 0.57, 0.02];
    }
  }
  handleResponsivePosition();
  if (screenNode) {
    position = [
      screenNode.position.x,
      screenNode.position.y - 0.3,
      screenNode.position.z + 0.003
    ];
    rotation = [screenNode.rotation.x, screenNode.rotation.y, screenNode.rotation.z];
  }

  return (
    <group dispose={null}>
      <primitive object={gltf.scene} scale={scale} position={[-0.2, 0.5, 0]} />
      {texture && (
        <mesh position={position} rotation={rotation} scale={scale}>
          {/* Adjust the screen size for the demo video here. Change planeSize for different devices. */}
          <planeGeometry args={planeSize} />
          <meshBasicMaterial
            map={texture}
            toneMapped={false}
            transparent={true}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}

function AnimatedCamera() {
  const { camera } = useThree();
  const targetPosition = new THREE.Vector3(0, 1, 3);
  const startPosition = new THREE.Vector3(0, 1, -5);
  const progress = useRef(0);

  useEffect(() => {
    camera.position.copy(startPosition);
  }, [camera]);

  useFrame((_, delta) => {
    if (progress.current < 1) {
      progress.current += delta * 0.7;
      if (progress.current > 1) progress.current = 1;
      camera.position.lerpVectors(startPosition, targetPosition, progress.current);
      camera.lookAt(0, 0, 0);
    }
  });

  return null;
}

export default function Computer3D({ imageUrl }: { imageUrl?: string }) {
  const [isVideo, setIsVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const mediaUrl = imageUrl || "/images/about_1.png";

  useEffect(() => {
    // Check if the url is a video
    setIsVideo(/\.(mp4|webm|mov)$/i.test(mediaUrl));
  }, [mediaUrl]);

  useEffect(() => {
    if (isVideo && videoRef.current) {
      const video = videoRef.current;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.then(() => setVideoReady(true)).catch(() => setVideoReady(false));
      } else {
        setVideoReady(true);
      }
    }
  }, [isVideo, mediaUrl]);

  return (
    <div style={{ width: '100%', height: '59vh', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
      {/* Hidden video element for video texture */}
      {isVideo && (
        <video
          ref={videoRef}
          src={mediaUrl}
          style={{ display: 'none' }}
          loop
          muted
          playsInline
          autoPlay
          crossOrigin="anonymous"
        />
      )}
      <Canvas camera={{ position: [0, 1, 3], fov: 45 }} shadows>
        <AnimatedCamera />
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 7]} intensity={1} />
        <Suspense fallback={null}>
          <ComputerModelWithMedia mediaUrl={mediaUrl} isVideo={isVideo} videoElement={isVideo ? videoRef.current : undefined} />
        </Suspense>
        <OrbitControls enablePan enableZoom enableRotate />
      </Canvas>
    </div>
  );
}

// Required for useGLTF
useGLTF.preload('/glb/laptop.glb'); 
