import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import EvolutionModel from './EvolutionModel';
import ScanlineLaser from './ScanlineLaser';
import VerticalSpeedStream from './VerticalSpeedStream';
import StackedEnvironments from './StackedEnvironments';
import { freeFallState } from './freeFallState';

/**
 * The Core "Evolutionary Free-Fall" Engine
 * 
 * - Locked-in camera framing during free-fall descent
 * - 4 vertically stacked environments
 * - High-speed vertical particle streams
 * - Continuous synchronized skydiving animation loop
 * - Data scanline sweeps with Three.js local clipping planes at 25%, 50%, 75%
 * - Seamless superhero touchdown on frosted-glass landing platform at 100%
 */
export default function EvolutionFreeFall() {
  const { camera } = useThree();
  const characterGroupRef = useRef();

  // AnimationMixer references for all 4 models
  const mixer1 = useRef();
  const mixer2 = useRef();
  const mixer3 = useRef();
  const mixer4 = useRef();

  // Up vector & reusable planes
  const upVec = useMemo(() => new THREE.Vector3(0, 1, 0), []);
  const downVec = useMemo(() => new THREE.Vector3(0, -1, 0), []);

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.05);

    // Update all mixers in strict synchronization
    if (mixer1.current) mixer1.current.update(d);
    if (mixer2.current) mixer2.current.update(d);
    if (mixer3.current) mixer3.current.update(d);
    if (mixer4.current) mixer4.current.update(d);

    const { altitude, cameraPitch, cameraDistance, landingProgress } = freeFallState;

    // 1. Position character at the current altitude of the descent
    if (characterGroupRef.current) {
      characterGroupRef.current.position.y = altitude;

      // Subtle aerodynamic roll / tilt from cursor mouse
      const mouseTiltX = state.pointer.x * 0.15;
      const mouseTiltZ = state.pointer.y * 0.1;
      characterGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        characterGroupRef.current.rotation.y,
        mouseTiltX,
        delta * 3
      );
      characterGroupRef.current.rotation.z = THREE.MathUtils.lerp(
        characterGroupRef.current.rotation.z,
        -mouseTiltX * 0.5,
        delta * 3
      );
    }

    // 2. Camera tracking & cinematic angle
    // In Zone 4 (landing), camera pans down to low angle and tilts up (+pitch)
    const targetCamY = altitude + 0.15 - landingProgress * 0.6;
    const targetCamZ = cameraDistance - landingProgress * 0.8;
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, delta * 8);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, delta * 8);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, state.pointer.x * 0.3, delta * 3);

    // Look at the character's chest / face with pitch offset
    const lookTargetY = altitude + 0.2 + cameraPitch * 0.8;
    camera.lookAt(0, lookTargetY, 0);
  });

  // Calculate dynamic clipping planes and active lasers from freeFallState
  const {
    p1Planes,
    p2Planes,
    p3Planes,
    p4Planes,
    laser1Active,
    laser1Y,
    laser2Active,
    laser2Y,
    laser3Active,
    laser3Y,
    isP1Visible,
    isP2Visible,
    isP3Visible,
    isP4Visible,
  } = useMemo(() => {
    const s1 = freeFallState.scanline1Y;
    const s2 = freeFallState.scanline2Y;
    const s3 = freeFallState.scanline3Y;
    const phase = freeFallState.activePhase;

    const inRange = (y) => y > -1.75 && y < 1.75;

    const l1Active = inRange(s1);
    const l2Active = inRange(s2);
    const l3Active = inRange(s3);

    let planes1 = [];
    let planes2 = [];
    let planes3 = [];
    let planes4 = [];

    if (l1Active) {
      // Model 1 kept above s1, Model 2 kept below s1
      planes1 = [new THREE.Plane(upVec, -s1)];
      planes2 = [new THREE.Plane(downVec, s1)];
    } else if (l2Active) {
      // Model 2 kept above s2, Model 3 kept below s2
      planes2 = [new THREE.Plane(upVec, -s2)];
      planes3 = [new THREE.Plane(downVec, s2)];
    } else if (l3Active) {
      // Model 3 kept above s3, Model 4 kept below s3
      planes3 = [new THREE.Plane(upVec, -s3)];
      planes4 = [new THREE.Plane(downVec, s3)];
    }

    const v1 = phase === 1 || l1Active;
    const v2 = phase === 2 || l1Active || l2Active;
    const v3 = phase === 3 || l2Active || l3Active;
    const v4 = phase === 4 || l3Active;

    return {
      p1Planes: planes1,
      p2Planes: planes2,
      p3Planes: planes3,
      p4Planes: planes4,
      laser1Active: l1Active,
      laser1Y: s1,
      laser2Active: l2Active,
      laser2Y: s2,
      laser3Active: l3Active,
      laser3Y: s3,
      isP1Visible: v1,
      isP2Visible: v2,
      isP3Visible: v3,
      isP4Visible: v4,
    };
  }, [
    freeFallState.scanline1Y,
    freeFallState.scanline2Y,
    freeFallState.scanline3Y,
    freeFallState.activePhase,
  ]);

  return (
    <>
      {/* 
        1. Vertically Stacked Environments (Clouds -> Gears -> Cyber Tunnel -> Glass Pad)
      */}
      <StackedEnvironments />

      {/* 
        2. High-speed upward-rushing particles simulating descent
      */}
      <VerticalSpeedStream />

      {/* 
        3. The Central Character (Locked in View, plunges down with altitude)
      */}
      <group ref={characterGroupRef} position={[0, 0, 0]}>
        
        {/* Phase 1: Early Man */}
        {isP1Visible && (
          <EvolutionModel
            phase={1}
            mixerRef={mixer1}
            clippingPlanes={p1Planes}
          />
        )}

        {/* Phase 2: Renaissance Inventor */}
        {isP2Visible && (
          <EvolutionModel
            phase={2}
            mixerRef={mixer2}
            clippingPlanes={p2Planes}
          />
        )}

        {/* Phase 3: Modern Software Developer */}
        {isP3Visible && (
          <EvolutionModel
            phase={3}
            mixerRef={mixer3}
            clippingPlanes={p3Planes}
          />
        )}

        {/* Phase 4: AI Robot */}
        {isP4Visible && (
          <EvolutionModel
            phase={4}
            mixerRef={mixer4}
            clippingPlanes={p4Planes}
          />
        )}

        {/* Scanline 1: Early Man -> Inventor (25% scroll) */}
        <ScanlineLaser
          y={laser1Y}
          isActive={laser1Active}
          color="#f59e0b"
        />

        {/* Scanline 2: Inventor -> Developer (50% scroll) */}
        <ScanlineLaser
          y={laser2Y}
          isActive={laser2Active}
          color="#38bdf8"
        />

        {/* Scanline 3: Developer -> Robot (75% scroll) */}
        <ScanlineLaser
          y={laser3Y}
          isActive={laser3Active}
          color="#00f0ff"
        />

      </group>
    </>
  );
}

