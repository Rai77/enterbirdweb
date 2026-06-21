import type { CollectionConfig } from "payload";
import { contentAccess } from "../access";

export const BlogPosts: CollectionConfig = {
  slug: "blog-posts",
  labels: {
    singular: { en: "Blog Post", tr: "Blog Yazısı" },
    plural: { en: "Blog Posts", tr: "Blog Yazıları" },
  },
  admin: {
    group: { en: "Content", tr: "İçerik" },
    useAsTitle: "title",
    defaultColumns: ["order", "slug", "title", "publishedAt"],
  },
  access: contentAccess,
  fields: [
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: { description: "for sort order (fallback when publishedAt is missing)" },
      label: { en: "Order", tr: "Sıra" },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: { description: "URL slug, e.g. ai-satis-agentlari-shopify" },
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
      label: { en: "Category", tr: "Kategori" },
      admin: { description: "e.g. AI, E-Commerce" },
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
      localized: true,
      label: { en: "Excerpt", tr: "Özet" },
    },
    {
      name: "content",
      type: "richText",
      localized: true,
      required: false,
      label: { en: "Content", tr: "İçerik" },
      admin: { description: "Full article body (optional for now)" },
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      required: false,
      label: { en: "Cover Image", tr: "Kapak Görseli" },
    },
    {
      name: "readingMinutes",
      type: "number",
      defaultValue: 5,
      label: { en: "Reading minutes", tr: "Okuma süresi (dk)" },
    },
    {
      name: "publishedAt",
      type: "date",
      required: true,
      label: { en: "Published at", tr: "Yayın tarihi" },
    },
    {
      name: "tags",
      type: "array",
      localized: true,
      label: { en: "Tags", tr: "Etiketler" },
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
