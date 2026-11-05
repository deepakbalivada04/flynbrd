import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

/**
 * TheProblemSection
 * 
 * THE PROBLEM (new section, above "What We Teach")
 * Headline: NEP 2020 asks schools to teach AI. Most cannot yet.
 * Body: Schools are expected to offer experiential, future-ready learning. 
 * Most do not have a robotics lab, a teacher trained in Python or machine learning, 
 * or a way to get students away from screens and into building. Flyinbird removes all three gaps.
 */
export default function TheProblemSection() {
  const gaps = [
    {
      problem: 'No dedicated robotics lab or hardware trays',
      solution: 'We bring complete hardware kits directly to your campus.',
    },
    {
      problem: 'No faculty trained in Python or machine learning',
      solution: 'Our verified instructors lead every session end-to-end.',
    },
    {
      problem: 'Passive screen-time instead of active physical building',
      solution: 'Every student builds and debugs on their own individual tray.',
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-[#FAF8F3] border-b border-[#E8E4D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl text-left mb-12">
          <span className="font-mono uppercase text-xs tracking-widest text-[#C9A227] block mb-3">
            [ THE CORE CHALLENGE ]
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-[#0F1B2D]">
            NEP 2020 asks schools to teach AI. <span className="font-serif italic text-[#C9A227]">Most cannot yet.</span>
          </h2>

          <p className="mt-5 text-[17px] text-[#5C6470] leading-relaxed">
            Schools are expected to offer experiential, future-ready learning. Most do not have a robotics lab, a teacher trained in Python or machine learning, or a way to get students away from screens and into building. Flyinbird removes all three gaps.
          </p>
        </div>

        {/* 3 Removed Gaps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gaps.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl bg-white/80 border border-[#E8E4D9] shadow-subtle flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-xs font-semibold text-[#0F1B2D]">
                    GAP 0{idx + 1}
                  </span>
                </div>
                
                <div className="text-[15px] font-medium text-[#0F1B2D] mb-3">
                  {item.problem}
                </div>
              </div>

              <div className="pt-3 border-t border-[#E8E4D9]/60 flex items-start gap-2 text-sm text-[#5C6470]">
                <CheckCircle2 className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5 stroke-[1.5]" />
                <span className="text-[#0F1B2D] font-medium">{item.solution}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

