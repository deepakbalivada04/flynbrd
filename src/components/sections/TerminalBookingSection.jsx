import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassPedal from '../ui/GlassPedal';
import { playCelebrationChime, playTinyClick } from '../../utils/toyAudio';

/**
 * TerminalBookingSection
 * 
 * Re-engineered for executive proportions:
 * - Scaled-down, crystal-clear headings and typography
 * - Multi-layered frosted glass window and pedal badges
 * - Responsive administrative dispatch form with golden focus accents
 */
export default function TerminalBookingSection({ selectedProgramTitle = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    schoolName: '',
    designation: 'Principal',
    phone: '',
    email: '',
    studentCount: '100 - 250 Students',
    tier: selectedProgramTitle || 'Intermediate (Grades 6–8): AI Logic & Sonar',
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
    playTinyClick();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      playCelebrationChime();
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('mascot-celebrate', { detail: true }));
      }
    }, 600);
  };

  return (
    <section
      id="terminal-booking"
      className="relative w-full bg-black text-white px-6 sm:px-12 lg:px-16 py-20 sm:py-24 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header */}
        <div className="border-b border-white/10 pb-5 mb-10 flex items-center justify-between text-xs font-mono">
          <GlassPedal dot={true} dotColor="bg-amber-400">
            [ 06 // COMMAND TERMINAL PROTOCOL ]
          </GlassPedal>
          <GlassPedal dot={true} dotColor="bg-emerald-400" className="hidden sm:inline-flex">
            ENCRYPTED 256-BIT DISPATCH
          </GlassPedal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Information & Contact Meta */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-tight uppercase leading-[1.12] mb-4">
                Command <br />
                <span className="text-amber-400">Terminal.</span>
              </h2>

              <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed max-w-sm mb-6">
                Initiate district scheduling. Our STEM coordinator will review student headcount, grade cohorts, and calendar windows.
              </p>

              <div className="space-y-3.5 pt-5 border-t border-white/10 text-xs font-mono">
                <div className="flex items-center gap-2.5">
                  <span className="text-amber-400">●</span>
                  <span className="text-stone-400">DIRECT LINE:</span>
                  <span className="text-stone-200">+1 (800) 582-ROBO</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-amber-400">●</span>
                  <span className="text-stone-400">DISPATCH:</span>
                  <span className="text-stone-200">workshops@flyinbird-robotics.com</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-amber-400">●</span>
                  <span className="text-stone-400">SLA:</span>
                  <span className="text-stone-200">Guaranteed response within 24 business hours</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:block pt-10 border-t border-white/10 text-[10px] font-mono text-stone-400">
              SYS_REF: FY-2026 // K12_DISTRICT_PORTAL_V6
            </div>
          </div>

          {/* Right Column: Sleek Frosted Glass Window */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-7 sm:p-10 relative shadow-[0_16px_36px_rgba(0,0,0,0.8)]">
              
              {/* Terminal Window Header Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 text-[11px] font-mono text-stone-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-stone-600 rounded-none inline-block" />
                  <span className="w-2 h-2 bg-stone-600 rounded-none inline-block" />
                  <span className="w-2 h-2 bg-amber-400 rounded-none inline-block animate-pulse shadow-[0_0_6px_#facc15]" />
                  <span className="ml-2 text-stone-300">FLYINBIRD_TERMINAL // SESSION_01</span>
                </div>
                <span className="hidden sm:inline text-stone-400">PORT: 443 [TLS]</span>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-10 space-y-3 font-mono text-xs"
                >
                  <div className="text-amber-400 font-bold tracking-widest uppercase">
                    &gt; DISPATCH TRANSMISSION CONFIRMED.
                  </div>
                  <p className="text-stone-300 leading-relaxed max-w-md">
                    Payload logged for <strong>{formData.schoolName}</strong>. Official confirmation packet and curriculum syllabus assigned to <strong>{formData.name}</strong> ({formData.email}).
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-[11px] text-amber-400 hover:text-white uppercase tracking-wider underline underline-offset-4"
                    >
                      &gt; Send Additional Request
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Row 1: Name & School */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-mono tracking-widest text-stone-400 uppercase mb-1.5">
                        [01] INITIATOR_NAME *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Dr. Sarah Jenkins"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-white/20 pb-1.5 text-xs font-mono text-stone-100 placeholder-stone-600 focus:border-amber-400 focus:outline-none transition-colors rounded-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono tracking-widest text-stone-400 uppercase mb-1.5">
                        [02] SCHOOL_OR_DISTRICT *
                      </label>
                      <input
                        type="text"
                        name="schoolName"
                        required
                        placeholder="Horizon Valley High School"
                        value={formData.schoolName}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-white/20 pb-1.5 text-xs font-mono text-stone-100 placeholder-stone-600 focus:border-amber-400 focus:outline-none transition-colors rounded-none"
                      />
                    </div>
                  </div>

                  {/* Row 2: Designation & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-mono tracking-widest text-stone-400 uppercase mb-1.5">
                        [03] OFFICIAL_DESIGNATION *
                      </label>
                      <select
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-white/20 pb-1.5 text-xs font-mono text-stone-300 focus:border-amber-400 focus:outline-none transition-colors rounded-none"
                      >
                        <option value="Principal" className="bg-neutral-950 text-stone-200">Principal / Head of School</option>
                        <option value="Vice Principal" className="bg-neutral-950 text-stone-200">Vice Principal</option>
                        <option value="STEM Coordinator" className="bg-neutral-950 text-stone-200">STEM / Robotics Coordinator</option>
                        <option value="Curriculum Director" className="bg-neutral-950 text-stone-200">District Curriculum Director</option>
                        <option value="Science Teacher" className="bg-neutral-950 text-stone-200">Science / Tech Teacher</option>
                        <option value="Board Member" className="bg-neutral-950 text-stone-200">School Board Member</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono tracking-widest text-stone-400 uppercase mb-1.5">
                        [04] CONTACT_PHONE *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+1 (555) 019-2834"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-white/20 pb-1.5 text-xs font-mono text-stone-100 placeholder-stone-600 focus:border-amber-400 focus:outline-none transition-colors rounded-none"
                      />
                    </div>
                  </div>

                  {/* Row 3: Institutional Email & Headcount */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-mono tracking-widest text-stone-400 uppercase mb-1.5">
                        [05] DISTRICT_EMAIL *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="sjenkins@horizon.edu"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-white/20 pb-1.5 text-xs font-mono text-stone-100 placeholder-stone-600 focus:border-amber-400 focus:outline-none transition-colors rounded-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono tracking-widest text-stone-400 uppercase mb-1.5">
                        [06] ESTIMATED_HEADCOUNT *
                      </label>
                      <select
                        name="studentCount"
                        value={formData.studentCount}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-white/20 pb-1.5 text-xs font-mono text-stone-300 focus:border-amber-400 focus:outline-none transition-colors rounded-none"
                      >
                        <option value="30 - 60 Students" className="bg-neutral-950 text-stone-200">30 - 60 Students (1-2 Cohorts)</option>
                        <option value="60 - 150 Students" className="bg-neutral-950 text-stone-200">60 - 150 Students (Grade Cohort)</option>
                        <option value="150 - 300 Students" className="bg-neutral-950 text-stone-200">150 - 300 Students (Multi-Grade)</option>
                        <option value="300+ Students" className="bg-neutral-950 text-stone-200">300+ Students (Whole District)</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Tier Interest */}
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-stone-400 uppercase mb-1.5">
                      [07] WORKSHOP_TIER_SELECTION
                    </label>
                    <select
                      name="tier"
                      value={formData.tier}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/20 pb-1.5 text-xs font-mono text-stone-300 focus:border-amber-400 focus:outline-none transition-colors rounded-none"
                    >
                      <option value="Tier 01: Motors & Circuits (Grades 3–5)" className="bg-neutral-950 text-stone-200">Tier 01: Motors & Circuits (Grades 3–5)</option>
                      <option value="Tier 02: AI Logic & Sonar (Grades 6–8)" className="bg-neutral-950 text-stone-200">Tier 02: AI Logic & Sonar (Grades 6–8)</option>
                      <option value="Tier 03: Vision & Edge AI (Grades 9–12)" className="bg-neutral-950 text-stone-200">Tier 03: Vision & Edge AI (Grades 9–12)</option>
                      <option value="Full District Multi-Tier STEM Residency" className="bg-neutral-950 text-stone-200">Full District Multi-Tier STEM Residency</option>
                    </select>
                  </div>

                  {/* Submit Action */}
                  <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-chunky px-6 py-3 rounded-full text-xs sm:text-sm font-display font-extrabold text-black bg-[#FFC933] hover:bg-[#FFE28A] border-2 border-black flex items-center gap-2 disabled:opacity-50 select-none"
                    >
                      <span>{isSubmitting ? 'Transmitting request...' : 'Dispatch school demo request'}</span>
                      <span className="text-sm font-bold">→</span>
                    </button>

                    <span className="text-[11px] font-sans text-stone-400">
                      🔒 FERPA & COPPA confidential
                    </span>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
