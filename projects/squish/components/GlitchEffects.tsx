import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { noise2D } from '@remotion/noise';

export const DigitalGlitch: React.FC<{ intensity?: number }> = ({ intensity = 1 }) => {
  const frame = useCurrentFrame();
  const glitchActive = noise2D('glitch', frame * 0.1, 0) > 0.7;
  
  if (!glitchActive) return null;
  
  const sliceCount = Math.floor(Math.random() * 5 + 3);
  const slices = [];
  
  for (let i = 0; i < sliceCount; i++) {
    const y = Math.random() * 100;
    const height = Math.random() * 5 + 1;
    const offset = (Math.random() - 0.5) * 20 * intensity;
    const hue = Math.random() * 360;
    
    slices.push(
      <div
        key={i}
        style={{
          position: 'absolute',
          left: 0,
          top: `${y}%`,
          width: '100%',
          height: `${height}%`,
          transform: `translateX(${offset}px)`,
          backgroundColor: `hsla(${hue}, 70%, 50%, 0.1)`,
          mixBlendMode: 'color-dodge',
        }}
      />
    );
  }
  
  return <AbsoluteFill style={{ pointerEvents: 'none' }}>{slices}</AbsoluteFill>;
};

export const DataMosh: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const moshActive = noise2D('mosh', frame * 0.05, 0) > 0.8;
  
  const blockSize = 40;
  const displacement = moshActive ? Math.sin(frame * 0.3) * 10 : 0;
  
  return (
    <div
      style={{
        filter: moshActive ? `blur(1px)` : 'none',
      }}
    >
      {children}
      {moshActive && (
        <AbsoluteFill
          style={{
            pointerEvents: 'none',
            mixBlendMode: 'difference',
            opacity: 0.5,
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundImage: `repeating-linear-gradient(
                90deg,
                transparent,
                transparent ${blockSize}px,
                rgba(255, 255, 255, 0.1) ${blockSize}px,
                rgba(255, 255, 255, 0.1) ${blockSize * 2}px
              )`,
              transform: `translateX(${displacement}px)`,
            }}
          />
        </AbsoluteFill>
      )}
    </div>
  );
};

export const SignalLoss: React.FC = () => {
  const frame = useCurrentFrame();
  const lossActive = noise2D('loss', frame * 0.02, 0) > 0.85;
  
  if (!lossActive) return null;
  
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#000',
        opacity: interpolate(
          noise2D('opacity', frame * 0.1, 0),
          [-1, 1],
          [0.3, 0.8]
        ),
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255, 255, 255, 0.1) 2px,
            rgba(255, 255, 255, 0.1) 4px
          )`,
        }}
      />
    </AbsoluteFill>
  );
};