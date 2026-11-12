/**
 * Formats numbers into Indian Rupee currency format (₹).
 * @param {number} amount - Price in INR
 * @returns {string} - Formatted currency string (e.g., "₹250")
 */
export function formatINR(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '₹0';
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  }).format(amount);
}

export default formatINR;

