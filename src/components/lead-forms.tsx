"use client";

import { AlertCircle, Check, LoaderCircle, Send } from "lucide-react";
import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { validateLead, type FieldErrors, type FormKind, type LeadPayload } from "@/lib/lead-validation";
import { fixedPackageOptions, normalizeFixedPackage, normalizeOffer, offerOptions } from "@/lib/offer-options";

const industries = ["Bouw en klus", "Automotive", "Beauty en gezondheid", "Horeca", "Wonen", "Creatieve sector", "Dieren", "Zakelijke dienstverlening", "Retail", "Onderwijs", "Andere branche"];

type AdviceApiResult = {
  ok?: boolean;
  message?: string;
  errors?: FieldErrors;
  submission?: {
    endpoint?: string;
    fields?: Record<string, string>;
  };
};

type FormSubmitResult = {
  success?: boolean | "true" | "false";
  message?: string;
};

async function readAdviceApiResult(response: Response): Promise<AdviceApiResult> {
  const body = await response.text();
  if (body) {
    try {
      const result = JSON.parse(body) as unknown;
      if (result && typeof result === "object") return result as AdviceApiResult;
    } catch (error) {
      console.error("[contact-form] API returned non-JSON", { status: response.status, error });
    }
  }
  if (response.status === 409) return { ok: false, message: "Deze aanvraag is al verwerkt." };
  if (response.status === 429) return { ok: false, message: "Je hebt kort geleden meerdere aanvragen verstuurd. Probeer het later opnieuw." };
  return { ok: response.ok, message: response.ok ? undefined : "Je aanvraag is niet verzonden. Probeer het opnieuw of mail info@sitora.nl." };
}

function FieldError({ message }: { message?: string }) {
  return message ? <span className="flex items-center gap-1.5 text-xs font-bold text-red-700" role="alert"><AlertCircle className="size-3.5" aria-hidden="true" />{message}</span> : null;
}

async function deliverToFormSubmit(submission: AdviceApiResult["submission"]) {
  if (!submission?.endpoint || !submission.fields) {
    console.error("[contact-form] API response did not include a provider submission");
    return false;
  }
  try {
    const response = await fetch(submission.endpoint, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(submission.fields),
    });
    const rawBody = await response.text();
    let result: FormSubmitResult = {};
    if (rawBody) {
      try {
        result = JSON.parse(rawBody) as FormSubmitResult;
      } catch (error) {
        console.error("[contact-form] FormSubmit returned non-JSON", { providerStatus: response.status, error });
      }
    }
    const activationPending = response.ok && /needs activation/i.test(result.message || "");
    const accepted = result.success === true || result.success === "true" || activationPending;
    if (!response.ok || !accepted) {
      console.error("[contact-form] FormSubmit rejected submission", { providerStatus: response.status, providerMessage: result.message });
      return false;
    }
    if (activationPending) console.warn("[contact-form] Submission accepted pending mailbox activation");
    return true;
  } catch (error) {
    console.error("[contact-form] FormSubmit request failed", error);
    return false;
  }
}

async function fingerprint(payload: LeadPayload) {
  if (!globalThis.crypto?.subtle) return "";
  const safePayload = { ...payload, formStartedAt: "", submissionToken: "" };
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(JSON.stringify(safePayload)));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function readFormValue(form: FormData, name: string) {
  return String(form.get(name) || "");
}

