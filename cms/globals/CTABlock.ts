import type { GlobalConfig } from "payload";

export const CTABlock: GlobalConfig = {
  slug: "cta-block",
  label: { en: "CTA Block", tr: "CTA Bloğu" },
  access: { read: () => true },
  admin: { group: { en: "Shared", tr: "Paylaşılan" } },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
      label: { en: "Title", tr: "Başlık" },
    },
    {
      name: "titleHighlight",
      type: "text",
      required: true,
      localized: true,
      label: { en: "Title highlight", tr: "Vurgulu kelime" },
    },
    {
      name: "titleSuffix",
      type: "text",
      required: true,
      localized: true,
      label: { en: "Title suffix", tr: "Başlık soneki" },
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      localized: true,
      label: { en: "Description", tr: "Açıklama" },
    },
    {
      name: "primary",
      type: "text",
      required: true,
      localized: true,
      label: { en: "Primary CTA", tr: "Birincil CTA" },
    },
    {
      name: "emailLabel",
      type: "text",
      required: true,
      localized: true,
      defaultValue: "hello@enterbird.com",
      label: { en: "Email label", tr: "E-posta etiketi" },
    },
  ],
};
