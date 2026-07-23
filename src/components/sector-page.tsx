import { CheckCircle2, ChevronRight, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { business, type Sector } from "@/content/site";
import { CompactAdviceForm } from "./lead-forms";
import { BottomCta, PackagesSection } from "./sections";
import { ButtonLink, SectionHeading } from "./ui";

function AudienceSection({ sector }: { sector: Sector }) {
  return <section className="py-16 sm:py-20"><div className="mx-auto grid max-w-[86rem] gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:items-start lg:px-10"><div><SectionHeading eyebrow="Bezoekers en hun vraag" title={`Wat bezoekers van ${sector.plural.toLowerCase()} willen weten`} description={sector.visitorIntent} /><div className="mt-7 flex flex-wrap gap-2">{sector.customerTypes.map((type) => <span key={type} className="rounded-full bg-white px-4 py-2 text-sm font-bold shadow-sm">{type}</span>)}</div></div><div className="rounded-3xl bg-slate-100 p-7 sm:p-9"><p className="text-sm font-black text-orange-600">Gewenste vervolgstap</p><p className="mt-3 text-2xl font-black tracking-[-.03em] text-slate-950">{sector.desiredAction}</p><h2 className="mt-8 text-lg font-black">Drempels die eerst moeten worden weggenomen</h2><ul className="mt-4 space-y-3">{sector.trustBarriers.map((barrier) => <li key={barrier} className="flex gap-3 text-slate-700"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-orange-500" aria-hidden="true" />{barrier}</li>)}</ul></div></div></section>;
}

function ProofSection({ sector }: { sector: Sector }) {
  return <section className="bg-[#07111f] py-16 text-white sm:py-20"><div className="mx-auto grid max-w-[86rem] gap-10 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start lg:px-10"><SectionHeading inverse eyebrow="Vertrouwen met onderbouwing" title="Laat alleen bewijs zien dat echt en controleerbaar is" description="Zonder echte cases of reviews presenteert Sitora geen vervangende claims. De structuur wordt wel voorbereid op materiaal waarvoor toestemming en context beschikbaar zijn." /><div className="grid gap-4 sm:grid-cols-2">{sector.proofTypes.map((proof) => <div key={proof} className="rounded-2xl bg-white/8 p-5 font-bold text-slate-100">{proof}</div>)}<div className="rounded-2xl bg-orange-500 p-5 text-[#07111f] sm:col-span-2"><strong>Beeldadvies</strong><p className="mt-2 text-sm leading-6">{sector.imageGuidance}</p></div></div></div></section>;
}

function StructureSection({ sector }: { sector: Sector }) {
  return <section className="py-16 sm:py-20"><div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr]"><div><SectionHeading eyebrow="Mogelijke informatiearchitectuur" title="Iedere pagina krijgt een duidelijke taak" description="De definitieve structuur volgt uit de intake en beschikbare inhoud. Dit is een branchespecifiek vertrekpunt, geen vast sjabloon." /><ButtonLink href="/werkwijze" variant="secondary" className="mt-7">Bekijk de werkwijze</ButtonLink></div><ol className="grid gap-3 sm:grid-cols-2">{sector.structure.map((item, index) => <li key={item} className="flex min-h-16 items-center gap-4 rounded-xl bg-white p-4 shadow-sm"><span className="grid size-8 shrink-0 place-items-center rounded-lg bg-blue-950 text-xs font-black text-orange-400">{index + 1}</span><span className="font-bold text-slate-800">{item}</span></li>)}</ol></div></section>;
}

export function SectorPage({ sector }: { sector: Sector }) {
  const structuredData = { "@context": "https://schema.org", "@graph": [
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: business.domain },
      { "@type": "ListItem", position: 2, name: "Branches", item: `${business.domain}/branches` },
      { "@type": "ListItem", position: 3, name: sector.plural, item: `${business.domain}/${sector.slug}` },
    ] },
    {
      "@type": "Service",
      name: `Website laten maken voor ${sector.plural.toLowerCase()}`,
      description: sector.metaDescription,
      provider: { "@id": `${business.domain}/#organization` },
      areaServed: ["Nederland", "Nederlandstalig België"],
      url: `${business.domain}/${sector.slug}`,
    },
    {
      "@type": "FAQPage",
      mainEntity: sector.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ] };
  const orderedSections = sector.layout === "proof-first"
    ? [<ProofSection key="proof" sector={sector} />, <AudienceSection key="audience" sector={sector} />, <StructureSection key="structure" sector={sector} />]
    : sector.layout === "structure-first"
      ? [<StructureSection key="structure" sector={sector} />, <AudienceSection key="audience" sector={sector} />, <ProofSection key="proof" sector={sector} />]
      : [<AudienceSection key="audience" sector={sector} />, <ProofSection key="proof" sector={sector} />, <StructureSection key="structure" sector={sector} />];

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <section className="overflow-hidden bg-[#07111f] py-16 text-white sm:py-20"><div className="mx-auto grid max-w-[86rem] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_.8fr] lg:px-10"><div><nav aria-label="Broodkruimel" className="mb-6 flex flex-wrap items-center gap-2 text-xs font-bold text-blue-200"><Link href="/">Home</Link><ChevronRight className="size-3" aria-hidden="true" /><Link href="/branches">Branches</Link><ChevronRight className="size-3" aria-hidden="true" /><span aria-current="page">{sector.plural}</span></nav><p className="text-xs font-black uppercase tracking-[.2em] text-orange-400">{sector.eyebrow}</p><h1 className="mt-4 text-balance text-4xl font-black tracking-[-0.05em] sm:text-5xl lg:text-6xl">Website laten maken voor {sector.plural.toLowerCase()}</h1><p className="mt-5 max-w-2xl text-2xl font-black leading-tight text-white">{sector.title}</p><p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">{sector.description}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><ButtonLink href="/contact#advies">Bespreek jouw website</ButtonLink><ButtonLink href="/pakketten" variant="light">Bekijk pakketten en scope</ButtonLink></div></div><div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-slate-800"><Image src={sector.image} alt={sector.imageAlt} fill priority sizes="(max-width: 1023px) calc(100vw - 2.5rem), 42vw" className="object-cover" /></div></div></section>
    <section className="bg-[#f6f3ed] py-10"><div className="mx-auto max-w-[86rem] px-5 sm:px-8 lg:px-10"><p className="text-xs font-black uppercase tracking-[.18em] text-orange-600">Waar de huidige klantreis vaak vastloopt</p><div className="mt-6 grid gap-3 md:grid-cols-3">{sector.problems.map((problem, index) => <div key={problem} className="flex gap-4 rounded-xl bg-white p-5 font-bold text-slate-800"><span className="text-xs text-orange-600">0{index + 1}</span>{problem}</div>)}</div></div></section>
    {orderedSections}
    <section className="bg-slate-100 py-16 sm:py-20"><div className="mx-auto max-w-7xl px-5 sm:px-8"><SectionHeading center eyebrow="Passende functies" title={`Concrete bouwstenen voor ${sector.plural.toLowerCase()}`} /><div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{sector.features.map((feature, index) => <article key={feature.title} className="rounded-2xl bg-white p-7"><span className="text-3xl font-black text-orange-200">0{index + 1}</span><h2 className="mt-5 text-xl font-black text-slate-950">{feature.title}</h2><p className="mt-3 leading-7 text-slate-600">{feature.text}</p></article>)}</div></div></section>
    <section className="bg-white py-16 sm:py-20"><div className="mx-auto max-w-4xl px-5 sm:px-8"><SectionHeading center eyebrow={`Vragen over ${sector.plural.toLowerCase()}`} title="Antwoorden voor deze klantreis" /><div className="mt-10 space-y-3">{sector.faqs.map((faq) => <details key={faq.question} className="rounded-xl bg-slate-100 p-5"><summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-black text-slate-950">{faq.question}<span aria-hidden="true" className="text-xl text-orange-500">+</span></summary><p className="mt-3 leading-7 text-slate-600">{faq.answer}</p></details>)}</div><div className="mt-8 text-center"><Link href="/veelgestelde-vragen" className="font-black text-blue-950 underline decoration-orange-500 decoration-2 underline-offset-4">Bekijk alle algemene vragen</Link></div></div></section>
    <PackagesSection />
    <section id="advies" className="bg-[#07111f] py-16 sm:py-20"><div className="mx-auto grid max-w-[86rem] gap-10 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start lg:px-10"><div className="text-white"><PhoneCall className="size-9 text-orange-400" aria-hidden="true" /><h2 className="mt-5 text-4xl font-black leading-[1.02] tracking-[-0.05em] sm:text-5xl">Bespreek de website voor jouw {sector.name}</h2><p className="mt-5 text-lg leading-8 text-slate-400">Vertel welke bezoeker je wilt helpen en welke actie belangrijk is. Sitora reageert op werkdagen zo snel mogelijk met een passende vervolgstap.</p></div><CompactAdviceForm /></div></section>
    <BottomCta />
  </>;
}
