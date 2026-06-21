import type { Config } from "payload";

export const locales = ["tr", "en"] as const;
export type AppLocale = (typeof locales)[number];

export const localization: Config["localization"] = {
  locales: [
    { label: "Türkçe", code: "tr" },
    { label: "English", code: "en" },
  ],
  defaultLocale: "tr",
  fallback: true,
};
