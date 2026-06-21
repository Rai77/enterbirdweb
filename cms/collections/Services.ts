import type { CollectionConfig } from "payload";
import { contentAccess } from "../access";

export const Services: CollectionConfig = {
  slug: "services",
  labels: {
    singular: { en: "Service", tr: "Hizmet" },
    plural: { en: "Services", tr: "Hizmetler" },
  },
  admin: {
    group: { en: "Content", tr: "İçerik" },
    useAsTitle: "title",
    defaultColumns: ["order", "slug", "title"],
  },
  access: contentAccess,
  fields: [
    {
      name: "order",
      type: "number",
      required: true,
      defaultValue: 0,
      admin: { description: "for sort order" },
      label: { en: "Order", tr: "Sıra" },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: { description: "ör: ecommerce" },
      label: { en: "Slug", tr: "Slug" },
    },
    {
      name: "iconName",
      type: "text",
      required: true,
      admin: {
        description: "lucide-react icon name, e.g. ShoppingBag",
      },
      label: { en: "Icon name", tr: "İkon adı" },
    },
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
      label: { en: "Title", tr: "Başlık" },
    },
    {
      name: "short",
      type: "textarea",
      required: true,
      localized: true,
      label: { en: "Short", tr: "Kısa açıklama" },
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      localized: true,
      label: { en: "Description", tr: "Açıklama" },
    },
    {
      name: "bullets",
      type: "array",
      localized: true,
      label: { en: "Bullets", tr: "Madde işaretleri" },
      fields: [
        {
          name: "text",
          type: "text",
          required: true,
          label: { en: "Text", tr: "Metin" },
        },
      ],
    },
  ],
};
