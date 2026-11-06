import React, { useState } from 'react';
import content from '../../content/content.json';
import { ChevronDown } from 'lucide-react';
import FadeIn from '../common/FadeIn';

export default function FaqSection() {
  const { items } = content.faq;
  const [openId, setOpenId] = useState(items[0]?.id || null);

  const toggleAccordion = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="bg-slate-50 text-slate-900 py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
      <div className="max-w-4xl mx-auto text-left">
        
        {/* Header */}
        <div className="mb-14">
          <FadeIn delay={0}>
            <div className="text-xs font-mono uppercase tracking-wider mb-3 text-[#533788] font-bold">
              Frequently Asked Questions
            </div>
          </FadeIn>
          
          <FadeIn delay={80}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              Questions from <span className="text-[#533788]">school leaders.</span>
            </h2>
          </FadeIn>
        </div>

        {/* 5 Accordion Items */}
        <div className="space-y-4">
          {items.map((item, idx) => {
            const isOpen = openId === item.id;
            const headingId = `faq-heading-${item.id}`;
            const panelId = `faq-panel-${item.id}`;

            return (
              <FadeIn key={item.id} delay={idx * 60}>
                <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:border-[#533788]/30 transition-colors">
                  <button
                    type="button"
                    id={headingId}
                    aria-controls={panelId}
                    aria-expanded={isOpen}
                    onClick={() => toggleAccordion(item.id)}
                    className="w-full p-6 sm:p-7 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#533788]"
                  >
                    <span className="text-lg sm:text-xl text-slate-900 font-bold pr-2">
                      {item.question}
                    </span>
                    <span 
                      aria-hidden="true"
                      className={`w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-[#533788] text-white border-[#533788]' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={headingId}
                      className="px-6 sm:px-7 pb-6 sm:pb-7 pt-1 text-slate-600 text-base leading-relaxed border-t border-slate-100"
                    >
                      {item.answer}
                    </div>
                  )}
                </div>
              </FadeIn>
            );
          })}
        </div>

      </div>
    </section>
  );
}
