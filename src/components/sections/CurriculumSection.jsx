import React from 'react';
import { motion } from 'framer-motion';
import GlassPedal from '../ui/GlassPedal';

/**
 * CurriculumSection
 * 
 * Re-engineered for professional, executive proportions:
 * - Scaled-down, crystal-clear headings and typography
 * - Multi-layered frosted glass pedals on all terms, badges, and modules
 * - Vector tech diagrams for each tier (gears, sonar radar, neural network)
 */
export default function CurriculumSection({ onSelectTier }) {
  const tiers = [
    {
      id: '01',
      badge: 'TIER 01 // FOUNDATION',
      grades: 'GRADES 3–5',
      title: 'Motors & Circuits',
      tagline: 'Physical computing, gear ratios, and tactile mechanical logic.',
      diagram: (
        <svg viewBox="0 0 200 80" fill="none" className="w-full h-16 opacity-85">
          {/* Interlocking Gears Line-Art */}
          <circle cx="60" cy="40" r="22" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="60" cy="40" r="10" stroke="#facc15" strokeWidth="1.5" />
          <path d="M60 14v6M60 60v6M34 40h6M80 40h6M42 22l4 4M74 54l4 4M42 58l4-4M74 26l4-4" stroke="#ffffff" strokeWidth="1.2" />

          {/* Interlocking Secondary Gear */}
          <circle cx="102" cy="40" r="16" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="102" cy="40" r="6" fill="#facc15" />

          {/* Circuit Trace Path */}
          <path d="M125 40h35v-18h20" stroke="#facc15" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="180" cy="22" r="3" fill="#ffffff" />
        </svg>
      ),
      curriculum: [
        'DC geared motors, torque, and pulley ratios',
        'Solderless snap-circuit logic & polarity',
        'Visual block coding with loops & conditionals',
        'Tactile obstacle-avoiding autonomous rover',
      ],
      hardware: 'Snap-circuit trays, gear chassis, safe battery hubs',
    },
    {
      id: '02',
      badge: 'TIER 02 // INTERMEDIATE',
      grades: 'GRADES 6–8',
      title: 'AI Logic & Sonar',
      tagline: 'Algorithmic telemetry, distance calculation, and sensor feedback loops.',
      diagram: (
        <svg viewBox="0 0 200 80" fill="none" className="w-full h-16 opacity-85">
          {/* Sonar Sensor Transducer */}
          <rect x="30" y="24" width="48" height="32" rx="4" stroke="#ffffff" strokeWidth="1.5" fill="#12141a" />
          <circle cx="44" cy="40" r="8" stroke="#ffffff" strokeWidth="1.2" />
          <circle cx="44" cy="40" r="3" fill="#facc15" />
          <circle cx="64" cy="40" r="8" stroke="#ffffff" strokeWidth="1.2" />
          <circle cx="64" cy="40" r="3" fill="#facc15" />

          {/* Echo Wave Rays */}
          <path d="M 88 28 C 96 34, 96 46, 88 52" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="2 3" />
          <path d="M 98 22 C 110 30, 110 50, 98 58" stroke="#facc15" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M 108 16 C 124 26, 124 54, 108 64" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="4 4" />

          {/* Target Obstacle Point */}
          <rect x="150" y="30" width="20" height="20" rx="3" stroke="#facc15" strokeWidth="1.5" />
          <text x="154" y="44" fill="#ffffff" fontSize="8" fontFamily="monospace">85cm</text>
        </svg>
      ),
      curriculum: [
        'Ultrasonic sonar distance calculation & echo telemetry',
        'Conditional branching & automated obstacle evasion',
        'Infrared boundary tracking line-follower logic',
        'Hybrid visual block-to-Python syntax translation',
      ],
      hardware: 'Arduino-compatible hubs, ultrasonic pingers, servo steering',
    },
    {
      id: '03',
      badge: 'TIER 03 // ADVANCED',
      grades: 'GRADES 9–12',
      title: 'Vision & Edge AI',
      tagline: 'Computer vision, SLAM navigation, and neural network edge deployment.',
      diagram: (
        <svg viewBox="0 0 200 80" fill="none" className="w-full h-16 opacity-85">
          {/* Neural Network Matrix Nodes */}
          <g stroke="#ffffff" strokeWidth="1" opacity="0.4">
            <line x1="30" y1="25" x2="70" y2="20" />
            <line x1="30" y1="25" x2="70" y2="40" />
            <line x1="30" y1="55" x2="70" y2="40" />
            <line x1="30" y1="55" x2="70" y2="60" />
            <line x1="70" y1="20" x2="110" y2="35" />
            <line x1="70" y1="40" x2="110" y2="35" />
            <line x1="70" y1="60" x2="110" y2="45" />
          </g>

          {/* Input Layer */}
          <circle cx="30" cy="25" r="4" fill="#181a22" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="30" cy="55" r="4" fill="#181a22" stroke="#ffffff" strokeWidth="1.5" />

          {/* Hidden Tensor Nodes */}
          <circle cx="70" cy="20" r="5" fill="#facc15" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="70" cy="40" r="5" fill="#ffffff" stroke="#facc15" strokeWidth="1.5" />
          <circle cx="70" cy="60" r="5" fill="#facc15" stroke="#ffffff" strokeWidth="1.5" />

          {/* Computer Vision Bounding Box */}
          <rect x="140" y="20" width="42" height="40" rx="3" stroke="#facc15" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="144" y="32" fill="#facc15" fontSize="7" fontFamily="monospace" fontWeight="bold">AI: 99.4%</text>
          <circle cx="161" cy="45" r="6" stroke="#ffffff" strokeWidth="1" />
        </svg>
      ),
      curriculum: [
        'Pure Python syntax for real-time robotic systems',
        'OpenCV object classification & facial vector tracking',
        'Simultaneous Localization & Mapping (SLAM)',
        'Neural network edge model deployment & kinematics',
      ],
      hardware: 'Jetson/Pi edge AI neural boards, HD camera modules, 4-DOF arms',
    },
  ];

  return (
    <section
      id="curriculum-section"
      className="relative w-full border-t border-b border-white/10 bg-black text-white px-6 sm:px-12 lg:px-16 py-20 sm:py-24"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header with Frosted Glass Pedals */}
        <div className="border-b border-white/10 pb-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="mb-3">
              <GlassPedal dot={true} dotColor="bg-amber-400">
                [ 02 // CURRICULAR ARCHITECTURE ]
              </GlassPedal>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-tight text-white uppercase">
              Scaffolded AI Pathway
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-stone-300 max-w-md leading-relaxed">
            Progressive 3-tier engineering curriculum designed to scale across complete school districts. All kits, lesson rubrics, and instructors included.
          </p>
        </div>

        {/* 3-Column Geometric Card Grid with Frosted Glass Containers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="p-7 sm:p-8 rounded-2xl bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 hover:border-amber-400/40 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between group shadow-[0_12px_32px_rgba(0,0,0,0.6)]"
            >
              <div>
                {/* Card Top Meta Bar with Glass Pedals */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {tier.badge}
                  </span>
                  <GlassPedal className="text-[10px] py-1 px-2.5">
                    {tier.grades}
                  </GlassPedal>
                </div>

                {/* Vector Tech Diagram */}
                <div className="my-3 py-2 px-3 rounded-xl bg-white/[0.02] border border-white/5 group-hover:border-white/10 transition-colors">
                  {tier.diagram}
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white uppercase tracking-tight mt-3 mb-1.5">
                  {tier.title}
                </h3>
                <p className="text-xs text-stone-300 font-sans leading-relaxed mb-6">
                  {tier.tagline}
                </p>

                {/* Core Modules List */}
                <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs font-mono">
                  <span className="text-[10px] tracking-widest uppercase text-stone-400 block mb-2 font-bold">
                    // KEY WORKSHOP MODULES
                  </span>
                  {tier.curriculum.map((item, cIdx) => (
                    <div key={cIdx} className="flex items-start gap-2 text-stone-300">
                      <span className="text-amber-400 select-none font-bold">■</span>
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Hardware Spec */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-stone-400 block mb-1">
                    // INCLUDED HARDWARE TRAY
                  </span>
                  <p className="text-xs text-stone-300 font-mono">
                    {tier.hardware}
                  </p>
                </div>
              </div>

              {/* Bottom Inquire Button with Glass Pedal Styling */}
              <div className="pt-8">
                <button
                  onClick={() => onSelectTier(tier.title)}
                  className="w-full py-2.5 px-4 rounded-full text-xs font-mono font-bold tracking-wider uppercase border border-white/20 text-stone-200 group-hover:border-amber-400 group-hover:bg-amber-400 group-hover:text-stone-950 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Select Tier {tier.id}</span>
                  <span>→</span>
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
