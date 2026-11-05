import React from 'react';
import { PackageCheck, UserCheck, BookOpen, ShieldCheck } from 'lucide-react';

export default function FriendlyWhyUs() {
  const benefits = [
    {
      num: '01',
      title: 'No equipment purchase',
      desc: 'We bring the robotics kits, laptops, and consumables. Nothing for your school to buy or maintain.',
      icon: <PackageCheck className="w-5 h-5 stroke-[1.5] text-[#0F1B2D]" />,
    },
    {
      num: '02',
      title: 'No teacher training needed',
      desc: 'Our instructors run every session. Your teachers can observe or join in.',
      icon: <UserCheck className="w-5 h-5 stroke-[1.5] text-[#0F1B2D]" />,
    },
    {
      num: '03',
      title: 'Built to the national framework',
      desc: "Activities follow NEP 2020's emphasis on experiential and scientific learning.",
      icon: <BookOpen className="w-5 h-5 stroke-[1.5] text-[#0F1B2D]" />,
    },
    {
      num: '04',
      title: 'Safe by design',
      desc: 'Instructors are verified before they visit. Student data is kept offline. We will share our full safeguarding policy on request.',
      icon: <ShieldCheck className="w-5 h-5 stroke-[1.5] text-[#0F1B2D]" />,
    },
  ];

  return (
    <section id="why-us" className="py-20 sm:py-24 bg-[#FAF8F3] border-b border-[#E8E4D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-14 text-left">
          <span className="font-mono uppercase text-xs tracking-widest text-[#C9A227] block mb-3">
            [ WHY SCHOOLS CHOOSE US ]
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-[#0F1B2D]">
            A full programme, delivered by us, <span className="font-serif italic text-[#C9A227]">with nothing added</span> to your workload.
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="p-7 sm:p-8 rounded-2xl bg-white/80 border border-[#E8E4D9] shadow-subtle flex items-start gap-5"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FAF8F3] border border-[#E8E4D9] flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div>
                <div className="font-mono text-xs uppercase tracking-wider text-[#C9A227] mb-1 font-semibold">
                  {item.num}
                </div>
                <h3 className="text-xl font-serif font-normal text-[#0F1B2D] mb-2">
                  {item.title}
                </h3>
                <p className="text-[17px] text-[#5C6470] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
