"use client";
import Link from "next/link";
import { Minus, MessageCircle, Plus, Trash2 } from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";
import SectionHeading from "@/components/ui/SectionHeading";
import { products, formatPrice } from "@/data/products";
import { localProductImage } from "@/data/images";
import { FREE_SHIPPING_THRESHOLD } from "@/config/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { useStore } from "@/lib/store";

export default function CartPage() {
  const { ready, cart, setQty, removeFromCart, clearCart } = useStore();
  const lines = cart.map((i) => ({ ...i, p: products.find((p) => p.id === i.id)! })).filter((l) => l.p);
  const subtotal = lines.reduce((n, l) => n + l.p.price * l.qty, 0);
  const hasEnquiry = lines.some((l) => l.p.isPlaceholder);
  const left = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const msg = [
    "Hello MKV Collection 🙏", "I would like to order the following:", "",
    ...lines.map((l, n) => `${n + 1}. ${l.p.shortTitle} (ID: ${l.p.id}) x ${l.qty} - ${l.p.price > 0 ? `₹${l.p.price * l.qty}` : "price on enquiry"}`),
    "", `Items total: ₹${subtotal}${hasEnquiry ? " + enquiry items" : ""}`, "", "📍 Delivery city / pincode: ",
  ].join("\n");

  return (
    <section className="section">
      <div className="container-x max-w-4xl">
        <SectionHeading eyebrow="Your picks" title="Enquiry cart" subtitle="Send your list on WhatsApp. We confirm price, shipping and payment there." />
        {!ready ? (
          <p className="text-center text-charcoal/60">Loading your cart…</p>
        ) : lines.length === 0 ? (
          <div className="rounded-3xl bg-peach p-10 text-center">
            <p className="font-heading text-2xl font-bold text-maroon-dark">Your cart is empty</p>
            <p className="mt-2 text-charcoal/70">Add a few magnets and send them to us in one message.</p>
            <Link href="/shop" className="btn-primary mt-6">Browse the collection</Link>
          </div>
        ) : (
          <>
            <ul className="space-y-4">
              {lines.map(({ p, qty }) => (
                <li key={p.id} className="card flex gap-4 p-3 sm:p-4">
                  <Link href={`/products/${p.slug}`} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-peach sm:h-28 sm:w-28">
                    <SafeImage src={localProductImage(p.id)} fallback={p.images[0]} alt={p.shortTitle} sizes="112px" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div>
                      <Link href={`/products/${p.slug}`} className="line-clamp-2 text-sm font-semibold hover:text-maroon sm:text-base">{p.title}</Link>
                      <p className="mt-1 text-xs text-charcoal/55">ID: {p.id}</p>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                      <div className="inline-flex items-center rounded-full border border-maroon/20">
                        <button type="button" onClick={() => setQty(p.id, qty - 1)} aria-label={`Decrease quantity of ${p.shortTitle}`} className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-peach"><Minus size={16} /></button>
                        <span className="w-8 text-center text-sm font-semibold">{qty}</span>
                        <button type="button" onClick={() => setQty(p.id, qty + 1)} aria-label={`Increase quantity of ${p.shortTitle}`} className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-peach"><Plus size={16} /></button>
                      </div>
                      <span className="font-bold text-maroon">{p.price > 0 ? `₹${p.price * qty}` : formatPrice(p)}</span>
                      <button type="button" onClick={() => removeFromCart(p.id)} aria-label={`Remove ${p.shortTitle}`} className="flex h-11 w-11 items-center justify-center rounded-full text-charcoal/55 hover:bg-peach hover:text-maroon"><Trash2 size={18} /></button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-3xl bg-ivory p-6 shadow-soft">
              <div className="flex items-center justify-between text-lg font-semibold"><span>Items total</span><span className="text-maroon">₹{subtotal}{hasEnquiry && " +"}</span></div>
              {hasEnquiry && <p className="mt-1 text-xs text-charcoal/60">Some items are price on enquiry. We will share their price on WhatsApp.</p>}
              <p className="mt-3 text-sm text-charcoal/70">{left > 0 ? `Add ₹${left} more for free shipping.` : "You have unlocked free shipping 🎉"}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={buildWhatsAppLink(msg)} target="_blank" rel="noopener noreferrer" className="btn-wa flex-1"><MessageCircle size={18} /> Send order on WhatsApp</a>
                <button type="button" onClick={clearCart} className="btn-outline">Clear cart</button>
              </div>
              <p className="mt-3 text-xs text-charcoal/55">No online payment is taken on this site. Pay via UPI / bank transfer after we confirm on WhatsApp.</p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
