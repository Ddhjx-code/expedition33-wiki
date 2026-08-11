import { Metadata } from "next";
import { getAllSlugs, getPageContent } from "@/lib/content";
import Sidebar from "@/components/Sidebar";

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
    return {
      title,
      description: `${title} - Expedition 33 Wiki guide page.`,
    };
  }

  return {
    title: content.title,
    description: content.description,
    keywords: [content.keyword, "Expedition 33", "Clair Obscur"],
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

    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          <Sidebar sections={[]} />
          <article className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              {title}
            </h1>
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="text-muted-foreground">
                This guide is coming soon. Check back for comprehensive coverage
                of {title.toLowerCase()} in Expedition 33.
              </p>
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
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

          {/* Sections */}
          <div className="space-y-8">
            {content.sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2 className="text-xl font-semibold text-foreground mb-3 scroll-mt-20">
                  {section.title}
                </h2>
                <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </section>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
