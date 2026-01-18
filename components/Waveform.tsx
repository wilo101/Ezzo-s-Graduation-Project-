import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface WaveformProps {
  audioBuffer: AudioBuffer | null;
  analyzing: boolean;
}

const Waveform: React.FC<WaveformProps> = ({ audioBuffer, analyzing }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !audioBuffer) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    const margin = { top: 10, right: 0, bottom: 10, left: 0 };

    // Downsample data for visualization
    const rawData = audioBuffer.getChannelData(0); 
    const samples = 200; // Number of bars/points
    const blockSize = Math.floor(rawData.length / samples); 
    const data: number[] = [];

    for (let i = 0; i < samples; i++) {
        let sum = 0;
        for (let j = 0; j < blockSize; j++) {
            sum += Math.abs(rawData[i * blockSize + j]);
        }
        data.push(sum / blockSize);
    }

    const xScale = d3.scaleLinear()
      .domain([0, samples - 1])
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data) || 1])
      .range([height - margin.bottom, margin.top]);

    // Draw lines
    const line = d3.line<number>()
        .x((d, i) => xScale(i))
        .y(d => yScale(d))
        .curve(d3.curveMonotoneX); // Smooth curve

    // Gradient definition
    const defs = svg.append("defs");
    const gradient = defs.append("linearGradient")
        .attr("id", "waveform-gradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%");

    gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#39FF14"); // Neon Green
    
    gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#80FF66"); // Light Neon Green

    // Main path
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "url(#waveform-gradient)")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Mirror effect for cool look
    const yScaleMirror = d3.scaleLinear()
      .domain([0, d3.max(data) || 1])
      .range([height - margin.bottom, height + (height/2)]); // Project downwards

    const lineMirror = d3.line<number>()
        .x((d, i) => xScale(i))
        .y(d => yScaleMirror(d))
        .curve(d3.curveMonotoneX);

    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "rgba(57, 255, 20, 0.2)")
        .attr("stroke-width", 2)
        .attr("d", lineMirror);

  }, [audioBuffer]);

  return (
    <div className="relative w-full h-48 bg-trust-900 rounded-lg overflow-hidden border border-trust-800">
      <svg ref={svgRef} className="w-full h-full" />
      
      {analyzing && (
        <div className="absolute inset-0 flex items-center justify-center bg-trust-900/50 backdrop-blur-sm z-10">
           <div className="relative w-full h-1 bg-trust-800 overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-1/3 bg-trust-500 shadow-[0_0_15px_#39FF14] animate-scan" />
           </div>
           <div className="absolute text-trust-400 font-mono text-sm mt-8 animate-pulse">
               ANALYZING SPECTRAL SIGNATURE...
           </div>
        </div>
      )}
      
      {!audioBuffer && !analyzing && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-mono text-sm">
            NO AUDIO LOADED
        </div>
      )}
    </div>
  );
};

export default Waveform;