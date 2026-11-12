import React from 'react';
import ProductCard from '../home/ProductCard.jsx';

export default function RelatedProducts({ currentProductId, products }) {
  const related = products
    .filter(p => p.id !== currentProductId)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="pt-10">
      <div className="mb-6 text-center sm:text-left">
        <p className="text-[11px] sm:text-xs uppercase tracking-widest font-extrabold text-[#221610]/60">
          RECOMMENDED
        </p>
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#221610] uppercase mt-0.5">
          YOU MAY ALSO LIKE
        </h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {related.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </section>
  );
}
