import type { ArticleBlock, ArticleSource } from "@/lib/blogArticles";

/** Bir yazının tek bir dildeki hâli: başlık, özet ve gövde. */
export type RepoPostLocale = {
  title: string;
  /** Kart üstünde görünen etiket, ör. "AI", "E-Ticaret". */
  category: string;
  excerpt: string;
  blocks: ArticleBlock[];
  sources?: ArticleSource[];
};

/**
 * Repoda dosya olarak duran blog yazısı.
 *
 * Panele girilen yazılar veritabanında durur; bunlar ise kodla birlikte
 * yayınlanır. Aynı slug iki yerde de varsa panel kazanır.
 */
export type RepoPost = {
  /** URL'de görünen ad, ör. "meta-advantage-plus-rehber". */
  slug: string;
  /** ISO tarih, ör. "2026-09-16". Listeleme buna göre sıralanır. */
  publishedAt: string;
  readingMinutes?: number;
  tr: RepoPostLocale;
  en: RepoPostLocale;
};
