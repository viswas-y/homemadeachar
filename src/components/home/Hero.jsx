import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products.js';
import Carousel from './Carousel.jsx';

export default function Hero() {
  const scrollToProducts = () => {
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="px-3 sm:px-6 lg:px-8 py-2 sm:py-4">
      {/* Enclosed Large Rounded Yellow Hero Container Card */}
      <div className="max-w-7xl mx-auto rounded-[28px] sm:rounded-[36px] bg-[#FAD051] p-6 sm:p-12 lg:p-16 relative overflow-hidden shadow-xs">

        {/* Subtle decorative floating spices / yellow background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FCE382]/50 rounded-full blur-2xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">

          {/* Left Column: Bold Typography & CTA */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">

            {/* Small Uppercase Eyebrow */}
            <p className="text-[11px] sm:text-xs uppercase tracking-widest font-extrabold text-[#221610]/80">
              REAL INGREDIENTS. HOMEMADE TASTE.
            </p>

            {/* Massive Chunky Display Headline */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#221610] uppercase leading-[0.98]">
              SPICE SMARTER<br />
              LIVE TASTIER
            </h1>

            {/* Subline */}
            <p className="text-sm sm:text-base text-[#221610]/90 font-medium max-w-lg leading-relaxed">
              Traditional Kerala achar crafted in small kitchen batches with unrefined sea salt, sun-cured spices, and pure cold-pressed gingelly oil. Good for your meal, better for your day.
            </p>

            {/* Dark Pill CTA Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={scrollToProducts}
                className="rounded-full bg-[#221610] hover:bg-black text-white px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-bold tracking-wide transition-all transform active:scale-95 inline-flex items-center gap-2.5 shadow-sm"
              >
                <span>Shop now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Hero Product Carousel (5 featured jars) */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <Carousel products={PRODUCTS} />
          </div>

        </div>

      </div>
    </section>
  );
}
