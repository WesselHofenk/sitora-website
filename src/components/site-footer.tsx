import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { business, contact, navigation, sectors } from "@/content/site";
import { CookieSettingsButton } from "./cookie-consent";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="bg-[#040b14] pb-10 pt-20 text-slate-300 sm:pt-28">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 border-b border-white/10 pb-16 lg:grid-cols-[1.35fr_.65fr] lg:items-end">
          <div><Logo light /><p className="mt-8 max-w-4xl text-3xl font-black leading-[1.08] tracking-[-.045em] text-white sm:text-4xl lg:text-5xl">Maatwerkwebsites voor bedrijven met een eigen verhaal.</p></div>
          <Link href="/contact#advies" className="group inline-flex min-h-12 w-fit items-center gap-3 rounded-full bg-orange-500 px-6 font-black text-white transition-colors hover:bg-orange-600 lg:justify-self-end">Gratis websiteadvies <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></Link>
        </div>

        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.15fr_1fr_1fr_.85fr]">
          <div><p className="max-w-sm leading-7 text-slate-400">Sitora ontwerpt unieke, conversiegerichte websites voor ondernemers en organisaties in Nederland en België.</p><div className="mt-7 space-y-2 text-sm">{contact.phoneHref ? <a className="flex min-h-11 items-center gap-3 hover:text-white" href={`tel:${contact.phoneHref}`}><Phone className="size-4 text-orange-400" />{contact.phoneDisplay}</a> : null}<a className="flex min-h-11 items-center gap-3 hover:text-white" href={`mailto:${contact.email}`}><Mail className="size-4 text-orange-400" />{contact.email}</a><p className="flex min-h-11 items-center gap-3"><MapPin className="size-4 text-orange-400" />{contact.location}</p></div></div>
          <div><h2 className="text-xs font-black uppercase tracking-[.18em] text-orange-400">Branches</h2><ul className="mt-5 grid grid-cols-2 gap-x-3">{sectors.map((sector) => <li key={sector.slug}><Link className="inline-flex min-h-10 items-center text-sm hover:text-white" href={`/${sector.slug}`}>{sector.plural}</Link></li>)}</ul></div>
          <div><h2 className="text-xs font-black uppercase tracking-[.18em] text-orange-400">Sitora</h2><ul className="mt-5 space-y-1">{navigation.map((item) => <li key={item.label}><Link className="inline-flex min-h-10 items-center text-sm hover:text-white" href={item.href}>{item.label}</Link></li>)}</ul></div>
          <div><h2 className="text-xs font-black uppercase tracking-[.18em] text-orange-400">Duidelijk geregeld</h2><div className="mt-5 flex flex-col items-start"><Link href="/privacyverklaring" className="inline-flex min-h-10 items-center text-sm hover:text-white">Privacyverklaring</Link><Link href="/cookieverklaring" className="inline-flex min-h-10 items-center text-sm hover:text-white">Cookieverklaring</Link><Link href="/algemene-voorwaarden" className="inline-flex min-h-10 items-center text-sm hover:text-white">Algemene voorwaarden</Link><CookieSettingsButton /></div><p className="mt-5 text-xs leading-5 text-slate-500">Geen verplicht onderhoudsabonnement. Onderhoud is beschikbaar per beurt.</p></div>
        </div>
        <div className="flex flex-col gap-2 border-t border-white/10 pt-7 text-xs text-slate-500 sm:flex-row sm:justify-between"><p>© {new Date().getFullYear()} Sitora · {business.ownerName} · KvK {business.chamberOfCommerce} · btw {business.vatNumber}</p><p>{business.openingHours}</p></div>
      </div>
    </footer>
  );
}
