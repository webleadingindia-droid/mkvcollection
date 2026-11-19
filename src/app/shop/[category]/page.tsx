import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ShopClient from "@/components/shop/ShopClient";
import SectionHeading from "@/components/ui/SectionHeading";
import { categories, getByCategory } from "@/data/products";

type Props = { params: { category: string } };

export const generateStaticParams = () => categories.map((c) => ({ category: c.slug }));
export const dynamicParams = false;

export function generateMetadata({ params }: Props): Metadata {
  const c = categories.find((x) => x.slug === params.category);
  return c ? { title: c.name, description: c.blurb, alternates: { canonical: `/shop/${c.slug}` } } : {};
}

export default function CategoryPage({ params }: Props) {
  const c = categories.find((x) => x.slug === params.category);
  if (!c) notFound();
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading eyebrow="Category" title={c.name} subtitle={c.blurb} />
        <ShopClient products={getByCategory(c.slug)} activeCategory={c.slug} />
      </div>
    </section>
  );
}
