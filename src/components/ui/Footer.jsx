import React from 'react';

export default function Footer() {
  return (
    <footer className="relative bg-transparent py-8 px-6 sm:px-12 lg:px-20 text-stone-400 text-[11px] font-mono pointer-events-none">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pointer-events-auto">
        <div>
          FLYINBIRD STEM · AI & Robotics Workshops for Schools
        </div>
        <div>
          © {new Date().getFullYear()} Flyinbird Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
