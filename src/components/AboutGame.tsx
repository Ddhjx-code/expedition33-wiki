import homeData from "@/data/home.json";

export default function AboutGame() {
  const { aboutGame } = homeData;

  return (
    <section className="py-16 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Text content */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              About the Game
            </h2>
            <div className="mt-4 space-y-4">
              {aboutGame.paragraphs.map((p, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Stats sidebar */}
          <div className="flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-4">
              {aboutGame.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-border bg-card p-4 text-center"
                >
                  <p className="text-2xl font-bold text-accent">{stat.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
