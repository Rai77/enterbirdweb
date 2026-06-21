import { useTranslations } from "next-intl";
import { Compass, PenTool, Rocket, LineChart } from "lucide-react";

const stepKeys = ["step1", "step2", "step3", "step4"] as const;
const stepIcons = [Compass, PenTool, Rocket, LineChart];

export type ProcessStep = { title: string; text: string };

/**
 * Süreç adımları.
 * Tercih edilen: CMS'ten gelen `steps` prop'u.
 * Fallback: i18n mesajları (steps boş/eksikse) — geriye dönük uyumluluk.
 */
export function Process({ steps }: { steps?: ProcessStep[] } = {}) {
  const t = useTranslations("process");
  const resolved: ProcessStep[] =
    steps && steps.length > 0
      ? steps.slice(0, 4)
      : stepKeys.map((key) => ({
          title: t(`${key}.title`),
          text: t(`${key}.text`),
        }));

  return (
    <div className="relative">
      <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-border to-transparent md:block" />
      <ol className="grid gap-6 md:grid-cols-2">
        {resolved.map((step, i) => {
          const Icon = stepIcons[i] ?? Compass;
          return (
            <li
              key={i}
              className="relative rounded-3xl border border-border bg-surface/40 p-7"
            >
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border bg-background/80 text-brand">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-muted">
                    0{i + 1} / 0{resolved.length}
                  </div>
                  <h3 className="mt-1 text-xl font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{step.text}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
