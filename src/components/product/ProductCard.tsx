import Link from "next/link";
import { MessageCircle, Star, Eye } from "lucide-react";
import { Product, discountPct, formatPrice } from "@/data/products";
import { localProductImage } from "@/data/images";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { SITE_URL } from "@/config/site";
import SafeImage from "@/components/ui/SafeImage";
import WishlistButton from "./WishlistButton";

export default function ProductCard({ product: p }: { product: Product }) {
  const off = discountPct(p);
  const msg = `Hello MKV Collection 🙏\nI would like to order / enquire about this product:\nProduct: ${p.title}\nProduct ID: ${p.id}\nQuantity: 1\nPrice: ${formatPrice(p)}\nLink: ${SITE_URL}/products/${p.slug}\n📍 Location: not shared`;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-maroon/10 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-maroon/20 hover:shadow-[0_12px_32px_-12px_rgba(122,31,43,0.18)] md:rounded-3xl">
      {/* Image */}
      <Link
        href={`/products/${p.slug}`}
        className="relative block aspect-square overflow-hidden bg-peach"
        aria-label={p.title}
      >
        <SafeImage
          src={localProductImage(p.id)}
          fallback={p.images[0]}
          alt={p.shortTitle}
          className="transition duration-500 group-hover:scale-105 group-hover:opacity-0"
        />
        <SafeImage
          src={p.images[1]}
          alt=""
          className="scale-105 opacity-0 transition duration-500 group-hover:scale-100 group-hover:opacity-100"
        />

        {/* Gradient veil on hover (desktop only) */}
        <div className="absolute inset-0 hidden bg-gradient-to-t from-maroon-dark/30 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100 md:block" />

        {/* Quick view pill (desktop only) */}
        <span className="absolute bottom-3 left-1/2 hidden -translate-x-1/2 translate-y-2 items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-maroon opacity-0 shadow-md backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:inline-flex">
          <Eye size={12} /> Quick view
        </span>

        {/* Badges */}
        <div className="absolute left-2 top-2 flex flex-col gap-1 md:left-3 md:top-3 md:gap-1.5">
          {p.isBestseller && (
            <span className="rounded-full bg-marigold px-2 py-0.5 text-[10px] font-semibold text-maroon-dark md:px-2.5 md:py-1 md:text-[11px]">
              Bestseller
            </span>
          )}
          {p.isNew && (
            <span className="rounded-full bg-maroon px-2 py-0.5 text-[10px] font-semibold text-white md:px-2.5 md:py-1 md:text-[11px]">
              New
            </span>
          )}
        </div>

        {/* Discount Badge */}
        {off > 0 && (
          <span className="absolute right-2 top-2 z-[1] rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-bold text-maroon shadow-sm backdrop-blur md:right-3 md:top-3 md:px-2.5 md:py-1 md:text-[11px]">
            {off}% OFF
          </span>
        )}
      </Link>

      {/* Wishlist */}
      <WishlistButton
        id={p.id}
        className="absolute right-2 top-10 z-10 md:right-3 md:top-12"
      />

      {/* Content */}
      <div className="flex flex-1 flex-col p-3 md:p-4">
        <Link href={`/products/${p.slug}`} className="group/title">
          <h3 className="line-clamp-2 min-h-[2.4rem] font-body text-[13px] font-semibold leading-snug text-charcoal transition group-hover/title:text-maroon md:min-h-[2.8rem] md:text-sm">
            {p.title}
          </h3>
        </Link>

        {/* Rating */}
        {!p.isPlaceholder && (
          <p className="mt-1 flex items-center gap-1 text-[11px] text-charcoal/70 md:mt-2 md:text-xs">
            <Star size={12} className="fill-marigold text-marigold md:h-3.5 md:w-3.5" />
            <span className="font-medium text-charcoal">{p.rating}</span>
            <span className="text-charcoal/50">({p.reviewCount})</span>
          </p>
        )}

        {/* Price */}
        <div className="mt-1.5 flex flex-wrap items-baseline gap-1.5 md:mt-2 md:gap-2">
          <span className="text-base font-bold text-maroon md:text-lg">
            {formatPrice(p)}
          </span>
          {off > 0 && (
            <span className="text-[11px] text-charcoal/50 line-through md:text-sm">
              ₹{p.mrp}
            </span>
          )}
        </div>

        {/* Product ID */}
        <span className="mt-1.5 w-fit rounded-full bg-peach/70 px-2 py-0.5 text-[10px] font-medium text-charcoal/70 md:mt-2 md:px-2.5 md:py-1 md:text-[11px]">
          ID: {p.id}
        </span>

        {/* Buy Now */}
        <a
          href={buildWhatsAppLink(msg)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-wa mt-auto !py-2 !text-xs md:!py-2.5 md:!text-sm"
          style={{ marginTop: "auto", paddingTop: "0.5rem" }}
        >
          <MessageCircle size={14} className="md:h-4 md:w-4" />
          Buy Now
        </a>
      </div>
    </article>
  );
}