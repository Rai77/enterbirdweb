/**
 * Repoda duran blog yazılarının listesi.
 *
 * Yeni yazı eklemek için:
 *   1. `content/blog/<slug>.ts` dosyasını aç, `RepoPost` tipinde `post` dışa aktar.
 *   2. Aşağıya bir import satırı ekle.
 *   3. Yazıyı `repoPosts` dizisinin başına koy (en yeni en üstte).
 *
 * Sıralama zaten `publishedAt` üzerinden yapılıyor; dizideki sıra sadece
 * dosyayı okuyan insan için.
 */
import type { RepoPost } from "./types";

import { post as performanceMax2026Kontroller } from "./performance-max-2026-kontroller";

export const repoPosts: RepoPost[] = [
  performanceMax2026Kontroller,
  // [liste] — yeni yazılar buraya
];

export type { RepoPost, RepoPostLocale } from "./types";
