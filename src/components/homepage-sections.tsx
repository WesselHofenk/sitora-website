import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { contact, sectors } from "@/content/site";
import { CompactAdviceForm } from "./lead-forms";
import { ProjectsSection } from "./sections";
import { ButtonLink, SectionHeading } from "./ui";

export function PainSection() {
  const signals = ["Geen duidelijke positionering", "Verouderde uitstraling", "Onduidelijk aanbod", "Omslachtig contact", "Zwak op mobiel"];
  return <section className="bg-[#f6f3ed] py-24 sm:py-32 lg:py-40"><div className="mx-auto max-w-[86rem] px-5 sm:px-8 lg:px-10"><div className="grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-end"><div><p className="text-xs font-black uppercase tracking-[.22em] text-orange-600">De eerste indruk telt</p><h2 className="mt-6 max-w-5xl text-balance text-5xl font-black leading-[1.01] tracking-[-.055em] text-slate-950 sm:text-6xl lg:text-7xl">Een goed bedrijf verdient een website die dat direct laat voelen.</h2></div><p className="max-w-xl text-lg leading-8 text-slate-600 lg:pb-2">Sitora vertaalt jouw verhaal, aanbod en ambitie naar een professionele website die vertrouwen opbouwt en bezoekers gericht verder helpt.</p></div><div className="mt-16 flex flex-wrap border-y border-slate-900/15 py-5 text-sm font-bold text-slate-700 sm:mt-20">{signals.map((signal, index) => <span key={signal} className="flex items-center py-2 pr-6 after:ml-6 after:size-1 after:rounded-full after:bg-orange-500 last:after:hidden">{String(index + 1).padStart(2, "0")} · {signal}</span>)}</div></div></section>;
}

export function ConceptSpotlight() { return <ProjectsSection />; }

export function IndustryCards() {
  return <section id="branches" className="bg-[#f6f3ed] py-24 sm:py-32 lg:py-40"><div className="mx-auto max-w-[86rem] px-5 sm:px-8 lg:px-10"><div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr]"><SectionHeading eyebrow="Websites voor iedere branche" title="Jouw branche, doelgroep en verhaal vormen het vertrekpunt" description="Geen standaardtemplate met andere kleuren, maar een eigen structuur, uitstraling en contactroute voor jouw bedrijf." /><div className="border-t border-slate-900/20">{sectors.map((sector, index) => <Link key={sector.slug} href={`/${sector.slug}`} className="group grid items-center gap-5 border-b border-slate-900/20 py-6 sm:grid-cols-[11rem_1fr_auto] sm:gap-7"><div className="relative h-44 overflow-hidden rounded-2xl bg-slate-200 sm:h-28"><Image src={sector.image} alt={sector.imageAlt} fill sizes="(max-width: 639px) calc(100vw - 2.5rem), 176px" className="object-cover" /><span className="absolute left-3 top-3 rounded-full bg-[#07111f]/90 px-2.5 py-1 text-[10px] font-black text-white">{String(index + 1).padStart(2, "0")}</span></div><div><h3 className="text-2xl font-black tracking-[-.04em] text-slate-950 sm:text-3xl">{sector.plural}</h3><p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">{sector.features[0].text}</p></div><span className="grid size-11 place-items-center rounded-full border border-slate-900/20 transition-[background-color,color,transform] duration-200 group-hover:translate-x-1 group-hover:bg-orange-500 group-hover:text-white"><ArrowRight className="size-4" aria-hidden="true" /></span></Link>)}</div></div></div></section>;
}

