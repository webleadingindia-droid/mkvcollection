/**
 * Replace these URLs with real product photos (e.g. /products/<id>-1.jpg) later.
 * Only this file needs to change.
 * (Seeded picsum URLs are used so every link is guaranteed to load.)
 */
const p = (seed: string, w = 800, h = 800) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const images = {
  hero: [p("mkv-hero-1", 900, 1100), p("mkv-hero-2", 700, 700), p("mkv-hero-3", 700, 700), p("mkv-hero-4", 700, 900)],
  categories: {
    "food-magnets": p("mkv-cat-food", 800, 1000),
    "kitchen-sets": p("mkv-cat-kitchen", 800, 1000),
    souvenirs: p("mkv-cat-taj", 800, 1000),
    "fruits-vegetables": p("mkv-cat-fruit", 800, 1000),
    "gift-packs": p("mkv-cat-gift", 800, 1000),
  } as Record<string, string>,
  banners: [p("mkv-banner-1", 1600, 700), p("mkv-banner-2", 1600, 700), p("mkv-banner-3", 1600, 700)],
  brandStory: p("mkv-story", 900, 1000),
  about: p("mkv-about", 1600, 800),
  maker: p("mkv-maker", 800, 900),
  instagram: Array.from({ length: 8 }, (_, i) => p(`mkv-insta-${i + 1}`, 600, 600)),
  avatars: Array.from({ length: 6 }, (_, i) => p(`mkv-avatar-${i + 1}`, 120, 120)),
};

/** 3 online images per product. Local /public/products/<id>-1.jpg is preferred automatically. */
export const productImages = (id: string) => [1, 2, 3].map((n) => p(`mkv-${id}-${n}`));
export const localProductImage = (id: string, n = 1) => `/products/${id}-${n}.jpg`;
