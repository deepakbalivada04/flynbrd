import React from 'react';
import { motion } from 'framer-motion';
import GlassPedal from '../ui/GlassPedal';

/**
 * MetricsSection
 * 
 * Re-engineered for executive proportions:
 * - Scaled-down, high-contrast numbers and typography
 * - Frosted glass containers and pedal badges
 * - Trajectory line graph with golden milestone nodes
 */
export default function MetricsSection() {
  const metrics = [
    {
      stat: '18,000+',
      label: 'STUDENTS INSPIRED',
      sub: 'Across 45+ elementary, middle, and high schools',
    },
    {
      stat: '100%',
      label: 'TURNKEY DELIVERY',
      sub: 'All hardware kits, instructors & lesson plans supplied',
    },
    {
      stat: '0 HOURS',
      label: 'TEACHER PREP REQUIRED',
      sub: 'Certified engineers handle setup, instruction & teardown',
    },
    {
      stat: '24 HOURS',
      label: 'DISTRICT SLA DISPATCH',
      sub: 'Guaranteed response for administrative schedule reviews',
    },
  ];

  return (
    <section
      id="metrics-section"
      className="relative w-full border-b border-white/10 bg-black text-white px-6 sm:px-12 lg:px-16 py-20 sm:py-24"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header Bar */}
        <div className="border-b border-white/10 pb-5 mb-10 flex items-center justify-between text-xs font-mono">
          <GlassPedal dot={true} dotColor="bg-amber-400">
            [ 03 // DISTRICT IMPACT & MILESTONES ]
          </GlassPedal>
          <GlassPedal dot={true} dotColor="bg-emerald-400" className="hidden sm:inline-flex">
            AUDITED K-12 CLASSROOM OUTCOMES
          </GlassPedal>
        </div>

        {/* Vector Growth Line Chart Graphic */}
        <div className="relative w-full my-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-6 sm:p-10 overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.6)]">
          <svg
            viewBox="0 0 1000 180"
            fill="none"
            className="w-full h-auto overflow-visible opacity-90"
          >
            {/* Background Grid Lines */}
            <line x1="0" y1="45" x2="1000" y2="45" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 6" />
            <line x1="0" y1="90" x2="1000" y2="90" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 6" />
            <line x1="0" y1="135" x2="1000" y2="135" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 6" />

            {/* Geometric Growth Landscape Trajectory (Angular Mountain Lines) */}
            <path
              d="M 20 150 L 180 110 L 290 140 L 440 70 L 580 95 L 760 35 L 980 15"
              stroke="#ffffff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Golden Exponential Trend Overlay */}
            <path
              d="M 20 160 L 290 145 L 580 105 L 760 42 L 980 20"
              stroke="#facc15"
              strokeWidth="1.8"
              strokeDasharray="6 8"
              opacity="0.85"
            />

            {/* Glowing Milestone Data Nodes */}
            <g fill="#facc15">
              <circle cx="180" cy="110" r="4.5" stroke="#ffffff" strokeWidth="2" />
              <circle cx="440" cy="70" r="4.5" stroke="#ffffff" strokeWidth="2" />
              <circle cx="760" cy="35" r="5.5" stroke="#ffffff" strokeWidth="2" className="animate-pulse" />
              <circle cx="980" cy="15" r="6" stroke="#ffffff" strokeWidth="2.5" />
            </g>

            {/* Crosshair Stars (+) */}
            <path d="M 250 60 L 250 72 M 244 66 L 256 66" stroke="#ffffff" strokeWidth="1.2" opacity="0.6" />
            <path d="M 640 45 L 640 57 M 634 51 L 646 51" stroke="#ffffff" strokeWidth="1.2" opacity="0.6" />
            <path d="M 880 75 L 880 87 M 874 81 L 886 81" stroke="#facc15" strokeWidth="1.2" opacity="0.8" />
          </svg>
        </div>

        {/* 4-Stat Metric Grid in Frosted Glass Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {metrics.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-6 sm:p-7 rounded-2xl bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 backdrop-blur-xl flex flex-col justify-between transition-all duration-300"
            >
              <div>
                <span className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-white block mb-2 group-hover:text-amber-400 transition-colors">
                  {m.stat}
                </span>
                <span className="text-[11px] font-mono font-semibold tracking-wider text-amber-400 block mb-2 uppercase">
                  {m.label}
                </span>
                <p className="text-xs text-stone-300 font-sans leading-relaxed">
                  {m.sub}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-white/10 text-[10px] font-mono text-stone-400 flex items-center justify-between">
                <span>AUDITED</span>
                <span className="text-amber-400 font-bold">✓ VERIFIED</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
