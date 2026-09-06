import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";
import { getCollectionContent } from "@/lib/cms";
import { glossary } from "@/lib/glossary";

/**
 * /sitemap.xml — Google'a "işte tüm sayfalarım" der.
 *
 * Her sayfa iki dilde listelenir ve `alternates.languages` ile birbirine
 * bağlanır: böylece Google TR ve EN sürümlerini aynı içeriğin iki dili
 * olarak görür, birbirinin kopyası sanıp sıralamayı düşürmez.
 *
 * Yeni bir sayfa eklendiğinde aşağıdaki listeye eklemek yeterli.
 */
const routes = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/work", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/loom", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/sozluk", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" as const },
];

type BlogPostDoc = { slug: string; publishedAt?: string | null };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages = routes.flatMap(({ path, priority, changeFrequency }) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((alt) => [alt, `${SITE_URL}/${alt}${path}`]),
        ),
      },
    })),
  );

  // Blog yazıları listeye elle eklenmiyor: panele yeni yazı girildiğinde
  // sitemap'te de kendiliğinden yer alsın. Veritabanına ulaşılamazsa sayfa
  // listesi yine de yayınlanır — sitemap'in tamamı kaybolmasın.
  let posts: BlogPostDoc[] = [];
  try {
    posts = await getCollectionContent<BlogPostDoc>("blog-posts", "tr", {
      sort: "-publishedAt",
    });
  } catch {
    posts = [];
  }

  const postPages = posts.flatMap((post) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}/blog/${post.slug}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((alt) => [
            alt,
            `${SITE_URL}/${alt}/blog/${post.slug}`,
          ]),
        ),
      },
    })),
  );

  // Sözlük terimleri koddan geliyor; bunun için veritabanına gitmeye gerek yok.
  const glossaryPages = glossary.flatMap((term) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}/sozluk/${term.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.5,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((alt) => [
            alt,
            `${SITE_URL}/${alt}/sozluk/${term.slug}`,
          ]),
        ),
      },
    })),
  );

  return [...staticPages, ...postPages, ...glossaryPages];
}
