"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Logo } from "./Logo";
import { Container } from "./Container";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/cn";

export type NavItem = { href: string; label: string; highlight?: boolean };

export function HeaderClient({
  nav,
  cta,
}: {
  nav: NavItem[];
  cta: { label: string; href: string };
}) {
  const tUi = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <Container size="wide">
        <div className="flex h-36 items-center justify-between">
          <Logo />

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) =>
              item.highlight ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative ml-1 inline-flex items-center gap-1.5 rounded-full border border-brand-2/40 bg-gradient-to-r from-brand/10 via-brand-2/10 to-brand-3/10 px-4 py-2 text-sm font-medium text-foreground transition hover:border-brand-2/70"
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
                  </span>
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-4 py-2 text-sm text-muted transition hover:bg-surface hover:text-foreground"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <LanguageSwitcher />
            <Link
              href={cta.href}
              className="group relative ml-1 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition hover:bg-foreground/90"
            >
              {cta.label}
              <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <LanguageSwitcher />
            <button
              type="button"
              className="rounded-md p-2 text-foreground"
              onClick={() => setOpen(!open)}
              aria-label={tUi("toggleMenu")}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden pb-4">
            <div className="glass rounded-2xl p-2">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-xl px-4 py-3 text-sm text-foreground/90 hover:bg-surface-2"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={cta.href}
                className="mt-2 block rounded-xl bg-foreground px-4 py-3 text-center text-sm font-medium text-background"
              >
                {cta.label}
              </Link>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
