import type { Metadata } from "next";
import Hero from "@/components/Hero";
import StartCards from "@/components/StartCards";
import AboutGame from "@/components/AboutGame";
import JsonLd, { getWebSiteSchema } from "@/components/JsonLd";
import homeData from "@/data/home.json";

const BASE_URL = "https://expedition33.wiki";

export const metadata: Metadata = {
  title: homeData.metadata.title,
  description: homeData.metadata.description,
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: homeData.metadata.title,
    description: homeData.metadata.description,
    url: BASE_URL,
    siteName: "Expedition 33 Wiki",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={getWebSiteSchema()} />
      <Hero />
      <StartCards />
      <AboutGame />
    </>
  );
}
