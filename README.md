# Flyinbird AI & Robotics | B2B School Landing Page

A single-page, long-scroll React application engineered with **Vite**, **Tailwind CSS**, **React Three Fiber (R3F)**, and **GSAP (ScrollTrigger)**. Designed to sell turnkey AI and Robotics hands-on workshops to school administrators (Principals, STEM Directors, Superintendents).

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the local development server
npm run dev

# 3. Build for production
npm run build
```

---

## 🏛 Dual-Layer Architecture

### 1. Background Layer (3D Canvas)
- **`<SceneCanvas>`**: A fixed `<Canvas>` covering `100vw` and `100vh` positioned at `z-index: -10` with `pointer-events-none`.
- **Performance Optimized**: Configured with `dpr={[1, 1.8]}` to deliver smooth 60fps on low-power school laptops and Chromebooks without overheating weak integrated GPUs.
- **No Heavy Post-Processing**: Avoids expensive SSR or full-screen bloom passes. Employs lightweight emissive standard materials, additive point lights, and procedural geometry.
- **Smooth 3D Transitions**: Uses continuous mathematical crossfading (`requestAnimationFrame` via R3F `useFrame`) driven by GSAP ScrollTrigger normalized progress `[0, 1]`.

### 2. Foreground Layer (UI & Content)
- **Long-Scroll Sections**: 4 high-height (`min-h-screen`) sections that allow ample scroll room for 3D crossfades.
- **Dynamic UI Theming**: Tied to `currentPhase` (1 to 4), dynamically applying Tailwind classes to the root container and UI elements with smooth `duration-700` CSS transitions.

---

## 🎨 The 4 Phases & Dynamic UI Themes

| Phase | Scroll Range | 3D Narrative Object | UI Theme & Tailwind Styling | Target Audience Focus |
|---|---|---|---|---|
| **Phase 1: Early Man** | `0% - 25%` | Rugged stone with swirling fire ember particles & molten core | `bg-stone-950/85`, textured off-white text, amber glowing accents | **Hero Section**: Spark of discovery & curriculum-aligned vision |
| **Phase 2: Classical Inventor** | `25% - 50%` | Interlocking rotating brass gears, astrolabe rings & mechanical pendulum | `bg-sepia-900/90`, slate text, brass/gold buttons, blueprint grid borders | **Programs Section**: 3 tiers (Beginner, Intermediate, Advanced) |
| **Phase 3: Modern Developer** | `50% - 75%` | Silicon microchip with gold pins, glowing traces & 3D data lattice | `bg-slate-950/90`, stark white text, electric blue accents, sans/mono fonts | **Benefits & Logistics**: Zero Teacher Burden, all gear supplied, team trust |
| **Phase 4: AI Future** | `75% - 100%` | Sleek humanoid robot head, pulsing neural network eye & synaptic constellation | `bg-black/92`, neon cyan/purple accents, frosted glass cards (`backdrop-blur-xl bg-white/10`) | **Contact & Booking**: B2B Lead generation form with instant feedback |

---

## 🔄 Replacing 3D Placeholders with Custom `.glb` Models

Each 3D phase is cleanly isolated in `src/components/canvas/`. To swap the procedural primitives with your custom `.glb` 3D models:

1. **Place your `.glb` files** in the `public/models/` folder:
   - `public/models/phase1_early_man.glb`
   - `public/models/phase2_inventor.glb`
   - `public/models/phase3_developer.glb`
   - `public/models/phase4_robot.glb`

2. **Open the corresponding phase component** (e.g. `src/components/canvas/Phase1EarlyMan.jsx`):
   ```jsx
   import React from 'react';
   import { useGLTF } from '@react-three/drei';

   export default function Phase1EarlyMan({ opacity = 1 }) {
     const { scene } = useGLTF('/models/phase1_early_man.glb');

     return (
       <group visible={opacity > 0.01}>
         <primitive 
           object={scene.clone()} 
           scale={1.5} 
           position={[0, 0, 0]} 
         />
       </group>
     );
   }

   // Preload model for zero lag
   useGLTF.preload('/models/phase1_early_man.glb');
   ```

Repeat for:
- `Phase2Inventor.jsx`
- `Phase3Developer.jsx`
- `Phase4Robot.jsx`

---

## 📁 Project Structure

```
flyinbirdweb/
├── index.html                   # HTML template with Google Fonts (Cinzel, Inter, Orbitron, Fira Code)
├── package.json                 # React 18, Three.js, R3F, Drei, GSAP, Tailwind CSS
├── vite.config.js               # Optimized chunk splitting
├── tailwind.config.js           # Custom colors (sepia, brass, neon), fonts & animations
├── src/
│   ├── main.jsx                 # Application root mount
│   ├── App.jsx                  # GSAP ScrollTrigger, theme state & dual-layer orchestration
│   ├── index.css                # Blueprint grids, glow utilities, smooth scrollbar
│   ├── constants/
│   │   └── themeConfig.js       # Palette definitions, borders, lighting & metadata for 4 phases
│   ├── context/
│   │   └── ScrollContext.jsx    # Optional reactive scroll context
│   └── components/
│       ├── canvas/              # 3D R3F Layer
│       │   ├── SceneCanvas.jsx  # Fixed Canvas wrapper (dpr [1, 1.8], camera, WebGL configs)
│       │   ├── Experience.jsx   # Master scene crossfader & lighting controller
│       │   ├── Phase1EarlyMan.jsx # Stone, molten core & swirling embers
│       │   ├── Phase2Inventor.jsx # Synchronous interlocking brass gears & astrolabe
│       │   ├── Phase3Developer.jsx # Microchip die, bus traces & 3D data lattice
│       │   ├── Phase4Robot.jsx    # Humanoid robotic helm & neural aperture eye
│       │   └── BackgroundParticles.jsx # Color-morphing ambient 3D dust
│       └── ui/                  # Foreground HTML Layer
│           ├── Navbar.jsx       # Brand, phase navigation pills & quick booking CTA
│           ├── PhaseTracker.jsx # Floating vertical HUD scrubber with progress %
│           ├── HeroSection.jsx  # Section 1 (Early Man)
│           ├── ProgramsSection.jsx # Section 2 (Inventor - Grades 3-5, 6-8, 9-12)
│           ├── BenefitsSection.jsx # Section 3 (Developer - Teacher Burden, Gear, Team)
│           ├── ContactSection.jsx  # Section 4 (AI Robot - B2B Form + Confetti)
│           └── Footer.jsx       # Compliance, accreditation & copyright
```

