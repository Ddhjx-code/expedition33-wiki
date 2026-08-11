/**
 * Theme color definitions for Expedition 33 Wiki.
 *
 * Colors are inspired by the game's visual identity:
 * - Dark theme: deep navy/purple (the night sky and mysterious atmosphere)
 * - Light theme: warm ivory with gold accents (parchment, maps)
 * - Accent: gold/amber (Chroma - the game's central element)
 */

export const themeColors = {
  light: {
    background: "hsl(40, 30%, 97%)",
    foreground: "hsl(230, 30%, 15%)",
    navTheme: "hsl(230, 60%, 50%)",
    navThemeLight: "hsl(45, 30%, 95%)",
    accent: "hsl(35, 80%, 55%)",
    accentHover: "hsl(35, 80%, 45%)",
    muted: "hsl(230, 15%, 90%)",
    mutedForeground: "hsl(230, 10%, 45%)",
    border: "hsl(230, 15%, 85%)",
    card: "hsl(0, 0%, 100%)",
    cardForeground: "hsl(230, 30%, 15%)",
  },
  dark: {
    background: "hsl(230, 40%, 8%)",
    foreground: "hsl(40, 20%, 92%)",
    navTheme: "hsl(230, 40%, 20%)",
    navThemeLight: "hsl(230, 20%, 12%)",
    accent: "hsl(35, 70%, 60%)",
    accentHover: "hsl(35, 70%, 70%)",
    muted: "hsl(230, 30%, 18%)",
    mutedForeground: "hsl(230, 15%, 65%)",
    border: "hsl(230, 25%, 22%)",
    card: "hsl(230, 35%, 12%)",
    cardForeground: "hsl(40, 20%, 92%)",
  },
} as const;

export type ThemeMode = "light" | "dark" | "system";
