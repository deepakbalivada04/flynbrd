import React from 'react';
import { ArrowRight, Flame, Sparkles, Award, Users, BookOpen, ChevronDown } from 'lucide-react';
import { THEMES } from '../../constants/themeConfig';

export default function HeroSection({ onBookDemoClick, onExploreClick }) {
  const theme = THEMES[1];

  return (
    <section
      id="section-1"
      className="relative min-h-screen w-full flex flex-col justify-center pt-24 pb-16 px-4 sm:px-8 lg:px-16"
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Narrative & Hero Copy */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6">
          
          {/* Narrative Era Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-950/40 text-amber-300 text-xs font-mono tracking-widest uppercase">
            <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Era I: The Primal Spark & Discovery</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12] font-display">
            Bring the Future to Your Classrooms with{' '}
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent text-glow-amber">
              Hands-On AI & Robotics.
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg sm:text-xl text-stone-300 font-normal leading-relaxed max-w-2xl">
            Interactive, curriculum-aligned technology workshops designed specifically for middle and high schools. We bring the engineers, the hardware, and the inspiration directly to your campus.
          </p>

          {/* CTA Group */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <button
              onClick={onBookDemoClick}
              className="px-8 py-4 rounded-xl text-base font-bold transition-all duration-300 flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-stone-950 shadow-xl shadow-amber-950/60 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Request a School Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreClick}
              className="px-6 py-4 rounded-xl text-base font-medium transition-all duration-300 flex items-center justify-center gap-2 border border-amber-600/40 hover:bg-amber-950/50 text-amber-200 backdrop-blur-sm"
            >
              <span>Explore 3-Level Curricula</span>
            </button>
          </div>

          {/* District Administrator Value Proofs */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 w-full border-t border-amber-900/40">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <Award className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-white">100% Turnkey</div>
                <div className="text-stone-400">Zero Teacher Burden</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-white">NGSS Aligned</div>
                <div className="text-stone-400">STEM Benchmarks</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <Users className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-white">18,000+</div>
                <div className="text-stone-400">Students Inspired</div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: 3D canvas backdrop area + Interactive Context Card */}
        <div className="lg:col-span-5 flex flex-col justify-end">
          <div className="p-6 rounded-2xl border border-amber-600/30 bg-stone-900/60 backdrop-blur-md shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between pb-3 border-b border-amber-800/30 text-xs font-mono text-amber-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                3D SCENE PERSPECTIVE
              </span>
              <span>EARLY MAN // FIRE</span>
            </div>

            <p className="mt-4 text-sm text-stone-300 leading-relaxed">
              Every revolution began when humans fashioned their first tools. Today, artificial intelligence and robotics are the new fire—and students who master them now will lead the next epoch.
            </p>

            <div className="mt-4 pt-3 border-t border-amber-800/20 flex items-center justify-between text-xs text-stone-400">
              <span>Interactive 3D narrative</span>
              <span className="text-amber-400 font-mono">Scroll down to evolve →</span>
            </div>
          </div>
        </div>

      </div>

      {/* Scroll Down Prompt */}
      <div 
        onClick={onExploreClick}
        className="mt-12 flex flex-col items-center justify-center gap-1.5 cursor-pointer opacity-75 hover:opacity-100 transition-opacity"
      >
        <span className="text-[11px] font-mono tracking-widest text-amber-400/80 uppercase">
          Scroll To Advance Narrative & Workshops
        </span>
        <ChevronDown className="w-5 h-5 text-amber-400 animate-bounce" />
      </div>

    </section>
  );
}

