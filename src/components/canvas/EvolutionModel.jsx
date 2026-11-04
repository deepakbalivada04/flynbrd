import React from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import RiggedHumanoid from './RiggedHumanoid';

/**
 * EvolutionModel:
 * Renders the rigged walking character for a specific phase.
 * 
 * CURRENT STATUS: Uses procedural rigged Mixamo humanoid placeholders with active AnimationMixer.
 * 
 * HOW TO SWITCH TO YOUR CUSTOM MIXAMO .GLB:
 * 1. Place your exported Mixamo .glb files in /public/models/:
 *    - /models/phase1_early_man.glb
 *    - /models/phase2_inventor.glb
 *    - /models/phase3_developer.glb
 *    - /models/phase4_robot.glb
 * 
 * 2. Set USE_CUSTOM_GLB = true below.
 */
const USE_CUSTOM_GLB = false;

const GLB_PATHS = {
  1: '/models/phase1_early_man.glb',
  2: '/models/phase2_inventor.glb',
  3: '/models/phase3_developer.glb',
  4: '/models/phase4_robot.glb',
};

// Preload models for zero-latency instant model swapping
if (USE_CUSTOM_GLB) {
  Object.values(GLB_PATHS).forEach((path) => {
    try {
      useGLTF.preload(path);
    } catch (e) {
      // Ignore if not present
    }
  });
}

export default function EvolutionModel({
  phase = 1,
  clippingPlanes = [],
  mixerRef = null,
  speed = 1.0,
}) {
  if (USE_CUSTOM_GLB) {
    // When custom GLB is enabled, load and render the Mixamo GLB
    return (
      <CustomGLBModel
        phase={phase}
        clippingPlanes={clippingPlanes}
        mixerRef={mixerRef}
        speed={speed}
      />
    );
  }

  // Default: Procedural Rigged Humanoid with exact Phase styling
  return (
    <RiggedHumanoid
      phase={phase}
      clippingPlanes={clippingPlanes}
      mixerRef={mixerRef}
      speed={speed}
    />
  );
}

function CustomGLBModel({ phase, clippingPlanes, mixerRef, speed }) {
  const glbPath = GLB_PATHS[phase];
  const { scene, animations } = useGLTF(glbPath);

  // Apply clippingPlanes to all meshes in the custom model
  React.useEffect(() => {
    if (!scene) return;
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.clippingPlanes = clippingPlanes.length > 0 ? clippingPlanes : null;
        child.material.clipShadows = true;
        child.material.needsUpdate = true;
      }
    });
  }, [scene, clippingPlanes]);

  // Hook animation mixer to custom GLB
  React.useEffect(() => {
    if (!scene) return;
    const mixer = new THREE.AnimationMixer(scene);
    if (mixerRef) mixerRef.current = mixer;

    const clip = animations && animations.length > 0 ? animations[0] : null;
    if (clip) {
      const action = mixer.clipAction(clip);
      action.setLoop(THREE.LoopRepeat);
      action.timeScale = speed;
      action.play();
    }

    return () => {
      mixer.stopAllAction();
    };
  }, [scene, animations, speed]);

  return <primitive object={scene} position={[0, -0.92, 0]} />;
}
