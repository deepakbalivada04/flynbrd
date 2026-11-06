import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import content from '../../content/content.json';
import faviconImg from '../../assets/favicon.png';
import textLogoImg from '../../assets/text_logo.png';

export default function FriendlyFooter() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLearningPathsPage = location.pathname === '/learning-paths';
  const { email, phone, cities, copyright } = content.footer;

  const scrollTo = (id) => {
    if (isLearningPathsPage) {
      navigate('/', { state: { scrollToId: id } });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Mission with Assets */}
          <div className="md:col-span-5 flex flex-col items-start text-left">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-white p-1.5 flex items-center justify-center shadow-md shrink-0">
                <img src={faviconImg} alt="Flyinbird Mascot" className="w-full h-full object-contain" />
              </div>
              <div className="bg-white px-3 py-1.5 rounded-2xl shadow-md">
                <img src={textLogoImg} alt="Flyinbird AI" className="h-6 w-auto object-contain" />
              </div>
            </div>
            
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Hands-on AI and robotics school workshops paired with our interactive learning management system, educating school children across Andhra Pradesh and Telangana to build real technology.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#2576BC] bg-slate-800/90 border border-slate-700/80 px-3.5 py-1.5 rounded-full">
              <ShieldCheck className="w-4 h-4 text-[#1D9D53] stroke-[1.5]" />
              <span>NEP 2020 Aligned · Verified STEM Instructors</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 text-left">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#2576BC] font-semibold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
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
                <Link
                  to="/learning-paths"
                  className="text-white hover:text-[#2576BC] font-bold transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#533788]" />
                  <span>Learning Paths & Curriculum</span>
                </Link>
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
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#2576BC] font-semibold mb-4">
              Founding Campus Walkthroughs
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                  {email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                  {phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{cities}</span>
              </li>
            </ul>

            <div className="mt-6 pt-6 border-t border-slate-800">
              <button
                type="button"
                onClick={() => scrollTo('booking')}
                className="px-5 py-2.5 rounded-full bg-[#EE7819] hover:bg-[#d86b14] text-white text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-2 shadow-md shadow-[#EE7819]/20 transition-all"
              >
                <span>Book Campus Walkthrough</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 font-mono">
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
