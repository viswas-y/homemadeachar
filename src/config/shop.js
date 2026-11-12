/**
 * Single source of truth for shop information.
 * Easily update the shop name, contact numbers, address, social links,
 * and delivery settings here.
 */
export const SHOP_CONFIG = {
  // Brand details
  name: "The Spice Jar",
  malayalamName: "ദി സ്പൈസ് ജാർ",
  tagline: "Spice up your life — Handpicked quality Kerala achar.",
  subTagline: "Handcrafted with heirloom recipes, cold-pressed gingelly oil & zero preservatives.",
  
  // Kitchen Maker
  makerName: "Valsala Amma",
  makerRole: "Head Maker & Home Chef",

  // Contact Information from Pickle Kitchen
  phone: "+91 97787 26659",
  whatsappNumber: "919778726659", // wa.me direct number
  email: "oleevepickles@gmail.com",
  
  // Kitchen Location
  address: {
    line1: "The Spice Jar Kitchen",
    line2: "Valoringal, Wandoor",
    city: "Malappuram",
    state: "Kerala",
    pincode: "679328",
    country: "India"
  },
  
  // Legal & Compliance
  fssaiNumber: "21324156000789",
  establishedYear: 2021,

  // Social Links
  socials: {
    instagram: "https://instagram.com/thespicejar",
    facebook: "https://facebook.com/thespicejar",
    whatsapp: "https://wa.me/919778726659"
  },

  // Delivery & Order Policies
  delivery: {
    freeDeliveryThreshold: 799, // In INR
    standardShippingFee: 50,
    estimatedDaysKerala: "1 - 2 business days",
    estimatedDaysRestOfIndia: "3 - 5 business days",
    shippingNote: "Packed securely in leak-proof food-grade vacuum sealed jars with air-cushioning."
  },

  // Payment note
  payment: {
    methods: "Google Pay / PhonePe / Paytm / UPI / NetBanking / Cash on Delivery (local)",
    upiId: "9778726659@upi"
  }
};

export default SHOP_CONFIG;
