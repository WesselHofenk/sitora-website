import { ArrowDown, Check } from "lucide-react";
import { ButtonLink } from "./ui";

export function HomeHero() {
  return (
    <section className="overflow-hidden bg-[#07111f] text-white">
      <div className="mx-auto max-w-[86rem] px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-20 lg:px-10 lg:pb-24">
        <div className="hero-reveal">
          <p className="text-xs font-black uppercase tracking-[.22em] text-orange-400">Voor mkb, dienstverleners, vakbedrijven en organisaties</p>
          <h1 className="mt-6 max-w-6xl text-balance text-[clamp(2.5rem,8vw,5.5rem)] font-black leading-[.98] tracking-[-.06em]">
            Een heldere website die <span className="text-orange-400">vertrouwen opbouwt en contact eenvoudiger maakt.</span>
          </h1>
        </div>

        <div className="mt-9 grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <div className="max-w-2xl hero-reveal-delayed">
            <p className="text-lg leading-8 text-slate-300 sm:text-xl">Sitora ontwerpt en bouwt maatwerkwebsites voor bedrijven en organisaties in Nederland en Nederlandstalig België. Met een duidelijke scope, transparante pakketprijzen en een logische route voor je bezoekers.</p>
            <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-start">
              <ButtonLink href="/contact#advies">Ontvang gratis websiteadvies</ButtonLink>
              <ButtonLink href="/pakketten" variant="dark">Bekijk de pakketten</ButtonLink>
            </div>
          </div>
          <ul className="grid gap-3 text-sm font-bold text-slate-300 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {["Volledig op maat", "Eenmalige prijzen", "Geen verplicht onderhoud"].map((item) => (
              <li key={item} className="flex items-start gap-2"><Check className="mt-0.5 size-4 shrink-0 text-orange-400" strokeWidth={3} aria-hidden="true" />{item}</li>
            ))}
          </ul>
        </div>

        <figure className="mt-12 hero-visual-reveal sm:mt-16">
          <div className="overflow-hidden rounded-[1.25rem] bg-[#f2eee6] text-slate-950 sm:rounded-[1.75rem]">
            <div className="flex items-center justify-between px-5 py-4 sm:px-7">
              <div className="flex items-center gap-3"><span className="grid size-8 place-items-center rounded-lg bg-orange-500 text-xs font-black text-white">S</span><strong className="text-sm">Studio Meridian</strong></div>
              <div className="hidden items-center gap-7 text-xs font-bold text-slate-600 sm:flex"><span>Expertise</span><span>Cases</span><span>Over ons</span></div>
              <span className="text-xs font-black text-orange-600">Kennismaken ↗</span>
            </div>
            <div className="grid lg:grid-cols-[1fr_1fr]">
              <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-14">
                <p className="text-xs font-black uppercase tracking-[.18em] text-orange-600">Strategie · ontwerp · groei</p>
                <p className="mt-5 max-w-xl text-[clamp(2rem,6vw,3.75rem)] font-black leading-[1.02] tracking-[-.05em]">Een merkervaring die helder richting geeft.</p>
                <p className="mt-5 max-w-md leading-7 text-slate-600">Een concept waarin positionering, bewijs en een duidelijke vervolgstap samenkomen.</p>
                <span className="mt-7 inline-flex min-h-11 w-fit items-center rounded-full bg-[#07111f] px-5 text-sm font-black text-white">Ontdek onze aanpak</span>
              </div>
              <div className="relative m-5 min-h-72 overflow-hidden rounded-2xl bg-[#d9cfbf] sm:min-h-88 lg:m-8">
                <div className="absolute -right-16 -top-16 size-72 rounded-full bg-orange-500/80 blur-2xl" />
                <div className="absolute bottom-[-15%] left-[-10%] size-80 rounded-full bg-blue-950" />
                <div className="absolute inset-10 grid place-items-center rounded-full bg-white/10"><span className="relative z-10 max-w-48 text-center text-2xl font-black text-white">Ontwerp met een eigen signatuur</span></div>
              </div>
            </div>
            <div className="grid gap-3 bg-[#e9e2d7] p-5 sm:grid-cols-3 sm:p-6">
              {["Eigen positionering", "Doordacht ontwerp", "Gerichte conversie"].map((item, index) => (
                <div key={item} className="rounded-xl bg-[#f6f3ed] p-4"><small className="text-slate-500">0{index + 1}</small><p className="mt-2 font-black">{item}</p></div>
              ))}
            </div>
          </div>
          <figcaption className="mt-4 flex flex-col justify-between gap-2 text-xs font-bold text-slate-400 sm:flex-row"><span>Conceptontwerp · geen bestaande klantcase</span><span className="inline-flex items-center gap-2">Scroll voor meer <ArrowDown className="size-3.5" /></span></figcaption>
        </figure>
      </div>
    </section>
  );
}
