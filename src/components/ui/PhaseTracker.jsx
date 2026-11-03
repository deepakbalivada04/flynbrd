import React from 'react';
import { THEMES } from '../../constants/themeConfig';

export default function PhaseTracker({ currentPhase = 1, scrollProgress = 0, onNavigatePhase }) {
  const currentTheme = THEMES[currentPhase] || THEMES[1];

  const steps = [
    { id: 1, label: '01', title: 'Early Man', desc: 'Primal Fire' },
    { id: 2, label: '02', title: 'Inventor', desc: 'Clockwork Gears' },
    { id: 3, label: '03', title: 'Developer', desc: 'Silicon Logic' },
    { id: 4, label: '04', title: 'AI Robot', desc: 'Autonomous AI' },
  ];

  return (
    <aside
      aria-label="Evolution Timeline Navigation"
      className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-3 pointer-events-auto"
    >
      {/* Scroll Progress percentage */}
      <div className="font-mono text-[10px] text-stone-400 mb-1 tracking-wider bg-black/60 px-2 py-0.5 rounded border border-white/10 backdrop-blur-sm">
        {Math.round(scrollProgress * 100)}% EVOLUTION
      </div>

      {steps.map((step) => {
        const isActive = currentPhase === step.id;
        return (
          <button
            key={step.id}
            onClick={() => onNavigatePhase(step.id)}
            className="group flex items-center gap-3 transition-all duration-300 text-right focus:outline-none"
          >
            {/* Hover Tooltip label */}
            <div
              className={`transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 ${
                isActive ? 'opacity-100 translate-x-0' : ''
              }`}
            >
              <div
                className={`text-xs font-semibold tracking-wider font-mono ${
                  isActive ? currentTheme.accentColor : 'text-stone-400'
                }`}
              >
                {step.title}
              </div>
              <div className="text-[10px] text-stone-500 hidden lg:block">
                {step.desc}
              </div>
            </div>

            {/* Indicator Dot / Pill */}
            <div
              className={`w-3.5 h-3.5 rounded-full border transition-all duration-500 flex items-center justify-center ${
                isActive
                  ? `scale-125 ${currentTheme.accentBg} border-white shadow-lg`
                  : 'border-stone-600 bg-stone-900/80 group-hover:border-stone-400'
              }`}
            >
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-stone-950 animate-ping" />
              )}
            </div>
          </button>
        );
      })}

      {/* Progress track vertical line */}
      <div className="w-0.5 h-20 bg-white/10 rounded-full mr-1.5 overflow-hidden">
        <div
          className={`w-full transition-all duration-300 ${currentTheme.accentBg}`}
          style={{ height: `${scrollProgress * 100}%` }}
        />
      </div>
    </aside>
  );
}

