"use client";
import { Heart } from "lucide-react";
import { useStore } from "@/lib/store";

export default function WishlistButton({ id, className = "" }: { id: string; className?: string }) {
  const { toggleWishlist, inWishlist, ready } = useStore();
  const on = ready && inWishlist(id);
  return (
    <button type="button" onClick={() => toggleWishlist(id)} aria-pressed={on}
      aria-label={on ? "Remove from wishlist" : "Add to wishlist"}
      className={`flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow-soft transition hover:scale-105 active:scale-95 ${className}`}>
      <Heart size={20} className={on ? "fill-maroon text-maroon" : "text-charcoal/70"} />
    </button>
  );
}
