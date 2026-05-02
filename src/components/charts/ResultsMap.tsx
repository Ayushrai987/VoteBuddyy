"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

type ResultsMapProps = {
  onStateSelect?: (state: string) => void;
  year: '2024' | '2019';
};

// Simplified SVG paths for major states (Representative only for visualization)
const statePaths = [
  { id: "UP", name: "Uttar Pradesh", d: "M200,100 L250,110 L260,150 L210,160 Z", color: "#FF9933" },
  { id: "MH", name: "Maharashtra", d: "M150,200 L200,210 L190,260 L140,250 Z", color: "#FF9933" },
  { id: "WB", name: "West Bengal", d: "M300,150 L320,160 L310,210 L290,200 Z", color: "#0000FF" },
  { id: "TN", name: "Tamil Nadu", d: "M200,300 L230,310 L220,360 L190,350 Z", color: "#FF0000" },
  { id: "RJ", name: "Rajasthan", d: "M100,120 L150,130 L140,180 L90,170 Z", color: "#FF9933" },
  { id: "GJ", name: "Gujarat", d: "M80,180 L130,190 L120,240 L70,230 Z", color: "#FF9933" },
  { id: "KA", name: "Karnataka", d: "M150,270 L180,280 L170,330 L140,320 Z", color: "#FF0000" },
  { id: "AP", name: "Andhra Pradesh", d: "M220,250 L250,260 L240,310 L210,300 Z", color: "#FF0000" },
  { id: "BR", name: "Bihar", d: "M260,110 L300,120 L290,160 L250,150 Z", color: "#0000FF" },
  { id: "MP", name: "Madhya Pradesh", d: "M160,150 L210,160 L200,210 L150,200 Z", color: "#FF9933" },
];

export default function ResultsMap({ onStateSelect, year }: ResultsMapProps) {
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  return (
    <div className="relative w-full aspect-[4/5] max-w-md mx-auto">
      <svg
        viewBox="0 0 400 450"
        className="w-full h-full drop-shadow-2xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Simplified Map logic */}
        <g className="states">
          {statePaths.map((state) => (
            <motion.path
              key={state.id}
              d={state.d}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, filter: 'brightness(1.2)' }}
              className="cursor-pointer transition-all duration-300"
              fill={state.color}
              stroke="white"
              strokeWidth="2"
              onMouseEnter={() => setHoveredState(state.name)}
              onMouseLeave={() => setHoveredState(null)}
              onClick={() => onStateSelect?.(state.name)}
              style={{
                filter: hoveredState === state.name ? 'drop-shadow(0 0 8px rgba(255,255,255,0.4))' : 'none',
                opacity: hoveredState && hoveredState !== state.name ? 0.6 : 1
              }}
            />
          ))}
        </g>
      </svg>

      {/* State Label Tooltip */}
      {hoveredState && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[var(--bg-card)] border border-[var(--border-color)] px-4 py-2 rounded-xl shadow-2xl backdrop-blur-md z-20 pointer-events-none animate-fade-in">
          <p className="text-xs font-bold text-[var(--text-primary)]">{hoveredState}</p>
          <p className="text-[10px] text-saffron-500 font-semibold">{year} Winners</p>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4 py-4 bg-[var(--bg-glass)] backdrop-blur-sm rounded-xl border border-[var(--border-color)]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF9933]" />
          <span className="text-[10px] font-bold text-[var(--text-secondary)]">NDA</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#0000FF]" />
          <span className="text-[10px] font-bold text-[var(--text-secondary)]">I.N.D.I.A</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF0000]" />
          <span className="text-[10px] font-bold text-[var(--text-secondary)]">OTHERS</span>
        </div>
      </div>
    </div>
  );
}
