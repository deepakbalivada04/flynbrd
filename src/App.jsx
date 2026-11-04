import React, { useState } from 'react';
import FriendlyNavbar from './components/friendly/FriendlyNavbar';
import FriendlyHero from './components/friendly/FriendlyHero';
import FriendlyStats from './components/friendly/FriendlyStats';
import FriendlyHowItWorks from './components/friendly/FriendlyHowItWorks';
import FriendlyPrograms from './components/friendly/FriendlyPrograms';
import FriendlyWhyUs from './components/friendly/FriendlyWhyUs';
import FriendlyHardware from './components/friendly/FriendlyHardware';
import FriendlyFaq from './components/friendly/FriendlyFaq';
import FriendlyBooking from './components/friendly/FriendlyBooking';
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

  const scrollToPrograms = () => {
    const element = document.getElementById('programs');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white font-sans antialiased">
      
      {/* 1. Simple, Clean, Friendly Navbar */}
      <FriendlyNavbar onBookClick={() => scrollToBooking()} />

      {/* 2. Main Content Sections */}
      <main>
        {/* Friendly Hero with Interactive Grade-Level Project Preview */}
        <FriendlyHero
          onBookDemoClick={() => scrollToBooking()}
          onExploreClick={scrollToPrograms}
        />

        {/* Key Metrics / Social Proof */}
        <FriendlyStats />

        {/* 3-Step "How It Works" */}
        <FriendlyHowItWorks onBookClick={() => scrollToBooking()} />

        {/* 3 Scaffolded Curricula (Elementary, Middle, High) */}
        <FriendlyPrograms onSelectTier={(tier) => scrollToBooking(tier)} />

        {/* Why Schools & Teachers Love Flyinbird */}
        <FriendlyWhyUs />

        {/* Inside the Mobile Robotics Lab Kits */}
        <FriendlyHardware />

        {/* Frequently Asked Questions */}
        <FriendlyFaq />

        {/* Simple & Friendly Consultation / Booking Form */}
        <FriendlyBooking selectedTier={selectedTier} />
      </main>

      {/* 3. Clean, Professional Footer */}
      <FriendlyFooter />

    </div>
  );
}
