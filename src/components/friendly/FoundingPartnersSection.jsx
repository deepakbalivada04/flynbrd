import React from 'react';
import content from '../../content/content.json';
import { ArrowRight } from 'lucide-react';
import FadeIn from '../common/FadeIn';

export default function FoundingPartnersSection({ onBookClick }) {
  const { label, body, button } = content.foundingPartners;

  return (
    <section className="bg-[#F6F0E4] py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#DCCFB6]">
      <div className="max-w-5xl mx-auto">
        <FadeIn delay={0}>
          <div className="rounded-2xl bg-[#EFE6D3] border border-[#DCCFB6] shadow-soft p-8 sm:p-14 text-left">
            
            <div className="label-mono mb-4 text-[#1F4236]">
              {label}
            </div>

            <h2 className="heading-editorial text-3xl sm:text-4xl md:text-5xl text-[#2A2320] mb-6 max-w-2xl">
              Partner with us from the{' '}
              <em className="italic text-[#C98A22] font-serif">first term.</em>
            </h2>

            <p className="body-editorial text-lg sm:text-xl mb-8 max-w-2xl">
              {body}
            </p>

            <button
              type="button"
              onClick={onBookClick}
              className="btn-primary-oxblood text-base cursor-pointer"
            >
              <span>{button}</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>

          </div>
        </FadeIn>
      </div>
    </section>
  );
}