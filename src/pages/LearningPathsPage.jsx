import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, X, BookOpen, Cpu, Sparkles, ArrowRight, ArrowLeft,
  GraduationCap, Layers, Compass, CheckCircle2, ChevronRight,
  Filter
} from 'lucide-react';
import { MASTER_TRACKS, GRADE_TIERS } from '../data/curriculumData';
import FriendlyNavbar from '../components/friendly/FriendlyNavbar';
import FriendlyFooter from '../components/friendly/FriendlyFooter';
import FadeIn from '../components/common/FadeIn';

export default function LearningPathsPage() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filtered tracks based on search query and grade tier
  const filteredTracks = useMemo(() => {
    return MASTER_TRACKS.filter((track) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery = !q || (
        track.title.toLowerCase().includes(q) ||
        track.tagline.toLowerCase().includes(q) ||
        track.summary.toLowerCase().includes(q) ||
        track.disciplines.some((d) => d.toLowerCase().includes(q)) ||
        track.tiers.some((tier) => 
          tier.tierName.toLowerCase().includes(q) ||
          tier.modules.some((m) => 
            m.title.toLowerCase().includes(q) ||
            m.chapters.some((c) => c.toLowerCase().includes(q))
          )
        )
      );

      const matchesGrade = selectedGrade === 'all' || track.tiers.some((t) => t.tierId === selectedGrade);

      return matchesQuery && matchesGrade;
    });
  }, [searchQuery, selectedGrade]);

  const handleBookWalkthrough = () => {
    navigate('/', { state: { scrollToBooking: true } });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-[#EE7819] selection:text-white">
      
      {/* Top Navbar */}
      <FriendlyNavbar onBookClick={handleBookWalkthrough} />

      <main className="pt-20 pb-20">
        
        {/* LIGHT PAGE HERO SECTION */}
        <div className="relative overflow-hidden py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 bg-gradient-to-b from-white via-slate-50 to-slate-50">
          
          {/* Ambient Glows using text_logo.png colors */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-20 blur-3xl -z-10">
            <div className="absolute top-4 left-10 w-72 h-72 rounded-full bg-[#1D9D53]" />
            <div className="absolute top-10 left-1/3 w-80 h-80 rounded-full bg-[#533788]" />
            <div className="absolute top-4 right-1/4 w-72 h-72 rounded-full bg-[#D4252A]" />
            <div className="absolute top-12 right-10 w-64 h-64 rounded-full bg-[#EE7819]" />
          </div>

          <div className="max-w-6xl mx-auto text-left">
            
            {/* Breadcrumb / Back Link */}
            <div className="mb-6 flex items-center gap-2 text-xs font-medium text-slate-500">
              <Link to="/" className="hover:text-[#2576BC] flex items-center gap-1 transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Home</span>
              </Link>
              <span>/</span>
              <span className="text-slate-800 font-semibold">Learning Paths</span>
            </div>

            {/* Pill with Logo Colors */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-xs sm:text-sm font-semibold mb-6 shadow-xs">
              <div className="flex items-center gap-1 shrink-0" aria-hidden="true">
                <span className="w-2 h-2 rounded-full bg-[#D4252A]" />
                <span className="w-2 h-2 rounded-full bg-[#EE7819]" />
                <span className="w-2 h-2 rounded-full bg-[#1D9D53]" />
                <span className="w-2 h-2 rounded-full bg-[#2576BC]" />
                <span className="w-2 h-2 rounded-full bg-[#533788]" />
              </div>
              <span className="text-slate-800 font-medium">Next-Gen Tech Academy • 9 Disciplines Master Syllabus</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight mb-4 max-w-4xl">
              Explore Our <br />
              <span className="bg-gradient-to-r from-[#EE7819] via-[#D4252A] via-[#1D9D53] via-[#2576BC] to-[#533788] bg-clip-text text-transparent">
                STEM & Robotics Learning Paths
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mb-8">
              Click any track tile below to explore the complete chapter-by-chapter syllabus, hardware kits, and grade-appropriate modules from Explorers (Grades 3–5) to Engineers (Grades 11–12).
            </p>

            {/* Controls: Search & Grade Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between pt-2">
              
              {/* Search Box */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tracks, modules, e.g. 'Space', '3D', 'Neural', 'PCB'..."
                  className="w-full pl-10 pr-10 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2576BC] focus:ring-2 focus:ring-[#2576BC]/20 shadow-xs transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Grade Tier Quick Selectors */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white border border-slate-200 shadow-xs">
                {GRADE_TIERS.map((tier) => {
                  const isActive = selectedGrade === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedGrade(tier.id)}
                      className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#EE7819] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      {tier.label}
                      {tier.sublabel && (
                        <span className={`ml-1 text-[11px] opacity-90 ${isActive ? 'text-amber-100' : 'text-slate-500'}`}>
                          ({tier.sublabel})
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

            </div>

          </div>
        </div>

        {/* TILES UI: LIGHT THEME CARDS WITH FADED THEMED IMAGES */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
          
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#EE7819]" />
              <span>Available Learning Paths ({filteredTracks.length})</span>
            </h2>
            <span className="text-xs text-slate-500 font-medium">Click any tile to open its syllabus & modules</span>
          </div>

          {filteredTracks.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-xs">
              <Search className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-800 font-semibold text-lg">No learning paths found</p>
              <p className="text-slate-500 text-sm mt-1">Try adjusting your search query or grade tier filter.</p>
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setSelectedGrade('all'); }}
                className="mt-4 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTracks.map((track) => {
                // Calculate module and chapter stats
                let totalModules = 0;
                let totalChapters = 0;
                track.tiers.forEach((t) => {
                  totalModules += t.modules.length;
                  t.modules.forEach((m) => {
                    totalChapters += m.chapters.length;
                  });
                });

                return (
                  <Link
                    key={track.id}
                    to={`/learning-paths/${track.slug || track.id}`}
                    className="group relative flex flex-col rounded-3xl overflow-hidden bg-white border border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow-xl hover:shadow-slate-200 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer text-left"
                  >
                    {/* Themed Image Area with Smooth Fade into White Body */}
                    <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                      <img 
                        src={track.bgImage} 
                        alt={track.title}
                        className="w-full h-full object-cover object-center filter saturate-105 brightness-[0.95] group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      
                      {/* Top dark gradient vignette for pill legibility */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />

                      {/* Bottom smooth fade to card body white */}
                      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/60 to-transparent pointer-events-none" />

                      {/* Floating Badges on Image */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                        <span 
                          className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-md backdrop-blur-md"
                          style={{ backgroundColor: track.themeColor }}
                        >
                          {track.shortTitle || track.title}
                        </span>

                        <span className="text-[11px] font-semibold text-slate-800 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/80 shadow-xs">
                          {totalModules} Modules
                        </span>
                      </div>
                    </div>

                    {/* Light Content Body */}
                    <div className="flex flex-col flex-1 p-6 pt-2 text-slate-900 bg-white">
                      
                      {/* Title */}
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#2576BC] transition-colors tracking-tight leading-snug mb-2">
                        {track.title}
                      </h3>

                      {/* Tagline */}
                      <p className="text-xs sm:text-sm font-semibold text-slate-700 line-clamp-2 mb-2 leading-relaxed">
                        {track.tagline}
                      </p>

                      {/* Summary */}
                      <p className="text-xs text-slate-500 line-clamp-3 mb-5 leading-relaxed">
                        {track.summary}
                      </p>

                      {/* Bottom Footer Section on the Tile */}
                      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                        
                        {/* Grade coverage badges */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-semibold text-slate-400">Tiers:</span>
                          <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200/60">3-5</span>
                          <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200/60">6-10</span>
                          <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200/60">11-12</span>
                        </div>

                        {/* Action link */}
                        <span className="text-xs font-bold text-[#EE7819] group-hover:text-[#2576BC] flex items-center gap-1 group-hover:translate-x-1 transition-all">
                          <span>View Modules</span>
                          <ChevronRight className="w-4 h-4" />
                        </span>

                      </div>

                    </div>
                  </Link>
                );
              })}
            </div>
          )}

        </div>

      </main>

      {/* Footer */}
      <FriendlyFooter />

    </div>
  );
}