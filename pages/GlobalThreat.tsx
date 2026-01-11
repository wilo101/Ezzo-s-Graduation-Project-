import React from 'react';

const GlobalThreat: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-trust-900 relative overflow-hidden">
      {/* Background Map Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#39FF14" strokeWidth="0.5"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white tracking-tight">Global Threat Map</h1>
            <div className="flex items-center space-x-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-trust-alert opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-trust-alert"></span>
                </span>
                <span className="text-trust-alert text-sm font-bold font-mono">LIVE FEED ACTIVE</span>
            </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
            {/* Map Area */}
            <div className="lg:col-span-3 bg-trust-800/30 border border-trust-700 rounded-xl min-h-[500px] relative overflow-hidden shadow-[0_0_30px_rgba(57,255,20,0.1)]">
                {/* Simplified World Map Representation */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                     <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png" 
                        alt="World Map" 
                        className="w-full h-full object-cover grayscale invert contrast-150 brightness-50"
                        style={{ filter: 'brightness(0.3) sepia(1) hue-rotate(70deg) saturate(5)' }} // Green Tint
                     />
                </div>
                
                {/* Ping Animations positioned roughly */}
                <div className="absolute top-[30%] left-[20%]"> {/* North America */}
                     <span className="absolute inline-flex h-6 w-6 rounded-full bg-trust-alert opacity-75 animate-ping"></span>
                     <span className="relative inline-flex rounded-full h-3 w-3 bg-trust-alert border border-black"></span>
                </div>
                <div className="absolute top-[25%] right-[25%]"> {/* Eastern Europe */}
                     <span className="absolute inline-flex h-8 w-8 rounded-full bg-trust-alert opacity-75 animate-ping" style={{animationDuration: '2s'}}></span>
                     <span className="relative inline-flex rounded-full h-4 w-4 bg-trust-alert border border-black"></span>
                </div>
                <div className="absolute bottom-[30%] right-[15%]"> {/* SE Asia */}
                     <span className="absolute inline-flex h-4 w-4 rounded-full bg-yellow-400 opacity-75 animate-ping" style={{animationDuration: '3s'}}></span>
                     <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400 border border-black"></span>
                </div>

                {/* Overlay Interface */}
                <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur border border-trust-700 p-4 rounded text-xs font-mono">
                    <div className="text-gray-400 mb-1">NETWORK LOAD</div>
                    <div className="w-48 bg-gray-800 h-2 rounded overflow-hidden">
                        <div className="bg-trust-500 h-full w-[65%] animate-pulse"></div>
                    </div>
                    <div className="mt-2 text-trust-500">
                        Analyzing 14,203 packets/sec
                    </div>
                </div>
            </div>

            {/* Sidebar Stats */}
            <div className="lg:col-span-1 space-y-6">
                
                {/* Threat Level */}
                <div className="bg-trust-800/30 border border-trust-700 rounded-xl p-6 text-center">
                    <h3 className="text-gray-400 text-xs font-bold uppercase mb-2">Global DEFCON</h3>
                    <div className="text-5xl font-black text-trust-alert tracking-tighter animate-pulse">
                        LEVEL 3
                    </div>
                    <p className="text-trust-alert text-xs mt-2 font-mono">ELEVATED DEEPFAKE ACTIVITY</p>
                </div>

                {/* Recent Detections List */}
                <div className="bg-trust-800/30 border border-trust-700 rounded-xl p-0 overflow-hidden">
                    <div className="bg-trust-900 p-3 border-b border-trust-700 text-xs font-bold text-gray-400 uppercase">
                        Recent Interceptions
                    </div>
                    <div className="divide-y divide-trust-800">
                        {[
                            { time: '10:42:05', loc: 'Kyiv, UA', type: 'Audio-Spoof' },
                            { time: '10:41:58', loc: 'Dallas, US', type: 'TTS-Farm' },
                            { time: '10:41:12', loc: 'Beijing, CN', type: 'Voice-Clone' },
                            { time: '10:40:30', loc: 'London, UK', type: 'Video-G' },
                            { time: '10:38:15', loc: 'Moscow, RU', type: 'Botnet-Node' },
                        ].map((item, i) => (
                            <div key={i} className="p-3 hover:bg-trust-800/50 transition-colors cursor-default group">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-trust-500 font-mono text-xs">{item.time}</span>
                                    <span className="text-xs bg-trust-900 text-gray-300 px-1.5 rounded">{item.type}</span>
                                </div>
                                <div className="text-gray-400 text-xs flex items-center gap-1 group-hover:text-white">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    {item.loc}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Targets */}
                <div className="bg-trust-800/30 border border-trust-700 rounded-xl p-4">
                    <h3 className="text-gray-400 text-xs font-bold uppercase mb-4">Trending Targets</h3>
                    <div className="space-y-3">
                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-white">Financial Sector</span>
                                <span className="text-trust-alert">42%</span>
                            </div>
                            <div className="w-full bg-gray-800 h-1 rounded">
                                <div className="bg-trust-alert h-full w-[42%]"></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-white">Gov / Political</span>
                                <span className="text-yellow-400">31%</span>
                            </div>
                            <div className="w-full bg-gray-800 h-1 rounded">
                                <div className="bg-yellow-400 h-full w-[31%]"></div>
                            </div>
                        </div>
                         <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-white">Legal Evidence</span>
                                <span className="text-trust-500">15%</span>
                            </div>
                            <div className="w-full bg-gray-800 h-1 rounded">
                                <div className="bg-trust-500 h-full w-[15%]"></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalThreat;