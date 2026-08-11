import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
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
        <Navbar />

        {/* Main content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
