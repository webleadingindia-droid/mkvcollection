"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  ArrowUpRight,
} from "lucide-react";
import { BRAND_NAME, NAV_LINKS } from "@/config/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { categories } from "@/data/products";
import { images } from "@/data/images";
import SafeImage from "@/components/ui/SafeImage";
import CountBadge from "./CountBadge";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const shopTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll detection
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setDrawer(false);
    setShopOpen(false);
  }, [pathname]);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  // ESC closes drawer & mega menu
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

  // Hover-intent for mega menu (delay close)
  const openShop = () => {
    if (shopTimeout.current) clearTimeout(shopTimeout.current);
    setShopOpen(true);
  };
  const closeShop = () => {
    shopTimeout.current = setTimeout(() => setShopOpen(false), 120);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const iconBtn =
    "relative flex h-10 w-10 items-center justify-center rounded-full text-charcoal transition-all duration-200 hover:bg-maroon/10 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory md:h-11 md:w-11";

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b transition-all duration-300 ${
          scrolled
            ? "border-maroon/10 bg-ivory/85 shadow-[0_4px_30px_-12px_rgba(122,31,43,0.15)] backdrop-blur-xl"
            : "border-transparent bg-cream/40 backdrop-blur-sm"
        }`}
      >
        <div className="container-x flex h-14 items-center justify-between gap-3 md:h-20">
          {/* ─── Mobile Menu Button ─── */}
          <button
            className={`${iconBtn} -ml-2 lg:hidden`}
            onClick={() => setDrawer(true)}
            aria-label="Open menu"
            aria-expanded={drawer}
          >
            <Menu size={22} />
          </button>

          {/* ─── Logo ─── */}
          <Link
            href="/"
            className="group flex items-center gap-2.5"
            aria-label={`${BRAND_NAME} home`}
          >
            <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-maroon via-maroon to-maroon-dark font-heading text-sm font-bold text-marigold shadow-md ring-1 ring-maroon/10 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
              MKV
            </span>
            <span className="hidden font-heading text-xl font-bold leading-none text-maroon sm:block">
              Collection
            </span>
          </Link>

          {/* ─── Desktop Nav ─── */}
          <nav
            className="hidden items-center gap-0.5 lg:flex"
            aria-label="Primary"
          >
            {NAV_LINKS.map((l) => {
              const active = isActive(l.href);
              if (l.label === "Shop") {
                return (
                  <div
                    key={l.href}
                    className="relative"
                    onMouseEnter={openShop}
                    onMouseLeave={closeShop}
                  >
                    <Link
                      href={l.href}
                      aria-expanded={shopOpen}
                      aria-haspopup="true"
                      className={`relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        active || shopOpen
                          ? "bg-maroon/5 text-maroon"
                          : "text-charcoal hover:bg-maroon/5 hover:text-maroon"
                      }`}
                    >
                      Shop
                      <ChevronRight
                        size={13}
                        className={`transition-transform duration-300 ${
                          shopOpen ? "rotate-90" : ""
                        }`}
                      />
                    </Link>

                    {/* Mega Menu */}
                    <div
                      className={`absolute left-1/2 top-full w-[min(90vw,780px)] -translate-x-1/2 pt-3 transition-all duration-200 ${
                        shopOpen
                          ? "visible translate-y-0 opacity-100"
                          : "invisible translate-y-1 opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden rounded-[1.75rem] border border-maroon/10 bg-ivory/95 shadow-[0_24px_70px_-16px_rgba(122,31,43,0.22)] backdrop-blur-xl">
                        {/* Header row */}
                        <div className="flex items-center justify-between border-b border-maroon/8 px-5 py-3">
                          <div className="flex items-center gap-2">
                            <Sparkles size={14} className="text-marigold" />
                            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-maroon/70">
                              Explore Collections
                            </p>
                          </div>
                          <Link
                            href="/shop"
                            className="group/link inline-flex items-center gap-1 text-xs font-medium text-maroon hover:underline"
                          >
                            View all
                            <ArrowUpRight
                              size={12}
                              className="transition group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                            />
                          </Link>
                        </div>

                        {/* Category grid */}
                        <div className="grid grid-cols-5 gap-2 p-4">
                          {categories.map((c) => (
                            <Link
                              key={c.slug}
                              href={`/shop/${c.slug}`}
                              className="group/c flex flex-col items-center gap-2 rounded-2xl p-2 transition-all duration-300 hover:-translate-y-0.5 hover:bg-maroon/5"
                            >
                              <div className="relative aspect-square w-full overflow-hidden rounded-2xl ring-1 ring-maroon/8 transition-all duration-300 group-hover/c:ring-2 group-hover/c:ring-marigold/50">
                                <SafeImage
                                  src={images.categories[c.slug]}
                                  alt={c.name}
                                  sizes="140px"
                                  className="transition duration-500 group-hover/c:scale-110"
                                />
                              </div>
                              <span className="text-center text-xs font-semibold leading-tight text-charcoal transition group-hover/c:text-maroon">
                                {c.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-maroon/5 text-maroon"
                      : "text-charcoal hover:bg-maroon/5 hover:text-maroon"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          {/* ─── Right Actions ─── */}
          <div className="flex items-center gap-0.5 md:gap-1">
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

            {/* Divider */}
            <span className="mx-1 hidden h-6 w-px bg-maroon/10 md:block" />

            {/* WhatsApp CTA */}
            <a
              href={buildWhatsAppLink("Hello MKV Collection 🙏")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa hidden !px-4 !py-2 lg:inline-flex"
            >
              <MessageCircle size={16} />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* ─── Mobile Drawer ─── */}
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
            <div className="flex items-center justify-between border-b border-maroon/8 px-5 py-4">
              <Link
                href="/"
                onClick={closeDrawer}
                className="flex items-center gap-2.5"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-maroon to-maroon-dark font-heading text-[11px] font-bold text-marigold shadow-sm">
                  MKV
                </span>
                <span className="font-heading text-base font-bold text-maroon">
                  {BRAND_NAME}
                </span>
              </Link>
              <button
                className={`${iconBtn} -mr-2`}
                onClick={closeDrawer}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Search bar */}
            <div className="px-5 pt-4 pb-2">
              <Link
                href="/shop"
                onClick={closeDrawer}
                className="flex items-center gap-3 rounded-full border border-maroon/15 bg-white px-4 py-3 text-sm text-charcoal/55 shadow-sm transition hover:border-maroon/30 hover:text-charcoal"
              >
                <Search size={18} className="text-maroon" />
                <span>Search products...</span>
              </Link>
            </div>

            {/* Scrollable nav */}
            <nav
              className="flex-1 overflow-y-auto px-5 py-3"
              aria-label="Mobile"
            >
              {/* Primary links */}
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-maroon/60">
                Menu
              </p>
              <div className="mb-6 flex flex-col">
                {NAV_LINKS.map((l) => {
                  const active = isActive(l.href);
                  return (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={closeDrawer}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center justify-between border-b border-maroon/8 py-3.5 font-heading text-base font-semibold transition ${
                        active ? "text-maroon" : "text-charcoal hover:text-maroon"
                      }`}
                    >
                      {l.label}
                      <ChevronRight
                        size={16}
                        className={
                          active ? "text-maroon" : "text-maroon/30"
                        }
                      />
                    </Link>
                  );
                })}
              </div>

              {/* Categories */}
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-maroon/60">
                Shop by Category
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/shop/${c.slug}`}
                    onClick={closeDrawer}
                    className="group overflow-hidden rounded-2xl border border-maroon/8 bg-white transition-all duration-300 hover:border-maroon/25 hover:shadow-md active:scale-[0.98]"
                  >
                    <div className="relative aspect-[5/4] overflow-hidden">
                      <SafeImage
                        src={images.categories[c.slug]}
                        alt={c.name}
                        sizes="180px"
                        className="transition duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                    <div className="flex items-center justify-between gap-1 px-2.5 py-2">
                      <span className="text-[11px] font-semibold leading-tight text-charcoal">
                        {c.name}
                      </span>
                      <ChevronRight
                        size={12}
                        className="shrink-0 text-maroon/40 transition group-hover:translate-x-0.5 group-hover:text-maroon"
                      />
                    </div>
                  </Link>
                ))}
              </div>

              <div className="h-4" />
            </nav>

            {/* Footer CTA */}
            <div className="border-t border-maroon/8 bg-white/70 p-4 backdrop-blur">
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

      {/* ─── Mobile Bottom Action Bar (Optional but recommended) ─── */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-maroon/10 bg-ivory/95 px-3 py-2 backdrop-blur-xl md:hidden">
        <div className="flex items-center justify-around gap-1">
          <Link
            href="/shop"
            className="flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 text-[10px] font-medium text-charcoal/70 transition active:scale-95"
          >
            <Search size={18} />
            Shop
          </Link>
          <Link
            href="/wishlist"
            className="relative flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 text-[10px] font-medium text-charcoal/70 transition active:scale-95"
          >
            <Heart size={18} />
            Wishlist
            <CountBadge kind="wishlist" />
          </Link>
          <Link
            href="/cart"
            className="relative flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 text-[10px] font-medium text-charcoal/70 transition active:scale-95"
          >
            <ShoppingBag size={18} />
            Cart
            <CountBadge kind="cart" />
          </Link>
          <a
            href={buildWhatsAppLink("Hello MKV Collection 🙏")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 text-[10px] font-medium text-maroon transition active:scale-95"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}