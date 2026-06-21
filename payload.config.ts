import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import sharp from "sharp";

import { Users } from "./cms/collections/Users";
import { Media } from "./cms/collections/Media";
import { Services } from "./cms/collections/Services";
import { Projects } from "./cms/collections/Projects";
import { Testimonials } from "./cms/collections/Testimonials";
import { TeamMembers } from "./cms/collections/TeamMembers";
import { BlogPosts } from "./cms/collections/BlogPosts";

import { Header } from "./cms/globals/Header";
import { Footer } from "./cms/globals/Footer";
import { HomePage } from "./cms/globals/HomePage";
import { ServicesPage } from "./cms/globals/ServicesPage";
import { AboutPage } from "./cms/globals/AboutPage";
import { LoomPage } from "./cms/globals/LoomPage";
import { ContactPage } from "./cms/globals/ContactPage";
import { CTABlock } from "./cms/globals/CTABlock";

import { localization } from "./cms/localization";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const usePostgres = Boolean(process.env.DATABASE_URI);

// PAYLOAD_SECRET auth token'larını imzalar. Prod'da YOKSA çalıştırma durmalı —
// bilinen bir varsayılan secret oturum sahtelemeye açık kapı bırakır.
const payloadSecret =
  process.env.PAYLOAD_SECRET ??
  (process.env.NODE_ENV === "production"
    ? (() => {
        throw new Error("PAYLOAD_SECRET tanımlı değil. Prod'da bu zorunludur.");
      })()
    : "dev-only-secret-change-in-prod");

export default buildConfig({
  admin: {
    user: Users.slug,
    suppressHydrationWarning: true,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: " · Enterbird CMS",
      icons: [
        { rel: "icon", type: "image/png", url: "/logo_tr.png" },
        { rel: "apple-touch-icon", url: "/logo_tr.png" },
      ],
      openGraph: {
        title: "Enterbird CMS",
        siteName: "Enterbird",
      },
    },
    components: {
      graphics: {
        Icon: "/cms/components/AdminIcon#AdminIcon",
        Logo: "/cms/components/AdminLogo#AdminLogo",
      },
      beforeLogin: ["/cms/components/BeforeLogin#BeforeLogin"],
      beforeDashboard: ["/cms/components/BeforeDashboard#BeforeDashboard"],
    },
  },
  collections: [Users, Media, Services, Projects, Testimonials, TeamMembers, BlogPosts],
  globals: [Header, Footer, HomePage, ServicesPage, AboutPage, LoomPage, ContactPage, CTABlock],
  localization,
  editor: lexicalEditor(),
  secret: payloadSecret,
  typescript: {
    outputFile: path.resolve(dirname, "cms/payload-types.ts"),
  },
  db: usePostgres
    ? postgresAdapter({
        pool: { connectionString: process.env.DATABASE_URI! },
        push: true,
      })
    : sqliteAdapter({
        client: {
          url: process.env.SQLITE_URL ?? "file:./cms/.payload.db",
        },
      }),
  sharp,
  plugins: [
    ...(process.env.BLOB_READ_WRITE_TOKEN
      ? [
          vercelBlobStorage({
            collections: { media: true },
            token: process.env.BLOB_READ_WRITE_TOKEN,
          }),
        ]
      : []),
  ],
});
