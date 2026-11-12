import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../utils/seo.js';

export default function NotFoundPage() {
  useSEO({
    title: 'Page Not Found',
    description: 'The requested page could not be found.'
  });

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 bg-brand-offwhite">
      <div className="max-w-md w-full text-center space-y-4 bg-white p-10 rounded-3xl border border-black/10 shadow-xs">
        <span className="font-serif text-xs font-bold text-stone-500 uppercase tracking-widest">
          404 Error
        </span>
        <h1 className="font-serif text-3xl font-bold text-stone-950">
          Jar Not Found
        </h1>
        <p className="text-xs text-stone-600 leading-relaxed max-w-xs mx-auto">
          The page you are looking for has been moved or does not exist.
        </p>

        <div className="pt-2">
          <Link
            to="/"
            className="inline-block rounded-full bg-black hover:bg-stone-850 text-white px-6 py-2.5 text-xs font-semibold tracking-wide transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
