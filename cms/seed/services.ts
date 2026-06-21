import type { Payload } from "payload";
import trMessages from "../../messages/tr.json";
import enMessages from "../../messages/en.json";
import { clearCollection, isCollectionEmpty } from "./_utils";

const SERVICE_IDS = [
  "ecommerce",
  "performance",
  "seo",
  "social",
  "marketplace",
  "ai",
  "design",
  "operations",
  "brand",
] as const;

const ICONS: Record<(typeof SERVICE_IDS)[number], string> = {
  ecommerce: "ShoppingBag",
  performance: "TrendingUp",
  seo: "Search",
  social: "Megaphone",
  marketplace: "Store",
  ai: "Bot",
  design: "Layout",
  operations: "Truck",
  brand: "Sparkles",
};

type ServiceContent = {
  title: string;
  short: string;
  description: string;
  bullets: string[];
};

export async function seedServices(
  payload: Payload,
  { reset = false }: { reset?: boolean } = {},
): Promise<void> {
  if (reset) await clearCollection(payload, "services");
  if (!(await isCollectionEmpty(payload, "services"))) return;

  const trItems = (trMessages.services as { items: Record<string, ServiceContent> }).items;
  const enItems = (enMessages.services as { items: Record<string, ServiceContent> }).items;

  for (const [i, id] of SERVICE_IDS.entries()) {
    const tr = trItems[id];
    const en = enItems[id];
    if (!tr || !en) {
      console.warn(`[seed:services] missing content for "${id}"`);
      continue;
    }

    const doc = await payload.create({
      collection: "services",
      locale: "tr",
      data: {
        order: i,
        slug: id,
        iconName: ICONS[id],
        title: tr.title,
        short: tr.short,
        description: tr.description,
        bullets: tr.bullets.map((text) => ({ text })),
      },
    });

    await payload.update({
      collection: "services",
      id: doc.id,
      locale: "en",
      data: {
        title: en.title,
        short: en.short,
        description: en.description,
        bullets: en.bullets.map((text) => ({ text })),
      },
    });
  }
}
