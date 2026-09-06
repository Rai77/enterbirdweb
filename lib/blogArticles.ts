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
  },
};

export function getArticle(slug: string, locale: string): Article | null {
  return blogArticles[slug]?.[locale] ?? null;
}
