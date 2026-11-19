"use client";
import Link from "next/link";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="section">
      <div className="container-x text-center">
        <h1 className="text-3xl font-bold text-maroon-dark md:text-4xl">Something went wrong</h1>
        <p className="mx-auto mt-3 max-w-md text-charcoal/70">Sorry about that. Please try again, or message us on WhatsApp if it keeps happening.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={reset} className="btn-primary">Try again</button>
          <Link href="/" className="btn-outline">Go home</Link>
        </div>
      </div>
    </section>
  );
}
