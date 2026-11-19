import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import "./nav.css";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import { StoreProvider } from "@/lib/store";
import { BRAND_NAME, SITE_URL, TAGLINE } from "@/config/site";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-playfair", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${BRAND_NAME} | ${TAGLINE}`, template: `%s | ${BRAND_NAME}` },
  description: "Handmade miniature fridge magnets: Indian food, kitchen sets, Taj Mahal souvenirs, fruits, vegetables and gift packs.",
  openGraph: { type: "website", siteName: BRAND_NAME, locale: "en_IN", title: `${BRAND_NAME} | ${TAGLINE}`, description: "Handmade miniature fridge magnets, made for gifting." },
  twitter: { card: "summary_large_image" },
};

export const viewport = { themeColor: "#7A1F2B" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <StoreProvider>
        <AnnouncementBar />
        <Header />
        <main>{children}</main>
        <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
