import { NextResponse } from "next/server";
import { Resend } from "resend";
import { renderContactEmail } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Sender must be a verified domain in Resend, or use "onboarding@resend.dev"
// for initial testing. Set in Vercel env.
const FROM =
  process.env.RESEND_FROM ?? "Enterbird <onboarding@resend.dev>";
const TO = process.env.CONTACT_TO ?? "hello@enterbird.com";

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  service?: string;
  message?: string;
  locale?: string;
};

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "RESEND_API_KEY is not configured." },
      { status: 500 },
    );
  }
  const resend = new Resend(apiKey);

  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const company = (body.company ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const service = (body.service ?? "").trim();
  const message = (body.message ?? "").trim();
  const locale = body.locale === "tr" ? "tr" : "en";

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "name, email, message are required." },
      { status: 400 },
    );
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return NextResponse.json(
      { ok: false, error: "Invalid email address." },
      { status: 400 },
    );
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
      console.error("[contact] resend error", error);
      return NextResponse.json(
        { ok: false, error: error.message ?? "Email send failed." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, id: data?.id ?? null });
  } catch (err) {
    console.error("[contact] unexpected", err);
    return NextResponse.json(
      { ok: false, error: "Unexpected server error." },
      { status: 500 },
    );
  }
}
