import type { CollectionConfig } from "payload";
import { contentAccess } from "../access";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  labels: {
    singular: { en: "Testimonial", tr: "Referans" },
    plural: { en: "Testimonials", tr: "Referanslar" },
  },
  admin: {
    group: { en: "Content", tr: "İçerik" },
    useAsTitle: "name",
    defaultColumns: ["order", "name", "role"],
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
      name: "quote",
      type: "textarea",
      required: true,
      localized: true,
      label: { en: "Quote", tr: "Alıntı" },
    },
    {
      name: "name",
      type: "text",
      required: true,
      label: { en: "Name", tr: "İsim" },
      admin: { description: "Same in both locales" },
    },
    {
      name: "role",
      type: "text",
      required: true,
      localized: true,
      label: { en: "Role", tr: "Unvan" },
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
      required: false,
      label: { en: "Avatar", tr: "Avatar" },
    },
    {
      name: "brand",
      type: "text",
      required: false,
      label: { en: "Brand", tr: "Marka" },
      admin: { description: "Optional — brand name shown after role" },
    },
  ],
};
