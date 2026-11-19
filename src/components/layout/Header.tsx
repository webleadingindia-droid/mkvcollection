"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, Menu, MessageCircle, Search, ShoppingBag, X } from "lucide-react";
import { BRAND_NAME, NAV_LINKS } from "@/config/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { categories } from "@/data/products";
import { images } from "@/data/images";
import SafeImage from "@/components/ui/SafeImage";
import CountBadge from "./CountBadge";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const iconBtn = "relative flex h-11 w-11 items-center justify-center rounded-full text-charcoal transition hover:bg-maroon/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold";

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? "bg-ivory/95 shadow-soft backdrop-blur" : "bg-cream/70 backdrop-blur-sm"}`}>
      <div className="container-x flex h-16 items-center justify-between gap-4 md:h-20">
        <button className={`${iconBtn} lg:hidden`} onClick={() => setDrawer(true)} aria-label="Open menu"><Menu size={22} /></button>

        <Link href="/" className="flex items-center gap-2" aria-label={`${BRAND_NAME} home`}>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-maroon font-heading text-sm font-bold text-marigold">MKV</span>
          <span className="hidden font-heading text-xl font-bold text-maroon sm:block">Collection</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((l) =>
            l.label === "Shop" ? (
              <div key={l.href} className="group relative">
                <Link href={l.href} className="nav-link py-6 text-sm font-medium">Shop</Link>
                <div className="invisible absolute left-1/2 top-full w-[720px] -translate-x-1/2 translate-y-2 rounded-3xl border border-maroon/10 bg-ivory p-6 opacity-0 shadow-lift transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="grid grid-cols-5 gap-4">
                    {categories.map((c) => (
                      <Link key={c.slug} href={`/shop/${c.slug}`} className="group/c text-center">
                        <div className="relative mb-2 aspect-square overflow-hidden rounded-2xl">
                          <SafeImage src={images.categories[c.slug]} alt={c.name} sizes="140px" className="transition duration-500 group-hover/c:scale-110" />
                        </div>
                        <span className="text-sm font-semibold text-charcoal group-hover/c:text-maroon">{c.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link key={l.href} href={l.href} className="nav-link text-sm font-medium">{l.label}</Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-1">
          <Link href="/shop" className={iconBtn} aria-label="Search products"><Search size={20} /></Link>
          <Link href="/wishlist" className={`${iconBtn} hidden sm:flex`} aria-label="Wishlist"><Heart size={20} /><CountBadge kind="wishlist" /></Link>
          <Link href="/cart" className={iconBtn} aria-label="Enquiry cart"><ShoppingBag size={20} /><CountBadge kind="cart" /></Link>
          <a href={buildWhatsAppLink("Hello MKV Collection 🙏")} target="_blank" rel="noopener noreferrer" className="btn-wa ml-2 hidden !px-4 !py-2 md:inline-flex">
            <MessageCircle size={16} /> WhatsApp
          </a>
        </div>
      </div>

      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 bg-maroon-dark/60" onClick={() => setDrawer(false)} />
          <div className="absolute left-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-cream p-6 shadow-lift">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-heading text-xl font-bold text-maroon">{BRAND_NAME}</span>
              <button className={iconBtn} onClick={() => setDrawer(false)} aria-label="Close menu"><X size={22} /></button>
            </div>
            <nav className="flex flex-col" aria-label="Mobile">
              {NAV_LINKS.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setDrawer(false)} className="border-b border-maroon/10 py-4 font-heading text-2xl text-charcoal">{l.label}</Link>
              ))}
              <div className="mt-4 flex flex-col gap-1">
                {categories.map((c) => (
                  <Link key={c.slug} href={`/shop/${c.slug}`} onClick={() => setDrawer(false)} className="py-2 text-sm text-charcoal/70">{c.name}</Link>
                ))}
              </div>
            </nav>
            <a href={buildWhatsAppLink("Hello MKV Collection 🙏")} className="btn-wa mt-auto" target="_blank" rel="noopener noreferrer">
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
