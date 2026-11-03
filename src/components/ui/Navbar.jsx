import React from 'react';
import { Bot, Sparkles, Cpu, Cog, Flame, ArrowRight, ShieldCheck } from 'lucide-react';
import { THEMES } from '../../constants/themeConfig';

export default function Navbar({ currentPhase = 1, onNavigatePhase }) {
  const currentTheme = THEMES[currentPhase] || THEMES[1];

  const phases = [
    { id: 1, label: '01 Primal', icon: Flame, title: 'Early Man' },
    { id: 2, label: '02 Inventor', icon: Cog, title: 'Classical Mechanics' },
    { id: 3, label: '03 Developer', icon: Cpu, title: 'Silicon Logic' },
    { id: 4, label: '04 AI Robot', icon: Bot, title: 'Autonomous AI' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-colors duration-700 px-4 sm:px-8 py-3.5 backdrop-blur-md bg-stone-950/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigatePhase(1)}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-amber-500 p-[1.5px] transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-stone-950 rounded-[7px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-cyan-400 group-hover:text-amber-400 transition-colors" />
            </div>
          </div>
          <div>
            <div className="font-extrabold tracking-wider text-base sm:text-lg flex items-center gap-1.5 font-display text-white">
              FLYINBIRD
              <span className="text-xs px-1.5 py-0.5 rounded bg-white/10 text-stone-300 font-mono font-normal">
                STEM
              </span>
            </div>
            <div className="text-[10px] tracking-widest uppercase text-stone-400 font-mono hidden sm:block">
              AI & Robotics Workshops
            </div>
          </div>
        </div>

        {/* Narrative Scrubber / Phase Badges */}
        <nav className="hidden md:flex items-center gap-1.5 bg-black/40 p-1 rounded-full border border-white/10">
          {phases.map((p) => {
            const Icon = p.icon;
            const isActive = currentPhase === p.id;
            return (
              <button
                key={p.id}
                onClick={() => onNavigatePhase(p.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all duration-300 ${
                  isActive
                    ? `${currentTheme.accentBg} text-stone-950 font-bold shadow-md`
                    : 'text-stone-400 hover:text-white hover:bg-white/5'
                }`}
                title={p.title}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-stone-950' : 'text-stone-400'}`} />
                <span>{p.label}</span>
              </button>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-stone-300 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>District Approved</span>
          </div>

          <button
            onClick={() => onNavigatePhase(4)}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 ${currentTheme.btnPrimary}`}
          >
            <span>Book School Demo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </header>
  );
}

