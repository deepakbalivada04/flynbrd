import React, { useState, useMemo } from 'react';
import { Search, X, BookOpen, Cpu, Sparkles, ArrowRight, Layers, Clock, Award } from 'lucide-react';
import { LEARNING_PATHS } from '../../data/learningPaths';
import FadeIn from '../common/FadeIn';

export default function LearningPathsSection({ onSelectPath }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeModalPath, setActiveModalPath] = useState(null);

  // Filter paths based on search, grade, and category
  const filteredPaths = useMemo(() => {
    return LEARNING_PATHS.filter((path) => {
      // Search query check
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

      // Grade check
      const matchesGrade = selectedGrade === 'all' || (
        selectedGrade === '3-5' && (path.gradeLevel.includes('3–5') || path.gradeBand === 'foundation')
      ) || (
        selectedGrade === '6-8' && (path.gradeLevel.includes('6–8') || path.gradeBand === 'intermediate')
      ) || (
        selectedGrade === '9-12' && (path.gradeLevel.includes('9–12') || path.gradeBand === 'advanced' || path.gradeLevel.includes('8–10'))
      );

      // Category check
      const matchesCategory = selectedCategory === 'all' || path.category === selectedCategory;

      return matchesQuery && matchesGrade && matchesCategory;
    });
  }, [searchQuery, selectedGrade, selectedCategory]);

  const quickPills = [
    { label: 'All Paths', action: () => { setSearchQuery(''); setSelectedGrade('all'); setSelectedCategory('all'); } },
    { label: 'Robotics Kits', action: () => { setSelectedCategory('robotics'); setSelectedGrade('all'); } },
    { label: 'AI & Neural Nets', action: () => { setSelectedCategory('ai'); setSelectedGrade('all'); } },
    { label: 'Python & Prompting', action: () => { setSelectedCategory('coding'); setSelectedGrade('all'); } },
    { label: 'Space Rovers', action: () => { setSelectedCategory('space'); setSelectedGrade('all'); } },
    { label: 'Grades 3–5', action: () => { setSelectedGrade('3-5'); } },
    { label: 'Grades 6–8', action: () => { setSelectedGrade('6-8'); } },
    { label: 'Grades 9–12', action: () => { setSelectedGrade('9-12'); } },
  ];

  const handleSelectAndBook = (pathTitle) => {
    if (activeModalPath) {
      setActiveModalPath(null);
    }
    if (onSelectPath) {
      onSelectPath(pathTitle);
    } else {
      const el = document.getElementById('booking');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="learning-paths" className="bg-white py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <FadeIn delay={0}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>NEP 2020 Hands-On Curriculum Pathways</span>
            </div>
          </FadeIn>
          
          <FadeIn delay={80}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4 leading-tight">
              Structured learning paths for{' '}
              <span className="text-blue-600">every grade level.</span>
            </h2>
          </FadeIn>

          <FadeIn delay={160}>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Find the perfect track for your school. Each learning path combines physical hardware kits, step-by-step LMS video lessons, certified instructor guidance, and a working robot project students show.
            </p>
          </FadeIn>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search learning paths (e.g. Python, Sonar, Neural Nets, Rover, Vision)..."
                className="w-full pl-11 pr-10 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all shadow-xs"
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

            {/* Grade Filter Dropdown */}
            <div className="md:col-span-3">
              <div className="relative">
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="w-full py-3.5 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 font-medium cursor-pointer shadow-xs appearance-none"
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

            {/* Category Filter Dropdown */}
            <div className="md:col-span-3">
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full py-3.5 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 font-medium cursor-pointer shadow-xs appearance-none"
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

          {/* Quick Filter Suggestion Chips */}
          <div className="flex items-center gap-2 flex-wrap pt-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mr-1 hidden sm:inline-block">
              Quick Filter:
            </span>
            {quickPills.map((pill, idx) => (
              <button
                key={idx}
                type="button"
                onClick={pill.action}
                className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-600 border border-slate-200 transition-colors cursor-pointer"
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200 text-xs text-slate-500">
          <div>
            Showing <span className="font-bold text-blue-600">{filteredPaths.length}</span> of {LEARNING_PATHS.length} Learning Paths
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

        {/* No Results Fallback */}
        {filteredPaths.length === 0 && (
          <div className="py-16 text-center bg-slate-50 max-w-xl mx-auto p-8 rounded-2xl border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 border border-blue-100">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No learning paths match your search</h3>
            <p className="text-sm text-slate-600 mb-6">
              Try searching for topics like "Python", "Sensors", "Rover", "Sonar", or "Machine Learning".
            </p>
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setSelectedGrade('all'); setSelectedCategory('all'); }}
              className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold uppercase tracking-wider transition-all"
            >
              Show All Learning Paths
            </button>
          </div>
        )}

        {/* Learning Paths Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
          {filteredPaths.map((path, idx) => (
            <FadeIn key={path.id} delay={idx * 60}>
              <div className="h-full rounded-2xl bg-white border border-slate-200 hover:border-blue-400 transition-all duration-300 shadow-card hover:shadow-card-hover flex flex-col justify-between overflow-hidden group">
                
                {/* Top Badge Strip */}
                <div className="p-6 sm:p-8 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold tracking-wide">
                        {path.gradeLevel}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-medium">
                        {path.categoryLabel}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span>{path.duration.split(' or ')[0]}</span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-2xl font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors mb-2">
                    {path.title}
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-3">
                    {path.subtitle}
                  </p>

                  {/* Summary */}
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-5">
                    {path.summary}
                  </p>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {path.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200/80"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Hardware & Capstone Box */}
                  <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs">
                    <div className="flex items-start gap-2 text-slate-700">
                      <Cpu className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900 font-semibold">Hardware Kit:</strong>{' '}
                        <span className="text-slate-600">{path.hardware[0]}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-slate-700">
                      <Award className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900 font-semibold">Student Capstone:</strong>{' '}
                        <span className="text-slate-800 font-medium">{path.outcome}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions Bar */}
                <div className="p-6 sm:p-8 pt-4 bg-slate-50/70 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 mt-auto">
                  <button
                    type="button"
                    onClick={() => setActiveModalPath(path)}
                    className="w-full sm:w-auto text-xs font-semibold uppercase tracking-wider text-slate-700 hover:text-blue-600 flex items-center justify-center gap-1.5 py-2 cursor-pointer transition-colors"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>View Syllabus & Modules</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectAndBook(`${path.title} (${path.gradeLevel})`)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold uppercase tracking-wider shadow-sm hover:shadow transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Book for this Path</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </FadeIn>
          ))}
        </div>

      </div>

      {/* Syllabus Detail Modal */}
      {activeModalPath && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setActiveModalPath(null)}
        >
          <div 
            className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto text-left relative p-6 sm:p-8"
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
                <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold tracking-wide">
                  {activeModalPath.gradeLevel}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-medium">
                  {activeModalPath.categoryLabel}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {activeModalPath.ageGroup}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
                {activeModalPath.title}
              </h2>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                {activeModalPath.subtitle}
              </p>
            </div>

            {/* Syllabus Modules */}
            <div className="mb-8">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                Four-Module Curriculum Sequence
              </h4>
              <div className="space-y-3">
                {activeModalPath.syllabus.map((mod, mIdx) => (
                  <div key={mIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs text-blue-600 font-bold uppercase tracking-wider">
                        {mod.module}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">Guided Lab + LMS</span>
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
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-blue-600" />
                  Hardware & Kits Provided
                </h5>
                <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                  {activeModalPath.hardware.map((item, iIdx) => (
                    <li key={iIdx} className="flex items-start gap-1.5">
                      <span className="text-blue-600">▪</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-500" />
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
                Instructor-led campus residency · Zero school hardware purchase required
              </div>
              <button
                type="button"
                onClick={() => handleSelectAndBook(`${activeModalPath.title} (${activeModalPath.gradeLevel})`)}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold uppercase tracking-wider shadow-md shadow-blue-500/20 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Request Walkthrough for this Path</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
