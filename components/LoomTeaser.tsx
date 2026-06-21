"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  Layers,
  ShoppingBag,
  BarChart3,
  Mails,
  PenTool,
  Shield,
  Sparkles,
} from "lucide-react";

const moduleIcons = [ShoppingBag, BarChart3, Mails, PenTool, Shield];

export type LoomTeaserModule = {
  name: string;
  subtitle: string;
  hint: string;
};

export type LoomTeaserData = {
  eyebrow: string;
  title: string;
  titleHighlight: string;
  titleSuffix: string;
  description: string;
  modulesLabel: string;
  learnMore: string;
  pilotBadge: string;
  chips: { label: string }[];
  modules: LoomTeaserModule[];
};

export function LoomTeaser({ data }: { data: LoomTeaserData }) {
  const reduce = useReducedMotion();
  const modules = data.modules ?? [];
  const chips = data.chips ?? [];

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused || modules.length === 0) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % modules.length);
    }, 3400);
    return () => clearInterval(id);
  }, [reduce, paused, modules.length]);

  const titleWords = (data.titleHighlight ?? "").split(/\s+/).filter(Boolean);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative overflow-hidden rounded-[32px] border border-border bg-surface/40 p-8 sm:p-12 lg:p-16"
    >
      {/* animated aurora background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="aurora-1 absolute -right-32 -top-40 h-[520px] w-[520px] rounded-full bg-brand-2/25 blur-[140px]" />
        <div className="aurora-2 absolute -bottom-40 -left-32 h-[520px] w-[520px] rounded-full bg-brand-3/25 blur-[140px]" />
        <div className="aurora-3 absolute top-1/2 left-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/15 blur-[120px]" />
      </div>
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_30%,transparent_75%)]" />

      {/* top-left → bottom-right accent line */}
      <div className="pointer-events-none absolute inset-x-20 -top-px h-px bg-gradient-to-r from-transparent via-brand to-transparent" />

      <div className="relative grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        {/* LEFT — copy */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-brand-2/40 bg-gradient-to-r from-brand/10 via-brand-2/10 to-brand-3/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-foreground backdrop-blur-md"
          >
            <Layers className="h-3.5 w-3.5 text-brand" />
            {data.eyebrow}
          </motion.div>

          <h2 className="mt-5 text-3xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            <motion.span
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="block text-foreground"
            >
              {data.title}
            </motion.span>
            <span className="mt-2 block">
              {titleWords.map((w, i) => (
                <motion.span
                  key={`${w}-${i}`}
                  initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.7,
                    delay: 0.15 + i * 0.08,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                  className="text-gradient mr-[0.28em] inline-block"
                >
                  {w}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: 0.6 }}
                className="text-foreground"
              >
                {data.titleSuffix}
              </motion.span>
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-6 max-w-xl text-base text-muted sm:text-lg"
          >
            {data.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {chips.map((c, i) => (
              <span
                key={`${c.label}-${i}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted backdrop-blur-md"
              >
                <span className="h-1 w-1 rounded-full bg-brand" />
                {c.label}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-300"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            {data.pilotBadge}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-8"
          >
            <Link
              href="/loom"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:bg-foreground/90"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition duration-700 group-hover:translate-x-full" />
              <Sparkles className="relative h-4 w-4" />
              <span className="relative">{data.learnMore}</span>
              <ArrowRight className="relative h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>

        {/* RIGHT — cycling modules */}
        <div className="lg:col-span-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted">
              {data.modulesLabel}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] text-muted">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" />
              live
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            {modules.map((m, i) => {
              const Icon = moduleIcons[i] ?? ShoppingBag;
              const isActive = i === active;
              return (
                <motion.div
                  key={`${m.name}-${i}`}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.5,
                    delay: 0.25 + i * 0.08,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                  animate={{
                    scale: isActive ? 1.03 : 1,
                  }}
                  className={`relative overflow-hidden rounded-2xl border backdrop-blur-sm transition-colors duration-500 ${
                    isActive
                      ? "border-brand-2/60 bg-background/80"
                      : "border-border bg-background/50"
                  }`}
                >
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-r from-brand/10 via-brand-2/10 to-brand-3/10 transition-opacity duration-500 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <div
                    className={`pointer-events-none absolute inset-x-6 -top-px h-px bg-gradient-to-r from-transparent via-brand to-transparent transition-opacity duration-500 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  <div className="relative flex items-center gap-3 px-4 py-3">
                    <div
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border transition-colors duration-500 ${
                        isActive
                          ? "border-brand-2/60 bg-brand-2/15 text-foreground"
                          : "border-border bg-surface text-brand"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex w-6 justify-center">
                      <span
                        className={`font-mono text-xs transition-colors duration-500 ${
                          isActive ? "text-foreground" : "text-muted"
                        }`}
                      >
                        0{i + 1}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground">
                        {m.name}
                      </div>
                      <AnimatePresence mode="wait">
                        {isActive ? (
                          <motion.div
                            key="active"
                            initial={{ opacity: 0, y: -4, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: "auto" }}
                            exit={{ opacity: 0, y: -4, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-0.5 text-[11px] text-gradient font-medium">
                              {m.subtitle}
                            </div>
                            <div className="mt-1 text-[11px] text-muted truncate">
                              {m.hint}
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-4 flex justify-center gap-1.5">
            {modules.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Module ${i + 1}`}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === active
                    ? "w-6 bg-gradient-to-r from-brand via-brand-2 to-brand-3"
                    : "w-1 bg-border hover:bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
