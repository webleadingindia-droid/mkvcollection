"use client";
import { useState } from "react";
import SafeImage from "@/components/ui/SafeImage";
import { localProductImage } from "@/data/images";

export default function ProductGallery({ id, images, alt }: { id: string; images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const main = active === 0 ? localProductImage(id) : images[active];
  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-peach shadow-soft">
        <SafeImage key={`${id}-${active}`} src={main} fallback={images[active]} alt={alt} priority sizes="(max-width:1024px) 100vw, 600px" />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {images.map((src, i) => (
          <button key={src} type="button" onClick={() => setActive(i)} aria-label={`View image ${i + 1}`} aria-current={i === active}
            className={`relative aspect-square overflow-hidden rounded-2xl border-2 bg-peach transition ${i === active ? "border-maroon" : "border-transparent opacity-80 hover:opacity-100"}`}>
            <SafeImage src={src} alt="" sizes="160px" />
          </button>
        ))}
      </div>
    </div>
  );
}
