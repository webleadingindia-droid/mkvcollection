import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  PackageCheck,
  ShieldCheck,
  Star,
  Truck,
  Sparkles,
  Check,
  Tag,
  Clock,
} from "lucide-react";
import ProductGallery from "@/components/product/ProductGallery";
import ProductActions from "@/components/product/ProductActions";
import ProductCard from "@/components/product/ProductCard";
import WishlistButton from "@/components/product/WishlistButton";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  categories,
  discountPct,
  formatPrice,
  getProductBySlug,
  getRelated,
  products,
} from "@/data/products";
import {
  BRAND_NAME,
  FREE_SHIPPING_THRESHOLD,
  SITE_URL,
} from "@/config/site";

type Props = { params: { slug: string } };

export const generateStaticParams = () =>
  products.map((p) => ({ slug: p.slug }));
export const dynamicParams = false;

export function generateMetadata({ params }: Props): Metadata {
  const p = getProductBySlug(params.slug);
  if (!p) return {};
  return {
    title: p.shortTitle,
    description: p.description.slice(0, 155),
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: {
      title: `${p.shortTitle} | ${BRAND_NAME}`,
      description: p.description.slice(0, 155),
      images: [p.images[0]],
    },
  };
}

export default function ProductPage({ params }: Props) {
  const p = getProductBySlug(params.slug);
  if (!p) notFound();
  const cat = categories.find((c) => c.slug === p.category)!;
  const off = discountPct(p);
  const related = getRelated(p);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.title,
    description: p.description,
    sku: p.id,
    image: p.images,
    brand: { "@type": "Brand", name: BRAND_NAME },
    ...(p.isPlaceholder
      ? {}
      : {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: p.rating,
            reviewCount: p.reviewCount,
          },
          offers: {
            "@type": "Offer",
            priceCurrency: "INR",
            price: p.price,
            availability: "https://schema.org/InStock",
            url: `${SITE_URL}/products/${p.slug}`,
          },
        }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="pt-4 md:pt-8">
        <div className="container-x">
          {/* ═══ Breadcrumb ═══ */}
          <nav
            aria-label="Breadcrumb"
            className="mb-5 flex flex-wrap items-center gap-1.5 text-[11px] text-charcoal/55 md:mb-7 md:text-sm"
          >
            <Link href="/" className="rounded transition hover:text-maroon">
              Home
            </Link>
            <ChevronRight size={11} className="text-charcoal/35" />
            <Link href="/shop" className="rounded transition hover:text-maroon">
              Shop
            </Link>
            <ChevronRight size={11} className="text-charcoal/35" />
            <Link
              href={`/shop/${cat.slug}`}
              className="rounded transition hover:text-maroon"
            >
              {cat.name}
            </Link>
            <ChevronRight size={11} className="text-charcoal/35" />
            <span className="line-clamp-1 font-medium text-charcoal/75">
              {p.shortTitle}
            </span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
            {/* ═══ Gallery (sticky on desktop) ═══ */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="overflow-hidden rounded-2xl border border-maroon/10 bg-white shadow-[0_8px_32px_-16px_rgba(122,31,43,0.12)] md:rounded-3xl">
                <ProductGallery id={p.id} images={p.images} alt={p.title} />
              </div>
            </div>

            {/* ═══ Info Column ═══ */}
            <div>
              {/* Badges + Wishlist (top row) */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
                  {p.isBestseller && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-marigold/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-maroon-dark shadow-sm">
                      <Sparkles size={11} /> Bestseller
                    </span>
                  )}
                  {p.isNew && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-maroon px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                      <Tag size={11} /> New
                    </span>
                  )}
                  {p.isGiftable && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-peach px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-maroon shadow-sm">
                      <Check size={11} /> Giftable
                    </span>
                  )}
                </div>

                {/* ✅ Wishlist — top-right, alag jagah */}
                <WishlistButton
                  id={p.id}
                  size="md"
                  className="!border !border-maroon/15 !bg-white shadow-sm shrink-0"
                />
              </div>

              {/* Title */}
              <h1 className="mt-3 font-heading text-2xl font-bold leading-tight tracking-tight text-maroon-dark sm:text-3xl md:mt-4 md:text-4xl">
                {p.title}
              </h1>

              {/* Rating */}
              {!p.isPlaceholder && (
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i <= Math.round(p.rating)
                            ? "fill-marigold text-marigold"
                            : "fill-charcoal/10 text-charcoal/20"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-charcoal">
                    {p.rating}
                  </span>
                  <span className="text-xs text-charcoal/55">
                    ({p.reviewCount} reviews)
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
                <span className="text-3xl font-bold tracking-tight text-maroon md:text-4xl">
                  {formatPrice(p)}
                </span>
                {off > 0 && (
                  <>
                    <span className="text-base text-charcoal/40 line-through">
                      ₹{p.mrp}
                    </span>
                    <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold text-green-800">
                      {off}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="mt-1 text-[11px] text-charcoal/50">
                Inclusive of all taxes · Product ID: {p.id}
              </p>

              {/* Description */}
              <p className="mt-5 text-sm leading-relaxed text-charcoal/75 md:text-base">
                {p.description}
              </p>

              {/* Actions */}
              <ProductActions product={p} />

              {/* Trust strip */}
              <div className="mt-6 grid grid-cols-1 gap-2 rounded-2xl border border-maroon/10 bg-gradient-to-br from-ivory to-cream/60 p-4 text-sm sm:grid-cols-3">
                <div className="flex items-start gap-2.5">
                  <Truck size={18} className="mt-0.5 shrink-0 text-maroon" />
                  <div className="leading-tight">
                    <p className="text-xs font-semibold text-charcoal">
                      Free shipping
                    </p>
                    <p className="text-[11px] text-charcoal/60">
                      Above ₹{FREE_SHIPPING_THRESHOLD}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <PackageCheck
                    size={18}
                    className="mt-0.5 shrink-0 text-maroon"
                  />
                  <div className="leading-tight">
                    <p className="text-xs font-semibold text-charcoal">
                      Secure packaging
                    </p>
                    <p className="text-[11px] text-charcoal/60">
                      Padded &amp; safe
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck
                    size={18}
                    className="mt-0.5 shrink-0 text-maroon"
                  />
                  <div className="leading-tight">
                    <p className="text-xs font-semibold text-charcoal">
                      Quality checked
                    </p>
                    <p className="text-[11px] text-charcoal/60">
                      By hand
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ═══ Details Section ═══ */}
          <div className="mt-14 grid gap-5 md:grid-cols-2 md:gap-6">
            <div className="rounded-2xl border border-maroon/10 bg-white p-5 shadow-sm md:rounded-3xl md:p-7">
              <div className="mb-4 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-marigold/20">
                  <Sparkles size={15} className="text-maroon" />
                </span>
                <h2 className="font-heading text-lg font-bold text-maroon-dark md:text-xl">
                  Why you&apos;ll love it
                </h2>
              </div>
              <ul className="space-y-3 text-sm text-charcoal/80">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100">
                      <Check
                        size={12}
                        className="text-green-700"
                        strokeWidth={3}
                      />
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-maroon/10 bg-white p-5 shadow-sm md:rounded-3xl md:p-7">
              <div className="mb-4 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-marigold/20">
                  <Clock size={15} className="text-maroon" />
                </span>
                <h2 className="font-heading text-lg font-bold text-maroon-dark md:text-xl">
                  Product details
                </h2>
              </div>
              <dl className="divide-y divide-maroon/8 text-sm">
                {p.specs.map((s) => (
                  <div
                    key={s.label}
                    className="flex justify-between gap-4 py-3"
                  >
                    <dt className="text-charcoal/60">{s.label}</dt>
                    <dd className="text-right font-semibold text-charcoal">
                      {s.value}
                    </dd>
                  </div>
                ))}
                <div className="flex justify-between gap-4 py-3">
                  <dt className="text-charcoal/60">Product ID</dt>
                  <dd className="font-mono text-xs font-semibold text-charcoal">
                    {p.id}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Related Products ═══ */}
      {related.length > 0 && (
        <section className="mt-16 bg-ivory py-14 md:mt-20 md:py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="You may also like"
              title={`More from ${cat.name}`}
            />
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:grid-cols-4">
              {related.map((r) => (
                <ProductCard key={r.id} product={r} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}