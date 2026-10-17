"use client";

import { useEffect, useRef, useState } from "react";
import { Search, Loader2, Lock, CheckCircle2, AlertTriangle, MessageCircle, ArrowRight, RotateCcw } from "lucide-react";
import { PAGE_COPY } from "@/lib/siteAudit/pageCopy";
import type { AuditResult, Issue, Locale } from "@/lib/siteAudit/types";
import { cn } from "@/lib/cn";

/** Ücretsiz gösterilen bulgu sayısı; kalanı form doldurulunca açılır. */
const FREE_ISSUES = 3;

const SEVERITY_STYLE: Record<Issue["severity"], string> = {
  critical: "bg-red-500/15 text-red-400 ring-red-500/30",
  high: "bg-orange-500/15 text-orange-400 ring-orange-500/30",
  medium: "bg-amber-500/15 text-amber-400 ring-amber-500/30",
  low: "bg-sky-500/15 text-sky-400 ring-sky-500/30",
};

function scoreColor(s: number) {
  return s >= 85 ? "#22c55e" : s >= 65 ? "#eab308" : s >= 45 ? "#f97316" : "#ef4444";
}

function ScoreRing({ score, size = 168 }: { score: number; size?: number }) {
  const r = (size - 16) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`${score}/100`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeOpacity={0.12} strokeWidth={12} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={scoreColor(score)}
        strokeWidth={12}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - score / 100)}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: "stroke-dashoffset 1s ease" }}
      />
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" className="fill-foreground" fontSize={size / 3.6} fontWeight={700}>
        {score}
      </text>
    </svg>
  );
}

function IssueCard({ issue, label, fixLabel, showFix }: { issue: Issue; label: string; fixLabel: string; showFix: boolean }) {
  return (
    <li className="rounded-2xl border border-border bg-surface/70 p-5">
      <div className="flex items-start gap-3">
        <span className={cn("mt-0.5 shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1", SEVERITY_STYLE[issue.severity])}>
          {label}
        </span>
        <div className="min-w-0">
          <h3 className="font-semibold">{issue.title}</h3>
          <p className="mt-1 text-sm text-muted">{issue.detail}</p>
          {showFix && (
            <p className="mt-3 rounded-xl bg-surface-2/70 p-3 text-sm">
              <span className="font-semibold text-brand">{fixLabel}: </span>
              {issue.fix}
            </p>
          )}
        </div>
      </div>
    </li>
  );
}

