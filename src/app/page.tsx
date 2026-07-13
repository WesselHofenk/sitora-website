import { HomeHero } from "@/components/home-hero";
import { CompactLeadSection, ConceptSpotlight, IndustryCards, PainSection, PersonalSection, RevisionPromise, ValueSection } from "@/components/homepage-sections";
import { FaqSection, PackagesSection, ProcessSection } from "@/components/sections";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <PainSection />
      <ConceptSpotlight />
      <IndustryCards />
      <ValueSection />
      <ProcessSection />
      <PackagesSection preview />
      <PersonalSection />
      <RevisionPromise />
      <FaqSection />
      <CompactLeadSection />
    </>
  );
}
