"use client";

import { AlertCircle, Check, LoaderCircle, Send } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { validateLead, type FieldErrors, type FormKind, type LeadPayload } from "@/lib/lead-validation";
import Link from "next/link";

const industries = ["Loodgieter", "Elektricien", "Schilder", "Dakdekker", "Aannemer / bouwbedrijf", "Installatiebedrijf", "Ander vakbedrijf"];

type AdviceApiResult = {
  ok?: boolean;
  message?: string;
  errors?: FieldErrors;
};

async function readAdviceApiResult(response: Response): Promise<AdviceApiResult> {
  const body = await response.text();

  if (body) {
    try {
      const result = JSON.parse(body) as unknown;
      if (result && typeof result === "object") return result as AdviceApiResult;
    } catch (error) {
      console.error("[contact-form] API returned non-JSON", { status: response.status, error });
      // A proxy or hosting platform can return plain text or HTML. Do not show
      // that raw response in the page; the status-specific fallback below is safer.
    }
  }

  if (response.status === 429) {
    return { ok: false, message: "Je hebt kort geleden meerdere aanvragen verstuurd. Probeer het later opnieuw." };
  }
  return { ok: response.ok, message: response.ok ? undefined : "Je aanvraag is niet verzonden. Probeer het opnieuw of mail info@sitora.nl." };
}

function FieldError({ message }: { message?: string }) { return message ? <span className="flex items-center gap-1.5 text-xs font-bold text-red-700" role="alert"><AlertCircle className="size-3.5" />{message}</span> : null; }

function useLeadForm(kind: FormKind) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading || submitted) return;
    const formElement = event.currentTarget;
    setErrors({}); setFormError(""); setFormSuccess("");
    const form = new FormData(formElement);
    const payload: LeadPayload = {
      kind,
      name: String(form.get("name") || ""), company: String(form.get("company") || ""), email: String(form.get("email") || ""), phone: String(form.get("phone") || ""),
      industry: String(form.get("industry") || ""), currentWebsite: String(form.get("currentWebsite") || ""), country: String(form.get("country") || ""), city: String(form.get("city") || ""),
      projectType: String(form.get("projectType") || ""), package: String(form.get("package") || ""), goal: String(form.get("goal") || ""), features: form.getAll("features").map(String),
      startPeriod: String(form.get("startPeriod") || ""), message: String(form.get("message") || ""), privacy: form.get("privacy") === "on", website_url: String(form.get("website_url") || ""),
      sourcePage: window.location.pathname,
    };
    const clientErrors = validateLead(payload);
    if (Object.keys(clientErrors).length) {
      setErrors(clientErrors);
      setFormError("Controleer de gemarkeerde velden.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/advies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await readAdviceApiResult(response);
      if (!response.ok || !result.ok) { setErrors(result.errors || {}); setFormError(result.message || "Versturen lukt niet."); return; }
      setSubmitted(true);
      setFormSuccess(result.message || "Bedankt! Je aanvraag is succesvol naar Sitora verzonden.");
      formElement.reset();
    } catch (error) {
      console.error("[contact-form] Request failed", error);
      setFormError("Geen verbinding met de server. Controleer je internetverbinding en probeer opnieuw.");
    }
    finally { setLoading(false); }
  }
  return { submit, loading, submitted, errors, formError, formSuccess };
}

const inputClass = "h-12 w-full rounded-lg border border-slate-900/20 bg-white px-4 text-base text-slate-950 outline-none transition-[border-color,box-shadow] duration-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10";
const textareaClass = `${inputClass} h-auto min-h-28 py-3`;

