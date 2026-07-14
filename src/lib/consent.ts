export const CONSENT_VERSION = 2;
export const CONSENT_STORAGE_KEY = "sitora-consent";
export const CONSENT_OPEN_EVENT = "sitora:open-cookie-settings";
export const CONSENT_UPDATE_EVENT = "sitora:consent";

export type ConsentRecord = {
  version: typeof CONSENT_VERSION;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

export const consentCapabilities = {
  analytics: /^G-[A-Z0-9]+$/.test(process.env.NEXT_PUBLIC_GA_ID || ""),
  marketing: /^\d+$/.test(process.env.NEXT_PUBLIC_META_PIXEL_ID || ""),
} as const;

export function parseConsent(value: string | null): ConsentRecord | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as Partial<ConsentRecord>;
    if (parsed.version !== CONSENT_VERSION || parsed.necessary !== true) return null;
    return {
      version: CONSENT_VERSION,
      necessary: true,
      analytics: parsed.analytics === true && consentCapabilities.analytics,
      marketing: parsed.marketing === true && consentCapabilities.marketing,
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : "",
    };
  } catch {
    return null;
  }
}

export function readConsent() {
  if (typeof window === "undefined") return null;
  return parseConsent(window.localStorage.getItem(CONSENT_STORAGE_KEY));
}

export function makeConsent(analytics: boolean, marketing: boolean): ConsentRecord {
  return {
    version: CONSENT_VERSION,
    necessary: true,
    analytics: analytics && consentCapabilities.analytics,
    marketing: marketing && consentCapabilities.marketing,
    updatedAt: new Date().toISOString(),
  };
}

// Future scripts must be represented in consentCapabilities and loaded only from
// the matching consent branch. Never place analytics or marketing scripts globally.
