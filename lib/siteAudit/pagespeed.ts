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
};

type LhAudit = {
  numericValue?: number;
  score?: number | null;
  details?: { type?: string; overallSavingsMs?: number };
};

type PsiResponse = {
  lighthouseResult?: {
    categories?: { performance?: { score?: number | null } };
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

export async function runPageSpeed(url: string, locale: Locale): Promise<SpeedResult | null> {
  const params = new URLSearchParams({ url, strategy: "mobile", category: "performance", locale });
  const key = process.env.PAGESPEED_API_KEY;
  if (key) params.set("key", key);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${ENDPOINT}?${params}`, { signal: controller.signal, cache: "no-store" });
    if (!res.ok) {
      console.warn("[site-audit] pagespeed status", res.status);
      return null;
    }
    const data = (await res.json()) as PsiResponse;
    const lh = data.lighthouseResult;
    const perf = lh?.categories?.performance?.score;
    if (!lh?.audits || typeof perf !== "number") return null;

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

    return { performance: Math.round(perf * 100), metrics, fieldVerdict, opportunities };
  } catch (err) {
    console.warn("[site-audit] pagespeed failed", (err as Error).name);
    return null;
  } finally {
    clearTimeout(timer);
  }
}
