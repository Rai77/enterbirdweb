import type { Payload } from "payload";
import trMessages from "../../messages/tr.json";
import enMessages from "../../messages/en.json";

type AboutSrc = {
  eyebrow: string;
  pageTitle: string;
  pageTitleHighlight: string;
  pageTitleSuffix: string;
  pageDescription: string;
  experience: string;
  heroStats: {
    founded: string;
    foundedValue: string;
    team: string;
    teamValue: string;
    projects: string;
    projectsValue: string;
    cities: string;
    citiesValue: string;
  };
  manifesto: {
    eyebrow: string;
    line1: string;
    line2: string;
    line3: string;
    line4: string;
    line5: string;
    line6: string;
    line7: string;
    line8: string;
  };
  story: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    titleSuffix: string;
    body1: string;
    body2: string;
    body3: string;
    caption: string;
  };
  timeline: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    titleSuffix: string;
    description: string;
    items: { year: string; title: string; text: string }[];
  };
  team: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    titleSuffix: string;
    description: string;
  };
  values: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    titleSuffix: string;
    items: Record<
      "care" | "transparency" | "speed" | "human",
      { title: string; text: string }
    >;
  };
  bigStats: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    titleSuffix: string;
    items: {
      value: number;
      suffix?: string;
      decimals?: number;
      label: string;
    }[];
  };
};

function mapAbout(src: AboutSrc) {
  const valueKeys: Array<"care" | "transparency" | "speed" | "human"> = [
    "care",
    "transparency",
    "speed",
    "human",
  ];
  return {
    eyebrow: src.eyebrow,
    pageTitle: src.pageTitle,
    pageTitleHighlight: src.pageTitleHighlight,
    pageTitleSuffix: src.pageTitleSuffix,
    pageDescription: src.pageDescription,
    experienceLabel: src.experience,
    heroStats: {
      foundedLabel: src.heroStats.founded,
      foundedValue: src.heroStats.foundedValue,
      teamLabel: src.heroStats.team,
      teamValue: src.heroStats.teamValue,
      projectsLabel: src.heroStats.projects,
      projectsValue: src.heroStats.projectsValue,
      citiesLabel: src.heroStats.cities,
      citiesValue: src.heroStats.citiesValue,
    },
    manifesto: {
      eyebrow: src.manifesto.eyebrow,
      line1: src.manifesto.line1,
      line2: src.manifesto.line2,
      line3: src.manifesto.line3,
      line4: src.manifesto.line4,
      line5: src.manifesto.line5,
      line6: src.manifesto.line6,
      line7: src.manifesto.line7,
      line8: src.manifesto.line8,
    },
    story: {
      eyebrow: src.story.eyebrow,
      title: src.story.title,
      titleHighlight: src.story.titleHighlight,
      titleSuffix: src.story.titleSuffix,
      body1: src.story.body1,
      body2: src.story.body2,
      body3: src.story.body3,
      caption: src.story.caption,
    },
    timeline: {
      eyebrow: src.timeline.eyebrow,
      title: src.timeline.title,
      titleHighlight: src.timeline.titleHighlight,
      titleSuffix: src.timeline.titleSuffix,
      description: src.timeline.description,
      items: (src.timeline.items ?? []).map((it) => ({
        year: it.year,
        title: it.title,
        text: it.text,
      })),
    },
    team: {
      eyebrow: src.team.eyebrow,
      title: src.team.title,
      titleHighlight: src.team.titleHighlight,
      titleSuffix: src.team.titleSuffix,
      description: src.team.description,
    },
    values: {
      eyebrow: src.values.eyebrow,
      title: src.values.title,
      titleHighlight: src.values.titleHighlight,
      titleSuffix: src.values.titleSuffix,
      items: valueKeys.map((k) => ({
        key: k,
        title: src.values.items[k].title,
        text: src.values.items[k].text,
      })),
    },
    bigStats: {
      eyebrow: src.bigStats.eyebrow,
      title: src.bigStats.title,
      titleHighlight: src.bigStats.titleHighlight,
      titleSuffix: src.bigStats.titleSuffix,
      items: (src.bigStats.items ?? []).map((it) => ({
        value: it.value,
        suffix: it.suffix,
        decimals: it.decimals,
        label: it.label,
      })),
    },
  };
}

export async function seedAboutPage(
  payload: Payload,
  { reset = false }: { reset?: boolean } = {},
): Promise<void> {
  const tr = mapAbout(trMessages.about as unknown as AboutSrc);
  const en = mapAbout(enMessages.about as unknown as AboutSrc);

  await payload.updateGlobal({
    slug: "about-page",
    locale: "tr",
    data: tr,
  });

  await payload.updateGlobal({
    slug: "about-page",
    locale: "en",
    data: en,
  });

  void reset;
}
