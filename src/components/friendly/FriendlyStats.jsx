import React from 'react';
import { Users, School, CheckCircle, Star } from 'lucide-react';

export default function FriendlyStats() {
  const stats = [
    {
      number: '18,000+',
      label: 'Students Inspired',
      sub: 'Across hands-on school residencies & workshops',
      icon: <Users className="w-5 h-5 text-indigo-600" />,
    },
    {
      number: '45+',
      label: 'Partner Schools',
      sub: 'Elementary, middle, and high schools',
      icon: <School className="w-5 h-5 text-indigo-600" />,
    },
    {
      number: '100%',
      label: 'Turnkey Delivery',
      sub: 'We supply all robotics kits, tablets & instructors',
      icon: <CheckCircle className="w-5 h-5 text-emerald-600" />,
    },
    {
      number: '4.9 / 5',
      label: 'Teacher Rating',
      sub: 'Educators praise the zero prep & high engagement',
      icon: <Star className="w-5 h-5 text-amber-500" />,
    },
  ];

  return (
    <section className="py-12 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-start p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/70"
            >
              <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center mb-3 shadow-sm">
                {item.icon}
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
                {item.number}
              </div>
              <div className="text-sm font-semibold text-slate-800 mt-1">
                {item.label}
              </div>
              <div className="text-xs text-slate-500 mt-1 leading-relaxed">
                {item.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

