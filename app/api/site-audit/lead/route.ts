import { NextResponse } from "next/server";
import { payload } from "@/lib/cms";
import { rateLimit, clientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 10 * 60_000;

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  website?: string;
  score?: number;
  issues?: string[];
  locale?: string;
  /** Honeypot — gerçek kullanıcı görmez. */
  company_url?: string;
};

function clean(v: unknown, max: number): string {
  return String(v ?? "").trim().slice(0, max);
}

export async function POST(req: Request) {
  const limit = rateLimit(`site-audit-lead:${clientIp(req)}`, RATE_LIMIT, RATE_WINDOW_MS);
  if (!limit.ok) {
    return NextResponse.json({ ok: false, error: "TOO_MANY_REQUESTS" }, { status: 429 });
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "BAD_REQUEST" }, { status: 400 });
  }

  // Bot: başarılı gibi dön, kaydetme.
  if (clean(body.company_url, 200)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 100);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 40);
  const website = clean(body.website, 300);
  if (!name || !email || !website) {
    return NextResponse.json({ ok: false, error: "MISSING_FIELDS" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "INVALID_EMAIL" }, { status: 400 });
  }

  const score = Number.isFinite(body.score) ? Math.max(0, Math.min(100, Math.round(Number(body.score)))) : undefined;
  const issues = Array.isArray(body.issues) ? body.issues.slice(0, 30).map((i) => clean(i, 200)) : [];

  try {
    const p = await payload();
    await p.create({
      collection: "site-audit-leads" as never,
      overrideAccess: true,
      data: {
        name,
        email,
        phone,
        website,
        score,
        status: "new",
        summary: issues.map((i) => `• ${i}`).join("\n"),
        locale: body.locale === "en" ? "en" : "tr",
      } as never,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[site-audit-lead] save failed", err);
    return NextResponse.json({ ok: false, error: "SERVER_ERROR" }, { status: 500 });
  }
}
