import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Procedural Gear Component with teeth and central hub
 */
function Gear({
  radius = 1,
  teeth = 12,
  depth = 0.2,
  color = '#d4af37',
  opacity = 1,
  wireframe = false,
}) {
  const toothWidth = (2 * Math.PI * radius) / (teeth * 2.5);
  const toothHeight = 0.22;

  return (
    <group>
      {/* Central Gear Disk */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, depth, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.85}
          wireframe={wireframe}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Central Axle Cutout / Hub */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[radius * 0.35, radius * 0.35, depth * 1.3, 16]} />
        <meshStandardMaterial
          color="#78350f"
          roughness={0.4}
          metalness={0.9}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Spoke Ring Cutout aesthetic */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius * 0.65, 0.04, 8, 24]} />
        <meshStandardMaterial
          color="#fef08a"
          roughness={0.2}
          metalness={0.9}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Teeth around perimeter */}
      {Array.from({ length: teeth }).map((_, i) => {
        const angle = (i / teeth) * Math.PI * 2;
        const x = Math.sin(angle) * (radius + toothHeight * 0.4);
        const z = Math.cos(angle) * (radius + toothHeight * 0.4);
        return (
          <mesh
            key={i}
            position={[x, 0, z]}
            rotation={[0, -angle, 0]}
            castShadow
          >
            <boxGeometry args={[toothWidth, depth, toothHeight]} />
            <meshStandardMaterial
              color={color}
              roughness={0.35}
              metalness={0.85}
              transparent
              opacity={opacity}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/**
 * Phase 2 Placeholder: Interlocking brass gears & mechanical astrolabe.
 * Represents Classical Inventor / Mechanics.
 * 
 * TO REPLACE WITH A CUSTOM .GLB MODEL:
 * 1. Place your model in /public/models/phase2_gears.glb
 * 2. Inside this component:
 *    const { scene } = useGLTF('/models/phase2_gears.glb');
 *    return <primitive object={scene} scale={...} />
 */
export default function Phase2Inventor({ opacity = 1 }) {
  const groupRef = useRef();
  const gear1Ref = useRef();
  const gear2Ref = useRef();
  const gear3Ref = useRef();
  const astrolabeRef = useRef();
  const pendulumRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current || opacity <= 0.01) return;

    const time = state.clock.getElapsedTime();
    const speed = 0.8;

    // Main gear clockwise (12 teeth)
    if (gear1Ref.current) {
      gear1Ref.current.rotation.y += delta * speed;
    }

    // Secondary gear counter-clockwise (8 teeth -> 12/8 = 1.5x speed)
    if (gear2Ref.current) {
      gear2Ref.current.rotation.y -= delta * (speed * 1.5);
    }

    // Third gear (6 teeth -> 12/6 = 2x speed)
    if (gear3Ref.current) {
      gear3Ref.current.rotation.y += delta * (speed * 2);
    }

    // Astrolabe gimbal rings slowly rotating on varied axes
    if (astrolabeRef.current) {
      astrolabeRef.current.rotation.x = Math.sin(time * 0.4) * 0.3;
      astrolabeRef.current.rotation.z = Math.cos(time * 0.3) * 0.25;
    }

    // Pendulum mechanical sway
    if (pendulumRef.current) {
      pendulumRef.current.rotation.z = Math.sin(time * 2.2) * 0.35;
    }
  });

  return (
    <group ref={groupRef} visible={opacity > 0.01}>
      {/* Astrolabe / Armillary Outer Rings */}
      <group ref={astrolabeRef}>
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[2.3, 0.04, 16, 64]} />
          <meshStandardMaterial
            color="#ca8a04"
            roughness={0.25}
            metalness={0.9}
            transparent
            opacity={opacity * 0.7}
          />
        </mesh>
        <mesh rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
          <torusGeometry args={[2.45, 0.03, 16, 64]} />
          <meshStandardMaterial
            color="#b45309"
            roughness={0.3}
            metalness={0.85}
            transparent
            opacity={opacity * 0.6}
          />
        </mesh>
      </group>

      {/* Main Driving Gear (Brass, 12 teeth, radius 1.1) */}
      <group
        ref={gear1Ref}
        position={[-0.4, 0.2, 0]}
        rotation={[Math.PI / 6, 0, 0]}
      >
        <Gear
          radius={1.05}
          teeth={12}
          depth={0.16}
          color="#eab308"
          opacity={opacity}
        />
      </group>

      {/* Interlocking Secondary Gear (Bronze, 8 teeth, radius 0.72) */}
      <group
        ref={gear2Ref}
        position={[0.95, -0.4, 0.1]}
        rotation={[Math.PI / 6, 0, 0]}
      >
        <Gear
          radius={0.7}
          teeth={8}
          depth={0.16}
          color="#d97706"
          opacity={opacity}
        />
      </group>

      {/* Interlocking Pinion Gear (Copper, 6 teeth, radius 0.52) */}
      <group
        ref={gear3Ref}
        position={[-1.4, -0.8, -0.1]}
        rotation={[Math.PI / 6, 0, 0]}
      >
        <Gear
          radius={0.52}
          teeth={6}
          depth={0.14}
          color="#b45309"
          opacity={opacity}
        />
      </group>

      {/* Mechanical Pendulum */}
      <group ref={pendulumRef} position={[0, 1.4, -0.3]}>
        <mesh position={[0, -0.8, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 1.6, 8]} />
          <meshStandardMaterial
            color="#92400e"
            roughness={0.3}
            metalness={0.8}
            transparent
            opacity={opacity}
          />
        </mesh>
        <mesh position={[0, -1.6, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.08, 16]} />
          <meshStandardMaterial
            color="#eab308"
            roughness={0.2}
            metalness={0.9}
            transparent
            opacity={opacity}
          />
        </mesh>
      </group>

      {/* Warm Golden/Brass Point Light */}
      <pointLight
        color="#fbbf24"
        intensity={2.2 * opacity}
        distance={7}
        position={[1, 1, 2]}
      />
    </group>
  );
}

