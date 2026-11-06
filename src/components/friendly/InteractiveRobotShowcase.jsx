import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Radio, Cpu, RefreshCw, Hand, Compass } from 'lucide-react';

/**
 * InteractiveRobotShowcase — "Pip"
 * 
 * Re-engineered with modern high-tech robotics colors (Titanium, Pearl White, Electric Cyan, Neon Emerald),
 * 60fps spring physics mobility, waving animations, and interactive IoT telemetry HUD chips.
 */
export default function InteractiveRobotShowcase() {
  const stageRef = useRef(null);
  const isVisibleRef = useRef(true);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0, pipStartX: 0, pipStartY: 0 });

  const [activeMode, setActiveMode] = useState('autonomous');
  const [telemetryPing, setTelemetryPing] = useState(false);

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
      arrived = sessionStorage.getItem('pip_arrived_v4') === 'true';
    } catch (e) {
      arrived = false;
    }

    if (!arrived) {
      try {
        sessionStorage.setItem('pip_arrived_v4', 'true');
      } catch (e) {}
      animState.current.isArriving = true;
      animState.current.arrivalStartTime = performance.now();
    }
    animState.current.nextBlinkTime = performance.now() + 2500;
  }, []);

  // 2. Visibility Observer
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 3. Pointer Move for eye tracking
  useEffect(() => {
    const handlePointerMove = (e) => {
      animState.current.lastPointerMoveTime = Date.now();

      if (!stageRef.current) return;
      const rect = stageRef.current.getBoundingClientRect();
      const pointerX = e.clientX - rect.left;
      const pointerY = e.clientY - rect.top;

      // Eye vector calculation
      const pipCenterStageX = rect.width / 2 + physics.current.x;
      const pipCenterStageY = rect.height / 2 + physics.current.y - 40;

      const dx = pointerX - pipCenterStageX;
      const dy = pointerY - pipCenterStageY;

      const maxEyeOffset = 4.0 * physics.current.eyeWiden;
      const distance = Math.hypot(dx, dy);

      if (distance > 5) {
        const factor = Math.min(maxEyeOffset, distance / 25);
        animState.current.targetEyeX = (dx / distance) * factor;
        animState.current.targetEyeY = (dy / distance) * factor;
      } else {
        animState.current.targetEyeX = 0;
        animState.current.targetEyeY = 0;
      }

      // Subtle Head turn
      animState.current.targetHeadRot = Math.max(-10, Math.min(10, (dx / (rect.width / 2)) * 8));
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  // 4. Click Arena Floor to Drive
  const handleStageClick = (e) => {
    if (isDraggingRef.current) return;
    if (!stageRef.current) return;

    const rect = stageRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left - rect.width / 2;
    const clickY = e.clientY - rect.top - rect.height / 2 + 20;

    physics.current.targetX = Math.max(-95, Math.min(95, clickX));
    physics.current.targetY = Math.max(-55, Math.min(55, clickY));

    // Trigger excited wave on drive
    animState.current.isExcitedWave = true;
    setTimeout(() => {
      animState.current.isExcitedWave = false;
    }, 1800);
  };

  // 5. Drag Pip
  const handlePointerDown = (e) => {
    e.stopPropagation();
    isDraggingRef.current = true;
    physics.current.eyeWiden = 1.25;

    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      pipStartX: physics.current.x,
      pipStartY: physics.current.y,
    };

    const handlePointerMove = (ev) => {
      if (!isDraggingRef.current) return;
      const deltaX = ev.clientX - dragStartRef.current.x;
      const deltaY = ev.clientY - dragStartRef.current.y;

      const newTargetX = dragStartRef.current.pipStartX + deltaX;
      const newTargetY = dragStartRef.current.pipStartY + deltaY;

      physics.current.targetX = Math.max(-95, Math.min(95, newTargetX));
      physics.current.targetY = Math.max(-55, Math.min(55, newTargetY));
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
      physics.current.eyeWiden = 1.0;
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  // Trigger Wave
  const triggerExcitedWave = (e) => {
    e?.stopPropagation();
    animState.current.isExcitedWave = true;
    setTimeout(() => {
      animState.current.isExcitedWave = false;
    }, 2200);
  };

  // Trigger Telemetry Ping
  const triggerTelemetryPing = (e) => {
    e?.stopPropagation();
    setTelemetryPing(true);
    triggerExcitedWave();
    setTimeout(() => {
      setTelemetryPing(false);
    }, 1500);
  };

  // Reset Pip to center
  const resetPosition = (e) => {
    e?.stopPropagation();
    physics.current.targetX = 0;
    physics.current.targetY = 0;
  };

  // 6. Main 60fps Animation Loop
  useEffect(() => {
    let rafId;
    let lastTime = performance.now();

    const loop = (currentTime) => {
      rafId = requestAnimationFrame(loop);
      if (!isVisibleRef.current) return;

      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      const p = physics.current;
      const state = animState.current;

      // Spring physics
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

      // Tilt
      const targetTilt = Math.max(-7, Math.min(7, p.vx * 0.7));
      p.bodyTilt += (targetTilt - p.bodyTilt) * 0.12;

      // Antenna inertia
      p.antennaLag += (-p.vx * 1.2 - p.antennaLag) * 0.15;

      if (p.isMoving && !isDraggingRef.current) {
        state.targetEyeX = Math.max(-3, Math.min(3, p.vx * 0.6));
        state.targetEyeY = Math.max(-3, Math.min(3, p.vy * 0.6));
      }

      // Waving
      state.waveTimer += dt * (state.isExcitedWave ? 1.4 : 1.0);
      const waveCycle = state.waveTimer % 3.6;
      let armAngle = 0;
      let handAngle = 0;

      if (waveCycle < 2.0 || state.isExcitedWave) {
        const waveSine = Math.sin((waveCycle / 2.0) * Math.PI * 6);
        armAngle = -10 + 22 * waveSine;
        handAngle = 18 * Math.sin((waveCycle / 2.0) * Math.PI * 6 + 0.5);
      } else {
        armAngle = 4 + 2.5 * Math.sin(state.waveTimer * 1.8);
        handAngle = 2 * Math.sin(state.waveTimer * 1.8);
      }

      // Idle Breathing
      state.breathPhase += dt * 1.75;
      state.breathScale = 1.0 + 0.008 * (0.5 - 0.5 * Math.cos(state.breathPhase));

      // Random Blinking
      let blinkScaleY = 1.0;
      if (!state.isArriving) {
        if (!state.isBlinking && currentTime > state.nextBlinkTime) {
          state.isBlinking = true;
          state.blinkStartTime = currentTime;
          state.isDoubleBlink = Math.random() < 0.2;
          state.blinkStage = 0;
        }

        if (state.isBlinking) {
          const blinkElapsed = currentTime - state.blinkStartTime;
          const blinkDur = 140;

          if (state.isDoubleBlink) {
            if (blinkElapsed < blinkDur) {
              const pBlink = blinkElapsed / blinkDur;
              blinkScaleY = Math.sin(pBlink * Math.PI);
            } else if (blinkElapsed < blinkDur + 70) {
              blinkScaleY = 0;
            } else if (blinkElapsed < blinkDur * 2 + 70) {
              const pBlink = (blinkElapsed - blinkDur - 70) / blinkDur;
              blinkScaleY = Math.sin(pBlink * Math.PI);
            } else {
              state.isBlinking = false;
              state.nextBlinkTime = currentTime + 3000 + Math.random() * 4000;
              blinkScaleY = 0;
            }
          } else {
            if (blinkElapsed < blinkDur) {
              const pBlink = blinkElapsed / blinkDur;
              blinkScaleY = Math.sin(pBlink * Math.PI);
            } else {
              state.isBlinking = false;
              state.nextBlinkTime = currentTime + 3000 + Math.random() * 4000;
              blinkScaleY = 0;
            }
          }
        }
      }

      // Antenna Sway
      state.antennaPhase += dt * 1.6;
      state.antennaAngle = Math.sin(state.antennaPhase) * 2.5 + p.antennaLag;

      // Eye smoothing
      state.currentEyeX += (state.targetEyeX - state.currentEyeX) * 0.16;
      state.currentEyeY += (state.targetEyeY - state.currentEyeY) * 0.16;

      // Head rotation smoothing
      state.headRot += (state.targetHeadRot - state.headRot) * 0.14;

      // DOM Updates
      if (pipContainerRef.current) {
        pipContainerRef.current.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0)`;
      }

      if (bodyGroupRef.current) {
        bodyGroupRef.current.style.transform = `scale(${state.breathScale.toFixed(4)}) rotate(${p.bodyTilt.toFixed(2)}deg)`;
      }

      if (headGroupRef.current) {
        headGroupRef.current.style.transform = `rotate(${state.headRot.toFixed(2)}deg)`;
      }

      if (antennaGroupRef.current) {
        antennaGroupRef.current.style.transform = `rotate(${state.antennaAngle.toFixed(2)}deg)`;
      }

      if (leftArmRef.current) {
        leftArmRef.current.style.transform = `rotate(${armAngle.toFixed(1)}deg)`;
      }

      if (leftHandRef.current) {
        leftHandRef.current.style.transform = `rotate(${handAngle.toFixed(1)}deg)`;
      }

      if (leftEyeRef.current && rightEyeRef.current) {
        const eyeTransform = `translate3d(${state.currentEyeX.toFixed(1)}px, ${state.currentEyeY.toFixed(1)}px, 0) scaleY(${(1 - blinkScaleY).toFixed(2)})`;
        leftEyeRef.current.style.transform = eyeTransform;
        rightEyeRef.current.style.transform = eyeTransform;
      }

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
        className="relative w-full aspect-square max-w-[420px] rounded-3xl bg-white/85 backdrop-blur-xl border border-slate-200/90 shadow-2xl shadow-blue-500/10 p-4 flex flex-col items-center justify-center overflow-hidden cursor-crosshair group"
      >
        {/* Soft Modern Tech Coordinate Traces */}
        <div className="absolute inset-5 rounded-2xl border border-dashed border-slate-200/90 pointer-events-none" />
        <div className="absolute inset-16 rounded-full border border-dashed border-blue-200/60 pointer-events-none" />
        <div className="absolute inset-28 rounded-full border border-slate-200/50 pointer-events-none" />

        {/* Floating Top Left Telemetry HUD Badge */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-white shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-mono tracking-wider text-slate-200">
            {telemetryPing ? 'PINGING 5.8GHz...' : 'IoT Node v2.4 · Online'}
          </span>
        </div>

        {/* Floating Top Right Radar HUD Badge */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 text-blue-700 shadow-xs">
          <Radio className="w-3.5 h-3.5 text-blue-600 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="text-[10px] font-mono font-semibold">LiDAR 360°</span>
        </div>

        {/* Movable & Waving Pip Wrapper */}
        <div
          ref={pipContainerRef}
          onPointerDown={handlePointerDown}
          className="relative w-64 h-64 sm:w-72 sm:h-72 cursor-grab active:cursor-grabbing will-change-transform z-10"
          title="Drag Pip around or click the arena floor!"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 320 320"
            className="w-full h-full overflow-visible pointer-events-none drop-shadow-xl"
          >
            {/* Master Body Group (Tilts & Breaths) */}
            <g 
              ref={bodyGroupRef}
              style={{ transformOrigin: '160px 240px' }}
            >
              
              {/* ========================================================
                  LEFT WHEEL TREAD POD (Matte Titanium & Neon Cyan)
                 ======================================================== */}
              <g>
                <rect x="36" y="172" width="54" height="104" rx="16" fill="#0F172A" stroke="#334155" strokeWidth="2" />
                <rect x="40" y="176" width="46" height="96" rx="12" fill="#1E293B" />
                
                {/* Rotating Wheel Hub */}
                <g 
                  ref={leftWheelRef}
                  style={{ transformOrigin: '63px 224px' }}
                >
                  <circle cx="63" cy="224" r="20" fill="#0F172A" stroke="#0284C7" strokeWidth="2.5" />
                  <circle cx="63" cy="224" r="14" fill="#0284C7" />
                  <circle cx="63" cy="224" r="6" fill="#38BDF8" />
                  <line x1="63" y1="206" x2="63" y2="242" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                  <line x1="45" y1="224" x2="81" y2="224" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                </g>

                {/* Neon Cyan Tread Grips */}
                <rect x="34" y="186" width="6" height="8" rx="2" fill="#38BDF8" />
                <rect x="34" y="206" width="6" height="8" rx="2" fill="#38BDF8" />
                <rect x="34" y="226" width="6" height="8" rx="2" fill="#38BDF8" />
                <rect x="34" y="246" width="6" height="8" rx="2" fill="#38BDF8" />
              </g>

              {/* ========================================================
                  RIGHT WHEEL TREAD POD
                 ======================================================== */}
              <g>
                <rect x="230" y="172" width="54" height="104" rx="16" fill="#0F172A" stroke="#334155" strokeWidth="2" />
                <rect x="234" y="176" width="46" height="96" rx="12" fill="#1E293B" />
                
                {/* Rotating Wheel Hub */}
                <g 
                  ref={rightWheelRef}
                  style={{ transformOrigin: '257px 224px' }}
                >
                  <circle cx="257" cy="224" r="20" fill="#0F172A" stroke="#0284C7" strokeWidth="2.5" />
                  <circle cx="257" cy="224" r="14" fill="#0284C7" />
                  <circle cx="257" cy="224" r="6" fill="#38BDF8" />
                  <line x1="257" y1="206" x2="257" y2="242" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                  <line x1="239" y1="224" x2="275" y2="224" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                </g>

                {/* Tread Grips */}
                <rect x="280" y="186" width="6" height="8" rx="2" fill="#38BDF8" />
                <rect x="280" y="206" width="6" height="8" rx="2" fill="#38BDF8" />
                <rect x="280" y="226" width="6" height="8" rx="2" fill="#38BDF8" />
                <rect x="280" y="246" width="6" height="8" rx="2" fill="#38BDF8" />
              </g>

              {/* Suspension Crossbar */}
              <path d="M 85 224 L 235 224" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
              <path d="M 100 224 L 220 224" stroke="#38BDF8" strokeWidth="2.5" />

              {/* ========================================================
                  PIP'S ADORABLE WAVING LEFT ARM (Titanium & Cyan)
                 ======================================================== */}
              <g 
                ref={leftArmRef}
                style={{ transformOrigin: '72px 146px' }}
              >
                {/* Upper Arm Line */}
                <line x1="72" y1="146" x2="44" y2="116" stroke="#1E293B" strokeWidth="7" strokeLinecap="round" />
                <circle cx="72" cy="146" r="6" fill="#2563EB" />
                {/* Wrist Joint */}
                <circle cx="44" cy="116" r="6.5" fill="#0EA5E9" />

                {/* Waving Hand / Mitten in Vibrant Cyan */}
                <g 
                  ref={leftHandRef}
                  style={{ transformOrigin: '44px 116px' }}
                >
                  <path 
                    d="M 44 116 C 32 106, 30 92, 42 88 C 54 84, 58 100, 44 116 Z" 
                    fill="#0EA5E9" 
                    stroke="#0284C7" 
                    strokeWidth="2" 
                  />
                  {/* Palm indicator */}
                  <circle cx="43" cy="102" r="2.5" fill="#FFFFFF" />
                </g>
              </g>

              {/* Pip's Right Resting Arm */}
              <g>
                <line x1="248" y1="146" x2="272" y2="162" stroke="#1E293B" strokeWidth="6.5" strokeLinecap="round" />
                <circle cx="272" cy="162" r="5.5" fill="#0EA5E9" />
              </g>

              {/* ========================================================
                  CHASSIS BODY (Pearlescent White & Metallic Bevel)
                 ======================================================== */}
              <rect x="72" y="124" width="176" height="122" rx="28" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
              
              {/* Highlight Bevel */}
              <rect x="76" y="128" width="168" height="114" rx="24" fill="none" stroke="#F1F5F9" strokeWidth="1.5" />

              {/* Metallic Hex Screws */}
              <circle cx="86" cy="138" r="3" fill="#38BDF8" />
              <circle cx="234" cy="138" r="3" fill="#38BDF8" />
              <circle cx="86" cy="232" r="3" fill="#38BDF8" />
              <circle cx="234" cy="232" r="3" fill="#38BDF8" />

              {/* Glass Electronics Window with Dark Translucent Core */}
              <rect x="90" y="142" width="140" height="74" rx="18" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
              
              {/* Inner Glowing Micro-Core */}
              <rect x="104" y="152" width="112" height="54" rx="12" fill="#1E293B" stroke="#0284C7" strokeWidth="1.5" />
              
              {/* Glowing Microcontroller Traces (Emerald & Cyan) */}
              <circle cx="124" cy="179" r="6.5" fill="#059669" />
              <circle cx="124" cy="179" r="3" fill="#34D399" />

              {/* Central Pulsing Heart LED */}
              <circle cx="160" cy="179" r="12" fill="#0284C7" />
              <circle cx="160" cy="179" r="8" fill="#38BDF8" />
              <circle cx="160" cy="179" r="3.5" fill="#FFFFFF" />

              <circle cx="196" cy="179" r="6.5" fill="#7C3AED" />
              <circle cx="196" cy="179" r="3" fill="#A78BFA" />

              <path d="M 130 179 H 148 M 172 179 H 190" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
              <line x1="160" y1="167" x2="160" y2="155" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />

              {/* Reinforced Front Bumper */}
              <rect x="110" y="238" width="100" height="12" rx="6" fill="#0F172A" stroke="#0EA5E9" strokeWidth="2" />
              <circle cx="125" cy="244" r="2.5" fill="#38BDF8" />
              <circle cx="195" cy="244" r="2.5" fill="#38BDF8" />

              {/* ========================================================
                  HEAD & EXPRESSION (Metallic Slate Helmet & Glowing Cyan Eyes)
                 ======================================================== */}
              <g 
                ref={headGroupRef}
                style={{ transformOrigin: '160px 105px' }}
              >
                {/* Neck Pillar & Rings */}
                <rect x="144" y="98" width="32" height="28" rx="6" fill="#E2E8F0" stroke="#334155" strokeWidth="2" />
                <line x1="148" y1="108" x2="172" y2="108" stroke="#0284C7" strokeWidth="2" />
                <line x1="148" y1="118" x2="172" y2="118" stroke="#0284C7" strokeWidth="2" />

                {/* Antenna with Glowing Cyan Orb */}
                <g 
                  ref={antennaGroupRef}
                  style={{ transformOrigin: '160px 42px' }}
                >
                  <line x1="160" y1="42" x2="160" y2="14" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
                  <circle cx="160" cy="14" r="8" fill="#0EA5E9" stroke="#0284C7" strokeWidth="2" />
                  <circle cx="158" cy="12" r="3" fill="#FFFFFF" />
                </g>

                {/* Sleek Titanium Helmet */}
                <rect x="100" y="42" width="120" height="70" rx="24" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
                <rect x="104" y="45" width="112" height="64" rx="20" fill="#1E293B" opacity="0.6" />

                {/* Left Eye Socket */}
                <circle cx="134" cy="76" r="19" fill="#020617" stroke="#0284C7" strokeWidth="2" />
                <circle cx="134" cy="76" r="16" fill="#0F172A" />

                {/* Right Eye Socket */}
                <circle cx="186" cy="76" r="19" fill="#020617" stroke="#0284C7" strokeWidth="2" />
                <circle cx="186" cy="76" r="16" fill="#0F172A" />

                {/* Left Eye (Expressive Glowing Cyan) */}
                <g 
                  ref={leftEyeRef}
                  style={{ transformOrigin: '134px 76px' }}
                >
                  <circle cx="134" cy="76" r="11" fill="#38BDF8" />
                  <circle cx="134" cy="76" r="6" fill="#0284C7" />
                  <circle cx="131" cy="73" r="2.8" fill="#FFFFFF" />
                  <circle cx="136" cy="78" r="1.5" fill="#FFFFFF" opacity="0.9" />
                </g>

                {/* Right Eye */}
                <g 
                  ref={rightEyeRef}
                  style={{ transformOrigin: '186px 76px' }}
                >
                  <circle cx="186" cy="76" r="11" fill="#38BDF8" />
                  <circle cx="186" cy="76" r="6" fill="#0284C7" />
                  <circle cx="183" cy="73" r="2.8" fill="#FFFFFF" />
                  <circle cx="188" cy="78" r="1.5" fill="#FFFFFF" opacity="0.9" />
                </g>

                {/* Friendly Smile */}
                <path 
                  d="M 146 95 Q 160 105 174 95" 
                  stroke="#38BDF8" 
                  strokeWidth="3" 
                  fill="none"
                  strokeLinecap="round" 
                />

                {/* Cute Cheeks */}
                <circle cx="120" cy="94" r="3.5" fill="#38BDF8" opacity="0.5" />
                <circle cx="200" cy="94" r="3.5" fill="#38BDF8" opacity="0.5" />

              </g>

            </g>
          </svg>
        </div>

        {/* Bottom Interactive Control Pills */}
        <div className="absolute bottom-3 inset-x-3 z-20 flex items-center justify-between gap-1.5 px-2">
          <button
            type="button"
            onClick={triggerExcitedWave}
            className="px-3 py-1.5 rounded-full bg-white/95 hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-slate-200 text-[10px] font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
          >
            <Hand className="w-3 h-3 text-blue-500" />
            <span>Wave</span>
          </button>

          <button
            type="button"
            onClick={triggerTelemetryPing}
            className="px-3 py-1.5 rounded-full bg-white/95 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 text-[10px] font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
          >
            <Cpu className="w-3 h-3 text-emerald-500" />
            <span>Ping Sensor</span>
          </button>

          <button
            type="button"
            onClick={resetPosition}
            className="px-3 py-1.5 rounded-full bg-white/95 hover:bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-bold flex items-center gap-1 shadow-xs transition-all cursor-pointer"
          >
            <RefreshCw className="w-3 h-3 text-slate-500" />
            <span>Center</span>
          </button>
        </div>

      </div>

      {/* Helpful Interactive Instructions */}
      <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-slate-500">
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
        <span>Drag Pip around or click anywhere in the arena to drive</span>
      </div>

    </div>
  );
}
