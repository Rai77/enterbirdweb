import type { RepoPost } from "./types";

export const post: RepoPost = {
  slug: "iade-oranini-dusurmek-urun-sayfasi",
  publishedAt: "2026-10-12",
  readingMinutes: 5,
  tr: {
    title: "İade oranını düşürmek: ürün sayfasındaki hangi eksik iadeyi tetikliyor",
    category: "E-Ticaret",
    excerpt:
      "İadelerin büyük kısmı kargodan değil, ürün sayfasında cevapsız kalan sorulardan doğuyor. Beden, ölçü, malzeme ve görsel eksiklerini kapatmak, iade politikasını sıkılaştırmaktan daha çok kazandırıyor.",
    blocks: [
      {
        type: "p",
        text: "ABD'de perakendecilerin sektör kuruluşu NRF'nin 2025 raporuna göre online satışların **yüzde 19,3'ü** geri gönderiliyor; mağaza içi satışlarla birlikte bu oran yüzde 15,8. Yani internetten satılan her beş üründen biri kapıya geri dönüyor. Bu iadelerin bir kısmı kaçınılmaz, ama önemli bir kısmı müşterinin satın almadan önce cevabını bulamadığı bir sorudan doğuyor: Bu beden bana olur mu? Kumaşı nasıl? Gerçekte ne kadar büyük? İade masrafını kargoda değil, ürün sayfasında azaltmak mümkün.",
      },
      { type: "h2", text: "1. Önce iadenin nedenini ürün bazında ölçün" },
      {
        type: "p",
        text: "Shopify'ın iade rehberi, iade nedenlerini stok kodu (SKU) bazında izlemeyi öneriyor: beden/kalıp sorunu, açıklama ile görselin ürünü yansıtmaması, kargoda hasar, üretim hatası ve fikir değiştirme. Bu ayrım yapılmadan ürün sayfasında neyi düzelteceğinizi bilemezsiniz.",
      },
      {
        type: "ul",
        items: [
          "İade formunda nedeni **zorunlu ve seçmeli** sorun; serbest metin kutusu tek başına analiz edilemez.",
          "En çok iade alan 20 ürünü ayrı listeleyin. Genelde iade yükünün büyük kısmı birkaç üründe toplanır.",
          "Aynı ürün sürekli \"bedeni uymadı\" ile dönüyorsa sorun müşteride değil, sayfadaki beden bilgisindedir.",
        ],
      },
      { type: "h2", text: "2. Beden tablosu: var olması yetmiyor, doğru yerde ve ölçülebilir olmalı" },
      {
        type: "p",
        text: "Shopify'ın aktardığı 6.000 kişilik küresel bir ankette katılımcıların **yüzde 61'i** bir giyim ürününü üstüne olmadığı için iade ettiğini söylüyor. Baymard Institute'un giyim sitelerindeki kullanıcı testlerinde ise masaüstü sitelerin **yüzde 83'ünün** yeterli beden bilgisi sunmadığı görülmüş. En sık hatalar şunlar:",
      },
      {
        type: "ul",
        items: [
          "Beden tablosu bağlantısı beden seçiminin hemen yanında değil, sayfanın altında ya da sekmede kayboluyor.",
          "Tabloda sadece S/M/L var; **santimetre cinsinden göğüs, bel, boy** ölçüsü yok.",
          "Ölçünün nasıl alınacağı anlatılmıyor; müşteri kendi ölçüsünü tabloyla karşılaştıramıyor.",
          "Mankenin boyu ve giydiği beden yazmıyor. \"Manken 1,78 m, M beden giyiyor\" cümlesi çoğu soruyu tek başına cevaplar.",
          "Her ürüne aynı genel tablo konuyor; dar kesim bir gömlekle bol kesim bir sweatshirt aynı tabloyla anlatılamaz.",
        ],
      },
      {
        type: "p",
        text: "Pratik öneri: en çok iade alan ürünlere \"kalıbı dar, bir beden büyük almanızı öneririz\" gibi **kalıp notu** ekleyin. Bu bilgi genellikle müşteri yorumlarında zaten var; onu sayfanın üstüne taşımak yeterli.",
      },
      { type: "h2", text: "3. Görseller ürünün gerçek boyutunu ve dokusunu göstermeli" },
      {
        type: "p",
        text: "\"Beklediğim gibi değil\" iadelerinin kaynağı çoğu zaman görsellerdir. Baymard'ın 2026'da güncellenen ürün sayfası araştırmasına göre sitelerin **yüzde 37'si** ürünün gerçek boyutunu anlatan, bir insanla ya da bilinen bir nesneyle birlikte çekilmiş görsel kullanmıyor. Giyilebilir ürünlerde sitelerin yüzde 23'ü manken üzerinde görsel göstermiyor.",
      },
      {
        type: "ul",
        items: [
          "En az bir görselde ürünü elde, masada ya da insan üzerinde gösterin; beyaz zeminde tek başına duran bir çanta büyüklüğünü anlatmaz.",
          "Kumaş ve yüzey için yakın çekim ekleyin. Renk farkı iadelerinde ürünü gün ışığında çekilmiş bir fotoğrafla gösterin.",
          "Müşterilerin yorumlara eklediği fotoğrafları kolay gezilebilir yapın; gerçek kullanıcı fotoğrafı stüdyo çekiminden daha güvenilir bulunur.",
        ],
      },
      { type: "h2", text: "4. Açıklamada ölçü, ağırlık ve malzeme eksik olmasın" },
      {
        type: "p",
        text: "Shopify, her ürün sayfasında ağırlık, ölçüler, malzeme bilgisi ve iade politikası bağlantısı bulunmasını öneriyor. Ev ürünleri, aksesuar ve elektronikte \"tahmin ettiğimden küçük çıktı\" iadesinin önüne geçmenin en ucuz yolu, ölçüyü santimetre olarak açıkça yazmak. Pazarlama dili ikinci sırada gelmeli; müşteri önce \"bu benim evime, çantama, ayağıma uyar mı\" sorusunun cevabını arıyor.",
      },
      { type: "h2", text: "5. İade bilgisini ürün sayfasında saklamayın" },
      {
        type: "p",
        text: "İlk bakışta ters görünüyor ama iade koşullarını görünür kılmak iadeyi artırmıyor, satışı güvenceye alıyor. Baymard'a göre sitelerin **yüzde 44'ü** ürün sayfasında iade politikasını göstermiyor ya da bağlantı vermiyor; testlerde kullanıcıların bu bilgiyi özellikle pahalı ürünlerde aradığı görülmüş. NRF raporunda da tüketicilerin yüzde 82'si ücretsiz iadeyi alışverişte önemli bir etken olarak gösteriyor. Kısa bir satır yeterli: \"14 gün içinde ücretsiz iade\" ve detay sayfasına bağlantı.",
      },
      {
        type: "quote",
        text: "İadeyi zorlaştırmak iadeyi azaltmaz, satışı azaltır. İadeyi azaltan şey, müşterinin doğru ürünü ilk seferde seçmesidir.",
      },
      { type: "h2", text: "Pratik sonuç" },
      {
        type: "p",
        text: "İade oranını düşürmek için önce ölçün: en çok iade alan ürünleri ve iade nedenlerini çıkarın. Sonra bu ürünlerin sayfalarında üç şeyi düzeltin: beden seçiminin yanında santimetreli beden tablosu ve kalıp notu, ürünün gerçek boyutunu gösteren en az bir görsel, açıkça yazılmış ölçü ve malzeme bilgisi. Bu değişiklikler genellikle yeni bir uygulama ya da yazılım gerektirmiyor; içerik ekibinin birkaç günlük işi.",
      },
    ],
    sources: [
      {
        label: "NRF — Consumers Expected to Return Nearly $850 Billion in Merchandise in 2025",
        url: "https://nrf.com/media-center/press-releases/consumers-expected-to-return-nearly-850-billion-in-merchandise-in-2025",
      },
      {
        label: "Shopify — Ecommerce Returns: Rates and Best Practices",
        url: "https://www.shopify.com/enterprise/blog/ecommerce-returns",
      },
      {
        label: "Baymard Institute — Product Page UX Best Practices 2026",
        url: "https://baymard.com/blog/current-state-ecommerce-product-page-ux",
      },
      {
        label: "Baymard Institute — Apparel: 10 Best Practices on Sizing",
        url: "https://baymard.com/research-articles/apparel-size-information",
      },
    ],
  },
  en: {
    title: "Cutting your return rate: which product page gaps trigger returns",
    category: "E-Commerce",
    excerpt:
      "Most returns don't start at the courier; they start with a question the product page left unanswered. Fixing size, measurement, material and image gaps pays off more than tightening your returns policy.",
    blocks: [
      {
        type: "p",
        text: "According to the 2025 returns report from the US National Retail Federation (NRF), **19.3% of online sales** are sent back; including in-store sales, the rate is 15.8%. Roughly one in five products sold online comes back. Some of those returns are unavoidable, but a large share comes from a question the shopper couldn't answer before buying: Will this size fit me? What does the fabric feel like? How big is it really? You can cut return costs on the product page, not just in logistics.",
      },
      { type: "h2", text: "1. Measure return reasons per product first" },
      {
        type: "p",
        text: "Shopify's returns guide recommends tracking return reasons by SKU: size and fit issues, descriptions or images that don't match the product, transit damage, manufacturing defects and change of mind. Without that split you can't tell what to fix on the product page.",
      },
      {
        type: "ul",
        items: [
          "Make the return reason a **required, multiple-choice** field; a free-text box alone can't be analysed.",
          "List your 20 most-returned products separately. Most of the return load usually sits in a handful of items.",
          "If the same product keeps coming back as \"didn't fit\", the problem isn't the customer; it's the size information on the page.",
        ],
      },
      { type: "h2", text: "2. Size charts: having one isn't enough; it has to be in the right place and measurable" },
      {
        type: "p",
        text: "In a 6,000-person global survey cited by Shopify, **61% of respondents** said they had returned apparel because it didn't fit. Baymard Institute's testing of apparel sites found that **83% of desktop sites** don't provide sufficient size information. The most common mistakes:",
      },
      {
        type: "ul",
        items: [
          "The size guide link sits at the bottom of the page or in a tab instead of right next to the size selector.",
          "The chart only lists S/M/L, with no **chest, waist and length measurements in centimetres or inches**.",
          "There are no instructions on how to measure, so shoppers can't compare their own measurements with the chart.",
          "The model's height and size worn are missing. \"Model is 1.78 m and wears size M\" answers most questions on its own.",
          "Every product gets the same generic chart; a slim-fit shirt and an oversized sweatshirt can't share one table.",
        ],
      },
      {
        type: "p",
        text: "Practical tip: add a **fit note** to your most-returned products, such as \"runs small, we recommend sizing up\". That information is usually already in customer reviews; you just need to move it to the top of the page.",
      },
      { type: "h2", text: "3. Images should show real size and texture" },
      {
        type: "p",
        text: "\"Not what I expected\" returns usually start with the images. Baymard's product page research, updated in 2026, found that **37% of sites** don't show any in-scale image of the product next to a person or an object of known size. For wearable products, 23% of sites don't show the item on a model.",
      },
      {
        type: "ul",
        items: [
          "Show the product in a hand, on a table or on a person in at least one image; a bag alone on a white background says nothing about its size.",
          "Add close-ups of fabric and surfaces. If colour mismatch drives returns, add a photo taken in daylight.",
          "Make customer photos in reviews easy to browse; shoppers trust real-user photos more than studio shots.",
        ],
      },
      { type: "h2", text: "4. Don't leave out dimensions, weight and materials" },
      {
        type: "p",
        text: "Shopify recommends that every product page include weight, dimensions, materials and a link to the returns policy. In home goods, accessories and electronics, the cheapest way to prevent \"smaller than I expected\" returns is to state the dimensions plainly. Marketing copy comes second; the shopper first wants to know whether it will fit their home, their bag or their feet.",
      },
      { type: "h2", text: "5. Don't hide returns information on the product page" },
      {
        type: "p",
        text: "It sounds counter-intuitive, but making return terms visible doesn't increase returns; it protects the sale. According to Baymard, **44% of sites** don't show or link to the returns policy on the product page, and testing showed users actively look for it, especially on expensive items. In the NRF report, 82% of consumers also name free returns as a major factor when shopping. A single line is enough: \"Free returns within 14 days\" with a link to the details.",
      },
      {
        type: "quote",
        text: "Making returns harder doesn't reduce returns; it reduces sales. What reduces returns is shoppers picking the right product the first time.",
      },
      { type: "h2", text: "The practical takeaway" },
      {
        type: "p",
        text: "To lower your return rate, start by measuring: identify your most-returned products and why they come back. Then fix three things on those pages: a size chart with real measurements and a fit note next to the size selector, at least one image that shows the product's real size, and clearly stated dimensions and materials. These changes rarely need a new app or software; they're a few days' work for a content team.",
      },
    ],
    sources: [
      {
        label: "NRF — Consumers Expected to Return Nearly $850 Billion in Merchandise in 2025",
        url: "https://nrf.com/media-center/press-releases/consumers-expected-to-return-nearly-850-billion-in-merchandise-in-2025",
      },
      {
        label: "Shopify — Ecommerce Returns: Rates and Best Practices",
        url: "https://www.shopify.com/enterprise/blog/ecommerce-returns",
      },
      {
        label: "Baymard Institute — Product Page UX Best Practices 2026",
        url: "https://baymard.com/blog/current-state-ecommerce-product-page-ux",
      },
      {
        label: "Baymard Institute — Apparel: 10 Best Practices on Sizing",
        url: "https://baymard.com/research-articles/apparel-size-information",
      },
    ],
  },
};
