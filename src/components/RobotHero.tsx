import React, { useEffect, useRef } from 'react';

/**
 * ============================================================================
 * ROBOT JOURNEY WAYPOINT TUNING CONFIGURATION
 * Edit these values to fine-tune the robot's full-page scroll path, rotation
 * angles, layer depths, explosion scale, and eye-tracking behavior.
 * ============================================================================
 */
export const ROBOT_CONFIG = {
  // --------------------------------------------------------------------------
  // 1. SCROLL BREAKPOINTS (Normalized 0.0 -> 1.0)
  // --------------------------------------------------------------------------
  breakpoints: {
    hero: 0.0,    // Top of page
    phase1: 0.3,  // Hero to Section 2 (Core Workshops)
    phase2: 0.7,  // Middle Sections (Value Proposition)
    footer: 1.0,  // Bottom of page (Terminal Booking & Footer)
  },

  // --------------------------------------------------------------------------
  // 2. HORIZONTAL POSITIONING (translateX in vw)
  // --------------------------------------------------------------------------
  // Adjust how far left/right the robot traverses at each scroll stage:
  transXDesktop: {
    hero: 0,      // Progress 0.0: Center of screen (0vw)
    left: -25,    // Progress 0.3: Moves to left side (-25vw) to showcase workshop cards
    right: 25,    // Progress 0.7: Sweeps across to right side (+25vw)
    footer: 0,    // Progress 1.0: Returns to center (0vw) above booking form
  },

  // --------------------------------------------------------------------------
  // 3. VERTICAL POSITIONING (translateY in vh)
  // --------------------------------------------------------------------------
  // Adjust how high/low the robot hovers in the viewport:
  transY: {
    hero: 0,      // Progress 0.0: Standard hero eye-level (0vh)
    mid: 20,      // Progress 0.3 -> 0.7: Hovers in vertical center (+20vh)
    footer: 30,   // Progress 1.0: Settles near the bottom (+30vh) looking up
  },

  // --------------------------------------------------------------------------
  // 4. ROBOT SCALE
  // --------------------------------------------------------------------------
  scaleDesktop: {
    hero: 1.0,    // Progress 0.0: Full scale hero presence (1.0)
    mid: 0.75,    // Progress 0.3 -> 0.7: Compact scale (0.75) to leave room for text
    footer: 0.9,  // Progress 1.0: Near-full scale (0.9) at bottom
  },

  // --------------------------------------------------------------------------
  // 5. 3D HEAD ROTATION ANGLES (in degrees)
  // --------------------------------------------------------------------------
  // Head Y-axis turn (looks left/right toward content as it travels):
  rotateY: {
    hero: 0,      // Progress 0.0: Facing forward
    midLeft: 25,  // Progress 0.3: +25deg turn (looks right toward center content)
    midRight: -25,// Progress 0.7: -25deg turn (looks left toward center content)
    footer: 0,    // Progress 1.0: 0deg (faces center toward booking form)
  },

  // Head X-axis tilt (tilts up/down):
  rotateX: {
    hero: 0,      // Progress 0.0: Level eye gaze
    mid: 0,       // Progress 0.3 -> 0.7: Level gaze
    footer: 10,   // Progress 1.0: Tilts up slightly (+10deg) looking up at form
  },

  // Head Z-axis subtle roll:
  rotateZ: {
    hero: 0,
    midLeft: -2,
    midRight: 2,
    footer: 0,
  },

  // --------------------------------------------------------------------------
  // 6. CURSOR / POINTER 3D TILT (applied additively on top of scroll)
  // --------------------------------------------------------------------------
  cursorRotY: 8,  // ±8 deg horizontal curious head turn toward cursor
  cursorRotX: 6,  // ±6 deg vertical curious head tilt toward cursor

  // --------------------------------------------------------------------------
  // 7. LAYER DEPTH VALUES (translateZ in px for stereoscopic CSS 3D parallax)
  // --------------------------------------------------------------------------
  depths: {
    backPlate: -60,     // Back plate / ears / side bolts: translateZ(-60px)
    neckShoulders: -30, // Neck and shoulders: translateZ(-30px)
    headShell: 0,       // Main head shell: translateZ(0px)
    visor: 30,          // Dark visor panel: translateZ(30px)
    eyes: 55,           // Eye sockets + eyes: translateZ(55px)
    eyelids: 60,        // Eyelids: translateZ(60px)
    shadowBlob: -80,    // Soft shadow blob: translateZ(-80px)
  },

  // Depth Explosion multiplier: depth * (1 + Math.sin(progress * Math.PI) * 0.8)
  // The head opens up mechanically in the middle sections and closes at top & bottom.
  depthExplosionFactor: 0.8,

  // --------------------------------------------------------------------------
  // 8. MOBILE OPTIMIZATIONS (pointer: coarse)
  // --------------------------------------------------------------------------
  mobile: {
    translateX: 0,          // Strictly centered (0vw) so it never wanders off screen
    scale: 0.5,             // Scaled down to 0.5 so it never blocks text
    depthSpreadMult: 0.6,   // 40% reduced translateZ spread
  },

  // --------------------------------------------------------------------------
  // 9. EYE TRACKING BLEND & BIOMETRICS
  // --------------------------------------------------------------------------
  eyeCursorWeight: 0.6,     // 60% cursor tracking weight
  eyeScrollWeight: 0.4,     // 40% scroll context look weight
  maxEyeRadius: 14,         // Max travel radius for pupil inside socket (px)
  pupilDilationDist: 120,   // Cursor proximity threshold for pupil dilation (px)
  lerpFactor: 0.10,         // RAF loop smoothing speed
};

