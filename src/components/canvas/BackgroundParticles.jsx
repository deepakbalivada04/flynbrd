import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function BackgroundParticles({ scrollProgress = 0 }) {
  const pointsRef = useRef();
  const count = 180;

  const [positions, originalColors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12 - 2;

      col[i * 3] = 1;
      col[i * 3 + 1] = 0.8;
      col[i * 3 + 2] = 0.4;
    }
    return [pos, col];
  }, []);

  const color1 = useMemo(() => new THREE.Color('#f59e0b'), []); // amber
  const color2 = useMemo(() => new THREE.Color('#eab308'), []); // gold/brass
  const color3 = useMemo(() => new THREE.Color('#38bdf8'), []); // sky blue
  const color4 = useMemo(() => new THREE.Color('#00f0ff'), []); // cyan

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();

    pointsRef.current.rotation.y = time * 0.02;
    pointsRef.current.rotation.x = Math.sin(time * 0.03) * 0.05;

    // Shift point color dynamically based on scroll progress
    let targetColor = color1;
    if (scrollProgress < 0.25) {
      const t = scrollProgress / 0.25;
      targetColor = color1.clone().lerp(color2, t * 0.4);
    } else if (scrollProgress < 0.5) {
      const t = (scrollProgress - 0.25) / 0.25;
      targetColor = color2.clone().lerp(color3, t);
    } else if (scrollProgress < 0.75) {
      const t = (scrollProgress - 0.5) / 0.25;
      targetColor = color3.clone().lerp(color4, t);
    } else {
      targetColor = color4;
    }

    if (pointsRef.current.material) {
      pointsRef.current.material.color.lerp(targetColor, 0.05);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#f59e0b"
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

