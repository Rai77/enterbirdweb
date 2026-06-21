import type { Payload } from "payload";

/** Helper: check if collection is empty. */
export async function isCollectionEmpty(
  payload: Payload,
  slug: string,
): Promise<boolean> {
  const res = await payload.find({
    collection: slug as never,
    limit: 1,
    locale: "tr",
    depth: 0,
  });
  return res.totalDocs === 0;
}

/** Helper: clear all docs in a collection. */
export async function clearCollection(
  payload: Payload,
  slug: string,
): Promise<void> {
  const res = await payload.find({
    collection: slug as never,
    limit: 1000,
    locale: "tr",
    depth: 0,
  });
  for (const doc of res.docs) {
    await payload.delete({
      collection: slug as never,
      id: (doc as { id: string | number }).id,
    });
  }
}
