import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, MessageCircle } from 'lucide-react';
import { SHOP_CONFIG } from '../../config/shop.js';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="mt-8 bg-[#0B3D1A] text-[#F7F7F5] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-3.5">
              <img
                src="/images/logo.jpg"
                alt={`${SHOP_CONFIG.name} emblem`}
                className="w-14 h-14 rounded-full bg-white p-0.5 object-cover shadow-sm shrink-0"
              />
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#BEF264] leading-none">
                  {SHOP_CONFIG.name}
                </h3>
                <p className="text-xs font-semibold text-white/75 mt-1">
                  {SHOP_CONFIG.malayalamName}
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-sm pt-1">
              {SHOP_CONFIG.tagline} Handcrafted in small batches with cold-pressed gingelly oil, fresh garden spices, and zero preservatives.
            </p>
            <div className="pt-1 text-xs text-white/55">
              FSSAI Lic. No: {SHOP_CONFIG.fssaiNumber}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-extrabold text-[#BEF264]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-white/80">
              <li>
                <a href="/#products" className="hover:text-white transition-colors">Our Achar Collection</a>
              </li>
              <li>
                <a href="/#about" className="hover:text-white transition-colors">About Amma</a>
              </li>
              <li>
                <a href="/#gallery" className="hover:text-white transition-colors">From Our Kitchen</a>
              </li>
              <li>
                <a href="/#faq" className="hover:text-white transition-colors">Frequently Asked Questions</a>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition-colors">Shopping Cart</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-extrabold text-[#BEF264]">
              Kitchen & Orders
            </h4>
            <div className="space-y-1.5 text-xs sm:text-sm text-white/80">
              <p>
                {SHOP_CONFIG.address.line1}, {SHOP_CONFIG.address.line2},<br />
                {SHOP_CONFIG.address.city}, {SHOP_CONFIG.address.state} — {SHOP_CONFIG.address.pincode}
              </p>
              <p className="pt-1">
                WhatsApp: <a href={`https://wa.me/${SHOP_CONFIG.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="underline hover:text-white font-bold">+{SHOP_CONFIG.whatsappNumber}</a>
              </p>
              <p>
                Email: <a href={`mailto:${SHOP_CONFIG.email}`} className="underline hover:text-white">{SHOP_CONFIG.email}</a>
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={SHOP_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#BEF264] hover:text-[#0B3D1A] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={SHOP_CONFIG.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#BEF264] hover:text-[#0B3D1A] flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${SHOP_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#BEF264] hover:text-[#0B3D1A] flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 gap-3">
          <p>© {currentYear} {SHOP_CONFIG.name}. All rights reserved.</p>
          <p>Handmade with love in Kerala, India.</p>
        </div>

      </div>
    </footer>
  );
}
