import React from 'react';

// Placeholder GlowEffect component for video studio
// This mimics the actual Squish GlowEffect for video purposes
export const GlowEffect: React.FC<{
  intensity?: string;
  blur?: string;
  animation?: string;
  scale?: number;
}> = ({ intensity = 'medium', blur = 'md', animation = 'pulse', scale = 1 }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) scale(' + scale + ')',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(20px)',
        opacity: 0.6,
        animation: animation === 'pulse' ? 'pulse 2s infinite' : 'none',
      }}
    />
  );
};