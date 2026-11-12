import React from 'react';

/**
 * Large soft organic blob shapes for subtle colour-blocked section backgrounds
 */
export function BlobShape({ variant = 1, className = "", color = "currentColor", opacity = 0.35 }) {
  if (variant === 1) {
    return (
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`pointer-events-none select-none ${className}`}
        aria-hidden="true"
      >
        <path
          d="M418.5 137.5C453.5 192.5 458.5 264.5 431 324C403.5 383.5 343.5 430.5 273.5 448C203.5 465.5 123.5 453.5 76 406.5C28.5 359.5 13.5 277.5 31.5 210C49.5 142.5 100.5 89.5 163.5 56.5C226.5 23.5 301.5 10.5 358 45.5C414.5 80.5 383.5 82.5 418.5 137.5Z"
          fill={color}
          fillOpacity={opacity}
        />
      </svg>
    );
  }

  if (variant === 2) {
    return (
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`pointer-events-none select-none ${className}`}
        aria-hidden="true"
      >
        <path
          d="M447.5 292.5C427.5 369.5 353.5 427.5 273.5 444C193.5 460.5 107.5 435.5 61.5 378C15.5 320.5 9.5 230.5 44.5 163C79.5 95.5 155.5 50.5 233.5 45.5C311.5 40.5 391.5 75.5 429 137C466.5 198.5 467.5 215.5 447.5 292.5Z"
          fill={color}
          fillOpacity={opacity}
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <path
        d="M508.5 180.5C549.5 251.5 540.5 348.5 487 416C433.5 483.5 335.5 521.5 244 509C152.5 496.5 67.5 433.5 39 353C10.5 272.5 38.5 174.5 97.5 111.5C156.5 48.5 246.5 20.5 331 35C415.5 49.5 467.5 109.5 508.5 180.5Z"
        fill={color}
        fillOpacity={opacity}
      />
    </svg>
  );
}

export default BlobShape;

