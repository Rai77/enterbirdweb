/**
 * Blog yazılarının gövdeleri.
 *
 * Neden burada: yazı gövdesi panelde `content` alanında tutulabiliyor ama o
 * alan bugüne kadar hiç doldurulmadı ve panele dışarıdan yazı girilemiyor.
 * Buradaki metin, panelde içerik yokken devreye giren gövdedir — panele bir
 * şey yazıldığı anda o kazanır.
 *
 * Metinler özgündür. Sayısal iddiaların her biri yazının sonundaki kaynaklara
 * dayanır; ajansın kendi müşteri verisi uydurulmamıştır.
 */
export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string };

export type ArticleSource = { label: string; url: string };

export type Article = {
  blocks: ArticleBlock[];
  sources?: ArticleSource[];
};

/** `**kalın**` işaretlemesi destekleniyor; gerisi düz metin. */
export const blogArticles: Record<string, Record<string, Article>> = {
  "ai-satis-agentlari-shopify": {
    tr: {
      blocks: [
        {
          type: "p",
          text: "Bir yıl önce “yapay zekâ mağazanıza satış yapacak” cümlesi bir pazarlama sloganıydı. Bugün ölçülebilir bir kanal. Shopify'ın yayınladığı verilere göre ChatGPT, Perplexity, Gemini, Copilot ve benzeri sohbet motorlarından Shopify mağazalarına gelen oturumlar yıllık bazda **8 kattan fazla**, bu trafikten gelen siparişler ise **yaklaşık 13 kat** arttı. Bu, e-ticarette şu an en hızlı büyüyen kazanım kanalı.",
        },
        {
          type: "p",
          text: "Ama asıl dikkat çeken büyüme hızı değil, gelen ziyaretçinin niteliği.",
        },
        { type: "h2", text: "AI'dan gelen ziyaretçi neden farklı" },
        {
          type: "p",
          text: "Klasik organik aramadan gelen biri çoğu zaman hâlâ araştırma aşamasındadır. Sohbet motorundan gelen ise soruyu zaten sormuş, cevabı almış ve karar aşamasına gelmiş olur. Rakamlar bunu doğruluyor:",
        },
        {
          type: "ul",
          items: [
            "AI kaynaklı ziyaretçiler ürün sayfalarında organik aramaya göre **yaklaşık %50 daha yüksek** oranda dönüşüyor.",
            "25 satıcı kategorisinin 23'ünde AI kaynaklı dönüşüm organik aramayı geçiyor — ortalama fark %56.",
            "AI kaynaklı oturumların yarısından fazlası doğrudan **ürün sayfasında** başlıyor. Organik aramada bu oran %20.",
          ],
        },
        {
          type: "p",
          text: "Son madde stratejik olarak en önemlisi. Ziyaretçi ana sayfanıza değil, doğrudan ürüne düşüyor. Yani o ürün sayfasının tek başına ikna edebilmesi gerekiyor: eksiksiz açıklama, net kargo ve iade bilgisi, gerçek görseller, stok durumu. Ana sayfanızın ne kadar güzel olduğu bu ziyaretçi için önemsiz.",
        },
        { type: "h2", text: "İki ayrı şeyi karıştırmayın" },
        {
          type: "p",
          text: "“AI satış agent'ı” başlığı altında birbirinden çok farklı iki şey konuşuluyor ve karıştırılınca yanlış yatırım yapılıyor:",
        },
        {
          type: "ol",
          items: [
            "**Mağaza içi asistan:** Sitenizdeki sohbet katmanı. Kataloğu bilir, beden/uyumluluk sorusunu cevaplar, sepete yönlendirir, destek yükünü azaltır.",
            "**Dışarıdaki sohbet motorlarında görünürlük:** ChatGPT veya Gemini birine ürün önerirken sizin ürününüzü önermesi. Bu bir sohbet kutusu değil, bir veri ve görünürlük meselesi.",
          ],
        },
        {
          type: "p",
          text: "Birincisi mevcut trafiğinizden daha fazla satış çıkarır. İkincisi size yeni trafik getirir. Çoğu marka birinciyi kurup ikincisini beklediği için hayal kırıklığına uğruyor.",
        },
        { type: "h2", text: "Ne kadar fark yaratıyor" },
        {
          type: "p",
          text: "Sektörde paylaşılan sonuçlar mağaza içi asistanlar için **%8–12 dönüşüm artışı**, **%25 civarı sepet kurtarma** ve **destek taleplerinde %80'e varan azalma** aralığında toplanıyor. Bu sayıları bir taahhüt değil, bir üst sınır olarak okumak gerekir: kataloğu dağınık, ürün açıklamaları eksik bir mağazada asistan da eksik cevap verir.",
        },
        {
          type: "quote",
          text: "Yapay zekâ asistanı, kataloğunuzun kalitesini büyütür. Kötü bir kataloğu düzeltmez.",
        },
        { type: "h2", text: "Shopify tarafında işin kolaylaşan kısmı" },
        {
          type: "p",
          text: "Shopify artık ChatGPT, Microsoft Copilot, Google AI Mode ve Gemini'ye açılmayı tek bir yerden yönetilebilir hale getirdi. Ayrı entegrasyon yazmaya, her motor için ayrı ürün akışı hazırlamaya gerek kalmıyor. Bu, teknik eşiği ciddi biçimde düşürüyor — ama görünür olmak ile önerilmek aynı şey değil.",
        },
        { type: "h2", text: "Kuruluma başlamadan önce yapılacaklar" },
        {
          type: "p",
          text: "Sohbet motorlarının ürününüzü doğru anlatabilmesi için önce verinizin doğru olması gerekiyor. Pratikte şu sırayı öneriyoruz:",
        },
        {
          type: "ol",
          items: [
            "**Ürün açıklamalarını tamamlayın.** Malzeme, ölçü, kullanım, uyumluluk. Bir insanın soracağı her soru metinde geçmeli — çünkü modele verilen bilgi bu.",
            "**Yapılandırılmış veri ekleyin.** Ürün, fiyat, stok ve değerlendirme işaretlemesi olmadan motor ürününüzü güvenle öneremez.",
            "**Kargo ve iade koşullarını tek bir net sayfada toplayın.** Sohbet motorları bu bilgiyi arar; bulamazsa öneri listesinde geri sıralara düşersiniz.",
            "**Ölçümü baştan kurun.** AI kaynaklı trafiği ayrı bir kanal olarak etiketlemezseniz üç ay sonra işe yarayıp yaramadığını tartışırsınız.",
            "**Sonra asistanı kurun.** Sırayı ters çevirmek en sık yapılan hata.",
          ],
        },
        { type: "h2", text: "Kimin için henüz erken" },
        {
          type: "p",
          text: "Ürün sayısı çok az olan, tek bir ürüne odaklı ya da satın alma kararı tamamen görsel olan mağazalarda asistanın katkısı sınırlı kalıyor. Buna karşılık geniş kataloglu, bedene/ölçüye/uyumluluğa dair soru alan mağazalarda etkisi hemen görülüyor. Müşteri hizmetlerine en çok gelen 20 soruyu listeleyin: cevapların çoğu üründe yazılı olmayan bilgiyse, asistan sizin için hazır demektir.",
        },
      ],
      sources: [
        {
          label: "Shopify — AI-referred shoppers convert better and spend more",
          url: "https://www.shopify.com/enterprise/blog/ai-search-insights",
        },
        {
          label: "Shopify — Agentic Commerce on Shopify: How It Works",
          url: "https://www.shopify.com/blog/how-agentic-commerce-works",
        },
        {
          label: "Shopify — Best AI Agents for Sales",
          url: "https://www.shopify.com/blog/ai-agents-for-sales",
        },
      ],
    },
    en: {
      blocks: [
        {
          type: "p",
          text: "A year ago, “AI will sell for your store” was a marketing slogan. Today it is a measurable channel. According to data published by Shopify, sessions arriving at Shopify stores from ChatGPT, Perplexity, Gemini, Copilot and similar chat engines grew **more than 8x** year over year, and orders from that traffic grew **roughly 13x**. It is currently the fastest-growing acquisition channel in e-commerce.",
        },
        {
          type: "p",
          text: "But the growth rate is not the most interesting part. The quality of the visitor is.",
        },
        { type: "h2", text: "Why AI-referred visitors are different" },
        {
          type: "p",
          text: "Someone arriving from classic organic search is often still researching. Someone arriving from a chat engine has already asked the question, received an answer and reached the decision stage. The numbers back this up:",
        },
        {
          type: "ul",
          items: [
            "AI-referred visitors convert on product pages at **about 50% higher** rates than organic search visitors.",
            "In 23 of 25 merchant categories, AI-referred conversion beats organic search, by 56% on average.",
            "More than half of AI-referred sessions start directly on a **product page**, compared with 20% for organic search.",
          ],
        },
        {
          type: "p",
          text: "That last point matters most strategically. The visitor lands on the product, not on your home page. So the product page has to persuade on its own: a complete description, clear shipping and returns information, real images, stock status. How beautiful your home page is makes no difference to this visitor.",
        },
        { type: "h2", text: "Don't confuse two different things" },
        {
          type: "p",
          text: "Two very different things are discussed under the label “AI sales agent”, and mixing them up leads to the wrong investment:",
        },
        {
          type: "ol",
          items: [
            "**On-site assistant:** The chat layer on your own site. It knows the catalog, answers size and compatibility questions, guides shoppers to the cart and reduces support load.",
            "**Visibility in external chat engines:** ChatGPT or Gemini recommending your product when someone asks for a recommendation. This is not a chat box; it is a data and visibility problem.",
          ],
        },
        {
          type: "p",
          text: "The first gets more sales out of the traffic you already have. The second brings you new traffic. Most brands are disappointed because they set up the first and expect the second.",
        },
        { type: "h2", text: "How much difference it makes" },
        {
          type: "p",
          text: "Results shared across the industry for on-site assistants cluster around **an 8–12% lift in conversion**, **roughly 25% cart recovery** and **up to 80% fewer support tickets**. Read these numbers as a ceiling, not a promise: in a store with a messy catalog and incomplete product descriptions, the assistant gives incomplete answers too.",
        },
        {
          type: "quote",
          text: "An AI assistant amplifies the quality of your catalog. It does not fix a bad one.",
        },
        { type: "h2", text: "What Shopify has made easier" },
        {
          type: "p",
          text: "Shopify now lets you manage exposure to ChatGPT, Microsoft Copilot, Google AI Mode and Gemini from a single place. There is no need to build separate integrations or prepare a separate product feed for each engine. That lowers the technical bar considerably, but being visible is not the same as being recommended.",
        },
        { type: "h2", text: "What to do before setting anything up" },
        {
          type: "p",
          text: "For chat engines to describe your product correctly, your data has to be right first. In practice we recommend this order:",
        },
        {
          type: "ol",
          items: [
            "**Complete your product descriptions.** Material, dimensions, use, compatibility. Every question a person would ask should be answered in the text, because that is the information the model receives.",
            "**Add structured data.** Without product, price, stock and review markup, an engine cannot recommend your product with confidence.",
            "**Put shipping and returns terms on one clear page.** Chat engines look for this information; if they can't find it, you drop down the recommendation list.",
            "**Set up measurement from day one.** If you don't tag AI-referred traffic as its own channel, three months later you'll be arguing about whether it worked.",
            "**Then set up the assistant.** Reversing this order is the most common mistake.",
          ],
        },
        { type: "h2", text: "Who it is still too early for" },
        {
          type: "p",
          text: "In stores with very few products, a single hero product, or a purchase decision that is purely visual, the assistant's contribution stays limited. In stores with a broad catalog that get questions about size, fit or compatibility, the impact shows up immediately. List the 20 questions your customer service hears most often: if most of the answers are information that isn't written on the product page, the assistant is ready for you.",
        },
      ],
      sources: [
        {
          label: "Shopify — AI-referred shoppers convert better and spend more",
          url: "https://www.shopify.com/enterprise/blog/ai-search-insights",
        },
        {
          label: "Shopify — Agentic Commerce on Shopify: How It Works",
          url: "https://www.shopify.com/blog/how-agentic-commerce-works",
        },
        {
          label: "Shopify — Best AI Agents for Sales",
          url: "https://www.shopify.com/blog/ai-agents-for-sales",
        },
      ],
    },
  },

  "shopify-horizon-tema-degerlendirme": {
    tr: {
      blocks: [
        {
          type: "p",
          text: "Shopify'ın yeni ücretsiz teması Horizon, Dawn'dan bu yana temel mimaride yapılan en büyük değişiklik. Heyecan yaratması normal — ama tema seçimi geri dönüşü pahalı bir karar. Bu yazıda pazarlama metnini değil, üç haftalık kullanımda öne çıkan gerçek artı ve eksileri anlatıyoruz.",
        },
        { type: "h2", text: "Teknik olarak ne değişti" },
        {
          type: "p",
          text: "Horizon, Online Store 2.0 çerçevesinin üzerine kurulu değil; **Web Components** ile yazılmış yeni bir mimari. Pratikte üç şey anlamına geliyor:",
        },
        {
          type: "ul",
          items: [
            "**Blok tabanlı düzen:** Sayfa parçaları çok daha serbest taşınıp yeniden düzenlenebiliyor.",
            "**Global bloklar:** Bir bloğu bir kez düzenleyip site genelinde güncelleyebiliyorsunuz. Çok sayfalı mağazalarda ciddi zaman kazancı.",
            "**Shopify Magic ile bölüm üretimi:** Yapay zekâ ile hazır bölüm oluşturma tema içine gömülü geliyor.",
          ],
        },
        { type: "h2", text: "Hız: masaüstünde iyi, mobilde henüz değil" },
        {
          type: "p",
          text: "Ölçümler masaüstünde güçlü: **94 performans skoru**, ilk içerik boyaması 0,4 saniye, en büyük içerik boyaması 1,5 saniye. Mobilde ise Horizon şu an Dawn'ın gerisinde — aradaki fark kapanıyor ama bugün itibarıyla mevcut.",
        },
        {
          type: "p",
          text: "Türkiye'de e-ticaret trafiğinin ağırlıklı olarak mobilden geldiğini düşünürsek bu, göz ardı edilecek bir detay değil. Ayrıca Horizon görsel ağırlıklı bir tema: sıkıştırılmamış görseller ve video ile doldurulduğunda performans hızla düşüyor.",
        },
        { type: "h2", text: "Kime yarıyor, kime yaramıyor" },
        {
          type: "p",
          text: "Saha gözlemi net bir ayrım gösteriyor:",
        },
        {
          type: "ul",
          items: [
            "**Uygun:** Moda ve yaşam tarzı markaları, **200 ürünün altında** katalog, marka hikâyesinin ve görselin ürün bulmaktan daha önemli olduğu mağazalar.",
            "**Uygun değil:** **500 ürünün üzerinde** katalog. Bu ölçekte alışveriş akışı hantallaşıyor, müşteri aradığını bulmakta zorlanıyor.",
          ],
        },
        {
          type: "p",
          text: "Yani Horizon bir vitrin teması. Katalog derinliği ve filtreleme sizin için kritikse, görsel cazibesine kapılmayın.",
        },
        { type: "h2", text: "Kullanıcı yorumları ne diyor" },
        {
          type: "p",
          text: "Temmuz 2026 itibarıyla Horizon, 190 değerlendirmede yalnızca **%35 olumlu** puana sahip — köklü ücretli temaların belirgin şekilde altında. Buna rağmen tespit edilen Shopify mağazalarının yaklaşık **%1,8'inde** kullanılıyor ve en hızlı büyüyen ücretsiz tema konumunda.",
        },
        {
          type: "p",
          text: "Bu çelişki aslında açıklayıcı: tema ücretsiz ve yeni olduğu için hızla deneniyor, ama yeni mimariye alışkın olmayan kullanıcılar zorlanıyor. Düşük puanların önemli kısmı temanın kalitesinden değil, öğrenme eğrisinden geliyor.",
        },
        { type: "h2", text: "Geçmeli mi?" },
        {
          type: "p",
          text: "Karar için üç soru yeterli:",
        },
        {
          type: "ol",
          items: [
            "**Mevcut temanız bir sorun çıkarıyor mu?** Çıkarmıyorsa, çalışan bir mağazayı yeni bir mimariye taşımanın maliyeti kazancından büyük olur.",
            "**Kataloğunuz 200 ürünün altında mı?** Değilse Horizon'u şimdilik geçin.",
            "**Trafiğinizin ne kadarı mobil?** Ağırlık mobildeyse, mobil performans farkı kapanana kadar beklemek mantıklı.",
          ],
        },
        {
          type: "p",
          text: "Yeni bir mağaza kuruyorsanız ve katalog küçükse Horizon güçlü bir başlangıç. Ayakta duran, ciro üreten bir mağazayı sırf yeni diye taşımak ise bugün için erken.",
        },
      ],
      sources: [
        {
          label: "PageFly — Shopify Horizon Theme Review (2026)",
          url: "https://pagefly.io/blogs/shopify/shopify-horizon-theme",
        },
        {
          label: "Craftshift — Shopify Horizon vs Dawn (2026)",
          url: "https://craftshift.com/shopify-horizon-vs-dawn-2026/",
        },
      ],
    },
    en: {
      blocks: [
        {
          type: "p",
          text: "Horizon, Shopify's new free theme, is the biggest change to the underlying architecture since Dawn. The excitement is understandable, but choosing a theme is an expensive decision to reverse. This post skips the marketing copy and covers the real pros and cons that stood out after three weeks of use.",
        },
        { type: "h2", text: "What changed technically" },
        {
          type: "p",
          text: "Horizon is not built on the Online Store 2.0 framework; it is a new architecture written with **Web Components**. In practice that means three things:",
        },
        {
          type: "ul",
          items: [
            "**Block-based layout:** Page sections can be moved and rearranged much more freely.",
            "**Global blocks:** Edit a block once and update it across the whole site. A real time saver for stores with many pages.",
            "**Section generation with Shopify Magic:** Creating ready-made sections with AI is built into the theme.",
          ],
        },
        { type: "h2", text: "Speed: good on desktop, not yet on mobile" },
        {
          type: "p",
          text: "Desktop measurements are strong: **a performance score of 94**, first contentful paint at 0.4 seconds and largest contentful paint at 1.5 seconds. On mobile, Horizon is currently behind Dawn. The gap is closing, but as of today it is still there.",
        },
        {
          type: "p",
          text: "Given that most e-commerce traffic in Turkey comes from mobile, this is not a detail to ignore. Horizon is also an image-heavy theme: once it is filled with uncompressed images and video, performance drops quickly.",
        },
        { type: "h2", text: "Who it suits and who it doesn't" },
        {
          type: "p",
          text: "Field observation shows a clear split:",
        },
        {
          type: "ul",
          items: [
            "**A good fit:** Fashion and lifestyle brands, catalogs **under 200 products**, and stores where the brand story and visuals matter more than product discovery.",
            "**Not a good fit:** Catalogs **over 500 products**. At that scale the shopping flow gets clunky and customers struggle to find what they are looking for.",
          ],
        },
        {
          type: "p",
          text: "In other words, Horizon is a showcase theme. If catalog depth and filtering are critical for you, don't be swayed by its looks.",
        },
        { type: "h2", text: "What user reviews say" },
        {
          type: "p",
          text: "As of July 2026, Horizon has only **35% positive** ratings across 190 reviews, well below established paid themes. Even so, it runs on about **1.8%** of detected Shopify stores and is the fastest-growing free theme.",
        },
        {
          type: "p",
          text: "The contradiction is telling: because the theme is free and new, people try it quickly, but users who aren't used to the new architecture struggle. A large share of the low ratings comes from the learning curve, not from the theme's quality.",
        },
        { type: "h2", text: "Should you switch?" },
        {
          type: "p",
          text: "Three questions are enough to decide:",
        },
        {
          type: "ol",
          items: [
            "**Is your current theme causing a problem?** If not, the cost of moving a working store to a new architecture outweighs the gain.",
            "**Is your catalog under 200 products?** If not, skip Horizon for now.",
            "**How much of your traffic is mobile?** If most of it is, it makes sense to wait until the mobile performance gap closes.",
          ],
        },
        {
          type: "p",
          text: "If you are launching a new store with a small catalog, Horizon is a strong start. Moving an established, revenue-generating store just because the theme is new is premature today.",
        },
      ],
      sources: [
        {
          label: "PageFly — Shopify Horizon Theme Review (2026)",
          url: "https://pagefly.io/blogs/shopify/shopify-horizon-theme",
        },
        {
          label: "Craftshift — Shopify Horizon vs Dawn (2026)",
          url: "https://craftshift.com/shopify-horizon-vs-dawn-2026/",
        },
      ],
    },
  },

  "meta-advantage-plus-rehber": {
    tr: {
      blocks: [
        {
          type: "p",
          text: "Meta'nın Advantage+ kampanyaları (yeni adıyla Advantage+ Satış Kampanyaları) kontrolü büyük ölçüde algoritmaya bırakıyor. Doğru koşullarda ciddi verim üretiyor, yanlış koşullarda bütçeyi sessizce eritiyor. Fark, kampanyanın kendisinde değil; ne zaman açtığınızda.",
        },
        { type: "h2", text: "Advantage+ ne zaman doğru seçim" },
        {
          type: "p",
          text: "Advantage+ öğrenmek için veri ister. Aşağıdaki koşulların hepsi sağlanıyorsa güçlü aday:",
        },
        {
          type: "ul",
          items: [
            "Amacınız doğrudan **online satış** (potansiyel müşteri toplama veya bilinirlik değil).",
            "Çalışan bir piksel ve **Conversions API** kurulumunuz var.",
            "Haftada **50'nin üzerinde satın alma** verisi üretiyorsunuz.",
            "Ürün kataloğunuz Meta'ya bağlı.",
            "Ürün fiyatlarınız çoğunlukla **200 doların altında** ve karar süreci kısa.",
          ],
        },
        { type: "h2", text: "Ne zaman manuel kampanyada kalın" },
        {
          type: "ul",
          items: [
            "**Yeni reklam hesabı**, sıfır dönüşüm verisi. Algoritmanın öğreneceği bir şey yok.",
            "**Yüksek fiyatlı ürünler** (500 dolar üzeri) ve uzun satın alma döngüsü.",
            "Ürün değil **hizmet** satan B2B işler.",
            "Belirli kitleleri **dışlamanız** gereken durumlar — Advantage+'ın geniş hedeflemesi buna izin vermez.",
            "Satın alma dışındaki hedefler: form doldurma, uygulama indirme, bilinirlik.",
          ],
        },
        { type: "h2", text: "Bütçe: en sık yapılan hata" },
        {
          type: "p",
          text: "Advantage+'ın öğrenme aşamasından çıkabilmesi için haftalık dönüşüm eşiğini geçmesi gerekir. Pratikte önerilen taban **günlük 100 dolar**; bunun altında algoritma yeterli veri toplayamıyor. Küçük ve orta ölçekli e-ticaret için makul başlangıç **günlük 150–300 dolar**, oturmuş markalar için **500–2.000 dolar ve üzeri**.",
        },
        {
          type: "p",
          text: "Yaygın hata, bütçeyi çok sayıda kampanyaya bölmek. Advantage+ mantığı bunun tam tersi: bütçeyi tek yerde toplayın, dağıtımı algoritma yapsın.",
        },
        {
          type: "quote",
          text: "Advantage+ az bütçeyle denenecek bir şey değil. Yeterince beslenmeyen kampanya öğrenemeden söner.",
        },
        { type: "h2", text: "Kreatif: asıl kaldıraç burada" },
        {
          type: "p",
          text: "Hedeflemeyi algoritmaya devrettiğinizde geriye kontrol edebildiğiniz tek büyük değişken kalır: kreatif. Uygulamada işe yarayan yaklaşım:",
        },
        {
          type: "ol",
          items: [
            "**En az 10 farklı kreatif** yükleyin — görsel, video ve metin çeşitliliği birlikte.",
            "Formatları karıştırın: ürün çekimi, kullanım videosu, müşteri yorumu, karşılaştırma.",
            "**Düzenli yenileyin.** Reklam yorgunluğu Advantage+'ta daha hızlı geliyor, çünkü algoritma kazanan kreatifi çok çabuk tüketiyor.",
            "Bütçeyi ani değil kademeli artırın: birkaç günde bir **%10–20**. Sert artışlar öğrenmeyi sıfırlıyor.",
          ],
        },
        { type: "h2", text: "Mevcut müşteri sınırını mutlaka kullanın" },
        {
          type: "p",
          text: "Advantage+ ölçülebilir sonuç üretmek için en kolay yolu seçer: zaten sizden alışveriş yapmış kişilere yeniden satmak. Raporda ROAS güzel görünür ama yeni müşteri kazanmıyorsunuzdur.",
        },
        {
          type: "p",
          text: "Kampanya ayarlarındaki **mevcut müşteri oranı sınırı** tam olarak bunun içindir. Yeni müşteri kazanımı hedefliyorsanız bu sınırı belirlemeden kampanyayı açmayın — yoksa üç ay sonra ciro artmadan reklam maliyetinin arttığını görürsünüz.",
        },
        { type: "h2", text: "Özetle" },
        {
          type: "p",
          text: "Advantage+ bir “aç ve unut” aracı değil, veri ve kreatif gerektiren bir motor. Haftada 50 satışın altındaysanız, kataloğunuz bağlı değilse veya bütçeniz eşiği geçmiyorsa manuel kampanyada kalmak daha kârlı. Koşullar sağlanıyorsa da işin ağırlığı hedeflemeden kreatife kayar — ekip zamanınızı oraya ayırın.",
        },
      ],
      sources: [
        {
          label:
            "Birch — Understanding Meta's Advantage+ Sales Campaigns (2026)",
          url: "https://bir.ch/blog/advantage-plus-sales-campaigns-guide",
        },
        {
          label: "Skale Strategy — Advantage+ Shopping Campaigns in 2026",
          url: "https://www.skalestrategy.com/blog/meta-advantage-plus-shopping-campaigns-2026",
        },
      ],
    },
    en: {
      blocks: [
        {
          type: "p",
          text: "Meta's Advantage+ campaigns (now called Advantage+ Sales Campaigns) hand most of the control to the algorithm. Under the right conditions they deliver real efficiency; under the wrong ones they quietly burn through the budget. The difference lies not in the campaign itself but in when you turn it on.",
        },
        { type: "h2", text: "When Advantage+ is the right choice" },
        {
          type: "p",
          text: "Advantage+ needs data to learn. It is a strong candidate if all of the following are true:",
        },
        {
          type: "ul",
          items: [
            "Your goal is direct **online sales** (not lead generation or awareness).",
            "You have a working pixel and a **Conversions API** setup.",
            "You generate **more than 50 purchases a week**.",
            "Your product catalog is connected to Meta.",
            "Your products are mostly priced **under $200** and the decision cycle is short.",
          ],
        },
        { type: "h2", text: "When to stay with manual campaigns" },
        {
          type: "ul",
          items: [
            "A **new ad account** with zero conversion data. The algorithm has nothing to learn from.",
            "**High-priced products** (over $500) with a long purchase cycle.",
            "B2B businesses selling **services** rather than products.",
            "Cases where you need to **exclude** specific audiences; Advantage+'s broad targeting doesn't allow it.",
            "Goals other than purchases: form fills, app installs, awareness.",
          ],
        },
        { type: "h2", text: "Budget: the most common mistake" },
        {
          type: "p",
          text: "To exit the learning phase, Advantage+ has to clear a weekly conversion threshold. In practice the recommended floor is **$100 a day**; below that, the algorithm can't collect enough data. A reasonable starting point for small and mid-sized e-commerce is **$150–300 a day**, and **$500–2,000 a day or more** for established brands.",
        },
        {
          type: "p",
          text: "The common mistake is splitting the budget across many campaigns. Advantage+ works the opposite way: put the budget in one place and let the algorithm distribute it.",
        },
        {
          type: "quote",
          text: "Advantage+ isn't something to test on a small budget. A campaign that isn't fed enough dies before it learns.",
        },
        { type: "h2", text: "Creative: the real lever" },
        {
          type: "p",
          text: "Once targeting is handed to the algorithm, there is only one big variable left that you control: creative. The approach that works in practice:",
        },
        {
          type: "ol",
          items: [
            "Upload **at least 10 different creatives**, with variety across images, video and copy.",
            "Mix formats: product shots, how-to videos, customer reviews, comparisons.",
            "**Refresh regularly.** Ad fatigue arrives faster in Advantage+ because the algorithm burns through the winning creative very quickly.",
            "Increase the budget gradually, not abruptly: **10–20%** every few days. Sharp increases reset the learning.",
          ],
        },
        { type: "h2", text: "Always use the existing-customer cap" },
        {
          type: "p",
          text: "Advantage+ picks the easiest route to measurable results: selling again to people who have already bought from you. ROAS looks great in the report, but you aren't winning new customers.",
        },
        {
          type: "p",
          text: "The **existing customer budget cap** in the campaign settings exists for exactly this reason. If new customer acquisition is the goal, don't launch the campaign without setting that cap, or three months later you'll see ad costs rise while revenue stays flat.",
        },
        { type: "h2", text: "In short" },
        {
          type: "p",
          text: "Advantage+ is not a set-and-forget tool; it is an engine that needs data and creative. If you are under 50 sales a week, your catalog isn't connected, or your budget doesn't clear the threshold, manual campaigns are more profitable. If the conditions are met, the weight of the work shifts from targeting to creative, so put your team's time there.",
        },
      ],
      sources: [
        {
          label:
            "Birch — Understanding Meta's Advantage+ Sales Campaigns (2026)",
          url: "https://bir.ch/blog/advantage-plus-sales-campaigns-guide",
        },
        {
          label: "Skale Strategy — Advantage+ Shopping Campaigns in 2026",
          url: "https://www.skalestrategy.com/blog/meta-advantage-plus-shopping-campaigns-2026",
        },
      ],
    },
  },

  "google-ai-overviews-seo": {
    tr: {
      blocks: [
        {
          type: "p",
          text: "Google arama sonuçlarının üstüne yapay zekâ özetleri koymaya başladığından beri SEO tartışması ikiye bölündü: “SEO öldü” diyenler ve hiçbir şeyin değişmediğini savunanlar. İkisi de yanlış. Veriler daha net bir tablo çiziyor.",
        },
        { type: "h2", text: "Ne kadar yaygın, ne kadar zarar veriyor" },
        {
          type: "ul",
          items: [
            "Ocak 2026 itibarıyla AI Overviews, ABD aramalarının **%25,8'inde** görünüyor. En yüksek oran bilgi amaçlı sorgularda.",
            "AI özeti çıktığında organik sonuçlara tıklama oranı **%50–61 arasında** düşüyor.",
            "Seer Interactive ölçümünde düşüş **%61**; Pew Research'ün 68.000 sorguluk çalışmasında göreli düşüş **%46,7**.",
          ],
        },
        {
          type: "p",
          text: "Yani kayıp gerçek ve büyük. Ama kritik nokta şu: bu kayıp her sorguda değil, **bilgi amaçlı** sorgularda yoğunlaşıyor. “Nasıl yapılır”, “nedir”, “hangisi daha iyi” tarzı içerikler en çok etkilenen grup.",
        },
        { type: "h2", text: "Etkilenmeyen taraf" },
        {
          type: "p",
          text: "Satın alma niyeti taşıyan sorgular bu tablodan büyük ölçüde muaf. Kullanıcı bir ürünü almaya karar verdiğinde özet okumak değil, fiyat karşılaştırmak ve sipariş vermek ister. E-ticaret için iyi haber bu: kategori ve ürün sayfalarınıza gelen trafik, blog trafiğiniz kadar zarar görmüyor.",
        },
        {
          type: "p",
          text: "Zarar gören taraf, dolaylı trafik üreten rehber içerikler. Bu tür içerikleri hâlâ üretmeye değer — ama artık amacı tıklama değil, **kaynak gösterilmek** olmalı.",
        },
        { type: "h2", text: "Yeni ölçü: tıklama değil, atıf" },
        {
          type: "quote",
          text: "Görünürlük artık tıklamada değil, atıfta. Cevabın içinde adınızın geçmesi, o cevabın altındaki bağlantıdan daha değerli hale geliyor.",
        },
        {
          type: "p",
          text: "Bu, ölçüm alışkanlığını da değiştiriyor. Sadece organik oturum sayısına bakarsanız düşüş görürsünüz ve panikleyip yanlış karar alırsınız. Bunun yerine izlenmesi gerekenler:",
        },
        {
          type: "ul",
          items: [
            "**Atıf payı:** Sektörünüzdeki sorgularda AI özetinde ne sıklıkla kaynak gösteriliyorsunuz.",
            "**Markalı arama hacmi:** İnsanlar özeti okuduktan sonra doğrudan sizin adınızı arıyor mu.",
            "**Doğrudan trafik ve dönüşüm:** Tıklama düşerken satış düşmüyorsa kanal hâlâ çalışıyordur.",
          ],
        },
        { type: "h2", text: "Atıf almak için ne yapmalı" },
        {
          type: "ol",
          items: [
            "**Yapılandırılmış veri (schema) ekleyin.** Modelin içeriğinizi güvenle alıntılayabilmesi için yapıyı okuyabilmesi gerekiyor. Bu, bugün en yüksek getirili teknik iş.",
            "**Özgün veri üretin.** Herkesin tekrarladığı bilgi alıntılanmaz; kendi ölçümünüz, kendi vaka analiziniz alıntılanır.",
            "**Soruyu doğrudan cevaplayın.** Cevabı üç paragraf giriş yazısının altına gömmeyin; başlığın hemen altına net bir cevap koyun.",
            "**Marka otoritesi sinyallerini güçlendirin.** Kim olduğunuz, nerede olduğunuz, kimlerle çalıştığınız net olsun.",
            "**Mobili öncelikleyin.** AI özetleri mobilde ekranın çok daha büyük kısmını kaplıyor; organik sonuçlar aşağı itiliyor.",
          ],
        },
        { type: "h2", text: "Pratik sonuç" },
        {
          type: "p",
          text: "SEO ölmedi ama hedefi değişti. Eskiden amaç ilk sıraya çıkmaktı; şimdi amaç cevabın içinde olmak. E-ticaret tarafında öncelik sırası da netleşti: önce ürün ve kategori sayfalarının teknik sağlığı, sonra yapılandırılmış veri, en sonda rehber içerik. Bu sıra ters çevrildiğinde emek en çok zarar gören alana harcanmış oluyor.",
        },
      ],
      sources: [
        {
          label:
            "Search Engine Journal — Study Confirms AI Overviews Cut Organic Clicks",
          url: "https://www.searchenginejournal.com/ai-overviews-cut-organic-clicks-38-field-study-finds/573145/",
        },
        {
          label:
            "Cognizo — Google AI Overviews statistics: coverage, click loss and citations",
          url: "https://www.cognizo.ai/blog/google-ai-overviews-statistics",
        },
      ],
    },
    en: {
      blocks: [
        {
          type: "p",
          text: "Ever since Google started placing AI summaries above the search results, the SEO debate has split in two: those who say “SEO is dead” and those who insist nothing has changed. Both are wrong. The data paints a clearer picture.",
        },
        { type: "h2", text: "How common it is and how much it hurts" },
        {
          type: "ul",
          items: [
            "As of January 2026, AI Overviews appear on **25.8%** of US searches, most often on informational queries.",
            "When an AI summary appears, the click-through rate to organic results drops **by 50–61%**.",
            "Seer Interactive measured a **61%** drop; Pew Research's study of 68,000 queries found a relative drop of **46.7%**.",
          ],
        },
        {
          type: "p",
          text: "So the loss is real and large. But here is the critical point: it isn't spread across every query; it is concentrated on **informational** ones. “How to”, “what is” and “which is better” content is the group hit hardest.",
        },
        { type: "h2", text: "The side that isn't affected" },
        {
          type: "p",
          text: "Queries with purchase intent are largely spared. Once a user has decided to buy a product, they want to compare prices and order, not read a summary. That is good news for e-commerce: traffic to your category and product pages isn't hurt as much as your blog traffic.",
        },
        {
          type: "p",
          text: "The losers are guides that generate indirect traffic. Such content is still worth producing, but its goal now has to be **being cited**, not being clicked.",
        },
        { type: "h2", text: "The new metric: citations, not clicks" },
        {
          type: "quote",
          text: "Visibility now lives in citations, not clicks. Having your name inside the answer is becoming worth more than the link underneath it.",
        },
        {
          type: "p",
          text: "This changes measurement habits too. If you only watch organic sessions you'll see a decline, panic and make the wrong call. Track these instead:",
        },
        {
          type: "ul",
          items: [
            "**Citation share:** How often you are cited as a source in AI summaries for queries in your sector.",
            "**Branded search volume:** Whether people search for your name directly after reading the summary.",
            "**Direct traffic and conversions:** If sales hold while clicks fall, the channel is still working.",
          ],
        },
        { type: "h2", text: "How to get cited" },
        {
          type: "ol",
          items: [
            "**Add structured data (schema).** For a model to quote your content with confidence, it needs to be able to read its structure. This is the highest-return technical work today.",
            "**Produce original data.** Information everyone repeats doesn't get quoted; your own measurements and case studies do.",
            "**Answer the question directly.** Don't bury the answer under three paragraphs of introduction; put a clear answer right below the heading.",
            "**Strengthen brand authority signals.** Make it clear who you are, where you are and who you work with.",
            "**Prioritise mobile.** AI summaries take up a much larger share of the screen on mobile and push organic results further down.",
          ],
        },
        { type: "h2", text: "The practical takeaway" },
        {
          type: "p",
          text: "SEO isn't dead, but its target has changed. The goal used to be ranking first; now it is being inside the answer. For e-commerce the order of priorities is clear: first the technical health of product and category pages, then structured data, and guide content last. Reverse that order and the effort goes to the area that is losing the most.",
        },
      ],
      sources: [
        {
          label:
            "Search Engine Journal — Study Confirms AI Overviews Cut Organic Clicks",
          url: "https://www.searchenginejournal.com/ai-overviews-cut-organic-clicks-38-field-study-finds/573145/",
        },
        {
          label:
            "Cognizo — Google AI Overviews statistics: coverage, click loss and citations",
          url: "https://www.cognizo.ai/blog/google-ai-overviews-statistics",
        },
      ],
    },
  },
};

export function getArticle(slug: string, locale: string): Article | null {
  return blogArticles[slug]?.[locale] ?? null;
}
