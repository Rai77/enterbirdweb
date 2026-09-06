import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { ArticleBody } from "@/components/ArticleBody";
import { getCollectionContent } from "@/lib/cms";
import { getArticle } from "@/lib/blogArticles";
import { SITE_URL } from "@/lib/site";
import { routing } from "@/i18n/routing";
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

async function findPost(slug: string, locale: string) {
  const posts = await getCollectionContent<BlogPostDoc>(
    "blog-posts",
    locale as AppLocale,
    { sort: "-publishedAt" },
  );
  return posts.find((p) => p.slug === slug) ?? null;
}

/** Yazıları önceden üret: her yazı statik bir sayfa olarak yayınlanır. */
export async function generateStaticParams() {
  const posts = await getCollectionContent<BlogPostDoc>("blog-posts", "tr", {
    sort: "-publishedAt",
  });
  return routing.locales.flatMap((locale) =>
    posts.map((post) => ({ locale, slug: post.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await findPost(slug, locale);
  if (!post) return {};

  const url = `${SITE_URL}/${locale}/blog/${slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    // Yazı sayfaları için kanonik ve dil alternatiflerini burada veriyoruz;
    // aynı yazının iki dili birbirinin kopyası sayılmasın.
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        routing.locales.map((alt) => [alt, `${SITE_URL}/${alt}/blog/${slug}`]),
      ),
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await findPost(slug, locale);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: "blog" });
  const article = getArticle(slug, locale);

  const published = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(
        locale === "tr" ? "tr-TR" : "en-GB",
        { day: "numeric", month: "long", year: "numeric" },
      )
    : null;

  // Arama motorları ve yapay zekâ araçları yazıyı doğru anlasın diye.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    inLanguage: locale,
    articleSection: post.category,
    mainEntityOfPage: `${SITE_URL}/${locale}/blog/${slug}`,
    author: { "@type": "Organization", name: "Enterbird" },
    publisher: { "@type": "Organization", name: "Enterbird" },
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
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToBlog")}
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-muted">
            <span className="rounded-full border border-border bg-surface/60 px-3 py-1 font-medium uppercase tracking-wider text-brand">
              {post.category?.trim()}
            </span>
            {published && <span>{published}</span>}
            {post.readingMinutes ? (
              <span>
                {post.readingMinutes} {t("readMin")}
              </span>
            ) : null}
          </div>

          <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
            {post.title?.trim()}
          </h1>

          <p className="mt-6 text-lg text-muted sm:text-xl">
            {post.excerpt?.trim()}
          </p>
        </Container>
      </Section>

      <Section className="!pt-0">
        <Container size="default">
          <div className="h-px w-full bg-border" />
          {article ? (
            <div className="mt-12">
              <ArticleBody article={article} sourcesLabel={t("sources")} />
            </div>
          ) : (
            // Gövdesi olmayan bir yazı — sayfayı boş bırakmak yerine durumu söyle.
            <p className="mt-12 text-base text-muted">{t("comingSoon")}</p>
          )}
        </Container>
      </Section>
    </>
  );
}
