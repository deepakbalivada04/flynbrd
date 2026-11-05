import React from 'react';
import { Bot, Compass, Eye, CheckCircle2, ArrowRight } from 'lucide-react';

export default function FriendlyPrograms({ onSelectTier }) {
  const tiers = [
    {
      id: '01',
      title: 'Motors and Circuits',
      level: 'Level 1 (Grades 3–5)',
      desc: 'Students build a motorised rover and learn how circuits and motors work through hands-on builds.',
      icon: <Bot className="w-5 h-5 stroke-[1.5] text-[#0F1B2D]" />,
    },
    {
      id: '02',
      title: 'AI Logic and Sonar',
      level: 'Level 2 (Grades 6–8)',
      desc: 'Students program a robot to detect and avoid obstacles, and move from block coding into Python.',
      icon: <Compass className="w-5 h-5 stroke-[1.5] text-[#0F1B2D]" />,
    },
    {
      id: '03',
      title: 'Vision and Edge AI',
      level: 'Level 3 (Grades 9–12)',
      desc: 'Students train and run computer vision on real hardware, and work with robotic arms and object tracking.',
      icon: <Eye className="w-5 h-5 stroke-[1.5] text-[#0F1B2D]" />,
    },
  ];

  return (
    <section id="programs" className="py-20 sm:py-24 bg-[#FAF8F3] border-b border-[#E8E4D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-2xl mb-14 text-left">
          <span className="font-mono uppercase text-xs tracking-widest text-[#C9A227] block mb-3">
            [ CURRICULUM LEVELS ]
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-[#0F1B2D]">
            Curriculum <span className="font-serif italic text-[#C9A227]">Levels</span>
          </h2>
          <p className="mt-4 text-[17px] text-[#5C6470] leading-relaxed">
            Matched to developmental stages from elementary physical builds to high-school machine intelligence.
          </p>
        </div>

        {/* 3 Program Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className="p-7 sm:p-8 rounded-2xl bg-white/80 border border-[#E8E4D9] shadow-subtle hover:shadow-card transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF8F3] border border-[#E8E4D9] flex items-center justify-center">
                    {tier.icon}
                  </div>
                  <span className="font-mono text-xs uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FAF8F3] border border-[#E8E4D9] text-[#0F1B2D]">
                    {tier.level}
                  </span>
                </div>

                <h3 className="text-2xl font-serif font-normal text-[#0F1B2D] mb-3 tracking-tight">
                  {tier.title}
                </h3>
                
                <p className="text-[17px] text-[#5C6470] leading-relaxed mb-6">
                  {tier.desc}
                </p>
              </div>

              {/* Book button */}
              <button
                onClick={() => onSelectTier(tier.title)}
                className="w-full py-3 rounded-full bg-[#0F1B2D] text-[#FAF8F3] hover:bg-[#C9A227] hover:text-[#0F1B2D] font-medium text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <span>Select {tier.title}</span>
                <ArrowRight className="w-4 h-4 stroke-[1.5]" />
              </button>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
