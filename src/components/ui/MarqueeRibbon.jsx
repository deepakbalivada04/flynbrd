import React from 'react';

/**
 * MarqueeRibbon
 * 
 * Tilted marquee ribbon with infinite scrolling band:
 * - "BUILD ✦ CODE ✦ LAUNCH ✦ REPEAT" with tiny gear and rocket icons
 * - Tilted 2deg, dark surface background (#15151E), yellow text (#FFC933)
 * - Pauses on hover
 */
export default function MarqueeRibbon() {
  const items = [
    { text: 'BUILD', icon: '⚙️' },
    { text: 'CODE', icon: '💻' },
    { text: 'LAUNCH', icon: '🚀' },
    { text: 'REPEAT', icon: '🔄' },
    { text: 'BUILD', icon: '⚙️' },
    { text: 'CODE', icon: '💻' },
    { text: 'LAUNCH', icon: '🚀' },
    { text: 'REPEAT', icon: '🔄' },
  ];

  return (
    <div className="relative w-full overflow-hidden py-4 pointer-events-auto z-20 group">
      <div className="w-[106%] -ml-[3%] transform rotate-2 bg-[#15151E] text-[#FFC933] border-y-2 border-[#FFC933]/30 py-3 shadow-[0_6px_0px_0px_#000000]">
        <div className="animate-marquee group-hover:[animation-play-state:paused] flex items-center whitespace-nowrap gap-10 text-xs sm:text-sm font-display font-extrabold tracking-widest uppercase select-none">
          {/* Duplicated for seamless infinite loop */}
          {[...items, ...items, ...items].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="text-white/40">✦</span>
              <span className="tracking-widest">{item.text}</span>
              <span className="text-sm filter drop-shadow-[0_0_8px_#FFC933]">{item.icon}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
