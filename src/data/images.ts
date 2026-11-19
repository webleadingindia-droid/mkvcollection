/**
 * IMAGE CONFIG — URL ONLY
 *
 * SAB IMAGES URL SE AAYENGI. Koi local file nahi rakhni.
 * Bas har jagah URL paste karo — ho gaya.
 *
 * TWO WAYS:
 *  1. Yahan images.ts me direct URL daalo (site-wide sections: hero, banners, categories, etc.)
 *  2. products.ts me har product ke `images: [...]` array me URL daalo (product-wise)
 */

export const images = {
  // ============ CATEGORIES ============
  // Header menu, category cards, category pages — sab yahan se
  categories: {
    "food-magnets":      "https://images.meesho.com/images/products/1048586615/q9vei.jpg",
    "kitchen-sets":      "https://images.meesho.com/images/products/1048572937/jgnjb.jpg",
    "souvenirs":         "https://images.meesho.com/images/products/1043871064/oevxw.jpg",
    "fruits-vegetables": "https://images.meesho.com/images/products/1038007558/yfrgv.jpg",
    "gift-packs":        "https://images.meesho.com/images/products/1032031839/2qsye.jpg",
  } as Record<string, string>,

  // ============ HERO (homepage top) ============
  hero: [
    "https://images.meesho.com/images/products/1034791597/ipvhd.jpg",
    "https://images.meesho.com/images/products/1048683658/lgudz.jpg",
    "https://images.meesho.com/images/products/1048689571/xuvgb.jpg",
    "https://images.meesho.com/images/products/1048675136/jhtnx.jpg",
  ],

  // ============ BANNERS (promo strips) ============
  banners: [
    "https://picsum.photos/seed/mkv-banner-1/1600/700",
    "https://picsum.photos/seed/mkv-banner-2/1600/700",
    "https://picsum.photos/seed/mkv-banner-3/1600/700",
  ],

  // ============ INSTAGRAM GRID (homepage bottom) ============
  instagram: [
    "https://picsum.photos/seed/mkv-insta-1/600/600",
    "https://picsum.photos/seed/mkv-insta-2/600/600",
    "https://picsum.photos/seed/mkv-insta-3/600/600",
    "https://picsum.photos/seed/mkv-insta-4/600/600",
    "https://picsum.photos/seed/mkv-insta-5/600/600",
    "https://picsum.photos/seed/mkv-insta-6/600/600",
    "https://picsum.photos/seed/mkv-insta-7/600/600",
    "https://picsum.photos/seed/mkv-insta-8/600/600",
  ],

  // ============ AVATARS (testimonials) ============
  avatars: [
    "https://picsum.photos/seed/mkv-avatar-1/120/120",
    "https://picsum.photos/seed/mkv-avatar-2/120/120",
    "https://picsum.photos/seed/mkv-avatar-3/120/120",
    "https://picsum.photos/seed/mkv-avatar-4/120/120",
    "https://picsum.photos/seed/mkv-avatar-5/120/120",
    "https://picsum.photos/seed/mkv-avatar-6/120/120",
  ],

  // ============ MISC SECTIONS ============
  brandStory: "https://picsum.photos/seed/mkv-story/900/1000",
  about:      "https://picsum.photos/seed/mkv-about/1600/800",
  maker:      "https://picsum.photos/seed/mkv-maker/800/900",
} as const;

// ============ PRODUCTS ============
/**
 * Product image ka URL kaise banega?
 *
 * Priority:
 *  1. Agar products.ts me `images: ["url1", "url2"]` diya → wahi use hoga
 *  2. Nahi diya → automatic URL: `https://picsum.photos/seed/mkv-<id>-<n>/800/800`
 *
 * BEST WAY: products.ts me direct apna URL daalo (recommended).
 * Neeche wala function bas fallback hai agar products.ts me images nahi hai.
 */
export const productImages = (id: string, urls?: string[]) => {
  if (urls?.length) return urls; // products.ts se aaya
  return [1, 2, 3].map(
    (n) => `https://picsum.photos/seed/mkv-${id}-${n}/800/800`
  );
};

/**
 * @deprecated Ab local file nahi hai. Ye function sirf backward-compatibility ke liye hai.
 * Products page/Shop page should use `productImages(id, p.images)`.
 */
export const localProductImage = (id: string, n = 1) => {
  return `https://picsum.photos/seed/mkv-${id}-${n}/800/800`;
};