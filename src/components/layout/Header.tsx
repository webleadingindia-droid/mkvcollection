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
  Home,
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

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    setDrawer(false);
    setShopOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

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

  const openShop = () => {
    if (shopTimeout.current) clearTimeout(shopTimeout.current);
    setShopOpen(true);
  };
  const closeShop = () => {
    shopTimeout.current = setTimeout(() => setShopOpen(false), 100);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const iconBtn =
    "relative flex h-9 w-9 items-center justify-center rounded-full text-charcoal transition-all duration-200 ease-out hover:bg-maroon/8 hover:text-maroon active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory md:h-10 md:w-10";

  const hideBottomNav = pathname.startsWith("/products/") || drawer;

  return (
    <>
      {/* ═══════ HEADER ═══════ */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ease-out ${
          scrolled
            ? "border-b border-maroon/8 bg-ivory/75 shadow-[0_2px_20px_-8px_rgba(122,31,43,0.12)] backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-cream/60 backdrop-blur-md"
        }`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-marigold/40 to-transparent"
        />

        <div className="container-x flex h-12 items-center justify-between gap-2 md:h-16 lg:h-20">
          {/* Mobile Menu */}
          <button
            className={`${iconBtn} -ml-1.5 lg:hidden`}
            onClick={() => setDrawer(true)}
            aria-label="Open menu"
            aria-expanded={drawer}
          >
            <Menu size={20} />
          </button>

          {/* Logo — Full text on all devices */}
          <Link
            href="/"
            className="group flex items-center gap-1.5 lg:gap-2.5"
            aria-label={`${BRAND_NAME} home`}
          >
            <span className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-maroon to-maroon-dark font-heading text-[10px] font-bold text-marigold shadow-sm ring-1 ring-maroon/10 transition-transform duration-300 group-hover:scale-105 lg:h-10 lg:w-10 lg:text-xs">
              <span className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              MKV
            </span>
            <span className="font-heading text-[15px] font-bold leading-none text-maroon sm:text-lg lg:text-xl">
              Collection
            </span>
          </Link>

          {/* Desktop Nav — Bigger & More Premium */}
          <nav
            className="hidden items-center gap-1 lg:flex lg:gap-1.5"
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
                      className={`relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ease-out lg:px-5 lg:py-2.5 lg:text-[15px] ${
                        active || shopOpen
                          ? "bg-maroon/5 text-maroon"
                          : "text-charcoal/80 hover:bg-maroon/5 hover:text-maroon"
                      }`}
                    >
                      Shop
                      <ChevronRight
                        size={14}
                        className={`transition-transform duration-300 lg:h-[15px] lg:w-[15px] ${
                          shopOpen ? "rotate-90" : ""
                        }`}
                      />
                    </Link>

                    {/* Mega Menu — slightly larger */}
                    <div
                      className={`absolute left-1/2 top-full w-[min(90vw,840px)] -translate-x-1/2 pt-2 transition-all duration-200 ease-out ${
                        shopOpen
                          ? "visible translate-y-0 opacity-100"
                          : "invisible translate-y-1 opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden rounded-2xl border border-maroon/10 bg-ivory/90 shadow-[0_20px_60px_-16px_rgba(122,31,43,0.2)] backdrop-blur-xl backdrop-saturate-150">
                        <div className="flex items-center justify-between border-b border-maroon/8 px-5 py-3">
                          <div className="flex items-center gap-2">
                            <Sparkles size={14} className="text-marigold" />
                            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-maroon/70">
                              Explore Collections
                            </p>
                          </div>
                          <Link
                            href="/shop"
                            className="group/link inline-flex items-center gap-1 text-xs font-medium text-maroon hover:underline"
                          >
                            View all
                            <ArrowUpRight
                              size={13}
                              className="transition group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                            />
                          </Link>
                        </div>

                        <div className="grid grid-cols-5 gap-2 p-4">
                          {categories.map((c) => (
                            <Link
                              key={c.slug}
                              href={`/shop/${c.slug}`}
                              className="group/c flex flex-col items-center gap-2 rounded-xl p-2 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-maroon/5"
                            >
                              <div className="relative aspect-square w-full overflow-hidden rounded-lg ring-1 ring-maroon/8 transition-all duration-300 group-hover/c:ring-2 group-hover/c:ring-marigold/40">
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
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ease-out lg:px-5 lg:py-2.5 lg:text-[15px] ${
                    active
                      ? "bg-maroon/5 text-maroon"
                      : "text-charcoal/80 hover:bg-maroon/5 hover:text-maroon"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          {/* Right actions — bigger icons on desktop */}
          <div className="flex items-center gap-0.5 md:gap-1 lg:gap-1.5">
            <Link href="/shop" className={iconBtn} aria-label="Search products">
              <Search size={18} className="lg:h-5 lg:w-5" />
            </Link>
            <Link
              href="/wishlist"
              className={`${iconBtn} hidden sm:flex`}
              aria-label="Wishlist"
            >
              <Heart size={18} className="lg:h-5 lg:w-5" />
              <CountBadge kind="wishlist" />
            </Link>
            <Link href="/cart" className={iconBtn} aria-label="Enquiry cart">
              <ShoppingBag size={18} className="lg:h-5 lg:w-5" />
              <CountBadge kind="cart" />
            </Link>

            <span className="mx-1 hidden h-5 w-px bg-maroon/10 md:block lg:mx-1.5 lg:h-6" />

            <a
              href={buildWhatsAppLink("Hello MKV Collection 🙏")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa hidden !px-4 !py-2 !text-sm lg:inline-flex"
            >
              <MessageCircle size={16} />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* ═══════ MOBILE SIDEBAR (unchanged — compact) ═══════ */}
      {drawer && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div
            className="absolute inset-0 animate-[fadeIn_200ms_ease-out] bg-maroon-dark/50 backdrop-blur-sm"
            onClick={closeDrawer}
          />

          <div
            ref={drawerRef}
            className="absolute left-0 top-0 flex h-full w-[85%] max-w-xs animate-[slideIn_320ms_cubic-bezier(0.16,1,0.3,1)] flex-col overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-cream/95 via-ivory/95 to-peach/20 backdrop-blur-xl backdrop-saturate-150" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,166,35,0.12),transparent_45%)]" />

            <div className="relative flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-maroon/10 px-4 py-3">
                <Link
                  href="/"
                  onClick={closeDrawer}
                  className="flex items-center gap-2"
                >
                  <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-maroon to-maroon-dark font-heading text-[10px] font-bold text-marigold shadow-sm ring-1 ring-marigold/20">
                    <span className="absolute inset-0 bg-gradient-to-tr from-transparent via-marigold/30 to-transparent" />
                    MKV
                  </span>
                  <div className="leading-tight">
                    <span className="block font-heading text-sm font-bold text-maroon">
                      {BRAND_NAME}
                    </span>
                    <span className="block text-[9px] uppercase tracking-wider text-maroon/50">
                      Handmade Miniatures
                    </span>
                  </div>
                </Link>
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/60 text-charcoal/70 shadow-sm backdrop-blur transition-all duration-200 hover:bg-white hover:text-maroon active:scale-90"
                  onClick={closeDrawer}
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="px-4 pt-3 pb-2">
                <Link
                  href="/shop"
                  onClick={closeDrawer}
                  className="group flex items-center gap-2.5 rounded-xl border border-maroon/12 bg-white/70 px-3 py-2.5 text-[13px] text-charcoal/55 shadow-sm backdrop-blur transition-all duration-200 hover:border-maroon/25 hover:bg-white hover:text-charcoal"
                >
                  <Search size={16} className="text-maroon" />
                  <span className="flex-1">Search products...</span>
                </Link>
              </div>

              <nav
                className="flex-1 overflow-y-auto px-4 py-1.5"
                aria-label="Mobile"
              >
                <p className="mb-1.5 mt-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-maroon/50">
                  Menu
                </p>
                <div className="mb-5 space-y-0.5">
                  {NAV_LINKS.map((l) => {
                    const active = isActive(l.href);
                    return (
                      <Link
                        key={l.href}
                        href={l.href}
                        onClick={closeDrawer}
                        aria-current={active ? "page" : undefined}
                        className={`group flex items-center justify-between rounded-lg px-2.5 py-2.5 font-heading text-[13px] font-semibold transition-all duration-200 ease-out ${
                          active
                            ? "bg-maroon text-white shadow-sm"
                            : "text-charcoal hover:bg-white/60 hover:text-maroon"
                        }`}
                      >
                        <span>{l.label}</span>
                        <ChevronRight
                          size={14}
                          className={`transition-all duration-200 ${
                            active
                              ? "text-white/80"
                              : "text-maroon/30 group-hover:translate-x-0.5 group-hover:text-maroon"
                          }`}
                        />
                      </Link>
                    );
                  })}
                </div>

                <div className="mb-2 flex items-center justify-between">
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-maroon/50">
                    Categories
                  </p>
                  <Link
                    href="/shop"
                    onClick={closeDrawer}
                    className="text-[10px] font-semibold text-maroon hover:underline"
                  >
                    View all
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {categories.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/shop/${c.slug}`}
                      onClick={closeDrawer}
                      className="group relative overflow-hidden rounded-xl border border-white/60 bg-white/80 shadow-sm backdrop-blur-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-maroon/20 hover:shadow-md active:scale-[0.98]"
                    >
                      <div className="relative aspect-[5/4] overflow-hidden">
                        <SafeImage
                          src={images.categories[c.slug]}
                          alt={c.name}
                          sizes="150px"
                          className="transition duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/55 via-maroon-dark/10 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-2">
                          <span className="text-[10px] font-bold leading-tight text-white drop-shadow">
                            {c.name}
                          </span>
                          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/95 text-maroon shadow-sm transition group-hover:scale-110">
                            <ChevronRight size={10} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="h-4" />
              </nav>

              <div className="relative border-t border-maroon/10 bg-white/50 p-3 backdrop-blur-xl">
                <a
                  href={buildWhatsAppLink("Hello MKV Collection 🙏")}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#25D366] to-[#1EA855] px-3 py-2.5 text-[13px] font-semibold text-white shadow-[0_3px_12px_-3px_rgba(37,211,102,0.5)] transition-all duration-200 hover:shadow-[0_5px_16px_-3px_rgba(37,211,102,0.6)] hover:brightness-105 active:scale-[0.98]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={15} />
                  Chat on WhatsApp
                </a>
                <p className="mt-1.5 text-center text-[9px] text-charcoal/50">
                  Quick replies · Real people
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════ MOBILE BOTTOM NAVBAR (unchanged) ═══════ */}
      {!hideBottomNav && (
        <div className="fixed inset-x-0 bottom-0 z-30 flex justify-center px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1.5 md:hidden">
          <nav
            aria-label="Mobile quick actions"
            className="relative flex w-full max-w-sm items-center justify-around gap-0.5 overflow-hidden rounded-xl border border-white/40 bg-gradient-to-b from-ivory/90 via-ivory/80 to-cream/70 p-1 shadow-[0_-4px_24px_-8px_rgba(122,31,43,0.22),0_2px_12px_-4px_rgba(122,31,43,0.12)] backdrop-blur-xl backdrop-saturate-150"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"
            />

            {[
              {
                href: "/",
                icon: Home,
                label: "Home",
                isActive: pathname === "/",
              },
              {
                href: "/shop",
                icon: Search,
                label: "Shop",
                isActive: pathname.startsWith("/shop"),
              },
              {
                href: "/wishlist",
                icon: Heart,
                label: "Wishlist",
                isActive: pathname === "/wishlist",
                badge: "wishlist" as const,
              },
              {
                href: "/cart",
                icon: ShoppingBag,
                label: "Cart",
                isActive: pathname === "/cart",
                badge: "cart" as const,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={item.isActive ? "page" : undefined}
                  className={`group relative flex flex-1 flex-col items-center justify-center gap-0.5 rounded-lg py-1.5 text-[9px] font-semibold transition-all duration-200 ease-out active:scale-95 ${
                    item.isActive
                      ? "bg-gradient-to-b from-maroon to-maroon-dark text-white shadow-[0_2px_8px_-2px_rgba(122,31,43,0.4)]"
                      : "text-charcoal/65 hover:bg-white/60 hover:text-maroon"
                  }`}
                >
                  <span className="relative">
                    <Icon
                      size={16}
                      className={
                        item.isActive
                          ? "drop-shadow-sm"
                          : "transition duration-200 group-hover:scale-110"
                      }
                    />
                    {item.badge && <CountBadge kind={item.badge} />}
                  </span>
                  <span className="leading-none">{item.label}</span>
                </Link>
              );
            })}

            <a
              href={buildWhatsAppLink("Hello MKV Collection 🙏")}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-1 flex-col items-center justify-center gap-0.5 rounded-lg py-1.5 text-[9px] font-semibold text-[#1EA855] transition-all duration-200 ease-out hover:bg-[#25D366]/10 active:scale-95"
            >
              <MessageCircle
                size={16}
                className="transition duration-200 group-hover:scale-110"
              />
              <span className="leading-none">WhatsApp</span>
            </a>
          </nav>
        </div>
      )}
    </>
  );
}