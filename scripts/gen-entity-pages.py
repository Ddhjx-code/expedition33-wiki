#!/usr/bin/env python3
"""Generate entity page JSON from a data file.

Usage: python3 scripts/gen-entity-pages.py <data-file> [--type boss|enemy|weapon|picto|location|cosmetic]

Keeps the data layer separate from the rendered page, so adding an entity is
one record rather than one hand-written page.
"""
import json
import os
import sys

PAGES = "src/data/pages"
TODAY = "2026-09-24"
NONE = "(not documented in verifiable sources)"


def affinity_table(rec):
    rows = [
        ("Weak to", rec.get("weak") or "None"),
        ("Resists", rec.get("resists") or "None"),
        ("Absorbs", rec.get("absorbs") or "None"),
        ("Immune", rec.get("immune") or "None"),
    ]
    body = "".join(f"<tr><td>{k}</td><td>{v}</td></tr>" for k, v in rows)
    return (
        "<table><thead><tr><th>Property</th><th>Value</th></tr></thead>"
        f"<tbody>{body}</tbody></table>"
    )


def affinity_note(rec):
    if rec.get("weak"):
        line = f'<p>Bring {rec["weak"]} damage.'
        if rec.get("resists"):
            line += f' {rec["resists"]} is resisted, so those turns are wasted.'
        if rec.get("absorbs"):
            line += f' {rec["absorbs"]} is absorbed - using it heals the target.'
        if rec.get("immune"):
            line += f' {rec["immune"]} does nothing at all.'
        return line + "</p>"
    parts = ["<p>No elemental weakness to exploit."]
    if rec.get("resists"):
        parts.append(f'{rec["resists"]} is resisted, so avoid leaning on it.')
    if rec.get("absorbs"):
        parts.append(f'{rec["absorbs"]} is absorbed and heals the target.')
    if rec.get("immune"):
        parts.append(f'{rec["immune"]} has no effect.')
    parts.append("Build for raw output and survivability instead.</p>")
    return " ".join(parts)


def boss_sections(rec):
    name = rec["name"]
    loc = rec.get("locations") or NONE
    find = f"<p><strong>Location:</strong> {loc}.</p>"
    if rec.get("acts"):
        find += f'<p>Availability: {rec["acts"]}.</p>'
    if rec.get("kind", "").startswith("Chromatic"):
        find += (
            "<p>Chromatic enemies are optional, supercharged versions of an enemy you have "
            "already met. They are not required for the story, but they drop the better tier "
            "of materials and the weapon tied to their base enemy.</p>"
        )
    strategy = []
    if rec.get("base"):
        base = rec["base"].replace("-", " ").title()
        strategy.append(
            f"<h3>Same answer as the base enemy</h3><p>The Chromatic {base} keeps the weaknesses "
            f"and resistances of the ordinary {base}. If you have fought the base version your "
            "party does not need to change - only the margin for error does.</p>"
        )
    strategy.append(
        "<h3>What actually kills you</h3><p>Variants hit harder and hold more health than the "
        "enemy they are based on. The failure mode is running out of resources mid-fight rather "
        "than a mechanic you did not understand, so bring healing headroom over a greedier build.</p>"
    )
    if not rec.get("weak"):
        strategy.append(
            "<h3>No elemental shortcut</h3><p>With no weakness to exploit the fight is decided by "
            "upgrade levels and parry timing. Check your weapons are current before attempting it.</p>"
        )
    return [
        {"id": "overview", "title": "Overview", "content": f'<p>{rec["summary"]}</p>'},
        {"id": "how-to-find", "title": f"Where to Find the {name}", "content": find},
        {"id": "weakness", "title": "Weakness & Resistances", "content": affinity_table(rec) + affinity_note(rec)},
        {"id": "rewards", "title": "Rewards", "content": boss_rewards(rec)},
        {"id": "strategy", "title": f"How to Beat the {name}", "content": "".join(strategy)},
    ]


