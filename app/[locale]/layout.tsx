import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeScript } from "@/components/ThemeScript";
import { GoogleAnalytics } from "@/components/Analytics";
import { routing } from "@/i18n/routing";
import { SITE_URL, GOOGLE_SITE_VERIFICATION } from "@/lib/site";
import { EMAIL, PHONE_HREF, INSTAGRAM_URL, LINKEDIN_URL } from "@/lib/contact";

// İçerik CMS'ten geldiği için sayfalar her istekte taze render edilir.
// Aksi halde sayfalar build anında statik dondurulur ve editörün panelden
// yaptığı değişiklikler yeniden deploy edilene kadar sitede görünmezdi.
export const dynamic = "force-dynamic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: {
      default: t("title"),
      template: `%s · ${t("siteName")}`,
    },
    description: t("description"),
    metadataBase: new URL("https://enterbird.com"),
    verification: GOOGLE_SITE_VERIFICATION
      ? { google: GOOGLE_SITE_VERIFICATION }
      : undefined,
    openGraph: {
      title: t("title"),
      description: t("ogDescription"),
      url: "https://enterbird.com",
      siteName: t("siteName"),
      locale: locale === "tr" ? "tr_TR" : "en_US",
      type: "website",
      images: [
        {
          url: "/logo_ai.png",
          width: 1024,
          height: 1024,
          alt: t("siteName"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("ogDescription"),
      images: ["/logo_ai.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "meta" });

  // Şirketin kim olduğunu arama motorlarına ve yapay zekâ araçlarına anlatan
  // kimlik kartı. Hizmet sayfaları "sağlayıcı" olarak buradaki @id'ye bağlanır.
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Enterbird",
        alternateName: "Enterbird AI Digital",
        url: SITE_URL,
        logo: `${SITE_URL}/logo_ai.png`,
        description: t("description"),
        email: EMAIL,
        telephone: PHONE_HREF,
        sameAs: [INSTAGRAM_URL, LINKEDIN_URL],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: t("siteName"),
        inLanguage: locale,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <ThemeProvider>
          <NextIntlClientProvider>
            <Header locale={locale} />
            <main className="flex-1">{children}</main>
            <Footer locale={locale} />
            <WhatsAppButton />
          </NextIntlClientProvider>
        </ThemeProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
