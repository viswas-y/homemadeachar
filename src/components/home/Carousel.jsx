import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { formatINR } from '../../utils/currency.js';

const FLAVOR_THEMES = {
  'manga-achar': {
    shortName: 'Mango Pickle',
    accentHex: '#FDBA74',
    glowHex: 'rgba(251, 146, 60, 0.36)',
    calloutLeft: 'Cold-Pressed Gingelly Oil',
    calloutRight: 'Bold Raw Mango • 9 Mo Shelf',
    variant: 'mango',
  },
  'pacha-mulaku-achar': {
    shortName: 'Green Chilli',
    accentHex: '#86EFAC',
    glowHex: 'rgba(34, 197, 94, 0.36)',
    calloutLeft: 'Farm-Fresh Chillies',
    calloutRight: 'Cracked Mustard • Zero Chemicals',
    variant: 'chilli',
  },
  'veluthulli-achar': {
    shortName: 'Garlic Pickle',
    accentHex: '#FDA4AF',
    glowHex: 'rgba(244, 63, 94, 0.36)',
    calloutLeft: 'Whole Peeled Cloves',
    calloutRight: 'Fiery Kashmiri Chilli Masala',
    variant: 'garlic',
  },
  'naranga-achar': {
    shortName: 'Lemon Pickle',
    accentHex: '#FDE047',
    glowHex: 'rgba(234, 179, 8, 0.34)',
    calloutLeft: 'Sun-Aged Wild Lemon',
    calloutRight: '12 Months Natural Cure',
    variant: 'lemon',
  },
  kadumanga: {
    shortName: 'Kadumanga',
    accentHex: '#FCA5A5',
    glowHex: 'rgba(239, 68, 68, 0.36)',
    calloutLeft: 'Tender Baby Mangoes',
    calloutRight: 'Traditional Scarlet Brine',
    variant: 'kadumanga',
  },
  'nellika-achar': {
    shortName: 'Nellika Achar',
    accentHex: '#BEF264',
    glowHex: 'rgba(132, 204, 22, 0.36)',
    calloutLeft: 'Rich Vitamin-C Amla',
    calloutRight: 'Golden Turmeric & Mustard',
    variant: 'nellika',
  },
  'inji-achar-puli-inji': {
    shortName: 'Inji Achar',
    accentHex: '#FB923C',
    glowHex: 'rgba(234, 88, 12, 0.36)',
    calloutLeft: 'Malabar Tamarind',
    calloutRight: 'Marayoor Organic Jaggery',
    variant: 'ginger',
  },
  'chemmeen-achar': {
    shortName: 'Chemmeen Achar',
    accentHex: '#F87171',
    glowHex: 'rgba(220, 38, 38, 0.38)',
    calloutLeft: 'Crispy Coastal Prawns',
    calloutRight: 'Roasted Curry Leaf Masala',
    variant: 'prawn',
  },
};

const DEFAULT_THEME = {
  shortName: 'Kerala Achar',
  accentHex: '#BEF264',
  glowHex: 'rgba(132, 204, 22, 0.32)',
  calloutLeft: 'Cold-Pressed Gingelly Oil',
  calloutRight: 'Zero Preservatives',
  variant: 'mango',
};

