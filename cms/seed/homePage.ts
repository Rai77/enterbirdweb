import type { Payload } from "payload";
import trMessages from "../../messages/tr.json";
import enMessages from "../../messages/en.json";

type HeroSrc = {
  eyebrow: string;
  socialProof: string;
  title1: string;
  title2: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  scrollHint: string;
  chips: { shopify: string; metaAds: string; tiktok: string; ai: string };
  stats: { revenue: string; roas: string; brands: string };
};

type MarqueeSrc = { eyebrow: string };

type HomeSrc = {
  services: {
    eyebrow: string;
    titleFull: string;
    titleHighlight: string;
    description: string;
  };
  projects: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    description: string;
    cta: string;
  };
  process: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    description: string;
  };
  testimonials: { eyebrow: string; title: string; titleHighlight: string };
  loom: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    titleSuffix: string;
    description: string;
    modulesLabel: string;
    learnMore: string;
    pilotBadge: string;
    chips: string[];
    modules: { name: string; subtitle: string; hint: string }[];
  };
};

type StatsSrc = {
  projects: string;
  experience: string;
  satisfaction: string;
  budget: string;
};
type ProcessStepSrc = { title: string; text: string };

// 4'lü istatistik şeridinin değerleri (etiketler messages.stats'tan gelir).
const STATS_STRIP_VALUES: Record<keyof StatsSrc, string> = {
  projects: "120+",
  experience: "8",
  satisfaction: "4.9/5",
  budget: "32M+",
};
const STATS_STRIP_ORDER: Array<keyof StatsSrc> = [
  "projects",
  "experience",
  "satisfaction",
  "budget",
];

function mapHome({
  hero,
  marquee,
  home,
  stats,
  processSteps,
}: {
  hero: HeroSrc;
  marquee: MarqueeSrc;
  home: HomeSrc;
  stats: StatsSrc;
  processSteps: ProcessStepSrc[];
}) {
  const chipOrder: Array<keyof HeroSrc["chips"]> = [
    "shopify",
    "metaAds",
    "tiktok",
    "ai",
  ];
  return {
    hero: {
      eyebrow: hero.eyebrow,
      socialProof: hero.socialProof,
      title1: hero.title1,
      title2: hero.title2,
      description: hero.description,
      primaryCta: hero.primaryCta,
      primaryCtaHref: "/contact",
      secondaryCta: hero.secondaryCta,
      secondaryCtaHref: "/work",
      scrollHint: hero.scrollHint,
      chips: chipOrder.map((k) => ({ label: hero.chips[k] })),
    },
    stats: {
      revenueLabel: hero.stats.revenue,
      revenueValue: "312%",
      roasLabel: hero.stats.roas,
      roasValue: "5.4x",
      brandsLabel: hero.stats.brands,
      brandsValue: "120+",
    },
    statsStrip: STATS_STRIP_ORDER.map((k) => ({
      value: STATS_STRIP_VALUES[k],
      label: stats[k],
    })),
    marquee: {
      eyebrow: marquee.eyebrow,
    },
    sections: {
      services: {
        eyebrow: home.services.eyebrow,
        title: home.services.titleFull,
        titleHighlight: home.services.titleHighlight,
        description: home.services.description,
      },
      projects: {
        eyebrow: home.projects.eyebrow,
        title: home.projects.title,
        titleHighlight: home.projects.titleHighlight,
        description: home.projects.description,
        cta: home.projects.cta,
      },
      process: {
        eyebrow: home.process.eyebrow,
        title: home.process.title,
        titleHighlight: home.process.titleHighlight,
        description: home.process.description,
        steps: processSteps.map((s) => ({ title: s.title, text: s.text })),
      },
      testimonials: {
        eyebrow: home.testimonials.eyebrow,
        title: home.testimonials.title,
        titleHighlight: home.testimonials.titleHighlight,
      },
      loomTeaser: {
        eyebrow: home.loom.eyebrow,
        title: home.loom.title,
        titleHighlight: home.loom.titleHighlight,
        titleSuffix: home.loom.titleSuffix,
        description: home.loom.description,
        modulesLabel: home.loom.modulesLabel,
        learnMore: home.loom.learnMore,
        pilotBadge: home.loom.pilotBadge,
        chips: (home.loom.chips ?? []).map((label) => ({ label })),
        modules: (home.loom.modules ?? []).map((m) => ({
          name: m.name,
          subtitle: m.subtitle,
          hint: m.hint,
        })),
      },
    },
  };
}

export async function seedHomePage(
  payload: Payload,
  { reset = false }: { reset?: boolean } = {},
): Promise<void> {
  const stepsFrom = (p: Record<string, { title: string; text: string }>) =>
    ["step1", "step2", "step3", "step4"].map((k) => ({
      title: p[k]?.title ?? "",
      text: p[k]?.text ?? "",
    }));

  const tr = mapHome({
    hero: trMessages.hero as unknown as HeroSrc,
    marquee: trMessages.marquee as MarqueeSrc,
    home: trMessages.home as unknown as HomeSrc,
    stats: trMessages.stats as StatsSrc,
    processSteps: stepsFrom(
      trMessages.process as unknown as Record<string, { title: string; text: string }>,
    ),
  });
  const en = mapHome({
    hero: enMessages.hero as unknown as HeroSrc,
    marquee: enMessages.marquee as MarqueeSrc,
    home: enMessages.home as unknown as HomeSrc,
    stats: enMessages.stats as StatsSrc,
    processSteps: stepsFrom(
      enMessages.process as unknown as Record<string, { title: string; text: string }>,
    ),
  });

  await payload.updateGlobal({
    slug: "home-page",
    locale: "tr",
    data: tr,
  });

  await payload.updateGlobal({
    slug: "home-page",
    locale: "en",
    data: en,
  });

  void reset;
}
