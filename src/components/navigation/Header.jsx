import React, { useState, useEffect } from 'react';
import { getSoundEnabled, setSoundEnabled, playTinyClick } from '../../utils/toyAudio';

/**
 * Header
 * 
 * Toy-Theme navigation bar:
 * - Brand with golden rocket icon & "Flyinbird AI"
 * - Clean sentence case nav links (Curriculum, Milestones, Toy box, Hardware kits, Why us)
 * - MUTE BY DEFAULT cute speaker toggle (Web Audio API)
 * - Chunky tactile "Book demo" CTA with hard bottom shadow
 */
export default function Header({ onBookClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    setSoundOn(getSoundEnabled());
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const nextState = !soundOn;
    setSoundEnabled(nextState);
    setSoundOn(nextState);
    if (nextState) {
      playTinyClick();
    }
  };

  const scrollToSection = (id) => {
    playTinyClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 sm:px-10 lg:px-16 py-3.5 flex items-center justify-between ${
        scrolled
          ? 'bg-[#0B0B10]/95 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent border-b border-white/5'
      }`}
    >
      {/* Brand: Golden Rocket + Flyinbird AI */}
      <div
        onClick={() => {
          playTinyClick();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="flex items-center gap-3 cursor-pointer group select-none"
      >
        <div className="w-9 h-9 rounded-xl bg-[#15151E] border-2 border-[#FFC933] shadow-[2px_2px_0px_0px_#FFC933] flex items-center justify-center group-hover:scale-105 transition-transform">
          <span className="text-lg">🚀</span>
        </div>
        <div className="flex flex-col">
          <span className="font-display font-black text-base sm:text-lg tracking-tight text-[#F5F5F7] leading-none">
            Flyinbird <span className="text-[#FFC933]">AI</span>
          </span>
          <span className="text-[10px] font-sans text-stone-400 font-medium tracking-wide mt-0.5">
            K-12 Robotics & AI Workshops
          </span>
        </div>
      </div>

      {/* Center Nav Links: Sentence Case, Clean Font, No Monospace Caps */}
      <nav className="hidden lg:flex items-center gap-7 text-xs font-sans font-semibold text-stone-300">
        <button
          onClick={() => scrollToSection('curriculum-section')}
          className="hover:text-[#FFC933] transition-colors"
        >
          Curriculum
        </button>
        <button
          onClick={() => scrollToSection('metrics-section')}
          className="hover:text-[#FFC933] transition-colors"
        >
          Milestones
        </button>
        <button
          onClick={() => scrollToSection('toybox-section')}
          className="hover:text-[#38BDF8] transition-colors flex items-center gap-1.5"
        >
          <span>Toy box</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/40">
            Interactive
          </span>
        </button>
        <button
          onClick={() => scrollToSection('hardware-section')}
          className="hover:text-[#FFC933] transition-colors"
        >
          Hardware kits
        </button>
        <button
          onClick={() => scrollToSection('whyus-section')}
          className="hover:text-[#FFC933] transition-colors"
        >
          Why us
        </button>
      </nav>

      {/* Right Actions: Sound Toggle + Status Badge + Book Demo Button */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Cute Speaker Toggle Button (Sound OFF by Default) */}
        <button
          onClick={toggleSound}
          title={soundOn ? 'Sound effects enabled (click to mute)' : 'Sound effects muted (click to enable)'}
          className={`px-3 py-1.5 rounded-full border-2 text-xs font-sans font-bold flex items-center gap-1.5 transition-all select-none ${
            soundOn
              ? 'bg-[#15151E] border-[#34D399] text-[#34D399] shadow-[2px_2px_0px_0px_#34D399]'
              : 'bg-[#15151E] border-white/20 text-stone-400 hover:text-stone-200 shadow-[2px_2px_0px_0px_#000000]'
          }`}
        >
          <span className="text-sm">{soundOn ? '🔊' : '🔇'}</span>
          <span className="hidden sm:inline text-[11px] font-mono">
            {soundOn ? 'SFX ON' : 'SFX OFF'}
          </span>
        </button>

        {/* District Deployment Status Pill */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-[#15151E] border border-white/10 text-[11px] font-sans font-medium text-stone-300">
          <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
          <span>District pilots active</span>
        </div>

        {/* Book Demo Button: Rounded-full, Sentence Case, Chunky Shadow */}
        <button
          onClick={() => {
            playTinyClick();
            if (onBookClick) onBookClick();
          }}
          className="btn-chunky px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-display font-extrabold text-black bg-[#FFC933] hover:bg-[#FFE28A] border-2 border-black flex items-center gap-1.5 select-none"
        >
          <span>Book demo</span>
          <span className="text-sm font-bold">→</span>
        </button>
      </div>
    </header>
  );
}
