import type { Payload } from "payload";
import trMessages from "../../messages/tr.json";
import enMessages from "../../messages/en.json";

export async function seedCTABlock(
  payload: Payload,
  { reset = false }: { reset?: boolean } = {},
): Promise<void> {
  const cTr = trMessages.cta as Record<string, string>;
  const cEn = enMessages.cta as Record<string, string>;

  await payload.updateGlobal({
    slug: "cta-block",
    locale: "tr",
    data: {
      title: cTr.title,
      titleHighlight: cTr.titleHighlight,
      titleSuffix: cTr.titleSuffix,
      description: cTr.description,
      primary: cTr.primary,
      emailLabel: cTr.emailLabel ?? "hello@enterbird.com",
    },
  });

  await payload.updateGlobal({
    slug: "cta-block",
    locale: "en",
    data: {
      title: cEn.title,
      titleHighlight: cEn.titleHighlight,
      titleSuffix: cEn.titleSuffix,
      description: cEn.description,
      primary: cEn.primary,
      emailLabel: cEn.emailLabel ?? "hello@enterbird.com",
    },
  });

  void reset;
}
