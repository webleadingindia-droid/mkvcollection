import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone, Sparkles, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import WhatsAppForm from "@/components/ui/WhatsAppForm";
import { ADDRESS, BUSINESS_HOURS, EMAIL, PHONE } from "@/config/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = { 
  title: "Contact Us", 
  description: "Reach MKV Collection on WhatsApp, phone or email. We reply fast." 
};

export default function ContactPage() {
  const info = [
    { 
      icon: MessageCircle, 
      title: "WhatsApp", 
      desc: "Fastest way to reach us", 
      href: buildWhatsAppLink("Hello MKV Collection 🙏"),
      accent: true 
    },
    { 
      icon: Phone, 
      title: "Phone", 
      desc: PHONE, 
      href: `tel:${PHONE.replace(/\s/g, "")}` 
    },
    { 
      icon: Mail, 
      title: "Email", 
      desc: EMAIL, 
      href: `mailto:${EMAIL}` 
    },
    { 
      icon: MapPin, 
      title: "Address", 
      desc: ADDRESS 
    },
    { 
      icon: Clock, 
      title: "Hours", 
      desc: BUSINESS_HOURS 
    },
  ];

  return (
    <section className="relative overflow-hidden pt-6 pb-16 md:pt-10 md:pb-24">
      {/* Background subtle glow */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-marigold/10 blur-[100px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-maroon/5 blur-[100px]" />

      <div className="container-x relative">
        <SectionHeading 
          eyebrow="Say hello" 
          title="We would love to hear from you" 
          subtitle="Questions about an order, a product or gifting? Message us and a real person will reply." 
        />
        
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          
          {/* ═══════ Left Column: Contact Info ═══════ */}
          <div className="space-y-4">
            {info.map((item) => {
              const Icon = item.icon;
              const isLink = !!item.href;
              
              const ContentWrapper = isLink ? "a" : "div";
              const wrapperProps = isLink 
                ? { 
                    href: item.href, 
                    target: item.href.startsWith("http") ? "_blank" : undefined, 
                    rel: "noopener noreferrer" 
                  } 
                : {};

              return (
                <ContentWrapper
                  key={item.title}
                  {...(wrapperProps as any)}
                  className={`group flex items-start gap-4 rounded-2xl border p-4 transition-all duration-200 ease-out md:p-5 ${
                    item.accent 
                      ? "border-[#25D366]/30 bg-[#25D366]/5 hover:border-[#25D366]/50 hover:bg-[#25D366]/10" 
                      : "border-maroon/10 bg-white/60 backdrop-blur-sm hover:-translate-y-0.5 hover:border-maroon/20 hover:bg-white hover:shadow-[0_8px_24px_-12px_rgba(122,31,43,0.15)]"
                  }`}
                >
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-sm md:h-11 md:w-11 ${
                    item.accent 
                      ? "bg-[#25D366] text-white" 
                      : "bg-peach text-maroon"
                  }`}>
                    <Icon size={18} className="md:h-5 md:w-5" />
                  </span>
                  
                  <div className="flex-1">
                    <p className="text-sm font-bold text-maroon-dark md:text-base">{item.title}</p>
                    <p className={`mt-0.5 text-xs md:text-sm ${
                      isLink ? "font-medium text-maroon group-hover:underline" : "text-charcoal/70"
                    }`}>
                      {item.desc}
                    </p>
                  </div>

                  {isLink && (
                    <ArrowRight size={16} className="mt-3 shrink-0 text-maroon/30 transition-transform group-hover:translate-x-1 group-hover:text-maroon" />
                  )}
                </ContentWrapper>
              );
            })}
          </div>

          {/* ═══════ Right Column: Form ═══════ */}
          <div className="relative overflow-hidden rounded-3xl border border-maroon/10 bg-gradient-to-b from-white to-ivory/50 p-6 shadow-[0_8px_32px_-16px_rgba(122,31,43,0.1)] backdrop-blur-sm md:p-8">
            <div className="mb-6 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-marigold/20 text-maroon">
                <Sparkles size={16} />
              </span>
              <h2 className="font-heading text-xl font-bold text-maroon-dark md:text-2xl">
                Send a message
              </h2>
            </div>
            
            <div className="relative z-10">
              <WhatsAppForm
                intro="Hello MKV Collection 🙏 I have a question."
                fields={[
                  { name: "Name", label: "Your name", required: true },
                  { name: "Phone", label: "Phone number", type: "tel", required: true },
                  { name: "Message", label: "Message", type: "textarea", required: true },
                ]}
              />
            </div>
            
            {/* Bottom accent line in form */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-marigold/30 to-transparent" />
          </div>
          
        </div>
      </div>
    </section>
  );
}