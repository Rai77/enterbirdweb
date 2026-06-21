import { getGlobalContent } from "@/lib/cms";
import type { AppLocale } from "@/cms/localization";
import { HeaderClient, type NavItem } from "./HeaderClient";

type HeaderDoc = {
  nav?: Array<{ label: string; href: string; highlight?: boolean | null }>;
  ctaLabel?: string;
  ctaHref?: string;
};

const DEFAULT_NAV: NavItem[] = [
  { href: "/services", label: "Hizmetler" },
  { href: "/work", label: "Referanslar" },
  { href: "/loom", label: "Loom", highlight: true },
  { href: "/about", label: "Hakkımızda" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "İletişim" },
];

export async function Header({ locale }: { locale: string }) {
  const data = await getGlobalContent<HeaderDoc>("header", locale as AppLocale);

  const nav: NavItem[] =
    data?.nav && data.nav.length > 0
      ? data.nav.map((n) => ({
          href: n.href,
          label: n.label,
          highlight: !!n.highlight,
        }))
      : DEFAULT_NAV;

  const cta = {
    label: data?.ctaLabel ?? "Teklif Al",
    href: data?.ctaHref ?? "/contact",
  };

  return <HeaderClient nav={nav} cta={cta} />;
}
