import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

interface SquishPromoProps {
  title: string;
  subtitle: string;
}

export const SquishPromo: React.FC<SquishPromoProps> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();

  // VHS tracking effect
  const tracking = Math.sin(frame * 0.1) * 2;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#1a1a1a',
        position: 'relative',
      }}
    >
      {/* Grid background */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 40px,
              rgba(255, 255, 255, 0.05) 40px,
              rgba(255, 255, 255, 0.05) 41px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 40px,
              rgba(255, 255, 255, 0.05) 40px,
              rgba(255, 255, 255, 0.05) 41px
            )
          `,
          transform: `translateY(${tracking}px)`,
        }}
      />

      {/* VHS scan lines */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.2) 2px,
            rgba(0, 0, 0, 0.2) 4px
          )`,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1
          style={{
            fontSize: 120,
            fontFamily: 'monospace',
            color: '#fff',
            textAlign: 'center',
            transform: `translateX(${tracking}px)`,
            opacity: interpolate(frame, [0, 30], [0, 1]),
          }}
        >
          {title}
        </h1>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};