import type { Locale, Metric } from "./types";

/**
 * Google PageSpeed Insights (Lighthouse) — mobil ölçüm.
 * Anahtar zorunlu değil ama anahtarsız istekler Google tarafından sıkı
 * sınırlanır; Vercel'de PAGESPEED_API_KEY girilmeli.
 */

const ENDPOINT = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
const TIMEOUT_MS = 45_000;

export type SpeedResult = {
  performance: number;
  metrics: Metric[];
  fieldVerdict: "good" | "average" | "poor" | null;
  /** Lighthouse'un "fırsat" denetimleri: id → tahmini kazanç (ms). */
  opportunities: { id: string; savingsMs: number }[];
  accessibility: number | null;
  bestPractices: number | null;
  /** Başarısız erişilebilirlik denetimlerinin (Google'ın dilinde) başlıkları. */
  a11yFailures: string[];
  /** Tarayıcı konsoluna yazılan hata mesajları. */
  consoleErrors: string[];
};

type LhAudit = {
  title?: string;
  numericValue?: number;
  score?: number | null;
  details?: { type?: string; overallSavingsMs?: number; items?: { description?: string; source?: string }[] };
};

type LhCategory = { score?: number | null; auditRefs?: { id: string; weight: number }[] };

type PsiResponse = {
  lighthouseResult?: {
    categories?: { performance?: LhCategory; accessibility?: LhCategory; "best-practices"?: LhCategory };
    audits?: Record<string, LhAudit>;
  };
  loadingExperience?: { overall_category?: "FAST" | "AVERAGE" | "SLOW" };
};

// Lighthouse'un mobil eşikleri (iyi / orta sınırları).
const THRESHOLDS: Record<Metric["id"], [number, number]> = {
  lcp: [2500, 4000],
  fcp: [1800, 3000],
  tbt: [200, 600],
  cls: [0.1, 0.25],
  si: [3400, 5800],
};

const LABELS: Record<Metric["id"], Record<Locale, string>> = {
  lcp: { tr: "Ana içeriğin yüklenmesi (LCP)", en: "Largest Contentful Paint (LCP)" },
  fcp: { tr: "İlk görüntü (FCP)", en: "First Contentful Paint (FCP)" },
  tbt: { tr: "Sayfanın donma süresi (TBT)", en: "Total Blocking Time (TBT)" },
  cls: { tr: "Görsel kayma (CLS)", en: "Cumulative Layout Shift (CLS)" },
  si: { tr: "Görsel tamamlanma hızı", en: "Speed Index" },
};

const AUDIT_IDS: Record<Metric["id"], string> = {
  lcp: "largest-contentful-paint",
  fcp: "first-contentful-paint",
  tbt: "total-blocking-time",
  cls: "cumulative-layout-shift",
  si: "speed-index",
};

function rate(id: Metric["id"], value: number): Metric["rating"] {
  const [good, avg] = THRESHOLDS[id];
  return value <= good ? "good" : value <= avg ? "average" : "poor";
}

function format(id: Metric["id"], value: number, locale: Locale): string {
  if (id === "cls") return value.toFixed(2).replace(".", locale === "tr" ? "," : ".");
  if (id === "tbt") return `${Math.round(value)} ms`;
  const s = (value / 1000).toFixed(1);
  return locale === "tr" ? `${s.replace(".", ",")} sn` : `${s} s`;
}

/**
 * Ölçüm başarısızsa nedeni: anahtar tanımlı mı ve Google'ın hata kodu
 * (ör. "403 SERVICE_DISABLED"). Anahtarın kendisi asla dönmez.
 */
export type SpeedFailure = { failed: true; keyConfigured: boolean; reason: string };

export async function runPageSpeed(url: string, locale: Locale): Promise<SpeedResult | SpeedFailure> {
  const params = new URLSearchParams({ url, strategy: "mobile", locale });
  for (const c of ["performance", "accessibility", "best-practices"]) params.append("category", c);
  const key = process.env.PAGESPEED_API_KEY?.trim();
  if (key) params.set("key", key);
  const fail = (reason: string): SpeedFailure => ({ failed: true, keyConfigured: Boolean(key), reason });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${ENDPOINT}?${params}`, { signal: controller.signal, cache: "no-store" });
    if (!res.ok) {
      const body = (await res.json().catch(() => null)) as {
        error?: { status?: string; details?: { reason?: string }[]; errors?: { reason?: string }[] };
      } | null;
      const reason =
        body?.error?.details?.find((d) => d.reason)?.reason ?? body?.error?.errors?.[0]?.reason ?? body?.error?.status ?? "";
      console.warn("[site-audit] pagespeed status", res.status, reason, "key:", Boolean(key));
      return fail(`${res.status} ${reason}`.trim());
    }
    const data = (await res.json()) as PsiResponse;
    const lh = data.lighthouseResult;
    const perf = lh?.categories?.performance?.score;
    if (!lh?.audits || typeof perf !== "number") return fail("NO_LIGHTHOUSE_RESULT");

    const metrics: Metric[] = (Object.keys(AUDIT_IDS) as Metric["id"][]).flatMap((id) => {
      const v = lh.audits![AUDIT_IDS[id]]?.numericValue;
      if (typeof v !== "number") return [];
      return [{ id, label: LABELS[id][locale], display: format(id, v, locale), rating: rate(id, v) }];
    });

    const opportunities = Object.entries(lh.audits)
      .filter(([, a]) => a.details?.type === "opportunity" && (a.details.overallSavingsMs ?? 0) >= 150 && (a.score ?? 1) < 0.9)
      .map(([id, a]) => ({ id, savingsMs: Math.round(a.details!.overallSavingsMs!) }))
      .sort((a, b) => b.savingsMs - a.savingsMs);

    const cat = data.loadingExperience?.overall_category;
    const fieldVerdict = cat === "FAST" ? "good" : cat === "AVERAGE" ? "average" : cat === "SLOW" ? "poor" : null;

    const pct = (s?: number | null) => (typeof s === "number" ? Math.round(s * 100) : null);
    const a11y = lh.categories?.accessibility;
    const a11yFailures = (a11y?.auditRefs ?? [])
      .filter((r) => r.weight > 0 && lh.audits![r.id]?.score === 0)
      .sort((a, b) => b.weight - a.weight)
      .slice(0, 6)
      .map((r) => (lh.audits![r.id]?.title ?? r.id).replace(/`/g, "").slice(0, 140));
    const consoleAudit = lh.audits["errors-in-console"];
    const consoleErrors =
      consoleAudit?.score === 0
        ? (consoleAudit.details?.items ?? []).slice(0, 5).map((i) => (i.description ?? i.source ?? "").replace(/\s+/g, " ").slice(0, 140))
        : [];

    return {
      performance: Math.round(perf * 100),
      metrics,
      fieldVerdict,
      opportunities,
      accessibility: pct(a11y?.score),
      bestPractices: pct(lh.categories?.["best-practices"]?.score),
      a11yFailures,
      consoleErrors,
    };
  } catch (err) {
    console.warn("[site-audit] pagespeed failed", (err as Error).name);
    return fail((err as Error).name === "AbortError" ? "TIMEOUT" : "NETWORK");
  } finally {
    clearTimeout(timer);
  }
}
