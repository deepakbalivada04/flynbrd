import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassPedal from '../ui/GlassPedal';
import HeroTechVisualizer from './HeroTechVisualizer';
import DoodleLayer from '../effects/DoodleLayer';
import MascotBird from '../mascot/MascotBird';
import { playTinyClick } from '../../utils/toyAudio';

/**
 * CosmicRocketHero
 * 
 * Re-engineered with Toy-Theme aesthetics & executive proportions:
 * - Hand-drawn SVG doodle layer around margins (never overlapping text)
 * - Orbit circle strictly behind rocket card only (removed left overlapping arc)
 * - Integrated robot-bird mascot with cursor-following eyes & wave interaction
 * - Chunky tactile buttons with hard bottom shadow and flickering engine flame
 * - Scaled-down crisp typography (Bricolage Grotesque / Inter)
 */
export default function CosmicRocketHero({ onBookDemoClick, onSelectTier }) {
  const [activeTierIndex, setActiveTierIndex] = useState(1);
  const [isCtaHovered, setIsCtaHovered] = useState(false);

  const tierNodes = [
    {
      title: 'Level 01: Motors & Circuits',
      grades: 'Grades 3–5',
      desc: 'Tactile physical logic, gear ratios, solderless snap circuits, and autonomous rover builds.',
    },
    {
      title: 'Level 02: AI Logic & Sonar',
      grades: 'Grades 6–8',
      desc: 'Ultrasonic distance telemetry, conditional branching algorithms, and sensor avoidance loops.',
    },
    {
      title: 'Level 03: Vision & Edge AI',
      grades: 'Grades 9–12',
      desc: 'OpenCV object tracking, SLAM autonomous navigation, and neural network edge compute.',
    },
  ];

  const handleNodeClick = (index) => {
    playTinyClick();
    setActiveTierIndex(index);
    if (onSelectTier) {
      onSelectTier(tierNodes[index].title);
    }
  };

  const handleCtaMouseEnter = () => {
    setIsCtaHovered(true);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('mascot-wave', { detail: true }));
    }
  };

  const handleCtaMouseLeave = () => {
    setIsCtaHovered(false);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('mascot-wave', { detail: false }));
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-[92vh] flex flex-col justify-between pt-24 pb-16 px-6 sm:px-12 lg:px-16 overflow-hidden bg-[#0B0B10] text-[#F5F5F7]"
    >
      {/* 1. Playful Hand-Drawn Doodle Layer (Yellow SVG Scribbles) */}
      <DoodleLayer variant="hero" />

      {/* ====================================================================
          MAIN HERO GRID
         ==================================================================== */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        
        {/* ------------------------------------------------------------------
            LEFT COLUMN: TYPOGRAPHY & INTERACTIVE ROADMAP NODES
           ------------------------------------------------------------------ */}
        <div className="lg:col-span-7 flex flex-col items-start">
          
          {/* Frosted Glass Badges (Pedals) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center gap-2.5 mb-5"
          >
            <GlassPedal dot={true} dotColor="bg-[#FFC933]">
              ✦ K-12 STEM Innovation
            </GlassPedal>

            <GlassPedal dot={true} dotColor="bg-[#34D399]" className="hidden sm:inline-flex">
              100% Turnkey Labs
            </GlassPedal>
          </motion.div>

          {/* Scaled-down, executive headline with chunky solid drop shadow */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-display font-black tracking-tight text-[#F5F5F7] leading-[1.14] max-w-2xl"
          >
            Empowering Classrooms with <br />
            <span className="text-stone-300">Hands-on</span>{' '}
            <span className="text-[#FFC933] drop-shadow-[2px_2px_0px_#000000]">
              AI & Robotics.
            </span>
          </motion.h1>

          {/* Subtitle Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 text-xs sm:text-sm md:text-base text-stone-300 font-sans font-normal leading-relaxed max-w-xl"
          >
            The turnkey experiential e-learning platform delivering physical robotics hardware kits, industry-standard AI curriculum, and certified instructors directly to middle and high schools.
          </motion.p>

          {/* ----------------------------------------------------------------
              ROADMAP SELECTOR NODES (Clean, Non-overlapping)
             ---------------------------------------------------------------- */}
          <div className="relative mt-8 pt-2 w-full max-w-lg">
            <div className="relative z-10 flex flex-col space-y-4">
              {tierNodes.map((tier, idx) => {
                const isActive = activeTierIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => handleNodeClick(idx)}
                    className="group cursor-pointer flex items-start gap-3.5 transition-all duration-300"
                  >
                    {/* Vertical Connected Node Indicator */}
                    <div className="flex flex-col items-center mt-1">
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? 'border-[#FFC933] bg-[#FFC933] shadow-[0_0_10px_#FFC933]'
                            : 'border-white/40 bg-black group-hover:border-[#FFC933]'
                        }`}
                      >
                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                      </div>
                      {idx < tierNodes.length - 1 && (
                        <div className="w-[1px] h-8 bg-white/20 my-1 group-hover:bg-[#FFC933]/40 transition-colors" />
                      )}
                    </div>

                    {/* Node Text & Badge */}
                    <div className="flex-1 pb-1">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`text-xs sm:text-sm font-sans font-semibold tracking-wide transition-colors ${
                            isActive ? 'text-white' : 'text-stone-400 group-hover:text-stone-200'
                          }`}
                        >
                          {tier.title}
                        </span>
                        
                        {/* Frosted Glass Pedal for Grade Band */}
                        <span
                          className={`text-[10px] font-sans font-medium px-2.5 py-0.5 rounded-full border backdrop-blur-md transition-colors ${
                            isActive
                              ? 'border-[#FFC933]/50 text-[#FFC933] bg-[#FFC933]/15'
                              : 'border-white/10 text-stone-400 bg-white/[0.03]'
                          }`}
                        >
                          {tier.grades}
                        </span>
                      </div>
                      {isActive && (
                        <p className="mt-1 text-xs text-stone-400 font-sans leading-relaxed">
                          {tier.desc}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Scroll Indicator */}
            <div className="flex items-center gap-2 mt-4 ml-1 text-stone-400">
              <span className="text-sm font-sans">↓</span>
              <span className="text-[11px] font-sans font-medium text-stone-400">
                Scroll to explore curriculum roadmap
              </span>
            </div>
          </div>

          {/* Action Buttons: Chunky Tactile Feel with Solid Bottom Shadow */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-7 flex flex-wrap items-center gap-4"
          >
            {/* Primary Yellow Button with engine flame that flickers on hover */}
            <button
              onClick={() => {
                playTinyClick();
                if (onBookDemoClick) onBookDemoClick();
              }}
              onMouseEnter={handleCtaMouseEnter}
              onMouseLeave={handleCtaMouseLeave}
              className="btn-chunky px-6 py-3 rounded-full text-xs sm:text-sm font-display font-extrabold text-black bg-[#FFC933] hover:bg-[#FFE28A] border-2 border-black flex items-center gap-2.5 group select-none"
            >
              {/* Flickering Engine Flame */}
              <span className={`text-base transition-transform ${isCtaHovered ? 'animate-bounce scale-125' : ''}`}>
                🔥
              </span>
              <span>Launch school program</span>
              <span className="text-sm font-bold group-hover:translate-x-1 transition-transform">→</span>
            </button>

            {/* Secondary Button */}
            <button
              onClick={() => {
                playTinyClick();
                const el = document.getElementById('curriculum-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-chunky px-5 py-3 rounded-full text-xs sm:text-sm font-sans font-semibold text-stone-200 hover:text-white bg-[#15151E] hover:bg-[#1F1F2B] border-2 border-white/20 select-none"
            >
              Explore 3-level curricula ↓
            </button>
          </motion.div>

        </div>

        {/* ------------------------------------------------------------------
            RIGHT COLUMN: THE DIVERSE TECH VISUALIZER + MASCOT SLOT
            (Rocket, Autonomous AI Rover, 4-DOF Robotic Arm, and Flyin Mascot)
           ------------------------------------------------------------------ */}
        <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
          
          {/* Mascot Slot: Positioned top-right of the toy card */}
          <div className="absolute -top-16 -right-2 sm:-right-6 z-30">
            <MascotBird isWaving={isCtaHovered} />
          </div>

          {/* Interactive Tech Visualizer (Orbit strictly behind card, 3-2-1 launch) */}
          <HeroTechVisualizer />
        </div>

      </div>

      {/* ====================================================================
          BOTTOM SYSTEM SPEC BAR WITH FROSTED GLASS PEDALS
         ==================================================================== */}
      <div className="relative z-10 w-full max-w-7xl mx-auto pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-sans">
        <div className="p-3.5 rounded-2xl bg-[#15151E] border border-white/10 shadow-[3px_3px_0px_0px_#000000]">
          <span className="text-[10px] text-stone-400 block font-mono uppercase tracking-wider mb-1">
            STANDARD
          </span>
          <span className="text-[#F5F5F7] font-semibold text-xs">
            NGSS & CSTA Benchmarks
          </span>
        </div>
        <div className="p-3.5 rounded-2xl bg-[#15151E] border border-white/10 shadow-[3px_3px_0px_0px_#000000]">
          <span className="text-[10px] text-stone-400 block font-mono uppercase tracking-wider mb-1">
            LOGISTICS
          </span>
          <span className="text-[#F5F5F7] font-semibold text-xs">
            100% Turnkey Engineering
          </span>
        </div>
        <div className="p-3.5 rounded-2xl bg-[#15151E] border border-white/10 shadow-[3px_3px_0px_0px_#000000]">
          <span className="text-[10px] text-stone-400 block font-mono uppercase tracking-wider mb-1">
            FACULTY PREP
          </span>
          <span className="text-[#F5F5F7] font-semibold text-xs">
            Zero Teacher Preparation
          </span>
        </div>
        <div className="p-3.5 rounded-2xl bg-[#15151E] border border-white/10 shadow-[3px_3px_0px_0px_#000000]">
          <span className="text-[10px] text-stone-400 block font-mono uppercase tracking-wider mb-1">
            COVERAGE
          </span>
          <span className="text-[#FFC933] font-semibold text-xs">
            Nationwide School Access
          </span>
        </div>
      </div>

    </section>
  );
}
