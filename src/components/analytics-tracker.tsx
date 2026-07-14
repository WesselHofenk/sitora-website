"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent, type AnalyticsEventName } from "@/lib/analytics";

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/websites-voor-")) {
      trackEvent("branch_page_view", { branch: pathname.slice(1) });
    }
  }, [pathname]);

  useEffect(() => {
    const startedForms = new WeakSet<HTMLFormElement>();
    const seenScroll = new Set<number>();
    const viewed = new WeakSet<Element>();

    const onFocus = (event: FocusEvent) => {
      const form = (event.target as Element | null)?.closest("form");
      if (form && !startedForms.has(form)) {
        startedForms.add(form);
        trackEvent("form_start", { form_type: form.dataset.formType || "contact" });
      }
    };

    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest("a");
      if (!link) return;
      const href = link.getAttribute("href") || "";
      let name: AnalyticsEventName | null = null;
      if (href.startsWith("tel:")) name = "phone_click";
      else if (href.startsWith("mailto:")) name = "email_click";
      else if (href.includes("wa.me/")) name = "whatsapp_click";
      else if (href.includes("?pakket=")) name = "package_click";
      else if (href.includes("?dienst=")) name = "service_click";
      else if (/^https?:/.test(href) && !href.startsWith(window.location.origin)) name = "outbound_click";
      if (name) trackEvent(name, { location: pathname, destination_type: name.replace("_click", "") });
    };

    const onToggle = (event: Event) => {
      const details = event.target as HTMLDetailsElement;
      if (details.open) trackEvent("faq_expand", { location: pathname });
    };

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const progress = Math.round((window.scrollY / max) * 100);
      for (const threshold of [50, 90]) {
        if (progress >= threshold && !seenScroll.has(threshold)) {
          seenScroll.add(threshold);
          trackEvent(threshold === 50 ? "scroll_50" : "scroll_90", { location: pathname });
        }
      }
    };

    const comparison = document.querySelector("[data-analytics-view='pricing_compare_view']");
    const observer = comparison ? new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !viewed.has(entry.target)) {
        viewed.add(entry.target);
        trackEvent("pricing_compare_view", { location: pathname });
      }
    }, { threshold: 0.35 }) : null;
    if (comparison && observer) observer.observe(comparison);

    document.addEventListener("focusin", onFocus);
    document.addEventListener("click", onClick);
    document.querySelectorAll("details").forEach((details) => details.addEventListener("toggle", onToggle));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer?.disconnect();
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("click", onClick);
      document.querySelectorAll("details").forEach((details) => details.removeEventListener("toggle", onToggle));
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return null;
}
