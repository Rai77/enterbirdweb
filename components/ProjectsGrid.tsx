import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export type ProjectDoc = {
  id: string | number;
  slug: string;
  title: string;
  category: string;
  summary: string;
  services?: { text: string }[];
  image?: { url?: string | null; alt?: string | null } | string | null;
  imageExternalUrl?: string | null;
  gradient: string;
  url?: string | null;
  ongoing?: boolean | null;
  order?: number;
};

export type ProjectsGridStrings = {
  visit: string;
  ongoingBadge: string;
};

/**
 * Projeye gömülü referans görselleri, slug'a göre.
 *
 * Panelden görsel yüklemek her zaman mümkün olmadığı için, burada duran dosya
 * son çare olarak devreye girer: panelde bir görsel varsa o kazanır, yoksa
 * kart boş gradient yerine gerçek siteyi gösterir.
 *
 * Anahtarlar küçük harf — panelde slug "Tishoostore" da olabilir "tishoostore" da.
 */
const localProjectImages: Record<string, string> = {
  fou: "/projects/fou.jpg",
  tishoostore: "/projects/tishoostore.jpg",
  // Ponchico'nun sitesi kapandı, ekran görüntüsü alınamıyor. Kartta markanın
  // kendi kampanya banner'ı var; 16:10'a sığması için kendi bulanık kopyasının
  // üzerine oturtuldu (kırpmak logoyu ya da görseli kesiyordu).
  ponchico: "/projects/ponchico.jpg",
};

function resolveImageSrc(project: ProjectDoc): string | null {
  if (project.imageExternalUrl) return project.imageExternalUrl;
  if (
    project.image &&
    typeof project.image === "object" &&
    project.image?.url
  ) {
    return project.image.url;
  }
  if (typeof project.image === "string") return project.image;
  return localProjectImages[project.slug?.trim().toLowerCase() ?? ""] ?? null;
}

export function ProjectsGrid({
  projects,
  strings,
  limit,
}: {
  projects: ProjectDoc[];
  strings: ProjectsGridStrings;
  limit?: number;
}) {
  const list = limit ? projects.slice(0, limit) : projects;
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {list.map((p) => {
        const services = (p.services ?? []).map((s) => s.text).filter(Boolean);
        const imageSrc = resolveImageSrc(p);

        const card = (
          <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface/40 p-1 transition hover:border-brand-2/60">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[20px]">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={p.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                />
              ) : (
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${p.gradient}`}
                />
              )}
              <div
                className={`absolute inset-0 mix-blend-overlay bg-gradient-to-br ${p.gradient}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <span className="text-xs font-medium uppercase tracking-wider text-foreground/80">
                  {p.category}
                </span>
                <h3 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                  {p.title}
                </h3>
              </div>
              {p.ongoing && (
                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-emerald-300 backdrop-blur-md">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  {strings.ongoingBadge}
                </div>
              )}
              {p.url && (
                <div className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-border/80 bg-background/60 text-foreground backdrop-blur-md transition group-hover:bg-foreground group-hover:text-background">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="text-sm text-muted">{p.summary}</p>
              {services.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {services.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-[11px] font-medium text-muted"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
              {p.url && (
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/90">
                  {strings.visit}
                  <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              )}
            </div>
          </div>
        );
        return p.url ? (
          <a
            key={p.slug}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            {card}
          </a>
        ) : (
          <div key={p.slug}>{card}</div>
        );
      })}
    </div>
  );
}
