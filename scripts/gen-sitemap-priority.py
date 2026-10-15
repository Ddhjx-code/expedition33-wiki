"""Write public/sitemap-priority.xml from src/data/sitemap-priority.json.

/sitemap.xml stays complete on purpose: Bing crawls the whole site from it and it
is where essentially all search traffic comes from. This second file exists so
Google Search Console can report indexed-vs-submitted for the pages that matter
as its own number, instead of 2-of-461.

Every slug is checked against src/data/pages and against the vercel.json redirect
sources. A slug that is not a real page aborts the run, because a priority
sitemap containing 404s is worse than no priority sitemap.

    python3 scripts/gen-sitemap-priority.py
"""

from __future__ import annotations

import json
import os
import sys
import xml.sax.saxutils as su

BASE = "https://expedition33.wiki"
PAGES = os.path.join("src", "data", "pages")
LIST = os.path.join("src", "data", "sitemap-priority.json")
OUT = os.path.join("public", "sitemap-priority.xml")


def main() -> int:
    slugs = json.load(open(LIST, encoding="utf-8"))["slugs"]
    pages = {f[:-5] for f in os.listdir(PAGES) if f.endswith(".json")}
    redirects = {
        r["source"].strip("/")
        for r in json.load(open("vercel.json", encoding="utf-8")).get("redirects", [])
        if ":path*" not in r["source"]
    }

    unknown = [s for s in slugs if s and s not in pages]
    shadowed = [s for s in slugs if s and s in redirects]
    if unknown or shadowed:
        for s in unknown:
            print(f"  不是页面: /{s}", file=sys.stderr)
        for s in shadowed:
            print(f"  是重定向源而非页面: /{s}", file=sys.stderr)
        print(f"abort: {len(unknown)} unknown, {len(shadowed)} redirect sources", file=sys.stderr)
        return 1

    rows = []
    for slug in slugs:
        url = BASE if slug == "" else f"{BASE}/{slug}"
        if slug == "":
            updated, freq, prio = None, "daily", "1.0"
        else:
            page = json.load(open(os.path.join(PAGES, f"{slug}.json"), encoding="utf-8"))
            updated = page.get("lastUpdated")
            freq, prio = "weekly", "0.8"
        parts = [f"  <url>\n    <loc>{su.escape(url)}</loc>"]
        if updated:
            parts.append(f"    <lastmod>{su.escape(updated)}</lastmod>")
        parts.append(f"    <changefreq>{freq}</changefreq>")
        parts.append(f"    <priority>{prio}</priority>")
        parts.append("  </url>")
        rows.append("\n".join(parts))

    xml = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + "\n".join(rows)
        + "\n</urlset>\n"
    )
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        f.write(xml)

    dated = sum(1 for r in rows if "<lastmod>" in r)
    print(f"wrote {OUT}: {len(slugs)} URLs, {dated} with a real lastmod")
    return 0


if __name__ == "__main__":
    sys.exit(main())
