import { NextRequest, NextResponse } from "next/server";
import { normalizeLead, validateLead, type LeadPayload } from "@/lib/lead-validation";

export const dynamic = "force-dynamic";

const FORM_SUBMIT_ENDPOINT = "https://formsubmit.co/ajax/info@sitora.nl";
const attemptsByIp = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60_000;
const RATE_LIMIT_MAX_ATTEMPTS = 3;

function getClientIp(request: NextRequest) {
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "local"
  );
}

function rateLimit(ip: string) {
  const now = Date.now();
  const activeAttempts = (attemptsByIp.get(ip) || []).filter(
    (attemptedAt) => now - attemptedAt < RATE_LIMIT_WINDOW_MS,
  );

  if (activeAttempts.length >= RATE_LIMIT_MAX_ATTEMPTS) {
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((RATE_LIMIT_WINDOW_MS - (now - activeAttempts[0])) / 1_000),
    );
    attemptsByIp.set(ip, activeAttempts);
    return retryAfterSeconds;
  }

  activeAttempts.push(now);
  attemptsByIp.set(ip, activeAttempts);
  return 0;
}

function formSourceUrl(sourcePage: string | undefined) {
  const safePath = sourcePage?.startsWith("/") && !sourcePage.startsWith("//")
    ? sourcePage
    : "/contact";
  return new URL(safePath, "https://sitora.nl").toString();
}

function formSubmitFields(payload: LeadPayload, submissionId: string) {
  const submittedAt = new Intl.DateTimeFormat("nl-NL", {
    dateStyle: "full",
    timeStyle: "long",
    timeZone: "Europe/Amsterdam",
  }).format(new Date());

  return {
    _subject: `Nieuwe aanvraag voor gratis websiteadvies — ${payload.company || payload.name}`,
    _template: "table",
    _captcha: "false",
    _replyto: payload.email || "",
    _url: formSourceUrl(payload.sourcePage),
    Naam: payload.name || "",
    Bedrijfsnaam: payload.company || "",
    "E-mailadres": payload.email || "",
    Telefoonnummer: payload.phone || "",
    Branche: payload.industry || "",
    "Huidige website": payload.currentWebsite || "Niet ingevuld",
    Bericht: payload.message || "",
    Land: payload.country || "-",
    "Plaats of werkgebied": payload.city || "-",
    Project: payload.projectType || "-",
    Pakket: payload.package || "-",
    "Belangrijkste bedrijfsdoel": payload.goal || "-",
    "Gewenste functies": payload.features?.join(", ") || "-",
    Startperiode: payload.startPeriod || "-",
    Formulier: payload.kind,
    Bronpagina: payload.sourcePage || "/contact",
    Ingediend: submittedAt,
    Aanvraagnummer: submissionId,
  };
}

export async function POST(request: NextRequest) {
  const submissionId = crypto.randomUUID();
  let requestBody: unknown;

  const declaredSize = Number(request.headers.get("content-length") || 0);
  if (declaredSize > 25_000) {
    return NextResponse.json({ ok: false, message: "De aanvraag is te groot." }, { status: 413 });
  }

  try {
    requestBody = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "De aanvraag bevat geen geldige gegevens." },
      { status: 400 },
    );
  }

  try {
    const payload = normalizeLead(requestBody);

    // Bots that fill this visually hidden field get a silent success response.
    if (payload.website_url) {
      return NextResponse.json(
        { ok: true, message: "Bedankt! Je aanvraag is ontvangen." },
        { status: 200, headers: { "Cache-Control": "no-store" } },
      );
    }

    const errors = validateLead(payload);
    if (Object.keys(errors).length) {
      return NextResponse.json(
        { ok: false, message: "Controleer de gemarkeerde velden.", errors },
        { status: 400 },
      );
    }

    const retryAfterSeconds = rateLimit(getClientIp(request));
    if (retryAfterSeconds) {
      console.warn("[contact-form] Rate limit reached", { submissionId });
      return NextResponse.json(
        {
          ok: false,
          message: "Je hebt kort geleden meerdere aanvragen verstuurd. Probeer het later opnieuw.",
        },
        {
          status: 429,
          headers: { "Retry-After": String(retryAfterSeconds) },
        },
      );
    }

    return NextResponse.json(
      {
        ok: true,
        submission: {
          endpoint: FORM_SUBMIT_ENDPOINT,
          fields: formSubmitFields(payload, submissionId),
        },
      },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("[contact-form] Unexpected server error", {
      submissionId,
      errorName: error instanceof Error ? error.name : "UnknownError",
    });
    return NextResponse.json(
      {
        ok: false,
        message: "Je aanvraag kon niet worden gecontroleerd. Probeer het opnieuw of mail info@sitora.nl.",
      },
      { status: 500 },
    );
  }
}
