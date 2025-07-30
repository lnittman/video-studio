import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Sequence, spring, useVideoConfig } from 'remotion';
import { noise2D } from '@remotion/noise';
import { VHSScanLines, VHSNoise, ChromaticAberration } from './components/VHSEffects';
import { GridPaper, GridPattern } from './components/GridPaper';
import { ColorBleed, RETRO_COLORS, VHSColorShift } from './components/RetroColors';
import { BlankSpaceTransition, FloatingDots, InkBleed } from './components/BlankSpace';
import { DigitalGlitch, DataMosh, SignalLoss } from './components/GlitchEffects';

interface SquishPromoProps {
  title: string;
  subtitle: string;
}

export const SquishPromo: React.FC<SquishPromoProps> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  
  // VHS tracking effect
  const tracking = noise2D('tracking', frame * 0.02, 0) * 3;
  const verticalHold = Math.sin(frame * 0.03) * 2;
  
  return (
    <AbsoluteFill
      style={{
        backgroundColor: RETRO_COLORS.paper,
        position: 'relative',
      }}
    >
      {/* Base layer - Grid paper background */}
      <Sequence from={0} durationInFrames={durationInFrames}>
        <GridPaper cellSize={30} opacity={0.7} />
      </Sequence>
      
      {/* Floating elements throughout */}
      <Sequence from={30} durationInFrames={durationInFrames - 30}>
        <FloatingDots />
      </Sequence>
      
      {/* Grid pattern animation - fills in gradually */}
      <Sequence from={60} durationInFrames={200}>
        <GridPattern />
      </Sequence>
      
      {/* Ink bleeds at specific moments */}
      <Sequence from={120} durationInFrames={60}>
        <InkBleed x={30} y={40} startFrame={120} />
      </Sequence>
      <Sequence from={180} durationInFrames={60}>
        <InkBleed x={70} y={60} startFrame={180} />
      </Sequence>
      
      {/* Main content with tracking */}
      <AbsoluteFill
        style={{
          transform: `translate(${tracking}px, ${verticalHold}px)`,
        }}
      >
        {/* Minimalist logo representation */}
        <Sequence from={90} durationInFrames={300}>
          <AbsoluteFill
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ChromaticAberration>
              <SquishLogo frame={frame - 90} />
            </ChromaticAberration>
          </AbsoluteFill>
        </Sequence>
      </AbsoluteFill>
      
      {/* Blank space transitions */}
      <Sequence from={240} durationInFrames={60}>
        <BlankSpaceTransition startFrame={240} duration={60} />
      </Sequence>
      
      {/* VHS effects layer */}
      <VHSColorShift>
        <AbsoluteFill>
          <VHSScanLines />
          <ColorBleed />
          <VHSNoise />
        </AbsoluteFill>
      </VHSColorShift>
      
      {/* Glitch effects - subtle and occasional */}
      <Sequence from={150} durationInFrames={durationInFrames - 150}>
        <DigitalGlitch intensity={0.5} />
      </Sequence>
      
      {/* Data mosh effect for transitions */}
      <Sequence from={200} durationInFrames={40}>
        <DataMosh>
          <div />
        </DataMosh>
      </Sequence>
      
      {/* Signal loss at the end */}
      <Sequence from={durationInFrames - 30} durationInFrames={30}>
        <SignalLoss />
      </Sequence>
    </AbsoluteFill>
  );
};

// Minimalist Squish logo component
const SquishLogo: React.FC<{ frame: number }> = ({ frame }) => {
  const { fps } = useVideoConfig();
  
  const scale = spring({
    frame,
    fps,
    config: {
      damping: 200,
      stiffness: 40,
      mass: 2,
    },
  });
  
  const morph = interpolate(frame, [0, 120, 240], [0, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  return (
    <div
      style={{
        transform: `scale(${scale})`,
        opacity: interpolate(frame, [0, 30, 270, 300], [0, 1, 1, 0]),
      }}
    >
      {/* Abstract representation of organization/productivity */}
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        style={{
          filter: `blur(${morph * 0.5}px)`,
        }}
      >
        {/* Grid of squares that morph */}
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => {
            const delay = (row + col) * 5;
            const localFrame = Math.max(0, frame - delay);
            const localSpring = spring({
              frame: localFrame,
              fps,
              config: { damping: 100 },
            });
            
            return (
              <rect
                key={`${row}-${col}`}
                x={20 + col * 60 + morph * noise2D('x', row, col) * 20}
                y={20 + row * 60 + morph * noise2D('y', row, col) * 20}
                width={50 - morph * 10}
                height={50 - morph * 10}
                fill={RETRO_COLORS.dark}
                opacity={localSpring * 0.8}
                rx={morph * 25}
              />
            );
          })
        )}
      </svg>
    </div>
  );
};