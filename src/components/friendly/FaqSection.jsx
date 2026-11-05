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
    <section id="faq" className="bg-[#1F4236] text-[#F6F0E4] py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#DCCFB6]/20">
      <div className="max-w-4xl mx-auto text-left">
        
        {/* Header */}
        <div className="mb-14">
          <FadeIn delay={0}>
            <div className="label-mono-light mb-3 text-[#C98A22]">
              Frequently Asked Questions
            </div>
          </FadeIn>
          
          <FadeIn delay={80}>
            <h2 className="heading-editorial text-3xl sm:text-4xl md:text-5xl text-[#F6F0E4]">
              Questions from{' '}
              <em className="italic text-[#C98A22] font-serif">school leaders.</em>
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
                <div className="rounded-xl border border-[#DCCFB6]/25 bg-[#17332A] overflow-hidden transition-colors">
                  <button
                    type="button"
                    id={headingId}
                    aria-controls={panelId}
                    aria-expanded={isOpen}
                    onClick={() => toggleAccordion(item.id)}
                    className="w-full p-6 sm:p-7 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C98A22]"
                  >
                    <span className="font-serif text-lg sm:text-xl text-[#F6F0E4] font-medium pr-2">
                      {item.question}
                    </span>
                    <span 
                      aria-hidden="true"
                      className={`w-8 h-8 rounded-full border border-[#DCCFB6]/30 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-[#C98A22] text-[#1F4236]' : 'bg-[#1F4236] text-[#F6F0E4]'
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
                      className="px-6 sm:px-7 pb-6 sm:pb-7 pt-1 body-editorial-light text-base leading-relaxed border-t border-[#DCCFB6]/20"
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