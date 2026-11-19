export default function LegalPage({ title, updated, children }: { title: string; updated?: string; children: React.ReactNode }) {
  return (
    <section className="section">
      <div className="container-x max-w-3xl">
        <h1 className="h2-section font-bold text-maroon-dark">{title}</h1>
        {updated && <p className="mt-2 text-sm text-charcoal/55">Last updated: {updated}</p>}
        <div className="mt-8 space-y-4 leading-relaxed text-charcoal/80 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-maroon-dark [&_li]:ml-5 [&_li]:list-disc [&_a]:text-maroon [&_a]:underline">{children}</div>
      </div>
    </section>
  );
}
