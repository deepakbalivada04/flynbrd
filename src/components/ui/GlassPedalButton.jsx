import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

/**
 * "Glass Pedal" CTA Button
 * Inspired by Nothing brand aesthetic:
 * - Sharp corners (rounded-none)
 * - Heavily frosted translucent glass (bg-white/5 backdrop-blur-xl)
 * - Multi-layered mechanical sliding pedal hover effect
 * - Transitions from subtle translucent to crisp swan white on black
 */
export default function GlassPedalButton({
  children,
  onClick,
  className = '',
  type = 'button',
  icon = true,
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center group focus:outline-none rounded-none ${className}`}
      whileTap={{ scale: 0.98 }}
    >
      {/* Background Secondary Glass Pedal (slides offset on hover) */}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-white/[0.03] backdrop-blur-md border border-white/15 translate-x-0 translate-y-0 transition-transform duration-300 ease-out group-hover:translate-x-1.5 group-hover:translate-y-1.5 group-hover:border-amber-200/40 rounded-none pointer-events-none"
      />

      {/* Primary Top Glass Pedal */}
      <span className="relative z-10 px-6 py-3.5 bg-white/[0.06] backdrop-blur-xl border border-white/20 text-xs font-mono tracking-widest uppercase text-stone-100 flex items-center gap-2.5 transition-all duration-300 group-hover:bg-stone-100 group-hover:text-black group-hover:border-stone-100 rounded-none">
        <span>{children}</span>
        {icon && (
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        )}
      </span>
    </motion.button>
  );
}

