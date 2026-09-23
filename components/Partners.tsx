import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { partners, type Partner } from "@/content/partners";

/**
 * Ana sayfadaki partner kartları.
 *
 * Logolar markaların kendi renkleriyle geliyor; kart zemini nötr bırakıldı ki
 * açık ve koyu temada aynı görünsünler. Tek partner varken kart sayfanın
 * yarısını kaplamasın diye ızgara en fazla üç sütuna çıkıyor.
 */
export function Partners({ locale }: { locale: string }) {
  if (partners.length === 0) return null;
  const lang = locale === "tr" ? "tr" : "en";

  // Izgara partner sayısına göre daralır. Tek partner varken üç sütunluk bir
  // panel açarsak kartın yanında kocaman boş bir alan kalıyor.
  const layout =
    partners.length === 1
      ? "max-w-md"
      : partners.length === 2
        ? "max-w-3xl md:grid-cols-2"
        : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <div
      className={`grid gap-px overflow-hidden rounded-3xl border border-border bg-border/60 ${layout}`}
    >
      {partners.map((partner: Partner) => {
        const copy = partner[lang];
        return (
          <a
            key={partner.name}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col gap-6 bg-background/80 p-8 transition hover:bg-surface"
          >
            <span className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand-2/10 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" />

            <div className="relative flex items-start justify-between gap-4">
              <Image
                src={partner.logo}
                alt={partner.name}
                width={partner.logoWidth}
                height={partner.logoHeight}
                sizes="220px"
                className="h-auto w-[200px] rounded-xl"
              />
              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
            </div>

            <div className="relative">
              <span className="text-xs font-medium uppercase tracking-wider text-muted">
                {copy.role}
              </span>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {copy.description}
              </p>
            </div>
          </a>
        );
      })}
    </div>
  );
}
