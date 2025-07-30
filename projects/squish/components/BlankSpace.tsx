import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, spring } from 'remotion';
import { noise2D } from '@remotion/noise';

export const BlankSpaceTransition: React.FC<{
  startFrame: number;
  duration: number;
}> = ({ startFrame, duration }) => {
  const frame = useCurrentFrame();
  const { fps } = { fps: 30 };
  
  const progress = interpolate(
    frame,
    [startFrame, startFrame + duration],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  
  const reveal = spring({
    frame: frame - startFrame,
    fps,
    config: {
      damping: 100,
      stiffness: 50,
    },
  });
  
  return (
    <AbsoluteFill
      style={{
        backgroundColor: 'rgba(250, 248, 243, 0.9)',
        clipPath: `polygon(
          0 ${100 - reveal * 100}%,
          100% ${100 - reveal * 100}%,
          100% 100%,
          0% 100%
        )`,
      }}
    />
  );
};

export const FloatingDots: React.FC = () => {
  const frame = useCurrentFrame();
  const dots = [];
  
  for (let i = 0; i < 20; i++) {
    const x = noise2D('dotX', i, frame * 0.002) * 50 + 50;
    const y = noise2D('dotY', i, frame * 0.002) * 50 + 50;
    const size = noise2D('size', i, frame * 0.001) * 3 + 2;
    const opacity = noise2D('opacity', i, frame * 0.003) * 0.3 + 0.1;
    
    dots.push(
      <div
        key={i}
        style={{
          position: 'absolute',
          left: `${x}%`,
          top: `${y}%`,
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundColor: '#2A2A2A',
          opacity,
        }}
      />
    );
  }
  
  return <AbsoluteFill>{dots}</AbsoluteFill>;
};

export const InkBleed: React.FC<{
  x: number;
  y: number;
  startFrame: number;
}> = ({ x, y, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = { fps: 30 };
  
  const grow = spring({
    frame: frame - startFrame,
    fps,
    config: {
      damping: 200,
      stiffness: 20,
    },
  });
  
  if (frame < startFrame) return null;
  
  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: 100,
        height: 100,
        transform: `translate(-50%, -50%) scale(${grow * 3})`,
        opacity: interpolate(grow, [0, 1], [0.3, 0.05]),
      }}
    >
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
        <filter id="inkbleed">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="5" />
          <feDisplacementMap in="SourceGraphic" scale="10" />
        </filter>
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="#2A2A2A"
          filter="url(#inkbleed)"
        />
      </svg>
    </div>
  );
};