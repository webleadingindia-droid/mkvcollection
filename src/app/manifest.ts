import type { MetadataRoute } from "next";
import { BRAND_NAME, TAGLINE } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BRAND_NAME, short_name: "MKV", description: TAGLINE, start_url: "/", display: "standalone",
    background_color: "#FFF8F0", theme_color: "#7A1F2B",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
