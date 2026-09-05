import type { CollectionConfig } from "payload";
import { contentAccess } from "../access";

export const Projects: CollectionConfig = {
  slug: "projects",
  labels: {
    singular: { en: "Project", tr: "Proje" },
    plural: { en: "Projects", tr: "Projeler" },
  },
  admin: {
    group: { en: "Content", tr: "İçerik" },
    useAsTitle: "title",
    defaultColumns: ["order", "slug", "title", "category"],
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
      admin: { description: "ör: ladyfaith" },
      label: { en: "Slug", tr: "Slug" },
    },
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
      label: { en: "Title", tr: "Başlık" },
    },
    {
      name: "category",
      type: "text",
      required: true,
      localized: true,
      admin: {
        description: {
          en: 'Type exactly "Kurumsal Marka" to move this record into the corporate strip on the work page instead of the project grid.',
          tr: 'Referanslar sayfasındaki kurumsal şeritte görünmesi için tam olarak "Kurumsal Marka" yazın. Başka bir şey yazarsanız proje ızgarasında görünür.',
        },
      },
      label: { en: "Category", tr: "Kategori" },
    },
    {
      name: "summary",
      type: "textarea",
      required: true,
      localized: true,
      defaultValue: "—",
      admin: {
        description: {
          en: "Shown on the project card. Corporate brand records do not display it, so the default is fine there.",
          tr: "Proje kartında görünür. Kurumsal Marka kayıtlarında gösterilmez; orada olduğu gibi bırakabilirsiniz.",
        },
      },
      label: { en: "Summary", tr: "Özet" },
    },
    {
      name: "services",
      type: "array",
      localized: true,
      label: { en: "Services", tr: "Hizmetler" },
      fields: [
        {
          name: "text",
          type: "text",
          required: true,
          label: { en: "Text", tr: "Metin" },
        },
      ],
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: false,
      label: { en: "Image", tr: "Görsel" },
    },
    {
      name: "imageExternalUrl",
      type: "text",
      required: false,
      admin: { description: "Unsplash veya dış görsel URL" },
      label: { en: "External image URL", tr: "Dış görsel URL" },
    },
    {
      name: "gradient",
      type: "text",
      required: true,
      defaultValue: "from-brand/20 via-brand-2/20 to-brand-3/20",
      admin: {
        description: {
          en: "Placeholder colours used when the project has no image. The default works — change it only if you know Tailwind gradient classes.",
          tr: "Projenin görseli yoksa kartta gösterilen renk geçişi. Varsayılan hâli çalışır; Tailwind bilmiyorsanız dokunmayın.",
        },
      },
      label: { en: "Gradient", tr: "Gradient" },
    },
    {
      name: "url",
      type: "text",
      required: false,
      admin: { description: "Client website URL" },
      label: { en: "URL", tr: "URL" },
    },
    {
      name: "ongoing",
      type: "checkbox",
      defaultValue: false,
      label: { en: "Ongoing", tr: "Devam ediyor" },
    },
  ],
};
