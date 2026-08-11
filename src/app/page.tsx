export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Expedition 33{" "}
          <span className="text-accent">Wiki</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Your comprehensive guide to Clair Obscur: Expedition 33.
          Walkthroughs, character builds, boss strategies, and collectibles.
        </p>
      </section>

      {/* Placeholder grid for future content sections */}
      <section className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {["Characters", "Bosses", "Walkthrough", "Builds", "Collectibles", "Tips & Tricks"].map(
          (category) => (
            <div
              key={category}
              className="rounded-lg border border-border bg-card p-6 transition-colors hover:border-accent"
            >
              <h2 className="text-xl font-semibold text-card-foreground">
                {category}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Coming soon...
              </p>
            </div>
          )
        )}
      </section>
    </div>
  );
}
