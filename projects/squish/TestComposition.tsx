import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';

export const TestComposition: React.FC = () => {
  const frame = useCurrentFrame();
  
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FAF8F3',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          fontSize: 60,
          fontFamily: 'monospace',
          color: '#2A2A2A',
          opacity: Math.sin(frame * 0.1) * 0.5 + 0.5,
        }}
      >
        Frame: {frame}
      </div>
    </AbsoluteFill>
  );
};