function useLeadForm(kind: FormKind) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const formStartedAt = useRef(new Date().toISOString());
  const submitting = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current || loading || submitted) return;
    submitting.current = true;
    const formElement = event.currentTarget;
    setErrors({});
    setFormError("");
    setFormSuccess("");
    const form = new FormData(formElement);
    const query = new URLSearchParams(window.location.search);
    const payload: LeadPayload = {
      kind,
      name: readFormValue(form, "name"),
      company: readFormValue(form, "company"),
      email: readFormValue(form, "email"),
      phone: readFormValue(form, "phone"),
      industry: readFormValue(form, "industry"),
      currentWebsite: readFormValue(form, "currentWebsite"),
      country: readFormValue(form, "country"),
      city: readFormValue(form, "city"),
      projectType: readFormValue(form, "projectType"),
      websiteType: readFormValue(form, "websiteType"),
      pageCount: readFormValue(form, "pageCount"),
      webshop: readFormValue(form, "webshop"),
      appointmentPlanner: readFormValue(form, "appointmentPlanner"),
      aiChat: readFormValue(form, "aiChat"),
      multilingual: readFormValue(form, "multilingual"),
      hasLogo: readFormValue(form, "hasLogo"),
      hasBrandStyle: readFormValue(form, "hasBrandStyle"),
      deliveryDate: readFormValue(form, "deliveryDate"),
      budget: readFormValue(form, "budget"),
      package: readFormValue(form, "package"),
      goal: readFormValue(form, "goal"),
      features: form.getAll("features").map(String),
      startPeriod: readFormValue(form, "startPeriod"),
      message: readFormValue(form, "message"),
      privacy: form.get("privacy") === "on",
      website_url: readFormValue(form, "website_url"),
      sourcePage: `${window.location.pathname}${window.location.search}`,
      referrer: document.referrer,
      utmSource: query.get("utm_source") || "",
      utmMedium: query.get("utm_medium") || "",
      utmCampaign: query.get("utm_campaign") || "",
      utmContent: query.get("utm_content") || "",
      utmTerm: query.get("utm_term") || "",
      formStartedAt: formStartedAt.current,
      submissionToken: crypto.randomUUID(),
    };
    const clientErrors = validateLead(payload);
    if (Object.keys(clientErrors).length) {
      setErrors(clientErrors);
      setFormError("Controleer de gemarkeerde velden.");
      trackEvent("form_error", { form_type: kind, error_type: "validation" });
      window.requestAnimationFrame(() => formElement.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
      submitting.current = false;
      return;
    }

    let payloadFingerprint = "";
    try {
      payloadFingerprint = await fingerprint(payload);
      const previous = JSON.parse(sessionStorage.getItem("sitora:last-form-submission") || "{}") as { fingerprint?: string; submittedAt?: number };
      if (payloadFingerprint && previous.fingerprint === payloadFingerprint && Date.now() - (previous.submittedAt || 0) < 5 * 60_000) {
        setFormError("Deze aanvraag is al ontvangen. Pas de gegevens aan als je iets wilt toevoegen.");
        trackEvent("form_error", { form_type: kind, error_type: "duplicate" });
        submitting.current = false;
        return;
      }
    } catch {
      // Duplicate protection is an enhancement; server validation and rate limiting remain active.
    }

    setLoading(true);
    try {
      const response = await fetch("/api/advies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await readAdviceApiResult(response);
      if (!response.ok || !result.ok) {
        setErrors(result.errors || {});
        setFormError(result.message || "Versturen lukt niet.");
        trackEvent("form_error", { form_type: kind, error_type: response.status === 429 ? "rate_limit" : response.status === 409 ? "duplicate" : "server" });
        return;
      }
      if (result.submission && !(await deliverToFormSubmit(result.submission))) {
        setFormError("Je aanvraag is niet verzonden. Probeer het opnieuw of mail info@sitora.nl.");
        trackEvent("form_error", { form_type: kind, error_type: "delivery" });
        return;
      }
      if (payloadFingerprint) {
        try {
          sessionStorage.setItem("sitora:last-form-submission", JSON.stringify({ fingerprint: payloadFingerprint, submittedAt: Date.now() }));
        } catch {
          // A successful provider delivery must not be hidden when browser storage is unavailable.
        }
      }
      setSubmitted(true);
      setFormSuccess(kind === "custom"
        ? "Bedankt voor je maatwerkaanvraag. Sitora neemt op een werkdag zo snel mogelijk contact met je op met een passende vervolgstap."
        : kind === "package"
          ? "Bedankt voor je pakketaanvraag. Sitora neemt op een werkdag zo snel mogelijk contact met je op voor de kennismaking."
          : "Bedankt! Je aanvraag is succesvol naar Sitora verzonden.");
      trackEvent("form_submit", { form_type: kind });
      formElement.reset();
    } catch (error) {
      console.error("[contact-form] Request failed", error);
      setFormError("Geen verbinding met de server. Controleer je internetverbinding en probeer opnieuw.");
      trackEvent("form_error", { form_type: kind, error_type: "network" });
    } finally {
      setLoading(false);
      submitting.current = false;
    }
  }
  return { submit, loading, submitted, errors, formError, formSuccess };
}

const inputClass = "h-12 w-full rounded-lg bg-slate-100 px-4 text-base text-slate-950 outline-none transition-[background-color,box-shadow] duration-200 focus:bg-white focus:ring-4 focus:ring-orange-500/15";
const textareaClass = `${inputClass} h-auto min-h-28 py-3`;

