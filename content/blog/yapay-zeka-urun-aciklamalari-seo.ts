import type { RepoPost } from "./types";

export const post: RepoPost = {
  slug: "yapay-zeka-urun-aciklamalari-seo",
  publishedAt: "2026-11-18",
  readingMinutes: 5,
  tr: {
    title: "Ürün açıklamalarını yapay zekâ ile yazmak: nerede kazandırır, nerede SEO'ya zarar verir",
    category: "SEO",
    excerpt:
      "Yapay zekâ ile yüzlerce ürün açıklamasını bir günde yazmak mümkün; ama Google aracı değil, ortaya çıkan içeriğin değerini ölçüyor. Bu yazıda yapay zekânın katalogda nerede zaman kazandırdığını, nerede sıralamaya ve güvene zarar verdiğini ve güvenli bir iş akışını anlattık.",
    blocks: [
      {
        type: "p",
        text: "Yüzlerce, hatta binlerce ürünü olan bir mağaza için açıklama yazmak en çok ertelenen işlerden biri. Sonuç genelde ya üreticinin metnini olduğu gibi kopyalamak ya da hiç açıklama yazmamak oluyor. Yapay zekâ araçları bu boşluğu dakikalar içinde doldurabiliyor ve Shopify gibi platformlar bu özelliği doğrudan yönetim paneline koymuş durumda. Soru şu: bu metinler mağazanıza trafik ve satış mı getirir, yoksa Google'ın gözünde değersiz, kopya içerik yığınına mı dönüşür? Cevap aracın kendisinde değil, nasıl kullandığınızda.",
      },
      { type: "h2", text: "1. Google'ın tutumu: yapay zekâ yasak değil, değersiz içerik sorun" },
      {
        type: "p",
        text: "Google, yapay zekâ ya da otomasyonun uygun şekilde kullanılmasının kurallarına aykırı olmadığını açıkça söylüyor. Değerlendirme, içeriğin nasıl üretildiğine değil, kalitesine ve kullanıcıya faydasına göre yapılıyor. Yani yapay zekâ ile yazılmış bir açıklama, sırf bu yüzden cezalandırılmıyor; ama ayrıca bir avantaj da kazanmıyor.",
      },
      {
        type: "p",
        text: "Sınır, Google'ın spam politikalarındaki **ölçekli içerik kötüye kullanımı** başlığında çiziliyor. Bu politikada açık bir örnek var: üretken yapay zekâ araçlarıyla, kullanıcıya değer katmadan çok sayıda sayfa oluşturmak. Aynı politika, başka sitelerden alınan içeriği eş anlamlı kelimelerle değiştirerek ya da çevirerek çoğaltmayı da aynı kapsamda sayıyor. E-ticarette bu, üretici açıklamasını yapay zekâya \"yeniden yazdırıp\" binlerce ürüne basmanın tam olarak riskli bölge olduğu anlamına geliyor.",
      },
      { type: "h2", text: "2. Yapay zekânın gerçekten kazandırdığı yerler" },
      {
        type: "p",
        text: "Doğru kullanıldığında yapay zekâ en çok zaman alan, tekrar eden işleri hızlandırır. Burada önemli olan, araca kendi bildiğiniz doğru bilgiyi vermeniz ve ondan sadece bu bilgiyi okunur hâle getirmesini istemeniz.",
      },
      {
        type: "ul",
        items: [
          "**Dağınık bilgiyi düzenlemek:** Tedarikçi tablosundaki ölçü, malzeme, bakım talimatı gibi verileri tutarlı bir formata sokmak.",
          "**İlk taslak:** Boş sayfa yerine üzerinde çalışılacak bir metin çıkarmak; son hâli ürünü tanıyan biri verir.",
          "**Varyasyonlar:** Aynı ürün ailesinde renk ya da beden farkları için tekrar eden yapıyı hızlıca doldurmak.",
          "**Dil uyumu:** Yurt dışına satış yapıyorsanız, kendi yazdığınız Türkçe metinden yabancı dilde bir taslak çıkarıp ana dili o olan birine kontrol ettirmek.",
          "**Müşteri sorularından içerik:** Sık gelen soruları ve iade nedenlerini özetleyip açıklamaya \"bunu bilmeniz gerekir\" bilgisi olarak eklemek.",
        ],
      },
      { type: "h2", text: "3. SEO'ya ve güvene zarar verdiği yerler" },
      {
        type: "p",
        text: "Sorunlar genellikle aracın yanlış bilgiyle ya da hiç bilgi olmadan çalıştırılmasından çıkıyor. Google, üretken modellerin bilgi aramak yerine olası kelime dizilerini tahmin ettiğini ve bu yüzden hatalı bilgi (halüsinasyon) üretebildiğini belirtiyor. Ürün sayfasında bu, yanlış malzeme, olmayan bir özellik ya da hatalı ölçü demek; yani hem iade hem güven kaybı.",
      },
      {
        type: "ul",
        items: [
          "**Birbirinin aynısı metinler:** Aynı komutla üretilen açıklamalar, sadece ürün adı değişmiş kalıp metinlere dönüşür. Bu, kullanıcıya yeni bir şey söylemeyen sayfalar demektir.",
          "**Uydurulmuş özellikler:** Model, ürün bilgisinde olmayan \"su geçirmez\", \"organik\" gibi iddiaları kendiliğinden ekleyebilir. Bu, yanıltıcı reklam riskini de beraberinde getirir.",
          "**Herkesle aynı kaynak:** Üretici metnini yapay zekâ ile değiştirmek, aynı ürünü satan rakiplerinizin de yapabileceği bir iş. Fark yaratmaz.",
          "**Kontrolsüz başlık ve meta açıklamaları:** Google, sayfa başlıkları, meta açıklamalar, yapılandırılmış veri ve görsel alt metinleri için de aynı kontrolün yapılmasını öneriyor; çünkü bunlar arama sonuçlarında görünebiliyor.",
        ],
      },
      {
        type: "quote",
        text: "Yapay zekâ ne bildiğinizi güzel anlatır; bilmediğinizi ise güzelce uydurur.",
      },
      { type: "h2", text: "4. Google Merchant Center'da ayrı bir kural var" },
      {
        type: "p",
        text: "Ürünlerinizi Google Alışveriş'te gösteriyorsanız dikkat etmeniz gereken teknik bir ayrıntı var. Merchant Center, üretken yapay zekâ ile oluşturulmuş açıklamaların normal **description** alanı yerine **structured_description** alanında gönderilmesini istiyor. Bu alanın içinde metnin yapay zekâ ile üretildiğini belirten **trained_algorithmic_media** değeri kullanılıyor. Aynı kural ürün başlıkları için de geçerli. Yapay zekâ ile üretilen ürün görsellerinde ise bu durumu belirten meta verinin (IPTC DigitalSourceType) korunması gerekiyor.",
      },
      {
        type: "p",
        text: "Merchant Center ayrıca açıklamada fiyat, kampanya, kargo bilgisi, şirket adı, bağlantı ve büyük harfle vurgu gibi ifadeleri istemiyor; önemli bilgilerin ilk birkaç yüz karaktere konulmasını öneriyor. Yapay zekâ bu tür satış dilini metne kendiliğinden eklemeye eğilimli olduğu için feed'e gönderilen metni ayrıca kontrol edin.",
      },
      { type: "h2", text: "5. Güvenli bir iş akışı" },
      {
        type: "ol",
        items: [
          "**Önce en çok satan ürünlerden başlayın.** Trafiği ve cirosu yüksek ürünlerin açıklamalarını elle, özenle yazın; yapay zekâyı uzun kuyruktaki ürünler için kullanın.",
          "**Araca doğru veri verin.** Ölçü, malzeme, kullanım alanı, bakım ve müşterilerin sık sorduğu soruları kendi kaynaklarınızdan derleyip komuta ekleyin. Araçtan bu bilgiler dışında iddia eklememesini isteyin.",
          "**Kendi deneyiminizi ekleyin.** Ürünü kullanan ekibinizin notları, kalıp hakkında bilgi, iade nedenlerinden çıkan uyarılar gibi sadece sizin bildiğiniz bilgiler, metni rakiplerinizden ayırır.",
          "**Yayınlamadan önce bir kişi kontrol etsin.** Her metin, ürünü tanıyan biri tarafından okunup teknik bilgiler tek tek doğrulanmalı. Shopify da yapay zekâ çıktılarında hata olabileceğini ve uygulamadan önce gözden geçirilmesi gerektiğini belirtiyor.",
          "**Toplu yayınlamayın, ölçün.** Önce bir ürün grubunda deneyin; Search Console'da gösterim ve tıklamaları, mağaza panelinde dönüşüm ve iade oranlarını birkaç hafta izleyip sonra genişletin.",
        ],
      },
      { type: "h2", text: "Pratik sonuç" },
      {
        type: "p",
        text: "Yapay zekâ, ürün açıklamalarında bir yazar değil, hızlı bir asistan olarak kullanıldığında kazandırır. Doğru bilgiyi siz verin, kendi deneyiminizi ekleyin, her metni bir kişi kontrol etsin ve sonuçları ölçerek ilerleyin. Üretici metnini değiştirip binlerce sayfaya basmak ise kısa vadede iş bitirmiş gibi görünse de Google'ın ölçekli içerik politikasına takılma riski taşır ve müşteriye yeni hiçbir şey söylemez. Google Alışveriş kullanıyorsanız yapay zekâ ile üretilen metinleri doğru alanda ve doğru etiketle gönderin. Kısacası: hız yapay zekâdan, doğruluk ve fark sizden gelmeli.",
      },
    ],
    sources: [
      {
        label: "Google Search Central Blog — Google Search's guidance about AI-generated content",
        url: "https://developers.google.com/search/blog/2023/02/google-search-and-ai-content",
      },
      {
        label: "Google Search Central — Spam policies for Google web search",
        url: "https://developers.google.com/search/docs/essentials/spam-policies",
      },
      {
        label: "Google Search Central — Guidance on using generative AI content on your website",
        url: "https://developers.google.com/search/docs/fundamentals/using-gen-ai-content",
      },
      {
        label: "Google Merchant Center Help — Description and structured description",
        url: "https://support.google.com/merchants/answer/6324468",
      },
      {
        label: "Shopify Help Center — Shopify Magic",
        url: "https://help.shopify.com/en/manual/shopify-admin/productivity-tools/shopify-magic/product-descriptions",
      },
    ],
  },
  en: {
    title: "Writing product descriptions with AI: where it pays off and where it hurts SEO",
    category: "SEO",
    excerpt:
      "With AI you can write hundreds of product descriptions in a day, but Google judges the value of the content, not the tool behind it. This post covers where AI saves time in your catalog, where it damages rankings and trust, and a safe workflow to follow.",
    blocks: [
      {
        type: "p",
        text: "For a store with hundreds or even thousands of products, writing descriptions is one of the most postponed jobs. The result is usually either copying the manufacturer's text as is or writing no description at all. AI tools can fill that gap in minutes, and platforms like Shopify have built this feature right into the admin. The question is: will these texts bring your store traffic and sales, or turn into a pile of worthless, duplicate content in Google's eyes? The answer isn't in the tool itself, but in how you use it.",
      },
      { type: "h2", text: "1. Google's position: AI isn't banned, low-value content is the problem" },
      {
        type: "p",
        text: "Google states clearly that appropriate use of AI or automation is not against its guidelines. Content is evaluated on its quality and usefulness to people, not on how it was produced. So a description written with AI isn't penalized just for that; but it doesn't gain any special advantage either.",
      },
      {
        type: "p",
        text: "The line is drawn under **scaled content abuse** in Google's spam policies. The policy gives an explicit example: using generative AI tools to create many pages without adding value for users. The same policy also covers multiplying content taken from other sites by swapping in synonyms or translating it. In e-commerce, this means that having AI \"rewrite\" the manufacturer's description and stamping it onto thousands of products is exactly the risky zone.",
      },
      { type: "h2", text: "2. Where AI genuinely pays off" },
      {
        type: "p",
        text: "Used correctly, AI speeds up the most time-consuming, repetitive work. What matters is that you give the tool accurate information you know yourself and ask it only to make that information readable.",
      },
      {
        type: "ul",
        items: [
          "**Organizing scattered data:** Putting details from a supplier spreadsheet, such as dimensions, materials and care instructions, into a consistent format.",
          "**First draft:** Producing a text to work on instead of a blank page; the final version comes from someone who knows the product.",
          "**Variants:** Quickly filling in the repeating structure for color or size differences within the same product family.",
          "**Language fit:** If you sell abroad, producing a foreign-language draft from your own Turkish text and having a native speaker check it.",
          "**Content from customer questions:** Summarizing frequent questions and return reasons and adding them to the description as \"good to know\" information.",
        ],
      },
      { type: "h2", text: "3. Where it hurts SEO and trust" },
      {
        type: "p",
        text: "Problems usually come from running the tool with wrong information or with none at all. Google notes that generative models predict likely sequences of words rather than looking up facts, so they can produce false information (hallucinations). On a product page, that means a wrong material, a feature that doesn't exist or an incorrect measurement; in other words, both returns and lost trust.",
      },
      {
        type: "ul",
        items: [
          "**Near-identical texts:** Descriptions generated with the same prompt turn into template text where only the product name changes. These are pages that tell the user nothing new.",
          "**Invented features:** The model can add claims such as \"waterproof\" or \"organic\" on its own, even when they aren't in the product data. This also brings the risk of misleading advertising.",
          "**The same source as everyone else:** Rewriting the manufacturer's text with AI is something every competitor selling the same product can do too. It doesn't set you apart.",
          "**Unchecked titles and meta descriptions:** Google recommends applying the same review to page titles, meta descriptions, structured data and image alt text, since these can appear in search results.",
        ],
      },
      {
        type: "quote",
        text: "AI explains what you know nicely; what you don't know, it nicely makes up.",
      },
      { type: "h2", text: "4. Google Merchant Center has a separate rule" },
      {
        type: "p",
        text: "If you show your products on Google Shopping, there's a technical detail to watch. Merchant Center asks that descriptions created with generative AI be sent in the **structured_description** attribute instead of the regular **description** attribute. Inside this attribute, the value **trained_algorithmic_media** indicates that the text was produced with AI. The same rule applies to product titles. For product images created with AI, the metadata that indicates this (IPTC DigitalSourceType) must be kept.",
      },
      {
        type: "p",
        text: "Merchant Center also doesn't want descriptions to include things like price, promotions, shipping information, company name, links or all-caps emphasis, and it recommends putting the most important details in the first few hundred characters. Since AI tends to add this kind of sales language on its own, check the text you send to your feed separately.",
      },
      { type: "h2", text: "5. A safe workflow" },
      {
        type: "ol",
        items: [
          "**Start with your best sellers.** Write descriptions for products with high traffic and revenue by hand, with care; use AI for long-tail products.",
          "**Give the tool the right data.** Compile dimensions, materials, use cases, care and customers' frequent questions from your own sources and add them to the prompt. Ask the tool not to add claims beyond this information.",
          "**Add your own experience.** Information only you have, such as notes from your team who use the product, details about fit, and warnings drawn from return reasons, sets the text apart from your competitors.",
          "**Have a person check before publishing.** Every text should be read by someone who knows the product, with technical details verified one by one. Shopify also notes that AI output can contain errors and should be reviewed before it's applied.",
          "**Don't publish in bulk; measure.** Test on one product group first; watch impressions and clicks in Search Console and conversion and return rates in your store dashboard for a few weeks, then expand.",
        ],
      },
      { type: "h2", text: "The practical takeaway" },
      {
        type: "p",
        text: "AI pays off in product descriptions when it's used as a fast assistant, not as the writer. Give it the correct information yourself, add your own experience, have a person check every text and move forward by measuring results. Rewriting the manufacturer's text and stamping it onto thousands of pages may look like a finished job in the short term, but it risks running into Google's scaled content policy and tells the customer nothing new. If you use Google Shopping, send AI-generated text in the right attribute with the right label. In short: speed should come from AI, accuracy and differentiation from you.",
      },
    ],
    sources: [
      {
        label: "Google Search Central Blog — Google Search's guidance about AI-generated content",
        url: "https://developers.google.com/search/blog/2023/02/google-search-and-ai-content",
      },
      {
        label: "Google Search Central — Spam policies for Google web search",
        url: "https://developers.google.com/search/docs/essentials/spam-policies",
      },
      {
        label: "Google Search Central — Guidance on using generative AI content on your website",
        url: "https://developers.google.com/search/docs/fundamentals/using-gen-ai-content",
      },
      {
        label: "Google Merchant Center Help — Description and structured description",
        url: "https://support.google.com/merchants/answer/6324468",
      },
      {
        label: "Shopify Help Center — Shopify Magic",
        url: "https://help.shopify.com/en/manual/shopify-admin/productivity-tools/shopify-magic/product-descriptions",
      },
    ],
  },
};
