import type { Payload } from "payload";
import trMessages from "../../messages/tr.json";
import enMessages from "../../messages/en.json";

export async function seedHeader(
  payload: Payload,
  { reset = false }: { reset?: boolean } = {},
) {
  const navTr = trMessages.nav as Record<string, string>;
  const navEn = enMessages.nav as Record<string, string>;

  const items = [
    { key: "services", href: "/services" },
    { key: "work", href: "/work" },
    { key: "loom", href: "/loom", highlight: true },
    { key: "about", href: "/about" },
    { key: "blog", href: "/blog" },
    { key: "contact", href: "/contact" },
  ];

  // TR pass — creates rows, writes TR labels
  await payload.updateGlobal({
    slug: "header",
    locale: "tr",
    data: {
      nav: items.map((it) => ({
        label: navTr[it.key] ?? it.key,
        href: it.href,
        highlight: it.highlight ?? false,
      })),
      ctaLabel: navTr.cta ?? "Teklif Al",
      ctaHref: "/contact",
    },
  });

  // Grab the assigned row IDs so we don't destroy TR rows on EN update
  const savedTr = await payload.findGlobal({
    slug: "header",
    locale: "tr",
    depth: 0,
  });
  const navRows = (savedTr.nav as Array<{ id: string; href: string; highlight?: boolean }>) ?? [];

  // EN pass — update IN PLACE using existing row IDs, only writes EN labels
  await payload.updateGlobal({
    slug: "header",
    locale: "en",
    data: {
      nav: navRows.map((row, i) => ({
        id: row.id,
        label: navEn[items[i].key] ?? items[i].key,
        href: row.href,
        highlight: row.highlight ?? false,
      })),
      ctaLabel: navEn.cta ?? "Get a Quote",
    },
  });

  void reset;
}
