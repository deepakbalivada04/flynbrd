import React from 'react';
import content from '../../content/content.json';
import FadeIn from '../common/FadeIn';

export default function HowWeWorkSection() {
  const { label, steps, callout } = content.howWeWork;

  return (
    <section id="how-it-works" className="bg-[#F6F0E4] py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#DCCFB6]">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 text-left">
          <FadeIn delay={0}>
            <div className="label-mono mb-3 text-[#1F4236]">
              {label}
            </div>
          </FadeIn>
          
          <FadeIn delay={80}>
            <h2 className="heading-editorial text-3xl sm:text-4xl md:text-5xl text-[#2A2320]">
              A complete programme, with nothing added to your{' '}
              <em className="italic text-[#C98A22] font-serif">teachers' workload.</em>
            </h2>
          </FadeIn>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {steps.map((step, idx) => (
            <FadeIn key={step.number} delay={idx * 80}>
              <div className="card-quiet h-full p-8 flex flex-col justify-between text-left">
                <div>
                  <div className="label-mono text-sm text-[#1F4236] font-medium mb-4">
                    Step {step.number}
                  </div>
                  <h3 className="heading-editorial text-2xl text-[#2A2320] mb-3">
                    {step.title}
                  </h3>
                  <p className="body-editorial text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Callout Box */}
        <FadeIn delay={240}>
          <div className="rounded-xl border border-[#DCCFB6] border-l-4 border-l-[#C98A22] bg-[#EFE6D3] p-8 sm:p-10 text-left max-w-4xl shadow-soft">
            <div className="label-mono mb-2 text-[#1F4236]">
              {callout.label}
            </div>
            <p className="font-serif text-xl sm:text-2xl text-[#2A2320] leading-relaxed">
              "{callout.text}"
            </p>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}