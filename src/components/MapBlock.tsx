import Link from "next/link";

const MAP_GENIE = "https://mapgenie.io/clair-obscur-expedition-33/maps/the-continent";
const GAMER_GUIDES = "https://www.gamerguides.com/clair-obscur-expedition-33/maps/the-continent";

interface MapBlockProps {
  area?: string;
  flag?: string;
  directions?: string;
  onMap?: boolean;
}

export default function MapBlock({ area, flag, directions, onMap = true }: MapBlockProps) {
  if (!area && !flag) return null;

  return (
    <section
      aria-label="Map location"
      className="mb-8 overflow-hidden rounded-lg border border-border bg-card"
    >
      <div className="flex items-center justify-between border-b border-border bg-muted/40 px-5 py-2.5">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Finding it on the map
        </h2>
        <Link
          href="/interactive-map"
          className="text-xs text-muted-foreground transition-colors hover:text-accent"
        >
          Map guide &rarr;
        </Link>
      </div>

      <dl className="divide-y divide-border">
        {area && (
          <div className="grid grid-cols-[104px_1fr] gap-x-4 px-5 py-2.5 sm:grid-cols-[140px_1fr]">
            <dt className="text-sm font-medium text-muted-foreground">Area</dt>
            <dd className="text-sm text-foreground">{area}</dd>
          </div>
        )}
        {flag && (
          <div className="grid grid-cols-[104px_1fr] gap-x-4 px-5 py-2.5 sm:grid-cols-[140px_1fr]">
            <dt className="text-sm font-medium text-muted-foreground">Nearest flag</dt>
            <dd className="text-sm text-foreground">{flag}</dd>
          </div>
        )}
        {directions && (
          <div className="grid grid-cols-[104px_1fr] gap-x-4 px-5 py-2.5 sm:grid-cols-[140px_1fr]">
            <dt className="text-sm font-medium text-muted-foreground">Once there</dt>
            <dd className="text-sm leading-relaxed text-foreground">{directions}</dd>
          </div>
        )}
      </dl>

      <div className="border-t border-border px-5 py-3">
        <p className="mb-2 text-xs leading-relaxed text-muted-foreground">
          Expedition 33 has no in-game coordinates and no minimap, so position is
          described by the named Expedition Flags you fast-travel to. Open a
          community map to see the marker:
        </p>
        <div className="flex flex-wrap gap-2">
          {onMap && (
            <a
              href={MAP_GENIE}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-accent hover:text-accent"
            >
              MapGenie (The Continent)
            </a>
          )}
          {onMap && (
            <a
              href={GAMER_GUIDES}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Gamer Guides map
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
