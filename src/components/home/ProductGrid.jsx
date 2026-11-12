import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard.jsx';

export default function ProductGrid({ products }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = products.filter(p => {
    if (activeFilter === 'veg') return p.veg;
    if (activeFilter === 'non-veg') return !p.veg;
    return true;
  });

  return (
    <section id="products" className="px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Enclosed Large Rounded Yellow Container Card matching reference */}
      <div className="max-w-7xl mx-auto rounded-[28px] sm:rounded-[36px] bg-[#FAD051] p-5 sm:p-10 lg:p-12 shadow-xs">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <p className="text-[11px] sm:text-xs uppercase tracking-widest font-extrabold text-[#221610]/80">
              OUR FAVORITES
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#221610] uppercase mt-0.5">
              ACHAR YOU'LL LOVE
            </h2>
          </div>

          {/* Filter Pills / View All on Right */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`rounded-full px-3.5 py-1 text-xs font-bold transition-colors ${activeFilter === 'all'
                  ? 'bg-[#221610] text-white'
                  : 'bg-white/60 hover:bg-white text-[#221610]'
                }`}
            >
              All Jars
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('veg')}
              className={`rounded-full px-3.5 py-1 text-xs font-bold transition-colors ${activeFilter === 'veg'
                  ? 'bg-[#221610] text-white'
                  : 'bg-white/60 hover:bg-white text-[#221610]'
                }`}
            >
              Veg
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('non-veg')}
              className={`rounded-full px-3.5 py-1 text-xs font-bold transition-colors ${activeFilter === 'non-veg'
                  ? 'bg-[#221610] text-white'
                  : 'bg-white/60 hover:bg-white text-[#221610]'
                }`}
            >
              Non-Veg
            </button>
          </div>
        </div>

        {/* Product Cards Grid: 2 columns on mobile, 4 columns on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}
