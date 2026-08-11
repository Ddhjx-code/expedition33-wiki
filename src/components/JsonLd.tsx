interface JsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const BASE_URL = "https://expedition33.wiki";

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Expedition 33 Wiki",
    url: BASE_URL,
    description:
      "Complete Clair Obscur: Expedition 33 guide. Best builds for Maelle, Verso & Lune, boss strategies, weapon locations, Pictos tier list and full walkthrough.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function getArticleSchema({
  title,
  description,
  slug,
  lastUpdated,
}: {
  title: string;
  description: string;
  slug: string;
  lastUpdated?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${BASE_URL}/${slug}`,
    dateModified: lastUpdated || new Date().toISOString(),
    publisher: {
      "@type": "Organization",
      name: "Expedition 33 Wiki",
      url: BASE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/${slug}`,
    },
  };
}

export function getBreadcrumbSchema({
  title,
  slug,
}: {
  title: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: title,
        item: `${BASE_URL}/${slug}`,
      },
    ],
  };
}
