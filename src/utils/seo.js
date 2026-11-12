import { useEffect } from 'react';
import { SHOP_CONFIG } from '../config/shop.js';

/**
 * Hook to dynamically update document title and description
 */
export function useSEO({ title, description, schema }) {
  useEffect(() => {
    const fullTitle = title 
      ? `${title} | ${SHOP_CONFIG.name}` 
      : `${SHOP_CONFIG.name} — ${SHOP_CONFIG.tagline}`;
    
    document.title = fullTitle;

    // Meta description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = description;
    }

    // JSON-LD Schema
    let scriptTag = document.getElementById('jsonld-schema');
    if (schema) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'jsonld-schema';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schema);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    return () => {
      // Clean up schema on unmount
      const existing = document.getElementById('jsonld-schema');
      if (existing) existing.remove();
    };
  }, [title, description, schema]);
}

/**
 * Builds schema.org Product JSON-LD object for a pickle product
 */
export function buildProductSchema(product) {
  if (!product) return null;

  const minPrice = Math.min(...product.sizes.map(s => s.price));
  const maxPrice = Math.max(...product.sizes.map(s => s.price));

  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": `${product.name} (${product.malayalamName})`,
    "description": product.shortDescription,
    "brand": {
      "@type": "Brand",
      "name": SHOP_CONFIG.name
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "lowPrice": minPrice,
      "highPrice": maxPrice,
      "offerCount": product.sizes.length,
      "availability": "https://schema.org/InStock"
    }
  };
}
