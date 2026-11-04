import React from 'react';
import { motion } from 'framer-motion';
import GlassPedal from '../ui/GlassPedal';

/**
 * HardwareKitsSection
 * 
 * Re-engineered for executive proportions:
 * - Scaled-down, crisp typography
 * - Multi-layered frosted glass cards and pedals
 * - Detailed vector blueprint schematics for each physical lab kit
 */
export default function HardwareKitsSection() {
  const kits = [
    {
      num: 'KIT // 01',
      title: 'Snap Logic & Chassis',
      badge: 'ELEMENTARY (3-5)',
      desc: 'Modular solderless electronic blocks with magnetic contacts, high-torque geared motors, and tactile rover frames.',
      blueprint: (
        <svg viewBox="0 0 160 70" fill="none" className="w-full h-14 opacity-80">
          <rect x="20" y="15" width="120" height="40" rx="6" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="45" cy="35" r="10" stroke="#facc15" strokeWidth="1.5" />
          <circle cx="45" cy="35" r="4" fill="#ffffff" />
          <path d="M65 35h30" stroke="#ffffff" strokeWidth="1.5" />
          <rect x="100" y="25" width="25" height="20" rx="3" stroke="#facc15" strokeWidth="1.5" />
        </svg>
      ),
      components: [
        'Safe enclosed 6V rechargeable power hubs',
        'DC high-torque dual-shaft geared motors',
        'Solderless snap conductive logic tiles',
        'Multi-ratio interlocking brass/nylon gears',
      ],
    },
    {
      num: 'KIT // 02',
      title: 'Telemetry & Sonar Hubs',
      badge: 'MIDDLE SCHOOL (6-8)',
      desc: 'Arduino-compatible microcontroller platforms with multi-sensor expansion shields, ultrasonic distance telemetry, and servos.',
      blueprint: (
        <svg viewBox="0 0 160 70" fill="none" className="w-full h-14 opacity-80">
          <rect x="30" y="15" width="100" height="40" rx="4" stroke="#ffffff" strokeWidth="1.5" fill="#0f1117" />
          <circle cx="55" cy="35" r="9" stroke="#ffffff" strokeWidth="1.2" />
          <circle cx="55" cy="35" r="3" fill="#facc15" />
          <circle cx="85" cy="35" r="9" stroke="#ffffff" strokeWidth="1.2" />
          <circle cx="85" cy="35" r="3" fill="#facc15" />
          <path d="M100 25 C110 30, 110 40, 100 45" stroke="#facc15" strokeWidth="1.5" strokeDasharray="2 3" />
          <path d="M110 20 C125 28, 125 42, 110 50" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 3" />
        </svg>
      ),
      components: [
        'Custom K-12 protected micro-hubs (USB-C)',
        'Dual-transducer ultrasonic sonar pingers',
        'Quad-channel infrared line-tracking arrays',
        'High-resolution 180° micro servo actuators',
      ],
    },
    {
      num: 'KIT // 03',
      title: 'Edge AI Neural Boards',
      badge: 'HIGH SCHOOL (9-12)',
      desc: 'Dedicated embedded AI compute boards capable of on-device neural network inferencing, SLAM mapping, and live Python telemetry.',
      blueprint: (
        <svg viewBox="0 0 160 70" fill="none" className="w-full h-14 opacity-80">
          <rect x="40" y="12" width="80" height="46" rx="4" stroke="#ffffff" strokeWidth="1.5" fill="#0f1117" />
          <rect x="65" y="24" width="30" height="22" rx="2" stroke="#facc15" strokeWidth="1.5" />
          <circle cx="80" cy="35" r="4" fill="#facc15" />
          <path d="M50 8v4M70 8v4M90 8v4M110 8v4M50 58v4M70 58v4M90 58v4M110 58v4" stroke="#ffffff" strokeWidth="1" />
        </svg>
      ),
      components: [
        'Industrial Edge AI processor modules',
        'Wide-angle HD vision sensors with low-latency bus',
        'Pre-configured offline Python environments',
        'Integrated wireless diagnostic telemetry bridge',
      ],
    },
    {
      num: 'KIT // 04',
      title: '4-DOF Robotic Arms',
      badge: 'ADVANCED CTE & STEM',
      desc: 'Precision robotic manipulators with multi-axis inverse kinematics, interchangeable gripper end-effectors, and teach pendants.',
      blueprint: (
        <svg viewBox="0 0 160 70" fill="none" className="w-full h-14 opacity-80">
          <circle cx="45" cy="50" r="10" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="45" cy="50" r="3" fill="#facc15" />
          <path d="M45 40 L80 25 L115 35" stroke="#ffffff" strokeWidth="1.8" />
          <circle cx="80" cy="25" r="5" fill="#facc15" stroke="#ffffff" strokeWidth="1.2" />
          <path d="M115 35 L130 28 L140 32" stroke="#facc15" strokeWidth="1.8" />
          <path d="M115 35 L128 42 L138 38" stroke="#facc15" strokeWidth="1.8" />
        </svg>
      ),
      components: [
        '4-Degree-of-Freedom articulated arm chassis',
        'Metal-gear digital servos with position feedback',
        'Interchangeable magnetic & claw end-effectors',
        'Live kinematic coordinate control interface',
      ],
    },
  ];

  return (
    <section
      id="hardware-section"
      className="relative w-full border-b border-white/10 bg-black text-white px-6 sm:px-12 lg:px-16 py-20 sm:py-24"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="border-b border-white/10 pb-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="mb-3">
              <GlassPedal dot={true} dotColor="bg-amber-400">
                [ 04 // TACTILE HARDWARE INFRASTRUCTURE ]
              </GlassPedal>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-tight uppercase">
              The Mobile STEM Lab
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-stone-300 max-w-md leading-relaxed">
            Districts invest zero capital in hardware procurement. We supply, calibrate, and transport comprehensive student trays for every classroom session.
          </p>
        </div>

        {/* 4-Card Blueprint Grid with Frosted Glass Containers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kits.map((kit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-6 sm:p-7 rounded-2xl bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 hover:border-amber-400/40 backdrop-blur-xl flex flex-col justify-between transition-all duration-300 group shadow-[0_12px_32px_rgba(0,0,0,0.6)]"
            >
              <div>
                {/* Card Top Meta */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <span className="text-xs font-mono font-bold text-amber-400">{kit.num}</span>
                  <GlassPedal className="text-[9px] py-0.5 px-2">
                    {kit.badge}
                  </GlassPedal>
                </div>

                {/* Blueprint Diagram */}
                <div className="py-2 px-3 my-2 rounded-xl bg-white/[0.02] border border-white/5 group-hover:border-white/10 transition-colors">
                  {kit.blueprint}
                </div>

                <h3 className="text-lg font-display font-bold text-white uppercase tracking-tight mt-3 mb-2">
                  {kit.title}
                </h3>

                <p className="text-xs text-stone-300 font-sans leading-relaxed mb-5">
                  {kit.desc}
                </p>

                {/* Blueprint Component List */}
                <div className="space-y-2 pt-3 border-t border-white/10 text-[11px] font-mono">
                  <span className="text-[9px] text-stone-400 block tracking-widest uppercase mb-1 font-bold">
                    // TRAY SPECIFICATIONS
                  </span>
                  {kit.components.map((comp, cIdx) => (
                    <div key={cIdx} className="flex items-start gap-1.5 text-stone-300">
                      <span className="text-amber-400 select-none">■</span>
                      <span className="leading-snug">{comp}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-white/10 text-[10px] font-mono text-stone-400 flex items-center justify-between">
                <span>1:1 RATIO READY</span>
                <span className="text-amber-400 font-bold">100% REPAIR COVERAGE</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
