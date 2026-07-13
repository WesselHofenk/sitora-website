import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { business, contact, projects, sectors } from "@/content/site";
import { CompactAdviceForm } from "./lead-forms";
import { ButtonLink, SectionHeading } from "./ui";

export function PainSection() {
  const signals = ["Geen website", "Verouderde uitstraling", "Onduidelijke diensten", "Omslachtig contact", "Zwak op mobiel"];
  return (
    <section className="bg-[#f6f3ed] py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <div><p className="text-xs font-black uppercase tracking-[.22em] text-orange-600">De eerste indruk telt</p><h2 className="mt-6 max-w-5xl text-balance text-5xl font-black leading-[1.01] tracking-[-.055em] text-slate-950 sm:text-6xl lg:text-7xl">Goed vakwerk verdient een website die vertrouwen wekt.</h2></div>
          <p className="max-w-xl text-lg leading-8 text-slate-600 lg:pb-2">Je werk kan uitstekend zijn, terwijl je website achterblijft. Sitora maakt duidelijk wat je doet, waar je werkt en hoe een opdrachtgever contact opneemt.</p>
        </div>
        <div className="mt-16 flex flex-wrap border-y border-slate-900/15 py-5 text-sm font-bold text-slate-700 sm:mt-20">{signals.map((signal, index) => <span key={signal} className="flex items-center py-2 pr-6 after:ml-6 after:size-1 after:rounded-full after:bg-orange-500 last:after:hidden">{String(index + 1).padStart(2, "0")} · {signal}</span>)}</div>
      </div>
    </section>
  );
}

export function ConceptSpotlight() {
  const featured = [projects[0], projects[2], projects[4]];
  return (
    <section className="bg-[#07111f] py-24 text-white sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-8 border-b border-white/15 pb-12 lg:grid-cols-[1fr_.65fr] lg:items-end"><SectionHeading inverse eyebrow="Geselecteerde concepten" title="Een helder idee, zichtbaar uitgewerkt" /><p className="max-w-xl text-lg leading-8 text-slate-400">Drie originele demonstraties van hoe een vakbedrijf overtuigend en praktisch online kan staan.</p></div>
        <p className="mt-6 text-xs leading-5 text-slate-500">Conceptontwerp — ontwikkeld als demonstratie, niet voor een bestaande klant.</p>
        <div className="mt-16 space-y-24 sm:mt-20 sm:space-y-32">
          {featured.map((project, index) => (
            <article key={project.slug} id={`home-${project.slug}`} className="grid gap-8 lg:grid-cols-[1.25fr_.75fr] lg:items-end lg:gap-14">
              <Link href={`/voorbeelden#${project.slug}`} className={`project-image-zoom group relative block aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-slate-900 sm:rounded-[1.75rem] ${index % 2 ? "lg:order-2" : ""}`}>
                <Image src={project.image} alt={`Conceptpresentatie voor een ${project.type.toLowerCase()}`} fill sizes="(max-width: 1024px) 100vw, 65vw" className="object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07111f]/80 via-transparent to-transparent" />
                <div className="absolute inset-x-5 bottom-5 rounded-xl bg-[#f6f3ed]/95 p-5 text-slate-950 backdrop-blur sm:inset-x-8 sm:bottom-8 sm:flex sm:items-end sm:justify-between sm:gap-6 sm:p-6"><div><small className="text-[10px] font-black uppercase tracking-[.18em] text-orange-600">Websiteconcept</small><p className="mt-2 text-2xl font-black tracking-[-.04em]">{project.name}</p></div><span className="mt-4 inline-flex items-center gap-2 text-sm font-black sm:mt-0">Open concept <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" /></span></div>
              </Link>
              <div className={index % 2 ? "lg:order-1" : ""}><p className="text-xs font-black uppercase tracking-[.2em] text-orange-400">0{index + 1} / {project.type}</p><h3 className="mt-5 text-4xl font-black leading-[1.04] tracking-[-.05em] sm:text-5xl">{project.objective}</h3><p className="mt-6 max-w-lg leading-7 text-slate-400">{project.direction}. De interface brengt {project.features.join(", ").toLowerCase()} samen in één duidelijke route.</p><Link href={`/voorbeelden#${project.slug}`} className="mt-8 inline-flex min-h-11 items-center gap-2 border-b border-orange-400 pb-1 text-sm font-black text-white">Bekijk concept <ArrowRight className="size-4" /></Link></div>
            </article>
          ))}
        </div>
        <div className="mt-24 border-t border-white/15 pt-8 sm:mt-32"><ButtonLink href="/voorbeelden" variant="dark">Bekijk alle concepten</ButtonLink></div>
      </div>
    </section>
  );
}

