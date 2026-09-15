import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";
import { getBlogPosts } from "@/lib/blogPosts";
import { getServices } from "@/lib/services";
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

/** Bir yolu tüm dillerde, birbirine bağlı olarak listeler. */
function inAllLocales(
  path: string,
  entry: Omit<MetadataRoute.Sitemap[number], "url" | "alternates">,
): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({
    ...entry,
    url: `${SITE_URL}/${locale}${path}`,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((alt) => [alt, `${SITE_URL}/${alt}${path}`]),
      ),
    },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages = routes.flatMap(({ path, priority, changeFrequency }) =>
    inAllLocales(path, { lastModified: now, changeFrequency, priority }),
  );

  // Hizmet ve blog sayfaları panelden geliyor. Veritabanına ulaşılamazsa
  // sayfa listesi yine de yayınlanır — sitemap'in tamamı kaybolmasın.
  let serviceAnchors: string[] = [];
  try {
    serviceAnchors = (await getServices("tr")).map((s) => s.anchor);
  } catch {
    serviceAnchors = [];
  }

  const servicePages = serviceAnchors.flatMap((anchor) =>
    inAllLocales(`/services/${anchor}`, {
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  let posts: BlogPostDoc[] = [];
  try {
    posts = await getBlogPosts("tr");
  } catch {
    posts = [];
  }

  const postPages = posts.flatMap((post) =>
    inAllLocales(`/blog/${post.slug}`, {
      lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
      changeFrequency: "monthly",
      priority: 0.6,
    }),
  );

  // Sözlük terimleri yalnızca Türkçe yazıldı; İngilizce adres aynı metni
  // gösterdiği için listeye sadece Türkçe sürüm giriyor.
  const glossaryPages: MetadataRoute.Sitemap = glossary.map((term) => ({
    url: `${SITE_URL}/tr/sozluk/${term.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticPages, ...servicePages, ...postPages, ...glossaryPages];
}
