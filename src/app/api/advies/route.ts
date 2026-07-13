import { NextRequest, NextResponse } from "next/server";
import { normalizeLead, validateLead, type LeadPayload } from "@/lib/lead-validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FORM_SUBMIT_ENDPOINT = "https://formsubmit.co/ajax/info@sitora.nl";
const attemptsByIp = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60_000;
const RATE_LIMIT_MAX_ATTEMPTS = 3;
const PROVIDER_TIMEOUT_MS = 15_000;

type FormSubmitResult = {
  success?: boolean | "true" | "false";
  message?: string;
};

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

function providerErrorResponse() {
  return NextResponse.json(
    {
      ok: false,
      message: "Je aanvraag is niet verzonden. Probeer het opnieuw of mail info@sitora.nl.",
    },
    { status: 502 },
  );
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
    _subject: `Nieuwe aanvraag voor gratis websiteadvies — ${payload.company}`,
    _template: "table",
    _captcha: "false",
    _replyto: payload.email,
    _url: formSourceUrl(payload.sourcePage),
    Naam: payload.name,
    Bedrijfsnaam: payload.company,
    "E-mailadres": payload.email,
    Telefoonnummer: payload.phone,
    Branche: payload.industry,
    "Huidige website": payload.currentWebsite || "Niet ingevuld",
    Bericht: payload.message,
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

async function deliverLead(payload: LeadPayload, submissionId: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), PROVIDER_TIMEOUT_MS);
  const sourceUrl = formSourceUrl(payload.sourcePage);

  try {
    const response = await fetch(FORM_SUBMIT_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Origin: "https://sitora.nl",
        Referer: sourceUrl,
      },
      body: JSON.stringify(formSubmitFields(payload, submissionId)),
      cache: "no-store",
      signal: controller.signal,
    });

    const rawBody = await response.text();
    let result: FormSubmitResult = {};

    if (rawBody) {
      try {
        result = JSON.parse(rawBody) as FormSubmitResult;
      } catch {
        console.error("[contact-form] FormSubmit returned non-JSON", {
          submissionId,
          providerStatus: response.status,
        });
      }
    }

    const activationPending = response.ok && /needs activation/i.test(result.message || "");
    const accepted = result.success === true || result.success === "true" || activationPending;
    if (!response.ok || !accepted) {
      console.error("[contact-form] FormSubmit rejected submission", {
        submissionId,
        providerStatus: response.status,
        providerMessage: result.message,
      });
      return false;
    }

    if (activationPending) {
      console.warn("[contact-form] FormSubmit accepted submission pending mailbox activation", {
        submissionId,
        providerStatus: response.status,
      });
      return true;
    }

    console.info("[contact-form] FormSubmit accepted submission", {
      submissionId,
      providerStatus: response.status,
    });
    return true;
  } catch (error) {
    console.error("[contact-form] FormSubmit request failed", {
      submissionId,
      errorName: error instanceof Error ? error.name : "UnknownError",
    });
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: NextRequest) {
  const submissionId = crypto.randomUUID();
  let requestBody: unknown;

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
        { status: 200 },
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

    if (!(await deliverLead(payload, submissionId))) return providerErrorResponse();

    return NextResponse.json(
      {
        ok: true,
        message: "Bedankt! Je aanvraag is succesvol naar Sitora verzonden.",
        submissionId,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[contact-form] Unexpected server error", {
      submissionId,
      errorName: error instanceof Error ? error.name : "UnknownError",
    });
    return providerErrorResponse();
  }
}
