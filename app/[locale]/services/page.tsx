import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { CTA } from "@/components/CTA";
import { Check } from "lucide-react";
import { getCollectionContent } from "@/lib/cms";
import type { AppLocale } from "@/cms/localization";
import type { ServiceDoc } from "@/components/ServicesGrid";
import { getIcon } from "@/lib/icons";
import { toAnchorId } from "@/lib/slug";

type ServicePageDoc = ServiceDoc & {
  description: string;
  bullets?: { text: string }[];
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("services") };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const services = await getCollectionContent<ServicePageDoc>(
    "services",
    locale as AppLocale,
    { sort: "order" },
  );

  return <ServicesContent services={services} />;
}

function ServicesContent({ services }: { services: ServicePageDoc[] }) {
  const t = useTranslations("services");
  return (
    <>
      <PageHeader
        eyebrow={t("pageTitle")}
        title={
          <>
            {t("pageTitle")}{" "}
            <span className="text-gradient">{t("pageTitleHighlight")}</span>{" "}
            {t("pageTitleSuffix")}
          </>
        }
        description={t("pageDescription")}
      />

      <Section>
        <Container size="wide">
          <div className="space-y-24">
            {services.map((service, idx) => {
              const Icon = getIcon(service.iconName);
              const reverse = idx % 2 === 1;
              const bullets = (service.bullets ?? []).map((b) => b.text);
              return (
                <div
                  key={service.slug}
                  id={toAnchorId(service.slug)}
                  className={`grid scroll-mt-28 gap-12 md:grid-cols-2 md:items-center ${
                    reverse ? "md:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div>
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-surface/60 text-brand">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
                      {service.title}
                    </h2>
                    <p className="mt-4 text-base text-muted sm:text-lg">
                      {service.description}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3 text-sm">
                          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand/15 text-brand">
                            <Check className="h-3 w-3" />
                          </span>
                          <span className="text-foreground/90">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative">
                    <div className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-surface to-background p-1">
                      <div className="bg-grid absolute inset-0 opacity-30" />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand/15 via-brand-2/15 to-brand-3/20" />
                      <div className="relative grid h-full place-items-center">
                        <Icon
                          className="h-24 w-24 text-foreground/80"
                          strokeWidth={1.2}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <CTA />
    </>
  );
}
