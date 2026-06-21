import type { CollectionConfig } from "payload";
import { contentAccess } from "../access";

export const TeamMembers: CollectionConfig = {
  slug: "team-members",
  labels: {
    singular: { en: "Team Member", tr: "Ekip Üyesi" },
    plural: { en: "Team Members", tr: "Ekip Üyeleri" },
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
      name: "name",
      type: "text",
      required: true,
      label: { en: "Name", tr: "İsim" },
    },
    {
      name: "role",
      type: "text",
      required: true,
      localized: true,
      label: { en: "Role", tr: "Görev" },
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      required: false,
      label: { en: "Photo", tr: "Fotoğraf" },
    },
    {
      name: "linkedinUrl",
      type: "text",
      required: false,
      label: { en: "LinkedIn URL", tr: "LinkedIn Bağlantısı" },
    },
  ],
};
