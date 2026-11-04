import React from 'react';
import { Bot, Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';

export default function FriendlyFooter() {
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Mission */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-indigo-500 flex items-center justify-center text-white shadow-md">
                <Bot className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold font-display text-white tracking-tight">
                Flyinbird <span className="text-indigo-400">AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mb-6">
              Turnkey AI and robotics workshops empowering elementary, middle, and high schools across the country with inspiring hands-on STEM education.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-3 py-1.5 rounded-full">
              <ShieldCheck className="w-4 h-4" />
              <span>District Approved & Fully Insured Provider</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-bold font-display uppercase tracking-wider text-white mb-4">
              Explore Programs
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button onClick={() => scrollTo('programs')} className="hover:text-white transition-colors">
                  Level 1: Motors & Circuits (3–5)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('programs')} className="hover:text-white transition-colors">
                  Level 2: AI Logic & Sonar (6–8)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('programs')} className="hover:text-white transition-colors">
                  Level 3: Vision & Edge AI (9–12)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('how-it-works')} className="hover:text-white transition-colors">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('hardware')} className="hover:text-white transition-colors">
                  Mobile Lab Kits
                </button>
              </li>
            </ul>
          </div>

          {/* District Support */}
          <div className="md:col-span-4">
            <h4 className="text-sm font-bold font-display uppercase tracking-wider text-white mb-4">
              District Partnerships
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>partnerships@flyinbird.ai</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>(800) 594-STEM (7836)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>Serving School Districts Nationwide</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Flyinbird AI Education Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>NGSS & CSTA Benchmarked</span>
            <span>FERPA / COPPA Compliant</span>
            <span>Title I & CTE Eligible</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

