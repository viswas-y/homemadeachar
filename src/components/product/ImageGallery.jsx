import React, { useState } from 'react';
import { ZoomIn } from 'lucide-react';

export default function ImageGallery({ images, title }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  const activeImage = images[activeImageIndex] || images[0];

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div className="space-y-4">
      {/* Main Large Display Stage */}
      <div
        className="relative aspect-square w-full rounded-2xl bg-[#ECECE8] border border-stone-200 p-6 flex items-center justify-center overflow-hidden cursor-crosshair group shadow-xs"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <img
          src={activeImage}
          alt={`${title} - View ${activeImageIndex + 1}`}
          className={`w-full h-full object-contain filter drop-shadow-md transition-transform duration-200 select-none ${
            isZoomed ? 'scale-150' : 'scale-100'
          }`}
          style={
            isZoomed
              ? {
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                }
              : undefined
          }
        />

        {/* Zoom Hint Badge */}
        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-[#1C1917]/75 text-white text-xs font-semibold flex items-center gap-1.5 pointer-events-none backdrop-blur-xs">
          <ZoomIn className="w-3.5 h-3.5" />
          <span>{isZoomed ? 'Zoomed' : 'Hover / Tap to Zoom'}</span>
        </div>
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="grid grid-cols-3 gap-3" role="tablist" aria-label="Product thumbnails">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={idx === activeImageIndex}
              aria-label={`View angle ${idx + 1} of ${title}`}
              onClick={() => setActiveImageIndex(idx)}
              className={`relative aspect-square rounded-xl p-2 bg-[#ECECE8] border-2 overflow-hidden transition-all duration-200 ${
                idx === activeImageIndex
                  ? 'border-[#146B2E] shadow-md ring-2 ring-[#146B2E]/25'
                  : 'border-stone-200 hover:border-[#146B2E]/50 opacity-75 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

