import type { Metadata } from "next";
import { Building2, CheckCircle2, Cookie, Mail, MapPin, Phone, Scale, Target, UsersRound } from "lucide-react";
import { notFound, permanentRedirect } from "next/navigation";
import { Suspense } from "react";
import { CompactAdviceForm } from "@/components/lead-forms";
import { BottomCta, FaqSection, PackageComparison, PackagesSection, ProcessSection, ProjectsSection } from "@/components/sections";
import { SectorPage } from "@/components/sector-page";
import { ButtonLink, PageHero, SectionHeading } from "@/components/ui";
import { allStaticSlugs, business, contact, faqs, sectors } from "@/content/site";

type PageProps = { params: Promise<{ slug: string }> };

const pageMeta: Record<string, { title: string; description: string }> = {
  pakketten: { title: "Websitepakketten", description: "Transparante websitepakketten voor vak- en bouwbedrijven, eenmalig of als compleet maandabonnement." },
  werkwijze: { title: "Onze werkwijze", description: "Van intake tot livegang: ontdek hoe Sitora binnen zeven werkdagen na complete aanlevering een eerste compleet websiteontwerp maakt." },
  voorbeelden: { title: "Voorbeeldwebsites", description: "Bekijk conceptuele websitevoorbeelden voor loodgieters, aannemers en installatiebedrijven." },
  "over-sitora": { title: "Over Sitora", description: "Een gespecialiseerd webbureau dat vak- en bouwbedrijven helpt met een professionele website." },
  contact: { title: "Gratis websiteadvies", description: "Bespreek vrijblijvend jouw nieuwe website met Sitora." },
  "veelgestelde-vragen": { title: "Veelgestelde vragen", description: "Antwoorden over doorlooptijd, teksten, hosting, onderhoud en vindbaarheid." },
  privacyverklaring: { title: "Privacyverklaring", description: "Lees hoe Sitora zorgvuldig omgaat met persoonsgegevens en contactaanvragen." },
  cookieverklaring: { title: "Cookieverklaring", description: "Lees welke noodzakelijke en optionele cookies de website van Sitora gebruikt." },
  "algemene-voorwaarden": { title: "Algemene voorwaarden", description: "Conceptvoorwaarden voor websites en website-abonnementen van Sitora." },
  bedankt: { title: "Bedankt voor je aanvraag", description: "Je aanvraag voor gratis websiteadvies is ontvangen." },
};

export function generateStaticParams() {
  return allStaticSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const sector = sectors.find((item) => item.slug === slug);
  const meta = sector ? { title: sector.eyebrow, description: sector.description } : pageMeta[slug];
  if (!meta) return {};
  return { ...meta, alternates: { canonical: `/${slug}` }, openGraph: { title: `${meta.title} | Sitora`, description: meta.description, url: `/${slug}`, type: "website", locale: "nl_NL" }, twitter: { card: "summary_large_image", title: `${meta.title} | Sitora`, description: meta.description } };
}

export default async function ContentPage({ params }: PageProps) {
  const { slug } = await params;
  if (slug === "over-klusgroei") permanentRedirect("/over-sitora");
  const sector = sectors.find((item) => item.slug === slug);
  if (sector) return <SectorPage sector={sector} />;
  if (!allStaticSlugs.includes(slug)) notFound();

  if (slug === "pakketten") return <><PageHero eyebrow="Transparante prijzen" title="Een professionele website zonder onduidelijke kosten" description="Kies een eenmalig pakket of laat website, hosting en onderhoud doorlopend voor je regelen."><ButtonLink href="/contact#advies">Ontvang gratis websiteadvies</ButtonLink></PageHero><PackagesSection showIntro={false} /><PackageComparison /><BottomCta /></>;
  if (slug === "werkwijze") return <><PageHero eyebrow="Duidelijk van start tot live" title="Jij kent het vak. Wij vertalen dat naar een website die werkt." description="Een compact proces, persoonlijk contact en binnen zeven werkdagen na complete aanlevering een compleet eerste ontwerp."><ButtonLink href="/contact#advies">Ontvang gratis websiteadvies</ButtonLink></PageHero><ProcessSection full /><BottomCta /></>;
  if (slug === "voorbeelden") return <><PageHero eyebrow="Voorbeelden" title="Sterke online presentaties voor bedrijven die echt werk maken" description="Bekijk hoe structuur, fotografie en conversie samenkomen voor verschillende soorten vakbedrijven."><ButtonLink href="/contact#advies">Ontvang gratis websiteadvies</ButtonLink></PageHero><ProjectsSection showAll /><BottomCta /></>;
  if (slug === "veelgestelde-vragen") return <><PageHero eyebrow="Veelgestelde vragen" title="Heldere antwoorden, zonder kleine lettertjes" description="Alles wat je vooraf wilt weten over het ontwerp, de planning, inhoud en ondersteuning." /><FaqStructuredData /><FaqSection showAll /><BottomCta /></>;
  if (slug === "contact") return <ContactPage />;
  if (slug === "over-sitora") return <AboutPage />;
  if (slug === "privacyverklaring") return <PrivacyPage />;
  if (slug === "cookieverklaring") return <CookiePage />;
  if (slug === "algemene-voorwaarden") return <TermsPage />;
  if (slug === "bedankt") return <ThankYouPage />;
  notFound();
}

