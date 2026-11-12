import React from 'react';
import Carousel from './Carousel.jsx';
import { PRODUCTS } from '../../data/products.js';

export default function Hero() {
  return (
    <section
      aria-label="The Spice Jar Featured Showcase"
      className="w-full"
    >
      <Carousel products={PRODUCTS} />
    </section>
  );
}
