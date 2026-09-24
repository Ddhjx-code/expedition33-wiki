export interface Crumb {
  label: string;
  href?: string;
}

export interface Category {
  label: string;
  href: string;
}

const BOSS_SLUGS = new Set([
  "goblu",
  "francois",
  "lampmaster",
  "ultimate-sakapatate",
  "eveque",
  "dualliste",
  "stalact",
  "visages",
  "mask-keeper",
  "glissando",
  "sirene",
  "renoir",
  "the-paintress",
  "creation",
  "thunder-eveque",
  "frost-eveque",
  "flame-eveque",
  "matthieu-the-colossus",
  "julien-tiny-head",
  "giant-sapling",
  "grosse-tete",
  "serpenphare",
  "scavenger",
  "golgra",
  "glaise",
  "tisseur",
  "rocher",
  "sprong",
  "blanche",
  "chromatic-ballet",
  "chromatic-gold-chevaliere",
]);

const AREA_SLUGS = new Set([
  "locations",
  "interactive-map",
  "abbest-cave",
  "chosen-path",
  "bosses-by-area",
  "camp-guide",
]);

const CHARACTER_SLUGS = new Set([
  "characters",
  "best-builds",
  "build-lune",
  "build-maelle",
  "build-verso",
  "character-stats",
  "tier-list",
  "eloise",
  "jules",
  "lucie",
  "haircuts",
  "outfits",
]);

const GEAR_SLUGS = new Set([
  "best-weapons",
  "weapons-locations",
  "weapons-tier-list",
  "best-pictos",
  "boss-drops",
]);

const COMBAT_SLUGS = new Set([
  "damage-mechanics",
  "how-to-parry",
  "enemy-weaknesses",
  "enemies",
]);

const WALKTHROUGH_SLUGS = new Set([
  "walkthrough",
  "walkthrough-act-1",
  "guide",
  "beginner-guide",
  "boss-guide",
  "boss-order",
  "side-quests",
  "endings-explained",
  "world-lore",
  "trophy-guide",
]);

interface SectionDef {
  label: string;
  href: string;
  slugs: Set<string>;
  category: string;
}

const SECTIONS: SectionDef[] = [
  { label: "Bosses", href: "/boss-guide", slugs: BOSS_SLUGS, category: "Bosses" },
  { label: "Locations", href: "/locations", slugs: AREA_SLUGS, category: "Locations" },
  { label: "Characters", href: "/characters", slugs: CHARACTER_SLUGS, category: "Characters" },
  { label: "Gear & Items", href: "/best-weapons", slugs: GEAR_SLUGS, category: "Gear & Items" },
  { label: "Combat", href: "/damage-mechanics", slugs: COMBAT_SLUGS, category: "Combat" },
  { label: "Walkthrough", href: "/walkthrough", slugs: WALKTHROUGH_SLUGS, category: "Walkthrough" },
];

const LEGAL_SLUGS = new Set(["about", "contact", "privacy-policy"]);

function sectionFor(slug: string): SectionDef | undefined {
  const key = slug.toLowerCase();
  return SECTIONS.find((s) => s.slugs.has(key));
}

export function getBreadcrumbs(slug: string, title: string): Crumb[] {
  const short = title.split(/\s+[-—|]\s+/)[0].trim() || title;
  const section = sectionFor(slug);

  const trail: Crumb[] = [{ label: "Home", href: "/" }];
  if (section) trail.push({ label: section.label, href: section.href });
  trail.push({ label: short });
  return trail;
}

export function getCategories(slug: string, title: string): Category[] {
  if (LEGAL_SLUGS.has(slug)) return [];

  const short = title.split(/\s+[-—|]\s+/)[0].trim() || title;
  const cats: Category[] = [];
  const section = sectionFor(slug);

  if (section) cats.push({ label: section.category, href: section.href });

  if (BOSS_SLUGS.has(slug)) {
    cats.push({ label: "Act 1 bosses", href: "/boss-guide" });
    if (/^(chromatic|frost|flame|thunder)/.test(slug)) {
      cats.push({ label: "Chromatic variants", href: "/bosses-by-area" });
    }
  }

  cats.push({ label: short, href: `/${slug}` });
  return cats.filter((c, i, a) => a.findIndex((x) => x.href === c.href) === i);
}

const SECTION_LINKS: Record<string, { label: string; href: string }[]> = {
  Bosses: [
    { label: "Boss Guide", href: "/boss-guide" },
    { label: "Boss Order", href: "/boss-order" },
    { label: "Bosses by Area", href: "/bosses-by-area" },
    { label: "Boss Drops", href: "/boss-drops" },
  ],
  "Enemies & Nevrons": [
    { label: "All Enemies", href: "/Enemies" },
    { label: "Enemy Weaknesses", href: "/enemy-weaknesses" },
    { label: "Bosses by Area", href: "/bosses-by-area" },
  ],
  Weapons: [
    { label: "Best Weapons", href: "/best-weapons" },
    { label: "Weapons Tier List", href: "/weapons-tier-list" },
    { label: "Weapon Locations", href: "/weapons-locations" },
  ],
  Pictos: [
    { label: "Best Pictos", href: "/best-pictos" },
    { label: "Damage Mechanics", href: "/damage-mechanics" },
    { label: "Best Builds", href: "/best-builds" },
  ],
  "Areas & Locations": [
    { label: "All Locations", href: "/locations" },
    { label: "Interactive Map", href: "/interactive-map" },
    { label: "Bosses by Area", href: "/bosses-by-area" },
  ],
  "Gear & Items": [
    { label: "Best Weapons", href: "/best-weapons" },
    { label: "Best Pictos", href: "/best-pictos" },
    { label: "Boss Drops", href: "/boss-drops" },
  ],
  Characters: [
    { label: "All Characters", href: "/characters" },
    { label: "Best Builds", href: "/best-builds" },
    { label: "Tier List", href: "/tier-list" },
  ],
  Combat: [
    { label: "Damage Mechanics", href: "/damage-mechanics" },
    { label: "How to Parry", href: "/how-to-parry" },
    { label: "Enemy Weaknesses", href: "/enemy-weaknesses" },
  ],
  Walkthrough: [
    { label: "Full Walkthrough", href: "/walkthrough" },
    { label: "Act 1", href: "/walkthrough-act-1" },
    { label: "Side Quests", href: "/side-quests" },
    { label: "Trophy Guide", href: "/trophy-guide" },
  ],
};

export function getSectionLinks(slug: string): { label: string; href: string }[] {
  const key = slug.toLowerCase();
  for (const [, links] of Object.entries(SECTION_LINKS)) {
    if (links.some((l) => l.href.slice(1).toLowerCase() === key)) return [];
  }
  const section = sectionFor(slug);
  if (!section) return [];
  return SECTION_LINKS[section.label] ?? [];
}