export default function RobotHero() {
  const outerFixedRef = useRef<HTMLDivElement>(null);
  const container3DRef = useRef<HTMLDivElement>(null);
  const rig3DRef = useRef<HTMLDivElement>(null);
  const shadowBlobRef = useRef<HTMLDivElement>(null);

  // Separate 3D Layer Refs
  const layerBackRef = useRef<HTMLDivElement>(null);
  const layerNeckRef = useRef<HTMLDivElement>(null);
  const layerHeadRef = useRef<HTMLDivElement>(null);
  const layerVisorRef = useRef<HTMLDivElement>(null);
  const layerEyesRef = useRef<HTMLDivElement>(null);
  const layerEyelidsRef = useRef<HTMLDivElement>(null);

  // Eye anatomy refs
  const leftSocketRef = useRef<SVGCircleElement>(null);
  const rightSocketRef = useRef<SVGCircleElement>(null);
  const leftEyeGroupRef = useRef<SVGGElement>(null);
  const rightEyeGroupRef = useRef<SVGGElement>(null);
  const leftPupilRef = useRef<SVGCircleElement>(null);
  const rightPupilRef = useRef<SVGCircleElement>(null);
  const leftHighlightRef = useRef<SVGGElement>(null);
  const rightHighlightRef = useRef<SVGGElement>(null);
  const leftEyelidRef = useRef<SVGRectElement>(null);
  const rightEyelidRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const isCoarse =
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: coarse)').matches;

    // Active animation state and lerped targets
    const state = {
      // Full-page scroll progress [0, 1]
      scrollProgress: 0,
      targetScrollProgress: 0,

      // Cursor normalized vector [-1, 1]
      cursorNormX: 0,
      cursorNormY: 0,
      targetCursorNormX: 0,
      targetCursorNormY: 0,

      // Eye offset from cursor
      eyeCursorLx: 0,
      eyeCursorLy: 0,
      eyeCursorRx: 0,
      eyeCursorRy: 0,
      targetEyeCursorLx: 0,
      targetEyeCursorLy: 0,
      targetEyeCursorRx: 0,
      targetEyeCursorRy: 0,

      // Eye pupil dilation (biometric reaction)
      dilation: 1.0,
      targetDilation: 1.0,

      // Blinking & Click reactions
      blinkScaleY: 1.0,
      isBlinking: false,

      // Idle look-around micro movements
      idleX: 0,
      idleY: 0,
      targetIdleX: 0,
      targetIdleY: 0,
      lastInteractionTime: Date.now(),

      // Tab visibility state (pause only when tab is hidden)
      isVisible: true,
    };

    // ------------------------------------------------------------------------
    // 1. FULL-PAGE SCROLL LISTENER (0.0 at top -> 1.0 at footer)
    // ------------------------------------------------------------------------
    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      state.targetScrollProgress = Math.max(0, Math.min(1, scrollY / maxScroll));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // ------------------------------------------------------------------------
    // 2. CURSOR / POINTER TRACKING
    // ------------------------------------------------------------------------
    const onPointerMove = (e: PointerEvent) => {
      state.lastInteractionTime = Date.now();
      const clientX = e.clientX;
      const clientY = e.clientY;
      const winW = window.innerWidth || 1920;
      const winH = window.innerHeight || 1080;

      // Normalized cursor coordinates [-1, 1]
      state.targetCursorNormX = Math.max(-1, Math.min(1, (clientX - winW / 2) / (winW / 2)));
      state.targetCursorNormY = Math.max(-1, Math.min(1, (clientY - winH / 2) / (winH / 2)));

      // Left Eye Target Vector
      if (leftSocketRef.current) {
        const rect = leftSocketRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = clientX - cx;
        const dy = clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 0.001) {
          const factor = Math.min(ROBOT_CONFIG.maxEyeRadius, dist * 0.075);
          state.targetEyeCursorLx = (dx / dist) * factor;
          state.targetEyeCursorLy = (dy / dist) * factor;
        }

        // Proximity Dilation
        if (dist < ROBOT_CONFIG.pupilDilationDist) {
          state.targetDilation = 1.0 + (1 - dist / ROBOT_CONFIG.pupilDilationDist) * 0.28;
        } else {
          state.targetDilation = 1.0;
        }
      }

      // Right Eye Target Vector
      if (rightSocketRef.current) {
        const rect = rightSocketRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = clientX - cx;
        const dy = clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 0.001) {
          const factor = Math.min(ROBOT_CONFIG.maxEyeRadius, dist * 0.075);
          state.targetEyeCursorRx = (dx / dist) * factor;
          state.targetEyeCursorRy = (dy / dist) * factor;
        }

        if (dist < ROBOT_CONFIG.pupilDilationDist) {
          state.targetDilation = Math.max(
            state.targetDilation,
            1.0 + (1 - dist / ROBOT_CONFIG.pupilDilationDist) * 0.28
          );
        }
      }
    };

    const onPointerLeave = () => {
      state.targetCursorNormX = 0;
      state.targetCursorNormY = 0;
      state.targetEyeCursorLx = 0;
      state.targetEyeCursorLy = 0;
      state.targetEyeCursorRx = 0;
      state.targetEyeCursorRy = 0;
      state.targetDilation = 1.0;
    };

    // ------------------------------------------------------------------------
    // 3. MOBILE TOUCH LISTENER
    // ------------------------------------------------------------------------
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        const t = e.touches[0];
        onPointerMove(t as unknown as PointerEvent);
      }
    };

    // ------------------------------------------------------------------------
    // 4. DEVICE ORIENTATION TILT (MOBILE GYROSCOPE)
    // ------------------------------------------------------------------------
    const onDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (Date.now() - state.lastInteractionTime < 1000) return;

      const gamma = e.gamma || 0; // left/right tilt [-90, 90]
      const beta = e.beta || 0;   // front/back tilt [-180, 180]

      const normX = Math.max(-1, Math.min(1, gamma / 25));
      const normY = Math.max(-1, Math.min(1, (beta - 45) / 25));

      state.targetCursorNormX = normX;
      state.targetCursorNormY = normY;

      state.targetEyeCursorLx = normX * ROBOT_CONFIG.maxEyeRadius * 0.8;
      state.targetEyeCursorLy = normY * ROBOT_CONFIG.maxEyeRadius * 0.8;
      state.targetEyeCursorRx = normX * ROBOT_CONFIG.maxEyeRadius * 0.8;
      state.targetEyeCursorRy = normY * ROBOT_CONFIG.maxEyeRadius * 0.8;
    };

    const requestOrientationPermission = () => {
      if (
        typeof DeviceOrientationEvent !== 'undefined' &&
        typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission === 'function'
      ) {
        (DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> })
          .requestPermission()
          .then((res: string) => {
            if (res === 'granted') {
              window.addEventListener('deviceorientation', onDeviceOrientation, { passive: true });
            }
          })
          .catch(() => {});
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onPointerLeave);
    window.addEventListener('click', requestOrientationPermission, { once: true });

    if (typeof window !== 'undefined' && isCoarse) {
      window.addEventListener('deviceorientation', onDeviceOrientation, { passive: true });
    }

    // ------------------------------------------------------------------------
    // 5. CLICK-REACT INTERACTION (Curious blink + pupil expansion)
    // ------------------------------------------------------------------------
    const onClickReact = () => {
      state.isBlinking = true;
      state.blinkScaleY = 0.05;
      state.targetDilation = 1.35;
      setTimeout(() => {
        state.blinkScaleY = 1.0;
        state.isBlinking = false;
        setTimeout(() => {
          state.targetDilation = 1.0;
        }, 300);
      }, 140);
    };
    const currentContainer = container3DRef.current;
    if (currentContainer) {
      currentContainer.addEventListener('click', onClickReact);
    }

    // ------------------------------------------------------------------------
    // 6. IDLE NATURAL BLINKING & MICRO LOOK-AROUND
    // ------------------------------------------------------------------------
    let blinkTimeout: NodeJS.Timeout;
    const scheduleNextBlink = () => {
      const delay = 3200 + Math.random() * 3800; // blink every 3.2 - 7s
      blinkTimeout = setTimeout(() => {
        if (!state.isBlinking) {
          state.isBlinking = true;
          state.blinkScaleY = 0.05;
          setTimeout(() => {
            state.blinkScaleY = 1.0;
            state.isBlinking = false;
            scheduleNextBlink();
          }, 120);
        } else {
          scheduleNextBlink();
        }
      }, delay);
    };
    scheduleNextBlink();

    let idleInterval: NodeJS.Timeout;
    idleInterval = setInterval(() => {
      if (Date.now() - state.lastInteractionTime > 2500) {
        state.targetIdleX = (Math.random() - 0.5) * 4;
        state.targetIdleY = (Math.random() - 0.5) * 3;
      } else {
        state.targetIdleX = 0;
        state.targetIdleY = 0;
      }
    }, 2800);

    // ------------------------------------------------------------------------
    // 7. TAB VISIBILITY PAUSE (Never pause on scroll since robot is fixed)
    // ------------------------------------------------------------------------
    const onVisibilityChange = () => {
      state.isVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    // ------------------------------------------------------------------------
    // 8. HIGH-PERFORMANCE 60FPS RAF CHOREOGRAPHY LOOP
    // ------------------------------------------------------------------------
    let animId: number;
    const tick = () => {
      if (!state.isVisible) {
        animId = requestAnimationFrame(tick);
        return;
      }

      if (prefersReducedMotion) {
        animId = requestAnimationFrame(tick);
        return;
      }

      const lerp = ROBOT_CONFIG.lerpFactor;

      // Smooth scroll progress lerp
      state.scrollProgress += (state.targetScrollProgress - state.scrollProgress) * lerp;

      // Smooth cursor lerp
      state.cursorNormX += (state.targetCursorNormX - state.cursorNormX) * lerp;
      state.cursorNormY += (state.targetCursorNormY - state.cursorNormY) * lerp;

      // Smooth eye offset lerp
      state.eyeCursorLx += (state.targetEyeCursorLx - state.eyeCursorLx) * lerp;
      state.eyeCursorLy += (state.targetEyeCursorLy - state.eyeCursorLy) * lerp;
      state.eyeCursorRx += (state.targetEyeCursorRx - state.eyeCursorRx) * lerp;
      state.eyeCursorRy += (state.targetEyeCursorRy - state.eyeCursorRy) * lerp;

      // Smooth dilation & idle micro movements
      state.dilation += (state.targetDilation - state.dilation) * lerp;
      state.idleX += (state.targetIdleX - state.idleX) * 0.05;
      state.idleY += (state.targetIdleY - state.idleY) * 0.05;

      const p = state.scrollProgress;

      // ----------------------------------------------------------------------
      // SCROLL CHOREOGRAPHY (3 DISTINCT WAYPOINT INTERVALS)
      // ----------------------------------------------------------------------
      let transX = 0;
      let transY = 0;
      let scale = 1.0;
      let rotY = 0;
      let rotX = 0;
      let rotZ = 0;
      let scrollEyeX = 0;
      let scrollEyeY = 0;

      const bp = ROBOT_CONFIG.breakpoints;

      if (p <= bp.phase1) {
        // --- PHASE 1: 0.0 to 0.3 (Hero to Section 2: Core Workshops) ---
        // Whole robot translateX drifts from 0vw to -25vw (moves to left side).
        // scale drops from 1 to 0.75.
        // Head rotateY turns +25deg to look toward center content.
        const t = p / bp.phase1; // 0 -> 1
        transX = t * ROBOT_CONFIG.transXDesktop.left;
        transY = t * ROBOT_CONFIG.transY.mid;
        scale = 1.0 - t * (1.0 - ROBOT_CONFIG.scaleDesktop.mid);
        rotY = t * ROBOT_CONFIG.rotateY.midLeft;
        rotX = 0;
        rotZ = t * ROBOT_CONFIG.rotateZ.midLeft;

        // Eyes look right toward center content (+X)
        scrollEyeX = t * 12;
        scrollEyeY = t * 2;
      } else if (p <= bp.phase2) {
        // --- PHASE 2: 0.3 to 0.7 (Middle Sections: Value Proposition) ---
        // Robot translateY moves down to hover in vertical center (+20vh).
        // translateX sweeps from -25vw across to +25vw (moves to right side).
        // Head rotateY smoothly transitions from +25deg to -25deg.
        const t = (p - bp.phase1) / (bp.phase2 - bp.phase1); // 0 -> 1
        transX = ROBOT_CONFIG.transXDesktop.left + t * (ROBOT_CONFIG.transXDesktop.right - ROBOT_CONFIG.transXDesktop.left);
        transY = ROBOT_CONFIG.transY.mid;
        scale = ROBOT_CONFIG.scaleDesktop.mid;
        rotY = ROBOT_CONFIG.rotateY.midLeft + t * (ROBOT_CONFIG.rotateY.midRight - ROBOT_CONFIG.rotateY.midLeft);
        rotX = 0;
        rotZ = ROBOT_CONFIG.rotateZ.midLeft + t * (ROBOT_CONFIG.rotateZ.midRight - ROBOT_CONFIG.rotateZ.midLeft);

        // Eyes sweep from looking right (+12) across to looking left (-12)
        scrollEyeX = 12 - t * 24;
        scrollEyeY = 2 - t * 4;
      } else {
        // --- PHASE 3: 0.7 to 1.0 (Footer / Terminal Booking) ---
        // Robot translateX returns to 0vw (center).
        // translateY moves to +30vh (nestling near bottom of screen).
        // scale returns to 0.9.
        // Head rotateX tilts up slightly (+10deg) looking up at booking form.
        const t = (p - bp.phase2) / (bp.footer - bp.phase2); // 0 -> 1
        transX = ROBOT_CONFIG.transXDesktop.right + t * (ROBOT_CONFIG.transXDesktop.footer - ROBOT_CONFIG.transXDesktop.right);
        transY = ROBOT_CONFIG.transY.mid + t * (ROBOT_CONFIG.transY.footer - ROBOT_CONFIG.transY.mid);
        scale = ROBOT_CONFIG.scaleDesktop.mid + t * (ROBOT_CONFIG.scaleDesktop.footer - ROBOT_CONFIG.scaleDesktop.mid);
        rotY = ROBOT_CONFIG.rotateY.midRight + t * (ROBOT_CONFIG.rotateY.footer - ROBOT_CONFIG.rotateY.midRight);
        rotX = t * ROBOT_CONFIG.rotateX.footer;
        rotZ = ROBOT_CONFIG.rotateZ.midRight + t * (ROBOT_CONFIG.rotateZ.footer - ROBOT_CONFIG.rotateZ.midRight);

        // Eyes sweep back to center and look upward (-10px) toward the form
        scrollEyeX = -12 + t * 12;
        scrollEyeY = -2 - t * 8;
      }

      // MOBILE OVERRIDES: Keep centered at 0vw and scale at 0.5
      if (isCoarse) {
        transX = ROBOT_CONFIG.mobile.translateX;
        scale = ROBOT_CONFIG.mobile.scale;
      }

      // Add cursor / tilt 3D rotation on top of scroll
      const finalRotY = rotY + state.cursorNormX * ROBOT_CONFIG.cursorRotY;
      const finalRotX = rotX - state.cursorNormY * ROBOT_CONFIG.cursorRotX;
      const finalRotZ = rotZ;

      // ----------------------------------------------------------------------
      // DEPTH EXPLOSION CALCULATION
      // Multiplied by (1 + Math.sin(progress * Math.PI) * 0.8)
      // Opens up mechanically in middle sections, closes at top and bottom.
      // ----------------------------------------------------------------------
      const baseExplosion = Math.sin(p * Math.PI) * ROBOT_CONFIG.depthExplosionFactor;
      const depthMult = isCoarse
        ? ROBOT_CONFIG.mobile.depthSpreadMult * (1 + baseExplosion * 0.6)
        : 1 + baseExplosion;

      // ----------------------------------------------------------------------
      // WRITE RESULTS TO CSS VARIABLES & HARDWARE-ACCELERATED TRANSFORMS
      // ----------------------------------------------------------------------
      if (container3DRef.current) {
        container3DRef.current.style.setProperty('--scroll-progress', p.toFixed(4));
        container3DRef.current.style.setProperty('--robot-trans-x', `${transX.toFixed(2)}vw`);
        container3DRef.current.style.setProperty('--robot-trans-y', `${transY.toFixed(2)}vh`);
        container3DRef.current.style.setProperty('--robot-rot-y', `${finalRotY.toFixed(2)}deg`);
        container3DRef.current.style.setProperty('--robot-rot-x', `${finalRotX.toFixed(2)}deg`);
        container3DRef.current.style.setProperty('--robot-scale', scale.toFixed(3));
        container3DRef.current.style.setProperty('--robot-depth-mult', depthMult.toFixed(3));
      }

      // Main 3D Rig transform (constant full opacity 1.0)
      if (rig3DRef.current) {
        rig3DRef.current.style.transform = `translate3d(${transX.toFixed(2)}vw, ${transY.toFixed(2)}vh, 0px) rotateY(${finalRotY.toFixed(2)}deg) rotateX(${finalRotX.toFixed(2)}deg) rotateZ(${finalRotZ.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        rig3DRef.current.style.opacity = '1.0';
      }

      // Individual layer depth transformations (translateZ)
      const d = ROBOT_CONFIG.depths;
      if (layerBackRef.current) {
        layerBackRef.current.style.transform = `translate3d(0, 0, ${(d.backPlate * depthMult).toFixed(1)}px)`;
      }
      if (layerNeckRef.current) {
        layerNeckRef.current.style.transform = `translate3d(0, 0, ${(d.neckShoulders * depthMult).toFixed(1)}px)`;
      }
      if (layerHeadRef.current) {
        layerHeadRef.current.style.transform = `translate3d(0, 0, ${(d.headShell * depthMult).toFixed(1)}px)`;
      }
      if (layerVisorRef.current) {
        layerVisorRef.current.style.transform = `translate3d(0, 0, ${(d.visor * depthMult).toFixed(1)}px)`;
      }
      if (layerEyesRef.current) {
        layerEyesRef.current.style.transform = `translate3d(0, 0, ${(d.eyes * depthMult).toFixed(1)}px)`;
      }
      if (layerEyelidsRef.current) {
        layerEyelidsRef.current.style.transform = `translate3d(0, 0, ${(d.eyelids * depthMult).toFixed(1)}px)`;
      }

      // Soft shadow blob shifts opposite to head's rotation
      if (shadowBlobRef.current) {
        const shadowShiftX = -finalRotY * 1.8;
        const shadowShiftY = finalRotX * 1.5;
        shadowBlobRef.current.style.transform = `translate3d(${shadowShiftX.toFixed(1)}px, ${shadowShiftY.toFixed(1)}px, ${d.shadowBlob}px) scale(${(scale * 0.95).toFixed(2)})`;
      }

      // ----------------------------------------------------------------------
      // EYE TRACKING BLEND (Cursor weight 0.6 + Scroll weight 0.4)
      // ----------------------------------------------------------------------
      const cw = ROBOT_CONFIG.eyeCursorWeight;
      const sw = ROBOT_CONFIG.eyeScrollWeight;
      const maxR = ROBOT_CONFIG.maxEyeRadius;

      const blendedEyeLx = (state.eyeCursorLx + state.idleX) * cw + scrollEyeX * sw;
      const blendedEyeLy = (state.eyeCursorLy + state.idleY) * cw + scrollEyeY * sw;
      const blendedEyeRx = (state.eyeCursorRx + state.idleX) * cw + scrollEyeX * sw;
      const blendedEyeRy = (state.eyeCursorRy + state.idleY) * cw + scrollEyeY * sw;

      const finalLx = Math.max(-maxR, Math.min(maxR, blendedEyeLx));
      const finalLy = Math.max(-maxR, Math.min(maxR, blendedEyeLy));
      const finalRx = Math.max(-maxR, Math.min(maxR, blendedEyeRx));
      const finalRy = Math.max(-maxR, Math.min(maxR, blendedEyeRy));

      if (leftEyeGroupRef.current) {
        leftEyeGroupRef.current.setAttribute('transform', `translate(${finalLx.toFixed(2)}, ${finalLy.toFixed(2)})`);
      }
      if (rightEyeGroupRef.current) {
        rightEyeGroupRef.current.setAttribute('transform', `translate(${finalRx.toFixed(2)}, ${finalRy.toFixed(2)})`);
      }

      // Specular highlight dot counter-parallax (moves opposite at 35% scale)
      if (leftHighlightRef.current) {
        leftHighlightRef.current.setAttribute(
          'transform',
          `translate(${(finalLx * -0.35).toFixed(2)}, ${(finalLy * -0.35).toFixed(2)})`
        );
      }
      if (rightHighlightRef.current) {
        rightHighlightRef.current.setAttribute(
          'transform',
          `translate(${(finalRx * -0.35).toFixed(2)}, ${(finalRy * -0.35).toFixed(2)})`
        );
      }

      // Pupil dilation
      if (leftPupilRef.current) {
        leftPupilRef.current.setAttribute('transform', `scale(${state.dilation.toFixed(3)})`);
      }
      if (rightPupilRef.current) {
        rightPupilRef.current.setAttribute('transform', `scale(${state.dilation.toFixed(3)})`);
      }

      // Eyelid blinking
      if (leftEyelidRef.current && rightEyelidRef.current) {
        const h = 88 * (1 - state.blinkScaleY);
        leftEyelidRef.current.setAttribute('height', h.toFixed(1));
        rightEyelidRef.current.setAttribute('height', h.toFixed(1));
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(blinkTimeout);
      clearInterval(idleInterval);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onPointerLeave);
      window.removeEventListener('click', requestOrientationPermission);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (currentContainer) {
        currentContainer.removeEventListener('click', onClickReact);
      }
      if (typeof window !== 'undefined') {
        window.removeEventListener('deviceorientation', onDeviceOrientation);
      }
    };
  }, []);

  return (
    <div
      ref={outerFixedRef}
      aria-hidden="true"
      className="fixed top-0 left-0 w-screen h-screen pointer-events-none select-none overflow-hidden z-40 flex items-center justify-center"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 40,
      }}
    >
      {/* 
        3D PERSPECTIVE SCENE CONTAINER (perspective: 1200px)
        pointer-events: auto on the robot so it can be clicked.
      */}
      <div
        ref={container3DRef}
        className="relative w-[340px] sm:w-[520px] md:w-[640px] lg:w-[720px] h-[320px] sm:h-[480px] md:h-[580px] lg:h-[620px] pointer-events-auto cursor-pointer"
        style={{
          perspective: '1200px',
          pointerEvents: 'auto',
        }}
      >
        {/* 
          CENTRAL 3D RIG
          Rotates and translates across the screen based on full-page scroll and cursor.
          will-change: transform only on the container.
        */}
        <div
          ref={rig3DRef}
          className="relative w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            willChange: 'transform',
            transformOrigin: '50% 50% 0px',
            opacity: 1.0, // Retains full visibility throughout scroll
          }}
        >
          {/* ========================================================
              LAYER 0: SOFT SHADOW BLOB (shifts opposite to rotation)
              translateZ(-80px)
             ======================================================== */}
          <div
            ref={shadowBlobRef}
            className="absolute left-[20%] top-[72%] w-[380px] h-[120px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 70%)',
              filter: 'blur(28px)',
              backfaceVisibility: 'hidden',
              transform: `translate3d(0, 0, ${ROBOT_CONFIG.depths.shadowBlob}px)`,
            }}
          />

          {/* ========================================================
              COMMON SVG DEFINITIONS (Gradients, Filters, Clips)
             ======================================================== */}
          <svg className="absolute w-0 h-0 pointer-events-none">
            <defs>
              {/* Head Shell Matte Gradient */}
              <linearGradient id="headShellGrad3D" x1="360" y1="40" x2="360" y2="520" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#484d57" />
                <stop offset="35%" stopColor="#2c2f35" />
                <stop offset="85%" stopColor="#181a1e" />
                <stop offset="100%" stopColor="#0e0f12" />
              </linearGradient>

              {/* 1-2px Crisp Rim Light on Top and Right of Head Shell */}
              <linearGradient id="headRimLight3D" x1="160" y1="50" x2="560" y2="400" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.85" />
                <stop offset="35%" stopColor="#94a3b8" stopOpacity="0.7" />
                <stop offset="70%" stopColor="#475569" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#1e293b" stopOpacity="0.1" />
              </linearGradient>

              {/* Dark Visor Gradient */}
              <linearGradient id="visorGrad3D" x1="360" y1="180" x2="360" y2="380" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#121317" />
                <stop offset="50%" stopColor="#090a0d" />
                <stop offset="100%" stopColor="#040405" />
              </linearGradient>

              {/* Faint Cool-Blue Visor Rim Glow (about 15% opacity) */}
              <linearGradient id="visorCoolBlueGlow" x1="200" y1="180" x2="520" y2="370" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
                <stop offset="50%" stopColor="#0284c7" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.25" />
              </linearGradient>

              {/* Visor Glare Reflection */}
              <linearGradient id="visorReflection3D" x1="210" y1="180" x2="510" y2="340" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
                <stop offset="35%" stopColor="#ffffff" stopOpacity="0.03" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>

              {/* Deep Eye Socket Inset Shadow */}
              <radialGradient id="socketShadow3D" cx="50%" cy="50%" r="50%">
                <stop offset="65%" stopColor="#020304" />
                <stop offset="90%" stopColor="#0d0e12" />
                <stop offset="100%" stopColor="#1a1d24" />
              </radialGradient>

              {/* Clearly Readable Iris: Dark Blue-Grey with Crisp Border Ring */}
              <radialGradient id="irisGrad3D" cx="45%" cy="40%" r="55%">
                <stop offset="0%" stopColor="#253a54" />
                <stop offset="45%" stopColor="#162335" />
                <stop offset="85%" stopColor="#0c131d" />
                <stop offset="100%" stopColor="#06090f" />
              </radialGradient>

              {/* Iris Specular Technical Border Ring */}
              <radialGradient id="irisRing3D" cx="50%" cy="50%" r="50%">
                <stop offset="82%" stopColor="#38bdf8" stopOpacity="0" />
                <stop offset="94%" stopColor="#38bdf8" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
              </radialGradient>

              {/* Ear Sensor Pod Gradient */}
              <linearGradient id="earPodGrad3D" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#3a3f47" />
                <stop offset="100%" stopColor="#141518" />
              </linearGradient>

              {/* Eye Clipping Paths */}
              <clipPath id="leftSocketClip3D">
                <circle cx="280" cy="275" r="42" />
              </clipPath>
              <clipPath id="rightSocketClip3D">
                <circle cx="440" cy="275" r="42" />
              </clipPath>
            </defs>
          </svg>

          {/* ========================================================
              LAYER 1: BACK PLATE / EARS / SIDE BOLTS
              translateZ(-60px)
             ======================================================== */}
          <div
            ref={layerBackRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              transform: `translate3d(0, 0, ${ROBOT_CONFIG.depths.backPlate}px)`,
            }}
          >
            <svg viewBox="0 0 720 620" fill="none" className="w-full h-full overflow-visible">
              {/* Left Ear Sensor Pod */}
              <rect
                x="142"
                y="240"
                width="24"
                height="80"
                rx="6"
                fill="url(#earPodGrad3D)"
                stroke="#2a2e36"
                strokeWidth="1.5"
              />
              <circle cx="154" cy="280" r="5" fill="#090a0d" stroke="#fde68a" strokeWidth="1" strokeOpacity="0.8" />
              <rect x="148" y="248" width="12" height="4" rx="1" fill="#475569" />
              <rect x="148" y="308" width="12" height="4" rx="1" fill="#475569" />

              {/* Right Ear Sensor Pod */}
              <rect
                x="554"
                y="240"
                width="24"
                height="80"
                rx="6"
                fill="url(#earPodGrad3D)"
                stroke="#2a2e36"
                strokeWidth="1.5"
              />
              <circle cx="566" cy="280" r="5" fill="#090a0d" stroke="#fde68a" strokeWidth="1" strokeOpacity="0.8" />
              <rect x="560" y="248" width="12" height="4" rx="1" fill="#475569" />
              <rect x="560" y="308" width="12" height="4" rx="1" fill="#475569" />

              {/* Rear Cranial Back Plate Rim */}
              <rect
                x="154"
                y="55"
                width="412"
                height="440"
                rx="140"
                fill="#0b0c0e"
                stroke="#1f2229"
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* ========================================================
              LAYER 2: NECK AND SHOULDERS
              translateZ(-30px)
             ======================================================== */}
          <div
            ref={layerNeckRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              transform: `translate3d(0, 0, ${ROBOT_CONFIG.depths.neckShoulders}px)`,
            }}
          >
            <svg viewBox="0 0 720 620" fill="none" className="w-full h-full overflow-visible">
              {/* Neck Base Collar */}
              <path
                d="M305 480 L415 480 L435 550 L285 550 Z"
                fill="#121317"
                stroke="#262932"
                strokeWidth="1.5"
              />
              {/* Metallic conduit ribbing */}
              <line x1="315" y1="500" x2="405" y2="500" stroke="#1f222a" strokeWidth="3.5" />
              <line x1="320" y1="520" x2="400" y2="520" stroke="#1f222a" strokeWidth="3.5" />
              <line x1="325" y1="538" x2="395" y2="538" stroke="#1f222a" strokeWidth="3.5" />

              {/* Shoulder Base Contours */}
              <path
                d="M260 550 Q200 565 140 590 L580 590 Q520 565 460 550 Z"
                fill="#0d0e12"
                stroke="#1e2129"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          {/* ========================================================
              LAYER 3: MAIN HEAD SHELL
              translateZ(0px)
             ======================================================== */}
          <div
            ref={layerHeadRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              transform: `translate3d(0, 0, ${ROBOT_CONFIG.depths.headShell}px)`,
            }}
          >
            <svg viewBox="0 0 720 620" fill="none" className="w-full h-full overflow-visible">
              {/* Matte Head Shell */}
              <rect
                x="160"
                y="60"
                width="400"
                height="430"
                rx="135"
                fill="url(#headShellGrad3D)"
                stroke="#2c3038"
                strokeWidth="1.5"
              />

              {/* Subtle Rim Light: 1-2px lighter edge on top and right */}
              <path
                d="M210 75 Q360 50 510 75 Q550 180 558 320"
                stroke="url(#headRimLight3D)"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Forehead Sensor Aperture */}
              <circle cx="360" cy="115" r="5" fill="#0b0c0f" stroke="#333842" strokeWidth="1" />
              <circle cx="360" cy="115" r="1.8" fill="#fde68a" opacity="0.85" />

              {/* Minimalist Acoustic Mouth Grill Lines */}
              <line x1="315" y1="418" x2="405" y2="418" stroke="#181a1f" strokeWidth="2" strokeLinecap="round" />
              <line x1="330" y1="426" x2="390" y2="426" stroke="#181a1f" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="345" y1="434" x2="375" y2="434" stroke="#181a1f" strokeWidth="1.5" strokeLinecap="round" />

              {/* Chin Contour */}
              <path d="M290 462 Q360 482 430 462" stroke="#1c1e24" strokeWidth="1.5" fill="none" />
            </svg>
          </div>

          {/* ========================================================
              LAYER 4: DARK VISOR PANEL
              translateZ(30px)
             ======================================================== */}
          <div
            ref={layerVisorRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              transform: `translate3d(0, 0, ${ROBOT_CONFIG.depths.visor}px)`,
            }}
          >
            <svg viewBox="0 0 720 620" fill="none" className="w-full h-full overflow-visible">
              {/* Faint Cool-Blue Glow Rim around visor edges (about 15% opacity) */}
              <rect
                x="196"
                y="176"
                width="328"
                height="198"
                rx="84"
                fill="none"
                stroke="url(#visorCoolBlueGlow)"
                strokeWidth="2"
              />

              {/* Dark Visor Recessed Panel */}
              <rect
                x="200"
                y="180"
                width="320"
                height="190"
                rx="80"
                fill="url(#visorGrad3D)"
                stroke="#1e222a"
                strokeWidth="2"
              />

              {/* Visor Glare Curve */}
              <path
                d="M215 220 Q360 185 490 200 L470 238 Q350 220 230 258 Z"
                fill="url(#visorReflection3D)"
              />
            </svg>
          </div>

          {/* ========================================================
              LAYER 5: EYE SOCKETS + EYES (iris, pupil, highlight)
              translateZ(55px)
             ======================================================== */}
          <div
            ref={layerEyesRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              transform: `translate3d(0, 0, ${ROBOT_CONFIG.depths.eyes}px)`,
            }}
          >
            <svg viewBox="0 0 720 620" fill="none" className="w-full h-full overflow-visible">
              {/* --- LEFT EYE --- */}
              <g>
                {/* Indented Dark Socket */}
                <circle
                  ref={leftSocketRef}
                  cx="280"
                  cy="275"
                  r="42"
                  fill="url(#socketShadow3D)"
                  stroke="#222630"
                  strokeWidth="2.5"
                />

                {/* Movable Pupil & Iris Assembly */}
                <g clipPath="url(#leftSocketClip3D)">
                  <g ref={leftEyeGroupRef}>
                    {/* Visible Iris: Dark blue-grey with crisp outer ring */}
                    <circle cx="280" cy="275" r="32" fill="url(#irisGrad3D)" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.45" />
                    <circle cx="280" cy="275" r="32" fill="url(#irisRing3D)" />

                    {/* Dark Pupil (dilates on close cursor) */}
                    <g transform-origin="280 275">
                      <circle
                        ref={leftPupilRef}
                        cx="280"
                        cy="275"
                        r="16"
                        fill="#000000"
                        stroke="#0f172a"
                        strokeWidth="1"
                      />
                    </g>

                    {/* Specular White Highlight Dot (moves with counter-parallax) */}
                    <g ref={leftHighlightRef}>
                      <circle cx="288" cy="265" r="3.5" fill="#ffffff" opacity="0.95" />
                      <circle cx="273" cy="282" r="1.5" fill="#ffffff" opacity="0.5" />
                    </g>
                  </g>
                </g>
              </g>

              {/* --- RIGHT EYE --- */}
              <g>
                {/* Indented Dark Socket */}
                <circle
                  ref={rightSocketRef}
                  cx="440"
                  cy="275"
                  r="42"
                  fill="url(#socketShadow3D)"
                  stroke="#222630"
                  strokeWidth="2.5"
                />

                {/* Movable Pupil & Iris Assembly */}
                <g clipPath="url(#rightSocketClip3D)">
                  <g ref={rightEyeGroupRef}>
                    {/* Visible Iris: Dark blue-grey with crisp outer ring */}
                    <circle cx="440" cy="275" r="32" fill="url(#irisGrad3D)" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.45" />
                    <circle cx="440" cy="275" r="32" fill="url(#irisRing3D)" />

                    {/* Dark Pupil (dilates on close cursor) */}
                    <g transform-origin="440 275">
                      <circle
                        ref={rightPupilRef}
                        cx="440"
                        cy="275"
                        r="16"
                        fill="#000000"
                        stroke="#0f172a"
                        strokeWidth="1"
                      />
                    </g>

                    {/* Specular White Highlight Dot (moves with counter-parallax) */}
                    <g ref={rightHighlightRef}>
                      <circle cx="448" cy="265" r="3.5" fill="#ffffff" opacity="0.95" />
                      <circle cx="433" cy="282" r="1.5" fill="#ffffff" opacity="0.5" />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>

          {/* ========================================================
              LAYER 6: EYELIDS (for lifelike blinking)
              translateZ(60px)
             ======================================================== */}
          <div
            ref={layerEyelidsRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              transform: `translate3d(0, 0, ${ROBOT_CONFIG.depths.eyelids}px)`,
            }}
          >
            <svg viewBox="0 0 720 620" fill="none" className="w-full h-full overflow-visible">
              <g clipPath="url(#leftSocketClip3D)">
                <rect
                  ref={leftEyelidRef}
                  x="230"
                  y="230"
                  width="100"
                  height="0"
                  fill="#181a1f"
                />
              </g>
              <g clipPath="url(#rightSocketClip3D)">
                <rect
                  ref={rightEyelidRef}
                  x="390"
                  y="230"
                  width="100"
                  height="0"
                  fill="#181a1f"
                />
              </g>
            </svg>
          </div>

        </div>
      </div>
    </div>
  );
}
