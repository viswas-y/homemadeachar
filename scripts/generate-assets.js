import fs from 'fs';
import path from 'path';

const publicDir = path.resolve('public');
const imgDir = path.join(publicDir, 'images');
const prodDir = path.join(imgDir, 'products');
const gallDir = path.join(imgDir, 'gallery');

[publicDir, imgDir, prodDir, gallDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Helper to create an SVG jar graphic
function createJarSvg({ title, malTitle, color, accentColor, spiceColor, jarType, detailText }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#FFFDF9"/>
      <stop offset="100%" stop-color="#EFE8D8"/>
    </radialGradient>
    <linearGradient id="jarGlass" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FAFAFA" stop-opacity="0.9"/>
      <stop offset="15%" stop-color="#FFFFFF" stop-opacity="0.3"/>
      <stop offset="85%" stop-color="#FFFFFF" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#D1D5DB" stop-opacity="0.8"/>
    </linearGradient>
    <linearGradient id="pickleOil" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.85"/>
      <stop offset="25%" stop-color="${color}"/>
      <stop offset="100%" stop-color="${spiceColor}"/>
    </linearGradient>
    <linearGradient id="lidWood" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#6B4226"/>
      <stop offset="50%" stop-color="#8B5A2B"/>
      <stop offset="100%" stop-color="#543118"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#1A2E20" flood-opacity="0.18"/>
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="600" height="600" rx="24" fill="url(#bgGlow)"/>
  
  <!-- Subtle Banana Leaf / Traditional Motif in Background -->
  <path d="M50,550 Q200,450 300,560 Q450,480 550,550 L550,600 L50,600 Z" fill="#E2EBE5" opacity="0.6"/>
  <circle cx="100" cy="120" r="60" fill="#F4EAD4" opacity="0.5"/>
  <circle cx="500" cy="160" r="80" fill="#F4EAD4" opacity="0.4"/>

  <!-- Shadow below Jar -->
  <ellipse cx="300" cy="510" rx="140" ry="24" fill="#000000" opacity="0.15"/>

  <!-- Main Jar Body Group -->
  <g filter="url(#shadow)">
    <!-- Jar Glass / Bharani Outer -->
    <path d="M200,190 L400,190 Q420,190 425,215 L430,460 Q430,490 390,495 L210,495 Q170,490 170,460 L175,215 Q180,190 200,190 Z" 
          fill="url(#pickleOil)"/>
    
    <!-- Floating Spices & Seeds Layer -->
    <circle cx="230" cy="280" r="7" fill="#1C1917" opacity="0.75"/>
    <circle cx="260" cy="340" r="5" fill="#1C1917" opacity="0.8"/>
    <circle cx="340" cy="300" r="6" fill="#1C1917" opacity="0.7"/>
    <circle cx="370" cy="410" r="8" fill="#1C1917" opacity="0.75"/>
    <circle cx="290" cy="430" r="6" fill="#1C1917" opacity="0.65"/>
    <circle cx="320" cy="450" r="5" fill="#1C1917" opacity="0.8"/>
    <!-- Curry Leaf Motif -->
    <path d="M220,380 Q250,370 280,390 Q250,405 220,380 Z" fill="#2D5A38" opacity="0.85"/>
    <path d="M330,350 Q360,335 385,360 Q355,370 330,350 Z" fill="#244B2E" opacity="0.85"/>

    <!-- Glass Overlay Shine -->
    <path d="M200,190 L400,190 Q420,190 425,215 L430,460 Q430,490 390,495 L210,495 Q170,490 170,460 L175,215 Q180,190 200,190 Z" 
          fill="url(#jarGlass)"/>
    
    <!-- Vertical glass reflection highlight -->
    <path d="M200,210 L230,210 L220,470 L195,470 Z" fill="#FFFFFF" opacity="0.35"/>

    <!-- Artisanal Kraft Label -->
    <g transform="translate(195, 270)">
      <rect width="210" height="150" rx="8" fill="#FBF7EE" stroke="#D19B53" stroke-width="2"/>
      <rect x="6" y="6" width="198" height="138" rx="6" fill="none" stroke="#E6D3B3" stroke-dasharray="4,4"/>
      
      <!-- Label Header -->
      <text x="105" y="32" font-family="'Nunito', sans-serif" font-size="11" font-weight="700" letter-spacing="2" fill="#8C531B" text-anchor="middle">HOME MADE ACHAR</text>
      <line x1="30" y1="40" x2="180" y2="40" stroke="#E5A93C" stroke-width="1.5"/>
      
      <!-- Malayalam & English Name -->
      <text x="105" y="68" font-family="'Baloo Chettan 2', sans-serif" font-size="20" font-weight="800" fill="#1E392B" text-anchor="middle">${malTitle}</text>
      <text x="105" y="90" font-family="'Nunito', sans-serif" font-size="14" font-weight="800" fill="#991B1B" text-anchor="middle">${title}</text>
      
      <!-- Seal badge -->
      <circle cx="105" cy="118" r="16" fill="#1E392B"/>
      <text x="105" y="122" font-family="'Nunito', sans-serif" font-size="8" font-weight="800" fill="#FAF6EE" text-anchor="middle">HOMEMADE</text>
      
      <text x="30" y="125" font-family="'Nunito', sans-serif" font-size="9" font-weight="700" fill="#6B7280">SMALL BATCH</text>
      <text x="180" y="125" font-family="'Nunito', sans-serif" font-size="9" font-weight="700" fill="#6B7280" text-anchor="end">KERALA</text>
    </g>

    <!-- Traditional Jar Neck & Cloth Tie (Thuni Kettu) -->
    <rect x="235" y="165" width="130" height="28" rx="4" fill="#EBE4D5" stroke="#C5B69F" stroke-width="2"/>
    <!-- Red/Yellow Traditional Cotton Cloth Tied Lid -->
    <path d="M210,165 Q300,140 390,165 Q405,178 385,185 L215,185 Q195,178 210,165 Z" fill="#B91C1C"/>
    <ellipse cx="300" cy="155" rx="85" ry="16" fill="#DC2626"/>
    <!-- Golden Twine / Coir Cord -->
    <path d="M215,178 C250,183 350,183 385,178" stroke="#FBBF24" stroke-width="5" stroke-linecap="round" fill="none"/>
    <circle cx="300" cy="180" r="5" fill="#D97706"/>
    <!-- Twine Knot & Tassels -->
    <path d="M300,180 Q315,200 325,225 M300,180 Q290,205 285,228" stroke="#D97706" stroke-width="3" stroke-linecap="round" fill="none"/>
  </g>

  <!-- Detail Subtext / Angle Indicator -->
  <text x="300" y="555" font-family="'Nunito', sans-serif" font-size="13" font-weight="600" fill="#665E55" text-anchor="middle">${detailText || 'Traditional Kerala Recipe • Handcrafted'}</text>
</svg>`;
}

// Generate 8 products x 3 image angles each
const products = [
  { slug: 'manga-achar', name: 'Manga Achar', mal: 'മാങ്ങ അച്ചാർ', color: '#B91C1C', accent: '#F59E0B', spice: '#7F1D1D' },
  { slug: 'naranga-achar', name: 'Naranga Achar', mal: 'നാരങ്ങ അച്ചാർ', color: '#D97706', accent: '#FBBF24', spice: '#92400E' },
  { slug: 'veluthulli-achar', name: 'Veluthulli Achar', mal: 'വെളുത്തുള്ളി അച്ചാർ', color: '#991B1B', accent: '#EA580C', spice: '#450A0A' },
  { slug: 'inji-achar', name: 'Inji Achar (Puli Inji)', mal: 'ഇഞ്ചി അച്ചാർ', color: '#78350F', accent: '#B45309', spice: '#451A03' },
  { slug: 'kadumanga', name: 'Kadumanga', mal: 'കടുമാങ്ങ', color: '#DC2626', accent: '#F87171', spice: '#881337' },
  { slug: 'meen-achar', name: 'Meen Achar', mal: 'മീൻ അച്ചാർ', color: '#9A3412', accent: '#FB923C', spice: '#431407' },
  { slug: 'chemmeen-achar', name: 'Chemmeen Achar', mal: 'ചെമ്മീൻ അച്ചാർ', color: '#C2410C', accent: '#F97316', spice: '#7C2D12' },
  { slug: 'nellika-achar', name: 'Nellika Achar', mal: 'നെല്ലിക്ക അച്ചാർ', color: '#65A30D', accent: '#A3E635', spice: '#3F6212' },
];

products.forEach(p => {
  const angles = [
    { num: 1, text: 'Front View • Sealed Traditional Bharani Jar' },
    { num: 2, text: 'Detailed Texture • Spices & Cold-Pressed Sesame Oil' },
    { num: 3, text: 'Packaging & Ingredients • Airtight Leak-Proof Seal' }
  ];

  angles.forEach(a => {
    const filename = `${p.slug}-${a.num}.svg`;
    const svgContent = createJarSvg({
      title: p.name,
      malTitle: p.mal,
      color: p.color,
      accentColor: p.accent,
      spiceColor: p.spice,
      detailText: a.text
    });
    fs.writeFileSync(path.join(prodDir, filename), svgContent);
  });
});

console.log('✅ Generated 24 product images (8 products x 3 views)');

// Gallery Process SVGs
const galleryScenes = [
  {
    name: 'cutting-mangoes.svg',
    title: 'Hand-dicing Country Mangoes',
    subtitle: 'Harvested fresh at dawn & knife-cut by hand',
    bg: '#3B7A57',
    icon: '🥭',
    desc: 'Each raw mango is inspected, wiped dry, and cubed into bite-sized pieces.'
  },
  {
    name: 'sun-drying.svg',
    title: 'Sun-curing on Terrace',
    subtitle: 'Golden afternoon heat & sea salt brine',
    bg: '#D97706',
    icon: '☀️',
    desc: 'Spread evenly on unbleached cotton sheets to release natural juices.'
  },
  {
    name: 'cooking-uruli.svg',
    title: 'Slow Tempering in Bronze Uruli',
    subtitle: 'Cold-pressed gingelly oil & heirloom spices',
    bg: '#991B1B',
    icon: '🥘',
    desc: 'Mustard seeds crackle and roasted fenugreek releases earthy fragrance.'
  },
  {
    name: 'bharani-aging.svg',
    title: 'Aging in Earthenware Bharani',
    subtitle: 'Ceramic clay pots tied with muslin cloth',
    bg: '#78350F',
    icon: '🏺',
    desc: 'Preserves the authentic vintage tang and develops complex flavours.'
  },
  {
    name: 'packing-jars.svg',
    title: 'Meticulous Hand-packing',
    subtitle: 'Layered with spiced oil for natural preservation',
    bg: '#1E392B',
    icon: '✨',
    desc: 'Zero chemical stabilizers. Every jar is filled and weighed by Amma.'
  },
  {
    name: 'ready-to-ship.svg',
    title: 'Securely Cushion-Packed',
    subtitle: 'Vacuum sealed for leak-free courier transit',
    bg: '#A16207',
    icon: '📦',
    desc: 'Corrugated cartons, bubble wrap and shrink safety bands protect every jar.'
  }
];

galleryScenes.forEach(g => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
    <defs>
      <linearGradient id="bg-${g.name}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${g.bg}"/>
        <stop offset="100%" stop-color="#141E18"/>
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="url(#bg-${g.name})"/>
    
    <!-- Warm textured grid overlay -->
    <circle cx="700" cy="100" r="250" fill="#FFFFFF" opacity="0.04"/>
    <circle cx="100" cy="500" r="200" fill="#FFFFFF" opacity="0.04"/>
    
    <!-- Kitchen Illustration Badge -->
    <g transform="translate(400, 240)">
      <circle cx="0" cy="0" r="100" fill="#FFFFFF" opacity="0.12"/>
      <circle cx="0" cy="0" r="85" fill="#FAF6EE" stroke="#E5A93C" stroke-width="4"/>
      <text x="0" y="24" font-size="70" text-anchor="middle">${g.icon}</text>
    </g>

    <!-- Text Captions -->
    <text x="400" y="410" font-family="'Baloo Chettan 2', sans-serif" font-size="34" font-weight="800" fill="#FAF6EE" text-anchor="middle">${g.title}</text>
    <text x="400" y="450" font-family="'Nunito', sans-serif" font-size="18" font-weight="700" fill="#FDE68A" text-anchor="middle">${g.subtitle}</text>
    <text x="400" y="490" font-family="'Nunito', sans-serif" font-size="15" font-weight="400" fill="#E2E8F0" text-anchor="middle">${g.desc}</text>
    
    <!-- Handcrafted stamp -->
    <rect x="50" y="50" width="180" height="36" rx="18" fill="#FAF6EE" opacity="0.2"/>
    <text x="140" y="73" font-family="'Nunito', sans-serif" font-size="12" font-weight="800" letter-spacing="2" fill="#FAF6EE" text-anchor="middle">KITCHEN PROCESS</text>
  </svg>`;
  fs.writeFileSync(path.join(gallDir, g.name), svg);
});
console.log('✅ Generated 6 kitchen gallery images');

