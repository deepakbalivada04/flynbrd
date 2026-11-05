import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
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
    grades: selectedTier || 'Grades 6–12',
    students: '60–150 Students',
    dates: '',
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
    }, 400);
  };

  return (
    <section id="booking" className="bg-[#EFE6D3] py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#DCCFB6]">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <FadeIn delay={0}>
            <h2 className="heading-editorial text-3xl sm:text-4xl md:text-5xl text-[#2A2320] mb-4">
              Begin with{' '}
              <em className="italic text-[#C98A22] font-serif">one classroom.</em>
            </h2>
          </FadeIn>
          
          <FadeIn delay={80}>
            <p className="body-editorial mx-auto text-base sm:text-lg">
              {body}
            </p>
          </FadeIn>
        </div>

        {/* Booking Form Card */}
        <FadeIn delay={160}>
          <div className="card-quiet p-6 sm:p-10 text-left">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#EFE6D3] border border-[#DCCFB6] text-[#1F4236] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="heading-editorial text-2xl sm:text-3xl text-[#2A2320]">
                  Walkthrough Request Received
                </h3>
                <p className="body-editorial max-w-md mx-auto text-base">
                  Thank you, <strong>{formData.name || 'Educator'}</strong>. We will send a custom pilot plan for <strong>{formData.schoolName || 'your school'}</strong> within 24 hours.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="btn-secondary-quiet text-xs font-mono uppercase tracking-wider cursor-pointer"
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
                    <label className="block label-mono mb-2 text-[#1F4236]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Principal / Academic Director"
                      className="w-full px-4 py-3 rounded-lg bg-[#EFE6D3]/60 border border-[#DCCFB6] text-[#2A2320] text-sm placeholder:text-[#2A2320]/40 focus:outline-none focus:border-[#C98A22] focus:ring-1 focus:ring-[#C98A22] transition-colors"
                    />
                  </div>

                  {/* School Name */}
                  <div>
                    <label className="block label-mono mb-2 text-[#1F4236]">
                      School Name *
                    </label>
                    <input
                      type="text"
                      required
                      name="schoolName"
                      value={formData.schoolName}
                      onChange={handleChange}
                      placeholder="e.g. Campus Name"
                      className="w-full px-4 py-3 rounded-lg bg-[#EFE6D3]/60 border border-[#DCCFB6] text-[#2A2320] text-sm placeholder:text-[#2A2320]/40 focus:outline-none focus:border-[#C98A22] focus:ring-1 focus:ring-[#C98A22] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* City */}
                  <div>
                    <label className="block label-mono mb-2 text-[#1F4236]">
                      City *
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-[#EFE6D3]/60 border border-[#DCCFB6] text-[#2A2320] text-sm focus:outline-none focus:border-[#C98A22] focus:ring-1 focus:ring-[#C98A22] transition-colors"
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
                    <label className="block label-mono mb-2 text-[#1F4236]">
                      Official Email *
                    </label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="contact@school.edu.in"
                      className="w-full px-4 py-3 rounded-lg bg-[#EFE6D3]/60 border border-[#DCCFB6] text-[#2A2320] text-sm placeholder:text-[#2A2320]/40 focus:outline-none focus:border-[#C98A22] focus:ring-1 focus:ring-[#C98A22] transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block label-mono mb-2 text-[#1F4236]">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 94921 59421"
                      className="w-full px-4 py-3 rounded-lg bg-[#EFE6D3]/60 border border-[#DCCFB6] text-[#2A2320] text-sm placeholder:text-[#2A2320]/40 focus:outline-none focus:border-[#C98A22] focus:ring-1 focus:ring-[#C98A22] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Grades */}
                  <div>
                    <label className="block label-mono mb-2 text-[#1F4236]">
                      Grades
                    </label>
                    <select
                      name="grades"
                      value={formData.grades}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-[#EFE6D3]/60 border border-[#DCCFB6] text-[#2A2320] text-sm focus:outline-none focus:border-[#C98A22] focus:ring-1 focus:ring-[#C98A22] transition-colors"
                    >
                      <option value="Grades 3–5">Grades 3–5 (Motors & Circuits)</option>
                      <option value="Grades 6–8">Grades 6–8 (Prompting & Sonar)</option>
                      <option value="Grades 9–12">Grades 9–12 (Neural Nets & Vision)</option>
                      <option value="Grades 3–12 (Whole School)">Grades 3–12 (Whole School)</option>
                    </select>
                  </div>

                  {/* Cohort Size */}
                  <div>
                    <label className="block label-mono mb-2 text-[#1F4236]">
                      Cohort Size
                    </label>
                    <select
                      name="students"
                      value={formData.students}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-[#EFE6D3]/60 border border-[#DCCFB6] text-[#2A2320] text-sm focus:outline-none focus:border-[#C98A22] focus:ring-1 focus:ring-[#C98A22] transition-colors"
                    >
                      <option value="30–60 Students">30–60 Students</option>
                      <option value="60–150 Students">60–150 Students</option>
                      <option value="150–300 Students">150–300 Students</option>
                      <option value="300+ Students">300+ Students</option>
                    </select>
                  </div>
                </div>

                {/* Dates / Timetable Notes */}
                <div>
                  <label className="block label-mono mb-2 text-[#1F4236]">
                    Preferred Dates or Timetable Notes (Optional)
                  </label>
                  <input
                    type="text"
                    name="dates"
                    value={formData.dates}
                    onChange={handleChange}
                    placeholder="e.g. Next term or after unit exams"
                    className="w-full px-4 py-3 rounded-lg bg-[#EFE6D3]/60 border border-[#DCCFB6] text-[#2A2320] text-sm placeholder:text-[#2A2320]/40 focus:outline-none focus:border-[#C98A22] focus:ring-1 focus:ring-[#C98A22] transition-colors"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary-oxblood text-base cursor-pointer disabled:opacity-50"
                  >
                    <span>{loading ? 'Submitting...' : button}</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>

                  <div className="flex items-center gap-2 text-xs font-mono text-[#1F4236]">
                    <span className="w-2 h-2 rounded-full bg-[#1F4236]" />
                    <span>NEP 2020 aligned · Offline student data · Verified instructors</span>
                  </div>
                </div>

              </form>
            )}
          </div>
        </FadeIn>

      </div>
    </section>
  );
}