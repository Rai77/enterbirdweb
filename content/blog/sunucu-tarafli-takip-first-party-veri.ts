import type { RepoPost } from "./types";

export const post: RepoPost = {
  slug: "sunucu-tarafli-takip-first-party-veri",
  publishedAt: "2026-11-12",
  readingMinutes: 6,
  tr: {
    title: "Çerezsiz ölçümleme: sunucu taraflı takip ve first-party veri nasıl kurulur",
    category: "Performans Pazarlama",
    excerpt:
      "Reklam panelindeki satış sayısı mağazanızdakiyle tutmuyorsa sorun çoğu zaman reklamda değil, ölçümde. Bu yazıda tarayıcı pikselinin kaçırdığı satışları geri kazanmak için sunucu taraflı takibi, Meta Conversions API'yi, Google'ın gelişmiş dönüşümlerini ve izin modunu adım adım ele aldık.",
    blocks: [
      {
        type: "p",
        text: "Birçok e-ticaret markası aynı tabloyu görüyor: mağaza panelinde 100 sipariş var, Meta ya da Google Ads ise bunların belirgin bir kısmını hiç göstermiyor. Reklam algoritmaları sadece gördükleri satıştan öğreniyor. Satışların bir kısmı görünmüyorsa kampanyalar yanlış kitleye kayıyor, iyi çalışan reklamlar kötü görünüyor ve bütçe kararları eksik veriyle veriliyor. Bunun ana nedeni, takibin büyük ölçüde tarayıcıda çalışan piksellere dayanması. Reklam engelleyiciler, tarayıcıların çerez kısıtlamaları ve kullanıcıların çerez iznini reddetmesi bu pikselleri susturabiliyor. Çözüm tek bir araç değil; tarayıcı verisini, sunucudan gönderilen veriyle ve kendi müşteri verinizle (first-party veri) tamamlamak.",
      },
      { type: "h2", text: "1. Önce farkı ölçün: ne kadar satış kayboluyor" },
      {
        type: "p",
        text: "Kurulum yapmadan önce sorunun büyüklüğünü görün. Son 30 günün sipariş sayısını mağaza panelinizden alın ve aynı dönem için Meta Olay Yöneticisi'ndeki satın alma olaylarıyla ve Google Ads'deki dönüşümlerle karşılaştırın. Reklam platformları kendi atıf kurallarıyla saydığı için birebir eşleşme beklemeyin; ama aradaki fark büyükse ya da zamanla artıyorsa ölçüm altyapınız satış kaçırıyor demektir.",
      },
      {
        type: "ul",
        items: [
          "Karşılaştırmayı sadece toplam sayıyla değil, cihaz ve tarayıcı bazında da yapın. Fark belirli bir tarayıcıda yoğunlaşıyorsa sorun büyük ihtimalle çerez kısıtlamasıdır.",
          "Satın alma olayının sipariş tutarı ve para birimiyle birlikte gittiğini kontrol edin. Tutarsız bir olay, eksik bir olay kadar zarar verir.",
          "Aynı satışın iki kez sayılıp sayılmadığına bakın. Yeni kurulumlarda en sık görülen hata, eksik değil çift veridir.",
        ],
      },
      { type: "h2", text: "2. Meta için: Conversions API'yi pikselin yanına kurun" },
      {
        type: "p",
        text: "**Conversions API**, satış ve diğer olayları tarayıcı yerine sizin sunucunuzdan, e-ticaret platformunuzdan ya da CRM'inizden doğrudan Meta'ya gönderir. Meta, bu API'yi pikselin yerine değil, **pikselle birlikte** kullanmayı öneriyor. Buna yedekli kurulum deniyor: aynı olay hem tarayıcıdan hem sunucudan gelir, biri kaçarsa diğeri yakalar.",
      },
      {
        type: "p",
        text: "Aynı satış iki yoldan geldiğinde iki kez sayılmaması için **tekilleştirme** gerekir. Bunun için piksel ve sunucu olayında olay adı aynı olmalı ve iki tarafa da aynı **event_id** gönderilmeli. Meta, aynı kimlik ve adla 48 saat içinde gelen ikinci olayı atıyor. Olay kimliği yoksa tekilleştirme fbp çerezi ya da external_id üzerinden de yapılabiliyor, ama en güvenilir yol ortak bir olay kimliği.",
      },
      {
        type: "ul",
        items: [
          "Sunucu olaylarına e-posta, telefon, ad-soyad gibi müşteri bilgilerini **hash'lenmiş** (tek yönlü şifrelenmiş) olarak ekleyin. Ayrıca IP adresi ve tarayıcı bilgisini (user agent) gönderin.",
          "Olay Yöneticisi'ndeki **olay eşleştirme kalitesi** puanını takip edin. Bu puan 10 üzerinden veriliyor ve olayın bir Meta hesabıyla ne kadar iyi eşleşebildiğini gösteriyor. Sadece eşleşen olaylar atıf ve reklam optimizasyonunda kullanılabiliyor.",
          "Olayları gerçek zamanlı ya da gerçek zamana yakın gönderin. Saatler sonra toplu gönderilen veri, optimizasyon için daha az değerlidir.",
        ],
      },
      { type: "h2", text: "3. Google için: gelişmiş dönüşümler ve izin modu" },
      {
        type: "p",
        text: "Google tarafında karşılığı **gelişmiş dönüşümler** (enhanced conversions). Satın alma anında elinizdeki e-posta gibi müşteri bilgileri SHA256 ile hash'lenerek Google'a gönderiliyor ve Google hesabına giriş yapmış kullanıcılarla eşleştiriliyor. Google, bunun mevcut dönüşüm takibini tamamladığını ve ölçüm doğruluğunu artırabileceğini belirtiyor. Kurulum Google etiketi, Google Etiket Yöneticisi ya da sunucu taraflı Etiket Yöneticisi üzerinden yapılabiliyor.",
      },
      {
        type: "p",
        text: "İkinci parça **izin modu** (consent mode). Bu bir çerez banner'ı değil; mevcut banner'ınızdan gelen izin kararını Google etiketlerine ileten bir yapı. Sürüm 2 ile reklam verisine ilişkin iki yeni izin sinyali eklendi: **ad_user_data** ve **ad_personalization**. Avrupa Ekonomik Alanı'na satış yapıyorsanız Google bu sinyalleri göndermenizi bekliyor.",
      },
      {
        type: "ul",
        items: [
          "**Temel kurulumda** kullanıcı izin verene kadar Google etiketleri hiç çalışmaz; izin yoksa veri gitmez.",
          "**Gelişmiş kurulumda** etiketler sayfa açılınca yüklenir, izin reddedildiyse çerezsiz sinyaller gönderir. Google bu sinyallerle eksik dönüşümleri modelleyebilir ve size özel, daha ayrıntılı bir model kurabilir.",
          "Modellemenin sonuçları için en az 7 tam gün veri ve belirli bir trafik eşiği gerekiyor; küçük hesaplarda sonuç hemen görünmeyebilir.",
        ],
      },
      { type: "h2", text: "4. Sunucu taraflı etiketleme: kontrolü kendi alan adınıza alın" },
      {
        type: "p",
        text: "**Sunucu taraflı Google Etiket Yöneticisi**, etiketlerin bir kısmını kullanıcının tarayıcısı yerine sizin kontrol ettiğiniz bir sunucuda çalıştırır. Tarayıcı veriyi önce kendi sunucunuza gönderir; hangi verinin hangi platforma, hangi biçimde gideceğine siz karar verirsiniz. Google, bu sunucunun kendi alan adınız altında (örneğin olcum.markaniz.com) çalıştırılmasını kuvvetle öneriyor.",
      },
      {
        type: "p",
        text: "Bu yapı her marka için şart değil. Bir sunucu barındırmak, bakım yapmak ve maliyetini taşımak gerekiyor. Aylık sipariş hacmi düşük, tek reklam kanalı kullanan bir mağaza için platformun hazır entegrasyonları (örneğin Shopify uygulamaları üzerinden kurulan Conversions API ve gelişmiş dönüşümler) çoğu zaman yeterli. Birden fazla reklam platformuna veri gönderen ve veriyi tek yerden yönetmek isteyen markalarda ise sunucu taraflı etiketleme düzeni ciddi biçimde sadeleştirir.",
      },
      {
        type: "quote",
        text: "Sunucu taraflı takip izin almanın yerine geçmez; izin verilmeyen veriyi göndermenin yolu değildir.",
      },
      { type: "h2", text: "5. Shopify kullanıyorsanız: pikselleri tek yerden yönetin" },
      {
        type: "p",
        text: "Shopify'da takip kodları artık temanın içine değil, yönetim panelindeki **Müşteri etkinlikleri** bölümüne ekleniyor. Shopify, mümkünse **uygulama piksellerini** kullanmayı öneriyor; çünkü daha güvenli ve otomatik güncelleniyor. Uygun bir uygulama yoksa **özel piksel** eklenebiliyor. Özel pikseller ödeme ve sipariş sonrası sayfalarda da veri toplayabiliyor, ancak izinden, kod güvenliğinden ve güncellemelerden mağaza sahibi sorumlu.",
      },
      {
        type: "p",
        text: "Shopify, Teşekkürler ve Sipariş durumu sayfalarını yeni yapıya geçirmek için son tarihi 26 Ağustos 2026 olarak belirledi; geçiş yapmayan mağazalar otomatik olarak yükseltildi. Bu sayfalara eski yöntemle eklenmiş takip kodunuz varsa satın alma olayının hâlâ doğru çalıştığını mutlaka test edin.",
      },
      { type: "h2", text: "Pratik sonuç" },
      {
        type: "p",
        text: "Ölçüm altyapısını şu sırayla elden geçirin: önce mağaza siparişleriyle reklam panellerindeki satışları karşılaştırıp kaybı görün. Sonra Meta için Conversions API'yi pikselle birlikte, ortak olay kimliğiyle kurun. Google için gelişmiş dönüşümleri açın ve izin modunun ikinci sürümünü çerez banner'ınıza bağlayın. Birden fazla reklam kanalınız ve yeterli hacminiz varsa sunucu taraflı etiketlemeyi kendi alan adınız altında değerlendirin. Her adımdan sonra çift sayım olup olmadığını kontrol edin. Reklam algoritmaları ancak gördükleri kadar iyi karar verebilir; onlara eksiksiz ve izinli veri vermek, yeni bir kampanya açmaktan çoğu zaman daha fazla fark yaratır.",
      },
    ],
    sources: [
      {
        label: "Meta for Developers — Conversions API",
        url: "https://developers.facebook.com/docs/marketing-api/conversions-api",
      },
      {
        label: "Meta for Developers — Handling duplicate Pixel and Conversions API events",
        url: "https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events",
      },
      {
        label: "Meta for Developers — Conversions API best practices",
        url: "https://developers.facebook.com/docs/marketing-api/conversions-api/best-practices",
      },
      {
        label: "Google Ads Help — About enhanced conversions",
        url: "https://support.google.com/google-ads/answer/9888656",
      },
      {
        label: "Google Ads Help — About consent mode",
        url: "https://support.google.com/google-ads/answer/10000067",
      },
      {
        label: "Google for Developers — Set up consent mode on websites",
        url: "https://developers.google.com/tag-platform/security/guides/consent",
      },
      {
        label: "Google for Developers — Introduction to server-side tagging",
        url: "https://developers.google.com/tag-platform/tag-manager/server-side/intro",
      },
      {
        label: "Shopify Help Center — Pixels",
        url: "https://help.shopify.com/en/manual/promoting-marketing/pixels",
      },
      {
        label: "Shopify Help Center — Custom pixels",
        url: "https://help.shopify.com/en/manual/promoting-marketing/pixels/custom-pixels",
      },
      {
        label: "Shopify Help Center — Upgrading the Thank you and Order status pages",
        url: "https://help.shopify.com/en/manual/checkout-settings/customize-checkout-configurations/upgrade-thank-you-order-status",
      },
    ],
  },
  en: {
    title: "Cookieless measurement: how to set up server-side tracking and first-party data",
    category: "Performance Marketing",
    excerpt:
      "If the sales count in your ad dashboard doesn't match your store, the problem is often measurement, not the ads. This post walks step by step through server-side tracking, Meta's Conversions API, Google's enhanced conversions and consent mode to recover the sales your browser pixel misses.",
    blocks: [
      {
        type: "p",
        text: "Many e-commerce brands see the same picture: the store dashboard shows 100 orders, while Meta or Google Ads doesn't show a noticeable share of them at all. Ad algorithms only learn from the sales they can see. When some sales are invisible, campaigns drift toward the wrong audiences, ads that work well look bad, and budget decisions are made with incomplete data. The main reason is that tracking relies heavily on pixels running in the browser. Ad blockers, browser cookie restrictions and users declining cookie consent can all silence those pixels. The fix isn't a single tool; it's supplementing browser data with data sent from a server and with your own customer data (first-party data).",
      },
      { type: "h2", text: "1. Measure the gap first: how many sales are being lost" },
      {
        type: "p",
        text: "Before setting anything up, see how big the problem is. Take the order count for the last 30 days from your store dashboard and compare it with the purchase events in Meta Events Manager and the conversions in Google Ads for the same period. Don't expect a one-to-one match, since ad platforms count with their own attribution rules; but if the gap is large or growing over time, your measurement setup is missing sales.",
      },
      {
        type: "ul",
        items: [
          "Compare not only the totals but also by device and browser. If the gap is concentrated in one browser, the cause is most likely cookie restrictions.",
          "Check that the purchase event is sent with the order value and currency. An inconsistent event does as much damage as a missing one.",
          "Look for the same sale being counted twice. In new setups, the most common mistake is duplicate data, not missing data.",
        ],
      },
      { type: "h2", text: "2. For Meta: set up the Conversions API alongside the pixel" },
      {
        type: "p",
        text: "The **Conversions API** sends sales and other events to Meta directly from your server, e-commerce platform or CRM instead of the browser. Meta recommends using it **together with the pixel**, not instead of it. This is called a redundant setup: the same event arrives from both the browser and the server, so if one misses it, the other catches it.",
      },
      {
        type: "p",
        text: "To keep the same sale from being counted twice when it arrives through both paths, you need **deduplication**. The event name must be the same in the pixel and server event, and the same **event_id** must be sent from both sides. Meta discards a second event with the same ID and name that arrives within 48 hours. Without an event ID, deduplication can also rely on the fbp cookie or external_id, but a shared event ID is the most reliable route.",
      },
      {
        type: "ul",
        items: [
          "Add customer information such as email, phone and name to server events in **hashed** (one-way encrypted) form. Also send the IP address and browser information (user agent).",
          "Track the **Event Match Quality** score in Events Manager. It's scored out of 10 and shows how well an event can be matched to a Meta account. Only matched events can be used for attribution and ad optimization.",
          "Send events in real time or close to it. Data sent in batches hours later is less valuable for optimization.",
        ],
      },
      { type: "h2", text: "3. For Google: enhanced conversions and consent mode" },
      {
        type: "p",
        text: "On the Google side, the equivalent is **enhanced conversions**. Customer information you have at the moment of purchase, such as an email address, is hashed with SHA256, sent to Google and matched with users signed in to a Google account. Google says this supplements your existing conversion tracking and can improve measurement accuracy. It can be set up through the Google tag, Google Tag Manager or server-side Tag Manager.",
      },
      {
        type: "p",
        text: "The second piece is **consent mode**. It isn't a cookie banner; it passes the consent decision from your existing banner to Google tags. Version 2 added two new consent signals related to advertising data: **ad_user_data** and **ad_personalization**. If you sell to the European Economic Area, Google expects you to send these signals.",
      },
      {
        type: "ul",
        items: [
          "In the **basic setup**, Google tags don't run at all until the user gives consent; without consent, no data is sent.",
          "In the **advanced setup**, tags load when the page opens and send cookieless signals if consent is denied. Google can use these signals to model missing conversions and build a more detailed model specific to you.",
          "Modeling results require at least 7 full days of data and a minimum traffic threshold, so small accounts may not see results right away.",
        ],
      },
      { type: "h2", text: "4. Server-side tagging: bring control to your own domain" },
      {
        type: "p",
        text: "**Server-side Google Tag Manager** runs some of your tags on a server you control instead of in the user's browser. The browser first sends data to your own server, and you decide which data goes to which platform and in what form. Google strongly recommends running this server under your own domain (for example, measure.yourbrand.com).",
      },
      {
        type: "p",
        text: "This setup isn't essential for every brand. You need to host a server, maintain it and carry its cost. For a store with low monthly order volume and a single ad channel, the platform's ready-made integrations (for example, the Conversions API and enhanced conversions set up through Shopify apps) are often enough. For brands that send data to several ad platforms and want to manage it from one place, server-side tagging greatly simplifies the setup.",
      },
      {
        type: "quote",
        text: "Server-side tracking doesn't replace consent; it's not a way to send data users haven't agreed to.",
      },
      { type: "h2", text: "5. If you use Shopify: manage pixels from one place" },
      {
        type: "p",
        text: "In Shopify, tracking code is no longer added inside the theme but in the **Customer events** section of the admin. Shopify recommends using **app pixels** where possible, because they're more secure and update automatically. If no suitable app exists, you can add a **custom pixel**. Custom pixels can also collect data on checkout and post-purchase pages, but the store owner is responsible for consent, code security and updates.",
      },
      {
        type: "p",
        text: "Shopify set August 26, 2026 as the deadline to move the Thank you and Order status pages to the new setup; stores that didn't upgrade were upgraded automatically. If you had tracking code added to these pages the old way, make sure to test that your purchase event still works correctly.",
      },
      { type: "h2", text: "The practical takeaway" },
      {
        type: "p",
        text: "Review your measurement setup in this order: first compare store orders with sales in your ad dashboards to see the loss. Then set up the Conversions API for Meta alongside the pixel, with a shared event ID. For Google, turn on enhanced conversions and connect version 2 of consent mode to your cookie banner. If you have several ad channels and enough volume, consider server-side tagging under your own domain. After each step, check for double counting. Ad algorithms can only decide as well as what they can see; giving them complete, consented data often makes more difference than launching a new campaign.",
      },
    ],
    sources: [
      {
        label: "Meta for Developers — Conversions API",
        url: "https://developers.facebook.com/docs/marketing-api/conversions-api",
      },
      {
        label: "Meta for Developers — Handling duplicate Pixel and Conversions API events",
        url: "https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events",
      },
      {
        label: "Meta for Developers — Conversions API best practices",
        url: "https://developers.facebook.com/docs/marketing-api/conversions-api/best-practices",
      },
      {
        label: "Google Ads Help — About enhanced conversions",
        url: "https://support.google.com/google-ads/answer/9888656",
      },
      {
        label: "Google Ads Help — About consent mode",
        url: "https://support.google.com/google-ads/answer/10000067",
      },
      {
        label: "Google for Developers — Set up consent mode on websites",
        url: "https://developers.google.com/tag-platform/security/guides/consent",
      },
      {
        label: "Google for Developers — Introduction to server-side tagging",
        url: "https://developers.google.com/tag-platform/tag-manager/server-side/intro",
      },
      {
        label: "Shopify Help Center — Pixels",
        url: "https://help.shopify.com/en/manual/promoting-marketing/pixels",
      },
      {
        label: "Shopify Help Center — Custom pixels",
        url: "https://help.shopify.com/en/manual/promoting-marketing/pixels/custom-pixels",
      },
      {
        label: "Shopify Help Center — Upgrading the Thank you and Order status pages",
        url: "https://help.shopify.com/en/manual/checkout-settings/customize-checkout-configurations/upgrade-thank-you-order-status",
      },
    ],
  },
};
