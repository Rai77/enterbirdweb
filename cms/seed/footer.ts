import type { Payload } from "payload";
import trMessages from "../../messages/tr.json";
import enMessages from "../../messages/en.json";

export async function seedFooter(
  payload: Payload,
  { reset = false }: { reset?: boolean } = {},
) {
  const fTr = trMessages.footer as Record<string, unknown>;
  const fEn = enMessages.footer as Record<string, unknown>;

  const servicesLinksTr = fTr.servicesLinks as Record<string, string>;
  const servicesLinksEn = fEn.servicesLinks as Record<string, string>;
  const companyLinksTr = fTr.companyLinks as Record<string, string>;
  const companyLinksEn = fEn.companyLinks as Record<string, string>;

  const servicesOrder = [
    "ecommerce",
    "performance",
    "seo",
    "marketplace",
    "operations",
    "ai",
  ];
  const companyOrder = ["about", "work", "blog", "contact"];

  // TR pass
  await payload.updateGlobal({
    slug: "footer",
    locale: "tr",
    data: {
      tagline: fTr.tagline as string,
      location: (fTr.location as string) ?? "İstanbul, Türkiye",
      servicesLinks: servicesOrder.map((k) => ({
        label: servicesLinksTr[k] ?? k,
        href: `/services#${k}`,
      })),
      companyLinks: companyOrder.map((k) => ({
        label: companyLinksTr[k] ?? k,
        href: `/${k}`,
      })),
      contact: {
        email: "hello@enterbird.com",
        phoneDisplay: "+90 542 599 50 77",
        phoneE164: "+905425995077",
        whatsappNumber: "905425995077",
        instagramUrl: "https://instagram.com/enterbird",
        linkedinUrl: "https://linkedin.com/company/enterbird",
      },
      madeWith: (fTr.madeWith as string) ?? "Made with care in İstanbul.",
      rights: (fTr.rights as string) ?? "Tüm hakları saklıdır.",
    },
  });

  // Pull back row IDs so EN update doesn't destroy TR labels
  const savedTr = await payload.findGlobal({
    slug: "footer",
    locale: "tr",
    depth: 0,
  });
  const srvRows =
    (savedTr.servicesLinks as Array<{ id: string; href: string }>) ?? [];
  const cmpRows =
    (savedTr.companyLinks as Array<{ id: string; href: string }>) ?? [];

  // EN pass — in-place row update
  await payload.updateGlobal({
    slug: "footer",
    locale: "en",
    data: {
      tagline: fEn.tagline as string,
      location: (fEn.location as string) ?? "Istanbul, Turkey",
      servicesLinks: srvRows.map((row, i) => ({
        id: row.id,
        label: servicesLinksEn[servicesOrder[i]] ?? servicesOrder[i],
        href: row.href,
      })),
      companyLinks: cmpRows.map((row, i) => ({
        id: row.id,
        label: companyLinksEn[companyOrder[i]] ?? companyOrder[i],
        href: row.href,
      })),
      madeWith: (fEn.madeWith as string) ?? "Made with care in Istanbul.",
      rights: (fEn.rights as string) ?? "All rights reserved.",
    },
  });

  void reset;
}
