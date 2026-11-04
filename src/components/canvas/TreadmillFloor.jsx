import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function TreadmillFloor({ currentPhase = 1, speed = 1.0 }) {
  const meshRef = useRef();
  const speedLinesRef = useRef();

  // Create speed line streaks
  const lineCount = 40;
  const { linePositions, lineData } = useMemo(() => {
    const pos = new Float32Array(lineCount * 6);
    const data = [];
    for (let i = 0; i < lineCount; i++) {
      const x = (Math.random() - 0.5) * 4.5;
      const z = (Math.random() - 0.5) * 12;
      const len = 0.8 + Math.random() * 1.4;
      data.push({ x, z, len, spd: 2.5 + Math.random() * 1.5 });

      pos[i * 6] = x;
      pos[i * 6 + 1] = -0.95;
      pos[i * 6 + 2] = z;

      pos[i * 6 + 3] = x;
      pos[i * 6 + 4] = -0.95;
      pos[i * 6 + 5] = z + len;
    }
    return { linePositions: pos, lineData: data };
  }, []);

  // Floor grid shader / material color per phase
  const phaseColors = useMemo(() => ({
    1: new THREE.Color('#d97706'), // Amber
    2: new THREE.Color('#ca8a04'), // Brass/Gold
    3: new THREE.Color('#0284c7'), // Electric Blue
    4: new THREE.Color('#00f0ff'), // Neon Cyan
  }), []);

  useFrame((_, delta) => {
    if (!speedLinesRef.current) return;

    const geo = speedLinesRef.current.geometry;
    const pos = geo.attributes.position.array;

    // Move speed lines backward to create treadmill effect
    const walkSpeed = 3.2 * speed;
    for (let i = 0; i < lineCount; i++) {
      lineData[i].z += delta * walkSpeed;
      if (lineData[i].z > 6) {
        lineData[i].z = -6;
        lineData[i].x = (Math.random() - 0.5) * 4.5;
      }

      pos[i * 6] = lineData[i].x;
      pos[i * 6 + 2] = lineData[i].z;
      pos[i * 6 + 3] = lineData[i].x;
      pos[i * 6 + 5] = lineData[i].z + lineData[i].len;
    }
    geo.attributes.position.needsUpdate = true;

    // Smoothly tint line color to match current phase
    if (speedLinesRef.current.material) {
      const targetCol = phaseColors[currentPhase] || phaseColors[1];
      speedLinesRef.current.material.color.lerp(targetCol, delta * 4);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Subtle treadmill ground plane */}
      <mesh
        ref={meshRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.96, 0]}
        receiveShadow
      >
        <planeGeometry args={[10, 18, 20, 36]} />
        <meshStandardMaterial
          color="#050810"
          roughness={0.7}
          metalness={0.4}
        />
      </mesh>

      {/* Retro-futuristic treadmill speed lines */}
      <lineSegments ref={speedLinesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            count={lineCount * 2}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#d97706"
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Treadmill Track Side Rail Guides */}
      <mesh position={[-1.2, -0.94, 0]}>
        <boxGeometry args={[0.04, 0.02, 16]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.25} />
      </mesh>
      <mesh position={[1.2, -0.94, 0]}>
        <boxGeometry args={[0.04, 0.02, 16]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

