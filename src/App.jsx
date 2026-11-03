import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import SceneCanvas from './components/canvas/SceneCanvas';
import Navbar from './components/ui/Navbar';
import PhaseTracker from './components/ui/PhaseTracker';
import HeroSection from './components/ui/HeroSection';
import ProgramsSection from './components/ui/ProgramsSection';
import BenefitsSection from './components/ui/BenefitsSection';
import ContactSection from './components/ui/ContactSection';
import Footer from './components/ui/Footer';

import { THEMES } from './constants/themeConfig';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef(null);

  // State tied to scroll progress and phase
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(1);
  const [selectedProgram, setSelectedProgram] = useState('');

  // Setup GSAP ScrollTrigger
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Master ScrollTrigger tracking total long-scroll progress
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          const p = Math.max(0, Math.min(1, self.progress));
          setScrollProgress(p);

          // Update currentPhase based on scroll thresholds
          let phase = 1;
          if (p < 0.25) {
            phase = 1;
          } else if (p < 0.50) {
            phase = 2;
          } else if (p < 0.75) {
            phase = 3;
          } else {
            phase = 4;
          }
          setCurrentPhase(phase);
        },
      });

      // Individual section midpoint triggers for snappy UI responsiveness
      const sectionIds = ['#section-1', '#section-2', '#section-3', '#section-4'];
      sectionIds.forEach((id, idx) => {
        ScrollTrigger.create({
          trigger: id,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => setCurrentPhase(idx + 1),
          onEnterBack: () => setCurrentPhase(idx + 1),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Navigation handlers
  const navigateToPhase = (phaseNumber) => {
    const el = document.getElementById(`section-${phaseNumber}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProgramSelect = (programTitle) => {
    setSelectedProgram(programTitle);
    navigateToPhase(4);
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeTheme = THEMES[currentPhase] || THEMES[1];

  return (
    <div
      ref={containerRef}
      className={`relative min-h-screen text-stone-100 transition-colors duration-700 ease-in-out ${activeTheme.bgClass} ${activeTheme.gridClass}`}
    >
      {/* 
        DUAL-LAYER ARCHITECTURE:
        LAYER 1 (Background): Fixed R3F 3D Canvas across 100vw x 100vh with z-index: -10 
      */}
      <SceneCanvas
        scrollProgress={scrollProgress}
        currentPhase={currentPhase}
      />

      {/* 
        LAYER 2 (Foreground): Scrolling HTML container with transparent backgrounds 
      */}
      <div className="relative z-10 flex flex-col">
        {/* Persistent Navbar */}
        <Navbar
          currentPhase={currentPhase}
          onNavigatePhase={navigateToPhase}
        />

        {/* Floating Side Phase Tracker */}
        <PhaseTracker
          currentPhase={currentPhase}
          scrollProgress={scrollProgress}
          onNavigatePhase={navigateToPhase}
        />

        {/* Phase / Era Floating Status Pill for Mobile */}
        <div className="md:hidden fixed bottom-4 left-4 z-40">
          <div className={`px-3 py-1 rounded-full text-xs font-mono font-bold shadow-lg backdrop-blur-md ${activeTheme.pillClass}`}>
            {activeTheme.statusBadge}
          </div>
        </div>

        {/* SECTION 1: HERO (Maps to Theme 1: Early Man / Fire & Stone) */}
        <HeroSection
          onBookDemoClick={() => navigateToPhase(4)}
          onExploreClick={() => navigateToPhase(2)}
        />

        {/* SECTION 2: WORKSHOP PROGRAMS (Maps to Theme 2: Classical Inventor / Gears) */}
        <ProgramsSection
          onSelectProgram={handleProgramSelect}
        />

        {/* SECTION 3: BENEFITS & LOGISTICS (Maps to Theme 3: Modern Developer / Silicon) */}
        <BenefitsSection
          onBookDemoClick={() => navigateToPhase(4)}
        />

        {/* SECTION 4: CONTACT & BOOKING (Maps to Theme 4: AI Robot / Autonomous Future) */}
        <ContactSection
          selectedProgramTitle={selectedProgram}
        />

        {/* Institutional Footer */}
        <Footer
          onScrollTop={handleScrollTop}
        />
      </div>
    </div>
  );
}

