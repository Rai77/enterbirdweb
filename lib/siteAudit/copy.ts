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

  // ── Site hataları ──────────────────────────────────────────────────
  brokenLinks: {
    severity: "high",
    category: "errors",
    tr: {
      title: "Kırık bağlantılar var",
      detail: "Ana sayfadaki bazı bağlantılar \"sayfa bulunamadı\" ya da sunucu hatası veriyor. Müşteri tıkladığında boş sayfaya düşüyor; Google da bunu bakımsız site işareti sayar.",
      fix: "Aşağıdaki adresleri düzeltin ya da kaldırın; silinen ürün ve kategoriler için ilgili sayfaya kalıcı (301) yönlendirme kurun.",
    },
    en: {
      title: "Broken links found",
      detail: "Some links on the home page return \"not found\" or a server error. Customers land on a dead page, and Google reads it as a sign of a poorly maintained site.",
      fix: "Fix or remove the addresses below, and set up permanent (301) redirects for removed products and categories.",
    },
  },
  brokenImages: {
    severity: "high",
    category: "errors",
    tr: {
      title: "Açılmayan görseller var",
      detail: "Sayfadaki bazı görseller yüklenemiyor. Müşteri boş kutu ya da kırık resim simgesi görüyor; bu, güveni doğrudan zedeler.",
      fix: "Aşağıdaki görselleri yeniden yükleyin ya da sayfadan kaldırın.",
    },
    en: {
      title: "Some images fail to load",
      detail: "Some images on the page can't be loaded, so customers see empty boxes or broken-image icons. That directly hurts trust.",
      fix: "Re-upload the images below or remove them from the page.",
    },
  },
  mixedContent: {
    severity: "medium",
    category: "errors",
    tr: {
      title: "Güvenli sayfada güvensiz (http) dosyalar yükleniyor",
      detail: "Sayfa https olsa da bazı görsel, betik veya stil dosyaları http üzerinden çağrılıyor. Tarayıcı bunları engelleyebilir ya da adres çubuğunda güvenlik uyarısı gösterebilir.",
      fix: "Aşağıdaki adresleri https ile değiştirin.",
    },
    en: {
      title: "Insecure (http) files load on a secure page",
      detail: "The page is https, but some images, scripts or stylesheets are requested over http. Browsers may block them or show a security warning.",
      fix: "Change the addresses below to https.",
    },
  },
  noHttpsRedirect: {
    severity: "high",
    category: "errors",
    tr: {
      title: "http adresi https'e yönlenmiyor",
      detail: "Sitenin http:// ile başlayan adresi güvenli sürüme otomatik geçmiyor. Eski bağlantılardan gelen ziyaretçiler \"Güvenli değil\" uyarısı görüyor.",
      fix: "Sunucuda ya da altyapı panelinde tüm http isteklerini kalıcı (301) olarak https'e yönlendirin.",
    },
    en: {
      title: "http doesn't redirect to https",
      detail: "The http:// version of the site doesn't switch to the secure version, so visitors from old links see a \"Not secure\" warning.",
      fix: "Permanently (301) redirect every http request to https on the server or in your platform settings.",
    },
  },
  wwwBroken: {
    severity: "medium",
    category: "errors",
    tr: {
      title: "www'lu (veya www'suz) adres açılmıyor",
      detail: "Sitenin bir sürümü açılmıyor. Adresi alışkanlıkla www ile (ya da www'suz) yazan müşteri siteye ulaşamıyor.",
      fix: "Alan adı ayarlarına eksik kaydı ekleyin ve iki adresi de tek bir adrese kalıcı olarak yönlendirin.",
    },
    en: {
      title: "The www (or non-www) address doesn't open",
      detail: "One version of the address doesn't load, so customers who type it out of habit can't reach the site.",
      fix: "Add the missing DNS record and permanently redirect both addresses to a single one.",
    },
  },
  wwwDuplicate: {
    severity: "low",
    category: "errors",
    tr: {
      title: "www'lu ve www'suz adres ayrı site gibi açılıyor",
      detail: "İki adres de aynı sayfayı yönlendirme olmadan gösteriyor. Google bunları kopya içerik sayabilir.",
      fix: "Birini ana adres seçin, diğerini ona kalıcı (301) yönlendirin.",
    },
    en: {
      title: "www and non-www open as separate sites",
      detail: "Both addresses show the same page without redirecting, which Google may treat as duplicate content.",
      fix: "Pick one as the main address and permanently (301) redirect the other to it.",
    },
  },
  redirectChain: {
    severity: "low",
    category: "errors",
    tr: {
      title: "Ana sayfaya ulaşmak için birden fazla yönlendirme var",
      detail: "Adres yazıldığında sayfa açılmadan önce birkaç kez yönlendiriliyor. Her adım mobilde gecikme demek.",
      fix: "Tüm eski adresleri tek adımda son adrese yönlendirin.",
    },
    en: {
      title: "Several redirects before the home page",
      detail: "The address bounces through several redirects before the page opens. Each hop adds delay on mobile.",
      fix: "Redirect every old address to the final one in a single step.",
    },
  },
  soft404: {
    severity: "medium",
    category: "errors",
    tr: {
      title: "Olmayan sayfalar \"bulunamadı\" demiyor",
      detail: "Var olmayan bir adres 404 yerine normal sayfa gibi (200) dönüyor. Google bu boş sayfaları dizine alıp sitenizin kalitesini düşük değerlendirebilir.",
      fix: "Bulunamayan sayfalar için 404 durum kodu döndüren bir hata sayfası kullanın.",
    },
    en: {
      title: "Missing pages don't say \"not found\"",
      detail: "A non-existent address returns a normal page (200) instead of 404. Google may index these empty pages and rate your site lower.",
      fix: "Use an error page that returns a 404 status code for missing pages.",
    },
  },
  sslExpiring: {
    severity: "high",
    category: "errors",
    tr: {
      title: "SSL sertifikasının süresi dolmak üzere",
      detail: "Sertifika yenilenmezse tarayıcılar siteyi \"güvenli değil\" diye engelleyecek ve satış duracak.",
      fix: "Sertifikayı hemen yenileyin ya da otomatik yenilemeyi açın.",
    },
    en: {
      title: "The SSL certificate is about to expire",
      detail: "If it isn't renewed, browsers will block the site as \"not secure\" and sales will stop.",
      fix: "Renew the certificate now or turn on automatic renewal.",
    },
  },
  sslInvalid: {
    severity: "critical",
    category: "errors",
    tr: {
      title: "SSL sertifikası geçersiz",
      detail: "Tarayıcılar bu sertifikaya güvenmiyor; ziyaretçiler güvenlik uyarısı görüyor.",
      fix: "Alan adınıza uygun, güvenilir bir sertifika kurun (ör. Let's Encrypt).",
    },
    en: {
      title: "The SSL certificate is invalid",
      detail: "Browsers don't trust this certificate, so visitors see a security warning.",
      fix: "Install a trusted certificate that matches your domain (e.g. Let's Encrypt).",
    },
  },
  consoleErrors: {
    severity: "medium",
    category: "errors",
    tr: {
      title: "Sayfada JavaScript hataları var",
      detail: "Google'ın testinde tarayıcı konsoluna hata yazıldı. Bu hatalar menü, filtre, sepet veya ölçüm kodlarının çalışmamasına yol açabilir.",
      fix: "Geliştiricinizle konsol hatalarını giderin; çoğu zaman eski bir uygulama ya da bozuk bir izleme kodu sebeptir.",
    },
    en: {
      title: "JavaScript errors on the page",
      detail: "Google's test logged errors to the browser console. They can break menus, filters, the cart or tracking.",
      fix: "Have your developer clear the console errors; an old app or a broken tracking snippet is often the cause.",
    },
  },
  accessibility: {
    severity: "low",
    category: "errors",
    tr: {
      title: "Erişilebilirlik sorunları var",
      detail: "Google'ın erişilebilirlik testinde eksikler bulundu: okunması zor renkler, etiketsiz düğme ve bağlantılar gibi. Bunlar hem kullanıcı deneyimini hem görünürlüğü etkiler.",
      fix: "Aşağıdaki maddeleri tema ayarlarında düzeltin.",
    },
    en: {
      title: "Accessibility issues",
      detail: "Google's accessibility test found gaps such as low-contrast text and unlabeled buttons or links. They affect both usability and visibility.",
      fix: "Fix the items below in your theme settings.",
    },
  },

  // ── Güven ve satış ─────────────────────────────────────────────────
  noReturnPolicy: {
    severity: "high",
    category: "trust",
    tr: {
      title: "İade ve değişim bilgisine ulaşılamıyor",
      detail: "Ana sayfada iade/değişim koşullarına giden bir bağlantı bulunamadı. Online alışverişte müşterinin en çok aradığı bilgilerden biri bu.",
      fix: "Alt menüye ve ürün sayfalarına \"İade ve Değişim\" bağlantısı ekleyin.",
    },
    en: {
      title: "No returns and exchanges information",
      detail: "There's no link to return/exchange terms on the home page. It's one of the first things online shoppers look for.",
      fix: "Add a \"Returns & Exchanges\" link to the footer and product pages.",
    },
  },
  noPrivacy: {
    severity: "high",
    category: "trust",
    tr: {
      title: "KVKK / gizlilik metni bulunamadı",
      detail: "Ana sayfada KVKK aydınlatma metni ya da gizlilik politikasına bağlantı yok. Kişisel veri toplayan siteler için bu yasal bir zorunluluk.",
      fix: "KVKK aydınlatma metni, çerez politikası ve gizlilik politikasını hazırlayıp alt menüye bağlayın.",
    },
    en: {
      title: "No privacy policy found",
      detail: "There's no link to a privacy policy on the home page. For sites that collect personal data it's a legal requirement.",
      fix: "Publish a privacy policy and cookie policy and link them in the footer.",
    },
  },
  noTerms: {
    severity: "medium",
    category: "trust",
    tr: {
      title: "Mesafeli satış sözleşmesi bağlantısı yok",
      detail: "Türkiye'de online satışta mesafeli satış sözleşmesi ve ön bilgilendirme formu zorunludur; müşterinin bunlara ulaşabilmesi gerekir.",
      fix: "Mesafeli satış sözleşmesi ve ön bilgilendirme formunu alt menüye ekleyin.",
    },
    en: {
      title: "No terms of sale link",
      detail: "Customers should be able to find your terms of sale before they buy.",
      fix: "Add your terms of sale (and distance-selling terms where required) to the footer.",
    },
  },
  noContact: {
    severity: "medium",
    category: "trust",
    tr: {
      title: "İletişim bilgisi bulunamadı",
      detail: "Ana sayfada telefon, e-posta ya da iletişim sayfasına bağlantı yok. Ulaşılabilir görünmeyen bir mağazaya müşteri güvenmez.",
      fix: "Alt menüye telefon, e-posta ve iletişim sayfası bağlantısı ekleyin.",
    },
    en: {
      title: "No contact information",
      detail: "There's no phone, email or contact page link on the home page. Customers don't trust a store that looks unreachable.",
      fix: "Add a phone number, email and contact page link to the footer.",
    },
  },
  noWhatsapp: {
    severity: "low",
    category: "trust",
    tr: {
      title: "WhatsApp ile hızlı iletişim yok",
      detail: "Türkiye'de müşterilerin önemli bir kısmı soru sormak için önce WhatsApp'ı dener. Hızlı ulaşabildiği mağazadan alışveriş yapma ihtimali artar.",
      fix: "Sitenin köşesine bir WhatsApp butonu ekleyin.",
    },
    en: {
      title: "No quick WhatsApp contact",
      detail: "Many shoppers try WhatsApp first when they have a question. A store they can reach quickly is more likely to get the sale.",
      fix: "Add a WhatsApp button to a corner of the site.",
    },
  },
  noPaymentTrust: {
    severity: "low",
    category: "trust",
    tr: {
      title: "Ödeme yöntemleri ve güvenli ödeme gösterilmiyor",
      detail: "Ana sayfada kabul edilen kartlar, taksit ya da güvenli ödeme altyapısına dair bir işaret bulunamadı. Bunlar ilk kez gelen müşterinin güvenini artırır.",
      fix: "Alt kısma ödeme logolarını (Visa, Mastercard, Troy, iyzico vb.) ve \"Güvenli ödeme\" ibaresini ekleyin.",
    },
    en: {
      title: "Payment methods and secure checkout aren't shown",
      detail: "There's no sign of accepted cards, installments or a secure payment provider on the home page. These reassure first-time visitors.",
      fix: "Add payment logos (Visa, Mastercard, PayPal, etc.) and a \"Secure checkout\" note to the footer.",
    },
  },

  // ── Ürün sayfası ───────────────────────────────────────────────────
  productNoSchema: {
    severity: "high",
    category: "product",
    tr: {
      title: "Ürün sayfasında ürün bilgisi Google'a verilmiyor",
      detail: "İncelenen ürün sayfasında Product (ürün) yapılandırılmış verisi yok. Google aramada fiyat, stok ve puan gösteremiyor; Google Alışveriş'te ücretsiz listelemeler de zorlaşıyor.",
      fix: "Ürün sayfalarına ad, görsel, fiyat, para birimi, stok durumu ve varsa puan içeren Product şeması ekleyin.",
    },
    en: {
      title: "Product details aren't given to Google",
      detail: "The product page has no Product structured data, so Google can't show price, stock or ratings in search, and free Shopping listings are harder.",
      fix: "Add Product schema with name, image, price, currency, availability and rating (if any) to product pages.",
    },
  },
  productSchemaIncomplete: {
    severity: "medium",
    category: "product",
    tr: {
      title: "Ürün bilgisinde eksik alanlar var",
      detail: "Ürün şeması var ama Google'ın arama sonucunda zengin görünüm için kullandığı bazı alanlar eksik.",
      fix: "Aşağıdaki eksik alanları ürün şemasına ekleyin.",
    },
    en: {
      title: "Product data is missing fields",
      detail: "The product schema exists, but some fields Google uses for rich results are missing.",
      fix: "Add the missing fields below to the product schema.",
    },
  },
  productNoCart: {
    severity: "medium",
    category: "product",
    tr: {
      title: "Ürün sayfasında \"Sepete ekle\" düğmesi bulunamadı",
      detail: "İncelenen ürün sayfasının ilk yüklenen kodunda sepete ekleme ya da satın alma düğmesi görünmüyor. Düğme sonradan yükleniyorsa yavaş bağlantılarda geç çıkabilir.",
      fix: "Sepete ekle düğmesinin sayfa açılır açılmaz görünür olduğundan emin olun.",
    },
    en: {
      title: "No \"Add to cart\" button found on the product page",
      detail: "The product page's initial code shows no add-to-cart or buy button. If it loads later, it may appear late on slow connections.",
      fix: "Make sure the add-to-cart button is visible as soon as the page opens.",
    },
  },
  productNoReviews: {
    severity: "low",
    category: "product",
    tr: {
      title: "Ürün sayfasında müşteri yorumu yok",
      detail: "İncelenen ürün sayfasında yorum ya da puan bulunamadı. Yorumlar, ilk kez alışveriş yapacak müşteri için en güçlü güven unsurlarından biri.",
      fix: "Satış sonrası yorum isteyen bir sistem kurun ve yorumları ürün sayfasında gösterin.",
    },
    en: {
      title: "No customer reviews on the product page",
      detail: "No reviews or ratings were found on the product page. Reviews are one of the strongest trust signals for first-time buyers.",
      fix: "Set up post-purchase review requests and show reviews on product pages.",
    },
  },
  productFewImages: {
    severity: "low",
    category: "product",
    tr: {
      title: "Ürün görseli az",
      detail: "İncelenen ürün için 3'ten az görsel bulundu. Farklı açılar ve kullanım fotoğrafları, iade oranını düşürmeye ve satışı artırmaya yardımcı olur.",
      fix: "Her ürün için en az 4–5 görsel kullanın: ön, arka, detay ve kullanım fotoğrafı.",
    },
    en: {
      title: "Few product images",
      detail: "Fewer than 3 images were found for the product. Multiple angles and lifestyle shots help reduce returns and lift sales.",
      fix: "Use at least 4–5 images per product: front, back, detail and in-use shots.",
    },
  },
} satisfies Record<string, Entry>;

