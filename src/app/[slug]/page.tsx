import type { Metadata } from "next";
import { CheckCircle2, Mail, MapPin, MessageCircle, Phone, Sparkles, Target } from "lucide-react";
import { notFound, permanentRedirect } from "next/navigation";
import { Suspense } from "react";
import { BranchesPage } from "@/components/branches-page";
import { CompactAdviceForm } from "@/components/lead-forms";
import { CookiePage, PrivacyPage, TermsPage } from "@/components/legal-pages";
import { BottomCta, FaqSection, MaintenanceSection, PackageComparison, PackagesSection, ProcessSection, ProjectsSection, ServicesSection } from "@/components/sections";
import { SectorPage } from "@/components/sector-page";
import { ButtonLink, PageHero, SectionHeading } from "@/components/ui";
import { allStaticSlugs, business, chatbotFaqs, chatbotOffer, contact, faqs, maintenanceFaqs, sectors } from "@/content/site";
import { normalizeOffer } from "@/lib/offer-options";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const pageMeta: Record<string, { title: string; description: string }> = {
  branches: { title: "Branches", description: "Bekijk hoe Sitora websites afstemt op bezoekers, vertrouwen en gewenste acties in tien verschillende branches." },
  diensten: { title: "Professionele website laten maken", description: "Laat een professionele maatwerkwebsite maken door Sitora: strategie, webdesign, ontwikkeling, SEO-basis, lancering en onderhoud." },
  pakketten: { title: "Website laten maken: prijzen en pakketten", description: "Vergelijk Starter, Business, Premium en Maatwerk: eenmalige websiteprijzen zonder verplicht onderhoudsabonnement." },
  werkwijze: { title: "Werkwijze", description: "Van aanvraag, intake en scope tot ontwerp, ontwikkeling, controle, livegang en overdracht: zo werkt Sitora." },
  voorbeelden: { title: "Voorbeeldwebsites", description: "Bekijk eerlijk gelabelde conceptontwerpen voor verschillende branches en de doelen, structuur en functies erachter." },
  "over-sitora": { title: "Over Sitora en Wessel Hofenk", description: "Maak kennis met Sitora, de persoonlijke aanpak en Wessel Hofenk als vast aanspreekpunt voor je websiteproject." },
  contact: { title: "Contact en gratis websiteadvies", description: "Bespreek vrijblijvend je nieuwe website, pakket of onderhoudsvraag met Sitora en lees wat er na je aanvraag gebeurt." },
  "veelgestelde-vragen": { title: "Veelgestelde vragen", description: "Antwoorden over prijzen, scope, eigendom, hosting, onderhoud, privacy, toegankelijkheid, betaling en livegang." },
  "website-onderhoud": { title: "Websiteonderhoud zonder abonnement", description: "Kies los websiteonderhoud bij Sitora vanaf € 79 per beurt, zonder verplicht abonnement. Bekijk de inhoud, prijzen en grenzen." },
  "chatbot-voor-je-website": { title: "Chatbot voor je website voor € 149", description: "Laat Sitora een chatbot op je website installeren voor eenmalig € 149 excl. btw, zonder verplicht abonnement." },
  privacyverklaring: { title: "Privacyverklaring", description: "Lees welke persoonsgegevens Sitora verwerkt, waarom dat gebeurt en hoe contactaanvragen en chatbotgesprekken worden beschermd." },
  cookieverklaring: { title: "Cookieverklaring", description: "Lees welke noodzakelijke en optionele cookies de website van Sitora gebruikt en hoe je jouw cookievoorkeuren kunt beheren." },
  "algemene-voorwaarden": { title: "Algemene voorwaarden", description: "Lees de afspraken over websiteprojecten, losse onderhoudsbeurten en de websitechatbot van Sitora." },
  bedankt: { title: "Aanvraagstatus", description: "Controleer de status van een aanvraag via het contactformulier." },
};

