import React from 'react';
import { BatteryCharging, Radio, Eye } from 'lucide-react';

export default function FriendlyHardware() {
  const hardwareItems = [
    {
      title: 'Elementary',
      grades: 'Grades 3–5',
      desc: 'Snap-circuit parts, a rechargeable 6V power pack, and a geared chassis.',
      icon: <BatteryCharging className="w-5 h-5 stroke-[1.5] text-[#0F1B2D]" />,
    },
    {
      title: 'Middle School',
      grades: 'Grades 6–8',
      desc: 'Sonar sensors, infrared line sensors, and servo steering.',
      icon: <Radio className="w-5 h-5 stroke-[1.5] text-[#0F1B2D]" />,
    },
    {
      title: 'High School',
      grades: 'Grades 9–12',
      desc: 'An edge AI board, an HD camera, and a 4-degree-of-freedom robotic arm.',
      icon: <Eye className="w-5 h-5 stroke-[1.5] text-[#0F1B2D]" />,
    },
  ];

  return (
    <section id="hardware" className="py-20 sm:py-24 bg-[#FAF8F3] border-b border-[#E8E4D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-14 text-left">
          <span className="font-mono uppercase text-xs tracking-widest text-[#C9A227] block mb-3">
            [ HARDWARE KITS ]
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-[#0F1B2D]">
            A kit for every grade, <span className="font-serif italic text-[#C9A227]">with a tray for every student.</span>
          </h2>
          <p className="mt-4 text-[17px] text-[#5C6470] leading-relaxed">
            Each student works on their own tray, so every child builds and tests their own robot.
          </p>
        </div>

        {/* 3 Hardware Trays */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7">
          {hardwareItems.map((item, index) => (
            <div
              key={index}
              className="p-7 sm:p-8 rounded-2xl bg-white/80 border border-[#E8E4D9] shadow-subtle flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#FAF8F3] border border-[#E8E4D9] flex items-center justify-center mb-5">
                  {item.icon}
                </div>
                
                <div className="font-mono text-xs text-[#C9A227] uppercase tracking-wider mb-1">
                  {item.grades}
                </div>
                
                <h3 className="text-xl sm:text-2xl font-serif font-normal text-[#0F1B2D] mb-3 tracking-tight">
                  {item.title}
                </h3>
                
                <p className="text-[17px] text-[#5C6470] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#E8E4D9]/60 flex items-center justify-between text-xs font-mono text-[#5C6470] uppercase tracking-wider">
                <span>Individual student tray</span>
                <span className="text-[#0F1B2D] font-bold">100% Hands-On</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
