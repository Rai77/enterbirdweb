import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import { SiteAudit } from "@/components/SiteAudit";
import { PAGE_COPY } from "@/lib/siteAudit/pageCopy";
import { WHATSAPP_NUMBER } from "@/lib/contact";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = PAGE_COPY[locale === "en" ? "en" : "tr"];
  return pageMetadata({
    locale,
    path: "/site-analizi",
    title: c.seoTitle,
    description: c.seoDescription,
  });
}

export default async function SiteAuditPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = locale === "en" ? "en" : "tr";
  const c = PAGE_COPY[lang];

  return (
    <>
      <PageHeader
        eyebrow={c.eyebrow}
        title={
          <>
            {c.title} <span className="text-gradient">{c.titleHighlight}</span>
          </>
        }
        description={c.description}
      />
      <section className="relative pb-24">
        <Container size="default" className="-mt-10">
          <SiteAudit locale={lang} whatsappNumber={WHATSAPP_NUMBER} />
        </Container>
      </section>
    </>
  );
}
