import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Phase 1 Placeholder: Rough, textured stone with swirling fire/ember particle effect.
 * Represents Early Man / Discovery & Fire.
 * 
 * TO REPLACE WITH A CUSTOM .GLB MODEL:
 * 1. Place your model in /public/models/phase1_stone.glb
 * 2. Import { useGLTF } from '@react-three/drei'
 * 3. Inside this component:
 *    const { scene } = useGLTF('/models/phase1_stone.glb');
 *    return <primitive object={scene} scale={...} />
 */
export default function Phase1EarlyMan({ opacity = 1, isActive = true }) {
  const groupRef = useRef();
  const stoneRef = useRef();
  const innerCoreRef = useRef();
  const embersRef = useRef();

  // Create ember particles
  const particleCount = 120;
  const { positions, velocities, scales } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    const sc = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Spawn within a cone around the stone
      const radius = 0.4 + Math.random() * 1.2;
      const angle = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 1.5;
      pos[i * 3 + 2] = Math.sin(angle) * radius;

      // Upward swirling velocity
      vel[i * 3] = (Math.random() - 0.5) * 0.015;
      vel[i * 3 + 1] = 0.01 + Math.random() * 0.025;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.015;

      sc[i] = Math.random() * 0.08 + 0.03;
    }
    return { positions: pos, velocities: vel, scales: sc };
  }, []);

  // Update particles and stone breathing animation
  useFrame((state, delta) => {
    if (!groupRef.current || opacity <= 0.01) return;

    const time = state.clock.getElapsedTime();

    // Gentle floating and rotation for the stone
    if (stoneRef.current) {
      stoneRef.current.rotation.y += delta * 0.25;
      stoneRef.current.rotation.x = Math.sin(time * 0.7) * 0.15;
      stoneRef.current.position.y = Math.sin(time * 1.2) * 0.1;
    }

    // Pulsing inner fire core
    if (innerCoreRef.current) {
      const pulse = 1 + Math.sin(time * 4) * 0.15 + Math.cos(time * 7) * 0.08;
      innerCoreRef.current.scale.set(pulse, pulse, pulse);
    }

    // Animate embers rising and looping
    if (embersRef.current) {
      const geo = embersRef.current.geometry;
      const posAttr = geo.attributes.position;
      const posArray = posAttr.array;

      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3] += velocities[i * 3];
        posArray[i * 3 + 1] += velocities[i * 3 + 1];
        posArray[i * 3 + 2] += velocities[i * 3 + 2];

        // Reset if reached ceiling
        if (posArray[i * 3 + 1] > 2.0) {
          posArray[i * 3 + 1] = -1.2;
          const radius = 0.4 + Math.random() * 0.9;
          const angle = Math.random() * Math.PI * 2;
          posArray[i * 3] = Math.cos(angle) * radius;
          posArray[i * 3 + 2] = Math.sin(angle) * radius;
        }
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} visible={opacity > 0.01}>
      {/* Central Rugged Stone (Dodecahedron with stylized roughness & displacement) */}
      <group ref={stoneRef}>
        {/* Outer rough stone layer */}
        <mesh castShadow receiveShadow>
          <dodecahedronGeometry args={[1.35, 1]} />
          <meshStandardMaterial
            color="#3b322c"
            roughness={0.9}
            metalness={0.15}
            flatShading
            transparent
            opacity={opacity * 0.95}
          />
        </mesh>

        {/* Inner molten core cracks */}
        <mesh scale={[1.05, 1.05, 1.05]}>
          <icosahedronGeometry args={[1.3, 0]} />
          <meshStandardMaterial
            color="#ff5722"
            emissive="#ea580c"
            emissiveIntensity={1.8}
            wireframe
            transparent
            opacity={opacity * 0.7}
          />
        </mesh>

        {/* Orbiting raw flint / obsidian shards */}
        {[0, 1, 2, 3].map((index) => {
          const angle = (index / 4) * Math.PI * 2;
          const dist = 1.8 + (index % 2) * 0.4;
          return (
            <mesh
              key={index}
              position={[
                Math.cos(angle) * dist,
                Math.sin(angle * 2) * 0.4,
                Math.sin(angle) * dist,
              ]}
              rotation={[index, index * 2, 0]}
              scale={0.25}
            >
              <tetrahedronGeometry args={[1, 0]} />
              <meshStandardMaterial
                color="#78350f"
                roughness={0.8}
                metalness={0.3}
                flatShading
                transparent
                opacity={opacity * 0.85}
              />
            </mesh>
          );
        })}
      </group>

      {/* Internal warm flame sphere */}
      <mesh ref={innerCoreRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.55, 16, 16]} />
        <meshBasicMaterial
          color="#f59e0b"
          transparent
          opacity={opacity * 0.85}
        />
      </mesh>

      {/* Point light representing the discovery of fire */}
      <pointLight
        color="#f97316"
        intensity={2.8 * opacity}
        distance={6}
        decay={2}
      />

      {/* Fire ember particles */}
      <points ref={embersRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={particleCount}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          color="#fbbf24"
          transparent
          opacity={opacity * 0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

