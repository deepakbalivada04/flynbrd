import React from 'react';
import { motion } from 'framer-motion';
import GlassPedalButton from '../ui/GlassPedalButton';

export default function WorkshopsSection({ onSelectTier }) {
  const tiers = [
    {
      num: '01',
      badge: 'BEGINNER',
      grades: 'GRADES 3–5',
      title: 'Motors & Circuits',
      description: 'Physical intuition and fundamental mechanical logic through tactile engineering.',
      curriculum: [
        'DC geared motors, torque, and pulley ratios',
        'Solderless snap-circuit board fundamentals',
        'Visual block coding with sequential loops',
        'Tactile obstacle-avoiding rover build',
      ],
      hardware: 'Snap-circuit trays, gear chassis, safe battery hubs',
    },
    {
      num: '02',
      badge: 'INTERMEDIATE',
      grades: 'GRADES 6–8',
      title: 'AI Logic & Sonar',
      description: 'Algorithmic decision trees, sensor feedback loops, and automated telemetry.',
      curriculum: [
        'Ultrasonic sonar distance calculation',
        'Conditional branching and error correction',
        'Infrared boundary tracking sensors',
        'Hybrid visual block-to-Python syntax',
      ],
      hardware: 'Arduino-compatible hubs, ultrasonic pingers, servo steering',
    },
    {
      num: '03',
      badge: 'ADVANCED',
      grades: 'GRADES 9–12',
      title: 'Python, Vision & SLAM',
      description: 'Production-grade computer vision, edge inferencing, and autonomous robotics.',
      curriculum: [
        'Pure Python syntax for robotics systems',
        'OpenCV object classification & facial tracking',
        'Simultaneous Localization & Mapping (SLAM)',
        'Neural network edge model deployment',
      ],
      hardware: 'Edge AI compute boards (Jetson/Pi), HD vision sensors, 4-DOF arms',
    },
  ];

  return (
    <section id="workshops-section" className="relative w-full border-b border-white/10 bg-black">
      
      {/* Section Header */}
      <div className="px-6 sm:px-12 lg:px-16 py-12 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-mono tracking-widest uppercase text-stone-400 block mb-2">
            [ 02 // WORKSHOP ARCHITECTURE ]
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-stone-100 uppercase">
            The Core Workshops
          </h2>
        </div>
        <div className="text-xs font-mono text-stone-400 max-w-sm">
          Scaffolded 3-tier curriculum framework designed to scale across complete school districts.
        </div>
      </div>

      {/* 3-Column CSS Grid with visible 1px borders */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
        {tiers.map((tier, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 sm:p-10 lg:p-12 flex flex-col justify-between group hover:bg-white/[0.02] transition-colors"
          >
            <div>
              {/* Top Cell Meta */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs font-mono">
                <span className="text-stone-400 tracking-wider">
                  [{tier.badge}]
                </span>
                <span className="text-stone-300">
                  {tier.grades}
                </span>
              </div>

              {/* Large Monospace Number */}
              <div className="my-8">
                <span className="text-6xl sm:text-7xl font-mono font-light tracking-tighter text-stone-300 group-hover:text-amber-200 transition-colors">
                  {tier.num}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl sm:text-2xl font-display font-semibold text-stone-100 uppercase tracking-tight mb-3">
                {tier.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 font-sans leading-relaxed mb-8">
                {tier.description}
              </p>

              {/* Minimal Curriculum Points */}
              <div className="space-y-3 pt-6 border-t border-white/10 text-xs font-mono">
                <span className="text-[10px] tracking-widest uppercase text-stone-400 block mb-3">
                  // CORE MODULES
                </span>
                {tier.curriculum.map((item, cIdx) => (
                  <div key={cIdx} className="flex items-start gap-2.5 text-stone-300">
                    <span className="text-amber-200 select-none">+</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Hardware Spec */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <span className="text-[10px] font-mono tracking-widest uppercase text-stone-400 block mb-1">
                  // KIT HARDWARE INCLUDED
                </span>
                <p className="text-xs text-stone-400 font-mono">
                  {tier.hardware}
                </p>
              </div>
            </div>

            {/* Bottom Button */}
            <div className="pt-10">
              <GlassPedalButton
                onClick={() => onSelectTier(tier.title)}
                className="w-full"
              >
                Inquire Tier {tier.num}
              </GlassPedalButton>
            </div>

          </motion.div>
        ))}
      </div>

    </section>
  );
}

