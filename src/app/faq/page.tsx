import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import { FREE_SHIPPING_THRESHOLD } from "@/config/site";

export const metadata: Metadata = { title: "FAQ", description: "Answers about ordering, payment, shipping and gifting at MKV Collection." };

const faqs: [string, string][] = [
  ["How do I place an order?", "Tap Order on WhatsApp on any product, or add items to your enquiry cart and send the list. WhatsApp opens with your message ready. We confirm price, delivery and payment there."],
  ["Which payment methods do you accept?", "UPI and bank transfer. Cash on delivery may be available for some locations, please confirm on WhatsApp."],
  ["Are the magnets really handmade?", "Yes. Each piece is sculpted and painted by hand, so small variations are natural and part of the charm."],
  ["How long does delivery take?", "Delivery time depends on your location. We share an estimate when you confirm your order on WhatsApp."],
  ["Is shipping free?", `Shipping is free on orders above ₹${FREE_SHIPPING_THRESHOLD}. Below that, we confirm the charge on WhatsApp.`],
  ["Do you take bulk or custom orders?", "Yes, for weddings, corporate gifts, return gifts and festivals. Visit the Bulk Orders page and request a quote."],
  ["Why do some products show Price on enquiry?", "Pricing for these items is confirmed on WhatsApp along with current availability. Use the Product ID when you message us."],
  ["What if my magnet arrives damaged?", "Please message us on WhatsApp with a photo within 48 hours of delivery and we will make it right."],
];

export default function FaqPage() {
  const ld = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
  return (
    <section className="section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="container-x max-w-3xl">
        <SectionHeading eyebrow="Help" title="Frequently asked questions" />
        <div className="space-y-3">
          {faqs.map(([q, a]) => (
            <details key={q} className="group rounded-2xl bg-ivory p-5 shadow-soft open:shadow-lift">
              <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 font-semibold">{q}<span className="text-xl text-maroon transition group-open:rotate-45" aria-hidden="true">+</span></summary>
              <p className="mt-3 leading-relaxed text-charcoal/75">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
