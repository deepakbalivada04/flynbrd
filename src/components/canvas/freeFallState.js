import * as THREE from 'three';

/**
 * Shared mutable free-fall state.
 * Directly animated by GSAP ScrollTrigger timeline (scrub: 1.5).
 * Read directly inside R3F useFrame for 60/120fps hardware acceleration.
 */
export const freeFallState = {
  // Global scroll progress [0, 1]
  progress: 0,

  // Vertical descent position (plunging downward)
  altitude: 0, // Starts at 0, plunges down to -100

  // Speed multiplier for upward-rushing particles (peaks in middle zones)
  speed: 1.0,

  // Camera transforms
  cameraY: 0,
  cameraPitch: 0, // Tilts for low-angle hero shot in Zone 4
  cameraDistance: 4.6,

  // Scanline laser heights (-2.0 means inactive/below feet, +2.0 means above head)
  scanline1Y: -2.0, // 25% Early Man -> Inventor
  scanline2Y: -2.0, // 50% Inventor -> Developer
  scanline3Y: -2.0, // 75% Developer -> Robot

  // Active phase index (1 to 4)
  activePhase: 1,

  // Landing transition progress [0.0 = skydiving in air, 1.0 = touchdown on frosted glass]
  landingProgress: 0,

  // Atmospheric colors
  fogColor: new THREE.Color('#291e17'),
  fogDensity: 0.032,
  ambientColor: new THREE.Color('#451a03'),
  keyLightColor: new THREE.Color('#f59e0b'),
};

