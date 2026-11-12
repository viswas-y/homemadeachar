import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import Header from './components/common/Header.jsx';
import Footer from './components/common/Footer.jsx';
import CartDrawer from './components/cart/CartDrawer.jsx';
import Toast from './components/common/Toast.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import CartPage from './pages/CartPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-[#F7F7F5] text-[#1C1917] selection:bg-[#146B2E] selection:text-white font-sans">
          {/* Header (Minimal, centred logo, split links, right cart) */}
          <Header />

          {/* Main Page Content */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:slug" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          {/* Footer (Flat deep leaf green) */}
          <Footer />

          {/* Global Overlays */}
          <CartDrawer />
          <Toast />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}
