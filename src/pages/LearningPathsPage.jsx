import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, X, BookOpen, Cpu, Sparkles, ArrowRight, ArrowLeft,
  Clock, Award, Layers, Bot, Compass, CheckCircle2, ChevronRight
} from 'lucide-react';
import { LEARNING_PATHS } from '../data/learningPaths';
import FriendlyNavbar from '../components/friendly/FriendlyNavbar';
import FriendlyFooter from '../components/friendly/FriendlyFooter';
import FadeIn from '../components/common/FadeIn';

// Color themes for different disciplines - strictly using colors from text_logo.png
const CATEGORY_THEMES = {
  robotics: {
    badge: 'bg-[#1D9D53] text-white',
    pill: 'bg-[#1D9D53]/10 text-[#1D9D53] border-[#1D9D53]/20',
    borderHover: 'hover:border-[#1D9D53]',
    iconColor: 'text-[#1D9D53]',
    btnBg: 'bg-[#1D9D53] hover:bg-[#168143] text-white',
    shadow: 'shadow-[#1D9D53]/20',
    gradient: 'from-[#1D9D53]/10 via-transparent to-transparent',
    dot: 'bg-[#1D9D53]',
  },
  ai: {
    badge: 'bg-[#533788] text-white',
    pill: 'bg-[#533788]/10 text-[#533788] border-[#533788]/20',
    borderHover: 'hover:border-[#533788]',
    iconColor: 'text-[#533788]',
    btnBg: 'bg-[#533788] hover:bg-[#432c6e] text-white',
    shadow: 'shadow-[#533788]/20',
    gradient: 'from-[#533788]/10 via-transparent to-transparent',
    dot: 'bg-[#533788]',
  },
  coding: {
    badge: 'bg-[#2576BC] text-white',
    pill: 'bg-[#2576BC]/10 text-[#2576BC] border-[#2576BC]/20',
    borderHover: 'hover:border-[#2576BC]',
    iconColor: 'text-[#2576BC]',
    btnBg: 'bg-[#2576BC] hover:bg-[#1d63a0] text-white',
    shadow: 'shadow-[#2576BC]/20',
    gradient: 'from-[#2576BC]/10 via-transparent to-transparent',
    dot: 'bg-[#2576BC]',
  },
  space: {
    badge: 'bg-[#D4252A] text-white',
    pill: 'bg-[#D4252A]/10 text-[#D4252A] border-[#D4252A]/20',
    borderHover: 'hover:border-[#D4252A]',
    iconColor: 'text-[#D4252A]',
    btnBg: 'bg-[#D4252A] hover:bg-[#b81d22] text-white',
    shadow: 'shadow-[#D4252A]/20',
    gradient: 'from-[#D4252A]/10 via-transparent to-transparent',
    dot: 'bg-[#D4252A]',
  },
};

