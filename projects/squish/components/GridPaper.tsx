import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, spring } from 'remotion';
import { noise2D } from '@remotion/noise';

interface GridPaperProps {
  cellSize?: number;
  opacity?: number;
}

export const GridPaper: React.FC<GridPaperProps> = ({ 
  cellSize = 40, 
  opacity = 1 
}) => {
  const frame = useCurrentFrame();
  const drift = noise2D('grid', frame * 0.001, 0) * 10;
  
  return (
    <AbsoluteFill
      style={{
        opacity,
        transform: `translate(${drift}px, ${drift}px)`,
      }}
    >
      {/* Main grid */}
      <div
        style={{
          position: 'absolute',
          width: '120%',
          height: '120%',
          left: '-10%',
          top: '-10%',
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent ${cellSize - 1}px,
              rgba(220, 190, 150, 0.15) ${cellSize - 1}px,
              rgba(220, 190, 150, 0.15) ${cellSize}px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent ${cellSize - 1}px,
              rgba(220, 190, 150, 0.15) ${cellSize - 1}px,
              rgba(220, 190, 150, 0.15) ${cellSize}px
            )
          `,
        }}
      />
      
      {/* Subtle accent lines */}
      <div
        style={{
          position: 'absolute',
          width: '120%',
          height: '120%',
          left: '-10%',
          top: '-10%',
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent ${cellSize * 5 - 1}px,
              rgba(180, 140, 100, 0.2) ${cellSize * 5 - 1}px,
              rgba(180, 140, 100, 0.2) ${cellSize * 5}px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent ${cellSize * 5 - 1}px,
              rgba(180, 140, 100, 0.2) ${cellSize * 5 - 1}px,
              rgba(180, 140, 100, 0.2) ${cellSize * 5}px
            )
          `,
        }}
      />
    </AbsoluteFill>
  );
};

export const AnimatedGridCell: React.FC<{
  x: number;
  y: number;
  size: number;
  delay: number;
}> = ({ x, y, size, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = { fps: 30 };
  
  const appear = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 200,
      stiffness: 100,
      mass: 0.5,
    },
  });
  
  const opacity = interpolate(appear, [0, 1], [0, 0.3]);
  
  return (
    <div
      style={{
        position: 'absolute',
        left: x * size,
        top: y * size,
        width: size,
        height: size,
        backgroundColor: 'rgba(255, 220, 180, 0.1)',
        opacity,
        transform: `scale(${appear})`,
      }}
    />
  );
};

export const GridPattern: React.FC = () => {
  const frame = useCurrentFrame();
  const cells = [];
  
  // Create a wave of cells filling in
  for (let x = 0; x < 50; x++) {
    for (let y = 0; y < 30; y++) {
      const distance = Math.sqrt(Math.pow(x - 25, 2) + Math.pow(y - 15, 2));
      const delay = distance * 0.5;
      
      if (frame > delay && Math.random() > 0.7) {
        cells.push(
          <AnimatedGridCell
            key={`${x}-${y}`}
            x={x}
            y={y}
            size={40}
            delay={delay}
          />
        );
      }
    }
  }
  
  return <>{cells}</>;
};