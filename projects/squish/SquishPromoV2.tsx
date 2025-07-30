import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from 'remotion';

// Import VHS effects
import { VHSEffects } from './components/VHSEffects';
import { GridPaper } from './components/GridPaper';

// Import ACTUAL Squish components (after symlinking or copying)
// These would be the real components from the Squish codebase
import { GlassButton } from './imported-components/buttons/GlassButton';
import { GlowEffect } from './imported-components/effects/GlowEffect';
import { BorderGlowEffect } from './imported-components/effects/BorderGlowEffect';

interface SquishPromoV2Props {
  title?: string;
}

export const SquishPromoV2: React.FC<SquishPromoV2Props> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring animations for smooth transitions
  const logoScale = spring({
    frame: frame - 30,
    fps,
    config: { damping: 100 },
  });

  const buttonEntrance = spring({
    frame: frame - 90,
    fps,
    config: { damping: 200 },
  });

  const fadeOut = interpolate(frame, [420, 450], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0a0a' }}>
      {/* Grid background */}
      <GridPaper />

      {/* VHS effects overlay */}
      <VHSEffects intensity={0.3} />

      {/* Main content */}
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          opacity: fadeOut,
        }}
      >
        {/* Logo sequence with real glow effects */}
        <Sequence from={30} durationInFrames={60}>
          <div
            style={{
              transform: `scale(${logoScale})`,
              position: 'relative',
            }}
          >
            {/* Using actual GlowEffect component */}
            <GlowEffect
              intensity="medium"
              blur="2xl"
              animation="pulse"
              scale={1.5}
            />
            
            {/* Minimalist logo - 3x3 grid */}
            <div
              style={{
                width: 120,
                height: 120,
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 8,
                padding: 20,
                position: 'relative',
                zIndex: 1,
              }}
            >
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: i === 4 ? '#fff' : 'rgba(255, 255, 255, 0.2)',
                    borderRadius: 4,
                    transform: `scale(${interpolate(
                      frame,
                      [30 + i * 2, 40 + i * 2],
                      [0, 1],
                      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                    )})`,
                  }}
                />
              ))}
            </div>
          </div>
        </Sequence>

        {/* Button showcase using real GlassButton */}
        <Sequence from={90} durationInFrames={120}>
          <div
            style={{
              position: 'absolute',
              bottom: 200,
              transform: `translateY(${interpolate(
                buttonEntrance,
                [0, 1],
                [100, 0]
              )}px)`,
              opacity: buttonEntrance,
            }}
          >
            {/* Real GlassButton component from Squish */}
            <GlassButton onClick={() => {}} width="240px">
              <span style={{ fontSize: 18, fontWeight: 500 }}>
                Start Creating
              </span>
            </GlassButton>
          </div>
        </Sequence>

        {/* Multiple buttons morphing */}
        <Sequence from={210} durationInFrames={90}>
          <div
            style={{
              display: 'flex',
              gap: 20,
              transform: `scale(${interpolate(
                frame,
                [210, 240],
                [0.8, 1],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              )})`,
            }}
          >
            {['Browse', 'Create', 'Share'].map((label, i) => (
              <div
                key={label}
                style={{
                  opacity: interpolate(
                    frame,
                    [220 + i * 10, 230 + i * 10],
                    [0, 1],
                    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                  ),
                }}
              >
                <GlassButton onClick={() => {}} width="120px">
                  <span style={{ fontSize: 14 }}>{label}</span>
                </GlassButton>
              </div>
            ))}
          </div>
        </Sequence>

        {/* Border glow showcase */}
        <Sequence from={300} durationInFrames={120}>
          <div
            style={{
              position: 'absolute',
              width: 300,
              height: 200,
              borderRadius: 12,
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
            }}
          >
            <BorderGlowEffect
              intensity="medium"
              blur="md"
              animation="flow"
              borderWidth={2}
            />
          </div>
        </Sequence>
      </AbsoluteFill>

      {/* Final fade to signal loss */}
      <Sequence from={420} durationInFrames={30}>
        <AbsoluteFill
          style={{
            backgroundColor: '#000',
            opacity: interpolate(frame, [420, 450], [0, 1]),
          }}
        />
      </Sequence>
    </AbsoluteFill>
  );
};