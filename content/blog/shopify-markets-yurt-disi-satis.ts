import type { RepoPost } from "./types";

export const post: RepoPost = {
  slug: "shopify-markets-yurt-disi-satis",
  publishedAt: "2026-11-04",
  readingMinutes: 6,
  tr: {
    title: "Shopify'da yurt dışına satış: pazar, para birimi, gümrük ve alan adı kurgusu",
    category: "E-Ticaret",
    excerpt:
      "Shopify ile yurt dışına açılmak teknik olarak birkaç tıklama sürüyor; asıl iş fiyatı, gümrük vergisini ve alan adı yapısını doğru kurmak. Bu yazıda müşteriyi teslimatta sürpriz bir faturayla karşılaşmaktan ve sitenizi arama motorunda karışıklıktan koruyan kontrolleri topladık.",
    blocks: [
      {
        type: "p",
        text: "Yurt dışına satmak isteyen markaların çoğu işe aynı yerden başlıyor: mağazayı İngilizceye çeviriyor, para birimini dolar ya da euro yapıyor ve reklamı açıyor. İlk siparişler geliyor, sonra sorunlar başlıyor. Müşteri kapıda beklemediği bir gümrük vergisiyle karşılaşıp paketi geri çeviriyor, kur değişince fiyatlar 47,83 euro gibi tuhaf rakamlara dönüşüyor, Google ise hangi sayfayı hangi ülkeye göstereceğini karıştırıyor. Shopify'ın uluslararası satış araçları (Markets) bu sorunların çoğunu çözecek ayarları sunuyor; ama doğru sırayla ve bilinçli kurulmaları gerekiyor.",
      },
      { type: "h2", text: "1. Pazarları sade kurun: önce ülke, sonra grup" },
      {
        type: "p",
        text: "Shopify'da bir **pazar (market)**, belirli bir ülkeyi ya da bölgeyi hedefleyen ayar setidir. İsterseniz birkaç ülkeyi tek pazarda toplayabilirsiniz. Para birimi, fiyat, dil, alan adı ve gümrük ayarları bu pazar bazında yönetiliyor.",
      },
      {
        type: "p",
        text: "En sık yapılan hata, ilk günden \"Dünya\" adında tek bir dev pazar açıp her şeyi aynı ayarla bırakmak. Bunun yerine satışın ve reklam bütçesinin gerçekten gideceği ülkeleri ayrı pazarlar olarak açın. Kargo süresi, vergi kuralları ve fiyat beklentisi benzer olan ülkeleri (örneğin euro kullanan AB ülkeleri) bir grupta toplayın. Henüz test aşamasında olduğunuz ülkeleri ise geniş bir pazarda tutun ve veri geldikçe ayırın.",
      },
      { type: "h2", text: "2. Fiyat ve para birimi: otomatik çeviri mi, sabit fiyat mı" },
      {
        type: "p",
        text: "Shopify varsayılan olarak fiyatları güncel kur üzerinden **otomatik dönüştürüyor**. İsterseniz kuru elle sabitleyebilir, ülke ya da bölge bazında ürün fiyatı belirleyebilir veya bir pazardaki tüm fiyatları yüzde olarak artırıp azaltabilirsiniz. Bu fiyat ayarları **kataloglar** üzerinden yönetiliyor.",
      },
      {
        type: "ul",
        items: [
          "**Yuvarlamayı açın.** Kur dönüşümü fiyatları ve kargo ücretlerini düzensiz rakamlara çeviriyor. Fiyat yuvarlama, her para birimi için en yaygın küsurata yuvarlıyor ve kur oynadıkça fiyatın görüntüsünü sabit tutuyor. Bu özellik yalnızca Shopify Payments kullanan mağazalarda var ve yuvarlama kuralları özelleştirilemiyor.",
          "**Önemli ürünlerde sabit fiyat kullanın.** Çok satan ve reklamı verilen ürünlerde ülke bazında elle fiyat belirlemek, kampanya görsellerindeki fiyatla sitedeki fiyatın tutmasını sağlar.",
          "**Ülke seçiciyi unutmayın.** Yerel para biriminde satış yapabilmek için müşterinin para birimini görebileceği bir ülke seçici gerekiyor.",
          "**AB indirim kuralına dikkat edin.** Shopify'ın da hatırlattığı gibi, AB'de indirim duyururken son 30 gündeki en düşük fiyatı göstermek zorunlu. Avrupa'ya kampanya yaparken üstü çizili fiyat kurgusunu buna göre kurun.",
        ],
      },
      {
        type: "p",
        text: "Yerel fiyatlandırmanın tüm özelliklerinden yararlanmak için Shopify Payments ve tek sayfalık ödeme ekranı gerekiyor. Türkiye'den satış yapan markaların ödeme altyapısı farklı olabileceği için kurulumdan önce hangi özelliklerin hesabınızda açık olduğunu kontrol edin.",
      },
      { type: "h2", text: "3. Gümrük vergisi: sürprizi kapıda değil, ödemede yaşatın" },
      {
        type: "p",
        text: "Yurt dışı satışında en çok müşteri kaybettiren konu, teslimatta çıkan gümrük vergisi. Son bir yılda bu konu daha da önemli hale geldi. ABD, 29 Ağustos 2025 itibarıyla düşük değerli gönderilere tanınan gümrük muafiyetini **değerinden bağımsız olarak** tüm ülkeler için askıya aldı. AB ise 1 Temmuz 2026'dan itibaren, AB dışından gelen ve değeri 150 euroya kadar olan gönderilere **ürün başına 3 euro** geçici gümrük vergisi uyguluyor. Bu vergi adet değil, gümrük sınıfı başına hesaplanıyor: beş tişört 3 euro, üç tişört ve bir saat 6 euro.",
      },
      {
        type: "p",
        text: "Shopify, tahmini gümrük vergisini ve ithalat vergilerini **ödeme sırasında tahsil etme** seçeneği sunuyor. Böylece müşteri kapıda ek ödeme yapmıyor. Bunun için bazı koşullar var:",
      },
      {
        type: "ul",
        items: [
          "Ürünlerinizde **HS kodu** (genellikle altı haneli uluslararası ürün sınıflandırma kodu) ve **menşe ülkesi** tanımlı olmalı. HS kodu yoksa vergi ürün açıklaması ve kategorisinden tahmin ediliyor ve sonuç hatalı olabiliyor.",
          "Kargo etiketi kullanıyorsanız kargo firmanızın **DDP** (vergisi ödenmiş teslim) etiketini desteklemesi gerekiyor.",
          "Bu hizmet için işlem ücreti var. Shopify'ın yardım sayfasına göre ücret şu an geçici olarak tüm satıcılar için %0,5; normalde Shopify Payments ile %0,85, diğer ödeme sağlayıcılarla %1,5. Yurt içi siparişlerde ve AB ülkeleri arası gönderilerde ücret alınmıyor.",
        ],
      },
      {
        type: "p",
        text: "HS kodlarını ürün sayfasındaki kargo bölümünden, toplu düzenleyiciden ya da CSV dosyasıyla ekleyebilirsiniz. Ürünlerin çoğu aynı ülkede üretiliyorsa, ayarlardan mağaza geneli için varsayılan bir menşe ülkesi de tanımlayabilirsiniz. Eksik menşe bilgisi ya da yanlış HS kodu, müşteriden teslimatta ek vergi istenmesine yol açabiliyor; yani bu işi muhasebeye değil, ürün verisi işine dahil edin.",
      },
      { type: "h2", text: "4. Alan adı ve dil: SEO'yu bozmadan yapılandırın" },
      {
        type: "p",
        text: "Shopify'da her pazar için üç seçenek var: ülke uzantılı ayrı alan adı (marka.de), alt alan adı (de.marka.com) ve alt klasör (marka.com/de-de). Shopify, ilk kez kuranlara **alt klasörü** öneriyor; çünkü alt klasörler ana alan adınızın mevcut arama gücünden yararlanıyor. Ayrı ülke alan adı ise sıfırdan otorite kazanmak zorunda ve en çok emeği isteyen yol.",
      },
      {
        type: "ul",
        items: [
          "Shopify, her alan adı ve alt klasör için **hreflang** etiketlerini otomatik oluşturuyor. Bu etiketler Google'a hangi sayfanın hangi dil ve ülke için olduğunu söylüyor. Kapatırsanız temanıza kendiniz eklemeniz gerekiyor.",
          "Aynı dili hedefleyen birden fazla alan adını tek pazara bağlamayın; arama motorları bunu kopya içerik olarak görebilir.",
          "Her alan adı ve alt alan adı için Google Search Console'a ayrı site haritası gönderin.",
          "Otomatik yönlendirmeyi dikkatli kullanın. Google, kullanıcıyı tahmin edilen dile göre otomatik olarak başka sürüme göndermeyi önermiyor; bunun yerine görünür bir dil ve ülke seçici sunmayı öneriyor.",
        ],
      },
      {
        type: "quote",
        text: "Çeviri sitenizi yabancı dilde gösterir; pazar ayarı ise o ülkede satış yapmanızı sağlar.",
      },
      { type: "h2", text: "Pratik sonuç" },
      {
        type: "p",
        text: "Yurt dışına açılmadan önce şu sırayı izleyin: önce satış yapacağınız ülkeleri pazarlara ayırın, sonra fiyatlarınızı ve yuvarlamayı kurun, ardından HS kodlarını ve menşe ülkesini ürün verisine işleyip gümrük vergisini ödeme sırasında tahsil edip edemeyeceğinizi kontrol edin, en son alan adı yapısını alt klasörle kurun. Reklamı bu dört adım tamamlandıktan sonra açın. Böylece yurt dışından gelen ilk müşteri, kapıda beklemediği bir faturayla değil, beklediği fiyatla ve zamanında ürünüyle karşılaşır.",
      },
    ],
    sources: [
      {
        label: "Shopify Help Center — International sales tools",
        url: "https://help.shopify.com/en/manual/international/markets",
      },
      {
        label: "Shopify Help Center — Currency conversion",
        url: "https://help.shopify.com/en/manual/international/pricing/currency-conversion",
      },
      {
        label: "Shopify Help Center — Price rounding",
        url: "https://help.shopify.com/en/manual/international/pricing/rounding",
      },
      {
        label: "Shopify Help Center — Collecting duties and import taxes at checkout",
        url: "https://help.shopify.com/manual/markets/duties-and-import-taxes/charging-duties",
      },
      {
        label: "Shopify Help Center — Adding HS codes to your products",
        url: "https://help.shopify.com/manual/international/shipping/hs-codes",
      },
      {
        label: "Shopify Help Center — Managing international domains",
        url: "https://help.shopify.com/en/manual/international/managing-international-domains",
      },
      {
        label: "Google Search Central — Managing multi-regional and multilingual sites",
        url: "https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites",
      },
      {
        label: "European Commission — €3 customs duty on low-value parcels",
        url: "https://commission.europa.eu/news-and-media/news/ensuring-fairness-and-safety-eur3-customs-duty-low-value-parcels-2026-06-29_en",
      },
      {
        label: "The White House — Suspending duty-free de minimis treatment for all countries",
        url: "https://www.whitehouse.gov/presidential-actions/2025/07/suspending-duty-free-de-minimis-treatment-for-all-countries/",
      },
    ],
  },
  en: {
    title: "Selling internationally on Shopify: markets, currency, duties and domain setup",
    category: "E-Commerce",
    excerpt:
      "Going international with Shopify takes only a few clicks technically; the real work is getting pricing, import duties and domain structure right. This post gathers the checks that protect customers from a surprise bill at delivery and keep your site clear to search engines.",
    blocks: [
      {
        type: "p",
        text: "Most brands that want to sell abroad start in the same place: they translate the store into English, switch the currency to dollars or euros and launch ads. The first orders come in, and then the problems begin. A customer faces an unexpected import duty at the door and refuses the parcel, prices turn into odd figures like €47.83 when exchange rates move, and Google gets confused about which page to show in which country. Shopify's international sales tools (Markets) offer settings that solve most of these problems, but they need to be set up deliberately and in the right order.",
      },
      { type: "h2", text: "1. Keep your markets simple: countries first, then groups" },
      {
        type: "p",
        text: "In Shopify, a **market** is a set of settings that targets a specific country or region. You can group several countries into one market if you like. Currency, pricing, language, domain and duty settings are managed per market.",
      },
      {
        type: "p",
        text: "The most common mistake is to open one giant market called \"World\" on day one and leave everything on the same settings. Instead, create separate markets for the countries where your sales and ad budget will actually go. Group countries with similar delivery times, tax rules and price expectations (for example, the euro-using EU countries). Keep countries you're still testing in a broad market and split them out as data comes in.",
      },
      { type: "h2", text: "2. Pricing and currency: automatic conversion or fixed prices" },
      {
        type: "p",
        text: "By default, Shopify **converts prices automatically** at the current exchange rate. You can also fix exchange rates manually, set product prices per country or region, or raise or lower all prices in a market by a percentage. These pricing settings are managed through **catalogs**.",
      },
      {
        type: "ul",
        items: [
          "**Turn on rounding.** Currency conversion turns prices and shipping rates into uneven figures. Price rounding rounds to the most common denominator for each currency and keeps prices looking stable as exchange rates move. It's only available to stores using Shopify Payments, and the rounding rules can't be customized.",
          "**Use fixed prices for key products.** Setting prices manually per country for best-sellers and advertised products keeps the price in your ad creative consistent with the price on the site.",
          "**Don't forget the country selector.** To sell in local currencies, you need a country selector so customers can see their currency.",
          "**Mind the EU discount rule.** As Shopify points out, when announcing a price reduction in the EU, you must show the lowest price from the last 30 days. Set up your compare-at pricing accordingly when running campaigns in Europe.",
        ],
      },
      {
        type: "p",
        text: "To use all local pricing features, you need Shopify Payments and one-page checkout. Since brands selling from Turkey may have a different payment setup, check which features are available on your account before you start.",
      },
      { type: "h2", text: "3. Import duties: let the surprise happen at checkout, not at the door" },
      {
        type: "p",
        text: "The issue that loses the most customers in cross-border sales is the import duty that appears on delivery. It has become even more important over the past year. As of August 29, 2025, the US suspended the duty-free treatment for low-value shipments for all countries, **regardless of value**. From July 1, 2026, the EU applies a temporary **€3 customs duty per item** on parcels worth up to €150 coming from outside the EU. The duty is calculated per tariff classification, not per unit: five T-shirts cost €3, while three T-shirts and a watch cost €6.",
      },
      {
        type: "p",
        text: "Shopify offers the option to **collect estimated duties and import taxes at checkout**, so the customer doesn't pay extra at the door. There are a few requirements:",
      },
      {
        type: "ul",
        items: [
          "Your products need an **HS code** (an international product classification code, usually six digits) and a **country of origin**. Without an HS code, duties are estimated from the product description and category, and the result may be inaccurate.",
          "If you use shipping labels, your carrier must support **DDP** (delivered duty paid) labels.",
          "There's a transaction fee for this service. According to Shopify's help page, the fee is currently a temporary 0.5% for all merchants; normally it's 0.85% with Shopify Payments and 1.5% with other payment providers. No fee applies to domestic orders or to shipments between EU countries.",
        ],
      },
      {
        type: "p",
        text: "You can add HS codes in the shipping section of the product page, with the bulk editor or via a CSV file. If most of your products are made in the same country, you can also set a store-wide default country of origin in settings. Missing origin information or a wrong HS code can lead to the customer being charged additional duties on delivery, so treat this as part of your product data work, not your accounting.",
      },
      { type: "h2", text: "4. Domains and language: set them up without hurting SEO" },
      {
        type: "p",
        text: "Shopify gives you three options for each market: a separate country-code domain (brand.de), a subdomain (de.brand.com) or a subfolder (brand.com/de-de). Shopify recommends **subfolders** for first-time setups, because they benefit from your main domain's existing search strength. A separate country domain has to build authority from scratch and is the most demanding route.",
      },
      {
        type: "ul",
        items: [
          "Shopify automatically creates **hreflang** tags for every domain and subfolder. These tags tell Google which page is meant for which language and country. If you turn them off, you'll need to add them to your theme yourself.",
          "Don't assign multiple domains targeting the same language to one market; search engines may treat that as duplicate content.",
          "Submit a separate sitemap to Google Search Console for each domain and subdomain.",
          "Use automatic redirection with care. Google advises against automatically sending users to another version based on their assumed language; it recommends offering a visible language and country selector instead.",
        ],
      },
      {
        type: "quote",
        text: "Translation shows your site in another language; market settings let you actually sell in that country.",
      },
      { type: "h2", text: "The practical takeaway" },
      {
        type: "p",
        text: "Before going international, follow this order: first split the countries you'll sell to into markets, then set up your prices and rounding, then add HS codes and country of origin to your product data and check whether you can collect duties at checkout, and finally set up your domain structure with subfolders. Launch ads only after these four steps are done. That way, your first customer from abroad gets their product on time and at the expected price, not with an unexpected bill at the door.",
      },
    ],
    sources: [
      {
        label: "Shopify Help Center — International sales tools",
        url: "https://help.shopify.com/en/manual/international/markets",
      },
      {
        label: "Shopify Help Center — Currency conversion",
        url: "https://help.shopify.com/en/manual/international/pricing/currency-conversion",
      },
      {
        label: "Shopify Help Center — Price rounding",
        url: "https://help.shopify.com/en/manual/international/pricing/rounding",
      },
      {
        label: "Shopify Help Center — Collecting duties and import taxes at checkout",
        url: "https://help.shopify.com/manual/markets/duties-and-import-taxes/charging-duties",
      },
      {
        label: "Shopify Help Center — Adding HS codes to your products",
        url: "https://help.shopify.com/manual/international/shipping/hs-codes",
      },
      {
        label: "Shopify Help Center — Managing international domains",
        url: "https://help.shopify.com/en/manual/international/managing-international-domains",
      },
      {
        label: "Google Search Central — Managing multi-regional and multilingual sites",
        url: "https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites",
      },
      {
        label: "European Commission — €3 customs duty on low-value parcels",
        url: "https://commission.europa.eu/news-and-media/news/ensuring-fairness-and-safety-eur3-customs-duty-low-value-parcels-2026-06-29_en",
      },
      {
        label: "The White House — Suspending duty-free de minimis treatment for all countries",
        url: "https://www.whitehouse.gov/presidential-actions/2025/07/suspending-duty-free-de-minimis-treatment-for-all-countries/",
      },
    ],
  },
};