export function generateStaticParams() {
  return allStaticSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const sector = sectors.find((item) => item.slug === slug);
  const meta = sector ? { title: `Website laten maken voor ${sector.plural.toLowerCase()}`, description: sector.metaDescription } : pageMeta[slug];
  if (!meta) return {};
  return {
    ...meta,
    ...(slug === "bedankt" ? { robots: { index: false, follow: false } } : {}),
    alternates: { canonical: `/${slug}` },
    openGraph: { title: `${meta.title} | Sitora`, description: meta.description, url: `/${slug}`, type: "website", locale: "nl_NL" },
    twitter: { card: "summary_large_image", title: `${meta.title} | Sitora`, description: meta.description },
  };
}

export default async function ContentPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  if (slug === "over-klusgroei") permanentRedirect("/over-sitora");
  const legacyBranches: Record<string, string> = {
    "websites-voor-loodgieters": "/websites-voor-bouw-en-klus",
    "websites-voor-elektriciens": "/websites-voor-bouw-en-klus",
    "websites-voor-schilders": "/websites-voor-bouw-en-klus",
    "websites-voor-dakdekkers": "/websites-voor-bouw-en-klus",
    "websites-voor-aannemers": "/websites-voor-bouw-en-klus",
  };
  if (legacyBranches[slug]) permanentRedirect(legacyBranches[slug]);
  const sector = sectors.find((item) => item.slug === slug);
  if (sector) return <SectorPage sector={sector} />;
  if (!allStaticSlugs.includes(slug)) notFound();

  if (slug === "branches") return <BranchesPage />;
  if (slug === "diensten") return <ServicesPage />;
  if (slug === "pakketten") return <><PageHero eyebrow="Transparante eenmalige prijzen" title="Een website laten maken voor een duidelijke prijs" description="Kies Starter, Business, Premium of een oplossing op maat. Onderhoud neem je alleen af wanneer je het nodig hebt."><ButtonLink href="/contact#advies">Ontvang gratis websiteadvies</ButtonLink></PageHero><PackagesSection showIntro={false} /><PackageComparison /><MaintenanceSection /><BottomCta /></>;
  if (slug === "werkwijze") return <><PageHero eyebrow="Duidelijk van aanvraag tot overdracht" title="Je weet vooraf wat er gebeurt en wie waarvoor verantwoordelijk is" description="Een transparant proces met vaste beslismomenten, gebundelde feedback en een technische eindcontrole."><ButtonLink href="/contact#advies">Bespreek je project</ButtonLink></PageHero><ProcessSection full /><BottomCta /></>;
  if (slug === "voorbeelden") return <><PageHero eyebrow="Conceptvoorbeelden" title="Vier ontwerpprincipes voor vier verschillende klantvragen" description="Deze interne concepten laten ontwerp, doelgroep, structuur en conversiedoel zien. Het zijn geen klanten of behaalde resultaten."><ButtonLink href="/contact#advies">Bespreek jouw richting</ButtonLink></PageHero><ProjectsSection showAll /><BottomCta /></>;
  if (slug === "veelgestelde-vragen") return <><PageHero eyebrow="Veelgestelde vragen" title="Heldere antwoorden vóór je een keuze maakt" description="Over scope, prijzen, eigendom, hosting, onderhoud, privacy, toegankelijkheid en livegang." /><FaqStructuredData /><FaqSection showAll /><BottomCta /></>;
  if (slug === "contact") {
    const query = await searchParams;
    const requested = typeof query.pakket === "string" ? query.pakket : typeof query.dienst === "string" ? query.dienst : undefined;
    return <ContactPage initialOffer={normalizeOffer(requested)} />;
  }
  if (slug === "over-sitora") return <AboutPage />;
  if (slug === "website-onderhoud") return <WebsiteMaintenancePage />;
  if (slug === "chatbot-voor-je-website") return <ChatbotPage />;
  if (slug === "privacyverklaring") return <PrivacyPage />;
  if (slug === "cookieverklaring") return <CookiePage />;
  if (slug === "algemene-voorwaarden") return <TermsPage />;
  if (slug === "bedankt") return <StatusPage />;
  notFound();
}

