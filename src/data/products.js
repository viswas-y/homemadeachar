/**
 * Product catalog for Home Made Achar.
 * Real authentic Kerala pickles formatted with card colors, tags, and pricing.
 */

export const PRODUCTS = [
  {
    id: "manga-achar",
    slug: "manga-achar",
    name: "Mango Pickle",
    malayalamName: "മാങ്ങ അച്ചാർ",
    tagline: "Bold flavor, real country mango",
    tag: "Bestseller",
    boxColor: "bg-[#FDBA74]", // Cheddar orange
    featured: true,
    veg: true,
    spiceLevel: "hot",
    shelfLife: "9 months",
    shortDescription: "Hand-cut country mangoes cured with rock salt, toasted fenugreek, and cold-pressed gingelly oil.",
    fullDescription: "Prepared the traditional way Valsala Amma learned from her mother. Selected raw mangoes are cleaned, cubed, and cured with sea salt before being tossed with stone-ground Kashmiri chillies, aromatic fenugreek, mustard, and pure cold-pressed gingelly oil.",
    ingredients: [
      "Raw mangoes",
      "Cold-pressed gingelly oil",
      "Kashmiri chilli powder",
      "Fenugreek",
      "Mustard seeds",
      "Asafoetida",
      "Rock salt",
      "Curry leaves"
    ],
    sizes: [
      { size: "250g", weightInGrams: 250, price: 160, inStock: true },
      { size: "500g", weightInGrams: 500, price: 300, inStock: true },
      { size: "1kg", weightInGrams: 1000, price: 580, inStock: true }
    ],
    images: [
      "/images/products/mango-pickle.jpg"
    ]
  },
  {
    id: "pacha-mulaku-achar",
    slug: "pacha-mulaku-achar",
    name: "Green Chilli Pickle",
    malayalamName: "പച്ചമുളക് അച്ചാർ",
    tagline: "Fresh taste, whole green chillies",
    tag: "New",
    boxColor: "bg-[#86EFAC]", // Sour cream green
    featured: true,
    veg: true,
    spiceLevel: "hot",
    shelfLife: "9 months",
    shortDescription: "Plump green chillies slit and cured in rock salt, mustard, and fragrant ginger tempering.",
    fullDescription: "Fresh pungent country green chillies washed, wiped dry, slit lengthwise, and cured in crystal sea salt brine. Tempered with cracked mustard, roasted fenugreek, and asafoetida in hot cold-pressed sesame oil.",
    ingredients: [
      "Farm-fresh green chillies",
      "Cold-pressed gingelly oil",
      "Cracked yellow & black mustard",
      "Roasted fenugreek powder",
      "Ginger slivers",
      "Asafoetida",
      "Natural sea salt",
      "Fresh curry leaves"
    ],
    sizes: [
      { size: "250g", weightInGrams: 250, price: 150, inStock: true },
      { size: "500g", weightInGrams: 500, price: 280, inStock: true },
      { size: "1kg", weightInGrams: 1000, price: 540, inStock: true }
    ],
    images: [
      "/images/products/green-chilli-pickle.jpg"
    ]
  },
  {
    id: "veluthulli-achar",
    slug: "veluthulli-achar",
    name: "Garlic Pickle",
    malayalamName: "വെളുത്തുള്ളി അച്ചാർ",
    tagline: "Smoky, bold, delicious garlic",
    tag: "Bestseller",
    boxColor: "bg-[#FDA4AF]", // Barbecue rose
    featured: true,
    veg: true,
    spiceLevel: "hot",
    shelfLife: "9 months",
    shortDescription: "Whole peeled country garlic cloves simmered to tender perfection in hot chilli and mustard gravy.",
    fullDescription: "Hand-peeled garlic cloves braised on low flame until tender. Infused with a fiery blend of Kashmiri chilli, roasted fenugreek, crushed mustard, and ginger slivers in cold-pressed oil.",
    ingredients: [
      "Select garlic cloves",
      "Cold-pressed gingelly oil",
      "Ginger slivers",
      "Kashmiri chilli powder",
      "Fenugreek & mustard seeds",
      "Asafoetida",
      "Natural brewed vinegar",
      "Rock salt & curry leaves"
    ],
    sizes: [
      { size: "250g", weightInGrams: 250, price: 180, inStock: true },
      { size: "500g", weightInGrams: 500, price: 340, inStock: true },
      { size: "1kg", weightInGrams: 1000, price: 650, inStock: true }
    ],
    images: [
      "/images/products/garlic-pickle.jpg"
    ]
  },
  {
    id: "naranga-achar",
    slug: "naranga-achar",
    name: "Lemon Pickle",
    malayalamName: "നാരങ്ങ അച്ചാർ",
    tagline: "Creamy, tangy, tender lemon",
    tag: "New",
    boxColor: "bg-[#93C5FD]", // White cheddar blue
    featured: false,
    veg: true,
    spiceLevel: "medium",
    shelfLife: "12 months",
    shortDescription: "Plump wild lemons steamed gently, sun-aged, and spiced to develop rich, mellow citrus depth.",
    fullDescription: "Thick-skinned country lemons are gently steamed until soft, air-dried under the sun, and salt-cured. Tempered with home-roasted spices, crunchy mustard, and fragrant asafoetida in hot gingelly oil.",
    ingredients: [
      "Wild lemons (Vadukappuli Naranga)",
      "Gingelly oil",
      "Red chilli powder",
      "Mustard seeds",
      "Fenugreek powder",
      "Asafoetida",
      "Rock salt",
      "Curry leaves"
    ],
    sizes: [
      { size: "250g", weightInGrams: 250, price: 150, inStock: true },
      { size: "500g", weightInGrams: 500, price: 280, inStock: true },
      { size: "1kg", weightInGrams: 1000, price: 540, inStock: true }
    ],
    images: [
      "/images/products/lemon-pickle.jpg",
      "/images/products/green-chilli-pickle.jpg"
    ]
  },
  {
    id: "kadumanga",
    slug: "kadumanga",
    name: "Kadumanga",
    malayalamName: "കടുമാങ്ങ (കണ്ണിമാങ്ങ)",
    tagline: "Crunchy baby mangoes in crimson brine",
    tag: "Bestseller",
    boxColor: "bg-[#FECDD3]",
    featured: false,
    veg: true,
    spiceLevel: "hot",
    shelfLife: "6 months",
    shortDescription: "Crisp whole baby mangoes cured in brine with a fiery gravy of fine Kashmiri chillies and mustard.",
    fullDescription: "Tender marble-sized mangoes harvested in early season, cured whole in brine jars, and finished in a vibrant gravy of ground red chillies, toasted mustard, and pure asafoetida.",
    ingredients: [
      "Tender baby mangoes (Kanni manga)",
      "Sesame oil",
      "Red chilli powder",
      "Roasted mustard powder",
      "Asafoetida",
      "Sea salt brine",
      "Curry leaves"
    ],
    sizes: [
      { size: "250g", weightInGrams: 250, price: 190, inStock: true },
      { size: "500g", weightInGrams: 500, price: 360, inStock: true },
      { size: "1kg", weightInGrams: 1000, price: 690, inStock: true }
    ],
    images: [
      "/images/products/kadumanga-pickle.jpg",
      "/images/products/mango-pickle.jpg"
    ]
  },
  {
    id: "nellika-achar",
    slug: "nellika-achar",
    name: "Nellika Achar",
    malayalamName: "നെല്ലിക്ക അച്ചാർ",
    tagline: "Steamed gooseberry in yellow mustard oil",
    tag: "Healthy",
    boxColor: "bg-[#BBF7D0]",
    featured: true,
    veg: true,
    spiceLevel: "mild",
    shelfLife: "9 months",
    shortDescription: "Tender steamed whole amla scored and steeped in fragrant mustard, turmeric, and mild chilli oil.",
    fullDescription: "Whole plump gooseberries steamed gently, scored, and pickled in cold-pressed gingelly oil tempered with yellow mustard, roasted fenugreek, and asafoetida.",
    ingredients: [
      "Fresh Indian gooseberries (Amla)",
      "Gingelly oil",
      "Mild chilli powder",
      "Turmeric powder",
      "Cracked yellow mustard",
      "Fenugreek powder",
      "Asafoetida",
      "Rock salt"
    ],
    sizes: [
      { size: "250g", weightInGrams: 250, price: 160, inStock: true },
      { size: "500g", weightInGrams: 500, price: 300, inStock: true },
      { size: "1kg", weightInGrams: 1000, price: 570, inStock: true }
    ],
    images: [
      "/images/products/nellika-pickle.jpg"
    ]
  },
  {
    id: "inji-achar-puli-inji",
    slug: "inji-achar-puli-inji",
    name: "Inji Achar (Puli Inji)",
    malayalamName: "ഇഞ്ചി അച്ചാർ (പുളി ഇഞ്ചി)",
    tagline: "Crisp ginger with dark tamarind and jaggery",
    tag: "Homely",
    boxColor: "bg-[#FED7AA]",
    featured: true,
    veg: true,
    spiceLevel: "medium",
    shelfLife: "6 months",
    shortDescription: "Sweet, tangy, and spicy ginger relish crafted with aged tamarind pulp and dark Marayoor jaggery.",
    fullDescription: "Fresh root ginger sliced thin, fried in sesame oil, and cooked down in aged Malabar tamarind and dark organic jaggery syrup with green chillies and roasted fenugreek.",
    ingredients: [
      "Fresh ginger root",
      "Malabar tamarind pulp",
      "Marayoor organic jaggery",
      "Green chillies",
      "Gingelly oil",
      "Fenugreek & mustard",
      "Turmeric & chilli powder",
      "Rock salt"
    ],
    sizes: [
      { size: "250g", weightInGrams: 250, price: 170, inStock: true },
      { size: "500g", weightInGrams: 500, price: 320, inStock: true },
      { size: "1kg", weightInGrams: 1000, price: 620, inStock: true }
    ],
    images: [
      "/images/products/inji-pickle.jpg",
      "/images/products/garlic-pickle.jpg"
    ]
  },
  {
    id: "chemmeen-achar",
    slug: "chemmeen-achar",
    name: "Chemmeen Achar",
    malayalamName: "ചെമ്മീൻ അച്ചാർ",
    tagline: "Crisp fried prawns in Malabar masala",
    tag: "Non-Veg",
    boxColor: "bg-[#FDBA74]",
    featured: false,
    veg: false,
    spiceLevel: "hot",
    shelfLife: "4 months",
    shortDescription: "Sweet succulent prawns fried crisp and packed in fragrant, spicy Kerala pickle gravy.",
    fullDescription: "Deveined coastal prawns seasoned with chilli, turmeric, and pepper, pan-fried and blended into a fragrant tempering of garlic, ginger, curry leaves, and sour vinegar.",
    ingredients: [
      "Fresh sea prawns",
      "Gingelly oil",
      "Garlic & ginger paste",
      "Slit green chillies",
      "Red chilli & black pepper",
      "Fenugreek & asafoetida",
      "Brewed vinegar",
      "Sea salt"
    ],
    sizes: [
      { size: "250g", weightInGrams: 250, price: 320, inStock: true },
      { size: "500g", weightInGrams: 500, price: 620, inStock: true },
      { size: "1kg", weightInGrams: 1000, price: 1190, inStock: true }
    ],
    images: [
      "/images/products/chemmeen-pickle.jpg",
      "/images/products/mango-pickle.jpg"
    ]
  }
];

export default PRODUCTS;
