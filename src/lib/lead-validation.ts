import { fixedPackageValues, offerValues } from "./offer-options.ts";

export type FormKind = "compact" | "package" | "custom";
export type YesNo = "Ja" | "Nee";

export type LeadPayload = {
  kind: FormKind;
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  industry?: string;
  currentWebsite?: string;
  country?: string;
  city?: string;
  projectType?: string;
  websiteType?: string;
  pageCount?: string;
  webshop?: YesNo | string;
  appointmentPlanner?: YesNo | string;
  aiChat?: YesNo | string;
  multilingual?: YesNo | string;
  hasLogo?: YesNo | string;
  hasBrandStyle?: YesNo | string;
  deliveryDate?: string;
  budget?: string;
  package?: string;
  goal?: string;
  features?: string[];
  startPeriod?: string;
  message?: string;
  privacy?: boolean;
  website_url?: string;
  sourcePage?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  formStartedAt?: string;
  submissionToken?: string;
};

export type FieldErrors = Partial<Record<keyof LeadPayload, string>>;

const yesNoValues = new Set(["Ja", "Nee"]);

function clean(value: unknown, max = 500) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function normalizeLead(input: unknown): LeadPayload {
  const value = typeof input === "object" && input ? input as Record<string, unknown> : {};
  const kind: FormKind = value.kind === "custom" ? "custom" : value.kind === "package" ? "package" : "compact";
  return {
    kind,
    name: clean(value.name, 100),
    company: clean(value.company, 140),
    email: clean(value.email, 180).toLowerCase(),
    phone: clean(value.phone, 40),
    industry: clean(value.industry, 80),
    currentWebsite: clean(value.currentWebsite, 240),
    country: clean(value.country, 40),
    city: clean(value.city, 120),
    projectType: clean(value.projectType, 80),
    websiteType: clean(value.websiteType, 80),
    pageCount: clean(value.pageCount, 40),
    webshop: clean(value.webshop, 8),
    appointmentPlanner: clean(value.appointmentPlanner, 8),
    aiChat: clean(value.aiChat, 8),
    multilingual: clean(value.multilingual, 8),
    hasLogo: clean(value.hasLogo, 8),
    hasBrandStyle: clean(value.hasBrandStyle, 8),
    deliveryDate: clean(value.deliveryDate, 20),
    budget: clean(value.budget, 80),
    package: clean(value.package, 80),
    goal: clean(value.goal, 300),
    features: Array.isArray(value.features)
      ? value.features.filter((item): item is string => typeof item === "string").map((item) => clean(item, 80)).slice(0, 12)
      : [],
    startPeriod: clean(value.startPeriod, 80),
    message: clean(value.message, 2000),
    privacy: value.privacy === true,
    website_url: clean(value.website_url, 200),
    sourcePage: clean(value.sourcePage, 500),
    referrer: clean(value.referrer, 500),
    utmSource: clean(value.utmSource, 120),
    utmMedium: clean(value.utmMedium, 120),
    utmCampaign: clean(value.utmCampaign, 160),
    utmContent: clean(value.utmContent, 160),
    utmTerm: clean(value.utmTerm, 160),
    formStartedAt: clean(value.formStartedAt, 40),
    submissionToken: clean(value.submissionToken, 80),
  };
}

function validateContactFields(payload: LeadPayload, errors: FieldErrors) {
  if (!payload.name || payload.name.length < 2) errors.name = "Vul je naam in.";
  if (payload.company && payload.company.length < 2) errors.company = "Vul minimaal 2 tekens in of laat dit veld leeg.";
  if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) errors.email = "Vul een geldig e-mailadres in.";
  if (payload.phone && payload.phone.replace(/\D/g, "").length < 8) errors.phone = "Vul een geldig telefoonnummer in of laat dit veld leeg.";
}

export function validateLead(payload: LeadPayload): FieldErrors {
  const errors: FieldErrors = {};
  validateContactFields(payload, errors);

  if (!payload.package || !offerValues.has(payload.package)) {
    errors.package = "Kies een geldige pakket-, onderhouds- of overige vraag.";
  }
  if (!payload.message || payload.message.length < 10) errors.message = "Schrijf minimaal 10 tekens.";
  if (!payload.privacy) errors.privacy = "Geef toestemming om contact met je op te nemen.";

  if (payload.kind === "compact") {
    if (!payload.industry) errors.industry = "Kies je branche.";
    if (!payload.currentWebsite) errors.currentWebsite = "Kies of je al een website hebt.";
  }

  if (payload.kind === "package") {
    if (!payload.company || payload.company.length < 2) errors.company = "Vul je bedrijfsnaam in.";
    if (!payload.phone || payload.phone.replace(/\D/g, "").length < 8) errors.phone = "Vul een bruikbaar telefoonnummer in.";
    if (!payload.package || !fixedPackageValues.has(payload.package)) errors.package = "Kies Starter, Business of Premium.";
  }

  if (payload.kind === "custom") {
    if (!payload.company || payload.company.length < 2) errors.company = "Vul je bedrijfsnaam in.";
    if (!payload.phone || payload.phone.replace(/\D/g, "").length < 8) errors.phone = "Vul een bruikbaar telefoonnummer in.";
    if (payload.package !== "maatwerk") errors.package = "Deze aanvraag is bedoeld voor Maatwerk.";
    if (!payload.websiteType) errors.websiteType = "Kies het type website.";
    const pageCount = Number(payload.pageCount);
    if (!Number.isInteger(pageCount) || pageCount < 1 || pageCount > 500) errors.pageCount = "Vul een aantal tussen 1 en 500 pagina’s in.";
    for (const field of ["webshop", "appointmentPlanner", "aiChat", "multilingual", "hasLogo", "hasBrandStyle"] as const) {
      if (!payload[field] || !yesNoValues.has(payload[field])) errors[field] = "Kies ja of nee.";
    }
    if (!payload.deliveryDate || !/^\d{4}-\d{2}-\d{2}$/.test(payload.deliveryDate)) errors.deliveryDate = "Kies een gewenste opleverdatum.";
    if (!payload.budget) errors.budget = "Kies een budgetindicatie.";
  }

  return errors;
}

export function validateSubmissionMeta(payload: LeadPayload, now = Date.now()) {
  const startedAt = Date.parse(payload.formStartedAt || "");
  if (!Number.isFinite(startedAt) || now - startedAt < 1_200 || now - startedAt > 24 * 60 * 60_000) {
    return "Het formulier is te snel of niet geldig ingevuld. Vernieuw de pagina en probeer het opnieuw.";
  }
  if (!payload.submissionToken || !/^[a-f0-9-]{20,80}$/i.test(payload.submissionToken)) {
    return "De aanvraag mist een geldige verzendcode. Vernieuw de pagina en probeer het opnieuw.";
  }
  return "";
}
