"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import {
  ArrowLeft, ArrowRight, Check, Copy, Download, MapPin, Loader2, MessageCircle, ShoppingBag, Smartphone,
} from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";
import { products } from "@/data/products";
import { useStore } from "@/lib/store";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { BRAND_NAME, PHONE, UPI_ID, UPI_PAYEE_NAME, shippingFor } from "@/config/site";

type Info = { name: string; email: string; phone: string; address: string; city: string; pincode: string };
type Errors = Partial<Record<keyof Info, string>>;

const EMPTY: Info = { name: "", email: "", phone: "", address: "", city: "", pincode: "" };
const INFO_KEY = "mkv-checkout-info-v1";
const STEPS = ["Your details", "Your order", "Pay via UPI"];

function validate(v: Info): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your full name";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Enter a valid email";
  if (!/^[6-9]\d{9}$/.test(v.phone.replace(/\D/g, "").slice(-10))) e.phone = "Enter a valid 10-digit mobile number";
  if (v.address.trim().length < 10) e.address = "Enter your full address (house no, street, area)";
  if (v.city.trim().length < 2) e.city = "Enter your city";
  if (!/^\d{6}$/.test(v.pincode.trim())) e.pincode = "Enter a 6-digit pincode";
  return e;
}

function makeOrderId() {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  return `MKV-${ymd}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

function downloadBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export default function CheckoutFlow() {
  const { ready, cart, clearCart } = useStore();
  // Buy Now mode: /checkout?buy=<productId>&qty=<n> -> only that product, cart stays untouched
  const params = useSearchParams();
  const buyId = params.get("buy");
  const buyQty = Math.min(99, Math.max(1, parseInt(params.get("qty") ?? "1", 10) || 1));
  const buyMode = !!buyId;
  const [step, setStep] = useState(1);
  const [info, setInfo] = useState<Info>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [orderId, setOrderId] = useState("");
  const [placedAt, setPlacedAt] = useState("");
  const [utr, setUtr] = useState("");
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);
  const [locBusy, setLocBusy] = useState(false);
  const [locMsg, setLocMsg] = useState("");
  const receiptRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<Blob | null>(null);
  const autoTriedRef = useRef(false);

  // Prefill saved details
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(INFO_KEY);
      if (raw) setInfo({ ...EMPTY, ...(JSON.parse(raw) as Partial<Info>) });
    } catch { /* ignore */ }
  }, []);

  const lines = useMemo(() => {
    const items = buyMode ? [{ id: buyId as string, qty: buyQty }] : cart;
    return items.map((i) => ({ ...i, p: products.find((p) => p.id === i.id)! })).filter((l) => l.p);
  }, [cart, buyMode, buyId, buyQty]);
  const backHref = buyMode && lines[0] ? `/products/${lines[0].p.slug}` : "/cart";
  const hasEnquiry = lines.some((l) => l.p.isPlaceholder || l.p.price <= 0);
  const subtotal = lines.reduce((n, l) => n + l.p.price * l.qty, 0);
  const shipping = shippingFor(subtotal);
  const total = subtotal + shipping;

  const upiLink = useMemo(() => {
    const q = new URLSearchParams({
      pa: UPI_ID,
      pn: UPI_PAYEE_NAME,
      am: total.toFixed(2),
      cu: "INR",
      tn: `Order ${orderId}`,
    });
    // URLSearchParams encodes spaces as "+", UPI apps expect %20
    return `upi://pay?${q.toString().replace(/\+/g, "%20")}`;
  }, [total, orderId]);

  const set = (k: keyof Info, val: string) => {
    setInfo((s) => ({ ...s, [k]: val }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  // ---------- Current location -> auto-fill address ----------
  // Only EMPTY fields are filled, so anything the user typed / saved is never overwritten.
  const fillFromLocation = useCallback(() => {
    setLocMsg("");
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setLocMsg("Aapka browser location support nahi karta. Address manually bharein.");
      return;
    }
    setLocBusy(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&addressdetails=1&zoom=18&lat=${latitude}&lon=${longitude}`,
            { headers: { "Accept-Language": "en" } }
          );
          if (!res.ok) throw new Error("geocode failed");
          const data = await res.json();
          const a = data.address ?? {};

          const street = [
            a.house_number,
            a.road,
            a.neighbourhood || a.suburb || a.residential,
            a.village,
          ].filter(Boolean).join(", ");

          const city = a.city || a.town || a.county || a.state_district || a.village || "";
          const state = a.state || "";
          const cityState = [city, state].filter(Boolean).join(", ");
          const pincode = String(a.postcode ?? "").replace(/\D/g, "").slice(0, 6);

          setInfo((s) => ({
            ...s,
            address: s.address.trim() ? s.address : (street || data.display_name || ""),
            city: s.city.trim() ? s.city : cityState,
            pincode: s.pincode.trim() ? s.pincode : pincode,
          }));
          setErrors((e) => ({ ...e, address: undefined, city: undefined, pincode: undefined }));
          setLocMsg("Address fill ho gaya ✓ Kripya check karke house no / landmark add kar lein.");
        } catch {
          setLocMsg("Address nahi mil paya. Kripya manually bharein.");
        } finally {
          setLocBusy(false);
        }
      },
      (err) => {
        setLocBusy(false);
        setLocMsg(
          err.code === err.PERMISSION_DENIED
            ? "Location permission deny ho gayi. Browser settings me allow karein ya address manually bharein."
            : "Location nahi mil payi. Address manually bharein."
        );
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }, []);

  // If the user has ALREADY granted location earlier, fill automatically on page open (no popup).
  // New users get the button instead, so we don't trigger an unwanted permission popup.
  useEffect(() => {
    if (autoTriedRef.current) return;
    autoTriedRef.current = true;
    if (typeof navigator === "undefined" || !navigator.permissions) return;
    navigator.permissions
      .query({ name: "geolocation" as PermissionName })
      .then((r) => { if (r.state === "granted") fillFromLocation(); })
      .catch(() => { /* ignore */ });
  }, [fillFromLocation]);

  const goStep2 = () => {
    const e = validate(info);
    setErrors(e);
    if (Object.keys(e).length) return;
    try { window.localStorage.setItem(INFO_KEY, JSON.stringify(info)); } catch { /* ignore */ }
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goStep3 = () => {
    blobRef.current = null;
    setOrderId(makeOrderId());
    setPlacedAt(new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }));
    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ---------- Screenshot of the whole payment page card ----------
  const capture = useCallback(async (): Promise<Blob | null> => {
    if (!receiptRef.current) return null;
    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(receiptRef.current, {
      scale: 2, backgroundColor: "#ffffff", useCORS: true, logging: false,
    });
    return new Promise((res) => canvas.toBlob((b) => res(b), "image/png"));
  }, []);

  // Auto screenshot as soon as step 3 is on screen (so Share works instantly on tap)
  useEffect(() => {
    if (step !== 3 || !orderId) return;
    let cancelled = false;
    const t = setTimeout(async () => {
      try {
        const b = await capture();
        if (!cancelled && b) blobRef.current = b;
      } catch { /* will retry on click */ }
    }, 900);
    return () => { cancelled = true; clearTimeout(t); };
  }, [step, orderId, capture]);

  const waMessage = () =>
    [
      `Hello ${BRAND_NAME} 🙏`,
      "Maine order ka UPI payment kar diya hai.",
      "",
      `🧾 Order ID: ${orderId}`,
      `💰 Amount paid: ₹${total}`,
      utr.trim() ? `🔖 UPI Txn / UTR: ${utr.trim()}` : "",
      "",
      `👤 ${info.name}`,
      `📞 ${info.phone}`,
      `📍 ${info.address}, ${info.city} - ${info.pincode}`,
      "",
      ...lines.map((l, n) => `${n + 1}. ${l.p.shortTitle} x ${l.qty} = ₹${l.p.price * l.qty}`),
      "",
      "Page ka screenshot aur payment screenshot attach kar raha hu.",
    ].filter((x, i, a) => x !== "" || a[i - 1] !== "").join("\n");

  const shareOnWhatsApp = async () => {
    setBusy(true); setNote("");
    try {
      const blob = blobRef.current ?? (await capture());
      if (!blob) throw new Error("capture failed");
      blobRef.current = blob;
      const file = new File([blob], `${orderId}.png`, { type: "image/png" });

      // Mobile: native share sheet with the image attached -> pick WhatsApp
      if (typeof navigator !== "undefined" && navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({ files: [file], text: waMessage() });
          return;
        } catch (err) {
          if ((err as Error).name === "AbortError") return;
        }
      }
      // Fallback (desktop / unsupported): save image + open WhatsApp chat with message
      downloadBlob(blob, `${orderId}.png`);
      setNote("Screenshot download ho gaya. WhatsApp chat me 📎 se is image ko attach karke send karein.");
      const w = window.open(buildWhatsAppLink(waMessage()), "_blank", "noopener,noreferrer");
      if (!w) window.location.href = buildWhatsAppLink(waMessage());
    } catch {
      setNote("Screenshot nahi ban paya. Neeche 'Open WhatsApp' dabayein aur page ka screenshot manually attach karein.");
    } finally {
      setBusy(false);
    }
  };

  const saveScreenshot = async () => {
    setBusy(true);
    try {
      const blob = blobRef.current ?? (await capture());
      if (blob) downloadBlob(blob, `${orderId}.png`);
    } finally { setBusy(false); }
  };

  const copyUpi = async () => {
    try { await navigator.clipboard.writeText(UPI_ID); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* ignore */ }
  };

  const finish = () => { if (!buyMode) clearCart(); window.location.href = "/"; };

  const input = "min-h-[48px] w-full rounded-2xl border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-marigold";
  const field = (k: keyof Info, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <label className="block text-sm font-medium">
      {label} <span className="text-maroon">*</span>
      <input
        value={info[k]} onChange={(e) => set(k, e.target.value)} aria-invalid={!!errors[k]}
        className={`${input} mt-1.5 ${errors[k] ? "border-red-500" : "border-maroon/15 focus:border-maroon"}`} {...props}
      />
      {errors[k] && <span className="mt-1 block text-xs font-normal text-red-600">{errors[k]}</span>}
    </label>
  );

  // ---------- Empty / enquiry guards ----------
  if (!ready) {
    return <section className="section min-h-[60vh]"><div className="container-x flex justify-center py-16"><div className="h-8 w-8 animate-spin rounded-full border-2 border-maroon border-t-transparent" /></div></section>;
  }
  if (lines.length === 0) {
    return (
      <section className="section min-h-[60vh]"><div className="container-x max-w-xl text-center">
        <ShoppingBag className="mx-auto text-maroon/60" size={36} />
        <h1 className="mt-4 font-heading text-2xl font-bold text-maroon-dark">Your cart is empty</h1>
        <Link href="/shop" className="btn-primary mt-6">Browse collection</Link>
      </div></section>
    );
  }
  if (hasEnquiry) {
    return (
      <section className="section min-h-[60vh]"><div className="container-x max-w-xl text-center">
        <h1 className="font-heading text-2xl font-bold text-maroon-dark">Some items are price on enquiry</h1>
        <p className="mt-3 text-sm text-charcoal/70">Online payment needs a fixed price. Please remove those items, or send your list on WhatsApp for a quote.</p>
        <Link href={backHref} className="btn-primary mt-6">Go back</Link>
      </div></section>
    );
  }

  return (
    <section className="section min-h-[70vh]">
      <div className="container-x max-w-3xl">
        <h1 className="text-center font-heading text-3xl font-bold text-maroon-dark md:text-4xl">Checkout</h1>

        {/* Stepper */}
        <ol className="mx-auto mt-8 mb-8 flex max-w-xl items-center">
          {STEPS.map((label, i) => {
            const n = i + 1; const done = step > n; const active = step === n;
            return (
              <li key={label} className="flex flex-1 items-center last:flex-none">
                <div className="flex flex-col items-center gap-1.5">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition ${done || active ? "bg-maroon text-white" : "bg-white text-charcoal/50 ring-1 ring-maroon/15"}`}>
                    {done ? <Check size={16} /> : n}
                  </span>
                  <span className={`text-[11px] font-medium ${active ? "text-maroon" : "text-charcoal/55"}`}>{label}</span>
                </div>
                {n < STEPS.length && <span className={`mx-2 mb-5 h-px flex-1 ${step > n ? "bg-maroon" : "bg-maroon/15"}`} />}
              </li>
            );
          })}
        </ol>

        {/* ───────── STEP 1: details ───────── */}
        {step === 1 && (
          <form onSubmit={(e) => { e.preventDefault(); goStep2(); }} noValidate className="rounded-3xl border border-maroon/10 bg-white p-5 shadow-soft sm:p-8">
            <h2 className="font-heading text-xl font-bold text-maroon-dark">Basic information</h2>

            <button
              type="button"
              onClick={fillFromLocation}
              disabled={locBusy}
              className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-2xl border border-maroon/20 bg-ivory/80 px-4 py-2 text-sm font-semibold text-maroon transition hover:bg-peach/60 disabled:opacity-60"
            >
              {locBusy ? <Loader2 size={16} className="animate-spin" /> : <MapPin size={16} />}
              {locBusy ? "Taking the location…" : "Use my current location"}
            </button>
            {locMsg && <p className="mt-2 text-xs text-charcoal/70">{locMsg}</p>}

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {field("name", "Full name", { autoComplete: "name", placeholder: "Your name" })}
              {field("phone", "Mobile number", { type: "tel", inputMode: "numeric", autoComplete: "tel", placeholder: "10-digit number" })}
              <div className="sm:col-span-2">{field("email", "Email", { type: "email", autoComplete: "email", placeholder: "you@example.com" })}</div>
              <label className="block text-sm font-medium sm:col-span-2">
                Full address <span className="text-maroon">*</span>
                <textarea rows={3} value={info.address} onChange={(e) => set("address", e.target.value)} autoComplete="street-address"
                  placeholder="House no, street, area, landmark"
                  className={`${input} mt-1.5 ${errors.address ? "border-red-500" : "border-maroon/15 focus:border-maroon"}`} />
                {errors.address && <span className="mt-1 block text-xs font-normal text-red-600">{errors.address}</span>}
              </label>
              {field("city", "City / State", { autoComplete: "address-level2", placeholder: "City, State" })}
              {field("pincode", "Pincode", { inputMode: "numeric", maxLength: 6, autoComplete: "postal-code", placeholder: "6-digit pincode" })}
            </div>
            <div className="mt-7 flex items-center justify-between gap-3">
              <Link href={backHref} className="inline-flex items-center gap-1 text-sm font-medium text-maroon hover:underline"><ArrowLeft size={14} /> {buyMode ? "Product" : "Cart"}</Link>
              <button type="submit" className="btn-primary">Continue <ArrowRight size={16} /></button>
            </div>
          </form>
        )}

        {/* ───────── STEP 2: order review ───────── */}
        {step === 2 && (
          <div className="rounded-3xl border border-maroon/10 bg-white p-5 shadow-soft sm:p-8">
            <h2 className="font-heading text-xl font-bold text-maroon-dark">Your order</h2>
            <ul className="mt-4 divide-y divide-maroon/10">
              {lines.map(({ p, qty }) => (
                <li key={p.id} className="flex items-center gap-3 py-3">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-peach">
                    <SafeImage src={p.images[0] ?? ""} fallback={p.images[1] ?? ""} alt={p.shortTitle} sizes="64px" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-semibold">{p.shortTitle}</p>
                    <p className="text-xs text-charcoal/55">₹{p.price} × {qty}</p>
                  </div>
                  <span className="text-sm font-bold text-maroon">₹{p.price * qty}</span>
                </li>
              ))}
            </ul>

            <div className="mt-2 space-y-1.5 border-t border-maroon/10 pt-4 text-sm">
              <div className="flex justify-between text-charcoal/70"><span>Subtotal</span><span>₹{subtotal}</span></div>
              <div className="flex justify-between text-charcoal/70"><span>Shipping</span><span className={shipping ? "" : "text-green-700"}>{shipping ? `₹${shipping}` : "Free"}</span></div>
              <div className="flex items-baseline justify-between pt-1"><span className="font-medium">Total to pay</span><span className="text-2xl font-bold text-maroon">₹{total}</span></div>
            </div>

            <div className="mt-5 rounded-2xl bg-ivory/80 p-4 text-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">Deliver to</p>
                  <p className="mt-1 text-charcoal/75">{info.name} · {info.phone}</p>
                  <p className="text-charcoal/75">{info.address}, {info.city} - {info.pincode}</p>
                  <p className="text-charcoal/75">{info.email}</p>
                </div>
                <button type="button" onClick={() => setStep(1)} className="shrink-0 text-xs font-semibold text-maroon hover:underline">Edit</button>
              </div>
            </div>

            <div className="mt-7 flex items-center justify-between gap-3">
              <button type="button" onClick={() => setStep(1)} className="inline-flex items-center gap-1 text-sm font-medium text-maroon hover:underline"><ArrowLeft size={14} /> Back</button>
              <button type="button" onClick={goStep3} className="btn-primary">Proceed to payment <ArrowRight size={16} /></button>
            </div>
          </div>
        )}

        {/* ───────── STEP 3: UPI payment ───────── */}
        {step === 3 && (
          <div>
            {/* Everything inside this box is captured in the screenshot (inline hex colours for reliable capture) */}
            <div ref={receiptRef} style={{ background: "#ffffff", color: "#2B2B2B", borderRadius: 24, padding: 24, border: "1px solid rgba(122,31,43,.12)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 20, color: "#7A1F2B" }}>{BRAND_NAME}</div>
                  <div style={{ fontSize: 12, opacity: .65, marginTop: 2 }}>UPI payment · {PHONE}</div>
                </div>
                <div style={{ textAlign: "right", fontSize: 12 }}>
                  <div style={{ fontWeight: 700 }}>{orderId}</div>
                  <div style={{ opacity: .65 }}>{placedAt}</div>
                </div>
              </div>

              <div style={{ margin: "18px 0", textAlign: "center" }}>
                <div style={{ fontSize: 13, opacity: .7 }}>Scan & pay</div>
                <div style={{ fontSize: 34, fontWeight: 800, color: "#7A1F2B", lineHeight: 1.2 }}>₹{total}</div>
                <div style={{ display: "inline-block", marginTop: 10, padding: 10, background: "#fff", border: "1px solid #eadfd2", borderRadius: 16 }}>
                  <QRCodeCanvas value={upiLink} size={210} level="M" marginSize={1} bgColor="#ffffff" fgColor="#000000" />
                </div>
                <div style={{ marginTop: 8, fontSize: 13 }}>UPI ID: <b>{UPI_ID}</b></div>
                <div style={{ fontSize: 12, opacity: .65 }}>Pay to: {UPI_PAYEE_NAME}</div>
              </div>

              <div style={{ borderTop: "1px dashed #d9c8b4", paddingTop: 12, fontSize: 13 }}>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>Order details</div>
                {lines.map((l) => (
                  <div key={l.p.id} style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "2px 0" }}>
                    <span>{l.p.shortTitle} × {l.qty}</span><span>₹{l.p.price * l.qty}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", padding: "2px 0", opacity: .75 }}><span>Shipping</span><span>{shipping ? `₹${shipping}` : "Free"}</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, paddingTop: 6, borderTop: "1px solid #eee", marginTop: 4 }}><span>Total</span><span>₹{total}</span></div>
              </div>

              <div style={{ borderTop: "1px dashed #d9c8b4", marginTop: 12, paddingTop: 12, fontSize: 13, lineHeight: 1.5 }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>Customer</div>
                <div>{info.name} · {info.phone}</div>
                <div>{info.email}</div>
                <div>{info.address}, {info.city} - {info.pincode}</div>
              </div>
            </div>

            {/* Controls (not part of screenshot) */}
            <div className="mt-5 rounded-3xl border border-maroon/10 bg-white p-5 shadow-soft sm:p-6">
              <div className="grid gap-3 sm:grid-cols-2">
                <a href={upiLink} className="btn-outline"><Smartphone size={16} /> Pay with UPI app</a>
                <button type="button" onClick={copyUpi} className="btn-outline">{copied ? <Check size={16} /> : <Copy size={16} />} {copied ? "Copied" : "Copy UPI ID"}</button>
              </div>
              <p className="mt-3 text-xs text-charcoal/60">On mobile tap “Pay with UPI app”. On desktop scan the QR with any UPI app (GPay, PhonePe, Paytm, BHIM). Amount is pre-filled.</p>

              <hr className="my-5 border-maroon/10" />

              <p className="text-sm font-semibold text-maroon-dark">After paying</p>
              <label className="mt-3 block text-sm font-medium">
                UPI transaction / UTR ID <span className="font-normal text-charcoal/50">(optional, helps us verify faster)</span>
                <input value={utr} onChange={(e) => setUtr(e.target.value)} placeholder="12-digit UTR" className={`${input} mt-1.5 border-maroon/15 focus:border-maroon`} />
              </label>

              <button type="button" onClick={shareOnWhatsApp} disabled={busy} className="btn-wa mt-4 w-full disabled:opacity-60">
                <MessageCircle size={18} /> {busy ? "Preparing screenshot…" : "Share page screenshot on WhatsApp"}
              </button>
              <p className="mt-2 text-xs text-charcoal/60">
                Is page ka screenshot apne-aap ban jaata hai. WhatsApp me bhejte waqt apne UPI app ka <b>payment success screenshot</b> bhi attach karein.
              </p>
              {note && <p className="mt-3 rounded-xl bg-peach/60 p-3 text-xs text-charcoal/75">{note}</p>}

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
                <button type="button" onClick={saveScreenshot} disabled={busy} className="inline-flex items-center gap-1.5 font-medium text-maroon hover:underline"><Download size={14} /> Save screenshot</button>
                <a href={buildWhatsAppLink(waMessage())} target="_blank" rel="noopener noreferrer" className="font-medium text-maroon hover:underline">Open WhatsApp (text only)</a>
              </div>

              <div className="mt-6 flex items-center justify-between gap-3 border-t border-maroon/10 pt-4">
                <button type="button" onClick={() => setStep(2)} className="inline-flex items-center gap-1 text-sm font-medium text-maroon hover:underline"><ArrowLeft size={14} /> Back</button>
                <button type="button" onClick={finish} className="text-sm font-semibold text-charcoal/60 hover:text-maroon">{buyMode ? "Done" : "Done · clear cart"}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
