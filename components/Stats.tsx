import { useTranslations } from "next-intl";
import { homeStats } from "@/lib/data";

export type StatItem = { value: string; label: string };

/**
 * Stats strip used on Home + Work pages.
 *
 * Preferred: pass an `items` prop sourced from a CMS global.
 * Fallback: use i18n + static `homeStats` (legacy path for `/work`).
 */
export function Stats({ items }: { items?: StatItem[] } = {}) {
  const t = useTranslations("stats");
  const resolved: StatItem[] =
    items ??
    homeStats.map((s) => ({
      value: s.value,
      label: t(s.key as "projects" | "experience" | "satisfaction" | "budget"),
    }));

  return (
    <div className="grid gap-6 rounded-3xl border border-border bg-surface/40 p-8 sm:grid-cols-2 lg:grid-cols-4 lg:p-12">
      {resolved.map((s, i) => (
        <div
          key={`${s.label}-${i}`}
          className={`flex flex-col gap-1 ${
            i !== resolved.length - 1 ? "lg:border-r lg:border-border lg:pr-6" : ""
          }`}
        >
          <span className="text-4xl font-semibold tracking-tight text-gradient sm:text-5xl">
            {s.value}
          </span>
          <span className="text-sm text-muted">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
