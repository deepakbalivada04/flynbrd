import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Compass, ChevronRight } from 'lucide-react';
import FadeIn from '../common/FadeIn';
import { MASTER_TRACKS } from '../../data/curriculumData';

export default function LearningPathsBanner() {
  const navigate = useNavigate();

  // Select 4 showcase tracks representing key areas: Space, 3D Printing, AI, and Robotics
  const showcaseTracks = MASTER_TRACKS.filter(t => 
    ['space', '3d-printing', 'ai', 'robotics'].includes(t.id)
  );

  return (
    <section id="learning-paths-preview" className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200/80 relative overflow-hidden text-slate-900">
      
      {/* Ambient background glows with logo colors */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-15 blur-3xl -z-10">
        <div className="absolute top-0 left-10 w-80 h-80 rounded-full bg-[#1D9D53]" />
        <div className="absolute top-10 right-10 w-80 h-80 rounded-full bg-[#533788]" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-[#EE7819]" />
      </div>

      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div className="max-w-2xl">
            <FadeIn delay={0}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#EE7819]" />
                <span className="text-slate-800">Next-Gen Tech Academy • 9 Disciplines</span>
              </div>
            </FadeIn>
            
            <FadeIn delay={80}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Structured learning paths for{' '}
                <span className="bg-gradient-to-r from-[#D4252A] via-[#EE7819] via-[#1D9D53] to-[#2576BC] bg-clip-text text-transparent">
                  every grade level.
                </span>
              </h2>
            </FadeIn>

            <FadeIn delay={120}>
              <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
                Click any tile to explore complete module sequences, chapters, and hands-on hardware kits from elementary school to high school graduation.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={160}>
            <button
              type="button"
              onClick={() => navigate('/learning-paths')}
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#EE7819] to-[#D4252A] hover:from-[#d66914] hover:to-[#ba1e23] text-white font-bold text-sm shadow-md shadow-orange-500/20 hover:shadow-lg transition-all flex items-center gap-2.5 cursor-pointer shrink-0 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Compass className="w-4 h-4 text-amber-200" />
              <span>Explore All 9 Learning Paths</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </button>
          </FadeIn>
        </div>

        {/* 4 Showcase Themed Light Cards with Faded Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {showcaseTracks.map((track, idx) => (
            <FadeIn key={track.id} delay={idx * 60}>
              <div 
                onClick={() => navigate(`/learning-paths/${track.slug || track.id}`)}
                className="group relative flex flex-col rounded-3xl overflow-hidden bg-white border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-xl hover:shadow-slate-200 transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full"
              >
                {/* Respective Thematic Image with Bottom Fade */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <img 
                    src={track.bgImage} 
                    alt={track.title}
                    className="w-full h-full object-cover object-center filter saturate-105 brightness-[0.95] group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle top vignette */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />

                  {/* Smooth bottom fade into white card body */}
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white via-white/60 to-transparent pointer-events-none" />

                  {/* Badge floating on top */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-1 z-10">
                    <span 
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider text-white shadow-sm"
                      style={{ backgroundColor: track.themeColor }}
                    >
                      {track.shortTitle}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-800 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/80 shadow-xs">
                      Grades 3–12
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5 pt-1 text-slate-900 bg-white">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#2576BC] transition-colors mb-1.5 leading-snug">
                    {track.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {track.tagline}
                  </p>

                  <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#EE7819] group-hover:text-[#2576BC] transition-colors">
                    <span>View Syllabus</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}