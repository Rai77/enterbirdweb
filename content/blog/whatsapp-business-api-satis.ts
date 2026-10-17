import type { RepoPost } from "./types";

export const post: RepoPost = {
  slug: "whatsapp-business-api-satis",
  publishedAt: "2026-10-17",
  readingMinutes: 5,
  tr: {
    title: "WhatsApp Business API ile satış: otomasyon nerede işe yarıyor, nerede müşteriyi kaçırıyor",
    category: "E-Ticaret",
    excerpt:
      "WhatsApp otomasyonu doğru kurulduğunda sipariş sonrası iletişimi ucuzlatıyor ve reklamdan gelen müşteriyi sıcakken yakalıyor. Yanlış kurulduğunda ise mesajlar teslim edilmiyor, maliyet artıyor ve müşteri bir bota takılıp gidiyor.",
    blocks: [
      {
        type: "p",
        text: "Türkiye'de müşterinin markaya ulaşmak için ilk açtığı uygulama çoğu zaman WhatsApp. Bu yüzden birçok marka WhatsApp Business API'ye geçip kampanya duyurusu, sepet hatırlatması ve otomatik cevap kurguları kuruyor. Sorun şu: Meta'nın kuralları, fiyatlandırması ve teslimat sınırları bu kanalı e-posta gibi kullanmaya izin vermiyor. Otomasyonun nerede kazandırdığını, nerede müşteriyi kaçırdığını bilmeden kurulan bir sistem hem para yakıyor hem de numaranızın itibarını zedeliyor.",
      },
      { type: "h2", text: "1. Önce oyunun kurallarını bilin: 24 saatlik pencere ve şablonlar" },
      {
        type: "p",
        text: "WhatsApp'ta konuşmayı müşteri başlatırsa bir **24 saatlik müşteri hizmetleri penceresi** açılır. Bu pencere müşterinin son mesajından 24 saat sonra kapanır. Pencere açıkken serbest metin, görsel ve benzeri mesajları ücretsiz gönderebilirsiniz. Pencere kapandıktan sonra ise müşteriye yalnızca Meta'nın onayladığı **şablon mesajlar** gidebilir ve bunlar ücretlidir.",
      },
      {
        type: "p",
        text: "Meta, 1 Temmuz 2025'ten itibaren konuşma bazlı fiyatlandırmadan **mesaj başına fiyatlandırmaya** geçti. Ücret, şablonun kategorisine (pazarlama, işlem/utility, doğrulama), gönderim hacmine ve alıcının ülke koduna göre belirleniyor. Açık pencere içinde gönderilen işlem şablonları ücretsiz. Kısacası, müşteriyle zaten konuşurken yazdığınız mesaj bedava; aniden başlattığınız pazarlama mesajı ise en pahalı seçenek.",
      },
      { type: "h2", text: "2. Otomasyonun en çok kazandırdığı yer: sipariş sonrası" },
      {
        type: "p",
        text: "Sipariş onayı, kargoya verildi bildirimi, takip numarası ve iade/para iadesi bilgisi WhatsApp otomasyonunun en sağlam kullanım alanı. Bunlar müşterinin beklediği, okuduğu ve çağrı merkezine düşen \"siparişim nerede\" sorularını azaltan mesajlar. Meta'nın sınıflandırma rehberine göre bu tür mesajlar, yalnızca siparişe özel bilgi içeriyorsa **işlem (utility)** kategorisinde sayılıyor.",
      },
      {
        type: "ul",
        items: [
          "Kargo bildirimine indirim kodu ya da \"bunları da beğenebilirsiniz\" önerisi eklemeyin. Meta, karışık içerikli şablonu **pazarlama** sayıyor ve daha yüksek ücretten faturalandırıyor.",
          "Pazarlama içeriğini işlem şablonu gibi göstermeye çalışmayın. Meta bu şablonları yeniden sınıflandırabiliyor; tekrarlanırsa işlem şablonu gönderimi kısıtlanabiliyor.",
          "Bildirimleri müşterinin gerçekten işine yarayan anlarla sınırlayın: sipariş alındı, kargoda, teslim edildi, iade sonuçlandı.",
        ],
      },
      { type: "h2", text: "3. Reklamdan gelen müşteriyi sıcakken yakalayın" },
      {
        type: "p",
        text: "WhatsApp'a tıklatan reklamlar (Click to WhatsApp) ya da Facebook sayfasındaki eylem düğmesiyle mobil uygulamadan gelen bir müşteriye 24 saat içinde cevap verirseniz, Meta **72 saatlik ücretsiz bir pencere** açıyor. Bu süre boyunca şablonlar dahil tüm mesajlar ücretsiz. Bu, reklamdan gelen soruyu hızla cevaplayıp ürün önerisi, beden yardımı ve ödeme bağlantısıyla satışa çevirmek için iyi bir fırsat.",
      },
      {
        type: "p",
        text: "Burada otomasyonun görevi ilk cevabı hızlandırmak ve doğru soruları sormak: hangi ürün, hangi beden, hangi şehir. Ama satışı kapatacak kişi çoğu zaman bir insan. Gece gelen mesaja anında otomatik karşılama, sabah ise bir temsilcinin konuşmayı devralması en sık işe yarayan kurgu.",
      },
      { type: "h2", text: "4. Otomasyonun müşteriyi kaçırdığı yer: toplu pazarlama mesajı" },
      {
        type: "p",
        text: "WhatsApp, bir kullanıcının tüm işletmelerden alabileceği pazarlama mesajı sayısına **kişi başı bir sınır** koyuyor. Bu sınır sabit değil; kişinin son dönemdeki pazarlama mesajı okuma oranına ve gelen kutusunun ne kadar dolu olduğuna göre değişiyor. Sınıra takılan mesaj teslim edilmiyor, kısa sürede tekrar denerseniz o kişiye gönderim 24 saate kadar engellenebiliyor. ABD numaralarına ise şu anda pazarlama şablonu hiç teslim edilmiyor; yurt dışına satan markalar bunu hesaba katmalı.",
      },
      {
        type: "p",
        text: "Bunun pratik anlamı şu: herkese her hafta kampanya mesajı göndermek, mesajlarınızın daha az kişiye ulaşmasıyla sonuçlanıyor. Sepet hatırlatmaları da Meta'nın rehberinde açıkça **pazarlama (yeniden hedefleme)** örneği olarak geçiyor; yani ücretli ve bu sınıra tabi.",
      },
      {
        type: "ul",
        items: [
          "Pazarlama mesajlarını alışveriş geçmişine göre bölümlere ayırın; tüm listeye aynı mesajı atmayın.",
          "Mesajın sonunda cevap isteyen bir soru sorun. Müşteri cevap verirse 24 saatlik pencere açılıyor ve bu süre içindeki pazarlama mesajları sınıra sayılmıyor.",
          "Teslim edilmeyen mesajları ve okunma oranını kampanya bazında izleyin; düşen okuma oranı ilk uyarı işaretidir.",
        ],
      },
      { type: "h2", text: "5. İzin, çıkış ve insana aktarma: ihmal edilen üç kural" },
      {
        type: "p",
        text: "WhatsApp İşletme Politikası'na göre yalnızca numarasını size veren ve sizden mesaj almayı kabul eden kişilere yazabilirsiniz. İzni nasıl aldığınızdan ve yasal uyumdan siz sorumlusunuz. Meta, arama ve her mesaj kategorisi için ayrı izin almayı iyi uygulama olarak öneriyor.",
      },
      {
        type: "ul",
        items: [
          "**İzin:** Ödeme sayfasında önceden işaretli olmayan, ne tür mesaj gönderileceğini açıkça yazan bir onay kutusu kullanın.",
          "**Çıkış:** Müşteri WhatsApp'ta ya da başka bir kanalda \"istemiyorum\" dediğinde bu talebi uygulayın. Her pazarlama mesajında nasıl çıkılacağı belli olsun.",
          "**İnsana aktarma:** Politika, otomatik cevaplarda hızlı, net ve doğrudan bir yönlendirme yolu sunulmasını istiyor: canlı temsilci, telefon, e-posta ya da destek formu gibi.",
        ],
      },
      {
        type: "quote",
        text: "Botun görevi müşteriyi oyalamak değil, doğru kişiye en kısa yoldan ulaştırmaktır.",
      },
      {
        type: "p",
        text: "Müşteriyi en çok kaçıran şey, iade ya da hatalı ürün gibi gergin bir konuda menüden menüye dolaştırılmak. \"Temsilciyle görüş\" seçeneğini her akışın ilk ekranına koyun ve mesai dışındaysanız ne zaman dönüleceğini açıkça yazın.",
      },
      { type: "h2", text: "Pratik sonuç" },
      {
        type: "p",
        text: "WhatsApp otomasyonunu üç katmanda düşünün. Sipariş sonrası bildirimleri tamamen otomatik ve sade tutun. Reklamdan ve müşteriden gelen konuşmalarda otomasyonu ilk karşılama ve bilgi toplama için kullanın, satışı bir insana devredin. Pazarlama mesajlarını ise az, bölümlenmiş ve cevap isteyen biçimde gönderin. İzin, çıkış ve insana aktarma yolunu baştan kurmak, hem numaranızı korur hem de bu kanalı uzun vadede satış getiren bir kanal olarak tutar.",
      },
    ],
    sources: [
      {
        label: "Meta for Developers — WhatsApp Business Platform Pricing",
        url: "https://developers.facebook.com/docs/whatsapp/pricing",
      },
      {
        label: "Meta for Developers — Per-user marketing template message limits",
        url: "https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/marketing-templates/per-user-limits",
      },
      {
        label: "Meta for Developers — Template categorization",
        url: "https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/template-categorization",
      },
      {
        label: "WhatsApp Business Messaging Policy",
        url: "https://whatsappbusiness.com/policy/",
      },
    ],
  },
  en: {
    title: "Selling with the WhatsApp Business API: where automation works and where it loses customers",
    category: "E-Commerce",
    excerpt:
      "Set up well, WhatsApp automation makes post-purchase communication cheaper and catches ad-driven shoppers while they're still interested. Set up badly, messages don't get delivered, costs rise and customers get stuck with a bot and leave.",
    blocks: [
      {
        type: "p",
        text: "In Turkey, WhatsApp is often the first app customers open when they want to reach a brand. That's why many brands move to the WhatsApp Business API and build campaign announcements, cart reminders and automated replies. The catch: Meta's rules, pricing and delivery limits don't let you treat this channel like email. A system built without knowing where automation pays off and where it loses customers burns money and damages your number's reputation.",
      },
      { type: "h2", text: "1. Know the rules first: the 24-hour window and templates" },
      {
        type: "p",
        text: "When a customer starts a conversation on WhatsApp, a **24-hour customer service window** opens. It closes 24 hours after the customer's last message. While it's open, you can send free-form text, images and similar messages for free. Once it closes, you can only send **template messages** approved by Meta, and those are paid.",
      },
      {
        type: "p",
        text: "Since July 1, 2025, Meta has moved from conversation-based pricing to **per-message pricing**. The charge depends on the template category (marketing, utility, authentication), your sending volume and the recipient's country code. Utility templates sent inside an open window are free. In short, a message you send while already talking to a customer costs nothing; a marketing message you start out of the blue is the most expensive option.",
      },
      { type: "h2", text: "2. Where automation pays off most: after the purchase" },
      {
        type: "p",
        text: "Order confirmations, shipping notifications, tracking numbers and return or refund updates are the strongest use case for WhatsApp automation. Customers expect and read these messages, and they cut down the \"where is my order\" questions that land on your support team. According to Meta's categorization guide, these messages count as **utility** only if they contain order-specific information alone.",
      },
      {
        type: "ul",
        items: [
          "Don't add a discount code or \"you might also like\" suggestions to a shipping notification. Meta treats mixed-content templates as **marketing** and bills them at the higher rate.",
          "Don't try to pass marketing content off as a utility template. Meta can recategorize these templates, and repeated misuse can restrict your utility sending.",
          "Limit notifications to moments that genuinely help the customer: order received, shipped, delivered, return completed.",
        ],
      },
      { type: "h2", text: "3. Catch ad-driven customers while they're interested" },
      {
        type: "p",
        text: "If a customer reaches you from the mobile app via a Click to WhatsApp ad or a Facebook Page call-to-action button and you reply within 24 hours, Meta opens a **72-hour free entry point window**. During that time, all messages, templates included, are free. It's a good opportunity to answer the question that came from the ad quickly and turn it into a sale with product suggestions, size help and a payment link.",
      },
      {
        type: "p",
        text: "Here, automation's job is to speed up the first reply and ask the right questions: which product, which size, which city. But the person who closes the sale is usually a human. An instant automated greeting for messages that arrive at night, with an agent taking over the conversation in the morning, is the setup that works most often.",
      },
      { type: "h2", text: "4. Where automation loses customers: bulk marketing messages" },
      {
        type: "p",
        text: "WhatsApp puts a **per-user limit** on how many marketing messages a person can receive from all businesses. The limit isn't fixed; it depends on the person's recent marketing message read rate and how full their inbox is. A message that hits the limit isn't delivered, and if you retry several times in a short period, sending to that person can be blocked for up to 24 hours. Marketing templates are currently not delivered to US numbers at all, which brands selling abroad should factor in.",
      },
      {
        type: "p",
        text: "In practice, sending a campaign message to everyone every week means your messages reach fewer people. Meta's guide also lists cart reminders explicitly as a **marketing (retargeting)** example, so they're paid and subject to this limit.",
      },
      {
        type: "ul",
        items: [
          "Segment marketing messages by purchase history; don't send the same message to your whole list.",
          "End the message with a question that invites a reply. If the customer replies, a 24-hour window opens, and marketing messages sent within it don't count toward the limit.",
          "Track undelivered messages and read rates per campaign; a falling read rate is the first warning sign.",
        ],
      },
      { type: "h2", text: "5. Opt-in, opt-out and human handoff: three overlooked rules" },
      {
        type: "p",
        text: "Under the WhatsApp Business Messaging Policy, you may only message people who have given you their number and agreed to receive messages from you. You're responsible for how you collect that consent and for legal compliance. Meta recommends collecting separate opt-ins for calls and for each message category as best practice.",
      },
      {
        type: "ul",
        items: [
          "**Opt-in:** Use a checkbox at checkout that isn't pre-ticked and clearly states what kind of messages you'll send.",
          "**Opt-out:** When a customer says \"stop\" on WhatsApp or any other channel, honour it. Make it clear in every marketing message how to opt out.",
          "**Human handoff:** The policy requires automated replies to offer a prompt, clear and direct escalation path, such as a live agent, phone, email or a support form.",
        ],
      },
      {
        type: "quote",
        text: "A bot's job isn't to keep the customer busy; it's to get them to the right person by the shortest route.",
      },
      {
        type: "p",
        text: "What loses customers most is being bounced from menu to menu on a tense issue like a return or a faulty product. Put a \"talk to an agent\" option on the first screen of every flow, and if you're outside working hours, say clearly when someone will get back to them.",
      },
      { type: "h2", text: "The practical takeaway" },
      {
        type: "p",
        text: "Think of WhatsApp automation in three layers. Keep post-purchase notifications fully automated and simple. In conversations started by ads or customers, use automation for the first greeting and for gathering information, then hand the sale to a human. Send marketing messages rarely, segmented and in a way that invites a reply. Building opt-in, opt-out and human handoff in from the start protects your number and keeps this channel bringing in sales over the long term.",
      },
    ],
    sources: [
      {
        label: "Meta for Developers — WhatsApp Business Platform Pricing",
        url: "https://developers.facebook.com/docs/whatsapp/pricing",
      },
      {
        label: "Meta for Developers — Per-user marketing template message limits",
        url: "https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/marketing-templates/per-user-limits",
      },
      {
        label: "Meta for Developers — Template categorization",
        url: "https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/template-categorization",
      },
      {
        label: "WhatsApp Business Messaging Policy",
        url: "https://whatsappbusiness.com/policy/",
      },
    ],
  },
};