export function IndustryCards() {
  return (
    <section id="voor-wie" className="bg-[#f6f3ed] py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr]"><SectionHeading eyebrow="Voor wie" title="Vijf vakgebieden. Ieder een eigen verhaal." /><div className="border-t border-slate-900/20">{sectors.map((sector, index) => <Link key={sector.slug} href={`/${sector.slug}`} className="group grid min-h-28 grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-slate-900/20 py-5 sm:gap-8"><span className="text-xs font-black text-orange-600">0{index + 1}</span><div className="sm:grid sm:grid-cols-[.65fr_1.35fr] sm:items-center sm:gap-8"><h3 className="text-2xl font-black capitalize tracking-[-.04em] text-slate-950 sm:text-3xl">{sector.plural}</h3><p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 sm:mt-0">{sector.features[0].text}</p></div><span className="grid size-11 place-items-center rounded-full border border-slate-900/20 transition-[background-color,color,transform] duration-200 group-hover:translate-x-1 group-hover:bg-orange-500 group-hover:text-white"><ArrowRight className="size-4" /></span></Link>)}</div></div>
      </div>
    </section>
  );
}

export function ValueSection() {
  const benefits = [
    ["Meer offerteaanvragen", "Contactroutes vragen vooraf de informatie die jij nodig hebt."],
    ["Professionele uitstraling", "Rustige vormgeving maakt je diensten en projecten geloofwaardig zichtbaar."],
    ["Duidelijk op ieder apparaat", "De website blijft snel, leesbaar en eenvoudig te gebruiken op mobiel."],
    ["Sterke vindbare basis", "Heldere pagina's, metadata en techniek ondersteunen duurzame vindbaarheid."],
    ["Persoonlijke begeleiding", "Je hebt één aanspreekpunt voor structuur, ontwerp en feedback."],
    ["Eerste ontwerp in 7 werkdagen", "De termijn start zodra alle afgesproken informatie compleet is."],
  ];
  return (
    <section className="bg-[#e9e2d7] py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8 lg:px-10"><div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]"><div><SectionHeading eyebrow="Wat Sitora levert" title="Alles wat nodig is om professioneel online te staan" /><ButtonLink href="/werkwijze" variant="secondary" className="mt-8">Bekijk de werkwijze</ButtonLink></div><ol className="grid border-t border-slate-900/20 sm:grid-cols-2">{benefits.map(([title, text], index) => <li key={title} className={`border-b border-slate-900/20 py-7 sm:min-h-52 sm:p-7 ${index % 2 === 0 ? "sm:border-r" : ""}`}><span className="text-xs font-black text-orange-600">0{index + 1}</span><h3 className="mt-8 text-2xl font-black tracking-[-.04em] text-slate-950">{title}</h3><p className="mt-3 max-w-sm leading-7 text-slate-600">{text}</p></li>)}</ol></div></div>
    </section>
  );
}

export function RevisionPromise() {
  const trust = ["Prijzen en btw vooraf zichtbaar", "Correctierondes per pakket", "Eigendom duidelijk vastgelegd", "Conceptwerk eerlijk gelabeld"];
  return (
    <section className="bg-orange-500 py-24 text-[#07111f] sm:py-32">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8 lg:px-10"><div className="grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-end"><div><p className="text-xs font-black uppercase tracking-[.2em]">Duidelijk geregeld</p><h2 className="mt-6 max-w-4xl text-balance text-5xl font-black leading-[.98] tracking-[-.06em] sm:text-6xl lg:text-7xl">Feedback hoort bij een goed ontwerp. Verrassingen niet.</h2></div><p className="max-w-xl text-lg leading-8 text-slate-900/75">Je beoordeelt eerst een compleet ontwerp. Daarna verwerken we de afgesproken feedback binnen de correctierondes van je pakket.</p></div><div className="mt-16 grid border-y border-slate-950/25 sm:grid-cols-2 lg:grid-cols-4">{trust.map((item, index) => <div key={item} className="flex min-h-24 items-center gap-3 border-b border-slate-950/20 py-5 sm:border-r lg:border-b-0"><span className="text-xs font-black">0{index + 1}</span><strong>{item}</strong></div>)}</div><ButtonLink href="/algemene-voorwaarden" variant="secondary" className="mt-8 border-slate-950/30 bg-transparent">Bekijk de voorwaarden</ButtonLink></div>
    </section>
  );
}

export function PersonalSection() {
  return (
    <section className="bg-[#f6f3ed] py-24 sm:py-32">
      <div className="mx-auto grid max-w-[86rem] gap-10 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:px-10">
        <div className="relative aspect-[4/5] max-w-lg overflow-hidden rounded-[1.5rem] bg-[#e9e2d7]">
          {business.portraitPath ? <Image src={business.portraitPath} alt={`Portret van ${business.ownerName}`} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" /> : <div className="absolute inset-0 grid place-items-center p-8 text-center"><div><span className="mx-auto grid size-24 place-items-center rounded-full bg-[#07111f] text-3xl font-black text-white">WH</span><p className="mt-5 text-sm font-bold text-slate-600">Portret van Wessel volgt</p></div></div>}
        </div>
        <div><p className="text-xs font-black uppercase tracking-[.2em] text-orange-600">Persoonlijk contact</p><h2 className="mt-6 text-balance text-5xl font-black leading-[1] tracking-[-.055em] text-slate-950 sm:text-6xl">Wie zit er achter Sitora?</h2><p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">Ik ben Wessel Hofenk. Vanuit Sitora help ik vak- en bouwbedrijven om hun kwaliteit online helder te presenteren en bezoekers een logische stap naar contact te geven. Je hebt één aanspreekpunt voor strategie, ontwerp, feedback en oplevering.</p><div className="mt-8 flex flex-wrap gap-3"><ButtonLink href="/over-sitora">Meer over Sitora</ButtonLink><ButtonLink href="/contact#advies" variant="secondary">Maak kennis</ButtonLink></div></div>
      </div>
    </section>
  );
}

export function CompactLeadSection() {
  return (
    <section id="gratis-advies" className="editorial-grid bg-[#07111f] py-24 text-white sm:py-32 lg:py-40">
      <div className="mx-auto grid max-w-[86rem] gap-14 px-5 sm:px-8 lg:grid-cols-[.82fr_1.18fr] lg:items-start lg:px-10 lg:gap-20">
        <div className="lg:sticky lg:top-32"><p className="text-xs font-black uppercase tracking-[.2em] text-orange-400">Gratis websiteadvies</p><h2 className="mt-6 text-balance text-5xl font-black leading-[.98] tracking-[-.06em] sm:text-6xl lg:text-7xl">Toe aan een website die net zo professioneel werkt als jij?</h2><p className="mt-7 max-w-xl text-lg leading-8 text-slate-400">Vertel kort over je bedrijf. Je ontvangt vrijblijvend advies over de beste website voor jouw diensten en doelen.</p>{contact.whatsapp ? <a href={`https://wa.me/${contact.whatsapp}`} className="mt-8 inline-flex min-h-11 items-center border-b border-white/35 text-sm font-black">Stuur een WhatsApp-bericht ↗</a> : <a href={`mailto:${contact.email}`} className="mt-8 inline-flex min-h-11 items-center border-b border-white/35 text-sm font-black">Mail {contact.email} ↗</a>}</div>
        <CompactAdviceForm />
      </div>
    </section>
  );
}
