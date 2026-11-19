import type { Metadata } from "next";
import { Building2, Cake, Gift, Heart, PartyPopper, Sparkles } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import WhatsAppForm from "@/components/ui/WhatsAppForm";

export const metadata: Metadata = {
  title: "Bulk Orders & Gifting",
  description: "Handmade fridge magnets for weddings, corporate gifts, return gifts and festivals. Share your quantity and date on WhatsApp for a quote.",
};

const uses = [
  [Heart, "Weddings", "Charming favours your guests will keep for years."],
  [Building2, "Corporate gifts", "Thoughtful, memorable gifts for clients and teams."],
  [Cake, "Return gifts", "Birthday and baby-shower gifts that kids and parents love."],
  [PartyPopper, "Festivals", "Diwali, Raksha Bandhan and more, in festive sets."],
] as const;
const steps = [
  ["Share your idea", "Tell us the occasion, quantity and date."],
  ["Get a quote", "We reply on WhatsApp with options and pricing."],
  ["Confirm & pay", "Approve the design and pay by UPI or bank transfer."],
  ["Delivered with care", "Packed securely and shipped on schedule."],
] as const;

export default function BulkOrdersPage() {
  return (
    <>
      <section className="dot-pattern section">
        <div className="container-x">
          <SectionHeading eyebrow="Gifting" title="Bulk orders & gifting" subtitle="Planning a wedding, a corporate gift or a festival? Tell us what you need and we will make it special." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {uses.map(([Icon, t, d]) => (
              <div key={t} className="card p-6"><Icon className="text-maroon" size={28} /><h3 className="mt-4 text-xl font-bold">{t}</h3><p className="mt-2 text-sm text-charcoal/70">{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-ivory">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHeading align="left" eyebrow="How it works" title="Simple from start to finish" />
            <ol className="space-y-5">
              {steps.map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-maroon font-bold text-white">{i + 1}</span>
                  <div><p className="font-semibold">{t}</p><p className="text-sm text-charcoal/70">{d}</p></div>
                </li>
              ))}
            </ol>
            <p className="mt-8 flex items-start gap-2 rounded-2xl bg-peach p-4 text-sm"><Sparkles size={18} className="mt-0.5 shrink-0 text-maroon" /> Custom colours, themes and gift-ready packaging can be discussed on WhatsApp. Order early for large quantities.</p>
          </div>
          <div className="card p-6 md:p-8">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-maroon-dark"><Gift size={24} /> Request a quote</h2>
            <div className="mt-6">
              <WhatsAppForm
                intro="Hello MKV Collection 🙏 I would like a quote for a bulk / gifting order."
                submitLabel="Request quote on WhatsApp"
                fields={[
                  { name: "Name", label: "Your name", required: true },
                  { name: "Occasion", label: "Occasion", type: "select", required: true, options: ["Wedding", "Corporate gift", "Return gift", "Festival", "Other"] },
                  { name: "Quantity", label: "Approx. quantity", type: "number", required: true },
                  { name: "Date needed by", label: "Needed by", type: "date" },
                  { name: "City", label: "Delivery city / pincode" },
                  { name: "Notes", label: "Anything else?", type: "textarea", placeholder: "Themes, colours, budget, favourite magnets…" },
                ]}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
