'use client'

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import React, { Suspense } from 'react';
import * as THREE from 'three';

function PhoneModelWithMedia({ mediaUrl, isVideo, videoElement }: { mediaUrl: string, isVideo: boolean, videoElement?: HTMLVideoElement | null }) {
  const gltf = useGLTF('/glb/iphone.glb');
  const groupRef = useRef<THREE.Group>(null);
  const screenNode = gltf.nodes['xXDHkMplTIDAXLN'] as THREE.Mesh;
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [animProgress, setAnimProgress] = useState(0);
  const prevVideoElement = useRef<HTMLVideoElement | null>(null);

  // Responsive scale
  const [scale, setScale] = useState<[number, number, number]>([15, 15, 15]);
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 640) {
        setScale([9, 9, 9]); // phone
      } else if (window.innerWidth <= 1024) {
        setScale([11, 11, 11]); // tablet
      } else {
        setScale([15, 15, 15]); // laptop/desktop
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Set up texture for image or video
  useEffect(() => {
    if (isVideo && videoElement) {
      // Only create new texture if video element changed
      if (prevVideoElement.current !== videoElement) {
        console.log('[Phone3D] Creating VideoTexture for', mediaUrl, videoElement);
        const videoTexture = new THREE.VideoTexture(videoElement);
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        videoTexture.format = THREE.RGBAFormat;
        setTexture(videoTexture);
        prevVideoElement.current = videoElement;
      }
    } else if (!isVideo && mediaUrl) {
      console.log('[Phone3D] Loading image texture for', mediaUrl);
      const imgTexture = new THREE.TextureLoader().load(mediaUrl);
      setTexture(imgTexture);
      prevVideoElement.current = null;
    }
  }, [mediaUrl, isVideo, videoElement]);

  // Apply texture to the screen material
  useEffect(() => {
    if (screenNode && texture) {
      console.log('[Phone3D] Applying texture to screenNode', texture);
      screenNode.material = new THREE.MeshBasicMaterial({
        map: texture,
        toneMapped: false,
        transparent: true,
        side: THREE.DoubleSide,
      });
      screenNode.material.needsUpdate = true;
    }
  }, [screenNode, texture]);
  
  // Entrance animation
  useFrame((_, delta) => {
    if (animProgress < 1) {
      setAnimProgress((prev) => Math.min(prev + delta * 0.7, 1));
    }
    if (groupRef.current) {
      const startX = 2, endX = 0.5;
      const startRot = Math.PI, endRot = Math.PI;
      groupRef.current.position.x = startX + (endX - startX) * animProgress;
      groupRef.current.rotation.y = startRot + (endRot - startRot) * animProgress;
    }
  });

  return (
    <group dispose={null} ref={groupRef}>
      <primitive object={gltf.scene} scale={scale} position={[0.5, 0, 0]} />
    </group>
  );
}

export default function Phone3D({ imageUrl }: { imageUrl?: string }) {
  const [isVideo, setIsVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaUrl = imageUrl || "/projects/random.jpeg";

  useEffect(() => {
    const videoCheck = /\.(mp4|webm|mov)$/i.test(mediaUrl);
    setIsVideo(videoCheck);
    setVideoReady(false); // Reset video ready state when media changes
    console.log('[Phone3D] mediaUrl changed:', mediaUrl, 'isVideo:', videoCheck);
  }, [mediaUrl]);
  
  useEffect(() => {
    if (isVideo && videoRef.current) {
      const video = videoRef.current;
      console.log('[Phone3D] Setting up video:', mediaUrl);
      
      // Reset video state
      video.currentTime = 0;
      
      const handleCanPlay = () => {
        console.log('[Phone3D] video can play');
        setVideoReady(true);
        
        // Small delay to ensure video is ready
        setTimeout(() => {
          video.play().then(() => {
            console.log('[Phone3D] video playing successfully');
          }).catch((error) => {
            console.error('[Phone3D] Video autoplay was prevented:', error);
          });
        }, 100);
      };

      const handleLoadedData = () => {
        console.log('[Phone3D] video data loaded');
      };

      const handleError = (e: Event) => {
        console.error('[Phone3D] video error:', e);
        setVideoReady(false);
      };

      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('error', handleError);
      
      // Load the video
      video.load();

      // Cleanup
      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('error', handleError);
      };
    } else if (!isVideo) {
      setVideoReady(false);
    }
  }, [isVideo, mediaUrl]);

  return (
    <div style={{ width: '100%', height: '65vh', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
      {/* Hidden video element for video texture */}
      {isVideo && (
        <video
          ref={videoRef}
          src={mediaUrl}
          style={{ display: 'none' }}
          loop
          muted
          playsInline
          crossOrigin="anonymous"
          preload="auto"
        />
      )}
      <Canvas camera={{ position: [-1, 0, 3], fov: 45 }} shadows>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 7]} intensity={1} />
        <Suspense fallback={null}>
          <PhoneModelWithMedia 
            mediaUrl={mediaUrl} 
            isVideo={isVideo} 
            videoElement={videoReady ? videoRef.current : null} 
          />
        </Suspense>
        <OrbitControls enablePan enableZoom enableRotate />
      </Canvas>
    </div>
  );
}

// Required for useGLTF
useGLTF.preload('/glb/iphone.glb');