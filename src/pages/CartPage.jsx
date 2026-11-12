import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, Plus, Minus, ArrowRight, Check } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { formatINR } from '../utils/currency.js';
import { SHOP_CONFIG } from '../config/shop.js';
import { generateWhatsAppOrderUrl } from '../utils/whatsapp.js';
import { useSEO } from '../utils/seo.js';

export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    subtotal,
    shippingFee,
    total
  } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    pincode: '',
    note: ''
  });

  const [errors, setErrors] = useState({});
  const [orderSent, setOrderSent] = useState(false);
  const [placedSnapshot, setPlacedSnapshot] = useState(null);

  useSEO({
    title: 'Shopping Cart',
    description: 'Review your homemade pickle order and place directly on WhatsApp.'
  });

  const freeShippingThreshold = SHOP_CONFIG.delivery.freeDeliveryThreshold;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name';
    if (!formData.phone.trim()) {
      errs.phone = 'Please provide your WhatsApp number';
    } else if (!/^[0-9+ -]{10,14}$/.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid 10-digit number';
    }
    if (!formData.address.trim()) errs.address = 'Please enter complete address';
    if (!formData.pincode.trim()) {
      errs.pincode = 'Please enter PIN code';
    } else if (!/^[0-9]{6}$/.test(formData.pincode.trim())) {
      errs.pincode = 'Please enter a valid 6-digit PIN code';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const waUrl = generateWhatsAppOrderUrl({
      items: cart,
      subtotal,
      shippingFee,
      total,
      customer: formData
    });

    setPlacedSnapshot({
      customer: { ...formData },
      total,
      itemCount: cart.length
    });

    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setOrderSent(true);
  };

  return (
    <div className="py-8 sm:py-14 px-3 sm:px-6 lg:px-8 text-[#221610] min-h-[75vh]">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Back Link */}
        <div>
          <Link
            to="/#products"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#221610]/70 hover:text-[#221610]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Continue Shopping
          </Link>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#221610] mt-1">
            Your Cart
          </h1>
        </div>

        {cart.length === 0 && !orderSent ? (
          <div className="rounded-[28px] sm:rounded-[36px] bg-[#FAD051] p-12 sm:p-16 text-center max-w-lg mx-auto shadow-xs my-8 space-y-4">
            <h2 className="font-display text-3xl font-extrabold text-[#221610] uppercase">
              Your cart is empty
            </h2>
            <p className="text-xs sm:text-sm text-[#221610]/80 font-medium max-w-xs mx-auto">
              Choose from our authentic small-batch Kerala achars made with cold-pressed oil and roasted spices.
            </p>
            <Link
              to="/#products"
              className="inline-block rounded-full bg-[#221610] hover:bg-black text-white px-7 py-3 text-xs font-extrabold uppercase tracking-wide transition-colors"
            >
              Explore Pickles
            </Link>
          </div>
        ) : orderSent ? (
          <div className="rounded-[28px] sm:rounded-[36px] bg-[#FAD051] p-10 sm:p-14 text-center max-w-lg mx-auto shadow-xs space-y-4">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mx-auto text-[#221610]">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#221610]/70 block">
                ORDER DISPATCHED
              </span>
              <h2 className="font-display text-3xl font-extrabold text-[#221610] uppercase mt-1">
                Thank You, {placedSnapshot?.customer?.name}
              </h2>
              <p className="text-xs text-[#221610]/80 font-medium mt-2 leading-relaxed max-w-sm mx-auto">
                Your order has opened in WhatsApp. Please tap "Send" in WhatsApp so Valsala Amma receives your message.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 text-left text-xs text-[#221610] space-y-1.5 border border-black/5 font-medium">
              <div className="flex justify-between font-extrabold text-sm">
                <span>Total Amount:</span>
                <span className="font-display">{formatINR(placedSnapshot?.total)}</span>
              </div>
              <div className="flex justify-between">
                <span>Address:</span>
                <span className="truncate max-w-[200px]">{placedSnapshot?.customer?.address}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <Link
                to="/"
                onClick={clearCart}
                className="rounded-full bg-[#221610] hover:bg-black text-white px-7 py-3 text-xs font-extrabold uppercase tracking-wide transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
            {/* Left 7 Cols: Items List */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Free delivery prompt */}
              <div className="p-4 rounded-2xl bg-[#FAD051]/30 border border-[#FAD051] text-xs text-[#221610] font-bold flex items-center justify-between">
                <span>
                  {remainingForFreeShipping === 0 ? (
                    'Your order qualifies for free delivery across India!'
                  ) : (
                    <>Add {formatINR(remainingForFreeShipping)} more for free delivery.</>
                  )}
                </span>
                <span className="text-[11px] font-medium text-[#221610]/60">Threshold: {formatINR(freeShippingThreshold)}</span>
              </div>

              {/* Items Card */}
              <div className="bg-white rounded-3xl border border-black/5 p-6 divide-y divide-black/10 shadow-xs">
                <div className="pb-3 flex justify-between items-center text-xs font-extrabold uppercase tracking-wider text-[#221610]/60">
                  <span>Selected Jars ({totalItems})</span>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-[#221610]/40 hover:text-[#221610] transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                {cart.map((item) => (
                  <div key={item.cartItemId} className="py-4 flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl bg-stone-100 p-1 border border-black/10 object-cover flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-extrabold text-[#221610]/50 uppercase tracking-wider block">
                        {item.size}
                      </span>
                      <h3 className="font-display font-bold text-base text-[#221610] truncate">
                        {item.name}
                      </h3>
                      <p className="text-xs text-[#221610]/70 font-semibold mt-0.5">
                        {formatINR(item.price)} each
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <div className="inline-flex items-center rounded-full border border-black/15 bg-stone-50 px-1.5 py-0.5">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            className="p-1 hover:bg-stone-200 rounded-full text-[#221610]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-extrabold text-[#221610]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            className="p-1 hover:bg-stone-200 rounded-full text-[#221610]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="p-1 text-[#221610]/40 hover:text-[#221610] transition-colors ml-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-display font-extrabold text-base text-[#221610]">
                        {formatINR(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 5 Cols: Checkout Address Form & Summary */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-3xl border border-black/5 p-6 sm:p-7 shadow-xs">
                
                <h3 className="font-display font-extrabold text-2xl text-[#221610] uppercase mb-1">
                  Delivery Details
                </h3>
                <p className="text-xs text-[#221610]/70 font-medium mb-5">
                  Confirm your address. We'll generate your WhatsApp order instantly.
                </p>

                <form onSubmit={handlePlaceOrder} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-extrabold text-[#221610] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Varma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-black/15 text-xs text-[#221610] bg-[#FBF8F1] focus:bg-white focus:border-[#221610]"
                    />
                    {errors.name && <p className="text-xs text-red-600 mt-1 font-semibold">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-extrabold text-[#221610] mb-1">
                      WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 9847012345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-black/15 text-xs text-[#221610] bg-[#FBF8F1] focus:bg-white focus:border-[#221610]"
                    />
                    {errors.phone && <p className="text-xs text-red-600 mt-1 font-semibold">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-extrabold text-[#221610] mb-1">
                      Delivery Address *
                    </label>
                    <textarea
                      rows="2"
                      placeholder="House/Flat No., Street, City & State"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-black/15 text-xs text-[#221610] bg-[#FBF8F1] focus:bg-white focus:border-[#221610]"
                    />
                    {errors.address && <p className="text-xs text-red-600 mt-1 font-semibold">{errors.address}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-extrabold text-[#221610] mb-1">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        maxLength="6"
                        placeholder="e.g. 682021"
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-black/15 text-xs text-[#221610] bg-[#FBF8F1] focus:bg-white focus:border-[#221610]"
                      />
                      {errors.pincode && <p className="text-xs text-red-600 mt-1 font-semibold">{errors.pincode}</p>}
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider font-extrabold text-[#221610] mb-1">
                        Note
                      </label>
                      <input
                        type="text"
                        placeholder="Optional"
                        value={formData.note}
                        onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-black/15 text-xs text-[#221610] bg-[#FBF8F1] focus:bg-white focus:border-[#221610]"
                      />
                    </div>
                  </div>

                  {/* Summary Totals */}
                  <div className="pt-3 border-t border-black/10 space-y-1.5 text-xs font-medium">
                    <div className="flex justify-between text-[#221610]/70">
                      <span>Subtotal</span>
                      <span className="font-bold text-[#221610]">{formatINR(subtotal)}</span>
                    </div>

                    <div className="flex justify-between text-[#221610]/70">
                      <span>Delivery</span>
                      <span className="font-bold text-[#221610]">
                        {shippingFee === 0 ? 'Free' : formatINR(shippingFee)}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-black/10 flex justify-between items-baseline">
                      <span className="font-display font-extrabold text-base text-[#221610] uppercase">
                        Total
                      </span>
                      <span className="font-display font-extrabold text-2xl text-[#221610]">
                        {formatINR(total)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-[#221610] hover:bg-black text-white py-3.5 px-6 text-xs font-extrabold uppercase tracking-wide flex items-center justify-center gap-2 transition-colors mt-2 shadow-sm"
                  >
                    <span>Place Order on WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
