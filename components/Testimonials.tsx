import { Quote } from "lucide-react";

export type TestimonialDoc = {
  id?: string | number;
  order?: number;
  quote: string;
  name: string;
  role: string;
  brand?: string | null;
  avatar?:
    | {
        url?: string | null;
        alt?: string | null;
      }
    | string
    | number
    | null;
};

export function Testimonials({
  testimonials,
}: {
  testimonials: TestimonialDoc[];
}) {
  if (!testimonials?.length) return null;
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {testimonials.map((t) => (
        <figure
          key={t.id ?? t.name}
          className="relative flex flex-col rounded-3xl border border-border bg-surface/40 p-7"
        >
          <Quote className="h-6 w-6 text-brand" />
          <blockquote className="mt-4 text-base leading-relaxed text-foreground/90">
            “{t.quote}”
          </blockquote>
          <figcaption className="mt-6 border-t border-border/60 pt-5">
            <div className="text-sm font-medium">{t.name}</div>
            <div className="text-xs text-muted">
              {t.role}
              {t.brand ? ` · ${t.brand}` : ""}
            </div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
