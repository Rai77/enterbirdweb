import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { Container } from "./Container";
import { EMAIL } from "@/lib/contact";

export type CTABlockDoc = {
  title: string;
  titleHighlight: string;
  titleSuffix: string;
  description: string;
  primary: string;
  emailLabel: string;
};

export function CTA({ data }: { data?: CTABlockDoc } = {}) {
  // Legacy callers (without a `data` prop) still work: pull from i18n.
  const t = useTranslations("cta");
  const title = data?.title ?? t("title");
  const titleHighlight = data?.titleHighlight ?? t("titleHighlight");
  const titleSuffix = data?.titleSuffix ?? t("titleSuffix");
  const description = data?.description ?? t("description");
  const primary = data?.primary ?? t("primary");
  const emailLabel = data?.emailLabel ?? EMAIL;

  return (
    <section className="relative py-20 sm:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-[32px] border border-border bg-gradient-to-br from-surface to-background p-10 sm:p-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-brand-2/25 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-brand-3/20 blur-[120px]" />
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_30%,transparent_70%)]" />
          <div className="relative max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
              {title} <span className="text-gradient">{titleHighlight}</span>{" "}
              {titleSuffix}
            </h2>
            <p className="mt-5 text-base text-muted sm:text-lg">{description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:bg-foreground/90"
              >
                {primary}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <a
                href={`mailto:${emailLabel}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/40 px-6 py-3 text-sm font-medium text-foreground transition hover:bg-surface"
              >
                {emailLabel}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