def boss_rewards(rec):
    if rec.get("base"):
        base = rec["base"].replace("-", " ").title()
        items = [
            f"Higher-tier Chroma materials than the base {base}",
            f"The weapon or Pictos gated behind the Chromatic {base}",
        ]
    else:
        items = ["Colour of Lumina", "Chroma Catalyst", "The Pictos or weapon tied to the encounter"]
    lis = "".join(f"<li>{i}</li>" for i in items)
    return (
        f"<ul>{lis}</ul><p>Exact drop quantities are not documented in the sources we could "
        "verify, so they are left out rather than estimated.</p>"
    )


def enemy_sections(rec):
    name = rec["name"]
    area = rec.get("areas") or NONE
    if rec.get("weak"):
        exploit = (
            f'<h3>Exploit the weakness</h3><p>{rec["weak"]} is the element that lands. '
            "Elemental weaknesses in Expedition 33 are a 50% damage swing in both directions, "
            "so matching correctly is usually worth more than a tier of weapon upgrade.</p>"
        )
    else:
        exploit = (
            "<h3>Nothing to exploit</h3><p>This enemy has no elemental profile at all, which is "
            "why it is absent from the weakness charts. Damage type does not matter - hit count, "
            "Break application and parry timing do.</p>"
        )
    caution = []
    if rec.get("absorbs"):
        caution.append(f'It absorbs {rec["absorbs"]}, so that element heals it rather than hurting it.')
    if rec.get("immune"):
        caution.append(f'It is immune to {rec["immune"]}, which will do nothing at all.')
    if rec.get("resists"):
        caution.append(f'It resists {rec["resists"]}, so that damage is halved.')
    caution_html = ""
    if caution:
        caution_html = "<h3>What not to bring</h3><ul>" + "".join(f"<li>{c}</li>" for c in caution) + "</ul>"
    return [
        {"id": "overview", "title": "Overview", "content": f'<p>{rec.get("note", "")}</p>'},
        {"id": "weakness", "title": "Weakness & Resistances", "content": affinity_table(rec) + affinity_note(rec)},
        {"id": "where", "title": f"Where to Find the {name}", "content": f"<p><strong>Areas:</strong> {area}.</p>"},
        {"id": "strategy", "title": f"How to Beat the {name}", "content": exploit + caution_html},
    ]


def weapon_sections(rec):
    name = rec["name"]
    owner = rec.get("owner") or NONE
    element = rec.get("element") or NONE
    location = rec.get("location") or NONE
    scaling = rec.get("scaling") or NONE
    stats = (
        "<table><thead><tr><th>Property</th><th>Value</th></tr></thead><tbody>"
        f"<tr><td>Element</td><td>{element}</td></tr>"
        f"<tr><td>Scaling</td><td>{scaling}</td></tr>"
        f"<tr><td>Character</td><td>{owner}</td></tr>"
        "</tbody></table>"
    )
    how = f"<p><strong>Location:</strong> {location}.</p>"
    if rec.get("how"):
        how += f'<p>{rec["how"]}</p>'
    return [
        {"id": "overview", "title": "Overview", "content": f'<p>{rec.get("summary","")}</p>'},
        {"id": "stats", "title": "Stats", "content": stats},
        {"id": "how-to-get", "title": f"How to Get the {name}", "content": how},
        {"id": "strategy", "title": f"Is the {name} Worth Using?", "content": f'<p>{rec.get("verdict","")}</p>'},
    ]


def picto_sections(rec):
    name = rec["name"]
    effect = rec.get("effect") or NONE
    location = rec.get("location") or NONE
    return [
        {"id": "overview", "title": "Overview", "content": f'<p>{rec.get("summary","")}</p>'},
        {"id": "effect", "title": "Effect", "content": f"<p><strong>{effect}</strong></p>"},
        {"id": "how-to-get", "title": f"How to Get {name}", "content": f"<p><strong>Location:</strong> {location}.</p>"},
        {"id": "strategy", "title": "Is It Worth Equipping?", "content": f'<p>{rec.get("verdict","")}</p>'},
    ]


def location_sections(rec):
    name = rec["name"]
    return [
        {"id": "overview", "title": "Overview", "content": f'<p>{rec.get("summary","")}</p>'},
        {"id": "getting-there", "title": f"How to Reach {name}", "content": f'<p>{rec.get("access","")}</p>'},
        {"id": "bosses", "title": "Bosses Here", "content": f'<p>{rec.get("bosses", NONE)}</p>'},
        {"id": "collectibles", "title": "Collectibles & Notable Loot", "content": f'<p>{rec.get("loot", NONE)}</p>'},
    ]


