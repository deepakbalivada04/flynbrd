import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SolarSunCanvas from '../canvas/SolarSunCanvas';

/**
 * SolarLaptopHero
 * 
 * Recreates the exact high-end aesthetic from the user's reference mockup:
 * 1. Deep royal/steel-blue studio ambient background
 * 2. Outer navigation: Golden flame logo ("Flyinbird"), "Case Study" & "2026" glass pills
 * 3. Sculptural 3D liquid chrome ring/pedestal with mirror-like specular reflections
 * 4. Realistic MacBook Pro laptop resting on the chrome ring
 * 5. Inside the Laptop Display:
 *    - Floating pill navigation bar with golden "Book Demo" pill
 *    - Golden flame brand mark + "Flyinbird"
 *    - Bold headline: "We are here to ignite the future!"
 *    - Subtitle copy for hands-on K-12 AI & Robotics workshops
 *    - Radiant golden pill CTA button: "Start Your Journey"
 *    - AT THE BOTTOM: THE GLOWING SUN (replacing Earth) with procedural plasma,
 *      coronal flare loops, sunbeams, and rising embers
 * 6. Smooth interactive 3D parallax tilt on mouse move
 */
export default function SolarLaptopHero({ onBookDemoClick, onExploreWorkshops }) {
  const containerRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('Home');

  // Interactive 3D Parallax Tilt Handler
  useEffect(() => {
    let animId;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handlePointerMove = (e) => {
      const winW = window.innerWidth;
      const winH = window.innerHeight;
      // Normalized between -1 and 1
      const normX = (e.clientX - winW / 2) / (winW / 2);
      const normY = (e.clientY - winH / 2) / (winH / 2);

      // Subtle tilt: max ±4 deg Y, ±3 deg X
      targetX = normX * 4;
      targetY = -normY * 3;
    };

    const handlePointerLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);

    const lerpLoop = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      setTilt({ x: currentX, y: currentY });
      animId = requestAnimationFrame(lerpLoop);
    };
    animId = requestAnimationFrame(lerpLoop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between select-none"
      style={{
        // High-end royal/steel-blue studio ambient gradient matching the mockup
        background: 'radial-gradient(ellipse at 50% 32%, #2a4374 0%, #1e3156 45%, #132038 80%, #0d1628 100%)',
      }}
    >
      {/* ====================================================================
          OUTER TOP NAVIGATION BAR (As seen in the reference image)
         ==================================================================== */}
      <header className="relative z-50 w-full px-6 sm:px-12 lg:px-16 pt-6 pb-4 flex items-center justify-between">
        {/* Brand: Golden Flame Icon + Flyinbird */}
        <div className="flex items-center gap-2.5 cursor-pointer group">
          <svg
            className="w-7 h-7 text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.65)] group-hover:scale-105 transition-transform"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M16 2C16 2 20 8 20 13C20 16 18.5 18 16 19C13.5 18 12 16 12 13C12 8 16 2 16 2Z"
              fill="url(#outerFlameGrad1)"
            />
            <path
              d="M16 6C16 6 23 13 23 20C23 24.5 19.8 28 16 28C12.2 28 9 24.5 9 20C9 13 16 6 16 6Z"
              fill="url(#outerFlameGrad2)"
              opacity="0.85"
            />
            <path
              d="M16 14C16 14 19 18 19 21C19 23 17.6 25 16 25C14.4 25 13 23 13 21C13 18 16 14 16 14Z"
              fill="#ffffff"
            />
            <defs>
              <linearGradient id="outerFlameGrad1" x1="16" y1="2" x2="16" y2="19" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
              <linearGradient id="outerFlameGrad2" x1="16" y1="6" x2="16" y2="28" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="70%" stopColor="#ea580c" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
            </defs>
          </svg>
          <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-white drop-shadow-sm">
            Flyinbird
          </span>
        </div>

        {/* Outer Right Glass Pill Badges */}
        <div className="flex items-center gap-3">
          <button
            onClick={onExploreWorkshops}
            className="px-4 py-1.5 rounded-full text-xs font-sans font-medium text-stone-200/90 bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.15] backdrop-blur-md shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            Case Study
          </button>
          <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-stone-300/80 bg-white/[0.06] border border-white/[0.12] backdrop-blur-md shadow-sm">
            2026
          </span>
          <button
            onClick={onBookDemoClick}
            className="hidden sm:inline-flex px-4 py-1.5 rounded-full text-xs font-sans font-semibold text-stone-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 shadow-[0_0_16px_rgba(251,191,36,0.4)] transition-all hover:scale-105 active:scale-95"
          >
            Book Demo
          </button>
        </div>
      </header>

      {/* ====================================================================
          3D INTERACTIVE HERO STAGE (Laptop resting on Liquid Chrome Torus)
         ==================================================================== */}
      <div className="relative flex-1 w-full flex items-center justify-center px-4 sm:px-8 pt-2 pb-0">
        
        {/* Parallax Rig Container */}
        <div
          className="relative w-full max-w-[960px] flex flex-col items-center justify-center transition-transform duration-100 ease-out"
          style={{
            perspective: '1600px',
            transform: `rotateY(${tilt.x.toFixed(2)}deg) rotateX(${tilt.y.toFixed(2)}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >

          {/* ------------------------------------------------------------------
              1. THE PHOTOREALISTIC LAPTOP (MacBook Pro styling)
             ------------------------------------------------------------------ */}
          <div
            className="relative z-20 w-full max-w-[820px] transition-transform duration-200"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'translateZ(20px)',
            }}
          >
            {/* --- LAPTOP DISPLAY SCREEN HOUSING --- */}
            <div
              className="relative w-full rounded-t-[18px] sm:rounded-t-[22px] bg-[#1a1b20] p-[8px] sm:p-[11px] pb-[7px] sm:pb-[9px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.12)]"
              style={{
                boxShadow:
                  '0 30px 70px -15px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.25)',
              }}
            >
              {/* Subtle Webcam Sensor Dot at Top Center */}
              <div className="absolute top-[3px] sm:top-[4px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#0a0a0d] border border-white/20 flex items-center justify-center">
                <span className="w-0.5 h-0.5 rounded-full bg-[#1e293b]" />
              </div>

              {/* Inner Bezel Anti-Glare Glass Frame */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.8] rounded-t-[10px] sm:rounded-t-[14px] overflow-hidden bg-black border border-white/10 shadow-inner">
                
                {/* A. PROCEDURAL GLOWING SUN CANVAS (REPLACES EARTH AT BOTTOM) */}
                <SolarSunCanvas />

                {/* B. INSIDE THE LAPTOP: TOP FLOATING PILL NAVBAR */}
                <div className="relative z-30 w-full px-4 sm:px-6 pt-3.5 sm:pt-4 flex items-center justify-between text-[10px] sm:text-[11px] font-sans">
                  
                  {/* Left Mini Flame Icon inside Laptop */}
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" viewBox="0 0 32 32" fill="none">
                      <path d="M16 4C16 4 22 12 22 18C22 23 18.5 26 16 26C13.5 26 10 23 10 18C10 12 16 4 16 4Z" fill="#f59e0b" />
                      <path d="M16 14C16 14 19 18 19 21C19 23 17.6 25 16 25C14.4 25 13 23 13 21C13 18 16 14 16 14Z" fill="#ffffff" />
                    </svg>
                  </div>

                  {/* Centered Floating Pill Menu */}
                  <nav className="flex items-center gap-1 sm:gap-2 px-2.5 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-stone-300">
                    {['Home', 'About Us', 'Book', 'Course', 'Kits', 'Articles'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-2.5 py-0.5 rounded-full transition-all text-[9px] sm:text-[10px] font-medium ${
                          activeTab === tab
                            ? 'bg-white/20 text-white shadow-sm'
                            : 'text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </nav>

                  {/* Right: Golden Glowing Log In / Book Pill */}
                  <div className="flex items-center gap-2">
                    <span className="hidden md:inline text-[9px] text-stone-400 font-medium">Subscribe</span>
                    <button
                      onClick={onBookDemoClick}
                      className="px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-bold text-stone-950 bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.6)] transition-all hover:scale-105 active:scale-95"
                    >
                      Log in
                    </button>
                  </div>
                </div>

                {/* C. INSIDE THE LAPTOP: HERO HEADLINE & CTA */}
                <div className="relative z-30 w-full h-[calc(100%-48px)] flex flex-col items-center justify-center text-center px-4 sm:px-10 pb-8 sm:pb-12">
                  
                  {/* Brand Center Mark: Golden Flame + Brand Name */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="flex items-center justify-center gap-2 mb-2 sm:mb-3"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]" viewBox="0 0 32 32" fill="none">
                      <path d="M16 2C16 2 21 9 21 15C21 19 18.5 21 16 22C13.5 21 11 19 11 15C11 9 16 2 16 2Z" fill="#fbbf24" />
                      <path d="M16 7C16 7 24 14 24 21C24 26 20 29 16 29C12 29 8 26 8 21C8 14 16 7 16 7Z" fill="#ea580c" opacity="0.85" />
                      <path d="M16 15C16 15 19 19 19 22C19 24 17.5 26 16 26C14.5 26 13 24 13 22C13 19 16 15 16 15Z" fill="#ffffff" />
                    </svg>
                    <span className="text-sm sm:text-base font-serif font-bold tracking-tight text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]">
                      Flyinbird
                    </span>
                  </motion.div>

                  {/* Main Headline (Matching the mockup font weight & presentation) */}
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                    className="text-2xl sm:text-4xl md:text-5xl font-sans font-bold text-white tracking-tight leading-[1.08] max-w-xl mx-auto drop-shadow-md"
                  >
                    We are here to change <br className="hidden sm:inline" />
                    your life!
                  </motion.h1>

                  {/* Subtitle text */}
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mt-2.5 sm:mt-3 text-[10px] sm:text-xs text-stone-300 font-normal leading-relaxed max-w-md mx-auto drop-shadow"
                  >
                    Unlock your potential with structured learning and actionable strategies. Transform theory into real-world achievement.
                  </motion.p>

                  {/* Radiant Golden Pill CTA Button: "Start Your Journey" */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.45 }}
                    className="mt-4 sm:mt-5"
                  >
                    <button
                      onClick={onBookDemoClick}
                      className="group relative px-6 sm:px-7 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold text-stone-950 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_28px_rgba(251,191,36,0.7),0_4px_14px_rgba(0,0,0,0.6)] overflow-hidden"
                      style={{
                        background: 'linear-gradient(180deg, #fef08a 0%, #f59e0b 50%, #d97706 100%)',
                      }}
                    >
                      {/* Top Gloss Sheen */}
                      <span className="absolute top-0 left-0 right-0 h-[45%] bg-white/40 rounded-t-full pointer-events-none" />
                      
                      <span className="relative z-10 flex items-center gap-1.5 drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]">
                        <span>Start Your Journey</span>
                      </span>
                    </button>
                  </motion.div>

                </div>

                {/* Glass reflection streak across the screen */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-25"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.02) 40%, transparent 60%)',
                  }}
                />

              </div>
            </div>

            {/* --- LAPTOP BOTTOM CHASSIS & KEYBOARD DECK --- */}
            <div className="relative w-full">
              {/* Keyboard Deck Top Lip */}
              <div
                className="relative mx-auto w-[99.4%] h-[12px] sm:h-[16px] bg-[#1e2025] rounded-b-[4px] border-t border-[#383b44] shadow-md flex items-center justify-center"
                style={{
                  background: 'linear-gradient(180deg, #2a2c34 0%, #1a1c22 100%)',
                }}
              >
                {/* Hinge cutout notch */}
                <div className="w-[120px] sm:w-[160px] h-[3px] sm:h-[4px] bg-[#0c0d10] rounded-b-sm border-t border-black/80" />
                
                {/* Solar ambient warm light reflection on the keyboard deck from the blazing sun */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-45"
                  style={{
                    background: 'radial-gradient(ellipse at 50% 0%, rgba(251,191,36,0.55) 0%, rgba(234,88,12,0.2) 60%, transparent 100%)',
                  }}
                />
              </div>

              {/* Lower Aluminum Base with Trackpad Thumb Lip */}
              <div
                className="relative mx-auto w-[103.2%] h-[8px] sm:h-[11px] rounded-b-[10px] sm:rounded-b-[14px] shadow-[0_12px_24px_rgba(0,0,0,0.9)]"
                style={{
                  background: 'linear-gradient(180deg, #3d404b 0%, #22242b 60%, #15161b 100%)',
                  boxShadow: '0 10px 24px rgba(0, 0, 0, 0.9), inset 0 1px 1px rgba(255, 255, 255, 0.35)',
                }}
              >
                {/* Center thumb notch for opening laptop */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-24 h-[3px] sm:h-[4px] bg-[#0f1013] rounded-b-md border-x border-b border-white/10" />
              </div>
            </div>

            {/* Contact Shadow under the laptop base */}
            <div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[92%] h-[24px] pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0) 70%)',
                filter: 'blur(10px)',
              }}
            />
          </div>

          {/* ------------------------------------------------------------------
              2. THE LIQUID CHROME METALLIC TORUS / PEDESTAL
                 (Recreating the hyper-realistic curved chrome ring from the image)
             ------------------------------------------------------------------ */}
          <div
            className="relative z-10 w-full max-w-[1040px] -mt-[115px] sm:-mt-[155px] md:-mt-[185px] pointer-events-none select-none"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'translateZ(-15px)',
            }}
          >
            <svg
              viewBox="0 0 1040 380"
              fill="none"
              className="w-full h-auto overflow-visible drop-shadow-[0_30px_60px_rgba(0,0,0,0.85)]"
            >
              <defs>
                {/* Upper Rim Specular Chrome Light */}
                <linearGradient id="chromeRimGrad" x1="120" y1="40" x2="920" y2="40" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#8395b8" stopOpacity="0.4" />
                  <stop offset="25%" stopColor="#ffffff" stopOpacity="0.95" />
                  <stop offset="50%" stopColor="#e2e8f0" stopOpacity="0.85" />
                  <stop offset="75%" stopColor="#ffffff" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#8395b8" stopOpacity="0.4" />
                </linearGradient>

                {/* Main Chrome Body Gradient (Simulating HDR Studio Environment Reflection) */}
                <linearGradient id="chromeBodyGrad" x1="520" y1="20" x2="520" y2="380" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="8%" stopColor="#cbd5e1" />
                  <stop offset="22%" stopColor="#1e2229" />
                  <stop offset="42%" stopColor="#0a0b0e" />
                  <stop offset="56%" stopColor="#475569" />
                  <stop offset="68%" stopColor="#f8fafc" />
                  <stop offset="82%" stopColor="#0f172a" />
                  <stop offset="100%" stopColor="#050811" />
                </linearGradient>

                {/* Inner Arch Hollow Shadow Gradient */}
                <radialGradient id="chromeInnerHollow" cx="50%" cy="85%" r="75%">
                  <stop offset="0%" stopColor="#1e345e" stopOpacity="0.95" />
                  <stop offset="60%" stopColor="#121f38" stopOpacity="0.98" />
                  <stop offset="100%" stopColor="#09101d" stopOpacity="1" />
                </radialGradient>

                {/* Specular Glare Blob */}
                <radialGradient id="specularGlareBlob" cx="45%" cy="30%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Inner Torus Arch (Opening looking into the deep blue space behind) */}
              <ellipse
                cx="520"
                cy="320"
                rx="340"
                ry="180"
                fill="url(#chromeInnerHollow)"
                stroke="#1e293b"
                strokeWidth="1.5"
              />

              {/* Main Outer Chrome Ring Curved Geometry */}
              <path
                d="M 60 380 
                   C 100 160, 320 30, 520 30 
                   C 720 30, 940 160, 980 380 
                   C 860 380, 800 240, 520 240 
                   C 240 240, 180 380, 60 380 Z"
                fill="url(#chromeBodyGrad)"
                stroke="url(#chromeRimGrad)"
                strokeWidth="2.5"
              />

              {/* High-Contrast Liquid Specular Ridge Highlights */}
              <path
                d="M 120 340 
                   C 170 180, 340 50, 520 50 
                   C 700 50, 870 180, 920 340"
                stroke="url(#chromeRimGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Secondary Specular Glare Band along Left Curve */}
              <path
                d="M 160 300 C 200 190, 320 90, 460 70"
                stroke="#ffffff"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.8"
                filter="drop-shadow(0 0 6px rgba(255,255,255,0.8))"
                fill="none"
              />

              {/* Large Specular Sheen Island on Right Torus Shoulder (As seen in mockup) */}
              <ellipse
                cx="640"
                cy="110"
                rx="140"
                ry="36"
                transform="rotate(-8 640 110)"
                fill="url(#specularGlareBlob)"
              />

              {/* Deep Ambient Occlusion Crease Shadow right under Laptop Base */}
              <ellipse
                cx="520"
                cy="70"
                rx="360"
                ry="16"
                fill="#000000"
                opacity="0.9"
                filter="blur(6px)"
              />
            </svg>
          </div>

        </div>

      </div>

      {/* Ambient bottom rim light */}
      <div className="relative z-20 w-full h-8 pointer-events-none" />
    </section>
  );
}

