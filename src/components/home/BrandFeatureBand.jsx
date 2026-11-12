import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BrandLogoMark } from '../common/Header.jsx';

export default function BrandFeatureBand() {
  const scrollToShop = () => {
    const el = document.getElementById('shop');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      aria-labelledby="brand-band-heading"
      className="w-full bg-[#0E7124] text-white overflow-hidden border-y border-[#0B5A1C]"
      style={{
        backgroundImage:
          'linear-gradient(to right, rgba(255,255,255,0.065) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.065) 1px, transparent 1px)',
        backgroundSize: '42px 42px',
      }}
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12 sm:py-16 grid grid-cols-1 md:grid-cols-12 items-center gap-8 md:gap-10">
        {/* Left Featured Jar on Wooden Coaster Stand (Millnadan Emerald Band Signature) */}
        <div className="md:col-span-5 flex flex-col items-center">
          <Link
            to="/product/pacha-mulaku-achar"
            className="group flex flex-col items-center focus-visible:outline-none"
            aria-label="Inspect Pacha Mulaku Achar Jar"
          >
            <div className="w-44 sm:w-52 lg:w-56 aspect-[4/4.8] rounded-2xl overflow-hidden bg-white p-1.5 shadow-2xl border-2 border-white/25 group-hover:-translate-y-1 transition-transform duration-300">
              <img
                src="/images/products/green-chilli-pickle.jpg"
                alt="The Spice Jar signature Pacha Mulaku green chilli pickle jar"
                loading="lazy"
                className="w-full h-full object-cover rounded-xl"
                draggable="false"
              />
            </div>
            {/* Wooden Stand Base Accent */}
            <div
              aria-hidden="true"
              className="w-36 sm:w-44 h-3 bg-gradient-to-b from-[#D2AA7D] to-[#9E7348] rounded-b-lg shadow-lg -mt-0.5"
            />
          </Link>
        </div>

        {/* Right Brand Crest, White Display Heading & Bright Lime Subheadline */}
        <div className="md:col-span-7 text-center md:text-left flex flex-col items-center md:items-start">
          <div className="mb-4">
            <BrandLogoMark inverted />
          </div>

          <h2
            id="brand-band-heading"
            className="font-display text-3xl sm:text-4xl lg:text-[42px] font-bold text-white leading-[1.12] tracking-tight"
          >
            Discover the pure<br className="hidden sm:inline" /> taste of Kerala
          </h2>

          <p className="text-[#BEF264] text-base sm:text-xl font-medium mt-3 leading-snug max-w-md">
            Spice up your life with handpicked quality homemade Kerala achar
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-3">
            <button
              type="button"
              onClick={scrollToShop}
              className="rounded-full bg-white hover:bg-[#EDF5EE] text-[#146B2E] px-6 py-2.5 sm:px-7 sm:py-3 text-xs sm:text-sm font-extrabold inline-flex items-center gap-2 shadow-md transition-all active:scale-95"
            >
              <span>Shop Fresh Jars</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