function FormMessages({ id, error, success }: { id: string; error: string; success: string }) {
  return <>
    {error ? <p id={id} role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-sm font-bold text-red-800">{error}</p> : null}
    {success ? <p role="status" className="mt-5 rounded-xl bg-emerald-50 p-4 text-sm font-bold text-emerald-800"><Check className="mr-2 inline size-4" aria-hidden="true" />{success}</p> : null}
  </>;
}

function Honeypot() {
  return <div className="absolute -left-[10000px]" aria-hidden="true"><label>Website URL<input name="website_url" tabIndex={-1} autoComplete="off" /></label></div>;
}

function PrivacyConsent({ error }: { error?: string }) {
  return <>
    <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-slate-700"><input className="mt-1 size-4 shrink-0 accent-orange-500" type="checkbox" name="privacy" required aria-invalid={!!error} /><span>Ik geef Sitora toestemming om contact op te nemen over deze aanvraag. Lees de <Link href="/privacyverklaring" className="font-bold underline">privacyverklaring</Link>. *</span></label>
    <FieldError message={error} />
  </>;
}

export function CompactAdviceForm({ initialOffer = "overig" }: { initialOffer?: string }) {
  const { submit, loading, submitted, errors, formError, formSuccess } = useLeadForm("compact");
  const offerDefault = normalizeOffer(initialOffer);
  return (
    <form onSubmit={submit} noValidate data-form-type="compact" className="rounded-[1.25rem] border border-white/10 bg-[#f6f3ed] p-6 text-slate-950 sm:p-9" aria-describedby={formError ? "compact-form-error" : undefined}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-black text-slate-800">Naam *<input className={inputClass} name="name" autoComplete="name" maxLength={100} required aria-invalid={!!errors.name} /><FieldError message={errors.name} /></label>
        <label className="grid gap-2 text-sm font-black text-slate-800">Bedrijfsnaam <span className="font-normal text-slate-700">(optioneel)</span><input className={inputClass} name="company" autoComplete="organization" maxLength={140} aria-invalid={!!errors.company} /><FieldError message={errors.company} /></label>
        <label className="grid gap-2 text-sm font-black text-slate-800">E-mailadres *<input className={inputClass} name="email" type="email" autoComplete="email" maxLength={180} required aria-invalid={!!errors.email} /><FieldError message={errors.email} /></label>
        <label className="grid gap-2 text-sm font-black text-slate-800">Telefoonnummer <span className="font-normal text-slate-700">(optioneel)</span><input className={inputClass} name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={40} aria-invalid={!!errors.phone} /><FieldError message={errors.phone} /></label>
        <label className="grid gap-2 text-sm font-black text-slate-800">Branche *<select className={inputClass} name="industry" defaultValue="" required aria-invalid={!!errors.industry}><option value="" disabled>Kies je branche</option>{industries.map((industry) => <option key={industry}>{industry}</option>)}</select><FieldError message={errors.industry} /></label>
        <label className="grid gap-2 text-sm font-black text-slate-800">Huidige website *<select className={inputClass} name="currentWebsite" defaultValue="" required aria-invalid={!!errors.currentWebsite}><option value="" disabled>Kies een optie</option><option>Ik heb nog geen website</option><option>Ik heb al een website</option></select><FieldError message={errors.currentWebsite} /></label>
        <label className="grid gap-2 text-sm font-black text-slate-800 sm:col-span-2">Waarmee kunnen we helpen? *<select key={offerDefault} className={inputClass} name="package" defaultValue={offerDefault} required aria-invalid={!!errors.package}>{offerOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select><FieldError message={errors.package} /></label>
      </div>
      <label className="mt-5 grid gap-2 text-sm font-black text-slate-800">Bericht *<textarea className={textareaClass} name="message" maxLength={2000} required aria-invalid={!!errors.message} placeholder="Vertel kort waar je hulp bij zoekt." /><FieldError message={errors.message} /></label>
      <PrivacyConsent error={errors.privacy} />
      <Honeypot />
      <FormMessages id="compact-form-error" error={formError} success={formSuccess} />
      <button disabled={loading || submitted} type="submit" className="mt-6 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-orange-700 px-5 py-3 font-black text-white transition-[background-color,transform] duration-150 hover:bg-orange-800 active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-60">{loading ? <><LoaderCircle className="size-4 animate-spin" />Bezig met versturen…</> : submitted ? <><Check className="size-4" />Ontvangen</> : <>Ontvang gratis websiteadvies <Send className="size-4" /></>}</button>
      <p className="mt-4 text-xs leading-5 text-slate-700">Vrijblijvend. Na succesvolle verzending nemen we contact met je op.</p>
    </form>
  );
}

export function PackageIntakeForm({ initialPackage }: { initialPackage?: string }) {
  const { submit, loading, submitted, errors, formError, formSuccess } = useLeadForm("package");
  const packageDefault = normalizeFixedPackage(initialPackage);
  return (
    <form onSubmit={submit} noValidate data-form-type="fixed_package" className="rounded-[1.25rem] border border-slate-900/15 bg-white p-6 sm:p-9" aria-describedby={formError ? "package-form-error" : undefined}>
      <div className="mb-7 rounded-2xl border border-orange-200 bg-orange-50 p-5">
        <p className="text-xs font-black uppercase tracking-wider text-orange-700">Gekozen websitepakket</p>
        <p className="mt-2 text-2xl font-black text-slate-950">{fixedPackageOptions.find((item) => item.value === packageDefault)?.label}</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-black">Naam *<input className={inputClass} name="name" autoComplete="name" maxLength={100} required aria-invalid={!!errors.name} /><FieldError message={errors.name} /></label>
        <label className="grid gap-2 text-sm font-black">Bedrijfsnaam *<input className={inputClass} name="company" autoComplete="organization" maxLength={140} required aria-invalid={!!errors.company} /><FieldError message={errors.company} /></label>
        <label className="grid gap-2 text-sm font-black">E-mailadres *<input className={inputClass} name="email" type="email" autoComplete="email" maxLength={180} required aria-invalid={!!errors.email} /><FieldError message={errors.email} /></label>
        <label className="grid gap-2 text-sm font-black">Telefoonnummer *<input className={inputClass} name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={40} required aria-invalid={!!errors.phone} /><FieldError message={errors.phone} /></label>
        <label className="grid gap-2 text-sm font-black sm:col-span-2">Gekozen pakket *<select key={packageDefault} className={inputClass} name="package" defaultValue={packageDefault} required aria-invalid={!!errors.package}>{fixedPackageOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select><FieldError message={errors.package} /></label>
      </div>
      <label className="mt-5 grid gap-2 text-sm font-black">Extra wensen of opmerkingen *<textarea className={textareaClass} name="message" maxLength={2000} required aria-invalid={!!errors.message} placeholder="Vertel kort wat je voor de website nodig hebt." /><FieldError message={errors.message} /></label>
      <PrivacyConsent error={errors.privacy} />
      <Honeypot />
      <FormMessages id="package-form-error" error={formError} success={formSuccess} />
      <button disabled={loading || submitted} type="submit" className="mt-6 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-orange-700 px-5 py-3 font-black text-white transition-[background-color,transform] duration-150 hover:bg-orange-800 active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-60">{loading ? <><LoaderCircle className="size-4 animate-spin" />Aanvraag versturen…</> : submitted ? <><Check className="size-4" />Aanvraag ontvangen</> : <>Plan mijn kennismaking <Send className="size-4" /></>}</button>
      <p className="mt-4 text-center text-xs text-slate-700">Vrijblijvend. Scope en planning worden tijdens de kennismaking bevestigd.</p>
    </form>
  );
}

function YesNoQuestion({ name, label, error }: { name: "webshop" | "appointmentPlanner" | "aiChat" | "multilingual" | "hasLogo" | "hasBrandStyle"; label: string; error?: string }) {
  return <fieldset className="rounded-xl border border-slate-200 p-4" aria-invalid={!!error}>
    <legend className="px-1 text-sm font-black">{label} *</legend>
    <div className="mt-2 flex gap-5">{["Ja", "Nee"].map((answer) => <label key={answer} className="flex min-h-11 items-center gap-2 text-sm font-bold"><input type="radio" name={name} value={answer} required className="size-4 accent-orange-500" />{answer}</label>)}</div>
    <FieldError message={error} />
  </fieldset>;
}

export function CustomQuoteForm() {
  const { submit, loading, submitted, errors, formError, formSuccess } = useLeadForm("custom");
  return (
    <form onSubmit={submit} noValidate data-form-type="custom_quote" className="rounded-[1.25rem] border border-slate-900/15 bg-white p-6 sm:p-9" aria-describedby={formError ? "custom-form-error" : undefined}>
      <div className="mb-8 rounded-2xl bg-[#07111f] p-5 text-white">
        <p className="text-xs font-black uppercase tracking-wider text-orange-400">Offerte voor</p>
        <p className="mt-2 text-2xl font-black">Maatwerk</p>
        <input type="hidden" name="package" value="maatwerk" />
      </div>

      <fieldset>
        <legend className="text-xl font-black text-slate-950">Contactgegevens</legend>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-black">Naam *<input className={inputClass} name="name" autoComplete="name" maxLength={100} required aria-invalid={!!errors.name} /><FieldError message={errors.name} /></label>
          <label className="grid gap-2 text-sm font-black">Bedrijfsnaam *<input className={inputClass} name="company" autoComplete="organization" maxLength={140} required aria-invalid={!!errors.company} /><FieldError message={errors.company} /></label>
          <label className="grid gap-2 text-sm font-black">E-mailadres *<input className={inputClass} name="email" type="email" autoComplete="email" maxLength={180} required aria-invalid={!!errors.email} /><FieldError message={errors.email} /></label>
          <label className="grid gap-2 text-sm font-black">Telefoonnummer *<input className={inputClass} name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={40} required aria-invalid={!!errors.phone} /><FieldError message={errors.phone} /></label>
        </div>
      </fieldset>

      <fieldset className="mt-9 border-t border-slate-200 pt-8">
        <legend className="text-xl font-black text-slate-950">Website en omvang</legend>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-black">Type website *<select className={inputClass} name="websiteType" defaultValue="" required aria-invalid={!!errors.websiteType}><option value="" disabled>Kies een type</option><option>Nieuwe bedrijfswebsite</option><option>Redesign van bestaande website</option><option>Webshop</option><option>Platform, portaal of webapp</option><option>Anders</option></select><FieldError message={errors.websiteType} /></label>
          <label className="grid gap-2 text-sm font-black">Gewenst aantal pagina’s *<input className={inputClass} name="pageCount" type="number" inputMode="numeric" min={1} max={500} placeholder="Bijvoorbeeld 25" required aria-invalid={!!errors.pageCount} /><FieldError message={errors.pageCount} /></label>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <YesNoQuestion name="webshop" label="Webshop gewenst" error={errors.webshop} />
          <YesNoQuestion name="appointmentPlanner" label="Afspraakplanner gewenst" error={errors.appointmentPlanner} />
          <YesNoQuestion name="aiChat" label="AI-chat gewenst" error={errors.aiChat} />
          <YesNoQuestion name="multilingual" label="Meertaligheid gewenst" error={errors.multilingual} />
        </div>
      </fieldset>

      <fieldset className="mt-9 border-t border-slate-200 pt-8">
        <legend className="text-xl font-black text-slate-950">Merk, planning en budget</legend>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <YesNoQuestion name="hasLogo" label="Logo aanwezig" error={errors.hasLogo} />
          <YesNoQuestion name="hasBrandStyle" label="Huisstijl aanwezig" error={errors.hasBrandStyle} />
          <label className="grid gap-2 text-sm font-black">Gewenste opleverdatum *<input className={inputClass} name="deliveryDate" type="date" required aria-invalid={!!errors.deliveryDate} /><FieldError message={errors.deliveryDate} /></label>
          <label className="grid gap-2 text-sm font-black">Budgetindicatie *<select className={inputClass} name="budget" defaultValue="" required aria-invalid={!!errors.budget}><option value="" disabled>Kies een indicatie</option><option>€ 3.500 – € 5.000</option><option>€ 5.000 – € 7.500</option><option>€ 7.500 – € 10.000</option><option>Meer dan € 10.000</option><option>Nog te bepalen</option></select><FieldError message={errors.budget} /></label>
        </div>
      </fieldset>

      <label className="mt-8 grid gap-2 text-sm font-black">Extra wensen *<textarea className={textareaClass} name="message" maxLength={2000} required aria-invalid={!!errors.message} placeholder="Beschrijf functies, koppelingen, doelgroep en andere belangrijke wensen." /><FieldError message={errors.message} /></label>
      <PrivacyConsent error={errors.privacy} />
      <Honeypot />
      <FormMessages id="custom-form-error" error={formError} success={formSuccess} />
      <button disabled={loading || submitted} type="submit" className="mt-6 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-orange-700 px-5 py-3 font-black text-white transition-[background-color,transform] duration-150 hover:bg-orange-800 active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-60">{loading ? <><LoaderCircle className="size-4 animate-spin" />Offerteaanvraag versturen…</> : submitted ? <><Check className="size-4" />Offerteaanvraag ontvangen</> : <>Vraag mijn maatwerkofferte aan <Send className="size-4" /></>}</button>
      <p className="mt-4 text-center text-xs text-slate-700">Vrijblijvend. Sitora beoordeelt eerst de scope en neemt daarna contact met je op.</p>
    </form>
  );
}
