import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { MobileActionBar } from "@/components/mobile-action-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CookieConsent } from "@/components/cookie-consent";
import { business } from "@/content/site";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(business.domain),
  title: { default: "Sitora | Websites voor vak- en bouwbedrijven", template: "%s | Sitora" },
  description: "Professionele en conversiegerichte websites voor loodgieters, elektriciens, schilders, dakdekkers en aannemers.",
  alternates: { canonical: "/" },
  openGraph: { title: "Sitora", description: "Websites die jouw vakmanschap laten zien en bezoekers omzetten in offerteaanvragen.", type: "website", locale: "nl_NL", images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Sitora — professionele websites die meer aanvragen opleveren" }] },
  twitter: { card: "summary_large_image", title: "Sitora", description: "Professionele websites voor vak- en bouwbedrijven.", images: ["/opengraph-image.png"] },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = [
    { "@context": "https://schema.org", "@type": "Organization", name: business.name, url: business.domain, logo: `${business.domain}/images/sitora-logo.png`, email: business.email, telephone: business.phoneHref, founder: { "@type": "Person", name: business.ownerName }, identifier: [{ "@type": "PropertyValue", propertyID: "KvK", value: business.chamberOfCommerce }, { "@type": "PropertyValue", propertyID: "btw", value: business.vatNumber }], contactPoint: { "@type": "ContactPoint", contactType: "customer service", telephone: business.phoneHref, email: business.email, availableLanguage: ["nl"] } },
    { "@context": "https://schema.org", "@type": "ProfessionalService", name: business.name, url: business.domain, email: business.email, telephone: business.phoneHref, areaServed: ["Nederland", "Vlaanderen"], serviceType: "Websites voor vak- en bouwbedrijven" },
    { "@context": "https://schema.org", "@type": "WebSite", name: business.name, url: business.domain, inLanguage: "nl-NL" },
  ];
  return (
    <html lang="nl" className={manrope.variable}>
      <body>
        <a href="#hoofdinhoud" className="fixed left-3 top-3 z-50 -translate-y-24 rounded-lg bg-white px-4 py-3 font-black text-blue-950 shadow-xl transition-transform focus:translate-y-0">Ga naar hoofdinhoud</a>
        <SiteHeader />
        <main id="hoofdinhoud" tabIndex={-1}>{children}</main>
        <SiteFooter />
        <MobileActionBar />
        <CookieConsent />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
