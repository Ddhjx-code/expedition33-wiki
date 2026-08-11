import Link from "next/link";
import homeData from "@/data/home.json";

const typeIcons: Record<string, string> = {
  guide: "📖",
  builds: "⚔️",
  boss: "💀",
  system: "✨",
};

export default function StartCards() {
  const { cards } = homeData.start;

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
          Where to Start
        </h2>
        <p className="mt-2 text-muted-foreground">
          Pick a guide to jump right in.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group relative rounded-xl border border-border bg-card p-6 transition-all hover:border-accent hover:shadow-md"
            >
              <span className="text-2xl" role="img" aria-hidden="true">
                {typeIcons[card.type] || "📄"}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-card-foreground group-hover:text-accent transition-colors">
                {card.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{card.desc}</p>
              <span className="mt-4 inline-flex items-center text-sm font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
                Read more &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
