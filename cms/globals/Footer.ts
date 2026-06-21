import type { GlobalConfig } from "payload";

export const Footer: GlobalConfig = {
  slug: "footer",
  label: { en: "Footer", tr: "Altbilgi" },
  access: { read: () => true },
  admin: { group: { en: "Layout", tr: "Yerleşim" } },
  fields: [
    {
      name: "tagline",
      type: "textarea",
      required: true,
      localized: true,
      label: { en: "Tagline", tr: "Slogan" },
    },
    {
      name: "location",
      type: "text",
      required: true,
      localized: true,
      defaultValue: "İstanbul, Türkiye",
      label: { en: "Location", tr: "Konum" },
    },
    {
      name: "servicesLinks",
      type: "array",
      label: { en: "Services column", tr: "Hizmetler kolonu" },
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
        },
      ],
    },
    {
      name: "companyLinks",
      type: "array",
      label: { en: "Company column", tr: "Şirket kolonu" },
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
        },
      ],
    },
    {
      name: "contact",
      type: "group",
      label: { en: "Contact", tr: "İletişim" },
      fields: [
        {
          name: "email",
          type: "email",
          required: true,
          defaultValue: "hello@enterbird.com",
        },
        { name: "phoneDisplay", type: "text", label: "Phone (display)" },
        {
          name: "phoneE164",
          type: "text",
          label: "Phone (E.164, with +)",
          admin: { description: "ör. +905425995077" },
        },
        { name: "whatsappNumber", type: "text", label: "WhatsApp number (no +)" },
        { name: "instagramUrl", type: "text", label: "Instagram URL" },
        { name: "linkedinUrl", type: "text", label: "LinkedIn URL" },
      ],
    },
    {
      name: "madeWith",
      type: "text",
      required: true,
      localized: true,
      defaultValue: "Made with care in İstanbul.",
      label: { en: "Made-with line", tr: "Made-with satırı" },
    },
    {
      name: "rights",
      type: "text",
      required: true,
      localized: true,
      defaultValue: "Tüm hakları saklıdır.",
      label: { en: "Rights line", tr: "Haklar satırı" },
    },
  ],
};
