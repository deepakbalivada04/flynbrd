import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { playCelebrationChime } from '../../utils/toyAudio';

/**
 * CurriculumBoardGame
 * 
 * Signature Effect 1 (Part 2):
 * - Winding board-game path (SVG path) connecting Levels 1, 2, and 3
 * - Mini rocket token travels along the S-curve as the user scrolls
 * - Level badges pop with a spring when reached
 * - Sticker cards with alternating tilts (-1.5deg / +1.5deg) and hard offset shadows
 */
export default function CurriculumBoardGame({ onSelectTier, onUnlockLevel }) {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const [rocketPos, setRocketPos] = useState({ x: 30, y: 30, angle: 0 });
  const [activeLevels, setActiveLevels] = useState({ 1: false, 2: false, 3: false });

  const tiers = [
    {
      id: '01',
      title: 'Motors & Circuits',
      badge: 'Level 01 // Foundation',
      grades: 'Grades 3–5',
      accent: '#FFC933', // Yellow
      shadowClass: 'shadow-[6px_6px_0px_0px_#FFC933]',
      hoverShadow: 'group-hover:shadow-[9px_9px_0px_0px_#FFC933]',
      tilt: '-rotate-[1.5deg]',
      tagline: 'Tactile physical logic, gear ratios, and solderless snap circuits.',
      modules: [
        'DC geared motors, torque, and pulley ratios',
        'Solderless snap-circuit logic & polarity',
        'Visual block coding with loops & conditionals',
        'Obstacle-avoiding autonomous rover build',
      ],
      hardware: 'Snap-circuit trays, gear chassis, safe battery hubs',
      threshold: 0.20,
    },
    {
      id: '02',
      title: 'AI Logic & Sonar',
      badge: 'Level 02 // Intermediate',
      grades: 'Grades 6–8',
      accent: '#38BDF8', // Cyan
      shadowClass: 'shadow-[6px_6px_0px_0px_#38BDF8]',
      hoverShadow: 'group-hover:shadow-[9px_9px_0px_0px_#38BDF8]',
      tilt: 'rotate-[1.5deg]',
      tagline: 'Algorithmic telemetry, distance calculation, and sensor feedback loops.',
      modules: [
        'Ultrasonic sonar distance calculation & echo telemetry',
        'Conditional branching & automated obstacle evasion',
        'Infrared boundary tracking line-follower logic',
        'Hybrid visual block-to-Python syntax translation',
      ],
      hardware: 'Arduino-compatible hubs, ultrasonic pingers, servo steering',
      threshold: 0.55,
    },
    {
      id: '03',
      title: 'Vision & Edge AI',
      badge: 'Level 03 // Advanced',
      grades: 'Grades 9–12',
      accent: '#FF6B5B', // Coral
      shadowClass: 'shadow-[6px_6px_0px_0px_#FF6B5B]',
      hoverShadow: 'group-hover:shadow-[9px_9px_0px_0px_#FF6B5B]',
      tilt: '-rotate-[1.5deg]',
      tagline: 'Computer vision, SLAM navigation, and neural network edge deployment.',
      modules: [
        'Pure Python syntax for real-time robotic systems',
        'OpenCV object classification & facial tracking',
        'Simultaneous Localization & Mapping (SLAM)',
        'Neural network edge model deployment & kinematics',
      ],
      hardware: 'Jetson/Pi edge AI neural boards, HD camera modules, 4-DOF arms',
      threshold: 0.85,
    },
  ];

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    let animId;
    let targetSectionP = 0;
    let currentSectionP = 0;

    const onScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const winH = window.innerHeight;

      // Section progress from entering viewport bottom to leaving top
      const totalDist = rect.height + winH * 0.5;
      const currentDist = winH - rect.top;
      const p = Math.max(0, Math.min(1, currentDist / totalDist));
      targetSectionP = p;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const loop = () => {
      currentSectionP += (targetSectionP - currentSectionP) * 0.1;

      // Update rocket token position along SVG path
      if (pathRef.current) {
        const totalLen = pathRef.current.getTotalLength();
        const curLen = Math.max(0, Math.min(totalLen, currentSectionP * totalLen));
        const pt = pathRef.current.getPointAtLength(curLen);

        // Compute tangent angle for rocket heading
        const nextPt = pathRef.current.getPointAtLength(Math.min(totalLen, curLen + 4));
        const dx = nextPt.x - pt.x;
        const dy = nextPt.y - pt.y;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        setRocketPos({ x: pt.x, y: pt.y, angle });
      }

      // Check level unlock pop triggers
      tiers.forEach((t, i) => {
        const lvlNum = i + 1;
        if (currentSectionP >= t.threshold && !activeLevels[lvlNum]) {
          setActiveLevels((prev) => ({ ...prev, [lvlNum]: true }));
          playCelebrationChime();
          if (onUnlockLevel) onUnlockLevel(lvlNum);
        }
      });

      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [activeLevels, onUnlockLevel]);

  return (
    <section
      id="curriculum-section"
      ref={containerRef}
      className="relative w-full bg-[#0B0B10] text-[#F5F5F7] px-6 sm:px-12 lg:px-16 py-20 sm:py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="border-b-2 border-white/10 pb-6 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#15151E] border-2 border-[#34D399] shadow-[3px_3px_0px_0px_#34D399] text-xs font-bold text-[#34D399] uppercase mb-3">
              <span>✦ Level Progression Roadmap</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white">
              The Board-Game Learning Journey
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-stone-300 max-w-md leading-relaxed">
            Students advance level by level through hands-on physical computing, automated robotics, and edge AI inferencing.
          </p>
        </div>

        {/* ------------------------------------------------------------------
            THE WINDING BOARD-GAME PATH & STICKER CARDS
           ------------------------------------------------------------------ */}
        <div className="relative">
          
          {/* SVG Winding Board-Game Path Background */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-visible hidden lg:block"
            viewBox="0 0 1100 850"
            fill="none"
          >
            {/* Guide Board-Game Path (Stepping Stones) */}
            <path
              ref={pathRef}
              d="M 120 120 C 350 120, 650 20, 850 140 C 1050 260, 950 480, 750 500 C 450 520, 200 480, 180 660 C 160 840, 500 820, 900 800"
              stroke="#2A2A38"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Dashed Gold Stepping Stones */}
            <path
              d="M 120 120 C 350 120, 650 20, 850 140 C 1050 260, 950 480, 750 500 C 450 520, 200 480, 180 660 C 160 840, 500 820, 900 800"
              stroke="#FFC933"
              strokeWidth="4"
              strokeDasharray="8 16"
              strokeLinecap="round"
              opacity="0.85"
            />

            {/* Traveling Rocket Token */}
            <g
              transform={`translate(${rocketPos.x}, ${rocketPos.y}) rotate(${rocketPos.angle + 90})`}
              className="transition-transform duration-75"
            >
              {/* Rocket Exhaust Trail */}
              <circle cx="0" cy="18" r="6" fill="#FF6B5B" opacity="0.8" />
              <circle cx="0" cy="24" r="3" fill="#FFC933" opacity="0.9" />

              {/* Rocket Token Body */}
              <path
                d="M 0 -18 C 7 -8, 9 6, 8 16 L -8 16 C -9 6, -7 -8, 0 -18 Z"
                fill="#FFC933"
                stroke="#000000"
                strokeWidth="2.5"
              />
              <path d="M -8 8 L -14 18 L -6 16 Z" fill="#FF6B5B" stroke="#000000" strokeWidth="1.5" />
              <path d="M 8 8 L 14 18 L 6 16 Z" fill="#FF6B5B" stroke="#000000" strokeWidth="1.5" />
              <circle cx="0" cy="-2" r="3.5" fill="#15151E" stroke="#000000" strokeWidth="1.2" />
            </g>
          </svg>

          {/* 3-Tier Sticker Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 relative z-20">
            {tiers.map((tier, idx) => {
              const isUnlocked = activeLevels[idx + 1];
              return (
                <div
                  key={tier.id}
                  className={`sticker-card group relative p-7 sm:p-8 rounded-[24px] bg-[#15151E] border-[3px] border-white/20 transition-all duration-300 ${tier.tilt} ${tier.shadowClass} ${tier.hoverShadow} flex flex-col justify-between`}
                >
                  <div>
                    {/* Top Spring Badge */}
                    <div className="flex items-center justify-between border-b-2 border-white/10 pb-4 mb-5">
                      <motion.div
                        animate={isUnlocked ? { scale: [1, 1.25, 1], rotate: [0, -6, 6, 0] } : {}}
                        transition={{ type: 'spring', stiffness: 350, damping: 15 }}
                        className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide border-2"
                        style={{
                          backgroundColor: `${tier.accent}20`,
                          borderColor: tier.accent,
                          color: tier.accent,
                        }}
                      >
                        {tier.badge}
                      </motion.div>

                      <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#1F1F2B] border border-white/15 text-stone-300">
                        {tier.grades}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-2xl font-display font-extrabold text-white tracking-tight mb-2">
                      {tier.title}
                    </h3>
                    <p className="text-xs text-stone-300 font-sans leading-relaxed mb-6">
                      {tier.tagline}
                    </p>

                    {/* Workshop Modules */}
                    <div className="space-y-2.5 pt-4 border-t-2 border-white/10 text-xs font-mono">
                      <span className="text-[10px] tracking-widest uppercase text-stone-400 block mb-2 font-bold">
                        // CORE MODULES
                      </span>
                      {tier.modules.map((m, mIdx) => (
                        <div key={mIdx} className="flex items-start gap-2 text-stone-200">
                          <span style={{ color: tier.accent }} className="select-none font-bold">✦</span>
                          <span className="leading-snug">{m}</span>
                        </div>
                      ))}
                    </div>

                    {/* Hardware Spec */}
                    <div className="mt-6 pt-4 border-t-2 border-white/10">
                      <span className="text-[10px] font-mono tracking-widest uppercase text-stone-400 block mb-1">
                        // INCLUDED HARDWARE
                      </span>
                      <p className="text-xs text-stone-300 font-mono">
                        {tier.hardware}
                      </p>
                    </div>
                  </div>

                  {/* Chunky Push Button */}
                  <div className="pt-8">
                    <button
                      onClick={() => onSelectTier(tier.title)}
                      className="btn-chunky w-full py-3 px-4 rounded-full text-xs font-display font-extrabold tracking-wide uppercase border-2 border-black text-black transition-all flex items-center justify-center gap-2"
                      style={{ backgroundColor: tier.accent }}
                    >
                      <span>Explore {tier.title}</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

