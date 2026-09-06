/**
 * Sitenin kanonik adresi — tek kaynak.
 *
 * Vercel önizleme (preview) dağıtımlarında `NEXT_PUBLIC_SITE_URL` tanımlıysa
 * o kullanılır; yoksa canlı alan adına düşer. Böylece sitemap ve meta
 * etiketleri önizleme ortamında yanlış adres göstermez.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://enterbird.com"
).replace(/\/$/, "");
