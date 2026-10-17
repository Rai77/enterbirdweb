import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Gauge, Bug, Search, BarChart3, ShieldCheck, ShoppingBag, ArrowRight, Plus } from "lucide-react";
import { jsonLdHtml, pageMetadata } from "@/lib/seo";
import { Container } from "@/components/Container";
import { SiteAudit } from "@/components/SiteAudit";
import { PAGE_COPY } from "@/lib/siteAudit/pageCopy";
import { LANDING_COPY, type FeatureIcon } from "@/lib/siteAudit/landingCopy";
import { WHATSAPP_NUMBER } from "@/lib/contact";
import { SITE_URL } from "@/lib/site";

const ICONS: Record<FeatureIcon, typeof Gauge> = {
  gauge: Gauge,
  bug: Bug,
  search: Search,
  chart: BarChart3,
  shield: ShieldCheck,
  bag: ShoppingBag,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = PAGE_COPY[locale === "en" ? "en" : "tr"];
  return pageMetadata({
    locale,
    path: "/site-analizi",
    title: c.seoTitle,
    description: c.seoDescription,
  });
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-brand" />
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
    </div>
  );
}

export default async function SiteAuditPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = locale === "en" ? "en" : "tr";
  const l = LANDING_COPY[lang];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: `${SITE_URL}/${lang}/site-analizi`,
    mainEntity: l.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(faqJsonLd) }} />

      <div className="relative overflow-hidden pb-20">
        <Container size="wide">
          <SiteAudit locale={lang} whatsappNumber={WHATSAPP_NUMBER} />
        </Container>
      </div>

      {/* Neleri kontrol ediyoruz */}
      <section className="relative border-t border-border/60 py-20 sm:py-24">
        <Container size="wide">
          <SectionTitle eyebrow={l.featuresEyebrow} title={l.featuresTitle} />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {l.features.map((f) => {
              const Icon = ICONS[f.icon];
              return (
                <li
                  key={f.title}
                  className="group relative overflow-hidden rounded-3xl border border-border bg-surface/60 p-6 transition hover:-translate-y-1 hover:border-brand-2/50 hover:shadow-xl"
                >
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-2/10 blur-2xl transition group-hover:bg-brand-2/20" />
                  <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-3 via-brand-2 to-brand text-white shadow-lg">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h3 className="relative mt-5 text-lg font-semibold">{f.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-muted">{f.text}</p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Nasıl çalışır */}
      <section className="relative py-20 sm:py-24">
        <Container size="wide">
          <SectionTitle eyebrow={l.howEyebrow} title={l.howTitle} />
          <div className="relative mt-12">
          <div className="pointer-events-none absolute left-[16%] right-[16%] top-7 hidden h-px bg-gradient-to-r from-brand-3/0 via-brand-2/50 to-brand/0 md:block" />
          <ol className="relative grid gap-6 md:grid-cols-3">
            {l.how.map((h, i) => (
              <li key={h.title} className="relative text-center">
                <span className="relative mx-auto grid h-14 w-14 place-items-center rounded-full border border-brand-2/40 bg-surface text-xl font-bold text-gradient shadow-lg">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-lg font-semibold">{h.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted">{h.text}</p>
              </li>
            ))}
          </ol>
          </div>
        </Container>
      </section>

      {/* Sık sorulan sorular */}
      <section className="relative border-t border-border/60 py-20 sm:py-24">
        <Container size="narrow">
          <SectionTitle eyebrow={l.faqEyebrow} title={l.faqTitle} />
          <div className="mt-10 space-y-3">
            {l.faq.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-border bg-surface/60 px-5 py-4 open:bg-surface">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <Plus className="h-5 w-5 shrink-0 text-muted transition group-open:rotate-45" aria-hidden />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* Kapanış */}
      <section className="relative pb-24">
        <Container size="wide">
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-brand-3 via-brand-2 to-brand p-10 text-center text-white shadow-2xl sm:p-14">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
            <h2 className="relative text-3xl font-semibold tracking-tight sm:text-4xl">{l.finalTitle}</h2>
            <p className="relative mx-auto mt-3 max-w-xl text-white/85">{l.finalText}</p>
            <a
              href="#analiz"
              className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-[#0b1124] shadow-lg transition hover:bg-white/90"
            >
              {l.finalCta}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
