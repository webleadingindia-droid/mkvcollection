"use client";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { products } from "@/data/products";
import { useStore } from "@/lib/store";

export default function WishlistPage() {
  const { ready, wishlist } = useStore();
  const items = products.filter((p) => wishlist.includes(p.id));
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading eyebrow="Saved for later" title="Your wishlist" subtitle="Tap the heart on any magnet to save it here. Saved on this device only." />
        {!ready ? (
          <p className="text-center text-charcoal/60">Loading…</p>
        ) : items.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-3xl bg-peach p-10 text-center">
            <p className="font-heading text-2xl font-bold text-maroon-dark">Nothing saved yet</p>
            <p className="mt-2 text-charcoal/70">Found a magnet you love? Save it with the heart icon.</p>
            <Link href="/shop" className="btn-primary mt-6">Explore magnets</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">{items.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        )}
      </div>
    </section>
  );
}
