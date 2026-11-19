import type { Metadata } from "next";
import LegalPage from "@/components/ui/LegalPage";
import { BRAND_NAME, EMAIL } from "@/config/site";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Page() {
  return (
    <LegalPage title="Privacy Policy" updated="November 2026">
      {/* TODO(owner): have this reviewed before launch, especially if you add analytics, ads or payments. */}
      <p>{BRAND_NAME} respects your privacy. This policy explains what information we handle when you use this website.</p>
      <h2>Information we collect</h2>
      <ul>
        <li>This website has no online checkout and does not collect payments.</li>
        <li>When you tap a WhatsApp button, the details you choose to send (name, address, order) go to us through WhatsApp, which has its own privacy policy.</li>
        <li>Your cart and wishlist are stored only in your own browser (local storage) and are never sent to our servers.</li>
      </ul>
      <h2>How we use information</h2>
      <p>We use the details you send us only to respond to enquiries, process and deliver orders, and provide support.</p>
      <h2>Sharing</h2>
      <p>We share delivery details with courier partners only as needed to deliver your order. We do not sell your information.</p>
      <h2>Contact</h2>
      <p>For privacy questions, email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
    </LegalPage>
  );
}
