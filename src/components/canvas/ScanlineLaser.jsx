import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Glowing horizontal holographic laser ring and scanline disc
 * Sweeps from character's feet to head during the evolutionary transition.
 */
export default function ScanlineLaser({
  y = 0,
  isActive = false,
  color = '#00f0ff',
}) {
  const ringRef = useRef();
  const discRef = useRef();
  const sparksRef = useRef();

  // Create sparks on the laser ring perimeter
  const sparkCount = 48;
  const { sparkPositions } = useMemo(() => {
    const pos = new Float32Array(sparkCount * 3);
    for (let i = 0; i < sparkCount; i++) {
      const angle = (i / sparkCount) * Math.PI * 2;
      const radius = 0.55 + (Math.random() - 0.5) * 0.12;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.06;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return { sparkPositions: pos };
  }, []);

  useFrame((state, delta) => {
    if (!isActive) return;

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 4;
    }
    if (sparksRef.current) {
      sparksRef.current.rotation.y += delta * 3;
    }
  });

  if (!isActive) return null;

  return (
    <group position={[0, y, 0]}>
      {/* Outer Glowing Holographic Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.58, 0.025, 16, 48]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.95}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Secondary Outer Ripple Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.72, 0.012, 16, 48]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Holographic Laser Cross-Section Disc */}
      <mesh ref={discRef} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.56, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* High-intensity Point Light illuminating the slice plane */}
      <pointLight
        color={color}
        intensity={5.0}
        distance={2.5}
        decay={2}
      />

      {/* Perimeter Laser Energy Sparks */}
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
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

