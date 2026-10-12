import json
import os
import sys

"""Regenerate tier-1/tier-2 index pages from src/data/entities/*.json.

Ported from the pbzero wiki. Index pages are rebuilt from the entity data on
every run, so a roster can never drift out of date the way a hand-typed list
does - the huiji breakdown calls this out as a hard rule.

Usage: python3 scripts/gen-index-pages.py
"""

ENTITIES = "src/data/entities"
PAGES = "src/data/pages"
UPDATED = "2026-10-12"


def load(name):
    path = os.path.join(ENTITIES, f"{name}.json")
    if not os.path.exists(path):
        return []
    return json.load(open(path, encoding="utf-8"))


def table(headers, rows):
    if not rows:
        return (
            "<p>No entries have been confirmed yet. This table is generated from "
            "<code>src/data/entities/</code>, so it fills itself as each entity is "
            "verified.</p>"
        )
    return (
        "<table><thead><tr>"
        + "".join(f"<th>{h}</th>" for h in headers)
        + "</tr></thead><tbody>"
        + "".join("<tr>" + "".join(f"<td>{c}</td>" for c in r) + "</tr>" for r in rows)
        + "</tbody></table>"
    )


def write_page(page):
    path = os.path.join(PAGES, page["slug"] + ".json")
    existing = {}
    if os.path.exists(path):
        existing = json.load(open(path, encoding="utf-8"))
    generated_ids = {s["id"] for s in page["sections"]}
    kept = [s for s in existing.get("sections", []) if s["id"] not in generated_ids]
    order = {sid: i for i, sid in enumerate(page["section_order"])}
    merged = page["sections"] + kept
    merged.sort(key=lambda x: order.get(x["id"], len(order)))
    page["sections"] = merged
    json.dump(page, open(path, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    return page["slug"]


def build_weapons():
    weapons = load("weapons")
    by_owner = {}
    for w in weapons:
        by_owner.setdefault(w.get("owner", "Unassigned"), []).append(w)

    wielders = {c.strip() for owner in by_owner for c in owner.split("/")}

    rows = [
        [
            f'<a href="/{w["slug"]}">{w["name"]}</a>',
            w.get("element", "-"),
            w.get("scaling", "-"),
            w.get("location", "-"),
        ]
        for w in sorted(weapons, key=lambda x: x["name"])
    ]

    owner_rows = [
        [
            f'<a href="/characters">{owner}</a>',
            str(len(ws)),
            ", ".join(sorted(x["name"] for x in ws)[:6]) + ("\u2026" if len(ws) > 6 else ""),
        ]
        for owner, ws in sorted(by_owner.items(), key=lambda kv: -len(kv[1]))
    ]

    elements = {}
    for w in weapons:
        elements[w.get("element", "Unknown")] = elements.get(w.get("element", "Unknown"), 0) + 1

    return {
        "slug": "weapons",
        "title": "All Weapons in Clair Obscur: Expedition 33 - Complete List",
        "description": (
            f"Every weapon in Clair Obscur: Expedition 33 - all {len(weapons)} of them with their "
            "element, scaling stat and how to obtain them, grouped by who wields them."
        ),
        "keyword": "expedition 33 weapons, clair obscur expedition 33 all weapons, weapon list",
        "lastUpdated": UPDATED,
        "facts": [
            {"label": "Total weapons", "value": str(len(weapons))},
            {"label": "Weapon sets", "value": str(len(by_owner))},
            {"label": "Characters covered", "value": str(len(wielders))},
            {
                "label": "Elements",
                "value": " \u00b7 ".join(f"{k} ({v})" for k, v in sorted(elements.items())),
            },
        ],
        "section_order": ["overview", "by-character", "list", "advice", "status"],
        "sections": [
            {
                "id": "overview",
                "title": "How Weapons Work",
                "content": (
                    "<p>Each Expedition 33 character has their own weapon set. There are "
                    f"<strong>{len(weapons)}</strong> weapons in total, spread over "
                    f"{len(by_owner)} sets - Gustave and Verso share theirs. Every weapon has an "
                    "elemental damage type and scales off one primary stat, so the choice is about "
                    "which element you want on the character and which of their stats you are "
                    "feeding.</p>"
                    "<p>Elements matter most against <a href=\"/Enemies\">Nevrons</a> and "
                    "<a href=\"/boss-guide\">bosses</a>, which resist or absorb specific types - "
                    "see <a href=\"/enemy-weaknesses\">enemy weaknesses</a> before spending "
                    "upgrade resources on a weapon you will not keep.</p>"
                ),
            },
            {
                "id": "by-character",
                "title": "Weapons by Wielder",
                "content": table(["Wielder", "Weapons", "Examples"], owner_rows),
            },
            {
                "id": "list",
                "title": f"Complete Weapon List ({len(weapons)})",
                "content": table(["Weapon", "Element", "Scaling", "How to obtain"], rows),
            },
            {
                "id": "advice",
                "title": "Which to Upgrade",
                "content": (
                    "<p>Upgrading a weapon is permanent per character, so the usual advice is to "
                    "pick one weapon per character early and stay with it rather than spreading "
                    "resources. For current picks see <a href=\"/best-weapons\">best weapons</a> "
                    "and <a href=\"/weapons-tier-list\">the weapons tier list</a>; every location "
                    "is collected on <a href=\"/weapons-locations\">weapon locations</a>.</p>"
                ),
            },
            {
                "id": "status",
                "title": "Source Status",
                "content": (
                    "<p>This is the tier-1 weapon hub. The tables above are generated from "
                    "<code>src/data/entities/weapons.json</code> by "
                    "<code>scripts/gen-index-pages.py</code>, so they are regenerated rather than "
                    "hand-edited.</p>"
                ),
            },
        ],
    }


def main():
    if not os.path.isdir(PAGES):
        print("run from the repo root")
        sys.exit(1)
    built = [write_page(build_weapons())]
    print(f"regenerated {len(built)} index pages: {', '.join(built)}")
    print(f"  weapons rows: {len(load('weapons'))}")


if __name__ == "__main__":
    main()
