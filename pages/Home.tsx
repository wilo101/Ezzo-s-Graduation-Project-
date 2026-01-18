import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../types';

const Home: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-[85vh]">
        <div className="absolute top-0 w-full h-full bg-trust-900 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 z-0"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-trust-900 z-1"></div>
        
        <div className="container relative mx-auto px-4 z-10 text-center">
            <div className="inline-block px-4 py-1 mb-6 border border-trust-500/50 rounded-full bg-trust-900/50 backdrop-blur-sm">
                <span className="text-trust-400 text-xs font-mono tracking-[0.2em] uppercase">System v2.5 Online</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 leading-tight">
                AI-Powered <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-trust-400 to-green-600 neon-text">Audio Forensics</span>
            </h1>
            <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-light">
                Detect deepfakes, extract hidden metadata, and trace synthetic media sources with military-grade precision.
            </p>
            <Link 
                to={AppRoute.ANALYZER}
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-md text-trust-900 bg-trust-500 hover:bg-trust-400 transition-all shadow-[0_0_20px_rgba(57,255,20,0.4)] hover:shadow-[0_0_30px_rgba(57,255,20,0.6)] transform hover:-translate-y-1"
            >
                START ANALYSIS
                <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>

            {/* Stats Grid */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-trust-800 pt-10">
                <div className="p-4">
                    <div className="text-3xl font-bold text-white mb-1">99.8%</div>
                    <div className="text-sm text-gray-500 font-mono">DETECTION ACCURACY</div>
                </div>
                <div className="p-4">
                    <div className="text-3xl font-bold text-white mb-1">50+</div>
                    <div className="text-sm text-gray-500 font-mono">MODELS TRACKED</div>
                </div>
                <div className="p-4">
                    <div className="text-3xl font-bold text-white mb-1">&lt;2s</div>
                    <div className="text-sm text-gray-500 font-mono">ANALYSIS TIME</div>
                </div>
                <div className="p-4">
                    <div className="text-3xl font-bold text-white mb-1">IP</div>
                    <div className="text-sm text-gray-500 font-mono">TRACE CAPABILITY</div>
                </div>
            </div>
        </div>
      </div>
      
      {/* Features Stripe */}
      <div className="bg-trust-800/50 py-12 border-y border-trust-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
              <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-trust-900 rounded-lg flex items-center justify-center border border-trust-600 text-trust-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                  </div>
                  <div>
                      <h3 className="text-lg font-bold text-white">Spectral Analysis</h3>
                      <p className="text-gray-400 text-sm mt-1">Visualize audio frequencies to spot generation artifacts invisible to the naked ear.</p>
                  </div>
              </div>
              <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-trust-900 rounded-lg flex items-center justify-center border border-trust-600 text-trust-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  </div>
                  <div>
                      <h3 className="text-lg font-bold text-white">Source ID</h3>
                      <p className="text-gray-400 text-sm mt-1">Identify specific AI models like ElevenLabs, FakeYou, or Meta Voice instantly.</p>
                  </div>
              </div>
              <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-trust-900 rounded-lg flex items-center justify-center border border-trust-600 text-trust-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                      <h3 className="text-lg font-bold text-white">Metadata & IP</h3>
                      <p className="text-gray-400 text-sm mt-1">Extract hidden location data and network traces from uploaded files.</p>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Home;