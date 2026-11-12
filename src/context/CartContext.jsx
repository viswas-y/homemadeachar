import React, { createContext, useContext, useState, useEffect } from 'react';
import { SHOP_CONFIG } from '../config/shop.js';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem('the_spice_jar_cart') || localStorage.getItem('homemade_achar_cart');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Failed to load cart from localStorage:', e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('the_spice_jar_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cart]);

  // Show a temporary toast
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  /**
   * Add product with specific size to cart
   */
  const addToCart = (product, selectedSize, quantity = 1, openDrawer = false) => {
    const cartItemId = `${product.id}-${selectedSize.size}`;

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.cartItemId === cartItemId);

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        const newItem = {
          cartItemId,
          productId: product.id,
          slug: product.slug,
          name: product.name,
          malayalamName: product.malayalamName,
          image: product.images[0],
          size: selectedSize.size,
          price: selectedSize.price,
          veg: product.veg,
          spiceLevel: product.spiceLevel,
          quantity
        };
        return [...prevCart, newItem];
      }
    });

    showToast(`Added ${quantity} × ${product.name} (${selectedSize.size}) to cart`);

    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  /**
   * Update quantity of an item in cart
   */
  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  /**
   * Remove item from cart
   */
  const removeFromCart = (cartItemId) => {
    setCart(prevCart => prevCart.filter(item => item.cartItemId !== cartItemId));
  };

  /**
   * Clear entire cart
   */
  const clearCart = () => {
    setCart([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(prev => !prev);

  // Computed values
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = subtotal === 0 
    ? 0 
    : subtotal >= SHOP_CONFIG.delivery.freeDeliveryThreshold 
      ? 0 
      : SHOP_CONFIG.delivery.standardShippingFee;
  const total = subtotal + shippingFee;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        totalItems,
        subtotal,
        shippingFee,
        total,
        toastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export default CartContext;
