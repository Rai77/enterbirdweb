import {
  ShoppingBag,
  TrendingUp,
  Sparkles,
  Bot,
  Layout,
  Megaphone,
  Search,
  Store,
  Truck,
  type LucideIcon,
} from "lucide-react";

export const serviceIds = [
  "ecommerce",
  "performance",
  "seo",
  "social",
  "marketplace",
  "ai",
  "design",
  "operations",
  "brand",
] as const;
export type ServiceId = (typeof serviceIds)[number];

export const serviceIcons: Record<ServiceId, LucideIcon> = {
  ecommerce: ShoppingBag,
  performance: TrendingUp,
  seo: Search,
  social: Megaphone,
  marketplace: Store,
  ai: Bot,
  design: Layout,
  operations: Truck,
  brand: Sparkles,
};

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?w=1200&q=80&auto=format&fit=crop`;

export type ProjectId =
  | "ladyfaith"
  | "reyorganic"
  | "brea"
  | "startershub"
  | "sirener-tan-istanbul"
  | "doseistanbul"
  | "overdosedetox"
  | "pourlabonte"
  | "canakkale-madencilik"
  | "calypia"
  | "sperra"
  | "sperra-app"
  | "aura-app";

export type Project = {
  id: ProjectId;
  image: string;
  gradient: string;
  url?: string;
  ongoing?: boolean;
};

export const projects: Project[] = [
  {
    id: "ladyfaith",
    image: "/projects/ladyfaith.jpg",
    gradient: "from-fuchsia-400/20 via-violet-500/20 to-indigo-500/20",
    url: "https://ladyfaith.art",
  },
  {
    id: "reyorganic",
    image: unsplash("photo-1490474418585-ba9bad8fd0ea"),
    gradient: "from-emerald-400/20 via-lime-500/20 to-amber-500/20",
    url: "https://reyorganic.com",
  },
  {
    id: "brea",
    image: unsplash("photo-1474979266404-7eaacbcd87c5"),
    gradient: "from-amber-400/20 via-yellow-500/20 to-lime-500/20",
    url: "https://brea.com.tr",
  },
  {
    id: "startershub",
    image: "/projects/startershub.png",
    gradient: "from-indigo-400/20 via-blue-500/20 to-cyan-500/20",
    url: "https://startershub.com",
  },
  {
    id: "sirener-tan-istanbul",
    image: unsplash("photo-1558769132-cb1aea458c5e"),
    gradient: "from-rose-400/20 via-pink-500/20 to-fuchsia-500/20",
    url: "https://www.sirenertanistanbul.com",
  },
  {
    id: "doseistanbul",
    image: unsplash("photo-1441986300917-64674bd600d8"),
    gradient: "from-violet-400/20 via-purple-500/20 to-pink-500/20",
    url: "https://doseistanbul.com",
    ongoing: true,
  },
  {
    id: "overdosedetox",
    image: unsplash("photo-1512757776214-26d36777b513"),
    gradient: "from-teal-400/20 via-emerald-500/20 to-lime-500/20",
    url: "https://overdosedetox.com",
    ongoing: true,
  },
  {
    id: "pourlabonte",
    image: unsplash("photo-1542601906990-b4d3fb778b09"),
    gradient: "from-rose-400/20 via-orange-500/20 to-amber-500/20",
    url: "https://pourlabonte.com",
  },
  {
    id: "canakkale-madencilik",
    image: unsplash("photo-1581094794329-c8112a89af12"),
    gradient: "from-slate-400/20 via-amber-600/20 to-stone-500/20",
  },
  {
    id: "calypia",
    image: unsplash("photo-1677442136019-21780ecad995"),
    gradient: "from-cyan-400/30 via-blue-500/30 to-indigo-600/30",
    url: "https://calypia.com",
  },
  {
    id: "sperra",
    image: unsplash("photo-1563986768609-322da13575f3"),
    gradient: "from-slate-500/20 via-sky-600/20 to-indigo-700/20",
    url: "https://sperra.com.tr",
  },
  {
    id: "sperra-app",
    image: unsplash("photo-1607252650355-f7fd0460ccdb"),
    gradient: "from-slate-900/30 via-sky-700/30 to-indigo-900/30",
  },
  {
    id: "aura-app",
    image: unsplash("photo-1616469829941-c7200edec809"),
    gradient: "from-fuchsia-400/20 via-rose-400/20 to-amber-300/20",
  },
];

export type PostId =
  | "ai-satis-agentlari-shopify"
  | "shopify-horizon-tema-degerlendirme"
  | "meta-advantage-plus-rehber"
  | "google-ai-overviews-seo";

export const posts: { id: PostId; date: string; readMin: number }[] = [
  { id: "ai-satis-agentlari-shopify", date: "2026-04-15", readMin: 7 },
  { id: "shopify-horizon-tema-degerlendirme", date: "2026-04-10", readMin: 6 },
  { id: "meta-advantage-plus-rehber", date: "2026-04-03", readMin: 8 },
  { id: "google-ai-overviews-seo", date: "2026-03-25", readMin: 9 },
];

export const homeStats = [
  { key: "projects", value: "120+" },
  { key: "experience", value: "8" },
  { key: "satisfaction", value: "4.9/5" },
  { key: "budget", value: "32M+" },
];

export const partners: { name: string; src: string }[] = [
  { name: "Shopify", src: "/logos/shopify.svg" },
  { name: "WordPress", src: "/logos/wordpress.svg" },
  { name: "Ticimax", src: "/logos/ticimax.svg" },
  { name: "T-Soft", src: "/logos/tsoft.svg" },
  { name: "Meta", src: "/logos/meta.svg" },
  { name: "Google", src: "/logos/google.svg" },
  { name: "TikTok", src: "/logos/tiktok.svg" },
];
