import React from 'react';
import { Calendar, Truck, Sparkles, ArrowRight } from 'lucide-react';

export default function FriendlyHowItWorks({ onBookClick }) {
  const steps = [
    {
      step: '01',
      title: 'Pick Your Grades & Dates',
      description: 'Choose your desired workshop format: half-day STEM exploration, full-day intensive, or multi-week residency. We handle all logistics.',
      icon: <Calendar className="w-6 h-6 text-indigo-600" />,
    },
    {
      step: '02',
      title: 'We Bring All Gear & Instructors',
      description: 'No requisitions or teacher prep required. Our certified STEM engineers arrive with all hardware kits, safe battery hubs, and tablets.',
      icon: <Truck className="w-6 h-6 text-indigo-600" />,
    },
    {
      step: '03',
      title: 'Students Build, Code & Learn',
      description: 'Every student actively builds physical robots and programs real AI logic. Your faculty can observe, participate, or evaluate outcomes.',
      icon: <Sparkles className="w-6 h-6 text-indigo-600" />,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 mt-4 tracking-tight">
            How Flyinbird Works in Your School
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            We eliminate all logistical hurdles so your campus can deliver high-impact AI and robotics without burdening your teachers.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, index) => (
            <div
              key={index}
              className="relative p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-3xl font-extrabold font-display text-slate-200">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold font-display text-slate-900 mb-2.5">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-indigo-600">
                <span>Turnkey guarantee</span>
                <span className="ml-1">✓</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

