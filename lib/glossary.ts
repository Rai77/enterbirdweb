import type { ArticleBlock } from "@/lib/blogArticles";

/**
 * Dijital terimler sözlüğü.
 *
 * Her terim kendi sayfasında yayınlanır: "ROAS nedir" ile "CAC nedir" ayrı
 * aranıyor, tek sayfada toplanırsa her biri kendi sorgusunda yarışamaz.
 *
 * Metinler özgündür ve kısa tutulur — sözlük tanımı, makale değil. Tanımın
 * ilk cümlesi hem listede hem meta açıklamasında kullanıldığı için tek başına
 * anlamlı olmalı.
 *
 * İçerik panelde değil burada: panele yeni bir bölüm eklemek veritabanında
 * yeni tablo gerektiriyor ve üretimde şema güncellenmiyor.
 */
export const GLOSSARY_CATEGORIES = [
  "E-Ticaret",
  "Performans Pazarlama",
  "SEO & İçerik",
  "Analitik & Ölçüm",
  "Operasyon & Pazaryeri",
] as const;

export type GlossaryCategory = (typeof GLOSSARY_CATEGORIES)[number];

export type GlossaryTerm = {
  slug: string;
  term: string;
  /** Kısaltmaların açılımı — "Return on Ad Spend" gibi. */
  full?: string;
  category: GlossaryCategory;
  /** Tek cümlelik tanım. Liste ve meta açıklaması bunu kullanır. */
  short: string;
  body: ArticleBlock[];
  related?: string[];
};

