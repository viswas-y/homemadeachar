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
      aria-label="Featured homemade achar carousel"
      className="w-full max-w-md mx-auto flex flex-col items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
    >
      {/* Framed Rounded Card Stage */}
      <div
        className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-md border-2 border-white/50 bg-[#FBF8F1]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Sliding Image Strip */}
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
                alt={`${slide.name} — Home Made Achar`}
                className="w-full h-full object-cover select-none group-hover:scale-[1.02] transition-transform duration-300"
                draggable="false"
              />
            </Link>
          ))}
        </div>

        {/* Previous / Next Buttons */}
        {activeSlides.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous pickle slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#221610] shadow-md flex items-center justify-center transition active:scale-95 z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next pickle slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#221610] shadow-md flex items-center justify-center transition active:scale-95 z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Controls Row Below Card: Dots + Active Product Info Pill */}
      <div className="mt-3.5 flex flex-col items-center gap-2.5 w-full">
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
                  className={`h-2 rounded-full transition-all ${
                    isActive
                      ? 'w-6 bg-[#221610]'
                      : 'w-2 bg-[#221610]/25 hover:bg-[#221610]/50'
                  }`}
                />
              );
            })}
          </div>
        )}

        <Link
          to={`/product/${currentSlide.slug}`}
          className="bg-white/75 hover:bg-white text-[#221610] rounded-full px-4 py-1.5 inline-flex items-center gap-2 text-xs font-bold shadow-xs transition border border-black/5"
        >
          <span>{currentSlide.name}</span>
          <span className="text-[#221610]/50">•</span>
          <span>From {formatINR(currentSlide.sizes[0].price)}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