// About Maker Portrait SVG
const aboutAmmaSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 700" width="100%" height="100%">
  <defs>
    <linearGradient id="bgAmma" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FAF6EE"/>
      <stop offset="100%" stop-color="#EBE3D3"/>
    </linearGradient>
    <filter id="photoShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="14" flood-color="#1E392B" flood-opacity="0.2"/>
    </filter>
  </defs>

  <rect width="600" height="700" fill="url(#bgAmma)"/>
  
  <!-- Polaroid / Framed Card with Warm tape -->
  <g transform="translate(50, 40)" filter="url(#photoShadow)">
    <rect width="500" height="600" rx="12" fill="#FFFFFF"/>
    
    <!-- Kitchen Scene Photo Area -->
    <rect x="25" y="25" width="450" height="430" rx="8" fill="#244B35"/>
    <circle cx="250" cy="200" r="140" fill="#3D7858"/>
    
    <!-- Illustrated Mother (Amma) silhouette with Kasavu Saree -->
    <!-- Kasavu Gold Border -->
    <path d="M120,455 C150,330 200,310 250,310 C300,310 350,330 380,455 Z" fill="#FAF6EE"/>
    <path d="M180,455 L210,360 L240,455 Z" fill="#D97706" opacity="0.6"/>
    <!-- Head / Hair Bun / Sandalwood Pottu (Bindi) -->
    <circle cx="250" cy="210" r="60" fill="#6B4B3E"/>
    <!-- Traditional hair bun with Jasmine flowers (Mullapoo) -->
    <circle cx="310" cy="225" r="30" fill="#FAF6EE"/>
    <circle cx="310" cy="225" r="26" fill="#F4EDE0"/>
    <circle cx="315" cy="210" r="8" fill="#FDE047"/>
    <!-- Face -->
    <circle cx="250" cy="225" r="48" fill="#F5CBA7"/>
    <!-- Warm Bindi / Tilakam -->
    <circle cx="250" cy="210" r="5" fill="#B91C1C"/>
    <!-- Kind smiling eyes & warm smile -->
    <path d="M230,225 Q238,230 245,225" stroke="#4A3525" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M255,225 Q262,230 270,225" stroke="#4A3525" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M238,245 Q250,258 262,245" stroke="#883A20" stroke-width="3" fill="none" stroke-linecap="round"/>
    
    <!-- Amma holding a mini Bharani jar -->
    <ellipse cx="250" cy="410" rx="35" ry="40" fill="#B91C1C"/>
    <ellipse cx="250" cy="370" rx="24" ry="8" fill="#DC2626"/>

    <!-- Polaroid Caption Area -->
    <text x="250" y="505" font-family="'Baloo Chettan 2', sans-serif" font-size="28" font-weight="800" fill="#1E392B" text-anchor="middle">Valsala Amma</text>
    <text x="250" y="535" font-family="'Nunito', sans-serif" font-size="15" font-weight="700" fill="#8C531B" text-anchor="middle">Founder & Home Chef • Home Made Achar</text>
    <text x="250" y="565" font-family="'Nunito', sans-serif" font-size="13" font-style="italic" fill="#6B7280" text-anchor="middle">"Pickling is not a recipe; it is patience and prayer."</text>
  </g>

  <!-- Washi tape at top -->
  <rect x="230" y="20" width="140" height="35" rx="3" fill="#E5A93C" opacity="0.75" transform="rotate(-3, 300, 35)"/>
