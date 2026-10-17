import type { Locale } from "./types";

/**
 * Site analizi açılış sayfasının tanıtım metinleri (araç metinleri pageCopy.ts'te).
 * Rakamlar aracın gerçekten yaptığı kontrollerden gelir; vaat ya da istatistik yok.
 */

export type FeatureIcon = "gauge" | "bug" | "search" | "chart" | "shield" | "bag";

export const LANDING_COPY = {
  tr: {
    badge: "Ücretsiz · Kayıt gerekmez",
    titleA: "Mağazanız",
    titleB: "neden satmıyor?",
    titleC: "1 dakikada görün.",
    sub: "Adresinizi yazın; mobil hızınızı Google'ın ölçümüyle test edelim, kırık bağlantıları, eksik yasal metinleri, kurulmamış reklam ölçümünü ve ürün sayfası hatalarını tek raporda önem sırasıyla gösterelim.",
    stats: [
      { value: "30+", label: "kontrol" },
      { value: "6", label: "bölüm" },
      { value: "~1 dk", label: "sonuç" },
    ],
    mock: {
      title: "Örnek rapor",
      score: "Genel puan",
      grade: "Satış kaçırıyor",
      rows: [
        { label: "Mobil hız", value: "41/100", tone: "bad" },
        { label: "Kırık bağlantı", value: "7", tone: "bad" },
        { label: "Ürün bilgisi (Google)", value: "Eksik", tone: "warn" },
        { label: "Meta pikseli", value: "Yok", tone: "warn" },
        { label: "SSL sertifikası", value: "Geçerli", tone: "good" },
      ],
      footer: "+ 12 bulgu ve çözüm adımları",
    },
    featuresEyebrow: "Neleri kontrol ediyoruz",
    featuresTitle: "Satışı yavaşlatan her şeye tek raporda bakıyoruz",
    features: [
      {
        icon: "gauge",
        title: "Mobil hız",
        text: "Google PageSpeed ile gerçek mobil ölçüm: ana içeriğin yüklenme süresi, donma, görsel kayma ve Chrome kullanıcı verisi.",
      },
      {
        icon: "bug",
        title: "Site hataları",
        text: "40'a kadar bağlantı ve 25 görsel tek tek denenir; kırık olanlar adresleriyle listelenir. SSL, yönlendirmeler, 404 sayfası ve konsol hataları.",
      },
      {
        icon: "search",
        title: "Google görünürlüğü",
        text: "Başlık ve açıklama, yapılandırılmış veri, site haritası, robots.txt, kanonik adres, noindex ve erişilebilirlik eksikleri.",
      },
      {
        icon: "chart",
        title: "Reklam ölçümü",
        text: "Google Analytics, Tag Manager ve Meta pikseli kurulu mu? Ölçemeyen mağaza reklam bütçesini tahminle harcar.",
      },
      {
        icon: "shield",
        title: "Güven ve yasal metinler",
        text: "İade ve değişim, KVKK, mesafeli satış sözleşmesi, iletişim bilgisi, WhatsApp ve güvenli ödeme işaretleri.",
      },
      {
        icon: "bag",
        title: "Ürün sayfası",
        text: "Bir ürün sayfanızı bulup inceleriz: Google'a verilen fiyat, stok ve puan bilgisi, sepete ekle düğmesi, yorumlar ve görseller.",
      },
    ] as { icon: FeatureIcon; title: string; text: string }[],
    howEyebrow: "Nasıl çalışır",
    howTitle: "3 adımda net bir yol haritası",
    how: [
      { title: "Adresinizi yazın", text: "Mağazanızın ana sayfa adresi yeterli. Kayıt, kurulum ya da şifre gerekmez." },
      { title: "1 dakikada rapor", text: "Puanınızı, bölüm bölüm sorunları ve en önemli 3 bulguyu hemen görün." },
      { title: "Çözüm adımları", text: "Bilgilerinizi bırakın; tüm bulguları, örnek adresleri ve ne yapılması gerektiğini açın. Dilerseniz uzmanımız sizinle değerlendirsin." },
    ],
    faqEyebrow: "Sık sorulan sorular",
    faqTitle: "Merak edilenler",
    faq: [
      {
        q: "Analiz gerçekten ücretsiz mi?",
        a: "Evet. Analiz ve rapor ücretsizdir. Tam raporu açmak için yalnızca adınızı ve e-postanızı istiyoruz.",
      },
      {
        q: "Hangi altyapılarla çalışıyor?",
        a: "Herkese açık her e-ticaret sitesiyle: Shopify, ikas, Ticimax, IdeaSoft, T-Soft, WooCommerce ve özel yazılım siteler dahil.",
      },
      {
        q: "Siteme bir şey kurmam ya da şifre vermem gerekiyor mu?",
        a: "Hayır. Yalnızca sitenizin herkese açık sayfalarına, bir ziyaretçinin gördüğü gibi bakıyoruz; hiçbir şeyi değiştirmiyoruz.",
      },
      {
        q: "Hız puanı neden zaman zaman ölçülemiyor?",
        a: "Hız ölçümünü Google PageSpeed yapar. Çok ağır ya da bot korumalı sitelerde Google'ın testi süre sınırını aşabiliyor; o durumda diğer tüm kontroller yine raporda yer alır.",
      },
      {
        q: "Bulunan sorunları siz mi düzeltiyorsunuz?",
        a: "İsterseniz evet. Raporu birlikte değerlendirip önceliklendiririz; teknik düzeltmelerden reklam ölçümü kurulumuna kadar ekibimiz yardımcı olur.",
      },
    ],
    finalTitle: "Rakipleriniz hızlanırken siz beklemeyin",
    finalText: "Bir dakika ayırın, mağazanızın neyi kaçırdığını görün.",
    finalCta: "Ücretsiz analizi başlat",
  },
  en: {
    badge: "Free · No sign-up",
    titleA: "Why isn't",
    titleB: "your store selling?",
    titleC: "Find out in a minute.",
    sub: "Enter your address. We'll test your mobile speed with Google's own measurement and show broken links, missing legal pages, untracked ads and product page issues in one report, ranked by impact.",
    stats: [
      { value: "30+", label: "checks" },
      { value: "6", label: "sections" },
      { value: "~1 min", label: "results" },
    ],
    mock: {
      title: "Sample report",
      score: "Overall score",
      grade: "Losing sales",
      rows: [
        { label: "Mobile speed", value: "41/100", tone: "bad" },
        { label: "Broken links", value: "7", tone: "bad" },
        { label: "Product data (Google)", value: "Missing", tone: "warn" },
        { label: "Meta pixel", value: "None", tone: "warn" },
        { label: "SSL certificate", value: "Valid", tone: "good" },
      ],
      footer: "+ 12 findings and fixes",
    },
    featuresEyebrow: "What we check",
    featuresTitle: "Everything that slows your sales, in one report",
    features: [
      {
        icon: "gauge",
        title: "Mobile speed",
        text: "Real mobile measurement with Google PageSpeed: main content load time, blocking, layout shift and Chrome user data.",
      },
      {
        icon: "bug",
        title: "Site errors",
        text: "Up to 40 links and 25 images are tested one by one and broken ones are listed. SSL, redirects, the 404 page and console errors.",
      },
      {
        icon: "search",
        title: "Google visibility",
        text: "Title and description, structured data, sitemap, robots.txt, canonical URL, noindex and accessibility gaps.",
      },
      {
        icon: "chart",
        title: "Ad tracking",
        text: "Are Google Analytics, Tag Manager and the Meta pixel installed? A store that can't measure spends its ad budget on guesswork.",
      },
      {
        icon: "shield",
        title: "Trust and legal pages",
        text: "Returns, privacy policy, terms of sale, contact details, WhatsApp and secure payment badges.",
      },
      {
        icon: "bag",
        title: "Product page",
        text: "We find one of your product pages and check the price, stock and rating data given to Google, the add-to-cart button, reviews and images.",
      },
    ] as { icon: FeatureIcon; title: string; text: string }[],
    howEyebrow: "How it works",
    howTitle: "A clear roadmap in 3 steps",
    how: [
      { title: "Enter your address", text: "Your store's home page is enough. No sign-up, install or password." },
      { title: "Report in a minute", text: "See your score, issues by section and the top 3 findings right away." },
      { title: "Fixes", text: "Leave your details to unlock every finding, example URLs and what to do. Our specialist can walk you through it." },
    ],
    faqEyebrow: "FAQ",
    faqTitle: "Common questions",
    faq: [
      {
        q: "Is the audit really free?",
        a: "Yes. The audit and report are free. We only ask for your name and email to unlock the full report.",
      },
      {
        q: "Which platforms does it work with?",
        a: "Any public online store: Shopify, WooCommerce, Magento, Wix and custom-built sites included.",
      },
      {
        q: "Do I need to install anything or share a password?",
        a: "No. We only look at your public pages the way a visitor sees them, and we don't change anything.",
      },
      {
        q: "Why is the speed score sometimes not measured?",
        a: "Speed is measured by Google PageSpeed. On very heavy or bot-protected sites Google's test can time out; every other check still appears in the report.",
      },
      {
        q: "Can you fix the issues you find?",
        a: "If you like, yes. We'll review and prioritise the report with you; our team helps with everything from technical fixes to tracking setup.",
      },
    ],
    finalTitle: "Don't wait while competitors speed up",
    finalText: "Take a minute and see what your store is missing.",
    finalCta: "Start the free audit",
  },
} satisfies Record<Locale, unknown>;
