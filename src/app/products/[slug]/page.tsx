import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, PackageCheck, ShieldCheck, Star, Truck } from "lucide-react";
import ProductGallery from "@/components/product/ProductGallery";
import ProductActions from "@/components/product/ProductActions";
import ProductCard from "@/components/product/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { categories, discountPct, formatPrice, getProductBySlug, getRelated, products } from "@/data/products";
import { BRAND_NAME, FREE_SHIPPING_THRESHOLD, SITE_URL } from "@/config/site";

type Props = { params: { slug: string } };

export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }));
export const dynamicParams = false;

export function generateMetadata({ params }: Props): Metadata {
  const p = getProductBySlug(params.slug);
  if (!p) return {};
  return {
    title: p.shortTitle,
    description: p.description.slice(0, 155),
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: { title: `${p.shortTitle} | ${BRAND_NAME}`, description: p.description.slice(0, 155), images: [p.images[0]] },
  };
}

export default function ProductPage({ params }: Props) {
  const p = getProductBySlug(params.slug);
  if (!p) notFound();
  const cat = categories.find((c) => c.slug === p.category)!;
  const off = discountPct(p);
  const related = getRelated(p);

  const jsonLd = {
    "@context": "https://schema.org", "@type": "Product", name: p.title, description: p.description, sku: p.id,
    image: p.images, brand: { "@type": "Brand", name: BRAND_NAME },
    ...(p.isPlaceholder ? {} : {
      aggregateRating: { "@type": "AggregateRating", ratingValue: p.rating, reviewCount: p.reviewCount },
      offers: { "@type": "Offer", priceCurrency: "INR", price: p.price, availability: "https://schema.org/InStock", url: `${SITE_URL}/products/${p.slug}` },
    }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="section !pt-6 md:!pt-10">
        <div className="container-x">
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-sm text-charcoal/65">
            <Link href="/" className="hover:text-maroon">Home</Link><ChevronRight size={14} />
            <Link href="/shop" className="hover:text-maroon">Shop</Link><ChevronRight size={14} />
            <Link href={`/shop/${cat.slug}`} className="hover:text-maroon">{cat.name}</Link>
          </nav>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <ProductGallery id={p.id} images={p.images} alt={p.title} />
            <div>
              <div className="flex flex-wrap gap-2">
                {p.isBestseller && <span className="rounded-full bg-marigold px-3 py-1 text-xs font-semibold text-maroon-dark">Bestseller</span>}
                {p.isNew && <span className="rounded-full bg-maroon px-3 py-1 text-xs font-semibold text-white">New</span>}
                {p.isGiftable && <span className="rounded-full bg-peach px-3 py-1 text-xs font-semibold text-maroon">Giftable</span>}
              </div>
              <h1 className="mt-4 text-3xl font-bold leading-tight text-maroon-dark md:text-4xl">{p.title}</h1>
              {!p.isPlaceholder && (
                <p className="mt-3 flex items-center gap-1.5 text-sm text-charcoal/70"><Star size={16} className="fill-marigold text-marigold" /> {p.rating} <span>({p.reviewCount} reviews)</span></p>
              )}
              <div className="mt-5 flex flex-wrap items-baseline gap-3">
                <span className="text-3xl font-bold text-maroon">{formatPrice(p)}</span>
                {off > 0 && <><span className="text-lg text-charcoal/50 line-through">₹{p.mrp}</span><span className="rounded-full bg-peach px-2.5 py-1 text-xs font-semibold text-maroon">{off}% OFF</span></>}
              </div>
              <p className="mt-1 text-xs text-charcoal/55">Product ID: {p.id} • Inclusive of all taxes</p>
              <p className="mt-6 leading-relaxed text-charcoal/80">{p.description}</p>

              <ProductActions product={p} />

              <ul className="mt-8 grid gap-3 rounded-3xl bg-peach/60 p-5 text-sm sm:grid-cols-3">
                <li className="flex items-start gap-2"><Truck size={18} className="mt-0.5 shrink-0 text-maroon" /> Pan-India delivery. Free above ₹{FREE_SHIPPING_THRESHOLD}</li>
                <li className="flex items-start gap-2"><PackageCheck size={18} className="mt-0.5 shrink-0 text-maroon" /> Padded, secure packaging</li>
                <li className="flex items-start gap-2"><ShieldCheck size={18} className="mt-0.5 shrink-0 text-maroon" /> Quality checked by hand</li>
              </ul>
            </div>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            <div className="card p-6 md:p-8">
              <h2 className="text-2xl font-bold text-maroon-dark">Why you will love it</h2>
              <ul className="mt-4 space-y-3 text-charcoal/80">
                {p.features.map((f) => <li key={f} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-marigold" />{f}</li>)}
              </ul>
            </div>
            <div className="card p-6 md:p-8">
              <h2 className="text-2xl font-bold text-maroon-dark">Details</h2>
              <dl className="mt-4 divide-y divide-maroon/10 text-sm">
                {p.specs.map((s) => <div key={s.label} className="flex justify-between gap-4 py-3"><dt className="text-charcoal/65">{s.label}</dt><dd className="text-right font-medium">{s.value}</dd></div>)}
                <div className="flex justify-between gap-4 py-3"><dt className="text-charcoal/65">Product ID</dt><dd className="font-medium">{p.id}</dd></div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section bg-ivory">
          <div className="container-x">
            <SectionHeading eyebrow="You may also like" title={`More from ${cat.name}`} />
            <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">{related.map((r) => <ProductCard key={r.id} product={r} />)}</div>
          </div>
        </section>
      )}
    </>
  );
}
