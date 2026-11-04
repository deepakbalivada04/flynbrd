import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Procedural Gear for Zone 2
 */
function FloatingGear({ radius = 1.2, teeth = 10, depth = 0.15, color = '#c59f4e', position, rotationSpeed = 0.5 }) {
  const meshRef = useRef();
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * rotationSpeed;
    }
  });

  return (
    <group position={position} ref={meshRef}>
      <mesh castShadow>
        <cylinderGeometry args={[radius, radius, depth, 24]} />
        <meshStandardMaterial color={color} metalness={0.88} roughness={0.3} />
      </mesh>
      {Array.from({ length: teeth }).map((_, i) => {
        const angle = (i / teeth) * Math.PI * 2;
        const x = Math.sin(angle) * (radius + 0.15);
        const y = Math.cos(angle) * (radius + 0.15);
        return (
          <mesh key={i} position={[x, y, 0]} rotation={[0, 0, -angle]}>
            <boxGeometry args={[0.22, 0.22, depth]} />
            <meshStandardMaterial color={color} metalness={0.88} roughness={0.3} />
          </mesh>
        );
      })}
    </group>
  );
}

/**
 * Vertically stacked environments for the 4 zones of the fall.
 * Zone 1: Early Man / Warm Earth & Clouds (y: 0 to -25)
 * Zone 2: Inventor / Clockwork Gears (y: -25 to -50)
 * Zone 3: Developer / Cyber Tunnel (y: -50 to -75)
 * Zone 4: AI Robot / Frosted Glass Landing Platform (y: -75 to -90)
 */
export default function StackedEnvironments() {
  const tunnelRef = useRef();

  useFrame((state, delta) => {
    if (tunnelRef.current) {
      tunnelRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      
      {/* ========================================================
          ZONE 1: EARLY MAN (y: 0 to -25)
          Dusty earthy atmosphere, volumetric clouds & stone monoliths
         ======================================================== */}
      <group position={[0, 0, 0]}>
        {/* Soft volumetric cloud clusters */}
        {[-3, -8, -14, -20].map((y, idx) => (
          <group key={idx} position={[0, y, 0]}>
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -1]}>
              <ringGeometry args={[2.5 + idx * 0.4, 5.0 + idx * 0.6, 24]} />
              <meshBasicMaterial
                color="#573a26"
                transparent
                opacity={0.25}
                side={THREE.DoubleSide}
                depthWrite={false}
              />
            </mesh>
          </group>
        ))}

        {/* Floating monolithic rock fragments */}
        {[-4, -10, -16, -22].map((y, idx) => {
          const x = (idx % 2 === 0 ? 1 : -1) * (2.8 + (idx % 3) * 0.5);
          return (
            <mesh key={idx} position={[x, y, (idx % 2) - 1]} rotation={[idx, idx * 1.5, 0]}>
              <dodecahedronGeometry args={[0.7 + (idx % 2) * 0.3, 0]} />
              <meshStandardMaterial color="#3d2a1d" roughness={0.9} flatShading />
            </mesh>
          );
        })}
      </group>

      {/* ========================================================
          ZONE 2: INVENTOR / GEARS (y: -28 to -52)
          Floating mechanical gears, brass armatures, blueprint grids
         ======================================================== */}
      <group position={[0, -28, 0]}>
        {/* Giant architectural gear rings passing by */}
        <FloatingGear position={[-2.8, 2, -1]} radius={1.8} teeth={14} color="#d4af37" rotationSpeed={0.4} />
        <FloatingGear position={[3.2, -4, -0.5]} radius={1.4} teeth={10} color="#b45309" rotationSpeed={-0.6} />
        <FloatingGear position={[-3.0, -12, -1]} radius={2.2} teeth={16} color="#eab308" rotationSpeed={0.3} />
        <FloatingGear position={[2.6, -18, -1.2]} radius={1.6} teeth={12} color="#9d7b32" rotationSpeed={-0.5} />

        {/* Astrolabe gimbal rings */}
        <mesh position={[0, -8, 0]} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[3.8, 0.04, 16, 48]} />
          <meshStandardMaterial color="#ca8a04" metalness={0.9} roughness={0.25} />
        </mesh>
        <mesh position={[0, -16, 0]} rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[4.2, 0.05, 16, 48]} />
          <meshStandardMaterial color="#b45309" metalness={0.85} roughness={0.3} />
        </mesh>
      </group>

      {/* ========================================================
          ZONE 3: DEVELOPER / CYBER TUNNEL (y: -56 to -80)
          Vertical neon data streams, hexagonal tunnel conduits
         ======================================================== */}
      <group position={[0, -56, 0]} ref={tunnelRef}>
        {/* Hexagonal cyber-tunnel rings */}
        {Array.from({ length: 8 }).map((_, i) => (
          <group key={i} position={[0, -i * 3.2, 0]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[3.2, 3.28, 6]} />
              <meshBasicMaterial
                color="#00f0ff"
                transparent
                opacity={0.45}
                side={THREE.DoubleSide}
              />
            </mesh>
            {/* Outer data ring */}
            <mesh rotation={[Math.PI / 2, 0, (i * Math.PI) / 6]}>
              <ringGeometry args={[3.8, 3.84, 6]} />
              <meshBasicMaterial
                color="#38bdf8"
                transparent
                opacity={0.25}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        ))}

        {/* Vertical laser bus bars */}
        {[0, 1, 2, 3, 4, 5].map((idx) => {
          const angle = (idx / 6) * Math.PI * 2;
          const x = Math.sin(angle) * 3.25;
          const z = Math.cos(angle) * 3.25;
          return (
            <mesh key={idx} position={[x, -12, z]}>
              <cylinderGeometry args={[0.025, 0.025, 24, 8]} />
              <meshBasicMaterial color="#0284c7" transparent opacity={0.6} />
            </mesh>
          );
        })}
      </group>

      {/* ========================================================
          ZONE 4: AI ROBOT / FROSTED GLASS LANDING PLATFORM (y: -84)
          Touchdown surface with concentric glowing energy rings
         ======================================================== */}
      <group position={[0, -84, 0]}>
        {/* Sleek frosted-glass circular landing deck */}
        <mesh position={[0, -0.92, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <cylinderGeometry args={[4.2, 4.4, 0.25, 48]} />
          <meshStandardMaterial
            color="#080e1a"
            roughness={0.12}
            metalness={0.9}
            transparent
            opacity={0.92}
          />
        </mesh>

        {/* Glowing concentric cyber energy rings on glass */}
        <mesh position={[0, -0.79, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.2, 1.25, 48]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.85} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, -0.79, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.2, 2.26, 48]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.7} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, -0.79, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.4, 3.48, 48]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>

        {/* Outer metallic shockwave bevel ring */}
        <mesh position={[0, -0.93, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[4.35, 0.12, 16, 48]} />
          <meshStandardMaterial color="#00f0ff" emissive="#0891b2" emissiveIntensity={0.8} metalness={0.9} />
        </mesh>

        {/* Ground impact spotlight shining up into the robot's face */}
        <spotLight
          position={[0, -0.6, 0.5]}
          target-position={[0, 0, 0]}
          intensity={6.0}
          distance={6}
          color="#00f0ff"
          angle={0.8}
          penumbra={0.5}
        />
      </group>

    </group>
  );
}

