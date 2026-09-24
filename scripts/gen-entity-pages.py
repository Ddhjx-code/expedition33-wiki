#!/usr/bin/env python3
"""Generate entity page JSON from a data file.

Usage: python3 scripts/gen-entity-pages.py src/data/entities/bosses-phase1.json

Keeps the data layer separate from the rendered page, so adding an entity is
one record rather than one hand-written page.
"""
import json
import os
import re
import sys

PAGES = "src/data/pages"
TODAY = "2026-09-24"


def sentences(text):
    return [s.strip() for s in re.split(r"(?<=[.!?])\s+", text.strip()) if s.strip()]


def facts_for(rec):
    facts = []
    if rec.get("locations"):
        facts.append({"label": "Location", "value": rec["locations"]})
    if rec.get("acts"):
        facts.append({"label": "Act", "value": rec["acts"]})
    facts.append({"label": "Weak to", "value": rec.get("weak") or "None (no elemental weakness)"})
    if rec.get("resists"):
        facts.append({"label": "Resists", "value": rec["resists"]})
    if rec.get("absorbs"):
        facts.append({"label": "Absorbs", "value": rec["absorbs"]})
    if rec.get("immune"):
        facts.append({"label": "Immune", "value": rec["immune"]})
    if rec.get("kind"):
        facts.append({"label": "Type", "value": rec["kind"]})
    if rec.get("base"):
        facts.append({"label": "Base enemy", "value": rec["base"].replace("-", " ").title()})
    return facts


def section_overview(rec):
    return f'<p>{rec["summary"]}</p>'


def section_find(rec):
    loc = rec.get("locations") or "not documented in verifiable sources"
    act = rec.get("acts")
    lead = f'<p><strong>Location:</strong> {loc}.</p>'
    if act:
        lead += f'<p>Availability: {act}.</p>'
    if rec.get("kind", "").startswith("Chromatic"):
        lead += (
            "<p>Chromatic enemies are optional, supercharged versions of an enemy you already "
            "fought. They are not required for the story, but they drop the better tier of "
            "materials and the weapons tied to their base enemy.</p>"
        )
    return lead


def section_weakness(rec):
    rows = [
        ("Weak to", rec.get("weak") or "None"),
        ("Resists", rec.get("resists") or "None"),
        ("Absorbs", rec.get("absorbs") or "None"),
        ("Immune", rec.get("immune") or "None"),
    ]
    body = "".join(f"<tr><td>{k}</td><td>{v}</td></tr>" for k, v in rows)
    table = (
        "<table><thead><tr><th>Property</th><th>Value</th></tr></thead>"
        f"<tbody>{body}</tbody></table>"
    )
    note = ""
    if rec.get("weak"):
        note = (
            f'<p>Bring {rec["weak"]} damage. '
            + (
                f'{rec["resists"]} is resisted, so those turns are wasted.'
                if rec.get("resists")
                else "Nothing else in its profile resists damage, so any other element is merely unremarkable rather than wasted."
            )
            + "</p>"
        )
    else:
        note = (
            "<p>There is no elemental weakness to exploit here. Build for raw output and "
            "survivability instead of matching an element.</p>"
        )
    return table + note


def section_rewards(rec):
    name = rec["name"]
    if rec.get("base"):
        base = rec["base"].replace("-", " ").title()
        items = [
            f"Higher-tier Chroma materials than the base {base}",
            f"Weapons and Pictos gated behind defeating the Chromatic {base}",
        ]
    else:
        items = ["Colour of Lumina", "Chroma Catalyst", "Pictos or weapon tied to the encounter"]
    lis = "".join(f"<li>{i}</li>" for i in items)
    caveat = (
        "<p>Exact drop quantities for this encounter are not documented in the sources we "
        "could verify, so they are not listed rather than estimated.</p>"
    )
    return f"<ul>{lis}</ul>{caveat}"


def section_strategy(rec):
    name = rec["name"]
    parts = []
    if rec.get("base"):
        base = rec["base"].replace("-", " ").title()
        parts.append(
            f"<h3>Same answer as the base enemy</h3><p>The Chromatic {base} keeps the weaknesses "
            f"and resistances of the ordinary {base}. If you have already fought the base version, "
            "your party does not need to change - what changes is the margin for error.</p>"
        )
    parts.append(
        "<h3>What actually kills you</h3><p>Chromatic variants hit harder and hold more health "
        "than the enemy they are based on. The failure mode is almost always running out of "
        "resources mid-fight rather than a mechanic you did not understand, so bring healing "
        "headroom rather than a greedier damage build.</p>"
    )
    if not rec.get("weak"):
        parts.append(
            "<h3>No elemental shortcut</h3><p>With no weakness to exploit, the fight is decided by "
            "your upgrade levels and your parry timing. Check that your weapons are current before "
            "attempting it.</p>"
        )
    return "".join(parts)


def build(rec):
    name = rec["name"]
    slug = rec["slug"]
    pretty = rec.get("kind", "Boss").lower()
    title = f"{name} - Location, Weakness & Rewards"
    description = (
        f"{name} in Clair Obscur: Expedition 33 - where to find it, its elemental weakness and "
        f"resistances, and how to beat it."
    )
    sections = [
        {"id": "overview", "title": "Overview", "content": section_overview(rec)},
        {"id": "how-to-find", "title": f"Where to Find the {name}", "content": section_find(rec)},
        {"id": "weakness", "title": "Weakness & Resistances", "content": section_weakness(rec)},
        {"id": "rewards", "title": "Rewards", "content": section_rewards(rec)},
        {"id": "strategy", "title": f"How to Beat the {name}", "content": section_strategy(rec)},
    ]
    return {
        "slug": slug,
        "title": title,
        "description": description,
        "keyword": f"{name} Expedition 33",
        "lastUpdated": TODAY,
        "facts": facts_for(rec),
        "sections": sections,
    }


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    records = json.load(open(sys.argv[1]))
    written = 0
    for rec in records:
        path = os.path.join(PAGES, f'{rec["slug"]}.json')
        if os.path.exists(path):
            print(f'  skip  {rec["slug"]} (exists)')
            continue
        json.dump(build(rec), open(path, "w"), ensure_ascii=False, indent=2)
        written += 1
        print(f'  wrote {rec["slug"]}')
    print(f"\n{written} pages written from {os.path.basename(sys.argv[1])}")


if __name__ == "__main__":
    main()
