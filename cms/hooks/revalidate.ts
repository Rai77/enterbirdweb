import { revalidatePath } from "next/cache";
import type { CollectionConfig, GlobalConfig } from "payload";

/**
 * Sayfalar önbellekten sunuluyor (bkz. app/[locale]/layout.tsx). Panelde bir
 * içerik kaydedilince veya silinince tüm sitenin önbelleği temizlenir, böylece
 * değişiklik bir sonraki ziyarette hemen görünür.
 */
function revalidateSite() {
  try {
    revalidatePath("/", "layout");
  } catch {
    // Next.js dışında çalışırken (ör. tohumlama betiği) önbellek yoktur.
  }
}

export function withRevalidate(collection: CollectionConfig): CollectionConfig {
  return {
    ...collection,
    hooks: {
      ...collection.hooks,
      afterChange: [
        ...(collection.hooks?.afterChange ?? []),
        ({ doc }) => {
          revalidateSite();
          return doc;
        },
      ],
      afterDelete: [
        ...(collection.hooks?.afterDelete ?? []),
        ({ doc }) => {
          revalidateSite();
          return doc;
        },
      ],
    },
  };
}

export function withRevalidateGlobal(global: GlobalConfig): GlobalConfig {
  return {
    ...global,
    hooks: {
      ...global.hooks,
      afterChange: [
        ...(global.hooks?.afterChange ?? []),
        ({ doc }) => {
          revalidateSite();
          return doc;
        },
      ],
    },
  };
}
