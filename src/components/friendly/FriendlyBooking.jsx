import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function FriendlyBooking({ selectedTier = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    schoolName: '',
    city: 'Visakhapatnam',
    email: '',
    phone: '',
    grades: selectedTier || 'Middle school (Grades 6–8)',
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
    <section id="booking" className="py-20 sm:py-24 bg-[#FAF8F3] border-b border-[#E8E4D9]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading: FINAL CTA copy */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-mono uppercase text-xs tracking-widest text-[#C9A227] block mb-3">
            [ NEXT STEPS ]
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-[#0F1B2D]">
            Let's plan your school's <span className="font-serif italic text-[#C9A227]">pilot.</span>
          </h2>
          <p className="mt-4 text-[17px] text-[#5C6470] leading-relaxed">
            Tell us your grades and cohort size. Our team will send a custom pilot plan within 24 hours.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white/90 border border-[#E8E4D9] rounded-2xl p-6 sm:p-10 shadow-subtle">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#FAF8F3] border border-[#E8E4D9] text-[#C9A227] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 stroke-[1.5]" />
              </div>
              <h3 className="text-2xl font-serif font-normal text-[#0F1B2D]">
                Walkthrough Request Received
              </h3>
              <p className="text-[17px] text-[#5C6470] max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.name || 'Educator'}</strong>. Our team will send your custom pilot plan for <strong>{formData.schoolName || 'your school'}</strong> within 24 hours.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-[#FAF8F3] border border-[#E8E4D9] text-[#0F1B2D] text-xs font-mono uppercase tracking-wider hover:bg-[#E8E4D9] transition-colors"
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
                  <label className="block font-mono text-xs uppercase tracking-wider text-[#0F1B2D] mb-1.5 font-semibold">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Principal / Academic Director"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F3] border border-[#E8E4D9] text-[#0F1B2D] text-sm placeholder:text-[#5C6470]/60 focus:outline-none focus:border-[#C9A227] transition-all"
                  />
                </div>

                {/* School Name */}
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-[#0F1B2D] mb-1.5 font-semibold">
                    School Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="schoolName"
                    value={formData.schoolName}
                    onChange={handleChange}
                    placeholder="e.g. School Campus Name"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F3] border border-[#E8E4D9] text-[#0F1B2D] text-sm placeholder:text-[#5C6470]/60 focus:outline-none focus:border-[#C9A227] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* City */}
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-[#0F1B2D] mb-1.5 font-semibold">
                    City / Location *
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F3] border border-[#E8E4D9] text-[#0F1B2D] text-sm focus:outline-none focus:border-[#C9A227] transition-all"
                  >
                    <option value="Vizianagaram">Vizianagaram</option>
                    <option value="Visakhapatnam">Visakhapatnam</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Vijayawada">Vijayawada</option>
                    <option value="Other Campus">Other City (India)</option>
                  </select>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-[#0F1B2D] mb-1.5 font-semibold">
                    Official Email *
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="contact@school.edu.in"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F3] border border-[#E8E4D9] text-[#0F1B2D] text-sm placeholder:text-[#5C6470]/60 focus:outline-none focus:border-[#C9A227] transition-all"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-[#0F1B2D] mb-1.5 font-semibold">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F3] border border-[#E8E4D9] text-[#0F1B2D] text-sm placeholder:text-[#5C6470]/60 focus:outline-none focus:border-[#C9A227] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Grade Band Selection */}
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-[#0F1B2D] mb-1.5 font-semibold">
                    Grades to Enroll
                  </label>
                  <select
                    name="grades"
                    value={formData.grades}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F3] border border-[#E8E4D9] text-[#0F1B2D] text-sm focus:outline-none focus:border-[#C9A227] transition-all"
                  >
                    <option value="Elementary (Grades 3–5)">Elementary (Grades 3–5): Motors & Circuits</option>
                    <option value="Middle school (Grades 6–8)">Middle school (Grades 6–8): AI Logic & Sonar</option>
                    <option value="High school (Grades 9–12)">High school (Grades 9–12): Vision & Edge AI</option>
                    <option value="Multiple Grade Bands">Multiple Grade Bands (Full Campus)</option>
                  </select>
                </div>

                {/* Student Count */}
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-[#0F1B2D] mb-1.5 font-semibold">
                    Estimated Cohort Size
                  </label>
                  <select
                    name="students"
                    value={formData.students}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F3] border border-[#E8E4D9] text-[#0F1B2D] text-sm focus:outline-none focus:border-[#C9A227] transition-all"
                  >
                    <option value="30–60 Students">30–60 Students (1–2 Sections)</option>
                    <option value="60–150 Students">60–150 Students (Grade Cohort)</option>
                    <option value="150–300 Students">150–300 Students (Multi-Grade)</option>
                    <option value="300+ Students">300+ Students (Whole Campus)</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-[#0F1B2D] mb-1.5 font-semibold">
                  Timetable Preferences or Questions (Optional)
                </label>
                <textarea
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share any preferred workshop months, periods, or requirements..."
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F3] border border-[#E8E4D9] text-[#0F1B2D] text-sm placeholder:text-[#5C6470]/60 focus:outline-none focus:border-[#C9A227] transition-all"
                />
              </div>

              {/* Submit Button & Compliance Note */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3.5 rounded-full bg-[#0F1B2D] text-[#FAF8F3] hover:bg-[#C9A227] hover:text-[#0F1B2D] font-medium text-sm transition-colors flex items-center justify-center gap-2.5 shadow-sm disabled:opacity-50"
                >
                  <span>{loading ? 'Submitting...' : 'Book a School Walkthrough'}</span>
                  <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                </button>

                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#5C6470]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>NEP 2020 aligned · Verified instructors · Child-safe practices</span>
                </div>
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  );
}
