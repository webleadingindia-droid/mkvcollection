import Link from "next/link";
import { ArrowRight, Gift, Hammer, MessageCircle, Package, Sparkles, Truck, Magnet, Users } from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/product/ProductCard";
import { categories, featured, getByCategory } from "@/data/products";
import { images } from "@/data/images";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const marquee = ["Handmade", "Gift Ready", "Indian Food", "Taj Mahal", "Kitchen Decor", "Miniature Art"];
const why = [
  [Hammer, "Handcrafted details", "Every piece is sculpted and painted by hand."],
  [Gift, "Perfect for gifting", "Gift-ready designs for every occasion."],
  [Magnet, "Strong magnet hold", "Stays firmly on your fridge, day after day."],
  [Users, "Bulk orders", "Weddings, corporate gifts and return gifts."],
  [MessageCircle, "Quick WhatsApp support", "Real people, fast replies."],
  [Package, "Safe packaging", "Padded and secure for a safe journey."],
] as const;

export default function HomePage() {
  const items = featured();
  const best = items.filter((p) => p.isBestseller).slice(0, 4);
  const fresh = items.slice(0, 8);
  return (
    <>
      {/* 1. HERO */}
      <section className="dot-pattern relative overflow-hidden">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-marigold/30 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-maroon/15 blur-3xl" />
        <div className="container-x relative grid items-center gap-12 py-12 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-peach px-4 py-1.5 text-xs font-semibold text-maroon"><Sparkles size={14} /> Handmade Miniature Fridge Magnets</span>
            <h1 className="h1-hero mt-6 font-bold text-maroon-dark">Small magnets, <span className="text-maroon">big smiles.</span></h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-charcoal/75">From paneer tikka platters to the Taj Mahal, our tiny handcrafted treasures bring joy to every fridge and make a gift people remember.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/shop" className="btn-primary">Shop Collection <ArrowRight size={16} /></Link>
              <a href={buildWhatsAppLink("Hello MKV Collection 🙏 I would like to place an order.")} target="_blank" rel="noopener noreferrer" className="btn-wa"><MessageCircle size={16} /> Order on WhatsApp</a>
            </div>
            <p className="mt-2 text-xs text-charcoal/55">WhatsApp will open with your message ready. Just tap Send.</p>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-charcoal/75">
              <li className="flex items-center gap-2"><Hammer size={16} className="text-maroon" /> Handmade</li>
              <li className="flex items-center gap-2"><Gift size={16} className="text-maroon" /> Gift-ready</li>
              <li className="flex items-center gap-2"><Truck size={16} className="text-maroon" /> Pan-India delivery</li>
            </ul>
          </div>
          <div className="relative mx-auto grid w-full max-w-lg grid-cols-2 gap-4">
            <div className="float relative row-span-2 aspect-[3/4] overflow-hidden rounded-[2rem] shadow-lift"><SafeImage src={images.hero[0]} alt="Handmade miniature food magnet" priority sizes="(max-width:1024px) 50vw, 250px" /></div>
            <div className="relative aspect-square overflow-hidden rounded-[2rem] shadow-lift"><SafeImage src={images.hero[1]} alt="Taj Mahal souvenir magnet" sizes="250px" /></div>
            <div className="relative aspect-square overflow-hidden rounded-[2rem] shadow-lift"><SafeImage src={images.hero[2]} alt="Kitchen set magnet" sizes="250px" /></div>
            <div className="absolute -left-2 bottom-8 rounded-2xl bg-ivory px-4 py-3 shadow-lift"><p className="text-sm font-semibold text-maroon">100% Handcrafted</p></div>
            <div className="absolute -right-2 top-6 rounded-2xl bg-ivory px-4 py-3 shadow-lift"><p className="text-sm font-semibold text-maroon">4.8 ★ rated</p></div>
          </div>
        </div>
      </section>

      {/* 2. MARQUEE */}
      <div className="overflow-hidden bg-maroon py-4 text-peach" aria-hidden="true">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap font-heading text-lg">
          {[...marquee, ...marquee, ...marquee, ...marquee].map((m, i) => <span key={i}>{m} <span className="ml-10 text-marigold">•</span></span>)}
        </div>
      </div>

      {/* 3. CATEGORIES */}
      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="Shop by category" title="Find your perfect miniature" subtitle="Five collections, endless ways to make your fridge smile." />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {categories.map((c) => (
              <Link key={c.slug} href={`/shop/${c.slug}`} className="group relative aspect-[4/5] overflow-hidden rounded-3xl shadow-soft">
                <SafeImage src={images.categories[c.slug]} alt={c.name} className="transition duration-700 group-hover:scale-110" sizes="(max-width:768px) 50vw, 20vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/85 via-transparent to-transparent" />
                <div className="absolute bottom-0 p-4 text-white">
                  <h3 className="font-heading text-lg font-bold">{c.name}</h3>
                  <p className="text-xs text-white/80">{getByCategory(c.slug).length} designs</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BESTSELLERS */}
      <section className="section bg-ivory">
        <div className="container-x">
          <SectionHeading eyebrow="Customer favourites" title="Bestsellers" subtitle="The designs our customers keep coming back for." />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">{best.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        </div>
      </section>

      {/* 5. BRAND STORY */}
      <section className="section">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-lift"><SafeImage src={images.brandStory} alt="Maker sculpting a miniature magnet" /></div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-maroon">Our story</p>
            <h2 className="h2-section font-bold">Tiny art, made with a lot of heart</h2>
            <p className="mt-5 text-lg leading-relaxed text-charcoal/75">MKV Collection began with a love for miniature art and the little joys of everyday Indian life. Each magnet is shaped, cured and painted by hand, so every piece carries a touch of its maker.</p>
            <Link href="/about" className="btn-outline mt-8">Our Story <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* 6. WHY MKV */}
      <section className="section bg-peach/50">
        <div className="container-x">
          <SectionHeading eyebrow="Why choose MKV" title="Crafted to be loved" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {why.map(([Icon, t, d]) => (
              <div key={t} className="card p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-maroon text-marigold"><Icon size={22} /></span>
                <h3 className="mt-4 text-xl font-bold">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. NEW ARRIVALS */}
      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="Just in" title="New arrivals" subtitle="Fresh designs from our workshop." />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">{fresh.map((p) => <ProductCard key={p.id} product={p} />)}</div>
          <div className="mt-10 text-center"><Link href="/shop" className="btn-outline">View all products</Link></div>
        </div>
      </section>

      {/* 8. GIFTING BANNER */}
      <section className="section">
        <div className="container-x">
          <div className="dot-pattern relative overflow-hidden rounded-[2.5rem] bg-maroon px-6 py-16 text-center text-white md:px-16 md:py-24">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-marigold/25 blur-3xl" />
            <p className="relative mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-marigold">Gifting & bulk orders</p>
            <h2 className="h2-section relative mx-auto max-w-2xl font-bold">Gifts that stay on the fridge</h2>
            <p className="relative mx-auto mt-4 max-w-xl text-white/80">Weddings, corporate gifts, return gifts and souvenir shops. Special pricing from 25 pieces.</p>
            <Link href="/bulk-orders" className="btn relative mt-8 bg-marigold text-maroon-dark hover:brightness-95">Explore Bulk Orders <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* 14. FINAL CTA */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="rounded-[2.5rem] bg-peach px-6 py-14 text-center md:py-20">
            <h2 className="h2-section font-bold text-maroon-dark">Ready to bring a smile home?</h2>
            <p className="mx-auto mt-4 max-w-lg text-charcoal/70">Message us on WhatsApp with your favourite designs and we will take care of the rest.</p>
            <a href={buildWhatsAppLink("Hello MKV Collection 🙏 I would like to place an order.")} target="_blank" rel="noopener noreferrer" className="btn-wa mt-8"><MessageCircle size={18} /> Chat on WhatsApp</a>
            <p className="mt-2 text-xs text-charcoal/55">WhatsApp will open with your message ready. Just tap Send.</p>
          </div>
        </div>
      </section>
    </>
  );
}
