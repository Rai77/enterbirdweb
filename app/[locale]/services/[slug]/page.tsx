import type { Metadata } from "next";
import { createElement } from "react";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowLeft, ArrowUpRight, Check, Plus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { CTA } from "@/components/CTA";
import { getIcon } from "@/lib/icons";
import { getServices } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import type { AppLocale } from "@/cms/localization";

/**
 * Her hizmetin kendi sayfası.
 *
 * Hizmetler tek sayfada dururken "Amerika'da şirket kurma" gibi bir aramada
 * yarışacak bir sayfa yoktu. Burada her hizmet kendi başlığı, açıklaması ve
 * sık sorulan sorularıyla ayrı bir adreste yayınlanıyor.
 */

type Params = Promise<{ locale: string; slug: string }>;

async function findService(slug: string, locale: string) {
  const services = await getServices(locale as AppLocale);
  const service = services.find((item) => item.anchor === slug) ?? null;
  return { service, services };
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const { service } = await findService(slug, locale);
  if (!service) return {};

  return pageMetadata({
    locale,
    path: `/services/${service.anchor}`,
    title: service.metaTitle,
    description: service.metaDescription,
  });
}

export default async function ServicePage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const { service, services } = await findService(slug, locale);
  if (!service) notFound();

  const t = await getTranslations({ locale, namespace: "services" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const url = `${SITE_URL}/${locale}/services/${service.anchor}`;
  const others = services.filter((item) => item.anchor !== service.anchor);
  const paragraphs = service.description.split(/\n+/).filter(Boolean);

  // Hizmet + gezinti yolu + (varsa) sık sorulan sorular. Sağlayıcı, düzende
  // tanımlanan şirket kimliğine bağlanıyor.
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name: service.title,
      description: service.metaDescription,
      url,
      inLanguage: locale,
      provider: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: nav("services"),
          item: `${SITE_URL}/${locale}/services`,
        },
        { "@type": "ListItem", position: 2, name: service.title, item: url },
      ],
    },
  ];
  if (service.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: service.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
  }
  const jsonLd = { "@context": "https://schema.org", "@graph": graph };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Section className="!pb-12 !pt-28 sm:!pt-36">
        <Container size="wide">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToServices")}
          </Link>

          <div className="mt-10 grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-start">
            <div>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-surface/60 text-brand">
                {createElement(getIcon(service.iconName), {
                  className: "h-6 w-6",
                })}
              </div>
              <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
                {service.title}
              </h1>
              <p className="mt-6 text-lg text-muted sm:text-xl">
                {service.short}
              </p>
              {paragraphs.length > 0 && (
                <div className="mt-8 space-y-4 text-base leading-relaxed text-foreground/90">
                  {paragraphs.map((text) => (
                    <p key={text}>{text}</p>
                  ))}
                </div>
              )}
            </div>

            {service.bullets.length > 0 && (
              <div className="rounded-3xl border border-border bg-surface/40 p-7 sm:p-8">
                <div className="text-xs font-medium uppercase tracking-widest text-muted">
                  {t("bullets")}
                </div>
                <ul className="mt-5 space-y-3">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-sm">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand/15 text-brand">
                        <Check className="h-3 w-3" />
                      </span>
                      <span className="text-foreground/90">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Container>
      </Section>

      {service.faq.length > 0 && (
        <Section className="!pt-0">
          <Container size="default">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {t("faqTitle")}
            </h2>
            <div className="mt-8 divide-y divide-border overflow-hidden rounded-3xl border border-border">
              {service.faq.map((item) => (
                <details
                  key={item.q}
                  className="group bg-surface/30 p-6 open:bg-surface/60"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-medium [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <Plus className="mt-1 h-4 w-4 shrink-0 text-muted transition group-open:rotate-45" />
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {others.length > 0 && (
        <Section className="!pt-0">
          <Container size="wide">
            <div className="text-xs font-medium uppercase tracking-widest text-muted">
              {t("otherServices")}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {others.map((item) => (
                <Link
                  key={item.anchor}
                  href={`/services/${item.anchor}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/50 px-4 py-2 text-sm text-foreground/80 transition hover:border-brand-2/60 hover:text-foreground"
                >
                  {item.title}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <CTA />
    </>
  );
}
