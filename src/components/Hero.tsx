import Image from "next/image";
import Link from "next/link";
import homeData from "@/data/home.json";

export default function Hero() {
  const { hero } = homeData;

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      {/* Background image with dark overlay */}
      <Image
        src="/images/hero-bg.jpg"
        alt="Expedition 33 background art"
        fill
        className="object-cover -z-20"
        priority
        quality={85}
      />
      <div className="absolute inset-0 -z-10 bg-black/60" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <p className="inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
          {hero.eyebrow}
        </p>

        {/* Title */}
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
          {hero.title}
        </h1>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          {hero.description}
        </p>

        {/* Stats row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {hero.stats.map((stat, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {stat}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {hero.cta.map((action, i) => (
            <Link
              key={action.href}
              href={action.href}
              className={
                i === 0
                  ? "rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent-hover"
                  : "rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-card-foreground transition-colors hover:border-accent"
              }
            >
              {action.text}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
