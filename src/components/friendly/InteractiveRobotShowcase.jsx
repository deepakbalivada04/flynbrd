import React, { useEffect, useRef } from 'react';

/**
 * InteractiveRobotShowcase — "Pip"
 * 
 * Features:
 * - Removed the 3 grade buttons as requested.
 * - Adorable, natural Waving Animation: Pip waves his arm and hand back and forth
 *   with organic wrist follow-through and friendly timing!
 * - Movable: Fully draggable across the arena with spring physics, momentum, and rolling wheel treads.
 * - Drive to click: Click anywhere in the arena and Pip drives smoothly to that spot.
 * - Collectible boutique toy aesthetic:
 *   - Polished oxblood enamel chassis with brass rivets and copper suspension.
 *   - Glass core window revealing glowing microcontroller brain and gold circuit traces.
 *   - Expressive, lovable eyes with dual specular highlight glints that widen and follow movement.
 *   - Gentle unscripted life: idle breathing, antenna sway, blinks, and curiosity tilt.
 */
export default function InteractiveRobotShowcase() {
  const stageRef = useRef(null);
  const isVisibleRef = useRef(true);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0, pipStartX: 0, pipStartY: 0 });

  // Physics state for Pip's position and mobility
  const physics = useRef({
    x: 0,             // Current X relative to center (-95 to +95)
    y: 0,             // Current Y relative to center (-60 to +60)
    targetX: 0,       // Destination X
    targetY: 0,       // Destination Y
    vx: 0,            // Velocity X
    vy: 0,            // Velocity Y
    wheelAngle: 0,    // Degrees for rolling wheel treads
    bodyTilt: 0,      // Degrees body tilts during motion
    antennaLag: 0,    // Extra lag from velocity
    isMoving: false,
    eyeWiden: 1.0,    // Eyes widen when moving or dragged
  });

  // Animation values stored in refs for 60fps rAF
  const animState = useRef({
    eyelidOpen: 1,
    arrivalStartTime: 0,
    isArriving: false,

    breathPhase: 0,
    breathScale: 1.0,

    // Waving animation
    waveTimer: 0,
    isExcitedWave: false,

    nextBlinkTime: 0,
    isBlinking: false,
    blinkStartTime: 0,
    isDoubleBlink: false,
    blinkStage: 0,

    antennaPhase: 0,
    antennaAngle: 0,

    currentEyeX: 0,
    currentEyeY: 0,
    targetEyeX: 0,
    targetEyeY: 0,

    headRot: 0,
    targetHeadRot: 0,

    lastPointerMoveTime: Date.now(),
    curiosityPhase: 0,
    curiosityStartTime: 0,
    curiosityAngle: 0,

    hasTilted: false,
  });

  // Direct DOM refs for 60fps transform updating
  const pipContainerRef = useRef(null);
  const bodyGroupRef = useRef(null);
  const headGroupRef = useRef(null);
  const antennaGroupRef = useRef(null);
  const leftWheelRef = useRef(null);
  const rightWheelRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const leftArmRef = useRef(null);
  const leftHandRef = useRef(null);

  // 1. Session Setup
  useEffect(() => {
    let arrived = false;
    try {
      arrived = sessionStorage.getItem('pip_arrived_v3') === 'true';
    } catch (e) {
      arrived = false;
    }

    if (!arrived) {
      try {
        sessionStorage.setItem('pip_arrived_v3', 'true');
      } catch (e) {}
      animState.current.eyelidOpen = 0.05;
      animState.current.isArriving = true;
      animState.current.arrivalStartTime = performance.now();
    } else {
      animState.current.eyelidOpen = 1.0;
    }

    animState.current.nextBlinkTime = performance.now() + 2500 + Math.random() * 3000;
  }, []);

  // 2. Visibility Observer
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 3. Pointer & Dragging Events (Make Pip Movable!)
  const handlePointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    
    isDraggingRef.current = true;
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      pipStartX: physics.current.x,
      pipStartY: physics.current.y,
    };

    physics.current.eyeWiden = 1.25;
    animState.current.isExcitedWave = true;
    animState.current.lastPointerMoveTime = Date.now();

    e.preventDefault();
  };

  useEffect(() => {
    const handleGlobalPointerMove = (e) => {
      animState.current.lastPointerMoveTime = Date.now();

      if (isDraggingRef.current) {
        const dx = e.clientX - dragStartRef.current.x;
        const dy = e.clientY - dragStartRef.current.y;

        const nextX = Math.max(-95, Math.min(95, dragStartRef.current.pipStartX + dx));
        const nextY = Math.max(-60, Math.min(60, dragStartRef.current.pipStartY + dy));

        physics.current.targetX = nextX;
        physics.current.targetY = nextY;
      } else if (stageRef.current) {
        const rect = stageRef.current.getBoundingClientRect();
        const inStage =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        if (inStage) {
          const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
          const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
          animState.current.targetEyeX = Math.max(-3, Math.min(3, normX * 3));
          animState.current.targetEyeY = Math.max(-3, Math.min(3, normY * 3));
          animState.current.targetHeadRot = normX * 2.5;
          animState.current.isExcitedWave = true;
        } else {
          animState.current.targetEyeX = 0;
          animState.current.targetEyeY = 0;
          animState.current.targetHeadRot = 0;
          animState.current.isExcitedWave = false;
        }
      }
    };

    const handleGlobalPointerUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        physics.current.eyeWiden = 1.0;
        animState.current.isExcitedWave = false;
      }
    };

    window.addEventListener('pointermove', handleGlobalPointerMove, { passive: true });
    window.addEventListener('pointerup', handleGlobalPointerUp);
    window.addEventListener('pointercancel', handleGlobalPointerUp);

    return () => {
      window.removeEventListener('pointermove', handleGlobalPointerMove);
      window.removeEventListener('pointerup', handleGlobalPointerUp);
      window.removeEventListener('pointercancel', handleGlobalPointerUp);
    };
  }, []);

  // Click on stage to drive Pip to that location
  const handleStageClick = (e) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left - rect.width * 0.5;
    const clickY = e.clientY - rect.top - rect.height * 0.5;

    physics.current.targetX = Math.max(-95, Math.min(95, clickX));
    physics.current.targetY = Math.max(-60, Math.min(60, clickY));
  };

  // 4. Master 60fps Physics, Waving, & Life Loop
  useEffect(() => {
    let rafId;
    let lastTime = performance.now();

    const loop = (currentTime) => {
      rafId = requestAnimationFrame(loop);

      if (!isVisibleRef.current) {
        lastTime = currentTime;
        return;
      }

      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      const p = physics.current;
      const state = animState.current;

      // --- MOVABLE SPRING PHYSICS ---
      const dx = p.targetX - p.x;
      const dy = p.targetY - p.y;

      const springK = isDraggingRef.current ? 0.35 : 0.08;
      p.vx = p.vx * 0.72 + dx * springK;
      p.vy = p.vy * 0.72 + dy * springK;

      p.x += p.vx;
      p.y += p.vy;

      const speed = Math.hypot(p.vx, p.vy);
      p.isMoving = speed > 0.15;

      // Rolling wheels
      p.wheelAngle = (p.wheelAngle + p.vx * 3.8) % 360;

      // Dynamic tilt: Pip leans into velocity
      const targetTilt = Math.max(-7, Math.min(7, p.vx * 0.7));
      p.bodyTilt += (targetTilt - p.bodyTilt) * 0.12;

      // Antenna inertia
      p.antennaLag += (-p.vx * 1.2 - p.antennaLag) * 0.15;

      if (p.isMoving && !isDraggingRef.current) {
        state.targetEyeX = Math.max(-3, Math.min(3, p.vx * 0.6));
        state.targetEyeY = Math.max(-3, Math.min(3, p.vy * 0.6));
      }

      // --- WAVING ANIMATION ---
      state.waveTimer += dt * (state.isExcitedWave ? 1.4 : 1.0);
      const waveCycle = state.waveTimer % 3.6;
      let armAngle = 0;
      let handAngle = 0;

      if (waveCycle < 2.0 || state.isExcitedWave) {
        // Active friendly wave: 3 smooth back-and-forth passes
        const waveSine = Math.sin((waveCycle / 2.0) * Math.PI * 6);
        armAngle = -10 + 22 * waveSine; // rotates shoulder -32° to +12°
        handAngle = 18 * Math.sin((waveCycle / 2.0) * Math.PI * 6 + 0.5); // wrist follow-through
      } else {
        // Natural resting greeting pose with soft breathing bob
        armAngle = 4 + 2.5 * Math.sin(state.waveTimer * 1.8);
        handAngle = 2 * Math.sin(state.waveTimer * 1.8);
      }

      // --- NATURAL LIFE MOMENTS ---

      // 1. Arrival Ease
      if (state.isArriving) {
        const elapsed = currentTime - state.arrivalStartTime;
        if (elapsed < 900) {
          const t = elapsed / 900;
          state.eyelidOpen = 0.05 + 0.95 * (1 - Math.pow(1 - t, 3));
        } else {
          state.eyelidOpen = 1.0;
          state.isArriving = false;
        }
      }

      // 2. Idle Breathing
      state.breathPhase += dt * 1.75;
      state.breathScale = 1.0 + 0.008 * (0.5 - 0.5 * Math.cos(state.breathPhase));

      // 3. Random Blinking (1 in 5 double blink)
      let blinkScaleY = 1.0;
      if (!state.isBlinking && currentTime >= state.nextBlinkTime) {
        state.isBlinking = true;
        state.blinkStartTime = currentTime;
        state.isDoubleBlink = Math.random() < 0.2;
        state.blinkStage = 1;
      }

      if (state.isBlinking) {
        const elapsed = currentTime - state.blinkStartTime;
        if (state.blinkStage === 1) {
          if (elapsed <= 160) {
            blinkScaleY = 0.1 + 0.9 * (1 - Math.sin((elapsed / 160) * Math.PI));
          } else {
            if (state.isDoubleBlink) {
              state.blinkStage = 2;
            } else {
              state.isBlinking = false;
              state.nextBlinkTime = currentTime + 2600 + Math.random() * 4000;
            }
          }
        } else if (state.blinkStage === 2) {
          blinkScaleY = 1.0;
          if (elapsed > 380) state.blinkStage = 3;
        } else if (state.blinkStage === 3) {
          const secondElapsed = elapsed - 380;
          if (secondElapsed <= 160) {
            blinkScaleY = 0.1 + 0.9 * (1 - Math.sin((secondElapsed / 160) * Math.PI));
          } else {
            state.isBlinking = false;
            state.nextBlinkTime = currentTime + 2600 + Math.random() * 4000;
          }
        }
      }

      // 4. Organic Antenna Sway
      state.antennaPhase += dt * 2.2;
      const baseAntennaSway = 3.0 * Math.sin(state.antennaPhase);
      const totalAntennaAngle = baseAntennaSway + p.antennaLag;

      // 5. Curiosity Tilt
      if (!state.hasTilted && Date.now() - state.lastPointerMoveTime > 10000 && state.curiosityPhase === 0) {
        state.curiosityPhase = 1;
        state.curiosityStartTime = currentTime;
        state.hasTilted = true;
      }

      if (state.curiosityPhase > 0) {
        const curElapsed = currentTime - state.curiosityStartTime;
        if (curElapsed < 700) {
          state.curiosityAngle = 4 * (0.5 - 0.5 * Math.cos((curElapsed / 700) * Math.PI));
        } else if (curElapsed < 1900) {
          state.curiosityAngle = 4;
        } else if (curElapsed < 2600) {
          state.curiosityAngle = 4 * (0.5 + 0.5 * Math.cos(((curElapsed - 1900) / 700) * Math.PI));
        } else {
          state.curiosityAngle = 0;
          state.curiosityPhase = 0;
        }
      }

      // 6. Eye & Head Smoothing (Lerp)
      state.currentEyeX += (state.targetEyeX - state.currentEyeX) * 0.1;
      state.currentEyeY += (state.targetEyeY - state.currentEyeY) * 0.1;
      state.headRot += (state.targetHeadRot - state.headRot) * 0.08;

      const totalHeadAngle = state.headRot + state.curiosityAngle + p.bodyTilt * 0.5;
      const effectiveEyeScaleY = Math.max(0.08, state.eyelidOpen * blinkScaleY * p.eyeWiden);

      // --- APPLY DIRECT GPU-ACCELERATED DOM TRANSFORMS ---
      if (pipContainerRef.current) {
        pipContainerRef.current.style.transform = `translate3d(${p.x.toFixed(2)}px, ${p.y.toFixed(2)}px, 0)`;
      }

      if (bodyGroupRef.current) {
        bodyGroupRef.current.style.transform = `rotate(${p.bodyTilt.toFixed(2)}deg) scale(${state.breathScale})`;
      }

      if (headGroupRef.current) {
        headGroupRef.current.style.transform = `rotate(${totalHeadAngle.toFixed(2)}deg)`;
      }

      if (antennaGroupRef.current) {
        antennaGroupRef.current.style.transform = `rotate(${totalAntennaAngle.toFixed(2)}deg)`;
      }

      if (leftEyeRef.current) {
        leftEyeRef.current.style.transform = `translate(${state.currentEyeX.toFixed(2)}px, ${state.currentEyeY.toFixed(2)}px) scale(${p.eyeWiden}, ${effectiveEyeScaleY.toFixed(3)})`;
      }

      if (rightEyeRef.current) {
        rightEyeRef.current.style.transform = `translate(${state.currentEyeX.toFixed(2)}px, ${state.currentEyeY.toFixed(2)}px) scale(${p.eyeWiden}, ${effectiveEyeScaleY.toFixed(3)})`;
      }

      // Waving arm transforms
      if (leftArmRef.current) {
        leftArmRef.current.style.transform = `rotate(${armAngle.toFixed(1)}deg)`;
      }
      if (leftHandRef.current) {
        leftHandRef.current.style.transform = `rotate(${handAngle.toFixed(1)}deg)`;
      }

      // Rotate treads during driving
      if (leftWheelRef.current) {
        leftWheelRef.current.style.transform = `rotate(${p.wheelAngle.toFixed(1)}deg)`;
      }
      if (rightWheelRef.current) {
        rightWheelRef.current.style.transform = `rotate(${p.wheelAngle.toFixed(1)}deg)`;
      }
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="relative w-full max-w-lg mx-auto flex flex-col items-center select-none">
      
      {/* Interactive Movable & Waving Arena */}
      <div 
        ref={stageRef}
        onClick={handleStageClick}
        className="relative w-full aspect-square max-w-[390px] rounded-2xl bg-[#EFE6D3] border border-[#DCCFB6] shadow-soft p-4 flex flex-col items-center justify-center overflow-hidden cursor-crosshair group"
      >
        {/* Soft Grid Floor & Subtle Orbit Track */}
        <div className="absolute inset-4 rounded-xl border border-dashed border-[#DCCFB6]/60 pointer-events-none" />
        <div className="absolute inset-16 rounded-full border border-dashed border-[#DCCFB6]/40 pointer-events-none" />

        {/* Small Playful Hint */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#F6F0E4]/90 border border-[#DCCFB6] text-[10px] font-mono uppercase tracking-wider text-[#1F4236] pointer-events-none flex items-center gap-1.5 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C98A22] animate-pulse" />
          <span>Drag Pip or click the arena</span>
        </div>

        {/* Movable & Waving Pip Wrapper */}
        <div
          ref={pipContainerRef}
          onPointerDown={handlePointerDown}
          className="relative w-64 h-64 sm:w-72 sm:h-72 cursor-grab active:cursor-grabbing will-change-transform"
          title="Drag Pip around or click the arena floor!"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 320 320"
            className="w-full h-full overflow-visible pointer-events-none drop-shadow-md"
          >
            {/* Master Body Group (Tilts & Breaths) */}
            <g 
              ref={bodyGroupRef}
              style={{ transformOrigin: '160px 240px' }}
            >
              
              {/* ========================================================
                  LEFT WHEEL TREAD POD (Rolling treads)
                 ======================================================== */}
              <g>
                <rect x="36" y="172" width="54" height="104" rx="16" fill="#461513" stroke="#5E1F1C" strokeWidth="2" />
                <rect x="40" y="176" width="46" height="96" rx="12" fill="#5E1F1C" />
                
                {/* Rotating Wheel Hub */}
                <g 
                  ref={leftWheelRef}
                  style={{ transformOrigin: '63px 224px' }}
                >
                  <circle cx="63" cy="224" r="20" fill="#461513" stroke="#C98A22" strokeWidth="2" />
                  <circle cx="63" cy="224" r="14" fill="#5E1F1C" />
                  <circle cx="63" cy="224" r="6" fill="#C98A22" />
                  <line x1="63" y1="206" x2="63" y2="242" stroke="#EFE6D3" strokeWidth="2" strokeLinecap="round" />
                  <line x1="45" y1="224" x2="81" y2="224" stroke="#EFE6D3" strokeWidth="2" strokeLinecap="round" />
                </g>

                {/* Tread Grips */}
                <rect x="34" y="186" width="6" height="8" rx="2" fill="#C98A22" />
                <rect x="34" y="206" width="6" height="8" rx="2" fill="#C98A22" />
                <rect x="34" y="226" width="6" height="8" rx="2" fill="#C98A22" />
                <rect x="34" y="246" width="6" height="8" rx="2" fill="#C98A22" />
              </g>

              {/* ========================================================
                  RIGHT WHEEL TREAD POD
                 ======================================================== */}
              <g>
                <rect x="230" y="172" width="54" height="104" rx="16" fill="#461513" stroke="#5E1F1C" strokeWidth="2" />
                <rect x="234" y="176" width="46" height="96" rx="12" fill="#5E1F1C" />
                
                {/* Rotating Wheel Hub */}
                <g 
                  ref={rightWheelRef}
                  style={{ transformOrigin: '257px 224px' }}
                >
                  <circle cx="257" cy="224" r="20" fill="#461513" stroke="#C98A22" strokeWidth="2" />
                  <circle cx="257" cy="224" r="14" fill="#5E1F1C" />
                  <circle cx="257" cy="224" r="6" fill="#C98A22" />
                  <line x1="257" y1="206" x2="257" y2="242" stroke="#EFE6D3" strokeWidth="2" strokeLinecap="round" />
                  <line x1="239" y1="224" x2="275" y2="224" stroke="#EFE6D3" strokeWidth="2" strokeLinecap="round" />
                </g>

                {/* Tread Grips */}
                <rect x="280" y="186" width="6" height="8" rx="2" fill="#C98A22" />
                <rect x="280" y="206" width="6" height="8" rx="2" fill="#C98A22" />
                <rect x="280" y="226" width="6" height="8" rx="2" fill="#C98A22" />
                <rect x="280" y="246" width="6" height="8" rx="2" fill="#C98A22" />
              </g>

              {/* Suspension Crossbar */}
              <path d="M 85 224 L 235 224" stroke="#5E1F1C" strokeWidth="6" strokeLinecap="round" />
              <path d="M 100 224 L 220 224" stroke="#C98A22" strokeWidth="2" />

              {/* ========================================================
                  PIP'S ADORABLE WAVING LEFT ARM (Animated Multi-Joint)
                 ======================================================== */}
              <g 
                ref={leftArmRef}
                style={{ transformOrigin: '72px 146px' }}
              >
                {/* Upper Arm Line */}
                <line x1="72" y1="146" x2="44" y2="116" stroke="#5E1F1C" strokeWidth="7" strokeLinecap="round" />
                <circle cx="72" cy="146" r="6" fill="#5E1F1C" />
                {/* Wrist Joint */}
                <circle cx="44" cy="116" r="6.5" fill="#C98A22" />

                {/* Waving Hand / Mitten with Wrist Follow-Through */}
                <g 
                  ref={leftHandRef}
                  style={{ transformOrigin: '44px 116px' }}
                >
                  <path 
                    d="M 44 116 C 32 106, 30 92, 42 88 C 54 84, 58 100, 44 116 Z" 
                    fill="#C98A22" 
                    stroke="#5E1F1C" 
                    strokeWidth="1.8" 
                  />
                  {/* Palm indicator */}
                  <circle cx="43" cy="102" r="2.5" fill="#F6F0E4" />
                </g>
              </g>

              {/* Pip's Right Resting Arm */}
              <g>
                <line x1="248" y1="146" x2="272" y2="162" stroke="#5E1F1C" strokeWidth="6.5" strokeLinecap="round" />
                <circle cx="272" cy="162" r="5.5" fill="#C98A22" />
              </g>

              {/* ========================================================
                  CHASSIS BODY (Pearlescent Ivory & Brass Rivets)
                 ======================================================== */}
              <rect x="72" y="124" width="176" height="122" rx="28" fill="#F6F0E4" stroke="#5E1F1C" strokeWidth="2.5" />
              
              {/* Highlight Bevel */}
              <rect x="76" y="128" width="168" height="114" rx="24" fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.6" />

              {/* Brass Hex Screws */}
              <circle cx="86" cy="138" r="3" fill="#C98A22" />
              <circle cx="234" cy="138" r="3" fill="#C98A22" />
              <circle cx="86" cy="232" r="3" fill="#C98A22" />
              <circle cx="234" cy="232" r="3" fill="#C98A22" />

              {/* Glass Electronics Window */}
              <rect x="90" y="142" width="140" height="74" rx="18" fill="#EFE6D3" stroke="#DCCFB6" strokeWidth="1.5" />
              
              {/* Inner Glowing Micro-Core */}
              <rect x="104" y="152" width="112" height="54" rx="12" fill="#F6F0E4" stroke="#DCCFB6" strokeWidth="1.5" />
              
              {/* Microcontroller Chips & Gold Traces */}
              <circle cx="124" cy="179" r="6.5" fill="#1F4236" />
              <circle cx="124" cy="179" r="3" fill="#C98A22" />

              <circle cx="160" cy="179" r="11" fill="#5E1F1C" />
              <circle cx="160" cy="179" r="7" fill="#C98A22" />
              <circle cx="160" cy="179" r="3" fill="#F6F0E4" />

              <circle cx="196" cy="179" r="6.5" fill="#1F4236" />
              <circle cx="196" cy="179" r="3" fill="#C98A22" />

              <path d="M 130 179 H 149 M 171 179 H 190" stroke="#C98A22" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="160" y1="168" x2="160" y2="157" stroke="#C98A22" strokeWidth="2" strokeLinecap="round" />

              {/* Reinforced Front Bumper */}
              <rect x="110" y="238" width="100" height="12" rx="6" fill="#C98A22" stroke="#5E1F1C" strokeWidth="2" />
              <circle cx="125" cy="244" r="2.5" fill="#5E1F1C" />
              <circle cx="195" cy="244" r="2.5" fill="#5E1F1C" />

              {/* ========================================================
                  HEAD & EXPRESSION (Big Cute Eyes with Double Glints)
                 ======================================================== */}
              <g 
                ref={headGroupRef}
                style={{ transformOrigin: '160px 105px' }}
              >
                {/* Neck Pillar & Brass Rings */}
                <rect x="144" y="98" width="32" height="28" rx="6" fill="#DCCFB6" stroke="#5E1F1C" strokeWidth="2" />
                <line x1="148" y1="108" x2="172" y2="108" stroke="#5E1F1C" strokeWidth="2" />
                <line x1="148" y1="118" x2="172" y2="118" stroke="#5E1F1C" strokeWidth="2" />

                {/* Antenna with Turmeric Sphere */}
                <g 
                  ref={antennaGroupRef}
                  style={{ transformOrigin: '160px 42px' }}
                >
                  <line x1="160" y1="42" x2="160" y2="14" stroke="#5E1F1C" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="160" cy="14" r="8" fill="#C98A22" stroke="#5E1F1C" strokeWidth="2" />
                  <circle cx="158" cy="12" r="2.5" fill="#F6F0E4" />
                </g>

                {/* Sculpted Head Shape */}
                <rect x="100" y="42" width="120" height="70" rx="24" fill="#5E1F1C" stroke="#461513" strokeWidth="2" />
                <rect x="104" y="45" width="112" height="64" rx="20" fill="#7A2925" opacity="0.3" />

                {/* Left Eye Socket */}
                <circle cx="134" cy="76" r="19" fill="#461513" stroke="#C98A22" strokeWidth="2" />
                <circle cx="134" cy="76" r="16" fill="#132B23" />

                {/* Right Eye Socket */}
                <circle cx="186" cy="76" r="19" fill="#461513" stroke="#C98A22" strokeWidth="2" />
                <circle cx="186" cy="76" r="16" fill="#132B23" />

                {/* Left Eye */}
                <g 
                  ref={leftEyeRef}
                  style={{ transformOrigin: '134px 76px' }}
                >
                  <circle cx="134" cy="76" r="11" fill="#C98A22" />
                  <circle cx="134" cy="76" r="6" fill="#2A2320" />
                  <circle cx="131" cy="73" r="2.6" fill="#F6F0E4" />
                  <circle cx="136" cy="78" r="1.3" fill="#F6F0E4" opacity="0.8" />
                </g>

                {/* Right Eye */}
                <g 
                  ref={rightEyeRef}
                  style={{ transformOrigin: '186px 76px' }}
                >
                  <circle cx="186" cy="76" r="11" fill="#C98A22" />
                  <circle cx="186" cy="76" r="6" fill="#2A2320" />
                  <circle cx="183" cy="73" r="2.6" fill="#F6F0E4" />
                  <circle cx="188" cy="78" r="1.3" fill="#F6F0E4" opacity="0.8" />
                </g>

                {/* Cheerful Friendly Smile */}
                <path 
                  d="M 146 95 Q 160 105 174 95" 
                  stroke="#C98A22" 
                  strokeWidth="3" 
                  fill="none"
                  strokeLinecap="round" 
                />

                {/* Cute Cheeks */}
                <circle cx="120" cy="94" r="3.5" fill="#C98A22" opacity="0.6" />
                <circle cx="200" cy="94" r="3.5" fill="#C98A22" opacity="0.6" />

              </g>

            </g>
          </svg>
        </div>

      </div>

    </div>
  );
}