import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { formatINR } from '../../utils/currency.js';
import { useCart } from '../../context/CartContext.jsx';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const defaultSize = product.sizes[0];

  const handleCardClick = () => {
    navigate(`/product/${product.slug}`);
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product, defaultSize, 1, false);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-2xl p-2.5 sm:p-3.5 shadow-sm border border-black/5 flex flex-col justify-between cursor-pointer group hover:-translate-y-1 transition-all duration-200"
    >
      {/* Top Coloured Inner Box with Pickle Image & Pill Badge */}
      <div className={`w-full aspect-[4/5] sm:aspect-square ${product.boxColor} rounded-xl relative flex items-center justify-center overflow-hidden p-2`}>

        {/* Pill Badge at Top Left (e.g. "Bestseller", "New") */}
        {product.tag && (
          <span className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full bg-white/95 text-[#221610] text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
            {product.tag}
          </span>
        )}

        {/* Real Product Pickle Photo */}
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover rounded-lg group-hover:scale-103 transition-transform duration-300 select-none"
          draggable="false"
        />
      </div>

      {/* Info Below Box */}
      <div className="pt-2.5 sm:pt-3 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-display text-xs sm:text-base font-bold text-[#221610] leading-tight truncate">
            {product.name}
          </h3>
          <p className="text-[10px] sm:text-xs text-[#221610]/60 font-medium truncate mt-0.5">
            {product.tagline}
          </p>
        </div>

        {/* Bottom Row: Price on Left, Dark "add +" Pill Button on Right */}
        <div className="pt-2.5 mt-1 flex items-center justify-between border-t border-black/5">
          <span className="font-display text-xs sm:text-sm font-bold text-[#221610]">
            {formatINR(defaultSize.price)}
          </span>

          <button
            type="button"
            onClick={handleQuickAdd}
            aria-label={`Add ${product.name} to cart`}
            className="rounded-full bg-[#221610] hover:bg-black text-white px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-bold tracking-wide transition-all transform active:scale-95 flex items-center gap-1 shadow-xs"
          >
            <span>add</span>
            <Plus className="w-3 h-3 stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  );
}
