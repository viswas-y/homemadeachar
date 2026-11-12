import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PRODUCTS } from '../data/products.js';
import { useSEO } from '../utils/seo.js';
import Hero from '../components/home/Hero.jsx';
import ValueBadges from '../components/home/ValueBadges.jsx';
import BrandFeatureBand from '../components/home/BrandFeatureBand.jsx';
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
    <div className="flex flex-col min-h-screen bg-[#F7F7F5]">
      {/* 1. Full-Width Kerala Kitchen Panoramic Hero Slider */}
      <Hero />

      {/* 2. Organic Pebble Purity Highlights */}
      <ValueBadges />

      {/* 3. Signature Emerald Grid Brand Band */}
      <BrandFeatureBand />

      {/* 4. Clean Neutral Product Showcase */}
      <ProductGrid products={PRODUCTS} />

      {/* 5. "GOOD INGREDIENTS. GREAT TASTE." Pure Breakdown */}
      <GoodIngredients />

      {/* 6. Split Feature Spotlight */}
      <FlavorSpotlight />

      {/* 7. "FROM OUR KITCHEN" Process Gallery Container */}
      <Gallery />

      {/* 8. "MADE BY AMMA" Story Container */}
      <About />

      {/* 9. FAQ Accordion Container */}
      <FAQ />
    </div>
  );
}
