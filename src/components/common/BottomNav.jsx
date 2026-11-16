import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, ShoppingBag, Search, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';
import SearchModal from './SearchModal.jsx';

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems, setIsCartOpen } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);

  const isHome = location.pathname === '/';

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
        className="fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-40 select-none animate-in fade-in slide-in-from-bottom-2 duration-300"
      >
        <div className="bg-white/95 backdrop-blur-md rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.14)] border border-stone-200/90 px-4 sm:px-6 py-2 flex items-center justify-center gap-6 sm:gap-8">
          
          {/* 1. Home */}
          <button
            type="button"
            onClick={handleHomeClick}
            className="flex flex-col items-center justify-center gap-1 group focus-visible:outline-none"
            aria-label="Go to Home"
          >
            <span
              className={`w-11 h-7 rounded-full flex items-center justify-center transition-all ${
                isHome
                  ? 'bg-[#FDF2F2] text-[#9B0B0B]'
                  : 'text-stone-600 group-hover:text-stone-900 group-hover:bg-stone-100'
              }`}
            >
              <Home className="w-4 h-4 stroke-[2.2]" />
            </span>
            <span
              className={`text-[10.5px] leading-none transition-colors ${
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
            className="flex flex-col items-center justify-center gap-1 group focus-visible:outline-none"
            aria-label="Shop Pickles"
          >
            <span className="w-11 h-7 rounded-full flex items-center justify-center text-stone-600 group-hover:text-stone-900 group-hover:bg-stone-100 transition-all">
              <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
            </span>
            <span className="text-[10.5px] font-bold text-stone-600 group-hover:text-stone-900 leading-none transition-colors">
              Shop
            </span>
          </button>

          {/* 3. Search */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="flex flex-col items-center justify-center gap-1 group focus-visible:outline-none"
            aria-label="Search Pickles"
          >
            <span className="w-11 h-7 rounded-full flex items-center justify-center text-stone-600 group-hover:text-stone-900 group-hover:bg-stone-100 transition-all">
              <Search className="w-4 h-4 stroke-[2.2]" />
            </span>
            <span className="text-[10.5px] font-bold text-stone-600 group-hover:text-stone-900 leading-none transition-colors">
              Search
            </span>
          </button>

          {/* 4. Cart (prominent dark capsule matching screenshot) */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="flex flex-col items-center justify-center gap-1 group focus-visible:outline-none relative"
            aria-label={`Open Cart with ${totalItems} items`}
          >
            <span className="w-11 h-7 rounded-full bg-[#1C1917] hover:bg-[#9B0B0B] text-white flex items-center justify-center transition-all relative shadow-xs">
              <ShoppingCart className="w-4 h-4 stroke-[2.2]" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 rounded-full bg-[#9B0B0B] text-white text-[9.5px] font-extrabold flex items-center justify-center border-2 border-white shadow-xs">
                  {totalItems}
                </span>
              )}
            </span>
            <span className="text-[10.5px] font-extrabold text-[#1C1917] leading-none transition-colors">
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
