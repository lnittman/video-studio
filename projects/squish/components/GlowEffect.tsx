import React from 'react';

interface GlowEffectProps {
  intensity: 'subtle' | 'medium' | 'intense';
  blur: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  animation: 'flow' | 'pulse';
  delay?: string;
  opacity?: number;
  scale?: number;
  color?: string;
}

export function GlowEffect({ 
  intensity, 
  blur, 
  animation, 
  delay, 
  opacity = 1,
  scale = 1,
  color
}: GlowEffectProps) {
  const intensityColors = {
    subtle: 'from-pink-300/20 via-purple-200/20 to-fuchsia-200/20',
    medium: 'from-pink-300/30 via-purple-200/30 to-fuchsia-200/30',
    intense: 'from-pink-300/40 via-purple-200/40 to-fuchsia-200/40'
  };

  const blurClass = {
    sm: 'blur-sm',
    md: 'blur-md',
    lg: 'blur-lg',
    xl: 'blur-xl',
    '2xl': 'blur-2xl'
  };

  const animationClass = animation === 'pulse' ? 'animate-glow-pulse' : '';

  return (
    <div 
      className={`absolute inset-[-1px] rounded-lg bg-gradient-to-r
        ${!color ? intensityColors[intensity] : ''}
        ${blurClass[blur]}
        ${animationClass}
        ${delay || ''}`}
      style={{ 
        opacity,
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transition: opacity !== 1 ? 'opacity 0.3s ease-in-out' : undefined,
        ...(color && {
          background: `linear-gradient(to right, ${color}, ${color})`
        })
      }}
    />
  );
}