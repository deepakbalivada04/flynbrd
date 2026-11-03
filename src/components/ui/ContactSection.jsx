import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  Calendar, 
  Building2, 
  User, 
  GraduationCap 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { THEMES } from '../../constants/themeConfig';

export default function ContactSection({ selectedProgramTitle = '' }) {
  const theme = THEMES[4];

  const [formData, setFormData] = useState({
    name: '',
    schoolName: '',
    designation: 'Principal',
    phone: '',
    email: '',
    studentCount: '100 - 250 Students',
    workshopInterest: selectedProgramTitle || 'Intermediate Tier (Grades 6–8)',
    preferredSeason: 'Spring Term 2026',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      // Trigger celebratory confetti for school booking
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00f0ff', '#a855f7', '#38bdf8', '#ffffff'],
        });
      } catch (err) {
        // Safe fallback if canvas not available
      }
    }, 1000);
  };

  return (
    <section
      id="section-4"
      className="relative min-h-screen w-full flex flex-col justify-center py-24 px-4 sm:px-8 lg:px-16"
    >
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/40 bg-cyan-950/40 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-3">
            <Bot className="w-3.5 h-3.5 text-cyan-400" />
            <span>ERA IV // THE AUTONOMOUS AI FUTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display">
            Schedule a Hands-On{' '}
            <span className="text-cyan-400 text-glow-cyan">
              School Workshop Demo
            </span>
          </h2>
          <p className="mt-4 text-stone-300 text-base sm:text-lg">
            Empower your students with hands-on AI and robotics. Complete this brief request, and our education team will provide a tailored quote and date options.
          </p>
        </div>

        {/* Dual Column Layout: Form + Contact Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Glassmorphic Lead Generation Form */}
          <div className="lg:col-span-7 backdrop-blur-xl bg-white/[0.06] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/40 relative">
            <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            
            {submitted ? (
              <div className="py-12 px-4 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center mx-auto text-cyan-400 shadow-lg shadow-cyan-950/50">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white font-display">
                  Workshop Request Received!
                </h3>
                <p className="text-sm text-stone-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-cyan-300">{formData.name}</strong>. Our school partnerships coordinator for <strong className="text-white">{formData.schoolName}</strong> will email and call within 24 business hours with custom workshop options.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 rounded-xl text-xs font-mono font-semibold border border-cyan-500/40 hover:bg-cyan-950/50 text-cyan-300 transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Form Title & Indicator */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono text-cyan-300">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    ADMINISTRATOR BOOKING PORTAL
                  </span>
                  <span>100% CONFIDENTIAL</span>
                </div>

                {/* Name & School Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-stone-300 mb-1.5">
                      Your Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Dr. Sarah Jenkins"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm text-white placeholder-stone-500 font-sans transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-stone-300 mb-1.5">
                      School / District Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="schoolName"
                        required
                        placeholder="Oakridge High School"
                        value={formData.schoolName}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm text-white placeholder-stone-500 font-sans transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Designation & Phone Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-stone-300 mb-1.5">
                      Designation / Role *
                    </label>
                    <select
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/80 border border-white/15 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm text-white font-sans transition-all"
                    >
                      <option value="Principal">Principal / Head of School</option>
                      <option value="Vice Principal">Vice Principal / Assistant Principal</option>
                      <option value="STEM Coordinator">STEM / Robotics Coordinator</option>
                      <option value="Curriculum Director">District Curriculum Director</option>
                      <option value="Teacher">Science / Tech Teacher</option>
                      <option value="Board Member">School Board Member</option>
                      <option value="Other">Other Administrator</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-stone-300 mb-1.5">
                      Direct Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="(555) 019-2834"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm text-white placeholder-stone-500 font-sans transition-all"
                    />
                  </div>
                </div>

                {/* Institutional Email & Estimated Students */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-stone-300 mb-1.5">
                      School Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="sjenkins@oakridge.edu"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm text-white placeholder-stone-500 font-sans transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-stone-300 mb-1.5">
                      Estimated Number of Students *
                    </label>
                    <select
                      name="studentCount"
                      value={formData.studentCount}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/80 border border-white/15 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm text-white font-sans transition-all"
                    >
                      <option value="30 - 60 Students (1-2 Classrooms)">30 - 60 Students (1-2 Classrooms)</option>
                      <option value="60 - 150 Students (Full Grade Cohort)">60 - 150 Students (Full Grade Cohort)</option>
                      <option value="150 - 300 Students (Multi-Grade)">150 - 300 Students (Multi-Grade)</option>
                      <option value="300+ Students (Whole School / District)">300+ Students (Whole School / District)</option>
                    </select>
                  </div>
                </div>

                {/* Program Tier Interest & Preferred Season */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-stone-300 mb-1.5">
                      Primary Program Interest
                    </label>
                    <select
                      name="workshopInterest"
                      value={formData.workshopInterest}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/80 border border-white/15 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm text-white font-sans transition-all"
                    >
                      <option value="Beginner Tier (Grades 3–5)">Beginner (Grades 3–5) - Motors & Circuits</option>
                      <option value="Intermediate Tier (Grades 6–8)">Intermediate (Grades 6–8) - AI & Sensors</option>
                      <option value="Advanced Tier (Grades 9–12)">Advanced (Grades 9–12) - Python & Vision</option>
                      <option value="Multi-Tier School STEM Residency">Multi-Tier Whole School STEM Residency</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-stone-300 mb-1.5">
                      Preferred Timeline / Term
                    </label>
                    <select
                      name="preferredSeason"
                      value={formData.preferredSeason}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/80 border border-white/15 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm text-white font-sans transition-all"
                    >
                      <option value="Immediate (Next 30 Days)">Immediate (Next 30 Days)</option>
                      <option value="Spring Term 2026">Spring Term</option>
                      <option value="Summer STEM Camp 2026">Summer STEM Camp</option>
                      <option value="Fall Term 2026">Fall Term</option>
                    </select>
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-xs font-mono text-stone-300 mb-1.5">
                    Specific Goals, Dates, or Grant Details (Optional)
                  </label>
                  <textarea
                    name="notes"
                    rows={3}
                    placeholder="E.g., We have a Title I grant and would like a 2-day robotics workshop for our 8th graders..."
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm text-white placeholder-stone-500 font-sans transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl text-base font-extrabold flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 via-teal-300 to-fuchsia-400 hover:from-cyan-300 hover:to-fuchsia-300 text-black shadow-xl shadow-cyan-950/60 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        Generating School Proposal...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Request Custom School Demo & Pricing
                      </span>
                    )}
                  </button>
                  <p className="mt-2 text-[11px] text-center text-stone-400 font-mono">
                    Zero obligation. Guaranteed administrator reply within 24 business hours.
                  </p>
                </div>

              </form>
            )}

          </div>

          {/* Right Column: Institutional Contact Information & Next Steps */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Card */}
            <div className="backdrop-blur-xl bg-white/[0.06] border border-cyan-500/30 rounded-2xl p-6 sm:p-7 shadow-xl">
              <h3 className="text-xl font-bold text-white font-display mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                Direct School District Line
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-stone-400 font-mono">Administrator Toll-Free</div>
                    <a href="tel:18005827626" className="text-base font-bold text-white hover:text-cyan-400 transition-colors">
                      +1 (800) 582-ROBO <span className="text-xs text-stone-400">(7626)</span>
                    </a>
                    <div className="text-[11px] text-stone-400">Mon–Fri, 7am – 6pm EST</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-stone-400 font-mono">Partnerships & Grants</div>
                    <a href="mailto:workshops@flyinbird-robotics.edu" className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors">
                      workshops@flyinbird-robotics.edu
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-stone-400 font-mono">Headquarters & Fleet Hub</div>
                    <div className="text-sm text-stone-200">
                      Silicon Valley STEM Hub • Mobile fleets dispatching nationwide
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* What Happens Next Card */}
            <div className="backdrop-blur-xl bg-white/[0.04] border border-cyan-500/20 rounded-2xl p-6 sm:p-7">
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-4">
                What Happens Next? (3-Step Roadmap)
              </h4>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs flex items-center justify-center font-bold shrink-0 border border-cyan-500/30">
                    1
                  </div>
                  <div className="text-xs text-stone-300">
                    <strong className="text-white">15-Min Administrator Alignment:</strong> We review your grade levels, student headcount, and schedule windows.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs flex items-center justify-center font-bold shrink-0 border border-cyan-500/30">
                    2
                  </div>
                  <div className="text-xs text-stone-300">
                    <strong className="text-white">Turnkey Logistics Packet:</strong> Receive standards-mapped syllabus, vendor tax paperwork (W-9), and district insurance certificate.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs flex items-center justify-center font-bold shrink-0 border border-cyan-500/30">
                    3
                  </div>
                  <div className="text-xs text-stone-300">
                    <strong className="text-white">Workshop Day:</strong> Our robotics specialists roll in, unpack the gear, and inspire your students without burdening your teachers.
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

