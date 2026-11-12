import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, MessageCircle } from 'lucide-react';
import { SHOP_CONFIG } from '../../config/shop.js';
import { useCart } from '../../context/CartContext.jsx';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems, openCart } = useCart();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 36);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e, path) => {
    if (path.startsWith('/#')) {
      const targetId = path.substring(2);
      if (location.pathname === '/') {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <>
      {/* Reserve top bar height so layout never shifts when header transitions to floating pill */}
      <div aria-hidden="true" className="h-16 sm:h-20 w-full shrink-0" />

      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ease-out ${
          isScrolled ? 'pt-2.5 sm:pt-3.5 px-3 sm:px-6' : 'pt-0 px-0'
        }`}
      >
        <div
          className={`mx-auto flex items-center justify-between transition-all duration-300 ease-out ${
            isScrolled
              ? 'max-w-5xl lg:max-w-6xl h-14 sm:h-16 rounded-full bg-[#FBF8F1]/90 backdrop-blur-md shadow-lg border border-[#221610]/10 px-4 sm:px-7'
              : 'max-w-full h-16 sm:h-20 rounded-none bg-[#FBF8F1]/95 backdrop-blur-md border-b border-black/5 px-4 sm:px-8'
          }`}
        >
          <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
            {/* Left: Brand Logo in Chunky Display Font */}
            <div className="flex items-center gap-2 min-w-0">
              <Link to="/" className="flex items-center gap-2 group">
                <span
                  className={`font-display font-extrabold tracking-tight text-[#221610] uppercase truncate transition-all duration-300 ${
                    isScrolled ? 'text-lg sm:text-2xl' : 'text-xl sm:text-3xl'
                  }`}
                >
                  {SHOP_CONFIG.name}
                </span>
              </Link>
            </div>

            {/* Center: Desktop Nav Links */}
            <nav className="hidden md:flex items-center space-x-8 lg:space-x-10" aria-label="Main navigation">
              <Link
                to="/#products"
                onClick={(e) => handleNavClick(e, '/#products')}
                className="text-xs font-bold text-[#221610]/80 hover:text-[#221610] transition-colors tracking-wide"
              >
                Products
              </Link>
              <Link
                to="/#about"
                onClick={(e) => handleNavClick(e, '/#about')}
                className="text-xs font-bold text-[#221610]/80 hover:text-[#221610] transition-colors tracking-wide"
              >
                About
              </Link>
              <Link
                to="/#gallery"
                onClick={(e) => handleNavClick(e, '/#gallery')}
                className="text-xs font-bold text-[#221610]/80 hover:text-[#221610] transition-colors tracking-wide"
              >
                Kitchen
              </Link>
              <Link
                to="/#faq"
                onClick={(e) => handleNavClick(e, '/#faq')}
                className="text-xs font-bold text-[#221610]/80 hover:text-[#221610] transition-colors tracking-wide"
              >
                FAQ
              </Link>
            </nav>

            {/* Right: WhatsApp, Cart Badge & Mobile Menu */}
            <div className="flex items-center space-x-3 sm:space-x-5 shrink-0">
              <a
                href={`https://wa.me/${SHOP_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact on WhatsApp"
                className="p-1.5 text-[#221610] hover:opacity-70 transition-opacity"
              >
                <MessageCircle className="w-5 h-5 stroke-[2.2]" />
              </a>

              {/* Cart Icon with Yellow Pill Counter Badge */}
              <button
                type="button"
                onClick={openCart}
                aria-label={`Cart with ${totalItems} items`}
                className="relative p-1.5 text-[#221610] hover:opacity-70 transition-opacity"
              >
                <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
                <span className="absolute -top-1 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#FAD051] text-[#221610] text-[10px] font-extrabold flex items-center justify-center border border-[#221610]/15">
                  {totalItems}
                </span>
              </button>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle navigation"
                aria-expanded={isMobileMenuOpen}
                className="md:hidden p-1.5 text-[#221610] focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {isMobileMenuOpen && (
          <div
            className={`md:hidden mx-auto bg-[#FBF8F1]/95 backdrop-blur-md px-6 py-5 space-y-3 transition-all ${
              isScrolled
                ? 'max-w-5xl mt-2 rounded-2xl shadow-lg border border-[#221610]/10'
                : 'border-t border-b border-black/5 shadow-md'
            }`}
          >
            <div className="flex flex-col space-y-2.5">
              <Link
                to="/#products"
                onClick={(e) => {
                  handleNavClick(e, '/#products');
                  setIsMobileMenuOpen(false);
                }}
                className="font-display text-base font-bold text-[#221610] py-1"
              >
                Products
              </Link>
              <Link
                to="/#about"
                onClick={(e) => {
                  handleNavClick(e, '/#about');
                  setIsMobileMenuOpen(false);
                }}
                className="font-display text-base font-bold text-[#221610] py-1"
              >
                About Amma
              </Link>
              <Link
                to="/#gallery"
                onClick={(e) => {
                  handleNavClick(e, '/#gallery');
                  setIsMobileMenuOpen(false);
                }}
                className="font-display text-base font-bold text-[#221610] py-1"
              >
                From Our Kitchen
              </Link>
              <Link
                to="/#faq"
                onClick={(e) => {
                  handleNavClick(e, '/#faq');
                  setIsMobileMenuOpen(false);
                }}
                className="font-display text-base font-bold text-[#221610] py-1"
              >
                FAQs
              </Link>
              <Link
                to="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-display text-base font-bold text-[#221610] py-1"
              >
                Shopping Cart ({totalItems})
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
