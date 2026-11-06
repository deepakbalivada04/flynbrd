import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ArrowRight, BookOpen, CheckCircle2, ChevronRight, 
  Layers, Sparkles, Compass, ShieldCheck, GraduationCap, 
  Calendar, Award, Check
} from 'lucide-react';
import FriendlyNavbar from '../components/friendly/FriendlyNavbar';
import FriendlyFooter from '../components/friendly/FriendlyFooter';
import FadeIn from '../components/common/FadeIn';
import { MASTER_TRACKS, GRADE_TIERS, getTrackBySlugOrId } from '../data/curriculumData';

export default function TrackDetailPage() {
  const { trackId } = useParams();
  const navigate = useNavigate();

  // Selected grade tier filter ('all', 'tier-1', 'tier-2', 'tier-3')
  const [selectedTier, setSelectedTier] = useState('all');

  // Find track by id or slug
  const track = useMemo(() => {
    return getTrackBySlugOrId(trackId) || MASTER_TRACKS[0];
  }, [trackId]);

  // Scroll to top on load or route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedTier('all');
  }, [trackId]);

  // Filtered tiers for the selected tab
  const displayTiers = useMemo(() => {
    if (!track) return [];
    if (selectedTier === 'all') return track.tiers;
    return track.tiers.filter((t) => t.tierId === selectedTier);
  }, [track, selectedTier]);

  // Calculate total modules and chapters for this track
  const stats = useMemo(() => {
    if (!track) return { totalModules: 0, totalChapters: 0 };
    let totalModules = 0;
    let totalChapters = 0;
    track.tiers.forEach((t) => {
      totalModules += t.modules.length;
      t.modules.forEach((m) => {
        totalChapters += m.chapters.length;
      });
    });
    return { totalModules, totalChapters };
  }, [track]);

  // Other tracks for quick switching
  const otherTracks = useMemo(() => {
    return MASTER_TRACKS.filter((t) => t.id !== track?.id);
  }, [track]);

  const handleBookWalkthrough = () => {
    navigate('/', { state: { bookingTier: track?.title || 'School STEM Residency' } });
  };

  if (!track) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold mb-4">Track Not Found</h1>
        <Link to="/learning-paths" className="text-blue-600 hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Return to Learning Paths
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-[#EE7819] selection:text-white">
      
      {/* Top Navbar */}
      <FriendlyNavbar onBookClick={handleBookWalkthrough} />

      <main className="pt-20">
        
        {/* LIGHT THEME HERO SECTION WITH RESPECITVE THEMATIC BACKGROUND FADE */}
        <section className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-white via-slate-50 to-slate-50 py-14 sm:py-20">
          
          {/* Dedicated Thematic Background Image with Soft Light Fade */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img 
              src={track.bgImage} 
              alt={track.title}
              className="w-full h-full object-cover object-center filter saturate-105 opacity-15"
            />
            {/* Soft gradient wash so dark text is 100% crisp and readable */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/40 to-transparent" />
            
            {/* Subtle accent color wash */}
            <div 
              className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none"
              style={{ backgroundColor: track.themeColor }}
            />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
              
              {/* Left Column: Information */}
              <div className="flex-1 max-w-3xl">
                
                {/* Breadcrumb Navigation */}
                <nav className="mb-6 flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500">
                  <Link to="/" className="hover:text-[#2576BC] transition-colors">Home</Link>
                  <span className="text-slate-400">/</span>
                  <Link to="/learning-paths" className="hover:text-[#2576BC] transition-colors flex items-center gap-1">
                    <span>Learning Paths</span>
                  </Link>
                  <span className="text-slate-400">/</span>
                  <span className="text-slate-800 font-semibold truncate max-w-[200px] sm:max-w-none">{track.title}</span>
                </nav>

                {/* Discipline Tag & Brand Pill */}
                <div className="flex flex-wrap items-center gap-2.5 mb-5">
                  <span 
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase text-white shadow-xs"
                    style={{ backgroundColor: track.themeColor }}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    {track.shortTitle || track.title}
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-xs">
                    <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
                    Grades 3 to 12
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-xs">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    {stats.totalModules} Modules • {stats.totalChapters} Chapters
                  </span>
                </div>

                {/* Main Title */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight mb-4">
                  {track.title}
                </h1>

                {/* Tagline / Subtitle */}
                <p className="text-base sm:text-lg text-slate-700 font-semibold max-w-2xl leading-relaxed mb-4">
                  {track.tagline}
                </p>

                {/* Summary */}
                <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed mb-6">
                  {track.summary}
                </p>

                {/* Discipline Focus Pills */}
                <div className="flex flex-wrap items-center gap-2 mb-8">
                  <span className="text-xs font-bold text-slate-400 mr-1">Core Competencies:</span>
                  {track.disciplines.map((d, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-xs"
                    >
                      {d}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={handleBookWalkthrough}
                    className="px-6 py-3.5 rounded-full font-bold text-sm text-white shadow-md transition-all flex items-center gap-2 cursor-pointer hover:opacity-95 hover:scale-[1.02] active:scale-100"
                    style={{ backgroundColor: track.themeColor }}
                  >
                    <span>Book School Walkthrough for this Track</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <Link
                    to="/learning-paths"
                    className="px-5 py-3.5 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-sm font-semibold text-slate-700 hover:text-slate-900 shadow-xs transition-all flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>View All 9 Tracks</span>
                  </Link>
                </div>

              </div>

              {/* Right Column: Visual Themed Showcase Card */}
              <div className="w-full lg:w-96 shrink-0">
                <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xl group">
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100">
                    <img 
                      src={track.bgImage} 
                      alt={track.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                    
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span 
                        className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider text-white shadow-sm inline-block mb-1.5"
                        style={{ backgroundColor: track.themeColor }}
                      >
                        {track.shortTitle}
                      </span>
                      <h4 className="text-base font-bold text-white line-clamp-1">
                        {track.title}
                      </h4>
                      <p className="text-xs text-slate-200 mt-0.5">
                        {stats.totalModules} Modules • {stats.totalChapters} Chapters
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* CURRICULUM SYLLABUS SECTION - LIGHT THEME */}
        <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
          <div className="max-w-6xl mx-auto">
            
            {/* Header with Tier Tabs */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 mb-3">
                  <Layers className="w-3.5 h-3.5 text-[#EE7819]" />
                  <span>Master Syllabus Structure</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Modules & Chapter Breakdown
                </h2>
                <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl">
                  Sequenced from foundational intuition (Grades 3–5) to production-grade engineering (Grades 11–12).
                </p>
              </div>

              {/* Tier Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 shadow-xs">
                {GRADE_TIERS.map((tier) => {
                  const isActive = selectedTier === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedTier(tier.id)}
                      className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                        isActive 
                          ? 'bg-slate-900 text-white shadow-xs' 
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                      }`}
                    >
                      <span>{tier.label}</span>
                      {tier.sublabel && (
                        <span className={`ml-1 text-[11px] opacity-80 ${isActive ? 'text-amber-300' : 'text-slate-500'}`}>
                          ({tier.sublabel})
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* TIERS AND MODULES LIST */}
            <div className="space-y-10">
              {displayTiers.map((tier) => (
                <div 
                  key={tier.tierId}
                  className="rounded-3xl bg-slate-50/80 border border-slate-200 p-6 sm:p-8 shadow-xs relative overflow-hidden"
                >
                  {/* Tier Accent Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-6">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-base shadow-sm"
                        style={{ backgroundColor: track.themeColor }}
                      >
                        {tier.tierId === 'tier-1' ? 'T1' : tier.tierId === 'tier-2' ? 'T2' : 'T3'}
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                          {tier.tierName}
                        </h3>
                        <p className="text-xs sm:text-sm font-medium text-slate-500">
                          Target Age: <span className="text-[#EE7819] font-bold">{tier.gradeLevel}</span> • {tier.modules.length} Core Modules
                        </p>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Certified Curriculum</span>
                    </div>
                  </div>

                  {/* Modules Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {tier.modules.map((mod) => (
                      <div 
                        key={mod.moduleNumber}
                        className="flex flex-col rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 p-5 transition-all hover:-translate-y-0.5 hover:shadow-md shadow-xs"
                      >
                        {/* Module Badge & Number */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span 
                            className="px-2.5 py-0.5 rounded text-[11px] font-black uppercase tracking-wider text-white"
                            style={{ backgroundColor: track.themeColor }}
                          >
                            Module {mod.moduleNumber}
                          </span>
                          <span className="text-[11px] text-slate-500 font-mono">
                            {mod.chapters.length} Chapters
                          </span>
                        </div>

                        {/* Module Title */}
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-4 line-clamp-2">
                          {mod.title}
                        </h4>

                        {/* Chapters List */}
                        <div className="space-y-2 mt-auto pt-3 border-t border-slate-100">
                          {mod.chapters.map((ch, chIdx) => (
                            <div key={chIdx} className="flex items-start gap-2 text-xs text-slate-600 leading-snug">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#EE7819] mt-1.5 shrink-0" />
                              <span>{ch}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              ))}
            </div>

            {/* CTA Box */}
            <div className="mt-14 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-8 sm:p-10 text-center relative overflow-hidden shadow-xl">
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ backgroundColor: track.themeColor }}
              />

              <div className="relative z-10 max-w-2xl mx-auto">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-semibold text-amber-300 mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Bring This Track To Your School
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                  Want to deploy the {track.shortTitle} syllabus?
                </h3>
                <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed">
                  Flyinbird delivers complete hardware kits, certified mentors, and interactive LMS software right into your classrooms across AP & Telangana.
                </p>
                <button
                  type="button"
                  onClick={handleBookWalkthrough}
                  className="px-8 py-3.5 rounded-full font-bold text-sm text-white shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer hover:opacity-95 hover:scale-105"
                  style={{ backgroundColor: track.themeColor }}
                >
                  <span>Book School Walkthrough</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* EXPLORE OTHER TRACKS (LIGHT THEME MINI-TILES) */}
        <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Explore Other Learning Paths
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  All 9 specialized STEM & hardware tracks available in our master syllabus.
                </p>
              </div>

              <Link 
                to="/learning-paths"
                className="text-xs sm:text-sm font-bold text-[#2576BC] hover:underline flex items-center gap-1 transition-colors"
              >
                <span>View All 9</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Other Tracks Mini Grid in Light Theme */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              {otherTracks.slice(0, 4).map((other) => (
                <Link
                  key={other.id}
                  to={`/learning-paths/${other.slug || other.id}`}
                  className="group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-slate-300 transition-all hover:-translate-y-1 shadow-xs hover:shadow-md text-left"
                >
                  {/* Respective Background Image with Fade */}
                  <div className="relative h-36 w-full overflow-hidden bg-slate-100">
                    <img 
                      src={other.bgImage} 
                      alt={other.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent pointer-events-none" />
                    
                    <span 
                      className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold text-white shadow-xs"
                      style={{ backgroundColor: other.themeColor }}
                    >
                      {other.shortTitle}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4 pt-1">
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#2576BC] transition-colors line-clamp-1 mb-1">
                      {other.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      {other.tagline}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </section>

      </main>

      {/* Footer */}
      <FriendlyFooter />

    </div>
  );
}