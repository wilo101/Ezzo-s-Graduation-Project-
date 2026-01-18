import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three';

const Globe3D: React.FC = () => {
    const globeRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (globeRef.current) {
            globeRef.current.rotation.y += 0.002;
            globeRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
        }
    });

    return (
        <group ref={globeRef}>
            {/* Core Black Sphere (Occlusion) */}
            <Sphere args={[2, 64, 64]}>
                <meshBasicMaterial color="#000000" />
            </Sphere>

            {/* Wireframe Grid (The "Map") */}
            <Sphere args={[2.01, 32, 32]}>
                <meshBasicMaterial
                    color="#22c55e"  // var(--trust-safe) approx
                    wireframe
                    transparent
                    opacity={0.15}
                />
            </Sphere>

            {/* Glowing Atmosphere */}
            <Sphere args={[2.2, 64, 64]}>
                <meshBasicMaterial
                    color="#22c55e"
                    transparent
                    opacity={0.05}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                />
            </Sphere>

            {/* Random Data Points (Red/Yellow threats) */}
            {[...Array(8)].map((_, i) => {
                const phi = Math.acos(-1 + (2 * i) / 8);
                const theta = Math.sqrt(8 * Math.PI) * phi;
                const x = 2.05 * Math.cos(theta) * Math.sin(phi);
                const y = 2.05 * Math.sin(theta) * Math.sin(phi);
                const z = 2.05 * Math.cos(phi);
                return (
                    <mesh key={i} position={[x, y, z]}>
                        <sphereGeometry args={[0.03, 8, 8]} />
                        <meshBasicMaterial color={i % 2 === 0 ? "#ef4444" : "#eab308"} />
                    </mesh>
                )
            })}

            {/* Surrounding Stars for depth */}
            <Stars radius={10} depth={5} count={500} factor={2} saturation={0} fade speed={1} />
        </group>
    );
};

export default Globe3D;
