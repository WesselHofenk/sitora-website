import type { LeadPayload } from "./lead-validation.ts";
import { offerLabel } from "./offer-options.ts";

function formSourceUrl(sourcePage: string | undefined) {
  const safePath = sourcePage?.startsWith("/") && !sourcePage.startsWith("//") ? sourcePage : "/contact";
  return new URL(safePath, "https://sitora.nl").toString();
}

export function requestType(payload: LeadPayload) {
  if (payload.kind === "package") return "Vaste pakketaanvraag";
  if (payload.kind === "custom") return "Maatwerkofferte";
  return "Algemene contactaanvraag";
}

export function notificationSubject(payload: LeadPayload) {
  if (payload.kind === "package") return `Nieuwe aanvraag: ${offerLabel(payload.package)}`;
  if (payload.kind === "custom") return "Nieuwe maatwerkofferte aangevraagd";
  return `Nieuwe aanvraag voor gratis websiteadvies — ${payload.company || payload.name}`;
}

export function formSubmitFields(payload: LeadPayload, submissionId: string, now = new Date()) {
  const submittedAt = new Intl.DateTimeFormat("nl-NL", {
    dateStyle: "full",
    timeStyle: "long",
    timeZone: "Europe/Amsterdam",
  }).format(now);

  return {
    _subject: notificationSubject(payload),
    _template: "table",
    _captcha: "false",
    _replyto: payload.email || "",
    _url: formSourceUrl(payload.sourcePage),
    "Type aanvraag": requestType(payload),
    Pakket: offerLabel(payload.package),
    Naam: payload.name || "",
    Bedrijfsnaam: payload.company || "",
    "E-mailadres": payload.email || "",
    Telefoonnummer: payload.phone || "",
    Branche: payload.industry || "-",
    "Huidige website": payload.currentWebsite || "-",
    "Type website": payload.websiteType || payload.projectType || "-",
    "Gewenst aantal pagina’s": payload.pageCount || "-",
    "Webshop gewenst": payload.webshop || "-",
    "Afspraakplanner gewenst": payload.appointmentPlanner || "-",
    "AI-chat gewenst": payload.aiChat || "-",
    "Meertaligheid gewenst": payload.multilingual || "-",
    "Logo aanwezig": payload.hasLogo || "-",
    "Huisstijl aanwezig": payload.hasBrandStyle || "-",
    "Gewenste opleverdatum": payload.deliveryDate || "-",
    Budgetindicatie: payload.budget || "-",
    "Extra wensen of opmerkingen": payload.message || "",
    Land: payload.country || "-",
    "Plaats of werkgebied": payload.city || "-",
    "Belangrijkste bedrijfsdoel": payload.goal || "-",
    "Gewenste functies": payload.features?.join(", ") || "-",
    Startperiode: payload.startPeriod || "-",
    Formulier: payload.kind,
    Bronpagina: payload.sourcePage || "/contact",
    "Verwijzende pagina": payload.referrer || "-",
    "UTM source": payload.utmSource || "-",
    "UTM medium": payload.utmMedium || "-",
    "UTM campaign": payload.utmCampaign || "-",
    "UTM content": payload.utmContent || "-",
    "UTM term": payload.utmTerm || "-",
    Ingediend: submittedAt,
    Aanvraagnummer: submissionId,
  };
}
