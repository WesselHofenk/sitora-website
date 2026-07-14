"use client";

import { Settings2, X } from "lucide-react";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import {
  CONSENT_OPEN_EVENT,
  CONSENT_STORAGE_KEY,
  CONSENT_UPDATE_EVENT,
  consentCapabilities,
  makeConsent,
  readConsent,
  type ConsentRecord,
} from "@/lib/consent";

const GA_ID = /^G-[A-Z0-9]+$/.test(process.env.NEXT_PUBLIC_GA_ID || "") ? process.env.NEXT_PUBLIC_GA_ID : undefined;
const META_ID = /^\d+$/.test(process.env.NEXT_PUBLIC_META_PIXEL_ID || "") ? process.env.NEXT_PUBLIC_META_PIXEL_ID : undefined;
const hasOptionalScripts = consentCapabilities.analytics || consentCapabilities.marketing;

function clearOptionalTracking() {
  if (GA_ID) (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = true;
  window.fbq?.("consent", "revoke");
  document.cookie.split(";").forEach((entry) => {
    const name = entry.split("=")[0]?.trim();
    if (name === "_fbp" || name === "_fbc" || name?.startsWith("_ga")) {
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    }
  });
}

export function CookieSettingsButton() {
  return <button type="button" onClick={() => {
    trackEvent("cookie_preferences_open", { location: "footer" });
    window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
  }} className="min-h-11 text-sm text-slate-400 underline-offset-4 hover:text-white hover:underline">Cookievoorkeuren</button>;
}

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [consent, setConsent] = useState<ConsentRecord | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = readConsent();
      setConsent(stored);
      setAnalytics(stored?.analytics ?? false);
      setMarketing(stored?.marketing ?? false);
      setOpen(hasOptionalScripts && !stored);
    }, 0);
    const reopen = () => {
      const current = readConsent();
      setAnalytics(current?.analytics ?? false);
      setMarketing(current?.marketing ?? false);
      setSettings(true);
      setOpen(true);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => { window.clearTimeout(timer); window.removeEventListener(CONSENT_OPEN_EVENT, reopen); };
  }, []);

  useEffect(() => {
    if (!open) return;
    closeButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && consent) setOpen(false);
      if (event.key === "Tab" && dialog.current) {
        const focusable = [...dialog.current.querySelectorAll<HTMLElement>('button:not([disabled]),input:not([disabled])')];
        const first = focusable[0];
        const last = focusable.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, consent]);

  function save(nextAnalytics: boolean, nextMarketing: boolean) {
    const next = makeConsent(nextAnalytics, nextMarketing);
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(next));
    if (!next.analytics && !next.marketing) clearOptionalTracking();
    if (GA_ID) (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = !next.analytics;
    setConsent(next);
    setOpen(false);
    setSettings(false);
    window.dispatchEvent(new CustomEvent(CONSENT_UPDATE_EVENT, { detail: next }));
    trackEvent("cookie_consent_update", { analytics: next.analytics, marketing: next.marketing });
  }

  return (
    <>
      {consent?.analytics && GA_ID ? <><Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" /><Script id="ga-consented" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true,send_page_view:true});`}</Script></> : null}
      {consent?.marketing && META_ID ? <Script id="meta-consented" strategy="afterInteractive">{`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('consent','grant');fbq('init','${META_ID}');fbq('track','PageView');`}</Script> : null}
      {open ? <div ref={dialog} className="fixed inset-x-3 bottom-24 z-50 mx-auto max-h-[calc(100vh-7rem)] max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl md:bottom-5 md:max-h-[calc(100vh-2.5rem)]" role="dialog" aria-modal="true" aria-labelledby="cookie-title" aria-describedby="cookie-description">
        <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-wider text-orange-600">Jouw privacykeuze</p><h2 id="cookie-title" className="mt-1 text-xl font-black text-slate-950">Cookies en optionele metingen</h2></div><button ref={closeButton} type="button" aria-label="Cookievoorkeuren sluiten" onClick={() => setOpen(false)} className="grid size-11 shrink-0 place-items-center rounded-xl border border-slate-200"><X className="size-5" /></button></div>
        <p id="cookie-description" className="mt-3 text-sm leading-6 text-slate-600">{hasOptionalScripts ? "Noodzakelijke opslag onthoudt je keuze. Optionele metingen blijven uit totdat je ze zelf inschakelt." : "Er zijn op dit moment geen analytics- of marketingscripts geconfigureerd. De website gebruikt daarom geen optionele tracking."}</p>
        {settings && hasOptionalScripts ? <div className="mt-5 space-y-3"><div className="flex items-start justify-between gap-4 rounded-xl bg-slate-100 p-4"><span><strong className="block text-sm">Noodzakelijk</strong><small className="text-slate-600">Altijd actief om je voorkeur te onthouden.</small></span><input aria-label="Noodzakelijke opslag, altijd actief" type="checkbox" checked disabled className="mt-1 size-5" /></div>{consentCapabilities.analytics ? <label className="flex items-start justify-between gap-4 rounded-xl bg-slate-100 p-4"><span><strong className="block text-sm">Analytics</strong><small className="text-slate-600">Geanonimiseerde meting via de geconfigureerde GA4-property.</small></span><input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} className="mt-1 size-5 accent-orange-500" /></label> : null}{consentCapabilities.marketing ? <label className="flex items-start justify-between gap-4 rounded-xl bg-slate-100 p-4"><span><strong className="block text-sm">Marketing</strong><small className="text-slate-600">Alleen voor de geconfigureerde marketingpixel.</small></span><input type="checkbox" checked={marketing} onChange={(event) => setMarketing(event.target.checked)} className="mt-1 size-5 accent-orange-500" /></label> : null}</div> : null}
        {hasOptionalScripts ? <div className="mt-5 grid gap-2 sm:grid-cols-3">{settings ? <><button type="button" onClick={() => save(analytics, marketing)} className="min-h-12 rounded-xl bg-blue-950 px-4 font-black text-white">Keuze opslaan</button><button type="button" onClick={() => save(false, false)} className="min-h-12 rounded-xl border border-slate-300 px-4 font-black text-slate-800">Alles weigeren</button><button type="button" onClick={() => save(true, true)} className="min-h-12 rounded-xl border border-slate-300 px-4 font-black text-slate-800">Alles accepteren</button></> : <><button type="button" onClick={() => save(true, true)} className="min-h-12 rounded-xl border border-slate-300 px-4 font-black text-slate-800">Alles accepteren</button><button type="button" onClick={() => save(false, false)} className="min-h-12 rounded-xl border border-slate-300 px-4 font-black text-slate-800">Alles weigeren</button><button type="button" onClick={() => setSettings(true)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 font-black text-slate-800"><Settings2 className="size-4" />Instellen</button></>}</div> : <button type="button" onClick={() => setOpen(false)} className="mt-5 min-h-12 w-full rounded-xl bg-blue-950 px-4 font-black text-white">Sluiten</button>}
      </div> : null}
    </>
  );
}
