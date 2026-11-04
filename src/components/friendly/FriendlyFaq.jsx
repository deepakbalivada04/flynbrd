import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FriendlyFaq() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'Do our school teachers need prior coding or robotics knowledge?',
      a: 'Not at all! Our certified STEM engineers and mentors handle 100% of the instruction, hardware setup, student guidance, and teardown. Your teachers can simply observe, assist, or grade other coursework.',
    },
    {
      q: 'How long are the workshops and how do they fit into our schedule?',
      a: 'We offer flexible formats designed to slot seamlessly into your school bell schedule: 60- to 90-minute single-period labs, full-day grade rotations, after-school clubs, or week-long deep STEM residencies.',
    },
    {
      q: 'What school equipment or room setup is required from our campus?',
      a: 'Just a standard classroom or library with tables, chairs, and standard wall outlets. We provide all the physical robotics kits, pre-configured laptops/tablets, power hubs, and safety tools.',
    },
    {
      q: 'Can our school or district use federal Title I, CTE, or STEM grant funding?',
      a: 'Yes! Flyinbird AI workshops meet the criteria for federal Title I enrichment, Perkins V Career & Technical Education (CTE) pathways, and state STEM grant appropriations. We provide all itemized documentation.',
    },
    {
      q: 'How do you protect student privacy and safety?',
      a: 'All our hardware runs locally on offline, pre-configured devices that never harvest student personal data (100% FERPA & COPPA compliant). All visiting instructors hold verified Livescan criminal background clearances.',
    },
  ];

  return (
    <section id="faq" className="py-20 sm:py-24 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 mt-4 tracking-tight">
            Common Questions from Principals & Teachers
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Have questions about booking, scheduling, or funding? Here are quick answers.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 font-display font-bold text-base sm:text-lg text-slate-900 hover:text-indigo-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-indigo-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

