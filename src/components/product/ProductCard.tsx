import Link from "next/link";
import { MessageCircle, Star, Eye, ShoppingBag } from "lucide-react";
import { Product, discountPct, formatPrice } from "@/data/products";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { SITE_URL } from "@/config/site";
import SafeImage from "@/components/ui/SafeImage";
import WishlistButton from "./WishlistButton";

export default function ProductCard({ product: p }: { product: Product }) {
  const off = discountPct(p);
  const msg = `Hello MKV Collection 🙏\nI would like to order / enquire about this product:\nProduct: ${p.title}\nProduct ID: ${p.id}\nQuantity: 1\nPrice: ${formatPrice(p)}\nLink: ${SITE_URL}/products/${p.slug}\n📍 Location: not shared`;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-maroon/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-maroon/20 hover:shadow-[0_16px_40px_-16px_rgba(122,31,43,0.22)] md:rounded-3xl">
      {/* ─── Image ─── */}
      <Link
        href={`/products/${p.slug}`}
        className="relative block aspect-square overflow-hidden bg-gradient-to-br from-peach to-cream"
        aria-label={p.title}
      >
        <SafeImage
          src={p.images[0] ?? ""}
          fallback={p.images[1] ?? p.images[0] ?? ""}
          alt={p.shortTitle}
          className="transition duration-700 group-hover:scale-105 group-hover:opacity-0"
        />
        {p.images[1] && (
          <SafeImage
            src={p.images[1]}
            alt=""
            className="scale-105 opacity-0 transition duration-700 group-hover:scale-100 group-hover:opacity-100"
          />
        )}

        {/* Soft gradient veil on hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-maroon-dark/25 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

        {/* Quick view pill (desktop only) */}
        <span className="absolute bottom-3 left-1/2 hidden -translate-x-1/2 translate-y-2 items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-maroon opacity-0 shadow-md backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:inline-flex">
          <Eye size={12} /> Quick view
        </span>

        {/* Top-left badges */}
        <div className="absolute left-2 top-2 flex flex-col gap-1 md:left-3 md:top-3">
          {p.isBestseller && (
            <span className="inline-flex items-center gap-1 rounded-full bg-marigold px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-maroon-dark shadow-sm md:px-2.5 md:py-1">
              ★ Bestseller
            </span>
          )}
          {p.isNew && (
            <span className="inline-flex items-center gap-1 rounded-full bg-maroon px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm md:px-2.5 md:py-1">
              New
            </span>
          )}
        </div>

        {/* Discount badge — top-right, but offset for wishlist */}
        {off > 0 && (
          <span className="absolute right-2 top-2 rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-bold text-maroon shadow-sm backdrop-blur md:right-3 md:top-3 md:px-2.5 md:py-1">
            {off}% OFF
          </span>
        )}
      </Link>

      {/* Wishlist — sits below discount */}
      <WishlistButton
        id={p.id}
        size="sm"
        className="absolute right-2 top-9 z-10 !bg-white/90 !shadow-sm backdrop-blur md:right-3 md:top-11"
      />

      {/* ─── Content ─── */}
      <div className="flex flex-1 flex-col p-3 md:p-4">
        {/* Title */}
        <Link href={`/products/${p.slug}`} className="group/title">
          <h3 className="line-clamp-2 min-h-[2.4rem] font-body text-[13px] font-semibold leading-snug text-charcoal transition group-hover/title:text-maroon md:min-h-[2.8rem] md:text-sm">
            {p.title}
          </h3>
        </Link>

        {/* Rating */}
        {!p.isPlaceholder && (
          <div className="mt-1.5 flex items-center gap-1 text-[11px] md:mt-2">
            <span className="inline-flex items-center gap-0.5 rounded-full bg-marigold/15 px-1.5 py-0.5">
              <Star size={10} className="fill-marigold text-marigold" />
              <span className="font-bold text-charcoal">{p.rating}</span>
            </span>
            <span className="text-charcoal/50">({p.reviewCount})</span>
          </div>
        )}

        {/* Price */}
        <div className="mt-1.5 flex flex-wrap items-baseline gap-1.5 md:mt-2 md:gap-2">
          <span className="text-base font-bold tracking-tight text-maroon md:text-lg">
            {formatPrice(p)}
          </span>
          {off > 0 && (
            <span className="text-[11px] text-charcoal/45 line-through md:text-sm">
              ₹{p.mrp}
            </span>
          )}
        </div>

        {/* Product ID */}
        <span className="mt-1.5 w-fit rounded-full bg-peach/60 px-2 py-0.5 text-[10px] font-medium text-charcoal/60 md:mt-2 md:px-2.5 md:py-1">
          ID: {p.id}
        </span>

        {/* ─── Buy Now — mobile-first ─── */}
        <a
          href={buildWhatsAppLink(msg)}
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn relative mt-3 flex items-center justify-center gap-1.5 overflow-hidden rounded-full bg-[#25D366] px-4 py-2.5 text-xs font-semibold text-white shadow-[0_4px_14px_-4px_rgba(37,211,102,0.5)] transition-all duration-200 hover:shadow-[0_6px_20px_-4px_rgba(37,211,102,0.6)] hover:brightness-105 active:scale-[0.97] md:mt-4 md:gap-2 md:py-3 md:text-sm"
        >
          <MessageCircle size={14} className="md:h-4 md:w-4" />
          <span>Buy Now</span>
        </a>
      </div>
    </article>
  );
}