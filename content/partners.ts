/**
 * Ana sayfadaki "Partnerlikler" bölümünün içeriği.
 *
 * Partner sayısı az ve nadiren değişiyor; bu yüzden panel yerine burada
 * duruyor. Yeni partner eklemek için listeye bir kayıt eklemek ve logoyu
 * `public/logos/` içine koymak yeterli — bölüm kendiliğinden büyür.
 *
 * `logoWidth` / `logoHeight` görselin gerçek ölçüsü olmalı: Next.js sayfayı
 * çizerken yeri baştan ayırır, böylece logo yüklendiğinde metinler zıplamaz.
 */

export type Partner = {
  /** Kart anahtarı ve logo alt metni için marka adı. */
  name: string;
  /** Partnerin kendi sitesi. */
  url: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  tr: { role: string; description: string };
  en: { role: string; description: string };
};

export const partners: Partner[] = [
  {
    name: "Adira",
    url: "https://www.adira.com.tr/",
    logo: "/logos/adira.png",
    logoWidth: 848,
    logoHeight: 381,
    tr: {
      role: "Bilgi Teknolojileri & Altyapı",
      description:
        "Adira Bilişim ve Danışmanlık, 25 yılı aşkın deneyimiyle kurumsal BT altyapısı kuruyor ve yönetiyor: sistem ve ağ yönetimi, bulut ve yedekleme, BT güvenliği, veri merkezi ve son kullanıcı desteği. Dijital büyüme projelerimizde altyapı tarafını birlikte planlıyoruz.",
    },
    en: {
      role: "IT & Infrastructure",
      description:
        "Adira Bilişim ve Danışmanlık builds and runs enterprise IT infrastructure with over 25 years of experience: systems and network management, cloud and backup, IT security, data centre operations and end-user support. We plan the infrastructure side of our growth projects together.",
    },
  },
];
