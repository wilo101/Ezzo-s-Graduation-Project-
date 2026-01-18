import React, { useState } from 'react';
import { analyzeThreat } from '../services/geminiService';
import { ThreatReport } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Shield, Globe, Database, AlertTriangle, Lock, FileSearch, Server, Activity, Hash, Network } from 'lucide-react';

const Forensics: React.FC = () => {
    const [inputType, setInputType] = useState<'HASH' | 'IP'>('HASH');
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState<ThreatReport | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue) return;

        setLoading(true);
        setReport(null);

        try {
            const result = await analyzeThreat(inputValue, inputType);
            setReport(result);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 pt-40 pb-12">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 flex flex-col md:flex-row justify-between items-end border-b border-[var(--glass-border)] pb-6"
            >
                <div>
                    <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-2 flex items-center gap-3">
                        <Shield className="w-10 h-10 text-[var(--accent-color)]" />
                        Forensics Intelligence
                    </h1>
                    <p className="text-[var(--text-secondary)] font-mono text-sm tracking-wide">CLASSIFICATION & ATTRIBUTION ENGINE</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-color)] bg-[var(--accent-color)]/10 px-3 py-1 rounded-full border border-[var(--accent-color)]/20 animate-pulse mt-4 md:mt-0">
                    <Database className="w-3 h-3" />
                    DATABASE: ONLINE
                </div>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Search Panel */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-1 space-y-6"
                >
                    <div className="bg-[var(--glass-bg)] backdrop-blur-md rounded-2xl border border-[var(--glass-border)] p-8 shadow-[var(--glass-shadow)] sticky top-24">
                        <div className="flex space-x-2 mb-8 bg-[var(--bg-surface)]/50 p-1.5 rounded-xl border border-[var(--border-color)]/30">
                            <button
                                onClick={() => { setInputType('HASH'); setInputValue(''); setReport(null); }}
                                className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${inputType === 'HASH' ? 'bg-[var(--accent-color)] text-white shadow-lg' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)]/50'}`}
                            >
                                <Hash className="w-4 h-4" />
                                FILE HASH
                            </button>
                            <button
                                onClick={() => { setInputType('IP'); setInputValue(''); setReport(null); }}
                                className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${inputType === 'IP' ? 'bg-[var(--accent-color)] text-white shadow-lg' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)]/50'}`}
                            >
                                <Globe className="w-4 h-4" />
                                IP LOOKUP
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-xs font-mono text-[var(--text-secondary)] mb-3 uppercase tracking-wider pl-1">
                                    {inputType === 'HASH' ? 'Enter MD5 / SHA-256' : 'Enter IPv4 / IPv6 Address'}
                                </label>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder={inputType === 'HASH' ? 'e.g. 5e8848...' : 'e.g. 192.168.1.1'}
                                        className="w-full bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-4 pl-12 text-[var(--text-primary)] font-mono text-sm focus:border-[var(--accent-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]/20 transition-all shadow-inner group-hover:border-[var(--accent-color)]/50"
                                    />
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)] group-hover:text-[var(--accent-color)] transition-colors" />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-4 rounded-xl font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg ${loading
                                    ? 'bg-[var(--glass-border)] text-[var(--text-secondary)] cursor-not-allowed'
                                    : 'bg-[var(--accent-color)] text-white hover:bg-blue-600 hover:shadow-blue-500/25 hover:-translate-y-0.5'
                                    }`}
                            >
                                {loading ? <Activity className="w-5 h-5 animate-spin" /> : <FileSearch className="w-5 h-5" />}
                                {loading ? 'Querying Grid...' : 'Identify Threat'}
                            </button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-[var(--glass-border)]">
                            <h3 className="text-xs font-bold text-[var(--text-secondary)] uppercase mb-3 flex items-center gap-2">
                                <Lock className="w-3 h-3" /> System Status
                            </h3>
                            <div className="space-y-2 text-xs text-[var(--text-secondary)] font-mono">
                                <div className="flex justify-between">
                                    <span>Exchange</span>
                                    <span className="text-[var(--color-trust-safe)]">CONNECTED</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Latency</span>
                                    <span>24ms</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Results Panel */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2"
                >
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <div className="h-[400px] flex flex-col items-center justify-center rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)]/50 backdrop-blur-sm">
                                <div className="relative w-24 h-24 mb-6">
                                    <div className="absolute inset-0 border-4 border-[var(--accent-color)]/20 rounded-full animate-ping"></div>
                                    <div className="absolute inset-0 border-4 border-t-[var(--accent-color)] rounded-full animate-spin"></div>
                                    <Server className="absolute inset-0 m-auto w-8 h-8 text-[var(--accent-color)] " />
                                </div>
                                <div className="text-white font-mono text-sm animate-pulse tracking-widest">SEARCHING NEURAL GRID...</div>
                            </div>
                        ) : report ? (
                            <div className="bg-[var(--glass-bg)] backdrop-blur-xl rounded-3xl border border-[var(--glass-border)] overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-500">
                                {/* Result Header */}
                                <div className="bg-[var(--bg-surface)]/80 p-8 border-b border-[var(--border-color)] flex flex-wrap gap-6 justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h2 className="text-2xl font-bold text-[var(--text-primary)] font-mono">{report.target}</h2>
                                            <span className="bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-secondary)] text-xs px-2 py-0.5 rounded font-mono uppercase">{report.type}</span>
                                        </div>
                                        {report.geoLocation && (
                                            <div className="flex items-center gap-2 text-[var(--text-secondary)] text-sm">
                                                <Globe className="w-4 h-4" />
                                                {report.geoLocation}
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-right bg-[var(--bg-primary)] px-6 py-3 rounded-xl border border-[var(--border-color)] shadow-sm">
                                        <div className="text-xs text-[var(--text-secondary)] uppercase font-bold mb-1">Risk Score</div>
                                        <div className={`text-3xl font-black ${report.riskScore > 70 ? 'text-[var(--color-trust-alert)]' : report.riskScore > 30 ? 'text-yellow-500' : 'text-[var(--color-trust-safe)]'}`}>
                                            {report.riskScore}<span className="text-sm font-normal text-[var(--text-secondary)]">/100</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 space-y-8">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <h3 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-2">
                                                <AlertTriangle className="w-3 h-3" /> Classification
                                            </h3>
                                            <div className={`text-lg font-bold p-3 rounded-lg border bg-[var(--bg-surface)]/50 ${report.riskScore > 50 ? 'border-[var(--color-trust-alert)]/30 text-[var(--color-trust-alert)]' : 'border-[var(--color-trust-safe)]/30 text-[var(--color-trust-safe)]'}`}>
                                                {report.classification}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-2">
                                                <Activity className="w-3 h-3" /> Last Seen
                                            </h3>
                                            <div className="text-lg font-mono text-[var(--text-primary)] p-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)]/50">
                                                {report.lastSeen}
                                            </div>
                                        </div>
                                    </div>

                                    {report.associatedActors && report.associatedActors.length > 0 && (
                                        <div className="space-y-3">
                                            <h3 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Associated Actors</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {report.associatedActors.map((actor, idx) => (
                                                    <span key={idx} className="bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-primary)] text-xs px-3 py-1.5 rounded-full hover:border-[var(--accent-color)] transition-colors cursor-default">
                                                        {actor}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="bg-[var(--bg-primary)]/50 p-6 rounded-xl border border-[var(--border-color)]">
                                        <h3 className="text-xs font-bold text-[var(--text-secondary)] uppercase mb-3 flex items-center gap-2">
                                            <FileSearch className="w-3 h-3" /> Intelligence Brief
                                        </h3>
                                        <p className="text-[var(--text-primary)] text-sm leading-relaxed font-mono opacity-80">
                                            {report.details}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default Forensics;