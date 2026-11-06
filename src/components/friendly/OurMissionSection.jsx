import React from 'react';
import content from '../../content/content.json';
import FadeIn from '../common/FadeIn';

export default function OurMissionSection() {
  const { label, body, pullQuote } = content.whyWeExist;

  return (
    <section className="bg-white py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
      <div className="max-w-4xl mx-auto text-left">
        
        <FadeIn delay={0}>
          <div className="text-xs font-mono uppercase tracking-wider mb-3 text-[#EE7819] font-bold">
            {label}
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-8 leading-tight">
            Technology is changing faster than{' '}
            <span className="bg-gradient-to-r from-[#EE7819] to-[#D4252A] bg-clip-text text-transparent">
              our classrooms.
            </span>
          </h2>
        </FadeIn>

        <FadeIn delay={160}>
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-10">
            {body}
          </p>
        </FadeIn>

        <FadeIn delay={240}>
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#EE7819]/5 via-[#D4252A]/5 to-transparent border-l-4 border-l-[#EE7819] border border-[#EE7819]/20 shadow-sm">
            <blockquote className="text-xl sm:text-2xl text-slate-800 font-medium leading-snug">
              “{pullQuote}”
            </blockquote>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
