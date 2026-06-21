"use client";

import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Globe } from "lucide-react";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: string) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- pathname typing is dynamic
        { pathname, params },
        { locale: next },
      );
    });
  }

  return (
    <div className="relative inline-flex items-center rounded-full border border-border bg-surface/60 p-0.5 text-xs font-medium backdrop-blur-md">
      <Globe className="ml-2 h-3.5 w-3.5 text-muted" aria-hidden />
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            onClick={() => !active && switchTo(l)}
            disabled={isPending}
            className={`relative ml-1 inline-flex items-center rounded-full px-2.5 py-1 uppercase tracking-wide transition ${
              active
                ? "bg-foreground text-background"
                : "text-muted hover:text-foreground"
            }`}
            aria-pressed={active}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
