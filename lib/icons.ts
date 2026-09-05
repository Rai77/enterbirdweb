import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { brandIcons } from "./brandIcons";

/**
 * Panelde yazılan ikon adının karşılığı. Aynı yerde hem lucide ikonları hem
 * marka logoları kullanıldığı için ortak bir tip döndürüyoruz.
 */
export type SiteIcon = ComponentType<SVGProps<SVGSVGElement>>;

export function getIcon(name: string): SiteIcon {
  // Marka logolarına önce bakılır: lucide bunları taşımıyor, bu yüzden panele
  // "Shopify" yazıldığında ikon sessizce varsayılana düşüyordu.
  const brand = brandIcons[name?.trim().toLowerCase() ?? ""];
  if (brand) return brand;

  const Icon = (Icons as unknown as Record<string, LucideIcon>)[name];
  return Icon ?? Icons.Sparkles;
}