function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Gratis websiteadvies" title="Ontdek wat een betere website voor jouw bedrijf kan doen" description="Vertel waar je nu staat. Je krijgt een persoonlijk en vrijblijvend advies over structuur, uitstraling en de slimste vervolgstap." />
      <section id="advies" className="py-20"><div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[.7fr_1.3fr]"><div><h2 className="text-3xl font-black tracking-[-.04em] text-slate-950">Neem direct contact op</h2><p className="mt-4 leading-7 text-slate-600">Liever eerst kort overleggen? Bel, WhatsApp of mail. De klantenservice is 24/7 bereikbaar; het moment van antwoord kan variëren.</p><div className="mt-8 space-y-4">{contact.phoneHref ? <a href={`tel:${contact.phoneHref}`} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5"><span className="grid size-11 place-items-center rounded-xl bg-orange-50 text-orange-600"><Phone /></span><div><small className="text-slate-500">Bel ons</small><p className="font-black text-blue-950">{contact.phoneDisplay}</p></div></a> : null}<a href={`mailto:${contact.email}`} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5"><span className="grid size-11 place-items-center rounded-xl bg-orange-50 text-orange-600"><Mail /></span><div><small className="text-slate-500">Mail ons</small><p className="font-black text-blue-950">{contact.email}</p></div></a><div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5"><span className="grid size-11 place-items-center rounded-xl bg-orange-50 text-orange-600"><MapPin /></span><div><small className="text-slate-500">Locatie</small><p className="font-black text-blue-950">{contact.location}</p></div></div></div></div><Suspense fallback={<div className="min-h-96 animate-pulse rounded-3xl bg-slate-200" aria-label="Formulier laden" />}><CompactAdviceForm /></Suspense></div></section>
    </>
  );
}

function AboutPage() {
  const values = [{ icon: Target, title: "Gericht op resultaat", text: "Iedere keuze moet bijdragen aan vertrouwen, duidelijkheid of een logische contactstap." }, { icon: UsersRound, title: "Persoonlijk samenwerken", text: "Korte lijnen, duidelijke afspraken en feedback zonder ingewikkelde projectprocessen." }, { icon: Building2, title: "Thuis in de vaksector", text: "We begrijpen dat jouw werk, projecten en bereikbaarheid belangrijker zijn dan technische termen." }];
  return <><PageHero eyebrow="Over Sitora" title="Een gespecialiseerd webbureau voor mensen die liever bouwen dan bloggen" description="Sitora helpt vak- en bouwbedrijven aan een professionele website zonder dat zij zelf webspecialist hoeven te worden."><ButtonLink href="/contact#advies">Ontvang gratis websiteadvies</ButtonLink></PageHero><section className="py-24"><div className="mx-auto max-w-7xl px-5 sm:px-8"><SectionHeading eyebrow="Onze overtuiging" title="Goed werk verdient een website die dat direct laat zien" description="Veel sterke vakbedrijven groeien vooral door aanbevelingen. Een professionele website maakt die goede naam zichtbaar voor nieuwe opdrachtgevers en helpt hen sneller de stap naar contact te zetten." /><div className="mt-12 grid gap-5 md:grid-cols-3">{values.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl border border-slate-200 bg-white p-7"><Icon className="size-7 text-orange-500" /><h2 className="mt-5 text-xl font-black">{title}</h2><p className="mt-3 leading-7 text-slate-600">{text}</p></article>)}</div><div className="mt-12 rounded-3xl bg-slate-100 p-8 sm:p-12"><h2 className="text-3xl font-black tracking-[-.04em]">Wat je van ons mag verwachten</h2><ul className="mt-7 grid gap-4 md:grid-cols-2">{["Eerlijk advies over wat je wel en niet nodig hebt", "Een compleet eerste ontwerp binnen zeven werkdagen na complete aanlevering", "Transparante prijzen en een duidelijke planning", "Tekst, structuur en techniek grotendeels uit handen", "Een website die op mobiel net zo overtuigt als op desktop", "Ondersteuning na de livegang"].map((item) => <li key={item} className="flex gap-3"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" />{item}</li>)}</ul></div></div></section><BottomCta /></>;
}

