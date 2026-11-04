import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import EvolutionFreeFall from './EvolutionFreeFall';
import { freeFallState } from './freeFallState';

export default function Experience() {
  const { scene } = useThree();
  const ambientLightRef = useRef();
  const keyLightRef = useRef();
  const fillLightRef = useRef();
  const frontLightRef = useRef();

  // Setup deep atmospheric fog and scene background color
  React.useEffect(() => {
    scene.fog = new THREE.FogExp2('#291e17', 0.032);
    scene.background = new THREE.Color('#1f150f');
    return () => {
      scene.fog = null;
      scene.background = null;
    };
  }, [scene]);

  useFrame((_, delta) => {
    // 1. Dynamic Fog & Background color modulation from freeFallState
    if (scene.fog) {
      scene.fog.color.lerp(freeFallState.fogColor, delta * 3);
      scene.fog.density = THREE.MathUtils.lerp(scene.fog.density, freeFallState.fogDensity, delta * 3);
    }
    if (scene.background) {
      scene.background.lerp(freeFallState.fogColor, delta * 3);
    }

    // 2. Dynamic Lighting moving with descent altitude
    if (ambientLightRef.current) {
      ambientLightRef.current.color.lerp(freeFallState.ambientColor, delta * 3);
    }

    if (keyLightRef.current) {
      keyLightRef.current.color.lerp(freeFallState.keyLightColor, delta * 3);
      keyLightRef.current.position.y = freeFallState.altitude + 5;
    }

    if (fillLightRef.current) {
      fillLightRef.current.position.y = freeFallState.altitude - 4;
    }

    if (frontLightRef.current) {
      frontLightRef.current.position.y = freeFallState.altitude + 1.2;
    }
  });

  return (
    <>
      {/* Dynamic Ambient Lighting */}
      <ambientLight ref={ambientLightRef} intensity={1.8} color="#451a03" />

      {/* Main Key Rim Light */}
      <directionalLight
        ref={keyLightRef}
        position={[4, 6, 4]}
        intensity={3.5}
        color="#f59e0b"
      />

      {/* Fill Light illuminating from below */}
      <directionalLight
        ref={fillLightRef}
        position={[-4, -3, -3]}
        intensity={1.6}
        color="#00f0ff"
      />

      {/* Dedicated Front Light illuminating the falling character */}
      <pointLight
        ref={frontLightRef}
        position={[0, 1.2, 3.2]}
        intensity={3.0}
        distance={9}
        color="#ffffff"
      />

      {/* 
        The Core "Evolutionary Free-Fall" Engine:
        Environments, vertical speedlines, skydiving character & scanline morphs
      */}
      <EvolutionFreeFall />
    </>
  );
}
