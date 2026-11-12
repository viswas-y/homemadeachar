import React from 'react';
import { ArrowRight } from 'lucide-react';
import Carousel from './Carousel.jsx';
import { PRODUCTS } from '../../data/products.js';

export default function Hero() {
  const scrollToShop = () => {
    const el = document.getElementById('shop');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      aria-label="The Spice Jar Featured Showcase"
      className="px-2.5 sm:px-6 lg:px-8 pt-1.5 sm:pt-3"
    >
      <div
        className="max-w-6xl mx-auto rounded-[20px] sm:rounded-[28px] bg-[#0E7124] px-3.5 py-3 sm:px-7 sm:py-6 lg:px-10 lg:py-8 relative overflow-hidden shadow-sm border border-[#0B5A1C]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 sm:gap-5 lg:gap-8 items-center">

          {/* Left Column: Crisp Bold Headline, Subhead & Pill CTA */}
          <div className="lg:col-span-6 space-y-1 sm:space-y-2.5 text-left z-10">
            <p className="text-[8.5px] sm:text-[11px] uppercase tracking-widest font-extrabold text-[#BEF264]">
              SPICE UP YOUR LIFE • HANDPICKED QUALITY.
            </p>

            <h1 className="font-display text-[22px] sm:text-3xl lg:text-[42px] font-extrabold tracking-tight text-white uppercase leading-[0.96]">
              SPICE SMARTER<br />
              LIVE TASTIER
            </h1>

            <p className="text-[10.5px] sm:text-sm text-white/90 max-w-sm font-medium leading-snug sm:leading-relaxed">
              Traditional Kerala achar crafted in small kitchen batches with unrefined sea salt, sun-cured spices, and pure cold-pressed gingelly oil. Good for your meal, better for your day.
            </p>

            <div className="pt-0.5 sm:pt-1.5">
              <button
                type="button"
                onClick={scrollToShop}
                className="rounded-full bg-white hover:bg-[#EDF5EE] text-[#146B2E] px-4 py-1.5 sm:px-6 sm:py-2.5 text-[10.5px] sm:text-xs font-extrabold tracking-wide inline-flex items-center gap-1.5 sm:gap-2 shadow-sm transition-all active:scale-95"
              >
                <span>Shop now</span>
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Compact Framed Pickle Poster Carousel */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            <Carousel products={PRODUCTS} />
          </div>

        </div>
      </div>
    </section>
  );
}
