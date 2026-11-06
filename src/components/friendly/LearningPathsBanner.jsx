import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Bot, Cpu, BrainCircuit, Rocket, Code2, Compass } from 'lucide-react';
import FadeIn from '../common/FadeIn';

export default function LearningPathsBanner() {
  const navigate = useNavigate();

  const tracks = [
    {
      title: 'Robotics & Hardware',
      grades: 'Grades 3–8',
      desc: 'Snap circuits, torque ratios, ultrasonic sonar & autonomous maze-solving rovers.',
      icon: <Cpu className="w-5 h-5 text-[#1D9D53]" />,
      color: 'bg-[#1D9D53]/10 text-[#1D9D53] border-[#1D9D53]/20',
      badge: 'bg-[#1D9D53] text-white',
      dot: 'bg-[#1D9D53]',
    },
    {
      title: 'AI & Neural Networks',
      grades: 'Grades 8–12',
      desc: 'How LLMs reason, attention mechanisms, loss functions & live vision edge models.',
      icon: <BrainCircuit className="w-5 h-5 text-[#533788]" />,
      color: 'bg-[#533788]/10 text-[#533788] border-[#533788]/20',
      badge: 'bg-[#533788] text-white',
      dot: 'bg-[#533788]',
    },
    {
      title: 'Coding & Logic',
      grades: 'Grades 6–10',
      desc: 'Prompt engineering, verifiable reasoning & Python syntax through our LMS sandbox.',
      icon: <Code2 className="w-5 h-5 text-[#2576BC]" />,
      color: 'bg-[#2576BC]/10 text-[#2576BC] border-[#2576BC]/20',
      badge: 'bg-[#2576BC] text-white',
      dot: 'bg-[#2576BC]',
    },
    {
      title: 'Space Tech & Rovers',
      grades: 'Grades 6–12',
      desc: 'Chandrayaan-inspired rocker-bogie kinematics, power budgets & RF ground telemetry.',
      icon: <Rocket className="w-5 h-5 text-[#D4252A]" />,
      color: 'bg-[#D4252A]/10 text-[#D4252A] border-[#D4252A]/20',
      badge: 'bg-[#D4252A] text-white',
      dot: 'bg-[#D4252A]',
    },
  ];

  return (
    <section id="learning-paths-preview" className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200/80 relative overflow-hidden">
      
      {/* Ambient background glows with logo colors */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-20 blur-3xl -z-10">
        <div className="absolute top-0 left-10 w-80 h-80 rounded-full bg-[#1D9D53]" />
        <div className="absolute top-10 right-10 w-80 h-80 rounded-full bg-[#533788]" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-[#2576BC]" />
      </div>

      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div className="max-w-2xl">
            <FadeIn delay={0}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#EE7819]" />
                <span className="text-slate-800">Dedicated K-12 Curriculum</span>
              </div>
            </FadeIn>
            
            <FadeIn delay={80}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Structured learning paths for{' '}
                <span className="bg-gradient-to-r from-[#D4252A] via-[#EE7819] via-[#1D9D53] to-[#2576BC] bg-clip-text text-transparent">
                  every grade level.
                </span>
              </h2>
            </FadeIn>

            <FadeIn delay={120}>
              <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
                We've organized our curriculum into modular, age-appropriate tracks. Explore our dedicated learning paths page to search syllabi, modules, and hardware kit lists.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={160}>
            <button
              type="button"
              onClick={() => navigate('/learning-paths')}
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#533788] to-[#2576BC] hover:from-[#432c6e] hover:to-[#1d63a0] text-white font-bold text-sm shadow-md shadow-[#533788]/20 hover:shadow-lg transition-all flex items-center gap-2.5 cursor-pointer shrink-0 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Compass className="w-4 h-4 text-orange-200" />
              <span>Explore All Learning Paths</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </button>
          </FadeIn>
        </div>

        {/* 4 Multi-Color Track Previews */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {tracks.map((track, idx) => (
            <FadeIn key={idx} delay={idx * 60}>
              <div 
                onClick={() => navigate('/learning-paths')}
                className="h-full p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-[#2576BC] hover:bg-white hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center">
                      {track.icon}
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${track.badge}`}>
                      {track.grades}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#2576BC] transition-colors mb-2">
                    {track.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {track.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-[#2576BC] group-hover:translate-x-1 transition-transform">
                  <span>View Syllabus</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}

