import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-x text-center">
        <p className="font-heading text-7xl font-bold text-maroon/30">404</p>
        <h1 className="mt-4 text-3xl font-bold text-maroon-dark md:text-4xl">This magnet fell off the fridge</h1>
        <p className="mx-auto mt-3 max-w-md text-charcoal/70">We could not find the page you were looking for. Let us get you back to the good stuff.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="/" className="btn-primary">Go home</Link><Link href="/shop" className="btn-outline">Browse the shop</Link></div>
      </div>
    </section>
  );
}
