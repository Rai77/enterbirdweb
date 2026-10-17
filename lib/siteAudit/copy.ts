import type { Issue, Locale, Severity } from "./types";

/**
 * Bulgu metinleri. Her bulgu: neden önemli (satış diliyle) ve ne yapılmalı.
 * İstatistik ya da sonuç vaadi yok; yalnızca doğrulanabilir genel bilgiler.
 */

type Text = { title: string; detail: string; fix: string };
type Entry = { severity: Severity; category: Issue["category"]; tr: Text; en: Text };

export const ISSUES = {
  noHttps: {
    severity: "critical",
    category: "trust",
    tr: {
      title: "Site güvenli bağlantı (https) kullanmıyor",
      detail: "Tarayıcılar şifresiz sayfaları \"Güvenli değil\" diye işaretler. Ödeme ve üyelik adımlarında bu uyarı müşteriyi doğrudan kaçırır.",
      fix: "SSL sertifikası kurun ve tüm http adreslerini kalıcı olarak https'e yönlendirin.",
    },
    en: {
      title: "The site doesn't use a secure connection (https)",
      detail: "Browsers flag unencrypted pages as \"Not secure\". At checkout and sign-up, that warning drives customers away.",
      fix: "Install an SSL certificate and permanently redirect every http address to https.",
    },
  },
  noindex: {
    severity: "critical",
    category: "seo",
    tr: {
      title: "Ana sayfa Google'dan gizlenmiş (noindex)",
      detail: "Sayfada arama motorlarına \"beni dizine ekleme\" diyen bir etiket var. Bu etiket kaldıkça sayfa Google'da görünmez.",
      fix: "Yayındaki sitede robots meta etiketinden ve X-Robots-Tag başlığından noindex'i kaldırın.",
    },
    en: {
      title: "The home page is hidden from Google (noindex)",
      detail: "The page tells search engines not to index it. As long as that tag stays, the page won't appear on Google.",
      fix: "Remove noindex from the robots meta tag and the X-Robots-Tag header on the live site.",
    },
  },
  slow: {
    severity: "critical",
    category: "speed",
    tr: {
      title: "Mobil hız puanı düşük",
      detail: "Google'ın ölçümünde sayfa mobilde yavaş açılıyor. Reklamdan gelen ziyaretçinin büyük kısmı mobilden gelir; yavaş açılan sayfa hem satışı hem reklam verimini düşürür.",
      fix: "Görselleri sıkıştırın ve modern formata (WebP/AVIF) çevirin, kullanılmayan uygulama ve kodları kaldırın, üçüncü taraf betikleri geciktirin.",
    },
    en: {
      title: "Low mobile speed score",
      detail: "Google's test shows the page loads slowly on mobile. Most ad traffic is mobile, and a slow page hurts both sales and ad efficiency.",
      fix: "Compress images and serve modern formats (WebP/AVIF), remove unused apps and code, and defer third-party scripts.",
    },
  },
  mediumSpeed: {
    severity: "high",
    category: "speed",
    tr: {
      title: "Mobil hız geliştirilmeli",
      detail: "Sayfa kabul edilebilir hızda ama Google'ın \"iyi\" sınırının altında. Her ek saniye sepete ekleme oranını aşağı çeker.",
      fix: "En büyük görseli (genelde vitrin görseli) küçültün, yazı tiplerini önceden yükleyin, gereksiz betikleri temizleyin.",
    },
    en: {
      title: "Mobile speed needs work",
      detail: "The page is acceptable but below Google's \"good\" threshold. Every extra second pulls add-to-cart rates down.",
      fix: "Shrink the largest image (usually the hero), preload fonts, and clean up unnecessary scripts.",
    },
  },
  poorLcp: {
    severity: "high",
    category: "speed",
    tr: {
      title: "Ana içerik geç görünüyor",
      detail: "Sayfadaki en büyük öğe (vitrin görseli ya da ürün fotoğrafı) mobilde geç yükleniyor. Müşteri bu sürede boş ekrana bakıyor.",
      fix: "Vitrin görselini sıkıştırın, öncelikli yükleyin (fetchpriority=high) ve tembel yüklemeden (lazy) çıkarın.",
    },
    en: {
      title: "The main content appears late",
      detail: "The largest element (hero or product image) loads late on mobile, so visitors stare at an empty screen.",
      fix: "Compress the hero image, load it with high priority (fetchpriority=high) and exclude it from lazy loading.",
    },
  },
  poorCls: {
    severity: "medium",
    category: "speed",
    tr: {
      title: "Sayfa yüklenirken kayıyor",
      detail: "Öğeler yüklenirken yer değiştiriyor. Müşteri yanlış düğmeye basabiliyor; Google bunu sayfa deneyimi ölçütlerinde olumsuz sayar.",
      fix: "Görsellere ve banner alanlarına sabit genişlik/yükseklik verin, geç yüklenen bildirim çubuklarına yer ayırın.",
    },
    en: {
      title: "The page shifts while loading",
      detail: "Elements move as the page loads, so customers can tap the wrong button. Google counts this against page experience.",
      fix: "Give images and banners fixed dimensions and reserve space for late-loading bars and pop-ups.",
    },
  },
  poorTbt: {
    severity: "medium",
    category: "speed",
    tr: {
      title: "Sayfa açıldıktan sonra donuyor",
      detail: "Ağır JavaScript yüzünden sayfa bir süre dokunuşlara cevap vermiyor. Menü, filtre ve sepet düğmeleri gecikmeli çalışıyor.",
      fix: "Kullanılmayan uygulamaları kaldırın, sohbet ve analiz betiklerini sayfa yüklendikten sonra çalıştırın.",
    },
    en: {
      title: "The page freezes after loading",
      detail: "Heavy JavaScript keeps the page from responding to taps for a while. Menus, filters and cart buttons react late.",
      fix: "Remove unused apps and run chat and analytics scripts after the page has loaded.",
    },
  },
  noTitle: {
    severity: "high",
    category: "seo",
    tr: {
      title: "Sayfa başlığı (title) eksik",
      detail: "Google arama sonucunda gösterilecek başlığı kendisi uydurmak zorunda kalıyor. Tıklanma oranı düşer.",
      fix: "Marka adını ve ana ürün grubunu içeren 30–60 karakterlik bir başlık yazın.",
    },
    en: {
      title: "The page title is missing",
      detail: "Google has to make up the headline it shows in search results, which lowers click-through.",
      fix: "Write a 30–60 character title that includes your brand and main product category.",
    },
  },
  badTitle: {
    severity: "low",
    category: "seo",
    tr: {
      title: "Sayfa başlığının uzunluğu uygun değil",
      detail: "Başlık çok kısa ya da arama sonucunda kesilecek kadar uzun.",
      fix: "Başlığı 30–60 karakter arasında, en önemli kelimeler başta olacak şekilde düzenleyin.",
    },
    en: {
      title: "The page title length isn't ideal",
      detail: "The title is either too short or long enough to be cut off in search results.",
      fix: "Keep it between 30 and 60 characters with the most important words first.",
    },
  },
  noDescription: {
    severity: "medium",
    category: "seo",
    tr: {
      title: "Meta açıklaması eksik",
      detail: "Arama sonucunda başlığın altındaki metni Google sayfadan rastgele seçiyor. İyi bir açıklama tıklanma sebebidir.",
      fix: "Ürünlerinizi, kargo/iade avantajınızı anlatan 120–160 karakterlik bir açıklama yazın.",
    },
    en: {
      title: "The meta description is missing",
      detail: "Google picks the snippet under your title at random. A good description is a reason to click.",
      fix: "Write a 120–160 character description covering your products and shipping/returns advantage.",
    },
  },
  noViewport: {
    severity: "critical",
    category: "mobile",
    tr: {
      title: "Sayfa mobil uyumlu görünmüyor",
      detail: "Mobil görünüm etiketi (viewport) yok. Telefonda sayfa küçülmüş masaüstü görünümüyle açılıyor.",
      fix: "Temaya <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"> ekleyin ve mobil tasarımı kontrol edin.",
    },
    en: {
      title: "The page doesn't look mobile-friendly",
      detail: "There's no viewport tag, so phones show a shrunken desktop layout.",
      fix: "Add <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"> to the theme and check the mobile design.",
    },
  },
  noCanonical: {
    severity: "low",
    category: "seo",
    tr: {
      title: "Kanonik adres (canonical) tanımlı değil",
      detail: "Filtre ve kampanya parametreli adresler aynı sayfanın kopyası gibi görünebilir; sıralama gücü bölünür.",
      fix: "Her sayfaya kendi asıl adresini gösteren canonical etiketi ekleyin.",
    },
    en: {
      title: "No canonical URL",
      detail: "Filtered and campaign URLs can look like duplicates of the same page, splitting ranking strength.",
      fix: "Add a canonical tag pointing each page to its main address.",
    },
  },
  noH1: {
    severity: "low",
    category: "seo",
    tr: {
      title: "Ana başlık (H1) yok",
      detail: "Sayfanın konusunu anlatan bir ana başlık bulunamadı.",
      fix: "Ana sayfada markanızı ve ne sattığınızı anlatan tek bir H1 başlığı kullanın.",
    },
    en: {
      title: "No main heading (H1)",
      detail: "There's no main heading that says what the page is about.",
      fix: "Use a single H1 on the home page stating your brand and what you sell.",
    },
  },
  noStructuredData: {
    severity: "high",
    category: "seo",
    tr: {
      title: "Yapılandırılmış veri (schema) yok",
      detail: "Google ve yapay zekâ arama araçları markanızı ve ürünlerinizi tanımak için bu veriyi kullanır. Ürün sayfalarında fiyat, stok ve puan bilgisinin aramada görünmesini sağlar.",
      fix: "Ana sayfaya Organization/WebSite, ürün sayfalarına Product (fiyat, stok, yorum) şeması ekleyin.",
    },
    en: {
      title: "No structured data (schema)",
      detail: "Google and AI search tools use it to understand your brand and products. On product pages it enables price, stock and rating details in search.",
      fix: "Add Organization/WebSite schema to the home page and Product schema (price, availability, reviews) to product pages.",
    },
  },
  noOg: {
    severity: "low",
    category: "seo",
    tr: {
      title: "Sosyal paylaşım görseli tanımlı değil",
      detail: "Bağlantınız WhatsApp, Instagram veya LinkedIn'de paylaşıldığında önizleme görseli ve başlık düzgün çıkmıyor.",
      fix: "og:title, og:description ve og:image etiketlerini ekleyin.",
    },
    en: {
      title: "No social sharing image",
      detail: "When your link is shared on WhatsApp, Instagram or LinkedIn, the preview image and title don't show properly.",
      fix: "Add og:title, og:description and og:image tags.",
    },
  },
  noAnalytics: {
    severity: "high",
    category: "tracking",
    tr: {
      title: "Ziyaretçi ölçümü (Google Analytics / Tag Manager) bulunamadı",
      detail: "Hangi kanalın satış getirdiğini ölçemeyen bir mağaza, reklam bütçesini tahminle harcar.",
      fix: "GA4'ü (tercihen Google Tag Manager ile) kurun ve satın alma olaylarını gönderin.",
    },
    en: {
      title: "No visitor analytics (Google Analytics / Tag Manager) found",
      detail: "A store that can't measure which channel drives sales spends its ad budget on guesswork.",
      fix: "Set up GA4 (ideally via Google Tag Manager) and send purchase events.",
    },
  },
  noMetaPixel: {
    severity: "medium",
    category: "tracking",
    tr: {
      title: "Meta (Facebook/Instagram) pikseli bulunamadı",
      detail: "Instagram ve Facebook reklamları satın almayı göremezse doğru kitleyi bulmakta zorlanır ve yeniden hedefleme yapılamaz.",
      fix: "Meta Pikseli'ni ve mümkünse Dönüşümler API'sini kurun.",
    },
    en: {
      title: "No Meta (Facebook/Instagram) pixel found",
      detail: "If Instagram and Facebook ads can't see purchases, they struggle to find the right audience and can't retarget.",
      fix: "Install the Meta Pixel and, if possible, the Conversions API.",
    },
  },
  imagesNoAlt: {
    severity: "medium",
    category: "seo",
    tr: {
      title: "Görsellerin çoğunda açıklama (alt metin) yok",
      detail: "Google Görseller'den gelen trafik ve erişilebilirlik için ürün görsellerinin ne olduğunu anlatan alt metinler gerekir.",
      fix: "Ürün görsellerine ürün adını ve rengini/modelini anlatan kısa alt metinler yazın.",
    },
    en: {
      title: "Most images have no alt text",
      detail: "Alt text describing product images matters for Google Images traffic and accessibility.",
      fix: "Add short alt text with the product name and colour/model to product images.",
    },
  },
  noRobots: {
    severity: "low",
    category: "seo",
    tr: {
      title: "robots.txt dosyası bulunamadı",
      detail: "Arama motorlarına sitenin nasıl taranacağını ve site haritasının yerini söyleyen dosya yok.",
      fix: "Kök dizine site haritası adresini de içeren bir robots.txt ekleyin.",
    },
    en: {
      title: "No robots.txt file",
      detail: "There's no file telling search engines how to crawl the site and where the sitemap is.",
      fix: "Add a robots.txt at the root that also lists your sitemap URL.",
    },
  },
  noSitemap: {
    severity: "medium",
    category: "seo",
    tr: {
      title: "Site haritası (sitemap.xml) bulunamadı",
      detail: "Yeni ürün ve kategori sayfalarının Google'da hızlı görünmesi için site haritası gerekir.",
      fix: "sitemap.xml oluşturun ve Google Search Console'a gönderin.",
    },
    en: {
      title: "No sitemap (sitemap.xml) found",
      detail: "A sitemap helps new product and category pages show up on Google quickly.",
      fix: "Create sitemap.xml and submit it in Google Search Console.",
    },
  },
  noLang: {
    severity: "low",
    category: "seo",
    tr: {
      title: "Sayfanın dili belirtilmemiş",
      detail: "Arama motorları ve ekran okuyucular sayfanın hangi dilde olduğunu tahmin etmek zorunda kalıyor.",
      fix: "<html lang=\"tr\"> gibi bir dil etiketi ekleyin; yurt dışına satıyorsanız hreflang da kullanın.",
    },
    en: {
      title: "Page language isn't declared",
      detail: "Search engines and screen readers have to guess the page language.",
      fix: "Add a language attribute such as <html lang=\"en\">, and use hreflang if you sell abroad.",
    },
  },
  heavyHtml: {
    severity: "medium",
    category: "speed",
    tr: {
      title: "Sayfa kodu çok ağır",
      detail: "Ana sayfanın HTML'i olağandan büyük. Bu, mobilde ilk açılışı yavaşlatır.",
      fix: "Sayfaya gömülü büyük veri bloklarını ve tekrar eden ürün listelerini azaltın.",
    },
    en: {
      title: "The page code is very heavy",
      detail: "The home page HTML is unusually large, which slows the first load on mobile.",
      fix: "Reduce large embedded data blocks and repeated product lists.",
    },
  },
} satisfies Record<string, Entry>;

