import { getPayload } from "payload";
import config from "@/payload.config";
import type { AppLocale } from "@/cms/localization";

let cachedPayload: Awaited<ReturnType<typeof getPayload>> | null = null;

/** Get a cached Payload instance for server-side data fetching. */
export async function payload() {
  if (!cachedPayload) {
    cachedPayload = await getPayload({ config });
  }
  return cachedPayload;
}

/** Fetch a global by slug with locale + fallback. */
export async function getGlobalContent<T = unknown>(
  slug: string,
  locale: AppLocale = "tr",
): Promise<T | null> {
  try {
    const p = await payload();
    const doc = await p.findGlobal({
      slug: slug as never,
      locale,
      fallbackLocale: "tr",
      depth: 2,
    });
    return (doc ?? null) as T | null;
  } catch (err) {
    console.error(`[cms] getGlobalContent(${slug}) failed:`, err);
    return null;
  }
}

/** Fetch a full collection (ordered) with locale + fallback. */
export async function getCollectionContent<T = unknown>(
  slug: string,
  locale: AppLocale = "tr",
  opts: { limit?: number; sort?: string; where?: Record<string, unknown> } = {},
): Promise<T[]> {
  try {
    const p = await payload();
    const res = await p.find({
      collection: slug as never,
      locale,
      fallbackLocale: "tr",
      limit: opts.limit ?? 100,
      sort: opts.sort ?? "order",
      where: opts.where as never,
      depth: 2,
    });
    return (res?.docs ?? []) as T[];
  } catch (err) {
    console.error(`[cms] getCollectionContent(${slug}) failed:`, err);
    return [];
  }
}