export function ValueSection() {
  const benefits = [
    ["Volledig op maat", "Ontwerp en structuur sluiten aan op je bedrijf, doelgroep en doelen."],
    ["Professionele uitstraling", "Een rustige, onderscheidende vormgeving die vertrouwen opbouwt."],
    ["Duidelijk op ieder apparaat", "Snel, leesbaar en eenvoudig te gebruiken op mobiel en desktop."],
    ["Sterke vindbare basis", "Heldere pagina's, metadata en techniek ondersteunen duurzame vindbaarheid."],
    ["Gericht op resultaat", "CTA's en formulieren helpen bezoekers de juiste vervolgstap te zetten."],
  ];
  return <section className="bg-[#e9e2d7] py-24 sm:py-32 lg:py-40"><div className="mx-auto max-w-[86rem] px-5 sm:px-8 lg:px-10"><div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]"><div><SectionHeading eyebrow="Wat Sitora levert" title="Alles wat nodig is om professioneel online te groeien" /><ButtonLink href="/diensten" variant="secondary" className="mt-8">Bekijk de diensten</ButtonLink></div><ol className="grid border-t border-slate-900/20 sm:grid-cols-2">{benefits.map(([title, text], index) => <li key={title} className={`border-b border-slate-900/20 py-7 sm:min-h-52 sm:p-7 ${index % 2 === 0 ? "sm:border-r" : ""}`}><span className="text-xs font-black text-orange-600">0{index + 1}</span><h3 className="mt-8 text-2xl font-black tracking-[-.04em] text-slate-950">{title}</h3><p className="mt-3 max-w-sm leading-7 text-slate-600">{text}</p></li>)}</ol></div></div></section>;
}

export function RevisionPromise() {
  const trust = ["Prijzen vooraf zichtbaar", "Geen standaardtemplates", "Geen verplicht onderhoud", "Extra werk vooraf geoffreerd"];
  return <section className="bg-orange-500 py-24 text-[#07111f] sm:py-32"><div className="mx-auto max-w-[86rem] px-5 sm:px-8 lg:px-10"><div className="grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-end"><div><p className="text-xs font-black uppercase tracking-[.2em]">Duidelijk geregeld</p><h2 className="mt-6 max-w-4xl text-balance text-5xl font-black leading-[.98] tracking-[-.06em] sm:text-6xl lg:text-7xl">Maatwerk zonder onduidelijke kosten of vaste verplichtingen.</h2></div><p className="max-w-xl text-lg leading-8 text-slate-900/75">Je kiest een helder pakket. Wat buiten de scope valt, bespreken en prijzen we altijd voordat het werk begint.</p></div><div className="mt-16 grid border-y border-slate-950/25 sm:grid-cols-2 lg:grid-cols-4">{trust.map((item, index) => <div key={item} className="flex min-h-24 items-center gap-3 border-b border-slate-950/20 py-5 sm:border-r lg:border-b-0"><span className="text-xs font-black">0{index + 1}</span><strong>{item}</strong></div>)}</div><ButtonLink href="/pakketten" variant="secondary" className="mt-8 border-slate-950/30 bg-transparent">Bekijk alle prijzen</ButtonLink></div></section>;
}

export function CompactLeadSection() {
  return <section id="gratis-advies" className="editorial-grid bg-[#07111f] py-24 text-white sm:py-32 lg:py-40"><div className="mx-auto grid max-w-[86rem] gap-14 px-5 sm:px-8 lg:grid-cols-[.82fr_1.18fr] lg:items-start lg:px-10 lg:gap-20"><div className="lg:sticky lg:top-32"><p className="text-xs font-black uppercase tracking-[.2em] text-orange-400">Gratis websiteadvies</p><h2 className="mt-6 text-balance text-5xl font-black leading-[.98] tracking-[-.06em] sm:text-6xl lg:text-7xl">Toe aan een website die past bij waar je naartoe wilt?</h2><p className="mt-7 max-w-xl text-lg leading-8 text-slate-400">Vertel kort over je bedrijf. Je ontvangt vrijblijvend advies over de slimste website voor jouw doelgroep en doelen.</p>{contact.whatsapp ? <a href={`https://wa.me/${contact.whatsapp}`} className="mt-8 inline-flex min-h-11 items-center border-b border-white/35 text-sm font-black">Stuur een WhatsApp-bericht ↗</a> : <a href={`mailto:${contact.email}`} className="mt-8 inline-flex min-h-11 items-center border-b border-white/35 text-sm font-black">Mail {contact.email} ↗</a>}</div><CompactAdviceForm /></div></section>;
}
