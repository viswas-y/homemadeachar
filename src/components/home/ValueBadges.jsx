import React from 'react';
import { Leaf, ShieldCheck, Droplets, Heart, Sparkles, Smile } from 'lucide-react';

export default function ValueBadges() {
  const badges = [
    {
      icon: <Leaf className="w-6 h-6 stroke-[2]" />,
      title: "100% Natural",
      sub: "Garden fresh"
    },
    {
      icon: <ShieldCheck className="w-6 h-6 stroke-[2]" />,
      title: "No Preservatives",
      sub: "Zero chemicals"
    },
    {
      icon: <Droplets className="w-6 h-6 stroke-[2]" />,
      title: "Gingelly Oil",
      sub: "Cold-pressed"
    },
    {
      icon: <Heart className="w-6 h-6 stroke-[2]" />,
      title: "No Artificial Flavors",
      sub: "Pure spices"
    },
    {
      icon: <Sparkles className="w-6 h-6 stroke-[2]" />,
      title: "Small Batch",
      sub: "Slow tempered"
    },
    {
      icon: <Smile className="w-6 h-6 stroke-[2]" />,
      title: "Seriously Tasty",
      sub: "Homely taste"
    }
  ];

  return (
    <section className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Desktop: 6-item flex row | Mobile: 2-column or 3-column grid matching reference mockup */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 justify-items-center">
        {badges.map((badge, idx) => (
          <div key={idx} className="flex flex-col items-center text-center group cursor-default">
            {/* Dark Espresso Circular Badge */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#221610] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200">
              {badge.icon}
            </div>

            {/* Label Underneath */}
            <h4 className="font-display text-xs sm:text-sm font-bold text-[#221610] mt-3">
              {badge.title}
            </h4>
            <p className="text-[11px] text-[#221610]/60 font-medium">
              {badge.sub}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

