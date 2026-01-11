import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">About <span className="text-trust-500">TrustEra</span></h1>
        <p className="text-gray-400 text-lg">Restoring truth in the age of synthetic media.</p>
      </div>

      <div className="space-y-12">
        <div className="bg-trust-800/30 p-8 rounded-xl border border-trust-700">
          <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed">
            As AI voice synthesis technology advances, the line between reality and fabrication blurs. 
            TrustEra was founded to provide journalists, legal experts, and security professionals with 
            the tools needed to verify audio authenticity. We believe that digital truth is a fundamental right.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-trust-800/30 p-8 rounded-xl border border-trust-700">
                <h3 className="text-xl font-bold text-trust-400 mb-3">The Technology</h3>
                <p className="text-gray-400 text-sm">
                    TrustEra utilizes a hybrid analysis engine. We combine traditional signal processing (FFT, spectral analysis) 
                    with state-of-the-art Transformer models trained on millions of hours of synthetic and organic audio. 
                    This allows us to detect subtle artifacts left by vocoders like HiFi-GAN and WaveNet.
                </p>
            </div>
            <div className="bg-trust-800/30 p-8 rounded-xl border border-trust-700">
                <h3 className="text-xl font-bold text-trust-400 mb-3">Forensics Layer</h3>
                <p className="text-gray-400 text-sm">
                    Beyond audio quality, our system digs into the file structure. We analyze container metadata, 
                    codec specifics, and embedded tags to trace the origin software. In some cases, we can identify 
                    IP traces left by cloud-based generation services during the file export process.
                </p>
            </div>
        </div>

        <div className="bg-gradient-to-r from-trust-900 to-trust-800 p-8 rounded-xl border border-trust-600 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Ready to verify?</h3>
            <p className="text-gray-400 mb-6">Start your first forensic analysis today.</p>
            <a href="#/analyzer" className="inline-block bg-trust-500 text-trust-900 font-bold px-6 py-3 rounded-lg hover:bg-trust-400 transition-colors">
                Launch Analyzer
            </a>
        </div>
      </div>
    </div>
  );
};

export default About;