export type IssueId = keyof typeof ISSUES;

export function issue(id: IssueId, locale: Locale): Issue {
  const e: Entry = ISSUES[id];
  return { id, severity: e.severity, category: e.category, ...e[locale] };
}

/** Geçilen kontrollerin kısa adları. */
export const PASSED: Record<string, Record<Locale, string>> = {
  https: { tr: "Güvenli bağlantı (https)", en: "Secure connection (https)" },
  viewport: { tr: "Mobil görünüm etiketi", en: "Mobile viewport tag" },
  title: { tr: "Sayfa başlığı", en: "Page title" },
  description: { tr: "Meta açıklaması", en: "Meta description" },
  canonical: { tr: "Kanonik adres", en: "Canonical URL" },
  h1: { tr: "Ana başlık (H1)", en: "Main heading (H1)" },
  schema: { tr: "Yapılandırılmış veri", en: "Structured data" },
  og: { tr: "Sosyal paylaşım etiketleri", en: "Social sharing tags" },
  analytics: { tr: "Google Analytics / Tag Manager", en: "Google Analytics / Tag Manager" },
  pixel: { tr: "Meta pikseli", en: "Meta pixel" },
  alt: { tr: "Görsel alt metinleri", en: "Image alt text" },
  robots: { tr: "robots.txt", en: "robots.txt" },
  sitemap: { tr: "Site haritası", en: "Sitemap" },
  lang: { tr: "Dil etiketi", en: "Language attribute" },
  indexable: { tr: "Google'a açık (noindex yok)", en: "Indexable (no noindex)" },
  speed: { tr: "Mobil hız", en: "Mobile speed" },
};
