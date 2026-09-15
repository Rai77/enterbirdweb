/**
 * Hizmetlerin tek kapısı.
 *
 * Panelden gelen hizmet kaydını, `content/services.ts` içindeki arama motoru
 * metinleri ve sık sorulan sorularla birleştirir. Hizmetler sayfası, hizmet
 * detay sayfaları ve sitemap aynı listeyi kullanır; adresler de hep aynı
 * dönüşümden (`toAnchorId`) geçer.
 */
import { getCollectionContent } from "@/lib/cms";
import { toAnchorId } from "@/lib/slug";
import {
  serviceSeo,
  type ServiceFaq,
  type ServiceSeoLocale,
} from "@/content/services";
import type { AppLocale } from "@/cms/localization";

type ServiceRow = {
  id: string | number;
  slug: string;
  iconName: string;
  title: string;
  short: string;
  description?: string | null;
  bullets?: { text: string }[] | null;
};

export type Service = {
  /** Adres parçası, ör. "amerika-da-sirket-kurulumu". */
  anchor: string;
  iconName: string;
  title: string;
  short: string;
  description: string;
  bullets: string[];
  metaTitle: string;
  metaDescription: string;
  faq: ServiceFaq[];
};

const clean = (value: string | null | undefined) => value?.trim() ?? "";

export async function getServices(locale: AppLocale): Promise<Service[]> {
  const rows = await getCollectionContent<ServiceRow>("services", locale, {
    sort: "order",
  });

  // Panel, bir hizmetin istenen dilde çevirisi yoksa Türkçe metni döndürüyor.
  // Çeviri eksik mi diye anlamak için Türkçe kayıtla karşılaştırıyoruz.
  const trRows =
    locale === "tr"
      ? rows
      : await getCollectionContent<ServiceRow>("services", "tr", {
          sort: "order",
        });
  const trById = new Map(trRows.map((row) => [row.id, row]));

  return rows.map((row) => {
    const anchor = toAnchorId(row.slug);
    const seo: ServiceSeoLocale | undefined = serviceSeo[anchor]?.[locale];
    const tr = trById.get(row.id);
    const untranslated =
      locale !== "tr" &&
      tr !== undefined &&
      clean(tr.description) === clean(row.description);
    const fill = untranslated ? seo : undefined;

    const title = clean(fill?.title) || clean(row.title);
    const short = clean(fill?.short) || clean(row.short);

    return {
      anchor,
      iconName: clean(row.iconName),
      title,
      short,
      description: clean(fill?.description) || clean(row.description),
      bullets:
        fill?.bullets ??
        (row.bullets ?? []).map((b) => clean(b.text)).filter(Boolean),
      metaTitle: clean(seo?.metaTitle) || title,
      metaDescription: clean(seo?.metaDescription) || short,
      faq: seo?.faq ?? [],
    };
  });
}
