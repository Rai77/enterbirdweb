import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";

/**
 * Sayfaların arama motoru etiketleri için ortak yardımcılar.
 *
 * Bir sayfa kendi kanonik adresini ve dil alternatiflerini söylemezse Google
 * TR ve EN sürümlerini birbirinin kopyası sayabiliyor. Blog ve sözlük
 * sayfaları bunu zaten veriyordu; ana sayfalarda eksikti.
 */

/**
 * Kanonik adres + dil alternatifleri.
 *
 * `locales` yalnızca içeriği gerçekten o dillerde yazılmış sayfalar için
 * daraltılır: sözlük terimleri sadece Türkçe olduğu için İngilizce adres,
 * kanonik olarak Türkçe sürümü gösterir.
 */
export function localizedAlternates(
  path: string,
  locale: string,
  locales: readonly string[] = routing.locales,
): NonNullable<Metadata["alternates"]> {
  const canonicalLocale = locales.includes(locale) ? locale : locales[0];
  const defaultLocale = locales.includes(routing.defaultLocale)
    ? routing.defaultLocale
    : locales[0];

  return {
    canonical: `${SITE_URL}/${canonicalLocale}${path}`,
    languages: {
      ...Object.fromEntries(
        locales.map((alt) => [alt, `${SITE_URL}/${alt}${path}`]),
      ),
      "x-default": `${SITE_URL}/${defaultLocale}${path}`,
    },
  };
}

/**
 * Başlığı, açıklaması ve etiketleriyle bir sayfanın metadata'sı.
 *
 * Next.js alt sayfadaki `openGraph`'ı üst düzeninkiyle birleştirmiyor, üzerine
 * yazıyor; paylaşım görseli kaybolmasın diye burada yeniden veriliyor.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
}): Metadata {
  return {
    title,
    description,
    alternates: localizedAlternates(path, locale),
    openGraph: {
      type: "website",
      siteName: "Enterbird",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      url: `${SITE_URL}/${locale}${path}`,
      title,
      description,
      images: [
        { url: "/logo_ai.png", width: 1024, height: 1024, alt: "Enterbird" },
      ],
    },
  };
}
