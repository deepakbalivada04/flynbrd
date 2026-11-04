import React, { useEffect, useState, useRef } from 'react';

/**
 * ScrollLaunchRail
 * 
 * Signature Effect 1:
 * - Fixed left rail with a small rocket and altitude meter (0m to 100,000m)
 * - Driven by scroll progress with a star trail behind the rocket
 * - Sections labelled as flight stages
 * - Single rAF loop, passive scroll listener
 * - Hidden on mobile (<768px)
 */
export default function ScrollLaunchRail() {
  const [scrollP, setScrollP] = useState(0);
  const [altitude, setAltitude] = useState(0);
  const railHeight = 280; // px
  const animFrameRef = useRef(null);

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    let targetP = 0;
    let currentP = 0;

    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      targetP = Math.max(0, Math.min(1, scrollY / maxScroll));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const loop = () => {
      currentP += (targetP - currentP) * 0.12;
      setScrollP(currentP);
      setAltitude(Math.round(currentP * 100000));
      animFrameRef.current = requestAnimationFrame(loop);
    };
    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const stages = [
    { label: 'T-0', threshold: 0.05 },
    { label: '25k', threshold: 0.35 },
    { label: '50k', threshold: 0.60 },
    { label: '75k', threshold: 0.85 },
    { label: 'ORBIT', threshold: 0.98 },
  ];

  // Rocket position from bottom to top (inverting so it launches upward)
  const rocketY = railHeight * (1 - scrollP);

  return (
    <div
      aria-label="Scroll Altitude Launch Rail"
      className="hidden md:flex fixed left-5 top-1/2 -translate-y-1/2 z-40 flex-col items-center pointer-events-none select-none"
    >
      {/* Altitude HUD Badge */}
      <div className="mb-3 px-2.5 py-1 rounded-full bg-[#15151E] border-2 border-[#FFC933] shadow-[3px_3px_0px_0px_#000000] text-center">
        <span className="text-[10px] font-mono font-bold text-[#FFC933] block leading-none">
          {altitude.toLocaleString()}m
        </span>
        <span className="text-[8px] font-mono text-stone-400 block leading-tight mt-0.5">
          ALTITUDE
        </span>
      </div>

      {/* Vertical Rail Tube */}
      <div
        className="relative w-8 rounded-full bg-[#15151E]/90 border-2 border-white/20 backdrop-blur-md flex items-center justify-center p-1 shadow-[4px_4px_0px_0px_#000000]"
        style={{ height: `${railHeight}px` }}
      >
        {/* Rail Center Dashed Guide Wire */}
        <div className="absolute top-3 bottom-3 w-[2px] border-r-2 border-dashed border-white/20" />

        {/* Trail Flame/Star behind rocket */}
        <div
          className="absolute w-2.5 rounded-full transition-all duration-75"
          style={{
            bottom: '10px',
            top: `${rocketY + 16}px`,
            background: 'linear-gradient(to top, rgba(255, 201, 51, 0.1), rgba(255, 201, 51, 0.8))',
            boxShadow: '0 0 10px #FFC933',
          }}
        />

        {/* Moving Rocket Token */}
        <div
          className="absolute transition-transform duration-75 flex flex-col items-center"
          style={{
            top: `${rocketY}px`,
            transform: 'translateY(-50%)',
          }}
        >
          {/* Mini Rocket SVG */}
          <div className="w-6 h-6 p-1 rounded-full bg-[#FFC933] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 transform -rotate-45">
              <path d="M12 2.5s3 2 4 5c1 3-1 6-1 6l2 2-2 2-2-2s-3 2-6 1c-3-1-5-4-5-4l2-2s-1-4 1-6c2-2 7-2 7-2z" />
            </svg>
          </div>
        </div>

        {/* Flight Stages Markers */}
        {stages.map((stg, idx) => {
          const reached = scrollP >= stg.threshold;
          const posFromTop = railHeight * (1 - stg.threshold);
          return (
            <div
              key={idx}
              className="absolute left-9 flex items-center gap-1.5 whitespace-nowrap text-[9px] font-mono font-bold"
              style={{ top: `${posFromTop}px`, transform: 'translateY(-50%)' }}
            >
              <div
                className={`w-1.5 h-1.5 rounded-full border transition-all ${
                  reached ? 'bg-[#FFC933] border-[#FFC933] shadow-[0_0_6px_#FFC933]' : 'bg-[#15151E] border-white/40'
                }`}
              />
              <span className={`transition-colors ${reached ? 'text-[#FFC933]' : 'text-stone-400'}`}>
                {stg.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

