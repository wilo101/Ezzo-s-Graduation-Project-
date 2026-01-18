import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../types';
import Scene3D from '../components/Scene3D';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Activity, Fingerprint, Network, ShieldCheck, Zap, Globe, Database, ScanLine } from 'lucide-react';

const Home: React.FC = () => {
    const [introPhase, setIntroPhase] = useState<'spin' | 'text' | 'complete'>('spin');

    // Cinematic Intro Sequence
    useEffect(() => {
        // Phase 1: Fast Spin (Starts immediately)
        const timer1 = setTimeout(() => {
            setIntroPhase('text'); // Show text while still spinning fast
        }, 500);

        // Phase 2: Slow down and show rest of UI
        const timer2 = setTimeout(() => {
            setIntroPhase('complete');
        }, 2500); // 2.5s total intro

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    return (
        <div className="relative overflow-hidden min-h-[calc(100vh-5rem)] flex flex-col justify-center font-sans">

            {/* 3D Background - High Speed during Intro */}
            <Scene3D isHighSpeed={introPhase !== 'complete'} />

            {/* Background Decor */}
            <motion.div
                animate={{ opacity: introPhase === 'complete' ? 1 : 0 }}
                transition={{ duration: 1 }}
                className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
            >
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[var(--accent-color)]/5 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]"></div>
            </motion.div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-16 pt-36">

                {/* Intro Text Container - Always centered */}
                <div className="min-h-[60vh] flex flex-col items-center justify-center">

                    <AnimatePresence>
                        {(introPhase === 'text' || introPhase === 'complete') && (
                            <>
                                {/* Title Group */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="text-center"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="inline-block px-5 py-2 mb-6 border border-[var(--accent-color)]/30 rounded-full bg-[var(--accent-color)]/10 backdrop-blur-md"
                                    >
                                        <span className="text-[var(--accent-color)] text-xs font-bold tracking-[0.2em] uppercase">System v2.5 Online</span>
                                    </motion.div>

                                    <h1 className="text-6xl md:text-8xl font-extrabold text-[var(--text-primary)] tracking-tight mb-8 leading-[1.1]">
                                        AI-Powered <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-color)] via-blue-400 to-purple-500 drop-shadow-2xl">
                                            Audio Forensics
                                        </span>
                                    </h1>

                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5, duration: 1 }}
                                        className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-3xl mx-auto font-light leading-relaxed"
                                    >
                                        Detect deepfakes, extract hidden metadata, and trace synthetic media sources with military-grade precision.
                                    </motion.p>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>

                    {/* Rest of UI - Appears after intro */}
                    <AnimatePresence>
                        {introPhase === 'complete' && (
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="w-full"
                            >
                                {/* CTA Button */}
                                <div className="mt-12">
                                    <Link
                                        to={AppRoute.ANALYZER}
                                        className="group relative inline-flex items-center justify-center px-10 py-5 text-white text-lg font-bold rounded-2xl bg-[var(--accent-color)] overflow-hidden transition-all shadow-xl hover:shadow-[var(--accent-color)]/50 hover:-translate-y-1"
                                    >
                                        <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-out -skew-x-12"></div>
                                        <span className="relative z-10 flex items-center gap-2">
                                            START ANALYSIS
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </Link>
                                </div>

                                {/* Glass Stats Grid */}
                                <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
                                    {[
                                        { val: "99.8%", label: "Detection Accuracy" },
                                        { val: "50+", label: "Models Tracked" },
                                        { val: "<2s", label: "Analysis Time" },
                                        { val: "IP", label: "Trace Capability" }
                                    ].map((stat, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
                                            className="p-6 rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-md hover:bg-[var(--bg-surface)] transition-colors group cursor-default shadow-[var(--glass-shadow)]"
                                        >
                                            <div className="text-4xl font-bold text-[var(--text-primary)] mb-2 group-hover:scale-110 transition-transform origin-center">{stat.val}</div>
                                            <div className="text-xs font-bold text-[var(--text-secondary)] tracking-widest uppercase group-hover:text-[var(--accent-color)] transition-colors">{stat.label}</div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Feature Cards (Bottom) - Only shows after intro */}
            {introPhase === 'complete' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="relative py-20 bg-[var(--bg-panel)]/30 border-y border-[var(--border-color)]/30 backdrop-blur-md mt-auto"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Spectral Analysis", desc: "Visualize audio frequencies to spot generation artifacts invisible to the naked ear.", icon: Activity },
                            { title: "Source ID", desc: "Identify specific AI models like ElevenLabs, FakeYou, or Meta Voice instantly.", icon: Fingerprint },
                            { title: "Metadata & IP", desc: "Extract hidden location data and network traces from uploaded files.", icon: Network }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.2 }}
                                className="flex items-start gap-4 p-6 rounded-3xl bg-[var(--glass-bg)] hover:bg-[var(--glass-bg)] transition-colors border border-[var(--glass-border)] hover:border-[var(--accent-color)]/30 group shadow-[var(--glass-shadow)]"
                            >
                                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-[var(--accent-color)]/10 flex items-center justify-center text-[var(--accent-color)] group-hover:scale-110 group-hover:bg-[var(--accent-color)] group-hover:text-white transition-all duration-300">
                                    <feature.icon className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-color)] transition-colors">{feature.title}</h3>
                                    <p className="text-[var(--text-secondary)] text-sm mt-3 leading-relaxed">{feature.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

        </div>
    );
};

export default Home;