import { NextResponse } from "next/server";
import { runAudit } from "@/lib/siteAudit/run";
import { AuditUrlError, normalizeUrl } from "@/lib/siteAudit/safeFetch";
import { rateLimit, clientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Google PageSpeed ölçümü ağır sitelerde 60 sn'yi aşabiliyor (bkz. pagespeed.ts).
export const maxDuration = 120;

// Her analiz Google'a bir istek demek; aynı IP 10 dakikada en fazla 5 analiz.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60_000;

export async function POST(req: Request) {
  let body: { url?: string; locale?: string };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "BAD_REQUEST" }, { status: 400 });
  }
  const locale = body.locale === "en" ? "en" : "tr";

  // Yazım hatası olan adres ziyaretçinin hakkını yemesin: önce biçim kontrolü.
  try {
    normalizeUrl(String(body.url ?? ""));
  } catch (err) {
    const code = err instanceof AuditUrlError ? err.code : "INVALID_URL";
    return NextResponse.json({ ok: false, error: code }, { status: 400 });
  }

  const limit = rateLimit(`site-audit:${clientIp(req)}`, RATE_LIMIT, RATE_WINDOW_MS);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "TOO_MANY_REQUESTS" },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  try {
    const result = await runAudit(String(body.url ?? ""), locale);
    return NextResponse.json({ ok: true, result });
  } catch (err) {
    if (err instanceof AuditUrlError) {
      return NextResponse.json({ ok: false, error: err.code }, { status: 400 });
    }
    console.error("[site-audit] unexpected", err);
    return NextResponse.json({ ok: false, error: "SERVER_ERROR" }, { status: 500 });
  }
}