function ServicesPage() {
  return <><PageHero eyebrow="Diensten" title="Een professionele website laten maken door Sitora" description="Sitora brengt strategie, inhoud, ontwerp en ontwikkeling samen. Optionele onderdelen worden alleen opgenomen wanneer ze bij je doel en scope passen."><ButtonLink href="/contact#advies">Ontvang gratis websiteadvies</ButtonLink><ButtonLink href="/pakketten" variant="light">Bekijk de pakketten</ButtonLink></PageHero><ServicesSection /><section className="bg-slate-100 py-20"><div className="mx-auto max-w-7xl px-5 sm:px-8"><SectionHeading eyebrow="Inbegrepen of optioneel" title="Geen onduidelijke verzamelterm, maar concrete onderdelen" description="De offerte benoemt wat Sitora uitvoert, wat jij aanlevert en welke externe diensten apart worden betaald." /><div className="mt-10 grid gap-5 md:grid-cols-3">{[
    { title: "Kern van ieder traject", text: "Intake, scope, informatiehiërarchie, responsive ontwerp, ontwikkeling, formuliercontrole en technische basis." },
    { title: "Afhankelijk van pakket", text: "Meer pagina's, uitgebreide SEO-basis, cases, blog, analyticsvoorbereiding, animatie of afsprakenmodule." },
    { title: "Altijd apart bevestigd", text: "Hosting, domein, betaalde licenties, externe koppelingen, omvangrijke contentproductie en werk buiten scope." },
  ].map((item) => <article key={item.title} className="rounded-2xl bg-white p-7"><h2 className="text-xl font-black">{item.title}</h2><p className="mt-3 leading-7 text-slate-600">{item.text}</p></article>)}</div><div className="mt-8 flex flex-wrap gap-3"><ButtonLink href="/website-onderhoud" variant="secondary">Websiteonderhoud</ButtonLink><ButtonLink href="/chatbot-voor-je-website" variant="secondary">Chatbot voor je website</ButtonLink></div></div></section><BottomCta /></>;
}

function ContactPage({ initialOffer }: { initialOffer: string }) {
  const contactCards = [
    contact.phoneHref ? { icon: Phone, label: "Bellen", value: contact.phoneDisplay, href: `tel:${contact.phoneHref}` } : null,
    contact.whatsapp ? { icon: MessageCircle, label: "WhatsApp", value: contact.phoneDisplay, href: `https://wa.me/${contact.whatsapp}` } : null,
    { icon: Mail, label: "E-mail", value: contact.email, href: `mailto:${contact.email}` },
  ].filter(Boolean) as Array<{ icon: typeof Phone; label: string; value: string; href: string }>;
  return <><PageHero eyebrow="Gratis websiteadvies" title="Vertel waar je website nu staat en wat de volgende stap moet worden" description="Kies een websitepakket, onderhoudsbeurt, chatbot of overige vraag. Een geldige keuze uit de URL staat al in het formulier geselecteerd." /><section id="advies" className="py-16 sm:py-20"><div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[.72fr_1.28fr]"><div><h2 className="text-3xl font-black tracking-[-.04em] text-slate-950">Wat gebeurt er na je aanvraag?</h2><ol className="mt-6 space-y-4">{["De aanvraag wordt technisch gecontroleerd en naar de zakelijke mailbox gestuurd.", "Sitora bekijkt je vraag, gewenste route en eventuele afhankelijkheden.", "Je krijgt op een werkdag zo snel mogelijk een reactie of een verzoek om ontbrekende informatie.", "Een kennismaking is vrijblijvend; scope en prijs worden pas daarna definitief bevestigd."].map((item, index) => <li key={item} className="flex gap-4"><span className="grid size-8 shrink-0 place-items-center rounded-lg bg-blue-950 text-xs font-black text-orange-400">{index + 1}</span><p className="leading-7 text-slate-600">{item}</p></li>)}</ol><p className="mt-6 rounded-xl bg-orange-50 p-4 text-sm leading-6 text-orange-950">{business.responseExpectation}</p><div className="mt-6 space-y-3">{contactCards.map(({ icon: Icon, label, value, href }) => <a key={label} href={href} className="flex min-h-16 items-center gap-4 rounded-2xl bg-white p-4 shadow-sm"><span className="grid size-11 place-items-center rounded-xl bg-orange-50 text-orange-600"><Icon aria-hidden="true" /></span><span><small className="text-slate-500">{label}</small><strong className="block text-blue-950">{value}</strong></span></a>)}<div className="flex min-h-16 items-center gap-4 rounded-2xl bg-white p-4 shadow-sm"><span className="grid size-11 place-items-center rounded-xl bg-orange-50 text-orange-600"><MapPin aria-hidden="true" /></span><span><small className="text-slate-500">Werkgebied</small><strong className="block text-blue-950">{business.serviceArea}</strong></span></div></div></div><Suspense fallback={<div className="min-h-96 rounded-3xl bg-slate-200" aria-label="Formulier laden" />}><CompactAdviceForm initialOffer={initialOffer} /></Suspense></div></section></>;
}

function WebsiteMaintenancePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: business.domain }, { "@type": "ListItem", position: 2, name: "Websiteonderhoud", item: `${business.domain}/website-onderhoud` }] },
      { "@type": "Service", name: "Websiteonderhoud zonder abonnement", serviceType: "Websiteonderhoud per beurt", provider: { "@id": `${business.domain}/#organization` }, areaServed: ["Nederland", "Nederlandstalig België"], url: `${business.domain}/website-onderhoud`, offers: { "@type": "AggregateOffer", lowPrice: "79", highPrice: "149", priceCurrency: "EUR", offerCount: "2" } },
      faqSchema(maintenanceFaqs),
    ],
  };
  return <><JsonLd data={structuredData} /><PageHero eyebrow="Websiteonderhoud zonder abonnement" title="Websiteonderhoud wanneer jij het nodig hebt" description="Laat Sitora je website controleren, bijwerken en waar afgesproken verbeteren. Je kiest een losse onderhoudsbeurt en zit niet vast aan maandelijkse kosten."><ButtonLink href="/contact?dienst=basis-onderhoud#advies">Onderhoud aanvragen</ButtonLink><ButtonLink href="/chatbot-voor-je-website" variant="light">Bekijk de chatbot</ButtonLink></PageHero><section className="bg-[#f6f3ed] py-20 sm:py-24"><div className="mx-auto grid max-w-[86rem] gap-10 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:px-10"><SectionHeading eyebrow="Duidelijke scope" title="Eerst weten wat je website nodig heeft" description="Een onderhoudsbeurt is bedoeld voor de onderdelen die bij de gekozen optie staan. Grotere uitbreidingen of nieuwe koppelingen worden vooraf apart besproken." /><div className="grid gap-4 sm:grid-cols-2">{["Losse onderhoudsbeurt", "Vooraf duidelijke scope", "Alleen wanneer nodig", "Chatbot voor € 149"].map((title) => <article key={title} className="rounded-2xl border border-slate-200 bg-white p-7"><CheckCircle2 className="size-7 text-orange-500" aria-hidden="true" /><h2 className="mt-5 text-xl font-black">{title}</h2></article>)}</div></div></section><MaintenanceSection /><FaqList eyebrow="Vragen over onderhoud" title="Websiteonderhoud helder uitgelegd" items={maintenanceFaqs} /><BottomCta /></>;
}

function ChatbotPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: business.domain }, { "@type": "ListItem", position: 2, name: "Chatbot voor je website", item: `${business.domain}/chatbot-voor-je-website` }] },
      { "@type": "Service", name: "Chatbot voor je website", description: chatbotOffer.description, serviceType: "Installatie van een websitechatbot", provider: { "@id": `${business.domain}/#organization` }, areaServed: ["Nederland", "Nederlandstalig België"], url: `${business.domain}/chatbot-voor-je-website`, offers: { "@type": "Offer", price: "149", priceCurrency: "EUR", url: `${business.domain}/chatbot-voor-je-website`, description: "Eenmalige prijs exclusief btw, zonder verplicht abonnement" } },
      faqSchema(chatbotFaqs),
    ],
  };
  const steps = [{ number: "01", title: "Vragen afstemmen", text: "We bepalen welke veelgestelde vragen de chatbot betrouwbaar moet kunnen beantwoorden." }, { number: "02", title: "Chatbot installeren", text: "Sitora plaatst de chatbot op de website en laat de vormgeving aansluiten op de bestaande uitstraling." }, { number: "03", title: "Contactroute controleren", text: "Bezoekers houden een duidelijke mogelijkheid om persoonlijk contact op te nemen." }];
  return <><JsonLd data={structuredData} /><PageHero eyebrow="Chatbot voor je website" title="Een slimme chatbot op je website voor € 149" description="Geef bezoekers snel antwoord op vooraf afgestemde veelgestelde vragen, ook wanneer je zelf niet beschikbaar bent. Eenmalig, exclusief btw en zonder verplicht abonnement."><ButtonLink href={`/contact?dienst=${chatbotOffer.id}#advies`}>Chatbot aanvragen</ButtonLink><ButtonLink href="/website-onderhoud" variant="light">Bekijk websiteonderhoud</ButtonLink></PageHero><section className="bg-[#f6f3ed] py-20 sm:py-24"><div className="mx-auto grid max-w-[86rem] gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_.8fr] lg:items-center lg:px-10"><div><SectionHeading eyebrow="Laagdrempelige bezoekershulp" title="Veelgestelde vragen direct opvangen" description="De chatbot helpt bezoekers met informatie die vooraf met Sitora is afgestemd. Wanneer een antwoord niet betrouwbaar beschikbaar is, blijft persoonlijk contact de juiste vervolgstap." /><ul className="mt-8 grid gap-4 sm:grid-cols-2">{chatbotOffer.features.map((feature) => <li key={feature} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 font-bold text-slate-800"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" aria-hidden="true" />{feature}</li>)}</ul></div><aside className="rounded-3xl bg-[#07111f] p-8 text-white shadow-2xl sm:p-10"><p className="text-sm font-black text-orange-400">{chatbotOffer.name}</p><p className="mt-4 text-6xl font-black tracking-[-.06em]">{chatbotOffer.price}</p><p className="mt-3 text-sm text-slate-300">{chatbotOffer.cadence}</p><p className="mt-7 leading-7 text-slate-300">{chatbotOffer.description}</p><ButtonLink href={`/contact?dienst=${chatbotOffer.id}#advies`} className="mt-8 w-full">Chatbot aanvragen</ButtonLink><p className="mt-5 text-xs leading-5 text-slate-400">Eventuele externe licenties en werkzaamheden buiten de afgesproken installatie worden vooraf besproken.</p></aside></div></section><section className="bg-white py-20 sm:py-24"><div className="mx-auto max-w-7xl px-5 sm:px-8"><SectionHeading center eyebrow="Zo werkt de installatie" title="Van vragenlijst naar chatbot in drie stappen" /><div className="mt-12 grid gap-5 md:grid-cols-3">{steps.map((step) => <article key={step.number} className="rounded-2xl border border-slate-200 bg-[#f6f3ed] p-7"><span className="text-xs font-black text-orange-600">{step.number}</span><h2 className="mt-5 text-2xl font-black">{step.title}</h2><p className="mt-3 leading-7 text-slate-600">{step.text}</p></article>)}</div></div></section><FaqList eyebrow="Vragen over de chatbot" title="Duidelijk over prijs en mogelijkheden" items={chatbotFaqs} /><BottomCta /></>;
}

