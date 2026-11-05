import React from 'react';
import { BookOpen, Terminal } from 'lucide-react';

export default function HeroBenefitsStrip() {
  return (
    <section className="border-y border-[#E8E4D9] bg-[#FAF8F3] py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center">

          {/* Benefit 1 */}
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/70 border border-[#E8E4D9] shadow-subtle">
            <div className="w-9 h-9 rounded-xl bg-[#FAF8F3] border border-[#E8E4D9] flex items-center justify-center shrink-0 text-[#0F1B2D]">
              <BookOpen className="w-4 h-4 stroke-[1.5]" />
            </div>
            <div className="text-[15px] text-[#0F1B2D] font-normal leading-snug">
              Video lessons and two guided projects for every enrolled student, available in our learning system.
            </div>
          </div>

          {/* Benefit 2 */}
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/70 border border-[#E8E4D9] shadow-subtle">
            <div className="w-9 h-9 rounded-xl bg-[#FAF8F3] border border-[#E8E4D9] flex items-center justify-center shrink-0 text-[#0F1B2D]">
              <Terminal className="w-4 h-4 stroke-[1.5]" />
            </div>
            <div className="text-[15px] text-[#0F1B2D] font-normal leading-snug">
              A free sandbox to try our AI tools before you commit to anything.
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
