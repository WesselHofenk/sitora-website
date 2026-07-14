import { HomeHero } from "@/components/home-hero";
import { CompactLeadSection, ConceptSpotlight, FounderTrust, IndustryCards, RevisionPromise, TrustStrip, ValueSection } from "@/components/homepage-sections";
import { FaqSection, MaintenanceSection, PackagesSection, ProcessSection } from "@/components/sections";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <TrustStrip />
      <ValueSection />
      <FounderTrust />
      <ConceptSpotlight />
      <IndustryCards />
      <ProcessSection />
      <PackagesSection preview />
      <MaintenanceSection />
      <RevisionPromise />
      <FaqSection />
      <CompactLeadSection />
    </>
  );
}
