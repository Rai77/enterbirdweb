import type { Locale } from "./types";

/**
 * Site analizi sayfasının arama (SEO) ve yapay zekâ asistanları (GEO) için
 * yazılmış açıklayıcı içeriği. Cümleler tek başına alıntılanabilecek şekilde
 * kısa ve net; yalnızca aracın gerçekten yaptığı kontrolleri anlatır.
 */

export const SEO_COPY = {
  tr: {
    keywordLine: "Ücretsiz e-ticaret site analizi",
    seoTitle: "Ücretsiz Site Analizi: E-Ticaret Hız, SEO ve Hata Testi",
    seoDescription:
      "Ücretsiz site analizi: e-ticaret sitenizin mobil hızını, SEO'sunu, kırık bağlantılarını, SSL ve reklam ölçümünü 1 dakikada test edin. Kayıt gerekmez.",
    appName: "Enterbird Ücretsiz Site Analizi",
    breadcrumbHome: "Ana sayfa",
    breadcrumbPage: "Ücretsiz Site Analizi",
    guideEyebrow: "Rehber",
    guideTitle: "Ücretsiz site analizi nedir?",
    guideIntro: [
      "Ücretsiz site analizi, bir e-ticaret sitesinin satışı etkileyen teknik ve pazarlama eksiklerini otomatik olarak tespit eden bir testtir. Enterbird'ün aracı mağazanızın herkese açık sayfalarını bir ziyaretçi gibi inceler, mobil hızı Google PageSpeed Insights ile ölçer ve bulduğu sorunları önem sırasına göre listeler.",
      "Analiz yaklaşık bir dakika sürer, kayıt veya kurulum gerektirmez ve sitenizde hiçbir değişiklik yapmaz. Sonuçta 0–100 arası bir genel puan, bölüm bölüm sorun sayıları ve her sorun için ne yapılması gerektiği yer alır.",
    ],
    checksTitle: "Site analizinde hangi kontroller yapılır?",
    checks: [
      { title: "Mobil hız", items: ["Google PageSpeed mobil performans puanı", "Ana içeriğin yüklenme süresi (LCP)", "Sayfanın donma süresi (TBT)", "Görsel kayma (CLS)", "Chrome gerçek kullanıcı verisi (varsa)"] },
      { title: "Site hataları", items: ["40'a kadar site içi bağlantının çalışıp çalışmadığı", "25'e kadar görselin yüklenip yüklenmediği", "SSL sertifikası ve kalan süresi", "http → https ve www yönlendirmeleri", "Olmayan sayfaların 404 döndürmesi", "Güvensiz (http) dosyalar ve konsol hataları"] },
      { title: "Google görünürlüğü (SEO)", items: ["Sayfa başlığı ve meta açıklaması", "Yapılandırılmış veri (schema)", "Site haritası ve robots.txt", "Kanonik adres, H1 ve dil etiketi", "noindex engeli", "Erişilebilirlik eksikleri"] },
      { title: "Reklam ölçümü", items: ["Google Analytics / Google Tag Manager", "Meta (Facebook/Instagram) pikseli"] },
      { title: "Güven ve yasal metinler", items: ["İade ve değişim bilgisi", "KVKK ve gizlilik metni", "Mesafeli satış sözleşmesi", "İletişim bilgisi ve WhatsApp", "Güvenli ödeme işaretleri"] },
      { title: "Ürün sayfası", items: ["Product şeması: fiyat, para birimi, stok, puan, marka", "Sepete ekle düğmesi", "Müşteri yorumları", "Ürün görseli sayısı"] },
    ],
    scoreTitle: "Site analizi puanı nasıl yorumlanır?",
    scoreIntro: "Genel puan, Google'ın mobil hız puanı ile site içi kontrollerin ortalamasıdır. Hız ölçülemezse puan yalnızca site kontrollerinden hesaplanır.",
    scoreBands: [
      { range: "85–100", label: "Çok iyi", text: "Temel kurulum sağlam; küçük iyileştirmelerle fark yaratılabilir." },
      { range: "65–84", label: "Geliştirilebilir", text: "Satışı etkileyen birkaç eksik var; önce kritik ve yüksek önemdeki bulgulara odaklanın." },
      { range: "45–64", label: "Satış kaçırıyor", text: "Hız, görünürlük veya güven sorunları dönüşümü belirgin şekilde düşürüyor olabilir." },
      { range: "0–44", label: "Acil müdahale gerekli", text: "Ziyaretçilerin bir kısmı satın almadan önce siteden ayrılıyor olabilir; öncelikli bir düzeltme planı gerekir." },
    ],
    extraFaq: [
      {
        q: "Site analizi nasıl yapılır?",
        a: "Bu sayfadaki kutuya mağazanızın adresini yazıp Analiz et'e basın. Araç sayfanızı açar, bağlantıları ve görselleri dener, Google PageSpeed ile mobil hızı ölçer ve yaklaşık bir dakikada puanınızı ve bulguları gösterir.",
      },
      {
        q: "Site hızı nasıl ölçülür?",
        a: "Hız, Google PageSpeed Insights'ın mobil testiyle ölçülür: ana içeriğin yüklenme süresi (LCP), sayfanın donma süresi (TBT) ve görsel kayma (CLS) gibi Core Web Vitals değerleri 0–100 arası bir puana dönüştürülür.",
      },
      {
        q: "Puanım düşük çıktı, ne yapmalıyım?",
        a: "Raporda kritik ve yüksek önemdeki bulgulardan başlayın; her bulgunun altında ne yapılması gerektiği yazar. Dilerseniz Enterbird ekibi raporu sizinle birlikte değerlendirip bir düzeltme planı çıkarır.",
      },
    ],
    promoTitle: "Mağazanız satış kaçırıyor mu?",
    promoText: "Ücretsiz site analizi ile mobil hızınızı, SEO'nuzu, kırık bağlantıları ve reklam ölçümünüzü 1 dakikada test edin.",
    promoCta: "Ücretsiz site analizi yap",
  },
  en: {
    keywordLine: "Free e-commerce site audit",
    seoTitle: "Free Website Audit: E-Commerce Speed, SEO and Error Check",
    seoDescription:
      "Free website audit: test your online store's mobile speed, SEO, broken links, SSL and ad tracking in about a minute. No sign-up required.",
    appName: "Enterbird Free Website Audit",
    breadcrumbHome: "Home",
    breadcrumbPage: "Free Website Audit",
    guideEyebrow: "Guide",
    guideTitle: "What is a free website audit?",
    guideIntro: [
      "A free website audit is an automated test that finds the technical and marketing gaps that hold back an online store's sales. Enterbird's tool reviews your store's public pages the way a visitor sees them, measures mobile speed with Google PageSpeed Insights and lists the issues it finds by impact.",
      "The audit takes about a minute, needs no sign-up or installation and changes nothing on your site. You get a 0–100 overall score, issue counts by section and what to do about each issue.",
    ],
    checksTitle: "What does the website audit check?",
    checks: [
      { title: "Mobile speed", items: ["Google PageSpeed mobile performance score", "Largest Contentful Paint (LCP)", "Total Blocking Time (TBT)", "Cumulative Layout Shift (CLS)", "Chrome real-user data (when available)"] },
      { title: "Site errors", items: ["Whether up to 40 internal links work", "Whether up to 25 images load", "SSL certificate and days left", "http → https and www redirects", "Missing pages returning 404", "Insecure (http) files and console errors"] },
      { title: "Google visibility (SEO)", items: ["Page title and meta description", "Structured data (schema)", "Sitemap and robots.txt", "Canonical URL, H1 and language attribute", "noindex blocks", "Accessibility gaps"] },
      { title: "Ad tracking", items: ["Google Analytics / Google Tag Manager", "Meta (Facebook/Instagram) pixel"] },
      { title: "Trust and legal pages", items: ["Returns and exchanges information", "Privacy policy", "Terms of sale", "Contact details and WhatsApp", "Secure payment badges"] },
      { title: "Product page", items: ["Product schema: price, currency, availability, rating, brand", "Add-to-cart button", "Customer reviews", "Number of product images"] },
    ],
    scoreTitle: "How to read your audit score",
    scoreIntro: "The overall score averages Google's mobile speed score and the on-site checks. If speed can't be measured, the score comes from the site checks only.",
    scoreBands: [
      { range: "85–100", label: "Very good", text: "The basics are solid; small improvements can still make a difference." },
      { range: "65–84", label: "Room to improve", text: "A few gaps affect sales; start with the critical and high-impact findings." },
      { range: "45–64", label: "Losing sales", text: "Speed, visibility or trust issues may be noticeably lowering conversion." },
      { range: "0–44", label: "Needs urgent work", text: "Some visitors may be leaving before they buy; a prioritised fix plan is needed." },
    ],
    extraFaq: [
      {
        q: "How do I audit my website?",
        a: "Enter your store's address in the box on this page and press Analyze. The tool opens your page, tests links and images, measures mobile speed with Google PageSpeed and shows your score and findings in about a minute.",
      },
      {
        q: "How is website speed measured?",
        a: "Speed is measured with Google PageSpeed Insights' mobile test: Core Web Vitals such as Largest Contentful Paint (LCP), Total Blocking Time (TBT) and Cumulative Layout Shift (CLS) are turned into a 0–100 score.",
      },
      {
        q: "My score is low. What should I do?",
        a: "Start with the critical and high-impact findings in the report; each one explains what to do. If you like, the Enterbird team can review the report with you and put together a fix plan.",
      },
    ],
    promoTitle: "Is your store losing sales?",
    promoText: "Test your mobile speed, SEO, broken links and ad tracking in a minute with our free website audit.",
    promoCta: "Run a free website audit",
  },
} satisfies Record<Locale, unknown>;
