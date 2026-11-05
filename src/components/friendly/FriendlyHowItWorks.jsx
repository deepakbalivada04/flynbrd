import React from 'react';
import { Calendar, Truck, Sparkles } from 'lucide-react';

export default function FriendlyHowItWorks({ onBookClick }) {
  const steps = [
    {
      step: '01',
      title: 'Choose a format',
      description: 'Half-day exploration, full-day intensive, or a multi-week residency. We set the schedule around your timetable.',
      icon: <Calendar className="w-5 h-5 stroke-[1.5] text-[#0F1B2D]" />,
    },
    {
      step: '02',
      title: 'We bring the lab',
      description: 'Our instructor arrives with the hardware, the curriculum, and the setup. Your staff only needs to confirm the room.',
      icon: <Truck className="w-5 h-5 stroke-[1.5] text-[#0F1B2D]" />,
    },
    {
      step: '03',
      title: 'Students build and present',
      description: 'Each student completes a working robot or program. Your faculty can observe, take part, or assess the results.',
      icon: <Sparkles className="w-5 h-5 stroke-[1.5] text-[#C9A227]" />,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-24 bg-[#FAF8F3] border-b border-[#E8E4D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-2xl mb-14 text-left">
          <span className="font-mono uppercase text-xs tracking-widest text-[#C9A227] block mb-3">
            [ HOW IT WORKS ]
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-[#0F1B2D]">
            Three steps. <span className="font-serif italic text-[#C9A227]">No teacher preparation.</span>
          </h2>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {steps.map((item, index) => (
            <div
              key={index}
              className="p-7 sm:p-8 rounded-2xl bg-white/80 border border-[#E8E4D9] shadow-subtle flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF8F3] border border-[#E8E4D9] flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="font-mono text-sm tracking-wider text-[#C9A227] font-semibold">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-normal text-[#0F1B2D] tracking-tight mb-2.5">
                  {item.title}
                </h3>
                
                <p className="text-[17px] text-[#5C6470] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8E4D9]/60 flex items-center gap-2 text-xs font-mono text-[#5C6470] uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F1B2D]" />
                <span>Zero Faculty Burden</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
