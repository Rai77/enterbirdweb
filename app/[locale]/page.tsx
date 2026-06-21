import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Section, SectionHeading } from "@/components/Section";
import { ServicesGrid, type ServiceDoc } from "@/components/ServicesGrid";
import { Container } from "@/components/Container";
import { Stats } from "@/components/Stats";
import { ProjectsGrid, type ProjectDoc } from "@/components/ProjectsGrid";
import { Process } from "@/components/Process";
import { CTA } from "@/components/CTA";
import { LoomTeaser } from "@/components/LoomTeaser";
import { Testimonials, type TestimonialDoc } from "@/components/Testimonials";
import { Reveal } from "@/components/Reveal";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

import { getGlobalContent, getCollectionContent } from "@/lib/cms";
import type { AppLocale } from "@/cms/localization";
import type { HomePageDoc, CTABlockDoc } from "@/cms/types/globals";

function withHighlight(text: string, highlight: string) {
  if (!highlight || !text.includes(highlight)) return <>{text}</>;
  const idx = text.indexOf(highlight);
  const before = text.slice(0, idx);
  const after = text.slice(idx + highlight.length);
  return (
    <>
      {before}
      <span className="text-gradient">{highlight}</span>
      {after}
    </>
  );
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [home, cta, services, projects, testimonials] = await Promise.all([
    getGlobalContent<HomePageDoc>("home-page", locale as AppLocale),
    getGlobalContent<CTABlockDoc>("cta-block", locale as AppLocale),
    getCollectionContent<ServiceDoc>("services", locale as AppLocale, {
      sort: "order",
      limit: 6,
    }),
    getCollectionContent<ProjectDoc>("projects", locale as AppLocale, {
      sort: "order",
      limit: 6,
    }),
    getCollectionContent<TestimonialDoc>("testimonials", locale as AppLocale, {
      sort: "order",
      limit: 12,
    }),
  ]);

  if (!home?.hero?.title1) {
    // Global henüz seed'lenmemiş ya da içerik boş — Hero zorunlu alanlar olmadan
    // çöker. Build/runtime patlamasın diye minimal fallback render et.
    return (
      <Section>
        <Container>
          <p className="text-muted">Home page content not yet configured.</p>
        </Container>
      </Section>
    );
  }

  const { sections } = home;

  return (
    <>
      <Hero hero={home.hero} stats={home.stats} />
      <Marquee eyebrow={home.marquee.eyebrow} />

      <Section>
        <Container size="wide">
          <Reveal>
            <SectionHeading
              eyebrow={sections.services.eyebrow}
              title={withHighlight(
                sections.services.title,
                sections.services.titleHighlight,
              )}
              description={sections.services.description}
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-14">
            <ServicesGrid services={services} />
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container size="wide">
          <Reveal>
            <Stats items={home.statsStrip} />
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container size="wide">
          <Reveal>
            <LoomTeaser data={sections.loomTeaser} />
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container size="wide">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <SectionHeading
                eyebrow={sections.projects.eyebrow}
                title={withHighlight(
                  sections.projects.title,
                  sections.projects.titleHighlight,
                )}
                description={sections.projects.description}
              />
            </Reveal>
            <Link
              href="/work"
              className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/40 px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-surface"
            >
              {sections.projects.cta}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
          </div>
          <Reveal delay={0.1} className="mt-14">
            <ProjectsGrid
              projects={projects}
              strings={{
                // Home doesn't show per-card "visit" / "ongoing" strings via the
                // projects global — fall back to empty strings; ProjectsGrid only
                // renders these when a project actually has `url` / `ongoing`.
                visit: "",
                ongoingBadge: "",
              }}
              limit={4}
            />
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow={sections.process.eyebrow}
              title={withHighlight(
                sections.process.title,
                sections.process.titleHighlight,
              )}
              description={sections.process.description}
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-14">
            <Process steps={sections.process.steps} />
          </Reveal>
        </Container>
      </Section>

      {testimonials.length > 0 && (
        <Section>
          <Container size="wide">
            <Reveal>
              <SectionHeading
                eyebrow={sections.testimonials.eyebrow}
                title={withHighlight(
                  sections.testimonials.title,
                  sections.testimonials.titleHighlight,
                )}
              />
            </Reveal>
            <Reveal delay={0.1} className="mt-14">
              <Testimonials testimonials={testimonials} />
            </Reveal>
          </Container>
        </Section>
      )}

      <CTA data={cta ?? undefined} />
    </>
  );
}
