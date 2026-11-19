"use client";
import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string; alt: string; fallback?: string; className?: string;
  sizes?: string; priority?: boolean; width?: number; height?: number;
};

const blur =
  "data:image/svg+xml;base64," +
  "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiNGRkU4Q0MiLz48L3N2Zz4=";

export default function SafeImage({ src, alt, fallback, className = "", sizes = "(max-width:768px) 100vw, 33vw", priority, width, height }: Props) {
  const [current, setCurrent] = useState(src);
  const [failed, setFailed] = useState(false);

  const onError = () => {
    if (fallback && current !== fallback) setCurrent(fallback);
    else setFailed(true);
  };

  if (failed) {
    return (
      <div role="img" aria-label={alt}
        className={`flex items-center justify-center bg-gradient-to-br from-peach via-cream to-marigold/40 ${className}`}
        style={width && height ? { width, height } : undefined}>
        <span className="font-heading text-3xl font-bold tracking-widest text-maroon/60">MKV</span>
      </div>
    );
  }

  const common = { alt, onError, placeholder: "blur" as const, blurDataURL: blur, priority, className: `object-cover ${className}` };
  return width && height ? (
    <Image src={current} width={width} height={height} {...common} />
  ) : (
    <Image src={current} fill sizes={sizes} {...common} />
  );
}
