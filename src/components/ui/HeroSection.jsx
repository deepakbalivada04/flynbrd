import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * Stripped-down Hero Section:
 * - 100% transparent, zero background boxes or borders.
 * - Center 50vw completely clear for the falling 3D character.
 * - Scaled-down Apple-style minimalist typography.
 * - Pushed tightly to the left edge.
 */
export default function HeroSection({ onBookDemoClick }) {
  return (
    <section
      id="section-1"
      className="relative min-h-screen w-full flex items-center px-6 sm:px-12 lg:px-20 pointer-events-none"
    >
      {/* Left-aligned text block: max-w-sm to ensure center 50vw+ stays 100% empty */}
      <div className="w-full max-w-md flex flex-col items-start space-y-4 pointer-events-auto">
        
        {/* Subtle Era Eyebrow */}
        <span className="text-[11px] font-mono tracking-widest uppercase text-amber-500/90 font-medium">
          Era I · The Primal Spark
        </span>

        {/* Scaled-Down Elegant Headline (shrunk by >50%, minimalist Apple style) */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white leading-tight font-sans">
          Bring the Future to Your Classrooms with{' '}
          <span className="text-amber-400 font-normal">
            Hands-On AI & Robotics.
          </span>
        </h1>

        {/* Short 2-line Paragraph */}
        <p className="text-xs sm:text-sm text-stone-300 font-normal leading-relaxed max-w-sm">
          Interactive, curriculum-aligned technology workshops designed specifically for middle and high schools.
        </p>

        {/* Single Sleek Minimalist CTA Button */}
        <div className="pt-2">
          <button
            onClick={onBookDemoClick}
            className="px-5 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-md hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Request a School Demo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
