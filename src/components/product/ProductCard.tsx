import Link from "next/link";
import { MessageCircle, Star } from "lucide-react";
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
    <article className="card group relative flex h-full flex-col overflow-hidden">
      <Link href={`/products/${p.slug}`} className="relative block aspect-square overflow-hidden bg-peach" aria-label={p.title}>
        <SafeImage src={localProductImage(p.id)} fallback={p.images[0]} alt={p.shortTitle} className="transition duration-500 group-hover:scale-105 group-hover:opacity-0" />
        <SafeImage src={p.images[1]} alt="" className="scale-105 opacity-0 transition duration-500 group-hover:scale-100 group-hover:opacity-100" />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {p.isBestseller && <span className="rounded-full bg-marigold px-2.5 py-1 text-[11px] font-semibold text-maroon-dark">Bestseller</span>}
          {p.isNew && <span className="rounded-full bg-maroon px-2.5 py-1 text-[11px] font-semibold text-white">New</span>}
          {off > 0 && <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-maroon">{off}% OFF</span>}
        </div>
      </Link>
      <WishlistButton id={p.id} className="absolute right-3 top-3 z-10" />
      <div className="flex flex-1 flex-col p-4">
        <Link href={`/products/${p.slug}`}><h3 className="line-clamp-2 min-h-[2.8rem] font-body text-sm font-semibold leading-snug hover:text-maroon">{p.title}</h3></Link>
        {!p.isPlaceholder && (
          <p className="mt-2 flex items-center gap-1 text-xs text-charcoal/70"><Star size={14} className="fill-marigold text-marigold" />{p.rating} <span>({p.reviewCount})</span></p>
        )}
        <div className="mt-2 flex flex-wrap items-baseline gap-2">
          <span className="text-lg font-bold text-maroon">{formatPrice(p)}</span>
          {off > 0 && <span className="text-sm text-charcoal/50 line-through">₹{p.mrp}</span>}
        </div>
        <span className="mt-2 w-fit rounded-full bg-peach px-2.5 py-1 text-[11px] font-medium text-charcoal/70">ID: {p.id}</span>
        <a href={buildWhatsAppLink(msg)} target="_blank" rel="noopener noreferrer" className="btn-wa mt-4 !py-2.5">
          <MessageCircle size={16} /> Buy Now
        </a>
      </div>
    </article>
  );
}
