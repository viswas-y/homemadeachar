import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Flame } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';
import { formatINR } from '../../utils/currency.js';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const defaultSize = product.sizes[0];

  const handleBuyNow = () => {
    addToCart(product, defaultSize, 1, true);
  };

  return (
    <article className="group flex flex-col">
      {/* Studio Spiced Burgundy Card Frame */}
      <Link
        to={`/product/${product.slug}`}
        className="relative block aspect-[4/4.6] rounded-2xl overflow-hidden bg-[#280404] border border-stone-200/70 shadow-xs group-hover:shadow-md transition-all duration-200 focus-visible:outline-none"
      >
        {/* Top-Left Stacked Minimal Callout Badges */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10 flex flex-col items-start gap-1.5 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-xs px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-semibold text-[#1C1917] shadow-xs border border-black/5">
            {product.veg ? (
              <Leaf className="w-3 h-3 text-[#9B0B0B]" />
            ) : (
              <Flame className="w-3 h-3 text-red-600" />
            )}
            <span>Kerala homemade</span>
          </span>

          <span className="hidden sm:inline-flex items-center rounded-full bg-white/95 backdrop-blur-xs px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold text-[#9B0B0B] shadow-xs border border-black/5">
            No Preservatives
          </span>
        </div>

        <img
          src={product.images[0]}
          alt={`${product.name} (${product.malayalamName})`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Centered Product Title, Malayalam Subtitle & Price */}
      <Link
        to={`/product/${product.slug}`}
        className="mt-3.5 text-center block group-hover:text-[#9B0B0B] transition-colors focus-visible:outline-none rounded-lg"
      >
        <h3 className="font-display font-bold text-sm sm:text-base text-[#1C1917] leading-snug group-hover:text-[#9B0B0B]">
          {product.name} - {defaultSize.size}
        </h3>
        <p className="text-xs sm:text-sm font-semibold text-stone-600 mt-0.5">
          <span>{product.malayalamName}</span>
          <span className="mx-1.5 text-stone-400">•</span>
          <span className="text-[#9B0B0B] font-bold">{formatINR(defaultSize.price)}</span>
        </p>
      </Link>

      {/* Full-Width Crimson Pill CTA ("Buy now") */}
      <button
        type="button"
        onClick={handleBuyNow}
        aria-label={`Buy ${product.name} ${defaultSize.size} now`}
        className="mt-3 w-full rounded-full bg-[#960202] hover:bg-[#7F0B0B] text-white font-semibold py-2.5 sm:py-3 text-xs sm:text-sm tracking-wide shadow-xs transition-all active:scale-95"
      >
        Buy now
      </button>
    </article>
  );
}
