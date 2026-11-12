import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function FlavorSpotlight() {
  return (
    <section
      aria-labelledby="spotlight-heading"
      className="px-3 sm:px-6 lg:px-8 py-4 sm:py-8 w-full"
    >
      <div className="max-w-7xl mx-auto rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-2 border border-black/5">

        {/* Left Panel: Appetizing Flat-lay Kitchen Photo */}
        <div className="relative min-h-[230px] sm:min-h-[310px] lg:min-h-[370px] bg-stone-200 overflow-hidden">
          <img
            src="/images/sections/spotlight-flatlay.jpg"
            alt="Homemade Kerala mango and green chilli pickle jars surrounded by fresh spices and chillies"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Panel: Botanical Soft Sage Feature Block */}
        <div className="bg-[#E6F2E8] relative overflow-hidden flex flex-col justify-between min-h-[300px] sm:min-h-[340px] lg:min-h-[370px]">

          {/* Desktop/Tablet Seamless Right-Anchored Bowl Photo */}
          <div
            aria-hidden="true"
            className="hidden sm:block absolute inset-y-0 right-0 w-[66%] pointer-events-none select-none"
          >
            <img
              src="/images/sections/spotlight-bowl.jpg"
              alt=""
              loading="lazy"
              className="w-full h-full object-cover object-[85%_center]"
              draggable="false"
            />
            {/* Soft left edge fade so image background melts seamlessly into #E6F2E8 */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#E6F2E8] via-[#E6F2E8]/70 to-transparent" />
          </div>

          {/* Hand-drawn Ink Starburst Ticks beside Bowl (Desktop/Tablet) */}
          <svg
            viewBox="0 0 42 70"
            aria-hidden="true"
            className="hidden sm:block w-8 h-14 text-[#146B2E] absolute right-[43%] lg:right-[44%] top-12 z-10 pointer-events-none"
          >
            <path
              d="M10 12 L28 24 M4 36 L24 36 M12 58 L28 48"
              stroke="currentColor"
              strokeWidth="2.8"
              strokeLinecap="round"
              fill="none"
            />
          </svg>

          {/* Left Text & CTA Block */}
          <div className="relative z-20 p-7 sm:p-10 lg:p-12 sm:max-w-[58%]">
            <p className="text-[11px] sm:text-xs uppercase tracking-widest font-extrabold text-[#146B2E]">
              NEW BATCH
            </p>

            <h2
              id="spotlight-heading"
              className="font-display text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[#1C1917] uppercase leading-[0.98] origin-left mt-2"
            >
              SPICY,<br />
              TANGY,<br />
              IRRESISTIBLE
            </h2>

            <p className="text-xs sm:text-sm text-[#1C1917]/80 font-medium leading-relaxed mt-3 max-w-[260px]">
              Our fresh Green Chilli batch is here! All the homestyle Kerala flavor, zero artificial preservatives.
            </p>

            <div className="mt-5">
              <Link
                to="/product/pacha-mulaku-achar"
                className="rounded-full bg-[#16692B] hover:bg-[#115221] text-white px-7 py-3 text-xs sm:text-sm font-bold tracking-wide inline-flex items-center gap-2.5 shadow-sm transition-all active:scale-95"
              >
                <span>Shop now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Mobile Seamless Bottom Bowl Photo */}
          <div className="sm:hidden relative h-52 w-full overflow-hidden pointer-events-none select-none -mt-2">
            <img
              src="/images/sections/spotlight-bowl.jpg"
              alt="Fresh bowl of homemade Kerala green chilli and mango achar"
              loading="lazy"
              className="w-full h-full object-cover object-[75%_center]"
              draggable="false"
            />
            <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#E6F2E8] to-transparent" />
          </div>

        </div>

      </div>
    </section>
  );
}
