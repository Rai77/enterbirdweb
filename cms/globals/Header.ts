import type { GlobalConfig } from "payload";

export const Header: GlobalConfig = {
  slug: "header",
  label: { en: "Header", tr: "Başlık Çubuğu" },
  access: { read: () => true },
  admin: { group: { en: "Layout", tr: "Yerleşim" } },
  fields: [
    {
      name: "nav",
      type: "array",
      label: { en: "Navigation Items", tr: "Menü Öğeleri" },
      minRows: 1,
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
          localized: true,
          label: { en: "Label", tr: "Etiket" },
        },
        {
          name: "href",
          type: "text",
          required: true,
          label: { en: "Link", tr: "Bağlantı" },
          admin: { description: "ör: /services" },
        },
        {
          name: "highlight",
          type: "checkbox",
          label: { en: "Highlight (gradient pill)", tr: "Öne çıkar (gradient)" },
          defaultValue: false,
        },
      ],
    },
    {
      name: "ctaLabel",
      type: "text",
      required: true,
      localized: true,
      defaultValue: "Teklif Al",
      label: { en: "CTA Label", tr: "CTA Etiketi" },
    },
    {
      name: "ctaHref",
      type: "text",
      required: true,
      defaultValue: "/contact",
      label: { en: "CTA Link", tr: "CTA Bağlantısı" },
    },
  ],
};
