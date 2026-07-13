import { CheckCircle2, ChevronRight, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { business, type Sector } from "@/content/site";
import { CompactAdviceForm } from "./lead-forms";
import { BottomCta, PackagesSection } from "./sections";
import { ButtonLink, SectionHeading } from "./ui";

export function SectorPage({ sector }: { sector: Sector }) {
  const breadcrumbData = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: business.domain },
    { "@type": "ListItem", position: 2, name: sector.eyebrow, item: `${business.domain}/${sector.slug}` },
  ] };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData).replace(/</g, "\\u003c") }} />
      <section className="editorial-grid overflow-hidden bg-[#07111f] py-20 text-white lg:py-28">
        <div className="mx-auto grid max-w-[86rem] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_.9fr] lg:px-10">
          <div>
            <nav aria-label="Broodkruimel" className="mb-6 flex items-center gap-2 text-xs font-bold text-blue-200"><Link href="/">Home</Link><ChevronRight className="size-3" /><span>{sector.eyebrow}</span></nav>
            <p className="text-xs font-black uppercase tracking-[.2em] text-orange-400">{sector.eyebrow}</p>
            <h1 className="mt-4 text-balance text-4xl font-black tracking-[-0.05em] sm:text-5xl lg:text-6xl">{sector.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">{sector.description}</p>
            <div className="mt-8 flex flex-wrap gap-3"><ButtonLink href="/contact#advies">Ontvang gratis websiteadvies</ButtonLink><ButtonLink href="/pakketten" variant="light">Bekijk de pakketten</ButtonLink></div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] border border-white/10"><Image src={sector.image} alt={sector.imageAlt} fill priority sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#07111f]/60 to-transparent" /></div>
        </div>
      </section>

      <section className="border-b border-slate-900/15 bg-[#f6f3ed] py-16">
        <div className="mx-auto max-w-[86rem] px-5 sm:px-8 lg:px-10"><p className="text-xs font-black uppercase tracking-[.18em] text-orange-600">Waar aanvragen nu vastlopen</p><div className="mt-7 grid border-t border-slate-900/15 md:grid-cols-3">{sector.problems.map((problem, index) => <div key={problem} className="flex gap-4 border-b border-slate-900/15 py-5 pr-6 font-bold text-slate-800 md:border-r"><span className="text-xs text-orange-600">0{index + 1}</span>{problem}</div>)}</div></div>
      </section>

      <section className="py-24">
        <div className="mx-auto grid max-w-[86rem] gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:px-10">
          <div><SectionHeading eyebrow="Herkenbaar voor jouw klant" title={`Een duidelijke website voor iedere belangrijke ${sector.name}-dienst`} description={`Bezoekers willen snel weten of jij de juiste ${sector.name} bent. We geven je belangrijkste diensten daarom ieder een heldere plek en maken reageren eenvoudig.`} /><div className="mt-8 grid border-t border-slate-900/15 sm:grid-cols-2">{sector.services.map((service) => <div key={service} className="flex min-h-16 items-center gap-3 border-b border-slate-900/15 font-bold text-slate-800"><CheckCircle2 className="size-4 text-orange-500" />{service}</div>)}</div></div>
          <div className="rounded-3xl bg-slate-100 p-7 sm:p-9"><p className="text-sm font-black text-orange-600">Wat de website voor je doet</p><ul className="mt-6 space-y-5">{sector.benefits.map((benefit) => <li key={benefit} className="flex gap-4"><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-blue-950 text-orange-400"><CheckCircle2 className="size-4" /></span><div><strong className="text-slate-950">{benefit}</strong><p className="mt-1 text-sm leading-6 text-slate-600">Praktisch ingericht voor bezoekers die snel een betrouwbare vakman zoeken.</p></div></li>)}</ul></div>
        </div>
      </section>

      <section className="bg-slate-100 py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8"><SectionHeading center eyebrow="Functies die passen bij jouw werk" title={`Een aanvraagroute voor ${sector.plural}, niet voor ieder willekeurig bedrijf`} /><div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{sector.features.map((feature, index) => <article key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-7"><span className="text-3xl font-black text-orange-200">0{index + 1}</span><h2 className="mt-5 text-xl font-black text-slate-950">{feature.title}</h2><p className="mt-3 leading-7 text-slate-600">{feature.text}</p></article>)}</div></div>
      </section>

      <section className="py-24"><div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr]"><div><SectionHeading eyebrow="Voorgestelde websitestructuur" title="Iedere pagina heeft een duidelijke taak" description="De definitieve structuur volgt uit de intake. Dit is een sterke uitgangspositie voor jouw branche." /><ButtonLink href="/werkwijze" variant="secondary" className="mt-7">Bekijk de werkwijze</ButtonLink></div><ol className="grid gap-3 sm:grid-cols-2">{sector.structure.map((item, index) => <li key={item} className="flex min-h-16 items-center gap-4 rounded-xl border border-slate-200 bg-white p-4"><span className="grid size-8 shrink-0 place-items-center rounded-lg bg-blue-950 text-xs font-black text-orange-400">{index + 1}</span><span className="font-bold text-slate-800">{item}</span></li>)}</ol></div></section>

      <section className="bg-slate-100 py-20"><div className="mx-auto max-w-4xl px-5 sm:px-8"><SectionHeading center eyebrow={`Vragen van ${sector.plural}`} title="Praktische antwoorden voor jouw branche" /><div className="mt-10 space-y-3">{sector.faqs.map((faq) => <details key={faq.question} className="rounded-xl border border-slate-200 bg-white p-5"><summary className="cursor-pointer font-black text-slate-950">{faq.question}</summary><p className="mt-3 leading-7 text-slate-600">{faq.answer}</p></details>)}</div><div className="mt-8 text-center"><Link href="/veelgestelde-vragen" className="font-black text-blue-950 underline decoration-orange-500 decoration-2 underline-offset-4">Bekijk alle veelgestelde vragen</Link></div></div></section>

      <PackagesSection />
      <section id="advies" className="editorial-grid bg-[#07111f] py-24"><div className="mx-auto grid max-w-[86rem] gap-10 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:px-10"><div className="text-white"><PhoneCall className="size-9 text-orange-400" /><h2 className="mt-5 text-5xl font-black leading-[1.02] tracking-[-0.05em]">Bespreek jouw nieuwe website</h2><p className="mt-5 text-lg leading-8 text-slate-400">Vertel kort waar je nu staat. Je ontvangt persoonlijk en vrijblijvend advies over de slimste opbouw voor jouw bedrijf.</p></div><CompactAdviceForm /></div></section>
      <BottomCta />
    </>
  );
}
