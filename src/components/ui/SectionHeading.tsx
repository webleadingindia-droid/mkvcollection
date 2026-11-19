export default function SectionHeading({ eyebrow, title, subtitle, align = "center", light = false }: {
  eyebrow?: string; title: string; subtitle?: string; align?: "center" | "left"; light?: boolean;
}) {
  return (
    <div className={`mb-10 max-w-2xl md:mb-14 ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.2em] ${light ? "text-marigold" : "text-maroon"}`}>{eyebrow}</p>}
      <h2 className={`h2-section font-bold ${light ? "text-white" : "text-charcoal"}`}>{title}</h2>
      {subtitle && <p className={`mt-4 text-base leading-relaxed md:text-lg ${light ? "text-white/80" : "text-charcoal/70"}`}>{subtitle}</p>}
    </div>
  );
}