function AboutPage() {
  const values = [
    { icon: Target, title: "Duidelijke keuzes", text: "Scope, verantwoordelijkheden, externe kosten en vervolgstappen worden vooraf benoemd." },
    { icon: Sparkles, title: "Ontwerp vanuit de klantvraag", text: "Structuur en uitstraling volgen uit je doelgroep en gewenste actie, niet uit een ingevuld branchetemplate." },
  ];
  return <><PageHero eyebrow="Over Sitora" title={`${business.ownerName} is je vaste aanspreekpunt van intake tot oplevering`} description={`Sitora is een persoonlijk webbedrijf voor mkb, dienstverleners, vakbedrijven en organisaties in ${business.serviceArea}.`}><ButtonLink href="/contact#advies">Maak kennis</ButtonLink></PageHero><section className="py-16 sm:py-20"><div className="mx-auto max-w-7xl px-5 sm:px-8"><div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-start"><aside className="rounded-3xl bg-[#07111f] p-8 text-white"><div className="grid size-20 place-items-center rounded-full bg-orange-500 text-2xl font-black" aria-hidden="true">WH</div><h2 className="mt-6 text-2xl font-black">{business.ownerName}</h2><p className="mt-2 text-slate-400">Eigenaar van Sitora</p><dl className="mt-7 space-y-4 text-sm"><div><dt className="text-slate-400">KvK</dt><dd className="font-bold">{business.chamberOfCommerce}</dd></div><div><dt className="text-slate-400">Werkwijze</dt><dd className="font-bold">{business.workingModel}</dd></div><div><dt className="text-slate-400">Werkgebied</dt><dd className="font-bold">{business.serviceArea}</dd></div></dl></aside><div><SectionHeading eyebrow="Waarom Sitora" title="Een websiteproject hoeft niet onnodig ingewikkeld te zijn" description="Sitora bestaat om bedrijven en organisaties door technische en inhoudelijke keuzes te begeleiden zonder onduidelijke pakketten, vaste onderhoudsverplichtingen of overdreven resultaatclaims." /><p className="mt-6 max-w-3xl leading-8 text-slate-600">Je overlegt rechtstreeks met Wessel over inhoud, ontwerp, techniek en feedback. Wanneer een koppeling, leverancier of specialist buiten de afgesproken scope valt, wordt dat benoemd voordat er kosten of afhankelijkheden ontstaan.</p><div className="mt-9 grid gap-5 md:grid-cols-2">{values.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl bg-slate-100 p-7"><Icon className="size-7 text-orange-500" aria-hidden="true" /><h2 className="mt-5 text-xl font-black">{title}</h2><p className="mt-3 leading-7 text-slate-600">{text}</p></article>)}</div></div></div><div className="mt-12 rounded-3xl bg-white p-8 shadow-sm sm:p-12"><h2 className="text-3xl font-black tracking-[-.04em]">Wat je concreet mag verwachten</h2><ul className="mt-7 grid gap-4 md:grid-cols-2">{["Eerlijk advies over wat je wel en niet nodig hebt", "Een offerte met scope en belangrijke uitsluitingen", "Feedback op afgesproken momenten", "Controle op mobiel, formulieren en technische basis", "Overdracht volgens offerte en na volledige betaling", "Los onderhoud wanneer jij daar behoefte aan hebt"].map((item) => <li key={item} className="flex gap-3"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" aria-hidden="true" />{item}</li>)}</ul></div></div></section><BottomCta /></>;
}

function StatusPage() {
  return <section className="grid min-h-[60vh] place-items-center bg-slate-100 px-5 py-20"><div className="max-w-2xl rounded-3xl bg-white p-8 text-center shadow-sm sm:p-12"><p className="text-xs font-black uppercase tracking-wider text-orange-600">Aanvraagstatus</p><h1 className="mt-3 text-4xl font-black tracking-[-.045em] text-slate-950">Deze pagina bevestigt geen inzending</h1><p className="mt-5 leading-7 text-slate-600">Na het versturen toont het contactformulier direct een toegankelijke succes- of foutmelding. Open je deze URL rechtstreeks, dan is er geen aanvraag geregistreerd.</p><ButtonLink href="/contact#advies" className="mt-8">Ga naar het contactformulier</ButtonLink></div></section>;
}

function FaqStructuredData() {
  return <JsonLd data={{ "@context": "https://schema.org", ...faqSchema(faqs) }} />;
}

function faqSchema(items: { question: string; answer: string }[]) {
  return { "@type": "FAQPage", mainEntity: items.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) };
}

function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

function FaqList({ eyebrow, title, items }: { eyebrow: string; title: string; items: { question: string; answer: string }[] }) {
  return <section className="bg-slate-100 py-20 sm:py-24"><div className="mx-auto grid max-w-[86rem] gap-12 px-5 sm:px-8 lg:grid-cols-[.72fr_1.28fr] lg:px-10"><SectionHeading eyebrow={eyebrow} title={title} /><div className="border-t border-slate-900/20">{items.map((faq) => <details key={faq.question} className="group border-b border-slate-900/20 py-6"><summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 text-lg font-black marker:hidden">{faq.question}<span className="shrink-0 text-2xl font-normal text-orange-500 transition-transform group-open:rotate-45" aria-hidden="true">+</span></summary><p className="max-w-2xl pb-2 pr-10 pt-4 leading-7 text-slate-600">{faq.answer}</p></details>)}</div></div></section>;
}
