import type { GlobalConfig } from "payload";

export const ServicesPage: GlobalConfig = {
  slug: "services-page",
  label: { en: "Services Page", tr: "Hizmetler Sayfası" },
  access: { read: () => true },
  admin: { group: { en: "Pages", tr: "Sayfalar" } },
  fields: [
    {
      name: "pageTitle",
      type: "text",
      required: true,
      localized: true,
      label: { en: "Page title", tr: "Sayfa başlığı" },
    },
    {
      name: "pageTitleHighlight",
      type: "text",
      required: true,
      localized: true,
      label: { en: "Title highlight", tr: "Vurgulu kelime" },
    },
    {
      name: "pageTitleSuffix",
      type: "text",
      required: true,
      localized: true,
      label: { en: "Title suffix", tr: "Başlık soneki" },
    },
    {
      name: "pageDescription",
      type: "textarea",
      required: true,
      localized: true,
      label: { en: "Page description", tr: "Sayfa açıklaması" },
    },
    {
      name: "bulletsLabel",
      type: "text",
      required: true,
      localized: true,
      defaultValue: "İçeriği",
      label: { en: "Bullets label", tr: "Madde etiketi" },
    },
  ],
};
