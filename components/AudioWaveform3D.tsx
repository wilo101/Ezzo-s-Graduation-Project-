import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

const AudioWaveform3D = () => {
    const pointsRef = useRef<THREE.Points>(null);
    const { theme } = useTheme();

    // Generate random points in a sphere shape
    const particlesPosition = useMemo(() => {
        const count = 3000;
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const theta = THREE.MathUtils.randFloatSpread(360);
            const phi = THREE.MathUtils.randFloatSpread(360);

            const x = 20 * Math.sin(theta) * Math.cos(phi);
            const y = 20 * Math.sin(theta) * Math.sin(phi);
            const z = 20 * Math.cos(theta);

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
        }

        return positions;
    }, []);

    useFrame((state) => {
        if (!pointsRef.current) return;

        const time = state.clock.getElapsedTime();

        // Rotate the entire cloud
        pointsRef.current.rotation.y = time * 0.05;
        pointsRef.current.rotation.x = time * 0.02;

        // Wave animations could be added here by modifying positions buffer attribute
        // but for performance we stick to rotation for now.
    });

    const color = theme === 'dark' ? '#39FF14' : '#2563eb'; // Neon Green/Cyan for Dark, Blue for Light

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={pointsRef} positions={particlesPosition} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color={theme === 'dark' ? '#39FF14' : '#2563eb'}
                    size={0.15}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={theme === 'dark' ? 0.8 : 1}
                />
            </Points>
        </group>
    );
};

export default AudioWaveform3D;
