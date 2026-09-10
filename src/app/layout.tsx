import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-MZ867GJT24";

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

const BASE_URL = "https://expedition33.wiki";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
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
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Expedition 33 Wiki - Guides, Builds & Boss Strategies",
    description: "Complete Clair Obscur: Expedition 33 guide. Best builds, boss strategies, weapon locations, and full walkthrough.",
    type: "website",
    locale: "en_US",
    siteName: "Expedition 33 Wiki",
    url: BASE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Expedition 33 Wiki - Guides, Builds & Boss Strategies",
    description: "Complete Clair Obscur: Expedition 33 guide. Best builds, boss strategies, weapon locations, and full walkthrough.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "Expedition 33 Wiki",
      url: BASE_URL,
      description: "Complete guide for Clair Obscur: Expedition 33 - builds, bosses, weapons, walkthrough.",
    },
    {
      "@type": "VideoGame",
      name: "Clair Obscur: Expedition 33",
      genre: "Role-playing game",
      gamePlatform: ["PC", "PlayStation 5", "Xbox Series X/S"],
      description: "A turn-based RPG with real-time elements set in a world inspired by Belle Époque France.",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the best build in Expedition 33?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The best builds depend on your playstyle. Maelle excels as a damage dealer with high crit builds, Verso is the best tank/support, and Lune offers versatile magic damage. Check our Best Builds page for detailed recommendations.",
          },
        },
        {
          "@type": "Question",
          name: "How many bosses are in Expedition 33?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Expedition 33 features over 30 bosses across all acts, including main story bosses, optional bosses, and super bosses. Our Boss Guide lists them all in recommended order with strategies.",
          },
        },
        {
          "@type": "Question",
          name: "What are Pictos in Expedition 33?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Pictos are passive abilities that characters learn by equipping them in battle. After enough battles, the ability becomes permanently unlocked. Our Best Pictos guide ranks the top picks.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Navbar />

        {/* Main content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
