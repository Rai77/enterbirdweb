/**
 * Blog yazılarının tek kapısı.
 *
 * Yazılar iki yerden gelebiliyor:
 *   1. Payload paneli (veritabanı) — elle girilen yazılar.
 *   2. `content/blog/` — repoya dosya olarak eklenen yazılar.
 *
 * Sayfalar ikisini ayırt etmek zorunda kalmasın diye burada birleştiriliyor.
 * Aynı slug iki yerde de varsa panel kazanır: panelden yapılan bir düzeltme
 * repodaki metnin önüne geçebilsin.
 */
import { getCollectionContent } from "@/lib/cms";
import { getArticle, type Article } from "@/lib/blogArticles";
import { repoPosts } from "@/content/blog";
import type { AppLocale } from "@/cms/localization";

export type BlogPost = {
  id: string | number;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readingMinutes?: number | null;
  publishedAt: string;
};

function fromRepo(locale: AppLocale): BlogPost[] {
  return repoPosts.map((post) => {
    const content = post[locale] ?? post.tr;
    return {
      id: `repo:${post.slug}`,
      slug: post.slug,
      title: content.title,
      category: content.category,
      excerpt: content.excerpt,
      readingMinutes: post.readingMinutes ?? 5,
      publishedAt: post.publishedAt,
    };
  });
}

function byNewestFirst(a: BlogPost, b: BlogPost) {
  return (
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/** Panel + repo, en yeni yazı en üstte. */
export async function getBlogPosts(locale: AppLocale): Promise<BlogPost[]> {
  const cmsPosts = await getCollectionContent<BlogPost>("blog-posts", locale, {
    sort: "-publishedAt",
  });

  const cmsSlugs = new Set(cmsPosts.map((post) => post.slug));
  const extras = fromRepo(locale).filter((post) => !cmsSlugs.has(post.slug));

  return [...cmsPosts, ...extras].sort(byNewestFirst);
}

export async function getBlogPost(
  slug: string,
  locale: AppLocale,
): Promise<BlogPost | null> {
  const posts = await getBlogPosts(locale);
  return posts.find((post) => post.slug === slug) ?? null;
}

/** Yazı sayfalarını önceden üretmek için: her iki kaynaktaki tüm slug'lar. */
export async function getBlogSlugs(): Promise<string[]> {
  const posts = await getBlogPosts("tr");
  return posts.map((post) => post.slug);
}

/**
 * Yazının gövdesi. Önce `lib/blogArticles` (panelde duran yazıların gövdesi),
 * sonra repodaki yazının kendi gövdesi.
 */
export function getPostArticle(slug: string, locale: string): Article | null {
  const fromArticles = getArticle(slug, locale);
  if (fromArticles) return fromArticles;

  const post = repoPosts.find((item) => item.slug === slug);
  if (!post) return null;

  const content = locale === "en" ? post.en : post.tr;
  return { blocks: content.blocks, sources: content.sources };
}
