import React, { useState } from 'react';
import { BorderGlowEffect } from './BorderGlowEffect';
import { GlowEffect } from './GlowEffect';

interface GlassButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  width?: string;
}

export function GlassButton({ children, className, onClick, width = '200px' }: GlassButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <button
      className={`group relative h-12 select-none glass backdrop-blur-xl rounded-xl
        transform-gpu will-change-transform
        transition-transform duration-75 ease-in-out active:scale-[0.98]
        ${className || ''}`}
      style={{ width }}
      onClick={() => {
        onClick?.();
        setIsPressed(true);
        setTimeout(() => setIsPressed(false), 300);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setTimeout(() => setIsPressed(false), 300)}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
    >
      {/* Non-hover border glow */}
      <div className="absolute inset-0 transition-opacity duration-300 ease-out opacity-100 group-hover:opacity-0 rounded-xl">
        <BorderGlowEffect
          intensity="subtle"
          blur="sm"
          animation="flow"
          borderWidth={1.5}
          opacity={0.5}
        />
      </div>

      {/* Hover gradient border glow */}
      <div className="absolute inset-0 transition-opacity duration-300 ease-out opacity-0 group-hover:opacity-100 rounded-xl">
        <GlowEffect intensity="medium" blur="md" animation="pulse" />
        <GlowEffect intensity="subtle" blur="2xl" animation="pulse" delay="delay-100" />
      </div>

      {/* Active/pressed state glow */}
      <div
        className={`absolute inset-0 transition-all duration-300 ease-out rounded-xl
          ${isPressed ? "opacity-100 scale-105" : "opacity-0 scale-100"}`}
      >
        <GlowEffect intensity="intense" blur="sm" animation="pulse" />
        <GlowEffect intensity="medium" blur="xl" animation="pulse" delay="delay-75" />
        <GlowEffect intensity="subtle" blur="2xl" animation="pulse" delay="delay-150" />
      </div>

      {/* Content */}
      <div
        className={`relative flex items-center justify-center gap-2 h-full
          transition-transform duration-300 ease-out rounded-xl
          ${isPressed ? "scale-[0.98]" : ""}
          text-slate-200`}
      >
        {children}
      </div>
    </button>
  );
}