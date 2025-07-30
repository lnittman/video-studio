import React from 'react';
import { interpolate, useCurrentFrame, spring } from 'remotion';
import { RETRO_COLORS } from './RetroColors';

interface TypewriterTextProps {
  text: string;
  startFrame: number;
  fontSize?: number;
  color?: string;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  startFrame,
  fontSize = 24,
  color = RETRO_COLORS.dark,
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = Math.max(0, frame - startFrame);
  const charsToShow = Math.floor(relativeFrame / 2);
  const cursorVisible = Math.floor(relativeFrame / 10) % 2 === 0;
  
  if (frame < startFrame) return null;
  
  return (
    <div
      style={{
        fontFamily: "'Courier', monospace",
        fontSize,
        color,
        letterSpacing: '0.05em',
      }}
    >
      {text.slice(0, charsToShow)}
      <span
        style={{
          opacity: cursorVisible ? 1 : 0,
          marginLeft: 2,
        }}
      >
        |
      </span>
    </div>
  );
};

interface GlitchTextProps {
  text: string;
  fontSize?: number;
  glitchIntensity?: number;
}

export const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  fontSize = 48,
  glitchIntensity = 1,
}) => {
  const frame = useCurrentFrame();
  const glitch = Math.random() > 0.95;
  
  return (
    <div style={{ position: 'relative' }}>
      {/* Base text */}
      <div
        style={{
          fontFamily: "'Courier', monospace",
          fontSize,
          color: RETRO_COLORS.dark,
          fontWeight: 'bold',
        }}
      >
        {text}
      </div>
      
      {/* Glitch layers */}
      {glitch && (
        <>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: `${Math.random() * 4 - 2}px`,
              fontFamily: "'Courier', monospace",
              fontSize,
              color: RETRO_COLORS.vhsRed,
              fontWeight: 'bold',
              opacity: 0.7,
              mixBlendMode: 'multiply',
            }}
          >
            {text}
          </div>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: `${Math.random() * 4 - 2}px`,
              fontFamily: "'Courier', monospace",
              fontSize,
              color: RETRO_COLORS.vhsBlue,
              fontWeight: 'bold',
              opacity: 0.7,
              mixBlendMode: 'multiply',
            }}
          >
            {text}
          </div>
        </>
      )}
    </div>
  );
};