function SpiceArtwork({ variant }) {
  switch (variant) {
    case 'chilli':
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_10px_14px_rgba(0,0,0,0.45)]" aria-hidden="true">
          <path d="M48 10c-2 2-5 3-7 3" stroke="#A3E635" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M43 13C30 14 16 26 11 47c-1 4 3 6 7 3 13-9 25-21 28-33 1-3-1-5-3-4z" fill="#22C55E" />
          <path d="M42 16c-9 3-20 14-26 30 10-7 21-18 26-30z" fill="#86EFAC" opacity="0.45" />
        </svg>
      );
    case 'garlic':
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_10px_14px_rgba(0,0,0,0.45)]" aria-hidden="true">
          <path d="M32 8c2 8 15 12 18 24 2 9-4 20-18 20S12 41 14 32c3-12 16-16 18-24z" fill="#FFF7ED" />
          <path d="M32 10c-3 10-8 18-8 29 0 7 3 12 8 13 5-1 8-6 8-13 0-11-5-19-8-29z" fill="#FDE68A" opacity="0.45" />
          <path d="M24 20c-4 6-6 13-5 20M40 20c4 6 6 13 5 20" stroke="#D6D3D1" strokeWidth="1.5" fill="none" />
        </svg>
      );
    case 'lemon':
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_10px_14px_rgba(0,0,0,0.45)]" aria-hidden="true">
          <circle cx="32" cy="32" r="22" fill="#FACC15" />
          <circle cx="32" cy="32" r="18" fill="#FEF9C3" />
          <circle cx="32" cy="32" r="15" fill="#FDE047" />
          <path d="M32 17v30M17 32h30M21 21l22 22M43 21L21 43" stroke="#FEF9C3" strokeWidth="2.5" />
        </svg>
      );
    case 'kadumanga':
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_10px_14px_rgba(0,0,0,0.45)]" aria-hidden="true">
          <path d="M34 10c11 1 18 11 17 24-1 13-11 21-22 19-10-2-15-11-12-23 3-11 8-21 17-20z" fill="#65A30D" />
          <path d="M40 16c6 5 8 15 5 24-2 6-7 10-12 11 6-5 10-16 7-35z" fill="#EF4444" opacity="0.65" />
          <path d="M33 10c0-3 2-5 5-6" stroke="#A3E635" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      );
    case 'nellika':
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_10px_14px_rgba(0,0,0,0.45)]" aria-hidden="true">
          <circle cx="32" cy="34" r="19" fill="#84CC16" />
          <ellipse cx="26" cy="28" rx="6" ry="9" fill="#BEF264" opacity="0.55" />
          <path d="M32 15v38M22 18c-3 10-3 22 0 32M42 18c3 10 3 22 0 32" stroke="#4D7C0F" strokeWidth="1.5" fill="none" opacity="0.55" />
        </svg>
      );
    case 'ginger':
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_10px_14px_rgba(0,0,0,0.45)]" aria-hidden="true">
          <path d="M16 38c-4-7 2-15 10-14 3-7 12-10 17-4 5-3 11 2 9 9 4 4 3 12-3 15-8 4-28 3-33-6z" fill="#D97706" />
          <path d="M22 36c0-4 5-8 10-7 3-4 8-5 11-1" stroke="#FDE68A" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
        </svg>
      );
    case 'prawn':
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_10px_14px_rgba(0,0,0,0.45)]" aria-hidden="true">
          <path d="M44 18c-12-4-24 3-26 15-2 10 5 18 14 18 6 0 11-4 11-9 0-5-5-7-9-5" stroke="#FB923C" strokeWidth="10" strokeLinecap="round" fill="none" />
          <path d="M44 18c-10-3-20 3-22 13" stroke="#FECACA" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.7" />
        </svg>
      );
    case 'redchilli':
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_10px_14px_rgba(0,0,0,0.45)]" aria-hidden="true">
          <path d="M16 14c3 1 6 1 8-1" stroke="#84CC16" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M22 14c12 2 24 14 29 33 1 4-3 6-7 3C32 41 21 29 18 17c-1-3 1-4 4-3z" fill="#EF4444" />
          <path d="M24 18c8 4 17 15 21 28-8-7-17-17-21-28z" fill="#FCA5A5" opacity="0.4" />
        </svg>
      );
    case 'curryleaf':
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_10px_14px_rgba(0,0,0,0.45)]" aria-hidden="true">
          <path d="M14 48L48 14" stroke="#A3E635" strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx="26" cy="26" rx="7" ry="4" transform="rotate(-35 26 26)" fill="#22C55E" />
          <ellipse cx="36" cy="20" rx="6" ry="3.5" transform="rotate(-30 36 20)" fill="#4ADE80" />
          <ellipse cx="38" cy="36" rx="7" ry="4" transform="rotate(45 38 36)" fill="#16A34A" />
          <ellipse cx="28" cy="44" rx="6" ry="3.5" transform="rotate(40 28 44)" fill="#22C55E" />
        </svg>
      );
    case 'mango':
    default:
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_10px_14px_rgba(0,0,0,0.45)]" aria-hidden="true">
          <path d="M38 10c11 2 17 14 13 27-4 13-15 20-26 16-9-3-13-14-8-26C21 15 29 8 38 10z" fill="#84CC16" />
          <path d="M36 14c7 3 11 12 8 22-3 9-10 14-18 12 8-4 12-16 10-34z" fill="#F97316" opacity="0.72" />
          <path d="M38 10c2-3 5-5 8-5" stroke="#4ADE80" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      );
  }
}

