import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../utils/seo.js';

export default function NotFoundPage() {
  useSEO({
    title: 'Page Not Found',
    description: 'The requested page could not be found.'
  });

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 bg-[#F7F7F5]">
      <div className="max-w-md w-full text-center space-y-4 bg-white p-10 rounded-3xl border border-stone-200 shadow-xs">
        <span className="font-display text-xs font-extrabold text-[#146B2E] uppercase tracking-widest">
          404 Error
        </span>
        <h1 className="font-display text-3xl font-extrabold text-[#1C1917]">
          Jar Not Found
        </h1>
        <p className="text-xs text-stone-600 leading-relaxed max-w-xs mx-auto">
          The page you are looking for has been moved or does not exist.
        </p>

        <div className="pt-2">
          <Link
            to="/"
            className="inline-block rounded-full bg-[#16692B] hover:bg-[#115221] text-white px-7 py-3 text-xs font-bold tracking-wide transition-colors shadow-xs"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
