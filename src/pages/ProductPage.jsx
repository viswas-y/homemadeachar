import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Plus, Minus, ArrowLeft } from 'lucide-react';
import { PRODUCTS } from '../data/products.js';
import { SHOP_CONFIG } from '../config/shop.js';
import { formatINR } from '../utils/currency.js';
import { useCart } from '../context/CartContext.jsx';
import { useSEO, buildProductSchema } from '../utils/seo.js';
import RelatedProducts from '../components/product/RelatedProducts.jsx';

export default function ProductPage() {
  const { slug } = useParams();
  const { addToCart } = useCart();

  const product = PRODUCTS.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const [selectedSize, setSelectedSize] = useState(() =>
    product ? product.sizes[0] : null
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
      setSelectedImageIndex(0);
      setQuantity(1);
    }
  }, [slug, product]);

  useSEO({
    title: product ? `${product.name} (${product.malayalamName})` : 'Product Not Found',
    description: product?.shortDescription,
    schema: product ? buildProductSchema(product) : null
  });

  if (!product || !selectedSize) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center text-[#1C1917]">
        <h2 className="font-display text-3xl font-bold">Pickle Not Found</h2>
        <p className="mt-2 text-sm text-[#1C1917]/70">The product you are looking for is unavailable.</p>
        <Link
          to="/"
          className="mt-6 rounded-full bg-[#960202] hover:bg-[#7F0B0B] text-white px-6 py-2.5 text-xs font-bold tracking-wide"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity, false);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity, true);
  };

  const currentPrice = selectedSize.price * quantity;

  return (
    <div className="pt-6 sm:pt-10 pb-28 sm:pb-32 px-3 sm:px-6 lg:px-8 text-[#1C1917]">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Minimal Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1C1917]/60">
            <li>
              <Link to="/" className="hover:text-[#1C1917] transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="w-3.5 h-3.5 text-[#1C1917]/40" />
            </li>
            <li>
              <Link to="/#products" className="hover:text-[#1C1917] transition-colors">
                Products
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="w-3.5 h-3.5 text-[#1C1917]/40" />
            </li>
            <li className="text-[#1C1917] font-extrabold" aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Main Product Showcase Card: Rounded Yellow Container matching Hero */}
        <div className="rounded-[28px] sm:rounded-[36px] bg-white border border-stone-200/80 p-6 sm:p-12 lg:p-14 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">

            {/* Left Column: Jar with Product Box Background */}
            <div className="lg:col-span-6 space-y-4">
              <div className={`w-full aspect-[4/5] ${product.boxColor} rounded-3xl flex items-center justify-center overflow-hidden border-2 border-white/50 shadow-sm p-3 sm:p-5 relative`}>
                {product.tag && (
                  <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-white text-[#1C1917] text-xs font-extrabold uppercase tracking-wider shadow-xs">
                    {product.tag}
                  </span>
                )}
                <img
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-2xl select-none"
                />
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex items-center justify-center gap-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImageIndex(idx)}
                      aria-label={`View photo ${idx + 1}`}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        idx === selectedImageIndex
                          ? 'border-[#9B0B0B] ring-2 ring-[#9B0B0B]'
                          : 'border-white/50 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Clean Details */}
            <div className="lg:col-span-6 space-y-5">

              <div>
                <span className="text-xs font-bold text-[#9B0B0B] uppercase tracking-widest block">
                  {product.malayalamName}
                </span>
                <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1C1917] uppercase mt-1 leading-tight">
                  {product.name}
                </h1>
                <p className="mt-2 text-sm sm:text-base text-[#1C1917]/90 font-medium leading-relaxed">
                  {product.shortDescription}
                </p>
              </div>

              {/* Price */}
              <div className="py-1">
                <span className="font-display text-3xl sm:text-4xl font-extrabold text-[#1C1917]">
                  {formatINR(selectedSize.price)}
                </span>
                <span className="text-xs text-[#1C1917]/70 ml-2 font-bold">
                  ({selectedSize.size} Jar)
                </span>
              </div>

              {/* Size Selector */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-wider font-extrabold text-[#1C1917]">
                  Select Weight / Size:
                </label>
                <div className="flex items-center gap-2.5">
                  {product.sizes.map((s) => {
                    const isSelected = selectedSize.size === s.size;
                    return (
                      <button
                        key={s.size}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={`rounded-full px-5 py-2 text-xs font-extrabold tracking-wide border transition-all ${
                          isSelected
                            ? 'bg-[#9B0B0B] text-white border-[#9B0B0B]'
                            : 'bg-[#F7F7F5] text-[#1C1917] border-stone-200 hover:bg-[#FDF2F2] hover:border-[#9B0B0B]/40'
                        }`}
                      >
                        {s.size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Selector (matching Model Image) */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-wider font-extrabold text-[#1C1917]">
                  Quantity:
                </label>
                <div className="inline-flex items-center justify-between rounded-xl sm:rounded-2xl border border-stone-300 bg-white px-3 py-1.5 w-32 sm:w-36 h-12 shadow-xs">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                    className="w-8 h-8 flex items-center justify-center text-stone-700 hover:text-black font-semibold text-lg transition-colors select-none active:scale-95"
                  >
                    <Minus className="w-4 h-4 stroke-[2.5]" />
                  </button>
                  <span className="font-extrabold text-base text-black select-none">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                    className="w-8 h-8 flex items-center justify-center text-stone-700 hover:text-black font-semibold text-lg transition-colors select-none active:scale-95"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* Action Buttons: Add to Cart and Buy Now (Full Width Stacked - matching Model Image) */}
              <div className="flex flex-col gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full rounded-2xl border-2 border-black bg-white hover:bg-stone-50 text-black py-4 px-6 text-sm sm:text-base font-extrabold tracking-wide transition-all shadow-xs active:scale-[0.99] flex items-center justify-center"
                >
                  Add to cart
                </button>
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full rounded-2xl border-2 border-black bg-black hover:bg-stone-900 text-white py-4 px-6 text-sm sm:text-base font-extrabold tracking-wide transition-all shadow-xs active:scale-[0.99] flex items-center justify-center"
                >
                  Buy now
                </button>
              </div>

              {/* Why Shop With Trust Card (matching Model Image) */}
              <div className="rounded-2xl border border-stone-200 bg-[#FAF7F2]/60 p-4 sm:p-5 space-y-2.5">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-700 block">
                  WHY SHOP WITH THE SPICE JAR
                </span>
                <ul className="text-xs text-stone-700 space-y-2 font-medium">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9B0B0B] shrink-0" />
                    <span>100% Traditional small-batch homemade recipes by Valsala Amma</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9B0B0B] shrink-0" />
                    <span>Pure cold-pressed gingelly oil & zero chemical preservatives</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9B0B0B] shrink-0" />
                    <span>Leak-proof hygienic food-grade packaging dispatched across India</span>
                  </li>
                </ul>
              </div>

              {/* Plain-text Facts Row */}
              <div className="py-4 border-t border-b border-[#1C1917]/15 text-xs text-[#1C1917]/80 font-semibold flex flex-wrap items-center gap-x-4 gap-y-1.5">
                <span>No preservatives</span>
                <span>•</span>
                <span>Small batch</span>
                <span>•</span>
                <span>Shelf life: {product.shelfLife}</span>
                <span>•</span>
                <span>Pure gingelly oil</span>
              </div>

              {/* Ingredients List */}
              <div className="space-y-1">
                <h3 className="text-xs uppercase tracking-wider font-extrabold text-[#1C1917]">
                  Ingredients:
                </h3>
                <p className="text-xs text-[#1C1917]/80 leading-relaxed font-medium">
                  {product.ingredients.join(', ')}.
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* You May Also Like Row */}
        <RelatedProducts currentProductId={product.id} products={PRODUCTS} />

      </div>

      {/* Floating WhatsApp Action Button */}
      <a
        href={`https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${encodeURIComponent(
          `Hello Valsala Amma, I would like to order ${product.name} (${selectedSize.size}).`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Valsala Amma on WhatsApp"
        className="fixed right-4 bottom-20 sm:bottom-24 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 sm:w-8 sm:h-8 fill-current"
          aria-hidden="true"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      </a>
    </div>
  );
}
