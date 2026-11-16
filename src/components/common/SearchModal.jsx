import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, X, ArrowRight, Flame } from 'lucide-react';
import { PRODUCTS } from '../../data/products.js';
import { formatINR } from '../../utils/currency.js';

const QUICK_TAGS = ['Mango', 'Garlic', 'Green Chilli', 'Lemon', 'Kadumanga', 'Nellika', 'Inji', 'Chemmeen'];

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();
  const results = trimmed
    ? PRODUCTS.filter((p) => {
        return (
          p.name.toLowerCase().includes(trimmed) ||
          p.shortDescription.toLowerCase().includes(trimmed) ||
          p.ingredients.some((ing) => ing.toLowerCase().includes(trimmed)) ||
          p.spiceLevel.toLowerCase().includes(trimmed)
        );
      })
    : [];

  const handleSelectProduct = (slug) => {
    onClose();
    navigate(`/product/${slug}`);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search pickles and ingredients"
      className="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-20 px-3 sm:px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl rounded-[28px] bg-white p-5 sm:p-6 shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Header */}
        <div className="relative flex items-center border-b border-stone-200 pb-4">
          <SearchIcon className="w-5 h-5 text-stone-400 absolute left-3 pointer-events-none" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pickles, ingredients, or spices..."
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-stone-100 text-stone-900 placeholder:text-stone-400 text-sm sm:text-base font-semibold focus:outline-none focus:ring-2 focus:ring-[#9B0B0B]/30"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-3 p-1 text-stone-400 hover:text-stone-700 rounded-full"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 p-1 text-stone-400 hover:text-stone-700 rounded-full"
              aria-label="Close search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Suggestion Tags */}
        {!trimmed && (
          <div className="pt-4 space-y-2.5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-400 block">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {QUICK_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setQuery(tag)}
                  className="rounded-full px-3.5 py-1.5 text-xs font-bold bg-stone-100 hover:bg-[#FDF2F2] hover:text-[#9B0B0B] text-stone-700 border border-stone-200/60 transition-all active:scale-95"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {trimmed && (
          <div className="pt-4 max-h-[58vh] overflow-y-auto divide-y divide-stone-100">
            {results.length > 0 ? (
              results.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => handleSelectProduct(product.slug)}
                  className="w-full py-3 px-2 flex items-center justify-between text-left hover:bg-stone-50 rounded-2xl transition-colors group"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-14 h-14 rounded-xl object-cover bg-[#280404] shrink-0"
                    />
                    <div>
                      <h4 className="font-display font-extrabold text-sm sm:text-base text-stone-900 group-hover:text-[#9B0B0B] transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xs text-stone-500 font-medium line-clamp-1 mt-0.5">
                        {product.shortDescription}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-bold text-[#9B0B0B]">
                          From {formatINR(product.sizes[0].price)}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-stone-400">
                          • {product.shelfLife} shelf life
                        </span>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#9B0B0B] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                </button>
              ))
            ) : (
              <div className="py-10 text-center text-stone-500 text-sm">
                <p className="font-bold">No pickles found for "{query}"</p>
                <p className="text-xs text-stone-400 mt-1">Try searching for mango, garlic, or chilli</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

