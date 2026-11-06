import React from 'react';
import content from '../../content/content.json';
import FadeIn from '../common/FadeIn';

const PROJECT_ACCENTS = [
  {
    borderTop: 'border-t-4 border-t-[#D4252A]',
    numberColor: 'text-[#D4252A]',
    tagBg: 'bg-[#D4252A]/15 text-red-200 border-[#D4252A]/30',
    hoverBorder: 'hover:border-[#D4252A]',
  },
  {
    borderTop: 'border-t-4 border-t-[#533788]',
    numberColor: 'text-purple-300',
    tagBg: 'bg-[#533788]/20 text-purple-200 border-[#533788]/40',
    hoverBorder: 'hover:border-[#533788]',
  },
  {
    borderTop: 'border-t-4 border-t-[#EE7819]',
    numberColor: 'text-[#EE7819]',
    tagBg: 'bg-[#EE7819]/15 text-orange-200 border-[#EE7819]/30',
    hoverBorder: 'hover:border-[#EE7819]',
  },
  {
    borderTop: 'border-t-4 border-t-[#1D9D53]',
    numberColor: 'text-[#1D9D53]',
    tagBg: 'bg-[#1D9D53]/15 text-emerald-200 border-[#1D9D53]/30',
    hoverBorder: 'hover:border-[#1D9D53]',
  },
];

export default function FourProjectsSection() {
  const { label, items } = content.projects;

  return (
    <section id="projects" className="bg-slate-900 text-white py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <FadeIn delay={0}>
            <div className="text-[#2576BC] font-mono text-xs uppercase tracking-wider font-semibold mb-3">
              {label}
            </div>
          </FadeIn>
          
          <FadeIn delay={80}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Four projects. Each ends with{' '}
              <span className="bg-gradient-to-r from-[#D4252A] via-[#F9BA06] to-[#1D9D53] bg-clip-text text-transparent">
                something a student can show.
              </span>
            </h2>
          </FadeIn>
        </div>

        {/* 2x2 Grid of Project Cards with Pleasant Color Accents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((project, idx) => {
            const accent = PROJECT_ACCENTS[idx % PROJECT_ACCENTS.length];

            return (
              <FadeIn key={project.number} delay={idx * 80}>
                <div className={`bg-slate-800/90 border border-slate-700/80 ${accent.borderTop} ${accent.hoverBorder} rounded-3xl p-8 sm:p-10 flex flex-col justify-between text-left h-full hover:shadow-2xl transition-all group`}>
                  <div>
                    
                    {/* Top: Project Number & Grade Tag */}
                    <div className="flex items-center justify-between gap-4 mb-5">
                      <span className={`font-mono text-lg font-bold ${accent.numberColor}`}>
                        Project {project.number}
                      </span>
                      <span className={`px-3 py-1 rounded-full border text-xs font-mono uppercase tracking-wider ${accent.tagBg}`}>
                        {project.grades}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-200 transition-colors mb-3">
                      {project.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-slate-300 text-base leading-relaxed pt-3 border-t border-slate-700/60">
                      {project.summary}
                    </p>

                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

      </div>
    </section>
  );
}
