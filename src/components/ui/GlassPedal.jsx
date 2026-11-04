import React from 'react';

/**
 * GlassPedal
 * 
 * High-end frosted glass badge / pedal:
 * - Multi-layered translucent glass (bg-white/[0.06] with backdrop-blur-xl)
 * - 1px crisp border (border-white/15) with subtle top specular highlight
 * - Golden yellow indicator dot or micro-accent
 * - Used to wrap badges, technical metadata, and key terms with luxury tactility
 */
export default function GlassPedal({
  children,
  className = '',
  dot = false,
  dotColor = 'bg-amber-400',
  icon = null,
  active = false,
  onClick,
}) {
  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      onClick={onClick}
      className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all duration-300 ${
        active
          ? 'bg-white/15 border-amber-400/50 text-white shadow-[0_0_16px_rgba(250,204,21,0.25)]'
          : 'bg-white/[0.05] hover:bg-white/[0.09] border-white/15 text-stone-200'
      } border backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] ${
        onClick ? 'cursor-pointer hover:scale-[1.03] active:scale-[0.98]' : ''
      } ${className}`}
    >
      {/* Optional Pulsing Dot */}
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColor} ${active ? 'animate-pulse shadow-[0_0_8px_#facc15]' : ''}`} />
      )}

      {/* Optional Icon */}
      {icon && <span className="text-amber-400 text-xs">{icon}</span>}

      {/* Label Content */}
      <span className="font-medium text-[11px] sm:text-xs">{children}</span>
    </Component>
  );
}

