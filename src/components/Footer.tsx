import homeData from "@/data/home.json";

export default function Footer() {
  const { footer } = homeData;

  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* About */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Expedition 33 Wiki
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {footer.about}
            </p>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Community
            </h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <a
                  href={footer.links.steam}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Steam Store Page
                </a>
              </li>
              <li>
                <a
                  href={footer.links.reddit}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  r/expedition33
                </a>
              </li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Disclaimer
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              This is a fan-made wiki. Not affiliated with Sandfall Interactive.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Expedition 33 Wiki. Game content belongs to Sandfall Interactive.
        </div>
      </div>
    </footer>
  );
}
