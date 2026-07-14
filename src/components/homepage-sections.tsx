import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { business, contact, sectors } from "@/content/site";
import { CompactAdviceForm } from "./lead-forms";
import { ProjectsSection } from "./sections";
import { ButtonLink, SectionHeading } from "./ui";

export function ConceptSpotlight() { return <ProjectsSection />; }

export function TrustStrip() {
  const facts = [
    ["Direct contact", business.ownerName],
    ["Transparant", "Pakketten vanaf € 695 excl. btw"],
    ["Werkgebied", business.serviceArea],
    ["Bedrijfsgegevens", `KvK ${business.chamberOfCommerce}`],
  ];
  return <section aria-label="Feiten over Sitora" className="bg-white py-6"><div className="mx-auto grid max-w-[86rem] gap-3 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-10">{facts.map(([label, value]) => <div key={label} className="rounded-xl bg-slate-100 p-4"><p className="text-[10px] font-black uppercase tracking-wider text-orange-600">{label}</p><p className="mt-2 text-sm font-black text-slate-900">{value}</p></div>)}</div></section>;
}

export function FounderTrust() {
  return <section className="bg-white py-16 sm:py-20"><div className="mx-auto grid max-w-[86rem] gap-8 px-5 sm:px-8 lg:grid-cols-[.7fr_1.3fr] lg:items-center lg:px-10"><div className="grid min-h-64 place-items-center rounded-3xl bg-[#07111f] p-8 text-center text-white"><span className="grid size-20 place-items-center rounded-full bg-orange-500 text-2xl font-black" aria-hidden="true">WH</span><p className="mt-5 font-black">{business.ownerName}</p><p className="mt-2 text-sm text-slate-400">Eigenaar van Sitora</p></div><div><SectionHeading eyebrow="Persoonlijk verantwoordelijk" title="Rechtstreeks contact met degene die je website uitwerkt" description={`${business.ownerName} is het vaste aanspreekpunt voor intake, keuzes, feedback en oplevering. Zo blijven afspraken, scope en vervolgstappen overzichtelijk.`} /><ul className="mt-7 grid gap-3 sm:grid-cols-2">{["Vooraf duidelijk wat binnen de scope valt", "Feedback op afgesproken momenten", "Geen verplicht onderhoudsabonnement", "Externe kosten apart benoemd"].map((item) => <li key={item} className="rounded-xl bg-slate-100 p-4 text-sm font-bold text-slate-800">{item}</li>)}</ul><ButtonLink href="/over-sitora" variant="secondary" className="mt-7">Lees over Sitora</ButtonLink></div></div></section>;
}

