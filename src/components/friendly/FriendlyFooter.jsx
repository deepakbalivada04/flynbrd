import React from 'react';
import { Bot, Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';
import content from '../../content/content.json';

export default function FriendlyFooter() {
  const { email, phone, cities, copyright } = content.footer;

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#1F4236] text-[#F6F0E4] py-16 border-t border-[#DCCFB6]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#DCCFB6]/20">
          
          {/* Brand & Mission */}
          <div className="md:col-span-5 flex flex-col items-start text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#C98A22] flex items-center justify-center text-[#1F4236] shadow-soft">
                <Bot className="w-5 h-5 stroke-[1.5]" />
              </div>
              <span className="text-xl font-serif font-semibold text-[#F6F0E4] tracking-tight">
                Flyinbird <span className="font-serif italic text-[#C98A22]">AI</span>
              </span>
            </div>
            <p className="body-editorial-light text-sm leading-relaxed mb-6">
              Hands-on AI and robotics workshops paired with our dedicated learning management system, educating school children across Andhra Pradesh and Telangana to understand and build AI differently.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#C98A22] bg-[#17332A] border border-[#DCCFB6]/20 px-3 py-1.5 rounded-full">
              <ShieldCheck className="w-4 h-4 stroke-[1.5]" />
              <span>NEP 2020 Aligned · Verified Instructors</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 text-left">
            <h4 className="label-mono-light mb-4 text-[#C98A22]">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-[#F6F0E4]/75">
              <li>
                <button 
                  type="button"
                  onClick={() => scrollTo('why-we-exist')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Why We Exist
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => scrollTo('how-it-works')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Approach
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => scrollTo('projects')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  The Four Projects
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => scrollTo('learning-system')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Learning System
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => scrollTo('faq')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Regional Support & Contacts */}
          <div className="md:col-span-4 text-left">
            <h4 className="label-mono-light mb-4 text-[#C98A22]">
              Founding Campus Walkthroughs
            </h4>
            <ul className="space-y-3 text-sm text-[#F6F0E4]/75">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C98A22] shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                  {email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C98A22] shrink-0" />
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                  {phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C98A22] shrink-0 mt-0.5" />
                <span>{cities}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F6F0E4]/60 gap-4 font-mono">
          <p>{copyright}</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs uppercase tracking-wider">
            <span>NEP 2020 Aligned</span>
            <span>Instructors Verified</span>
            <span>Data Stays Offline</span>
          </div>
        </div>

      </div>
    </footer>
  );
}