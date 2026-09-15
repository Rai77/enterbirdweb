/**
 * Hizmet sayfalarının arama motoru metinleri ve sık sorulan soruları.
 *
 * Hizmetin kendisi (başlık, açıklama, maddeler) panelden gelir. Burası
 * panelde karşılığı olmayan parçaları taşır:
 *   - `metaTitle` / `metaDescription`: Google sonucunda görünen başlık ve özet.
 *     İnsanların gerçekten arattığı ifadelerle yazıldı.
 *   - `faq`: sayfadaki "Sık sorulan sorular" ve FAQPage işaretlemesi.
 *   - `title`, `short`, `description`, `bullets`: yalnızca panelde o dilde
 *     çeviri yoksa kullanılır (panel çeviri yokken Türkçe metni döndürüyor).
 *
 * Anahtarlar hizmetin adresidir: paneldeki slug'ın `toAnchorId` hâli.
 * Cevaplarda fiyat ve süre taahhüdü yok; mevzuata dayanan bilgiler genel
 * çerçevede tutuldu.
 */

export type ServiceFaq = { q: string; a: string };

export type ServiceSeoLocale = {
  metaTitle: string;
  metaDescription: string;
  title?: string;
  short?: string;
  description?: string;
  bullets?: string[];
  faq?: ServiceFaq[];
};

export const serviceSeo: Record<
  string,
  { tr: ServiceSeoLocale; en: ServiceSeoLocale }
