import React from 'react';

// Placeholder BorderGlowEffect component for video studio
// This mimics the actual Squish BorderGlowEffect for video purposes
export const BorderGlowEffect: React.FC<{
  intensity?: string;
  blur?: string;
  animation?: string;
  borderWidth?: number;
}> = ({ intensity = 'medium', blur = 'md', animation = 'flow', borderWidth = 2 }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: '12px',
        border: `${borderWidth}px solid rgba(255, 255, 255, 0.3)`,
        boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)',
        animation: animation === 'flow' ? 'flow 3s infinite' : 'none',
      }}
    />
  );
};