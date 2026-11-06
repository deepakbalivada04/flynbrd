import React from 'react';
import content from '../../content/content.json';

// Strictly matching the exact color sequence and hex codes from text_logo.png:
// f = Red (#D4252A), l = Orange (#EE7819), y = Yellow (#F9BA06), n = Green (#1D9D53), b = Blue (#2576BC), feather = Teal (#109599), d = Purple (#533788)
const LOGO_COLORS = [
  { text: 'text-[#2576BC]', dot: 'bg-[#2576BC]' }, // Logo Blue ('b')
  { text: 'text-[#D4252A]', dot: 'bg-[#D4252A]' }, // Logo Red ('f')
  { text: 'text-[#EE7819]', dot: 'bg-[#EE7819]' }, // Logo Orange ('l')
  { text: 'text-[#1D9D53]', dot: 'bg-[#1D9D53]' }, // Logo Green ('n')
  { text: 'text-[#533788]', dot: 'bg-[#533788]' }, // Logo Purple ('d')
  { text: 'text-[#F9BA06]', dot: 'bg-[#F9BA06]' }, // Logo Yellow ('y')
  { text: 'text-[#109599]', dot: 'bg-[#109599]' }, // Logo Teal (feather)
];

export default function MarqueeTicker() {
  const items = content.ticker;
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div 
      className="ticker-wrap w-full border-y border-slate-200 bg-white py-3 sm:py-3.5 overflow-hidden select-none"
      aria-label="Core curriculum focus topics"
    >
      <div className="ticker-track flex items-center gap-7 sm:gap-9">
        {repeatedItems.map((item, idx) => {
          const color = LOGO_COLORS[idx % LOGO_COLORS.length];

          return (
            <div key={idx} className="flex items-center gap-7 sm:gap-9 shrink-0">
              <div className={`flex items-center gap-2.5 font-sans text-xs sm:text-sm font-bold tracking-wider uppercase ${color.text} hover:opacity-85 transition-opacity`}>
                <span className={`w-2.5 h-2.5 rounded-full ${color.dot} shrink-0 ring-4 ring-slate-100/80`} />
                <span>{item}</span>
              </div>
              <span className="text-slate-300 text-xs font-semibold select-none" aria-hidden="true">✦</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
