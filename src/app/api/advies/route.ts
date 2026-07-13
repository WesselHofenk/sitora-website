import { NextRequest, NextResponse } from "next/server";
import { normalizeLead, validateLead } from "@/lib/lead-validation";
import { business } from "@/content/site";

const attemptsByIp = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60_000;
const RATE_LIMIT_MAX_ATTEMPTS = 3;
const LEAD_RECIPIENT = "info@sitora.nl";

type EmailResult =
  | { ok: true; providerId?: string }
  | { ok: false; status: number };

function getEmailAddress(value: string | undefined) {
  const normalized = value?.trim();
  if (!normalized) return undefined;

  const address = normalized.match(/<([^<>]+)>$/)?.[1]?.trim() || normalized;
  return /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(address) ? address.toLowerCase() : undefined;
}

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

async function sendWithResend({
  apiKey,
  body,
  event,
  submissionId,
}: {
  apiKey: string;
  body: Record<string, unknown>;
  event: "lead" | "confirmation";
  submissionId: string;
}): Promise<EmailResult> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const result = (await response.json().catch(() => ({}))) as { id?: unknown };
  const providerId = typeof result.id === "string" ? result.id : undefined;
  const providerRequestId = response.headers.get("x-request-id") || undefined;

  if (!response.ok) {
    console.error("[contact-form] Provider rejected email", {
      event,
      submissionId,
      providerStatus: response.status,
      providerRequestId,
    });
    return { ok: false, status: response.status };
  }

  console.info("[contact-form] Provider accepted email", {
    event,
    submissionId,
    providerId,
    providerStatus: response.status,
  });
  return { ok: true, providerId };
}

export async function POST(request: NextRequest) {
  const submissionId = crypto.randomUUID();

  try {
    const payload = normalizeLead(await request.json());

    // Bots that fill this visually hidden field get a silent success response.
    if (payload.website_url) {
      return NextResponse.json({ ok: true });
    }

    const errors = validateLead(payload);
    if (Object.keys(errors).length) {
      return NextResponse.json(
        { ok: false, message: "Controleer de gemarkeerde velden.", errors },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY?.trim();
    const from = process.env.LEAD_FROM_EMAIL?.trim();
    const fromAddress = getEmailAddress(from);
    const configuredRecipient = getEmailAddress(process.env.LEAD_TO_EMAIL);
    const apiKeyIsValid = Boolean(apiKey?.startsWith("re_") && apiKey.length > 12);

    // The public form must never be redirected to an address supplied through a
    // stale or incorrectly configured environment variable. LEAD_TO_EMAIL is kept
    // for backwards-compatible deployment configuration, but the real recipient
    // is deliberately fixed here.
    if (configuredRecipient && configuredRecipient !== LEAD_RECIPIENT) {
      console.warn("[contact-form] Ignoring unexpected LEAD_TO_EMAIL", {
        submissionId,
        recipientIsExpected: false,
      });
    }

    if (!apiKey || !apiKeyIsValid || !from || !fromAddress) {
      console.error("[contact-form] Email configuration missing or invalid", {
        submissionId,
        hasValidApiKey: apiKeyIsValid,
        hasFromAddress: Boolean(from),
        fromAddressIsValid: Boolean(fromAddress),
      });
      return NextResponse.json(
        {
          ok: false,
          code: "EMAIL_NOT_CONFIGURED",
          message: "Het formulier is tijdelijk niet beschikbaar. Bel, WhatsApp of mail ons rechtstreeks.",
        },
        { status: 503 },
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

    console.info("[contact-form] Valid submission received", {
      submissionId,
      kind: payload.kind,
      sourcePage: payload.sourcePage || "unknown",
    });

    const submittedAt = new Intl.DateTimeFormat("nl-NL", {
      dateStyle: "full",
      timeStyle: "long",
      timeZone: "Europe/Amsterdam",
    }).format(new Date());

    const leadEmail = await sendWithResend({
      apiKey,
      event: "lead",
      submissionId,
      body: {
        from,
        to: [LEAD_RECIPIENT],
        reply_to: payload.email,
        subject: `Nieuwe aanvraag voor gratis websiteadvies — ${payload.company}`,
        text: [
          `Ingediend: ${submittedAt}`,
          `Aanvraagnummer: ${submissionId}`,
          `Bronpagina: ${payload.sourcePage || "Onbekend"}`,
          `Formulier: ${payload.kind}`,
          `Naam: ${payload.name}`,
          `Bedrijf: ${payload.company}`,
          `E-mail: ${payload.email}`,
          `Telefoon: ${payload.phone}`,
          `Branche: ${payload.industry}`,
          `Website: ${payload.currentWebsite || "Geen"}`,
          `Land: ${payload.country || "-"}`,
          `Plaats/werkgebied: ${payload.city || "-"}`,
          `Project: ${payload.projectType || "-"}`,
          `Pakket: ${payload.package || "-"}`,
          `Doel: ${payload.goal || "-"}`,
          `Functies: ${payload.features?.join(", ") || "-"}`,
          `Startperiode: ${payload.startPeriod || "-"}`,
          `Bericht: ${payload.message}`,
        ].join("\n"),
      },
    });

    if (!leadEmail.ok) {
      return NextResponse.json(
        {
          ok: false,
          message: "Versturen lukt nu niet. Probeer het later opnieuw of neem rechtstreeks contact op.",
        },
        { status: 502 },
      );
    }

    const confirmationEmail = await sendWithResend({
      apiKey,
      event: "confirmation",
      submissionId,
      body: {
        from,
        to: [payload.email],
        reply_to: LEAD_RECIPIENT,
        subject: "We hebben je aanvraag ontvangen — Sitora",
        text: `Hallo ${payload.name},\n\nBedankt voor je aanvraag voor gratis websiteadvies. We hebben je gegevens goed ontvangen en nemen persoonlijk contact met je op.\n\nAanvraagnummer: ${submissionId}\n\nKlantenservice 24/7 bereikbaar\n${business.phoneDisplay}\n${business.email}\n\nMet vriendelijke groet,\n${business.ownerName}\nSitora`,
      },
    });

    if (!confirmationEmail.ok) {
      console.warn("[contact-form] Lead delivered, but confirmation failed", {
        submissionId,
        providerStatus: confirmationEmail.status,
      });
    }

    return NextResponse.json({ ok: true, submissionId });
  } catch (error) {
    console.error("[contact-form] Unexpected server error", {
      submissionId,
      errorName: error instanceof Error ? error.name : "UnknownError",
    });
    return NextResponse.json(
      { ok: false, message: "Er ging iets mis. Controleer je verbinding en probeer opnieuw." },
      { status: 500 },
    );
  }
}
