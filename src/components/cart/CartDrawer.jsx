import React, { useState } from 'react';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';
import { formatINR } from '../../utils/currency.js';
import { SHOP_CONFIG } from '../../config/shop.js';
import CartItem from './CartItem.jsx';
import CheckoutModal from './CheckoutModal.jsx';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    totalItems,
    subtotal,
    shippingFee,
    total
  } = useCart();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isCartOpen) return null;

  const freeShippingThreshold = SHOP_CONFIG.delivery.freeDeliveryThreshold;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-[#221610]/50 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Slide-in Drawer Container */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your Shopping Cart"
        className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#FBF8F1] shadow-2xl flex flex-col border-l border-black/10"
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-black/10 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#221610]" />
            <h3 className="font-display font-extrabold text-xl text-[#221610] uppercase">
              Cart ({totalItems})
            </h3>
          </div>

          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="p-1.5 text-[#221610]/60 hover:text-[#221610] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Note */}
        {cart.length > 0 && (
          <div className="px-5 py-2.5 bg-[#FAD051]/30 border-b border-black/10 text-xs text-[#221610] font-semibold">
            {remainingForFreeShipping === 0 ? (
              <span>Your order qualifies for free delivery across India!</span>
            ) : (
              <span>Add {formatINR(remainingForFreeShipping)} more to get free delivery.</span>
            )}
          </div>
        )}

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto px-5 divide-y divide-black/10">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4 space-y-4">
              <h4 className="font-display text-2xl font-extrabold text-[#221610] uppercase">
                Your cart is empty
              </h4>
              <p className="text-xs text-[#221610]/70 max-w-xs font-medium">
                Explore our small-batch Kerala achars made with cold-pressed oil and roasted spices.
              </p>
              <button
                type="button"
                onClick={closeCart}
                className="rounded-full bg-[#221610] hover:bg-black text-white px-6 py-2.5 text-xs font-bold tracking-wide transition-colors"
              >
                Explore Pickles
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <CartItem
                key={item.cartItemId}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout Action */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-black/10 bg-white space-y-3">
            <div className="space-y-1.5 text-xs font-medium">
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

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full rounded-full bg-[#221610] hover:bg-black text-white py-3.5 px-4 text-xs font-extrabold tracking-wide flex items-center justify-center gap-2 transition-colors uppercase shadow-sm"
              >
                <span>Checkout via WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* Embedded Checkout Form Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        subtotal={subtotal}
        shippingFee={shippingFee}
        total={total}
      />
    </>
  );
}
