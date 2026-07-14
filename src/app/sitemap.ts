import type { MetadataRoute } from "next";
import { sitemapSlugs } from "@/content/site";
import { business } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = business.domain;
  return [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    ...sitemapSlugs.map((slug) => ({
      url: `${baseUrl}/${slug}`,
      changeFrequency: "monthly" as const,
      priority: slug.startsWith("websites-voor-") ? 0.9 : 0.7,
    })),
  ];
}
