"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/content/site";
import { Logo } from "./logo";

const headerNavigation = navigation.filter((item) => item.label !== "FAQ");

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuPanel = useRef<HTMLDivElement>(null);
  const isActive = (href: string) => href === "/" ? pathname === "/" : !href.startsWith("/#") && pathname === href;

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuPanel.current?.querySelector<HTMLElement>("a")?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); }
      if (event.key === "Tab" && menuPanel.current) {
        const focusable = [...menuPanel.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled])')];
        const first = focusable[0];
        const last = focusable.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", closeOnEscape); };
  }, [open]);

  return (
    <>
    <header className="sticky top-0 z-50 bg-[#f6f3ed]/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-[68px] max-w-[86rem] items-center justify-between gap-6 px-5 sm:h-[76px] sm:px-8 lg:px-10">
        <Logo />
        <nav aria-label="Hoofdnavigatie" className="hidden items-center gap-1 xl:flex">
          {headerNavigation.map((item) => {
            const active = isActive(item.href);
            return <Link key={item.label} href={item.href} aria-current={active ? "page" : undefined} className="rounded-full px-3 py-3 text-[13px] font-extrabold text-slate-600 transition-colors duration-200 hover:bg-white hover:text-slate-950 aria-[current=page]:bg-white aria-[current=page]:text-slate-950">{item.label}</Link>;
          })}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/contact#advies" className="hidden min-h-11 items-center gap-2 rounded-full bg-orange-700 px-5 text-sm font-extrabold text-white transition-[background-color,transform] duration-200 hover:bg-orange-800 active:scale-[.98] lg:inline-flex">
            Gratis websiteadvies <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
          <button ref={menuButton} type="button" aria-label={open ? "Menu sluiten" : "Menu openen"} aria-expanded={open} aria-controls="mobiel-menu" onClick={() => setOpen((value) => !value)} className="grid size-11 place-items-center rounded-full bg-white text-slate-950 transition-colors hover:bg-slate-100 xl:hidden">
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
    </header>
      {open ? (
        <div ref={menuPanel} id="mobiel-menu" role="dialog" aria-modal="true" aria-label="Mobiele navigatie" className="fixed inset-x-0 bottom-0 top-[68px] z-40 overflow-y-auto bg-[#07111f] text-white sm:top-[76px] xl:hidden">
          <nav aria-label="Mobiele navigatie" className="mx-auto flex min-h-full max-w-3xl flex-col px-5 pb-8 pt-8 sm:px-8">
            <p className="text-xs font-black uppercase tracking-[.2em] text-orange-400">Navigatie</p>
            <div className="mt-6 grid gap-2">
              {headerNavigation.map((item, index) => {
                const active = isActive(item.href);
                return <Link key={item.label} href={item.href} aria-current={active ? "page" : undefined} onClick={() => setOpen(false)} className="group flex min-h-16 items-center justify-between gap-4 py-3 text-2xl font-black tracking-[-.035em] text-white transition-colors hover:text-orange-300 aria-[current=page]:text-orange-400 sm:text-3xl"><span><small className="mr-4 align-middle text-[10px] font-black text-orange-400">0{index + 1}</small>{item.label}</span><ArrowUpRight className="size-5 text-slate-500 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" /></Link>;
              })}
            </div>
            <div className="mt-auto pt-10"><Link href="/contact#advies" onClick={() => setOpen(false)} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-orange-700 px-6 text-sm font-black text-white">Gratis websiteadvies <ArrowUpRight className="size-4" /></Link><p className="mt-5 max-w-sm text-sm leading-6 text-slate-300">Heldere maatwerkwebsites voor mkb, dienstverleners, vakbedrijven en organisaties.</p></div>
          </nav>
        </div>
      ) : null}
    </>
  );
}
