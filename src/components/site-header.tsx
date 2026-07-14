"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/content/site";
import { Logo } from "./logo";

const headerNavigation = navigation.filter((item) => item.label !== "FAQ");

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", closeOnEscape);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", closeOnEscape); };
  }, [open]);

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-slate-900/10 bg-[#f6f3ed]/95 backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-[86rem] items-center justify-between gap-8 px-5 sm:px-8 lg:px-10">
        <Logo />
        <nav aria-label="Hoofdnavigatie" className="hidden items-center gap-1 xl:flex">
          {headerNavigation.map((item) => {
            const active = pathname === item.href || (item.href.startsWith("/#") && pathname === "/");
            return <Link key={item.label} href={item.href} aria-current={active ? "page" : undefined} className="relative px-3 py-3 text-[13px] font-extrabold text-slate-600 transition-colors duration-200 hover:text-slate-950 after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-orange-500 after:transition-transform after:duration-200 hover:after:scale-x-100 aria-[current=page]:text-slate-950 aria-[current=page]:after:scale-x-100">{item.label}</Link>;
          })}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/contact#advies" className="hidden min-h-11 items-center gap-2 rounded-full bg-orange-500 px-5 text-sm font-extrabold text-white transition-[background-color,transform] duration-200 hover:bg-orange-600 active:scale-[.98] lg:inline-flex">
            Gratis websiteadvies <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
          <button type="button" aria-label={open ? "Menu sluiten" : "Menu openen"} aria-expanded={open} aria-controls="mobiel-menu" onClick={() => setOpen((value) => !value)} className="grid size-11 place-items-center rounded-full border border-slate-900/15 text-slate-950 transition-colors hover:bg-white xl:hidden">
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
    </header>
      {open ? (
        <div id="mobiel-menu" className="fixed inset-x-0 bottom-0 top-[76px] z-40 overflow-y-auto bg-[#07111f] text-white xl:hidden">
          <nav aria-label="Mobiele navigatie" className="mx-auto flex min-h-full max-w-3xl flex-col px-5 pb-8 pt-8 sm:px-8">
            <p className="text-xs font-black uppercase tracking-[.2em] text-orange-400">Navigatie</p>
            <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
              {headerNavigation.map((item, index) => <Link key={item.label} href={item.href} onClick={() => setOpen(false)} className="group flex min-h-16 items-center justify-between gap-4 py-3 text-2xl font-black tracking-[-.035em] sm:text-3xl"><span><small className="mr-4 align-middle text-[10px] font-black text-orange-400">0{index + 1}</small>{item.label}</span><ArrowUpRight className="size-5 text-slate-500 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" /></Link>)}
            </div>
            <div className="mt-auto pt-10"><Link href="/contact#advies" onClick={() => setOpen(false)} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-orange-500 px-6 text-sm font-black text-white">Gratis websiteadvies <ArrowUpRight className="size-4" /></Link><p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">Professionele maatwerkwebsites voor ondernemers en organisaties.</p></div>
          </nav>
        </div>
      ) : null}
    </>
  );
}
