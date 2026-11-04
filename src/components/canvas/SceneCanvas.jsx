import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience';

export default function SceneCanvas() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden"
    >
      <Canvas
        camera={{
          fov: 40,
          position: [0, 0, 4.6],
          near: 0.1,
          far: 200, // Ample depth for vertical stacked environments
        }}
        dpr={[1, 1.8]} // Optimized for school Chromebooks & laptops
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
          localClippingEnabled: true, // Required for Data Scanline Model Swap
        }}
        onCreated={({ gl }) => {
          gl.localClippingEnabled = true;
        }}
        style={{ pointerEvents: 'none' }}
      >
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </Canvas>
    </div>
  );
}
