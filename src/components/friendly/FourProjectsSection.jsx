import React from 'react';
import content from '../../content/content.json';
import FadeIn from '../common/FadeIn';

export default function FourProjectsSection() {
  const { label, items } = content.projects;

  return (
    <section id="projects" className="bg-[#1F4236] text-[#F6F0E4] py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#DCCFB6]/20">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <FadeIn delay={0}>
            <div className="label-mono-light mb-3 text-[#C98A22]">
              {label}
            </div>
          </FadeIn>
          
          <FadeIn delay={80}>
            <h2 className="heading-editorial text-3xl sm:text-4xl md:text-5xl text-[#F6F0E4]">
              Four projects. Each ends with{' '}
              <em className="italic text-[#C98A22] font-serif">something a student can show.</em>
            </h2>
          </FadeIn>
        </div>

        {/* 2x2 Grid of Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((project, idx) => (
            <FadeIn key={project.number} delay={idx * 80}>
              <div className="card-green p-8 sm:p-10 flex flex-col justify-between text-left h-full">
                <div>
                  
                  {/* Top: Project Number & Grade Tag */}
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <span className="font-mono text-xl sm:text-2xl text-[#C98A22] font-semibold">
                      Project {project.number}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#17332A] border border-[#DCCFB6]/30 text-xs font-mono text-[#F6F0E4] uppercase tracking-wider">
                      {project.grades}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="heading-editorial text-2xl sm:text-3xl text-[#F6F0E4] mb-3">
                    {project.title}
                  </h3>

                  {/* Summary */}
                  <p className="body-editorial-light text-base sm:text-lg leading-relaxed pt-2 border-t border-[#DCCFB6]/20">
                    {project.summary}
                  </p>

                </div>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}