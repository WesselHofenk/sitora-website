import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { buildChatbotInstructions } from "@/lib/chatbot-knowledge";

export const dynamic = "force-dynamic";

type ChatRole = "user" | "assistant";
type ChatMessage = { role: ChatRole; content: string };
type OpenAIResponse = {
  output?: Array<{
    type?: string;
    content?: Array<{ type?: string; text?: string }>;
  }>;
};

const attemptsByIp = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60_000;
const RATE_LIMIT_MAX_ATTEMPTS = 20;
const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 600;
const MAX_TOTAL_LENGTH = 5_000;

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
    attemptsByIp.set(ip, activeAttempts);
    return Math.max(1, Math.ceil((RATE_LIMIT_WINDOW_MS - (now - activeAttempts[0])) / 1_000));
  }

  activeAttempts.push(now);
  attemptsByIp.set(ip, activeAttempts);
  return 0;
}

function normalizeMessages(input: unknown): ChatMessage[] | null {
  if (!Array.isArray(input) || input.length === 0 || input.length > MAX_MESSAGES) return null;

  const messages: ChatMessage[] = [];
  let totalLength = 0;

  for (const item of input) {
    if (!item || typeof item !== "object") return null;
    const value = item as Record<string, unknown>;
    if (value.role !== "user" && value.role !== "assistant") return null;
    if (typeof value.content !== "string") return null;
    const content = value.content.trim();
    if (!content || content.length > MAX_MESSAGE_LENGTH) return null;
    totalLength += content.length;
    if (totalLength > MAX_TOTAL_LENGTH) return null;
    messages.push({ role: value.role, content });
  }

  return messages.at(-1)?.role === "user" ? messages : null;
}

function privacySafeIdentifier(ip: string) {
  return createHash("sha256").update(`sitora-chat:${ip}`).digest("hex");
}

function extractOutputText(response: OpenAIResponse) {
  return (response.output || [])
    .filter((item) => item.type === "message")
    .flatMap((item) => item.content || [])
    .filter((content) => content.type === "output_text" && typeof content.text === "string")
    .map((content) => content.text?.trim())
    .filter(Boolean)
    .join("\n")
    .trim();
}

export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID();
  const apiKey = process.env.OPENAI_API_KEY;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Het bericht kon niet worden gelezen." },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  const messages = normalizeMessages(
    body && typeof body === "object" ? (body as Record<string, unknown>).messages : null,
  );
  if (!messages) {
    return NextResponse.json(
      { ok: false, message: "Het gesprek is te lang of bevat een ongeldig bericht." },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  const clientIp = getClientIp(request);
  const retryAfterSeconds = rateLimit(clientIp);
  if (retryAfterSeconds) {
    return NextResponse.json(
      {
        ok: false,
        message: "Er zijn kort na elkaar veel berichten verstuurd. Probeer het over enkele minuten opnieuw.",
      },
      {
        status: 429,
        headers: {
          "Cache-Control": "no-store",
          "Retry-After": String(retryAfterSeconds),
        },
      },
    );
  }

  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        message: "Sitora 24/7 is nog niet geconfigureerd. Neem contact op via de contactpagina.",
      },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const providerResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_CHAT_MODEL || "gpt-5-mini",
        instructions: buildChatbotInstructions(),
        input: messages,
        max_output_tokens: 350,
        text: { verbosity: "low" },
        store: false,
        safety_identifier: privacySafeIdentifier(clientIp),
      }),
      signal: AbortSignal.timeout(20_000),
    });

    const providerRequestId = providerResponse.headers.get("x-request-id");
    const result = await providerResponse.json().catch(() => null) as OpenAIResponse | null;

    if (!providerResponse.ok) {
      console.error("[sitora-chat] OpenAI request failed", {
        requestId,
        providerRequestId,
        providerStatus: providerResponse.status,
      });
      return NextResponse.json(
        {
          ok: false,
          message: providerResponse.status === 429
            ? "Sitora 24/7 is tijdelijk druk. Probeer het zo opnieuw."
            : "Sitora 24/7 kan nu geen antwoord geven. Gebruik de contactpagina voor hulp.",
        },
        { status: providerResponse.status === 429 ? 429 : 502, headers: { "Cache-Control": "no-store" } },
      );
    }

    const answer = result ? extractOutputText(result) : "";
    if (!answer) {
      console.error("[sitora-chat] OpenAI returned no text", { requestId, providerRequestId });
      return NextResponse.json(
        { ok: false, message: "Sitora 24/7 kon geen betrouwbaar antwoord maken. Neem contact op met Sitora." },
        { status: 502, headers: { "Cache-Control": "no-store" } },
      );
    }

    return NextResponse.json(
      { ok: true, answer },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("[sitora-chat] Unexpected server error", {
      requestId,
      errorName: error instanceof Error ? error.name : "UnknownError",
    });
    return NextResponse.json(
      { ok: false, message: "Sitora 24/7 is tijdelijk niet bereikbaar. Probeer het later opnieuw of neem contact op." },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }
}
