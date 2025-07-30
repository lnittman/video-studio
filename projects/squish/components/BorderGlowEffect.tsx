import React from 'react';

interface BorderGlowEffectProps {
  className?: string;
  intensity: 'subtle' | 'medium' | 'intense';
  blur: 'sm' | 'md' | 'lg';
  animation: 'flow' | 'pulse';
  borderWidth?: number;
  delay?: string;
  opacity?: number;
  withBorder?: boolean;
  rounded?: string;
}

export function BorderGlowEffect({ 
  className,
  intensity, 
  blur, 
  animation, 
  borderWidth = 1,
  delay,
  opacity = 1,
  withBorder = true,
  rounded = "rounded-xl"
}: BorderGlowEffectProps) {
  const intensityColors = {
    subtle: "bg-gradient-to-r from-pink-300/30 via-purple-300/30 to-fuchsia-300/30",
    medium: "bg-gradient-to-r from-pink-300/40 via-purple-300/40 to-fuchsia-300/40",
    intense: "bg-gradient-to-r from-pink-300/50 via-purple-300/50 to-fuchsia-300/50"
  };

  const blurClass = {
    sm: "blur-[1.5px]",
    md: "blur-[2.5px]",
    lg: "blur-[4px]"
  };

  const animationClass = {
    flow: "animate-gradient-flow",
    pulse: "animate-border-pulse"
  };

  return (
    <>
      {/* Inner glow layer */}
      <div className={`absolute inset-0 overflow-hidden ${rounded} ${className || ''}`}>
        <div 
          className={`absolute inset-0 bg-[length:300%_300%]
            ${intensityColors[intensity]}
            blur-[6px]
            ${animationClass[animation]}
            ${rounded}
            ${delay || ''}`}
          style={{ 
            opacity: opacity * 0.5,
            transform: 'scale(1.03)',
          }}
        />
      </div>

      {/* Border layer */}
      {withBorder && (
        <div className={`absolute inset-0 overflow-hidden ${rounded}`}>
          <div 
            className={`absolute inset-0 bg-[length:300%_300%]
              ${intensityColors[intensity]}
              ${blurClass[blur]}
              ${animationClass[animation]}
              ${rounded}
              ${delay || ''}`}
            style={{ 
              opacity,
              padding: borderWidth,
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'exclude',
            }}
          />
        </div>
      )}
    </>
  );
}