</svg>`;
fs.writeFileSync(path.join(imgDir, 'about-amma.svg'), aboutAmmaSvg);
console.log('✅ Generated Amma portrait');

// Favicon SVG
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="24" fill="#1E392B"/>
  <!-- Mini Bharani / Chilli -->
  <ellipse cx="50" cy="55" rx="28" ry="32" fill="#DC2626"/>
  <rect x="36" y="24" width="28" height="14" rx="3" fill="#FAF6EE"/>
  <ellipse cx="50" cy="22" rx="20" ry="7" fill="#B91C1C"/>
  <circle cx="50" cy="55" r="8" fill="#FBBF24"/>
</svg>`;
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSvg);

// Open Graph banner
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="100%" height="100%">
  <rect width="1200" height="630" fill="#1E392B"/>
  <circle cx="1050" cy="150" r="300" fill="#244B35" opacity="0.6"/>
  <circle cx="150" cy="550" r="250" fill="#244B35" opacity="0.5"/>
  <text x="100" y="220" font-family="'Baloo Chettan 2', sans-serif" font-size="64" font-weight="800" fill="#FBBF24">ഹോം മെയ്ഡ് അച്ചാർ</text>
  <text x="100" y="310" font-family="'Baloo Chettan 2', sans-serif" font-size="76" font-weight="800" fill="#FAF6EE">Home Made Achar</text>
  <text x="100" y="380" font-family="'Nunito', sans-serif" font-size="32" font-weight="600" fill="#C5DBCF">Homemade Kerala achar, made in small batches.</text>
  <rect x="100" y="440" width="320" height="60" rx="30" fill="#DC2626"/>
  <text x="260" y="480" font-family="'Nunito', sans-serif" font-size="22" font-weight="800" fill="#FAF6EE" text-anchor="middle">ORDER ON WHATSAPP</text>
</svg>`;
fs.writeFileSync(path.join(imgDir, 'og-banner.svg'), ogSvg);
console.log('✅ Generated favicon and OG banner');

