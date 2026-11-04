import React, { useEffect, useState } from 'react';

/**
 * SparkleCursorTrail
 * 
 * Desktop only cursor trail:
 * - Follows the cursor with small sparkling stars
 * - Max 16 active trail particles
 * - Disabled below 768px and on touch screens
 * - Respects prefers-reduced-motion
 */
export default function SparkleCursorTrail() {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Disabled on mobile/touch screens or reduced motion
    const isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isMobile || prefersReducedMotion) return;

    let lastTime = 0;
    const colors = ['#FFC933', '#38BDF8', '#FF6B5B', '#FFFFFF'];

    const handleMouseMove = (e) => {
      const now = performance.now();
      if (now - lastTime < 35) return; // Throttled to ~30fps emission
      lastTime = now;

      const newSparkle = {
        id: Math.random(),
        x: e.clientX,
        y: e.clientY,
        size: 8 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 180,
        life: 1.0,
      };

      setSparkles((prev) => [...prev.slice(-15), newSparkle]);
    };

    window.addEventListener('pointermove', handleMouseMove, { passive: true });

    let animId;
    const loop = () => {
      setSparkles((prev) => {
        if (prev.length === 0) return prev;
        return prev
          .map((s) => ({
            ...s,
            y: s.y + 0.4, // subtle drift downward
            life: s.life - 0.05,
          }))
          .filter((s) => s.life > 0);
      });
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointermove', handleMouseMove);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  if (sparkles.length === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none select-none z-40 overflow-hidden"
    >
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${s.x}px`,
            top: `${s.y}px`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.life * 0.85,
            transform: `translate(-50%, -50%) rotate(${s.rotation}deg) scale(${s.life})`,
          }}
        >
          <svg viewBox="0 0 24 24" fill={s.color} className="w-full h-full">
            <path d="M12 0L14 9L23 12L14 15L12 24L10 15L1 12L10 9Z" />
          </svg>
        </div>
      ))}
    </div>
  );
}

