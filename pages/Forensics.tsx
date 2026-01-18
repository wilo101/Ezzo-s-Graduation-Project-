import React, { useState } from 'react';
import { analyzeThreat } from '../services/geminiService';
import { ThreatReport } from '../types';

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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 border-b border-trust-800 pb-4 flex justify-between items-end">
        <div>
            <h1 className="text-3xl font-bold text-white mb-2">Forensics Intelligence</h1>
            <p className="text-gray-400 font-mono text-sm">CLASSIFICATION & ATTRIBUTION ENGINE</p>
        </div>
        <div className="text-xs text-trust-500 font-mono animate-pulse">
            DATABASE: ONLINE
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Search Panel */}
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-trust-800/30 rounded-xl border border-trust-700 p-6 shadow-lg">
                <div className="flex space-x-2 mb-6 bg-trust-900/50 p-1 rounded-lg">
                    <button 
                        onClick={() => { setInputType('HASH'); setInputValue(''); setReport(null); }}
                        className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${inputType === 'HASH' ? 'bg-trust-500 text-trust-900' : 'text-gray-400 hover:text-white'}`}
                    >
                        FILE HASH
                    </button>
                    <button 
                         onClick={() => { setInputType('IP'); setInputValue(''); setReport(null); }}
                        className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${inputType === 'IP' ? 'bg-trust-500 text-trust-900' : 'text-gray-400 hover:text-white'}`}
                    >
                        IP LOOKUP
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <label className="block text-xs font-mono text-trust-400 mb-2 uppercase">
                        {inputType === 'HASH' ? 'Enter MD5 / SHA-256' : 'Enter IPv4 / IPv6 Address'}
                    </label>
                    <input 
                        type="text" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={inputType === 'HASH' ? 'e.g. 5e8848...' : 'e.g. 192.168.1.1'}
                        className="w-full bg-trust-900 border border-trust-600 rounded p-3 text-white font-mono text-sm focus:border-trust-500 focus:outline-none focus:ring-1 focus:ring-trust-500 mb-4"
                    />
                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`w-full py-3 rounded font-bold uppercase tracking-wider transition-all ${loading ? 'bg-gray-700 text-gray-500' : 'bg-trust-500 text-trust-900 hover:bg-trust-400 shadow-[0_0_15px_rgba(57,255,20,0.3)]'}`}
                    >
                        {loading ? 'Querying Grid...' : 'Identify Threat'}
                    </button>
                </form>

                <div className="mt-6 text-xs text-gray-500 leading-relaxed">
                    <p className="mb-2"><strong className="text-gray-400">NOTE:</strong> This tool queries the global TrustEra threat exchange.</p>
                    <p>Supported Hashes: MD5, SHA-1, SHA-256.</p>
                    <p>IP Geolocation accuracy varies by ISP privacy settings.</p>
                </div>
            </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2">
            {loading && (
                 <div className="h-64 flex flex-col items-center justify-center border border-trust-800 rounded-xl bg-trust-900/50">
                    <div className="w-16 h-16 border-4 border-trust-900 border-t-trust-500 rounded-full animate-spin mb-4"></div>
                    <div className="text-trust-500 font-mono text-sm animate-pulse">CORRELATING DATA POINTS...</div>
                 </div>
            )}

            {!loading && !report && (
                <div className="h-full flex flex-col items-center justify-center border border-trust-800 rounded-xl border-dashed p-10 opacity-50">
                     <svg className="w-16 h-16 text-trust-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                     <p className="text-gray-500 font-mono">NO ACTIVE QUERY</p>
                </div>
            )}

            {report && (
                <div className="bg-trust-800/30 rounded-xl border border-trust-600 overflow-hidden neon-border animate-fade-in-up">
                    <div className="bg-trust-900 p-6 border-b border-trust-700 flex justify-between items-start">
                        <div>
                            <h2 className="text-xl font-bold text-white mb-1">{report.target}</h2>
                            <div className="flex items-center gap-2">
                                <span className="bg-trust-800 text-gray-300 text-xs px-2 py-0.5 rounded font-mono">{report.type}</span>
                                {report.geoLocation && (
                                    <span className="bg-trust-800 text-gray-300 text-xs px-2 py-0.5 rounded font-mono flex items-center gap-1">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        {report.geoLocation}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs text-gray-400 uppercase">Risk Score</div>
                            <div className={`text-3xl font-bold ${report.riskScore > 70 ? 'text-trust-alert' : report.riskScore > 30 ? 'text-yellow-400' : 'text-trust-safe'}`}>
                                {report.riskScore}/100
                            </div>
                        </div>
                    </div>

                    <div className="p-6 space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-xs text-gray-500 uppercase mb-2">Classification</h3>
                                <div className={`text-lg font-bold ${report.riskScore > 50 ? 'text-white' : 'text-trust-400'}`}>
                                    {report.classification}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xs text-gray-500 uppercase mb-2">Last Seen</h3>
                                <div className="text-lg font-mono text-gray-300">
                                    {report.lastSeen}
                                </div>
                            </div>
                        </div>

                        {report.associatedActors && report.associatedActors.length > 0 && (
                            <div>
                                <h3 className="text-xs text-gray-500 uppercase mb-2">Associated Actors / Groups</h3>
                                <div className="flex flex-wrap gap-2">
                                    {report.associatedActors.map((actor, idx) => (
                                        <span key={idx} className="bg-trust-900 border border-trust-700 text-trust-400 text-xs px-3 py-1 rounded-full">
                                            {actor}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="bg-black/40 p-4 rounded border border-trust-800">
                            <h3 className="text-xs text-gray-500 uppercase mb-2">Intelligence Brief</h3>
                            <p className="text-gray-300 text-sm leading-relaxed font-mono">
                                {report.details}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Forensics;