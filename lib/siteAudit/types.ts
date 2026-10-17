export type Locale = "tr" | "en";

export type Severity = "critical" | "high" | "medium" | "low";

/** Kullanıcıya gösterilen tek bir bulgu. Metinler iki dilde hazırlanır. */
export type Issue = {
  id: string;
  severity: Severity;
  category: "speed" | "seo" | "tracking" | "trust" | "mobile";
  title: string;
  detail: string;
  fix: string;
};

export type Metric = {
  id: "lcp" | "cls" | "tbt" | "fcp" | "si";
  label: string;
  /** Okunabilir değer, ör. "3,2 sn". */
  display: string;
  rating: "good" | "average" | "poor";
};

export type AuditResult = {
  url: string;
  finalUrl: string;
  checkedAt: string;
  /** 0–100 genel puan. */
  score: number;
  /** Google PageSpeed mobil performans puanı; ölçülemediyse null. */
  performance: number | null;
  /** Site içi kontrollerin puanı (0–100). */
  checksScore: number;
  metrics: Metric[];
  /** Gerçek kullanıcı verisi (Chrome UX Report) varsa genel değerlendirme. */
  fieldVerdict: "good" | "average" | "poor" | null;
  platform: string | null;
  issues: Issue[];
  passed: string[];
  speedMeasured: boolean;
};
