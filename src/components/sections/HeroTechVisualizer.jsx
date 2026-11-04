import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playCountdownBeep, playRocketSwoosh, playTinyClick } from '../../utils/toyAudio';

/**
 * HeroTechVisualizer
 * 
 * Signature Effect 2 (Part 4) & Sticker Cards:
 * - Tabs morph accent color: Rocket (Yellow #FFC933), Rover (Cyan #38BDF8), Arm (Coral #FF6B5B)
 * - Quick spin on swap
 * - Dashed orbit circle positioned strictly behind the rocket card
 * - Clicking the rocket card triggers an interactive Launch: 3-2-1 countdown, screen shake, flame, rocket zooms up & re-enters from below!
 * - Sticker card with border 3px, hard offset shadow, radius 24px, tilt -1.5deg, hover translate(-3px,-3px)
 */
export default function HeroTechVisualizer() {
  const [activeMode, setActiveMode] = useState('rocket'); // 'rocket' | 'rover' | 'arm'
  const [launchStage, setLaunchStage] = useState(null); // null | 3 | 2 | 1 | 'BLAST' | 'REENTER'
  const [isShaking, setIsShaking] = useState(false);

  // Accent colors per mode
  const accents = {
    rocket: { color: '#FFC933', shadow: 'shadow-[8px_8px_0px_0px_#FFC933]', border: 'border-[#FFC933]' },
    rover: { color: '#38BDF8', shadow: 'shadow-[8px_8px_0px_0px_#38BDF8]', border: 'border-[#38BDF8]' },
    arm: { color: '#FF6B5B', shadow: 'shadow-[8px_8px_0px_0px_#FF6B5B]', border: 'border-[#FF6B5B]' },
  };

  const currentTheme = accents[activeMode];

  // Rocket Launch Sequence Trigger
  const triggerRocketLaunch = () => {
    if (activeMode !== 'rocket' || launchStage !== null) return;

    playTinyClick();
    setLaunchStage(3);
    playCountdownBeep(440);

    setTimeout(() => {
      setLaunchStage(2);
      playCountdownBeep(520);
    }, 800);

    setTimeout(() => {
      setLaunchStage(1);
      playCountdownBeep(660);
      setIsShaking(true);
    }, 1600);

    setTimeout(() => {
      setLaunchStage('BLAST');
      playRocketSwoosh();
    }, 2400);

    setTimeout(() => {
      setIsShaking(false);
      setLaunchStage('REENTER');
    }, 3200);

    setTimeout(() => {
      setLaunchStage(null);
    }, 4200);
  };

  const handleTabChange = (mode) => {
    playTinyClick();
    setActiveMode(mode);
  };

  return (
    <div className="relative w-full max-w-[500px] mx-auto flex flex-col items-center">
      
      {/* 1. Dashed Orbit Circle (Strictly Behind the Card) */}
      <svg
        className="absolute -top-10 -left-10 w-[420px] h-[420px] pointer-events-none select-none opacity-40 overflow-visible"
        viewBox="0 0 420 420"
        fill="none"
      >
        <circle cx="210" cy="210" r="185" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="6 8" />
        <circle cx="210" cy="210" r="185" stroke={currentTheme.color} strokeWidth="2" strokeDasharray="60 220" strokeDashoffset="-40" />
      </svg>

      {/* 2. Interactive Mode Switcher Tabs */}
      <div className="relative z-10 flex items-center gap-2 mb-4 p-1.5 rounded-full bg-[#15151E] border-2 border-white/20 shadow-[4px_4px_0px_0px_#000000]">
        <button
          onClick={() => handleTabChange('rocket')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-display font-extrabold transition-all ${
            activeMode === 'rocket'
              ? 'bg-[#FFC933] text-black shadow-[2px_2px_0px_0px_#000000]'
              : 'text-stone-300 hover:text-white'
          }`}
        >
          🚀 Rocket
        </button>

        <button
          onClick={() => handleTabChange('rover')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-display font-extrabold transition-all ${
            activeMode === 'rover'
              ? 'bg-[#38BDF8] text-black shadow-[2px_2px_0px_0px_#000000]'
              : 'text-stone-300 hover:text-white'
          }`}
        >
          🤖 AI Rover
        </button>

        <button
          onClick={() => handleTabChange('arm')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-display font-extrabold transition-all ${
            activeMode === 'arm'
              ? 'bg-[#FF6B5B] text-black shadow-[2px_2px_0px_0px_#000000]'
              : 'text-stone-300 hover:text-white'
          }`}
        >
          🦾 Robotic Arm
        </button>
      </div>

      {/* 3. Sticker Card Container with Hard Offset Shadow */}
      <div
        onClick={activeMode === 'rocket' ? triggerRocketLaunch : undefined}
        className={`sticker-card relative z-10 w-full aspect-[4/3.5] rounded-[26px] bg-[#15151E] border-[3px] ${currentTheme.border} ${currentTheme.shadow} -rotate-[1.5deg] p-6 flex flex-col items-center justify-between overflow-hidden cursor-pointer ${
          isShaking ? 'animate-[wiggle_0.15s_ease-in-out_infinite]' : ''
        }`}
        title={activeMode === 'rocket' ? 'Click to Launch Rocket!' : undefined}
      >
        {/* Subtle Inner Grid */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.7) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.7) 1px, transparent 1px)
            `,
            backgroundSize: '28px 28px',
          }}
        />

        {/* Card Top Pill Badge */}
        <div className="relative z-10 w-full flex items-center justify-between text-[11px] font-mono">
          <span
            className="px-2.5 py-0.5 rounded-full font-bold border"
            style={{
              backgroundColor: `${currentTheme.color}20`,
              borderColor: currentTheme.color,
              color: currentTheme.color,
            }}
          >
            {activeMode === 'rocket'
              ? '✦ CLICK TO LAUNCH'
              : activeMode === 'rover'
              ? '✦ 360° LIDAR ACTIVE'
              : '✦ 4-DOF KINEMATICS'}
          </span>
          <span className="text-stone-400 font-bold">K-12 TOY LAB</span>
        </div>

        {/* Interactive Swapping Artwork with Quick 360 Spin on Tab Change */}
        <div className="relative z-10 w-full flex-1 flex items-center justify-center">
          <AnimatePresence mode="wait">
            
            {/* VIEW 1: ROCKET WITH INTERACTIVE LAUNCH */}
            {activeMode === 'rocket' && (
              <motion.div
                key="rocket"
                initial={{ rotate: -180, scale: 0.6, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 180, scale: 0.6, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                className="w-full h-full flex items-center justify-center relative"
              >
                {/* Countdown Overlay */}
                {launchStage && (
                  <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-xl">
                    <span className="text-6xl font-display font-extrabold text-[#FFC933] drop-shadow-[0_0_20px_#FFC933] animate-ping">
                      {launchStage}
                    </span>
                  </div>
                )}

                {/* Animated Rocket Assembly */}
                <motion.div
                  animate={
                    launchStage === 'BLAST'
                      ? { y: -650, scale: 0.6, opacity: [1, 1, 0] }
                      : launchStage === 'REENTER'
                      ? { y: [350, 0], scale: 1, opacity: 1 }
                      : { y: 0, scale: 1, opacity: 1 }
                  }
                  transition={{ duration: launchStage === 'BLAST' ? 0.7 : 0.8, ease: 'easeOut' }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <svg viewBox="0 0 380 340" fill="none" className="w-full h-full overflow-visible">
                    {/* Mountain Growth Line */}
                    <path d="M 40 260 L 110 180 L 180 240 L 250 170 L 320 220" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                    <line x1="160" y1="280" x2="330" y2="280" stroke="#FFC933" strokeWidth="2" opacity="0.8" />

                    {/* Upward Trajectory Arrow */}
                    <line x1="200" y1="220" x2="290" y2="130" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
                    <path d="M 275 128 L 295 128 L 295 148" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" />

                    {/* Flame Trail (Glows intensely on BLAST) */}
                    <g stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round">
                      <path d="M 230 245 L 225 270 L 235 285 L 228 305 L 233 320" />
                      <path d="M 222 255 L 217 275 L 224 290" opacity="0.8" />
                      <path d="M 238 255 L 243 275 L 236 290" opacity="0.8" />
                      <path d="M 215 265 L 210 285" stroke="#FFC933" strokeWidth="1.5" />
                      <path d="M 245 265 L 250 285" stroke="#FFC933" strokeWidth="1.5" />
                    </g>

                    {/* Rocket Fuselage */}
                    <g id="rocketBody">
                      {/* Left Wing */}
                      <path d="M 205 190 C 190 205, 178 235, 182 260 C 195 260, 210 245, 218 230 Z" fill="#FFC933" stroke="#FFFFFF" strokeWidth="2" />
                      {/* Right Wing */}
                      <path d="M 255 190 C 270 205, 282 235, 278 260 C 265 260, 250 245, 242 230 Z" fill="#FFC933" stroke="#FFFFFF" strokeWidth="2" />

                      {/* Fuselage */}
                      <path d="M 230 70 C 248 115, 256 165, 256 240 L 204 240 C 204 165, 212 115, 230 70 Z" fill="#12141A" stroke="#FFFFFF" strokeWidth="2.5" />
                      <path d="M 216 115 Q 230 122 244 115" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />

                      {/* Porthole */}
                      <circle cx="230" cy="160" r="12" fill="#0B0B10" stroke="#FFFFFF" strokeWidth="2" />
                      <path d="M 230 154 C 234 154, 237 157, 237 160 C 237 164, 233 166, 229 165 C 226 164, 226 162, 229 160" stroke="#FFC933" strokeWidth="2" strokeLinecap="round" fill="none" />

                      {/* Nozzle */}
                      <path d="M 212 240 L 248 240 L 242 254 L 218 254 Z" fill="#1F1F2B" stroke="#FFFFFF" strokeWidth="1.8" />
                    </g>
                  </svg>
                </motion.div>
              </motion.div>
            )}

            {/* VIEW 2: AI ROVER WITH 360 LIDAR */}
            {activeMode === 'rover' && (
              <motion.div
                key="rover"
                initial={{ rotate: -180, scale: 0.6, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 180, scale: 0.6, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                className="w-full h-full flex items-center justify-center"
              >
                <svg viewBox="0 0 380 340" fill="none" className="w-full h-full overflow-visible">
                  {/* LiDAR Arcs */}
                  <circle cx="190" cy="140" r="130" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 6" opacity="0.3" />
                  <circle cx="190" cy="140" r="90" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="4 6" opacity="0.6" />

                  {/* Sonar Radar Pings */}
                  <path d="M 260 160 C 285 150, 310 160, 335 175" stroke="#38BDF8" strokeWidth="1.8" strokeDasharray="3 4" />
                  <path d="M 280 145 C 310 135, 335 145, 360 160" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="4 4" />

                  {/* Ground Line */}
                  <path d="M 30 270 L 110 255 L 200 268 L 290 250 L 360 262" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

                  {/* Rover Wheels */}
                  <rect x="120" y="225" width="38" height="48" rx="8" fill="#12141A" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="139" cy="249" r="5" fill="#38BDF8" />
                  <rect x="222" y="225" width="38" height="48" rx="8" fill="#12141A" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="241" cy="249" r="5" fill="#38BDF8" />

                  {/* Chassis Hull */}
                  <rect x="142" y="175" width="96" height="65" rx="8" fill="#181A22" stroke="#FFFFFF" strokeWidth="2" />
                  <rect x="154" y="186" width="72" height="22" rx="4" fill="#0B0B10" stroke="#38BDF8" strokeWidth="1.5" />
                  <circle cx="170" cy="197" r="3.5" fill="#38BDF8" />
                  <circle cx="190" cy="197" r="3.5" fill="#FFFFFF" />
                  <circle cx="210" cy="197" r="3.5" fill="#38BDF8" />

                  {/* Mast & LiDAR Turret */}
                  <line x1="190" y1="175" x2="190" y2="125" stroke="#FFFFFF" strokeWidth="2.5" />
                  <ellipse cx="190" cy="125" rx="24" ry="12" fill="#1E222A" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="190" cy="125" r="6" fill="#38BDF8" />
                </svg>
              </motion.div>
            )}

            {/* VIEW 3: 4-DOF ROBOTIC ARM */}
            {activeMode === 'arm' && (
              <motion.div
                key="arm"
                initial={{ rotate: -180, scale: 0.6, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 180, scale: 0.6, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                className="w-full h-full flex items-center justify-center"
              >
                <svg viewBox="0 0 380 340" fill="none" className="w-full h-full overflow-visible">
                  {/* Angle Guides */}
                  <circle cx="140" cy="240" r="28" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 4" opacity="0.4" />
                  <circle cx="190" cy="160" r="24" stroke="#FF6B5B" strokeWidth="1" strokeDasharray="3 4" opacity="0.6" />

                  {/* Laser Pointer */}
                  <line x1="290" y1="75" x2="350" y2="45" stroke="#FF6B5B" strokeWidth="1.5" strokeDasharray="4 4" />
                  <circle cx="350" cy="45" r="4" fill="#FF6B5B" />

                  {/* Base Mount */}
                  <rect x="90" y="255" width="100" height="20" rx="4" fill="#181A22" stroke="#FFFFFF" strokeWidth="2" />
                  <path d="M 60 275 L 220 275" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

                  {/* Joint 1 Base */}
                  <circle cx="140" cy="240" r="14" fill="#12141A" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="140" cy="240" r="5" fill="#FF6B5B" />

                  {/* Link 1 */}
                  <path d="M 135 232 L 185 152 L 195 158 L 145 238 Z" fill="#1E222A" stroke="#FFFFFF" strokeWidth="1.8" />

                  {/* Joint 2 Elbow */}
                  <circle cx="190" cy="155" r="12" fill="#12141A" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="190" cy="155" r="4" fill="#FF6B5B" />

                  {/* Link 2 */}
                  <path d="M 187 150 L 250 90 L 256 96 L 193 156 Z" fill="#181A22" stroke="#FFFFFF" strokeWidth="1.8" />

                  {/* Joint 3 & Gripper */}
                  <circle cx="253" cy="93" r="9" fill="#12141A" stroke="#FFFFFF" strokeWidth="1.8" />
                  <path d="M 270 75 L 285 68 L 296 72" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M 275 88 L 290 82 L 300 86" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <rect x="290" y="75" width="8" height="10" rx="1" fill="#FF6B5B" />
                </svg>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Card Bottom HUD Status */}
        <div className="relative z-10 w-full pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono">
          <span className="text-stone-400">
            {activeMode === 'rocket' ? 'TAP TO FIRE ROCKET' : 'DRAG TO TEST KINEMATICS'}
          </span>
          <span style={{ color: currentTheme.color }} className="font-bold">
            60 FPS ACTIVE
          </span>
        </div>
      </div>

    </div>
  );
}
