import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

/**
 * Stripped-down Contact Section:
 * - 100% transparent, zero card containers or glass boxes.
 * - Center 50vw completely empty so the landed AI robot is in full view.
 * - Minimalist floating underline inputs pushed flush left.
 */
export default function ContactSection({ selectedProgramTitle = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    schoolName: '',
    designation: 'Principal',
    phone: '',
    email: '',
    studentCount: '100 - 250 Students',
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
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#00f0ff', '#38bdf8', '#ffffff'],
        });
      } catch (err) {}
    }, 800);
  };

  return (
    <section
      id="section-4"
      className="relative min-h-screen w-full flex items-center px-6 sm:px-12 lg:px-20 pointer-events-none"
    >
      <div className="w-full max-w-md flex flex-col items-start space-y-4 pointer-events-auto text-left">
        
        {/* Subtle Era Eyebrow */}
        <span className="text-[11px] font-mono tracking-widest uppercase text-cyan-400 font-medium">
          Era IV · Autonomous AI
        </span>

        {/* Scaled-Down Minimalist Headline */}
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white leading-tight font-sans">
          Schedule a{' '}
          <span className="text-cyan-400 font-normal">School Demo</span>
        </h2>

        {/* Short 2-line description */}
        <p className="text-xs sm:text-sm text-stone-300 font-normal leading-relaxed max-w-sm">
          Empower your students with hands-on AI and robotics. Guaranteed administrator consultation within 24 business hours.
        </p>

        {submitted ? (
          <div className="py-6 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-sm font-medium text-white">Inquiry Received</span>
            </div>
            <p className="text-xs text-stone-300 max-w-xs">
              Thank you, <strong className="text-cyan-300">{formData.name}</strong>. Our school partnerships lead will reach out to {formData.schoolName} promptly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full space-y-3 pt-2">
            
            {/* Minimalist floating underline fields without bounding boxes */}
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                name="name"
                required
                placeholder="Your Name *"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 pb-1.5 text-xs text-white placeholder-stone-400 focus:border-cyan-400 focus:outline-none transition-colors"
              />
              <input
                type="text"
                name="schoolName"
                required
                placeholder="School / District *"
                value={formData.schoolName}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 pb-1.5 text-xs text-white placeholder-stone-400 focus:border-cyan-400 focus:outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="email"
                name="email"
                required
                placeholder="School Email *"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 pb-1.5 text-xs text-white placeholder-stone-400 focus:border-cyan-400 focus:outline-none transition-colors"
              />
              <input
                type="tel"
                name="phone"
                required
                placeholder="Phone Number *"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 pb-1.5 text-xs text-white placeholder-stone-400 focus:border-cyan-400 focus:outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 pb-1.5 text-xs text-stone-300 focus:border-cyan-400 focus:outline-none transition-colors"
              >
                <option value="Principal" className="bg-stone-900 text-white">Principal</option>
                <option value="STEM Coordinator" className="bg-stone-900 text-white">STEM Coordinator</option>
                <option value="Curriculum Director" className="bg-stone-900 text-white">Curriculum Director</option>
                <option value="Teacher" className="bg-stone-900 text-white">Science/Tech Teacher</option>
              </select>

              <select
                name="studentCount"
                value={formData.studentCount}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 pb-1.5 text-xs text-stone-300 focus:border-cyan-400 focus:outline-none transition-colors"
              >
                <option value="30 - 60 Students" className="bg-stone-900 text-white">30 - 60 Students</option>
                <option value="60 - 150 Students" className="bg-stone-900 text-white">60 - 150 Students</option>
                <option value="150 - 300 Students" className="bg-stone-900 text-white">150 - 300 Students</option>
                <option value="300+ Students" className="bg-stone-900 text-white">300+ Students</option>
              </select>
            </div>

            {/* Sleek CTA Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-stone-950 shadow-md hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Submitting...' : 'Request a School Demo'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </form>
        )}

      </div>
    </section>
  );
}
