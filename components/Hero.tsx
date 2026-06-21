"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, Star, MousePointer2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Container } from "./Container";
import { Counter } from "./Counter";

const avatars = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&q=80&auto=format&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80&auto=format&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80&auto=format&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80&auto=format&fit=crop&crop=faces",
];

const floatingChipPositions = [
  "left-[6%] top-[18%]",
  "right-[8%] top-[12%]",
  "left-[10%] bottom-[24%]",
  "right-[6%] bottom-[20%]",
] as const;

export type HeroChip = { label: string };
export type HeroData = {
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
  chips: HeroChip[];
};
export type HeroStatsData = {
  revenueLabel: string;
  revenueValue: string;
  roasLabel: string;
  roasValue: string;
  brandsLabel: string;
  brandsValue: string;
};

// Render a string with <strong>…</strong> HTML fragments.
function richString(text: string, strongClass = "text-foreground") {
  const parts = text.split(/(<strong>.*?<\/strong>)/g);
  return parts.map((part, i) => {
    const m = part.match(/^<strong>(.*?)<\/strong>$/);
    if (m) {
      return (
        <span key={i} className={strongClass}>
          {m[1]}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

// Parse a CMS-style "312%" or "5.4x" string into numeric + prefix/suffix.
function parseStatValue(raw: string): {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
} {
  const m = raw.match(/^([^0-9.]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  if (!m) return { value: 0 };
  const prefix = m[1] || undefined;
  const numStr = m[2];
  const suffix = m[3] || undefined;
  const value = Number(numStr);
  const decimals = numStr.includes(".") ? numStr.split(".")[1]?.length : undefined;
  return { value, prefix, suffix, decimals };
}

export function Hero({
  hero,
  stats,
}: {
  hero: HeroData;
  stats: HeroStatsData;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setParallax({ x, y });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce]);

  // Split the two title lines into word arrays (to animate word-by-word).
  const titleWords1 = hero.title1.split(/\s+/).filter(Boolean);
  const titleWords2 = hero.title2.split(/\s+/).filter(Boolean);

  const revenue = parseStatValue(stats.revenueValue);
  const roas = parseStatValue(stats.roasValue);
  const brands = parseStatValue(stats.brandsValue);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-20 sm:pt-28 pb-12"
    >
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_30%,transparent_75%)]" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="aurora-1 absolute -top-40 left-1/2 h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-brand-2/30 blur-[140px]"
          style={{
            transform: `translate(${parallax.x * 30}px, ${parallax.y * 30}px)`,
          }}
        />
        <div
          className="aurora-2 absolute top-32 left-[8%] h-[420px] w-[420px] rounded-full bg-brand/25 blur-[130px]"
          style={{
            transform: `translate(${parallax.x * -40}px, ${parallax.y * -20}px)`,
          }}
        />
        <div
          className="aurora-3 absolute top-24 right-[6%] h-[460px] w-[460px] rounded-full bg-brand-3/25 blur-[140px]"
          style={{
            transform: `translate(${parallax.x * 40}px, ${parallax.y * -25}px)`,
          }}
        />
      </div>

      {!reduce && hero.chips.length > 0 && (
        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          {hero.chips.slice(0, 4).map((c, i) => (
            <motion.div
              key={`${c.label}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.7 }}
              className={`absolute ${floatingChipPositions[i]}`}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 5 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }}
                className="glass rounded-full px-4 py-2 text-xs font-medium text-foreground/90 shadow-[0_20px_60px_-20px_rgba(99,102,241,0.4)]"
              >
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-brand align-middle" />
                {c.label}
              </motion.div>
            </motion.div>
          ))}
        </div>
      )}

      <Container size="wide" className="relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto flex max-w-fit items-center gap-3 rounded-full border border-border bg-surface/60 px-3 py-1.5 backdrop-blur-md"
        >
          <div className="flex -space-x-2">
            {avatars.map((src, i) => (
              <span
                key={i}
                className="h-6 w-6 rounded-full border-2 border-background bg-cover bg-center"
                style={{ backgroundImage: `url(${src})` }}
                aria-hidden
              />
            ))}
          </div>
          <span className="text-xs text-muted">
            {richString(hero.socialProof, "font-medium text-foreground")}
          </span>
          <div className="flex items-center gap-0.5 text-amber-400">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-3 w-3 fill-current" />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-5 flex justify-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium text-muted backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            <Sparkles className="h-3.5 w-3.5 text-brand" />
            {hero.eyebrow}
          </span>
        </motion.div>

        <h1 className="mx-auto mt-7 max-w-5xl text-center text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl md:text-[88px]">
          {titleWords1.map((w, i) => (
            <motion.span
              key={`a-${i}`}
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.7,
                delay: 0.18 + i * 0.08,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="mr-[0.25em] inline-block"
            >
              {w}
            </motion.span>
          ))}
          <br className="hidden sm:block" />
          {titleWords2.map((w, i) => (
            <motion.span
              key={`b-${i}`}
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.7,
                delay: 0.42 + i * 0.08,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="text-gradient mr-[0.25em] inline-block"
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mx-auto mt-7 max-w-2xl text-center text-base text-muted sm:text-lg"
        >
          {richString(hero.description)}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.78 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href={hero.primaryCtaHref || "/contact"}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition hover:bg-foreground/90"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition group-hover:translate-x-full duration-700" />
            <span className="relative">{hero.primaryCta}</span>
            <ArrowRight className="relative h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
          <Link
            href={hero.secondaryCtaHref || "/work"}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/40 px-7 py-3.5 text-sm font-medium text-foreground backdrop-blur-md transition hover:bg-surface"
          >
            {hero.secondaryCta}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="relative mx-auto mt-20 max-w-5xl"
        >
          <div className="pointer-events-none absolute -inset-px rounded-[34px] bg-gradient-to-r from-brand/40 via-brand-2/40 to-brand-3/40 opacity-60 blur-2xl" />
          <div className="relative rounded-[32px] border border-border/80 bg-surface/40 p-2 shadow-[0_60px_140px_-30px_rgba(99,102,241,0.45)] backdrop-blur-xl">
            <div className="absolute inset-x-16 -top-px h-px bg-gradient-to-r from-transparent via-brand to-transparent" />
            <div className="grid divide-border/50 rounded-[24px] bg-background/60 p-2 sm:grid-cols-3 sm:divide-x">
              <StatCell
                value={revenue.value}
                suffix={revenue.suffix}
                prefix={revenue.prefix ?? "+"}
                decimals={revenue.decimals}
                label={stats.revenueLabel}
              />
              <StatCell
                value={roas.value}
                suffix={roas.suffix}
                prefix={roas.prefix}
                decimals={roas.decimals}
                label={stats.roasLabel}
              />
              <StatCell
                value={brands.value}
                suffix={brands.suffix}
                prefix={brands.prefix}
                decimals={brands.decimals}
                label={stats.brandsLabel}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="mt-16 flex justify-center"
        >
          <button
            type="button"
            onClick={() => {
              const section = ref.current;
              const top = section
                ? section.offsetTop + section.offsetHeight
                : window.innerHeight;
              window.scrollTo({ top, behavior: "smooth" });
            }}
            aria-label={hero.scrollHint}
            className="group flex flex-col items-center gap-2 text-xs text-muted transition hover:text-foreground"
          >
            <MousePointer2 className="h-4 w-4 -rotate-12 transition group-hover:translate-y-0.5" />
            <span>{hero.scrollHint}</span>
            <div className="relative h-8 w-px overflow-hidden">
              <span className="animate-scroll-cue absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-brand to-transparent" />
            </div>
          </button>
        </motion.div>
      </Container>
    </section>
  );
}

function StatCell({
  value,
  prefix,
  suffix,
  decimals,
  label,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
}) {
  return (
    <div className="px-4 py-6 text-center sm:px-6 sm:py-7">
      <div className="text-4xl font-semibold tracking-tight text-gradient sm:text-5xl">
        <Counter to={value} prefix={prefix} suffix={suffix} decimals={decimals} />
      </div>
      <div className="mt-2 text-sm text-muted">{label}</div>
    </div>
  );
}
