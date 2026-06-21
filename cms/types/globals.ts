/**
 * Hand-written typings for the page-level globals this site reads.
 *
 * These mirror the field shape defined in `cms/globals/*.ts` as they return
 * from `payload.findGlobal({ slug, locale })`. When `payload generate:types`
 * is eventually wired in, these can be replaced with the generated ones.
 */

export type HomePageDoc = {
  hero: {
    eyebrow: string;
    socialProof: string;
    title1: string;
    title2: string;
    description: string;
    primaryCta: string;
    primaryCtaHref: string;
    secondaryCta: string;
    secondaryCtaHref: string;
    scrollHint: string;
    chips: { label: string; id?: string }[];
  };
  stats: {
    revenueLabel: string;
    revenueValue: string;
    roasLabel: string;
    roasValue: string;
    brandsLabel: string;
    brandsValue: string;
  };
  statsStrip: { value: string; label: string; id?: string }[];
  marquee: {
    eyebrow: string;
  };
  sections: {
    services: {
      eyebrow: string;
      title: string;
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
      steps: { title: string; text: string; id?: string }[];
    };
    testimonials: {
      eyebrow: string;
      title: string;
      titleHighlight: string;
    };
    loomTeaser: {
      eyebrow: string;
      title: string;
      titleHighlight: string;
      titleSuffix: string;
      description: string;
      modulesLabel: string;
      learnMore: string;
      pilotBadge: string;
      chips: { label: string; id?: string }[];
      modules: {
        name: string;
        subtitle: string;
        hint: string;
        id?: string;
      }[];
    };
  };
};

export type ServicesPageDoc = {
  pageTitle: string;
  pageTitleHighlight: string;
  pageTitleSuffix: string;
  pageDescription: string;
  bulletsLabel: string;
};

export type AboutPageDoc = {
  eyebrow: string;
  pageTitle: string;
  pageTitleHighlight: string;
  pageTitleSuffix: string;
  pageDescription: string;
  experienceLabel: string;
  heroStats: {
    foundedLabel: string;
    foundedValue: string;
    teamLabel: string;
    teamValue: string;
    projectsLabel: string;
    projectsValue: string;
    citiesLabel: string;
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
    items: { year: string; title: string; text: string; id?: string }[];
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
    items: {
      key: "care" | "transparency" | "speed" | "human";
      title: string;
      text: string;
      id?: string;
    }[];
  };
  bigStats: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    titleSuffix: string;
    items: {
      value: number;
      suffix?: string | null;
      decimals?: number | null;
      label: string;
      id?: string;
    }[];
  };
};

export type LoomPageDoc = {
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
    items: { title: string; text: string; id?: string }[];
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
      id?: string;
    }[];
  };
  comparison: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    titleSuffix: string;
    description: string;
    headers: { dim: string; agency: string; loom: string };
    rows: { label: string; agency: string; loom: string; id?: string }[];
  };
  tech: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    titleSuffix: string;
    description: string;
    items: { name: string; desc: string; id?: string }[];
  };
  target: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    titleSuffix: string;
    items: { text: string; id?: string }[];
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

export type ContactPageDoc = {
  pageTitle: string;
  pageTitleHighlight: string;
  pageTitleSuffix: string;
  pageDescription: string;
  labels: {
    whatsapp: string;
    email: string;
    phone: string;
    office: string;
    hours: string;
    social: string;
  };
  values: {
    office: string;
    hours: string;
  };
  form: {
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    company: string;
    companyPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    service: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    privacy: string;
    services: { label: string; id?: string }[];
    successTitle: string;
    successMessage: string;
  };
};

export type CTABlockDoc = {
  title: string;
  titleHighlight: string;
  titleSuffix: string;
  description: string;
  primary: string;
  emailLabel: string;
};
