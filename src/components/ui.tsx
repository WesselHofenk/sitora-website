import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light" | "dark";
  className?: string;
}) {
  const styles = {
    primary: "bg-orange-700 text-white hover:bg-orange-800",
    secondary: "bg-white text-slate-900 shadow-sm hover:bg-slate-50",
    light: "bg-white text-blue-950 hover:bg-orange-50",
    dark: "bg-white/10 text-white hover:bg-white/15",
  };

  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-extrabold transition-[color,background-color,transform] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 active:scale-[.98] ${styles[variant]} ${className}`}
    >
      {children}
      <ArrowRight className="size-4" aria-hidden="true" />
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
  inverse = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  center?: boolean;
  inverse?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <p className={`mb-4 text-xs font-black uppercase tracking-[0.2em] ${inverse ? "text-orange-300" : "text-orange-800"}`}>{eyebrow}</p>
      <h2 className={`text-balance text-[clamp(2.25rem,6vw,3.75rem)] font-black leading-[1.04] tracking-[-0.05em] ${inverse ? "text-white" : "text-slate-950"}`}>{title}</h2>
      {description ? <p className={`mt-5 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8 ${inverse ? "text-blue-100" : "text-slate-600"}`}>{description}</p> : null}
    </div>
  );
}

export function PageHero({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-[#07111f] py-16 text-white sm:py-20 lg:py-24">
      <div className="relative mx-auto max-w-[86rem] px-5 sm:px-8 lg:px-10">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-orange-400">{eyebrow}</p>
        <h1 className="max-w-5xl text-balance text-[clamp(2.5rem,7vw,4.5rem)] font-black leading-[1.02] tracking-[-0.055em]">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">{description}</p>
        {children ? <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{children}</div> : null}
      </div>
    </section>
  );
}
