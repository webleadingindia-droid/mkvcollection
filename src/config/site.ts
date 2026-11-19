export const BRAND_NAME = "MKV Collection";
export const TAGLINE = "Small magnets, big smiles.";
// Set real values in .env.local (see .env.example) or edit the fallbacks here.
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919315330194"; // country code, no +
export const EMAIL = process.env.NEXT_PUBLIC_EMAIL ?? "mkvcollection8@gmail.com";
export const PHONE = process.env.NEXT_PUBLIC_PHONE ?? "+91 9315330194";
export const ADDRESS = "MKV Collection, India";
export const INSTAGRAM_URL = "https://instagram.com/mkvcollection";
export const FACEBOOK_URL = "https://facebook.com/mkvcollection";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mkvcollection.in";
export const BUSINESS_HOURS = "Mon – Sat, 10:00 AM – 7:00 PM IST";
export const FREE_SHIPPING_THRESHOLD = 499;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Gifting", href: "/bulk-orders" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// ---------- Payment (UPI) ----------
// Apni asli UPI ID yahan daalo ya .env.local me NEXT_PUBLIC_UPI_ID set karo.
export const UPI_ID = process.env.NEXT_PUBLIC_UPI_ID ?? "76790100013426@BARB0VJPITA.ifsc.npci";
export const UPI_PAYEE_NAME = process.env.NEXT_PUBLIC_UPI_NAME ?? BRAND_NAME;
// Shipping fee agar FREE_SHIPPING_THRESHOLD se kam ka order ho. 0 = hamesha free.
export const SHIPPING_FEE = Number(process.env.NEXT_PUBLIC_SHIPPING_FEE ?? 0);
export const shippingFor = (subtotal: number) => (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE);
