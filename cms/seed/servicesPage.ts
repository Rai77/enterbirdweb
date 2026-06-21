import type { Payload } from "payload";
import trMessages from "../../messages/tr.json";
import enMessages from "../../messages/en.json";

export async function seedServicesPage(
  payload: Payload,
  { reset = false }: { reset?: boolean } = {},
): Promise<void> {
  const sTr = trMessages.services as Record<string, unknown>;
  const sEn = enMessages.services as Record<string, unknown>;

  await payload.updateGlobal({
    slug: "services-page",
    locale: "tr",
    data: {
      pageTitle: sTr.pageTitle as string,
      pageTitleHighlight: sTr.pageTitleHighlight as string,
      pageTitleSuffix: sTr.pageTitleSuffix as string,
      pageDescription: sTr.pageDescription as string,
      bulletsLabel: (sTr.bullets as string) ?? "İçeriği",
    },
  });

  await payload.updateGlobal({
    slug: "services-page",
    locale: "en",
    data: {
      pageTitle: sEn.pageTitle as string,
      pageTitleHighlight: sEn.pageTitleHighlight as string,
      pageTitleSuffix: sEn.pageTitleSuffix as string,
      pageDescription: sEn.pageDescription as string,
      bulletsLabel: (sEn.bullets as string) ?? "What's included",
    },
  });

  void reset;
}
