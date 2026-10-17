-- Site analizi talepleri (cms/collections/SiteAuditLeads.ts) için tablo.
-- Yayındaki veritabanında migration sistemi yok; bu dosya Neon SQL Editor'da
-- kod yayınlanmadan ÖNCE bir kez çalıştırılır. Tekrar çalıştırmak zararsızdır.
-- Var olan hiçbir tabloyu silmez ya da değiştirmez; yalnız ekleme yapar.

DO $$ BEGIN
  CREATE TYPE "public"."enum_site_audit_leads_status" AS ENUM('new', 'contacted', 'won', 'lost');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS "site_audit_leads" (
  "id" serial PRIMARY KEY NOT NULL,
  "name" varchar NOT NULL,
  "email" varchar NOT NULL,
  "phone" varchar,
  "website" varchar NOT NULL,
  "score" numeric,
  "status" "enum_site_audit_leads_status" DEFAULT 'new',
  "summary" varchar,
  "locale" varchar,
  "notes" varchar,
  "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "site_audit_leads_updated_at_idx" ON "site_audit_leads" USING btree ("updated_at");
CREATE INDEX IF NOT EXISTS "site_audit_leads_created_at_idx" ON "site_audit_leads" USING btree ("created_at");

-- Panelin "belge kilidi" tablosu her koleksiyon için bir ilişki sütunu bekler.
ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "site_audit_leads_id" integer;

DO $$ BEGIN
  ALTER TABLE "payload_locked_documents_rels"
    ADD CONSTRAINT "payload_locked_documents_rels_site_audit_leads_fk"
    FOREIGN KEY ("site_audit_leads_id") REFERENCES "public"."site_audit_leads"("id")
    ON DELETE cascade ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_site_audit_leads_id_idx"
  ON "payload_locked_documents_rels" USING btree ("site_audit_leads_id");
