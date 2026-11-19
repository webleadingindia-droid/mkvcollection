import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FFF8F0",
        ivory: "#FFFDF9",
        maroon: { DEFAULT: "#7A1F2B", dark: "#4A0F18" },
        marigold: "#F5A623",
        peach: "#FFE8CC",
        charcoal: "#2B2024",
        whatsapp: "#25D366",
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(74,15,24,.04), 0 8px 24px rgba(74,15,24,.07)",
        lift: "0 2px 4px rgba(74,15,24,.06), 0 18px 40px rgba(74,15,24,.14)",
      },
      maxWidth: { container: "1280px" },
    },
  },
  plugins: [],
};
export default config;
