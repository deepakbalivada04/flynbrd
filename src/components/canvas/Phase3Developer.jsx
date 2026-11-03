import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Phase 3 Placeholder: Glowing microchip & abstract geometric data lattice.
 * Represents the Modern Developer / Digital Age.
 * 
 * TO REPLACE WITH A CUSTOM .GLB MODEL:
 * 1. Place your model in /public/models/phase3_chip.glb
 * 2. Inside this component:
 *    const { scene } = useGLTF('/models/phase3_chip.glb');
 *    return <primitive object={scene} scale={...} />
 */
export default function Phase3Developer({ opacity = 1 }) {
  const groupRef = useRef();
  const chipRef = useRef();
  const latticeGroupRef = useRef();
  const busLinesRef = useRef();

  // Generate 3D grid data nodes (Lattice)
  const latticeNodes = useMemo(() => {
    const nodes = [];
    const size = 3;
    const spacing = 0.85;

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          if (x === 0 && y === 0 && z === 0) continue; // Leave center for chip
          nodes.push({
            pos: [x * spacing, y * spacing, z * spacing],
            scale: 0.12 + Math.random() * 0.08,
            speed: 1.5 + Math.random() * 2,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
    }
    return nodes;
  }, []);

  // Perimeter chip pins
  const pins = useMemo(() => {
    const list = [];
    const countPerSide = 8;
    const offset = 0.95;

    for (let i = 0; i < countPerSide; i++) {
      const step = ((i - countPerSide / 2 + 0.5) / (countPerSide / 2)) * 0.75;
      // Top & Bottom pins
      list.push([step, 0, offset]);
      list.push([step, 0, -offset]);
      // Left & Right pins
      list.push([offset, 0, step]);
      list.push([-offset, 0, step]);
    }
    return list;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current || opacity <= 0.01) return;

    const time = state.clock.getElapsedTime();

    // Rotate entire microchip slowly with gentle pitch
    if (chipRef.current) {
      chipRef.current.rotation.y = time * 0.35;
      chipRef.current.rotation.x = Math.sin(time * 0.5) * 0.2 + 0.4;
      chipRef.current.position.y = Math.sin(time * 1.5) * 0.08;
    }

    // Rotate outer data lattice counter-clockwise
    if (latticeGroupRef.current) {
      latticeGroupRef.current.rotation.y = -time * 0.25;
      latticeGroupRef.current.rotation.z = Math.cos(time * 0.4) * 0.2;
    }

    // Pulse the bus lines
    if (busLinesRef.current) {
      busLinesRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef} visible={opacity > 0.01}>
      {/* Central Microprocessor Unit */}
      <group ref={chipRef}>
        {/* PCB Substrate base */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.9, 0.12, 1.9]} />
          <meshStandardMaterial
            color="#09182b"
            roughness={0.4}
            metalness={0.7}
            transparent
            opacity={opacity * 0.95}
          />
        </mesh>

        {/* Silicon Die / Heatspreader Core */}
        <mesh position={[0, 0.08, 0]}>
          <boxGeometry args={[1.1, 0.08, 1.1]} />
          <meshStandardMaterial
            color="#0284c7"
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={opacity}
          />
        </mesh>

        {/* Silicon Circuit Grid Core / Silicon Hologram */}
        <mesh position={[0, 0.13, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.9, 0.9, 8, 8]} />
          <meshBasicMaterial
            color="#38bdf8"
            wireframe
            transparent
            opacity={opacity * 0.8}
          />
        </mesh>

        {/* Perimeter gold / chrome connector pins */}
        {pins.map((pos, idx) => (
          <mesh key={idx} position={pos}>
            <boxGeometry args={[0.06, 0.04, 0.15]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#0284c7"
              emissiveIntensity={0.6}
              roughness={0.2}
              metalness={0.95}
              transparent
              opacity={opacity}
            />
          </mesh>
        ))}

        {/* Concentric data track rings */}
        <group ref={busLinesRef} position={[0, 0.15, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.35, 1.38, 32]} />
            <meshBasicMaterial
              color="#0ea5e9"
              transparent
              opacity={opacity * 0.6}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.55, 1.57, 32]} />
            <meshBasicMaterial
              color="#38bdf8"
              transparent
              opacity={opacity * 0.4}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      </group>

      {/* 3D Geometric Data Lattice Orbiting */}
      <group ref={latticeGroupRef}>
        {latticeNodes.map((node, i) => (
          <mesh key={i} position={node.pos}>
            <boxGeometry args={[node.scale, node.scale, node.scale]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#0284c7"
              emissiveIntensity={1.2}
              roughness={0.2}
              metalness={0.8}
              transparent
              opacity={opacity * 0.85}
            />
          </mesh>
        ))}

        {/* Data bounding wireframe cage */}
        <mesh scale={[2.6, 2.6, 2.6]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial
            color="#0284c7"
            wireframe
            transparent
            opacity={opacity * 0.25}
          />
        </mesh>
      </group>

      {/* Electric Blue Data Point Lights */}
      <pointLight
        color="#38bdf8"
        intensity={3.0 * opacity}
        distance={7}
        position={[0, 1.5, 1]}
      />
      <pointLight
        color="#0284c7"
        intensity={1.8 * opacity}
        distance={5}
        position={[-1.5, -1, -1]}
      />
    </group>
  );
}

