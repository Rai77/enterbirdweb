import type { CollectionConfig } from "payload";
import { contentAccess } from "../access";

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: { en: "Media", tr: "Görsel" },
    plural: { en: "Media", tr: "Görseller" },
  },
  admin: { group: { en: "Content", tr: "İçerik" } },
  access: contentAccess,
  fields: [
    { name: "alt", type: "text", label: { en: "Alt text", tr: "Alternatif metin" } },
  ],
  upload: {
    staticDir: "media",
    imageSizes: [
      { name: "thumb", width: 300, height: 300, position: "centre" },
      { name: "card", width: 1200 },
      { name: "og", width: 1200, height: 630, position: "centre" },
    ],
    mimeTypes: ["image/*"],
  },
};
