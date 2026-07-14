import { readConsent } from "@/lib/consent";

export type AnalyticsEventName =
  | "form_start"
  | "form_submit"
  | "form_error"
  | "package_click"
  | "service_click"
  | "whatsapp_click"
  | "phone_click"
  | "email_click"
  | "faq_expand"
  | "scroll_50"
  | "scroll_90"
  | "branch_page_view"
  | "pricing_compare_view"
  | "cookie_preferences_open"
  | "cookie_consent_update"
  | "outbound_click";

type EventProperties = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

function safeProperties(properties: EventProperties) {
  return Object.fromEntries(
    Object.entries(properties)
      .filter(([key, value]) => /^[a-z][a-z0-9_]*$/.test(key) && ["string", "number", "boolean"].includes(typeof value))
      .map(([key, value]) => [key, typeof value === "string" ? value.slice(0, 120) : value]),
  );
}

export function trackEvent(name: AnalyticsEventName, properties: EventProperties = {}) {
  if (typeof window === "undefined" || !readConsent()?.analytics) return;
  const payload = safeProperties(properties);
  if (window.gtag) window.gtag("event", name, payload);
  else {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...payload });
  }
  if (process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "true") {
    console.info("[analytics-debug]", name, payload);
  }
}
