import React from 'react';
import Carousel from './Carousel.jsx';
import { PRODUCTS } from '../../data/products.js';

export default function Hero() {
  const scrollToShop = () => {
    const el = document.getElementById('shop');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      aria-label="The Spice Jar Interactive Hero Showcase"
      className="px-2.5 sm:px-6 lg:px-8 pt-1.5 sm:pt-3"
    >
      <div
        className="max-w-6xl mx-auto rounded-[24px] sm:rounded-[34px] px-4 py-6 sm:px-8 sm:py-9 lg:px-10 lg:py-10 relative overflow-hidden shadow-xl border border-[#14532D]"
        style={{
          background:
            'radial-gradient(circle at 50% 42%, #0E3F20 0%, #072411 65%, #04170B 100%)',
        }}
      >
        {/* Subtle Editorial Grid Texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-45"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />

        {/* Compact Centered Brand Headline */}
        <div className="relative z-10 text-center max-w-2xl mx-auto space-y-1.5 sm:space-y-2 animate-hero-enter">
          <p className="text-[9.5px] sm:text-[11px] uppercase tracking-[0.22em] font-extrabold text-[#BEF264]">
            SPICE UP YOUR LIFE • HANDPICKED QUALITY
          </p>

          <h1 className="font-display text-2xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-white uppercase leading-[0.98]">
            SPICE SMARTER, LIVE TASTIER
          </h1>

          <p className="text-[11px] sm:text-sm text-white/80 max-w-lg mx-auto font-medium leading-snug sm:leading-relaxed">
            Small-batch Kerala achar crafted in our kitchen with unrefined rock salt, sun-cured spices, and pure cold-pressed gingelly oil.
            <button
              type="button"
              onClick={scrollToShop}
              className="ml-1.5 text-[#BEF264] hover:underline font-bold focus-visible:outline-none rounded"
            >
              Browse all jars →
            </button>
          </p>
        </div>

        {/* Interactive Tigris-Style Floating Jar & Flavor Selector */}
        <div className="relative z-10 mt-2 sm:mt-4">
          <Carousel products={PRODUCTS} />
        </div>
      </div>
    </section>
  );
}
