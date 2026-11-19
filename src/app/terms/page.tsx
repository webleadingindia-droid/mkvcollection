import type { Metadata } from "next";
import LegalPage from "@/components/ui/LegalPage";
import { BRAND_NAME } from "@/config/site";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function Page() {
  return (
    <LegalPage title="Terms & Conditions" updated="November 2026">
      {/* TODO(owner): have this reviewed before launch. */}
      <h2>Orders</h2>
      <p>Orders are placed and confirmed through WhatsApp. An order is accepted only when {BRAND_NAME} confirms price, availability and delivery details with you.</p>
      <h2>Pricing</h2>
      <p>Prices on this website are in Indian Rupees and may change. Items marked Price on enquiry are quoted individually. Colours may vary slightly from photos.</p>
      <h2>Handmade products</h2>
      <p>Each item is handmade, so small variations in shape, colour and finish are normal.</p>
      <h2>Payment, shipping and returns</h2>
      <p>Payment is made after confirmation, via the methods shared on WhatsApp. Shipping and returns follow our Shipping & Returns page.</p>
      <h2>Intellectual property</h2>
      <p>All designs, text and images on this website belong to {BRAND_NAME} and may not be copied without permission.</p>
    </LegalPage>
  );
}
