import React, { useState, useRef, useEffect } from 'react';
import Waveform from '../components/Waveform';
import { UploadCloud, FileAudio, AlertTriangle, CheckCircle, Activity, Globe, Cpu, Download } from 'lucide-react';
import { analyzeAudio } from '../services/geminiService';
import { AnalysisResult, AudioMetadata } from '../types';

const Analyzer: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [metadata, setMetadata] = useState<AudioMetadata | null>(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
    const [activeTab, setActiveTab] = useState<'metadata' | 'forensics' | 'platform' | 'ip'>('metadata');

    const audioContextRef = useRef<AudioContext | null>(null);

    // Initialize Audio Context
    useEffect(() => {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        return () => {
            audioContextRef.current?.close();
        };
    }, []);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setResult(null);
            setAnalyzing(false);

            // Basic Metadata Extraction
            setMetadata({
                fileName: selectedFile.name,
                fileSize: (selectedFile.size / 1024 / 1024).toFixed(2) + ' MB',
                fileType: selectedFile.type,
                lastModified: new Date(selectedFile.lastModified).toLocaleString(),
                duration: 'Calculating...',
                sampleRate: 0,
                channels: 0,
            });

            // Decode for Waveform & Duration
            const arrayBuffer = await selectedFile.arrayBuffer();
            if (audioContextRef.current) {
                try {
                    const decodedBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
                    setAudioBuffer(decodedBuffer);
                    setMetadata(prev => prev ? ({
                        ...prev,
                        duration: decodedBuffer.duration.toFixed(2) + 's',
                        sampleRate: decodedBuffer.sampleRate,
                        channels: decodedBuffer.numberOfChannels
                    }) : null);
                } catch (err) {
                    console.error("Error decoding audio", err);
                }
            }
        }
    };

    const startAnalysis = async () => {
        if (!file) return;
        setAnalyzing(true);
        setResult(null);

        // Convert file to Base64
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            const base64String = reader.result as string;
            const base64Content = base64String.split(',')[1];

            const analysis = await analyzeAudio(base64Content, file.type, file.name);

            setResult(analysis);
            setAnalyzing(false);
        };
    };

    const getRiskColor = (level: string) => {
        switch (level) {
            case 'High': return 'text-trust-alert';
            case 'Medium': return 'text-yellow-400';
            case 'Low': return 'text-trust-safe';
            default: return 'text-gray-400';
        }
    };

    const downloadReport = () => {
        alert("Downloading PDF Report... (Mock functionality)");
    };

    return (
        <div className="max-w-7xl mx-auto px-4 pt-40 pb-12">
            {/* Header */}
            <div className="mb-8 border-b border-[var(--border-color)] pb-4">
                <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Forensic Audio Analyzer</h1>
                <p className="text-[var(--text-secondary)] font-mono text-sm">MODULE: DEEPFAKE_DETECTION_V2</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Input & Controls */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Upload Area */}
                    <div className="bg-[var(--glass-bg)] rounded-xl border border-[var(--glass-border)] p-6 shadow-[var(--glass-shadow)]">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-[var(--text-primary)]">Source Input</h2>
                            {file && <span className="text-xs font-mono bg-[var(--bg-surface)] text-[var(--accent-color)] px-2 py-1 rounded border border-[var(--border-color)]">READY</span>}
                        </div>

                        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-[var(--border-color)] border-dashed rounded-2xl cursor-pointer hover:bg-[var(--bg-surface)] hover:border-[var(--accent-color)] transition-all group relative overflow-hidden">
                            {/* Scanning Grid Animation */}
                            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(37,99,235,0.1)_50%,transparent_51%)] bg-[length:100%_200%] animate-[scan_3s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent-color)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <div className="flex flex-col items-center justify-center pt-5 pb-6 relative z-10">
                                <div className="w-14 h-14 bg-[var(--bg-surface)] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm border border-[var(--border-color)]">
                                    <UploadCloud className="w-7 h-7 text-[var(--text-secondary)] group-hover:text-[var(--accent-color)] transition-colors" />
                                </div>
                                <p className="mb-1 text-base text-[var(--text-primary)] font-semibold">Drop audio file to analyze</p>
                                <p className="text-xs text-[var(--text-secondary)]">WAV, MP3, M4A (Max 25MB)</p>
                            </div>
                            <input type="file" className="hidden" accept="audio/*" onChange={handleFileChange} />
                        </label>
                    </div>

                    {/* Visualizer */}
                    <div className="bg-[var(--bg-panel)]/30 rounded-xl border border-[var(--border-color)] p-6 data-[theme=light]:bg-white data-[theme=light]:shadow-lg">
                        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">Spectral Visualization</h2>
                        <Waveform audioBuffer={audioBuffer} analyzing={analyzing} />

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={startAnalysis}
                                disabled={!file || analyzing}
                                className={`px-6 py-3 rounded font-bold uppercase tracking-wider transition-all ${!file || analyzing
                                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                    : 'bg-trust-500 text-trust-900 hover:bg-trust-400 shadow-[0_0_15px_rgba(57,255,20,0.4)]'
                                    }`}
                            >
                                {analyzing ? 'Processing...' : 'Run Diagnostics'}
                            </button>
                        </div>
                    </div>

                    {/* Results Panel */}
                    {result && (
                        <div className="bg-trust-800/30 rounded-xl border border-trust-600 p-0 overflow-hidden neon-border animate-fade-in-up">
                            <div className="bg-trust-900/80 p-6 border-b border-trust-700 flex justify-between items-center">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    Analysis Report
                                    <span className={`text-xs px-2 py-0.5 rounded border ${result.isDeepfake ? 'border-trust-alert text-trust-alert' : 'border-trust-safe text-trust-safe'}`}>
                                        {result.isDeepfake ? 'SUSPICIOUS' : 'VERIFIED'}
                                    </span>
                                </h2>
                                <button onClick={downloadReport} className="text-xs text-trust-400 hover:text-white underline">Download PDF</button>
                            </div>

                            <div className="p-6 grid md:grid-cols-2 gap-6">
                                <div>
                                    <div className="text-sm text-gray-400 mb-1">PREDICTION</div>
                                    <div className={`text-3xl font-bold ${result.isDeepfake ? 'text-trust-alert' : 'text-trust-safe'}`}>
                                        {result.isDeepfake ? 'FAKE DETECTED' : 'LIKELY AUTHENTIC'}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-400 mb-1">CONFIDENCE SCORE</div>
                                    <div className="text-3xl font-bold text-white">{result.confidence}%</div>
                                    <div className="w-full bg-gray-700 h-1.5 mt-2 rounded-full overflow-hidden">
                                        <div className={`h-full ${result.confidence > 80 ? 'bg-trust-safe' : 'bg-yellow-500'}`} style={{ width: `${result.confidence}%` }}></div>
                                    </div>
                                </div>

                                <div className="col-span-2">
                                    <div className="text-sm text-gray-400 mb-2">ACOUSTIC EXPLANATION</div>
                                    <p className="text-gray-300 text-sm leading-relaxed bg-trust-900 p-4 rounded border border-trust-800">
                                        {result.explanation}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column: Forensics Data */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-[var(--glass-bg)] rounded-xl border border-[var(--glass-border)] overflow-hidden h-full flex flex-col shadow-[var(--glass-shadow)]">
                        <div className="flex border-b border-[var(--border-color)] bg-[var(--bg-surface)]/50">
                            <button onClick={() => setActiveTab('metadata')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider ${activeTab === 'metadata' ? 'text-[var(--accent-color)] border-b-2 border-[var(--accent-color)] bg-[var(--accent-color)]/5' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}>Metadata</button>
                            <button onClick={() => setActiveTab('forensics')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider ${activeTab === 'forensics' ? 'text-[var(--accent-color)] border-b-2 border-[var(--accent-color)] bg-[var(--accent-color)]/5' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}>Forensics</button>
                            <button onClick={() => setActiveTab('platform')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider ${activeTab === 'platform' ? 'text-[var(--accent-color)] border-b-2 border-[var(--accent-color)] bg-[var(--accent-color)]/5' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}>Source</button>
                            <button onClick={() => setActiveTab('ip')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider ${activeTab === 'ip' ? 'text-[var(--accent-color)] border-b-2 border-[var(--accent-color)] bg-[var(--accent-color)]/5' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}>IP Trace</button>
                        </div>

                        <div className="p-6 flex-grow">
                            {!metadata ? (
                                <div className="h-full flex flex-col items-center justify-center text-[var(--text-secondary)] space-y-2">
                                    <FileAudio className="w-10 h-10 opacity-20" />
                                    <span className="text-xs">AWAITING FILE</span>
                                </div>
                            ) : (
                                <>
                                    {activeTab === 'metadata' && (
                                        <ul className="space-y-4 text-sm">
                                            <li className="flex justify-between border-b border-[var(--border-color)] pb-2">
                                                <span className="text-[var(--text-secondary)]">File Name</span>
                                                <span className="text-[var(--text-primary)] text-right truncate max-w-[150px]">{metadata.fileName}</span>
                                            </li>
                                            <li className="flex justify-between border-b border-trust-800 pb-2">
                                                <span className="text-gray-500">Size</span>
                                                <span className="text-white font-mono">{metadata.fileSize}</span>
                                            </li>
                                            <li className="flex justify-between border-b border-trust-800 pb-2">
                                                <span className="text-gray-500">Type</span>
                                                <span className="text-white font-mono uppercase">{metadata.fileType}</span>
                                            </li>
                                            <li className="flex justify-between border-b border-trust-800 pb-2">
                                                <span className="text-gray-500">Duration</span>
                                                <span className="text-white font-mono">{metadata.duration}</span>
                                            </li>
                                            <li className="flex justify-between border-b border-trust-800 pb-2">
                                                <span className="text-gray-500">Sample Rate</span>
                                                <span className="text-white font-mono">{metadata.sampleRate} Hz</span>
                                            </li>
                                            <li className="flex justify-between pt-2">
                                                <span className="text-gray-500">Channels</span>
                                                <span className="text-white font-mono">{metadata.channels}</span>
                                            </li>
                                        </ul>
                                    )}

                                    {activeTab === 'forensics' && (
                                        <div className="space-y-4">
                                            {result ? (
                                                <>
                                                    <div className="bg-trust-900 p-3 rounded border border-trust-800">
                                                        <div className="text-xs text-gray-500 uppercase mb-1">Consistency Score</div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="text-xl font-bold text-white">{result.consistencyScore}/10</div>
                                                            <div className="text-xs text-gray-400">
                                                                (Higher is more natural)
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="bg-trust-900 p-3 rounded border border-trust-800">
                                                        <div className="text-xs text-gray-500 uppercase mb-1">Anomalies Detected</div>
                                                        <ul className="list-disc list-inside text-xs text-trust-alert space-y-1">
                                                            {result.technicalAnomalies.length > 0 ? result.technicalAnomalies.map((a, i) => (
                                                                <li key={i}>{a}</li>
                                                            )) : <span className="text-trust-safe">None detected. Clean spectral signature.</span>}
                                                        </ul>
                                                    </div>
                                                    <div className="bg-trust-900 p-3 rounded border border-trust-800">
                                                        <div className="text-xs text-gray-500 uppercase mb-1">Software Signature</div>
                                                        <div className="text-sm text-white font-mono">{result.softwareSignature || "Unknown / Stripped"}</div>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="text-center text-xs text-gray-500 py-10">Run diagnostics to populate forensics data.</div>
                                            )}
                                        </div>
                                    )}

                                    {activeTab === 'platform' && (
                                        <div className="space-y-4 text-center py-4">
                                            {result ? (
                                                <>
                                                    <div className="w-20 h-20 mx-auto bg-trust-900 rounded-full flex items-center justify-center border-2 border-trust-500 shadow-[0_0_15px_rgba(57,255,20,0.3)] mb-4">
                                                        <svg className="w-10 h-10 text-trust-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                                                    </div>
                                                    <div className="text-sm text-gray-400">Estimated Source</div>
                                                    <div className="text-2xl font-bold text-white mb-2">{result.likelySource}</div>
                                                    <div className="text-xs text-gray-500">
                                                        Based on acoustic fingerprinting and codec artifacts consistent with {result.likelySource} engine signatures.
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="text-center text-xs text-gray-500 py-10">Run diagnostics to estimate source platform.</div>
                                            )}
                                        </div>
                                    )}

                                    {activeTab === 'ip' && (
                                        <div className="space-y-4">
                                            {result ? (
                                                <div className="bg-black/40 p-4 rounded border border-trust-800 font-mono text-xs">
                                                    <div className="flex justify-between mb-2">
                                                        <span className="text-gray-500">Trace Protocol:</span>
                                                        <span className="text-trust-500">ACTIVE</span>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-500">Container:</span>
                                                            <span className="text-white">{metadata.fileType}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-500">Encoder:</span>
                                                            <span className="text-white">{result.softwareSignature || 'Unknown'}</span>
                                                        </div>
                                                        <div className="my-4 border-t border-dashed border-gray-700"></div>
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-gray-500">Origin IP:</span>
                                                            {result.ipTrace ? (
                                                                <span className="text-trust-alert font-bold bg-trust-alert/10 px-2 py-1 rounded">{result.ipTrace}</span>
                                                            ) : (
                                                                <span className="text-gray-600 italic">No trace found</span>
                                                            )}
                                                        </div>
                                                        {result.ipTrace && (
                                                            <div className="text-trust-alert text-[10px] mt-1 text-right">
                                                                *Trace extracted from XMP/ID3 header residue.
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-center text-xs text-gray-500 py-10">Run diagnostics to scan for network traces.</div>
                                            )}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analyzer;