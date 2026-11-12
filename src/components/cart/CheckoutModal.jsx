import React, { useState } from 'react';
import { X, ArrowRight, Check } from 'lucide-react';
import { SHOP_CONFIG } from '../../config/shop.js';
import { generateWhatsAppOrderUrl } from '../../utils/whatsapp.js';
import { formatINR } from '../../utils/currency.js';

export default function CheckoutModal({ items, subtotal, shippingFee, total, isOpen, onClose }) {
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

  if (!isOpen) return null;

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const waUrl = generateWhatsAppOrderUrl({
      items,
      subtotal,
      shippingFee,
      total,
      customer: formData
    });

    setPlacedSnapshot({
      customer: { ...formData },
      total,
      itemCount: items.length
    });

    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setOrderSent(true);
  };

  const handleClose = () => {
    setOrderSent(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#221610]/60 backdrop-blur-xs p-4"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl border border-black/10 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close checkout"
          className="absolute top-6 right-6 p-1 text-[#221610]/40 hover:text-[#221610] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!orderSent ? (
          <div>
            <div className="mb-6">
              <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#221610]/60 block mb-1">
                KITCHEN DIRECT ORDER
              </span>
              <h3 id="checkout-modal-title" className="font-display font-extrabold text-2xl sm:text-3xl text-[#221610] uppercase">
                DELIVERY DETAILS
              </h3>
              <p className="text-xs text-[#221610]/70 mt-1 font-medium">
                Enter your address. Your order summary will open in WhatsApp with Valsala Amma.
              </p>
            </div>

            <div className="p-4 mb-6 rounded-2xl bg-[#FAD051]/30 border border-[#FAD051] flex items-center justify-between text-xs">
              <div>
                <span className="font-extrabold text-[#221610] block">
                  {items.length} {items.length === 1 ? 'jar' : 'jars'} selected
                </span>
                <span className="text-[#221610]/70 font-semibold">
                  {shippingFee === 0 ? 'Free Shipping Included' : `Shipping: ${formatINR(shippingFee)}`}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-[#221610]/60 block">Total:</span>
                <span className="font-display font-extrabold text-xl text-[#221610]">
                  {formatINR(total)}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-extrabold text-[#221610] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Maya Nair"
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
                  placeholder="House/Flat No., Street, Landmark, City & State"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-black/15 text-xs text-[#221610] bg-[#FBF8F1] focus:bg-white focus:border-[#221610]"
                ></textarea>
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
                    Special Note
                  </label>
                  <input
                    type="text"
                    placeholder="Optional note"
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-black/15 text-xs text-[#221610] bg-[#FBF8F1] focus:bg-white focus:border-[#221610]"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full rounded-full bg-[#221610] hover:bg-black text-white py-3.5 px-6 text-xs font-extrabold uppercase tracking-wide flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <span>Place Order on WhatsApp ({formatINR(total)})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Order Placed Success Confirmation */
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#FAD051] flex items-center justify-center mx-auto text-[#221610]">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#221610]/60 block">
                ORDER DISPATCHED TO WHATSAPP
              </span>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#221610] uppercase mt-1">
                Thank You, {placedSnapshot?.customer?.name}!
              </h3>
              <p className="text-xs text-[#221610]/70 max-w-sm mx-auto mt-2 leading-relaxed font-medium">
                Your order message has opened in WhatsApp. Please press "Send" in WhatsApp so Valsala Amma receives your order.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FBF8F1] border border-black/10 text-left text-xs text-[#221610] space-y-1.5 max-w-sm mx-auto font-medium">
              <div className="flex justify-between font-extrabold text-sm">
                <span>Total Payable:</span>
                <span className="font-display">{formatINR(placedSnapshot?.total)}</span>
              </div>
              <div className="flex justify-between">
                <span>Address:</span>
                <span className="truncate max-w-[200px]">{placedSnapshot?.customer?.address}</span>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="rounded-full bg-[#221610] hover:bg-black text-white px-7 py-3 text-xs font-extrabold uppercase tracking-wide transition-colors"
              >
                Back to Shop
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
