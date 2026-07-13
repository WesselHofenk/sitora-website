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
    primary: "bg-orange-500 text-white hover:bg-orange-600",
    secondary: "border border-slate-300 bg-white text-slate-900 hover:border-slate-900",
    light: "bg-white text-blue-950 hover:bg-orange-50",
    dark: "border border-white/25 bg-transparent text-white hover:border-white hover:bg-white/10",
  };

  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-extrabold transition-[color,background-color,border-color,transform] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 active:scale-[.98] ${styles[variant]} ${className}`}
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
      <p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-orange-600">{eyebrow}</p>
      <h2 className={`text-balance text-4xl font-black leading-[1.04] tracking-[-0.05em] sm:text-5xl lg:text-6xl ${inverse ? "text-white" : "text-slate-950"}`}>{title}</h2>
      {description ? <p className={`mt-5 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8 ${inverse ? "text-blue-100" : "text-slate-600"}`}>{description}</p> : null}
    </div>
  );
}

export function PageHero({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: ReactNode }) {
  return (
    <section className="editorial-grid relative overflow-hidden bg-[#07111f] py-20 text-white sm:py-28">
      <div className="relative mx-auto max-w-[86rem] px-5 sm:px-8 lg:px-10">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-orange-400">{eyebrow}</p>
        <h1 className="max-w-5xl text-balance text-5xl font-black leading-[1.02] tracking-[-0.055em] sm:text-6xl lg:text-7xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">{description}</p>
        {children ? <div className="mt-8 flex flex-wrap gap-3">{children}</div> : null}
      </div>
    </section>
  );
}
