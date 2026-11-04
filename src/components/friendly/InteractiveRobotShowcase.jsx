import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Radio, 
  Eye, 
  Play, 
  Sparkles, 
  Cpu, 
  CheckCircle2, 
  Zap, 
  RotateCw, 
  Target,
  ArrowRight
} from 'lucide-react';

/**
 * InteractiveRobotShowcase
 * 
 * Replaces the rigid "square dokku" card with a borderless, organic,
 * interactive STEM robotics visual workbench.
 * - Interactive modes: Rover (3-5), Sonar Bot (6-8), AI Vision Arm (9-12)
 * - Clickable hotspots on physical robot components
 * - Playable action buttons (Test Sonar, Scan Object, Drive Motors)
 * - Floating status chips & live sensor telemetry
 */
export default function InteractiveRobotShowcase({ onBookClick }) {
  const [activeTier, setActiveTier] = useState('middle'); // 'elem' | 'middle' | 'high'
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [isPingingSonar, setIsPingingSonar] = useState(false);
  const [isScanningVision, setIsScanningVision] = useState(false);
  const [isDriving, setIsDriving] = useState(false);
  const [sonarDistance, setSonarDistance] = useState(18);
  const [detectedObject, setDetectedObject] = useState('Obstacle Avoided');

  // Sonar Trigger
  const triggerSonar = () => {
    setIsPingingSonar(true);
    const randomDist = Math.floor(Math.random() * 25) + 10;
    setSonarDistance(randomDist);
    setTimeout(() => {
      setIsPingingSonar(false);
    }, 1800);
  };

  // Vision Scan Trigger
  const triggerVisionScan = () => {
    setIsScanningVision(true);
    const objects = ['Classroom Backpack (98%)', 'Student Hand (99%)', 'Maze Boundary (97%)', 'Red Ball (99.5%)'];
    const chosen = objects[Math.floor(Math.random() * objects.length)];
    setDetectedObject(chosen);
    setTimeout(() => {
      setIsScanningVision(false);
    }, 2200);
  };

  // Motor Drive Trigger
  const triggerDrive = () => {
    setIsDriving(true);
    setTimeout(() => {
      setIsDriving(false);
    }, 1600);
  };

  const hotspotDetails = {
    vision: {
      title: 'HD Neural Vision Camera',
      grades: 'High School (Grades 9–12)',
      desc: 'Tracks objects, faces, and maze markers using real-time OpenCV Python scripts.',
      kit: 'Neural edge board + HD wide-angle lens',
    },
    sonar: {
      title: 'Ultrasonic Sonar Eyes',
      grades: 'Middle School (Grades 6–8)',
      desc: 'Emits high-frequency 40kHz sound waves to calculate distance and avoid obstacles.',
      kit: 'Dual-transducer ultrasonic ping module',
    },
    motors: {
      title: 'High-Torque DC Geared Motors',
      grades: 'Elementary (Grades 3–5)',
      desc: 'Students experiment with gear ratios, mechanical torque, and dual-switch steering.',
      kit: 'DC motors + brass/nylon gear chassis',
    },
    brain: {
      title: 'Programmable Microcontroller Brain',
      grades: 'All Grade Bands',
      desc: 'Runs visual block-code or native Python logic with zero student device installations.',
      kit: 'Protected K-12 USB-C controller hub',
    },
  };

  return (
    <div className="relative w-full max-w-xl mx-auto flex flex-col items-center select-none">
      
      {/* 1. Grade-Level Switcher (Sleek Floating Segmented Control) */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-white shadow-md shadow-slate-200/80 border border-slate-200/90 mb-5 z-20">
        <button
          onClick={() => {
            setActiveTier('elem');
            setActiveHotspot(null);
          }}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
            activeTier === 'elem'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Grades 3–5: Rover</span>
        </button>

        <button
          onClick={() => {
            setActiveTier('middle');
            setActiveHotspot(null);
          }}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
            activeTier === 'middle'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Grades 6–8: Sonar Bot</span>
        </button>

        <button
          onClick={() => {
            setActiveTier('high');
            setActiveHotspot(null);
          }}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
            activeTier === 'high'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Grades 9–12: Vision Arm</span>
        </button>
      </div>

      {/* 2. Central Visual Workbench (Borderless Organic Stage) */}
      <div className="relative w-full aspect-square max-w-[420px] sm:max-w-[460px] flex items-center justify-center">
        
        {/* Soft Organic Ambient Glowing Discs */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-100/70 via-purple-50/50 to-amber-100/60 blur-2xl -z-10" />
        <div className="absolute inset-6 rounded-full border border-dashed border-indigo-200/80 -z-10" />
        <div className="absolute inset-16 rounded-full border border-slate-200/60 -z-10" />

        {/* Floating Organic Chip 1: Top-Left */}
        <motion.div 
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-2 left-2 sm:-left-4 z-20 px-3 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-md shadow-slate-200/80 border border-slate-200/80 flex items-center gap-2 text-xs font-semibold text-slate-800"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{activeTier === 'elem' ? 'Snap-Circuit Logic' : activeTier === 'middle' ? 'Live Sonar: 40kHz' : 'OpenCV 60 FPS'}</span>
        </motion.div>

        {/* Floating Organic Chip 2: Top-Right */}
        <motion.div 
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-6 -right-2 sm:-right-4 z-20 px-3 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-md shadow-slate-200/80 border border-slate-200/80 flex items-center gap-2 text-xs font-semibold text-indigo-700"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>100% Student Built</span>
        </motion.div>

        {/* Floating Organic Chip 3: Bottom-Left */}
        <motion.div 
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute bottom-6 -left-3 sm:-left-6 z-20 px-3 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-md shadow-slate-200/80 border border-slate-200/80 flex items-center gap-2 text-xs font-semibold text-slate-700"
        >
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span>Safe 6V Battery Hub</span>
        </motion.div>

        {/* ================================================================
            THE ROBOT / ROVER SVG (Clean, friendly, high-resolution)
           ================================================================ */}
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
          
          {/* Sonar Radar Waves Effect (When Sonar Triggered) */}
          <AnimatePresence>
            {isPingingSonar && (
              <div className="absolute top-16 left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0.3, opacity: 0.9 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  transition={{ duration: 1.2, repeat: 1 }}
                  className="w-24 h-24 rounded-full border-2 border-indigo-500 bg-indigo-500/10"
                />
                <div className="absolute -top-8 px-2.5 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-bold shadow-md">
                  Pinging: {sonarDistance} cm
                </div>
              </div>
            )}
          </AnimatePresence>

          {/* AI Vision Scanner Reticle (When Vision Triggered) */}
          <AnimatePresence>
            {isScanningVision && (
              <div className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-48 h-36 border-2 border-emerald-500 rounded-xl relative bg-emerald-500/5 flex items-center justify-center"
                >
                  <div className="absolute top-1 left-2 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                    AI VISION TRACK
                  </div>
                  <Target className="w-8 h-8 text-emerald-500 animate-spin" />
                  <div className="absolute bottom-1 right-2 text-[10px] font-mono font-bold text-emerald-800">
                    {detectedObject}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Clean Vector Rover Illustration */}
          <svg
            viewBox="0 0 320 320"
            className="w-full h-full overflow-visible drop-shadow-xl"
            fill="none"
          >
            {/* Ground Shadow */}
            <ellipse cx="160" cy="275" rx="100" ry="18" fill="rgba(15, 23, 42, 0.08)" />

            {/* Left All-Terrain Wheel */}
            <g className={isDriving ? 'origin-[65px_225px] animate-spin' : ''}>
              <rect x="40" y="180" width="50" height="90" rx="14" fill="#1E293B" stroke="#0F172A" strokeWidth="4" />
              <line x1="40" y1="205" x2="90" y2="205" stroke="#475569" strokeWidth="3" />
              <line x1="40" y1="225" x2="90" y2="225" stroke="#475569" strokeWidth="3" />
              <line x1="40" y1="245" x2="90" y2="245" stroke="#475569" strokeWidth="3" />
              <circle cx="65" cy="225" r="10" fill="#64748B" />
            </g>

            {/* Right All-Terrain Wheel */}
            <g className={isDriving ? 'origin-[255px_225px] animate-spin' : ''}>
              <rect x="230" y="180" width="50" height="90" rx="14" fill="#1E293B" stroke="#0F172A" strokeWidth="4" />
              <line x1="230" y1="205" x2="280" y2="205" stroke="#475569" strokeWidth="3" />
              <line x1="230" y1="225" x2="280" y2="225" stroke="#475569" strokeWidth="3" />
              <line x1="230" y1="245" x2="280" y2="245" stroke="#475569" strokeWidth="3" />
              <circle cx="255" cy="225" r="10" fill="#64748B" />
            </g>

            {/* Main Robot Body Chassis (Matte White / Slate) */}
            <rect x="75" y="130" width="170" height="115" rx="28" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="4" />
            
            {/* Transparent Acrylic Top Shell revealing Microcontroller */}
            <rect x="90" y="145" width="140" height="65" rx="18" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
            
            {/* Printed Circuit Board (PCB Green/Indigo traces) */}
            <rect x="105" y="155" width="110" height="45" rx="10" fill="#EEF2FF" stroke="#C7D2FE" strokeWidth="1.5" />
            <circle cx="125" cy="177" r="6" fill="#4F46E5" />
            <circle cx="160" cy="177" r="10" fill="#6366F1" />
            <circle cx="195" cy="177" r="6" fill="#10B981" />
            <path d="M131 177 H150 M170 177 H189" stroke="#818CF8" strokeWidth="2.5" />

            {/* Robot Head / Sensor Mast */}
            <rect x="145" y="95" width="30" height="38" rx="6" fill="#94A3B8" />

            {/* Head Visor Pod */}
            <rect x="105" y="45" width="110" height="65" rx="20" fill="#0F172A" stroke="#334155" strokeWidth="3" />
            
            {/* Ultrasonic Sonar Transducers ("The Eyes") */}
            <circle cx="138" cy="77" r="16" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="3" />
            <circle cx="138" cy="77" r="9" fill="#0284C7" />
            <circle cx="138" cy="77" r="4" fill="#FFFFFF" />

            <circle cx="182" cy="77" r="16" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="3" />
            <circle cx="182" cy="77" r="9" fill="#0284C7" />
            <circle cx="182" cy="77" r="4" fill="#FFFFFF" />

            {/* Glowing Smile Status Indicator */}
            <path d="M148 95 Q160 102 172 95" stroke="#34D399" strokeWidth="3" strokeLinecap="round" />

            {/* Top Antenna with Status LED */}
            <line x1="160" y1="45" x2="160" y2="18" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
            <circle cx="160" cy="18" r="7" fill={activeTier === 'elem' ? '#F59E0B' : activeTier === 'middle' ? '#4F46E5' : '#10B981'} className="animate-pulse" />

            {/* High School Articulated Gripper / Camera Arm (Visible on 'high' mode) */}
            {activeTier === 'high' && (
              <g className="transition-all">
                <line x1="220" y1="140" x2="270" y2="110" stroke="#0F172A" strokeWidth="8" strokeLinecap="round" />
                <circle cx="270" cy="110" r="8" fill="#4F46E5" />
                <line x1="270" y1="110" x2="295" y2="135" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" />
                <path d="M 295 130 Q 305 135 295 145" stroke="#10B981" strokeWidth="4" fill="none" strokeLinecap="round" />
              </g>
            )}

            {/* ============================================================
                INTERACTIVE HOTSPOT BUTTONS ON THE ROBOT
               ============================================================ */}
            
            {/* Hotspot 1: Vision / Head */}
            <g
              onClick={() => setActiveHotspot(activeHotspot === 'vision' ? null : 'vision')}
              className="cursor-pointer group"
            >
              <circle cx="160" cy="50" r="14" fill="#4F46E5" opacity="0.25" className="animate-ping" />
              <circle cx="160" cy="50" r="10" fill="#4F46E5" stroke="#FFFFFF" strokeWidth="2" />
              <text x="160" y="54" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">1</text>
            </g>

            {/* Hotspot 2: Sonar Eyes */}
            <g
              onClick={() => setActiveHotspot(activeHotspot === 'sonar' ? null : 'sonar')}
              className="cursor-pointer group"
            >
              <circle cx="138" cy="77" r="14" fill="#0284C7" opacity="0.25" className="animate-ping" />
              <circle cx="138" cy="77" r="9" fill="#0284C7" stroke="#FFFFFF" strokeWidth="2" />
              <text x="138" y="80.5" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">2</text>
            </g>

            {/* Hotspot 3: Microcontroller Brain */}
            <g
              onClick={() => setActiveHotspot(activeHotspot === 'brain' ? null : 'brain')}
              className="cursor-pointer group"
            >
              <circle cx="160" cy="177" r="14" fill="#10B981" opacity="0.25" className="animate-ping" />
              <circle cx="160" cy="177" r="9" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
              <text x="160" y="180.5" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">3</text>
            </g>

            {/* Hotspot 4: Dual Motors & Gears */}
            <g
              onClick={() => setActiveHotspot(activeHotspot === 'motors' ? null : 'motors')}
              className="cursor-pointer group"
            >
              <circle cx="65" cy="225" r="14" fill="#F59E0B" opacity="0.25" className="animate-ping" />
              <circle cx="65" cy="225" r="9" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" />
              <text x="65" y="228.5" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">4</text>
            </g>

          </svg>
        </div>

        {/* Hotspot Details Popover (Appears gracefully when a hotspot is clicked) */}
        <AnimatePresence>
          {activeHotspot && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute bottom-2 inset-x-4 z-30 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-indigo-200 shadow-xl shadow-indigo-100/70 text-left"
            >
              <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                  {hotspotDetails[activeHotspot].grades}
                </span>
                <button
                  onClick={() => setActiveHotspot(null)}
                  className="text-slate-400 hover:text-slate-700 text-xs px-1.5 py-0.5"
                >
                  ✕
                </button>
              </div>
              <h4 className="text-sm font-bold text-slate-900 font-display">
                {hotspotDetails[activeHotspot].title}
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {hotspotDetails[activeHotspot].desc}
              </p>
              <div className="mt-2 text-[11px] font-medium text-slate-500 bg-slate-50 p-1.5 rounded-lg border border-slate-200/60">
                <strong className="text-slate-700">Kit Component:</strong> {hotspotDetails[activeHotspot].kit}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* 3. Interactive Action Buttons (Playable Controls) */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 z-20">
        <button
          onClick={triggerSonar}
          className="px-4 py-2 rounded-full bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200/90 shadow-sm hover:shadow transition-all flex items-center gap-2 active:scale-95"
        >
          <Radio className={`w-3.5 h-3.5 text-indigo-600 ${isPingingSonar ? 'animate-pulse' : ''}`} />
          <span>Test Sonar Ping</span>
        </button>

        <button
          onClick={triggerVisionScan}
          className="px-4 py-2 rounded-full bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200/90 shadow-sm hover:shadow transition-all flex items-center gap-2 active:scale-95"
        >
          <Eye className={`w-3.5 h-3.5 text-emerald-600 ${isScanningVision ? 'animate-pulse' : ''}`} />
          <span>Scan AI Vision</span>
        </button>

        <button
          onClick={triggerDrive}
          className="px-4 py-2 rounded-full bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200/90 shadow-sm hover:shadow transition-all flex items-center gap-2 active:scale-95"
        >
          <RotateCw className={`w-3.5 h-3.5 text-amber-500 ${isDriving ? 'animate-spin' : ''}`} />
          <span>Drive Rover</span>
        </button>
      </div>

      {/* Bottom Hint */}
      <p className="mt-2.5 text-[11px] text-slate-600 font-medium text-center">
        💡 Click on numbered hotspots 1–4 to explore hardware components
      </p>

    </div>
  );
}

