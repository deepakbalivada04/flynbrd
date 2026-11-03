import React from 'react';
import { 
  Cpu, 
  Terminal, 
  GraduationCap, 
  Box, 
  Sparkles, 
  CheckCircle, 
  ShieldCheck, 
  Users, 
  Code2, 
  Award 
} from 'lucide-react';
import { THEMES } from '../../constants/themeConfig';

export default function BenefitsSection({ onBookDemoClick }) {
  const theme = THEMES[3];

  const adminConcerns = [
    {
      icon: Users,
      title: 'Zero Teacher Burden',
      tagline: 'Your faculty relaxes or observes.',
      description: 'Our certified engineering and pedagogy specialists manage the entire session—from setup and direct student coaching to classroom management and teardown.',
      bullets: [
        'No teacher training or lesson prep needed',
        'Teachers can participate as co-learners or grade tests',
        'Full curriculum slides & follow-up worksheets provided',
      ],
      highlight: '0 hrs faculty prep time',
    },
    {
      icon: Box,
      title: 'All Equipment Provided',
      tagline: 'We roll in with everything needed.',
      description: 'No hardware acquisition budgets, zero IT headaches. We arrive with sanitized robotic kits, secure pre-loaded tablets, sensors, tools, and spare parts.',
      bullets: [
        'Turnkey robotic kits and safety gear included',
        'Offline-capable software—no school network strain',
        'Guaranteed 1:2 student-to-robot ratio for maximum engagement',
      ],
      highlight: '100% turnkey hardware',
    },
    {
      icon: Sparkles,
      title: 'Future-Ready & STEM Aligned',
      tagline: 'Standards-aligned excellence.',
      description: 'Every exercise explicitly satisfies NGSS (Next Generation Science Standards), CSTA computer science standards, and state STEM benchmarks.',
      bullets: [
        'Direct mapping to state science & CTE mandates',
        'Measurable pre- and post-workshop student assessments',
        'Executive completion summary for school boards & grants',
      ],
      highlight: 'NGSS & CSTA certified',
    },
  ];

  const teamHighlights = [
    {
      name: 'Dr. Marcus Vance, Ph.D.',
      role: 'Chief Curriculum Architect',
      credentials: 'Ex-MIT Robotics Lab • 12+ Yrs STEM Pedagogy',
      bio: 'Pioneered hands-on computational thinking modules adopted by over 200 public school districts.',
    },
    {
      name: 'Elena Rostova, M.S.',
      role: 'Head of Engineering & Kits',
      credentials: 'Stanford CS • FIRST Robotics World Champion Judge',
      bio: 'Designed proprietary modular robotics hardware that safely accelerates student intuition without soldering.',
    },
    {
      name: 'David Chen, M.Ed.',
      role: 'Director of School Partnerships',
      credentials: 'Former High School Principal • District CTE Leader',
      bio: 'Ensures seamless logistics, compliance, and frictionless administrative scheduling for partner schools.',
    },
  ];

  return (
    <section
      id="section-3"
      className="relative min-h-screen w-full flex flex-col justify-center py-24 px-4 sm:px-8 lg:px-16"
    >
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="pb-12 border-b border-sky-900/40">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-sky-500/40 bg-sky-950/60 text-sky-300 text-xs font-mono tracking-wider mb-3">
            <Terminal className="w-3.5 h-3.5 text-sky-400" />
            <span>ERA III // THE SILICON LATTICE & MODERN DEVELOPER</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display">
            Built Specifically for{' '}
            <span className="text-sky-400 text-glow-blue">
              School Administrators
            </span>
          </h2>
          <p className="mt-3 text-slate-300 text-base max-w-2xl">
            We understand the real logistical challenges of public and private schools: tight budgets, overloaded teachers, and strict curriculum compliance.
          </p>
        </div>

        {/* 3 Core Benefits Grid (Addressing Admin Concerns) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {adminConcerns.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={idx}
                className="relative p-7 rounded-2xl bg-slate-900/75 backdrop-blur-md border border-sky-500/30 shadow-2xl flex flex-col justify-between hover:border-sky-400/60 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div>
                  {/* Highlight Tag */}
                  <div className="inline-block px-2.5 py-1 rounded bg-sky-500/10 border border-sky-500/20 text-sky-300 font-mono text-[11px] mb-4">
                    {benefit.highlight}
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                        {benefit.title}
                      </h3>
                      <p className="text-xs text-sky-400/80 font-mono">
                        {benefit.tagline}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {benefit.description}
                  </p>

                  {/* Feature Checks */}
                  <div className="space-y-2.5 pt-4 border-t border-slate-800">
                    {benefit.bullets.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Logistics Guarantee</span>
                  <span className="text-sky-400">Verified ✓</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Short "Meet the Team" Trust Section */}
        <div className="mt-16 p-8 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-sky-500/30 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-sky-400 mb-1">
                <Code2 className="w-4 h-4" />
                <span>EXPERTISE & PEDAGOGY LEADERSHIP</span>
              </div>
              <h3 className="text-2xl font-bold text-white font-display">
                Meet the Engineering & Curriculum Team
              </h3>
              <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                Our workshops are directed by seasoned robotics engineers and educators dedicated to inspiring the next generation of builders.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-950/60 border border-sky-500/30">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Livescan Fingerprinted & Vetted</span>
              </div>
            </div>
          </div>

          {/* Team Cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamHighlights.map((member, mIdx) => (
              <div
                key={mIdx}
                className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-sky-500/40 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center font-bold text-white text-sm">
                    {member.name.split(' ')[1]?.[0] || 'F'}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {member.name}
                    </h4>
                    <div className="text-xs text-sky-400 font-mono">
                      {member.role}
                    </div>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-slate-400 bg-sky-950/40 p-2 rounded mb-3 border border-sky-900/30">
                  {member.credentials}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>

          {/* Action Callout */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-300">
              Want a customized workshop plan mapped to your district's specific STEM curriculum?
            </div>
            <button
              onClick={onBookDemoClick}
              className="px-5 py-2.5 rounded-lg text-xs font-mono font-bold bg-sky-500 hover:bg-sky-400 text-slate-950 transition-colors shrink-0 shadow-lg shadow-sky-950/50"
            >
              Consult with Curriculum Lead →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

