import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="grid min-h-[60vh] place-items-center px-5 py-20 text-center">
      <div><p className="text-sm font-black text-orange-800">404</p><h1 className="mt-3 text-4xl font-black tracking-[-.04em] text-slate-950">Deze pagina bestaat niet</h1><p className="mt-4 text-slate-600">Ga terug naar de homepage of vraag direct gratis websiteadvies aan.</p><ButtonLink href="/" className="mt-7">Terug naar home</ButtonLink></div>
    </section>
  );
}
