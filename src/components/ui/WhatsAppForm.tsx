"use client";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export type Field = { name: string; label: string; type?: "text" | "number" | "date" | "tel" | "textarea" | "select"; options?: string[]; required?: boolean; placeholder?: string };

/** Collects details and opens WhatsApp with a ready message. No server needed. */
export default function WhatsAppForm({ intro, fields, submitLabel = "Send on WhatsApp" }: { intro: string; fields: Field[]; submitLabel?: string }) {
  const [v, setV] = useState<Record<string, string>>({});
  const set = (k: string, val: string) => setV((s) => ({ ...s, [k]: val }));
  const input = "min-h-[48px] w-full rounded-2xl border border-maroon/15 bg-white px-4 py-3 text-sm focus:border-maroon focus:outline-none focus:ring-2 focus:ring-marigold";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = fields.filter((f) => v[f.name]?.trim()).map((f) => `${f.label}: ${v[f.name].trim()}`).join("\n");
    window.open(buildWhatsAppLink(`${intro}\n\n${body}`), "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          <label key={f.name} className={`block text-sm font-medium ${f.type === "textarea" ? "sm:col-span-2" : ""}`}>
            {f.label}{f.required && <span className="text-maroon"> *</span>}
            {f.type === "textarea" ? (
              <textarea rows={4} required={f.required} placeholder={f.placeholder} value={v[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)} className={`${input} mt-1.5`} />
            ) : f.type === "select" ? (
              <select required={f.required} value={v[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)} className={`${input} mt-1.5`}>
                <option value="">Select…</option>
                {f.options?.map((o) => <option key={o}>{o}</option>)}
              </select>
            ) : (
              <input type={f.type ?? "text"} min={f.type === "number" ? 1 : undefined} required={f.required} placeholder={f.placeholder} value={v[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)} className={`${input} mt-1.5`} />
            )}
          </label>
        ))}
      </div>
      <button type="submit" className="btn-wa w-full sm:w-auto"><MessageCircle size={18} /> {submitLabel}</button>
      <p className="text-xs text-charcoal/55">This opens WhatsApp with your details filled in. Nothing is stored on our website.</p>
    </form>
  );
}
