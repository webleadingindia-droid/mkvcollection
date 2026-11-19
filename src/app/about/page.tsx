import type { Metadata } from "next";
import Link from "next/link";
import { Hammer, Heart, Palette, Sparkles } from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";
import SectionHeading from "@/components/ui/SectionHeading";
import { images } from "@/data/images";
import { BRAND_NAME, TAGLINE } from "@/config/site";

export const metadata: Metadata = { title: "Our Story", description: `${BRAND_NAME} makes handmade miniature fridge magnets inspired by everyday India.` };

const values = [
  [Hammer, "Made by hand", "Each piece is sculpted, baked and painted by hand, so no two are exactly alike."],
  [Palette, "Rooted in India", "Street food, kitchen staples and monuments, the things that feel like home."],
  [Heart, "Made for gifting", "Small enough to post, special enough to be remembered."],
] as const;
const process = ["Sketch the idea", "Sculpt in clay and resin", "Paint every detail", "Attach a strong magnet", "Quality check and pack"];

export default function AboutPage() {
  return (
    <>
      <section className="relative">
        <div className="relative h-64 md:h-96"><SafeImage src={images.about} alt="MKV Collection handmade magnets" priority sizes="100vw" /><div className="absolute inset-0 bg-maroon-dark/60" /></div>
        <div className="container-x absolute inset-0 flex flex-col items-start justify-center text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-marigold">Our story</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold md:text-6xl">{TAGLINE}</h1>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lift"><SafeImage src={images.maker} alt="Making a miniature magnet by hand" sizes="(max-width:1024px) 100vw, 600px" /></div>
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-maroon"><Sparkles size={14} /> Who we are</p>
            <h2 className="h2-section mt-3 font-bold">Tiny things, made with big care</h2>
            <p className="mt-5 leading-relaxed text-charcoal/75">{BRAND_NAME} began with a simple idea: a fridge door should make you smile. We craft miniature magnets that capture everyday Indian moments, from a plate of paneer tikka to a tea set, and the Taj Mahal itself.</p>
            <p className="mt-4 leading-relaxed text-charcoal/75">Every magnet is made by hand in small batches. We care about the details you only notice up close, and about packing each order so it arrives exactly as we made it.</p>
            <Link href="/shop" className="btn-primary mt-8">Shop the collection</Link>
          </div>
        </div>
      </section>

      <section className="section bg-ivory">
        <div className="container-x">
          <SectionHeading eyebrow="What we believe" title="Craft you can feel" />
          <div className="grid gap-6 md:grid-cols-3">
            {values.map(([Icon, t, d]) => <div key={t} className="card p-7"><Icon className="text-maroon" size={28} /><h3 className="mt-4 text-xl font-bold">{t}</h3><p className="mt-2 text-sm leading-relaxed text-charcoal/70">{d}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="Behind the scenes" title="How a magnet is made" />
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {process.map((s, i) => <li key={s} className="rounded-3xl bg-peach p-6"><span className="font-heading text-3xl font-bold text-maroon">{i + 1}</span><p className="mt-2 text-sm font-semibold">{s}</p></li>)}
          </ol>
        </div>
      </section>
    </>
  );
}
