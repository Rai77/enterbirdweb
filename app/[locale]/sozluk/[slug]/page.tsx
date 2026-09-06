import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { ArticleBody } from "@/components/ArticleBody";
import { glossary, getTerm } from "@/lib/glossary";
import { SITE_URL } from "@/lib/site";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    glossary.map((term) => ({ locale, slug: term.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const term = getTerm(slug);
  if (!term) return {};

  const t = await getTranslations({ locale, namespace: "glossary" });
  const url = `${SITE_URL}/${locale}/sozluk/${slug}`;

  return {
    // "ROAS nedir?" biçimi, insanların gerçekten arattığı sorgu.
    title: t("termTitle", { term: term.term }),
    description: term.short,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        routing.locales.map((alt) => [
          alt,
          `${SITE_URL}/${alt}/sozluk/${slug}`,
        ]),
      ),
    },
    openGraph: {
      type: "article",
      title: t("termTitle", { term: term.term }),
      description: term.short,
      url,
    },
  };
}

export default async function GlossaryTermPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const term = getTerm(slug);
  if (!term) notFound();

  const t = await getTranslations({ locale, namespace: "glossary" });
  const related = (term.related ?? [])
    .map((s) => getTerm(s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term.term,
    alternateName: term.full,
    description: term.short,
    inDefinedTermSet: `${SITE_URL}/${locale}/sozluk`,
    url: `${SITE_URL}/${locale}/sozluk/${slug}`,
    inLanguage: locale,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Section className="!pb-10 !pt-28 sm:!pt-36">
        <Container size="default">
          <Link
            href="/sozluk"
            className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToGlossary")}
          </Link>

          <div className="mt-8">
            <span className="rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-medium uppercase tracking-wider text-brand">
              {term.category}
            </span>
          </div>

          <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
            {term.term}
          </h1>
          {term.full && (
            <p className="mt-3 text-sm uppercase tracking-wider text-muted">
              {term.full}
            </p>
          )}

          <p className="mt-6 text-lg text-muted sm:text-xl">{term.short}</p>
        </Container>
      </Section>

      <Section className="!pt-0">
        <Container size="default">
          <div className="h-px w-full bg-border" />
          <div className="mt-12">
            <ArticleBody
              article={{ blocks: term.body }}
              sourcesLabel={t("sources")}
            />
          </div>

          {related.length > 0 && (
            <div className="mt-16">
              <div className="text-xs font-medium uppercase tracking-widest text-muted">
                {t("related")}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/sozluk/${item.slug}`}
                    className="rounded-full border border-border bg-surface/50 px-4 py-2 text-sm text-foreground/80 transition hover:border-brand-2/60 hover:text-foreground"
                  >
                    {item.term}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
