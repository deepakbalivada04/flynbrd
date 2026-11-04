import React from 'react';
import { motion } from 'framer-motion';
import GlassPedal from '../ui/GlassPedal';

/**
 * WhyUsSection
 * 
 * Re-engineered for executive proportions:
 * - Scaled-down, high-contrast, crystal-clear typography
 * - Frosted glass containers and pedals on guarantees
 * - Clean 4-pillar institutional grid
 */
export default function WhyUsSection() {
  const pillars = [
    {
      num: '01',
      title: 'Full Instructional Delivery',
      desc: 'Our certified robotics engineers and STEM educators handle setup, direct classroom teaching, and teardown. Your faculty can observe, participate, or grade exams.',
    },
    {
      num: '02',
      title: 'Zero Equipment Purchasing',
      desc: 'No district hardware requisitions needed. We bring individual robotics trays, pre-configured offline tablets, safety tools, and replacement components.',
    },
    {
      num: '03',
      title: 'Standards-Mapped Pedagogy',
      desc: 'Curriculum designed to directly satisfy Next Generation Science Standards (NGSS), state CTE pathways, and CSTA computer science requirements.',
    },
    {
      num: '04',
      title: 'Vetted District Compliance',
      desc: 'Livescan background checks, comprehensive district liability coverage, and strict FERPA/COPPA student privacy adherence on all devices.',
    },
  ];

  return (
    <section
      id="whyus-section"
      className="relative w-full border-b border-white/10 bg-black text-white px-6 sm:px-12 lg:px-16 py-20 sm:py-24"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Top Overline Header */}
        <div className="border-b border-white/10 pb-5 mb-10 flex items-center justify-between text-xs font-mono">
          <GlassPedal dot={true} dotColor="bg-amber-400">
            [ 05 // INSTITUTIONAL GUARANTEES ]
          </GlassPedal>
          <GlassPedal dot={true} dotColor="bg-emerald-400" className="hidden sm:inline-flex">
            GUARANTEED ZERO LOGISTICAL FRICTION
          </GlassPedal>
        </div>

        {/* Refined, Executive Headline */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-tight text-white uppercase leading-[1.12]">
            100% Turnkey Delivery. <br />
            <span className="text-amber-400">Zero Teacher Burden.</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm md:text-base text-stone-300 font-sans leading-relaxed max-w-xl">
            School administrators have zero time for complicated setup or broken hardware. Our workshops operate as an entirely self-contained mobile technology lab.
          </p>
        </div>

        {/* 4 Pillars Grid with Frosted Glass Containers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-7 sm:p-8 rounded-2xl bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 hover:border-amber-400/40 backdrop-blur-xl flex flex-col justify-between transition-all duration-300 group shadow-[0_12px_32px_rgba(0,0,0,0.6)]"
            >
              <div>
                <span className="text-xs font-mono text-amber-400 block mb-4 font-bold">
                  // {pillar.num}
                </span>
                <h3 className="text-base sm:text-lg font-display font-bold text-white uppercase tracking-tight mb-2.5">
                  {pillar.title}
                </h3>
                <p className="text-xs text-stone-300 font-sans leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-white/10 text-[10px] font-mono text-stone-400 flex items-center justify-between">
                <span>COMPLIANCE</span>
                <span className="text-amber-400 font-bold">✓ APPROVED</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
