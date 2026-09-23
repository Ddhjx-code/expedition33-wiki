import Link from "next/link";

interface RelatedPage {
  slug: string;
  title: string;
  description: string;
}

const ALL_PAGES: RelatedPage[] = [
  { slug: "guide", title: "Beginner Guide", description: "Core mechanics & tips" },
  { slug: "best-builds", title: "Best Builds", description: "Top builds for all characters" },
  { slug: "damage-mechanics", title: "Damage Mechanics", description: "How Pictos & Lumina actually stack" },
  { slug: "boss-guide", title: "Boss Guide", description: "Strategies for every boss" },
  { slug: "best-weapons", title: "Best Weapons", description: "Top weapon picks & locations" },
  { slug: "best-pictos", title: "Best Pictos", description: "Most powerful Pictos ranked" },
  { slug: "walkthrough", title: "Walkthrough", description: "Full story walkthrough" },
  { slug: "how-to-parry", title: "How to Parry", description: "Master the parry system" },
  { slug: "tier-list", title: "Tier List", description: "Character rankings" },
  { slug: "endings-explained", title: "Endings Explained", description: "All endings & how to get them" },
  { slug: "locations", title: "All Locations", description: "Map & area guide" },
  { slug: "abbest-cave", title: "Abbest Cave", description: "DANGER dungeon walkthrough" },
  { slug: "chosen-path", title: "Chosen Path", description: "Branching routes & endings" },
  { slug: "camp-guide", title: "Camp Guide", description: "Upgrades, relationships & Lumina" },
  { slug: "weapons-tier-list", title: "Weapons Tier List", description: "All weapons ranked" },
  { slug: "side-quests", title: "Side Quests", description: "Optional quests & rewards" },
  { slug: "trophy-guide", title: "Trophy Guide", description: "All achievements" },
  { slug: "thunder-eveque", title: "Thunder Eveque", description: "Location, weakness & rewards" },
  { slug: "matthieu-the-colossus", title: "Matthieu the Colossus", description: "Gestral Arena boss fight" },
  { slug: "grosse-tete", title: "Grosse Tete", description: "Both locations & parry timing" },
  { slug: "giant-sapling", title: "Giant Sapling", description: "Crushing Cavern timed fight" },
  { slug: "rocher", title: "Rocher", description: "Stone Wave Cliffs boss" },
  { slug: "tisseur", title: "Tisseur", description: "Sirene boss & how to start it" },
  { slug: "serpenphare", title: "Serpenphare", description: "Shield & AP-drain strategy" },
  { slug: "sprong", title: "Sprong", description: "Why to beat it first" },
  { slug: "julien-tiny-head", title: "Julien Tiny Head", description: "Hidden Gestral Arena" },
  { slug: "glaise", title: "Glaise", description: "Yellow Harvest boss & rewards" },
  { slug: "scavenger", title: "Scavenger", description: "Falling Leaves quest boss" },
  { slug: "golgra", title: "Golgra", description: "All three encounter locations" },
  { slug: "flame-eveque", title: "Flame Eveque", description: "Flying Manor triple fight" },
  { slug: "frost-eveque", title: "Frost Eveque", description: "Lightning weakness & phase 2" },
  { slug: "chromatic-ballet", title: "Chromatic Ballet", description: "Three-in-one flying boss" },
  { slug: "chromatic-gold-chevaliere", title: "Chromatic Gold Chevaliere", description: "Crimson Forest boss" },
  { slug: "blanche", title: "Blanche", description: "Reward or fight at The Fountain" },
  { slug: "enemy-weaknesses", title: "Enemy Weaknesses", description: "Full element chart" },
];

function rotateFrom(slug: string): RelatedPage[] {
  const start = ALL_PAGES.findIndex((p) => p.slug === slug) + 1;
  return [...ALL_PAGES.slice(start), ...ALL_PAGES.slice(0, start)];
}

export default function RelatedPages({ currentSlug }: { currentSlug: string }) {
  const related = rotateFrom(currentSlug)
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 4);

  return (
    <nav className="mt-12 border-t border-border pt-8" aria-label="Related guides">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Related Guides
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {related.map((page) => (
          <Link
            key={page.slug}
            href={`/${page.slug}`}
            className="group rounded-lg border border-border bg-card p-4 transition-all hover:border-accent hover:shadow-sm"
          >
            <h3 className="font-medium text-card-foreground group-hover:text-accent transition-colors">
              {page.title}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {page.description}
            </p>
          </Link>
        ))}
      </div>
    </nav>
  );
}
