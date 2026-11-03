import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Phase 4 Placeholder: Sleek humanoid robotic head & neural network eye.
 * Represents the AI Future / Autonomous Robotics.
 * 
 * TO REPLACE WITH A CUSTOM .GLB MODEL:
 * 1. Place your model in /public/models/phase4_robot.glb
 * 2. Inside this component:
 *    const { scene } = useGLTF('/models/phase4_robot.glb');
 *    return <primitive object={scene} scale={...} />
 */
export default function Phase4Robot({ opacity = 1 }) {
  const groupRef = useRef();
  const headRef = useRef();
  const eyeCoreRef = useRef();
  const neuralRingsRef = useRef();
  const synapsesRef = useRef();

  // Create constellation of synaptic nodes and lines
  const { nodePositions, lineGeometry } = useMemo(() => {
    const count = 30;
    const pos = [];
    const points = [];

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const radius = 1.8 + Math.random() * 0.4;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      pos.push([x, y, z]);

      // Connect each point to its neighbors
      if (i > 0) {
        points.push(new THREE.Vector3(x, y, z));
        points.push(new THREE.Vector3(pos[i - 1][0], pos[i - 1][1], pos[i - 1][2]));
      }
    }

    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return { nodePositions: pos, lineGeometry: geo };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current || opacity <= 0.01) return;

    const time = state.clock.getElapsedTime();

    // Robotic head tracking subtle cursor / breath movement
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(time * 0.4) * 0.25;
      headRef.current.rotation.x = Math.cos(time * 0.3) * 0.15;
      headRef.current.position.y = Math.sin(time * 1.6) * 0.08;
    }

    // Neural eye pulsing and scanning
    if (eyeCoreRef.current) {
      const pulse = 1 + Math.sin(time * 5) * 0.12;
      eyeCoreRef.current.scale.set(pulse, pulse, pulse);
    }

    // Neural rings rotating on multiple axes
    if (neuralRingsRef.current) {
      neuralRingsRef.current.rotation.z += delta * 0.6;
      neuralRingsRef.current.rotation.y += delta * 0.4;
    }

    // Synapses constellation slow spin
    if (synapsesRef.current) {
      synapsesRef.current.rotation.y = -time * 0.2;
    }
  });

  return (
    <group ref={groupRef} visible={opacity > 0.01}>
      {/* Humanoid Robot Head Chassis */}
      <group ref={headRef}>
        {/* Cranial Shell (Sleek aerodynamic skull) */}
        <mesh castShadow receiveShadow position={[0, 0.2, -0.1]}>
          <capsuleGeometry args={[0.85, 0.9, 16, 32]} />
          <meshStandardMaterial
            color="#090d16"
            roughness={0.15}
            metalness={0.9}
            transparent
            opacity={opacity * 0.95}
          />
        </mesh>

        {/* Jaw & Chin Facet */}
        <mesh position={[0, -0.65, 0.2]}>
          <boxGeometry args={[0.9, 0.6, 0.9]} />
          <meshStandardMaterial
            color="#0d1520"
            roughness={0.25}
            metalness={0.85}
            transparent
            opacity={opacity * 0.95}
          />
        </mesh>

        {/* Cyber Visor / Optical Bar */}
        <mesh position={[0, 0.05, 0.72]} rotation={[-0.1, 0, 0]}>
          <boxGeometry args={[1.35, 0.38, 0.25]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00e5ff"
            emissiveIntensity={1.2}
            roughness={0.05}
            metalness={0.9}
            transparent
            opacity={opacity * 0.9}
          />
        </mesh>

        {/* Central Neural Aperture / Eye */}
        <group ref={eyeCoreRef} position={[0, 0.05, 0.86]}>
          <mesh>
            <sphereGeometry args={[0.18, 24, 24]} />
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={opacity}
            />
          </mesh>
          <mesh>
            <ringGeometry args={[0.22, 0.26, 32]} />
            <meshBasicMaterial
              color="#ec4899"
              transparent
              opacity={opacity * 0.9}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>

        {/* Ear Audio Sensors / Nodes */}
        <mesh position={[-0.92, 0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.22, 0.22, 0.15, 16]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#7e22ce"
            emissiveIntensity={0.8}
            metalness={0.9}
            transparent
            opacity={opacity}
          />
        </mesh>
        <mesh position={[0.92, 0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.22, 0.22, 0.15, 16]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#0891b2"
            emissiveIntensity={0.8}
            metalness={0.9}
            transparent
            opacity={opacity}
          />
        </mesh>
      </group>

      {/* Holographic Neural Rings surrounding the head */}
      <group ref={neuralRingsRef}>
        <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[2.1, 0.02, 16, 64]} />
          <meshBasicMaterial
            color="#00f0ff"
            transparent
            opacity={opacity * 0.65}
          />
        </mesh>
        <mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
          <torusGeometry args={[2.3, 0.02, 16, 64]} />
          <meshBasicMaterial
            color="#a855f7"
            transparent
            opacity={opacity * 0.65}
          />
        </mesh>
      </group>

      {/* Floating Synaptic Constellation */}
      <group ref={synapsesRef}>
        {/* Synapse Lines */}
        <lineSegments geometry={lineGeometry}>
          <lineBasicMaterial
            color="#06b6d4"
            transparent
            opacity={opacity * 0.35}
          />
        </lineSegments>

        {/* Synapse Nodes */}
        {nodePositions.map((p, idx) => (
          <mesh key={idx} position={p}>
            <sphereGeometry args={[0.045, 8, 8]} />
            <meshBasicMaterial
              color={idx % 2 === 0 ? "#00f0ff" : "#ec4899"}
              transparent
              opacity={opacity * 0.8}
            />
          </mesh>
        ))}
      </group>

      {/* Cyber Neon Lights: Cyan Key Light, Magenta Rim Light */}
      <pointLight
        color="#00f0ff"
        intensity={3.5 * opacity}
        distance={8}
        position={[2, 1.5, 2.5]}
      />
      <pointLight
        color="#ec4899"
        intensity={3.0 * opacity}
        distance={8}
        position={[-2.5, -1, -2]}
      />
    </group>
  );
}

