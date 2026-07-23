import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { MobileActionBar } from "@/components/mobile-action-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CookieConsent } from "@/components/cookie-consent";
import { AnalyticsTracker } from "@/components/analytics-tracker";
import { ChatbotWidget } from "@/components/chatbot-widget";
import { business } from "@/content/site";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(business.domain),
  title: { default: "Sitora | Professionele websites op maat", template: "%s | Sitora" },
  description: "Sitora maakt professionele maatwerkwebsites voor ondernemers en organisaties. Duidelijke eenmalige prijzen, zonder standaardtemplate of verplicht onderhoud.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: { title: "Sitora | Professionele websites op maat", description: "Sitora ontwerpt snelle maatwerkwebsites met duidelijke eenmalige prijzen.", url: "/", siteName: "Sitora", type: "website", locale: "nl_NL", images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Sitora — professionele maatwerkwebsites voor ondernemers en organisaties" }] },
  twitter: { card: "summary_large_image", title: "Sitora | Professionele websites op maat", description: "Snelle maatwerkwebsites met duidelijke eenmalige prijzen.", images: ["/opengraph-image.png"] },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const sameAs = Object.values(business.socialLinks);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${business.domain}/#organization`,
        name: business.name,
        url: business.domain,
        logo: { "@type": "ImageObject", url: `${business.domain}/images/sitora-logo.png` },
        email: business.email,
        telephone: business.phoneHref,
        areaServed: ["Nederland", "Nederlandstalig België"],
        identifier: [
          { "@type": "PropertyValue", propertyID: "KvK", value: business.chamberOfCommerce },
          { "@type": "PropertyValue", propertyID: "btw", value: business.vatNumber },
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: business.phoneHref,
          email: business.email,
          availableLanguage: ["nl"],
        },
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${business.domain}/#website`,
        name: business.name,
        url: business.domain,
        inLanguage: "nl-NL",
        publisher: { "@id": `${business.domain}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${business.domain}/#webpage`,
        url: business.domain,
        name: "Sitora | Professionele websites op maat",
        description: "Sitora maakt professionele maatwerkwebsites voor ondernemers en organisaties.",
        isPartOf: { "@id": `${business.domain}/#website` },
        about: { "@id": `${business.domain}/#organization` },
        inLanguage: "nl-NL",
      },
    ],
  };
  return (
    <html lang="nl" className={manrope.variable}>
      <body>
        <a href="#hoofdinhoud" className="fixed left-3 top-3 z-50 -translate-y-24 rounded-lg bg-white px-4 py-3 font-black text-blue-950 shadow-xl transition-transform focus:translate-y-0">Ga naar hoofdinhoud</a>
        <SiteHeader />
        <main id="hoofdinhoud" tabIndex={-1}>{children}</main>
        <SiteFooter />
        <MobileActionBar />
        <ChatbotWidget />
        <AnalyticsTracker />
        <CookieConsent />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
