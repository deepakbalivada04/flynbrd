import React from 'react';
import { PackageCheck, UserCheck, BookOpen, ShieldCheck } from 'lucide-react';

export default function FriendlyWhyUs() {
  const benefits = [
    {
      title: '100% Turnkey Delivery',
      desc: 'No district equipment purchasing or maintenance required. We bring individual robotics trays, offline pre-configured laptops, and all consumable parts.',
      icon: <PackageCheck className="w-6 h-6 text-indigo-600" />,
      tag: 'Zero Hardware Cost',
    },
    {
      title: 'Zero Teacher Burden',
      desc: 'Our certified robotics engineers and STEM educators lead setup, direct classroom instruction, and teardown. Your teachers are free to observe or participate.',
      icon: <UserCheck className="w-6 h-6 text-indigo-600" />,
      tag: 'Hands-off for Faculty',
    },
    {
      title: 'NGSS & CSTA Aligned',
      desc: 'Every lesson map connects directly to Next Generation Science Standards (NGSS) engineering criteria and state computer science standards.',
      icon: <BookOpen className="w-6 h-6 text-indigo-600" />,
      tag: 'Curriculum Matched',
    },
    {
      title: 'District Vetted & Safe',
      desc: 'Livescan background-checked instructors, comprehensive institutional liability insurance, and 100% student privacy (FERPA/COPPA) compliance.',
      icon: <ShieldCheck className="w-6 h-6 text-indigo-600" />,
      tag: 'Full Compliance',
    },
  ];

  return (
    <section id="why-us" className="py-20 sm:py-24 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
            Institutional Peace of Mind
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 mt-4 tracking-tight">
            Why Schools & Districts Love Us
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Designed specifically for school principals, STEM coordinators, and district administrators who want premium results without headaches.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex items-start gap-5"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div>
                <div className="inline-block text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full mb-2">
                  {item.tag}
                </div>
                <h3 className="text-xl font-bold font-display text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
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

