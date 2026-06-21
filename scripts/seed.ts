/**
 * Seed script — populates Payload CMS from messages/*.json + lib/data.ts
 *
 * Usage:
 *   npm run seed          # idempotent — only inserts if empty
 *   npm run seed:reset    # clear collections/globals then re-seed
 */

import { getPayload } from "payload";
import config from "../payload.config";

import { seedServices } from "../cms/seed/services";
import { seedProjects } from "../cms/seed/projects";
import { seedTestimonials } from "../cms/seed/testimonials";
import { seedTeam } from "../cms/seed/team";
import { seedBlogPosts } from "../cms/seed/blogPosts";
import { seedHeader } from "../cms/seed/header";
import { seedFooter } from "../cms/seed/footer";
import { seedHomePage } from "../cms/seed/homePage";
import { seedServicesPage } from "../cms/seed/servicesPage";
import { seedAboutPage } from "../cms/seed/aboutPage";
import { seedLoomPage } from "../cms/seed/loomPage";
import { seedContactPage } from "../cms/seed/contactPage";
import { seedCTABlock } from "../cms/seed/ctaBlock";

const reset = process.argv.includes("--reset");

async function main() {
  console.log(`\n🌱 Seeding Payload${reset ? " (RESET MODE)" : ""}\n`);
  const payload = await getPayload({ config });

  const steps: Array<[string, () => Promise<void>]> = [
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
    process.stdout.write(`  • ${label}… `);
    try {
      await run();
      process.stdout.write("✓\n");
    } catch (err) {
      process.stdout.write(`✗\n`);
      console.error(err);
    }
  }

  console.log("\n✅ Seed complete.\n");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
