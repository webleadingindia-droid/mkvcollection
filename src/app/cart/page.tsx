"use client";
import Link from "next/link";
import { Minus, MessageCircle, Plus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck, CreditCard } from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";
import SectionHeading from "@/components/ui/SectionHeading";
import { products, formatPrice } from "@/data/products";
import { FREE_SHIPPING_THRESHOLD, shippingFor } from "@/config/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { useStore } from "@/lib/store";

export default function CartPage() {
  const { ready, cart, setQty, removeFromCart, clearCart } = useStore();
  const lines = cart
    .map((i) => ({ ...i, p: products.find((p) => p.id === i.id)! }))
    .filter((l) => l.p);
  const subtotal = lines.reduce((n, l) => n + l.p.price * l.qty, 0);
  const hasEnquiry = lines.some((l) => l.p.isPlaceholder);
  const left = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const msg = [
    "Hello MKV Collection 🙏",
    "I would like to order the following:",
    "",
    ...lines.map(
      (l, n) =>
        `${n + 1}. ${l.p.shortTitle} (ID: ${l.p.id}) x ${l.qty} - ${
          l.p.price > 0 ? `₹${l.p.price * l.qty}` : "price on enquiry"
        }`
    ),
    "",
    `Items total: ₹${subtotal}${hasEnquiry ? " + enquiry items" : ""}`,
    "",
    "📍 Delivery city / pincode: ",
  ].join("\n");

  return (
    <section className="section min-h-[70vh]">
      <div className="container-x max-w-4xl">
        <SectionHeading
          eyebrow="Your picks"
          title="Your cart"
          subtitle="Pay securely via UPI, or send your list on WhatsApp."
        />

        {!ready ? (
          <div className="flex flex-col items-center justify-center py-16 text-charcoal/60">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-maroon border-t-transparent" />
            <p className="mt-4 text-sm">Loading your cart...</p>
          </div>
        ) : lines.length === 0 ? (
          /* ─── Empty State ─── */
          <div className="flex flex-col items-center rounded-3xl border border-maroon/10 bg-gradient-to-b from-peach/50 to-cream/30 p-10 text-center sm:p-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
              <ShoppingBag size={28} className="text-maroon/60" />
            </div>
            <p className="mt-5 font-heading text-2xl font-bold text-maroon-dark">
              Your cart is empty
            </p>
            <p className="mt-2 max-w-xs text-sm text-charcoal/65">
              Add a few magnets and send them to us in one message.
            </p>
            <Link href="/shop" className="btn-primary mt-7">
              Browse collection <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:items-start">
            {/* ═══════ Left: Cart Items ═══════ */}
            <ul className="space-y-3">
              {lines.map(({ p, qty }) => (
                <li
                  key={p.id}
                  className="group relative flex gap-3 overflow-hidden rounded-2xl border border-maroon/10 bg-white p-3 transition-all duration-200 hover:border-maroon/20 hover:shadow-md sm:gap-4 sm:p-4"
                >
                  {/* ✅ FIXED IMAGE */}
                  <Link
                    href={`/products/${p.slug}`}
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-peach to-cream sm:h-24 sm:w-24"
                  >
                    <SafeImage
                      src={p.images[0] ?? ""}
                      fallback={p.images[1] ?? p.images[0] ?? ""}
                      alt={p.shortTitle}
                      sizes="96px"
                      className="transition duration-300 group-hover:scale-105"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                    <div>
                      <Link
                        href={`/products/${p.slug}`}
                        className="line-clamp-2 text-[13px] font-semibold leading-snug text-charcoal transition hover:text-maroon sm:text-sm"
                      >
                        {p.title}
                      </Link>
                      <p className="mt-1 text-[11px] text-charcoal/50">
                        ID: {p.id}
                      </p>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                      {/* Quantity Stepper */}
                      <div className="inline-flex items-center rounded-full border border-maroon/15 bg-white">
                        <button
                          type="button"
                          onClick={() => setQty(p.id, qty - 1)}
                          disabled={qty <= 1}
                          aria-label={`Decrease quantity of ${p.shortTitle}`}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-charcoal transition hover:bg-peach/60 active:scale-90 disabled:opacity-30 disabled:hover:bg-transparent sm:h-9 sm:w-9"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-7 text-center text-xs font-bold sm:text-sm">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty(p.id, qty + 1)}
                          aria-label={`Increase quantity of ${p.shortTitle}`}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-charcoal transition hover:bg-peach/60 active:scale-90 sm:h-9 sm:w-9"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-maroon sm:text-base">
                        {p.price > 0 ? `₹${p.price * qty}` : formatPrice(p)}
                      </span>

                      <button
                        type="button"
                        onClick={() => removeFromCart(p.id)}
                        aria-label={`Remove ${p.shortTitle}`}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-charcoal/50 transition hover:bg-red-50 hover:text-red-600 active:scale-90 sm:h-9 sm:w-9"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs font-medium text-charcoal/50 hover:text-red-600 hover:underline"
                >
                  Clear entire cart
                </button>
              </div>
            </ul>

            {/* ═══════ Right: Summary ═══════ */}
            <div className="lg:sticky lg:top-24">
              <div className="relative overflow-hidden rounded-2xl border border-maroon/10 bg-gradient-to-b from-white to-ivory/60 p-5 shadow-[0_8px_32px_-16px_rgba(122,31,43,0.12)] sm:p-6">
                {/* Top shimmer */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-marigold/50 to-transparent" />

                <h2 className="font-heading text-lg font-bold text-maroon-dark">
                  Order Summary
                </h2>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center justify-between text-charcoal/70">
                    <span>Items ({lines.length})</span>
                    <span>₹{subtotal}{hasEnquiry && " +"}</span>
                  </div>
                  <div className="flex items-center justify-between text-charcoal/70">
                    <span>Shipping</span>
                    <span className="text-green-700">
                      {shippingFor(subtotal) > 0 ? `₹${shippingFor(subtotal)}` : "Free"}
                    </span>
                  </div>
                </div>

                {hasEnquiry && (
                  <p className="mt-3 rounded-lg bg-peach/60 p-2.5 text-[11px] leading-snug text-charcoal/70">
                    Some items are price on enquiry. We&apos;ll share their price on
                    WhatsApp.
                  </p>
                )}

                <div className="my-4 h-px bg-gradient-to-r from-transparent via-maroon/15 to-transparent" />

                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium text-charcoal/70">
                    Total
                  </span>
                  <span className="text-xl font-bold tracking-tight text-maroon sm:text-2xl">
                    ₹{subtotal + shippingFor(subtotal)}
                    {hasEnquiry && " +"}
                  </span>
                </div>

                {left > 0 ? (
                  <p className="mt-2 flex items-center gap-1.5 text-[11px] text-charcoal/60">
                    <Truck size={12} className="text-maroon/60" />
                    Add ₹{left} more for free shipping
                  </p>
                ) : (
                  <p className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-green-700">
                    <Truck size={12} />
                    You&apos;ve unlocked free shipping 🎉
                  </p>
                )}

                {!hasEnquiry && (
                  <Link
                    href="/checkout"
                    className="btn-primary mt-5 w-full"
                  >
                    <CreditCard size={17} />
                    Proceed to checkout
                  </Link>
                )}

                <a
                  href={buildWhatsAppLink(msg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${hasEnquiry ? "mt-5 bg-[#25D366] text-white" : "mt-3 border border-[#25D366] text-[#128C4A]"} flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition-all duration-200 hover:brightness-105 active:scale-[0.98]`}
                >
                  <MessageCircle size={17} />
                  {hasEnquiry ? "Send enquiry on WhatsApp" : "Or order via WhatsApp"}
                </a>

                <div className="mt-4 flex items-start gap-2 rounded-lg bg-ivory/80 p-3 text-[10px] leading-snug text-charcoal/60">
                  <ShieldCheck size={14} className="mt-0.5 shrink-0 text-maroon/60" />
                  <p>
                    Pay by UPI at checkout. After paying, share the payment
                    screenshot with us on WhatsApp.
                  </p>
                </div>

                <Link
                  href="/shop"
                  className="mt-4 flex items-center justify-center gap-1 text-xs font-medium text-maroon hover:underline"
                >
                  Continue shopping
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}