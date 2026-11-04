import React from 'react';
import { motion } from 'framer-motion';
import GlassPedalButton from '../ui/GlassPedalButton';

export default function HeroSection({ onBookDemoClick }) {
  return (
    <section className="relative min-h-[92vh] w-full flex flex-col justify-between border-b border-white/10 px-6 sm:px-12 lg:px-16 pt-32 pb-16 overflow-visible">
      
      {/* Top Overline Specs Grid */}
      <div className="relative z-50 grid grid-cols-1 md:grid-cols-12 gap-4 border-b border-white/10 pb-6 text-xs font-mono text-stone-400">
        <div className="md:col-span-4 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-amber-200 animate-pulse" />
          <span className="tracking-widest uppercase text-stone-300">
            [ 01 // OVERVIEW ]
          </span>
        </div>
        <div className="md:col-span-4 text-left md:text-center text-stone-400">
          K-12 EXPERIENTIAL STEM SYSTEM
        </div>
        <div className="md:col-span-4 text-left md:text-right text-stone-400">
          STATUS: READY FOR DISTRICT DEPLOYMENT
        </div>
      </div>

      {/* Main Massive Hero Typography Spanning the Grid (z-50 for perfect contrast & readability) */}
      <div className="relative z-50 my-auto py-12 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter text-stone-100 uppercase leading-[0.92]">
            Bring the future <br />
            <span className="text-stone-300">to your classrooms.</span>
          </h1>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <p className="md:col-span-7 text-sm sm:text-base text-stone-400 font-sans font-normal leading-relaxed max-w-lg">
              Curriculum-aligned technology workshops engineered specifically for middle and high schools. All hardware, instructors, and software supplied.
            </p>

            <div className="md:col-span-5 flex md:justify-end">
              <GlassPedalButton onClick={onBookDemoClick}>
                Book a Demo
              </GlassPedalButton>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Technical Grid Line Footer */}
      <div className="relative z-50 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/10 text-xs font-mono text-stone-400">
        <div>
          <span className="text-stone-400 text-[10px] block">STANDARD</span>
          <span className="text-stone-200">NGSS & CSTA ALIGNED</span>
        </div>
        <div>
          <span className="text-stone-400 text-[10px] block">LOGISTICS</span>
          <span className="text-stone-200">100% TURNKEY KITS</span>
        </div>
        <div>
          <span className="text-stone-400 text-[10px] block">FACULTY IMPACT</span>
          <span className="text-stone-200">ZERO TEACHER PREP</span>
        </div>
        <div className="text-right">
          <span className="text-stone-400 text-[10px] block">COVERAGE</span>
          <span className="text-amber-200">NATIONWIDE ACCESS</span>
        </div>
      </div>

    </section>
  );
}
