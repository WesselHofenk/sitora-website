import { MessageCircle, Phone, Sparkles } from "lucide-react";
import Link from "next/link";
import { contact } from "@/content/site";

export function MobileActionBar() {
  if (!contact.phoneHref && !contact.whatsapp) return null;

  return (
    <div className="mobile-action-bar fixed inset-x-3 bottom-3 z-40 grid [grid-template-columns:repeat(auto-fit,minmax(0,1fr))] overflow-hidden rounded-2xl bg-blue-950 p-1 text-white shadow-2xl md:hidden">
      {contact.phoneHref ? <a href={`tel:${contact.phoneHref}`} className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-bold hover:bg-white/10"><Phone className="size-4 text-orange-400" />Bellen</a> : null}
      {contact.whatsapp ? <a href={`https://wa.me/${contact.whatsapp}`} className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-bold hover:bg-white/10"><MessageCircle className="size-4 text-orange-400" />WhatsApp</a> : null}
      <Link href="/contact#advies" className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl bg-orange-500 text-[11px] font-black"><Sparkles className="size-4" />Gratis advies</Link>
    </div>
  );
}
