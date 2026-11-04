import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Award } from 'lucide-react';
import InteractiveRobotShowcase from './InteractiveRobotShowcase';

export default function FriendlyHero({ onBookDemoClick, onExploreClick }) {
  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden bg-gradient-to-b from-slate-100/90 via-white to-slate-50">
      {/* Soft Ambient Background Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-40 blur-3xl -z-10">
        <div className="absolute top-0 left-10 w-72 h-72 rounded-full bg-indigo-200" />
        <div className="absolute top-12 right-12 w-80 h-80 rounded-full bg-amber-100" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            {/* Friendly Announcement Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Turnkey STEM Workshops for Middle & High Schools</span>
            </div>

            {/* Main Headline: Clear, inspiring, friendly */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold font-display tracking-tight text-slate-900 leading-[1.15]">
              Bring Hands-On <br />
              <span className="text-indigo-600">AI & Robotics</span> Directly to Your Classroom.
            </h1>

            {/* Subheading */}
            <p className="mt-5 text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
              We bring complete physical robotics hardware, industry-grade curriculum, and certified STEM instructors straight to your school. Zero teacher preparation, zero equipment buying.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onBookDemoClick}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5"
              >
                <span>Schedule a School Demo</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base border border-slate-300 shadow-sm transition-all hover:border-slate-400 flex items-center justify-center gap-2"
              >
                <span>Explore 3-Level Curricula</span>
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="mt-10 pt-8 border-t border-slate-200/80 w-full grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-600 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% turnkey delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Zero teacher prep</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500 shrink-0" />
                <span>NGSS & CSTA benchmarked</span>
              </div>
            </div>

          </div>

          {/* Right Column: Organic Interactive Robot Visual Workbench (NO SQUARE DOKKU!) */}
          <div className="lg:col-span-6 w-full flex items-center justify-center">
            <InteractiveRobotShowcase onBookClick={onBookDemoClick} />
          </div>

        </div>
      </div>
    </section>
  );
}
