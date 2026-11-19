"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { Product, categories } from "@/data/products";

const PAGE = 12;
const sorts = [
  { v: "featured", label: "Featured" },
  { v: "price-asc", label: "Price: Low to High" },
  { v: "price-desc", label: "Price: High to Low" },
  { v: "rating", label: "Top Rated" },
] as const;
const tagList = ["Bestseller", "New", "Giftable"];

export default function ShopClient({ products, activeCategory }: { products: Product[]; activeCategory?: string }) {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<(typeof sorts)[number]["v"]>("featured");
  const [tag, setTag] = useState<string>("");
  const [pricedOnly, setPricedOnly] = useState(false);
  const [shown, setShown] = useState(PAGE);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    let r = products.filter((p) => (!s || p.title.toLowerCase().includes(s) || p.id.includes(s)) && (!tag || p.tags.includes(tag)) && (!pricedOnly || !p.isPlaceholder));
    r = [...r].sort((a, b) => {
      if (a.isPlaceholder !== b.isPlaceholder) return a.isPlaceholder ? 1 : -1;
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });
    return r;
  }, [products, q, sort, tag, pricedOnly]);

  const reset = () => { setQ(""); setTag(""); setPricedOnly(false); setSort("featured"); setShown(PAGE); };
  const chip = (on: boolean) => `rounded-full border px-4 py-2 text-sm font-medium transition min-h-[44px] inline-flex items-center ${on ? "border-maroon bg-maroon text-white" : "border-maroon/20 bg-ivory text-charcoal hover:border-maroon"}`;

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="navigation" aria-label="Categories">
        <Link href="/shop" className={chip(!activeCategory)}>All</Link>
        {categories.map((c) => <Link key={c.slug} href={`/shop/${c.slug}`} className={chip(activeCategory === c.slug)}>{c.name}</Link>)}
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto]">
        <label className="relative block">
          <span className="sr-only">Search products or Product ID</span>
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/50" />
          <input type="search" value={q} onChange={(e) => { setQ(e.target.value); setShown(PAGE); }} placeholder="Search by name or Product ID"
            className="min-h-[48px] w-full rounded-full border border-maroon/15 bg-ivory py-3 pl-11 pr-4 text-sm focus:border-maroon focus:outline-none focus:ring-2 focus:ring-marigold" />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <SlidersHorizontal size={18} className="text-maroon" aria-hidden="true" />
          <span className="sr-only">Sort by</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="min-h-[48px] rounded-full border border-maroon/15 bg-ivory px-4 text-sm focus:outline-none focus:ring-2 focus:ring-marigold">
            {sorts.map((s) => <option key={s.v} value={s.v}>{s.label}</option>)}
          </select>
        </label>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {tagList.map((t) => <button key={t} type="button" aria-pressed={tag === t} onClick={() => { setTag(tag === t ? "" : t); setShown(PAGE); }} className={chip(tag === t)}>{t}</button>)}
        <label className="ml-1 inline-flex min-h-[44px] cursor-pointer items-center gap-2 text-sm">
          <input type="checkbox" checked={pricedOnly} onChange={(e) => { setPricedOnly(e.target.checked); setShown(PAGE); }} className="h-4 w-4 accent-[#7A1F2B]" />
          Show priced items only
        </label>
      </div>

      <p className="mt-6 text-sm text-charcoal/65" aria-live="polite">{list.length} {list.length === 1 ? "product" : "products"}</p>

      {list.length === 0 ? (
        <div className="mt-8 rounded-3xl bg-peach p-10 text-center">
          <p className="font-heading text-2xl font-bold text-maroon-dark">No magnets found</p>
          <p className="mt-2 text-charcoal/70">Try a different word, or clear the filters.</p>
          <button type="button" onClick={reset} className="btn-primary mt-6">Clear filters</button>
        </div>
      ) : (
        <>
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {list.slice(0, shown).map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
          {shown < list.length && (
            <div className="mt-10 text-center"><button type="button" onClick={() => setShown((n) => n + PAGE)} className="btn-outline">Load more</button></div>
          )}
        </>
      )}
    </div>
  );
}
