import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { freeFallState } from './freeFallState';

/**
 * Upward-rushing vertical particle & streak field.
 * Simulates extreme vertical terminal velocity descent.
 * Particles rush upward (+Y) past the falling character.
 */
export default function VerticalSpeedStream() {
  const linesRef = useRef();
  const sparksRef = useRef();

  const count = 75;
  const { linePositions, lineData } = useMemo(() => {
    const pos = new Float32Array(count * 6);
    const data = [];

    for (let i = 0; i < count; i++) {
      const radius = 1.0 + Math.random() * 4.5;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * 16;
      const length = 1.2 + Math.random() * 2.8;
      const spd = 16 + Math.random() * 18;

      data.push({ x, y, z, length, spd });

      pos[i * 6] = x;
      pos[i * 6 + 1] = y;
      pos[i * 6 + 2] = z;

      pos[i * 6 + 3] = x;
      pos[i * 6 + 4] = y + length;
      pos[i * 6 + 5] = z;
    }
    return { linePositions: pos, lineData: data };
  }, []);

  // Small floating dust/embers
  const sparkCount = 120;
  const { sparkPositions, sparkData } = useMemo(() => {
    const pos = new Float32Array(sparkCount * 3);
    const data = [];
    for (let i = 0; i < sparkCount; i++) {
      const radius = 0.6 + Math.random() * 4.0;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * 14;
      const spd = 8 + Math.random() * 12;
      data.push({ x, y, z, spd });

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }
    return { sparkPositions: pos, sparkData: data };
  }, []);

  const color1 = useMemo(() => new THREE.Color('#ea580c'), []); // Ember
  const color2 = useMemo(() => new THREE.Color('#d97706'), []); // Brass
  const color3 = useMemo(() => new THREE.Color('#00f0ff'), []); // Neon Blue
  const color4 = useMemo(() => new THREE.Color('#38bdf8'), []); // Cyan

  useFrame((_, delta) => {
    // Current speed scales down as landing progress approaches 1.0
    const descentFactor = Math.max(0.05, 1.0 - freeFallState.landingProgress * 0.95);
    const speedMult = freeFallState.speed * descentFactor;

    // 1. Update Speed Lines
    if (linesRef.current) {
      const geo = linesRef.current.geometry;
      const pos = geo.attributes.position.array;

      for (let i = 0; i < count; i++) {
        lineData[i].y += delta * lineData[i].spd * speedMult;
        if (lineData[i].y > 8) {
          lineData[i].y = -8;
          const radius = 1.0 + Math.random() * 4.5;
          const angle = Math.random() * Math.PI * 2;
          lineData[i].x = Math.cos(angle) * radius;
          lineData[i].z = Math.sin(angle) * radius;
        }

        pos[i * 6] = lineData[i].x;
        pos[i * 6 + 1] = lineData[i].y;
        pos[i * 6 + 2] = lineData[i].z;

        pos[i * 6 + 3] = lineData[i].x;
        pos[i * 6 + 4] = lineData[i].y + lineData[i].length * (0.4 + speedMult * 0.6);
        pos[i * 6 + 5] = lineData[i].z;
      }
      geo.attributes.position.needsUpdate = true;

      // Color tint shift
      let targetColor = color1;
      const p = freeFallState.progress;
      if (p < 0.25) targetColor = color1;
      else if (p < 0.5) targetColor = color2;
      else if (p < 0.75) targetColor = color3;
      else targetColor = color4;

      linesRef.current.material.color.lerp(targetColor, delta * 3);
    }

    // 2. Update Sparks
    if (sparksRef.current) {
      const geo = sparksRef.current.geometry;
      const pos = geo.attributes.position.array;

      for (let i = 0; i < sparkCount; i++) {
        sparkData[i].y += delta * sparkData[i].spd * speedMult;
        if (sparkData[i].y > 7) {
          sparkData[i].y = -7;
          const radius = 0.6 + Math.random() * 4.0;
          const angle = Math.random() * Math.PI * 2;
          sparkData[i].x = Math.cos(angle) * radius;
          sparkData[i].z = Math.sin(angle) * radius;
        }
        pos[i * 3] = sparkData[i].x;
        pos[i * 3 + 1] = sparkData[i].y;
        pos[i * 3 + 2] = sparkData[i].z;
      }
      geo.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* High-speed vertical streaks */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            count={count * 2}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#ea580c"
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Rushing Sparks / Motes */}
      <points ref={sparksRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[sparkPositions, 3]}
            count={sparkCount}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#ffffff"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

