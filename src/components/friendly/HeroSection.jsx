import React from 'react';
import InteractiveRobotShowcase from './InteractiveRobotShowcase';
import content from '../../content/content.json';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import FadeIn from '../common/FadeIn';

export default function HeroSection({ onBookClick, onExploreProjectsClick }) {
  const { label, subline, primaryCta, secondaryCta, trustLine } = content.hero;

  return (
    <section id="hero-section" className="relative pt-12 pb-16 md:pt-20 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left: Copy & Actions */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <FadeIn delay={0}>
            {/* Label: IBM Plex Mono 12px uppercase bottle green #1F4236 */}
            <div className="label-mono mb-4 text-[#1F4236]">
              {label}
            </div>
          </FadeIn>

          <FadeIn delay={80}>
            {/* Headline: Newsreader 600, tracking -0.01em, line-height 1.1. *build* in italic turmeric #C98A22 */}
            <h1 className="heading-editorial text-4xl sm:text-5xl lg:text-[3.5rem] text-[#2A2320] mb-6 max-w-[20ch]">
              Where Indian students learn to{' '}
              <em className="italic text-[#C98A22] font-serif">build</em> AI.
            </h1>
          </FadeIn>

          <FadeIn delay={160}>
            {/* Subline: Noto Sans 17px, line-height 1.65, #2A2320 at 80% opacity, max-width 60ch */}
            <p className="body-editorial mb-8 text-lg sm:text-[1.125rem]">
              {subline}
            </p>
          </FadeIn>

          <FadeIn delay={240}>
            {/* Buttons: Primary in oxblood #5E1F1C, ivory text */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 mb-8 w-full sm:w-auto">
              <button
                type="button"
                onClick={onBookClick}
                className="btn-primary-oxblood text-base cursor-pointer"
              >
                <span>{primaryCta}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>

              <button
                type="button"
                onClick={onExploreProjectsClick}
                className="btn-secondary-quiet px-2 py-2 text-sm font-medium cursor-pointer"
              >
                <span>{secondaryCta}</span>
                <span className="ml-1 text-xs" aria-hidden="true">↓</span>
              </button>
            </div>
          </FadeIn>

          <FadeIn delay={320}>
            {/* Trust Line: Simple subtle border-top */}
            <div className="pt-4 border-t border-[#DCCFB6] flex items-center gap-2.5 text-xs sm:text-sm text-[#2A2320]/80 max-w-xl">
              <CheckCircle2 className="w-4 h-4 text-[#1F4236] shrink-0" />
              <span>{trustLine}</span>
            </div>
          </FadeIn>
        </div>

        {/* Right: Pip Robot Showcase */}
        <div className="lg:col-span-5 flex justify-center">
          <FadeIn delay={120} className="w-full">
            <InteractiveRobotShowcase onBookClick={onBookClick} />
          </FadeIn>
        </div>

      </div>
    </section>
  );
}