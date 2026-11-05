import React from 'react';
import { Code2, BrainCircuit, Rocket, Box } from 'lucide-react';

export default function WhatWeTeachSection() {
  const items = [
    {
      num: '01',
      title: 'Prompting and Code',
      desc: 'Students learn to write working code snippets and structured prompts, and to check whether the answer is right.',
      outcome: 'A portfolio of small, working programs.',
      icon: <Code2 className="w-5 h-5 stroke-[1.5] text-[#0F1B2D]" />,
    },
    {
      num: '02',
      title: 'How AI Thinks',
      desc: 'Students see how a language model chooses its next word and learn the core ideas behind neural networks, shown on live examples, not slides.',
      outcome: 'Students can explain how AI makes decisions, not just use it.',
      icon: <BrainCircuit className="w-5 h-5 stroke-[1.5] text-[#0F1B2D]" />,
    },
    {
      num: '03',
      title: 'Space Robotics and Hardware',
      desc: 'Sensors, circuits, and rover builds based on the problems space engineers solve: power, navigation, and sensing with limited resources.',
      outcome: 'A working rover students designed and debugged themselves.',
      icon: <Rocket className="w-5 h-5 stroke-[1.5] text-[#0F1B2D]" />,
    },
    {
      num: '04',
      title: 'Robot Kits',
      desc: 'Hands-on assembly and programming of our main robot kit and additional kits, matched to grade level.',
      outcome: 'A robot that moves, senses, and responds to its environment.',
      icon: <Box className="w-5 h-5 stroke-[1.5] text-[#0F1B2D]" />,
    },
  ];

  return (
    <section id="what-we-teach" className="py-20 sm:py-24 bg-[#FAF8F3] border-b border-[#E8E4D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14 text-left">
          <span className="font-mono uppercase text-xs tracking-widest text-[#C9A227] block mb-3">
            [ WHAT WE TEACH ]
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-[#0F1B2D]">
            What We <span className="font-serif italic text-[#C9A227]">Teach</span>
          </h2>
          <p className="mt-4 text-[17px] text-[#5C6470] leading-relaxed">
            Four tracks, each ending in something a student can show.
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
          {items.map((item, index) => (
            <div
              key={index}
              className="p-7 sm:p-8 rounded-2xl bg-white/80 border border-[#E8E4D9] shadow-subtle hover:shadow-card transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-xs tracking-wider text-[#C9A227] font-semibold">
                    {item.num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#FAF8F3] border border-[#E8E4D9] flex items-center justify-center">
                    {item.icon}
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-normal text-[#0F1B2D] tracking-tight mb-2">
                  {item.title}
                </h3>
                
                <p className="text-[17px] text-[#5C6470] leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8E4D9]/60">
                <span className="font-mono text-xs uppercase tracking-wider text-[#0F1B2D] font-semibold block mb-1">
                  Outcome:
                </span>
                <p className="text-sm text-[#0F1B2D] font-medium">
                  {item.outcome}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
