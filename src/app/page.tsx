import { HomeHero } from "@/components/home-hero";
import { CompactLeadSection, ConceptSpotlight, IndustryCards, PainSection, RevisionPromise, ValueSection } from "@/components/homepage-sections";
import { FaqSection, MaintenanceSection, PackagesSection, ProcessSection } from "@/components/sections";

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
      <MaintenanceSection />
      <RevisionPromise />
      <FaqSection />
      <CompactLeadSection />
    </>
  );
}
