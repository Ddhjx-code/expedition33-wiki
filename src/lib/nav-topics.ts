export interface NavPage {
  slug: string;
  title: string;
}

export interface NavTopic {
  label: string;
  pages: NavPage[];
}

export const BOSS_PAGES: NavPage[] = [
  { slug: "boss-guide", title: "Boss Guide" },
  { slug: "boss-order", title: "Boss Order" },
  { slug: "boss-drops", title: "Boss Drops Index" },
  { slug: "bosses-by-area", title: "Bosses by Area" },
  { slug: "thunder-eveque", title: "Thunder Eveque" },
  { slug: "frost-eveque", title: "Frost Eveque" },
  { slug: "flame-eveque", title: "Flame Eveque" },
  { slug: "matthieu-the-colossus", title: "Matthieu the Colossus" },
  { slug: "julien-tiny-head", title: "Julien Tiny Head" },
  { slug: "golgra", title: "Golgra" },
  { slug: "grosse-tete", title: "Grosse Tete" },
  { slug: "giant-sapling", title: "Giant Sapling" },
  { slug: "rocher", title: "Rocher" },
  { slug: "tisseur", title: "Tisseur" },
  { slug: "serpenphare", title: "Serpenphare" },
  { slug: "sprong", title: "Sprong" },
  { slug: "glaise", title: "Glaise" },
  { slug: "scavenger", title: "Scavenger" },
  { slug: "chromatic-ballet", title: "Chromatic Ballet" },
  { slug: "chromatic-gold-chevaliere", title: "Chromatic Gold Chevaliere" },
  { slug: "blanche", title: "Blanche" },
];

export const TOPICS: NavTopic[] = [
  { label: "All Bosses", pages: BOSS_PAGES },
  {
    label: "Areas & Locations",
    pages: [
      { slug: "locations", title: "All Locations" },
      { slug: "abbest-cave", title: "Abbest Cave" },
      { slug: "chosen-path", title: "Chosen Path" },
      { slug: "camp-guide", title: "Camp Guide" },
      { slug: "interactive-map", title: "Interactive Map" },
      { slug: "world-lore", title: "World & Story" },
    ],
  },
  {
    label: "Combat & Builds",
    pages: [
      { slug: "damage-mechanics", title: "Damage Mechanics" },
      { slug: "character-stats", title: "Character Stats" },
      { slug: "how-to-parry", title: "How to Parry" },
      { slug: "best-pictos", title: "Best Pictos" },
      { slug: "best-weapons", title: "Best Weapons" },
      { slug: "best-builds", title: "Best Builds" },
      { slug: "build-maelle", title: "Maelle Build" },
      { slug: "build-verso", title: "Verso Build" },
      { slug: "build-lune", title: "Lune Build" },
      { slug: "weapons-tier-list", title: "Weapons Tier List" },
      { slug: "tier-list", title: "Tier List" },
    ],
  },
  {
    label: "Reference & Collectibles",
    pages: [
      { slug: "enemy-weaknesses", title: "Enemy Weaknesses" },
      { slug: "weapons-locations", title: "Weapons Locations" },
      { slug: "side-quests", title: "Side Quests" },
      { slug: "trophy-guide", title: "Trophy Guide" },
      { slug: "endings-explained", title: "Endings Explained" },
      { slug: "characters", title: "Characters" },
    ],
  },
  {
    label: "Walkthrough",
    pages: [
      { slug: "guide", title: "Beginner Guide" },
      { slug: "walkthrough", title: "Full Walkthrough" },
      { slug: "walkthrough-act-1", title: "Act 1 Walkthrough" },
    ],
  },
];

export function getTopicForSlug(slug: string): NavTopic | undefined {
  return TOPICS.find((t) => t.pages.some((p) => p.slug === slug));
}

export function isBossSlug(slug: string): boolean {
  return BOSS_PAGES.some((p) => p.slug === slug);
}
