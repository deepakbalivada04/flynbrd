import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * Stripped-down Benefits Section:
 * - 100% transparent, zero card containers or bounding boxes.
 * - Center 50vw completely empty.
 * - Sleek minimalist typography aligned flush right on desktop.
 */
export default function BenefitsSection({ onBookDemoClick }) {
  const points = [
    { title: 'Zero Teacher Burden', desc: 'Our certified engineering educators manage the entire session from setup to teardown.' },
    { title: 'All Equipment Provided', desc: 'We supply turnkey robotics kits, pre-configured software, and testing arenas.' },
    { title: 'Future-Ready & Aligned', desc: 'Directly mapped to state STEM mandates, NGSS science benchmarks, and CSTA standards.' },
    { title: 'Engineering Pedigree', desc: 'Curriculum architected by MIT and Stanford robotics specialists.' },
  ];

  return (
    <section
      id="section-3"
      className="relative min-h-screen w-full flex items-center px-6 sm:px-12 lg:px-20 pointer-events-none"
    >
      {/* Aligned flush right on large screens: center 50vw+ stays 100% empty */}
      <div className="w-full max-w-md lg:ml-auto flex flex-col items-start space-y-4 pointer-events-auto text-left">
        
        {/* Subtle Era Eyebrow */}
        <span className="text-[11px] font-mono tracking-widest uppercase text-sky-400 font-medium">
          Era III · The Modern Developer
        </span>

        {/* Scaled-Down Minimalist Headline */}
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white leading-tight font-sans">
          Advanced Workshops:{' '}
          <span className="text-sky-400 font-normal">AI & Code</span>
        </h2>

        {/* Short 2-line description */}
        <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed max-w-sm">
          Turnkey engineering immersion designed to solve real school administrative constraints.
        </p>

        {/* Floating clean text list without cards or borders */}
        <div className="space-y-3 pt-2 w-full">
          {points.map((p, idx) => (
            <div key={idx} className="flex flex-col space-y-0.5">
              <span className="text-xs sm:text-sm text-stone-100 font-medium">
                {p.title}
              </span>
              <p className="text-[11px] text-slate-400">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Sleek CTA */}
        <div className="pt-2">
          <button
            onClick={onBookDemoClick}
            className="text-xs text-sky-400 hover:text-sky-300 font-medium transition-colors flex items-center gap-1.5"
          >
            <span>Inquire for Your District</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
