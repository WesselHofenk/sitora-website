import { ArrowDown, Check } from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "./ui";

export function HomeHero() {
  return (
    <section className="editorial-grid overflow-hidden bg-[#07111f] text-white">
      <div className="mx-auto max-w-[86rem] px-5 pb-16 pt-16 sm:px-8 sm:pb-24 sm:pt-24 lg:px-10 lg:pb-28">
        <div className="hero-reveal">
          <div className="flex items-center gap-4"><p className="text-xs font-black uppercase tracking-[.22em] text-orange-400">Websites voor vakbedrijven</p><span className="h-px w-12 bg-orange-400/60" aria-hidden="true" /></div>
          <h1 className="mt-7 max-w-6xl text-balance text-[2.8rem] font-black leading-[.98] tracking-[-.06em] sm:text-6xl lg:text-[4.75rem] xl:text-[5.5rem]">
            Een professionele website die <span className="text-orange-400">meer aanvragen oplevert.</span>
          </h1>
        </div>

        <div className="mt-10 grid gap-8 border-t border-white/15 pt-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <div className="max-w-2xl hero-reveal-delayed">
            <p className="text-lg leading-8 text-slate-300 sm:text-xl">Websites voor vak- en bouwbedrijven in Nederland en België. Eerste ontwerp binnen zeven werkdagen nadat alle benodigde informatie compleet is aangeleverd.</p>
            <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row"><ButtonLink href="/contact#advies">Ontvang gratis websiteadvies</ButtonLink><ButtonLink href="/pakketten" variant="dark">Bekijk de pakketten</ButtonLink></div>
          </div>
          <ul className="grid gap-3 text-sm font-bold text-slate-300 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {["Eerste ontwerp binnen 7 werkdagen", "Transparante prijzen", "Gericht op offerteaanvragen"].map((item) => <li key={item} className="flex items-start gap-2"><Check className="mt-0.5 size-4 shrink-0 text-orange-400" strokeWidth={3} aria-hidden="true" />{item}</li>)}
          </ul>
        </div>

        <figure className="mt-14 hero-visual-reveal sm:mt-20">
          <div className="relative overflow-hidden rounded-[1.25rem] bg-[#f2eee6] text-slate-950 sm:rounded-[1.75rem]">
            <div className="flex items-center justify-between border-b border-slate-900/10 px-5 py-4 sm:px-7"><div className="flex items-center gap-3"><span className="grid size-8 place-items-center rounded-lg bg-orange-500 text-xs font-black text-white">B</span><strong className="text-sm">Bouwlijn</strong></div><div className="hidden items-center gap-7 text-xs font-bold text-slate-600 sm:flex"><span>Diensten</span><span>Projecten</span><span>Werkwijze</span></div><span className="text-xs font-black text-orange-600">Project bespreken ↗</span></div>
            <div className="grid lg:min-h-[34rem] lg:grid-cols-[.92fr_1.08fr]">
              <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-16">
                <p className="text-xs font-black uppercase tracking-[.18em] text-orange-600">Renovatie · aanbouw · onderhoud</p>
                <p className="mt-6 max-w-xl text-4xl font-black leading-[1.02] tracking-[-.05em] sm:text-5xl lg:text-6xl">Bouwen met overzicht. Van plan tot oplevering.</p>
                <p className="mt-6 max-w-md leading-7 text-slate-600">Duidelijke werkzaamheden, recent projectwerk en een gerichte route naar een eerste gesprek.</p>
                <span className="mt-8 inline-flex min-h-11 w-fit items-center rounded-full bg-[#07111f] px-5 text-sm font-black text-white">Bekijk onze aanpak</span>
              </div>
              <div className="relative min-h-[22rem] lg:min-h-full"><Image src="/images/concept-aannemer.jpg" alt="Conceptpresentatie voor een aannemerswebsite" fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#07111f]/35 via-transparent to-transparent" /><span className="absolute bottom-6 left-6 max-w-xs text-sm font-bold text-white sm:bottom-8 sm:left-8">Project in beeld<br />Renovatie in uitvoering</span></div>
            </div>
            <div className="grid divide-y divide-slate-900/10 border-t border-slate-900/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0"><div className="p-5 sm:p-6"><small className="text-slate-500">01</small><p className="mt-2 font-black">Diensten per projecttype</p></div><div className="p-5 sm:p-6"><small className="text-slate-500">02</small><p className="mt-2 font-black">Werk met context</p></div><div className="p-5 sm:p-6"><small className="text-slate-500">03</small><p className="mt-2 font-black">Gerichte aanvraag</p></div></div>
          </div>
          <figcaption className="mt-4 flex flex-col justify-between gap-2 text-xs font-bold text-slate-400 sm:flex-row"><span>Conceptontwerp — geen bestaande klantcase</span><span className="inline-flex items-center gap-2">Scroll voor meer <ArrowDown className="size-3.5" /></span></figcaption>
        </figure>
      </div>
    </section>
  );
}
