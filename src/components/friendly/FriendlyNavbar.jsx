import React, { useState, useEffect } from 'react';
import { Bot, ArrowRight, Menu, X, Sparkles } from 'lucide-react';

export default function FriendlyNavbar({ onBookClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm'
          : 'bg-white/70 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
            <Bot className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold font-display tracking-tight text-slate-900 leading-none">
              Flyinbird <span className="text-indigo-600">AI</span>
            </span>
            <span className="text-[11px] font-medium text-slate-500 mt-1">
              K-12 Robotics & AI Workshops
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <button
            onClick={() => scrollTo('programs')}
            className="hover:text-indigo-600 transition-colors"
          >
            Programs
          </button>
          <button
            onClick={() => scrollTo('how-it-works')}
            className="hover:text-indigo-600 transition-colors"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollTo('why-us')}
            className="hover:text-indigo-600 transition-colors"
          >
            Why Schools Love Us
          </button>
          <button
            onClick={() => scrollTo('hardware')}
            className="hover:text-indigo-600 transition-colors"
          >
            Hardware Kits
          </button>
          <button
            onClick={() => scrollTo('faq')}
            className="hover:text-indigo-600 transition-colors"
          >
            FAQ
          </button>
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={onBookClick}
            className="px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-100 hover:shadow-indigo-200 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
          >
            <span>Book a Demo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-6 flex flex-col gap-4 text-base font-semibold text-slate-700 shadow-xl">
          <button
            onClick={() => scrollTo('programs')}
            className="text-left py-2 hover:text-indigo-600 transition-colors"
          >
            Programs
          </button>
          <button
            onClick={() => scrollTo('how-it-works')}
            className="text-left py-2 hover:text-indigo-600 transition-colors"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollTo('why-us')}
            className="text-left py-2 hover:text-indigo-600 transition-colors"
          >
            Why Schools Love Us
          </button>
          <button
            onClick={() => scrollTo('hardware')}
            className="text-left py-2 hover:text-indigo-600 transition-colors"
          >
            Hardware Kits
          </button>
          <button
            onClick={() => scrollTo('faq')}
            className="text-left py-2 hover:text-indigo-600 transition-colors"
          >
            FAQ
          </button>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="w-full py-3 rounded-full bg-indigo-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md"
            >
              <span>Book a Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

