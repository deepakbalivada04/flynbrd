import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FriendlyFaq() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'Do our teachers need coding or robotics knowledge?',
      a: 'No. Our instructors run every session, from setup to teardown. Your teachers can observe, assist, or co-facilitate.',
    },
    {
      q: 'How long are the workshops, and how do they fit our timetable?',
      a: 'Choose a half-day, a full-day, or a multi-week residency. We schedule around your existing periods and holidays.',
    },
    {
      q: 'What space or equipment does our campus need?',
      a: 'A classroom with power sockets and tables for the number of students in the cohort. We bring everything else.',
    },
    {
      q: 'How does the curriculum align with NEP 2020 and state or CBSE boards?',
      a: "Our curriculum follows NEP 2020's experiential learning goals. We will provide a mapping to your board's syllabus during the walkthrough.",
    },
    {
      q: 'What child safety and privacy practices do you follow?',
      a: 'Instructors are verified before any visit. Student work and data stay on offline devices. Our full policy is available on request.',
    },
  ];

  return (
    <section id="faq" className="py-20 sm:py-24 bg-[#FAF8F3] border-b border-[#E8E4D9]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-14">
          <span className="font-mono uppercase text-xs tracking-widest text-[#C9A227] block mb-3">
            [ FREQUENTLY ASKED QUESTIONS ]
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-[#0F1B2D]">
            Frequently Asked <span className="font-serif italic text-[#C9A227]">Questions</span>
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white/80 rounded-2xl border border-[#E8E4D9] overflow-hidden shadow-subtle transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 font-serif font-normal text-lg sm:text-xl text-[#0F1B2D] hover:text-[#C9A227] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#5C6470] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-[#C9A227]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-[17px] text-[#5C6470] leading-relaxed border-t border-[#E8E4D9]/60 pt-4">
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
