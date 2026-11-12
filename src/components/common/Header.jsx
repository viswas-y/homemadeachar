import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, MessageCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';
import { SHOP_CONFIG } from '../../config/shop.js';

export function BrandLogoMark({ inverted = false }) {
  const textColor = inverted ? 'text-white' : 'text-[#9B0B0B]';
  const subtitleBorder = inverted
    ? 'border-white/50 text-[#BEF264]'
    : 'border-[#146B2E]/30 text-[#146B2E]';
  const ringStyle = inverted
    ? 'bg-white p-0.5 border-white/80 shadow-md'
    : 'bg-white border-stone-200/90 shadow-xs';

  return (
    <span className="inline-flex items-center gap-2.5 sm:gap-3 select-none">
      <img
        src="/images/logo.jpg"
        alt={`${SHOP_CONFIG.name} — Spice Up Your Life, Handpicked Quality`}
        className={`w-11 h-11 sm:w-14 sm:h-14 rounded-full object-cover border shrink-0 ${ringStyle}`}
      />

      <span className="flex flex-col items-start leading-none">
        <span className={`font-display text-[16px] sm:text-[20px] font-extrabold tracking-tight uppercase ${textColor}`}>
          {SHOP_CONFIG.name}
        </span>
        <span className={`text-[9px] sm:text-[10px] font-bold tracking-widest uppercase border rounded-full px-2 py-0.5 mt-1 ${subtitleBorder}`}>
          Handpicked Quality
        </span>
      </span>
    </span>
  );
}

export default function Header() {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 36);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out ${
          isScrolled ? 'pt-2.5 sm:pt-3.5 px-3 sm:px-6' : 'p-0'
        }`}
      >
        {/* Top Green Promo Strip: Visible flush at top, collapses smoothly on scroll */}
        <div
          className={`bg-[#146B2E] text-white overflow-hidden transition-all duration-300 ${
            isScrolled ? 'max-h-0 opacity-0' : 'max-h-9 opacity-100'
          }`}
        >
          <div className="h-8 px-3 flex items-center justify-center text-center text-[10px] sm:text-[11px] font-extrabold tracking-widest uppercase">
            SPICE UP YOUR LIFE • HANDPICKED QUALITY KERALA ACHAR
          </div>
        </div>

        {/* Main Header Bar */}
        <header
          className={`transition-all duration-300 ease-out ${
            isScrolled
              ? 'max-w-6xl mx-auto rounded-full bg-white/95 backdrop-blur-md border border-black/10 shadow-lg px-4 sm:px-7'
              : 'w-full bg-white border-b border-stone-200/80 px-4 sm:px-8'
          }`}
        >
          <div
            className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-300 ${
              isScrolled ? 'h-14 sm:h-16' : 'h-16 sm:h-20'
            }`}
          >
            {/* Left Brand Logo */}
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="focus-visible:outline-none rounded-xl"
              aria-label={`${SHOP_CONFIG.name} Home`}
            >
              <BrandLogoMark />
            </Link>

            {/* Center Navigation Links (Desktop) */}
            <nav
              aria-label="Primary navigation"
              className="hidden md:flex items-center gap-7 lg:gap-9 text-sm font-semibold text-[#1C1917]"
            >
              <button
                type="button"
                onClick={() => handleNavClick('shop')}
                className="hover:text-[#146B2E] transition-colors py-1"
              >
                Pickles
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('ingredients')}
                className="hover:text-[#146B2E] transition-colors py-1"
              >
                Ingredients
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('gallery')}
                className="hover:text-[#146B2E] transition-colors py-1"
              >
                Kitchen
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('about')}
                className="hover:text-[#146B2E] transition-colors py-1"
              >
                Our Story
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('faq')}
                className="hover:text-[#146B2E] transition-colors py-1"
              >
                FAQ
              </button>
            </nav>

            {/* Right Utility Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              <a
                href={SHOP_CONFIG.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[#1C1917] hover:text-[#146B2E] hover:bg-[#EDF5EE] rounded-full transition-colors"
                aria-label="Order or Chat on WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>

              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-[#1C1917] hover:text-[#146B2E] hover:bg-[#EDF5EE] rounded-full transition-colors"
                aria-label={`Shopping bag with ${totalItems} items`}
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#146B2E] text-white font-bold text-[10px] flex items-center justify-center border border-white shadow-xs">
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-[#1C1917] hover:text-[#146B2E] hover:bg-[#EDF5EE] rounded-full transition-colors"
                aria-label="Toggle Menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Drawer Overlay */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden bg-white border border-black/10 px-6 py-4 flex flex-col gap-1.5 text-sm font-bold text-[#1C1917] shadow-lg ${
              isScrolled ? 'max-w-6xl mx-auto mt-2 rounded-3xl' : 'w-full'
            }`}
          >
            <button
              type="button"
              onClick={() => handleNavClick('shop')}
              className="text-left py-2.5 px-3 hover:bg-[#EDF5EE] hover:text-[#146B2E] rounded-xl transition-colors"
            >
              Our Pickles
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('ingredients')}
              className="text-left py-2.5 px-3 hover:bg-[#EDF5EE] hover:text-[#146B2E] rounded-xl transition-colors"
            >
              Pure Ingredients
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('gallery')}
              className="text-left py-2.5 px-3 hover:bg-[#EDF5EE] hover:text-[#146B2E] rounded-xl transition-colors"
            >
              Kitchen Gallery
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('about')}
              className="text-left py-2.5 px-3 hover:bg-[#EDF5EE] hover:text-[#146B2E] rounded-xl transition-colors"
            >
              Our Story
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('faq')}
              className="text-left py-2.5 px-3 hover:bg-[#EDF5EE] hover:text-[#146B2E] rounded-xl transition-colors"
            >
              Common Questions
            </button>
            <Link
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="text-left py-2.5 px-3 hover:bg-[#EDF5EE] hover:text-[#146B2E] rounded-xl transition-colors flex items-center justify-between"
            >
              <span>Shopping Bag</span>
              <span className="bg-[#146B2E] text-white px-2.5 py-0.5 rounded-full text-xs">
                {totalItems}
              </span>
            </Link>
          </div>
        )}
      </div>

      {/* Layout Spacer matching un-scrolled announcement strip (h-8) + navbar (h-16 sm:h-20) */}
      <div className="h-24 sm:h-28" aria-hidden="true" />
    </>
  );
}
