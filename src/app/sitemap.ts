import { MetadataRoute } from "next";
import { getAllSlugs, getPageContent } from "@/lib/content";

const BASE_URL = "https://expedition33.wiki";

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getAllSlugs();

  const contentPages: MetadataRoute.Sitemap = slugs.map((slug) => {
    const content = getPageContent(slug);
    return {
      url: `${BASE_URL}/${slug}`,
      lastModified: content?.lastUpdated
        ? new Date(content.lastUpdated)
        : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    };
  });

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...contentPages,
  ];
}
