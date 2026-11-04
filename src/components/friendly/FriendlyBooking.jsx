import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';

export default function FriendlyBooking({ selectedTier = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    schoolName: '',
    email: '',
    phone: '',
    grades: selectedTier || 'Middle School (Grades 6–8)',
    students: '60–150 Students (Grade Cohort)',
    message: '',
  });

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
    }, 500);
  };

  return (
    <section id="booking" className="py-20 sm:py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
            Free Consultation & Demo
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 mt-4 tracking-tight">
            Schedule a Workshop for Your School
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Tell us about your campus and student cohorts. Our STEM curriculum specialists will provide a custom pilot plan within 24 hours.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-lg shadow-slate-100">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold font-display text-slate-900">
                Demo Request Received!
              </h3>
              <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                Thank you for reaching out, <strong>{formData.name || 'Educator'}</strong>. A dedicated STEM curriculum director will email you within 24 hours with custom scheduling options for <strong>{formData.schoolName || 'your school'}</strong>.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 rounded-full bg-slate-200 text-slate-800 text-xs font-semibold hover:bg-slate-300 transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Dr. Sarah Jenkins"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm"
                  />
                </div>

                {/* School Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    School or District Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="schoolName"
                    value={formData.schoolName}
                    onChange={handleChange}
                    placeholder="e.g. Oakridge Middle School"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Work Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="sjenkins@district9.edu"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 000-0000"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Grade Band Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Grade Band Interest
                  </label>
                  <select
                    name="grades"
                    value={formData.grades}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm"
                  >
                    <option value="Elementary (Grades 3–5): Motors & Circuits">Elementary (Grades 3–5): Motors & Circuits</option>
                    <option value="Middle School (Grades 6–8): AI Logic & Sonar">Middle School (Grades 6–8): AI Logic & Sonar</option>
                    <option value="High School (Grades 9–12): Vision & Edge AI">High School (Grades 9–12): Vision & Edge AI</option>
                    <option value="Multi-Grade Full Campus STEM Residency">Multi-Grade Full Campus STEM Residency</option>
                  </select>
                </div>

                {/* Student Count */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Approximate Students
                  </label>
                  <select
                    name="students"
                    value={formData.students}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm"
                  >
                    <option value="30–60 Students (1–2 Cohorts)">30–60 Students (1–2 Cohorts)</option>
                    <option value="60–150 Students (Grade Cohort)">60–150 Students (Grade Cohort)</option>
                    <option value="150–300 Students (Multi-Grade)">150–300 Students (Multi-Grade)</option>
                    <option value="300+ Students (Whole School)">300+ Students (Whole School)</option>
                  </select>
                </div>
              </div>

              {/* Message / Questions */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Questions or Preferred Dates (Optional)
                </label>
                <textarea
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your campus goals or preferred month/week..."
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm"
                />
              </div>

              {/* Submit Button & Privacy note */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-200 hover:shadow-indigo-300 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <span>{loading ? 'Submitting...' : 'Request Free School Demo'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% FERPA & COPPA compliant</span>
                </div>
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  );
}

