import React from 'react';
import { ArrowRight } from 'lucide-react';

const INGREDIENTS = [
  {
    id: 'mangoes',
    title: 'RAW KERALA MANGOES',
    description: 'Hand-cut country mangoes sun-cured in crystal rock salt for authentic homestyle crunch.',
    image: '/images/sections/ingredient-mangoes.jpg',
    alt: 'Fresh diced raw Kerala mangoes in a rustic bowl',
    ticksPosition: 'top-right'
  },
  {
    id: 'spices',
    title: 'NATURAL SPICES & OIL',
    description: 'Cold-pressed gingelly oil and stone-ground chillies. No artificial stuff, ever.',
    image: '/images/sections/ingredient-spices.jpg',
    alt: 'Cold-pressed gingelly oil, turmeric, red chillies, and mustard seeds',
    ticksPosition: null
  },
  {
    id: 'curry-leaves',
    title: 'HOMEMADE QUALITY',
    description: 'Tempered fresh with aromatic Kerala curry leaves in small, clean kitchen batches.',
    image: '/images/sections/ingredient-curry-leaves.jpg',
    alt: 'Fresh green Kerala curry leaves stem',
    ticksPosition: 'bottom-right'
  }
];

function InkTicks({ position }) {
  if (!position) return null;

  if (position === 'top-right') {
    return (
      <svg
        viewBox="0 0 36 36"
        aria-hidden="true"
        className="w-7 h-7 text-[#146B2E] absolute -top-1 right-3 sm:right-2 pointer-events-none"
      >
        <path
          d="M8 22 L15 10 M16 25 L26 17 M19 30 L30 28"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 36 36"
      aria-hidden="true"
      className="w-7 h-7 text-[#146B2E] absolute bottom-1 right-3 sm:right-2 pointer-events-none"
    >
      <path
        d="M8 8 L17 15 M12 18 L24 21 M14 27 L25 32"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default function GoodIngredients() {
  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="ingredients"
      aria-labelledby="good-ingredients-heading"
      className="py-12 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto w-full"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">

        {/* Left Column: Clean Display Heading with Forest Green Accent Underline */}
        <div className="lg:col-span-4 text-center lg:text-left">
          <div className="inline-block origin-center lg:origin-left">
            <h2
              id="good-ingredients-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1C1917] uppercase leading-[0.98]"
            >
              GOOD<br />
              INGREDIENTS.<br />
              GREAT TASTE.
            </h2>

            {/* Forest Green Hand-drawn Underline Stroke */}
            <svg
              viewBox="0 0 260 18"
              aria-hidden="true"
              className="w-56 sm:w-64 h-4 mt-2.5 mx-auto lg:mx-0 text-[#146B2E]"
            >
              <path
                d="M4 11 C75 4, 175 4, 254 9"
                stroke="currentColor"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
        </div>

        {/* Right Area: 3 Ingredient Blocks + Learn More CTA */}
        <div className="lg:col-span-8 flex flex-col items-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 w-full">
            {INGREDIENTS.map((item) => (
              <div key={item.id} className="flex flex-col items-center text-center group">
                {/* Clean Isolated Ingredient Photo with Subtle Doodle Accents */}
                <div className="relative w-36 h-28 sm:w-40 sm:h-32 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-200 select-none"
                    draggable="false"
                  />
                  <InkTicks position={item.ticksPosition} />
                </div>

                {/* Title & Copy */}
                <h3 className="font-display text-xs sm:text-sm font-extrabold uppercase tracking-wide text-[#1C1917] mt-3">
                  {item.title}
                </h3>
                <p className="text-xs text-[#1C1917]/75 font-medium leading-relaxed mt-1.5 max-w-[230px]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Centered Forest Green Pill Button */}
          <div className="mt-8 sm:mt-10">
            <button
              type="button"
              onClick={scrollToAbout}
              className="rounded-full bg-[#16692B] hover:bg-[#115221] text-white px-7 py-3 text-xs sm:text-sm font-bold tracking-wide inline-flex items-center gap-2.5 shadow-sm transition-all active:scale-95"
            >
              <span>Learn more</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

