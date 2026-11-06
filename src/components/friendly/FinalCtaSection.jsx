import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, Bookmark, X } from 'lucide-react';
import content from '../../content/content.json';
import FadeIn from '../common/FadeIn';

export default function FinalCtaSection({ selectedTier = '' }) {
  const { body, button } = content.finalCta;

  const [formData, setFormData] = useState({
    name: '',
    schoolName: '',
    city: 'Visakhapatnam',
    email: '',
    phone: '',
    grades: 'Grades 6–12',
    learningPath: selectedTier || '',
    students: '60–150 Students',
    dates: '',
  });

  useEffect(() => {
    if (selectedTier) {
      setFormData((prev) => ({
        ...prev,
        learningPath: selectedTier,
      }));
    }
  }, [selectedTier]);

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 400);
  };

  return (
    <section id="booking" className="bg-white py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <FadeIn delay={0}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1D9D53]/10 border border-[#1D9D53]/30 text-[#1D9D53] text-xs font-bold mb-4 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#1D9D53]" />
              <span>Onboarding Founding Schools for 2026 Term</span>
            </div>
          </FadeIn>
          
          <FadeIn delay={80}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4 leading-tight">
              Begin with{' '}
              <span className="bg-gradient-to-r from-[#2576BC] via-[#533788] to-[#EE7819] bg-clip-text text-transparent">
                one classroom.
              </span>
            </h2>
          </FadeIn>
          
          <FadeIn delay={120}>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mx-auto">
              {body}
            </p>
          </FadeIn>
        </div>

        {/* Booking Form Card */}
        <FadeIn delay={160}>
          <div className="bg-slate-50 border border-slate-200 p-6 sm:p-12 rounded-3xl shadow-card text-left">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#1D9D53]/10 border border-[#1D9D53]/20 text-[#1D9D53] mx-auto flex items-center justify-center shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Walkthrough Request Received
                </h3>
                <p className="text-slate-600 max-w-md mx-auto text-base">
                  Thank you, <strong>{formData.name || 'Educator'}</strong>. We will send a customized pilot walkthrough plan for <strong>{formData.schoolName || 'your school'}</strong> within 24 hours. For direct inquiries, write to <a href="mailto:flynbrd.contact@gmail.com" className="text-[#2576BC] font-semibold underline">flynbrd.contact@gmail.com</a>.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-full bg-white border border-slate-300 text-slate-700 hover:text-slate-900 hover:border-slate-400 text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-xs"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {formData.learningPath && (
                  <div className="p-4 rounded-xl bg-[#2576BC]/10 border border-[#2576BC]/20 flex items-center justify-between gap-3 text-xs font-medium text-slate-900">
                    <div className="flex items-center gap-2">
                      <Bookmark className="w-4 h-4 text-[#2576BC] shrink-0" />
                      <span>
                        Interested Track: <strong className="text-[#2576BC] font-bold">{formData.learningPath}</strong>
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, learningPath: '' }))}
                      className="text-slate-500 hover:text-slate-800 p-1 cursor-pointer"
                      title="Clear track selection"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Principal / Academic Director"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all shadow-xs"
                    />
                  </div>

                  {/* School Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                      School Name *
                    </label>
                    <input
                      type="text"
                      required
                      name="schoolName"
                      value={formData.schoolName}
                      onChange={handleChange}
                      placeholder="e.g. Campus Name"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all shadow-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* City */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                      City *
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all shadow-xs font-medium cursor-pointer"
                    >
                      <option value="Vizianagaram">Vizianagaram</option>
                      <option value="Visakhapatnam">Visakhapatnam</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Vijayawada">Vijayawada</option>
                      <option value="Other City">Other City (India)</option>
                    </select>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                      Official Email *
                    </label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="contact@school.edu.in"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all shadow-xs"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 94921 59421"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all shadow-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Grades */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                      Target Grades
                    </label>
                    <select
                      name="grades"
                      value={formData.grades}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all shadow-xs font-medium cursor-pointer"
                    >
                      <option value="Grades 3–5">Grades 3–5 (Smart Circuits & Motors)</option>
                      <option value="Grades 6–8">Grades 6–8 (Autonomous Sonar & Coding)</option>
                      <option value="Grades 9–12">Grades 9–12 (Neural Networks & Vision AI)</option>
                      <option value="Grades 3–12 (Whole School)">Grades 3–12 (Whole Campus Residency)</option>
                    </select>
                  </div>

                  {/* Cohort Size */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                      Cohort Size
                    </label>
                    <select
                      name="students"
                      value={formData.students}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all shadow-xs font-medium cursor-pointer"
                    >
                      <option value="30–60 Students">30–60 Students (1–2 Classrooms)</option>
                      <option value="60–150 Students">60–150 Students (Full Grade Stream)</option>
                      <option value="150+ Students">150+ Students (Multi-Section / School)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-full bg-gradient-to-r from-[#2576BC] via-[#3d5fa9] to-[#533788] hover:from-[#1d63a0] hover:to-[#432c6e] text-white font-bold text-base shadow-lg shadow-[#2576BC]/25 hover:shadow-[#533788]/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    <span>{loading ? 'Submitting Inquiry...' : button}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <p className="text-center text-xs text-slate-500 mt-3 font-medium">
                    No hardware purchase required · All equipment and instructors supplied by Flyinbird · Email: <a href="mailto:flynbrd.contact@gmail.com" className="text-[#2576BC] hover:underline font-semibold">flynbrd.contact@gmail.com</a>
                  </p>
                </div>

              </form>
            )}
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
