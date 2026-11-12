import React from 'react';
import { formatINR } from '../../utils/currency';
import { Check } from 'lucide-react';

export default function SizeSelector({ sizes, selectedSize, onSelectSize }) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between text-xs font-bold text-stone-600 dark:text-stone-300">
        <span>Select Jar Size:</span>
        <span className="text-leaf-800 dark:text-turmeric-400 font-extrabold">
          {selectedSize.size} ({selectedSize.weightInGrams}g)
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2.5 sm:gap-3" role="radiogroup" aria-label="Product size options">
        {sizes.map((option) => {
          const isSelected = selectedSize.size === option.size;

          return (
            <button
              key={option.size}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelectSize(option)}
              className={`relative p-3 rounded-xl border-2 text-left transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'border-leaf-800 bg-leaf-50/60 dark:bg-stone-850 dark:border-turmeric-500 shadow-md ring-1 ring-leaf-800 dark:ring-turmeric-500'
                  : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-turmeric-400'
              }`}
            >
              {/* Checkmark icon for selected */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-leaf-800 dark:bg-turmeric-500 text-cream-50 dark:text-stone-950 flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
              )}

              <div>
                <span className="block font-display font-extrabold text-base text-stone-900 dark:text-cream-50">
                  {option.size}
                </span>
                <span className="text-[11px] text-stone-500 dark:text-stone-400 block -mt-0.5">
                  {option.weightInGrams >= 1000 ? 'Family Pack' : option.weightInGrams >= 500 ? 'Standard Jar' : 'Taster Jar'}
                </span>
              </div>

              <div className="mt-2 pt-1 border-t border-cream-200 dark:border-stone-800">
                <span className="font-display font-black text-sm text-leaf-900 dark:text-turmeric-400">
                  {formatINR(option.price)}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

