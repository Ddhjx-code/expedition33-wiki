import { Metadata } from "next";
import Image from "next/image";
import { getAllSlugs, getPageContent } from "@/lib/content";
import Sidebar from "@/components/Sidebar";
import JsonLd, {
  getArticleSchema,
  getBreadcrumbSchema,
} from "@/components/JsonLd";

function getBannerImage(slug: string): { src: string; alt: string } {
  if (slug === "guide" || slug === "beginner-guide") {
    return { src: "/images/screenshot-combat.jpg", alt: "Expedition 33 combat gameplay" };
  }
  if (slug === "boss-guide") {
    return { src: "/images/screenshot-boss.jpg", alt: "Expedition 33 boss encounter" };
  }
  if (slug === "best-pictos") {
    return { src: "/images/screenshot-pictos.jpg", alt: "Expedition 33 Pictos and skills" };
  }
  return { src: "/images/header.jpg", alt: "Expedition 33" };
}

const BASE_URL = "https://expedition33.wiki";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const content = getPageContent(params.slug);

  if (!content) {
    // Slug exists but no JSON yet — use a generic title
    const title = params.slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    const description = `${title} - Expedition 33 Wiki guide page.`;
    return {
      title,
      description,
      alternates: {
        canonical: `${BASE_URL}/${params.slug}`,
      },
      openGraph: {
        title,
        description,
        url: `${BASE_URL}/${params.slug}`,
        siteName: "Expedition 33 Wiki",
        type: "article",
      },
    };
  }

  return {
    title: content.title,
    description: content.description,
    keywords: [content.keyword, "Expedition 33", "Clair Obscur"],
    alternates: {
      canonical: `${BASE_URL}/${params.slug}`,
    },
    openGraph: {
      title: content.title,
      description: content.description,
      url: `${BASE_URL}/${params.slug}`,
      siteName: "Expedition 33 Wiki",
      type: "article",
    },
  };
}

export default function SlugPage({ params }: PageProps) {
  const content = getPageContent(params.slug);

  // If no JSON data exists for this slug, show a placeholder page
  if (!content) {
    const title = params.slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    const description = `${title} - Expedition 33 Wiki guide page.`;

    const banner = getBannerImage(params.slug);

    return (
      <>
        <JsonLd
          data={getArticleSchema({
            title,
            description,
            slug: params.slug,
          })}
        />
        <JsonLd data={getBreadcrumbSchema({ title, slug: params.slug })} />
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            <Sidebar sections={[]} />
            <article className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold text-foreground mb-4">
                {title}
              </h1>
              {/* Banner image */}
              <div className="mb-6 overflow-hidden rounded-lg border border-border">
                <Image
                  src={banner.src}
                  alt={banner.alt}
                  width={460}
                  height={215}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <p className="text-muted-foreground">
                  This guide is coming soon. Check back for comprehensive
                  coverage of {title.toLowerCase()} in Expedition 33.
                </p>
              </div>
            </article>
          </div>
        </div>
      </>
    );
  }

  const banner = getBannerImage(params.slug);

  return (
    <>
      <JsonLd
        data={getArticleSchema({
          title: content.title,
          description: content.description,
          slug: params.slug,
          lastUpdated: content.lastUpdated,
        })}
      />
      <JsonLd
        data={getBreadcrumbSchema({ title: content.title, slug: params.slug })}
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          <Sidebar sections={content.sections} />

          <article className="flex-1 min-w-0">
            {/* Page header */}
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {content.title}
              </h1>
              <p className="text-sm text-muted-foreground">
                Last updated: {content.lastUpdated}
              </p>
            </header>

            {/* Banner image */}
            <div className="mb-8 overflow-hidden rounded-lg border border-border">
              <Image
                src={banner.src}
                alt={banner.alt}
                width={460}
                height={215}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Sections */}
            <div className="space-y-8">
              {content.sections.map((section) => (
                <section key={section.id} id={section.id}>
                  <h2 className="text-xl font-semibold text-foreground mb-3 scroll-mt-20">
                    {section.title}
                  </h2>
                  <div
                    className="prose prose-sm prose-invert max-w-none text-muted-foreground leading-relaxed [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-border [&_th]:bg-card [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:text-foreground [&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_h3]:text-foreground [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 [&_strong]:text-foreground [&_a]:text-accent [&_a]:underline [&_p]:mb-3"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </section>
              ))}
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
