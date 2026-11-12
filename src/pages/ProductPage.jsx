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
          className="mt-6 rounded-full bg-[#16692B] hover:bg-[#115221] text-white px-6 py-2.5 text-xs font-bold tracking-wide"
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
    <div className="py-6 sm:py-10 px-3 sm:px-6 lg:px-8 text-[#1C1917]">
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
                          ? 'border-[#146B2E] ring-2 ring-[#146B2E]'
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
                <span className="text-xs font-bold text-[#146B2E] uppercase tracking-widest block">
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
                            ? 'bg-[#146B2E] text-white border-[#146B2E]'
                            : 'bg-[#F7F7F5] text-[#1C1917] border-stone-200 hover:bg-[#EDF5EE] hover:border-[#146B2E]/40'
                        }`}
                      >
                        {s.size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-wider font-extrabold text-[#1C1917]">
                  Quantity:
                </label>
                <div className="inline-flex items-center rounded-full border border-black/15 bg-white px-2 py-0.5">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                    className="p-1.5 hover:bg-stone-100 rounded-full text-[#1C1917] transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center text-xs font-extrabold text-[#1C1917]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                    className="p-1.5 hover:bg-stone-100 rounded-full text-[#1C1917] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons: Add to Cart and Buy Now */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full sm:w-auto rounded-full bg-[#16692B] hover:bg-[#115221] text-white px-8 py-3.5 text-xs font-bold tracking-wide transition-colors"
                >
                  Add to cart
                </button>
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full sm:w-auto rounded-full bg-white hover:bg-stone-100 text-[#1C1917] border border-black/15 px-8 py-3.5 text-xs font-bold tracking-wide transition-colors"
                >
                  Buy now ({formatINR(currentPrice)})
                </button>
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
    </div>
  );
}