function PrivacyPage() {
  const sections = [
    ["Verwerkingsverantwoordelijke", `${business.name}, gedreven door ${business.ownerName}, locatie ${business.address}, KvK ${business.chamberOfCommerce}, btw ${business.vatNumber}. Privacyvragen kun je sturen naar ${business.email}.`],
    ["Welke gegevens verwerken we?", "Bij een aanvraag verwerken we naam, bedrijfsnaam, telefoonnummer, e-mailadres, branche, website-status, bronpagina, datum en tijd. Bij een overeenkomst kunnen ook offerte-, factuur- en projectgegevens worden verwerkt."],
    ["Doelen en grondslagen", "We gebruiken aanvraaggegevens om contact op te nemen en een voorstel voor te bereiden op basis van jouw toestemming en stappen voorafgaand aan een overeenkomst. Voor beveiliging, administratie en verbetering kunnen gerechtvaardigde belangen of wettelijke verplichtingen gelden."],
    ["Formulieren en e-mail", "Het formulier verstuurt de aanvraag via FormSubmit naar de zakelijke mailbox van Sitora. Er worden geen gevoelige persoonsgegevens uitgevraagd."],
    ["Bewaartermijnen", "Aanvragen zonder overeenkomst worden maximaal 24 maanden bewaard. Projectgegevens bewaren we zolang dat voor de dienstverlening en eventuele claims nodig is. Fiscale administratie bewaren we doorgaans zeven jaar op grond van de wettelijke bewaarplicht."],
    ["Delen en doorgifte", "We verkopen gegevens niet. Gegevens gaan alleen naar leveranciers die nodig zijn voor hosting, beveiliging, e-mail of administratie. Een leverancier kan buiten de EER verwerken; dan zijn passende waarborgen, zoals standaardcontractbepalingen, vereist."],
    ["Beveiliging", "Sitora past passende technische en organisatorische maatregelen toe, waaronder versleutelde verbindingen, toegangsbeperking, invoervalidatie, spambeperking en actuele software."],
    ["Jouw rechten", `Je kunt vragen om inzage, correctie, verwijdering, beperking, overdracht of bezwaar en toestemming intrekken via ${contact.email}. Je kunt ook een klacht indienen bij de Autoriteit Persoonsgegevens.`],
    ["Cookies en statistieken", "Noodzakelijke lokale opslag bewaart alleen je cookievoorkeur. Google Analytics 4 en Meta Pixel laden uitsluitend wanneer ze daadwerkelijk zijn geconfigureerd én je vooraf toestemming geeft."],
  ];
  return <><PageHero eyebrow="Privacy" title="Zorgvuldig omgaan met jouw gegevens" description="In deze privacyverklaring lees je welke persoonsgegevens Sitora verwerkt en waarom." /><section className="py-20"><article className="mx-auto max-w-3xl px-5 sm:px-8"><p className="rounded-xl border border-orange-200 bg-orange-50 p-4 text-sm leading-6 text-orange-950"><strong>Let op:</strong> dit is een praktische concepttekst. Laat de definitieve verklaring controleren op de daadwerkelijk gebruikte formulieren, cookies en leveranciers.</p>{sections.map(([title, text]) => <section key={title} className="border-b border-slate-200 py-7"><h2 className="text-xl font-black text-slate-950">{title}</h2><p className="mt-3 leading-7 text-slate-600">{text}</p></section>)}</article></section></>;
}

function CookiePage() {
  return <><PageHero eyebrow="Cookieverklaring" title="Zelf kiezen welke optionele meting je toestaat" description="Noodzakelijke functies werken altijd. Analytics en marketing blijven uit totdat je ze bewust inschakelt." /><LegalBody icon={<Cookie />} sections={[
    ["Noodzakelijk", "De website gebruikt lokale opslag om je cookievoorkeur te onthouden. Dit is nodig om je keuze te respecteren en bevat geen marketingprofiel."],
    ["Analytics", "Google Analytics 4 kan later worden gekoppeld. De code laadt alleen wanneer een geldig meet-ID is ingesteld én je analytics accepteert."],
    ["Marketing", "Een Meta Pixel of vergelijkbare marketingtechniek kan later worden gekoppeld. Deze blijft standaard uit en laadt uitsluitend na toestemming en configuratie."],
    ["Je keuze wijzigen", "Gebruik 'Cookie-instellingen' onderaan iedere pagina om je voorkeur opnieuw te openen. Je kunt optionele categorieën altijd weer uitschakelen."],
    ["Juridische controle", "Dit is een concept op basis van de huidige technische implementatie. Werk de verklaring bij zodra leveranciers of bewaartermijnen veranderen en laat de definitieve tekst juridisch controleren."],
  ]} /></>;
}

