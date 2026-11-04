import React, { useState, useEffect } from 'react';

/**
 * VerticalDockedNav
 * 
 * Recreates the right-hand docked navigation menu from the user's reference image:
 * - Clean line-art icons with golden accent highlights
 * - Section tracking with smooth active states
 * - Direct one-click smooth scroll to any section
 */
export default function VerticalDockedNav({ onNavigate }) {
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    {
      id: 'hero',
      label: 'Launchpad',
      sub: 'Overview',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4.5c1.62-1.63 5-2 5-2" />
          <path d="M12 15v5s3.03-.55 4.5-2c1.63-1.62 2-5 2-5" />
        </svg>
      ),
    },
    {
      id: 'curriculum-section',
      label: 'Curriculum',
      sub: '3-Tier Levels',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
      ),
    },
    {
      id: 'metrics-section',
      label: 'Milestones',
      sub: 'Achievements',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="m22 7-8.5 8.5-5-5L2 17" />
          <path d="M16 7h6v6" />
        </svg>
      ),
    },
    {
      id: 'hardware-section',
      label: 'Hardware',
      sub: 'Tactile Kits',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="10" />
          <path d="m4.93 4.93 4.24 4.24" />
          <path d="m14.83 9.17 4.24-4.24" />
          <path d="m14.83 14.83 4.24 4.24" />
          <path d="m9.17 14.83-4.24 4.24" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      ),
    },
    {
      id: 'whyus-section',
      label: 'Why Us',
      sub: 'Zero Burden',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M12 8v8" />
          <path d="M8 12h8" />
        </svg>
      ),
    },
    {
      id: 'terminal-booking',
      label: 'Terminal',
      sub: 'Dispatch',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="m7 8 4 4-4 4" />
          <path d="M13 16h4" />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i];
        if (item.id === 'hero') {
          if (window.scrollY < 400) {
            setActiveSection('hero');
            break;
          }
        } else {
          const el = document.getElementById(item.id);
          if (el && el.offsetTop <= scrollPos) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (id) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <aside
      aria-label="Section Navigation"
      className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-2.5 py-4 px-3 rounded-2xl bg-black/85 border border-white/10 backdrop-blur-xl shadow-[0_16px_36px_rgba(0,0,0,0.8)]"
    >
      {navItems.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={`group flex items-center justify-between gap-3 px-3 py-2 rounded-xl transition-all duration-300 text-left ${
              isActive
                ? 'bg-white/10 text-white shadow-sm border border-white/15'
                : 'text-stone-400 hover:text-stone-200 hover:bg-white/[0.04]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span
                className={`transition-colors duration-300 ${
                  isActive ? 'text-amber-400' : 'text-stone-400 group-hover:text-amber-300'
                }`}
              >
                {item.icon}
              </span>
              <span className="text-xs font-mono font-medium tracking-wide">
                {item.label}
              </span>
            </div>

            {/* Glowing Active Indicator */}
            <span
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-amber-400 shadow-[0_0_8px_#facc15]'
                  : 'bg-transparent group-hover:bg-white/20'
              }`}
            />
          </button>
        );
      })}
    </aside>
  );
}

