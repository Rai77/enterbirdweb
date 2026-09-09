import type { RepoPost } from "./types";

export const post: RepoPost = {
  slug: "performance-max-2026-kontroller",
  publishedAt: "2026-09-09",
  readingMinutes: 6,
  tr: {
    title: "Performance Max artık kör uçuş değil: 2026'da gelen kontroller",
    category: "Performans Pazarlama",
    excerpt:
      "Google 2026'da Performance Max'e kitle hariç tutma, bütçe raporu, ağ bazlı yerleşim raporu ve deney kurgusu ekledi. Kampanyanın çalışma mantığı aynı; değişen, ne olup bittiğini görebilmeniz.",
    blocks: [
      {
        type: "p",
        text: "Performance Max'in reklamverendeki en büyük sorunu performansı değil, görünürlüğü oldu: bütçenin nereye gittiği, reklamın kime ve hangi ağda gösterildiği kapalı bir kutuydu. Google 2026 boyunca bu kutuyu adım adım açtı. Kampanyanın çalışma mantığı değişmedi — değişen, ölçebildiğiniz ve müdahale edebildiğiniz alan.",
      },
      {
        type: "h2",
        text: "1. Mevcut müşteriyi kampanya dışında bırakabiliyorsunuz",
      },
      {
        type: "p",
        text: "Google'ın veri hariç tutma alanı artık müşteri listelerini ve yeniden pazarlama kitlelerini de kapsıyor. Yani zaten sizden alan bir müşteriye tekrar tekrar reklam göstermeyi durdurabiliyorsunuz. Bu, e-ticarette en sık görülen bütçe sızıntılarından birini kapatıyor: kampanya, satın alması zaten çok muhtemel kişileri toplayıp raporu şişiriyordu.",
      },
      {
        type: "p",
        text: "Pratik öneri: son 180 günde satın alan müşteri listesini hariç tutup kampanyayı iki hafta böyle çalıştırın. ROAS düşer, **gerçek müşteri kazanım maliyeti** ortaya çıkar. Asıl karar bu ikinci rakama göre verilmeli.",
      },
      { type: "h2", text: "2. Bütçe raporu: ay sonunu önceden görmek" },
      {
        type: "p",
        text: "Kampanyanın içine yerleşen bütçe raporu, ay sonunda ne kadar harcayacağınızı gösteriyor ve günlük bütçeyi değiştirseniz tablonun nasıl değişeceğini modelliyor. Küçük bir ekleme gibi duruyor ama ay ortasındaki **bütçeyi artıralım mı** tartışmasını tahminden çıkarıp veriye bağlıyor.",
      },
      { type: "h2", text: "3. Kitle ve ağ raporları" },
      {
        type: "p",
        text: "Artık yaş ve cinsiyet kırılımında performans görebiliyor, yerleşim raporunu ağ bazında ayırabiliyorsunuz: reklam Arama'da mı, YouTube'da mı, Display'de mi gösterildi. Bunun iki faydası var — marka güvenliği açısından nerede göründüğünüzü bilmek, ve bütçenin hangi ağda eridiğini görmek.",
      },
      {
        type: "quote",
        text: "Performance Max'i düzeltmenin yolu daha çok ayar değil, daha iyi veri. Kampanyaya ne verirseniz onu geri alıyorsunuz.",
      },
      { type: "h2", text: "4. Deneyler ve ürün çakışması" },
      {
        type: "p",
        text: "Deney kurgusuyla Performance Max'i Alışveriş veya Arama kampanyalarına karşı test edebiliyor, **uplift** deneyiyle mevcut kampanyaların üzerine gerçekten ne kattığını ölçebiliyorsunuz. Ürün çakışması raporu ise aynı ürünün kaç kampanyada birden yarıştığını gösteriyor; çok kampanyalı hesaplarda bütçenin kendi kendine rekabet ettiği yer genelde burasıdır.",
      },
      { type: "h2", text: "Pratik sonuç" },
      {
        type: "p",
        text: "2026'nın eklemeleri Performance Max'i yeniden yazmıyor, onu denetlenebilir hâle getiriyor. Sıralama net: önce mevcut müşteriyi hariç tutun, sonra ürün çakışmasını temizleyin, en sonda deneyle karar verin. Bu üç adım çoğu hesapta yeni bir kampanya kurmaktan daha fazla kazandırıyor.",
      },
    ],
    sources: [
      {
        label:
          "Search Engine Journal — Google Adds New Performance Max Controls And Reporting Features",
        url: "https://www.searchenginejournal.com/google-adds-new-performance-max-controls-and-reporting-features/570588/",
      },
      {
        label: "Practical Ecommerce — 3 Performance Max Updates for 2026",
        url: "https://www.practicalecommerce.com/3-performance-max-updates-for-2026",
      },
    ],
  },
  en: {
    title: "Performance Max is no longer a black box: the 2026 controls",
    category: "Performance Marketing",
    excerpt:
      "Through 2026 Google added audience exclusions, budget reporting, network-level placement data and experiments to Performance Max. The engine works the same; what changed is how much of it you can see.",
    blocks: [
      {
        type: "p",
        text: "Advertisers' biggest complaint about Performance Max was never performance — it was visibility. Where the budget went, who saw the ad and on which network stayed hidden. Google spent 2026 opening that box. The campaign logic has not changed; what changed is how much you can measure and act on.",
      },
      { type: "h2", text: "1. You can now exclude existing customers" },
      {
        type: "p",
        text: "Google's data exclusions now cover customer match lists and remarketing audiences, so you can stop paying to reach people who already bought from you. That closes one of the most common budget leaks in ecommerce: the campaign harvesting buyers who were going to convert anyway, then reporting it as a win.",
      },
      {
        type: "p",
        text: "A practical starting point: exclude everyone who purchased in the last 180 days and run the campaign that way for two weeks. ROAS will drop and your **true acquisition cost** will surface. That second number is the one to plan against.",
      },
      { type: "h2", text: "2. Budget reporting: seeing the end of the month" },
      {
        type: "p",
        text: "The budget report now sits inside the campaign, projecting month-end spend and modelling what a change in daily budget would do. It reads like a small addition, but it turns the mid-month **should we raise the budget** argument from a hunch into a forecast.",
      },
      { type: "h2", text: "3. Audience and network reporting" },
      {
        type: "p",
        text: "You can now see performance broken down by age and gender, and segment placement reports by network: whether the ad served on Search, YouTube or Display. Two benefits — knowing where your brand actually appears, and seeing which network is absorbing the budget.",
      },
      {
        type: "quote",
        text: "You do not fix Performance Max with more settings. You fix it with better data — the campaign gives back exactly what you feed it.",
      },
      { type: "h2", text: "4. Experiments and product overlap" },
      {
        type: "p",
        text: "Experiments let you test Performance Max against Shopping or Search, and the **uplift** experiment measures what it genuinely adds on top of existing campaigns. The product overlap report shows which products compete across several campaigns at once; in multi-campaign accounts that is usually where the budget bids against itself.",
      },
      { type: "h2", text: "The takeaway" },
      {
        type: "p",
        text: "The 2026 additions do not rewrite Performance Max, they make it auditable. Our order of operations: exclude existing customers first, clean up product overlap second, decide with an experiment last. In most accounts those three steps return more than launching another campaign.",
      },
    ],
    sources: [
      {
        label:
          "Search Engine Journal — Google Adds New Performance Max Controls And Reporting Features",
        url: "https://www.searchenginejournal.com/google-adds-new-performance-max-controls-and-reporting-features/570588/",
      },
      {
        label: "Practical Ecommerce — 3 Performance Max Updates for 2026",
        url: "https://www.practicalecommerce.com/3-performance-max-updates-for-2026",
      },
    ],
  },
};
