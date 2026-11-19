"use client";
import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  Heart,
  Menu,
  MessageCircle,
  Search,
  ShoppingBag,
  X,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { BRAND_NAME, NAV_LINKS } from "@/config/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { categories } from "@/data/products";
import { images } from "@/data/images";
import SafeImage from "@/components/ui/SafeImage";
import CountBadge from "./CountBadge";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Scroll detection
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 16);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  // ESC closes drawer
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDrawer(false);
        setShopOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const closeDrawer = useCallback(() => setDrawer(false), []);

  const iconBtn =
    "relative flex h-11 w-11 items-center justify-center rounded-full text-charcoal transition-all duration-200 hover:bg-maroon/10 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold";

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b transition-all duration-300 ${
          scrolled
            ? "border-maroon/10 bg-ivory/90 shadow-[0_4px_24px_-8px_rgba(122,31,43,0.12)] backdrop-blur-xl"
            : "border-transparent bg-cream/60 backdrop-blur-sm"
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between gap-3 md:h-20">
          {/* Mobile Menu Button */}
          <button
            className={`${iconBtn} lg:hidden`}
            onClick={() => setDrawer(true)}
            aria-label="Open menu"
            aria-expanded={drawer}
          >
            <Menu size={22} />
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2"
            aria-label={`${BRAND_NAME} home`}
          >
            <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-maroon to-maroon-dark font-heading text-sm font-bold text-marigold shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              MKV
            </span>
            <span className="hidden font-heading text-xl font-bold text-maroon sm:block">
              Collection
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Primary"
          >
            {NAV_LINKS.map((l) =>
              l.label === "Shop" ? (
                <div
                  key={l.href}
                  className="relative"
                  onMouseEnter={() => setShopOpen(true)}
                  onMouseLeave={() => setShopOpen(false)}
                >
                  <Link
                    href={l.href}
                    className="nav-link flex items-center gap-1 px-4 py-2 text-sm font-medium"
                    aria-expanded={shopOpen}
                  >
                    Shop
                    <ChevronRight
                      size={14}
                      className={`transition-transform duration-200 ${
                        shopOpen ? "rotate-90" : ""
                      }`}
                    />
                  </Link>

                  {/* Mega Menu */}
                  <div
                    className={`absolute left-1/2 top-full w-[min(90vw,760px)] -translate-x-1/2 pt-3 transition-all duration-200 ${
                      shopOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible translate-y-1 opacity-0"
                    }`}
                  >
                    <div className="rounded-3xl border border-maroon/10 bg-ivory/95 p-6 shadow-[0_20px_60px_-12px_rgba(122,31,43,0.18)] backdrop-blur-xl">
                      <div className="mb-4 flex items-center gap-2">
                        <Sparkles size={16} className="text-marigold" />
                        <p className="text-xs font-semibold uppercase tracking-wider text-maroon/70">
                          Explore Collections
                        </p>
                      </div>
                      <div className="grid grid-cols-5 gap-3">
                        {categories.map((c) => (
                          <Link
                            key={c.slug}
                            href={`/shop/${c.slug}`}
                            className="group/c flex flex-col items-center gap-2 rounded-2xl p-2 transition hover:bg-maroon/5"
                          >
                            <div className="relative aspect-square w-full overflow-hidden rounded-2xl ring-1 ring-maroon/10 ring-offset-2 ring-offset-ivory transition group-hover/c:ring-maroon/30">
                              <SafeImage
                                src={images.categories[c.slug]}
                                alt={c.name}
                                sizes="140px"
                                className="transition duration-500 group-hover/c:scale-110"
                              />
                            </div>
                            <span className="text-center text-xs font-semibold text-charcoal transition group-hover/c:text-maroon">
                              {c.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-4 border-t border-maroon/10 pt-3">
                        <Link
                          href="/shop"
                          className="flex items-center justify-center gap-1 text-sm font-medium text-maroon hover:underline"
                        >
                          View all products
                          <ChevronRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  className="nav-link px-4 py-2 text-sm font-medium"
                >
                  {l.label}
                </Link>
              )
            )}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            <Link
              href="/shop"
              className={iconBtn}
              aria-label="Search products"
            >
              <Search size={20} />
            </Link>
            <Link
              href="/wishlist"
              className={`${iconBtn} hidden sm:flex`}
              aria-label="Wishlist"
            >
              <Heart size={20} />
              <CountBadge kind="wishlist" />
            </Link>
            <Link
              href="/cart"
              className={iconBtn}
              aria-label="Enquiry cart"
            >
              <ShoppingBag size={20} />
              <CountBadge kind="cart" />
            </Link>
            <a
              href={buildWhatsAppLink("Hello MKV Collection 🙏")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa ml-2 hidden !px-4 !py-2 md:inline-flex"
            >
              <MessageCircle size={16} />
              <span className="hidden lg:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {drawer && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 animate-[fadeIn_200ms_ease-out] bg-maroon-dark/60 backdrop-blur-sm"
            onClick={closeDrawer}
          />

          {/* Drawer panel */}
          <div
            ref={drawerRef}
            className="absolute left-0 top-0 flex h-full w-[88%] max-w-sm animate-[slideIn_300ms_cubic-bezier(0.16,1,0.3,1)] flex-col bg-gradient-to-b from-cream to-ivory shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-maroon/10 p-5">
              <Link
                href="/"
                onClick={closeDrawer}
                className="flex items-center gap-2"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-maroon to-maroon-dark font-heading text-xs font-bold text-marigold">
                  MKV
                </span>
                <span className="font-heading text-lg font-bold text-maroon">
                  {BRAND_NAME}
                </span>
              </Link>
              <button
                className={iconBtn}
                onClick={closeDrawer}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Search */}
            <div className="p-5 pb-3">
              <Link
                href="/shop"
                onClick={closeDrawer}
                className="flex items-center gap-3 rounded-full border border-maroon/15 bg-white px-4 py-3 text-sm text-charcoal/60 shadow-sm transition hover:border-maroon/30"
              >
                <Search size={18} className="text-maroon" />
                <span>Search products...</span>
              </Link>
            </div>

            {/* Nav */}
            <nav
              className="flex-1 overflow-y-auto px-5 py-2"
              aria-label="Mobile"
            >
              <p className="mb-2 mt-2 text-xs font-semibold uppercase tracking-wider text-maroon/60">
                Menu
              </p>
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={closeDrawer}
                  className="flex items-center justify-between border-b border-maroon/10 py-4 font-heading text-lg font-semibold text-charcoal transition hover:text-maroon"
                >
                  {l.label}
                  <ChevronRight size={18} className="text-maroon/40" />
                </Link>
              ))}

              <p className="mb-3 mt-6 text-xs font-semibold uppercase tracking-wider text-maroon/60">
                Shop by Category
              </p>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/shop/${c.slug}`}
                    onClick={closeDrawer}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-maroon/10 bg-white transition hover:border-maroon/30 hover:shadow-md"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <SafeImage
                        src={images.categories[c.slug]}
                        alt={c.name}
                        sizes="160px"
                        className="transition duration-500 group-hover:scale-110"
                      />
                    </div>
                    <span className="p-2 text-center text-xs font-semibold text-charcoal">
                      {c.name}
                    </span>
                  </Link>
                ))}
              </div>
            </nav>

            {/* Footer CTA */}
            <div className="border-t border-maroon/10 bg-white/60 p-5">
              <a
                href={buildWhatsAppLink("Hello MKV Collection 🙏")}
                className="btn-wa w-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}