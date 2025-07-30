import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { noise2D } from '@remotion/noise';

export const VHSScanLines: React.FC = () => {
  const frame = useCurrentFrame();
  
  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        mixBlendMode: 'multiply',
      }}
    >
      {/* Horizontal scan lines */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(0, 0, 0, 0.15) 3px,
            rgba(0, 0, 0, 0.15) 4px
          )`,
          opacity: 0.8,
        }}
      />
      
      {/* Rolling distortion band */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '60px',
          background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.2), transparent)',
          top: `${(frame * 4) % 1200 - 100}px`,
        }}
      />
    </AbsoluteFill>
  );
};

export const VHSTracking: React.FC = () => {
  const frame = useCurrentFrame();
  const tracking = noise2D('tracking', frame * 0.02, 0) * 5;
  const drift = Math.sin(frame * 0.05) * 2;
  
  return (
    <AbsoluteFill
      style={{
        transform: `translateX(${tracking + drift}px)`,
      }}
    />
  );
};

export const ChromaticAberration: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const offset = noise2D('chroma', frame * 0.01, 0) * 2;
  
  return (
    <>
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.4,
        mixBlendMode: 'screen',
        transform: `translateX(${offset}px)`,
        filter: 'hue-rotate(180deg)',
      }}>
        {children}
      </div>
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.4,
        mixBlendMode: 'screen',
        transform: `translateX(-${offset}px)`,
        filter: 'hue-rotate(90deg)',
      }}>
        {children}
      </div>
      {children}
    </>
  );
};

export const VHSNoise: React.FC = () => {
  const frame = useCurrentFrame();
  
  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        opacity: 0.05,
        mixBlendMode: 'overlay',
      }}
    >
      <svg width="100%" height="100%">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={0.9}
            numOctaves={4}
            seed={frame}
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" opacity={1} />
      </svg>
    </AbsoluteFill>
  );
};

// Combined VHS effects component
export const VHSEffects: React.FC<{ intensity?: number }> = ({ intensity = 1 }) => {
  return (
    <>
      <VHSScanLines />
      <VHSTracking />
      <VHSNoise />
    </>
  );
};