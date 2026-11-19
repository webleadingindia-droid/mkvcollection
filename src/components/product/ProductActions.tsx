"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Check,
  Minus,
  MessageCircle,
  Plus,
  ShoppingBag,
  Zap,
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
    "flex h-10 w-10 items-center justify-center rounded-full text-charcoal transition-all duration-150 hover:bg-maroon/10 hover:text-maroon active:scale-90 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-charcoal";

  // Compact mode (for sticky mobile bar)
  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 rounded-full border border-maroon/15 bg-white px-1">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            disabled={qty <= 1}
            className={stepperBtn}
          >
            <Minus size={14} />
          </button>
          <span
            className="min-w-[1.5rem] text-center text-sm font-semibold"
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
            <Plus size={14} />
          </button>
        </div>

        <a
          href={buildWhatsAppLink(msg)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-wa flex-1 !py-2.5 !text-sm"
        >
          <MessageCircle size={16} /> Order
        </a>

        <button
          type="button"
          onClick={add}
          aria-label={added ? "Added to cart" : "Add to enquiry cart"}
          className="btn-outline !px-3 !py-2.5"
        >
          {added ? <Check size={18} /> : <ShoppingBag size={18} />}
        </button>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4 md:mt-8">
      {/* Quantity + Price Preview */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-charcoal">
            Quantity
          </span>
          <div className="inline-flex items-center rounded-full border border-maroon/15 bg-white shadow-sm">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
              disabled={qty <= 1}
              className={stepperBtn}
            >
              <Minus size={16} />
            </button>
            <span
              className="min-w-[2.25rem] text-center text-sm font-bold text-charcoal"
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
              <Plus size={16} />
            </button>
          </div>
        </div>

        {p.price > 0 && qty > 1 && (
          <div className="text-right">
            <p className="text-[11px] uppercase tracking-wide text-charcoal/50">
              Total
            </p>
            <p className="text-lg font-bold text-maroon">
              ₹{(p.price * qty).toLocaleString("en-IN")}
            </p>
          </div>
        )}
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
        {/* Primary: WhatsApp Order */}
        <a
          href={buildWhatsAppLink(msg)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-wa w-full justify-center !py-3 text-sm sm:w-auto sm:!py-3.5"
        >
          <MessageCircle size={18} />
          Order on WhatsApp
        </a>

        {/* Secondary: Add to cart */}
        <button
          type="button"
          onClick={add}
          className={`btn-outline w-full justify-center !py-3 text-sm transition-all sm:w-auto sm:!py-3.5 ${
            added ? "!border-green-600 !bg-green-50 !text-green-700" : ""
          }`}
        >
          {added ? (
            <>
              <Check size={18} className="animate-[wishPop_400ms_ease-out]" />
              Added to cart
            </>
          ) : (
            <>
              <ShoppingBag size={18} />
              Add to enquiry cart
            </>
          )}
        </button>

        {/* Wishlist */}
        <WishlistButton
          id={p.id}
          size="lg"
          className="self-stretch !rounded-full border border-maroon/15 !bg-white sm:self-auto"
        />
      </div>

      {/* Success link */}
      {added && (
        <div
          role="status"
          className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800"
        >
          <Check size={16} className="shrink-0" />
          <span>Added to your enquiry cart.</span>
          <Link
            href="/cart"
            className="ml-auto inline-flex items-center gap-1 font-semibold underline-offset-2 hover:underline"
          >
            View cart
            <ArrowRight size={14} />
          </Link>
        </div>
      )}

      {/* Helper text */}
      <p className="flex items-start gap-1.5 text-xs leading-relaxed text-charcoal/55">
        <Zap size={12} className="mt-0.5 shrink-0 text-marigold" />
        <span>
          Tap Order on WhatsApp — your message opens pre-filled. Just hit send
          and we&apos;ll confirm payment &amp; delivery.
        </span>
      </p>
    </div>
  );
}