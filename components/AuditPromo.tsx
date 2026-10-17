import { ArrowRight, Gauge } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SEO_COPY } from "@/lib/siteAudit/seoCopy";

/**
 * Blog, sözlük ve hizmet sayfalarının sonunda ücretsiz site analizi aracına
 * yönlendiren kutu. Site içi bağlantı, aracın aramalarda bulunmasına da yardım eder.
 */
export function AuditPromo({ locale }: { locale: string }) {
  const s = SEO_COPY[locale === "en" ? "en" : "tr"];
  return (
    <aside className="relative mt-16 overflow-hidden rounded-3xl border border-brand-2/30 bg-gradient-to-br from-brand-3/10 via-brand-2/10 to-brand/10 p-6 sm:p-8">
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-2/20 blur-3xl" />
      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-3 via-brand-2 to-brand text-white shadow-lg">
            <Gauge className="h-6 w-6" aria-hidden />
          </span>
          <div>
            <p className="text-lg font-semibold">{s.promoTitle}</p>
            <p className="mt-1 text-sm text-muted">{s.promoText}</p>
          </div>
        </div>
        <Link
          href="/site-analizi"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:bg-foreground/90"
        >
          {s.promoCta}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </aside>
  );
}
