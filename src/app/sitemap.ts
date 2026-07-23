import type { MetadataRoute } from "next";
import { sitemapSlugs } from "@/content/site";
import { business } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = business.domain;
  const lastModified = new Date("2026-07-23");
  return [
    { url: baseUrl, lastModified, changeFrequency: "weekly", priority: 1 },
    ...sitemapSlugs.map((slug) => ({
      url: `${baseUrl}/${slug}`,
      lastModified,
      changeFrequency: (["privacyverklaring", "cookieverklaring", "algemene-voorwaarden"].includes(slug) ? "yearly" : "monthly") as "yearly" | "monthly",
      priority: slug.startsWith("websites-voor-")
        ? 0.9
        : ["diensten", "pakketten", "website-onderhoud", "chatbot-voor-je-website", "contact"].includes(slug)
          ? 0.8
          : ["privacyverklaring", "cookieverklaring", "algemene-voorwaarden"].includes(slug)
            ? 0.3
            : 0.7,
    })),
  ];
}
