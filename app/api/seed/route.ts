/**
 * POST /api/seed           — idempotent seed (skips if populated)
 * POST /api/seed?reset=1   — clears collections + re-seeds everything
 *
 * Gated by SEED_TOKEN env var (or "dev-only" secret in development).
 * Hit with:
 *   curl -X POST 'http://localhost:3000/api/seed' -H 'x-seed-token: <token>'
 *   curl -X POST 'http://localhost:3000/api/seed?reset=1' -H 'x-seed-token: <token>'
 */

import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@/payload.config";

import { seedServices } from "@/cms/seed/services";
import { seedProjects } from "@/cms/seed/projects";
import { seedTestimonials } from "@/cms/seed/testimonials";
import { seedTeam } from "@/cms/seed/team";
import { seedBlogPosts } from "@/cms/seed/blogPosts";
import { seedHeader } from "@/cms/seed/header";
import { seedFooter } from "@/cms/seed/footer";
import { seedHomePage } from "@/cms/seed/homePage";
import { seedServicesPage } from "@/cms/seed/servicesPage";
import { seedAboutPage } from "@/cms/seed/aboutPage";
import { seedLoomPage } from "@/cms/seed/loomPage";
import { seedContactPage } from "@/cms/seed/contactPage";
import { seedCTABlock } from "@/cms/seed/ctaBlock";
import { seedAdminUser } from "@/cms/seed/users";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEV_TOKEN = "dev-only-seed";

export async function POST(req: Request) {
  const isProd = process.env.NODE_ENV === "production";

  // Prod'da SEED_TOKEN tanımlı DEĞİLSE endpoint tamamen kapalıdır. Aksi halde
  // bilinen varsayılan token ile prod DB'si silinip yeniden seed'lenebilirdi.
  if (isProd && !process.env.SEED_TOKEN) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const expected = process.env.SEED_TOKEN ?? (isProd ? null : DEV_TOKEN);
  const provided = req.headers.get("x-seed-token");
  if (!expected || provided !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const reset = url.searchParams.get("reset") === "1";

  const results: Array<{ step: string; status: "ok" | "error"; error?: string }> = [];
  const payload = await getPayload({ config });

  const steps: Array<[string, () => Promise<void>]> = [
    ["Admin User", () => seedAdminUser(payload, { reset })],
    ["Header", () => seedHeader(payload, { reset })],
    ["Footer", () => seedFooter(payload, { reset })],
    ["Services", () => seedServices(payload, { reset })],
    ["Projects", () => seedProjects(payload, { reset })],
    ["Testimonials", () => seedTestimonials(payload, { reset })],
    ["Team Members", () => seedTeam(payload, { reset })],
    ["Blog Posts", () => seedBlogPosts(payload, { reset })],
    ["Home Page", () => seedHomePage(payload, { reset })],
    ["Services Page", () => seedServicesPage(payload, { reset })],
    ["About Page", () => seedAboutPage(payload, { reset })],
    ["Loom Page", () => seedLoomPage(payload, { reset })],
    ["Contact Page", () => seedContactPage(payload, { reset })],
    ["CTA Block", () => seedCTABlock(payload, { reset })],
  ];

  for (const [label, run] of steps) {
    try {
      await run();
      results.push({ step: label, status: "ok" });
    } catch (err) {
      console.error(`[seed] ${label} failed:`, err);
      results.push({
        step: label,
        status: "error",
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  const okCount = results.filter((r) => r.status === "ok").length;
  return NextResponse.json(
    { reset, total: results.length, ok: okCount, results },
    { status: 200 },
  );
}
