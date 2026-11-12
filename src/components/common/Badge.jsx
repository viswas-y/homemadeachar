import React from 'react';

/**
 * Standard Indian Food Safety Veg / Non-Veg Indicator
 */
export function FoodTypeBadge({ veg, className = "" }) {
  if (veg) {
    return (
      <span 
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-green-600 bg-green-50/90 dark:bg-green-950/40 text-green-700 dark:text-green-400 text-xs font-semibold ${className}`}
        title="100% Vegetarian"
        aria-label="Vegetarian"
      >
        <span className="w-2.5 h-2.5 border-2 border-green-600 flex items-center justify-center p-0.5">
          <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
        </span>
        <span>Veg</span>
      </span>
    );
  }

  return (
    <span 
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-red-700 bg-red-50/90 dark:bg-red-950/40 text-red-700 dark:text-red-400 text-xs font-semibold ${className}`}
      title="Non-Vegetarian (Contains Seafood)"
      aria-label="Non-Vegetarian"
    >
      <span className="w-2.5 h-2.5 border-2 border-red-700 flex items-center justify-center p-0.5">
        <span className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[6px] border-b-red-700"></span>
      </span>
      <span>Non-Veg</span>
    </span>
  );
}

/**
 * Visual Spice Level Badge with chilli icons
 */
export function SpiceBadge({ level, showLabel = true, className = "" }) {
  const count = level === 'hot' ? 3 : level === 'medium' ? 2 : 1;
  const labelText = level === 'hot' ? 'Hot & Spicy' : level === 'medium' ? 'Medium Spice' : 'Mild Spice';
  const colorClass = level === 'hot' 
    ? 'text-red-700 bg-red-50 border-red-200' 
    : level === 'medium' 
      ? 'text-amber-700 bg-amber-50 border-amber-200' 
      : 'text-[#146B2E] bg-[#EDF5EE] border-[#146B2E]/25';

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold border ${colorClass} ${className}`}>
      <span className="flex items-center tracking-tighter" aria-hidden="true">
        {Array.from({ length: count }).map((_, i) => (
          <span key={i} className="text-xs">🌶️</span>
        ))}
      </span>
      {showLabel && <span>{labelText}</span>}
    </span>
  );
}

