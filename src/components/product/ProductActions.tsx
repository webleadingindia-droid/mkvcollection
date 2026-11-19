"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Check,
  Minus,
  MessageCircle,
  Plus,
  ShoppingBag,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Product, formatPrice } from "@/data/products";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { SITE_URL } from "@/config/site";
import { useStore } from "@/lib/store";
import WishlistButton from "./WishlistButton";

export default function ProductActions({
  product: p,
  compact = false,
}: {
  product: Product;
  compact?: boolean;
}) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useStore();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const total = p.price > 0 ? ` (Total: ₹${p.price * qty})` : "";
  const msg = `Hello MKV Collection 🙏\nI would like to order / enquire about this product:\nProduct: ${p.title}\nProduct ID: ${p.id}\nQuantity: ${qty}\nPrice: ${formatPrice(p)}${total}\nLink: ${SITE_URL}/products/${p.slug}\n📍 Delivery city / pincode: `;

  const add = () => {
    addToCart(p.id, qty);
    setAdded(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setAdded(false), 2200);
  };

  const stepperBtn =
    "flex h-9 w-9 items-center justify-center rounded-full text-charcoal transition-all duration-150 hover:bg-maroon/10 hover:text-maroon active:scale-90 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-charcoal md:h-10 md:w-10";

  /* ============ COMPACT MODE (sticky mobile bar) ============ */
  if (compact) {
    return (
      <div className="flex items-center gap-2">
        {/* Quantity stepper */}
        <div className="flex items-center rounded-full border border-maroon/15 bg-white shadow-sm">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            disabled={qty <= 1}
            className="flex h-9 w-9 items-center justify-center rounded-full text-charcoal transition hover:bg-maroon/10 active:scale-90 disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <Minus size={14} />
          </button>
          <span
            className="min-w-[1.5rem] text-center text-sm font-bold text-charcoal"
            aria-live="polite"
          >
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(99, q + 1))}
            aria-label="Increase quantity"
            disabled={qty >= 99}
            className="flex h-9 w-9 items-center justify-center rounded-full text-charcoal transition hover:bg-maroon/10 active:scale-90 disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <Plus size={14} />
          </button>
        </div>

        {/* WhatsApp */}
        <a
          href={buildWhatsAppLink(msg)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-wa flex-1 !px-3 !py-2.5 !text-xs"
        >
          <MessageCircle size={15} />
          Order
        </a>

        {/* Add to cart icon */}
        <button
          type="button"
          onClick={add}
          aria-label={added ? "Added" : "Add to cart"}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-maroon/20 bg-white text-maroon transition hover:bg-maroon/5 active:scale-90"
        >
          {added ? (
            <Check size={16} className="animate-[wishPop_400ms_ease-out]" />
          ) : (
            <ShoppingBag size={16} />
          )}
        </button>
      </div>
    );
  }

  /* ============ FULL MODE ============ */
  return (
    <div className="mt-6 md:mt-8">
      {/* ─── Premium card wrapper ─── */}
      <div className="rounded-2xl border border-maroon/10 bg-gradient-to-b from-ivory to-cream/50 p-4 shadow-[0_8px_24px_-12px_rgba(122,31,43,0.12)] md:rounded-3xl md:p-5">
        {/* Quantity + Total row */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-maroon/70">
              Qty
            </span>
            <div className="inline-flex items-center rounded-full border border-maroon/15 bg-white shadow-sm">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                disabled={qty <= 1}
                className={stepperBtn}
              >
                <Minus size={15} />
              </button>
              <span
                className="min-w-[2rem] text-center text-sm font-bold text-charcoal"
                aria-live="polite"
              >
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(99, q + 1))}
                aria-label="Increase quantity"
                disabled={qty >= 99}
                className={stepperBtn}
              >
                <Plus size={15} />
              </button>
            </div>
          </div>

          {/* Live total */}
          {p.price > 0 && (
            <div className="text-right">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-charcoal/45">
                Total
              </p>
              <p className="text-base font-bold text-maroon md:text-lg">
                ₹{(p.price * qty).toLocaleString("en-IN")}
              </p>
            </div>
          )}
        </div>

        {/* ─── Divider ─── */}
        <div className="my-4 h-px bg-gradient-to-r from-transparent via-maroon/15 to-transparent" />

        {/* CTA Buttons */}
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-stretch">
          {/* WhatsApp — primary CTA */}
          <a
            href={buildWhatsAppLink(msg)}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgba(37,211,102,0.5)] transition-all duration-200 hover:shadow-[0_12px_28px_-8px_rgba(37,211,102,0.6)] hover:brightness-105 active:scale-[0.98]"
          >
            <MessageCircle size={17} />
            <span>Order on WhatsApp</span>
            <Sparkles
              size={13}
              className="absolute right-3 top-2 opacity-0 transition group-hover:opacity-100"
            />
          </a>

          {/* Add to cart — secondary */}
          <button
            type="button"
            onClick={add}
            className={`flex flex-1 items-center justify-center gap-2 rounded-full border-2 px-5 py-3 text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${
              added
                ? "border-green-600 bg-green-50 text-green-700"
                : "border-maroon/20 bg-white text-maroon hover:border-maroon/40 hover:bg-maroon/5"
            }`}
          >
            {added ? (
              <>
                <Check
                  size={17}
                  className="animate-[wishPop_400ms_ease-out]"
                />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag size={17} />
                <span>Add to Cart</span>
              </>
            )}
          </button>

          {/* Wishlist */}
          <WishlistButton
            id={p.id}
            className="!h-auto !w-auto !rounded-full border-2 border-maroon/20 !bg-white px-5 transition hover:border-maroon/40 hover:!bg-maroon/5 sm:!h-full sm:!px-4"
          />
        </div>

        {/* Trust helper */}
        <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-charcoal/50">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-marigold" />
          No prepayment needed · Cash on delivery available
        </p>
      </div>

      {/* Success banner */}
      {added && (
        <div
          role="status"
          className="mt-3 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-3 py-2.5 text-sm text-green-800 animate-[fadeIn_250ms_ease-out]"
        >
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
            <Check size={12} strokeWidth={3} />
          </span>
          <span className="font-medium">Added to cart</span>
          <Link
            href="/cart"
            className="ml-auto inline-flex items-center gap-1 font-semibold text-green-900 underline-offset-2 hover:underline"
          >
            View
            <ArrowRight size={13} />
          </Link>
        </div>
      )}
    </div>
  );
}