import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import AudioWaveform3D from './AudioWaveform3D';
import { useTheme } from '../context/ThemeContext';

interface Scene3DProps {
    isHighSpeed?: boolean;
}

const Scene3D: React.FC<Scene3DProps> = ({ isHighSpeed = false }) => {
    const { theme } = useTheme();

    return (
        <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${theme === 'dark' ? 'opacity-40' : 'opacity-80'}`}>
            <Canvas camera={{ position: [0, 0, 35], fov: 60 }} gl={{ alpha: true, antialias: false }}>
                {/* Lights */}
                <ambientLight intensity={theme === 'dark' ? 0.5 : 0.8} />
                <pointLight position={[10, 10, 10]} intensity={1} color={theme === 'dark' ? '#39FF14' : '#3b82f6'} />

                {/* Objects */}
                <AudioWaveform3D />

                {/* Background Elements */}
                {theme === 'dark' && (
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                )}

                {/* Post Processing - Cinematic Glow */}
                <EffectComposer>
                    <Bloom
                        intensity={1.5}
                        luminanceThreshold={0.2}
                        luminanceSmoothing={0.9}
                        height={300}
                    />
                </EffectComposer>

                {/* Interaction */}
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={isHighSpeed ? 20 : 0.5}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
            </Canvas>
        </div>
    );
};

export default Scene3D;
