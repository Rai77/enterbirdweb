import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { CTA } from "@/components/CTA";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import { getCollectionContent } from "@/lib/cms";
import type { AppLocale } from "@/cms/localization";

type BlogPostDoc = {
  id: string | number;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readingMinutes?: number | null;
  publishedAt: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("blog") };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "blog" });
  const nav = await getTranslations({ locale, namespace: "nav" });

  const posts = await getCollectionContent<BlogPostDoc>(
    "blog-posts",
    locale as AppLocale,
    { sort: "-publishedAt" },
  );

  return (
    <>
      <PageHeader
        eyebrow={nav("blog")}
        title={
          <>
            {t("pageTitle")}{" "}
            <span className="text-gradient">{t("pageTitleHighlight")}</span>
            {t("pageTitleSuffix")}
          </>
        }
        description={t("pageDescription")}
      />

      <Section>
        <Container size="wide">
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((p) => (
              <Link
                key={p.id}
                href={`/blog/${p.slug}`}
                className="group relative flex flex-col rounded-3xl border border-border bg-surface/40 p-7 transition hover:border-brand-2/60 hover:bg-surface"
              >
                <div className="flex items-center gap-3 text-xs text-muted">
                  <span className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider">
                    {p.category}
                  </span>
                  <span>
                    {new Date(p.publishedAt).toLocaleDateString(locale, {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <span>·</span>
                  <span>
                    {p.readingMinutes ?? 5} {t("readMin")}
                  </span>
                </div>
                <h2 className="mt-5 text-2xl font-semibold tracking-tight transition group-hover:text-gradient">
                  {p.title}
                </h2>
                <p className="mt-3 text-sm text-muted">{p.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/90">
                  {t("readMore")}
                  <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <CTA />
    </>
  );
}
