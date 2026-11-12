# Home Made Achar (ഹോം മെയ്ഡ് അച്ചാർ) 

> **Homemade Kerala Achar, Made in Small Batches.**
> A modern, color-blocked, editorial food brand website for an authentic homemade Kerala pickle kitchen run by a mother from her home.

---

## 🎨 Design System & Aesthetic

Inspired by bold, playful, modern food brand identities (flat solid colour bands, organic blob shapes, tall arch-shaped product cards, clean editorial typography):

- **Light Theme Only:** Clean, daylight palette with zero dark mode and no text gradients.
- **Flat Solid Colour-Blocked Sections:**
  - **Hero:** Turmeric Yellow (`#F4B436`) with soft organic blobs.
  - **Products:** Chilli Red/Orange (`#E24A2B`) with pastel-arched cards.
  - **Gallery:** Banana-leaf Green (`#2E744E`) showing the authentic process.
  - **About:** Pale Lime (`#DEEAB8`) with Amma's kitchen story.
  - **FAQ:** Warm Off-white (`#FAF7F2`) with 1px dividing lines.
  - **Footer:** Deep Leaf Green (`#173A27`) with minimal contact info.
- **Hero Jar Row Carousel:** Centred serif headline (*"Taste Amma's Kitchen"*), short subline, and a row of 6 achar jars standing side-by-side that gently auto-slides on desktop, swipes horizontally on mobile, and pauses on hover/reduced motion.
- **Arch-Shaped Product Cards:** Tall pastel arch/pill backdrop behind each jar photo (mango yellow, lime green, garlic pink, ginger apricot, baby mango rose, seafood blush, and gooseberry green), with names, prices, and small black pill buttons.
- **Minimal Header:** Centred logo and Malayalam title, links split cleanly between left and right, and black pill cart button.
- **Consistent Buttons:** Black pill shape (`rounded-full bg-black text-white text-xs`) across all cards, drawers, and checkout modals.
- **Editorial Typography:** Expressive serif headline font (**Fraunces** + **Noto Serif Malayalam**) paired with a clean body sans (**DM Sans** + **Noto Sans Malayalam**).

---

## 🚀 Quick Start

### 1. Installation
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
```

---

## 🛠️ How to Customize

- **Shop Info & WhatsApp:** Edit [`src/config/shop.js`](file:///c:/Users/ambad/OneDrive/Desktop/homemade_pickles/src/config/shop.js).
- **Pickle Catalog:** Edit [`src/data/products.js`](file:///c:/Users/ambad/OneDrive/Desktop/homemade_pickles/src/data/products.js).
- **Photos:** Place jar photos in `public/images/products/` and kitchen photos in `public/images/gallery/`.
- **WhatsApp Order Flow:** Formats order details and opens `https://wa.me/{number}` directly.

---

## 🚢 Deployment

- **Vercel:** Connect repository on [vercel.com](https://vercel.com). Pre-configured with `vercel.json` rewrites for SPA routing.
- **Netlify:** Connect repository on [netlify.com](https://netlify.com). `public/_redirects` is already included.
