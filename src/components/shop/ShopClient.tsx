"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X, Sparkles, PackageSearch } from "lucide-react";
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

export default function ShopClient({
  products,
  activeCategory,
}: {
  products: Product[];
  activeCategory?: string;
}) {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<(typeof sorts)[number]["v"]>("featured");
  const [tag, setTag] = useState<string>("");
  const [pricedOnly, setPricedOnly] = useState(false);
  const [shown, setShown] = useState(PAGE);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    let r = products.filter(
      (p) =>
        (!s || p.title.toLowerCase().includes(s) || p.id.includes(s)) &&
        (!tag || p.tags.includes(tag)) &&
        (!pricedOnly || !p.isPlaceholder)
    );
    r = [...r].sort((a, b) => {
      if (a.isPlaceholder !== b.isPlaceholder) return a.isPlaceholder ? 1 : -1;
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });
    return r;
  }, [products, q, sort, tag, pricedOnly]);

  const activeFilters =
    (q ? 1 : 0) + (tag ? 1 : 0) + (pricedOnly ? 1 : 0) + (sort !== "featured" ? 1 : 0);

  const reset = () => {
    setQ("");
    setTag("");
    setPricedOnly(false);
    setSort("featured");
    setShown(PAGE);
  };

  const chip = (on: boolean) =>
    `inline-flex min-h-[44px] items-center justify-center rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-95 ${
      on
        ? "border-maroon bg-maroon text-white shadow-sm shadow-maroon/20"
        : "border-maroon/15 bg-white text-charcoal hover:border-maroon/40 hover:bg-maroon/5"
    }`;

  return (
    <div className="pb-16">
      {/* Category Chips - horizontal scroll on mobile */}
      <div
        role="navigation"
        aria-label="Categories"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-hide md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
      >
        <Link href="/shop" className={chip(!activeCategory)}>
          All
        </Link>
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/shop/${c.slug}`}
            className={`${chip(activeCategory === c.slug)} whitespace-nowrap`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      {/* Sticky Search + Sort Bar */}
      <div className="sticky top-0 z-20 -mx-4 mt-4 bg-ivory/95 px-4 py-3 backdrop-blur-md md:static md:mx-0 md:mt-6 md:bg-transparent md:px-0 md:py-0 md:backdrop-blur-none">
        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <label className="relative block">
            <span className="sr-only">Search products or Product ID</span>
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/50"
            />
            <input
              type="search"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setShown(PAGE);
              }}
              placeholder="Search by name or Product ID"
              className="min-h-[48px] w-full rounded-full border border-maroon/15 bg-white py-3 pl-11 pr-11 text-sm shadow-sm transition focus:border-maroon focus:outline-none focus:ring-2 focus:ring-marigold/60"
            />
            {q && (
              <button
                type="button"
                onClick={() => setQ("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-charcoal/50 transition hover:bg-maroon/10 hover:text-maroon"
              >
                <X size={16} />
              </button>
            )}
          </label>

          <label className="relative flex items-center">
            <SlidersHorizontal
              size={18}
              className="pointer-events-none absolute left-4 text-maroon"
              aria-hidden="true"
            />
            <span className="sr-only">Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="min-h-[48px] w-full appearance-none rounded-full border border-maroon/15 bg-white py-3 pl-11 pr-10 text-sm shadow-sm transition focus:border-maroon focus:outline-none focus:ring-2 focus:ring-marigold/60 md:w-auto"
            >
              {sorts.map((s) => (
                <option key={s.v} value={s.v}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {/* Filter Tags */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {tagList.map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={tag === t}
            onClick={() => {
              setTag(tag === t ? "" : t);
              setShown(PAGE);
            }}
            className={chip(tag === t)}
          >
            {t === "Bestseller" && <Sparkles size={14} className="mr-1.5" />}
            {t}
          </button>
        ))}

        <label className="ml-1 inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full border border-maroon/15 bg-white px-4 text-sm transition hover:border-maroon/40">
          <input
            type="checkbox"
            checked={pricedOnly}
            onChange={(e) => {
              setPricedOnly(e.target.checked);
              setShown(PAGE);
            }}
            className="h-4 w-4 accent-maroon"
          />
          Priced only
        </label>

        {activeFilters > 0 && (
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-[44px] items-center gap-1 rounded-full px-3 text-sm font-medium text-maroon transition hover:bg-maroon/10"
          >
            <X size={14} />
            Clear all ({activeFilters})
          </button>
        )}
      </div>

      {/* Result Count */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-charcoal/65" aria-live="polite">
          <span className="font-semibold text-charcoal">{list.length}</span>{" "}
          {list.length === 1 ? "product" : "products"}
        </p>
      </div>

      {/* Empty State */}
      {list.length === 0 ? (
        <div className="mt-8 flex flex-col items-center rounded-3xl border border-maroon/10 bg-peach/60 p-10 text-center">
          <div className="rounded-full bg-white p-4 shadow-sm">
            <PackageSearch size={32} className="text-maroon" />
          </div>
          <p className="mt-4 font-heading text-2xl font-bold text-maroon-dark">
            No magnets found
          </p>
          <p className="mt-2 max-w-xs text-charcoal/70">
            Try a different search term, or clear the filters to see everything.
          </p>
          <button type="button" onClick={reset} className="btn-primary mt-6">
            Clear filters
          </button>
        </div>
      ) : (
        <>
          {/* Product Grid */}
          <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {list.slice(0, shown).map((p) => (
              <div
                key={p.id}
                className="transition-transform duration-200 hover:-translate-y-0.5"
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>

          {/* Load More */}
          {shown < list.length && (
            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => setShown((n) => n + PAGE)}
                className="btn-outline min-h-[48px] min-w-[160px]"
              >
                Load more ({list.length - shown} left)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}