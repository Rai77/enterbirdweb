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

/**
 * Google Analytics 4 ölçüm kimliği, ör. "G-AB12CD34EF".
 *
 * Gizli bir bilgi değil (sayfanın kaynağında zaten görünür), bu yüzden koda
 * yazılabilir. Analytics → Yönetici → Veri akışları → web akışı → "Ölçüm
 * kimliği". Vercel'de NEXT_PUBLIC_GA_ID girilirse o kullanılır.
 */
export const GA_MEASUREMENT_ID = (
  process.env.NEXT_PUBLIC_GA_ID || "G-8JVKM65GBH"
).trim();

/**
 * Google Search Console "HTML etiketi" doğrulama kodu: etiketteki
 * content="..." değeri. Doğrulamadan sonra da silinmemeli; silinirse
 * Search Console erişimi düşer.
 */
export const GOOGLE_SITE_VERIFICATION = (
  process.env.GOOGLE_SITE_VERIFICATION ?? ""
).trim();
