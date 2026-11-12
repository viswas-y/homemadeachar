import React from 'react';
import { SHOP_CONFIG } from '../../config/shop.js';

export default function About() {
  return (
    <section id="about" className="px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto rounded-[28px] sm:rounded-[36px] bg-[#FCE382] p-6 sm:p-12 lg:p-16 relative overflow-hidden shadow-xs text-[#221610]">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Amma Portrait */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden bg-white shadow-sm border-2 border-white/60 p-3 flex flex-col justify-end">
              <img
                src="/images/about-amma.svg"
                alt={`${SHOP_CONFIG.makerName} — ${SHOP_CONFIG.name}`}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Right Column: Brand Story */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            <div>
              <p className="text-[11px] sm:text-xs uppercase tracking-widest font-extrabold text-[#221610]/70">
                THE STORY
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#221610] uppercase mt-0.5">
                MADE BY AMMA, WITH REAL LOVE
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#221610]/90 font-medium leading-relaxed">
              Home Made Achar began in our home kitchen in Kerala. What started as small care packages sent to family and relatives has grown into a small kitchen workshop dedicated to preserving authentic Kerala pickling recipes.
            </p>

            <p className="text-xs sm:text-sm text-[#221610]/80 leading-relaxed font-normal">
              Every jar is cooked personally by Valsala Amma in small batches of no more than 15 kilograms. We use pure cold-pressed sesame oil, stone-ground Kashmiri chillies, roasted fenugreek, and zero chemical preservatives.
            </p>

            <div className="pt-2 grid grid-cols-3 gap-3 text-center sm:text-left">
              <div className="p-3 bg-white/70 rounded-xl">
                <span className="font-display font-extrabold text-lg text-[#221610] block">100%</span>
                <span className="text-[11px] text-[#221610]/70 font-semibold">Cold-pressed oil</span>
              </div>
              <div className="p-3 bg-white/70 rounded-xl">
                <span className="font-display font-extrabold text-lg text-[#221610] block">0%</span>
                <span className="text-[11px] text-[#221610]/70 font-semibold">Preservatives</span>
              </div>
              <div className="p-3 bg-white/70 rounded-xl">
                <span className="font-display font-extrabold text-lg text-[#221610] block">Small</span>
                <span className="text-[11px] text-[#221610]/70 font-semibold">Kitchen batch</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
