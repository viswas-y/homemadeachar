import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQS } from '../../data/faqs.js';

export default function FAQ() {
  const [openId, setOpenId] = useState(FAQS[0]?.id || null);

  const toggleAccordion = (id) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto rounded-[28px] sm:rounded-[36px] bg-white border border-stone-200/80 p-6 sm:p-10 lg:p-12 shadow-xs text-[#1C1917]">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
          <p className="text-[11px] sm:text-xs uppercase tracking-widest font-extrabold text-[#146B2E]">
            COMMON QUESTIONS
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1C1917] uppercase mt-0.5">
            FREQUENTLY ASKED
          </h2>
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto divide-y divide-black/10">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            const headingId = `faq-heading-${faq.id}`;
            const panelId = `faq-panel-${faq.id}`;

            return (
              <div key={faq.id} className="py-2">
                <h3>
                  <button
                    type="button"
                    id={headingId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full py-4 sm:py-5 flex items-center justify-between text-left gap-4 hover:opacity-75 transition-opacity"
                  >
                    <div>
                      <span className="font-display text-base sm:text-lg font-bold text-[#1C1917] block">
                        {faq.question}
                      </span>
                      {faq.questionMalayalam && (
                        <span className="text-xs text-[#1C1917]/60 font-semibold block mt-0.5">
                          {faq.questionMalayalam}
                        </span>
                      )}
                    </div>

                    <span className="w-8 h-8 rounded-full bg-[#EDF5EE] border border-[#146B2E]/20 flex items-center justify-center flex-shrink-0 text-[#146B2E]">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={headingId}
                    className="pb-5 text-xs sm:text-sm text-[#1C1917]/80 leading-relaxed font-normal"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
