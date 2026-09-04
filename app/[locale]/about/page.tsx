import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/Container";
import { Section, SectionHeading } from "@/components/Section";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";
import { Heart, Eye, Zap, Users, Sparkles, MapPin } from "lucide-react";

import { getGlobalContent, getCollectionContent } from "@/lib/cms";
import type { AppLocale } from "@/cms/localization";
import type { AboutPageDoc, CTABlockDoc } from "@/cms/types/globals";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("about") };
}

// Team member shape — mirrored from `cms/collections/TeamMembers.ts`.
type TeamMemberDoc = {
  id: string | number;
  name: string;
  role: string;
  photo?: { url?: string | null } | string | null;
  linkedinUrl?: string | null;
};

const valueIcons: Record<
  "care" | "transparency" | "speed" | "human",
  typeof Heart
> = {
  care: Heart,
  transparency: Eye,
  speed: Zap,
  human: Users,
};

// NOT: Ekip bölümü geçici olarak kaldırıldı. Gerçek fotoğraflar geldiğinde
// bu liste ve aşağıdaki JSX bloğu (TEAM) birlikte geri açılacak.
// NOTE: Team section temporarily hidden; restore both this array and
// the TEAM JSX block below when real photos are available.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const teamPortraits = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80&auto=format&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80&auto=format&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&q=80&auto=format&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=80&auto=format&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&q=80&auto=format&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=80&auto=format&fit=crop&crop=faces",
];

// Ofisin bulunduğu bina: Aqua Florya, Bakırköy/İstanbul.
// Kaynak: Wikimedia Commons — "AquaFlorya - panoramio.jpg", CC BY-SA 3.0.
// Lisans künye zorunlu kıldığı için görselin altında kaynak satırı gösteriliyor.
// Dosya 4:5 dikey çerçeveye sağdan kırpıldı (bina kadrajda kalsın diye).
const officeImage = "/about/aqua-florya.jpg";

const officeImageCredit = {
  author: "Stomatoloq Fərid Zey…",
  sourceUrl:
    "https://commons.wikimedia.org/wiki/File:AquaFlorya_-_panoramio.jpg",
  license: "CC BY-SA 3.0",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
};

