import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Expedition 33 Wiki - Clair Obscur Game Guide",
    template: "%s | Expedition 33 Wiki",
  },
  description:
    "Comprehensive game guide for Clair Obscur: Expedition 33. Walkthroughs, character builds, boss strategies, collectibles, and more.",
  keywords: [
    "Expedition 33",
    "Clair Obscur",
    "game guide",
    "wiki",
    "walkthrough",
    "boss guide",
    "character builds",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        {/* Navigation placeholder */}
        <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
          <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <a href="/" className="text-lg font-bold text-accent">
              Expedition 33 Wiki
            </a>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {/* Nav links will be added in a later task */}
              <span>Characters</span>
              <span>Bosses</span>
              <span>Walkthrough</span>
            </div>
          </nav>
        </header>

        {/* Main content */}
        <main className="flex-1">{children}</main>

        {/* Footer placeholder */}
        <footer className="border-t border-border bg-background py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-muted-foreground">
              Expedition 33 Wiki &mdash; A fan-made guide for Clair Obscur:
              Expedition 33
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
