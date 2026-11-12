import { SHOP_CONFIG } from '../config/shop.js';
import { formatINR } from './currency.js';

/**
 * Generates a clean, structured WhatsApp order message and returns a wa.me URL.
 * 
 * @param {Object} params
 * @param {Array} params.items - Array of cart items
 * @param {number} params.subtotal - Cart subtotal in INR
 * @param {number} params.shippingFee - Shipping fee in INR
 * @param {number} params.total - Grand total in INR
 * @param {Object} params.customer - Customer details { name, phone, address, pincode, note }
 * @returns {string} - wa.me direct URL
 */
export function generateWhatsAppOrderUrl({ items, subtotal, shippingFee, total, customer }) {
  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const lines = [
    `*NEW ORDER — ${SHOP_CONFIG.name.toUpperCase()}*`,
    `Date: ${dateStr}`,
    ``,
    `*CUSTOMER DETAILS:*`,
    `Name: ${customer.name || 'Not provided'}`,
    `Phone: ${customer.phone || 'Not provided'}`,
    `Delivery Address:`,
    `${customer.address || ''}`,
    `PIN Code: ${customer.pincode || ''}`,
    customer.note ? `Note: ${customer.note}` : null,
    ``,
    `*ORDER SUMMARY:*`,
    ...items.map((item, index) => {
      const itemTotal = item.price * item.quantity;
      return `${index + 1}. *${item.name}* (${item.size})\n   Qty: ${item.quantity} × ${formatINR(item.price)} = *${formatINR(itemTotal)}*`;
    }),
    ``,
    `--------------------------`,
    `Subtotal: ${formatINR(subtotal)}`,
    shippingFee === 0 ? `Delivery: FREE Shipping` : `Delivery: ${formatINR(shippingFee)}`,
    `*TOTAL PAYABLE: ${formatINR(total)}*`,
    `--------------------------`,
    ``,
    `Please share your UPI QR code / payment link to confirm this order. Thank you.`
  ].filter(line => line !== null);

  const fullMessage = lines.join('\n');
  const encodedMessage = encodeURIComponent(fullMessage);
  
  return `https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${encodedMessage}`;
}

export default generateWhatsAppOrderUrl;