export type IssueId = keyof typeof ISSUES;

export function issue(id: IssueId, locale: Locale, items?: string[]): Issue {
  const e: Entry = ISSUES[id];
  return { id, severity: e.severity, category: e.category, ...e[locale], ...(items?.length ? { items } : {}) };
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
  links: { tr: "Kırık bağlantı yok", en: "No broken links" },
  images: { tr: "Görseller açılıyor", en: "Images load" },
  mixed: { tr: "Güvensiz (http) dosya yok", en: "No insecure (http) files" },
  httpsRedirect: { tr: "http → https yönlendirmesi", en: "http → https redirect" },
  www: { tr: "www adresi doğru yönleniyor", en: "www redirects correctly" },
  notFound: { tr: "404 sayfası doğru çalışıyor", en: "404 page works correctly" },
  ssl: { tr: "SSL sertifikası geçerli", en: "Valid SSL certificate" },
  console: { tr: "Konsol hatası yok", en: "No console errors" },
  returns: { tr: "İade ve değişim bilgisi", en: "Returns information" },
  privacy: { tr: "KVKK / gizlilik metni", en: "Privacy policy" },
  terms: { tr: "Mesafeli satış sözleşmesi", en: "Terms of sale" },
  contact: { tr: "İletişim bilgisi", en: "Contact information" },
  whatsapp: { tr: "WhatsApp iletişimi", en: "WhatsApp contact" },
  payment: { tr: "Ödeme ve güven işaretleri", en: "Payment and trust badges" },
  productSchema: { tr: "Ürün yapılandırılmış verisi", en: "Product structured data" },
  cart: { tr: "Sepete ekle düğmesi", en: "Add to cart button" },
  reviews: { tr: "Ürün yorumları", en: "Product reviews" },
};
