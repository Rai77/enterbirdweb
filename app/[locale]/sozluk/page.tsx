import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { glossary, groupByCategory } from "@/lib/glossary";
import { SITE_URL } from "@/lib/site";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "glossary" });
  const url = `${SITE_URL}/${locale}/sozluk`;

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        routing.locales.map((alt) => [alt, `${SITE_URL}/${alt}/sozluk`]),
      ),
    },
  };
}

export default async function GlossaryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "glossary" });
  const groups = groupByCategory();

  // DefinedTermSet, sözlükler için standart işaretleme. Yapay zekâ motorlarının
  // tanımları alıntılarken güvendiği yapı bu.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: t("metaTitle"),
    description: t("metaDescription"),
    url: `${SITE_URL}/${locale}/sozluk`,
    inLanguage: locale,
    hasDefinedTerm: glossary.map((term) => ({
      "@type": "DefinedTerm",
      name: term.term,
      description: term.short,
      url: `${SITE_URL}/${locale}/sozluk/${term.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader
        eyebrow={t("eyebrow")}
        title={
          <>
            {t("title")}{" "}
            <span className="text-gradient">{t("titleHighlight")}</span>
            {t("titleSuffix")}
          </>
        }
        description={t("description")}
      />

      <Section>
        <Container size="wide">
          <div className="space-y-20">
            {groups.map((group) => (
              <div key={group.category}>
                <div className="flex items-baseline gap-3">
                  <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                    {group.category}
                  </h2>
                  <span className="text-xs text-muted">
                    {group.terms.length}
                  </span>
                </div>

                <div className="mt-6 grid gap-px overflow-hidden rounded-3xl border border-border bg-border/60 sm:grid-cols-2 lg:grid-cols-3">
                  {group.terms.map((term) => (
                    <Link
                      key={term.slug}
                      href={`/sozluk/${term.slug}`}
                      className="group relative flex flex-col bg-background/80 p-6 transition hover:bg-surface"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-base font-semibold tracking-tight">
                          {term.term}
                        </span>
                        <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                      </div>
                      {term.full && (
                        <span className="mt-1 text-[11px] uppercase tracking-wider text-muted">
                          {term.full}
                        </span>
                      )}
                      <p className="mt-3 text-sm leading-relaxed text-muted">
                        {term.short}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
