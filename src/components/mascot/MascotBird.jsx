import React, { useEffect, useState, useRef } from 'react';

/**
 * MascotBird ("Flyin")
 * 
 * Signature Effect 3:
 * - Playful robot-bird mascot in the hero corner or card
 * - Head and eyes follow the cursor with smooth lerping
 * - Waving wing when hovering the main CTA button
 * - Celebratory flap when unlocking level or completing form
 * - Inline SVG fallback with /public/mascot/flyin.png support
 */
export default function MascotBird({ isWaving = false, isCelebrating = false }) {
  const mascotRef = useRef(null);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [headAngle, setHeadAngle] = useState(0);
  const [imgError, setImgError] = useState(false);
  const [wavingState, setWavingState] = useState(isWaving);
  const [celebratingState, setCelebratingState] = useState(isCelebrating);

  // Sync external props
  useEffect(() => {
    setWavingState(isWaving);
  }, [isWaving]);

  useEffect(() => {
    setCelebratingState(isCelebrating);
  }, [isCelebrating]);

  // Listen for global custom events from CTAs or Form
  useEffect(() => {
    const handleWave = (e) => {
      setWavingState(Boolean(e.detail));
    };
    const handleCelebrate = (e) => {
      setCelebratingState(Boolean(e.detail));
      if (e.detail) {
        setTimeout(() => setCelebratingState(false), 2600);
      }
    };

    window.addEventListener('mascot-wave', handleWave);
    window.addEventListener('mascot-celebrate', handleCelebrate);
    return () => {
      window.removeEventListener('mascot-wave', handleWave);
      window.removeEventListener('mascot-celebrate', handleCelebrate);
    };
  }, []);

  // Eye and head tracking pointer movement
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      if (!mascotRef.current) return;
      const rect = mascotRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 0) {
        const maxEye = 3.5;
        setEyeOffset({
          x: (dx / dist) * maxEye,
          y: (dy / dist) * maxEye,
        });

        const angle = Math.max(-12, Math.min(12, (dx / 500) * 12));
        setHeadAngle(angle);
      }
    };

    window.addEventListener('pointermove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMouseMove);
  }, []);

  return (
    <div
      ref={mascotRef}
      className="relative flex flex-col items-center pointer-events-auto select-none transition-all duration-300"
    >
      {/* Playful Speech Bubble */}
      <div className="mb-2 px-3 py-1 rounded-full bg-[#15151E] border-2 border-[#FFC933] shadow-[3px_3px_0px_0px_#000000] text-[10px] font-mono font-bold text-[#FFC933] whitespace-nowrap animate-bounce">
        {celebratingState
          ? '🎉 Level Unlocked!'
          : wavingState
          ? '🚀 Ready for launch!'
          : "Beep! I'm Flyin!"}
      </div>

      {/* Mascot Housing / Toy Box Frame */}
      <div
        className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#15151E] border-[3px] border-[#FFC933] shadow-[5px_5px_0px_0px_#FFC933] p-2 flex items-center justify-center transition-transform duration-300 ${
          celebratingState ? 'animate-bounce scale-110' : ''
        }`}
        style={{ transform: `rotate(${headAngle}deg)` }}
      >
        {!imgError ? (
          <img
            src="/mascot/flyin.png"
            alt="Flyinbird Mascot"
            onError={() => setImgError(true)}
            className="w-full h-full object-contain"
          />
        ) : (
          /* High-Quality SVG Robot-Bird Fallback */
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full overflow-visible">
            {/* Robot Bird Antenna */}
            <line x1="50" y1="20" x2="50" y2="8" stroke="#FFC933" strokeWidth="3" strokeLinecap="round" />
            <circle cx="50" cy="8" r="4" fill="#38BDF8" stroke="#000" strokeWidth="1.5" />

            {/* Bird Head & Visor Shell */}
            <rect x="22" y="20" width="56" height="50" rx="18" fill="#1F1F2B" stroke="#FFFFFF" strokeWidth="2.5" />

            {/* Dark Visor */}
            <rect x="28" y="30" width="44" height="22" rx="8" fill="#0B0B10" stroke="#38BDF8" strokeWidth="1.5" />

            {/* Left Eye & Pupil (follows cursor) */}
            <circle cx="40" cy="41" r="6" fill="#1E293B" />
            <circle cx={40 + eyeOffset.x} cy={41 + eyeOffset.y} r="3" fill="#38BDF8" />
            <circle cx={40 + eyeOffset.x + 1} cy={41 + eyeOffset.y - 1} r="1" fill="#FFFFFF" />

            {/* Right Eye & Pupil (follows cursor) */}
            <circle cx="60" cy="41" r="6" fill="#1E293B" />
            <circle cx={60 + eyeOffset.x} cy={41 + eyeOffset.y} r="3" fill="#38BDF8" />
            <circle cx={60 + eyeOffset.x + 1} cy={41 + eyeOffset.y - 1} r="1" fill="#FFFFFF" />

            {/* Golden Robot Beak */}
            <polygon points="50,48 42,58 58,58" fill="#FFC933" stroke="#000000" strokeWidth="1.5" />

            {/* Left Wing (Waves when wavingState is true) */}
            <g
              className={
                wavingState
                  ? 'animate-pulse origin-[20px_50px] transform -rotate-12'
                  : ''
              }
            >
              <path d="M 20 45 C 8 40, 6 60, 20 62 Z" fill="#FFC933" stroke="#000000" strokeWidth="2" />
            </g>

            {/* Right Wing */}
            <path d="M 80 45 C 92 40, 94 60, 80 62 Z" fill="#FFC933" stroke="#000000" strokeWidth="2" />

            {/* Little Mechanical Feet */}
            <path d="M 38 70 L 38 78 M 34 78 L 42 78" stroke="#FFC933" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 62 70 L 62 78 M 58 78 L 66 78" stroke="#FFC933" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        )}
      </div>
    </div>
  );
}
