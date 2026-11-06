import React from 'react';
import content from '../../content/content.json';
import FadeIn from '../common/FadeIn';

const STEP_COLORS = [
  {
    bg: 'bg-[#533788]/10 text-[#533788] border-[#533788]/20',
    borderTop: 'border-t-4 border-t-[#533788]',
  },
  {
    bg: 'bg-[#2576BC]/10 text-[#2576BC] border-[#2576BC]/20',
    borderTop: 'border-t-4 border-t-[#2576BC]',
  },
  {
    bg: 'bg-[#1D9D53]/10 text-[#1D9D53] border-[#1D9D53]/20',
    borderTop: 'border-t-4 border-t-[#1D9D53]',
  },
];

export default function HowWeWorkSection() {
  const { label, steps, callout } = content.howWeWork;

  return (
    <section id="how-it-works" className="bg-slate-50 py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 text-left">
          <FadeIn delay={0}>
            <div className="text-xs font-mono uppercase tracking-wider text-[#533788] font-bold mb-3">
              {label}
            </div>
          </FadeIn>
          
          <FadeIn delay={80}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              A complete programme, with nothing added to your{' '}
              <span className="bg-gradient-to-r from-[#533788] via-[#2576BC] to-[#1D9D53] bg-clip-text text-transparent">
                teachers' workload.
              </span>
            </h2>
          </FadeIn>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {steps.map((step, idx) => {
            const stepTheme = STEP_COLORS[idx % STEP_COLORS.length];

            return (
              <FadeIn key={step.number} delay={idx * 80}>
                <div className={`bg-white h-full p-8 rounded-3xl border border-slate-200 ${stepTheme.borderTop} shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between text-left`}>
                  <div>
                    <div className={`w-11 h-11 rounded-2xl ${stepTheme.bg} font-bold flex items-center justify-center font-mono text-sm border mb-5 shadow-xs`}>
                      {step.number}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Callout Box */}
        <FadeIn delay={240}>
          <div className="rounded-3xl border border-[#1D9D53]/30 border-l-4 border-l-[#1D9D53] bg-[#1D9D53]/5 p-8 sm:p-10 text-left max-w-4xl shadow-xs">
            <div className="text-xs font-mono uppercase tracking-wider text-[#1D9D53] font-bold mb-2">
              {callout.label}
            </div>
            <p className="text-lg sm:text-xl text-slate-800 leading-relaxed font-medium">
              "{callout.text}"
            </p>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
