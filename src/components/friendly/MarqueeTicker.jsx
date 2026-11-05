import React from 'react';
import content from '../../content/content.json';

export default function MarqueeTicker() {
  const items = content.ticker;
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div 
      className="ticker-wrap w-full border-y border-[#DCCFB6] bg-[#EFE6D3] py-3 overflow-hidden select-none"
      aria-label="Core curriculum focus topics"
    >
      <div className="ticker-track flex items-center gap-6">
        {repeatedItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-6 shrink-0">
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#1F4236] font-medium">
              {item}
            </span>
            <span className="text-[#C98A22] text-xs" aria-hidden="true">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}