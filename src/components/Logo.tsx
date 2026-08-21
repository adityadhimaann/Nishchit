'use client';

import React from 'react';

interface LogoProps {
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ size = 38 }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        background: '#FFFFFF',
        color: '#000000',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 10px rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        flexShrink: 0,
        position: 'relative',
      }}
    >
      {/* Sleek Minimalist Geometric Monogram: Merging N and Devanagari न */}
      <svg
        width={size * 0.65}
        height={size * 0.65}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 4V20M4 11H13C16.5 11 19 8.5 19 5.5C19 4 17.5 4 16 4H4M20 4V20"
          stroke="#000000"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="15.5" r="2" fill="#000000" />
      </svg>
    </div>
  );
};
