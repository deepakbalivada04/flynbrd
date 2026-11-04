import React from 'react';

/**
 * Footer
 * 
 * Minimalist vector line-art engineering footer:
 * - Pure black canvas with 1px border
 * - Quick section jumps, compliance certifications, and legal specifications
 * - Back-to-top rocket trigger
 */
export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-black text-white border-t border-white/10 px-6 sm:px-12 lg:px-16 py-16 text-xs font-mono">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Col 1: Brand & Identity */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-3">
              <svg className="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" fill="#facc15" stroke="#ffffff" />
                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" stroke="#ffffff" />
              </svg>
              <span className="font-display font-extrabold text-sm tracking-widest uppercase text-white">
                FLYINBIRD // AI & ROBOTICS
              </span>
            </div>
            <p className="text-stone-400 text-xs font-sans max-w-sm leading-relaxed mb-6">
              Hands-on AI and robotics experiential e-learning for elementary, middle, and high schools. Standards-aligned turnkey engineering pedagogy.
            </p>
            <div className="text-[11px] text-amber-400 font-mono">
              SYSTEM DISPATCH: +1 (800) 582-ROBO
            </div>
          </div>

          {/* Col 2: Compliance Specs */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-[10px] text-stone-400 block tracking-widest uppercase font-bold mb-3">
              // EDUCATIONAL STANDARDS
            </span>
            <div className="text-stone-300">NGSS Standards Aligned</div>
            <div className="text-stone-300">CSTA K-12 CS Benchmarks</div>
            <div className="text-stone-300">FERPA & COPPA Certified</div>
            <div className="text-stone-300">Livescan Background Cleared</div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="md:col-span-4 space-y-2 text-left md:text-right">
            <span className="text-[10px] text-stone-400 block tracking-widest uppercase font-bold mb-3">
              // ARCHITECTURE JUMPS
            </span>
            <div>
              <button
                onClick={() => {
                  const el = document.getElementById('curriculum-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-stone-300 hover:text-amber-400 transition-colors"
              >
                Curriculum Tiers [01-03]
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  const el = document.getElementById('hardware-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-stone-300 hover:text-amber-400 transition-colors"
              >
                Hardware Lab Kits [01-04]
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  const el = document.getElementById('terminal-booking');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-amber-400 hover:underline"
              >
                Launch Command Terminal →
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Back to Top Trigger */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-stone-400">
          <div>
            INSPIRED BY THE CELESTIAL VECTOR ROCKET LAUNCH SYSTEM. CLEAN, HIGH-CONTRAST PRECISION.
          </div>
          <div className="flex items-center gap-6">
            <span>© {new Date().getFullYear()} FLYINBIRD TECHNOLOGIES INC.</span>
            <button
              onClick={scrollToTop}
              className="text-amber-400 hover:text-white transition-colors flex items-center gap-1 uppercase tracking-wider font-bold"
            >
              <span>Back to Launch</span>
              <span>↑</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
