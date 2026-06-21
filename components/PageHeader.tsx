import type { ReactNode } from "react";
import { Container } from "./Container";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border/60 pt-24 pb-20 sm:pt-32">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_30%,#000_30%,transparent_75%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-brand-2/15 blur-[120px]" />
      <Container size="wide" className="relative">
        <div className="max-w-3xl">
          {eyebrow && (
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {eyebrow}
            </span>
          )}
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-base text-muted sm:text-lg">
              {description}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
