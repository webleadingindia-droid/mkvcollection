"use client";
import { useState } from "react";
import Link from "next/link";
import { Check, Minus, MessageCircle, Plus, ShoppingBag } from "lucide-react";
import { Product, formatPrice } from "@/data/products";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { SITE_URL } from "@/config/site";
import { useStore } from "@/lib/store";
import WishlistButton from "./WishlistButton";

export default function ProductActions({ product: p }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useStore();

  const total = p.price > 0 ? ` (Total: ₹${p.price * qty})` : "";
  const msg = `Hello MKV Collection 🙏\nI would like to order / enquire about this product:\nProduct: ${p.title}\nProduct ID: ${p.id}\nQuantity: ${qty}\nPrice: ${formatPrice(p)}${total}\nLink: ${SITE_URL}/products/${p.slug}\n📍 Delivery city / pincode: `;

  const add = () => {
    addToCart(p.id, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold">Quantity</span>
        <div className="inline-flex items-center rounded-full border border-maroon/20 bg-ivory">
          <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-peach"><Minus size={16} /></button>
          <span className="w-10 text-center font-semibold" aria-live="polite">{qty}</span>
          <button type="button" onClick={() => setQty((q) => Math.min(99, q + 1))} aria-label="Increase quantity" className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-peach"><Plus size={16} /></button>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <a href={buildWhatsAppLink(msg)} target="_blank" rel="noopener noreferrer" className="btn-wa flex-1 sm:flex-none"><MessageCircle size={18} /> Order on WhatsApp</a>
        <button type="button" onClick={add} className="btn-outline flex-1 sm:flex-none">
          {added ? <><Check size={18} /> Added</> : <><ShoppingBag size={18} /> Add to enquiry cart</>}
        </button>
        <WishlistButton id={p.id} className="border border-maroon/15 !bg-ivory" />
      </div>
      {added && <p role="status" className="text-sm text-charcoal/70">Added. <Link href="/cart" className="font-semibold text-maroon underline">View enquiry cart</Link></p>}
      <p className="text-xs text-charcoal/55">WhatsApp opens with your message ready. Just tap Send and we will confirm payment and delivery.</p>
    </div>
  );
}
