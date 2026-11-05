import React, { useState } from 'react';
import FriendlyNavbar from './components/friendly/FriendlyNavbar';
import HeroSection from './components/friendly/HeroSection';
import MarqueeTicker from './components/friendly/MarqueeTicker';
import OurMissionSection from './components/friendly/OurMissionSection';
import HowWeWorkSection from './components/friendly/HowWeWorkSection';
import FourProjectsSection from './components/friendly/FourProjectsSection';
import VideoLibrarySection from './components/friendly/VideoLibrarySection';
import ReviewsSection from './components/friendly/ReviewsSection';
import FoundingPartnersSection from './components/friendly/FoundingPartnersSection';
import FaqSection from './components/friendly/FaqSection';
import FinalCtaSection from './components/friendly/FinalCtaSection';
import FriendlyFooter from './components/friendly/FriendlyFooter';

export default function App() {
  const [selectedTier, setSelectedTier] = useState('');

  const scrollToBooking = (tierTitle = '') => {
    if (tierTitle) {
      setSelectedTier(tierTitle);
    }
    const element = document.getElementById('booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F0E4] text-[#2A2320] selection:bg-[#C98A22] selection:text-[#F6F0E4] font-sans antialiased">
      
      {/* 0. Top Navigation */}
      <FriendlyNavbar onBookClick={() => scrollToBooking()} />

      <main className="pt-20">
        
        {/* 1. HERO with Pip character & grade tabs */}
        <HeroSection
          onBookClick={() => scrollToBooking()}
          onExploreProjectsClick={scrollToProjects}
        />

        {/* Slow Ticker under the hero */}
        <MarqueeTicker />

        {/* 2. WHY WE EXIST: Sand band #EFE6D3 */}
        <div id="why-we-exist">
          <OurMissionSection />
        </div>

        {/* 3. HOW WE WORK: Our Approach & Callout (Ivory #F6F0E4) */}
        <HowWeWorkSection />

        {/* 4. THE FOUR PROJECTS: Bottle Green Band #1F4236 with Ivory text */}
        <FourProjectsSection />

        {/* 5. VIDEO LIBRARY: Learning System Filter Tabs & 8 Cards (Ivory #F6F0E4) */}
        <VideoLibrarySection />

        {/* 6. REVIEWS: Hidden until reviews.json has published: true (Sand band #EFE6D3) */}
        <ReviewsSection />

        {/* 7. FOUNDING PARTNERS: Now Onboarding (Ivory #F6F0E4) */}
        <FoundingPartnersSection onBookClick={() => scrollToBooking()} />

        {/* 8. FAQ: Bottle Green Band #1F4236 with Ivory text */}
        <FaqSection />

        {/* 9. FINAL CTA: Begin with one classroom (Sand band #EFE6D3) */}
        <FinalCtaSection selectedTier={selectedTier} />

      </main>

      {/* Footer: Bottle Green Band #1F4236 */}
      <FriendlyFooter />

    </div>
  );
}