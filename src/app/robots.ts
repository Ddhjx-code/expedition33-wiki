import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    // Both files stay declared: the full one is what Bing crawls the whole site
    // from, and Bing is where the search traffic actually comes from. The
    // priority file exists so Google can report indexed-vs-submitted for the
    // pages that matter as its own number instead of 2-of-461.
    sitemap: [
      "https://expedition33.wiki/sitemap.xml",
      "https://expedition33.wiki/sitemap-priority.xml",
    ],
  };
}
