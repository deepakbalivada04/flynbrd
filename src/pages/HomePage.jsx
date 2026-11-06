import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FriendlyNavbar from '../components/friendly/FriendlyNavbar';
import HeroSection from '../components/friendly/HeroSection';
import MarqueeTicker from '../components/friendly/MarqueeTicker';
import OurMissionSection from '../components/friendly/OurMissionSection';
import HowWeWorkSection from '../components/friendly/HowWeWorkSection';
import LearningPathsBanner from '../components/friendly/LearningPathsBanner';
import FourProjectsSection from '../components/friendly/FourProjectsSection';
import VideoLibrarySection from '../components/friendly/VideoLibrarySection';
import ReviewsSection from '../components/friendly/ReviewsSection';
import FoundingPartnersSection from '../components/friendly/FoundingPartnersSection';
import FaqSection from '../components/friendly/FaqSection';
import FinalCtaSection from '../components/friendly/FinalCtaSection';
import FriendlyFooter from '../components/friendly/FriendlyFooter';

export default function HomePage() {
  const [selectedTier, setSelectedTier] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (location.state?.bookingTier) {
      setSelectedTier(location.state.bookingTier);
      setTimeout(() => {
        const element = document.getElementById('booking');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (location.state?.scrollToBooking) {
      setTimeout(() => {
        const element = document.getElementById('booking');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (location.state?.scrollToId) {
      setTimeout(() => {
        const element = document.getElementById(location.state.scrollToId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location.state]);

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
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white font-sans antialiased">
      
      {/* 0. Top Navigation */}
      <FriendlyNavbar onBookClick={() => scrollToBooking()} />

      <main className="pt-20">
        
        {/* 1. HERO with Interactive Robot Showcase */}
        <HeroSection
          onBookClick={() => scrollToBooking()}
          onExploreProjectsClick={scrollToProjects}
        />

        {/* Live Ticker under the hero */}
        <MarqueeTicker />

        {/* 2. WHY WE EXIST */}
        <div id="why-we-exist">
          <OurMissionSection />
        </div>

        {/* 3. HOW WE WORK: Our Approach */}
        <HowWeWorkSection />

        {/* 4. DEDICATED LEARNING PATHS BANNER / PREVIEW: Links to /learning-paths */}
        <LearningPathsBanner />

        {/* 5. THE FOUR PROJECTS: Sleek Dark Band */}
        <FourProjectsSection />

        {/* 6. VIDEO LIBRARY: Learning System */}
        <VideoLibrarySection />

        {/* 7. REVIEWS: Published conditional */}
        <ReviewsSection />

        {/* 8. FOUNDING PARTNERS: Campus Residency Onboarding */}
        <FoundingPartnersSection onBookClick={() => scrollToBooking()} />

        {/* 9. FAQ: School Leaders Accordion */}
        <FaqSection />

        {/* 10. FINAL CTA: Walkthrough Consultation Inquiry Form */}
        <FinalCtaSection selectedTier={selectedTier} />

      </main>

      {/* Footer: Deep Slate Navy */}
      <FriendlyFooter />

    </div>
  );
}

