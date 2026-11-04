import React from 'react';

/**
 * CosmicBackground
 * 
 * Provides a clean, minimalist pure-black canvas with:
 * - Geometric crosshair stars (+) matching the reference image
 * - Subtle twinkling celestial dots
 * - Faint orbital arcs and vector grid lines
 * - 100% vector CSS/SVG - ultra high-performance, crisp on all displays
 */
export default function CosmicBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden bg-black"
    >
      {/* 1. Technical 64px Vector Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.6) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.6) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* 2. Vector Celestial Crosshairs (+) & Stars */}
      <svg className="absolute inset-0 w-full h-full opacity-60">
        {/* Large Crosshair Stars (+) as in reference image */}
        <g stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round">
          {/* Top-Right Cluster */}
          <path d="M 820 140 L 820 160 M 810 150 L 830 150" opacity="0.8" />
          <path d="M 960 90 L 960 115 M 947 102.5 L 973 102.5" opacity="0.9" />
          <path d="M 720 220 L 720 236 M 712 228 L 728 228" opacity="0.5" />
          <path d="M 880 290 L 880 306 M 872 298 L 888 298" opacity="0.6" />

          {/* Center Space */}
          <path d="M 520 80 L 520 94 M 513 87 L 527 87" opacity="0.4" />
          <path d="M 440 240 L 440 252 M 434 246 L 446 246" opacity="0.45" />

          {/* Left Space Cluster */}
          <path d="M 180 180 L 180 196 M 172 188 L 188 188" opacity="0.7" />
          <path d="M 280 90 L 280 102 M 274 96 L 286 96" opacity="0.35" />
          <path d="M 90 340 L 90 354 M 83 347 L 97 347" opacity="0.5" />

          {/* Lower Regions */}
          <path d="M 640 580 L 640 594 M 633 587 L 647 587" opacity="0.4" />
          <path d="M 320 720 L 320 736 M 312 728 L 328 728" opacity="0.5" />
          <path d="M 860 840 L 860 856 M 852 848 L 868 848" opacity="0.6" />
        </g>

        {/* Golden Crosshair Highlights */}
        <g stroke="#facc15" strokeWidth="1.2" strokeLinecap="round">
          <path d="M 620 180 L 620 194 M 613 187 L 627 187" opacity="0.75" />
          <path d="M 760 360 L 760 372 M 754 366 L 766 366" opacity="0.6" />
          <path d="M 220 480 L 220 494 M 213 487 L 227 487" opacity="0.7" />
        </g>

        {/* Small Twinkling Circular Star Dots */}
        <g fill="#ffffff">
          <circle cx="120" cy="110" r="1.5" opacity="0.8" />
          <circle cx="210" cy="70" r="1" opacity="0.6" />
          <circle cx="340" cy="190" r="1.2" opacity="0.5" />
          <circle cx="480" cy="130" r="1.5" opacity="0.7" />
          <circle cx="560" cy="270" r="1" opacity="0.4" />
          <circle cx="680" cy="100" r="1.2" opacity="0.6" />
          <circle cx="780" cy="60" r="1" opacity="0.5" />
          <circle cx="890" cy="190" r="1.4" opacity="0.8" />
          <circle cx="980" cy="230" r="1.2" opacity="0.6" />

          {/* Mid Section */}
          <circle cx="150" cy="420" r="1.2" opacity="0.5" />
          <circle cx="380" cy="510" r="1.5" opacity="0.7" />
          <circle cx="720" cy="460" r="1" opacity="0.4" />
          <circle cx="840" cy="530" r="1.5" opacity="0.6" />
          <circle cx="940" cy="610" r="1.2" opacity="0.5" />

          {/* Lower Section */}
          <circle cx="260" cy="780" r="1.2" opacity="0.6" />
          <circle cx="490" cy="840" r="1.5" opacity="0.7" />
          <circle cx="760" cy="790" r="1.2" opacity="0.5" />
          <circle cx="910" cy="920" r="1" opacity="0.6" />
        </g>

        {/* Golden Specular Dots */}
        <g fill="#facc15">
          <circle cx="610" cy="120" r="1.5" opacity="0.8" />
          <circle cx="740" cy="260" r="1.2" opacity="0.7" />
          <circle cx="390" cy="310" r="1.2" opacity="0.6" />
          <circle cx="820" cy="670" r="1.5" opacity="0.75" />
        </g>

        {/* Subtle Ambient Cosmic Orbit Lines */}
        <path
          d="M -100 400 C 300 200, 800 200, 1200 450"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth="1"
          strokeDasharray="4 8"
          fill="none"
        />
        <path
          d="M -50 750 C 400 650, 900 650, 1350 820"
          stroke="rgba(250, 204, 21, 0.05)"
          strokeWidth="1"
          strokeDasharray="6 12"
          fill="none"
        />
      </svg>
    </div>
  );
}

