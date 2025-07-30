import React from 'react';

// Placeholder GlassButton component for video studio
// This mimics the actual Squish GlassButton for video purposes
export const GlassButton: React.FC<{
  onClick?: () => void;
  width?: string;
  children: React.ReactNode;
}> = ({ onClick, width = 'auto', children }) => {
  return (
    <button
      onClick={onClick}
      style={{
        width,
        padding: '12px 24px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '8px',
        color: '#fff',
        fontSize: '16px',
        fontWeight: '500',
        cursor: 'pointer',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      {children}
    </button>
  );
};