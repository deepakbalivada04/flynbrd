import React from 'react';
import { useNavigate } from 'react-router-dom';
import content from '../../content/content.json';
import { ArrowRight, CheckCircle2, Compass, Sparkles } from 'lucide-react';
import FadeIn from '../common/FadeIn';
import heroStudentsImg from '../../assets/hero_students_robotics.jpg';

export default function HeroSection({ onBookClick, onExploreProjectsClick }) {
  const navigate = useNavigate();
  const { subline, primaryCta, secondaryCta, trustLine } = content.hero;

  return (
    <section id="hero-section" className="relative w-full min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden border-b border-slate-200">
      
      {/* ==============================================================
          FULL SCREEN WIDTH BACKGROUND IMAGE
          Indian students collaborating on IoT, robotics & drones
         ============================================================== */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden select-none pointer-events-none">
        <img
          src={heroStudentsImg || '/hero_students_robotics.jpg'}
          onError={(e) => {
            if (!e.currentTarget.src.endsWith('/hero_students_robotics.jpg')) {
              e.currentTarget.src = '/hero_students_robotics.jpg';
            }
          }}
          alt="Indian students working in groups on IoT coding, robots, and drones in STEM lab"
          className="w-full h-full object-cover object-right"
        />
        
        {/* Left-side horizontal fade only: ensures text readability on the left while leaving the students and rover on the right 100% clear and vivid */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 via-40% to-transparent pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 py-16 sm:py-20 lg:py-28 relative z-10">
        <div className="max-w-xl lg:max-w-2xl text-left">
          
          {/* Badge */}
          <FadeIn delay={0}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 text-slate-800 text-xs sm:text-sm font-semibold mb-6 shadow-xs">
              <Sparkles className="w-4 h-4 text-[#EE7819]" />
              <span>NEP 2020 STEM Residencies & Learning Platform · AP & Telangana</span>
            </div>
          </FadeIn>

          {/* Headline - "build" highlighted in warm Orange instead of Blue */}
          <FadeIn delay={80}>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-6">
              Where Indian students learn to{' '}
              <span className="text-[#EE7819]">
                build
              </span>{' '}
              real AI & robotics.
            </h1>
          </FadeIn>

          {/* Subtitle */}
          <FadeIn delay={160}>
            <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed mb-8 max-w-xl">
              {subline}
            </p>
          </FadeIn>

          {/* CTA Buttons - Primary button in warm logo Orange to break the blue monotony */}
          <FadeIn delay={240}>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8 w-full sm:w-auto">
              <button
                type="button"
                onClick={onBookClick}
                className="px-7 py-3.5 rounded-full bg-[#EE7819] hover:bg-[#d86b14] text-white font-bold text-base shadow-lg shadow-[#EE7819]/25 hover:shadow-[#EE7819]/35 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{primaryCta}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                type="button"
                onClick={() => navigate('/learning-paths')}
                className="px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-base border border-slate-200 shadow-sm hover:border-slate-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#2576BC]" />
                <span>Search Learning Paths</span>
              </button>

              <button
                type="button"
                onClick={onExploreProjectsClick}
                className="text-slate-600 hover:text-slate-900 font-semibold text-sm px-2 py-2 flex items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <span>{secondaryCta}</span>
                <span className="text-xs" aria-hidden="true">↓</span>
              </button>
            </div>
          </FadeIn>

          {/* Trust Strip */}
          <FadeIn delay={320}>
            <div className="pt-4 border-t border-slate-200/90 flex items-center gap-2.5 text-xs sm:text-sm text-slate-600 max-w-xl">
              <CheckCircle2 className="w-4 h-4 text-[#1D9D53] shrink-0" />
              <span>{trustLine}</span>
            </div>
          </FadeIn>

        </div>
      </div>

    </section>
  );
}
