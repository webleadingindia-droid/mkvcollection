"use client";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

const messages = [
  "Handmade with love, in every tiny detail",
  "Bulk & gifting orders welcome",
  "Chat with us on WhatsApp for quick replies",
];

export default function AnnouncementBar() {
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % messages.length), 4000);
    return () => clearInterval(t);
  }, []);
  if (!open) return null;
  return (
    <div className="relative bg-maroon-dark px-10 py-2.5 text-center text-xs font-medium tracking-wide text-peach sm:text-sm">
      <p key={i} aria-live="polite">{messages[i]}</p>
      <button onClick={() => setOpen(false)} aria-label="Dismiss announcement"
        className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full hover:bg-white/10">
        <X size={16} />
      </button>
    </div>
  );
}