> = {
  ecommerce: {
    tr: {
      metaTitle: "E-Ticaret Sitesi Kurulumu: Shopify, İkas, Ticimax",
      metaDescription:
        "Platform seçiminden canlı yayına e-ticaret sitesi kurulumu: UX/UI, ödeme ve kargo entegrasyonları, ürün girişi ve teknik SEO altyapısı tek elden.",
      faq: [
        {
          q: "Hangi e-ticaret altyapısını seçmeliyim?",
          a: "Tek bir doğru cevap yok. Shopify yurt dışı satış ve uygulama ekosisteminde güçlü; İkas, Ticimax ve T-Soft Türkiye'deki ödeme, kargo ve pazaryeri entegrasyonlarında öne çıkıyor; WooCommerce tam kontrol isteyenler için esnek ama bakım yükü daha fazla. Seçim; hedef pazarınıza, ürün sayınıza, bütçenize ve ekibinizin teknik kapasitesine göre yapılmalı.",
        },
        {
          q: "E-ticaret sitesi kurulumu neleri kapsıyor?",
          a: "Platform kurulumu, tema ve UX/UI düzenlemeleri, ödeme ve kargo entegrasyonları, kategori yapısı ve ürün giriş standartları, dönüşüm takibi ile site haritası, indeksleme ve hız gibi teknik SEO altyapısı. Amaç, yayına alındığı gün satışa ve ölçüme hazır bir mağaza.",
        },
        {
          q: "Site açıldı ama satış gelmiyor, ne yapmalıyım?",
          a: "Sırayla üç şeye bakın. Önce ölçüm: GA4 ve dönüşüm takibi doğru çalışıyor mu? Sonra trafik: siteye reklam, arama, sosyal medya ya da pazaryerinden ziyaretçi geliyor mu? En son dönüşüm: ürün sayfası, fiyat, kargo bilgisi ve ödeme adımı ikna edici mi? Sorun genellikle bu üçünden birinde toplanır.",
        },
        {
          q: "Platform değiştirirken Google sıralamalarımı kaybeder miyim?",
          a: "Doğru yapılırsa kaybetmezsiniz. En kritik adım, eski sayfa adreslerinin yeni adreslere kalıcı (301) yönlendirilmesi. Ardından yeni site haritası Google Search Console'a gönderilir ve ilk haftalarda tarama hataları izlenir.",
        },
      ],
    },
    en: {
      metaTitle: "E-Commerce Store Development: Shopify, İkas, Ticimax",
      metaDescription:
        "End-to-end e-commerce store development: platform choice, UX/UI, payment and shipping integrations, product catalogue setup and a technical SEO foundation.",
      faq: [
        {
          q: "Which e-commerce platform should I choose?",
          a: "There is no single right answer. Shopify is strong for cross-border selling and its app ecosystem; İkas, Ticimax and T-Soft stand out for Turkish payment, shipping and marketplace integrations; WooCommerce offers full control but more maintenance. The choice should follow your target market, catalogue size, budget and your team's technical capacity.",
        },
        {
          q: "What does an e-commerce store build include?",
          a: "Platform setup, theme and UX/UI work, payment and shipping integrations, category structure and product-entry standards, conversion tracking, and a technical SEO foundation covering sitemaps, indexing and speed. The goal is a store that is ready to sell and measure on launch day.",
        },
        {
          q: "My store is live but not selling. What should I do?",
          a: "Check three things in order. Measurement: are GA4 and conversion tracking working? Traffic: are visitors arriving from ads, search, social or marketplaces? Conversion: are the product page, price, shipping information and checkout convincing? The problem usually sits in one of these three.",
        },
        {
          q: "Will I lose my Google rankings when I switch platforms?",
          a: "Not if the migration is done properly. The critical step is permanently (301) redirecting every old URL to its new address. Then the new sitemap is submitted in Google Search Console and crawl errors are monitored for the first few weeks.",
        },
      ],
    },
  },

  performance: {
    tr: {
      metaTitle: "Performans Pazarlama Ajansı: Google, Meta, TikTok Ads",
      metaDescription:
        "Google Ads, Meta ve TikTok reklamlarında ROAS odaklı kampanya yönetimi; GA4 ve sunucu taraflı ölçüm, A/B test ve şeffaf haftalık raporlama.",
      faq: [
        {
          q: "Reklam bütçesi ne kadar olmalı?",
          a: "Bütçe; ürün fiyatınıza, kâr marjınıza ve hedefinize göre belirlenir. Önemli olan, kampanyaların öğrenme aşamasını tamamlayabileceği ve anlamlı veri üretebileceği bir test bütçesiyle başlamak. Bütçe, sonuçlar kârlı hâle geldikçe kademeli olarak artırılmalı.",
        },
        {
          q: "ROAS nedir, iyi bir ROAS kaçtır?",
          a: "ROAS, reklama harcanan her 1 liranın kaç liralık satış getirdiğini gösterir. İyi ROAS sektöre değil kâr marjınıza bağlıdır: başa baş ROAS yaklaşık olarak 1'in brüt kâr marjına bölünmesiyle bulunur. Yüzde 25 marjla çalışan bir marka için 4'ün altındaki ROAS zarar anlamına gelebilir.",
        },
        {
          q: "Sonuçları nasıl raporluyorsunuz?",
          a: "Haftalık ve aylık raporlarda harcama, satış, ROAS, müşteri kazanım maliyeti (CAC) ve müşteri yaşam boyu değeri (LTV) gibi metrikleri kanal bazında paylaşıyoruz. Veriler GA4 ve sunucu taraflı ölçüm altyapısından geliyor; hangi bütçenin nereye gittiği şeffaf şekilde görülüyor.",
        },
      ],
    },
    en: {
      metaTitle: "Performance Marketing Agency: Google, Meta, TikTok Ads",
      metaDescription:
        "ROAS-focused campaign management on Google Ads, Meta and TikTok, with GA4 and server-side tracking, A/B testing and transparent weekly reporting.",
      faq: [
        {
          q: "How big should my ad budget be?",
          a: "Budget depends on your product price, margin and goal. What matters is starting with a test budget large enough for campaigns to exit the learning phase and produce meaningful data, then scaling step by step as results become profitable.",
        },
        {
          q: "What is ROAS and what is a good ROAS?",
          a: "ROAS shows how much revenue each unit of ad spend brings back. A good ROAS depends on your margin, not your industry: break-even ROAS is roughly 1 divided by your gross margin. For a brand working on a 25% margin, a ROAS below 4 can mean a loss.",
        },
        {
          q: "How do you report results?",
          a: "Weekly and monthly reports share spend, revenue, ROAS, customer acquisition cost (CAC) and customer lifetime value (LTV) by channel. Data comes from GA4 and server-side tracking, so you can see exactly where each part of the budget went.",
        },
      ],
    },
  },

  shopify: {
    tr: {
      metaTitle: "Shopify Mağaza Kurulumu, Tasarım ve Geliştirme",
      metaDescription:
        "Shopify mağaza kurulumu, tema tasarımı, özel uygulama geliştirme ve entegrasyonlar. Türkiye'ye ve yurt dışına satış için uçtan uca Shopify hizmeti.",
      faq: [
        {
          q: "Shopify Türkiye'de kullanılabilir mi?",
          a: "Evet. Türkiye'den Shopify mağazası açıp hem Türkiye'ye hem yurt dışına satış yapılabiliyor. Shopify Payments Türkiye'de kurulu mağazalar için sunulmadığından, ödeme tarafında Shopify ile uyumlu ödeme sağlayıcıları kullanılıyor.",
        },
        {
          q: "Shopify mağaza kurulumu ne kadar sürer?",
          a: "Süre; ürün sayısına, hazır tema mı özel tasarım mı kullanılacağına ve gereken entegrasyonlara göre değişir. Hazır tema üzerine kurulan küçük bir katalog, özel tasarım ve çok sayıda entegrasyon içeren bir projeden çok daha hızlı yayına alınır. Net takvim, kapsam belirlendikten sonra çıkarılır.",
        },
        {
          q: "Başka bir platformdan Shopify'a geçiş yapılabilir mi?",
          a: "Evet. Ürünler, müşteriler ve sipariş geçmişi gibi veriler Shopify'a taşınabiliyor. Geçişte en kritik adım, eski sayfa adreslerinin yenilerine yönlendirilmesi; bu yapılmazsa Google'daki sıralamalar düşebiliyor.",
        },
        {
          q: "Shopify ile yurt dışına nasıl satış yapılır?",
          a: "Shopify Markets ile ülke veya bölge bazında pazarlar tanımlanıyor; her pazar için dil, fiyat, alan adı ve kargo ayarları ayrı yönetiliyor. Ziyaretçiye kendi para biriminde fiyat gösterip o para biriminde ödeme almak Shopify Payments gerektirdiğinden, ABD gibi pazarlara odaklanan markalar bazen hedef ülkede şirket kurarak ödeme altyapısını orada oluşturuyor.",
        },
      ],
    },
    en: {
      metaTitle: "Shopify Store Setup, Design and Development",
      metaDescription:
        "Shopify store setup, theme design, custom app development and integrations. End-to-end Shopify service for selling in Turkey and abroad.",
      title: "Shopify",
      short:
        "Shopify store setup, design, development and integrations, managed end to end.",
      description:
        "An end-to-end Shopify service: from running your store to building themes and the custom apps your business needs.",
      bullets: [
        "Shopify store setup",
        "Shopify design & UX/UI",
        "Shopify development & integrations",
        "Product & catalogue management",
      ],
      faq: [
        {
          q: "Can Shopify be used in Turkey?",
          a: "Yes. Businesses in Turkey can open a Shopify store and sell both domestically and abroad. Shopify Payments is not offered to stores based in Turkey, so payments run through Shopify-compatible payment providers.",
        },
        {
          q: "How long does a Shopify store setup take?",
          a: "It depends on catalogue size, whether a ready-made theme or a custom design is used, and the integrations required. A small catalogue on a ready-made theme goes live far faster than a custom design with many integrations. A firm timeline comes once the scope is defined.",
        },
        {
          q: "Can I move to Shopify from another platform?",
          a: "Yes. Products, customers and order history can be migrated to Shopify. The critical step is redirecting old page URLs to their new addresses; skipping it can cost you your Google rankings.",
        },
        {
          q: "How do I sell internationally with Shopify?",
          a: "Shopify Markets lets you define markets by country or region and manage language, pricing, domain and shipping separately for each. Showing and charging prices in the visitor's own currency requires Shopify Payments, so brands focused on markets such as the US sometimes form a company there to set up payments locally.",
        },
      ],
    },
  },

  seo: {
    tr: {
      metaTitle: "SEO ve GEO Hizmeti: Google ve Yapay Zekâ Aramaları",
      metaDescription:
        "Teknik SEO, anahtar kelime ve içerik stratejisiyle Google'da, ChatGPT ve Gemini gibi yapay zekâ aramalarında markanızı görünür kılıyoruz.",
      faq: [
        {
          q: "SEO çalışmasının sonuçları ne zaman görülür?",
          a: "Teknik düzeltmelerin etkisi haftalar içinde görülebilir. Rekabetçi aramalarda kalıcı sıralama ise genellikle birkaç ay süren düzenli içerik ve iç bağlantı çalışması gerektirir. SEO hızlı değil ama biriken bir kanal: yayınlanan her doğru sayfa uzun süre trafik getirmeye devam eder.",
        },
        {
          q: "GEO nedir, SEO'dan farkı ne?",
          a: "GEO (Generative Engine Optimization), markanızın ChatGPT, Gemini ve Google AI Overviews gibi yapay zekâ cevaplarında kaynak olarak geçmesi için yapılan çalışmadır. SEO'nun temelleri üzerine kurulur; farkı, içeriğin net tanımlar, yapılandırılmış veri ve güvenilir kaynaklarla yapay zekânın alıntılayabileceği biçimde hazırlanmasıdır.",
        },
        {
          q: "SEO mu yapmalıyım, reklam mı vermeliyim?",
          a: "İkisi birbirinin alternatifi değil. Reklam bugün trafik getirir ama bütçe durduğunda trafik de durur. SEO daha yavaş başlar ama kalıcıdır. Sağlıklı yol, reklamla hemen satış yaparken SEO ile reklama bağımlılığı zamanla azaltmaktır.",
        },
      ],
    },
    en: {
      metaTitle: "SEO & GEO Services: Rank in Google and AI Search",
      metaDescription:
        "Technical SEO, keyword research and content strategy to make your brand visible in Google and in AI search such as ChatGPT and Gemini.",
      faq: [
        {
          q: "When will I see results from SEO?",
          a: "Technical fixes can show impact within weeks. Lasting rankings for competitive searches usually take several months of consistent content and internal-linking work. SEO is slow but compounding: every good page keeps bringing traffic long after it is published.",
        },
        {
          q: "What is GEO and how is it different from SEO?",
          a: "GEO (Generative Engine Optimization) is the work of getting your brand cited as a source in AI answers from ChatGPT, Gemini and Google AI Overviews. It builds on SEO fundamentals; the difference is preparing content with clear definitions, structured data and credible sources so AI can quote it.",
        },
        {
          q: "Should I invest in SEO or ads?",
          a: "They are not alternatives. Ads bring traffic today, but traffic stops when the budget does. SEO starts slower but lasts. The healthy approach is to sell with ads now while SEO gradually reduces your dependence on paid traffic.",
        },
      ],
    },
  },

  "e-ihracat": {
    tr: {
      metaTitle: "E-İhracat Danışmanlığı: Amazon, Etsy ve Global Pazaryerleri",
      metaDescription:
        "Amazon, Etsy ve global pazaryerlerinde mağaza kurulumu ve yönetimi; yurt dışı e-ticaret stratejisi, lojistik, fulfillment ve yasal süreçler.",
      faq: [
        {
          q: "E-ihracata başlamak için yurt dışında şirket gerekir mi?",
          a: "Hayır, Türkiye'deki şirketinizle global pazaryerlerinde satışa başlayabilirsiniz. Satış yapılacak ülkeye ve kanala göre hedef ülkede şirket kurmak işleri kolaylaştırabiliyor; örneğin ABD'de ödeme sağlayıcılarıyla ve bazı pazaryeri programlarıyla çalışmak için ABD şirketi avantaj sağlıyor.",
        },
        {
          q: "Hangi pazaryeriyle başlamalıyım?",
          a: "Seçimi pazaryerinin büyüklüğü değil, ürününüzü arayan müşterinin nerede alışveriş yaptığı belirlemeli. Amazon geniş kategori yelpazesinde güçlü; Etsy el yapımı, tasarım, vintage ve kişiye özel ürünlerde öne çıkıyor. Başlamadan önce hedef pazaryerinde kendi kategorinizde en çok satan ürünlerin fiyat, yorum sayısı ve teslimat süresini incelemek giriş eşiğini gösterir.",
        },
        {
          q: "Ürünleri Türkiye'den mi göndermeliyim, yurt dışı depo mu kullanmalıyım?",
          a: "Başlangıçta Türkiye'den göndermek sermaye bağlamaz; düşük tutarlı e-ticaret gönderileri ETGB ile basitleştirilmiş gümrük sürecinden geçer. Satışlar oturduğunda stoğun bir kısmını hedef ülkedeki bir depoya (örneğin Amazon FBA) taşımak teslimat süresini kısaltır, karşılığında stok ve depolama riskini üstlenirsiniz.",
        },
        {
          q: "E-ihracat için devlet desteği var mı?",
          a: "Ticaret Bakanlığı'nın e-ihracata yönelik destek programları bulunuyor. Kapsam ve şartlar dönem dönem güncellendiği için başvurmadan önce güncel mevzuatı kontrol etmek gerekiyor.",
        },
      ],
    },
    en: {
      metaTitle: "Cross-Border E-Commerce: Amazon, Etsy and Global Marketplaces",
      metaDescription:
        "Store setup and management on Amazon, Etsy and global marketplaces, plus cross-border e-commerce strategy, logistics, fulfilment and legal processes.",
      title: "Cross-Border E-Commerce",
      short: "Setting up and running your stores on global marketplaces.",
      description:
        "Global marketplaces are no longer optional. Take your brand to the world with us.",
      bullets: [
        "Global marketplace setup and management",
        "International e-commerce strategy",
        "Logistics and fulfilment",
        "Tax and legal processes",
        "Global digital marketing",
        "Brand and product strategy",
        "Operations and customer management",
        "Technology and infrastructure",
        "Training and consulting content",
      ],
      faq: [
        {
          q: "Do I need a company abroad to start selling internationally?",
          a: "No. You can start selling on global marketplaces with your Turkish company. Depending on the country and channel, forming a company in the target market can make things easier; a US company, for example, helps when working with US payment providers and some marketplace programmes.",
        },
        {
          q: "Which marketplace should I start with?",
          a: "Let the decision follow where your customers shop, not which marketplace is biggest. Amazon is strong across a wide range of categories; Etsy stands out for handmade, design, vintage and personalised products. Before starting, review the price, review count and delivery time of the best sellers in your category to see the entry bar.",
        },
        {
          q: "Should I ship from Turkey or use a warehouse abroad?",
          a: "Shipping from Turkey at first ties up no capital; low-value e-commerce shipments go through a simplified customs process (ETGB). Once sales are steady, moving part of your stock to a warehouse in the target country (such as Amazon FBA) shortens delivery times, in exchange for taking on inventory and storage risk.",
        },
        {
          q: "Is there government support for e-commerce exports?",
          a: "Turkey's Ministry of Trade runs support programmes for e-commerce exports. Scope and conditions are updated from time to time, so check the current regulations before applying.",
        },
      ],
    },
  },

  "amerika-da-sirket-kurulumu": {
    tr: {
      metaTitle: "Amerika'da Şirket Kurma (LLC), EIN ve Marka Tescili",
      metaDescription:
        "Türkiye'den ABD'de LLC şirket kurulumu: eyalet seçimi, EIN başvurusu, banka ve ödeme altyapısı, USPTO marka tescili ve Amazon satışına hazırlık.",
      faq: [
        {
          q: "Türkiye'den Amerika'da şirket kurabilir miyim?",
          a: "Evet. ABD'de LLC kurmak için ABD vatandaşı olmak ya da ABD'de yaşamak gerekmiyor. Kuruluş, EIN başvurusu ve marka tescili gibi adımların büyük kısmı Türkiye'den yürütülebiliyor. Banka hesabı açılışında ise bazı bankalar yüz yüze görüşme isteyebiliyor.",
        },
        {
          q: "Hangi eyalette şirket kurmalıyım?",
          a: "Delaware, Wyoming, New Mexico ve Florida sık tercih ediliyor; aralarındaki fark kuruluş ve yıllık yenileme maliyetleri, raporlama yükümlülükleri ve gizlilik düzeyi. ABD'de depo, ofis ya da çalışan gibi fiziksel bir varlığınız olacaksa o eyalette de kayıt gerekebilir. Doğru eyalet, satış kanalınıza ve iş planınıza göre seçilmeli.",
        },
        {
          q: "EIN nedir, neden gerekli?",
          a: "EIN, ABD vergi idaresi IRS'in şirkete verdiği vergi kimlik numarası. Banka hesabı, ödeme sağlayıcıları ve Amazon gibi pazaryeri başvuruları için gerekiyor. SSN veya ITIN numarası olmayan şirket sahipleri başvuruyu çevrimiçi değil, SS-4 formuyla faks ya da posta üzerinden yapıyor.",
        },
        {
          q: "Şirket kurulduktan sonra her yıl ne yapmam gerekiyor?",
          a: "Çoğu eyalet yıllık rapor ya da ücret istiyor; bunlar aksarsa şirketin Good Standing durumu bozuluyor. Yabancı sahipli tek ortaklı LLC'ler ayrıca her yıl IRS'e Form 5472 bildirimi veriyor. ABD'de şirket kurmak Türkiye'deki vergi yükümlülüklerinizi ortadan kaldırmadığı için bu tarafı bir vergi danışmanıyla planlamanızı öneriyoruz.",
        },
        {
          q: "ABD'de marka tescili için ne gerekiyor?",
          a: "Başvuru ABD Patent ve Marka Ofisi USPTO'ya yapılıyor. Merkezi ABD dışında olan başvuru sahiplerinin ABD'de lisanslı bir avukat aracılığıyla başvurması zorunlu. Tescilli ya da başvurusu yapılmış bir marka, Amazon Brand Registry gibi marka koruma programlarına erişimi de sağlıyor.",
        },
      ],
    },
    en: {
      metaTitle: "US Company Formation (LLC), EIN and Trademark Registration",
      metaDescription:
        "Form a US LLC from abroad: choosing a state, EIN application, bank and payment setup, USPTO trademark registration and getting ready to sell on Amazon.",
      title: "US Company Formation",
      short: "We set up your company in the US and get it ready to trade.",
      description:
        "We set up your company in the US and get it ready to trade: from choosing a state and forming your LLC to banking, trademark registration and sales channels.",
      bullets: [
        "Company formation (LLC)",
        "Trademark registration (USPTO)",
        "Choosing and setting up sales channels",
        "Guidance on choosing a state",
        "EIN application",
        "Certificate of Good Standing",
        "Bank and payment infrastructure",
        "Amazon, Etsy and other marketplace management",
        "Warehousing and fulfilment",
      ],
      faq: [
        {
          q: "Can I form a US company from outside the US?",
          a: "Yes. You do not need to be a US citizen or resident to form an LLC. Most steps, including formation, the EIN application and trademark filing, can be handled remotely. Some banks may still ask for an in-person meeting to open an account.",
        },
        {
          q: "Which state should I form my company in?",
          a: "Delaware, Wyoming, New Mexico and Florida are common choices; they differ in formation and annual costs, reporting obligations and privacy. If you will have a physical presence such as a warehouse, office or employees in another state, you may need to register there as well. The right state depends on your sales channels and business plan.",
        },
        {
          q: "What is an EIN and why do I need one?",
          a: "An EIN is the tax identification number the IRS assigns to your company. Banks, payment providers and marketplaces such as Amazon ask for it. Owners without an SSN or ITIN cannot apply online; they apply with Form SS-4 by fax or mail.",
        },
        {
          q: "What do I need to do every year after formation?",
          a: "Most states require an annual report or fee; missing it puts the company out of good standing. Foreign-owned single-member LLCs must also file Form 5472 with the IRS every year. Forming a US company does not remove your tax obligations at home, so plan that side with a tax adviser.",
        },
        {
          q: "What does US trademark registration require?",
          a: "Applications are filed with the United States Patent and Trademark Office (USPTO). Applicants domiciled outside the US must be represented by a US-licensed attorney. A registered or pending trademark also unlocks brand protection programmes such as Amazon Brand Registry.",
        },
      ],
    },
  },

  marketplace: {
    tr: {
      metaTitle: "Pazaryeri Yönetimi: Trendyol, Hepsiburada, Amazon",
      metaDescription:
        "Trendyol, Hepsiburada, Amazon ve N11 mağaza yönetimi: entegrasyon, listeleme optimizasyonu, sponsorlu reklamlar, fiyat ve yorum yönetimi.",
      faq: [
        {
          q: "Hangi pazaryerlerinde mağaza yönetiyorsunuz?",
          a: "Trendyol, Hepsiburada, Amazon, N11 ve ÇiçekSepeti mağazalarını entegrasyondan sponsorlu reklama, yorum yönetiminden fiyat rekabet takibine kadar uçtan uca yönetiyoruz.",
        },
        {
          q: "Pazaryerinde satışları artırmanın en etkili yolu nedir?",
          a: "Önce listeleme kalitesi: arama yapılan ifadeleri içeren başlık, eksiksiz ürün özellikleri ve iyi görseller. Sonra fiyat rekabeti ve stok sürekliliği. Bunlar yerindeyse sponsorlu reklamlar ve olumlu yorum sayısı satışları hızlandırır. Zayıf bir listelemeye reklam vermek bütçeyi eritir.",
        },
        {
          q: "Kendi sitem varken pazaryerinde de satmalı mıyım?",
          a: "Çoğu marka için evet. Pazaryeri hazır trafik ve hızlı satış sağlar; kendi siteniz ise daha yüksek marj, müşteri verisi ve marka bağlılığı. İki kanalın fiyat ve stok politikasını birlikte planlamak, birbirinin satışını yemesini önler.",
        },
      ],
    },
    en: {
      metaTitle: "Marketplace Management: Trendyol, Hepsiburada, Amazon",
      metaDescription:
        "Trendyol, Hepsiburada, Amazon and N11 store management: integration, listing optimisation, sponsored ads, pricing and review management.",
      faq: [
        {
          q: "Which marketplaces do you manage?",
          a: "We run Trendyol, Hepsiburada, Amazon, N11 and ÇiçekSepeti stores end to end, from integration and sponsored ads to review management and price-competition tracking.",
        },
        {
          q: "What is the most effective way to grow marketplace sales?",
          a: "Listing quality comes first: titles that contain the terms people search for, complete product attributes and strong images. Then price competitiveness and consistent stock. With those in place, sponsored ads and positive reviews accelerate sales. Advertising a weak listing just burns budget.",
        },
        {
          q: "Should I sell on marketplaces if I already have my own store?",
          a: "For most brands, yes. Marketplaces bring ready-made traffic and quick sales; your own store brings higher margins, customer data and loyalty. Planning pricing and stock across both channels keeps them from cannibalising each other.",
        },
      ],
    },
  },

  ai: {
    tr: {
      metaTitle: "Yapay Zekâ Otomasyonu: Chatbot ve İçerik Üretimi",
      metaDescription:
        "Müşteri hizmetleri chatbotları, otomatik ürün açıklaması, kişiselleştirilmiş öneri ve CRM akışlarıyla e-ticarette yapay zekâ otomasyonu.",
      faq: [
        {
          q: "E-ticaret için yapay zekâ otomasyonu neleri kapsıyor?",
          a: "Sık tekrarlanan işleri: müşteri sorularını yanıtlayan chatbotları, ürün açıklaması ve çeviri gibi içerik üretimini, kişiselleştirilmiş ürün önerilerini, CRM ve e-posta akışlarını ve raporlamayı. Amaç ekibin yerini almak değil, zamanını büyümeye ayırabilmesini sağlamak.",
        },
        {
          q: "Chatbot müşteri hizmetlerinin yerini tutar mı?",
          a: "Tamamen değil. Kargo durumu, iade koşulları, beden ve ürün bilgisi gibi sık gelen soruları anında yanıtlayarak ekibin yükünü azaltır. Şikâyetler ve istisnai durumlar ise bir kişiye aktarılmalı; iyi kurgulanmış bir asistan ne zaman devretmesi gerektiğini bilir.",
        },
        {
          q: "Yapay zekâ ile yazılan ürün açıklamaları SEO'ya zarar verir mi?",
          a: "Kontrolsüz ve birbirinin kopyası metinler zarar verebilir. Google içeriğin nasıl üretildiğine değil, okuyana fayda sağlayıp sağlamadığına bakar. Bu yüzden ürün bilgisinden beslenen, marka dilinde yazılmış ve yayından önce bir kişinin kontrol ettiği metinler hedeflenmeli.",
        },
        {
          q: "Loom Commerce nedir?",
          a: "Enterbird'ün Shopify mağazaları için geliştirdiği, 5 modülden oluşan yapay zekâ katmanıdır. Marka sesinde içerik üretimi, çoklu dil çevirisi ve dolandırıcılık ile bot koruması (Loom Guard) gibi özellikleri mağazaya entegre eder.",
        },
      ],
    },
    en: {
      metaTitle: "AI Automation for E-Commerce: Chatbots and Content",
      metaDescription:
        "E-commerce AI automation: customer service chatbots, automated product copy, personalised recommendations and CRM flows.",
      faq: [
        {
          q: "What does AI automation for e-commerce cover?",
          a: "The repetitive work: chatbots that answer customer questions, content such as product copy and translations, personalised product recommendations, CRM and email flows, and reporting. The goal is not to replace your team but to free its time for growth.",
        },
        {
          q: "Can a chatbot replace customer service?",
          a: "Not entirely. It answers frequent questions about shipping status, return policies, sizing and product details instantly, which takes load off the team. Complaints and edge cases should go to a person; a well-designed assistant knows when to hand over.",
        },
        {
          q: "Does AI-written product copy hurt SEO?",
          a: "Unchecked, near-duplicate copy can. Google looks at whether content helps the reader, not at how it was produced. Aim for copy that is fed by real product data, written in your brand voice and reviewed by a person before it goes live.",
        },
        {
          q: "What is Loom Commerce?",
          a: "Loom Commerce is Enterbird's own 5-module AI layer built for Shopify stores. It brings brand-voice content, multi-language translation and fraud and bot protection (Loom Guard) into the store.",
        },
      ],
    },
  },

  design: {
    tr: {
      metaTitle: "Web Tasarım ve UI/UX: Hızlı, Dönüşüm Odaklı Siteler",
      metaDescription:
        "Figma'da prototipten Next.js, Webflow ve WordPress ile canlı yayına; SEO, erişilebilirlik ve Core Web Vitals uyumlu web tasarım.",
      faq: [
        {
          q: "Web sitemi hangi altyapıyla yaptırmalıyım?",
          a: "İhtiyaca göre değişir. Next.js hız ve özel geliştirme gereken projelerde, Webflow kod bilmeden içerik yönetmek isteyen ekiplerde, WordPress geniş eklenti ekosistemi gereken sitelerde, Shopify ise e-ticarette öne çıkar. Seçimi sitenin amacı ve ekibinizin siteyi nasıl yöneteceği belirlemeli.",
        },
        {
          q: "Core Web Vitals nedir, neden önemli?",
          a: "Google'ın bir sayfanın ne kadar hızlı yüklendiğini, ne kadar çabuk tepki verdiğini ve yüklenirken içeriğin kayıp kaymadığını ölçtüğü metriklerdir. Arama sıralamasında bir sinyal olarak kullanılır ve dönüşümü doğrudan etkiler: yavaş açılan sayfayı ziyaretçi beklemeden terk eder.",
        },
        {
          q: "Tasarım süreci nasıl ilerliyor?",
          a: "UX araştırması ve kullanıcı yolculuğu haritasıyla başlar, Figma'da wireframe ve prototiple devam eder. Onaylanan tasarım seçilen altyapıda koda dökülüp yayına alınır. Yayından sonra heatmap ve oturum kayıtlarıyla ziyaretçilerin nerede takıldığı izlenir ve tasarım bu veriyle iyileştirilir.",
        },
      ],
    },
    en: {
      metaTitle: "Web & UI/UX Design: Fast, Conversion-Focused Websites",
      metaDescription:
        "From Figma prototypes to live Next.js, Webflow and WordPress sites, built to SEO, accessibility and Core Web Vitals standards.",
      faq: [
        {
          q: "Which platform should my website be built on?",
          a: "It depends on the need. Next.js suits projects that need speed and custom development, Webflow suits teams that want to manage content without code, WordPress suits sites that rely on a large plugin ecosystem, and Shopify leads for e-commerce. The site's purpose and how your team will run it should decide.",
        },
        {
          q: "What are Core Web Vitals and why do they matter?",
          a: "They are Google's metrics for how fast a page loads, how quickly it responds and whether content shifts around while loading. Google uses them as a ranking signal, and they affect conversion directly: visitors leave slow pages before they finish loading.",
        },
        {
          q: "How does the design process work?",
          a: "It starts with UX research and user journey mapping, then moves to wireframes and prototypes in Figma. The approved design is built on the chosen platform and launched. After launch, heatmaps and session recordings show where visitors get stuck, and the design is improved with that data.",
        },
      ],
    },
  },

  social: {
    tr: {
      metaTitle: "Sosyal Medya Yönetimi ve E-posta Otomasyonu",
      metaDescription:
        "İçerik takvimi, Reels ve TikTok üretimi, topluluk yönetimi ve influencer iş birlikleriyle birlikte terk edilen sepet ve geri kazanım e-posta/SMS akışları.",
      faq: [
        {
          q: "Sosyal medya yönetimi hangi işleri kapsıyor?",
          a: "İçerik stratejisi ve editoryal takvim, marka dili ve görsel bütünlük, Reels, TikTok, fotoğraf ve video üretimi, yorum ve mesaj yönetimi ile influencer iş birlikleri. Amaç rastgele paylaşım değil, satışa ve markanın hatırlanmasına hizmet eden düzenli bir iletişim.",
        },
        {
          q: "Terk edilen sepet e-postası gerçekten işe yarar mı?",
          a: "Evet, e-ticaretteki en verimli otomasyonlardan biridir, çünkü satın almaya çok yaklaşmış kişiye ulaşır. Etkisi zamanlamaya ve içeriğe bağlıdır: sepetteki ürünü hatırlatan ilk mesajın ardından soruları gideren ya da güven veren takip mesajları, genellikle tek bir mesajdan daha iyi sonuç verir.",
        },
        {
          q: "RFM segmentasyonu nedir?",
          a: "Müşterileri son alışveriş tarihine (Recency), alışveriş sıklığına (Frequency) ve harcadıkları tutara (Monetary) göre gruplamaktır. Böylece sadık müşteriye, uzun süredir alışveriş yapmayana ve yeni müşteriye aynı kampanya yerine her birine uygun mesaj gönderilir.",
        },
      ],
    },
    en: {
      metaTitle: "Social Media Management and Email Automation",
      metaDescription:
        "Content calendars, Reels and TikTok production, community management and influencer work, plus abandoned-cart and win-back email/SMS flows.",
      faq: [
        {
          q: "What does social media management include?",
          a: "Content strategy and an editorial calendar, brand voice and visual consistency, Reels, TikTok, photo and video production, comment and message handling, and influencer collaborations. The goal is not random posting but consistent communication that drives sales and keeps the brand top of mind.",
        },
        {
          q: "Do abandoned-cart emails really work?",
          a: "Yes, they are among the most efficient e-commerce automations because they reach people who were very close to buying. Results depend on timing and content: a first reminder of the items in the cart, followed by messages that answer questions or build trust, usually outperforms a single email.",
        },
        {
          q: "What is RFM segmentation?",
          a: "It groups customers by how recently they bought (Recency), how often they buy (Frequency) and how much they spend (Monetary). Instead of one campaign for everyone, loyal customers, lapsed customers and new customers each get a message that fits them.",
        },
      ],
    },
  },

  operations: {
    tr: {
      metaTitle: "E-Ticaret Operasyon ve Lojistik Yönetimi",
      metaDescription:
        "Sipariş yönetimi, kargo anlaşmaları, depo ve fulfillment, iade/değişim süreçleri ve müşteri hizmetleri prosedürleriyle e-ticaret operasyonu.",
      faq: [
        {
          q: "E-ticaret operasyonu neden bu kadar önemli?",
          a: "Müşteri siteden memnun ayrılsa bile geç gelen kargo, yanlış ürün ya da zor bir iade süreci onu bir daha geri getirmez ve çoğu zaman olumsuz yoruma dönüşür. Tekrar eden satın almalar ve iyi yorumlar büyük ölçüde satın alma sonrasındaki deneyimle kazanılır.",
        },
        {
          q: "Hangi kargo firmalarıyla anlaşma kurabiliyorsunuz?",
          a: "Aras, MNG, Yurtiçi ve Sürat gibi firmalarla anlaşma süreçlerini yönetiyoruz. Doğru seçim; gönderi hacminize, ürünlerinizin ağırlık ve boyutuna, teslimat bölgelerinize ve iade oranınıza göre yapılır. Birden fazla firmayla çalışmak maliyet ve teslimat süresinde esneklik sağlar.",
        },
        {
          q: "Fulfillment hizmetine ne zaman geçmeliyim?",
          a: "Sipariş hacmi arttığında ve paketleme ile depo işleri ekibin büyümeye zaman ayırmasını engellemeye başladığında. Depolama, paketleme ve gönderimi bir fulfillment firmasına devretmek sabit maliyeti değişkene çevirir; ancak stok senkronizasyonu ve iade akışı baştan doğru kurulmalıdır.",
        },
      ],
    },
    en: {
      metaTitle: "E-Commerce Operations and Logistics Management",
      metaDescription:
        "E-commerce operations: order management, shipping agreements, warehousing and fulfilment, returns and exchanges, and customer service procedures.",
      faq: [
        {
          q: "Why do e-commerce operations matter so much?",
          a: "Even if a customer enjoyed your site, a late delivery, the wrong item or a painful return means they will not come back, and it often turns into a negative review. Repeat purchases and good reviews are largely won by the experience after checkout.",
        },
        {
          q: "Which carriers can you set up agreements with?",
          a: "We manage agreements with carriers such as Aras, MNG, Yurtiçi and Sürat. The right choice depends on your shipping volume, product weight and size, delivery regions and return rate. Working with more than one carrier gives flexibility on cost and delivery time.",
        },
        {
          q: "When should I move to a fulfilment provider?",
          a: "When order volume grows and packing and warehouse work start keeping the team from growth work. Handing storage, packing and shipping to a fulfilment provider turns fixed costs into variable ones, but inventory sync and the returns flow need to be set up properly from day one.",
        },
      ],
    },
  },

  brand: {
    tr: {
      metaTitle: "Marka Stratejisi, Konumlandırma ve Büyüme Danışmanlığı",
      metaDescription:
        "Marka konumlandırma, hedef kitle ve rakip analizi, fiyatlandırma stratejisi, sadakat programları ve yeni pazar açılım planı.",
      faq: [
        {
          q: "Marka konumlandırma nedir?",
          a: "Markanızın rakiplerine göre müşterinin zihninde nerede durduğunu belirlemektir: premium mu, ulaşılabilir mi, niş mi? Konumlandırma; fiyatlandırmadan görsel dile, hangi kanalda reklam verileceğinden hangi müşteriye odaklanılacağına kadar diğer bütün kararların çerçevesini çizer.",
        },
        {
          q: "Fiyatlandırma stratejisi nasıl belirlenir?",
          a: "Üç şey birlikte değerlendirilir: rakip fiyatları, reklam, kargo ve iade dahil ürün başına gerçek kâr ve markanın konumlandırması. Sadece rakibe göre fiyat vermek kârı eritir, sadece maliyete göre fiyat vermek ise pazarın ödemeye hazır olduğu tutarı kaçırabilir. Kampanya fiyatları da markayı ucuzlatmadan bu çerçevede planlanmalıdır.",
        },
        {
          q: "Yurt dışı pazara açılmadan önce ne yapmalıyım?",
          a: "Önce hangi pazarda talep olduğunu, oradaki rakiplerin fiyatlarını ve ürününüzün gümrük, kargo ve iade maliyetini hesaplayın. Ardından o pazar için satış kanalına karar verin: kendi siteniz mi, Amazon ve Etsy gibi pazaryerleri mi? Küçük bir test bütçesiyle başlayıp veriye göre büyütmek riski azaltır.",
        },
      ],
    },
    en: {
      metaTitle: "Brand Strategy, Positioning and Growth Consulting",
      metaDescription:
        "Brand positioning, audience and competitor analysis, pricing strategy, loyalty programmes and new market expansion planning.",
      faq: [
        {
          q: "What is brand positioning?",
          a: "It defines where your brand sits in the customer's mind relative to competitors: premium, accessible or niche. Positioning frames every other decision, from pricing and visual identity to which channels you advertise on and which customers you focus on.",
        },
        {
          q: "How do you set a pricing strategy?",
          a: "Three things are weighed together: competitor prices, true profit per product including advertising, shipping and returns, and the brand's positioning. Pricing only against competitors erodes margin; pricing only on cost can miss what the market is willing to pay. Campaign prices should be planned within the same frame so they do not cheapen the brand.",
        },
        {
          q: "What should I do before expanding into a foreign market?",
          a: "First check where demand exists, how competitors price there and what customs, shipping and returns will cost for your product. Then choose the sales channel for that market: your own store or marketplaces such as Amazon and Etsy. Starting with a small test budget and scaling on data reduces the risk.",
        },
      ],
    },
  },

  "stok-ve-urun-strateji-yonetimi": {
    tr: {
      metaTitle: "Stok ve Ürün Strateji Yönetimi",
      metaDescription:
        "Haftalık satış verisiyle stok planlama, ölü ürün tespiti, ürün performans takibi, yeni ürün lansmanı ve sezonluk ürün planlaması.",
      faq: [
        {
          q: "Ölü ürün nedir, neden önemlidir?",
          a: "Belirli bir süredir satılmayan ya da çok yavaş satılan üründür. Depoda yer kaplar, sermayeyi bağlar ve çoğu zaman sezon geçtikçe değer kaybeder. Erken tespit edilirse kampanya, paket satış ya da farklı bir kanalda satışla paraya çevrilebilir.",
        },
        {
          q: "Ne kadar stok tutacağıma nasıl karar veririm?",
          a: "Haftalık satış hızına, tedarik süresine ve yaklaşan sezon ya da kampanyalara bakarak. Fazla stok nakit akışını sıkıştırır; az stok ise en çok satan ürünün tükenmesiyle hem satış hem reklam bütçesi kaybettirir. Hedef, her ürün için bu iki riski dengeleyen bir sipariş seviyesi belirlemektir.",
        },
        {
          q: "Yeni ürün lansmanında stok nasıl planlanır?",
          a: "Geçmiş satış verisi olmadığı için benzer ürünlerin performansı referans alınır ve ilk sipariş temkinli tutulur. Lansmandan sonraki ilk haftaların satış hızı izlenir, tekrar sipariş kararı bu veriye göre verilir.",
        },
      ],
    },
    en: {
      metaTitle: "Inventory and Product Strategy Management",
      metaDescription:
        "Inventory planning from weekly sales data, dead-stock detection, product performance tracking, new product launches and seasonal planning.",
      faq: [
        {
          q: "What is dead stock and why does it matter?",
          a: "Dead stock is inventory that has not sold, or sells very slowly, over a set period. It takes up space, ties up capital and often loses value as the season passes. Spotted early, it can be turned into cash through campaigns, bundles or another sales channel.",
        },
        {
          q: "How do I decide how much stock to hold?",
          a: "By looking at weekly sales velocity, supplier lead time and upcoming seasons or campaigns. Too much stock squeezes cash flow; too little means your best sellers run out, costing both sales and ad spend. The goal is a reorder level for each product that balances those two risks.",
        },
        {
          q: "How should stock be planned for a new product launch?",
          a: "With no sales history, similar products serve as the reference and the first order is kept cautious. Sales velocity in the first weeks after launch is tracked, and the reorder decision is made on that data.",
        },
      ],
      title: "Inventory & Product Strategy",
      short:
        "We cut inventory costs and capture more sales by offering the right product, in the right quantity, at the right time.",
      description:
        "Having the right product in stock at the right time and in the right quantity directly drives sales performance. By analysing weekly sales data, we manage inventory and product decisions with a data-driven approach, from spotting dead stock to planning new product launches.",
      bullets: [
        "Weekly sales data analysis",
        "Dead-stock detection and list management",
        "Planning how much of each product to stock",
        "Tracking the performance of selling and non-selling products",
        "Strategy for new product launches",
        "Seasonal and campaign-based product planning",
      ],
    },
  },
};
