import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import { getIcon } from "@/lib/icons";
import { toAnchorId } from "@/lib/slug";

export type ServiceDoc = {
  id: string | number;
  slug: string;
  iconName: string;
  title: string;
  short: string;
  description?: string;
  bullets?: { text: string }[];
  order?: number;
};

export function ServicesGrid({
  services,
  limit,
}: {
  services: ServiceDoc[];
  limit?: number;
}) {
  const list = limit ? services.slice(0, limit) : services;
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((service) => {
        const Icon = getIcon(service.iconName);
        // Paneldeki slug boşluklu ya da Türkçe karakterli olabiliyor; bağlantı
        // ile hizmetler sayfasındaki çıpa aynı dönüşümden geçsin.
        const anchor = toAnchorId(service.slug);
        return (
          <Link
            key={service.slug}
            href={`/services#${anchor}`}
            className="group relative overflow-hidden rounded-3xl border border-border bg-surface/40 p-7 transition hover:border-brand-2/60 hover:bg-surface"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-brand-2/10 blur-3xl transition group-hover:bg-brand-2/20" />
            <div className="relative">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background/80 text-brand">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight">
                {service.title?.trim()}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {service.short?.trim()}
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/90">
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
