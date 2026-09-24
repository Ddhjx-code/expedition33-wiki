# Entity page expansion plan

Inventory taken 2026-09-24. Current coverage: 43 of 786 entities (5.5%).

## Gap

| Entity type | In game | Pages | Missing | Coverage |
| --- | --- | --- | --- | --- |
| Boss (incl. Chromatic) | 165 | 31 | 134 | 19% |
| Weapon | 116 | 0 | 116 | 0% |
| Pictos | 193 | 0 | 193 | 0% |
| Outfit | 97 | 0 | 97 | 0% |
| Haircut | 121 | 0 | 121 | 0% |
| Enemy (base types) | 46 | 0 | 46 | 0% |
| Location / area | 30 | 5 | 25 | 17% |
| Playable character | 6 | 4 | 2 | 67% |
| Named NPC | 12 | 3 | 9 | 25% |
| **Total** | **786** | **43** | **743** | **5.5%** |

We have the index layer (31 overview pages) but almost no entity layer.
Reference wikis ship both layers: one page per entity, plus category indexes.

## Architecture

743 pages cannot be hand-written. The reference model is data / logic / view
separation. Ours:

- **Data** `src/data/entities/<type>.json` - one record per entity, facts only
- **Logic** `scripts/gen-entity-pages.mjs` - reads records, emits page JSON
- **View** existing `[slug]/page.tsx` - renders facts card, sections, navbox

This means adding an entity is one data record, not one hand-written page.

## Phases, ordered by search value x data readiness

### Phase 1 - Boss completion
Listed in our own indexes but missing a page: 16 Chromatic variants plus
Alicia, Simon, Bertrand Big Hands, Dominique Giant Feet, Dominique Tiny Feet,
Jovial Moissonneuse, Seething Boucheclier, Sorrowful Chapelier, Clair Obscur,
White-Haired Man, Gargant, Jar, Bourgeon, Mime.
Data: affinity table from the enemy weakness chart, location from our indexes.
Why first: boss queries are the highest-volume long tail, and we already list
these names with nothing behind them.

### Phase 2 - Enemies
46 base enemy types with weakness / resist / absorb already sourced.
One page each, plus a per-area grouping.
Why: feeds the "X weakness" query family we already rank for indirectly.

### Phase 3 - Weapons
116 weapons. We hold names, locations and 52 mapped sprites.
Why: "X weapon location" and "best X weapon" are the second-largest query family.

### Phase 4 - Locations
25 areas, each a hub page listing bosses, enemies, collectibles and rewards.

### Phase 5 - Pictos
193 records; long-tail but a large surface, and they interlink with builds.

### Phase 6 - Cosmetics
Outfits (97) and haircuts (121). Lowest per-page value, largest count.

## Non-page work still open, by reference-wiki completeness

| Item | Reference behaviour | Priority |
| --- | --- | --- |
| Site search | Every wiki has one; it is the primary entry point | High |
| Page-top sub-navigation | Parent/child links above the article | High |
| Stat radar chart | Six-axis attribute visual on character pages | Medium |
| Relationship graph | Character relationship map | Medium |
| Item / skill icon set | Inline icons for pictos, items, achievements | Medium |
| Quest-window styling | Quest pages styled like the in-game window | Low |
| Comments | Some wikis removed theirs deliberately | Skip |

## Rule carried over

Where a value is not verifiable against a second source, the page says so
rather than guessing. That constraint is not relaxed for volume.

## Status at 2026-09-24

| Phase | Scope | Shipped | Notes |
| --- | --- | --- | --- |
| 1 | Boss completion | 28 pages | 16 Chromatic variants + 12 notable optionals |
| 2 | Enemies | 42 pages | Weakness chart data per enemy |
| 3 | Weapons | 102 pages | Character, element, scaling, acquisition |
| 4 | Locations | 23 pages | Access, bosses, loot, gotchas |
| 5 | Pictos | 185 pages | Effect and location each |
| 6 | Cosmetics | not built | see below |
| - | Site search | shipped | 451-entry index, command palette |
| - | Page-top sub-nav | shipped | section sibling links |
| - | Security / spoiler mark | shipped | inline reveal pattern |
| - | Infobox field links | shipped | huijiwiki card-field pattern |
| - | Breadcrumbs, categories, sources | shipped | fixed page tail |

Site totals: 451 entity+index pages, 458 routes generated.

### Why phase 6 was not built as planned

The outfit and haircut sources are client-rendered React apps and could not be
read reliably - the tables do not appear in the served HTML or in a rendered
DOM without authentication. What could be read covers roughly a third of the
97 outfits and a smaller share of the 121 haircuts.

The plan's own rule applies: where a value cannot be verified against a second
source the page says so rather than guessing, and that rule is not relaxed for
volume. Emitting 218 pages from a partial list would mean inventing the
unlock method for most of them, which is worse than having no page.

Cosmetics are also the lowest-value entity type by search demand, so the
correct fix is to strengthen the two existing index pages once the data can be
obtained, not to ship thin per-item pages now.

### Ordering if this resumes

1. Source cosmetic data from a rendered walkthrough rather than the DLC-era
   checklists, then build phase 6 from verified rows only.
2. Stat radar chart on character pages (six-axis attribute visual).
3. Relationship graph for the relationship system.
4. Item and skill icons inline, rather than only weapon sprites.
5. Remaining 106 bosses (Endless Tower remixes) once unique data is available.
