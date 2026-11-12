import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Search, User, MessageCircle } from 'lucide-react';
import { SHOP_CONFIG } from '../../config/shop.js';
import { useCart } from '../../context/CartContext.jsx';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, openCart } = useCart();
  const location = useLocation();

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
    <header className="sticky top-0 z-40 bg-[#FBF8F1]/95 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 sm:h-20 flex items-center justify-between">
        
        {/* Left: Brand Logo in Chunky Display Font */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#221610] uppercase">
              {SHOP_CONFIG.name}
            </span>
          </Link>
        </div>

        {/* Center: Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-10">
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

        {/* Right: Search, Contact/User, and Cart Badge */}
        <div className="flex items-center space-x-4 sm:space-x-5">
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
            className="md:hidden p-1.5 text-[#221610] focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-black/5 bg-[#FBF8F1] px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3">
            <Link
              to="/#products"
              onClick={(e) => {
                handleNavClick(e, '/#products');
                setIsMobileMenuOpen(false);
              }}
              className="font-display text-lg font-bold text-[#221610] py-1"
            >
              Products
            </Link>
            <Link
              to="/#about"
              onClick={(e) => {
                handleNavClick(e, '/#about');
                setIsMobileMenuOpen(false);
              }}
              className="font-display text-lg font-bold text-[#221610] py-1"
            >
              About Amma
            </Link>
            <Link
              to="/#gallery"
              onClick={(e) => {
                handleNavClick(e, '/#gallery');
                setIsMobileMenuOpen(false);
              }}
              className="font-display text-lg font-bold text-[#221610] py-1"
            >
              From Our Kitchen
            </Link>
            <Link
              to="/#faq"
              onClick={(e) => {
                handleNavClick(e, '/#faq');
                setIsMobileMenuOpen(false);
              }}
              className="font-display text-lg font-bold text-[#221610] py-1"
            >
              FAQs
            </Link>
            <Link
              to="/cart"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-display text-lg font-bold text-[#221610] py-1"
            >
              Shopping Cart ({totalItems})
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
