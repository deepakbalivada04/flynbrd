import React from 'react';
import content from '../../content/content.json';
import FadeIn from '../common/FadeIn';

export default function OurMissionSection() {
  const { label, body, pullQuote } = content.whyWeExist;

  return (
    <section className="bg-[#EFE6D3] py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#DCCFB6]">
      <div className="max-w-4xl mx-auto text-left">
        
        <FadeIn delay={0}>
          <div className="label-mono mb-3 text-[#1F4236]">
            {label}
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <h2 className="heading-editorial text-3xl sm:text-4xl md:text-5xl text-[#2A2320] mb-8">
            Technology is changing faster than{' '}
            <em className="italic text-[#C98A22] font-serif">our classrooms.</em>
          </h2>
        </FadeIn>

        <FadeIn delay={160}>
          <p className="body-editorial text-lg sm:text-xl mb-12">
            {body}
          </p>
        </FadeIn>

        <FadeIn delay={240}>
          <div className="pt-8 border-t border-[#DCCFB6]">
            <blockquote className="font-serif text-2xl sm:text-3xl text-[#2A2320] italic leading-snug font-medium">
              “{pullQuote}”
            </blockquote>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}