import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function FloatingWhatsApp() {
  return (
    <a href={buildWhatsAppLink("Hello MKV Collection 🙏")} target="_blank" rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lift transition hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold focus-visible:ring-offset-2">
      <MessageCircle size={28} />
      <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-full bg-charcoal px-3 py-1.5 text-xs font-medium opacity-0 transition group-hover:opacity-100">Chat with us</span>
    </a>
  );
}
