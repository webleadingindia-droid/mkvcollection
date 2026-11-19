import Link from "next/link";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Clock,
  ArrowUp,
  MessageCircle,
  ShieldCheck,
  CreditCard,
  Truck,
} from "lucide-react";
import {
  ADDRESS,
  BRAND_NAME,
  BUSINESS_HOURS,
  EMAIL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  PHONE,
  TAGLINE,
} from "@/config/site";
import { categories } from "@/data/products";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const help = [
  ["FAQ", "/faq"],
  ["Shipping & Returns", "/shipping-returns"],
  ["Bulk Orders", "/bulk-orders"],
  ["Privacy Policy", "/privacy-policy"],
  ["Terms", "/terms"],
];

export default function Footer() {
  const heading =
    "mb-4 font-heading text-sm font-semibold uppercase tracking-[0.12em] text-marigold/90";
  const link =
    "group relative inline-flex items-center py-1.5 text-sm text-white/70 transition-colors duration-200 hover:text-white";

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-maroon-dark via-maroon-dark to-[#3d0f16] text-white">
      {/* Decorative background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[900px] -translate-x-1/2 rounded-full bg-marigold/10 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-marigold/40 to-transparent"
      />

      <div className="container-x relative grid gap-10 py-14 md:grid-cols-2 md:py-16 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-12">
        {/* Brand Column */}
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-marigold to-[#d4a745] font-heading text-sm font-bold text-maroon-dark shadow-lg shadow-marigold/20">
              MKV
            </span>
            <p className="font-heading text-2xl font-bold tracking-tight">
              {BRAND_NAME}
            </p>
          </div>

          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            {TAGLINE} Handmade miniature fridge magnets, crafted with love and
            made for gifting.
          </p>

          {/* WhatsApp CTA */}
          <a
            href={buildWhatsAppLink("Hello MKV Collection 🙏")}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex items-center gap-2 rounded-full border border-marigold/30 bg-marigold/10 px-4 py-2.5 text-sm font-medium text-marigold backdrop-blur transition hover:border-marigold/60 hover:bg-marigold/20"
          >
            <MessageCircle
              size={16}
              className="transition group-hover:scale-110"
            />
            Chat with us on WhatsApp
          </a>

          {/* Socials */}
          <div className="mt-6 flex gap-3">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-marigold/50 hover:bg-marigold hover:text-maroon-dark"
            >
              <Instagram
                size={17}
                className="transition group-hover:scale-110"
              />
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-marigold/50 hover:bg-marigold hover:text-maroon-dark"
            >
              <Facebook
                size={17}
                className="transition group-hover:scale-110"
              />
            </a>
          </div>
        </div>

        {/* Shop Column */}
        <div>
          <h3 className={heading}>Shop</h3>
          <nav aria-label="Shop categories">
            {categories.map((c) => (
              <Link key={c.slug} href={`/shop/${c.slug}`} className={link}>
                <span className="relative">
                  {c.name}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-marigold transition-all duration-300 group-hover:w-full" />
                </span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Help Column */}
        <div>
          <h3 className={heading}>Help</h3>
          <nav aria-label="Help links">
            {help.map(([t, href]) => (
              <Link key={href} href={href} className={link}>
                <span className="relative">
                  {t}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-marigold transition-all duration-300 group-hover:w-full" />
                </span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact Column */}
        <div>
          <h3 className={heading}>Get in touch</h3>
          <div className="flex flex-col gap-2.5">
            <a
              href={`tel:${PHONE.replace(/\s/g, "")}`}
              className="group flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3 text-sm text-white/75 transition hover:border-white/15 hover:bg-white/[0.07]"
            >
              <Phone
                size={16}
                className="mt-0.5 shrink-0 text-marigold/80 transition group-hover:text-marigold"
              />
              <span>{PHONE}</span>
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="group flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3 text-sm text-white/75 transition hover:border-white/15 hover:bg-white/[0.07]"
            >
              <Mail
                size={16}
                className="mt-0.5 shrink-0 text-marigold/80 transition group-hover:text-marigold"
              />
              <span className="break-all">{EMAIL}</span>
            </a>
            <div className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3 text-sm text-white/75">
              <MapPin
                size={16}
                className="mt-0.5 shrink-0 text-marigold/80"
              />
              <span>{ADDRESS}</span>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3 text-sm text-white/60">
              <Clock size={16} className="mt-0.5 shrink-0 text-marigold/60" />
              <span>{BUSINESS_HOURS}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Strip */}
      <div className="relative border-t border-white/10">
        <div className="container-x flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-4 text-xs text-white/60 md:justify-start">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-marigold/70" />
            Secure checkout
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CreditCard size={14} className="text-marigold/70" />
            UPI • Cards • Bank Transfer
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Truck size={14} className="text-marigold/70" />
            Pan-India shipping
          </span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/55 md:flex-row">
          <p>
            © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <p className="text-center md:text-right">
              Handmade with{" "}
              <span className="text-marigold" aria-label="love">
                ♥
              </span>{" "}
              in India
            </p>
            <a
              href="#top"
              aria-label="Back to top"
              className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-marigold/60 hover:bg-marigold hover:text-maroon-dark"
            >
              <ArrowUp
                size={16}
                className="transition group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}