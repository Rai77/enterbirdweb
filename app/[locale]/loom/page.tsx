import type { Metadata } from "next";
import { Fragment } from "react";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import {
  ArrowRight,
  Sparkles,
  Mail,
  Globe,
  Check,
  X,
  ShoppingBag,
  BarChart3,
  Mails,
  PenTool,
  Shield,
  Layers,
} from "lucide-react";

import { getGlobalContent } from "@/lib/cms";
import type { AppLocale } from "@/cms/localization";
import type { LoomPageDoc } from "@/cms/types/globals";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const doc = await getGlobalContent<LoomPageDoc>(
    "loom-page",
    locale as AppLocale,
  );
  return {
    title: doc?.meta?.title ?? "Loom Commerce",
    description: doc?.meta?.description ?? undefined,
  };
}

const moduleIcons = [ShoppingBag, BarChart3, Mails, PenTool, Shield];

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

export default async function LoomPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const loom = await getGlobalContent<LoomPageDoc>(
    "loom-page",
    locale as AppLocale,
  );

  if (!loom) {
    return (
      <Section>
        <Container>
          <p className="text-muted">Loom page content not yet configured.</p>
        </Container>
      </Section>
    );
  }

  const problemItems = loom.problem.items ?? [];
  const moduleItems = loom.modules.items ?? [];
  const comparisonRows = loom.comparison.rows ?? [];
  const techItems = loom.tech.items ?? [];
  const targetItems = loom.target.items ?? [];

  return (
    <>
      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,#000_30%,transparent_80%)]" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="aurora-1 absolute -top-40 left-1/2 h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-brand-2/30 blur-[160px]" />
          <div className="aurora-2 absolute top-20 left-[8%] h-[420px] w-[420px] rounded-full bg-brand/25 blur-[140px]" />
          <div className="aurora-3 absolute top-10 right-[6%] h-[460px] w-[460px] rounded-full bg-brand-3/25 blur-[140px]" />
        </div>

        <Container size="wide" className="relative">
          <Reveal>
            <div className="mx-auto max-w-4xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-muted backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-brand" />
                {loom.hero.eyebrow}
              </span>

              <div className="mt-8 inline-flex items-center gap-3">
                <span className="relative inline-flex h-12 w-12 items-center justify-center">
                  <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand via-brand-2 to-brand-3 opacity-90 blur-[2px]" />
                  <span className="absolute inset-[2px] rounded-[14px] bg-background" />
                  <Layers
                    className="relative h-6 w-6 text-foreground"
                    strokeWidth={1.8}
                  />
                </span>
                <span className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {loom.hero.brand}
                </span>
              </div>

              <h1 className="mt-6 text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl md:text-[88px]">
                <span className="text-gradient">{loom.hero.tagline}</span>
              </h1>

              <p className="mx-auto mt-7 max-w-2xl text-base text-muted sm:text-lg">
                {richString(loom.hero.description)}
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="mailto:hello@loom.co"
                  className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:bg-foreground/90"
                >
                  {loom.hero.primaryCta}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#modules"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/40 px-6 py-3 text-sm font-medium text-foreground backdrop-blur-md transition hover:bg-surface"
                >
                  {loom.hero.secondaryCta}
                </a>
              </div>

              <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-300">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                {loom.hero.badge}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ==================== PROBLEM ==================== */}
      <Section>
        <Container size="wide">
          <Reveal>
            <SectionHeading
              eyebrow={loom.problem.eyebrow}
              title={
                <>
                  {loom.problem.title}{" "}
                  <span className="text-gradient">
                    {loom.problem.titleHighlight}
                  </span>
                  {loom.problem.titleSuffix}
                </>
              }
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {problemItems.map((p, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-3xl border border-border bg-surface/40 p-7"
                >
                  <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-brand-3/10 blur-3xl" />
                  <div className="relative">
                    <div className="text-xs font-mono text-muted">0{i + 1}</div>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-sm text-muted">{p.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-10 max-w-3xl text-base text-muted sm:text-lg">
              {loom.problem.closing}
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ==================== MODULES ==================== */}
      <Section id="modules">
        <Container size="wide">
          <Reveal>
            <SectionHeading
              eyebrow={loom.modules.eyebrow}
              title={
                <>
                  {loom.modules.title}{" "}
                  <span className="text-gradient">
                    {loom.modules.titleHighlight}
                  </span>
                  {loom.modules.titleSuffix}
                </>
              }
              description={loom.modules.description}
            />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-16 space-y-6">
              {moduleItems.map((m, i) => {
                const Icon = moduleIcons[i] ?? ShoppingBag;
                return (
                  <div
                    key={m.code}
                    className="group relative overflow-hidden rounded-3xl border border-border bg-surface/40 p-8 transition hover:border-brand-2/60 sm:p-10"
                  >
                    <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-brand-2/10 blur-3xl transition group-hover:bg-brand-2/20" />
                    <div className="relative grid gap-6 md:grid-cols-12 md:items-start md:gap-10">
                      <div className="md:col-span-3">
                        <div className="flex items-start gap-4">
                          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-border bg-background/80 text-brand">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="text-xs font-mono text-muted">
                            {m.code} / 05
                          </div>
                        </div>
                      </div>
                      <div className="md:col-span-9">
                        <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                          {m.name}
                        </h3>
                        <p className="mt-1 text-base text-gradient font-medium">
                          {m.subtitle}
                        </p>
                        <p className="mt-4 max-w-2xl text-sm text-muted sm:text-base">
                          {m.description}
                        </p>
                        <div className="mt-5 inline-flex flex-wrap items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1.5 text-xs text-muted">
                          <span className="h-1 w-1 rounded-full bg-brand" />
                          {m.example}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ==================== COMPARISON ==================== */}
      <Section>
        <Container size="wide">
          <Reveal>
            <SectionHeading
              eyebrow={loom.comparison.eyebrow}
              title={
                <>
                  {loom.comparison.title}{" "}
                  <span className="text-gradient">
                    {loom.comparison.titleHighlight}
                  </span>
                  {loom.comparison.titleSuffix}
                </>
              }
              description={loom.comparison.description}
            />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-14 overflow-hidden rounded-3xl border border-border bg-surface/40">
              <div className="grid grid-cols-[1.2fr_1fr_1.2fr] gap-px bg-border/60 text-sm sm:grid-cols-[1.4fr_1fr_1.4fr]">
                <div className="bg-surface/60 px-5 py-4 text-xs font-semibold uppercase tracking-widest text-muted">
                  {loom.comparison.headers.dim}
                </div>
                <div className="bg-surface/60 px-5 py-4 text-xs font-semibold uppercase tracking-widest text-muted">
                  {loom.comparison.headers.agency}
                </div>
                <div className="bg-gradient-to-r from-brand/10 via-brand-2/10 to-brand-3/10 px-5 py-4 text-xs font-semibold uppercase tracking-widest text-foreground">
                  <span className="text-gradient">
                    {loom.comparison.headers.loom}
                  </span>
                </div>
                {comparisonRows.map((row) => (
                  <Fragment key={row.label}>
                    <div className="bg-background/80 px-5 py-5 font-medium text-foreground">
                      {row.label}
                    </div>
                    <div className="bg-background/80 px-5 py-5 text-muted">
                      <span className="inline-flex items-start gap-2">
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-muted/60" />
                        {row.agency}
                      </span>
                    </div>
                    <div className="bg-background/90 px-5 py-5 text-foreground">
                      <span className="inline-flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                        {row.loom}
                      </span>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ==================== TECH ==================== */}
      <Section>
        <Container size="wide">
          <Reveal>
            <SectionHeading
              eyebrow={loom.tech.eyebrow}
              title={
                <>
                  {loom.tech.title}{" "}
                  <span className="text-gradient">
                    {loom.tech.titleHighlight}
                  </span>
                  {loom.tech.titleSuffix}
                </>
              }
              description={loom.tech.description}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-14 grid gap-4 md:grid-cols-2">
              {techItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-surface/40 p-5"
                >
                  <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-border bg-background/80 text-xs font-mono text-muted">
                    0{i + 1}
                  </div>
                  <div>
                    <div className="font-semibold tracking-tight">
                      {item.name}
                    </div>
                    <div className="mt-1 text-sm text-muted">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ==================== TARGET ==================== */}
      <Section>
        <Container size="wide">
          <div className="grid gap-10 md:grid-cols-12 md:items-start md:gap-14">
            <Reveal className="md:col-span-5">
              <SectionHeading
                eyebrow={loom.target.eyebrow}
                title={
                  <>
                    {loom.target.title}{" "}
                    <span className="text-gradient">
                      {loom.target.titleHighlight}
                    </span>
                    {loom.target.titleSuffix}
                  </>
                }
              />
              <p className="mt-6 text-base text-muted sm:text-lg">
                {loom.target.closing}
              </p>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-7">
              <ul className="space-y-3">
                {targetItems.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-2xl border border-border bg-surface/40 p-5 text-sm sm:text-base"
                  >
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand/15 text-brand">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-foreground/90">{item.text}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ==================== CTA ==================== */}
      <section className="relative py-20 sm:py-28">
        <Container>
          <div className="relative overflow-hidden rounded-[32px] border border-border bg-gradient-to-br from-surface to-background p-10 sm:p-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-brand-2/30 blur-[120px]" />
            <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-brand-3/25 blur-[120px]" />
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_30%,transparent_70%)]" />
            <div className="relative max-w-2xl">
              <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
                {loom.cta.title}{" "}
                <span className="text-gradient">{loom.cta.titleHighlight}</span>
                {loom.cta.titleSuffix}
              </h2>
              <p className="mt-5 text-base text-muted sm:text-lg">
                {loom.cta.description}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${loom.cta.email}`}
                  className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:bg-foreground/90"
                >
                  {loom.cta.primary}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </a>
                <a
                  href={`mailto:${loom.cta.email}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/40 px-6 py-3 text-sm font-medium text-foreground transition hover:bg-surface"
                >
                  <Mail className="h-4 w-4" />
                  {loom.cta.email}
                </a>
                <a
                  href={`https://${loom.cta.web}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/40 px-6 py-3 text-sm font-medium text-foreground transition hover:bg-surface"
                >
                  <Globe className="h-4 w-4" />
                  {loom.cta.web}
                </a>
              </div>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-300">
                <Check className="h-3.5 w-3.5" />
                {loom.cta.guarantee}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
