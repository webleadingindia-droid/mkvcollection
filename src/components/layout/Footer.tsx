import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { ADDRESS, BRAND_NAME, BUSINESS_HOURS, EMAIL, FACEBOOK_URL, INSTAGRAM_URL, PHONE, TAGLINE } from "@/config/site";
import { categories } from "@/data/products";

const help = [
  ["FAQ", "/faq"], ["Shipping & Returns", "/shipping-returns"], ["Bulk Orders", "/bulk-orders"],
  ["Privacy Policy", "/privacy-policy"], ["Terms", "/terms"],
];

export default function Footer() {
  const h = "mb-4 font-heading text-lg font-semibold text-marigold";
  const l = "block py-1 text-sm text-white/75 transition hover:text-white";
  return (
    <footer className="bg-maroon-dark text-white">
      <div className="container-x grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-heading text-2xl font-bold">{BRAND_NAME}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/75">{TAGLINE} Handmade miniature fridge magnets, crafted with love and made for gifting.</p>
          <div className="mt-5 flex gap-3">
            <a href={INSTAGRAM_URL} aria-label="Instagram" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-marigold hover:text-maroon-dark"><Instagram size={18} /></a>
            <a href={FACEBOOK_URL} aria-label="Facebook" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-marigold hover:text-maroon-dark"><Facebook size={18} /></a>
          </div>
        </div>
        <div>
          <h3 className={h}>Shop</h3>
          {categories.map((c) => <Link key={c.slug} href={`/shop/${c.slug}`} className={l}>{c.name}</Link>)}
        </div>
        <div>
          <h3 className={h}>Help</h3>
          {help.map(([t, href]) => <Link key={href} href={href} className={l}>{t}</Link>)}
        </div>
        <div>
          <h3 className={h}>Contact</h3>
          <p className="flex gap-2 py-1 text-sm text-white/75"><Phone size={16} className="mt-0.5 shrink-0" />{PHONE}</p>
          <p className="flex gap-2 py-1 text-sm text-white/75"><Mail size={16} className="mt-0.5 shrink-0" />{EMAIL}</p>
          <p className="flex gap-2 py-1 text-sm text-white/75"><MapPin size={16} className="mt-0.5 shrink-0" />{ADDRESS}</p>
          <p className="py-1 text-sm text-white/60">{BUSINESS_HOURS}</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/60 md:flex-row">
          <p>© {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</p>
          <p>Secure payments on WhatsApp • UPI • Bank Transfer • Cash on Delivery*</p>
        </div>
      </div>
    </footer>
  );
}
