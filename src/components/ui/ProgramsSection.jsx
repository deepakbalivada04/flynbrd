import React, { useState } from 'react';
import { Cog, Cpu, Eye, CheckCircle2, ArrowRight, Wrench, Sparkles, Layers } from 'lucide-react';
import { THEMES } from '../../constants/themeConfig';

export default function ProgramsSection({ onSelectProgram }) {
  const theme = THEMES[2];
  const [selectedLevel, setSelectedLevel] = useState('all');

  const programs = [
    {
      id: 'beginner',
      title: 'Foundation Robotics & Motors',
      grade: 'Grades 3–5',
      badge: 'Beginner Tier',
      duration: 'Half-Day or Full-Day Intensive',
      icon: Cog,
      description: 'Hands-on discovery of how electricity, gears, and logical instructions bring physical machines to life.',
      curriculum: [
        'Basic electronics & closed circuit fundamentals',
        'DC geared motors, torque, and pulley mechanisms',
        'Visual block coding with drag-and-drop logic loops',
        'Introduction to sensor triggers (light & push buttons)',
      ],
      handsOnProject: 'Build & race an autonomous obstacle-avoiding "Bionic Rover" with smart motor controls.',
      equipmentIncluded: 'Snap-circuit trays, kid-safe geared chassis, pre-configured tactile coding tablets.',
      borderAccent: 'border-amber-600/40',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    },
    {
      id: 'intermediate',
      title: 'Sensory Intelligence & AI Logic',
      grade: 'Grades 6–8',
      badge: 'Intermediate Tier',
      duration: '1–2 Day Immersive Lab',
      icon: Layers,
      description: 'Transitioning from mechanical cogs to algorithmic decision making and multi-sensor robotic telemetry.',
      curriculum: [
        'Introductory machine perception & ultrasonic distance sonar',
        'Conditional logic, PID speed feedback, and error correction',
        'Sensor fusion: infrared line trackers + ambient sound triggers',
        'Block-to-Python hybrid syntax introduction',
      ],
      handsOnProject: 'Engineer a smart search-and-rescue rover navigating an unknown randomized maze autonomously.',
      equipmentIncluded: 'Arduino-compatible robotic hubs, multi-sensor suites, programmable servo motors.',
      borderAccent: 'border-yellow-500/50',
      badgeColor: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      isPopular: true,
    },
    {
      id: 'advanced',
      title: 'Autonomous Systems & Computer Vision',
      grade: 'Grades 9–12',
      badge: 'Advanced Tier',
      duration: '2–3 Day Advanced Residency',
      icon: Cpu,
      description: 'University-level AI engineering distilled into an empowering, real-world project for high schoolers.',
      curriculum: [
        'Pure Python coding for robotics and edge computing',
        'OpenCV computer vision: color masks, facial tracking & object detection',
        'Autonomous navigation & SLAM (Simultaneous Localization & Mapping)',
        'Neural network edge inferencing on embedded hardware',
      ],
      handsOnProject: 'Deploy an AI-guided robotic sorting arm that visually classifies objects and sorts them in real-time.',
      equipmentIncluded: 'Edge AI compute boards (Raspberry Pi / Jetson), high-res cameras, precision robotic arms.',
      borderAccent: 'border-amber-400/40',
      badgeColor: 'bg-amber-400/20 text-amber-200 border-amber-400/30',
    },
  ];

  const filteredPrograms = selectedLevel === 'all' 
    ? programs 
    : programs.filter(p => p.id === selectedLevel);

  return (
    <section
      id="section-2"
      className="relative min-h-screen w-full flex flex-col justify-center py-24 px-4 sm:px-8 lg:px-16"
    >
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Section Header with Blueprint / Clockwork styling */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-amber-800/40">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-amber-600/40 bg-amber-950/50 text-amber-300 text-xs font-mono tracking-wider mb-3">
              <Cog className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
              <span>ERA II // THE MECHANICAL INVENTOR</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display">
              Curriculum-Aligned{' '}
              <span className="text-amber-400 text-glow-gold">
                Workshop Programs
              </span>
            </h2>
            <p className="mt-3 text-stone-300 text-base max-w-xl">
              Turnkey, scaffolded robotics curricula engineered by robotics specialists to meet students at their exact cognitive stage.
            </p>
          </div>

          {/* Grade filter tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-900/80 rounded-xl border border-amber-700/40">
            {['all', 'beginner', 'intermediate', 'advanced'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono uppercase transition-all ${
                  selectedLevel === lvl
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                {lvl === 'all' ? 'All Grades' : lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Programs Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((prog) => {
            const Icon = prog.icon;
            return (
              <div
                key={prog.id}
                className={`relative flex flex-col justify-between p-7 rounded-2xl bg-[#1b120c]/85 backdrop-blur-md border ${prog.borderAccent} shadow-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-amber-950/50 group`}
              >
                {/* Popular Ribbon */}
                {prog.isPopular && (
                  <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-stone-950 font-bold text-[11px] font-mono tracking-wider uppercase shadow-md">
                    Most Popular Choice
                  </div>
                )}

                <div>
                  {/* Top Meta info */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-semibold border ${prog.badgeColor}`}>
                      {prog.grade}
                    </span>
                    <span className="text-xs text-amber-300/80 font-mono">
                      {prog.duration}
                    </span>
                  </div>

                  {/* Program Title */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                        {prog.title}
                      </h3>
                      <span className="text-xs text-stone-400 font-mono">
                        {prog.badge}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-stone-300 mb-6 leading-relaxed">
                    {prog.description}
                  </p>

                  {/* Curriculum Bullet Points */}
                  <div className="space-y-2 mb-6">
                    <div className="text-xs font-mono uppercase tracking-wider text-amber-400/90 font-bold">
                      Key Concepts Covered:
                    </div>
                    {prog.curriculum.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-stone-300">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Capstone project highlight */}
                  <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/30 mb-6">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-300 mb-1">
                      <Wrench className="w-3.5 h-3.5 text-amber-400" />
                      <span>CAPSTONE BUILD</span>
                    </div>
                    <p className="text-xs text-stone-300">
                      {prog.handsOnProject}
                    </p>
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-4 border-t border-amber-900/30">
                  <button
                    onClick={() => onSelectProgram(prog.title)}
                    className="w-full py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600 hover:from-amber-500 hover:to-yellow-500 text-stone-950 shadow-md transition-all active:scale-[0.98]"
                  >
                    <span>Request Demo for {prog.grade}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Blueprint Hardware Assurance Note */}
        <div className="mt-12 p-6 rounded-2xl border border-amber-700/30 bg-[#160e09]/80 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Need a Multi-Grade or Whole-School STEM Week?</h4>
              <p className="text-xs text-stone-400">
                We customize tiered schedules so elementary, middle, and high schools can experience age-appropriate workshops in parallel.
              </p>
            </div>
          </div>
          <button
            onClick={() => onSelectProgram('Custom Multi-Grade Package')}
            className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold border border-amber-500/50 hover:bg-amber-950/60 text-amber-200 shrink-0 transition-colors"
          >
            Inquire for Whole District →
          </button>
        </div>

      </div>
    </section>
  );
}

