"use client";

import { Settings2, X } from "lucide-react";
import Script from "next/script";
import { useEffect, useState } from "react";

type Consent = { necessary: true; analytics: boolean; marketing: boolean; updatedAt: string };
const STORAGE_KEY = "sitora-cookie-consent-v1";
const OPEN_EVENT = "sitora:open-cookie-settings";

function readConsent(): Consent | null {
  try { const value = localStorage.getItem(STORAGE_KEY); return value ? JSON.parse(value) : null; } catch { return null; }
}

export function CookieSettingsButton() {
  return <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))} className="min-h-11 text-sm text-slate-400 underline-offset-4 hover:text-white hover:underline">Cookie-instellingen</button>;
}

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [consent, setConsent] = useState<Consent | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = readConsent();
      setConsent(stored); setAnalytics(stored?.analytics ?? false); setMarketing(stored?.marketing ?? false); setOpen(!stored);
    }, 0);
    const reopen = () => { const current = readConsent(); setAnalytics(current?.analytics ?? false); setMarketing(current?.marketing ?? false); setSettings(true); setOpen(true); };
    window.addEventListener(OPEN_EVENT, reopen); return () => { window.clearTimeout(timer); window.removeEventListener(OPEN_EVENT, reopen); };
  }, []);

  function save(nextAnalytics: boolean, nextMarketing: boolean) {
    const next: Consent = { necessary: true, analytics: nextAnalytics, marketing: nextMarketing, updatedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); setConsent(next); setOpen(false); setSettings(false);
    window.dispatchEvent(new CustomEvent("sitora:consent", { detail: next }));
  }

  return (
    <>
      {consent?.analytics && process.env.NEXT_PUBLIC_GA_ID ? <><Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} strategy="afterInteractive" /><Script id="ga-consented" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}',{anonymize_ip:true});`}</Script></> : null}
      {consent?.marketing && process.env.NEXT_PUBLIC_META_PIXEL_ID ? <Script id="meta-consented" strategy="afterInteractive">{`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${process.env.NEXT_PUBLIC_META_PIXEL_ID}');fbq('track','PageView');`}</Script> : null}
      {open ? <div className="fixed inset-x-3 bottom-24 z-50 mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl md:bottom-5" role="dialog" aria-modal="true" aria-labelledby="cookie-title">
        <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-wider text-orange-600">Jouw privacykeuze</p><h2 id="cookie-title" className="mt-1 text-xl font-black text-slate-950">Cookies en optionele metingen</h2></div>{consent ? <button type="button" aria-label="Cookie-instellingen sluiten" onClick={() => setOpen(false)} className="grid size-11 shrink-0 place-items-center rounded-xl border border-slate-200"><X className="size-5" /></button> : null}</div>
        <p className="mt-3 text-sm leading-6 text-slate-600">Noodzakelijke opslag houdt je cookievoorkeur bij. Analytics en marketing blijven uit totdat je ze zelf inschakelt én de bijbehorende meetcode is geconfigureerd.</p>
        {settings ? <div className="mt-5 space-y-3"><label className="flex items-start justify-between gap-4 rounded-xl bg-slate-100 p-4"><span><strong className="block text-sm">Noodzakelijk</strong><small className="text-slate-600">Altijd actief voor voorkeuren en basiswerking.</small></span><input type="checkbox" checked disabled className="mt-1 size-4" /></label><label className="flex items-start justify-between gap-4 rounded-xl bg-slate-100 p-4"><span><strong className="block text-sm">Analytics</strong><small className="text-slate-600">Alleen geanonimiseerde meting wanneer GA4 is ingesteld.</small></span><input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} className="mt-1 size-4 accent-orange-500" /></label><label className="flex items-start justify-between gap-4 rounded-xl bg-slate-100 p-4"><span><strong className="block text-sm">Marketing</strong><small className="text-slate-600">Alleen voor marketingpixels die later bewust worden toegevoegd.</small></span><input type="checkbox" checked={marketing} onChange={(event) => setMarketing(event.target.checked)} className="mt-1 size-4 accent-orange-500" /></label></div> : null}
        <div className="mt-5 grid gap-2 sm:grid-cols-3">{settings ? <><button type="button" onClick={() => save(analytics, marketing)} className="min-h-12 rounded-xl bg-blue-950 px-4 font-black text-white">Voorkeur opslaan</button><button type="button" onClick={() => save(false, false)} className="min-h-12 rounded-xl border border-slate-300 px-4 font-black text-slate-800">Alles weigeren</button><button type="button" onClick={() => save(true, true)} className="min-h-12 rounded-xl border border-slate-300 px-4 font-black text-slate-800">Alles accepteren</button></> : <><button type="button" onClick={() => save(true, true)} className="min-h-12 rounded-xl bg-blue-950 px-4 font-black text-white">Alles accepteren</button><button type="button" onClick={() => save(false, false)} className="min-h-12 rounded-xl border border-slate-300 px-4 font-black text-slate-800">Alles weigeren</button><button type="button" onClick={() => setSettings(true)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 font-black text-slate-800"><Settings2 className="size-4" />Instellen</button></>}</div>
      </div> : null}
    </>
  );
}
