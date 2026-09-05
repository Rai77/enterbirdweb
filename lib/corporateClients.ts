/**
 * Kurumsal çalışmalar — referanslar sayfasındaki ayrı bölümün içeriği.
 *
 * İçerik panelden yönetilir: **Projeler** bölümüne kategorisi "Kurumsal Marka"
 * olan bir kayıt eklemek yeterli. O kayıt proje ızgarasında değil, kurumsal
 * şeritte görünür.
 *
 * Panele yeni bir bölüm açmak veritabanında yeni tablo gerektirdiği ve üretimde
 * otomatik tablo oluşturma çalışmadığı için mevcut Projeler koleksiyonunu
 * kullanıyoruz. Aşağıdaki liste yalnızca panelde hiç kurumsal kayıt yokken
 * devreye giren yedek — panele ilk kayıt girildiği anda tamamen devre dışı kalır.
 */
export type CorporateClient = {
  name: string;
  domain: string;
  url: string | null;
};

/** Panelde kategoriye yazılacak işaret. Küçük harfe indirilip aranır. */
export const CORPORATE_CATEGORY = "kurumsal marka";

export function isCorporateProject(project: {
  category?: string | null;
}): boolean {
  return (project.category ?? "").toLowerCase().includes(CORPORATE_CATEGORY);
}

/** "https://www.boyner.com.tr/" → "boyner.com.tr" */
export function prettyDomain(url: string | null | undefined): string {
  if (!url?.trim()) return "";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    // Panelde protokolsüz yazılmış olabilir: "boyner.com.tr/" gibi.
    return url
      .trim()
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .replace(/\/.*$/, "");
  }
}

export function toCorporateClient(project: {
  title: string;
  url?: string | null;
}): CorporateClient {
  return {
    name: project.title.trim(),
    domain: prettyDomain(project.url),
    url: project.url?.trim() || null,
  };
}

/** Panelde hiç "Kurumsal Marka" kaydı yokken gösterilen yedek liste. */
export const fallbackCorporateClients: CorporateClient[] = [
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