export function IndustryCards() {
  return <section id="branches" className="bg-[#f6f3ed] pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24"><div className="mx-auto max-w-[86rem] px-5 sm:px-8 lg:px-10"><div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]"><div><SectionHeading eyebrow="Branches" title="De klantvraag bepaalt de structuur" description="Een offerteaanvraag voor een vakbedrijf vraagt iets anders dan een reservering, portfolio of opleidingskeuze. Daarom krijgt iedere branche een eigen informatieroute." /><ButtonLink href="/branches" variant="secondary" className="mt-7">Bekijk alle branches</ButtonLink></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">{sectors.slice(0, 5).map((sector, index) => <Link key={sector.slug} href={`/${sector.slug}`} className="group grid items-center gap-5 rounded-2xl bg-white p-5 shadow-sm sm:grid-cols-[8rem_1fr] lg:grid-cols-[11rem_1fr_auto] lg:gap-7"><div className="relative h-40 overflow-hidden rounded-2xl bg-slate-200 sm:h-28"><Image src={sector.image} alt={sector.imageAlt} fill sizes="(max-width: 639px) calc(100vw - 4.5rem), 176px" className="object-cover" /><span className="absolute left-3 top-3 rounded-full bg-[#07111f]/90 px-2.5 py-1 text-[10px] font-black text-white">{String(index + 1).padStart(2, "0")}</span></div><div><h3 className="text-2xl font-black tracking-[-.04em] text-slate-950 sm:text-3xl">{sector.plural}</h3><p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">{sector.visitorIntent}</p></div><span className="hidden size-11 place-items-center rounded-full bg-slate-100 transition-[background-color,color,transform] duration-200 group-hover:translate-x-1 group-hover:bg-orange-500 group-hover:text-white lg:grid"><ArrowRight className="size-4" aria-hidden="true" /></span></Link>)}</div></div></div></section>;
}

export function ValueSection() {
  const benefits = [
    ["Volledig op maat", "Ontwerp en structuur sluiten aan op je bedrijf, doelgroep en doelen."],
    ["Professionele uitstraling", "Een rustige, onderscheidende vormgeving die vertrouwen opbouwt."],
    ["Duidelijk op ieder apparaat", "Snel, leesbaar en eenvoudig te gebruiken op mobiel en desktop."],
    ["Sterke vindbare basis", "Heldere pagina's, metadata en techniek ondersteunen duurzame vindbaarheid."],
    ["Gericht op resultaat", "CTA's en formulieren helpen bezoekers de juiste vervolgstap te zetten."],
  ];
  return <section className="bg-[#e9e2d7] py-16 sm:py-20 lg:py-24"><div className="mx-auto max-w-[86rem] px-5 sm:px-8 lg:px-10"><div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr]"><div><SectionHeading eyebrow="Wat Sitora levert" title="Alles wat nodig is om professioneel online te groeien" /><ButtonLink href="/diensten" variant="secondary" className="mt-8">Bekijk de diensten</ButtonLink></div><ol className="grid gap-4 sm:grid-cols-2">{benefits.map(([title, text], index) => <li key={title} className="rounded-2xl bg-[#f6f3ed]/70 p-6 sm:p-7"><span className="text-xs font-black text-orange-600">0{index + 1}</span><h3 className="mt-6 text-2xl font-black tracking-[-.04em] text-slate-950">{title}</h3><p className="mt-3 max-w-sm leading-7 text-slate-600">{text}</p></li>)}</ol></div></div></section>;
}

export function RevisionPromise() {
  const trust = ["Prijzen vooraf zichtbaar", "Geen standaardtemplates", "Geen verplicht onderhoud", "Extra werk vooraf geoffreerd"];
  return <section className="bg-orange-500 py-16 text-[#07111f] sm:py-20 lg:py-24"><div className="mx-auto max-w-[86rem] px-5 sm:px-8 lg:px-10"><div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-end"><div><p className="text-xs font-black uppercase tracking-[.2em]">Duidelijk geregeld</p><h2 className="mt-5 max-w-4xl text-balance text-[clamp(2.5rem,7vw,4.5rem)] font-black leading-[.98] tracking-[-.06em]">Maatwerk zonder onduidelijke kosten of vaste verplichtingen.</h2></div><p className="max-w-xl text-lg leading-8 text-slate-900/75">Je kiest een helder pakket. Wat buiten de scope valt, bespreken en prijzen we altijd voordat het werk begint.</p></div><div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{trust.map((item, index) => <div key={item} className="flex min-h-20 items-center gap-3 rounded-xl bg-[#07111f]/8 p-5"><span className="text-xs font-black">0{index + 1}</span><strong>{item}</strong></div>)}</div><ButtonLink href="/pakketten" variant="secondary" className="mt-8 bg-white/80">Bekijk alle prijzen</ButtonLink></div></section>;
}

export function CompactLeadSection() {
  return <section id="gratis-advies" className="bg-[#07111f] py-16 text-white sm:py-20 lg:py-24"><div className="mx-auto grid max-w-[86rem] gap-10 px-5 sm:px-8 lg:grid-cols-[.82fr_1.18fr] lg:items-start lg:px-10 lg:gap-16"><div className="lg:sticky lg:top-28"><p className="text-xs font-black uppercase tracking-[.2em] text-orange-400">Gratis websiteadvies</p><h2 className="mt-5 text-balance text-[clamp(2.5rem,7vw,4.5rem)] font-black leading-[.98] tracking-[-.06em]">Toe aan een website die past bij waar je naartoe wilt?</h2><p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">Vertel kort over je bedrijf. Je ontvangt vrijblijvend advies over de slimste website voor jouw doelgroep en doelen.</p>{contact.whatsapp ? <a href={`https://wa.me/${contact.whatsapp}`} className="mt-7 inline-flex min-h-11 items-center rounded-full bg-white/10 px-5 text-sm font-black">Stuur een WhatsApp-bericht ↗</a> : <a href={`mailto:${contact.email}`} className="mt-7 inline-flex min-h-11 items-center rounded-full bg-white/10 px-5 text-sm font-black">Mail {contact.email} ↗</a>}</div><CompactAdviceForm /></div></section>;
}
