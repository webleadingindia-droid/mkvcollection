"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";
import { localProductImage } from "@/data/images";

export default function ProductGallery({
  id,
  images,
  alt,
}: {
  id: string;
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [dragStart, setDragStart] = useState<number | null>(null);

  const thumbStripRef = useRef<HTMLDivElement>(null);
  const total = images.length;

  const main = active === 0 ? localProductImage(id) : images[active];

  const go = useCallback(
    (dir: 1 | -1) => {
      setActive((prev) => (prev + dir + total) % total);
    },
    [total]
  );

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  // Scroll active thumbnail into view
  useEffect(() => {
    const strip = thumbStripRef.current;
    if (!strip) return;
    const child = strip.children[active] as HTMLElement | undefined;
    child?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [active]);

  // Desktop zoom on mouse move
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  // Mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setDragStart(e.touches[0].clientX);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (dragStart === null) return;
    const delta = e.changedTouches[0].clientX - dragStart;
    if (Math.abs(delta) > 50) go(delta > 0 ? -1 : 1);
    setDragStart(null);
  };

  return (
    <div className="group/gallery select-none">
      {/* Main Image */}
      <div
        className="relative aspect-square overflow-hidden rounded-3xl bg-peach"
        onMouseMove={onMove}
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="absolute inset-0 transition-transform duration-200 ease-out"
          style={
            zoomed
              ? {
                  transform: "scale(1.6)",
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                }
              : undefined
          }
        >
          <SafeImage
            key={`${id}-${active}`}
            src={main}
            fallback={images[active]}
            alt={alt}
            priority
            sizes="(max-width:1024px) 100vw, 600px"
            className="animate-[fadeIn_300ms_ease-out]"
          />
        </div>

        {/* Desktop arrows */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-maroon opacity-0 shadow-md backdrop-blur transition hover:bg-white group-hover/gallery:opacity-100 md:flex"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-maroon opacity-0 shadow-md backdrop-blur transition hover:bg-white group-hover/gallery:opacity-100 md:flex"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Zoom hint (desktop only) */}
        <span className="pointer-events-none absolute bottom-3 left-3 hidden items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-charcoal/70 opacity-0 backdrop-blur transition group-hover/gallery:opacity-100 md:inline-flex">
          <ZoomIn size={12} /> Hover to zoom
        </span>

        {/* Image counter */}
        {total > 1 && (
          <span className="absolute bottom-3 right-3 rounded-full bg-maroon-dark/70 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
            {active + 1} / {total}
          </span>
        )}
      </div>

      {/* Mobile dots */}
      {total > 1 && (
        <div className="mt-3 flex items-center justify-center gap-1.5 md:hidden">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Go to image ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active
                  ? "w-6 bg-maroon"
                  : "w-1.5 bg-maroon/25 hover:bg-maroon/50"
              }`}
            />
          ))}
        </div>
      )}

      {/* Desktop thumbnails (horizontal scroll) */}
      {total > 1 && (
        <div
          ref={thumbStripRef}
          className="mt-4 hidden gap-3 overflow-x-auto pb-1 scrollbar-hide md:flex"
        >
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={i === active}
              className={`relative aspect-square w-20 shrink-0 overflow-hidden rounded-2xl border-2 bg-peach transition-all duration-200 md:w-24 ${
                i === active
                  ? "border-maroon ring-2 ring-marigold/40 ring-offset-2 ring-offset-ivory"
                  : "border-transparent opacity-75 hover:opacity-100 hover:border-maroon/30"
              }`}
            >
              <SafeImage src={src} alt="" sizes="96px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}