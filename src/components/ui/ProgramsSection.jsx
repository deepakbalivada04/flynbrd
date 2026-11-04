import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * Stripped-down Programs Section:
 * - 100% transparent, zero card containers or bounding boxes.
 * - Center 50vw completely empty.
 * - Sleek minimalist typography aligned flush left.
 */
export default function ProgramsSection({ onSelectProgram }) {
  const levels = [
    { grade: 'Grades 3–5', title: 'Basic Electronics & Block Coding', focus: 'DC motors, simple circuits, physical mechanics.' },
    { grade: 'Grades 6–8', title: 'AI Logic & Sensor Telemetry', focus: 'Ultrasonic sonars, logic loops, smart rovers.' },
    { grade: 'Grades 9–12', title: 'Python, Computer Vision & SLAM', focus: 'OpenCV image classification, neural edge inferencing.' },
  ];

  return (
    <section
      id="section-2"
      className="relative min-h-screen w-full flex items-center px-6 sm:px-12 lg:px-20 pointer-events-none"
    >
      <div className="w-full max-w-md flex flex-col items-start space-y-4 pointer-events-auto">
        
        {/* Subtle Era Eyebrow */}
        <span className="text-[11px] font-mono tracking-widest uppercase text-amber-400/90 font-medium">
          Era II · The Classical Inventor
        </span>

        {/* Scaled-Down Minimalist Headline */}
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white leading-tight font-sans">
          Beginner Workshops:{' '}
          <span className="text-amber-400 font-normal">Foundations</span>
        </h2>

        {/* Short 2-line description */}
        <p className="text-xs sm:text-sm text-stone-300 font-normal leading-relaxed max-w-sm">
          Scaffolded robotics curricula engineered by specialists to meet students at their exact cognitive stage.
        </p>

        {/* Clean floating text list without boxes or cards */}
        <div className="space-y-3 pt-2 w-full">
          {levels.map((lvl, idx) => (
            <div key={idx} className="flex flex-col space-y-0.5">
              <div className="flex items-baseline gap-2">
                <span className="text-[11px] font-mono font-medium text-amber-400/80">
                  {lvl.grade}
                </span>
                <span className="text-xs sm:text-sm text-stone-100 font-medium">
                  {lvl.title}
                </span>
              </div>
              <p className="text-[11px] text-stone-400 pl-0">
                {lvl.focus}
              </p>
            </div>
          ))}
        </div>

        {/* Sleek CTA */}
        <div className="pt-2">
          <button
            onClick={() => onSelectProgram('Foundations Workshop')}
            className="text-xs text-amber-400 hover:text-amber-300 font-medium transition-colors flex items-center gap-1.5"
          >
            <span>Book for Your School</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
