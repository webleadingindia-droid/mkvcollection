"use client";
import { Heart } from "lucide-react";
import { useStore } from "@/lib/store";

export default function WishlistButton({
  id,
  className = "",
  size = "md",
}: {
  id: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const { toggleWishlist, inWishlist, ready } = useStore();
  const on = ready && inWishlist(id);

  const sizes = {
    sm: { btn: "h-9 w-9", icon: 16 },
    md: { btn: "h-11 w-11", icon: 20 },
    lg: { btn: "h-12 w-12", icon: 22 },
  } as const;
  const s = sizes[size];

  return (
    <button
      type="button"
      onClick={() => toggleWishlist(id)}
      aria-pressed={on}
      aria-label={on ? "Remove from wishlist" : "Add to wishlist"}
      className={`flex ${s.btn} items-center justify-center rounded-full bg-white/90 shadow-soft transition hover:scale-105 active:scale-95 ${className}`}
    >
      <Heart
        size={s.icon}
        className={on ? "fill-maroon text-maroon" : "text-charcoal/70"}
      />
    </button>
  );
}