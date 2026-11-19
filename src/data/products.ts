import { productImages } from "./images";

export type Product = {
  id: string; slug: string; title: string; shortTitle: string;
  price: number; mrp: number; category: string; subCategory: string;
  description: string; features: string[]; specs: { label: string; value: string }[];
  images: string[]; inStock: boolean; tags: string[];
  rating: number; reviewCount: number;
  isBestseller: boolean; isNew: boolean; isGiftable: boolean; isPlaceholder: boolean;
};

export const categories = [
  { slug: "food-magnets", name: "Food Magnets", blurb: "Street food and snacks, sculpted in miniature." },
  { slug: "kitchen-sets", name: "Kitchen Sets", blurb: "Tiny kitchen essentials for a charming fridge door." },
  { slug: "souvenirs", name: "Souvenirs", blurb: "Taj Mahal keepsakes and memories of India." },
  { slug: "fruits-vegetables", name: "Fruits & Vegetables", blurb: "Fresh-from-the-market miniatures that never wilt." },
  { slug: "gift-packs", name: "Gift Packs", blurb: "Gift-ready sets for birthdays, weddings and festivals." },
];

type Raw = [string, string, string, number, string, string, string, string[]];

const real: Raw[] = [
  ["549976178", "Mini Paneer Tikka Platter Fridge Magnet (3D Indian BBQ Food Magnet with Chutney)", "Paneer Tikka Platter Magnet", 149, "food-magnets", "Indian BBQ", "Golden paneer cubes, charred peppers and a dollop of mint chutney, all sculpted on a tiny platter. A smoky tandoor favourite that turns your fridge into a street-food stall.", ["Bestseller", "Giftable"]],
  ["549959605", "3D Vegetable Market Fridge Magnet (Mini Sabzi Mandi with Weighing Scale)", "Vegetable Market Magnet", 165, "fruits-vegetables", "Market Scenes", "A bustling mini sabzi mandi with crates of vegetables and a classic weighing scale. Every vegetable is hand-shaped and painted for a lively, nostalgic look.", ["Bestseller", "Giftable"]],
  ["549898178", "3D Burger, Fries & Cold Drink Fridge Magnet (Miniature Fast Food Magnet)", "Burger Combo Magnet", 159, "food-magnets", "Fast Food", "A juicy burger, crisp golden fries and a chilled cold drink, served in miniature. Playful, colourful and always a conversation starter.", ["New", "Giftable"]],
  ["546952329", "Mini Grocery Essentials Fridge Magnet Set (Tea, Butter & Curd)", "Grocery Essentials Set", 178, "kitchen-sets", "Grocery", "Tea, butter and curd packs recreated in lovingly tiny detail. A cheerful set that brings the Indian pantry to your fridge door.", ["Bestseller"]],
  ["546939787", "Mini Coffee Time Fridge Magnet (Coffee Jar, Mug & Cookies)", "Coffee Time Magnet", 200, "kitchen-sets", "Cafe", "A coffee jar, steaming mug and a plate of cookies for the coffee lover in your life. Rich colours and fine detailing make it a standout piece.", ["Bestseller", "Giftable"]],
  ["543217231", "Handmade Fruit Basket Fridge Magnet (Pack of 1)", "Fruit Basket Magnet", 135, "fruits-vegetables", "Fruits", "A woven basket brimming with bright, juicy miniature fruits. Each one is shaped by hand, so no two baskets are exactly alike.", ["New"]],
  ["543490252", "Heart Shape Taj Mahal Miniature Fridge Magnet (Resin Souvenir)", "Heart Taj Mahal Magnet", 125, "souvenirs", "Monuments", "The Taj Mahal framed in a romantic heart, finished in glossy resin. A keepsake that celebrates India's most loved monument.", ["Giftable", "Bestseller"]],
  ["541323271", "Kitchen Essentials Miniature Fridge Magnet Set of 3 (Tea, Butter & Dahi)", "Kitchen Essentials Set of 3", 135, "kitchen-sets", "Grocery", "Three everyday kitchen staples, tea, butter and dahi, in one charming set. Mix and match them across your fridge for a playful display.", ["Giftable"]],
  ["539799186", "Chocolate Candy Fridge Magnets, Pack of 3", "Chocolate Candy Pack of 3", 149, "gift-packs", "Sweet Treats", "Three sweet chocolate and candy magnets with glossy, irresistible finishes. A delightful pack for gifting, party favours and sweet moments.", ["New", "Giftable"]],
  ["539627964", "Taj Mahal Tea Cup & Tea Box Refrigerator Magnet Set", "Taj Mahal Tea Set", 152, "souvenirs", "Monuments", "A Taj Mahal themed tea cup and tea box, together in one elegant set. Perfect for chai lovers and for travellers taking home a piece of India.", ["Giftable"]],
];

const catLabel = (slug: string) => categories.find((c) => c.slug === slug)!.name;

function build(r: Raw, i: number): Product {
  const [id, title, shortTitle, price, category, subCategory, description, tags] = r;
  return {
    id, slug: `${shortTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${id}`,
    title, shortTitle, price, mrp: Math.round((price * 1.3) / 5) * 5, category, subCategory, description,
    features: [
      "Handcrafted with fine, hand-painted detailing",
      "Strong magnet hold that stays put on the fridge",
      `Part of our ${catLabel(category)} collection, made to gift`,
      "Packed securely to arrive in perfect condition",
    ],
    specs: [
      { label: "Material", value: "Resin & polymer clay" }, { label: "Finish", value: "Handcrafted" },
      { label: "Use", value: "Fridge / metal surfaces" }, { label: "Size", value: "Miniature" },
    ],
    images: productImages(id), inStock: true, tags,
    rating: Math.round((4.3 + ((i * 7) % 6) / 10) * 10) / 10, reviewCount: 24 + ((i * 37) % 160),
    isBestseller: tags.includes("Bestseller"), isNew: tags.includes("New"), isGiftable: tags.includes("Giftable"),
    isPlaceholder: false,
  };
}

const placeholderIds = ["549965907","549914646","549906037","549888049","549876887","549926998","546933627","546922930","546902137","543218847","543171332","543259768","540831401","539972048","539662232"];

const placeholders: Product[] = placeholderIds.map((id, i) => ({
  ...build([id, `Handmade Fridge Magnet - ${id}`, `Handmade Fridge Magnet ${id}`, 0, categories[i % 5].slug, "Handmade", "A handcrafted miniature fridge magnet from MKV Collection. Message us on WhatsApp with this Product ID for current pricing and availability.", []], i + 10),
  price: 0, mrp: 0, isPlaceholder: true,
}));

export const products: Product[] = [...real.map(build), ...placeholders];

export const formatPrice = (p: Product) => (p.price > 0 ? `₹${p.price}` : "Price on enquiry");
export const discountPct = (p: Product) => (p.mrp > p.price && p.price > 0 ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0);
export const featured = () => products.filter((p) => !p.isPlaceholder);

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const getByCategory = (c: string) => products.filter((p) => p.category === c);
export const getRelated = (p: Product, n = 4) =>
  products.filter((x) => x.category === p.category && x.id !== p.id && !x.isPlaceholder).slice(0, n);
export const searchProducts = (q: string) => {
  const s = q.trim().toLowerCase();
  return s ? products.filter((p) => p.title.toLowerCase().includes(s) || p.id.includes(s)) : products;
};
