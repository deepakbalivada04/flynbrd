import React from 'react';
import { ArrowRight } from 'lucide-react';
import InteractiveRobotShowcase from './InteractiveRobotShowcase';

export default function FriendlyHero({ onBookDemoClick, onExploreClick }) {
  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden bg-[#FAF8F3]">
      
      {/* Subtle Warm Backdrop Lighting */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-20 blur-3xl -z-10">
        <div className="absolute top-0 left-10 w-72 h-72 rounded-full bg-[#E8E4D9]" />
        <div className="absolute top-12 right-12 w-80 h-80 rounded-full bg-[#FAF0D6]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            {/* Eyebrow: STEM residencies for Andhra Pradesh and Telangana schools */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#E8E4D9] mb-5 shadow-subtle">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
              <span className="font-mono uppercase text-xs tracking-widest text-[#C9A227]">
                STEM residencies for Andhra Pradesh and Telangana schools
              </span>
            </div>

            {/* Headline: Your students will build AI, not just read about it. */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-serif font-normal tracking-tight text-[#0F1B2D] leading-[1.12]">
              Your students will build <span className="font-serif italic text-[#C9A227]">AI</span>, not just read about it.
            </h1>

            {/* Subhead */}
            <p className="mt-5 text-[17px] text-[#5C6470] font-normal leading-relaxed max-w-xl">
              Flyinbird brings a complete robotics lab, a trained instructor, and a structured AI curriculum into your school for a fixed workshop period. Your teachers don't prepare, buy equipment, or run the sessions.
            </p>

            {/* CTAs: Primary = Book a School Walkthrough, Secondary = See the curriculum */}
            <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onBookDemoClick}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#0F1B2D] text-[#FAF8F3] hover:bg-[#C9A227] hover:text-[#0F1B2D] font-medium text-sm transition-colors flex items-center justify-center gap-2.5 shadow-sm"
              >
                <span>Book a School Walkthrough</span>
                <ArrowRight className="w-4 h-4 stroke-[1.5]" />
              </button>

              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white text-[#0F1B2D] hover:bg-[#FAF8F3] hover:border-[#C9A227] font-medium text-sm border border-[#E8E4D9] shadow-subtle transition-colors flex items-center justify-center gap-2"
              >
                <span>See the curriculum</span>
              </button>
            </div>

            {/* Trust line: Aligned to NEP 2020 experiential learning · Instructors vetted before deployment · Student data stays offline by design */}
            <div className="mt-10 pt-6 border-t border-[#E8E4D9] w-full flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#5C6470] font-mono uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                <span className="text-[#0F1B2D]">Aligned to NEP 2020 experiential learning</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F1B2D]" />
                <span>Instructors vetted before deployment</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F1B2D]" />
                <span>Student data stays offline by design</span>
              </div>
            </div>

          </div>

          {/* Right Column: Existing Interactive Robot Workbench */}
          <div className="lg:col-span-6 w-full flex items-center justify-center">
            <InteractiveRobotShowcase onBookClick={onBookDemoClick} />
          </div>

        </div>
      </div>
    </section>
  );
}
