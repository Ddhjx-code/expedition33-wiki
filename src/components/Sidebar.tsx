import Link from "next/link";
import { PageSection } from "@/lib/content";

const QUICK_LINKS = [
  { label: "Best Builds", href: "/best-builds" },
  { label: "Boss Guide", href: "/boss-guide" },
  { label: "Tier List", href: "/tier-list" },
];

interface SidebarProps {
  sections: PageSection[];
}

export default function Sidebar({ sections }: SidebarProps) {
  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-20 space-y-6">
        {/* Quick Links */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Quick Links
          </h3>
          <ul className="space-y-1.5">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Table of Contents */}
        {sections.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              On This Page
            </h3>
            <ul className="space-y-1.5 border-l-2 border-border pl-3">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </aside>
  );
}
