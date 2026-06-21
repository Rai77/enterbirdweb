import { useTranslations } from "next-intl";
import { partners } from "@/lib/data";
import { Container } from "./Container";

export function Marquee({ eyebrow }: { eyebrow?: string } = {}) {
  // Fallback to i18n messages if no eyebrow prop supplied (keeps legacy callers happy).
  const t = useTranslations("marquee");
  const label = eyebrow ?? t("eyebrow");

  const Track = ({ ariaHidden = false }: { ariaHidden?: boolean }) => (
    <ul
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center gap-10 pr-10 sm:gap-12 sm:pr-12"
    >
      {partners.map((p) => (
        <li key={p.name} className="flex h-8 shrink-0 items-center" title={p.name}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.src}
            alt={p.name}
            className="logo-mono h-6 w-auto transition duration-300"
          />
        </li>
      ))}
    </ul>
  );

  return (
    <section className="py-12">
      <Container size="default">
        <p className="mb-5 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
          {label}
        </p>
        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-full border border-border bg-surface/40 py-4 backdrop-blur-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface/80 to-transparent" />
          <div className="flex w-max animate-[marquee_28s_linear_infinite]">
            <Track />
            <Track ariaHidden />
          </div>
        </div>
      </Container>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0) }
          100% { transform: translateX(-50%) }
        }
      `}</style>
    </section>
  );
}
