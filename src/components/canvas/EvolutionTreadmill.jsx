import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import EvolutionModel from './EvolutionModel';
import ScanlineLaser from './ScanlineLaser';
import TreadmillFloor from './TreadmillFloor';

/**
 * The Evolutionary Treadmill Engine
 * 
 * Orchestrates:
 * 1. Centered character walking in place at 3/4 profile
 * 2. Shared walking AnimationMixer across all 4 evolutionary phases
 * 3. Data Scanline Swap at 25%, 50%, and 75% scroll depth
 * 4. Real-time Three.js local clipping planes for instantaneous model replacement
 */
export default function EvolutionTreadmill({
  scrollProgress = 0,
  currentPhase = 1,
}) {
  const groupRef = useRef();

  // AnimationMixer references for all 4 models
  const mixer1 = useRef();
  const mixer2 = useRef();
  const mixer3 = useRef();
  const mixer4 = useRef();

  // Update all mixers every frame in strict lockstep
  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05); // Prevent huge delta on tab defocus
    if (mixer1.current) mixer1.current.update(d);
    if (mixer2.current) mixer2.current.update(d);
    if (mixer3.current) mixer3.current.update(d);
    if (mixer4.current) mixer4.current.update(d);
  });

  // Calculate transition zones & scanline height
  // Transitions occur around 25%, 50%, and 75%
  const transitionState = useMemo(() => {
    const p = Math.max(0, Math.min(1, scrollProgress));

    // Transition 1: Phase 1 -> 2 (0.21 to 0.28)
    const t1Start = 0.21;
    const t1End = 0.28;

    // Transition 2: Phase 2 -> 3 (0.46 to 0.53)
    const t2Start = 0.46;
    const t2End = 0.53;

    // Transition 3: Phase 3 -> 4 (0.71 to 0.78)
    const t3Start = 0.71;
    const t3End = 0.78;

    let activeTransition = null;
    let tProgress = 0;
    let fromPhase = 1;
    let toPhase = 1;
    let laserColor = '#00f0ff';

    if (p >= t1Start && p <= t1End) {
      activeTransition = 1;
      tProgress = (p - t1Start) / (t1End - t1Start);
      fromPhase = 1;
      toPhase = 2;
      laserColor = '#f59e0b'; // Amber / Gold scan
    } else if (p >= t2Start && p <= t2End) {
      activeTransition = 2;
      tProgress = (p - t2Start) / (t2End - t2Start);
      fromPhase = 2;
      toPhase = 3;
      laserColor = '#38bdf8'; // Electric Blue scan
    } else if (p >= t3Start && p <= t3End) {
      activeTransition = 3;
      tProgress = (p - t3Start) / (t3End - t3Start);
      fromPhase = 3;
      toPhase = 4;
      laserColor = '#00f0ff'; // Neon Cyan scan
    }

    // Character vertical span is approximately y = -0.92 (feet) to +0.92 (head)
    const yMin = -0.95;
    const yMax = 0.95;
    const yLaser = yMin + tProgress * (yMax - yMin);

    return {
      isTransitioning: activeTransition !== null,
      activeTransition,
      fromPhase,
      toPhase,
      yLaser,
      laserColor,
      progress: tProgress,
    };
  }, [scrollProgress]);

  // Generate dynamic clipping planes for the Data Scanline Swap
  // Model A (outgoing): kept above yLaser -> normal = (0, 1, 0), constant = -yLaser
  // Model B (incoming): kept below yLaser -> normal = (0, -1, 0), constant = yLaser
  const { clippingPlanesFrom, clippingPlanesTo } = useMemo(() => {
    if (!transitionState.isTransitioning) {
      return { clippingPlanesFrom: [], clippingPlanesTo: [] };
    }

    const y = transitionState.yLaser;
    const planeFrom = new THREE.Plane(new THREE.Vector3(0, 1, 0), -y);
    const planeTo = new THREE.Plane(new THREE.Vector3(0, -1, 0), y);

    return {
      clippingPlanesFrom: [planeFrom],
      clippingPlanesTo: [planeTo],
    };
  }, [transitionState.isTransitioning, transitionState.yLaser]);

  // Determine visibility of each phase model
  const isP1Visible =
    (!transitionState.isTransitioning && currentPhase === 1) ||
    (transitionState.isTransitioning &&
      (transitionState.fromPhase === 1 || transitionState.toPhase === 1));

  const isP2Visible =
    (!transitionState.isTransitioning && currentPhase === 2) ||
    (transitionState.isTransitioning &&
      (transitionState.fromPhase === 2 || transitionState.toPhase === 2));

  const isP3Visible =
    (!transitionState.isTransitioning && currentPhase === 3) ||
    (transitionState.isTransitioning &&
      (transitionState.fromPhase === 3 || transitionState.toPhase === 3));

  const isP4Visible =
    (!transitionState.isTransitioning && currentPhase === 4) ||
    (transitionState.isTransitioning &&
      (transitionState.fromPhase === 4 || transitionState.toPhase === 4));

  // Determine clipping planes for each individual phase
  const getPlanesForPhase = (phaseNum) => {
    if (!transitionState.isTransitioning) return [];
    if (phaseNum === transitionState.fromPhase) return clippingPlanesFrom;
    if (phaseNum === transitionState.toPhase) return clippingPlanesTo;
    return [];
  };

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 
        Treadmill Floor moving backwards underneath feet 
      */}
      <TreadmillFloor currentPhase={currentPhase} speed={1.0} />

      {/* 
        The Rigged Character Walking in Place:
        Centered vertically and horizontally, angled at 3/4 profile (25-30 degrees)
      */}
      <group position={[0, 0, 0]} rotation={[0, Math.PI * 0.2, 0]}>
        
        {/* Phase 1: Early Man */}
        {isP1Visible && (
          <EvolutionModel
            phase={1}
            mixerRef={mixer1}
            clippingPlanes={getPlanesForPhase(1)}
          />
        )}

        {/* Phase 2: The Inventor */}
        {isP2Visible && (
          <EvolutionModel
            phase={2}
            mixerRef={mixer2}
            clippingPlanes={getPlanesForPhase(2)}
          />
        )}

        {/* Phase 3: The Developer */}
        {isP3Visible && (
          <EvolutionModel
            phase={3}
            mixerRef={mixer3}
            clippingPlanes={getPlanesForPhase(3)}
          />
        )}

        {/* Phase 4: The AI Robot */}
        {isP4Visible && (
          <EvolutionModel
            phase={4}
            mixerRef={mixer4}
            clippingPlanes={getPlanesForPhase(4)}
          />
        )}

        {/* 
          Data Scanline Laser:
          Horizontal holographic ring sweeping from feet to head 
        */}
        <ScanlineLaser
          y={transitionState.yLaser}
          isActive={transitionState.isTransitioning}
          color={transitionState.laserColor}
        />

      </group>
    </group>
  );
}
