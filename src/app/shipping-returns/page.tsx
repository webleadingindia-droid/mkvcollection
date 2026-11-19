import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/ui/LegalPage";
import { FREE_SHIPPING_THRESHOLD } from "@/config/site";

export const metadata: Metadata = { title: "Shipping & Returns" };

export default function Page() {
  return (
    <LegalPage title="Shipping & Returns">
      {/* TODO(owner): confirm these timelines and policies match how you actually operate. */}
      <h2>Shipping</h2>
      <ul>
        <li>We ship across India.</li>
        <li>Free shipping on orders above ₹{FREE_SHIPPING_THRESHOLD}. Otherwise the charge is confirmed on WhatsApp before payment.</li>
        <li>Orders are packed in padded packaging. We share tracking details once your order ships.</li>
        <li>Delivery estimates are shared when you confirm your order.</li>
      </ul>
      <h2>Damaged or wrong item</h2>
      <p>If your order arrives damaged or incorrect, message us on WhatsApp within 48 hours of delivery with clear photos (and an unboxing video if you have one). We will arrange a replacement or a resolution.</p>
      <h2>Returns</h2>
      <p>Because items are handmade and often bought as gifts, we do not accept returns for change of mind. Please see the section above for damaged or wrong items.</p>
      <h2>Questions?</h2>
      <p>Reach us on the <Link href="/contact">contact page</Link>.</p>
    </LegalPage>
  );
}
