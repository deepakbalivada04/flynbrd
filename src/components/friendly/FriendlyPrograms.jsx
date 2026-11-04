import React from 'react';
import { Bot, Compass, Eye, CheckCircle2, ArrowRight } from 'lucide-react';

export default function FriendlyPrograms({ onSelectTier }) {
  const tiers = [
    {
      id: '01',
      title: 'Motors & Circuits',
      level: 'Level 1: Elementary (Grades 3–5)',
      badge: 'Foundation',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      accentColor: 'border-t-4 border-t-amber-500',
      buttonBg: 'bg-amber-500 hover:bg-amber-600',
      icon: <Bot className="w-6 h-6 text-amber-600" />,
      tagline: 'Physical snap-circuit logic, motor torque, and autonomous obstacle navigation.',
      modules: [
        'DC geared motors, torque, and pulley ratios',
        'Solderless snap-circuit logic & polarity',
        'Visual block coding with loops & conditionals',
        'Autonomous dual-motor rover chassis build',
      ],
      hardware: 'Snap-circuit tiles, motor chassis, safe enclosed rechargeable batteries',
    },
    {
      id: '02',
      title: 'AI Logic & Sonar',
      level: 'Level 2: Middle School (Grades 6–8)',
      badge: 'Intermediate',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      accentColor: 'border-t-4 border-t-indigo-600',
      buttonBg: 'bg-indigo-600 hover:bg-indigo-700',
      icon: <Compass className="w-6 h-6 text-indigo-600" />,
      tagline: 'Ultrasonic distance calculation, telemetry, and automated obstacle evasion algorithms.',
      modules: [
        'Ultrasonic sonar distance calculation & echo telemetry',
        'Conditional branching & automated obstacle evasion',
        'Infrared boundary tracking line-follower logic',
        'Block-to-Python syntax transition & troubleshooting',
      ],
      hardware: 'Arduino-compatible microcontroller, sonar pingers, servo steering units',
    },
    {
      id: '03',
      title: 'Vision & Edge AI',
      level: 'Level 3: High School (Grades 9–12)',
      badge: 'Advanced',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      accentColor: 'border-t-4 border-t-emerald-600',
      buttonBg: 'bg-emerald-600 hover:bg-emerald-700',
      icon: <Eye className="w-6 h-6 text-emerald-600" />,
      tagline: 'Computer vision, real-time object tracking, neural models, and robotic arm kinematics.',
      modules: [
        'Pure Python scripting for real-time robotics',
        'OpenCV object classification & facial tracking',
        'Simultaneous Localization & Mapping (SLAM)',
        'Neural network edge model deployment & kinematics',
      ],
      hardware: 'Jetson/Pi edge AI neural boards, HD camera modules, 4-DOF robotic arms',
    },
  ];

  return (
    <section id="programs" className="py-20 sm:py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
            Standards-Aligned Pathways
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 mt-4 tracking-tight">
            Our 3-Level Robotics Curricula
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Scaffolded for developmental milestones from elementary logic to advanced high-school edge computing.
          </p>
        </div>

        {/* 3 Program Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`rounded-3xl bg-slate-50/70 border border-slate-200 p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-all ${tier.accentColor}`}
            >
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                    {tier.icon}
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${tier.badgeColor}`}>
                    {tier.badge}
                  </span>
                </div>

                <div className="text-xs font-semibold text-slate-500 mb-1">
                  {tier.level}
                </div>
                <h3 className="text-2xl font-bold font-display text-slate-900 mb-2">
                  {tier.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {tier.tagline}
                </p>

                {/* Modules list */}
                <div className="space-y-2.5 mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    What Students Learn:
                  </span>
                  {tier.modules.map((mod, mIdx) => (
                    <div key={mIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{mod}</span>
                    </div>
                  ))}
                </div>

                {/* Hardware */}
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 text-xs text-slate-600 mb-6">
                  <span className="font-bold text-slate-800 block mb-0.5">Kits Provided:</span>
                  <span>{tier.hardware}</span>
                </div>
              </div>

              {/* Book button */}
              <button
                onClick={() => onSelectTier(tier.title)}
                className={`w-full py-3 rounded-full text-white font-semibold text-sm flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 active:translate-y-0 shadow-md ${tier.buttonBg}`}
              >
                <span>Select {tier.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

