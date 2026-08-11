import fs from "fs";
import path from "path";

export interface PageSection {
  id: string;
  title: string;
  content: string;
}

export interface PageContent {
  slug: string;
  title: string;
  description: string;
  keyword: string;
  lastUpdated: string;
  sections: PageSection[];
}

const PAGES_DIR = path.join(process.cwd(), "src/data/pages");

/**
 * All slugs that should generate static pages.
 * Includes both slugs with JSON data files and placeholder slugs
 * that will show a "coming soon" page.
 */
const ALL_SLUGS = [
  "guide",
  "beginner-guide",
  "best-builds",
  "build-maelle",
  "build-verso",
  "build-lune",
  "boss-guide",
  "best-pictos",
  "best-weapons",
  "tier-list",
  "endings-explained",
  "how-to-parry",
  "boss-order",
  "weapons-locations",
  "trophy-guide",
  "side-quests",
  "walkthrough",
  "walkthrough-act-1",
  "weapons-tier-list",
  "interactive-map",
];

/**
 * Returns all slugs that should be statically generated.
 */
export function getAllSlugs(): string[] {
  return ALL_SLUGS;
}

/**
 * Load page content from a JSON file in src/data/pages/.
 * Returns null if the file doesn't exist.
 */
export function getPageContent(slug: string): PageContent | null {
  const filePath = path.join(PAGES_DIR, `${slug}.json`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw) as Omit<PageContent, "slug">;
    return { slug, ...data };
  } catch {
    return null;
  }
}
