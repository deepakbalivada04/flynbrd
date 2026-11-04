import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createFreeFallAnimationClip } from './freeFallAnimation';
import { freeFallState } from './freeFallState';

/**
 * Procedural Rigged Humanoid for "The Evolutionary Free-Fall".
 * Features:
 * - Free-fall skydiving animation cycle
 * - Three.js local clipping planes (for data scanline model swap)
 * - Seamless superhero touchdown interpolation in Zone 4
 * - 4 distinct evolutionary materials (Early Man, Inventor, Developer, AI Robot)
 */
export default function RiggedHumanoid({
  phase = 1,
  clippingPlanes = [],
  mixerRef = null,
}) {
  const rootRef = useRef();
  const internalMixerRef = useRef();

  // Bone node refs for landing interpolation
  const hipsRef = useRef();
  const spineRef = useRef();
  const headRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const leftLegRef = useRef();
  const rightLegRef = useRef();
  const leftForeArmRef = useRef();
  const rightForeArmRef = useRef();

  // Phase Materials with Three.js local clipping plane support
  const materials = useMemo(() => {
    const planes = clippingPlanes && clippingPlanes.length > 0 ? clippingPlanes : null;

    if (phase === 1) {
      // Phase 1: Early Man (Rough brown weathered leather/stone with amber accents)
      return {
        body: new THREE.MeshStandardMaterial({
          color: '#4e3321',
          roughness: 0.92,
          metalness: 0.1,
          flatShading: true,
          clippingPlanes: planes,
          clipShadows: true,
        }),
        accent: new THREE.MeshStandardMaterial({
          color: '#8c6239',
          roughness: 0.85,
          metalness: 0.2,
          clippingPlanes: planes,
          clipShadows: true,
        }),
        glow: new THREE.MeshBasicMaterial({
          color: '#f97316',
          clippingPlanes: planes,
        }),
      };
    } else if (phase === 2) {
      // Phase 2: Renaissance Inventor (Burnished brass, antique bronze, mechanical rivets)
      return {
        body: new THREE.MeshStandardMaterial({
          color: '#c59f4e',
          roughness: 0.3,
          metalness: 0.88,
          clippingPlanes: planes,
          clipShadows: true,
        }),
        accent: new THREE.MeshStandardMaterial({
          color: '#9d7b32',
          roughness: 0.38,
          metalness: 0.85,
          clippingPlanes: planes,
          clipShadows: true,
        }),
        glow: new THREE.MeshStandardMaterial({
          color: '#fbbf24',
          emissive: '#d97706',
          emissiveIntensity: 1.6,
          clippingPlanes: planes,
        }),
      };
    } else if (phase === 3) {
      // Phase 3: Modern Software Developer (Electric blue glowing wireframe on dark carbon)
      return {
        body: new THREE.MeshStandardMaterial({
          color: '#0369a1',
          wireframe: true,
          emissive: '#0284c7',
          emissiveIntensity: 2.0,
          clippingPlanes: planes,
          clipShadows: true,
        }),
        accent: new THREE.MeshStandardMaterial({
          color: '#082f49',
          roughness: 0.3,
          metalness: 0.8,
          clippingPlanes: planes,
          clipShadows: true,
        }),
        glow: new THREE.MeshBasicMaterial({
          color: '#38bdf8',
          clippingPlanes: planes,
        }),
      };
    } else {
      // Phase 4: AI Robot (High-gloss white ceramic/chrome armor & neon cyan joints)
      return {
        body: new THREE.MeshStandardMaterial({
          color: '#f8fafc',
          roughness: 0.06,
          metalness: 0.92,
          clippingPlanes: planes,
          clipShadows: true,
        }),
        accent: new THREE.MeshStandardMaterial({
          color: '#0f172a',
          roughness: 0.2,
          metalness: 0.95,
          clippingPlanes: planes,
          clipShadows: true,
        }),
        glow: new THREE.MeshBasicMaterial({
          color: '#00f0ff',
          clippingPlanes: planes,
        }),
      };
    }
  }, [phase, clippingPlanes]);

  // Update materials when clipping planes change
  useEffect(() => {
    const planes = clippingPlanes && clippingPlanes.length > 0 ? clippingPlanes : null;
    Object.values(materials).forEach((mat) => {
      if (mat) {
        mat.clippingPlanes = planes;
        mat.needsUpdate = true;
      }
    });
  }, [clippingPlanes, materials]);

  // Setup AnimationMixer for slow-motion Skydiving
  useEffect(() => {
    if (!rootRef.current) return;

    const mixer = new THREE.AnimationMixer(rootRef.current);
    internalMixerRef.current = mixer;

    if (mixerRef) {
      mixerRef.current = mixer;
    }

    const freeFallClip = createFreeFallAnimationClip();
    const action = mixer.clipAction(freeFallClip);
    action.setLoop(THREE.LoopRepeat);
    action.timeScale = 0.85; // Majestic slow-motion skydiving
    action.play();

    return () => {
      mixer.stopAllAction();
      mixer.uncacheRoot(rootRef.current);
    };
  }, []);

  // Superhero landing target rotations
  const landingRotations = useMemo(() => {
    const e = new THREE.Euler();
    const toQuat = (x, y, z) => new THREE.Quaternion().setFromEuler(e.set(x, y, z, 'XYZ'));

    return {
      hipsRot: toQuat(0.65, 0.15, -0.05),
      spineRot: toQuat(0.45, -0.1, 0.05),
      headRot: toQuat(-0.4, 0.1, 0.0), // Head looks straight forward up into camera
      leftArmRot: toQuat(-0.4, 0.3, -0.6), // Arm swept back
      leftForeArmRot: toQuat(0.6, 0.0, 0.0),
      rightArmRot: toQuat(0.85, -0.2, 0.2), // Fist planted down
      rightForeArmRot: toQuat(0.3, 0.0, 0.0),
      leftThighRot: toQuat(0.85, 0.25, -0.15), // Left foot planted forward
      leftKneeRot: toQuat(-1.4, 0.0, 0.0),
      rightThighRot: toQuat(-0.4, -0.2, 0.1), // Right knee down on floor
      rightKneeRot: toQuat(-1.5, 0.0, 0.0),
    };
  }, []);

  // Interpolate into landing pose when in Zone 4 (landingProgress > 0)
  useFrame(() => {
    const lp = freeFallState.landingProgress;
    if (lp <= 0.001) return;

    // Slerp bones towards superhero touchdown pose
    if (hipsRef.current) {
      hipsRef.current.position.y = THREE.MathUtils.lerp(0.95, 0.38, lp);
      hipsRef.current.position.z = THREE.MathUtils.lerp(0.0, -0.25, lp);
      hipsRef.current.quaternion.slerp(landingRotations.hipsRot, lp * 0.9);
    }
    if (spineRef.current) spineRef.current.quaternion.slerp(landingRotations.spineRot, lp * 0.9);
    if (headRef.current) headRef.current.quaternion.slerp(landingRotations.headRot, lp * 0.9);
    if (leftArmRef.current) leftArmRef.current.quaternion.slerp(landingRotations.leftArmRot, lp * 0.9);
    if (rightArmRef.current) rightArmRef.current.quaternion.slerp(landingRotations.rightArmRot, lp * 0.9);
    if (leftForeArmRef.current) leftForeArmRef.current.quaternion.slerp(landingRotations.leftForeArmRot, lp * 0.9);
    if (rightForeArmRef.current) rightForeArmRef.current.quaternion.slerp(landingRotations.rightForeArmRot, lp * 0.9);
  });

  return (
    <group ref={rootRef} position={[0, -0.92, 0]}>
      {/* 
        MIXAMO SKELETON / BONE HIERARCHY
      */}
      <group ref={hipsRef} name="mixamorigHips" position={[0, 0.95, 0]}>
        
        {/* Pelvis / Hips */}
        <mesh material={materials.body} castShadow receiveShadow>
          <boxGeometry args={[0.34, 0.16, 0.22]} />
        </mesh>
        {phase === 4 && (
          <mesh material={materials.glow} position={[0, 0, 0.12]}>
            <sphereGeometry args={[0.04, 12, 12]} />
          </mesh>
        )}

        {/* Spine / Torso */}
        <group ref={spineRef} name="mixamorigSpine" position={[0, 0.14, 0]}>
          <mesh material={materials.body} position={[0, 0.12, 0]} castShadow>
            <boxGeometry args={[0.36, 0.24, 0.22]} />
          </mesh>

          {/* Chest / Shoulders */}
          <group name="mixamorigChest" position={[0, 0.26, 0]}>
            <mesh material={materials.body} position={[0, 0.08, 0]} castShadow>
              <boxGeometry args={[0.42, 0.22, 0.24]} />
            </mesh>

            {/* Phase Accents on Chest */}
            {phase === 2 && (
              <mesh material={materials.glow} position={[0, 0.08, 0.13]}>
                <torusGeometry args={[0.07, 0.015, 8, 16]} />
              </mesh>
            )}
            {phase === 3 && (
              <mesh material={materials.glow} position={[0, 0.08, 0.13]}>
                <boxGeometry args={[0.09, 0.09, 0.02]} />
              </mesh>
            )}
            {phase === 4 && (
              <mesh material={materials.glow} position={[0, 0.08, 0.13]}>
                <ringGeometry args={[0.03, 0.06, 16]} />
              </mesh>
            )}

            {/* Neck & Head */}
            <group ref={headRef} name="mixamorigHead" position={[0, 0.24, 0]}>
              <mesh material={materials.accent} position={[0, -0.04, 0]}>
                <cylinderGeometry args={[0.06, 0.07, 0.08, 12]} />
              </mesh>
              <mesh material={materials.body} position={[0, 0.12, 0]} castShadow>
                <boxGeometry args={[0.22, 0.24, 0.24]} />
              </mesh>
              {/* Visor Bar */}
              <mesh material={materials.glow} position={[0, 0.12, 0.125]}>
                <boxGeometry args={[0.18, 0.05, 0.02]} />
              </mesh>
            </group>

            {/* Left Arm (spread wide in free-fall) */}
            <group ref={leftArmRef} name="mixamorigLeftArm" position={[-0.26, 0.14, 0]}>
              <mesh material={materials.accent}>
                <sphereGeometry args={[0.065, 12, 12]} />
              </mesh>
              <mesh material={materials.body} position={[-0.02, -0.14, 0]}>
                <capsuleGeometry args={[0.05, 0.16, 8, 12]} />
              </mesh>

              <group ref={leftForeArmRef} name="mixamorigLeftForeArm" position={[-0.02, -0.26, 0]}>
                <mesh material={materials.accent}>
                  <sphereGeometry args={[0.055, 12, 12]} />
                </mesh>
                <mesh material={materials.body} position={[0, -0.14, 0]}>
                  <capsuleGeometry args={[0.045, 0.16, 8, 12]} />
                </mesh>
                <mesh material={materials.accent} position={[0, -0.26, 0]}>
                  <boxGeometry args={[0.07, 0.08, 0.06]} />
                </mesh>
              </group>
            </group>

            {/* Right Arm */}
            <group ref={rightArmRef} name="mixamorigRightArm" position={[0.26, 0.14, 0]}>
              <mesh material={materials.accent}>
                <sphereGeometry args={[0.065, 12, 12]} />
              </mesh>
              <mesh material={materials.body} position={[0.02, -0.14, 0]}>
                <capsuleGeometry args={[0.05, 0.16, 8, 12]} />
              </mesh>

              <group ref={rightForeArmRef} name="mixamorigRightForeArm" position={[0.02, -0.26, 0]}>
                <mesh material={materials.accent}>
                  <sphereGeometry args={[0.055, 12, 12]} />
                </mesh>
                <mesh material={materials.body} position={[0, -0.14, 0]}>
                  <capsuleGeometry args={[0.045, 0.16, 8, 12]} />
                </mesh>
                <mesh material={materials.accent} position={[0, -0.26, 0]}>
                  <boxGeometry args={[0.07, 0.08, 0.06]} />
                </mesh>
              </group>
            </group>

          </group>
        </group>

        {/* Left Leg */}
        <group ref={leftLegRef} name="mixamorigLeftUpLeg" position={[-0.12, -0.08, 0]}>
          <mesh material={materials.accent}>
            <sphereGeometry args={[0.075, 12, 12]} />
          </mesh>
          <mesh material={materials.body} position={[0, -0.2, 0]}>
            <capsuleGeometry args={[0.065, 0.24, 8, 12]} />
          </mesh>

          <group name="mixamorigLeftLeg" position={[0, -0.38, 0]}>
            <mesh material={materials.accent}>
              <sphereGeometry args={[0.065, 12, 12]} />
            </mesh>
            <mesh material={materials.body} position={[0, -0.2, 0]}>
              <capsuleGeometry args={[0.055, 0.24, 8, 12]} />
            </mesh>
            <mesh material={materials.accent} position={[0, -0.42, 0.06]}>
              <boxGeometry args={[0.11, 0.08, 0.22]} />
            </mesh>
          </group>
        </group>

        {/* Right Leg */}
        <group ref={rightLegRef} name="mixamorigRightUpLeg" position={[0.12, -0.08, 0]}>
          <mesh material={materials.accent}>
            <sphereGeometry args={[0.075, 12, 12]} />
          </mesh>
          <mesh material={materials.body} position={[0, -0.2, 0]}>
            <capsuleGeometry args={[0.065, 0.24, 8, 12]} />
          </mesh>

          <group name="mixamorigRightLeg" position={[0, -0.38, 0]}>
            <mesh material={materials.accent}>
              <sphereGeometry args={[0.065, 12, 12]} />
            </mesh>
            <mesh material={materials.body} position={[0, -0.2, 0]}>
              <capsuleGeometry args={[0.055, 0.24, 8, 12]} />
            </mesh>
            <mesh material={materials.accent} position={[0, -0.42, 0.06]}>
              <boxGeometry args={[0.11, 0.08, 0.22]} />
            </mesh>
          </group>
        </group>

      </group>
    </group>
  );
}
