import Image from "next/image";
import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" aria-label="Ga naar de homepage" className={light ? "inline-flex shrink-0 items-center overflow-hidden rounded-xl bg-white px-3 py-2 shadow-sm" : "inline-flex shrink-0 items-center py-1"}>
      <Image
        src={light ? "/images/sitora-logo.png" : "/images/sitora-logo-transparent.png"}
        alt="Sitora"
        width={202}
        height={66}
        priority={!light}
        sizes="(max-width: 639px) 128px, 144px"
        className="h-auto w-32 sm:w-36"
      />
    </Link>
  );
}
