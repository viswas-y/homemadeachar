import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';

export default function Toast() {
  const { toastMessage, openCart } = useCart();

  if (!toastMessage) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-stone-950 text-white rounded-2xl shadow-xl border border-white/10 max-w-sm text-xs font-medium"
    >
      <div className="flex-1 truncate">
        {toastMessage}
      </div>
      <button
        type="button"
        onClick={openCart}
        className="rounded-full bg-white hover:bg-stone-200 text-black px-3 py-1 text-[11px] font-bold tracking-wide flex items-center gap-1 transition-colors whitespace-nowrap"
      >
        <ShoppingBag className="w-3 h-3" />
        View Cart
      </button>
    </div>
  );
}
