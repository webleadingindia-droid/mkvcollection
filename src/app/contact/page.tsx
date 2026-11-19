import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import WhatsAppForm from "@/components/ui/WhatsAppForm";
import { ADDRESS, BUSINESS_HOURS, EMAIL, PHONE } from "@/config/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = { title: "Contact Us", description: "Reach MKV Collection on WhatsApp, phone or email. We reply fast." };

export default function ContactPage() {
  const info = [
    [MessageCircle, "WhatsApp", "Fastest way to reach us", buildWhatsAppLink("Hello MKV Collection 🙏")],
    [Phone, "Phone", PHONE, undefined],
    [Mail, "Email", EMAIL, `mailto:${EMAIL}`],
    [MapPin, "Address", ADDRESS, undefined],
    [Clock, "Hours", BUSINESS_HOURS, undefined],
  ] as const;
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading eyebrow="Say hello" title="We would love to hear from you" subtitle="Questions about an order, a product or gifting? Message us and a real person will reply." />
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <ul className="space-y-4">
            {info.map(([Icon, t, d, href]) => (
              <li key={t} className="card flex items-start gap-4 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-peach text-maroon"><Icon size={20} /></span>
                <div><p className="font-semibold">{t}</p>
                  {href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-sm text-maroon underline">{d}</a> : <p className="text-sm text-charcoal/70">{d}</p>}
                </div>
              </li>
            ))}
          </ul>
          <div className="card p-6 md:p-8">
            <h2 className="text-2xl font-bold text-maroon-dark">Send a message</h2>
            <div className="mt-6">
              <WhatsAppForm
                intro="Hello MKV Collection 🙏 I have a question."
                fields={[
                  { name: "Name", label: "Your name", required: true },
                  { name: "Phone", label: "Phone number", type: "tel", required: true },
                  { name: "Message", label: "Message", type: "textarea", required: true },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
