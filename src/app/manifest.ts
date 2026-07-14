import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sitora",
    short_name: "Sitora",
    description: "Heldere maatwerkwebsites voor bedrijven en organisaties.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f3ed",
    theme_color: "#082044",
    icons: [
      { src: "/icons/sitora-icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/sitora-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
