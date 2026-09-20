import Link from 'next/link';

const DESTINATIONS = [
  { href: '/guide', label: 'Beginner Guide', desc: 'Combat, progression and the 66-day system' },
  { href: '/walkthrough', label: 'Walkthrough', desc: 'Act-by-act progression' },
  { href: '/boss-guide', label: 'Boss Guide', desc: 'All known bosses and strategies' },
  { href: '/characters', label: 'Characters', desc: 'Party members and builds' },
  { href: '/best-weapons', label: 'Best Weapons', desc: 'Weapon picks and where to find them' },
  { href: '/locations', label: 'Locations', desc: 'Every major area' },
];

export default function NotFound() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <p className="text-sm font-semibold text-accent mb-3">Error 404</p>
        <h1 className="text-3xl font-bold text-foreground mb-3">Page Not Found</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          This page does not exist. If you followed an old link, the site was reorganised and the
          content has probably moved — the guides below cover the same ground.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {DESTINATIONS.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-lg border border-border bg-card p-5 transition-colors hover:border-accent"
          >
            <div className="font-semibold text-foreground mb-1">{item.label}</div>
            <div className="text-sm text-muted-foreground">{item.desc}</div>
          </Link>
        ))}
      </div>

      <p className="text-center text-muted-foreground mt-10">
        Or start from the{' '}
        <Link href="/" className="text-accent underline">
          Expedition 33 Wiki home page
        </Link>
        .
      </p>
    </div>
  );
}