export function CompactAdviceForm() {
  const { submit, loading, submitted, errors, formError, formSuccess } = useLeadForm("compact");
  return (
    <form onSubmit={submit} noValidate className="rounded-[1.25rem] border border-white/10 bg-[#f6f3ed] p-6 text-slate-950 sm:p-9" aria-describedby={formError ? "compact-form-error" : undefined}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-black text-slate-800">Naam <span aria-hidden="true" className="text-orange-600">*</span><input className={inputClass} name="name" autoComplete="name" required aria-invalid={!!errors.name} /><FieldError message={errors.name} /></label>
        <label className="grid gap-2 text-sm font-black text-slate-800">Bedrijfsnaam <span aria-hidden="true" className="text-orange-600">*</span><input className={inputClass} name="company" autoComplete="organization" required aria-invalid={!!errors.company} /><FieldError message={errors.company} /></label>
        <label className="grid gap-2 text-sm font-black text-slate-800">E-mailadres <span aria-hidden="true" className="text-orange-600">*</span><input className={inputClass} name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} /><FieldError message={errors.email} /></label>
        <label className="grid gap-2 text-sm font-black text-slate-800">Telefoonnummer <span aria-hidden="true" className="text-orange-600">*</span><input className={inputClass} name="phone" type="tel" autoComplete="tel" required aria-invalid={!!errors.phone} /><FieldError message={errors.phone} /></label>
        <label className="grid gap-2 text-sm font-black text-slate-800">Branche <span aria-hidden="true" className="text-orange-600">*</span><select className={inputClass} name="industry" defaultValue="" required aria-invalid={!!errors.industry}><option value="" disabled>Kies je branche</option>{industries.map((industry) => <option key={industry}>{industry}</option>)}</select><FieldError message={errors.industry} /></label>
        <label className="grid gap-2 text-sm font-black text-slate-800">Huidige website <span aria-hidden="true" className="text-orange-600">*</span><select className={inputClass} name="currentWebsite" defaultValue="" required aria-invalid={!!errors.currentWebsite}><option value="" disabled>Kies een optie</option><option>Ik heb nog geen website</option><option>Ik heb al een website</option></select><FieldError message={errors.currentWebsite} /></label>
      </div>
      <label className="mt-5 grid gap-2 text-sm font-black text-slate-800">Bericht <span aria-hidden="true" className="text-orange-600">*</span><textarea className={textareaClass} name="message" required aria-invalid={!!errors.message} placeholder="Vertel kort waar je hulp bij zoekt." /><FieldError message={errors.message} /></label>
      <label className="mt-5 flex items-start gap-3 text-sm leading-6 text-slate-700"><input className="mt-1 size-4 shrink-0 accent-orange-500" type="checkbox" name="privacy" required aria-invalid={!!errors.privacy} /><span>Ik geef Sitora toestemming om contact op te nemen over deze aanvraag. Lees de <Link href="/privacyverklaring" className="font-bold underline">privacyverklaring</Link>. *</span></label><FieldError message={errors.privacy} />
      <div className="absolute -left-[10000px]" aria-hidden="true"><label>Website URL<input name="website_url" tabIndex={-1} autoComplete="off" /></label></div>
      {formError ? <p id="compact-form-error" role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-800">{formError}</p> : null}
      {formSuccess ? <p role="status" className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm font-bold text-emerald-800"><Check className="mr-2 inline size-4" />{formSuccess}</p> : null}
      <button disabled={loading || submitted} type="submit" className="mt-6 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-orange-500 px-5 py-3 font-black text-white transition-[background-color,transform] duration-150 hover:bg-orange-600 active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-60">{loading ? <><LoaderCircle className="size-4 animate-spin" />Bezig met versturen…</> : submitted ? <><Check className="size-4" />Ontvangen</> : <>Ontvang gratis websiteadvies <Send className="size-4" /></>}</button>
      <p className="mt-4 text-xs leading-5 text-slate-500">Vrijblijvend. Na succesvolle verzending nemen we persoonlijk contact met je op.</p>
    </form>
  );
}

export function DetailedAdviceForm() {
  const searchParams = useSearchParams();
  const { submit, loading, submitted, errors, formError, formSuccess } = useLeadForm("detailed");
  const packageDefault = searchParams.get("pakket") || "unknown";
  const features = ["Aparte dienstenpagina's", "Projectportfolio", "Meerdere werkgebieden", "Vacaturepagina", "Reviews-koppeling", "Analytics en conversiemeting"];
  return (
    <form onSubmit={submit} noValidate className="rounded-[1.25rem] border border-slate-900/15 bg-white p-6 sm:p-9" aria-describedby={formError ? "detailed-form-error" : undefined}>
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-black">Naam *<input className={inputClass} name="name" autoComplete="name" required aria-invalid={!!errors.name} /><FieldError message={errors.name} /></label>
        <label className="grid gap-2 text-sm font-black">Bedrijfsnaam *<input className={inputClass} name="company" autoComplete="organization" required aria-invalid={!!errors.company} /><FieldError message={errors.company} /></label>
        <label className="grid gap-2 text-sm font-black">E-mailadres *<input className={inputClass} name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} /><FieldError message={errors.email} /></label>
        <label className="grid gap-2 text-sm font-black">Telefoonnummer *<input className={inputClass} name="phone" type="tel" autoComplete="tel" required aria-invalid={!!errors.phone} /><FieldError message={errors.phone} /></label>
        <label className="grid gap-2 text-sm font-black">Branche *<select className={inputClass} name="industry" defaultValue="" required aria-invalid={!!errors.industry}><option value="" disabled>Kies je branche</option>{industries.map((industry) => <option key={industry}>{industry}</option>)}</select><FieldError message={errors.industry} /></label>
        <label className="grid gap-2 text-sm font-black">Land *<select className={inputClass} name="country" defaultValue="" required aria-invalid={!!errors.country}><option value="" disabled>Kies een land</option><option>Nederland</option><option>België</option></select><FieldError message={errors.country} /></label>
        <label className="grid gap-2 text-sm font-black">Plaats of werkgebied *<input className={inputClass} name="city" autoComplete="address-level2" required aria-invalid={!!errors.city} /><FieldError message={errors.city} /></label>
        <label className="grid gap-2 text-sm font-black">Huidige website<input className={inputClass} name="currentWebsite" type="url" placeholder="https:// of leeg laten" /></label>
        <label className="grid gap-2 text-sm font-black">Project *<select className={inputClass} name="projectType" defaultValue="" required aria-invalid={!!errors.projectType}><option value="" disabled>Kies een project</option><option value="new">Nieuwe website</option><option value="redesign">Bestaande website vernieuwen</option></select><FieldError message={errors.projectType} /></label>
        <label className="grid gap-2 text-sm font-black">Voorkeurspakket *<select className={inputClass} name="package" defaultValue={packageDefault} required aria-invalid={!!errors.package}><option value="unknown">Ik weet het nog niet</option><option value="start">Sitora Start</option><option value="professional">Sitora Professional</option><option value="groei">Sitora Maatwerk</option><option value="abonnement">Website-abonnement</option></select><FieldError message={errors.package} /></label>
      </div>
      <label className="mt-6 grid gap-2 text-sm font-black">Belangrijkste bedrijfsdoel *<textarea className={textareaClass} name="goal" required aria-invalid={!!errors.goal} placeholder="Bijvoorbeeld: meer aanvragen voor renovaties in regio Utrecht" /><FieldError message={errors.goal} /></label>
      <fieldset className="mt-6"><legend className="text-sm font-black">Gewenste functies</legend><div className="mt-3 grid gap-3 sm:grid-cols-2">{features.map((feature) => <label key={feature} className="flex min-h-11 items-center gap-3 rounded-xl border border-slate-200 p-3 text-sm font-bold"><input type="checkbox" name="features" value={feature} className="size-4 accent-orange-500" />{feature}</label>)}</div></fieldset>
      <label className="mt-6 grid gap-2 text-sm font-black">Gewenste startperiode *<select className={inputClass} name="startPeriod" defaultValue="" required aria-invalid={!!errors.startPeriod}><option value="" disabled>Kies een periode</option><option>Zo snel mogelijk</option><option>Binnen 1–2 maanden</option><option>Binnen 3 maanden</option><option>Later / eerst oriënteren</option></select><FieldError message={errors.startPeriod} /></label>
      <label className="mt-6 grid gap-2 text-sm font-black">Aanvullende informatie *<textarea className={textareaClass} name="message" required aria-invalid={!!errors.message} placeholder="Vertel wat voor ons nog handig is om te weten." /><FieldError message={errors.message} /></label>
      <label className="mt-6 flex items-start gap-3 text-sm leading-6"><input className="mt-1 size-4 shrink-0 accent-orange-500" type="checkbox" name="privacy" required aria-invalid={!!errors.privacy} /><span>Ik geef Sitora toestemming om mijn gegevens te gebruiken om contact op te nemen over deze aanvraag. Lees de <Link href="/privacyverklaring" className="font-bold underline">privacyverklaring</Link>. *</span></label><FieldError message={errors.privacy} />
      <div className="absolute -left-[10000px]" aria-hidden="true"><label>Website URL<input name="website_url" tabIndex={-1} autoComplete="off" /></label></div>
      {formError ? <p id="detailed-form-error" role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-sm font-bold text-red-800">{formError}</p> : null}
      {formSuccess ? <p role="status" className="mt-5 rounded-xl bg-emerald-50 p-4 text-sm font-bold text-emerald-800"><Check className="mr-2 inline size-4" />{formSuccess}</p> : null}
      <button disabled={loading || submitted} type="submit" className="mt-6 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-orange-500 px-5 py-3 font-black text-white transition-[background-color,transform] duration-150 hover:bg-orange-600 active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-60">{loading ? <><LoaderCircle className="size-4 animate-spin" />Aanvraag versturen…</> : submitted ? <><Check className="size-4" />Aanvraag ontvangen</> : <>Ontvang gratis websiteadvies <Send className="size-4" /></>}</button>
      <p className="mt-4 text-center text-xs text-slate-500">Versturen is vrijblijvend. Na succesvolle verzending nemen we persoonlijk contact met je op.</p>
    </form>
  );
}
