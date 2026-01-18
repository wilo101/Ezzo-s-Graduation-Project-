import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Activity, ShieldAlert, Map, Zap, Radio, Target, AlertOctagon } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Globe3D from '../components/Globe3D';

const GlobalThreat: React.FC = () => {
    // Simulated live feed data
    const [feed, setFeed] = useState([
        { time: '10:42:05', loc: 'Kyiv, UA', type: 'Audio-Spoof', severity: 'high' },
        { time: '10:41:58', loc: 'Dallas, US', type: 'TTS-Farm', severity: 'medium' },
        { time: '10:41:12', loc: 'Beijing, CN', type: 'Voice-Clone', severity: 'high' },
        { time: '10:40:30', loc: 'London, UK', type: 'Video-G', severity: 'low' },
        { time: '10:38:15', loc: 'Moscow, RU', type: 'Botnet-Node', severity: 'medium' },
    ]);

    // Simulate incoming threats
    useEffect(() => {
        const interval = setInterval(() => {
            const newThreat = {
                time: new Date().toLocaleTimeString('en-US', { hour12: false }),
                loc: ['New York, US', 'Berlin, DE', 'Tokyo, JP', 'Sao Paulo, BR'][Math.floor(Math.random() * 4)],
                type: ['Deepfake-Voice', 'Synth-Audio', 'Replay-Attack', 'Adversarial-Noise'][Math.floor(Math.random() * 4)],
                severity: Math.random() > 0.5 ? 'high' : 'medium'
            };
            setFeed(prev => [newThreat, ...prev.slice(0, 6)]);
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-[calc(100vh-5rem)] bg-black relative overflow-hidden flex flex-col pt-24">
            {/* Grid Overlay */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #1e293b 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            {/* Header / HUD Top */}
            <div className="relative z-20 bg-[var(--bg-panel)]/80 backdrop-blur-md border-b border-[var(--border-color)]/30 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-bold text-white flex items-center gap-2 tracking-wider">
                        <Globe className="w-5 h-5 text-[var(--accent-color)]" />
                        GLOBAL THREAT MAP <span className="text-[var(--text-secondary)] text-xs font-mono px-2 py-0.5 border border-[var(--border-color)] rounded">V.2.4.0</span>
                    </h1>
                </div>
                <div className="flex items-center gap-6 text-xs font-mono">
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-trust-alert)] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-trust-alert)]"></span>
                        </span>
                        <span className="text-[var(--color-trust-alert)] font-bold">LIVE FEED ACTIVE</span>
                    </div>
                    <div className="hidden md:flex items-center gap-2 text-[var(--accent-color)]">
                        <Activity className="w-4 h-4" />
                        <span>NET_LOAD: 98%</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 relative z-10 p-4 lg:p-6 grid lg:grid-cols-4 gap-6">

                {/* Main Map Area (Mock Visuals) */}
                <div className="lg:col-span-3 bg-[var(--bg-surface)] rounded-3xl border border-[var(--border-color)]/30 relative overflow-hidden shadow-2xl group">
                    {/* World Map Image with Filters */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-40 transition-opacity duration-700 group-hover:opacity-60">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png"
                            alt="World Map"
                            className="w-full h-full object-cover grayscale invert contrast-[1.2] brightness-75"
                            style={{ filter: 'hue-rotate(200deg) saturate(0.5) contrast(1.2)' }}
                        />
                    </div>

                    {/* Scanning Line Animation */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent-color)]/10 to-transparent h-[20%] w-full animate-[scan_4s_linear_infinite] pointer-events-none"></div>

                    {/* Animated Threat Markers */}
                    {[
                        { top: '30%', left: '22%', delay: '0s' }, // NA
                        { top: '25%', right: '25%', delay: '1.2s' }, // EU
                        { top: '35%', right: '15%', delay: '2.5s' }, // Asia
                    ].map((marker, i) => (
                        <div key={i} className="absolute" style={{ top: marker.top, left: marker.left, right: marker.right }}>
                            <div className="relative">
                                <span className="absolute -inset-4 rounded-full border border-[var(--color-trust-alert)]/30 animate-[ping_2s_ease-out_infinite]" style={{ animationDelay: marker.delay }}></span>
                                <span className="absolute -inset-8 rounded-full border border-[var(--color-trust-alert)]/10 animate-[ping_2s_ease-out_infinite]" style={{ animationDelay: marker.delay }}></span>
                                <AlertOctagon className="w-6 h-6 text-[var(--color-trust-alert)] drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                            </div>
                        </div>
                    ))}

                    {/* Floating HUD Panel on Map */}
                    <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md border border-[var(--border-color)]/50 p-4 rounded-xl text-xs font-mono max-w-xs">
                        <div className="flex items-center gap-2 mb-2 text-[var(--text-secondary)]">
                            <Radio className="w-3 h-3 text-[var(--accent-color)]" />
                            <span>NODE STATUS</span>
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-between"><span>US-EAST-1</span><span className="text-[var(--color-trust-safe)]">SECURE</span></div>
                            <div className="flex justify-between"><span>EU-CENTRAL</span><span className="text-[var(--color-trust-alert)] animate-pulse">UNDER ATTACK</span></div>
                            <div className="flex justify-between"><span>ASIA-PACIFIC</span><span className="text-[var(--color-trust-safe)]">SECURE</span></div>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar: Intel Feed */}
                <div className="lg:col-span-1 space-y-6 flex flex-col h-full">
                    {/* DEFCON Card */}
                    <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl p-6 text-center shadow-[var(--glass-shadow)] relative overflow-hidden">
                        <div className="absolute inset-0 bg-[var(--color-trust-alert)]/5 animate-pulse"></div>
                        <h3 className="relative z-10 text-[var(--text-secondary)] text-xs font-bold uppercase mb-2 tracking-widest">Global DEFCON</h3>
                        <div className="relative z-10 text-6xl font-black text-[var(--color-trust-alert)] tracking-tighter drop-shadow-2xl font-mono">
                            3
                        </div>
                        <p className="relative z-10 text-[var(--color-trust-alert)] text-xs mt-2 font-mono uppercase tracking-widest border-t border-[var(--color-trust-alert)]/20 pt-2 inline-block px-4">Elevated Activity</p>
                    </div>

                    {/* Live Feed List */}
                    <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl flex-1 overflow-hidden flex flex-col shadow-[var(--glass-shadow)]">
                        <div className="p-4 border-b border-[var(--border-color)]/50 bg-[var(--bg-surface)]/50 flex justify-between items-center">
                            <span className="text-xs font-bold text-[var(--text-secondary)] uppercase flex items-center gap-2">
                                <Zap className="w-3 h-3 text-yellow-400" /> Interception Feed
                            </span>
                        </div>
                        <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                            {feed.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="p-3 rounded-lg bg-[var(--bg-primary)]/40 hover:bg-[var(--bg-surface)] border border-transparent hover:border-[var(--border-color)] transition-all cursor-default group"
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${item.severity === 'high' ? 'bg-[var(--color-trust-alert)]/20 text-[var(--color-trust-alert)]' : 'bg-blue-500/20 text-blue-400'}`}>
                                            {item.type}
                                        </span>
                                        <span className="text-[10px] font-mono text-[var(--text-secondary)]">{item.time}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs text-[var(--text-primary)] group-hover:text-[var(--accent-color)] transition-colors">
                                        <Target className="w-3 h-3 opacity-50" />
                                        {item.loc}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes scan {
                    0% { top: -20%; opacity: 0; }
                    50% { opacity: 1; }
                    100% { top: 120%; opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default GlobalThreat;