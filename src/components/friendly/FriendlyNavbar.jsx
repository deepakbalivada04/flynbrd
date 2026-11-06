import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ArrowRight, Menu, X, Sparkles } from 'lucide-react';
import textLogoImg from '../../assets/text_logo.png';

export default function FriendlyNavbar({ onBookClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isNotHome = location.pathname !== '/';
  const isLearningPathsActive = location.pathname.startsWith('/learning-paths');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    if (isNotHome) {
      navigate('/', { state: { scrollToId: id } });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogoClick = () => {
    if (isNotHome) {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm'
          : 'bg-white/85 backdrop-blur-sm border-b border-slate-200/60'
        }`}
    >
      {/* Expanded navbar container with comfortable padding so logo is not too far left */}
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 h-20 flex items-center justify-between gap-4">

        {/* Brand Logo - ONLY text_logo.png, no text, no favicon */}
        <div
          onClick={handleLogoClick}
          className="flex items-center cursor-pointer group py-1 select-none shrink-0"
        >
          <img
            src={textLogoImg}
            alt="Flyinbird AI"
            className="h-9 sm:h-10 md:h-11 w-auto object-contain object-left transition-transform group-hover:scale-[1.02]"
          />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            type="button"
            onClick={() => handleNavClick('why-we-exist')}
            className="hover:text-[#2576BC] transition-colors cursor-pointer"
          >
            Why We Exist
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('how-it-works')}
            className="hover:text-[#2576BC] transition-colors cursor-pointer"
          >
            Our Approach
          </button>

          {/* Dedicated Learning Paths Link */}
          <Link
            to="/learning-paths"
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold transition-all ${isLearningPathsActive
                ? 'bg-[#EE7819] text-white shadow-sm'
                : 'bg-slate-100/80 text-slate-800 hover:text-[#EE7819] border border-slate-200 shadow-xs'
              }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${isLearningPathsActive ? 'text-white' : 'text-[#EE7819]'}`} />
            <span>Learning Paths</span>
          </Link>

          <button
            type="button"
            onClick={() => handleNavClick('projects')}
            className="hover:text-[#2576BC] transition-colors cursor-pointer"
          >
            Projects
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('learning-system')}
            className="hover:text-[#2576BC] transition-colors cursor-pointer"
          >
            Learning System
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('faq')}
            className="hover:text-[#2576BC] transition-colors cursor-pointer"
          >
            FAQ
          </button>
        </nav>

        {/* Right CTA Button - Styled in warm Logo Orange */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onBookClick}
            className="px-5 py-2.5 rounded-full bg-[#EE7819] hover:bg-[#d86b14] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md shadow-[#EE7819]/25 hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Book Walkthrough</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 stroke-[1.5]" /> : <Menu className="w-6 h-6 stroke-[1.5]" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 flex flex-col gap-3 text-base font-medium text-slate-700 shadow-xl">
          <button
            type="button"
            onClick={() => handleNavClick('why-we-exist')}
            className="text-left py-2 hover:text-[#2576BC] transition-colors cursor-pointer"
          >
            Why We Exist
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('how-it-works')}
            className="text-left py-2 hover:text-[#2576BC] transition-colors cursor-pointer"
          >
            Our Approach
          </button>
          <Link
            to="/learning-paths"
            onClick={() => setMobileMenuOpen(false)}
            className="text-left py-2 text-[#2576BC] font-bold flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#533788]" />
            <span>Dedicated Learning Paths Page</span>
          </Link>
          <button
            type="button"
            onClick={() => handleNavClick('projects')}
            className="text-left py-2 hover:text-[#2576BC] transition-colors cursor-pointer"
          >
            The Four Projects
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('learning-system')}
            className="text-left py-2 hover:text-[#2576BC] transition-colors cursor-pointer"
          >
            Learning System
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('faq')}
            className="text-left py-2 hover:text-[#2576BC] transition-colors cursor-pointer"
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
              className="w-full py-3 rounded-full bg-[#EE7819] hover:bg-[#d86b14] text-white font-bold text-sm cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-[#EE7819]/25"
            >
              <span>Book a School Walkthrough</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
