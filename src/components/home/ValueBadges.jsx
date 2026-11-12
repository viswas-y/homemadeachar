import React from 'react';

const PURITY_BADGES = [
  {
    id: 'superior-quality',
    label: 'SUPERIOR QUALITY',
    image: '/images/products/mango-pickle.jpg',
    alt: 'The Spice Jar homemade mango achar jar',
    variant: 'green',
    shape: 'rounded-[58%_42%_64%_36%/44%_62%_38%_56%]',
  },
  {
    id: 'hygienic-packing',
    label: 'HYGIENIC PACKING',
    image: '/images/gallery/ready-jars-collection.jpg',
    alt: 'Hygienically packed fresh homemade pickle jars',
    variant: 'light',
    shape: 'rounded-[44%_56%_38%_62%/58%_42%_58%_42%]',
  },
  {
    id: 'no-preservatives',
    label: 'NO CHEMICALS OR PRESERVATIVES',
    image: '/images/sections/ingredient-curry-leaves.jpg',
    alt: 'Fresh Kerala curry leaves with zero preservatives',
    variant: 'green',
    shape: 'rounded-[62%_38%_46%_54%/52%_58%_42%_48%]',
  },
  {
    id: 'small-batch',
    label: 'SMALL BATCH KITCHEN',
    image: '/images/about-story.jpg',
    alt: 'Small batch woodfire kitchen preparation by Amma',
    variant: 'light',
    shape: 'rounded-[42%_58%_60%_40%/60%_44%_56%_40%]',
  },
  {
    id: 'handpicked-spices',
    label: 'HANDPICKED SPICES',
    image: '/images/sections/ingredient-spices.jpg',
    alt: 'Whole sun-cured Kerala spices and chillies',
    variant: 'green',
    shape: 'rounded-[52%_48%_40%_60%/46%_64%_36%_54%]',
  },
  {
    id: 'pure-gingelly-oil',
    label: 'PURE COLD-PRESSED OIL',
    image: '/images/sections/ingredient-mangoes.jpg',
    alt: 'Country mangoes cured in crystal salt and pure gingelly oil',
    variant: 'light',
    shape: 'rounded-[46%_54%_58%_42%/56%_38%_62%_44%]',
  },
];

export default function ValueBadges() {
  return (
    <section
      aria-label="Our purity and homemade promises"
      className="py-10 sm:py-14 px-4 sm:px-8 bg-[#F7F7F5]"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-5 gap-y-9 sm:gap-y-10">
        {PURITY_BADGES.map((badge) => {
          const isGreen = badge.variant === 'green';

          return (
            <div key={badge.id} className="flex flex-col items-center text-center group">
              {/* Organic Asymmetric Pebble Blob Stage (matching Millnadan layout) */}
              <div
                className={`w-32 h-28 sm:w-36 sm:h-32 p-2.5 sm:p-3 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${badge.shape} ${
                  isGreen
                    ? 'bg-gradient-to-br from-[#168029] to-[#0B4D18] shadow-md'
                    : 'bg-white border border-stone-200/80 shadow-sm'
                }`}
              >
                <div className="w-full h-full rounded-[inherit] overflow-hidden bg-white/95 flex items-center justify-center">
                  <img
                    src={badge.image}
                    alt={badge.alt}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    draggable="false"
                  />
                </div>
              </div>

              {/* Bold Uppercase Title below Blob */}
              <span className="mt-3.5 text-[11px] sm:text-xs font-extrabold uppercase tracking-wide text-[#1C1917] leading-snug max-w-[155px]">
                {badge.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
