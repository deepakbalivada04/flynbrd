import React, { useState, useEffect } from 'react';
import { Bot, ArrowRight, Menu, X } from 'lucide-react';

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
          ? 'bg-[#F6F0E4]/95 backdrop-blur-md border-b border-[#DCCFB6] shadow-soft'
          : 'bg-[#F6F0E4]/85 backdrop-blur-sm border-b border-[#DCCFB6]/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#5E1F1C] border border-[#DCCFB6] flex items-center justify-center text-[#F6F0E4] shadow-soft group-hover:bg-[#C98A22] transition-colors">
            <Bot className="w-5 h-5 stroke-[1.5]" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xl font-serif font-semibold tracking-tight text-[#2A2320] leading-none">
              Flyinbird <span className="font-serif italic text-[#C98A22]">AI</span>
            </span>
            <span className="label-mono text-[10px] text-[#1F4236] mt-1">
              AI & Robotics Workshops · Learning Platform
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#2A2320]">
          <button
            type="button"
            onClick={() => scrollTo('why-we-exist')}
            className="hover:text-[#C98A22] transition-colors cursor-pointer"
          >
            Why We Exist
          </button>
          <button
            type="button"
            onClick={() => scrollTo('how-it-works')}
            className="hover:text-[#C98A22] transition-colors cursor-pointer"
          >
            Our Approach
          </button>
          <button
            type="button"
            onClick={() => scrollTo('projects')}
            className="hover:text-[#C98A22] transition-colors cursor-pointer"
          >
            The Four Projects
          </button>
          <button
            type="button"
            onClick={() => scrollTo('learning-system')}
            className="hover:text-[#C98A22] transition-colors cursor-pointer"
          >
            Learning System
          </button>
          <button
            type="button"
            onClick={() => scrollTo('faq')}
            className="hover:text-[#C98A22] transition-colors cursor-pointer"
          >
            FAQ
          </button>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-[#2A2320] hover:bg-[#EFE6D3] transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 stroke-[1.5]" /> : <Menu className="w-6 h-6 stroke-[1.5]" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F6F0E4] border-b border-[#DCCFB6] px-6 py-6 flex flex-col gap-4 text-base font-medium text-[#2A2320] shadow-soft">
          <button
            type="button"
            onClick={() => scrollTo('why-we-exist')}
            className="text-left py-2 hover:text-[#C98A22] transition-colors cursor-pointer"
          >
            Why We Exist
          </button>
          <button
            type="button"
            onClick={() => scrollTo('how-it-works')}
            className="text-left py-2 hover:text-[#C98A22] transition-colors cursor-pointer"
          >
            Our Approach
          </button>
          <button
            type="button"
            onClick={() => scrollTo('projects')}
            className="text-left py-2 hover:text-[#C98A22] transition-colors cursor-pointer"
          >
            The Four Projects
          </button>
          <button
            type="button"
            onClick={() => scrollTo('learning-system')}
            className="text-left py-2 hover:text-[#C98A22] transition-colors cursor-pointer"
          >
            Learning System
          </button>
          <button
            type="button"
            onClick={() => scrollTo('faq')}
            className="text-left py-2 hover:text-[#C98A22] transition-colors cursor-pointer"
          >
            FAQ
          </button>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="btn-primary-oxblood w-full py-3 text-sm cursor-pointer"
            >
              <span>Book a School Walkthrough</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}