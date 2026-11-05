import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';

export default function FoundingPartnerCallout({ onBookClick }) {
  return (
    <section className="py-16 sm:py-20 bg-[#FAF8F3] border-b border-[#E8E4D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative p-8 sm:p-12 rounded-2xl bg-white/90 border border-[#E8E4D9] shadow-subtle flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#C9A227] animate-pulse" />
              <span className="font-mono uppercase text-xs tracking-widest text-[#C9A227]">
                [ FOUNDING PARTNERS ]
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-normal text-[#0F1B2D] tracking-tight">
              We are onboarding our first <span className="font-serif italic text-[#C9A227]">partner schools.</span>
            </h3>

            <p className="mt-3 text-[17px] text-[#5C6470] leading-relaxed">
              Founding schools in Vizianagaram, Visakhapatnam, and Hyderabad get locked-in pricing for their first year and direct input on the curriculum. We are keeping this group small on purpose.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[#5C6470]">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#0F1B2D]" />
                <span>Vizianagaram</span>
              </span>
              <span className="text-[#E8E4D9]">/</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#0F1B2D]" />
                <span>Visakhapatnam</span>
              </span>
              <span className="text-[#E8E4D9]">/</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#0F1B2D]" />
                <span>Hyderabad</span>
              </span>
            </div>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            <button
              onClick={onBookClick}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#0F1B2D] text-[#FAF8F3] hover:bg-[#C9A227] hover:text-[#0F1B2D] font-medium text-sm transition-colors flex items-center justify-center gap-2.5 shadow-sm"
            >
              <span>Book a School Walkthrough</span>
              <ArrowRight className="w-4 h-4 stroke-[1.5]" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
