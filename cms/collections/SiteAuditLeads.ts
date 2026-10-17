import type { CollectionConfig } from "payload";
import { authenticated } from "../access";

/**
 * Site analizi aracında tam raporu isteyen ziyaretçiler (potansiyel müşteri).
 * Kayıtlar yalnız /api/site-audit/lead üzerinden, sunucu tarafında oluşturulur;
 * panelde giriş yapmış kullanıcılar görür ve durumunu günceller.
 *
 * Yayındaki veritabanında migration sistemi yok: bu koleksiyonun tablosu
 * docs/site-audit-leads.sql ile elle oluşturulur.
 */
export const SiteAuditLeads: CollectionConfig = {
  slug: "site-audit-leads",
  labels: {
    singular: { en: "Site audit request", tr: "Site analizi talebi" },
    plural: { en: "Site audit requests", tr: "Site analizi talepleri" },
  },
  admin: {
    group: { en: "Customers", tr: "Müşteriler" },
    useAsTitle: "name",
    defaultColumns: ["createdAt", "name", "website", "score", "status"],
    description: {
      tr: "Sitedeki ücretsiz analiz aracında tam raporu isteyen kişiler.",
      en: "People who requested the full report from the free site audit tool.",
    },
  },
  access: {
    read: authenticated,
    create: () => false,
    update: authenticated,
    delete: authenticated,
  },
  defaultSort: "-createdAt",
  fields: [
    { name: "name", type: "text", required: true, label: { en: "Name", tr: "Ad soyad" } },
    { name: "email", type: "email", required: true, label: { en: "Email", tr: "E-posta" } },
    { name: "phone", type: "text", label: { en: "Phone", tr: "Telefon" } },
    { name: "website", type: "text", required: true, label: { en: "Website", tr: "Site" } },
    { name: "score", type: "number", label: { en: "Score", tr: "Puan" } },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      label: { en: "Status", tr: "Durum" },
      options: [
        { value: "new", label: { en: "New", tr: "Yeni" } },
        { value: "contacted", label: { en: "Contacted", tr: "Görüşüldü" } },
        { value: "won", label: { en: "Won", tr: "Müşteri oldu" } },
        { value: "lost", label: { en: "Lost", tr: "Olmadı" } },
      ],
    },
    {
      name: "summary",
      type: "textarea",
      label: { en: "Findings", tr: "Bulgular" },
      admin: { readOnly: true },
    },
    { name: "locale", type: "text", label: { en: "Language", tr: "Dil" }, admin: { readOnly: true } },
    { name: "notes", type: "textarea", label: { en: "Notes", tr: "Notlar" } },
  ],
};
