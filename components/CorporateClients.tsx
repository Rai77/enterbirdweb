import { ArrowUpRight } from "lucide-react";
import type { CorporateClient } from "@/lib/corporateClients";

/**
 * Kurumsal markalar şeridi.
 *
 * Proje kartı yerine ince çizgiyle bölünmüş tek bir panel kullanıyoruz — aynı
 * dil Hakkımızda sayfasındaki rakam panelinde de var, böylece sayfaya sonradan
 * eklenmiş gibi durmuyor. Hücrede yalnızca marka adı ve alan adı görünür.
 */
export function CorporateClients({ clients }: { clients: CorporateClient[] }) {
  if (clients.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border bg-border/60 sm:grid-cols-2 lg:grid-cols-5">
      {clients.map((client) => {
        const body = (
          <>
            <span className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand-2/10 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" />
            <div className="relative">
              <div className="text-lg font-semibold tracking-tight">
                {client.name}
              </div>
              {client.domain && (
                <div className="mt-1 text-xs text-muted">{client.domain}</div>
              )}
            </div>
            {client.url && (
              <ArrowUpRight className="relative h-4 w-4 shrink-0 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
            )}
          </>
        );

        const shell =
          "group relative flex flex-col justify-between gap-8 bg-background/80 p-7";

        // Panelde adres girilmemiş bir marka tıklanabilir görünmemeli.
        return client.url ? (
          <a
            key={client.name}
            href={client.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${shell} transition hover:bg-surface`}
          >
            {body}
          </a>
        ) : (
          <div key={client.name} className={shell}>
            {body}
          </div>
        );
      })}
    </div>
  );
}
