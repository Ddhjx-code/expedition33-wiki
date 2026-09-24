const AREA_LINKS: ReadonlyArray<readonly [RegExp, string]> = [
  [/\bSirene\b/i, "/sirene"],
  [/\bVisages\b/i, "/visages"],
  [/\bFlying Waters\b/i, "/locations"],
  [/\bStone Wave Cliffs\b/i, "/locations"],
  [/\bForgotten Battlefield\b/i, "/locations"],
  [/\bMonoco's Station\b/i, "/locations"],
  [/\bGestral Village\b/i, "/locations"],
  [/\bHidden Gestral Arena\b/i, "/locations"],
  [/\bAncient Sanctuary\b/i, "/locations"],
  [/\bSpring Meadows\b/i, "/locations"],
  [/\bOld Lumi[eè]re\b/i, "/locations"],
  [/\bYellow Harvest\b/i, "/locations"],
  [/\bFalling Leaves\b/i, "/locations"],
  [/\bFrozen Hearts\b/i, "/locations"],
  [/\bCrimson Forest\b/i, "/locations"],
  [/\bCoastal Cave\b/i, "/locations"],
  [/\bThe Monolith\b/i, "/locations"],
  [/\bEsquie's Nest\b/i, "/locations"],
  [/\bThe Fountain\b/i, "/locations"],
  [/\bThe Continent\b/i, "/locations"],
  [/\bLumi[eè]re\b/i, "/locations"],
  [/\bFlying Manor\b/i, "/locations"],
];

const DROP_LINKS: ReadonlyArray<readonly [RegExp, string]> = [
  [/\bPictos?\b/i, "/best-pictos"],
  [/\bweapon\b/i, "/best-weapons"],
  [/\bLumina\b/i, "/damage-mechanics"],
];

export function linkFactValue(label: string, value: string): string | null {
  const l = label.trim().toLowerCase();

  if (l === "weak to" || l === "resists" || l === "absorbs" || l === "immune") {
    return "/enemy-weaknesses";
  }
  if (l === "location") {
    for (const [pattern, href] of AREA_LINKS) {
      if (pattern.test(value)) return href;
    }
    return "/locations";
  }
  if (l.includes("drop") || l === "exp" || l === "reward") {
    for (const [pattern, href] of DROP_LINKS) {
      if (pattern.test(value)) return href;
    }
    return "/boss-drops";
  }
  if (l === "act") return "/walkthrough";
  if (l === "type") return "/boss-guide";
  if (l === "weak point") return "/enemy-weaknesses";
  return null;
}
