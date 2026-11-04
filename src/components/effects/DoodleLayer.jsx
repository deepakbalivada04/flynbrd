import React from 'react';

/**
 * DoodleLayer
 * 
 * Hand-drawn SVG scribbles in brand yellow (#FFC933) at 40-60% opacity:
 * - Hand-drawn stars, spirals, arrows, tiny gears, "wow" bursts, and zigzags
 * - Absolutely positioned along hero and section margins (never overlapping text)
 * - stroke-linecap="round" for authentic hand-drawn toy aesthetic
 */
export default function DoodleLayer({ variant = 'hero' }) {
  if (variant === 'hero') {
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none overflow-hidden z-10"
      >
        {/* 1. Spiral spring scribble (top right margin) */}
        <svg
          className="absolute top-12 right-10 sm:right-24 w-16 h-16 sm:w-20 sm:h-20 text-[#FFC933] opacity-50"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <path d="M 50 50 m -5 0 a 5 5 0 1 0 10 0 a 10 10 0 1 0 -20 0 a 15 15 0 1 0 30 0 a 20 20 0 1 0 -40 0 a 25 25 0 1 0 50 0" />
        </svg>

        {/* 2. Hand-drawn 5-point star scribble (top left corner) */}
        <svg
          className="absolute top-16 left-6 sm:left-14 w-12 h-12 text-[#FFC933] opacity-55"
          viewBox="0 0 80 80"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M 40 8 L 48 30 L 72 32 L 53 47 L 59 71 L 40 56 L 21 71 L 27 47 L 8 32 L 32 30 Z" />
        </svg>

        {/* 3. "WOW" Burst / Energy Starburst (near the top CTA margin) */}
        <svg
          className="absolute top-1/3 left-4 sm:left-8 w-14 h-14 text-[#FFC933] opacity-45"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <path d="M 50 15 L 50 5 M 50 85 L 50 95 M 15 50 L 5 50 M 85 50 L 95 50 M 25 25 L 18 18 M 75 75 L 82 82 M 25 75 L 18 82 M 75 25 L 82 18" />
          <circle cx="50" cy="50" r="14" strokeDasharray="4 4" />
        </svg>

        {/* 4. Hand-drawn loop-de-loop arrow pointing towards content */}
        <svg
          className="absolute bottom-20 left-12 sm:left-28 w-24 h-16 text-[#FFC933] opacity-55"
          viewBox="0 0 140 90"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M 15 65 C 45 65, 75 10, 55 35 C 40 55, 80 85, 115 50" />
          <path d="M 105 45 L 115 50 L 118 38" />
        </svg>

        {/* 5. Tiny Hand-drawn Gear scribble (bottom right margin) */}
        <svg
          className="absolute bottom-16 right-8 sm:right-20 w-16 h-16 text-[#FFC933] opacity-45"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <circle cx="50" cy="50" r="18" />
          <path d="M 50 20 L 50 26 M 50 74 L 50 80 M 20 50 L 26 50 M 74 50 L 80 50 M 28 28 L 34 34 M 66 66 L 72 72 M 28 72 L 34 66 M 66 34 L 72 28" />
          <circle cx="50" cy="50" r="6" fill="#FFC933" />
        </svg>

        {/* 6. Electric Zigzag Spark (middle right) */}
        <svg
          className="absolute top-1/2 right-4 sm:right-12 w-12 h-20 text-[#FFC933] opacity-50"
          viewBox="0 0 60 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M 30 10 L 15 45 L 42 45 L 20 90" />
        </svg>
      </div>
    );
  }

  // Section divider doodles
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none select-none overflow-hidden z-10"
    >
      {/* Corner Sparkle */}
      <svg
        className="absolute top-6 right-8 w-10 h-10 text-[#FFC933] opacity-45"
        viewBox="0 0 60 60"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M 30 10 Q 30 30 50 30 Q 30 30 30 50 Q 30 30 10 30 Q 30 30 30 10 Z" />
      </svg>

      {/* Tiny loop arrow */}
      <svg
        className="absolute bottom-6 left-8 w-12 h-12 text-[#FFC933] opacity-40"
        viewBox="0 0 80 80"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M 20 60 C 40 60, 60 40, 50 25 C 40 10, 20 30, 45 45" />
        <path d="M 38 42 L 45 45 L 48 38" />
      </svg>
    </div>
  );
}

