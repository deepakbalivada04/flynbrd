import React from 'react';
import { motion } from 'framer-motion';

export default function ValueSection() {
  const headlineWords = [
    '100%',
    'Turnkey.',
    'Zero',
    'Teacher',
    'Burden.',
  ];

  const pillars = [
    {
      num: '01',
      title: 'Full Instructional Delivery',
      desc: 'Our certified robotics engineers and STEM educators handle setup, direct classroom teaching, and teardown. Your faculty can observe, participate, or grade exams.',
    },
    {
      num: '02',
      title: 'All Equipment Transported',
      desc: 'No district hardware purchasing needed. We bring individual robotics trays, pre-configured offline tablets, safety tools, and replacement components.',
    },
    {
      num: '03',
      title: 'Standards-Mapped Pedagogy',
      desc: 'Curriculum designed to directly satisfy Next Generation Science Standards (NGSS), state CTE pathways, and CSTA computer science requirements.',
    },
    {
      num: '04',
      title: 'Complete Compliance Vetted',
      desc: 'Livescan background checks, comprehensive district liability coverage, and strict FERPA/COPPA student privacy adherence on all devices.',
    },
  ];

  return (
    <section id="value-section" className="relative w-full border-b border-white/10 bg-black px-6 sm:px-12 lg:px-16 py-24 sm:py-32">
      
      {/* Top Overline */}
      <div className="border-b border-white/10 pb-6 mb-16 flex items-center justify-between text-xs font-mono text-stone-400">
        <span className="tracking-widest uppercase">
          [ 03 // THE VALUE PROPOSITION ]
        </span>
        <span className="text-amber-200">
          GUARANTEED ZERO LOGISTICAL FRICTION
        </span>
      </div>

      {/* Word-by-Word Framer Motion Typography Reveal */}
      <div className="max-w-6xl mb-24">
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter text-stone-100 uppercase leading-[0.95] flex flex-wrap gap-x-5 gap-y-2">
          {headlineWords.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 35, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={word === 'Zero' || word === 'Burden.' ? 'text-stone-400' : 'text-stone-100'}
            >
              {word}
            </motion.span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 text-sm sm:text-base text-stone-400 font-sans max-w-xl leading-relaxed"
        >
          We know school administrators have zero time for complicated setup. That is why our workshops operate as an entirely self-contained mobile technology lab.
        </motion.p>
      </div>

      {/* 4 Pillars Grid with 1px borders */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x border-t border-b border-white/10 divide-white/10">
        {pillars.map((pillar, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="p-8 sm:p-10 flex flex-col justify-between hover:bg-white/[0.02] transition-colors"
          >
            <div>
              <span className="text-xs font-mono text-amber-200 block mb-6">
                // {pillar.num}
              </span>
              <h3 className="text-base sm:text-lg font-display font-semibold text-stone-100 uppercase mb-3">
                {pillar.title}
              </h3>
              <p className="text-xs text-stone-400 font-sans leading-relaxed">
                {pillar.desc}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 text-[10px] font-mono text-stone-400">
              STATUS: AUDITED ✓
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}