def weapons_for(name):
    """Weapons whose owner field lists this character. Read from the data layer so
    the roster cannot drift from the weapon pages themselves."""
    try:
        items = json.load(open("src/data/entities/weapons.json", encoding="utf-8"))
    except Exception:
        return []
    out = []
    for w in items:
        owners = [o.strip() for o in str(w.get("owner", "")).split("/")]
        if name in owners:
            out.append(w)
    return out



def character_sections(rec):
    name = rec["name"]
    out = [
        {
            "id": "overview",
            "title": "Who They Are",
            "content": (
                f'<p>{rec["summary"]}</p>'
                + (
                    f'<p><strong>Joins:</strong> {rec["joins"]}</p>'
                    if rec.get("joins")
                    else ""
                )
            ),
        }
    ]

    bg = rec.get("background")
    out.append(
        {
            "id": "background",
            "title": "Background",
            "content": f"<p>{bg}</p>" if bg else f"<p>{NONE} published backstory detail.</p>",
        }
    )

    if rec.get("spoilers"):
        out[-1]["content"] = (
            '<p class="text-sm italic opacity-75">Contains story spoilers - '
            'stop here if you have not finished the game.</p>' + out[-1]["content"]
        )

    mech = rec.get("mechanic")
    role = rec.get("role")
    bits = []
    if mech:
        bits.append(f"<p>Their defining mechanic is <strong>{mech}</strong>.</p>")
    if role:
        bits.append(f"<p>Party role: <strong>{role}</strong>.</p>")
    if rec.get("build_slug"):
        bits.append(
            f'<p>Skills, Pictos and stat allocation are covered on the '
            f'<a href="/{rec["build_slug"]}">{name} build guide</a> - this page is the character, '
            "not the kit.</p>"
        )
    if rec.get("tier"):
        bits.append(
            f'<p>In the <a href="/tier-list">party tier list</a> they sit at '
            f'<strong>{rec["tier"]}</strong>.</p>'
        )
    out.append(
        {
            "id": "playable",
            "title": "Playable or NPC",
            "content": "".join(bits)
            if bits
            else f"<p>{NONE}</p>",
        }
    )

    owned = weapons_for(name)
    if owned:
        rows = "".join(
            f'<tr><td><a href="/{w["slug"]}">{w["name"]}</a></td>'
            f'<td>{w.get("element", "-")}</td><td>{w.get("scaling", "-")}</td>'
            f'<td>{w.get("location", "-")}</td></tr>'
            for w in sorted(owned, key=lambda x: x["name"])
        )
        arsenal = (
            f"<p>{name} wields {len(owned)} weapons. Their element and scaling are listed here; "
            f"which ones are worth upgrading is on <a href=\"/best-weapons\">best weapons</a> and "
            f"<a href=\"/weapons-tier-list\">the tier list</a>.</p>"
            "<table><thead><tr><th>Weapon</th><th>Element</th><th>Scaling</th>"
            f"<th>How to obtain</th></tr></thead><tbody>{rows}</tbody></table>"
        )
    else:
        arsenal = f"<p>{NONE} weapon set - {name} is not part of the playable roster.</p>"
    out.append(
        {
            "id": "weapons",
            "title": "Weapon Set",
            "content": arsenal,
        }
    )

    rel = rec.get("relationships") or []
    if rel:
        rows = "".join(
            f'<tr><td><a href="/{r["to"]}">{r["label"]}</a></td><td>{r["with"]}</td></tr>'
            for r in rel
        )
        body = (
            "<table><thead><tr><th>Character</th><th>Relationship</th></tr></thead>"
            f"<tbody>{rows}</tbody></table>"
        )
    else:
        body = f"<p>{NONE} documented relationship web.</p>"
    out.append({"id": "relationships", "title": "Relationships", "content": body})

    app = rec.get("appearances") or []
    out.append(
        {
            "id": "appearances",
            "title": "Where They Appear",
            "content": ("<ul>" + "".join(f"<li>{a}</li>" for a in app) + "</ul>")
            if app
            else f"<p>{NONE}</p>",
        }
    )

    out.append(
        {
            "id": "status",
            "title": "Source Status",
            "content": (
                f'<p>Story facts here are drawn from <a href="/world-lore">the world lore page</a>, '
                f'the join timing and mechanic from the <a href="/guide">beginner guide</a>, and the '
                f'tier placement from the <a href="/tier-list">tier list</a>. Anything those pages do '
                "not state is left unrecorded rather than guessed. Back to "
                '<a href="/characters">all characters</a>.</p>'
            ),
        }
    )
    return out


