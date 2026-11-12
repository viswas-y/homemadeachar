import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { formatINR } from '../../utils/currency.js';

export default function Carousel({ products = [] }) {
  const bySlug = (slug) => products.find((p) => p.slug === slug);

  const featuredManga = bySlug('manga-achar') || products[0];
  const featuredPachaMulaku = bySlug('pacha-mulaku-achar') || products[1] || products[0];
  const featuredNellika = bySlug('nellika-achar') || products[3] || products[0];
  const featuredVeluthulli = bySlug('veluthulli-achar') || products[2] || products[0];

  const slides = [
    {
      id: 'kitchen-banner',
      kind: 'full-bleed',
      eyebrow: 'WANDOOR SMALL-BATCH KITCHEN',
      title: 'Taste Real Kerala Homemade Achar',
      subtitle: 'Handcrafted in small batches with country mangoes, sun-dried spices, and cold-pressed gingelly oil.',
      image: '/images/hero-kitchen.jpg',
      alt: 'Valsala Amma cooking homemade Kerala pickle in a clay pot in a traditional woodfire kitchen beside a jar of mango achar',
      ctaLabel: 'Explore Pickles',
      actionType: 'scroll',
      targetId: 'shop',
    },
    featuredPachaMulaku && {
      id: featuredPachaMulaku.id,
      kind: 'full-bleed',
      eyebrow: 'FRESH KANTHARI & GREEN CHILLI BATCH',
      title: `${featuredPachaMulaku.name} — ${featuredPachaMulaku.malayalamName}`,
      subtitle: `Fiery, aromatic green chillies tempered in pure oil. Starting from ${formatINR(featuredPachaMulaku.sizes[0].price)}.`,
      image: '/images/sections/spotlight-flatlay.jpg',
      alt: 'Homemade Kerala green chilli and mango achar jars surrounded by fresh chillies and spices',
      ctaLabel: 'View Pickle Jar',
      actionType: 'link',
      to: `/product/${featuredPachaMulaku.slug}`,
    },
    featuredManga && {
      id: featuredManga.id,
      kind: 'studio-emerald',
      eyebrow: 'BESTSELLER • NO PRESERVATIVES',
      title: featuredManga.name,
      malayalamName: featuredManga.malayalamName,
      subtitle: 'Crisp country mangoes cured with rock salt, stone-ground Kashmiri chillies & fenugreek.',
      priceText: `From ${formatINR(featuredManga.sizes[0].price)}`,
      image: featuredManga.images[0],
      alt: `${featuredManga.name} jar`,
      ctaLabel: 'Order Now',
      actionType: 'link',
      to: `/product/${featuredManga.slug}`,
    },
    featuredNellika && {
      id: featuredNellika.id,
      kind: 'studio-light',
      eyebrow: 'IMMUNITY & HOMELY TASTE',
      title: featuredNellika.name,
      malayalamName: featuredNellika.malayalamName,
      subtitle: 'Handpicked orchard gooseberries slow-simmered in pure turmeric, garlic & roasted mustard.',
      priceText: `From ${formatINR(featuredNellika.sizes[0].price)}`,
      image: featuredNellika.images[0],
      alt: `${featuredNellika.name} jar`,
      ctaLabel: 'View Pickle Jar',
      actionType: 'link',
      to: `/product/${featuredNellika.slug}`,
    },
    featuredVeluthulli && {
      id: featuredVeluthulli.id,
      kind: 'studio-emerald',
      eyebrow: 'SLOW-SIMMERED AROMATIC FAVORITE',
      title: featuredVeluthulli.name,
      malayalamName: featuredVeluthulli.malayalamName,
      subtitle: 'Whole country garlic pods caramelized in cold-pressed gingelly oil & mellow aromatic spices.',
      priceText: `From ${formatINR(featuredVeluthulli.sizes[0].price)}`,
      image: featuredVeluthulli.images[0],
      alt: `${featuredVeluthulli.name} jar`,
      ctaLabel: 'Order Now',
      actionType: 'link',
      to: `/product/${featuredVeluthulli.slug}`,
    },
  ].filter(Boolean);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener?.('change', handleChange);
    return () => mediaQuery.removeEventListener?.('change', handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || isPaused || slides.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [prefersReducedMotion, isPaused, slides.length]);

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handleTouchStart = (e) => {
    setIsPaused(true);
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
        if (distance > 0) goNext();
        else goPrev();
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

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (slides.length === 0) return null;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="The Spice Jar highlights slider"
      className="relative w-full overflow-hidden bg-stone-900 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
    >
      {/* Compact on mobile (235px) per user feedback, full panoramic kitchen banner on desktop */}
      <div
        className="flex h-[235px] sm:h-[360px] lg:h-[460px] xl:h-[510px] transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        aria-live="polite"
      >
        {slides.map((slide, idx) => {
          const isActive = idx === currentIndex;

          if (slide.kind === 'full-bleed') {
            return (
              <div key={slide.id} className="relative w-full h-full shrink-0">
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-cover object-center"
                  draggable="false"
                />
                {/* Clean bottom & left gradient scrim so photo shines and text has high contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10 sm:bg-gradient-to-r sm:from-black/70 sm:via-black/25 sm:to-transparent" />

                <div className="absolute inset-0 max-w-7xl mx-auto px-12 sm:px-14 lg:px-16 flex flex-col justify-end sm:justify-center pb-8 sm:pb-0">
                  <div className="max-w-lg text-white space-y-1.5 sm:space-y-3">
                    <span className="inline-block text-[9px] sm:text-xs font-extrabold uppercase tracking-widest text-[#BEF264]">
                      {slide.eyebrow}
                    </span>
                    <h1 className="font-display text-lg sm:text-3xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight drop-shadow-xs">
                      {slide.title}
                    </h1>
                    <p className="hidden sm:block text-xs sm:text-sm lg:text-base text-white/90 font-medium leading-relaxed max-w-md">
                      {slide.subtitle}
                    </p>
                    <div className="pt-1 sm:pt-2">
                      {slide.actionType === 'scroll' ? (
                        <button
                          type="button"
                          onClick={() => scrollToSection(slide.targetId)}
                          tabIndex={isActive ? 0 : -1}
                          className="rounded-full bg-[#16692B] hover:bg-[#115221] text-white px-4 py-1.5 sm:px-6 sm:py-2.5 text-[11px] sm:text-sm font-bold inline-flex items-center gap-2 shadow-md transition-all active:scale-95"
                        >
                          <span>{slide.ctaLabel}</span>
                          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                      ) : (
                        <Link
                          to={slide.to}
                          tabIndex={isActive ? 0 : -1}
                          className="rounded-full bg-[#16692B] hover:bg-[#115221] text-white px-4 py-1.5 sm:px-6 sm:py-2.5 text-[11px] sm:text-sm font-bold inline-flex items-center gap-2 shadow-md transition-all active:scale-95"
                        >
                          <span>{slide.ctaLabel}</span>
                          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          const isEmerald = slide.kind === 'studio-emerald';

          return (
            <div
              key={slide.id}
              className={`relative w-full h-full shrink-0 ${
                isEmerald ? 'bg-[#0E7124] text-white' : 'bg-[#F0EFEA] text-[#1C1917]'
              }`}
              style={
                isEmerald
                  ? {
                      backgroundImage:
                        'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
                      backgroundSize: '40px 40px',
                    }
                  : undefined
              }
            >
              <div className="max-w-6xl mx-auto h-full px-12 sm:px-14 lg:px-16 grid grid-cols-12 items-center gap-4 sm:gap-8">
                <div className="col-span-7 sm:col-span-7 space-y-1.5 sm:space-y-3">
                  <span
                    className={`inline-block text-[9px] sm:text-xs font-extrabold uppercase tracking-widest ${
                      isEmerald ? 'text-[#BEF264]' : 'text-[#146B2E]'
                    }`}
                  >
                    {slide.eyebrow}
                  </span>
                  <h2 className="font-display text-lg sm:text-3xl lg:text-5xl font-extrabold leading-[1.08] tracking-tight">
                    {slide.title}
                  </h2>
                  {slide.malayalamName && (
                    <p
                      className={`text-xs sm:text-base font-bold ${
                        isEmerald ? 'text-[#BEF264]' : 'text-[#146B2E]'
                      }`}
                    >
                      {slide.malayalamName} • {slide.priceText}
                    </p>
                  )}
                  <p
                    className={`hidden sm:block text-xs sm:text-sm lg:text-base font-medium leading-relaxed max-w-md ${
                      isEmerald ? 'text-white/90' : 'text-stone-600'
                    }`}
                  >
                    {slide.subtitle}
                  </p>
                  <div className="pt-1 sm:pt-2">
                    <Link
                      to={slide.to}
                      tabIndex={isActive ? 0 : -1}
                      className={`rounded-full px-4 py-1.5 sm:px-6 sm:py-2.5 text-[11px] sm:text-sm font-bold inline-flex items-center gap-2 shadow-sm transition-all active:scale-95 ${
                        isEmerald
                          ? 'bg-white text-[#146B2E] hover:bg-[#EDF5EE]'
                          : 'bg-[#16692B] hover:bg-[#115221] text-white'
                      }`}
                    >
                      <span>{slide.ctaLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </Link>
                  </div>
                </div>

                <div className="col-span-5 sm:col-span-5 flex items-center justify-center h-full py-4 sm:py-8">
                  <Link
                    to={slide.to}
                    tabIndex={isActive ? 0 : -1}
                    className="h-[175px] sm:h-[275px] lg:h-[360px] aspect-[4/4.6] rounded-2xl overflow-hidden bg-white p-1.5 shadow-xl border border-black/10 block hover:scale-[1.02] transition-transform"
                  >
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      className="w-full h-full object-cover rounded-xl"
                      draggable="false"
                    />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Millnadan Clean Left / Right Arrows */}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous hero slide"
            className="absolute left-2.5 sm:left-5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 hover:bg-white text-[#1C1917] shadow-md flex items-center justify-center transition active:scale-95 z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next hero slide"
            className="absolute right-2.5 sm:right-5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 hover:bg-white text-[#1C1917] shadow-md flex items-center justify-center transition active:scale-95 z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Compact Indicator Dots */}
      {slides.length > 1 && (
        <div
          className="absolute bottom-2.5 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-black/25 backdrop-blur-xs px-2.5 py-1 rounded-full"
          role="tablist"
          aria-label="Choose hero slide"
        >
          {slides.map((slide, idx) => {
            const active = idx === currentIndex;
            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={`Slide ${idx + 1} of ${slides.length}`}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  active ? 'w-5 bg-[#BEF264]' : 'w-1.5 bg-white/60 hover:bg-white'
                }`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
