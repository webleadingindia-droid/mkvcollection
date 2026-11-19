import type { Metadata } from "next";
import { Building2, Cake, Gift, Heart, PartyPopper, Sparkles, CheckCircle2, ShieldCheck, Clock, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import WhatsAppForm from "@/components/ui/WhatsAppForm";

export const metadata: Metadata = {
  title: "Bulk Orders & Gifting",
  description: "Handmade fridge magnets for weddings, corporate gifts, return gifts and festivals. Share your quantity and date on WhatsApp for a quote.",
};

const uses = [
  { icon: Heart, title: "Weddings", desc: "Charming favours your guests will keep for years.", color: "text-rose-500", bg: "bg-rose-50" },
  { icon: Building2, title: "Corporate gifts", desc: "Thoughtful, memorable gifts for clients and teams.", color: "text-blue-500", bg: "bg-blue-50" },
  { icon: Cake, title: "Return gifts", desc: "Birthday and baby-shower gifts that kids and parents love.", color: "text-amber-500", bg: "bg-amber-50" },
  { icon: PartyPopper, title: "Festivals", desc: "Diwali, Raksha Bandhan and more, in festive sets.", color: "text-purple-500", bg: "bg-purple-50" },
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
      {/* ═══════ 1. HERO & USE CASES ═══════ */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24">
        {/* Background glow */}
        <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-marigold/10 blur-[120px]" />
        
        <div className="container-x relative">
          <SectionHeading 
            eyebrow="Gifting" 
            title="Bulk orders & gifting" 
            subtitle="Planning a wedding, a corporate gift or a festival? Tell us what you need and we will make it special." 
          />
          
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {uses.map(({ icon: Icon, title, desc, color, bg }) => (
              <div 
                key={title} 
                className="group relative overflow-hidden rounded-3xl border border-maroon/10 bg-white/60 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-maroon/20 hover:bg-white hover:shadow-[0_12px_32px_-12px_rgba(122,31,43,0.15)]"
              >
                <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${bg} ${color} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  <Icon size={24} />
                </span>
                <h3 className="mt-5 font-heading text-lg font-bold text-maroon-dark">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ 2. PROCESS & FORM ═══════ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ivory to-cream/30 py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          
          {/* Left: Steps */}
          <div>
            <SectionHeading align="left" eyebrow="How it works" title="Simple from start to finish" />
            
            <ol className="relative mt-8 space-y-8 before:absolute before:inset-y-0 before:left-[19px] before:w-0.5 before:bg-gradient-to-b before:from-maroon/20 before:via-maroon/10 before:to-transparent">
              {steps.map(([title, desc], i) => (
                <li key={title} className="relative flex gap-5">
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_0_0_4px_#FFF] ring-1 ring-maroon/10">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-maroon to-maroon-dark text-sm font-bold text-white shadow-sm">
                      {i + 1}
                    </span>
                  </span>
                  <div className="pt-1.5">
                    <p className="font-heading text-base font-bold text-maroon-dark">{title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-charcoal/65">{desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-10 flex flex-col gap-3 rounded-2xl border border-marigold/20 bg-marigold/5 p-5 text-sm text-charcoal/80">
              <div className="flex items-start gap-3">
                <Sparkles size={18} className="mt-0.5 shrink-0 text-marigold" /> 
                <p><strong>Customisation:</strong> Colours, themes, and gift-ready packaging can be discussed on WhatsApp.</p>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={18} className="mt-0.5 shrink-0 text-marigold" /> 
                <p><strong>Lead time:</strong> We recommend ordering 2-3 weeks early for large quantities.</p>
              </div>
            </div>
          </div>

          {/* Right: Form Card */}
          <div className="relative overflow-hidden rounded-[2rem] border border-maroon/10 bg-white p-6 shadow-[0_20px_60px_-24px_rgba(122,31,43,0.15)] md:p-8 lg:p-10">
            {/* Subtle water/glass accent */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-marigold/50 to-transparent" />
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-marigold/10 blur-[60px]" />

            <div className="relative z-10 mb-8 border-b border-maroon/8 pb-5">
              <h2 className="flex items-center gap-3 font-heading text-2xl font-bold text-maroon-dark">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-maroon text-marigold shadow-md">
                  <Gift size={20} />
                </span>
                Request a quote
              </h2>
              <p className="mt-3 text-sm text-charcoal/60">
                Fill this out and we&apos;ll open WhatsApp with your details pre-filled. No payment needed right now.
              </p>
            </div>

            <div className="relative z-10">
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
            
            {/* Trust footer in form */}
            <div className="relative z-10 mt-8 flex items-center justify-center gap-4 text-[11px] font-medium text-charcoal/50">
              <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-green-600" /> No prepayment</span>
              <span className="h-3 w-px bg-charcoal/20" />
              <span className="flex items-center gap-1"><ShieldCheck size={14} className="text-green-600" /> Secure chat</span>
            </div>
          </div>
          
        </div>
      </section>
    </>
  );
}