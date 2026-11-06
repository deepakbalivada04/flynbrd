import React from 'react';
import content from '../../content/content.json';
import { ArrowRight, Sparkles } from 'lucide-react';
import FadeIn from '../common/FadeIn';

export default function FoundingPartnersSection({ onBookClick }) {
  const { label, body, button } = content.foundingPartners;

  return (
    <section className="bg-white py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
      <div className="max-w-5xl mx-auto">
        <FadeIn delay={0}>
          <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white border border-slate-800 shadow-2xl p-8 sm:p-14 text-left relative overflow-hidden">
            
            {/* Background ambient radial glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#EE7819]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F9BA06]/15 border border-[#F9BA06]/30 text-amber-200 text-xs font-semibold mb-5 font-mono uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#F9BA06]" />
              <span>{label}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 max-w-2xl leading-tight">
              Partner with us from the{' '}
              <span className="text-[#F9BA06]">first term.</span>
            </h2>

            <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
              {body}
            </p>

            <button
              type="button"
              onClick={onBookClick}
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#EE7819] to-[#D4252A] hover:from-[#d66b15] hover:to-[#b81d22] text-white font-bold text-base shadow-lg shadow-[#EE7819]/25 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 cursor-pointer"
            >
              <span>{button}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

          </div>
        </FadeIn>
      </div>
    </section>
  );
}
