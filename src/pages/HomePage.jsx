import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PRODUCTS } from '../data/products.js';
import { useSEO } from '../utils/seo.js';
import Hero from '../components/home/Hero.jsx';
import ValueBadges from '../components/home/ValueBadges.jsx';
import ProductGrid from '../components/home/ProductGrid.jsx';
import GoodIngredients from '../components/home/GoodIngredients.jsx';
import FlavorSpotlight from '../components/home/FlavorSpotlight.jsx';
import Gallery from '../components/home/Gallery.jsx';
import About from '../components/home/About.jsx';
import FAQ from '../components/home/FAQ.jsx';

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

  useSEO({
    title: null,
    description: "Authentic homemade Kerala achar by Valsala Amma. Small batches with pure cold-pressed gingelly oil, fresh spices, and zero preservatives."
  });

  return (
    <div className="flex flex-col min-h-screen space-y-2 sm:space-y-4">
      {/* 1. Large Rounded Yellow Hero Container */}
      <Hero />

      {/* 2. Circular Feature Badges Row (Desktop: 6 flex | Mobile: 2-col grid) */}
      <ValueBadges />

      {/* 3. "OUR FAVORITES / ACHAR YOU'LL LOVE" Yellow Container Card */}
      <ProductGrid products={PRODUCTS} />

      {/* 4. "GOOD INGREDIENTS. GREAT TASTE." Clean Canvas Section */}
      <GoodIngredients />

      {/* 5. Split Feature Spotlight ("NEW BATCH / SPICY, TANGY, IRRESISTIBLE") */}
      <FlavorSpotlight />

      {/* 6. "FROM OUR KITCHEN" Process Gallery Container */}
      <Gallery />

      {/* 5. "MADE BY AMMA" Story Container */}
      <About />

      {/* 6. FAQ Accordion Container */}
      <FAQ />
    </div>
  );
}
