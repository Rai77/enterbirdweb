import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * /robots.txt — arama motorlarına nereye bakıp nereye bakmayacağını söyler.
 *
 * Yönetim paneli ve API uçları kapatıldı: bunların Google sonuçlarında
 * görünmesi hem gereksiz hem de saldırganlara adres vermek demek.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