export default function Carousel({ products = [], activeIndex: controlledIndex, onSelectIndex }) {
  const [internalIndex, setInternalIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const isControlled = typeof controlledIndex === 'number';
  const activeIndex = isControlled ? controlledIndex : internalIndex;

  const setActiveIndex = (nextIdx) => {
    if (isControlled && onSelectIndex) {
      onSelectIndex(nextIdx);
    } else {
      setInternalIndex(nextIdx);
    }
  };

  const pointerRef = useRef({ active: false, startX: 0, startY: 0, swiped: false });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener?.('change', handleChange);
    return () => mediaQuery.removeEventListener?.('change', handleChange);
  }, []);

  // Gentle auto-cycle until visitor clicks or selects a flavor
  useEffect(() => {
    if (prefersReducedMotion || hasInteracted || products.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((activeIndex + 1) % products.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [prefersReducedMotion, hasInteracted, activeIndex, products.length]);

  const activeProduct = products[activeIndex] || products[0];
  if (!activeProduct) return null;

  const theme = FLAVOR_THEMES[activeProduct.id] || DEFAULT_THEME;

  const handleSelect = (idx) => {
    setHasInteracted(true);
    setActiveIndex(idx);
  };

  const handlePointerDown = (e) => {
    if (products.length <= 1 || (e.pointerType === 'mouse' && e.button !== 0)) return;
    pointerRef.current = { active: true, startX: e.clientX, startY: e.clientY, swiped: false };
  };

  const handlePointerUp = (e) => {
    const p = pointerRef.current;
    if (!p.active) return;
    p.active = false;
    const dx = e.clientX - p.startX;
    const dy = e.clientY - p.startY;
    if (Math.abs(dx) > 36 && Math.abs(dx) > Math.abs(dy)) {
      p.swiped = true;
      setHasInteracted(true);
      const next =
        dx < 0
          ? (activeIndex + 1) % products.length
          : (activeIndex - 1 + products.length) % products.length;
      setActiveIndex(next);
    }
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="The Spice Jar interactive flavor showcase"
      className="relative w-full flex flex-col items-center"
    >
      {/* Central Floating Jar Stage (Tigris Drinks Style) */}
      <div
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        className="relative w-full max-w-3xl mx-auto h-[290px] sm:h-[360px] lg:h-[400px] flex items-center justify-center select-none"
        style={{ touchAction: 'pan-y' }}
      >
        {/* Dynamic Radial Flavor Aura Glow behind the active jar */}
        <div
          aria-hidden="true"
          className="absolute w-56 h-56 sm:w-80 sm:h-80 rounded-full blur-3xl transition-colors duration-700 pointer-events-none"
          style={{ backgroundColor: theme.glowHex }}
        />

        {/* Ambient Floating Oil/Spice Droplets */}
        <span
          aria-hidden="true"
          className="hidden sm:block absolute left-[24%] top-[18%] w-3.5 h-3.5 rounded-full bg-white/15 backdrop-blur-xs border border-white/25 animate-droplet-drift pointer-events-none"
        />
        <span
          aria-hidden="true"
          className="hidden sm:block absolute right-[25%] top-[24%] w-2.5 h-2.5 rounded-full bg-white/20 border border-white/25 animate-droplet-drift pointer-events-none"
          style={{ animationDelay: '1.3s' }}
        />
        <span
          aria-hidden="true"
          className="hidden sm:block absolute left-[32%] bottom-[16%] w-4 h-4 rounded-full bg-white/10 border border-white/20 animate-droplet-drift pointer-events-none"
          style={{ animationDelay: '2.2s' }}
        />

        {/* Floating Botanical Spice Accents Around the Jar */}
        <div
          aria-hidden="true"
          key={`top-left-${activeProduct.id}`}
          className="absolute left-2 sm:left-10 lg:left-16 top-2 sm:top-6 w-11 h-11 sm:w-16 sm:h-16 animate-spice-float-a pointer-events-none"
        >
          <SpiceArtwork variant={theme.variant} />
        </div>

        <div
          aria-hidden="true"
          key={`top-right-${activeProduct.id}`}
          className="absolute right-2 sm:right-10 lg:right-16 top-4 sm:top-8 w-11 h-11 sm:w-16 sm:h-16 animate-spice-float-b pointer-events-none"
        >
          <SpiceArtwork variant={theme.variant === 'chilli' ? 'curryleaf' : theme.variant} />
        </div>

        <div
          aria-hidden="true"
          className="absolute left-4 sm:left-16 lg:left-24 bottom-6 sm:bottom-10 w-10 h-10 sm:w-14 sm:h-14 animate-spice-float-b pointer-events-none"
          style={{ animationDelay: '0.8s' }}
        >
          <SpiceArtwork variant="redchilli" />
        </div>

        <div
          aria-hidden="true"
          className="absolute right-4 sm:right-16 lg:right-24 bottom-8 sm:bottom-12 w-10 h-10 sm:w-14 sm:h-14 animate-spice-float-a pointer-events-none"
          style={{ animationDelay: '1.1s' }}
        >
          <SpiceArtwork variant="curryleaf" />
        </div>

        {/* Left & Right Tilted Feature Callout Pills (Desktop & Tablet) */}
        <div
          className="hidden sm:flex absolute left-2 md:left-4 lg:left-6 top-[48%] -translate-y-1/2 z-20 items-center gap-2 rounded-full bg-[#092914]/85 backdrop-blur-md border border-white/15 px-3.5 py-1.5 text-xs font-bold text-white shadow-xl -rotate-3 animate-spice-float-a pointer-events-none"
        >
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: theme.accentHex, boxShadow: `0 0 10px ${theme.accentHex}` }}
          />
          <span>{theme.calloutLeft}</span>
        </div>

        <div
          className="hidden sm:flex absolute right-2 md:right-4 lg:right-6 top-[43%] -translate-y-1/2 z-20 items-center gap-2 rounded-full bg-[#092914]/85 backdrop-blur-md border border-white/15 px-3.5 py-1.5 text-xs font-bold text-white shadow-xl rotate-3 animate-spice-float-b pointer-events-none"
        >
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: theme.accentHex, boxShadow: `0 0 10px ${theme.accentHex}` }}
          />
          <span>{theme.calloutRight}</span>
        </div>

        {/* Shaped Floating Jar Centerpiece */}
        <Link
          to={`/product/${activeProduct.slug}`}
          onClick={(e) => {
            if (pointerRef.current.swiped) {
              e.preventDefault();
              pointerRef.current.swiped = false;
            }
          }}
          aria-label={`${activeProduct.name} (${activeProduct.malayalamName}) — From ${formatINR(activeProduct.sizes[0].price)}`}
          className="relative z-10 w-[215px] sm:w-[270px] lg:w-[300px] aspect-[3/4] flex items-center justify-center group focus-visible:outline-none rounded-3xl"
        >
          {/* Floating Ground Shadow */}
          <div
            aria-hidden="true"
            className="absolute bottom-3 w-36 sm:w-48 h-5 rounded-full bg-black/55 blur-xl pointer-events-none"
          />

          <div className="w-full h-full animate-jar-float">
            <div key={activeProduct.id} className="w-full h-full animate-jar-swap">
              <img
                src={activeProduct.images[0]}
                alt={`${activeProduct.name} — The Spice Jar`}
                className="w-full h-full object-contain drop-shadow-[0_24px_32px_rgba(0,0,0,0.55)] group-hover:scale-[1.03] transition-transform duration-300 select-none"
                style={{
                  maskImage:
                    'radial-gradient(ellipse 46% 48% at 50% 51%, #000 66%, rgba(0,0,0,0.85) 76%, transparent 98%)',
                  WebkitMaskImage:
                    'radial-gradient(ellipse 46% 48% at 50% 51%, #000 66%, rgba(0,0,0,0.85) 76%, transparent 98%)',
                }}
                draggable="false"
              />
            </div>
          </div>
        </Link>
      </div>

      {/* Compact Tilted Callout Pills on Mobile (overlap-free below jar) */}
      <div className="flex sm:hidden flex-wrap items-center justify-center gap-2 -mt-2 mb-3 z-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#092914]/90 border border-white/15 px-3 py-1 text-[10px] font-bold text-white shadow-md -rotate-2">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.accentHex }} />
          <span>{theme.calloutLeft}</span>
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#092914]/90 border border-white/15 px-3 py-1 text-[10px] font-bold text-white shadow-md rotate-2">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.accentHex }} />
          <span>{theme.calloutRight}</span>
        </span>
      </div>

      {/* Interactive Flavor Selector Row (Tigris Style) */}
      <div className="w-full flex flex-col items-center gap-3 z-10 mt-1">
        <p className="text-[10px] sm:text-xs font-extrabold tracking-[0.2em] uppercase text-white/75 flex items-center gap-1.5">
          <span style={{ color: theme.accentHex }}>⚡</span>
          <span>Select a Pickle to Preview:</span>
        </p>

        <div
          className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 max-w-2xl mx-auto"
          role="tablist"
          aria-label="Choose a pickle jar flavor to preview"
        >
          {products.map((product, idx) => {
            const isActive = idx === activeIndex;
            const itemTheme = FLAVOR_THEMES[product.id] || DEFAULT_THEME;

            return (
              <button
                key={product.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleSelect(idx)}
                className={`rounded-full px-3 py-1.5 sm:px-4 sm:py-2 inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold transition-all duration-300 active:scale-95 ${
                  isActive
                    ? 'text-[#072411] scale-[1.03]'
                    : 'bg-white/5 hover:bg-white/12 text-white/90 border border-white/15'
                }`}
                style={
                  isActive
                    ? {
                        backgroundColor: itemTheme.accentHex,
                        boxShadow: `0 0 22px ${itemTheme.glowHex}`,
                      }
                    : undefined
                }
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{
                    backgroundColor: isActive ? '#072411' : itemTheme.accentHex,
                  }}
                />
                <span>{itemTheme.shortName}</span>
              </button>
            );
          })}
        </div>

        {/* Direct Order / Product Link for Active Jar */}
        <div className="pt-1 flex flex-wrap items-center justify-center gap-2.5">
          <Link
            to={`/product/${activeProduct.slug}`}
            className="rounded-full bg-white hover:bg-[#EDF5EE] text-[#072411] px-4 py-2 sm:px-5 sm:py-2.5 inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold shadow-lg transition-all active:scale-95 whitespace-nowrap"
          >
            <span>Order {activeProduct.name}</span>
            <span className="text-[#146B2E]">• From {formatINR(activeProduct.sizes[0].price)}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#146B2E]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