// Replace <strong>…</strong> runs with a highlighted inline span.
function richString(text: string, strongClass = "text-foreground") {
  const parts = text.split(/(<strong>.*?<\/strong>)/g);
  return parts.map((part, i) => {
    const m = part.match(/^<strong>(.*?)<\/strong>$/);
    if (m)
      return (
        <span key={i} className={strongClass}>
          {m[1]}
        </span>
      );
    return <span key={i}>{part}</span>;
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [about, cta, team] = await Promise.all([
    getGlobalContent<AboutPageDoc>("about-page", locale as AppLocale),
    getGlobalContent<CTABlockDoc>("cta-block", locale as AppLocale),
    getCollectionContent<TeamMemberDoc>("team-members", locale as AppLocale, {
      sort: "order",
    }),
  ]);

  // `team` is reserved for when the TEAM block below is re-enabled.
  void team;

  if (!about) {
    return (
      <Section>
        <Container>
          <p className="text-muted">About page content not yet configured.</p>
        </Container>
      </Section>
    );
  }

  const heroStats = [
    { label: about.heroStats.foundedLabel, value: about.heroStats.foundedValue },
    {
      label: about.heroStats.projectsLabel,
      value: about.heroStats.projectsValue,
    },
    { label: about.heroStats.citiesLabel, value: about.heroStats.citiesValue },
  ];

  const manifestoLines = [
    { text: about.manifesto.line1, highlight: false },
    { text: about.manifesto.line2, highlight: false },
    { text: about.manifesto.line3, highlight: false },
    { text: about.manifesto.line4, highlight: false },
    { text: about.manifesto.line5, highlight: true },
    { text: about.manifesto.line6, highlight: false },
    { text: about.manifesto.line7, highlight: false },
    { text: about.manifesto.line8, highlight: true },
  ];

  // Panelde "story.caption" boş bırakılmış — o zaman ofis adresinden türetilen
  // konum etiketini göster. Panele bir şey yazılırsa o kazanır.
  const storyCaption =
    about.story.caption?.trim() ||
    (locale === "tr"
      ? "Aqua Florya E-Ofis · Bakırköy, İstanbul"
      : "Aqua Florya E-Office · Bakırköy, Istanbul");

  const officeImageAlt =
    locale === "tr"
      ? "Aqua Florya, Bakırköy — Enterbird ofisinin bulunduğu bina"
      : "Aqua Florya, Bakırköy — the building housing the Enterbird office";

  const timelineItems = about.timeline.items ?? [];
  const bigStats = about.bigStats.items ?? [];
  const valueItems = about.values.items ?? [];

  return (
    <>
      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden pt-24 pb-20 sm:pt-32 sm:pb-28">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_65%_55%_at_50%_20%,#000_30%,transparent_80%)]" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="aurora-1 absolute -top-40 left-1/2 h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-brand-2/25 blur-[140px]" />
          <div className="aurora-2 absolute top-20 left-[5%] h-[380px] w-[380px] rounded-full bg-brand/20 blur-[130px]" />
          <div className="aurora-3 absolute top-10 right-[5%] h-[420px] w-[420px] rounded-full bg-brand-3/25 blur-[140px]" />
        </div>

        <Container size="wide" className="relative">
          <Reveal>
            <div className="mx-auto max-w-4xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-muted backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-brand" />
                {about.eyebrow}
              </span>
              <h1 className="mt-6 text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl md:text-[88px]">
                {about.pageTitle}{" "}
                <span className="text-gradient">{about.pageTitleHighlight}</span>
                {about.pageTitleSuffix}
              </h1>
              <p className="mx-auto mt-7 max-w-2xl text-base text-muted sm:text-lg">
                {about.pageDescription}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <dl className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border bg-border/60 sm:grid-cols-3">
              {heroStats.map((s) => (
                <div
                  key={s.label}
                  className="bg-background/80 px-6 py-7 text-center backdrop-blur-sm"
                >
                  <dt className="text-[11px] font-medium uppercase tracking-widest text-muted">
                    {s.label}
                  </dt>
                  <dd className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>

      {/* ==================== MANIFESTO ==================== */}
      <Section className="!py-28 sm:!py-40">
        <Container size="wide">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {about.manifesto.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-5xl text-balance text-3xl font-semibold leading-[1.15] tracking-tight sm:text-5xl md:text-6xl">
              {manifestoLines.map((line, i) => (
                <span key={i} className="block">
                  {line.highlight ? (
                    <span className="text-gradient">{line.text}</span>
                  ) : (
                    <span className="text-foreground/90">{line.text}</span>
                  )}
                </span>
              ))}
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ==================== STORY ==================== */}
      <Section>
        <Container size="wide">
          <div className="grid items-center gap-14 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-border">
                  <Image
                    src={officeImage}
                    alt={officeImageAlt}
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1.5 text-xs text-muted backdrop-blur-md">
                      <MapPin className="h-3.5 w-3.5 text-brand" />
                      {storyCaption}
                    </div>
                  </div>
                </div>
                <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] bg-gradient-to-br from-brand/15 via-brand-2/15 to-brand-3/15 blur-2xl" />
                <p className="mt-3 text-right text-[11px] text-muted/70">
                  <a
                    href={officeImageCredit.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-muted"
                  >
                    {officeImageCredit.author}
                  </a>
                  {" · "}
                  <a
                    href={officeImageCredit.licenseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-muted"
                  >
                    {officeImageCredit.license}
                  </a>
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="md:col-span-7">
              <SectionHeading
                eyebrow={about.story.eyebrow}
                title={
                  <>
                    {about.story.title}{" "}
                    <span className="text-gradient">
                      {about.story.titleHighlight}
                    </span>
                    {about.story.titleSuffix}
                  </>
                }
              />
              <div className="mt-8 space-y-5 text-base text-muted sm:text-lg">
                <p>{richString(about.story.body1)}</p>
                <p>{about.story.body2}</p>
                <p>{richString(about.story.body3)}</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ==================== TIMELINE ==================== */}
      <Section>
        <Container size="wide">
          <Reveal>
            <SectionHeading
              eyebrow={about.timeline.eyebrow}
              title={
                <>
                  {about.timeline.title}{" "}
                  <span className="text-gradient">
                    {about.timeline.titleHighlight}
                  </span>
                  {about.timeline.titleSuffix}
                </>
              }
              description={about.timeline.description}
            />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative mt-16">
              <div className="absolute left-[18px] top-3 bottom-3 w-px bg-gradient-to-b from-transparent via-border to-transparent md:left-1/2 md:-translate-x-1/2" />
              <ol className="space-y-10 md:space-y-16">
                {timelineItems.map((item, i) => {
                  const isEven = i % 2 === 0;
                  return (
                    <li
                      key={`${item.year}-${i}`}
                      className="relative md:grid md:grid-cols-2 md:gap-12"
                    >
                      <div
                        className={`absolute left-[10px] top-2 h-4 w-4 rounded-full border-2 border-background bg-gradient-to-br from-brand via-brand-2 to-brand-3 shadow-[0_0_0_4px_color-mix(in_oklab,var(--brand-2)_20%,transparent)] md:left-1/2 md:-translate-x-1/2`}
                      />
                      <div
                        className={`pl-12 md:pl-0 ${
                          isEven
                            ? "md:col-start-1 md:pr-12 md:text-right"
                            : "md:col-start-2 md:pl-12"
                        }`}
                      >
                        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-mono text-muted">
                          {item.year}
                        </div>
                        <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                          {item.title}
                        </h3>
                        <p className="mt-2 max-w-md text-sm text-muted sm:text-base md:max-w-none">
                          {item.text}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ==================== BIG STATS ==================== */}
      <Section>
        <Container size="wide">
          <Reveal>
            <SectionHeading
              eyebrow={about.bigStats.eyebrow}
              title={
                <>
                  {about.bigStats.title}{" "}
                  <span className="text-gradient">
                    {about.bigStats.titleHighlight}
                  </span>
                  {about.bigStats.titleSuffix}
                </>
              }
              align="center"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-16 grid gap-6 md:grid-cols-3">
              {bigStats.map((s, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-3xl border border-border bg-surface/40 p-10 text-center"
                >
                  <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-2/10 blur-3xl" />
                  <div className="relative text-6xl font-semibold tracking-tight text-gradient sm:text-7xl">
                    <Counter
                      to={s.value}
                      suffix={s.suffix ?? undefined}
                      decimals={s.decimals ?? undefined}
                    />
                  </div>
                  <div className="relative mt-4 text-sm uppercase tracking-widest text-muted">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ==================== TEAM ====================
        NOT / NOTE: Ekip fotoğraflı TEAM bölümü geçici olarak kaldırıldı.
        When real photos are ready, restore using the exact design below.

      <Section>
        <Container size="wide">
          <Reveal>
            <SectionHeading
              eyebrow={about.team.eyebrow}
              title={
                <>
                  {about.team.title}{" "}
                  <span className="text-gradient">
                    {about.team.titleHighlight}
                  </span>
                  {about.team.titleSuffix}
                </>
              }
              description={about.team.description}
            />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((m, i) => (
                <figure
                  key={m.id}
                  className="group relative overflow-hidden rounded-3xl border border-border bg-surface/40"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={teamPortraits[i % teamPortraits.length]}
                      alt={m.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover grayscale transition duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <figcaption>
                        <div className="text-lg font-semibold tracking-tight">
                          {m.name}
                        </div>
                        <div className="mt-0.5 text-xs text-muted">{m.role}</div>
                      </figcaption>
                    </div>
                  </div>
                </figure>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>
      ==================== /TEAM ==================== */}

      {/* ==================== VALUES ==================== */}
      <Section>
        <Container size="wide">
          <Reveal>
            <SectionHeading
              eyebrow={about.values.eyebrow}
              title={
                <>
                  {about.values.title}{" "}
                  <span className="text-gradient">
                    {about.values.titleHighlight}
                  </span>
                  {about.values.titleSuffix}
                </>
              }
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {valueItems.map((v, i) => {
                const Icon = valueIcons[v.key] ?? Heart;
                return (
                  <div
                    key={v.key}
                    className="group relative overflow-hidden rounded-3xl border border-border bg-surface/40 p-7 transition hover:border-brand-2/50"
                  >
                    <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-brand-2/10 blur-3xl transition group-hover:bg-brand-2/20" />
                    <div className="relative">
                      <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background/80 text-brand">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="text-xs font-mono text-muted">
                        0{i + 1} / 04
                      </div>
                      <h3 className="mt-1 text-lg font-semibold tracking-tight">
                        {v.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted">{v.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </Container>
      </Section>

      <CTA data={cta ?? undefined} />
    </>
  );
}
