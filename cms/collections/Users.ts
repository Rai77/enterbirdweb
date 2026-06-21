import type { CollectionConfig } from "payload";
import { adminOnly, adminOrSelf, adminFieldLevel } from "../access";

export const Users: CollectionConfig = {
  slug: "users",
  labels: {
    singular: { en: "User", tr: "Kullanıcı" },
    plural: { en: "Users", tr: "Kullanıcılar" },
  },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["name", "email", "role"],
    group: { en: "System", tr: "Sistem" },
  },
  auth: true,
  access: {
    // Listeyi/kaydı yalnız giriş yapmışlar görür; editör yalnız kendini.
    read: adminOrSelf,
    // Yeni kullanıcıyı YALNIZ admin oluşturabilir (anonim kayıt kapalı).
    create: adminOnly,
    // Admin herkesi, editör yalnız kendini günceller.
    update: adminOrSelf,
    // Silme yalnız admin.
    delete: adminOnly,
    // Panele giriş için en az giriş yapmış olmak gerekir.
    // (admin erişimi yalnız boolean döndürebilir — Access tipi değil.)
    admin: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: { en: "Name", tr: "Ad Soyad" },
    },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      label: { en: "Role", tr: "Rol" },
      options: [
        { label: { en: "Admin (full access)", tr: "Admin (tam yetki)" }, value: "admin" },
        { label: { en: "Editor (content only)", tr: "Editör (yalnız içerik)" }, value: "editor" },
      ],
      admin: {
        description:
          "Editör: içeriği düzenler. Admin: ayrıca kullanıcı ekler/siler ve rol atar. Rolü yalnız admin değiştirebilir.",
      },
      access: {
        // Rol alanını yalnız admin yazabilir → editör kendini admin yapamaz.
        create: adminFieldLevel,
        update: adminFieldLevel,
      },
    },
  ],
};
