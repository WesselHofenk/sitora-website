import { ArrowUpRight, Check, Clock3, Gauge, Headphones, Layers3, MessageSquareText, MousePointerClick, ShieldCheck, Smartphone, Sparkles, Wrench } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { faqs, packages, processSteps, projects, sectors } from "@/content/site";
import { ButtonLink, SectionHeading } from "./ui";

export function ProofStrip() {
  const items = [
    { icon: Clock3, title: "7 werkdagen", text: "tot eerste complete ontwerp" },
    { icon: MessageSquareText, title: "Persoonlijk contact", text: "één duidelijk aanspreekpunt" },
    { icon: ShieldCheck, title: "Transparant", text: "heldere pakketten en prijzen" },
    { icon: Wrench, title: "Volledig ontzorgd", text: "structuur, tekst en techniek" },
  ];
  return (
    <section aria-label="Voordelen" className="relative z-10 mx-auto -mt-8 max-w-7xl px-5 sm:px-8">
      <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-blue-950/5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, text }, index) => (
          <div key={title} className={`flex gap-3 p-5 ${index ? "border-t border-slate-200 sm:border-l sm:border-t-0" : ""}`}>
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-orange-50 text-orange-600"><Icon className="size-5" /></span>
            <div><p className="font-black text-slate-950">{title}</p><p className="mt-1 text-xs leading-5 text-slate-500">{text}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ServicesSection() {
  const services = [
    { icon: Layers3, title: "Sterke structuur", text: "Bezoekers begrijpen direct wat je doet, waar je werkt en welke vervolgstap ze kunnen zetten." },
    { icon: MousePointerClick, title: "Gericht op aanvragen", text: "Slimme contactmomenten en korte formulieren maken reageren eenvoudig op ieder apparaat." },
    { icon: Smartphone, title: "Gemaakt voor mobiel", text: "Snel bellen, WhatsAppen of een offerte aanvragen zonder zoeken of onnodige stappen." },
    { icon: Gauge, title: "Snel en degelijk", text: "Een moderne technische basis die prettig werkt en eenvoudig kan meegroeien met je bedrijf." },
    { icon: Sparkles, title: "Tekst die bij je past", text: "Nuchtere, overtuigende teksten die jouw vakmanschap helder uitleggen zonder marketingpraat." },
    { icon: Headphones, title: "Geen technisch gedoe", text: "Wij pakken ontwerp, inhoud en techniek op. Jij houdt tijd over voor je klanten en projecten." },
  ];
  return (
    <section id="diensten" className="py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Websites die doorwerken" title="Alles wat je nodig hebt voor een sterke eerste indruk" description="Geen losse pagina’s zonder plan, maar een doordachte website die vertrouwen opbouwt en bezoekers richting contact begeleidt." />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, text }) => (
            <article key={title} className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-slate-900/5">
              <span className="grid size-12 place-items-center rounded-xl bg-blue-950 text-orange-400"><Icon className="size-6" /></span>
              <h3 className="mt-5 text-xl font-black tracking-[-0.03em] text-slate-950">{title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectorsSection() {
  return (
    <section id="voor-wie" className="bg-slate-100 py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Gebouwd voor jouw branche" title="Sitora kent de praktijk van vakbedrijven" description="Elke branche vraagt om andere accenten. Daarom stemmen we diensten, bewijs en contactroutes af op de opdrachten die jij wilt binnenhalen." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {sectors.map((sector, index) => (
            <Link key={sector.slug} href={`/${sector.slug}`} className="group relative min-h-72 overflow-hidden rounded-2xl bg-blue-950 text-white">
              <Image src={sector.image} alt={`${sector.plural} aan het werk`} fill sizes="(max-width: 640px) 100vw, 20vw" className="object-cover opacity-55 transition duration-500 group-hover:scale-105 group-hover:opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="text-xs font-black text-orange-400">0{index + 1}</span>
                <h3 className="mt-1 text-xl font-black capitalize">{sector.plural}</h3>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold">Bekijk mogelijkheden <ArrowUpRight className="size-4" /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PackagesSection({ showIntro = true, preview = false }: { showIntro?: boolean; preview?: boolean }) {
  return (
    <section className="bg-[#f6f3ed] py-24 sm:py-32 lg:py-40" id="pakketten">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8 lg:px-10">
        {showIntro ? <SectionHeading center={!preview} eyebrow="Duidelijke pakketten" title="Kies wat bij je bedrijf past" description="Je ziet vooraf wat we maken, wat het kost en welke ondersteuning je krijgt." /> : null}
        <div className={`mt-12 grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-4 ${preview ? "" : "sm:mt-16"}`}>
          {packages.map((item) => (
            <article key={item.name} className={`relative flex flex-col rounded-[1.25rem] border bg-white p-6 text-slate-950 sm:p-7 ${item.featured ? "border-orange-500 ring-1 ring-orange-500" : "border-slate-900/15"}`}>
              {item.featured ? <span className="absolute right-5 top-5 rounded-full bg-orange-500 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white">Meest gekozen</span> : null}
              <p className="pr-20 text-sm font-black text-orange-600">{item.name}</p>
              <div className="mt-8"><span className="whitespace-nowrap text-4xl font-black tracking-[-0.055em]">{item.price}</span><span className="mt-2 block text-xs text-slate-500">{item.cadence}</span></div>
              <p className="mt-4 text-xs font-bold text-slate-500">{item.audience}</p>
              <p className="mt-5 flex-1 leading-7 text-slate-600">{item.description}</p>
              {!preview ? <><details className="group mt-7 border-y border-slate-900/15 py-4"><summary className="flex min-h-11 cursor-pointer list-none items-center justify-between font-black marker:hidden">Wat is inbegrepen?<span className="text-xl text-orange-500 transition-transform group-open:rotate-45">+</span></summary><ul className="mt-4 space-y-3 pb-2">{item.features.map((feature) => <li key={feature} className="flex gap-3 text-sm"><Check className="mt-0.5 size-4 shrink-0 text-orange-600" />{feature}</li>)}</ul></details>{item.conditions ? <div className="mt-5 border-l-2 border-orange-500 pl-4 text-xs leading-6 text-slate-700">{item.conditions.map((condition) => <p key={condition}>{condition}</p>)}</div> : null}<p className="mt-5 text-xs leading-5 text-slate-500">{item.ownership}</p></> : null}
              <ButtonLink href={preview ? "/pakketten" : `/contact?pakket=${item.id}#advies`} variant={item.featured ? "primary" : "secondary"} className="mt-7 w-full">{preview ? "Bekijk pakket" : "Bespreek dit pakket"}</ButtonLink>
            </article>
          ))}
        </div>
        <p className="mt-5 text-center text-xs text-slate-500">Alle prijzen zijn exclusief btw. Fotografie, premium integraties, grote migraties, maatwerkfuncties en uitgebreid SEO-werk kunnen meerkosten geven.</p>
        {preview ? <div className="mt-8 text-center"><ButtonLink href="/pakketten" variant="secondary">Vergelijk alle pakketten</ButtonLink></div> : null}
      </div>
    </section>
  );
}

export function PackageComparison() {
  const rows = [
    ["Aantal pagina's", "1", "Tot 7", "Tot 15", "Tot 5"],
    ["Correctierondes", "1", "2", "3", "Volgens overeenkomst"],
    ["Aparte dienstenpagina's", "—", "Inbegrepen", "Inbegrepen", "Tot 5 pagina's totaal"],
    ["Projectsectie", "Compact", "Inbegrepen", "Uitgebreid", "Optioneel binnen scope"],
    ["Lokale structuur", "Basis", "Technische basis", "Meerdere regio's", "Basis"],
    ["Hosting en onderhoud", "Niet inbegrepen", "Niet inbegrepen", "Niet inbegrepen", "Inbegrepen"],
    ["Eigendom na betaling", "Ja", "Ja", "Ja", "Volgens abonnement"],
    ["Minimale looptijd", "Geen", "Geen", "Geen", "24 maanden"],
  ];
  return (
    <section className="bg-[#f6f3ed] pb-24 sm:pb-32">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8 lg:px-10">
        <SectionHeading eyebrow="Vergelijk de pakketten" title="De verschillen naast elkaar" description="De tabel geeft de standaardscope weer. De offerte en overeenkomst zijn altijd leidend voor jouw project." />
        <div className="mt-10 overflow-x-auto rounded-[1.25rem] border border-slate-900/15 bg-white">
          <table className="w-full min-w-[850px] border-collapse text-left text-sm">
            <caption className="sr-only">Vergelijking van Sitora Start, Professional, Maatwerk en het website-abonnement</caption>
            <thead className="bg-[#07111f] text-white"><tr><th scope="col" className="p-4">Onderdeel</th>{packages.map((item) => <th scope="col" className={`p-4 ${item.featured ? "bg-orange-500" : ""}`} key={item.id}>{item.name}</th>)}</tr></thead>
            <tbody>{rows.map((row, index) => <tr key={row[0]} className={index % 2 ? "bg-slate-50" : "bg-white"}>{row.map((cell, cellIndex) => cellIndex === 0 ? <th scope="row" className="p-4 font-black text-slate-900" key={cell}>{cell}</th> : <td className="p-4 text-slate-600" key={`${row[0]}-${cellIndex}`}>{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function ProcessSection({ full = false }: { full?: boolean }) {
  return (
    <section className="editorial-grid bg-[#07111f] py-24 text-white sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_.65fr] lg:items-end"><SectionHeading inverse eyebrow="Van kennismaking tot livegang" title="Vier heldere stappen naar online" /><p className="max-w-xl text-lg leading-8 text-slate-400">Je weet steeds waar we staan, wat we van je nodig hebben en wat de volgende stap is.</p></div>
        <div className="mt-16 border-t border-white/15">
          {processSteps.map((step) => (
            <article key={step.number} className="grid gap-4 border-b border-white/15 py-8 sm:grid-cols-[.18fr_.42fr_1fr] sm:items-start sm:gap-8 sm:py-10">
              <span className="text-sm font-black text-orange-400">{step.number}</span>
              <h3 className="text-2xl font-black tracking-[-.035em] sm:text-3xl">{step.title}</h3>
              <p className="max-w-2xl leading-7 text-slate-400">{step.text}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-sm leading-6 text-slate-400"><strong className="text-white">De termijn van zeven werkdagen</strong> start zodra Sitora alle afgesproken bedrijfsinformatie, diensten, contactgegevens en het beschikbare beeldmateriaal compleet heeft ontvangen.</p>
        {full ? <div className="mt-10 border-l-2 border-orange-500 pl-5 text-slate-300"><strong className="text-white">Goed om te weten:</strong> compacte feedbackmomenten houden de planning overzichtelijk.</div> : null}
      </div>
    </section>
  );
}

export function ProjectsSection({ showAll = false }: { showAll?: boolean }) {
  return (
    <section className="bg-[#f6f3ed] py-24 sm:py-32">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Voorbeeldprojecten" title="Zo kan jouw vakmanschap online tot leven komen" description="Conceptuele voorbeelden van heldere websitestructuren voor verschillende soorten vakbedrijven." />
          {!showAll ? <ButtonLink href="/voorbeelden" variant="secondary">Bekijk alle voorbeelden</ButtonLink> : null}
        </div>
        <div className="mt-16 grid gap-x-6 gap-y-14 md:grid-cols-2">
          {projects.map((project) => (
            <article id={project.slug} key={project.slug} className="group scroll-mt-28">
              <div className="project-image-zoom relative aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-[#07111f]"><Image src={project.image} alt={`Conceptwebsite voor een ${project.type.toLowerCase()}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover opacity-80" /><div className="absolute inset-0 bg-gradient-to-t from-[#07111f]/75 to-transparent" /><span className="absolute bottom-5 left-5 text-xs font-black uppercase tracking-[.18em] text-white">{project.type}</span></div>
              <div className="grid gap-4 border-b border-slate-900/20 py-6 sm:grid-cols-[1fr_auto] sm:items-start"><div><p className="text-[10px] font-black uppercase tracking-wider text-orange-600">Conceptontwerp · geen klantcase</p><h3 className="mt-3 text-3xl font-black tracking-[-0.045em] text-slate-950">{project.name}</h3><p className="mt-3 max-w-xl leading-7 text-slate-600">{project.objective}</p></div><Link href={`/voorbeelden#${project.slug}`} className="inline-flex min-h-11 items-center gap-1 text-sm font-black text-slate-950">Bekijk concept <ArrowUpRight className="size-4" /></Link></div>
            </article>
          ))}
        </div>
        {showAll ? <div className="mt-10 rounded-3xl bg-slate-100 p-7"><p className="max-w-3xl leading-7 text-slate-700"><strong className="text-slate-950">Transparant over voorbeeldwerk:</strong> alle getoonde concepten zijn intern ontwikkeld als demonstratie. Ze vertegenwoordigen geen bestaande klant, campagne of behaald bedrijfsresultaat.</p></div> : null}
      </div>
    </section>
  );
}

export function FaqSection({ showAll = false }: { showAll?: boolean }) {
  const shown = showAll ? faqs : faqs.slice(0, 4);
  return (
    <section className="bg-[#f6f3ed] py-24 sm:py-32 lg:py-40">
      <div className="mx-auto grid max-w-[86rem] gap-12 px-5 sm:px-8 lg:grid-cols-[.72fr_1.28fr] lg:px-10 lg:gap-20">
        <div><SectionHeading eyebrow="Veelgestelde vragen" title="Duidelijkheid vóór we beginnen" description="Staat je vraag er niet bij? Mail ons gerust. Je krijgt een helder antwoord zonder verkooppraat." />{!showAll ? <ButtonLink href="/veelgestelde-vragen" variant="secondary" className="mt-7">Bekijk alle vragen</ButtonLink> : null}</div>
        <div className="border-t border-slate-900/20">
          {shown.map((faq) => <details key={faq.question} className="group border-b border-slate-900/20 py-6"><summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 text-lg font-black text-slate-950 marker:hidden">{faq.question}<span className="shrink-0 text-2xl font-normal text-orange-500 transition-transform duration-200 group-open:rotate-45">+</span></summary><p className="max-w-2xl pb-2 pr-10 pt-4 leading-7 text-slate-600">{faq.answer}</p></details>)}
        </div>
      </div>
    </section>
  );
}

export function BottomCta() {
  return (
    <section className="bg-orange-500 py-20 text-[#07111f] sm:py-24">
      <div className="mx-auto grid max-w-[86rem] gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-end lg:px-10">
        <div><p className="text-xs font-black uppercase tracking-[.2em]">Klaar voor de volgende stap?</p><h2 className="mt-5 max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.05em] sm:text-5xl lg:text-6xl">Laat je website net zo professioneel werken als jouw bedrijf.</h2></div>
        <ButtonLink href="/contact#advies" variant="secondary" className="shrink-0 border-slate-950/25 bg-transparent">Ontvang gratis websiteadvies</ButtonLink>
      </div>
    </section>
  );
}
