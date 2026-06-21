import type { Payload } from "payload";
import trMessages from "../../messages/tr.json";
import enMessages from "../../messages/en.json";
import { projects as projectsData } from "../../lib/data";
import { clearCollection, isCollectionEmpty } from "./_utils";

type ProjectContent = {
  title: string;
  category: string;
  summary: string;
  services: string[];
};

export async function seedProjects(
  payload: Payload,
  { reset = false }: { reset?: boolean } = {},
): Promise<void> {
  if (reset) await clearCollection(payload, "projects");
  if (!(await isCollectionEmpty(payload, "projects"))) return;

  const trItems = (trMessages.projects as { items: Record<string, ProjectContent> }).items;
  const enItems = (enMessages.projects as { items: Record<string, ProjectContent> }).items;

  for (const [i, p] of projectsData.entries()) {
    const tr = trItems[p.id];
    const en = enItems[p.id];
    if (!tr || !en) {
      console.warn(`[seed:projects] missing content for "${p.id}"`);
      continue;
    }

    // We don't upload media here; external URLs go into imageExternalUrl.
    // Local files (/projects/*) also go into imageExternalUrl for now so that
    // the site keeps rendering from public/ — a future media upload seeder
    // can swap these to real Media records.
    const imageExternalUrl = p.image;

    const doc = await payload.create({
      collection: "projects",
      locale: "tr",
      data: {
        order: i,
        slug: p.id,
        title: tr.title,
        category: tr.category,
        summary: tr.summary,
        services: tr.services.map((text) => ({ text })),
        imageExternalUrl,
        gradient: p.gradient,
        url: p.url,
        ongoing: p.ongoing ?? false,
      },
    });

    await payload.update({
      collection: "projects",
      id: doc.id,
      locale: "en",
      data: {
        title: en.title,
        category: en.category,
        summary: en.summary,
        services: en.services.map((text) => ({ text })),
      },
    });
  }
}
