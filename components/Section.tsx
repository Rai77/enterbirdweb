import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("relative py-20 sm:py-28", className)}>
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
}) {
  // Sadece boşluktan ibaret bir değer, panelde temizlenmiş alan demektir.
  const eyebrowText = eyebrow?.trim();
  const hasDescription =
    typeof description === "string"
      ? Boolean(description.trim())
      : Boolean(description);

  return (
    <div
      className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}
    >
      {eyebrowText && (
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          {eyebrowText}
        </span>
      )}
      <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {hasDescription && (
        <p className="mt-5 text-base text-muted sm:text-lg">{description}</p>
      )}
    </div>
  );
}
