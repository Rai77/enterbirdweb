/**
 * Kurumsal çalışmalar — referanslar sayfasındaki ayrı bölümün içeriği.
 *
 * Neden panelde değil: bu liste için panele yeni bir bölüm açmak veritabanında
 * yeni bir tablo gerektiriyor ve üretimde otomatik tablo oluşturma çalışmıyor.
 * Liste burada duruyor; eklemek/çıkarmak için tek yapılacak bu diziyi düzenlemek.
 *
 * `name` alanı markanın kendi yazımıdır, `domain` kartta küçük punto ile görünür.
 */
export type CorporateClient = {
  name: string;
  domain: string;
  url: string;
};

export const corporateClients: CorporateClient[] = [
  {
    name: "Boyner",
    domain: "boyner.com.tr",
    url: "https://www.boyner.com.tr/",
  },
  { name: "Sarar", domain: "sarar.com", url: "https://sarar.com/" },
  {
    name: "Silk and Cashmere",
    domain: "silkandcashmere.com",
    url: "https://silkandcashmere.com/",
  },
  {
    name: "Jimmy Key",
    domain: "jimmykey.com",
    url: "https://www.jimmykey.com/",
  },
  { name: "Sarev", domain: "sarev.com.tr", url: "https://www.sarev.com.tr/" },
];
