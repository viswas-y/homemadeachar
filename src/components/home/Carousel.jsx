import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { formatINR } from '../../utils/currency.js';

export default function Carousel({ products = [] }) {
  const slides = products.filter((p) => p.featured);
  const activeSlides = slides.length > 0 ? slides : products.slice(0, 5);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const didSwipe = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener?.('change', handleChange);
    return () => mediaQuery.removeEventListener?.('change', handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || isPaused || activeSlides.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [prefersReducedMotion, isPaused, activeSlides.length]);

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
  };

  const handleTouchStart = (e) => {
    setIsPaused(true);
    didSwipe.current = false;
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const distance = touchStartX.current - touchEndX.current;
      if (Math.abs(distance) > 40) {
        didSwipe.current = true;
        if (distance > 0) {
          goNext();
        } else {
          goPrev();
        }
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goNext();
    }
  };

  const currentSlide = activeSlides[currentIndex];
  if (!currentSlide) return null;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="The Spice Jar featured pickles carousel"
      className="w-full max-w-[175px] sm:max-w-[260px] lg:max-w-[300px] mx-auto flex flex-col items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
    >
      {/* Framed Vertical Portrait Poster Card Stage */}
      <div
        className="relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border-2 border-white/50 bg-white"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Sliding Poster Strip */}
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          aria-live="polite"
        >
          {activeSlides.map((slide) => (
            <Link
              key={slide.id}
              to={`/product/${slide.slug}`}
              onClick={(e) => {
                if (didSwipe.current) {
                  e.preventDefault();
                  didSwipe.current = false;
                }
              }}
              aria-label={`${slide.name} (${slide.malayalamName}) — From ${formatINR(slide.sizes[0].price)}`}
              className="w-full h-full shrink-0 block group focus-visible:outline-none"
              tabIndex={slide.id === currentSlide.id ? 0 : -1}
            >
              <img
                src={slide.images[0]}
                alt={`${slide.name} — The Spice Jar`}
                className="w-full h-full object-cover select-none group-hover:scale-[1.02] transition-transform duration-300"
                draggable="false"
              />
            </Link>
          ))}
        </div>

        {/* Previous / Next Circular White Arrow Controls */}
        {activeSlides.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous pickle slide"
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/95 hover:bg-white text-[#1C1917] shadow-md flex items-center justify-center transition active:scale-95 z-10"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next pickle slide"
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/95 hover:bg-white text-[#1C1917] shadow-md flex items-center justify-center transition active:scale-95 z-10"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </>
        )}
      </div>

      {/* Controls Row Below Card: Dots + Active Product Price Pill */}
      <div className="mt-2.5 sm:mt-3 flex flex-col items-center gap-2 sm:gap-2.5 w-full">
        {activeSlides.length > 1 && (
          <div className="flex items-center justify-center gap-1.5" role="tablist" aria-label="Choose a featured pickle">
            {activeSlides.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Show ${slide.name} (${idx + 1} of ${activeSlides.length})`}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    isActive
                      ? 'w-4 sm:w-5 bg-[#BEF264]'
                      : 'w-1.5 bg-white/35 hover:bg-white/65'
                  }`}
                />
              );
            })}
          </div>
        )}

        <Link
          to={`/product/${currentSlide.slug}`}
          className="bg-white hover:bg-[#EDF5EE] text-[#1C1917] rounded-full px-3 py-1 sm:px-4 sm:py-1.5 inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold shadow-sm transition border border-black/5 whitespace-nowrap w-max"
        >
          <span>{currentSlide.name}</span>
          <span className="text-[#146B2E]">•</span>
          <span className="text-[#146B2E]">From {formatINR(currentSlide.sizes[0].price)}</span>
          <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#146B2E]" />
        </Link>
      </div>
    </div>
  );
}
