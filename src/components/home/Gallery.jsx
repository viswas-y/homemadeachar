import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../../data/gallery.js';
import Lightbox from '../common/Lightbox.jsx';

export default function Gallery() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  return (
    <section id="gallery" className="px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto rounded-[28px] sm:rounded-[36px] bg-white border border-black/5 p-6 sm:p-10 lg:p-12 shadow-xs">
        
        {/* Section Header */}
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <p className="text-[11px] sm:text-xs uppercase tracking-widest font-extrabold text-[#221610]/60">
            HOW WE MAKE IT
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#221610] uppercase mt-0.5">
            FROM OUR KITCHEN
          </h2>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
          {GALLERY_ITEMS.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhotoIndex(index)}
              className="bg-[#FBF8F1] rounded-2xl overflow-hidden cursor-pointer group hover:-translate-y-1 transition-all duration-200 border border-black/5 p-2.5 sm:p-3 flex flex-col"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-stone-200">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                />
              </div>

              <div className="pt-2.5 sm:pt-3 text-[#221610] flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#221610]/50 block">
                    {item.step}
                  </span>
                  <h3 className="font-display text-xs sm:text-sm font-bold text-[#221610] mt-0.5 truncate">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <Lightbox
          items={GALLERY_ITEMS}
          currentIndex={selectedPhotoIndex || 0}
          isOpen={selectedPhotoIndex !== null}
          onClose={() => setSelectedPhotoIndex(null)}
          onNavigate={(newIdx) => setSelectedPhotoIndex(newIdx)}
        />

      </div>
    </section>
  );
}
