import React from 'react';
import { Bot, Shield, ChevronUp } from 'lucide-react';

export default function Footer({ onScrollTop }) {
  return (
    <footer className="relative border-t border-white/10 bg-black/80 backdrop-blur-md py-12 px-4 sm:px-8 lg:px-16 text-stone-400 text-xs">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand and Mission */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 font-display text-white font-bold text-base">
            <Bot className="w-5 h-5 text-cyan-400" />
            FLYINBIRD AI & ROBOTICS
          </div>
          <span className="hidden sm:inline text-stone-600">|</span>
          <div>
            Transforming K-12 STEM education through experiential engineering workshops.
          </div>
        </div>

        {/* District Compliance and Security Note */}
        <div className="flex items-center gap-2 text-stone-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span>FERPA & COPPA Compliant • Fully Insured</span>
        </div>

        {/* Copyright & Back to Top */}
        <div className="flex items-center gap-4">
          <div>© {new Date().getFullYear()} Flyinbird Inc. All rights reserved.</div>
          <button
            onClick={onScrollTop}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Back to Top"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}

