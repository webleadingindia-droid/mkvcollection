import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";
import { categories, products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/shop", "/bulk-orders", "/about", "/contact", "/faq", "/shipping-returns", "/privacy-policy", "/terms"];
  return [
    ...pages.map((p) => ({ url: `${SITE_URL}${p}`, lastModified: now, priority: p === "" ? 1 : 0.7 })),
    ...categories.map((c) => ({ url: `${SITE_URL}/shop/${c.slug}`, lastModified: now, priority: 0.8 })),
    ...products.map((p) => ({ url: `${SITE_URL}/products/${p.slug}`, lastModified: now, priority: p.isPlaceholder ? 0.4 : 0.9 })),
  ];
}
