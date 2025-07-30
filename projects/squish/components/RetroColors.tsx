import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

// Retro VHS color palette
export const RETRO_COLORS = {
  paper: '#FAF8F3',
  grid: '#E5D4B8',
  accent1: '#FFB5BA', // Pastel pink
  accent2: '#B5DEFF', // Pastel blue
  accent3: '#FFDFB5', // Pastel orange
  accent4: '#D4B5FF', // Pastel purple
  dark: '#2A2A2A',
  vhsGreen: '#00FF41',
  vhsRed: '#FF0080',
  vhsBlue: '#00D9FF',
};

export const ColorBleed: React.FC = () => {
  const frame = useCurrentFrame();
  const cycle = (frame * 0.005) % 1;
  
  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        mixBlendMode: 'color',
        opacity: 0.1,
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: '200%',
          height: '200%',
          left: '-50%',
          top: '-50%',
          background: `radial-gradient(
            circle at ${50 + Math.sin(cycle * Math.PI * 2) * 30}% ${50 + Math.cos(cycle * Math.PI * 2) * 30}%,
            ${RETRO_COLORS.vhsRed} 0%,
            transparent 40%
          )`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '200%',
          height: '200%',
          left: '-50%',
          top: '-50%',
          background: `radial-gradient(
            circle at ${50 + Math.cos(cycle * Math.PI * 2) * 30}% ${50 + Math.sin(cycle * Math.PI * 2) * 30}%,
            ${RETRO_COLORS.vhsBlue} 0%,
            transparent 40%
          )`,
        }}
      />
    </AbsoluteFill>
  );
};

export const VHSColorShift: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const shift = Math.sin(frame * 0.1) * 5;
  
  return (
    <div
      style={{
        filter: `hue-rotate(${shift}deg) saturate(1.1) brightness(1.05)`,
      }}
    >
      {children}
    </div>
  );
};