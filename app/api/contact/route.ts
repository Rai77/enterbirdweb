import { NextResponse } from "next/server";
import { Resend } from "resend";
import { renderContactEmail } from "@/lib/email";
import { rateLimit, clientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Sender must be a verified domain in Resend, or use "onboarding@resend.dev"
// for initial testing. Set in Vercel env.
const FROM =
  process.env.RESEND_FROM ?? "Enterbird <onboarding@resend.dev>";
const TO = process.env.CONTACT_TO ?? "hello@enterbird.com";

// Aynı IP dakikada en fazla 3 mesaj. Gerçek bir ziyaretçi için fazlasıyla
// yeterli, otomatik bir bot için anlamlı bir duvar.
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 60_000;

/** Alan uzunluk tavanları — devasa payload'lar e-posta servisini yormasın. */
const MAX = {
  name: 100,
  email: 200,
  company: 120,
  phone: 40,
  service: 100,
  message: 5000,
} as const;

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  service?: string;
  message?: string;
  locale?: string;
  /** Honeypot — gerçek kullanıcı bunu göremez, bot doldurur. */
  website?: string;
};

/** Trim + tavan uygula. Uzunluk aşımı hata değil, sessizce kırpılır. */
function clean(value: string | undefined, max: number): string {
  return (value ?? "").trim().slice(0, max);
}

export async function POST(req: Request) {
  // ── 1) Hız sınırı ────────────────────────────────────────────────
  const limit = rateLimit(`contact:${clientIp(req)}`, RATE_LIMIT, RATE_WINDOW_MS);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "TOO_MANY_REQUESTS" },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "BAD_REQUEST" }, { status: 400 });
  }

  // ── 2) Honeypot ──────────────────────────────────────────────────
  // Dolu geldiyse gönderen bir bot. Başarılı gibi cevap ver ki bot
  // yakalandığını anlayıp taktik değiştirmesin; e-posta gönderme.
  // Bu kontrol, e-posta servisine hiç dokunmadan önce yapılır.
  if (clean(body.website, 200)) {
    console.warn("[contact] honeypot tripped, dropping submission");
    return NextResponse.json({ ok: true, id: null });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Yapılandırma hatası sunucu tarafında loglanır; istemciye detay sızmaz.
    console.error("[contact] RESEND_API_KEY is not configured.");
    return NextResponse.json({ ok: false, error: "SERVER_ERROR" }, { status: 500 });
  }
  const resend = new Resend(apiKey);

  const name = clean(body.name, MAX.name);
  const email = clean(body.email, MAX.email);
  const company = clean(body.company, MAX.company);
  const phone = clean(body.phone, MAX.phone);
  const service = clean(body.service, MAX.service);
  const message = clean(body.message, MAX.message);
  const locale = body.locale === "tr" ? "tr" : "en";

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "MISSING_FIELDS" }, { status: 400 });
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return NextResponse.json({ ok: false, error: "INVALID_EMAIL" }, { status: 400 });
  }

  const { subject, html, text } = renderContactEmail({
    name,
    email,
    company,
    phone,
    service,
    message,
    locale,
    receivedAt: new Date(),
  });

  try {
    const { data, error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: email,
      subject,
      html,
      text,
    });

    if (error) {
      // Resend'in ham hata metni istemciye gitmez — içinde yapılandırma
      // detayı (domain, kota, anahtar durumu) olabilir.
      console.error("[contact] resend error", error);
      return NextResponse.json({ ok: false, error: "SEND_FAILED" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, id: data?.id ?? null });
  } catch (err) {
    console.error("[contact] unexpected", err);
    return NextResponse.json({ ok: false, error: "SERVER_ERROR" }, { status: 500 });
  }
}
