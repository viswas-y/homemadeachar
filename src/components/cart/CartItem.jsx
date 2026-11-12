import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { formatINR } from '../../utils/currency.js';

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const lineTotal = item.price * item.quantity;

  return (
    <div className="flex items-center gap-3.5 py-4 border-b border-black/10 last:border-b-0">
      {/* Product Image */}
      <div className="w-16 h-16 rounded-xl bg-white p-1 border border-black/10 flex-shrink-0 flex items-center justify-center overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Item Info */}
      <div className="flex-1 min-w-0">
        <span className="text-[10px] font-extrabold text-[#1C1917]/50 uppercase tracking-wider block">
          {item.size}
        </span>
        <h4 className="font-display font-bold text-sm text-[#1C1917] truncate">
          {item.name}
        </h4>
        <div className="text-xs text-[#1C1917]/70 font-semibold mt-0.5">
          {formatINR(item.price)} each
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-1.5">
          <div className="inline-flex items-center rounded-full border border-black/15 bg-white px-1.5 py-0.5">
            <button
              type="button"
              onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
              aria-label={`Decrease quantity of ${item.name}`}
              className="p-1 hover:bg-stone-100 rounded-full text-[#1C1917] transition-colors"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-6 text-center text-xs font-extrabold text-[#1C1917]">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
              aria-label={`Increase quantity of ${item.name}`}
              className="p-1 hover:bg-stone-100 rounded-full text-[#1C1917] transition-colors"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => onRemove(item.cartItemId)}
            aria-label={`Remove ${item.name} from cart`}
            className="p-1 text-[#1C1917]/40 hover:text-[#1C1917] transition-colors ml-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Line Total */}
      <div className="text-right flex-shrink-0">
        <span className="font-display font-extrabold text-sm text-[#1C1917] block">
          {formatINR(lineTotal)}
        </span>
      </div>
    </div>
  );
}
