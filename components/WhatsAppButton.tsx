"use client";

import { useTranslations } from "next-intl";
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY } from "@/lib/contact";

export function WhatsAppButton() {
  const t = useTranslations("whatsapp");
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t("defaultMessage"))}`;
  return (
    <div className="fixed bottom-6 right-6 z-50 sm:bottom-8 sm:right-8">
      {/* Chat bubble tail — two small dots, bottom-left of the button */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-0.5 -left-1 h-3 w-3 rounded-full bg-[#25D366] opacity-90"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-2 -left-3 h-1.5 w-1.5 rounded-full bg-[#25D366] opacity-75"
      />

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${t("label")} · ${WHATSAPP_DISPLAY}`}
        className="group relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_20px_60px_-15px_rgba(37,211,102,0.6)] transition hover:bg-[#20bd5a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[#25D366] opacity-50 blur-md transition group-hover:opacity-70" />
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 w-6"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
        </svg>

        {/* Tooltip — appears on hover/focus */}
        <span
          role="tooltip"
          className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-full bg-foreground/95 px-3 py-1.5 text-xs font-medium text-background opacity-0 shadow-lg backdrop-blur-md transition duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
        >
          {t("ctaText")}
        </span>
      </a>
    </div>
  );
}
