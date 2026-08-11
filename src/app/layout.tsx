import type { Metadata } from "next";
import localFont from "next/font/local";
import Footer from "@/components/Footer";
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
    default: "Expedition 33 Wiki - Guides, Builds & Boss Strategies",
    template: "%s | Expedition 33 Wiki",
  },
  description:
    "Complete Clair Obscur: Expedition 33 guide. Best builds for Maelle, Verso & Lune, boss strategies, weapon locations, Pictos tier list and full walkthrough.",
  keywords: [
    "Expedition 33",
    "Clair Obscur",
    "game guide",
    "wiki",
    "walkthrough",
    "boss guide",
    "character builds",
    "best builds",
    "Pictos",
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
        {/* Navigation */}
        <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
          <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <a href="/" className="text-lg font-bold text-accent">
              Expedition 33 Wiki
            </a>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a href="/guide" className="hover:text-accent transition-colors">Guide</a>
              <a href="/best-builds" className="hover:text-accent transition-colors">Builds</a>
              <a href="/boss-guide" className="hover:text-accent transition-colors">Bosses</a>
            </div>
          </nav>
        </header>

        {/* Main content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
