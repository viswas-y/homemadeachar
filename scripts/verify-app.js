import assert from 'assert';
import { PRODUCTS } from '../src/data/products.js';
import { SHOP_CONFIG } from '../src/config/shop.js';
import { GALLERY_ITEMS } from '../src/data/gallery.js';
import { FAQS } from '../src/data/faqs.js';
import { formatINR } from '../src/utils/currency.js';
import { generateWhatsAppOrderUrl } from '../src/utils/whatsapp.js';
import { buildProductSchema } from '../src/utils/seo.js';
import fs from 'fs';
import path from 'path';

console.log('🧪 Starting Home Made Achar Verification Suite (Real Photography Edition)...\n');

// 1. Verify SHOP_CONFIG
console.log('1️⃣ Checking Shop Configuration...');
assert.strictEqual(SHOP_CONFIG.name, 'Home Made Achar', 'Shop name matches specification');
assert.ok(SHOP_CONFIG.whatsappNumber, 'WhatsApp number is defined');
assert.ok(!SHOP_CONFIG.whatsappNumber.includes('+'), 'WhatsApp number formatted cleanly for wa.me URL');
assert.ok(SHOP_CONFIG.phone, 'Phone number defined');
assert.ok(SHOP_CONFIG.fssaiNumber, 'FSSAI License number defined');
console.log('   ✅ Shop configuration verified.');

// 2. Verify PRODUCTS
console.log('\n2️⃣ Checking Authentic Products with Real Photography...');
assert.strictEqual(PRODUCTS.length, 8, '8 products provided in catalog');

PRODUCTS.forEach(p => {
  assert.ok(p.id, `Product ${p.id} has an id`);
  assert.ok(p.slug, `Product ${p.id} has a slug`);
  assert.ok(p.name, `Product ${p.id} has an English name`);
  assert.ok(p.malayalamName, `Product ${p.id} has a Malayalam name`);
  assert.ok(p.images.length >= 1, `Product ${p.id} has product images`);
  assert.ok(p.sizes.length >= 2, `Product ${p.id} has multiple size options`);
  assert.ok(p.shortDescription, `Product ${p.id} has short description`);
  assert.ok(p.fullDescription, `Product ${p.id} has full description`);
  assert.ok(Array.isArray(p.ingredients) && p.ingredients.length >= 5, `Product ${p.id} has realistic ingredients`);
  assert.ok(p.shelfLife, `Product ${p.id} has shelf life`);
  assert.ok(['mild', 'medium', 'hot'].includes(p.spiceLevel), `Product ${p.id} has valid spice level`);
  assert.strictEqual(typeof p.veg, 'boolean', `Product ${p.id} has boolean veg flag`);
  assert.strictEqual(typeof p.featured, 'boolean', `Product ${p.id} has boolean featured flag`);

  // Verify image files exist on disk and are not broken
  p.images.forEach(imgPath => {
    const fullPath = path.join(process.cwd(), 'public', imgPath);
    assert.ok(fs.existsSync(fullPath), `Asset exists on disk: ${imgPath}`);
    assert.ok(fs.statSync(fullPath).size > 1000, `Asset has valid file size: ${imgPath}`);
  });
});
console.log('   ✅ All 8 products validated with real photo assets and complete schema.');

// 3. Verify Currency Formatter
console.log('\n3️⃣ Checking Currency Formatter...');
const formatted150 = formatINR(150);
assert.ok(formatted150.includes('₹'), 'Includes Rupee symbol (₹)');
assert.ok(formatted150.includes('150'), 'Includes numeric amount');
console.log(`   ✅ 150 formatted as ${formatted150}`);

// 4. Verify WhatsApp Order Generator
console.log('\n4️⃣ Checking WhatsApp URL Generator...');
const mockItems = [
  { name: 'Mango Pickle', size: '250g', price: 160, quantity: 2 },
  { name: 'Green Chilli Pickle', size: '500g', price: 280, quantity: 1 }
];
const waUrl = generateWhatsAppOrderUrl({
  items: mockItems,
  subtotal: 600,
  shippingFee: 50,
  total: 650,
  customer: {
    name: 'Lakshmi Nair',
    phone: '9847012345',
    address: 'Wandoor, Nilambur Road',
    pincode: '679328',
    note: 'Extra spicy please'
  }
});

assert.ok(waUrl.startsWith(`https://wa.me/${SHOP_CONFIG.whatsappNumber}`), 'Points to configured shop WhatsApp number');
assert.ok(waUrl.includes(encodeURIComponent('Mango Pickle')), 'Includes item name in encoded message');
assert.ok(waUrl.includes(encodeURIComponent('Lakshmi Nair')), 'Includes customer name');
assert.ok(waUrl.includes(encodeURIComponent('679328')), 'Includes pincode');
assert.ok(waUrl.includes(encodeURIComponent('650')), 'Includes grand total');
console.log('   ✅ WhatsApp URL correctly structured and encoded.');

// 5. Verify Gallery Items & FAQs
console.log('\n5️⃣ Checking Gallery & FAQs...');
assert.strictEqual(GALLERY_ITEMS.length, 6, '6 gallery items for kitchen process');
assert.strictEqual(FAQS.length, 7, 'All 7 mandatory questions present in FAQ');
console.log('   ✅ Gallery and FAQs verified.');

// 6. Verify SEO & Schema Builder
console.log('\n6️⃣ Checking SEO & JSON-LD Structured Data...');
const schema = buildProductSchema(PRODUCTS[0]);
assert.strictEqual(schema['@type'], 'Product', 'Schema is Product type');
assert.strictEqual(schema.brand.name, SHOP_CONFIG.name, 'Brand matches shop name');
assert.ok(schema.offers.lowPrice > 0, 'Offers lowPrice is present');
console.log('   ✅ JSON-LD schema builder verified.');

// 7. Verify Showcase Section Assets
console.log('\n7️⃣ Checking Showcase Section Photography...');
const sectionAssets = [
  '/images/sections/ingredient-mangoes.jpg',
  '/images/sections/ingredient-spices.jpg',
  '/images/sections/ingredient-curry-leaves.jpg',
  '/images/sections/spotlight-flatlay.jpg',
  '/images/sections/spotlight-bowl.jpg'
];
sectionAssets.forEach(imgPath => {
  const fullPath = path.join(process.cwd(), 'public', imgPath);
  assert.ok(fs.existsSync(fullPath), `Section asset exists on disk: ${imgPath}`);
  assert.ok(fs.statSync(fullPath).size > 10000, `Section asset is valid photo: ${imgPath}`);
});
console.log('   ✅ All 5 showcase section photos verified.');

console.log('\n🎉 ALL CHECKS PASSED SUCCESSFULLY! The application is production-ready with real photography.\n');
