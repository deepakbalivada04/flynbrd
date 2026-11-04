import React, { useEffect, useState } from 'react';
import { playTinyClick } from '../../utils/toyAudio';

/**
 * ClickBurst
 * 
 * Playable Toys Effect:
 * - Click anywhere (except on buttons/links) spawns a burst of 6-10 gears, bolts & stars
 * - Cap at 30 active particles total
 * - Natural ballistic velocity, gravity, and opacity fade
 * - Respects prefers-reduced-motion
 */
export default function ClickBurst() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const shapes = ['gear', 'bolt', 'star', 'sparkle'];
    const colors = ['#FFC933', '#38BDF8', '#FF6B5B', '#34D399'];

    const handleClick = (e) => {
      // Don't fire on interactive buttons, links, inputs, or canvas
      if (e.target.closest('button, a, input, select, textarea, canvas')) {
        return;
      }

      playTinyClick();

      const count = 7 + Math.floor(Math.random() * 4); // 7-10 particles
      const newItems = [];
      const now = Date.now();

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 3.5 + Math.random() * 5.5;

        newItems.push({
          id: `${now}-${i}-${Math.random()}`,
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2.5, // slight upward kick
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          vRot: (Math.random() - 0.5) * 14,
          scale: 0.8 + Math.random() * 0.5,
          life: 1.0,
        });
      }

      setParticles((prev) => {
        // Enforce max 30 active particles cap
        const combined = [...prev, ...newItems];
        return combined.slice(-30);
      });
    };

    window.addEventListener('pointerdown', handleClick, { passive: true });

    let animId;
    const update = () => {
      setParticles((prev) => {
        if (prev.length === 0) return prev;
        return prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.28, // gravity
            rotation: p.rotation + p.vRot,
            life: p.life - 0.035, // fade speed
          }))
          .filter((p) => p.life > 0);
      });
      animId = requestAnimationFrame(update);
    };
    animId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('pointerdown', handleClick);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  if (particles.length === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none select-none z-50 overflow-hidden"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-none"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            transform: `translate(-50%, -50%) rotate(${p.rotation}deg) scale(${p.scale * p.life})`,
            opacity: p.life,
          }}
        >
          {p.shape === 'gear' && (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={p.color} strokeWidth="2.5">
              <circle cx="12" cy="12" r="4" fill={p.color} />
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1l2.1-2.1M17 7l2.1-2.1" strokeLinecap="round" />
            </svg>
          )}

          {p.shape === 'bolt' && (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill={p.color} stroke="#000" strokeWidth="1.5">
              <polygon points="12,2 21,7 21,17 12,22 3,17 3,7" />
              <circle cx="12" cy="12" r="3.5" fill="#15151E" />
            </svg>
          )}

          {p.shape === 'star' && (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill={p.color} stroke="#000" strokeWidth="1.5">
              <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
            </svg>
          )}

          {p.shape === 'sparkle' && (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill={p.color}>
              <path d="M12 0L14 9L23 12L14 15L12 24L10 15L1 12L10 9Z" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