export default function LearningPathsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeModalPath, setActiveModalPath] = useState(null);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter paths
  const filteredPaths = useMemo(() => {
    return LEARNING_PATHS.filter((path) => {
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery = !query || (
        path.title.toLowerCase().includes(query) ||
        path.subtitle.toLowerCase().includes(query) ||
        path.summary.toLowerCase().includes(query) ||
        path.skills.some((s) => s.toLowerCase().includes(query)) ||
        path.hardware.some((h) => h.toLowerCase().includes(query)) ||
        path.software.toLowerCase().includes(query) ||
        path.gradeLevel.toLowerCase().includes(query)
      );

      const matchesGrade = selectedGrade === 'all' || (
        selectedGrade === '3-5' && (path.gradeLevel.includes('3–5') || path.gradeBand === 'foundation')
      ) || (
        selectedGrade === '6-8' && (path.gradeLevel.includes('6–8') || path.gradeBand === 'intermediate')
      ) || (
        selectedGrade === '9-12' && (path.gradeLevel.includes('9–12') || path.gradeBand === 'advanced' || path.gradeLevel.includes('8–10'))
      );

      const matchesCategory = selectedCategory === 'all' || path.category === selectedCategory;

      return matchesQuery && matchesGrade && matchesCategory;
    });
  }, [searchQuery, selectedGrade, selectedCategory]);

  const handleBookPath = (pathTitle) => {
    // Navigate back to home with the booking path state
    navigate('/', { state: { bookingTier: pathTitle } });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white font-sans antialiased">
      
      {/* Top Navbar */}
      <FriendlyNavbar onBookClick={() => navigate('/', { state: { scrollToBooking: true } })} />

      <main className="pt-24 pb-20">
        
        {/* Page Hero Header with Pleasant Multi-Color Radial Mesh */}
        <div className="relative overflow-hidden py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 bg-gradient-to-b from-white via-slate-50 to-slate-50">
          
          {/* Ambient Glows using text_logo.png colors */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-25 blur-3xl -z-10">
            <div className="absolute top-4 left-10 w-72 h-72 rounded-full bg-[#1D9D53]" />
            <div className="absolute top-10 left-1/3 w-80 h-80 rounded-full bg-[#533788]" />
            <div className="absolute top-4 right-1/4 w-72 h-72 rounded-full bg-[#D4252A]" />
            <div className="absolute top-12 right-10 w-64 h-64 rounded-full bg-[#2576BC]" />
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
              <span className="text-slate-800 font-medium">NEP 2020 Hands-On Syllabi & Hardware Tracks</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight mb-4 max-w-3xl">
              Explore Hands-On <br />
              <span className="bg-gradient-to-r from-[#D4252A] via-[#EE7819] via-[#2576BC] to-[#533788] bg-clip-text text-transparent">
                AI & Robotics Learning Paths
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mb-8">
              Explore fully scaffolded curriculum sequences designed for elementary through high school classrooms. Every path provides complete hardware kits, certified instructor facilitation, interactive LMS lessons, and student-built rover capstones.
            </p>

            {/* Discipline Summary Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl pt-2">
              <button
                type="button"
                onClick={() => { setSelectedCategory('robotics'); setSelectedGrade('all'); }}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedCategory === 'robotics'
                    ? 'bg-[#1D9D53]/10 border-[#1D9D53]/40 ring-2 ring-[#1D9D53]/20 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-[#1D9D53]/40'
                }`}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#1D9D53] mb-1.5" />
                <div className="text-xs font-bold text-slate-900">Robotics & Hardware</div>
                <div className="text-[11px] text-slate-500 font-medium">Motors, Sonar, Circuits</div>
              </button>

              <button
                type="button"
                onClick={() => { setSelectedCategory('ai'); setSelectedGrade('all'); }}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedCategory === 'ai'
                    ? 'bg-[#533788]/10 border-[#533788]/40 ring-2 ring-[#533788]/20 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-[#533788]/40'
                }`}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#533788] mb-1.5" />
                <div className="text-xs font-bold text-slate-900">AI & Machine Learning</div>
                <div className="text-[11px] text-slate-500 font-medium">Neural Nets, Vision AI</div>
              </button>

              <button
                type="button"
                onClick={() => { setSelectedCategory('coding'); setSelectedGrade('all'); }}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedCategory === 'coding'
                    ? 'bg-[#2576BC]/10 border-[#2576BC]/40 ring-2 ring-[#2576BC]/20 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-[#2576BC]/40'
                }`}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#2576BC] mb-1.5" />
                <div className="text-xs font-bold text-slate-900">Coding & Logic</div>
                <div className="text-[11px] text-slate-500 font-medium">Prompting, Python</div>
              </button>

              <button
                type="button"
                onClick={() => { setSelectedCategory('space'); setSelectedGrade('all'); }}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedCategory === 'space'
                    ? 'bg-[#D4252A]/10 border-[#D4252A]/40 ring-2 ring-[#D4252A]/20 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-[#D4252A]/40'
                }`}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#D4252A] mb-1.5" />
                <div className="text-xs font-bold text-slate-900">Space Tech & Rovers</div>
                <div className="text-[11px] text-slate-500 font-medium">Telemetry & Chandrayaan</div>
              </button>
            </div>

          </div>
        </div>

        {/* Search, Filter & Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          
          {/* Controls Bar */}
          <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-card mb-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              
              {/* Search Bar */}
              <div className="md:col-span-6 relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Search className="w-5 h-5 text-blue-500" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search syllabus by keyword (e.g. Python, Sonar, Gears, Neural, OpenCV)..."
                  className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all shadow-xs"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Grade Band Filter */}
              <div className="md:col-span-3">
                <div className="relative">
                  <select
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                    className="w-full py-3.5 px-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 font-medium cursor-pointer shadow-xs appearance-none"
                  >
                    <option value="all">All Grade Levels</option>
                    <option value="3-5">Grades 3–5 (Foundation)</option>
                    <option value="6-8">Grades 6–8 (Intermediate)</option>
                    <option value="9-12">Grades 9–12 (Advanced)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400 text-xs">
                    ▼
                  </div>
                </div>
              </div>

              {/* Track Discipline Filter */}
              <div className="md:col-span-3">
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full py-3.5 px-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 font-medium cursor-pointer shadow-xs appearance-none"
                  >
                    <option value="all">All Focus Tracks</option>
                    <option value="robotics">Robotics & Hardware</option>
                    <option value="ai">AI & Machine Learning</option>
                    <option value="coding">Coding & Software Logic</option>
                    <option value="space">Space Tech & Rovers</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400 text-xs">
                    ▼
                  </div>
                </div>
              </div>

            </div>

            {/* Quick Filter Tag Bar */}
            <div className="flex items-center gap-2 flex-wrap pt-4 border-t border-slate-100 mt-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mr-1 hidden sm:inline-block">
                Quick Picks:
              </span>
              {[
                { label: 'All Paths', action: () => { setSearchQuery(''); setSelectedGrade('all'); setSelectedCategory('all'); } },
                { label: '🤖 Robotics', action: () => { setSelectedCategory('robotics'); } },
                { label: '🧠 Neural Nets & AI', action: () => { setSelectedCategory('ai'); } },
                { label: '💻 Python & Logic', action: () => { setSelectedCategory('coding'); } },
                { label: '🚀 Space Rovers', action: () => { setSelectedCategory('space'); } },
                { label: 'Grades 3–5', action: () => { setSelectedGrade('3-5'); } },
                { label: 'Grades 6–8', action: () => { setSelectedGrade('6-8'); } },
                { label: 'Grades 9–12', action: () => { setSelectedGrade('9-12'); } },
              ].map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={chip.action}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 border border-slate-200/80 transition-all cursor-pointer"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Counter & Active Filter Reset */}
          <div className="flex items-center justify-between mb-8 px-2 text-xs text-slate-500">
            <div>
              Showing <span className="font-bold text-slate-900 text-sm">{filteredPaths.length}</span> of {LEARNING_PATHS.length} Curriculum Sequences
              {searchQuery && (
                <span className="ml-1 text-slate-700">
                  matching "<strong className="text-slate-900">{searchQuery}</strong>"
                </span>
              )}
            </div>
            {(searchQuery || selectedGrade !== 'all' || selectedCategory !== 'all') && (
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setSelectedGrade('all'); setSelectedCategory('all'); }}
                className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                Reset all filters
              </button>
            )}
          </div>

          {/* Empty State */}
          {filteredPaths.length === 0 && (
            <div className="py-20 text-center bg-white max-w-xl mx-auto p-8 rounded-3xl border border-slate-200 shadow-card">
              <div className="w-14 h-14 rounded-2xl bg-[#2576BC]/10 text-[#2576BC] flex items-center justify-center mx-auto mb-4 border border-[#2576BC]/20">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No matching learning paths</h3>
              <p className="text-sm text-slate-600 mb-6">
                Try searching for topics like "Python", "Sensors", "Rover", "Sonar", or "Machine Learning".
              </p>
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setSelectedGrade('all'); setSelectedCategory('all'); }}
                className="px-6 py-3 rounded-full bg-[#2576BC] hover:bg-[#1d63a0] text-white text-xs font-semibold uppercase tracking-wider transition-all"
              >
                View All Learning Paths
              </button>
            </div>
          )}

          {/* Learning Paths Grid with Distinct Pleasant Colors */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
            {filteredPaths.map((path, idx) => {
              const theme = CATEGORY_THEMES[path.category] || CATEGORY_THEMES.robotics;

              return (
                <FadeIn key={path.id} delay={idx * 50}>
                  <div className={`h-full rounded-3xl bg-white border border-slate-200 ${theme.borderHover} transition-all duration-300 shadow-card hover:shadow-card-hover flex flex-col justify-between overflow-hidden group relative`}>
                    
                    {/* Top Pleasant Soft Radial Glow */}
                    <div className={`absolute top-0 right-0 w-64 h-32 bg-gradient-to-br ${theme.gradient} pointer-events-none rounded-tr-3xl`} />

                    {/* Card Body */}
                    <div className="p-6 sm:p-8 pb-4 relative z-10">
                      
                      {/* Top Header Tag Strip */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full ${theme.badge} text-xs font-bold tracking-wide shadow-xs`}>
                            {path.gradeLevel}
                          </span>
                          <span className={`px-3 py-1 rounded-full ${theme.pill} text-xs font-semibold border`}>
                            {path.categoryLabel}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                          <Clock className={`w-3.5 h-3.5 ${theme.iconColor}`} />
                          <span>{path.duration.split(' or ')[0]}</span>
                        </div>
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="text-2xl font-bold text-slate-900 leading-snug group-hover:text-[#2576BC] transition-colors mb-2">
                        {path.title}
                      </h3>
                      <p className={`text-xs font-bold uppercase tracking-wider ${theme.iconColor} mb-3`}>
                        {path.subtitle}
                      </p>

                      {/* Summary */}
                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                        {path.summary}
                      </p>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {path.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2.5 py-1 rounded-lg bg-slate-50 text-slate-700 text-xs font-medium border border-slate-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Hardware & Deliverable Box */}
                      <div className="space-y-3 pt-4 border-t border-slate-100 text-xs">
                        <div className="flex items-start gap-2.5 text-slate-700">
                          <div className={`p-1 rounded-lg ${theme.pill}`}>
                            <Cpu className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="text-slate-900 font-bold block">Physical Hardware Provided:</span>
                            <span className="text-slate-600">{path.hardware.join(' · ')}</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5 text-slate-700">
                          <div className="p-1 rounded-lg bg-[#F9BA06]/15 text-[#946c00] border border-[#F9BA06]/30">
                            <Award className="w-3.5 h-3.5 text-[#F9BA06]" />
                          </div>
                          <div>
                            <span className="text-slate-900 font-bold block">Student Capstone Outcome:</span>
                            <span className="text-slate-800 font-medium">{path.outcome}</span>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Bottom Actions Bar */}
                    <div className="p-6 sm:p-8 pt-4 bg-slate-50/70 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 mt-auto relative z-10">
                      <button
                        type="button"
                        onClick={() => setActiveModalPath(path)}
                        className="w-full sm:w-auto text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-[#2576BC] flex items-center justify-center gap-1.5 py-2 cursor-pointer transition-colors"
                      >
                        <BookOpen className="w-4 h-4 text-[#2576BC]" />
                        <span>View 4-Module Syllabus</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleBookPath(`${path.title} (${path.gradeLevel})`)}
                        className={`w-full sm:w-auto px-5 py-2.5 rounded-full ${theme.btnBg} text-xs font-bold uppercase tracking-wider shadow-sm hover:shadow transition-all cursor-pointer flex items-center justify-center gap-2`}
                      >
                        <span>Book for this Path</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                </FadeIn>
              );
            })}
          </div>

        </div>

      </main>

      {/* Syllabus Detail Modal */}
      {activeModalPath && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setActiveModalPath(null)}
        >
          <div 
            className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto text-left relative p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveModalPath(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Header */}
            <div className="pr-10 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-[#2576BC] text-white text-xs font-bold tracking-wide">
                  {activeModalPath.gradeLevel}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold">
                  {activeModalPath.categoryLabel}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {activeModalPath.ageGroup}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
                {activeModalPath.title}
              </h2>
              <p className="text-xs font-bold uppercase tracking-wider text-[#2576BC]">
                {activeModalPath.subtitle}
              </p>
            </div>

            {/* Syllabus Modules */}
            <div className="mb-8">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#2576BC]" />
                Four-Module Curriculum Sequence
              </h4>
              <div className="space-y-3">
                {activeModalPath.syllabus.map((mod, mIdx) => (
                  <div key={mIdx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs text-[#2576BC] font-bold uppercase tracking-wider font-mono">
                        {mod.module}
                      </span>
                      <span className="text-xs text-[#1D9D53] font-semibold bg-[#1D9D53]/10 px-2.5 py-0.5 rounded-full border border-[#1D9D53]/20">
                        Guided Lab + LMS Access
                      </span>
                    </div>
                    <h5 className="font-bold text-base text-slate-900 mb-1">
                      {mod.title}
                    </h5>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {mod.topics}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hardware & Pedagogical Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-[#2576BC]" />
                  Hardware & Kits Provided
                </h5>
                <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                  {activeModalPath.hardware.map((item, iIdx) => (
                    <li key={iIdx} className="flex items-start gap-1.5">
                      <span className="text-[#1D9D53] font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#F9BA06]" />
                  NEP 2020 Competency Focus
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {activeModalPath.nep2020}
                </p>
                <div className="text-xs text-slate-700 font-semibold">
                  <strong>Software:</strong> {activeModalPath.software}
                </div>
              </div>
            </div>

            {/* Modal Bottom Action */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                Certified STEM Instructors · All Hardware & Rovers Provided On-Site
              </div>
              <button
                type="button"
                onClick={() => handleBookPath(`${activeModalPath.title} (${activeModalPath.gradeLevel})`)}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#2576BC] hover:bg-[#1d63a0] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-[#2576BC]/20 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Book Walkthrough for this Path</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Footer */}
      <FriendlyFooter />

    </div>
  );
}

