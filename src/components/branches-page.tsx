import { ArrowUpRight, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { business, sectors } from "@/content/site";
import { BottomCta } from "./sections";
import { PageHero } from "./ui";

export function BranchesPage() {
  const breadcrumb = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: business.domain },
    { "@type": "ListItem", position: 2, name: "Branches", item: `${business.domain}/branches` },
  ] };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, "\u003c") }} />
    <PageHero eyebrow="Brancheoverzicht" title="Een website ingericht op de keuzes van jouw klant" description="De branche is geen invuloefening. Bezoekers zoeken ander bewijs, andere informatie en een andere vervolgstap. Hieronder zie je hoe Sitora die verschillen als vertrekpunt gebruikt." />
    <section className="py-16 sm:py-20"><div className="mx-auto max-w-[86rem] px-5 sm:px-8 lg:px-10"><nav aria-label="Broodkruimel" className="mb-10 flex items-center gap-2 text-sm font-bold text-slate-600"><Link href="/">Home</Link><ChevronRight className="size-4" aria-hidden="true" /><span aria-current="page">Branches</span></nav><div className="grid gap-6 md:grid-cols-2">{sectors.map((sector) => <article key={sector.slug} className="overflow-hidden rounded-3xl bg-white shadow-sm"><div className="relative aspect-[16/8] bg-slate-200"><Image src={sector.image} alt={sector.imageAlt} fill sizes="(max-width: 767px) calc(100vw - 2.5rem), 50vw" className="object-cover" /></div><div className="p-6 sm:p-8"><p className="text-xs font-black uppercase tracking-wider text-orange-800">{sector.customerTypes.slice(0, 2).join(" en ")}</p><h2 className="mt-3 text-3xl font-black tracking-[-.04em] text-slate-950">{sector.plural}</h2><p className="mt-4 leading-7 text-slate-600">{sector.visitorIntent}</p><p className="mt-4 text-sm font-bold text-slate-800">Gewenste vervolgstap: {sector.desiredAction}</p><Link href={`/${sector.slug}`} className="mt-6 inline-flex min-h-11 items-center gap-2 font-black text-blue-950">Bekijk de aanpak voor {sector.plural.toLowerCase()} <ArrowUpRight className="size-4" aria-hidden="true" /></Link></div></article>)}</div></div></section>
    <BottomCta />
  </>;
}
