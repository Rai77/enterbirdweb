import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function getIcon(name: string): LucideIcon {
  const Icon = (Icons as unknown as Record<string, LucideIcon>)[name];
  return Icon ?? Icons.Sparkles;
}
