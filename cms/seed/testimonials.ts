import type { Payload } from "payload";
import trMessages from "../../messages/tr.json";
import enMessages from "../../messages/en.json";
import { clearCollection, isCollectionEmpty } from "./_utils";

type TestimonialSource = { quote: string; name: string; role: string };

export async function seedTestimonials(
  payload: Payload,
  { reset = false }: { reset?: boolean } = {},
): Promise<void> {
  const slug = "testimonials";

  if (reset) {
    await clearCollection(payload, slug);
  } else if (!(await isCollectionEmpty(payload, slug))) {
    return;
  }

  const trTests = trMessages.testimonials as TestimonialSource[];
  const enTests = enMessages.testimonials as TestimonialSource[];

  for (const [i, tTr] of trTests.entries()) {
    const tEn = enTests[i];
    const doc = await payload.create({
      collection: "testimonials",
      locale: "tr",
      data: {
        order: i,
        name: tTr.name,
        role: tTr.role,
        quote: tTr.quote,
        brand: "",
      },
    });

    if (tEn) {
      await payload.update({
        collection: "testimonials",
        id: doc.id,
        locale: "en",
        data: { role: tEn.role, quote: tEn.quote },
      });
    }
  }
}