function TermsPage() {
  return <><PageHero eyebrow="Conceptvoorwaarden" title="Afspraken over scope, feedback, betaling en oplevering" description="Deze pagina is een praktisch uitgangspunt en moet vóór gebruik juridisch worden gecontroleerd en aangevuld met echte bedrijfsgegevens." /><LegalBody icon={<Scale />} sections={[
    ["Offerte en scope", "De ondertekende offerte beschrijft pagina's, functies, planning, correctierondes en eventuele diensten van derden. Werk buiten die scope kan als meerwerk worden aangeboden."],
    ["Aanlevering en planning", "De termijn voor het eerste ontwerp start wanneer alle afgesproken informatie en materialen compleet zijn. Vertraging in aanlevering of feedback verschuift de planning."],
    ["Correctierondes", "Start bevat één, Professional twee en Maatwerk drie correctierondes. Een correctieronde bundelt concrete feedback op het voorgelegde ontwerp. Een nieuwe koers of extra ronde kan meerwerk zijn."],
    ["Betaling en eigendom", "Bij eenmalige projecten is 50% verschuldigd vóór de start en 50% vóór publicatie, tenzij schriftelijk anders afgesproken. Na volledige betaling gaan het overeengekomen ontwerp en de inhoud over, met uitzondering van licenties, tooling en diensten van derden."],
    ["Meerwerk", "Werk buiten de vooraf overeengekomen scope wordt alleen uitgevoerd na afstemming. Extra werk wordt berekend tegen een vooraf afgesproken vast uurtarief; het actuele uurtarief is op aanvraag."],
    ["Abonnement", "Het website-abonnement heeft een setupbedrag van € 249 exclusief btw, kost vanaf € 89 per maand exclusief btw en kent een minimale looptijd van 24 maanden. Overdracht en opzegging volgen de ondertekende overeenkomst."],
    ["Hosting en derden", "Hosting en domein zijn alleen inbegrepen wanneer dit expliciet bij het gekozen aanbod staat. Externe leveranciers hanteren eigen beschikbaarheid, prijzen en voorwaarden."],
    ["Oplevering en acceptatie", "Vóór publicatie controleert de opdrachtgever inhoud, contactgegevens, links en wettelijke informatie. Akkoord op de oplevering bevestigt dat de afgesproken scope is geleverd, behoudens aantoonbare technische gebreken."],
    ["Aansprakelijkheid", "Beschikbaarheid, indirecte schade, door de klant aangeleverde inhoud en wettelijke verplichtingen worden beperkt voor zover de wet dat toestaat. Deze bepaling moet door een jurist op de onderneming en het gekozen contractmodel worden afgestemd."],
  ]} /></>;
}

function LegalBody({ icon, sections }: { icon: React.ReactNode; sections: string[][] }) {
  return <section className="py-20"><article className="mx-auto max-w-3xl px-5 sm:px-8"><div className="mb-8 flex gap-4 rounded-xl border border-orange-200 bg-orange-50 p-5 text-orange-950"><span className="mt-1 text-orange-600">{icon}</span><p className="text-sm leading-6"><strong>Juridische controle vereist.</strong> Deze concepttekst is geen juridisch advies en mag pas na controle en aanvulling met echte bedrijfsgegevens als definitieve tekst worden gebruikt.</p></div>{sections.map(([title, text]) => <section key={title} className="border-b border-slate-200 py-7"><h2 className="text-xl font-black text-slate-950">{title}</h2><p className="mt-3 leading-7 text-slate-600">{text}</p></section>)}</article></section>;
}

function ThankYouPage() {
  return <section className="grid min-h-[70vh] place-items-center bg-slate-100 px-5 py-20"><div className="max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl sm:p-12"><span className="mx-auto grid size-16 place-items-center rounded-2xl bg-emerald-100 text-emerald-700"><CheckCircle2 className="size-8" /></span><p className="mt-6 text-xs font-black uppercase tracking-wider text-orange-600">Aanvraag ontvangen</p><h1 className="mt-3 text-4xl font-black tracking-[-.045em] text-slate-950">Bedankt voor je aanvraag</h1><p className="mt-5 leading-7 text-slate-600">Je aanvraag is succesvol naar Sitora verzonden. We nemen persoonlijk contact op via de gegevens die je hebt ingevuld.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><ButtonLink href="/">Terug naar home</ButtonLink><ButtonLink href="/pakketten" variant="secondary">Bekijk de pakketten</ButtonLink></div></div></section>;
}

function FaqStructuredData() {
  const data = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
