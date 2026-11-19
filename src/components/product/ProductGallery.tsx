"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  X,
  Maximize2,
} from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";

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
  const [lightbox, setLightbox] = useState(false);
  const [lightboxDrag, setLightboxDrag] = useState<number | null>(null);

  const thumbStripRef = useRef<HTMLDivElement>(null);
  const total = images.length;
  const main = images[active];

  const go = useCallback(
    (dir: 1 | -1) => {
      setActive((prev) => (prev + dir + total) % total);
    },
    [total]
  );

  /* Keyboard nav for gallery + lightbox */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && lightbox) setLightbox(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, lightbox]);

  /* Lock body scroll when lightbox open */
  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  /* Scroll active thumbnail into view */
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

  /* Desktop zoom on mouse move */
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  /* Mobile swipe (main image) */
  const onTouchStart = (e: React.TouchEvent) => {
    setDragStart(e.touches[0].clientX);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (dragStart === null) return;
    const delta = e.changedTouches[0].clientX - dragStart;
    if (Math.abs(delta) > 50) go(delta > 0 ? -1 : 1);
    setDragStart(null);
  };

  /* Mobile swipe (lightbox) */
  const onLightboxTouchStart = (e: React.TouchEvent) => {
    setLightboxDrag(e.touches[0].clientX);
  };
  const onLightboxTouchEnd = (e: React.TouchEvent) => {
    if (lightboxDrag === null) return;
    const delta = e.changedTouches[0].clientX - lightboxDrag;
    if (Math.abs(delta) > 50) go(delta > 0 ? -1 : 1);
    setLightboxDrag(null);
  };

  return (
    <>
      <div className="group/gallery select-none">
        {/* ─── Main Image ─── */}
        <div
          className="relative aspect-square overflow-hidden rounded-2xl border border-maroon/10 bg-gradient-to-br from-peach to-cream shadow-sm md:rounded-3xl"
          onMouseMove={onMove}
          onMouseEnter={() => setZoomed(true)}
          onMouseLeave={() => setZoomed(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="absolute inset-0 transition-transform duration-300 ease-out"
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

          {/* ─── Desktop arrows ─── */}
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-maroon shadow-md backdrop-blur transition hover:bg-white hover:scale-105 active:scale-95 md:flex md:opacity-0 md:group-hover/gallery:opacity-100"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next image"
                className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-maroon shadow-md backdrop-blur transition hover:bg-white hover:scale-105 active:scale-95 md:flex md:opacity-0 md:group-hover/gallery:opacity-100"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* ─── Expand to fullscreen (mobile) ─── */}
          <button
            type="button"
            onClick={() => setLightbox(true)}
            aria-label="View full image"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-maroon shadow-md backdrop-blur transition hover:bg-white active:scale-90 md:hidden"
          >
            <Maximize2 size={15} />
          </button>

          {/* ─── Zoom hint (desktop) ─── */}
          <span className="pointer-events-none absolute bottom-3 left-3 hidden items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-charcoal/70 opacity-0 backdrop-blur transition group-hover/gallery:opacity-100 md:inline-flex">
            <ZoomIn size={12} /> Hover to zoom
          </span>

          {/* ─── Image counter (both) ─── */}
          {total > 1 && (
            <span className="absolute bottom-3 right-3 rounded-full bg-maroon-dark/75 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
              {active + 1} / {total}
            </span>
          )}
        </div>

        {/* ─── Mobile dots ─── */}
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

        {/* ─── Desktop thumbnails ─── */}
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
                    : "border-transparent opacity-70 hover:opacity-100 hover:border-maroon/30"
                }`}
              >
                <SafeImage src={src} alt="" sizes="96px" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ══════════ LIGHTBOX (mobile fullscreen) ══════════ */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[60] flex flex-col bg-maroon-dark/95 backdrop-blur-md animate-[fadeIn_200ms_ease-out] md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onTouchStart={onLightboxTouchStart}
          onTouchEnd={onLightboxTouchEnd}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-3 text-white">
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
              {active + 1} / {total}
            </span>
            <button
              type="button"
              onClick={() => setLightbox(false)}
              aria-label="Close fullscreen"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25 active:scale-90"
            >
              <X size={20} />
            </button>
          </div>

          {/* Main image */}
          <div className="relative flex flex-1 items-center justify-center px-3">
            <SafeImage
              key={`lb-${id}-${active}`}
              src={main}
              fallback={images[active]}
              alt={alt}
              sizes="100vw"
              className="max-h-full w-full object-contain animate-[fadeIn_250ms_ease-out]"
            />

            {/* Arrows */}
            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous image"
                  className="absolute left-2 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25 active:scale-90"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next image"
                  className="absolute right-2 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25 active:scale-90"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}
          </div>

          {/* Bottom dots */}
          {total > 1 && (
            <div className="flex items-center justify-center gap-1.5 pb-6 pt-3">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active
                      ? "w-6 bg-marigold"
                      : "w-1.5 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}