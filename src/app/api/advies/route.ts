import { createTransport } from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
import { business } from "@/content/site";
import { normalizeLead, validateLead } from "@/lib/lead-validation";

const attemptsByIp = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60_000;
const RATE_LIMIT_MAX_ATTEMPTS = 3;

type SmtpConfiguration = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  password: string;
  recipient: string;
};

function getEmailAddress(value: string | undefined) {
  const normalized = value?.trim().toLowerCase();
  if (!normalized) return undefined;
  return /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(normalized) ? normalized : undefined;
}

function getSmtpConfiguration(): SmtpConfiguration | undefined {
  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT?.trim());
  const secureValue = process.env.SMTP_SECURE?.trim().toLowerCase();
  const secure = secureValue === "true" ? true : secureValue === "false" ? false : undefined;
  const user = getEmailAddress(process.env.SMTP_USER);
  const password = process.env.SMTP_PASSWORD;
  const recipient = getEmailAddress(process.env.LEAD_TO_EMAIL);

  if (
    !host ||
    /\s/.test(host) ||
    !Number.isInteger(port) ||
    port < 1 ||
    port > 65_535 ||
    secure === undefined ||
    !user ||
    !password ||
    !recipient
  ) {
    return undefined;
  }

  return { host, port, secure, user, password, recipient };
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

function smtpErrorResponse() {
  return NextResponse.json(
    {
      ok: false,
      message: "Versturen lukt nu niet. Probeer het later opnieuw of neem rechtstreeks contact op.",
    },
    { status: 500 },
  );
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
        { ok: true, message: "Bedankt! Je aanvraag is succesvol verzonden." },
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

    const smtp = getSmtpConfiguration();
    if (!smtp) {
      console.error("[contact-form] SMTP configuration missing or invalid", { submissionId });
      return smtpErrorResponse();
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

    const transporter = createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      auth: {
        user: smtp.user,
        pass: smtp.password,
      },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
    });

    const submittedAt = new Intl.DateTimeFormat("nl-NL", {
      dateStyle: "full",
      timeStyle: "long",
      timeZone: "Europe/Amsterdam",
    }).format(new Date());

    try {
      const leadEmail = await transporter.sendMail({
        from: { name: "Sitora website", address: smtp.user },
        to: smtp.recipient,
        replyTo: payload.email,
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
      });

      console.info("[contact-form] Lead email accepted by SMTP server", {
        submissionId,
        messageId: leadEmail.messageId,
      });
    } catch (error) {
      console.error("[contact-form] SMTP delivery failed", {
        submissionId,
        errorName: error instanceof Error ? error.name : "UnknownError",
      });
      return smtpErrorResponse();
    }

    try {
      await transporter.sendMail({
        from: { name: "Sitora website", address: smtp.user },
        to: payload.email,
        replyTo: smtp.recipient,
        subject: "We hebben je aanvraag ontvangen — Sitora",
        text: `Hallo ${payload.name},\n\nBedankt voor je aanvraag voor gratis websiteadvies. We hebben je gegevens goed ontvangen en nemen persoonlijk contact met je op.\n\nAanvraagnummer: ${submissionId}\n\nKlantenservice 24/7 bereikbaar\n${business.phoneDisplay}\n${business.email}\n\nMet vriendelijke groet,\n${business.ownerName}\nSitora`,
      });
    } catch (error) {
      console.warn("[contact-form] Lead delivered, but confirmation email failed", {
        submissionId,
        errorName: error instanceof Error ? error.name : "UnknownError",
      });
    }

    return NextResponse.json(
      {
        ok: true,
        message: "Bedankt! Je aanvraag is succesvol verzonden.",
        submissionId,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[contact-form] Unexpected server error", {
      submissionId,
      errorName: error instanceof Error ? error.name : "UnknownError",
    });
    return smtpErrorResponse();
  }
}
