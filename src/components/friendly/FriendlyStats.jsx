import React from 'react';
import { Layers, FolderGit2, Sparkles } from 'lucide-react';

/**
 * FriendlyStats
 * 
 * Requirement 4: Replace unverified stats with true, factual items:
 * - "4 learning tracks"
 * - "2 member projects"
 * - "Now onboarding founding partner schools"
 */
export default function FriendlyStats() {
  const stats = [
    {
      metric: '4',
      label: 'Learning Tracks',
      sub: 'Prompting & Code, How AI Thinks, Space Robotics, and Hardware Kits.',
      icon: <Layers className="w-5 h-5 stroke-[1.5] text-[#0F1B2D]" />,
    },
    {
      metric: '2',
      label: 'Member Projects',
      sub: 'Complete guided capstone projects delivered with video lessons and mentorship.',
      icon: <FolderGit2 className="w-5 h-5 stroke-[1.5] text-[#0F1B2D]" />,
    },
    {
      metric: 'Open',
      label: 'Now Onboarding Founding Partner Schools',
      sub: 'Select campuses in Vizianagaram, Visakhapatnam, and Hyderabad.',
      icon: <Sparkles className="w-5 h-5 stroke-[1.5] text-[#C9A227]" />,
    },
  ];

  return (
    <section className="py-14 bg-[#FAF8F3] border-b border-[#E8E4D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="p-6 sm:p-7 rounded-2xl bg-white/70 border border-[#E8E4D9] shadow-subtle flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#FAF8F3] border border-[#E8E4D9] flex items-center justify-center mb-4 text-[#0F1B2D]">
                  {item.icon}
                </div>

                <div className="text-3xl sm:text-4xl font-serif font-normal text-[#0F1B2D] tracking-tight">
                  {item.metric}
                </div>

                <div className="text-base font-semibold text-[#0F1B2D] mt-2">
                  {item.label}
                </div>

                <p className="text-sm text-[#5C6470] mt-1.5 leading-relaxed">
                  {item.sub}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#E8E4D9]/60 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#C9A227]">
                  Verified Program Milestone
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
