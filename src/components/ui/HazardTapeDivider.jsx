import React from 'react';

/**
 * HazardTapeDivider
 * 
 * Diagonal yellow/black warning stripes, tilted at -1.5deg with slight overflow:
 * - Brings playful industrial "workshop in progress" toy energy
 * - Clean 1px border edges
 * - Overflow with -ml-[2%] and w-[104%] to break grid boundaries
 */
export default function HazardTapeDivider({ label = 'CAUTION ✦ ROBOTICS LAB IN SESSION ✦ EXPERIENTIAL STEM ✦ BUILD ✦ CODE ✦ LAUNCH' }) {
  return (
    <div className="relative w-full overflow-hidden py-6 pointer-events-none select-none z-20">
      <div
        className="w-[106%] -ml-[3%] h-9 sm:h-10 flex items-center justify-center transform -rotate-[1.5deg] shadow-[0_8px_20px_rgba(0,0,0,0.8)] border-y-2 border-black"
        style={{
          background: 'repeating-linear-gradient(-45deg, #FFC933, #FFC933 18px, #0B0B10 18px, #0B0B10 36px)',
        }}
      >
        <div className="px-6 py-0.5 bg-[#0B0B10]/90 border border-[#FFC933] rounded-full shadow-md">
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-[#FFC933] uppercase">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}

