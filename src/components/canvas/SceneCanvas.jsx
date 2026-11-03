import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience';

export default function SceneCanvas({ scrollProgress = 0, currentPhase = 1 }) {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden"
    >
      <Canvas
        camera={{
          fov: 42,
          position: [0, 0, 7.5],
          near: 0.1,
          far: 50,
        }}
        dpr={[1, 1.8]} // Optimized for low-power school laptops & devices
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        style={{ pointerEvents: 'none' }}
      >
        <Suspense fallback={null}>
          <Experience
            scrollProgress={scrollProgress}
            currentPhase={currentPhase}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