export function SiteAudit({ locale, whatsappNumber }: { locale: Locale; whatsappNumber: string }) {
  const c = PAGE_COPY[locale];
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [lead, setLead] = useState({ name: "", email: "", phone: "", company_url: "" });
  const [leadState, setLeadState] = useState<"idle" | "sending" | "error">("idle");
  const resultRef = useRef<HTMLDivElement>(null);

  // Bekleme sırasında adım metnini ilerlet (son adımda bekler).
  useEffect(() => {
    if (!loading) return;
    setStep(0);
    const id = setInterval(() => setStep((s) => Math.min(s + 1, c.steps.length - 1)), 4500);
    return () => clearInterval(id);
  }, [loading, c.steps.length]);

  async function analyze(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim() || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setUnlocked(false);
    try {
      const res = await fetch("/api/site-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, locale }),
      });
      const data = await res.json().catch(() => ({ ok: false, error: "SERVER_ERROR" }));
      if (!data.ok) {
        setError(c.errors[data.error] ?? c.errors.SERVER_ERROR);
        return;
      }
      setResult(data.result as AuditResult);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    } catch {
      setError(c.errors.SERVER_ERROR);
    } finally {
      setLoading(false);
    }
  }

  async function submitLead(e: React.FormEvent) {
    e.preventDefault();
    if (!result) return;
    setLeadState("sending");
    try {
      const res = await fetch("/api/site-audit/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...lead,
          website: result.finalUrl,
          score: result.score,
          issues: result.issues.map((i) => `[${c.severity[i.severity]}] ${i.title}`),
          locale,
        }),
      });
      const data = await res.json().catch(() => ({ ok: false }));
      if (!data.ok) {
        setLeadState("error");
        return;
      }
      setUnlocked(true);
      setLeadState("idle");
    } catch {
      setLeadState("error");
    }
  }

  const shown = result ? (unlocked ? result.issues : result.issues.slice(0, FREE_ISSUES)) : [];
  const hidden = result ? result.issues.length - shown.length : 0;
  const host = result ? new URL(result.finalUrl).hostname.replace(/^www\./, "") : "";
  const waHref = result
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(c.whatsappText(host, result.score))}`
    : "#";

  return (
    <div className="space-y-8">
      {/* Form */}
      <div className="rounded-3xl border border-border bg-surface/80 p-5 shadow-xl backdrop-blur sm:p-8">
        <form onSubmit={analyze} className="flex flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor="audit-url">
            URL
          </label>
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden />
            <input
              id="audit-url"
              type="text"
              inputMode="url"
              autoComplete="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={c.placeholder}
              disabled={loading}
              className="h-14 w-full rounded-2xl border border-border bg-background pl-12 pr-4 text-base outline-none transition focus:border-brand-2 focus:ring-2 focus:ring-brand-2/30"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-3 via-brand-2 to-brand px-8 text-base font-semibold text-white shadow-lg transition hover:opacity-95 disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> : null}
            {loading ? c.analyzing : c.analyze}
          </button>
        </form>

        {loading ? (
          <p className="mt-4 text-sm text-muted" aria-live="polite">
            {c.steps[step]}
          </p>
        ) : (
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
            {c.trust.map((t) => (
              <li key={t} className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-brand" aria-hidden />
                {t}
              </li>
            ))}
          </ul>
        )}
        {error && (
          <div className="mt-4 space-y-3" role="alert">
            <p className="flex items-start gap-2 text-sm text-red-400">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              {error}
            </p>
            {error === c.errors.BLOCKED_BY_SITE && (
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(c.whatsappManual(url.trim()))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 px-5 py-2.5 text-sm font-semibold text-emerald-400"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                {c.ctaWhatsapp}
              </a>
            )}
          </div>
        )}
      </div>

      {result && (
        <div ref={resultRef} className="scroll-mt-24 space-y-8">
          {/* Puanlar */}
          <div className="grid gap-6 rounded-3xl border border-border bg-surface/80 p-6 sm:p-8 md:grid-cols-[auto_1fr] md:items-center">
            <div className="flex flex-col items-center text-center">
              <ScoreRing score={result.score} />
              <p className="mt-2 text-sm text-muted">{c.overall}</p>
              <p className="text-lg font-semibold" style={{ color: scoreColor(result.score) }}>
                {c.grade(result.score)}
              </p>
            </div>
            <div className="space-y-4">
              <p className="break-all text-sm text-muted">
                {host}
                {result.platform ? ` · ${c.platform}: ${result.platform}` : ""}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-background/60 p-4">
                  <p className="text-sm text-muted">{c.speed}</p>
                  <p className="mt-1 text-3xl font-bold" style={result.performance !== null ? { color: scoreColor(result.performance) } : undefined}>
                    {result.performance ?? "—"}
                    {result.performance !== null && <span className="text-base font-medium text-muted">/100</span>}
                  </p>
                  {result.performance === null && <p className="text-xs text-muted">{c.notMeasured}</p>}
                </div>
                <div className="rounded-2xl border border-border bg-background/60 p-4">
                  <p className="text-sm text-muted">{c.checks}</p>
                  <p className="mt-1 text-3xl font-bold" style={{ color: scoreColor(result.checksScore) }}>
                    {result.checksScore}
                    <span className="text-base font-medium text-muted">/100</span>
                  </p>
                </div>
              </div>
              {!result.speedMeasured && <p className="text-sm text-amber-400">{c.speedFailed}</p>}
              {result.fieldVerdict && (
                <p className="text-sm text-muted">
                  {c.fieldData}: <span className="font-semibold text-foreground">{c.verdict[result.fieldVerdict]}</span>
                </p>
              )}
            </div>
          </div>

          {/* Metrikler */}
          {result.metrics.length > 0 && (
            <div className="rounded-3xl border border-border bg-surface/80 p-6 sm:p-8">
              <h2 className="text-lg font-semibold">{c.metricsTitle}</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {result.metrics.map((m) => (
                  <li key={m.id} className="rounded-2xl border border-border bg-background/60 p-4">
                    <p className="text-sm text-muted">{m.label}</p>
                    <p className="mt-1 flex items-center gap-2 text-xl font-bold">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ background: m.rating === "good" ? "#22c55e" : m.rating === "average" ? "#eab308" : "#ef4444" }}
                        aria-hidden
                      />
                      {m.display}
                      <span className="text-xs font-medium text-muted">{c.verdict[m.rating]}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Bulgular */}
          <div>
            <h2 className="text-2xl font-semibold">{result.issues.length ? c.issuesTitle(result.issues.length) : c.noIssues}</h2>
            <ul className="mt-4 space-y-3">
              {shown.map((i) => (
                <IssueCard key={i.id} issue={i} label={c.severity[i.severity]} fixLabel={c.whatToDo} showFix={unlocked} />
              ))}
            </ul>
            {unlocked && <p className="mt-4 rounded-2xl bg-emerald-500/10 p-4 text-sm text-emerald-400">{c.thanks}</p>}

            {/* Kilit + form */}
            {!unlocked && result.issues.length > 0 && (
              <div className="relative mt-3 overflow-hidden rounded-3xl border border-brand-2/40 bg-gradient-to-br from-brand-2/10 via-surface/90 to-brand/10 p-6 sm:p-8">
                <div className="flex items-center gap-2 text-brand">
                  <Lock className="h-5 w-5" aria-hidden />
                  <h3 className="text-lg font-semibold text-foreground">
                    {hidden > 0 ? c.lockedTitle(hidden) : c.whatToDo}
                  </h3>
                </div>
                <p className="mt-2 max-w-2xl text-sm text-muted">{c.lockedText}</p>
                <form onSubmit={submitLead} className="mt-5 grid gap-3 sm:grid-cols-3">
                  <input
                    required
                    value={lead.name}
                    onChange={(e) => setLead({ ...lead, name: e.target.value })}
                    placeholder={c.name}
                    aria-label={c.name}
                    autoComplete="name"
                    className="h-12 rounded-xl border border-border bg-background px-4 outline-none focus:border-brand-2"
                  />
                  <input
                    required
                    type="email"
                    value={lead.email}
                    onChange={(e) => setLead({ ...lead, email: e.target.value })}
                    placeholder={c.email}
                    aria-label={c.email}
                    autoComplete="email"
                    className="h-12 rounded-xl border border-border bg-background px-4 outline-none focus:border-brand-2"
                  />
                  <input
                    type="tel"
                    value={lead.phone}
                    onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                    placeholder={c.phone}
                    aria-label={c.phone}
                    autoComplete="tel"
                    className="h-12 rounded-xl border border-border bg-background px-4 outline-none focus:border-brand-2"
                  />
                  {/* Honeypot: ekranda görünmez, botlar doldurur. */}
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden
                    value={lead.company_url}
                    onChange={(e) => setLead({ ...lead, company_url: e.target.value })}
                    className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  />
                  <button
                    type="submit"
                    disabled={leadState === "sending"}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-3 via-brand-2 to-brand px-6 font-semibold text-white sm:col-span-3 sm:justify-self-start disabled:opacity-60"
                  >
                    {leadState === "sending" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
                    {leadState === "sending" ? c.sending : c.unlock}
                  </button>
                </form>
                <p className="mt-3 text-xs text-muted">{c.consent}</p>
                {leadState === "error" && <p className="mt-2 text-sm text-red-400">{c.leadError}</p>}
              </div>
            )}
          </div>

          {/* Geçilenler */}
          {unlocked && result.passed.length > 0 && (
            <div className="rounded-3xl border border-border bg-surface/80 p-6 sm:p-8">
              <h2 className="text-lg font-semibold">{c.passedTitle}</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {result.passed.map((p) => (
                  <li key={p} className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA */}
          <div className="rounded-3xl bg-gradient-to-r from-brand-3 via-brand-2 to-brand p-[1px]">
            <div className="rounded-3xl bg-surface p-6 sm:p-8">
              <h2 className="text-2xl font-semibold">{c.ctaTitle}</h2>
              <p className="mt-2 text-muted">{c.ctaText}</p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`/${locale}/contact`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-foreground px-6 py-3 font-semibold text-background"
                >
                  {c.ctaPrimary}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/40 px-6 py-3 font-semibold text-emerald-400"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  {c.ctaWhatsapp}
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setResult(null);
                    setUrl("");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold text-muted hover:text-foreground"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden />
                  {c.again}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
