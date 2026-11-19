"use client";
import { useStore } from "@/lib/store";

export default function CountBadge({ kind }: { kind: "cart" | "wishlist" }) {
  const { ready, cartCount, wishlist } = useStore();
  const n = kind === "cart" ? cartCount : wishlist.length;
  if (!ready || n === 0) return null;
  return (
    <span className="absolute right-0.5 top-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-maroon px-1 text-[11px] font-bold text-white">
      {n > 99 ? "99+" : n}
    </span>
  );
}
