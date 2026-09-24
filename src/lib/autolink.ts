const ENTITY_LINKS: ReadonlyArray<readonly [RegExp, string]> = [
  [/\bChromatic Gold Chevali[eè]re\b/, "/chromatic-gold-chevaliere"],
  [/\bChromatic Ballet\b/, "/chromatic-ballet"],
  [/\bMatthieu the Colossus\b/, "/matthieu-the-colossus"],
  [/\bJulien Tiny Head\b/, "/julien-tiny-head"],
  [/\bFrost Eveque\b/, "/frost-eveque"],
  [/\bFlame Eveque\b/, "/flame-eveque"],
  [/\bThunder Eveque\b/, "/thunder-eveque"],
  [/\bGiant Sapling\b/, "/giant-sapling"],
  [/\bGrosse Tete\b/, "/grosse-tete"],
  [/\bSerpenphare\b/, "/serpenphare"],
  [/\bScavenger\b/, "/scavenger"],
  [/\bGolgra\b/, "/golgra"],
  [/\bGlaise\b/, "/glaise"],
  [/\bTisseur\b/, "/tisseur"],
  [/\bRocher\b/, "/rocher"],
  [/\bSprong\b/, "/sprong"],
  [/\bBlanche\b/, "/blanche"],

  [/\bGustave\b/, "/characters"],
  [/\bSciel\b/, "/characters"],
  [/\bMonoco\b/, "/characters"],
  [/\bLune\b/, "/build-lune"],
  [/\bMaelle\b/, "/build-maelle"],
  [/\bVerso\b/, "/build-verso"],

  [/\bdamage cap\b/, "/damage-mechanics"],
  [/\bLumina\b/, "/damage-mechanics"],
  [/\bPictos\b/, "/best-pictos"],
  [/\bparry(?:ing)?\b/, "/how-to-parry"],
  [/\bweak point\b/, "/enemy-weaknesses"],
  [/\belemental weakness(?:es)?\b/, "/enemy-weaknesses"],
  [/\btier list\b/, "/tier-list"],

  [/\bYellow Harvest\b/, "/locations"],
  [/\bFlying Waters\b/, "/locations"],
  [/\bStone Wave Cliffs\b/, "/locations"],
  [/\bGestral Village\b/, "/locations"],
  [/\bFrozen Hearts\b/, "/locations"],
  [/\bFalling Leaves\b/, "/locations"],
  [/\bCrimson Forest\b/, "/locations"],
  [/\bOld Lumi[eè]re\b/, "/locations"],
  [/\bForgotten Battlefield\b/, "/locations"],
  [/\bRenoir's Drafts\b/, "/locations"],
  [/\bVerso's Drafts\b/, "/locations"],
  [/\bSpring Meadows\b/, "/locations"],
  [/\bCoastal Cave\b/, "/locations"],
  [/\bHidden Gestral Arena\b/, "/locations"],
];

const SKIP_TAGS = new Set([
  "a",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "code",
  "pre",
  "button",
  "script",
  "style",
]);

const TAG_NAME = /^<\s*(\/?)\s*([a-zA-Z][a-zA-Z0-9]*)/;

function linkifyRun(run: string, currentSlug: string, used: Set<number>): string {
  let remaining = run;
  const out: string[] = [];

  for (let i = 0; i < ENTITY_LINKS.length; i++) {
    if (used.has(i)) continue;
    const [pattern, href] = ENTITY_LINKS[i];
    if (href.slice(1) === currentSlug) continue;

    const match = pattern.exec(remaining);
    if (!match || match.index === undefined) continue;

    out.push(remaining.slice(0, match.index));
    out.push(
      `<a href="${href}" style="color:var(--accent);text-decoration:underline;text-underline-offset:2px">${match[0]}</a>`
    );
    remaining = remaining.slice(match.index + match[0].length);
    used.add(i);
  }

  out.push(remaining);
  return out.join("");
}

/**
 * Turn the first mention of each known entity in a page's body copy into an
 * internal link. Headings, existing anchors and code blocks are left alone so
 * links never nest and the outline stays clean.
 */
export function autoLink(html: string, currentSlug: string): string {
  const used = new Set<number>();
  const skipStack: string[] = [];
  const tokens = html.split(/(<[^>]+>)/);
  const out: string[] = [];

  for (const token of tokens) {
    if (token.startsWith("<")) {
      const match = TAG_NAME.exec(token);
      if (match) {
        const isClosing = match[1] === "/";
        const tag = match[2].toLowerCase();
        if (SKIP_TAGS.has(tag)) {
          if (isClosing) {
            const at = skipStack.lastIndexOf(tag);
            if (at >= 0) skipStack.splice(at, 1);
          } else if (!token.endsWith("/>")) {
            skipStack.push(tag);
          }
        }
      }
      out.push(token);
      continue;
    }

    if (skipStack.length > 0 || token.trim() === "") {
      out.push(token);
      continue;
    }

    out.push(linkifyRun(token, currentSlug, used));
  }

  return out.join("");
}
