import type { Payload } from "payload";
import trMessages from "../../messages/tr.json";
import enMessages from "../../messages/en.json";

type LoomSrc = {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    brand: string;
    tagline: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    badge: string;
  };
  problem: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    titleSuffix: string;
    items: { title: string; text: string }[];
    closing: string;
  };
  modules: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    titleSuffix: string;
    description: string;
    items: {
      code: string;
      name: string;
      subtitle: string;
      description: string;
      example: string;
    }[];
  };
  comparison: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    titleSuffix: string;
    description: string;
    headers: { dim: string; agency: string; loom: string };
    rows: { label: string; agency: string; loom: string }[];
  };
  tech: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    titleSuffix: string;
    description: string;
    items: { name: string; desc: string }[];
  };
  target: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    titleSuffix: string;
    items: string[];
    closing: string;
  };
  cta: {
    title: string;
    titleHighlight: string;
    titleSuffix: string;
    description: string;
    primary: string;
    email: string;
    web: string;
    guarantee: string;
  };
};

function mapLoom(src: LoomSrc) {
  return {
    meta: { title: src.meta.title, description: src.meta.description },
    hero: {
      eyebrow: src.hero.eyebrow,
      brand: src.hero.brand,
      tagline: src.hero.tagline,
      description: src.hero.description,
      primaryCta: src.hero.primaryCta,
      secondaryCta: src.hero.secondaryCta,
      badge: src.hero.badge,
    },
    problem: {
      eyebrow: src.problem.eyebrow,
      title: src.problem.title,
      titleHighlight: src.problem.titleHighlight,
      titleSuffix: src.problem.titleSuffix,
      items: (src.problem.items ?? []).map((it) => ({
        title: it.title,
        text: it.text,
      })),
      closing: src.problem.closing,
    },
    modules: {
      eyebrow: src.modules.eyebrow,
      title: src.modules.title,
      titleHighlight: src.modules.titleHighlight,
      titleSuffix: src.modules.titleSuffix,
      description: src.modules.description,
      items: (src.modules.items ?? []).map((it) => ({
        code: it.code,
        name: it.name,
        subtitle: it.subtitle,
        description: it.description,
        example: it.example,
      })),
    },
    comparison: {
      eyebrow: src.comparison.eyebrow,
      title: src.comparison.title,
      titleHighlight: src.comparison.titleHighlight,
      titleSuffix: src.comparison.titleSuffix,
      description: src.comparison.description,
      headers: {
        dim: src.comparison.headers.dim,
        agency: src.comparison.headers.agency,
        loom: src.comparison.headers.loom,
      },
      rows: (src.comparison.rows ?? []).map((r) => ({
        label: r.label,
        agency: r.agency,
        loom: r.loom,
      })),
    },
    tech: {
      eyebrow: src.tech.eyebrow,
      title: src.tech.title,
      titleHighlight: src.tech.titleHighlight,
      titleSuffix: src.tech.titleSuffix,
      description: src.tech.description,
      items: (src.tech.items ?? []).map((it) => ({
        name: it.name,
        desc: it.desc,
      })),
    },
    target: {
      eyebrow: src.target.eyebrow,
      title: src.target.title,
      titleHighlight: src.target.titleHighlight,
      titleSuffix: src.target.titleSuffix,
      items: (src.target.items ?? []).map((text) => ({ text })),
      closing: src.target.closing,
    },
    cta: {
      title: src.cta.title,
      titleHighlight: src.cta.titleHighlight,
      titleSuffix: src.cta.titleSuffix,
      description: src.cta.description,
      primary: src.cta.primary,
      email: src.cta.email,
      web: src.cta.web,
      guarantee: src.cta.guarantee,
    },
  };
}

export async function seedLoomPage(
  payload: Payload,
  { reset = false }: { reset?: boolean } = {},
): Promise<void> {
  const tr = mapLoom(trMessages.loom as unknown as LoomSrc);
  const en = mapLoom(enMessages.loom as unknown as LoomSrc);

  await payload.updateGlobal({
    slug: "loom-page",
    locale: "tr",
    data: tr,
  });

  await payload.updateGlobal({
    slug: "loom-page",
    locale: "en",
    data: en,
  });

  void reset;
}
