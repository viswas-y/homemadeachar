import React, { useEffect, useState, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Lightbox({ items, currentIndex, isOpen, onClose, onNavigate }) {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onNavigate((currentIndex - 1 + items.length) % items.length);
      } else if (e.key === 'ArrowRight') {
        onNavigate((currentIndex + 1) % items.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, currentIndex, items.length, onClose, onNavigate]);

  if (!isOpen || !items[currentIndex]) return null;

  const currentItem = items[currentIndex];

  const minSwipeDistance = 50;
  const onTouchStartHandler = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMoveHandler = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      onNavigate((currentIndex + 1) % items.length);
    } else if (distance < -minSwipeDistance) {
      onNavigate((currentIndex - 1 + items.length) % items.length);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo gallery viewer: ${currentItem.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4"
      onClick={onClose}
      ref={modalRef}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close photo preview"
        className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-black transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((currentIndex - 1 + items.length) % items.length);
        }}
        aria-label="Previous photo"
        className="absolute left-3 sm:left-6 z-50 p-2.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-black transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((currentIndex + 1) % items.length);
        }}
        aria-label="Next photo"
        className="absolute right-3 sm:right-6 z-50 p-2.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-black transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div
        className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStartHandler}
        onTouchMove={onTouchMoveHandler}
        onTouchEnd={onTouchEndHandler}
      >
        <div className="w-full flex justify-center overflow-hidden rounded-2xl bg-stone-900 border border-white/10 shadow-2xl">
          <img
            src={currentItem.image}
            alt={currentItem.title}
            className="max-h-[65vh] w-auto object-contain select-none"
            draggable="false"
          />
        </div>

        <div className="w-full mt-4 bg-white text-stone-950 p-5 rounded-2xl border border-black/10 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase font-bold tracking-wider text-[#146B2E] block">
              {currentItem.step} • {currentItem.malayalam}
            </span>
            <h3 className="font-display font-bold text-xl text-[#1C1917] mt-0.5">
              {currentItem.title}
            </h3>
            <p className="text-xs text-stone-600 mt-1 max-w-2xl">
              {currentItem.caption}
            </p>
          </div>

          <div className="text-xs text-stone-500 font-semibold px-3 py-1.5 rounded-full bg-stone-100 whitespace-nowrap">
            {currentIndex + 1} of {items.length}
          </div>
        </div>
      </div>
    </div>
  );
}
