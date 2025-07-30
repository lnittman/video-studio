import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from 'remotion';

// Import actual Squish components
import { GlassButton } from './components/GlassButton';
import { GlowEffect } from './components/GlowEffect';
import { BorderGlowEffect } from './components/BorderGlowEffect';

// Import VHS effects
import { VHSEffects } from './components/VHSEffects';
import { GridPaper } from './components/GridPaper';

export const SquishPromoPolished: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth spring animations
  const introScale = spring({
    frame,
    fps,
    config: { damping: 100 },
  });

  const logoAppear = spring({
    frame: frame - 20,
    fps,
    config: { damping: 200 },
  });

  const buttonStagger1 = spring({
    frame: frame - 90,
    fps,
    config: { damping: 150 },
  });

  const buttonStagger2 = spring({
    frame: frame - 100,
    fps,
    config: { damping: 150 },
  });

  const buttonStagger3 = spring({
    frame: frame - 110,
    fps,
    config: { damping: 150 },
  });

  // Scene transitions
  const sceneTransition = interpolate(frame, [180, 200], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const finalFade = interpolate(frame, [420, 450], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0a0a' }}>
      {/* Grid background with subtle animation */}
      <GridPaper />

      {/* Subtle VHS effects */}
      <VHSEffects intensity={0.2} />

      {/* Main content */}
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          opacity: finalFade,
        }}
      >
        {/* Opening sequence - Squish logo */}
        <Sequence from={0} durationInFrames={90}>
          <div
            style={{
              position: 'relative',
              transform: `scale(${introScale})`,
              opacity: logoAppear,
            }}
          >
            {/* Subtle glow behind logo */}
            <div style={{ position: 'absolute', inset: -50 }}>
              <GlowEffect
                intensity="subtle"
                blur="2xl"
                animation="pulse"
                scale={2}
              />
            </div>

            {/* Minimalist Squish logo - 3x3 grid */}
            <div
              style={{
                width: 150,
                height: 150,
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 12,
                padding: 24,
                borderRadius: 16,
                position: 'relative',
                zIndex: 1,
              }}
            >
              {[...Array(9)].map((_, i) => {
                const cellDelay = i * 3;
                const cellOpacity = interpolate(
                  frame,
                  [20 + cellDelay, 30 + cellDelay],
                  [0, 1],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                );
                const isCenter = i === 4;

                return (
                  <div
                    key={i}
                    style={{
                      backgroundColor: isCenter ? '#fff' : 'rgba(255, 255, 255, 0.1)',
                      borderRadius: 8,
                      opacity: cellOpacity,
                      transform: `scale(${cellOpacity})`,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {isCenter && (
                      <div style={{ position: 'absolute', inset: 0 }}>
                        <GlowEffect
                          intensity="medium"
                          blur="md"
                          animation="pulse"
                          color="rgba(255, 255, 255, 0.3)"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Sequence>

        {/* Button showcase sequence */}
        <Sequence from={90} durationInFrames={90}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              alignItems: 'center',
            }}
          >
            {/* Main CTA button */}
            <div
              style={{
                transform: `translateY(${interpolate(
                  buttonStagger1,
                  [0, 1],
                  [50, 0]
                )}px)`,
                opacity: buttonStagger1,
              }}
            >
              <GlassButton width="280px">
                <span style={{ fontSize: 20, fontWeight: 600 }}>
                  Start Creating
                </span>
              </GlassButton>
            </div>

            {/* Secondary buttons */}
            <div
              style={{
                display: 'flex',
                gap: 16,
                transform: `translateY(${interpolate(
                  buttonStagger2,
                  [0, 1],
                  [50, 0]
                )}px)`,
                opacity: buttonStagger2,
              }}
            >
              <GlassButton width="130px">
                <span style={{ fontSize: 16 }}>Browse</span>
              </GlassButton>
              <GlassButton width="130px">
                <span style={{ fontSize: 16 }}>Create</span>
              </GlassButton>
            </div>

            {/* Tertiary action */}
            <div
              style={{
                transform: `translateY(${interpolate(
                  buttonStagger3,
                  [0, 1],
                  [50, 0]
                )}px)`,
                opacity: buttonStagger3 * 0.8,
              }}
            >
              <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 14 }}>
                Join 10,000+ creators
              </span>
            </div>
          </div>
        </Sequence>

        {/* Grid transformation sequence */}
        <Sequence from={180} durationInFrames={120}>
          <div
            style={{
              position: 'absolute',
              width: '80%',
              height: '80%',
              opacity: sceneTransition,
            }}
          >
            {/* Animated grid cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 20,
                height: '100%',
                padding: 40,
              }}
            >
              {[...Array(12)].map((_, i) => {
                const cardDelay = (i % 4) * 5 + Math.floor(i / 4) * 10;
                const cardScale = spring({
                  frame: frame - 200 - cardDelay,
                  fps,
                  config: { damping: 100 },
                });

                return (
                  <div
                    key={i}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: 12,
                      transform: `scale(${cardScale})`,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <BorderGlowEffect
                      intensity="subtle"
                      blur="sm"
                      animation="flow"
                      opacity={0.3}
                      delay={`delay-${cardDelay * 50}`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </Sequence>

        {/* Final brand moment */}
        <Sequence from={300} durationInFrames={120}>
          <div
            style={{
              position: 'relative',
              opacity: interpolate(frame, [300, 320], [0, 1]),
            }}
          >
            <div
              style={{
                fontSize: 48,
                fontWeight: 300,
                letterSpacing: 8,
                color: '#fff',
                textTransform: 'uppercase',
              }}
            >
              Squish
            </div>
            <div
              style={{
                fontSize: 16,
                color: 'rgba(255, 255, 255, 0.6)',
                marginTop: 10,
                letterSpacing: 2,
              }}
            >
              Organize Everything
            </div>
          </div>
        </Sequence>
      </AbsoluteFill>

      {/* VHS signal loss ending */}
      <Sequence from={420} durationInFrames={30}>
        <AbsoluteFill
          style={{
            backgroundColor: '#000',
            opacity: interpolate(frame, [420, 450], [0, 1]),
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              height: 2,
              background: 'linear-gradient(to right, transparent, #fff, transparent)',
              opacity: interpolate(frame, [440, 450], [1, 0]),
            }}
          />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};