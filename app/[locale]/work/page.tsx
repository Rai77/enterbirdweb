import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import { Section, SectionHeading } from "@/components/Section";
import { ProjectsGrid, type ProjectDoc } from "@/components/ProjectsGrid";
import { CorporateClients } from "@/components/CorporateClients";
import { Stats } from "@/components/Stats";
import { CTA } from "@/components/CTA";
import { getCollectionContent } from "@/lib/cms";
import type { AppLocale } from "@/cms/localization";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("work") };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const projects = await getCollectionContent<ProjectDoc>(
    "projects",
    locale as AppLocale,
    { sort: "order" },
  );

  return <WorkContent projects={projects} />;
}

function WorkContent({ projects }: { projects: ProjectDoc[] }) {
  const t = useTranslations("projects");
  const nav = useTranslations("nav");
  return (
    <>
      <PageHeader
        eyebrow={nav("work")}
        title={
          <>
            {t("pageTitle")}{" "}
            <span className="text-gradient">{t("pageTitleHighlight")}</span>
            {t("pageTitleSuffix")}
          </>
        }
        description={t("pageDescription")}
      />

      <Section>
        <Container size="wide">
          <ProjectsGrid
            projects={projects}
            strings={{
              visit: t("visit"),
              ongoingBadge: t("ongoingBadge"),
            }}
          />
        </Container>
      </Section>

      <Section>
        <Container size="wide">
          <SectionHeading
            eyebrow={t("corporate.eyebrow")}
            title={
              <>
                {t("corporate.title")}{" "}
                <span className="text-gradient">
                  {t("corporate.titleHighlight")}
                </span>
                {t("corporate.titleSuffix")}
              </>
            }
            description={t("corporate.description")}
          />
          <div className="mt-12">
            <CorporateClients />
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="wide">
          <Stats />
        </Container>
      </Section>

      <CTA />
    </>
  );
}
