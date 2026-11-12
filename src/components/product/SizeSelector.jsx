import React from 'react';
import { formatINR } from '../../utils/currency';
import { Check } from 'lucide-react';

export default function SizeSelector({ sizes, selectedSize, onSelectSize }) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between text-xs font-bold text-stone-600">
        <span>Select Jar Size:</span>
        <span className="text-[#146B2E] font-extrabold">
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
                  ? 'border-[#146B2E] bg-[#EDF5EE] shadow-sm ring-1 ring-[#146B2E]/25'
                  : 'border-stone-200 bg-white hover:border-[#146B2E]/50'
              }`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#146B2E] text-white flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
              )}

              <div>
                <span className="block font-display font-extrabold text-base text-[#1C1917]">
                  {option.size}
                </span>
                <span className="text-[11px] text-stone-500 block -mt-0.5">
                  {option.weightInGrams >= 1000 ? 'Family Pack' : option.weightInGrams >= 500 ? 'Standard Jar' : 'Taster Jar'}
                </span>
              </div>

              <div className="mt-2 pt-1 border-t border-stone-200/80">
                <span className="font-display font-extrabold text-sm text-[#146B2E]">
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
