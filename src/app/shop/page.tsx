import type { Metadata } from "next";
import ShopClient from "@/components/shop/ShopClient";
import SectionHeading from "@/components/ui/SectionHeading";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop Handmade Fridge Magnets",
  description: "Browse handmade miniature fridge magnets: Indian food, kitchen sets, Taj Mahal souvenirs, fruits, vegetables and gift packs.",
};

export default function ShopPage() {
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading eyebrow="The collection" title="Shop all magnets" subtitle="Every piece is handmade. Tap Buy Now to order." />
        <ShopClient products={products} />
      </div>
    </section>
  );
}
