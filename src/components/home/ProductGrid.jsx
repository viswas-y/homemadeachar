import React, { useState } from 'react';
import ProductCard from './ProductCard.jsx';

export default function ProductGrid({ products = [] }) {
  const [filter, setFilter] = useState('all');

  const vegCount = products.filter((p) => p.veg).length;
  const nonVegCount = products.filter((p) => !p.veg).length;

  const filteredProducts = products.filter((product) => {
    if (filter === 'veg') return product.veg;
    if (filter === 'non-veg') return !product.veg;
    return true;
  });

  return (
    <section
      id="shop"
      aria-labelledby="shop-heading"
      className="w-full bg-white py-12 sm:py-16 px-4 sm:px-8 border-b border-stone-200/70"
    >
      <div className="max-w-7xl mx-auto">
        {/* Clean Millnadan Header & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-[#146B2E] block">
              HOMEMADE KERALA SPECIALTIES
            </span>
            <h2
              id="shop-heading"
              className="font-display text-2xl sm:text-4xl font-extrabold text-[#1C1917] tracking-tight mt-1"
            >
              Our Fresh Achar Collection
            </h2>
          </div>

          <div
            role="group"
            aria-label="Filter pickles by dietary type"
            className="flex flex-wrap items-center gap-2"
          >
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                filter === 'all'
                  ? 'bg-[#146B2E] text-white shadow-xs'
                  : 'bg-[#ECECE8] text-[#1C1917] hover:bg-[#DFDFDA]'
              }`}
            >
              All ({products.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('veg')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                filter === 'veg'
                  ? 'bg-[#146B2E] text-white shadow-xs'
                  : 'bg-[#ECECE8] text-[#1C1917] hover:bg-[#DFDFDA]'
              }`}
            >
              Veg ({vegCount})
            </button>
            <button
              type="button"
              onClick={() => setFilter('non-veg')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                filter === 'non-veg'
                  ? 'bg-[#146B2E] text-white shadow-xs'
                  : 'bg-[#ECECE8] text-[#1C1917] hover:bg-[#DFDFDA]'
              }`}
            >
              Non-Veg ({nonVegCount})
            </button>
          </div>
        </div>

        {/* Studio Product Card Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-7 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
