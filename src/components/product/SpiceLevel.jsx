import React from 'react';

export default function SpiceLevel({ level }) {
  const getSpiceInfo = (lvl) => {
    switch (lvl) {
      case 'hot':
        return {
          label: 'Hot & Fiery (എരിവുള്ളത്)',
          count: 3,
          barColor: 'bg-red-600',
          desc: 'Authentic Kerala heat powered by stone-ground bird’s eye chillies (Kanthari) and fiery Kashmiri chillies.'
        };
      case 'medium':
        return {
          label: 'Medium Spice (പാകത്തിന് എരിവ്)',
          count: 2,
          barColor: 'bg-amber-500',
          desc: 'Well-balanced Kerala homestyle heat suitable for most family dinners and children.'
        };
      default:
        return {
          label: 'Mild & Soothing (ലഘുവായ എരിവ്)',
          count: 1,
          barColor: 'bg-[#146B2E]',
          desc: 'Gentle warmth with roasted fenugreek, mustard, and fragrant ginger aromatics.'
        };
    }
  };

  const info = getSpiceInfo(level);

  return (
    <div className="p-3.5 rounded-xl bg-[#F7F7F5] border border-stone-200 space-y-2">
      <div className="flex items-center justify-between text-xs font-bold text-stone-700">
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="text-sm">🌶️</span>
          <span>Spice Level:</span>
          <span className="text-[#1C1917] font-extrabold">{info.label}</span>
        </span>
        <span className="flex items-center gap-1">
          {[1, 2, 3].map((step) => (
            <span
              key={step}
              className={`w-3.5 h-1.5 rounded-full ${
                step <= info.count ? info.barColor : 'bg-stone-300'
              }`}
            />
          ))}
        </span>
      </div>
      <p className="text-[11px] text-stone-600 leading-normal">
        {info.desc}
      </p>
    </div>
  );
}
