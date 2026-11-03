import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import Phase1EarlyMan from './Phase1EarlyMan';
import Phase2Inventor from './Phase2Inventor';
import Phase3Developer from './Phase3Developer';
import Phase4Robot from './Phase4Robot';
import BackgroundParticles from './BackgroundParticles';

function smoothstep(min, max, value) {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

export default function Experience({ scrollProgress = 0, currentPhase = 1 }) {
  const { viewport } = useThree();
  const isDesktop = viewport.width > 7;

  // Refs for each phase group for GSAP / requestAnimationFrame lerping
  const p1Group = useRef();
  const p2Group = useRef();
  const p3Group = useRef();
  const p4Group = useRef();

  const ambientLightRef = useRef();
  const mainDirLightRef = useRef();

  // Smoothed opacities for buttery crossfades
  const opacities = useRef({ w1: 1, w2: 0, w3: 0, w4: 0 });

  // Target colors for ambient lighting per phase
  const ambientColors = useMemo(() => [
    new THREE.Color('#451a03'), // Phase 1: Deep ember
    new THREE.Color('#38230b'), // Phase 2: Sepia brass
    new THREE.Color('#082f49'), // Phase 3: Slate cyan
    new THREE.Color('#031d28'), // Phase 4: Neon abyss
  ], []);

  useFrame((state, delta) => {
    const p = Math.max(0, Math.min(1, scrollProgress));

    // Target weights from continuous smoothstep curves
    const targetW1 = 1 - smoothstep(0.18, 0.29, p);
    const targetW2 = smoothstep(0.18, 0.29, p) * (1 - smoothstep(0.44, 0.55, p));
    const targetW3 = smoothstep(0.44, 0.55, p) * (1 - smoothstep(0.70, 0.80, p));
    const targetW4 = smoothstep(0.70, 0.80, p);

    // Lerp smoothly for buttery 60/120fps crossfading
    const lerpSpeed = Math.min(1, delta * 6);
    opacities.current.w1 = THREE.MathUtils.lerp(opacities.current.w1, targetW1, lerpSpeed);
    opacities.current.w2 = THREE.MathUtils.lerp(opacities.current.w2, targetW2, lerpSpeed);
    opacities.current.w3 = THREE.MathUtils.lerp(opacities.current.w3, targetW3, lerpSpeed);
    opacities.current.w4 = THREE.MathUtils.lerp(opacities.current.w4, targetW4, lerpSpeed);

    // Subtle cursor parallax
    const targetMouseX = state.pointer.x * 0.4;
    const targetMouseY = state.pointer.y * 0.3;

    // Helper to update transform of each phase group
    const updatePhaseGroup = (groupRef, weight, rotOffset) => {
      if (!groupRef.current) return;
      const grp = groupRef.current;
      const isVisible = weight > 0.005;
      grp.visible = isVisible;
      if (!isVisible) return;

      // Scale up gracefully as it enters, shrink as it leaves
      const baseScale = isDesktop ? 1.25 : 0.85;
      const scale = baseScale * (0.8 + weight * 0.2);
      grp.scale.set(scale, scale, scale);

      // Horizontal position: right-flank on desktop, centered on mobile
      const baseX = isDesktop ? Math.min(3.2, viewport.width * 0.24) : 0;
      const baseY = isDesktop ? 0 : 0.3;
      grp.position.x = THREE.MathUtils.lerp(grp.position.x, baseX + targetMouseX, delta * 3);
      grp.position.y = THREE.MathUtils.lerp(grp.position.y, baseY + targetMouseY, delta * 3);

      // Scroll-driven gentle rotation
      grp.rotation.y = rotOffset + (p * Math.PI * 1.5) + (targetMouseX * 0.5);
    };

    updatePhaseGroup(p1Group, opacities.current.w1, 0);
    updatePhaseGroup(p2Group, opacities.current.w2, Math.PI * 0.5);
    updatePhaseGroup(p3Group, opacities.current.w3, Math.PI * 1.0);
    updatePhaseGroup(p4Group, opacities.current.w4, Math.PI * 1.5);

    // Adaptive ambient light tint
    if (ambientLightRef.current) {
      const activeIdx = Math.max(0, Math.min(3, currentPhase - 1));
      ambientLightRef.current.color.lerp(ambientColors[activeIdx], delta * 4);
    }
  });

  return (
    <>
      {/* Dynamic Ambient Lighting */}
      <ambientLight ref={ambientLightRef} intensity={1.5} color="#451a03" />

      {/* Main Directional Rim Light */}
      <directionalLight
        ref={mainDirLightRef}
        position={[6, 8, 6]}
        intensity={2.2}
        color="#ffffff"
      />
      <directionalLight
        position={[-6, -4, -4]}
        intensity={0.8}
        color="#38bdf8"
      />

      {/* Ambient background particles */}
      <BackgroundParticles scrollProgress={scrollProgress} />

      {/* Phase 1: Stone & Fire (Early Man) */}
      <group ref={p1Group}>
        <Phase1EarlyMan opacity={opacities.current.w1} />
      </group>

      {/* Phase 2: Interlocking Brass Gears (Inventor) */}
      <group ref={p2Group}>
        <Phase2Inventor opacity={opacities.current.w2} />
      </group>

      {/* Phase 3: Microchip & Geometric Data Lattice (Developer) */}
      <group ref={p3Group}>
        <Phase3Developer opacity={opacities.current.w3} />
      </group>

      {/* Phase 4: Humanoid Robotic Head & Neural Eye (AI Robot) */}
      <group ref={p4Group}>
        <Phase4Robot opacity={opacities.current.w4} />
      </group>
    </>
  );
}

