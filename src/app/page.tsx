import type { Metadata } from "next";
import Hero from "@/components/Hero";
import StartCards from "@/components/StartCards";
import AboutGame from "@/components/AboutGame";
import homeData from "@/data/home.json";

export const metadata: Metadata = {
  title: homeData.metadata.title,
  description: homeData.metadata.description,
};

export default function Home() {
  return (
    <>
      <Hero />
      <StartCards />
      <AboutGame />
    </>
  );
}