export const glossary: GlossaryTerm[] = [
  // ─────────────────────────────────────────────── E-Ticaret
  {
    slug: "aov",
    term: "AOV",
    full: "Average Order Value — Ortalama Sepet Tutarı",
    category: "E-Ticaret",
    short:
      "Bir siparişin ortalama parasal büyüklüğü; toplam cironun sipariş sayısına bölünmesiyle bulunur.",
    body: [
      {
        type: "p",
        text: "AOV, belirli bir dönemdeki **toplam cironun sipariş sayısına bölünmesiyle** hesaplanır. 100.000 TL ciro ve 400 sipariş, 250 TL AOV demektir.",
      },
      {
        type: "p",
        text: "Reklam maliyetleri yükseldiğinde büyümenin en ucuz yolu yeni müşteri bulmak değil, mevcut siparişi büyütmektir. AOV'yi artıran tipik hamleler: kademeli ücretsiz kargo eşiği, ürün paketleri, sepette tamamlayıcı ürün önerisi.",
      },
      {
        type: "p",
        text: "Tek başına yanıltıcı olabilir — birkaç büyük sipariş ortalamayı şişirir. Medyan sepet tutarıyla birlikte bakmak daha sağlıklıdır.",
      },
    ],
    related: ["donusum-orani", "ltv", "capraz-satis"],
  },
  {
    slug: "donusum-orani",
    term: "Dönüşüm Oranı",
    full: "Conversion Rate (CR)",
    category: "E-Ticaret",
    short:
      "Siteye gelen ziyaretçilerin yüzde kaçının satın alma gibi hedeflenen eylemi tamamladığı.",
    body: [
      {
        type: "p",
        text: "Dönüşüm sayısının oturum ya da ziyaretçi sayısına bölünmesiyle bulunur. 20.000 oturumda 300 sipariş **%1,5** dönüşüm oranıdır.",
      },
      {
        type: "p",
        text: "Trafiği artırmak pahalıdır; dönüşüm oranını artırmak aynı trafikten daha fazla satış çıkarır. Bu yüzden reklam bütçesini büyütmeden önce bakılması gereken ilk metriktir.",
      },
      {
        type: "p",
        text: "Kanala göre çok değişir: markalı aramadan gelen trafik, soğuk reklam trafiğinin kat kat üzerinde dönüşür. Tek bir ortalamaya bakmak yerine kanal kırılımında izleyin.",
      },
    ],
    related: ["sepet-terk-orani", "checkout", "aov"],
  },
  {
    slug: "sepet-terk-orani",
    term: "Sepet Terk Oranı",
    full: "Cart Abandonment Rate",
    category: "E-Ticaret",
    short:
      "Sepete ürün ekleyip satın almayı tamamlamadan siteden ayrılan kullanıcıların oranı.",
    body: [
      {
        type: "p",
        text: "Sepete ekleyip sipariş vermeyenlerin, sepete ekleyen toplam kullanıcıya oranıdır. E-ticarette normal aralık geniştir ama çoğu mağazada yarının üzerindedir.",
      },
      {
        type: "p",
        text: "En sık sebepler sürpriz kargo ücreti, zorunlu üyelik, uzun form ve güven eksikliğidir. Yani sepet terki genellikle bir pazarlama değil, bir **ödeme akışı** sorunudur.",
      },
      {
        type: "p",
        text: "Kurtarma e-postası ve hatırlatma mesajı işe yarar, ancak akıştaki sürtünmeyi düzeltmeden yapılan kurtarma çalışması yalnızca semptomu tedavi eder.",
      },
    ],
    related: ["checkout", "donusum-orani", "retargeting"],
  },
  {
    slug: "checkout",
    term: "Checkout",
    full: "Ödeme Adımı",
    category: "E-Ticaret",
    short:
      "Kullanıcının sepetten siparişi tamamlamaya kadar geçtiği ödeme akışının tamamı.",
    body: [
      {
        type: "p",
        text: "Adres, kargo seçimi, ödeme yöntemi ve onay adımlarını kapsar. Sitedeki en değerli ekrandır: buraya gelen kullanıcı satın almaya karar vermiştir, kaybedilen her kullanıcı doğrudan cirodan düşer.",
      },
      {
        type: "p",
        text: "Ölçülmesi gereken şey adım adım düşüştür. Hangi ekranda kaç kişi kayboluyor bilinmeden yapılan iyileştirme tahmine dayanır.",
      },
      {
        type: "p",
        text: "En çok kazandıran düzeltmeler genellikle küçüktür: kargo ücretini baştan göstermek, üyeliksiz alışverişe izin vermek, form alanlarını azaltmak.",
      },
    ],
    related: ["sepet-terk-orani", "donusum-orani"],
  },
  {
    slug: "sku",
    term: "SKU",
    full: "Stock Keeping Unit — Stok Takip Birimi",
    category: "E-Ticaret",
    short:
      "Satılabilir her ürün varyantını benzersiz şekilde tanımlayan stok kodu.",
    body: [
      {
        type: "p",
        text: "Bir tişörtün siyah-M bedeni ile beyaz-L bedeni **ayrı SKU'lardır**. Ürün sayısı ile SKU sayısı bu yüzden birbirinden farklıdır; 200 ürünlü bir mağazanın 1.200 SKU'su olabilir.",
      },
      {
        type: "p",
        text: "SKU disiplini, stok doğruluğunun temelidir. Pazaryeri entegrasyonlarında, kargo ve muhasebe eşleşmelerinde tutarsızlığın ilk kaynağı çoğu zaman düzensiz SKU yapısıdır.",
      },
    ],
    related: ["stok-devir-hizi", "urun-feed", "pazaryeri"],
  },
  {
    slug: "urun-feed",
    term: "Ürün Feed'i",
    full: "Product Feed / Katalog",
    category: "E-Ticaret",
    short:
      "Ürün bilgilerinin reklam ve pazaryeri platformlarına aktarıldığı yapılandırılmış veri dosyası.",
    body: [
      {
        type: "p",
        text: "Başlık, açıklama, fiyat, stok, görsel ve kimlik numaralarını içerir. Google Alışveriş, Meta katalog reklamları ve pazaryeri listelemeleri bu dosyadan beslenir.",
      },
      {
        type: "p",
        text: "Reklam performansının görünmeyen belirleyicisidir: eksik veya hatalı feed, kampanya ne kadar iyi kurulursa kurulsun sonucu sınırlar. Yanlış fiyat ya da stokta olmayan ürün, hem bütçe hem güven kaybettirir.",
      },
      {
        type: "p",
        text: "Yapay zekâ arama motorlarının ürünleri anlamasında da aynı dosya rol oynuyor; feed kalitesi artık sadece reklam meselesi değil.",
      },
    ],
    related: ["sku", "pazaryeri", "yapilandirilmis-veri"],
  },
  {
    slug: "capraz-satis",
    term: "Çapraz Satış ve Üst Satış",
    full: "Cross-sell & Upsell",
    category: "E-Ticaret",
    short:
      "Çapraz satış tamamlayıcı bir ürün önerir; üst satış aynı ihtiyacın daha üst modelini önerir.",
    body: [
      {
        type: "p",
        text: "Telefon alan birine kılıf önermek **çapraz satış**, daha yüksek hafızalı modeli önermek **üst satış**tır.",
      },
      {
        type: "p",
        text: "İkisi de yeni müşteri maliyeti ödemeden ciro büyütür; bu yüzden reklam maliyetleri arttıkça değeri artar. Doğru yeri genellikle ürün sayfası ve sepettir — ödeme adımında yapılan öneri dikkat dağıtıp dönüşümü düşürebilir.",
      },
    ],
    related: ["aov", "ltv"],
  },
  {
    slug: "stok-devir-hizi",
    term: "Stok Devir Hızı",
    full: "Inventory Turnover",
    category: "E-Ticaret",
    short: "Bir dönemde stokun kaç kez satılıp yenilendiğini gösteren oran.",
    body: [
      {
        type: "p",
        text: "Satılan malın maliyetinin ortalama stok değerine bölünmesiyle bulunur. Yüksek devir hızı, sermayenin rafta beklemek yerine döndüğü anlamına gelir.",
      },
      {
        type: "p",
        text: "E-ticarette nakit akışını en çok etkileyen metriklerden biridir. Ciro büyürken devir hızı düşüyorsa, büyüme stok şişirerek satın alınıyor demektir — kârlı görünen bir işletme bu şekilde nakitsiz kalabilir.",
      },
    ],
    related: ["sku", "fulfillment"],
  },
  {
    slug: "iade-orani",
    term: "İade Oranı",
    full: "Return Rate",
    category: "E-Ticaret",
    short: "Satılan ürünlerin yüzde kaçının müşteri tarafından iade edildiği.",
    body: [
      {
        type: "p",
        text: "Kategoriye göre çok değişir; hazır giyimde beden belirsizliği nedeniyle belirgin şekilde yüksektir.",
      },
      {
        type: "p",
        text: "Reklam raporundaki ROAS iadeleri görmez. Yüksek iade oranı olan bir mağazada kampanya kârlı görünürken işletme zarar ediyor olabilir; bu yüzden performans değerlendirmesi **iade sonrası net ciro** üzerinden yapılmalıdır.",
      },
      {
        type: "p",
        text: "En etkili düşürücüler ölçü tablosu, gerçek ürün görselleri ve beklentiyi doğru kuran açıklamalardır.",
      },
    ],
    related: ["roas", "aov"],
  },
  {
    slug: "headless-commerce",
    term: "Headless Commerce",
    full: "Başsız Ticaret",
    category: "E-Ticaret",
    short:
      "Mağaza vitrininin (arayüz) e-ticaret altyapısından ayrıldığı, ikisinin API ile konuştuğu mimari.",
    body: [
      {
        type: "p",
        text: "Klasik kurulumda tema ile altyapı iç içedir. Headless mimaride vitrin ayrı bir uygulamadır; sipariş, stok ve ödeme tarafıyla API üzerinden konuşur.",
      },
      {
        type: "p",
        text: "Kazancı hız ve tasarım özgürlüğüdür. Bedeli ise karmaşıklık ve maliyettir: tema düzenlemesiyle yapılabilecek işler geliştirici gerektirir.",
      },
      {
        type: "p",
        text: "Çoğu orta ölçekli mağaza için gereksizdir. Trafiği yüksek, özel deneyim gerektiren veya çok kanallı satan markalarda anlamlı hale gelir.",
      },
    ],
    related: ["core-web-vitals", "checkout"],
  },

  // ─────────────────────────────────────── Performans Pazarlama
  {
    slug: "roas",
    term: "ROAS",
    full: "Return on Ad Spend — Reklam Harcaması Getirisi",
    category: "Performans Pazarlama",
    short:
      "Reklama harcanan her birim paranın kaç birim ciro getirdiğini gösteren oran.",
    body: [
      {
        type: "p",
        text: "Reklamdan gelen cironun reklam harcamasına bölünmesiyle bulunur. 50.000 TL harcama ve 200.000 TL ciro **4x ROAS** demektir.",
      },
      {
        type: "p",
        text: "En sık yapılan hata ROAS'ı kârlılık sanmaktır. ROAS ciroyu ölçer; ürün maliyetini, kargoyu, iadeleri ve komisyonları görmez. Kâr marjı %25 olan bir üründe 3x ROAS zarar bile olabilir.",
      },
      {
        type: "p",
        text: "Anlamlı kullanım için önce **başabaş ROAS**'ınızı hesaplayın: 1 bölü brüt kâr marjı. Marjınız %40 ise başabaş noktanız 2,5x'tir; hedefiniz bunun üzerinde olmalıdır.",
      },
    ],
    related: ["cac", "ltv", "iade-orani"],
  },
  {
    slug: "cac",
    term: "CAC",
    full: "Customer Acquisition Cost — Müşteri Edinme Maliyeti",
    category: "Performans Pazarlama",
    short: "Bir yeni müşteri kazanmak için harcanan ortalama pazarlama tutarı.",
    body: [
      {
        type: "p",
        text: "Pazarlama harcamasının **yeni** müşteri sayısına bölünmesiyle bulunur. Mevcut müşterilerden gelen siparişler bu hesaba dahil edilmemelidir; edilirse CAC olduğundan düşük görünür.",
      },
      {
        type: "p",
        text: "Bu, otomatik kampanyalarda en sık düşülen tuzaktır: algoritma en kolay dönüşümü, yani zaten sizi bilen kişiyi hedefler. Rapor parlak görünür, yeni müşteri gelmez.",
      },
      {
        type: "p",
        text: "Tek başına değil, LTV ile birlikte anlamlıdır. Sağlıklı kabul edilen yaklaşım LTV'nin CAC'ın en az üç katı olmasıdır.",
      },
    ],
    related: ["ltv", "roas", "lookalike-kitle"],
  },
  {
    slug: "ltv",
    term: "LTV",
    full: "Lifetime Value — Yaşam Boyu Değer",
    category: "Performans Pazarlama",
    short:
      "Bir müşterinin ilişkisi boyunca işletmeye bıraktığı toplam net değer.",
    body: [
      {
        type: "p",
        text: "Basit yaklaşımla ortalama sipariş kârı × yıllık sipariş sıklığı × ortalama müşteri ömrü ile hesaplanır.",
      },
      {
        type: "p",
        text: "LTV'yi bilmek, ne kadar müşteri edinme maliyeti ödeyebileceğinizi belirler. Tekrar satın alma oranı yüksek bir markada ilk siparişte zarar etmek rasyonel olabilir; tek seferlik satılan bir üründe aynı hamle iflas yoludur.",
      },
      {
        type: "p",
        text: "Ciro değil **kâr** üzerinden hesaplayın; ciro üzerinden yapılan LTV hesabı gerçekte olmayan bir bütçe alanı yaratır.",
      },
    ],
    related: ["cac", "aov", "capraz-satis"],
  },
  {
    slug: "cpc",
    term: "CPC",
    full: "Cost Per Click — Tıklama Başı Maliyet",
    category: "Performans Pazarlama",
    short: "Reklamınıza yapılan bir tıklama için ödediğiniz ortalama tutar.",
    body: [
      {
        type: "p",
        text: "Toplam harcamanın tıklama sayısına bölünmesiyle bulunur. Rekabet, sezon ve reklam kalitesine göre değişir.",
      },
      {
        type: "p",
        text: "Düşük CPC tek başına iyi haber değildir: ucuz ama alakasız tıklama, pahalı ama satın alan tıklamadan kötüdür. CPC'yi her zaman dönüşüm oranıyla birlikte okuyun.",
      },
    ],
    related: ["ctr", "cpm", "donusum-orani"],
  },
  {
    slug: "cpm",
    term: "CPM",
    full: "Cost Per Mille — Bin Gösterim Maliyeti",
    category: "Performans Pazarlama",
    short: "Reklamınızın bin kez gösterilmesi için ödediğiniz tutar.",
    body: [
      {
        type: "p",
        text: "Erişim maliyetinin ölçüsüdür. Hedef kitle daraldıkça ve rekabet arttıkça yükselir; kasım-aralık gibi yoğun dönemlerde belirgin şekilde artar.",
      },
      {
        type: "p",
        text: "CPM'deki ani yükseliş çoğu zaman kitle yorgunluğunun işaretidir: aynı kişilere aynı kreatifi tekrar tekrar gösteriyorsunuzdur. Çözüm bütçeyi kısmak değil, kreatifi yenilemektir.",
      },
    ],
    related: ["cpc", "ctr"],
  },
  {
    slug: "ctr",
    term: "CTR",
    full: "Click-Through Rate — Tıklama Oranı",
    category: "Performans Pazarlama",
    short: "Reklamı veya bağlantıyı gören kişilerin yüzde kaçının tıkladığı.",
    body: [
      {
        type: "p",
        text: "Tıklama sayısının gösterim sayısına bölünmesiyle bulunur. Reklamda kreatifin ve mesajın ilgi çekiciliğini, aramada başlık ve açıklamanın etkisini ölçer.",
      },
      {
        type: "p",
        text: "Düşük CTR genellikle mesaj-kitle uyumsuzluğunu gösterir. Yüksek CTR ise satış garantisi değildir; tıklayan çok, alan az ise sorun reklamda değil açılış sayfasındadır.",
      },
    ],
    related: ["cpc", "donusum-orani", "ai-overviews"],
  },
  {
    slug: "atif-modeli",
    term: "Atıf Modeli",
    full: "Attribution Model",
    category: "Performans Pazarlama",
    short:
      "Bir satışın kredisinin, yolculuktaki hangi temas noktasına ne oranda verileceğini belirleyen kural.",
    body: [
      {
        type: "p",
        text: "Müşteri genellikle tek dokunuşta satın almaz: reklamı görür, aramadan gelir, sonra doğrudan siteye girer. Krediyi hangi adıma verdiğiniz, hangi kanalın “işe yaradığını” belirler.",
      },
      {
        type: "ul",
        items: [
          "**Son tıklama:** Tüm krediyi son adıma verir. Markalı aramayı ve yeniden pazarlamayı şişirir.",
          "**İlk tıklama:** Krediyi keşfi sağlayan adıma verir. Kapanışı yapan kanalı görmez.",
          "**Veriye dayalı / doğrusal:** Krediyi adımlara dağıtır; gerçeğe daha yakındır, açıklaması daha zordur.",
        ],
      },
      {
        type: "p",
        text: "Panellerdeki çelişkili rakamların çoğu farklı atıf modellerinden doğar. Kanalları karşılaştırmadan önce hangi modelle baktığınızı netleştirin.",
      },
    ],
    related: ["utm", "ga4", "roas"],
  },
  {
    slug: "retargeting",
    term: "Retargeting",
    full: "Yeniden Pazarlama",
    category: "Performans Pazarlama",
    short:
      "Siteyi daha önce ziyaret etmiş kullanıcılara tekrar reklam gösterme yöntemi.",
    body: [
      {
        type: "p",
        text: "Ürüne bakıp almayan ya da sepeti terk eden kullanıcıya hatırlatma yapar. Kitle sizi zaten bildiği için dönüşüm oranı yüksek, maliyeti düşüktür.",
      },
      {
        type: "p",
        text: "Tam da bu yüzden yanıltıcıdır: raporda en iyi görünen kampanya genellikle budur, ama çoğu zaten gelecek olan satışı üstlenir. Yeni müşteri büyümesini yeniden pazarlama raporuna bakarak değerlendirmeyin.",
      },
    ],
    related: ["sepet-terk-orani", "cac", "atif-modeli"],
  },
  {
    slug: "lookalike-kitle",
    term: "Lookalike Kitle",
    full: "Benzer Hedef Kitle",
    category: "Performans Pazarlama",
    short:
      "Mevcut müşterilerinize davranış olarak benzeyen kişilerden platformun oluşturduğu yeni hedef kitle.",
    body: [
      {
        type: "p",
        text: "Kaynak listenin kalitesi sonucu belirler. Tüm site ziyaretçilerinden üretilen bir benzer kitle zayıf kalır; en değerli müşterilerinizden üretilen kitle çok daha iyi çalışır.",
      },
      {
        type: "p",
        text: "Kaynak listede en az birkaç yüz kişi olmalıdır. Dar oranlar (%1) benzerliği yüksek ama küçük kitle verir; geniş oranlar erişimi büyütür, isabeti düşürür.",
      },
    ],
    related: ["cac", "ogrenme-asamasi"],
  },
  {
    slug: "ogrenme-asamasi",
    term: "Öğrenme Aşaması",
    full: "Learning Phase",
    category: "Performans Pazarlama",
    short:
      "Reklam platformunun yeni bir kampanyada kime, ne zaman gösterim yapacağını öğrendiği başlangıç dönemi.",
    body: [
      {
        type: "p",
        text: "Bu dönemde performans dalgalıdır ve maliyetler oturmamıştır. Platform yeterli dönüşüm verisi topladığında aşama tamamlanır.",
      },
      {
        type: "p",
        text: "En pahalı hata sabırsızlıktır: bütçeyi, hedefi veya kreatifi değiştirmek öğrenmeyi sıfırlar ve süreç baştan başlar. Sürekli müdahale edilen bir kampanya öğrenme aşamasından hiç çıkamaz.",
      },
      {
        type: "p",
        text: "Bütçe artışlarını kademeli yapın; sert artışlar da aynı sıfırlanmayı tetikler.",
      },
    ],
    related: ["lookalike-kitle", "cpm"],
  },

  // ─────────────────────────────────────────────── SEO & İçerik
  {
    slug: "seo",
    term: "SEO",
    full: "Search Engine Optimization — Arama Motoru Optimizasyonu",
    category: "SEO & İçerik",
    short:
      "Bir sitenin arama motorlarında ücretsiz (organik) sonuçlarda görünürlüğünü artırma çalışmalarının tamamı.",
    body: [
      {
        type: "p",
        text: "Üç ayağı vardır: sitenin taranıp anlaşılmasını sağlayan **teknik** taraf, sorguya karşılık veren **içerik** tarafı ve güveni gösteren **otorite** tarafı.",
      },
      {
        type: "p",
        text: "Reklamdan farkı, durduğunuzda sonucun bir anda kaybolmamasıdır; karşılığında etkisi de haftalar-aylar içinde görülür. Bu yüzden kampanya değil, birikimli bir yatırım gibi yönetilmelidir.",
      },
      {
        type: "p",
        text: "Yapay zekâ özetlerinin yaygınlaşmasıyla hedef değişti: artık yalnızca sıralamak değil, cevabın içinde kaynak gösterilmek de amaç.",
      },
    ],
    related: ["arama-niyeti", "ai-overviews", "geo"],
  },
  {
    slug: "arama-niyeti",
    term: "Arama Niyeti",
    full: "Search Intent",
    category: "SEO & İçerik",
    short:
      "Kullanıcının bir sorguyu yazarken gerçekte ne yapmak istediği: öğrenmek, karşılaştırmak, satın almak veya bir siteye ulaşmak.",
    body: [
      {
        type: "p",
        text: "“Koşu ayakkabısı nasıl seçilir” öğrenme niyetidir; “erkek koşu ayakkabısı fiyat” satın alma niyetine yakındır. Aynı ürün, çok farklı içerik gerektirir.",
      },
      {
        type: "p",
        text: "Sıralamada en sık yapılan hata, satın alma niyetli bir sorguya blog yazısıyla, öğrenme niyetli bir sorguya kategori sayfasıyla girmektir. Niyet uyuşmadığında içerik ne kadar iyi olursa olsun sıralanmaz.",
      },
      {
        type: "p",
        text: "Yapay zekâ özetleri öğrenme niyetli sorgularda tıklamayı ciddi biçimde azalttı; satın alma niyetli sorgular ise büyük ölçüde etkilenmedi. E-ticaret için öncelik sırası bu yüzden ürün ve kategori sayfalarıdır.",
      },
    ],
    related: ["seo", "ai-overviews"],
  },
  {
    slug: "backlink",
    term: "Backlink",
    full: "Geri Bağlantı",
    category: "SEO & İçerik",
    short: "Başka bir sitenin sizin sitenize verdiği bağlantı.",
    body: [
      {
        type: "p",
        text: "Arama motorları için bir güven işaretidir: başka siteler size bağlantı veriyorsa, içerik referans gösterilmeye değer demektir.",
      },
      {
        type: "p",
        text: "Sayı değil kaynak önemlidir. Alanında güvenilir tek bir siteden gelen bağlantı, yüzlerce alakasız bağlantıdan değerlidir. Satın alınan toplu bağlantılar bugün fayda değil risk üretir.",
      },
    ],
    related: ["seo", "eeat"],
  },
  {
    slug: "canonical",
    term: "Canonical Etiketi",
    full: "rel=canonical",
    category: "SEO & İçerik",
    short:
      "Aynı ya da çok benzer içeriğe birden fazla adresten ulaşılabildiğinde, asıl adresin hangisi olduğunu arama motoruna bildiren etiket.",
    body: [
      {
        type: "p",
        text: "E-ticarette çok sık gereklidir: filtreleme, sıralama ve izleme parametreleri aynı listeyi onlarca farklı adreste üretir.",
      },
      {
        type: "p",
        text: "Canonical olmadığında arama motoru hangisini göstereceğine kendi karar verir ve sinyaller bölünür; hiçbir adres hak ettiği yerde sıralanmaz.",
      },
      {
        type: "p",
        text: "Çok dilli sitelerde hreflang ile birlikte kullanılır: canonical “bu sayfanın aslı bu”, hreflang “bunun diğer dildeki karşılığı şu” der.",
      },
    ],
    related: ["sitemap", "yapilandirilmis-veri", "seo"],
  },
  {
    slug: "yapilandirilmis-veri",
    term: "Yapılandırılmış Veri",
    full: "Structured Data / Schema.org",
    category: "SEO & İçerik",
    short:
      "Sayfadaki bilginin ne anlama geldiğini makinelere açıkça söyleyen, standart biçimde yazılmış işaretleme.",
    body: [
      {
        type: "p",
        text: "İnsan bir sayfada 249 TL yazısını fiyat olarak anlar; makine anlamak için işarete ihtiyaç duyar. Yapılandırılmış veri bu işareti verir: ürün, fiyat, stok, değerlendirme, yazar, tarih.",
      },
      {
        type: "p",
        text: "Karşılığında arama sonuçlarında yıldız, fiyat ve stok gibi zengin görünümler kazanılır; tıklama oranı belirgin şekilde artar.",
      },
      {
        type: "p",
        text: "Yapay zekâ motorları içeriği alıntılarken de bu işaretlemeye güvenir. Bugün en yüksek getirili teknik SEO işlerinden biridir.",
      },
    ],
    related: ["geo", "seo", "urun-feed"],
  },
  {
    slug: "core-web-vitals",
    term: "Core Web Vitals",
    full: "Temel Web Yaşamsalları",
    category: "SEO & İçerik",
    short:
      "Google'ın sayfa deneyimini ölçmek için kullandığı yükleme hızı, etkileşime yanıt ve görsel kararlılık metrikleri.",
    body: [
      {
        type: "p",
        text: "Üç ölçüden oluşur: en büyük içeriğin görünme süresi, kullanıcı etkileşimine verilen yanıt gecikmesi ve sayfa yerleşiminin beklenmedik kayması.",
      },
      {
        type: "p",
        text: "Sıralama etkisi doğrudan ve büyük değildir; asıl etkisi dönüşüm üzerindedir. Yavaş açılan ve yüklenirken zıplayan bir sayfa, ziyaretçiyi satın almadan kaybettirir.",
      },
      {
        type: "p",
        text: "E-ticarette en sık suçlu, optimize edilmemiş görseller ve gereğinden fazla üçüncü taraf kodudur.",
      },
    ],
    related: ["headless-commerce", "donusum-orani"],
  },
  {
    slug: "ai-overviews",
    term: "AI Overviews",
    full: "Google Yapay Zekâ Özetleri",
    category: "SEO & İçerik",
    short:
      "Google'ın arama sonuçlarının en üstünde gösterdiği, birden fazla kaynaktan derlenmiş yapay zekâ üretimi özet.",
    body: [
      {
        type: "p",
        text: "Kullanıcı cevabı sonuç sayfasında alır; bağlantıya tıklama ihtiyacı azalır. Ölçümler, özet çıktığında organik tıklama oranının belirgin biçimde düştüğünü gösteriyor.",
      },
      {
        type: "p",
        text: "Etki her sorguda eşit değildir: en çok bilgi amaçlı sorgular etkilenir, satın alma niyetli sorgular büyük ölçüde korunur.",
      },
      {
        type: "p",
        text: "Yeni hedef, özetin içinde kaynak olarak gösterilmektir. Bunun yolu net cevaplardan, yapılandırılmış veriden ve özgün araştırmadan geçiyor.",
      },
    ],
    related: ["geo", "arama-niyeti", "seo"],
  },
  {
    slug: "geo",
    term: "GEO",
    full: "Generative Engine Optimization",
    category: "SEO & İçerik",
    short:
      "İçeriğin ChatGPT, Gemini gibi üretken yapay zekâ motorları tarafından bulunması ve kaynak gösterilmesi için yapılan optimizasyon.",
    body: [
      {
        type: "p",
        text: "Klasik SEO sıralamayı hedefler, GEO **alıntılanmayı** hedefler. İkisi çelişmez; GEO, SEO'nun üzerine gelen bir katmandır.",
      },
      {
        type: "p",
        text: "Belirleyici unsurlar: makinenin okuyabildiği yapılandırılmış veri, sorunun doğrudan cevaplandığı net metin, başka yerde bulunmayan özgün veri ve tutarlı marka bilgisi.",
      },
      {
        type: "p",
        text: "Ölçümü de farklıdır. Oturum sayısına bakmak yanıltır; izlenmesi gereken atıf payı, markalı arama hacmi ve bu kaynaklardan gelen dönüşümdür.",
      },
    ],
    related: ["ai-overviews", "yapilandirilmis-veri", "seo"],
  },
  {
    slug: "eeat",
    term: "E-E-A-T",
    full: "Experience, Expertise, Authoritativeness, Trust",
    category: "SEO & İçerik",
    short:
      "Google'ın içerik kalitesini değerlendirirken baktığı deneyim, uzmanlık, otorite ve güven ölçütleri.",
    body: [
      {
        type: "p",
        text: "Doğrudan ölçülen tek bir puan değildir; kalite değerlendirmesinin çerçevesidir. Özellikle para ve sağlıkla ilgili konularda belirleyicidir.",
      },
      {
        type: "p",
        text: "Pratikte karşılığı basittir: yazının kim tarafından yazıldığı belli olsun, iddialar kaynaklansın, kurum bilgileri (adres, iletişim, ekip) açık olsun, deneyimden gelen ayrıntılar bulunsun.",
      },
      {
        type: "p",
        text: "Yapay zekâ üretimi ve birbirinin tekrarı içeriğin çoğaldığı ortamda, gerçek deneyim anlatan içerik giderek daha fazla ayrışıyor.",
      },
    ],
    related: ["backlink", "geo", "seo"],
  },
  {
    slug: "sitemap",
    term: "Site Haritası",
    full: "sitemap.xml",
    category: "SEO & İçerik",
    short:
      "Sitedeki sayfaların listesini arama motorlarına sunan, kök dizinde yayınlanan XML dosyası.",
    body: [
      {
        type: "p",
        text: "Arama motoruna “işte yayınladığım sayfalar ve son güncellenme tarihleri” der. Sayfalar arası bağlantı zayıfsa veya site büyükse keşfedilmeyi hızlandırır.",
      },
      {
        type: "p",
        text: "Sıralama garantisi vermez; yalnızca bulunmayı kolaylaştırır. İçinde yönlendirilen, silinmiş veya engellenmiş adresler bulunması güven kaybettirir.",
      },
      {
        type: "p",
        text: "İdeal olan elle bakım gerektirmemesidir: yeni içerik yayınlandığında listeye kendiliğinden girmelidir.",
      },
    ],
    related: ["canonical", "seo"],
  },

  // ────────────────────────────────────────── Analitik & Ölçüm
  {
    slug: "ga4",
    term: "GA4",
    full: "Google Analytics 4",
    category: "Analitik & Ölçüm",
    short: "Google'ın olay tabanlı çalışan güncel analitik platformu.",
    body: [
      {
        type: "p",
        text: "Önceki sürümden temel farkı, ölçümün oturum yerine **olay** üzerine kurulu olmasıdır: sayfa görüntüleme, ürün görüntüleme, sepete ekleme ve satın alma aynı yapıda birer olaydır.",
      },
      {
        type: "p",
        text: "E-ticarette değerini gösteren şey gelişmiş e-ticaret olaylarının doğru kurulmasıdır. Eksik kurulumda ürün ve kategori performansı görünmez, kararlar tahmine kalır.",
      },
    ],
    related: ["utm", "atif-modeli", "piksel"],
  },
  {
    slug: "conversions-api",
    term: "Conversions API",
    full: "CAPI — Sunucu Taraflı Dönüşüm Ölçümü",
    category: "Analitik & Ölçüm",
    short:
      "Dönüşüm olaylarının tarayıcı yerine doğrudan sunucudan reklam platformuna gönderilmesi.",
    body: [
      {
        type: "p",
        text: "Tarayıcı tabanlı piksel; reklam engelleyiciler, çerez kısıtları ve gizlilik ayarları nedeniyle olayların bir kısmını kaybeder. CAPI bu kaybı kapatır.",
      },
      {
        type: "p",
        text: "Etkisi yalnızca raporlama değildir: platform ne kadar çok dönüşüm görürse optimizasyonu o kadar isabetli olur. Eksik veriyle beslenen kampanya yanlış kişileri hedefler.",
      },
      {
        type: "p",
        text: "Piksel ile birlikte çalışır; olayların tekilleştirilmesi doğru kurulmazsa dönüşümler iki kez sayılır.",
      },
    ],
    related: ["piksel", "ga4", "ogrenme-asamasi"],
  },
  {
    slug: "piksel",
    term: "Piksel",
    full: "Tracking Pixel",
    category: "Analitik & Ölçüm",
    short:
      "Siteye yerleştirilen, ziyaretçi davranışını reklam platformuna bildiren küçük izleme kodu.",
    body: [
      {
        type: "p",
        text: "Sayfa görüntüleme, sepete ekleme ve satın alma gibi olayları platforma iletir. Yeniden pazarlama kitleleri ve dönüşüm optimizasyonu bu veriyle çalışır.",
      },
      {
        type: "p",
        text: "Yanlış kurulum en sık görülen ve en pahalı hatalardan biridir: satın alma olayı her sayfada tetiklenen bir mağazada tüm raporlar ve tüm optimizasyon bozulur.",
      },
    ],
    related: ["conversions-api", "ga4", "retargeting"],
  },
  {
    slug: "utm",
    term: "UTM Parametresi",
    full: "Urchin Tracking Module",
    category: "Analitik & Ölçüm",
    short:
      "Bağlantının sonuna eklenen, trafiğin hangi kanal ve kampanyadan geldiğini bildiren etiketler.",
    body: [
      {
        type: "p",
        text: "Kaynak, ortam ve kampanya adı gibi bilgileri taşır. Analitik aracı bu etiketleri okuyarak trafiği doğru kanala yazar.",
      },
      {
        type: "p",
        text: "Etiketlenmemiş kampanyalar “doğrudan trafik” olarak görünür ve hangi çalışmanın işe yaradığı ölçülemez hale gelir.",
      },
      {
        type: "p",
        text: "Küçük ama kritik kural: yazım standardı belirleyin. `Instagram` ile `instagram` iki ayrı kanal olarak raporlanır.",
      },
    ],
    related: ["ga4", "atif-modeli"],
  },
  {
    slug: "etkilesim-orani",
    term: "Etkileşim Oranı",
    full: "Engagement Rate",
    category: "Analitik & Ölçüm",
    short:
      "Ziyaretlerin yüzde kaçının anlamlı bir etkileşimle sonuçlandığını gösteren, hemen çıkma oranının yerini alan metrik.",
    body: [
      {
        type: "p",
        text: "Belirli bir süre sayfada kalan, birden fazla sayfa gezen veya bir dönüşüm olayı tetikleyen oturumlar etkileşimli sayılır.",
      },
      {
        type: "p",
        text: "Eski hemen çıkma oranından daha güvenilirdir: aradığını tek sayfada bulup ayrılan kullanıcı, eski ölçümde başarısızlık gibi görünüyordu.",
      },
    ],
    related: ["ga4", "donusum-orani"],
  },

  // ──────────────────────────────────── Operasyon & Pazaryeri
  {
    slug: "pazaryeri",
    term: "Pazaryeri",
    full: "Marketplace",
    category: "Operasyon & Pazaryeri",
    short:
      "Birden çok satıcının ürünlerini aynı platform üzerinden sattığı e-ticaret ortamı.",
    body: [
      {
        type: "p",
        text: "Hazır trafik ve güven sağlar; karşılığında komisyon, fiyat rekabeti ve müşteri verisine sınırlı erişim getirir.",
      },
      {
        type: "p",
        text: "Sağlıklı yaklaşım pazaryerini kendi mağazanızın alternatifi değil, tamamlayıcısı olarak kurgulamaktır. Yalnızca pazaryerine bağlı bir işletme, kendi müşteri ilişkisini kuramaz ve kural değişikliklerine karşı savunmasız kalır.",
      },
    ],
    related: ["buybox", "komisyon-orani", "urun-feed"],
  },
  {
    slug: "buybox",
    term: "Buybox",
    full: "Satın Alma Kutusu",
    category: "Operasyon & Pazaryeri",
    short:
      "Aynı ürünü satan birden fazla satıcı arasından, sepete ekleme butonunun varsayılan olarak atandığı satıcı konumu.",
    body: [
      {
        type: "p",
        text: "Siparişlerin büyük çoğunluğu bu konumu kazanan satıcıya gider; diğer satıcılar ancak listeyi ayrıca açan kullanıcılara ulaşır.",
      },
      {
        type: "p",
        text: "Belirleyiciler yalnızca fiyat değildir: stok sürekliliği, teslimat hızı, iptal ve iade oranı ile satıcı puanı birlikte değerlendirilir. Sadece fiyat kırarak yürütülen rekabet kârı eritir, konumu garanti etmez.",
      },
    ],
    related: ["pazaryeri", "komisyon-orani", "fulfillment"],
  },
  {
    slug: "fulfillment",
    term: "Fulfillment",
    full: "Sipariş Karşılama",
    category: "Operasyon & Pazaryeri",
    short:
      "Siparişin alınmasından paketlenip müşteriye teslim edilmesine kadar geçen operasyonun tamamı.",
    body: [
      {
        type: "p",
        text: "Stoklama, toplama, paketleme, kargolama ve iade süreçlerini kapsar. Kendi deponuzda ya da hizmet aldığınız bir operasyon merkezinde yürütülebilir.",
      },
      {
        type: "p",
        text: "Pazarlamanın görünmeyen ortağıdır: teslimat süresi ve paket deneyimi, tekrar satın alma oranını doğrudan etkiler. Reklamla kazanılan müşteri, kötü teslimatla kalıcı olarak kaybedilir.",
      },
    ],
    related: ["stok-devir-hizi", "kargo-entegrasyonu", "buybox"],
  },
  {
    slug: "komisyon-orani",
    term: "Komisyon Oranı",
    full: "Marketplace Commission",
    category: "Operasyon & Pazaryeri",
    short: "Pazaryerinin, satılan her ürün üzerinden aldığı yüzdesel kesinti.",
    body: [
      {
        type: "p",
        text: "Kategoriye göre değişir ve kâr marjını doğrudan belirler. Komisyonun yanında kargo, hizmet bedeli ve kampanya katılım payları da hesaba katılmalıdır.",
      },
      {
        type: "p",
        text: "Pazaryeri fiyatlandırması bu yüzden kendi sitenizdeki fiyatlandırmadan farklı kurgulanır. Aynı fiyatı iki kanalda kullanmak, pazaryerinde farkında olmadan zararına satmaya yol açabilir.",
      },
    ],
    related: ["pazaryeri", "buybox", "roas"],
  },
  {
    slug: "kargo-entegrasyonu",
    term: "Kargo Entegrasyonu",
    full: "Shipping Integration",
    category: "Operasyon & Pazaryeri",
    short:
      "E-ticaret altyapısının kargo firmalarıyla otomatik olarak konuşmasını sağlayan bağlantı.",
    body: [
      {
        type: "p",
        text: "Sipariş oluştuğunda gönderi kaydını açar, takip numarasını müşteriye iletir ve teslim durumunu sisteme geri yazar.",
      },
      {
        type: "p",
        text: "Elle yürütülen süreçlerde hata ve gecikme kaçınılmazdır; sipariş sayısı arttıkça bu maliyet hızla büyür. “Kargom nerede” sorularının müşteri hizmetleri yükünü en çok azaltan iyileştirmelerden biridir.",
      },
    ],
    related: ["fulfillment", "iade-orani"],
  },
];

export function getTerm(slug: string): GlossaryTerm | null {
  return glossary.find((t) => t.slug === slug) ?? null;
}

/** Terimleri kategoriye göre, kategori sırası korunarak gruplar. */
export function groupByCategory(): {
  category: GlossaryCategory;
  terms: GlossaryTerm[];
}[] {
  return GLOSSARY_CATEGORIES.map((category) => ({
    category,
    terms: glossary
      .filter((t) => t.category === category)
      .sort((a, b) => a.term.localeCompare(b.term, "tr")),
  })).filter((group) => group.terms.length > 0);
}
