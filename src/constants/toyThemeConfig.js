/**
 * ============================================================================
 * FLYINBIRD AI // TOY THEME TUNING CONFIGURATION
 * Edit these values to fine-tune particle counts, tilt angles, scroll ranges,
 * and audio settings.
 * ============================================================================
 */

export const TOY_CONFIG = {
  // 1. BRAND DESIGN TOKENS
  colors: {
    background: '#0B0B10',
    surface: '#15151E',
    raised: '#1F1F2B',
    yellow: '#FFC933', // Rocket accent
    cyan: '#38BDF8',   // AI Rover accent
    coral: '#FF6B5B',  // Robotic Arm accent
    mint: '#34D399',   // Badges accent
    text: '#F5F5F7',
    textDim: '#A1A1AA',
  },

  // 2. STICKER CARDS TILT ANGLES (Alternating degrees)
  stickerCards: {
    tiltAngleLeft: -1.5, // degrees
    tiltAngleRight: 1.5, // degrees
    hardShadowOffset: 6, // px (hard shadow offset)
    hoverLift: -3,       // px translate offset on hover
  },

  // 3. PLAYABLE TOYS & PARTICLES
  particles: {
    maxClickBurstParticles: 10, // Max 6-10 particles per click
    maxActiveParticles: 30,     // Hard cap of 30 total on screen
    cursorTrailMax: 16,         // Max sparkle trail particles
    trailSpawnIntervalMs: 40,   // Rate of trailing sparkles
  },

  // 4. MATTER.JS TOY BOX RIGID BODIES
  toyBox: {
    maxBodies: 25,              // Cap at 25 bodies for optimal 60fps
    restitution: 0.85,          // Bounciness of gears and toys
    friction: 0.05,
    density: 0.002,
  },

  // 5. SCROLL LAUNCH RAIL & ALTITUDE
  scrollRail: {
    maxAltitudeMeters: 100000,  // 100km Karman Line (Orbital space)
    altitudeUnit: 'm',
  },

  // 6. AUDIO SETTINGS (Web Audio API Synthesizer)
  sound: {
    defaultEnabled: false,      // OFF by default
    volume: 0.15,
  },
};

