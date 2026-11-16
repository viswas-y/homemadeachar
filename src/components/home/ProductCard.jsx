import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';
import { formatINR } from '../../utils/currency.js';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(() => product.sizes[0]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedSize, 1, false);
  };

  // Original list price before kitchen direct savings (shows strike-through like reference card)
  const originalPrice = Math.round(selectedSize.price * 1.25);

  return (
    <article className="group bg-white rounded-[24px] sm:rounded-[28px] border border-stone-200/90 p-3 sm:p-4 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Packshot Image Container with Tag Badge (Wishlist removed as requested) */}
        <Link
          to={`/product/${product.slug}`}
          className="relative block aspect-square sm:aspect-[4/4.5] w-full rounded-2xl overflow-hidden bg-[#280404] p-1 mb-3 sm:mb-3.5 focus-visible:outline-none"
        >
          {/* Top-Left Premium Badge (House Pick / Tag) */}
          <span className="absolute top-2.5 left-2.5 z-10 rounded-lg bg-[#D97706] text-white text-[10px] sm:text-[11px] font-extrabold px-2.5 py-1 tracking-wide shadow-xs uppercase">
            {product.tag || 'House Pick'}
          </span>

          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300 select-none"
            draggable="false"
          />
        </Link>

        {/* Product Title (Clean display font, Malayalam removed as requested) */}
        <Link
          to={`/product/${product.slug}`}
          className="block group-hover:text-[#9B0B0B] transition-colors focus-visible:outline-none"
        >
          <h3 className="font-display font-extrabold text-base sm:text-lg text-[#1C1917] leading-snug group-hover:text-[#9B0B0B]">
            {product.name}
          </h3>
          <p className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-stone-500 mt-1">
            KERALA
          </p>
        </Link>

        {/* Interactive Size Selector Chips (matching reference card) */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3" role="radiogroup" aria-label="Select size">
          {product.sizes.map((s) => {
            const isSelected = selectedSize.size === s.size;
            return (
              <button
                key={s.size}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedSize(s);
                }}
                className={`rounded-xl px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-[13px] font-bold text-center transition-all ${
                  isSelected
                    ? 'border-2 border-[#1C1917] bg-stone-100 text-[#1C1917] shadow-xs'
                    : 'border border-stone-200 bg-white text-stone-600 hover:border-stone-400'
                }`}
              >
                {s.size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Section: Price & Add to Cart Button */}
      <div className="mt-3.5 sm:mt-4">
        {/* Price & Strikethrough Display */}
        <div className="flex items-baseline gap-2">
          <span className="font-display font-extrabold text-lg sm:text-xl text-[#1C1917]">
            {formatINR(selectedSize.price)}
          </span>
          <span className="text-xs text-stone-400 line-through font-medium">
            {formatINR(originalPrice)}
          </span>
        </div>

        {/* + Add to cart Button (matching reference card) */}
        <button
          type="button"
          onClick={handleAddToCart}
          aria-label={`Add ${product.name} ${selectedSize.size} to cart`}
          className="mt-3 w-full rounded-xl sm:rounded-2xl bg-[#1C1917] hover:bg-[#9B0B0B] text-white font-extrabold py-2.5 sm:py-3 text-xs sm:text-sm tracking-wide shadow-xs transition-all active:scale-95 flex items-center justify-center gap-1.5"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add to cart</span>
        </button>
      </div>
    </article>
  );
}
