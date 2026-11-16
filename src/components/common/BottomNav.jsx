import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, ShoppingBag, Search, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';
import SearchModal from './SearchModal.jsx';

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems, openCart, setIsCartOpen } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);

  const isHome = location.pathname === '/';

  const handleOpenCart = () => {
    if (typeof openCart === 'function') {
      openCart();
    } else if (typeof setIsCartOpen === 'function') {
      setIsCartOpen(true);
    }
  };

  const handleHomeClick = () => {
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleShopClick = () => {
    if (isHome) {
      const el = document.getElementById('shop');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('shop');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  };

  return (
    <>
      <nav
        aria-label="Bottom Navigation Bar"
        className="fixed bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-40 w-[94%] sm:w-auto max-w-lg select-none animate-in fade-in slide-in-from-bottom-3 duration-300"
      >
        <div className="w-full bg-white/95 backdrop-blur-md rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.16)] border border-stone-200/90 py-2.5 sm:py-3 px-3 sm:px-8 grid grid-cols-4 items-center sm:flex sm:items-center sm:gap-9">
          
          {/* 1. Home */}
          <button
            type="button"
            onClick={handleHomeClick}
            className="flex flex-col items-center justify-center gap-1 group focus-visible:outline-none active:scale-95 transition-transform"
            aria-label="Go to Home"
          >
            <span
              className={`w-14 h-8 sm:w-16 sm:h-9 rounded-full flex items-center justify-center transition-all ${
                isHome
                  ? 'bg-[#FDF2F2] text-[#9B0B0B] ring-1 ring-[#9B0B0B]/20'
                  : 'text-stone-600 group-hover:text-stone-900 group-hover:bg-stone-100'
              }`}
            >
              <Home className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.2]" />
            </span>
            <span
              className={`text-[11.5px] sm:text-xs leading-none transition-colors ${
                isHome
                  ? 'font-extrabold text-[#9B0B0B]'
                  : 'font-bold text-stone-600 group-hover:text-stone-900'
              }`}
            >
              Home
            </span>
          </button>

          {/* 2. Shop */}
          <button
            type="button"
            onClick={handleShopClick}
            className="flex flex-col items-center justify-center gap-1 group focus-visible:outline-none active:scale-95 transition-transform"
            aria-label="Shop Pickles"
          >
            <span className="w-14 h-8 sm:w-16 sm:h-9 rounded-full flex items-center justify-center text-stone-600 group-hover:text-stone-900 group-hover:bg-stone-100 transition-all">
              <ShoppingBag className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.2]" />
            </span>
            <span className="text-[11.5px] sm:text-xs font-bold text-stone-600 group-hover:text-stone-900 leading-none transition-colors">
              Shop
            </span>
          </button>

          {/* 3. Search */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="flex flex-col items-center justify-center gap-1 group focus-visible:outline-none active:scale-95 transition-transform"
            aria-label="Search Pickles"
          >
            <span className="w-14 h-8 sm:w-16 sm:h-9 rounded-full flex items-center justify-center text-stone-600 group-hover:text-stone-900 group-hover:bg-stone-100 transition-all">
              <Search className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.2]" />
            </span>
            <span className="text-[11.5px] sm:text-xs font-bold text-stone-600 group-hover:text-stone-900 leading-none transition-colors">
              Search
            </span>
          </button>

          {/* 4. Cart (prominent dark capsule matching screenshot) */}
          <button
            type="button"
            onClick={handleOpenCart}
            className="flex flex-col items-center justify-center gap-1 group focus-visible:outline-none relative active:scale-95 transition-transform"
            aria-label={`Open Cart with ${totalItems} items`}
          >
            <span className="w-14 h-8 sm:w-16 sm:h-9 rounded-full bg-[#1C1917] hover:bg-[#9B0B0B] text-white flex items-center justify-center transition-all relative shadow-sm">
              <ShoppingCart className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.2]" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1 min-w-[20px] h-[20px] px-1 rounded-full bg-[#9B0B0B] text-white text-[10px] font-extrabold flex items-center justify-center border-2 border-white shadow-xs">
                  {totalItems}
                </span>
              )}
            </span>
            <span className="text-[11.5px] sm:text-xs font-extrabold text-[#1C1917] leading-none transition-colors">
              Cart
            </span>
          </button>

        </div>
      </nav>

      {/* Interactive Global Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