BUILDERS = {
    "boss": (boss_sections, lambda r: [
        *([("Location", r["locations"])] if r.get("locations") else []),
        *([("Act", r["acts"])] if r.get("acts") else []),
        ("Weak to", r.get("weak") or "None (no elemental weakness)"),
        *([("Resists", r["resists"])] if r.get("resists") else []),
        *([("Absorbs", r["absorbs"])] if r.get("absorbs") else []),
        *([("Immune", r["immune"])] if r.get("immune") else []),
        *([("Type", r["kind"])] if r.get("kind") else []),
    ]),
    "enemy": (enemy_sections, lambda r: [
        *([("Areas", r["areas"])] if r.get("areas") else []),
        ("Weak to", r.get("weak") or "None (no elemental weakness)"),
        *([("Resists", r["resists"])] if r.get("resists") else []),
        *([("Absorbs", r["absorbs"])] if r.get("absorbs") else []),
        *([("Immune", r["immune"])] if r.get("immune") else []),
        ("Type", "Enemy / Nevron"),
    ]),
    "weapon": (weapon_sections, lambda r: [
        *([("Character", r["owner"])] if r.get("owner") else []),
        *([("Element", r["element"])] if r.get("element") else []),
        *([("Scaling", r["scaling"])] if r.get("scaling") else []),
        *([("Location", r["location"])] if r.get("location") else []),
        ("Type", "Weapon"),
    ]),
    "picto": (picto_sections, lambda r: [
        *([("Location", r["location"])] if r.get("location") else []),
        ("Type", "Pictos"),
        ("Unlocks", "Lumina after 4 battles"),
    ]),
    "character": (character_sections, lambda r: [
        *([("Playable", "Yes" if r.get("playable") else "No - NPC")] if "playable" in r else []),
        *([("Role", r["role"])] if r.get("role") else []),
        *([("Unique mechanic", r["mechanic"])] if r.get("mechanic") else []),
        *([("Joins", r["joins"])] if r.get("joins") else []),
        *([("Tier", r["tier"])] if r.get("tier") else []),
    ]),
    "location": (location_sections, lambda r: [
        *([("Act", r["acts"])] if r.get("acts") else []),
        *([("Bosses", r["boss_count"])] if r.get("boss_count") else []),
        ("Type", r.get("kind", "Area")),
    ]),
}


def build(rec, kind):
    name = rec["name"]
    sections_fn, facts_fn = BUILDERS[kind]
    facts = [{"label": k, "value": v} for k, v in facts_fn(rec)]
    return {
        "slug": rec["slug"],
        "title": rec.get("title") or f"{name} - Location, Weakness & How to Beat",
        "description": rec.get("description") or f'{name} in Clair Obscur: Expedition 33 - location, elemental weakness and how to beat it.',
        "keyword": rec.get("keyword") or f"{name} Expedition 33",
        "lastUpdated": TODAY,
        "facts": facts,
        "sections": sections_fn(rec),
    }


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    kind = "boss"
    if "--type" in sys.argv:
        kind = sys.argv[sys.argv.index("--type") + 1]
    if not args:
        print(__doc__)
        sys.exit(1)
    records = json.load(open(args[0]))
    written = skipped = 0
    for rec in records:
        path = os.path.join(PAGES, f'{rec["slug"]}.json')
        if os.path.exists(path):
            skipped += 1
            continue
        json.dump(build(rec, kind), open(path, "w"), ensure_ascii=False, indent=2)
        written += 1
    print(f"{written} written, {skipped} skipped ({kind}) from {os.path.basename(args[0])}")


if __name__ == "__main__":
    main()
