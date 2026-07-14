export type FormKind = "compact" | "detailed";

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
  package?: string;
  goal?: string;
  features?: string[];
  startPeriod?: string;
  message?: string;
  privacy?: boolean;
  website_url?: string;
  sourcePage?: string;
};

export type FieldErrors = Partial<Record<keyof LeadPayload, string>>;

function clean(value: unknown, max = 500) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function normalizeLead(input: unknown): LeadPayload {
  const value = typeof input === "object" && input ? input as Record<string, unknown> : {};
  return {
    kind: value.kind === "detailed" ? "detailed" : "compact",
    name: clean(value.name, 100), company: clean(value.company, 140), email: clean(value.email, 180).toLowerCase(), phone: clean(value.phone, 40),
    industry: clean(value.industry, 80), currentWebsite: clean(value.currentWebsite, 240), country: clean(value.country, 40), city: clean(value.city, 120),
    projectType: clean(value.projectType, 80), package: clean(value.package, 80), goal: clean(value.goal, 300),
    features: Array.isArray(value.features) ? value.features.filter((item): item is string => typeof item === "string").map((item) => clean(item, 80)).slice(0, 12) : [],
    startPeriod: clean(value.startPeriod, 80), message: clean(value.message, 2000), privacy: value.privacy === true, website_url: clean(value.website_url, 200), sourcePage: clean(value.sourcePage, 160),
  };
}

export function validateLead(payload: LeadPayload): FieldErrors {
  const errors: FieldErrors = {};
  if (!payload.name || payload.name.length < 2) errors.name = "Vul je naam in.";
  if (!payload.company || payload.company.length < 2) errors.company = "Vul je bedrijfsnaam in.";
  if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) errors.email = "Vul een geldig e-mailadres in.";
  if (!payload.phone || payload.phone.replace(/\D/g, "").length < 8) errors.phone = "Vul een geldig telefoonnummer in.";
  if (!payload.industry) errors.industry = "Kies je branche.";
  if (!payload.package) errors.package = "Kies een pakket, onderhoudsoptie of overige vraag.";
  if (payload.kind === "compact" && !payload.currentWebsite) errors.currentWebsite = "Kies of je al een website hebt.";
  if (!payload.message || payload.message.length < 10) errors.message = "Schrijf een bericht van minimaal 10 tekens.";
  if (!payload.privacy) errors.privacy = "Geef toestemming om contact met je op te nemen.";
  if (payload.kind === "detailed") {
    if (!payload.country) errors.country = "Kies Nederland of België.";
    if (!payload.city) errors.city = "Vul je plaats of werkgebied in.";
    if (!payload.projectType) errors.projectType = "Kies nieuwbouw of redesign.";
    if (!payload.goal) errors.goal = "Beschrijf je belangrijkste doel.";
    if (!payload.startPeriod) errors.startPeriod = "Kies een gewenste startperiode.";
  }
  return errors;
}
