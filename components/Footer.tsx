import { Link } from "@/i18n/navigation";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { getGlobalContent } from "@/lib/cms";
import type { AppLocale } from "@/cms/localization";

type FooterLink = { label: string; href: string };
type FooterDoc = {
  tagline?: string;
  location?: string;
  servicesLinks?: FooterLink[];
  companyLinks?: FooterLink[];
  contact?: {
    email?: string;
    phoneDisplay?: string;
    phoneE164?: string;
    whatsappNumber?: string;
    instagramUrl?: string;
    linkedinUrl?: string;
  };
  madeWith?: string;
  rights?: string;
};

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export async function Footer({ locale }: { locale: string }) {
  const data = await getGlobalContent<FooterDoc>(
    "footer",
    locale as AppLocale,
  );

  const tagline =
    data?.tagline ??
    "Markaların online dünyasını AI destekli stratejilerle büyüten yaratıcı bir ekip. İstanbul merkezli, dünyanın her yerinde çalışıyoruz.";
  const location = data?.location ?? "İstanbul, Türkiye";
  const madeWith = data?.madeWith ?? "Made with care in İstanbul.";
  const rights = data?.rights ?? "Tüm hakları saklıdır.";
  const email = data?.contact?.email ?? "hello@enterbird.com";
  const whatsappNumber = data?.contact?.whatsappNumber ?? "905425995077";
  const phoneDisplay = data?.contact?.phoneDisplay ?? "+90 542 599 50 77";
  const instagramUrl = data?.contact?.instagramUrl ?? "https://instagram.com/enterbird";
  const linkedinUrl = data?.contact?.linkedinUrl ?? "https://linkedin.com/company/enterbird";

  const servicesHeading = locale === "en" ? "Services" : "Hizmetler";
  const companyHeading = locale === "en" ? "Company" : "Şirket";
  const contactHeading = locale === "en" ? "Contact" : "İletişim";

  const servicesLinks: FooterLink[] =
    data?.servicesLinks && data.servicesLinks.length > 0
      ? data.servicesLinks
      : [
          { label: "E-Ticaret Altyapısı", href: "/services#ecommerce" },
          { label: "Performans Pazarlama", href: "/services#performance" },
          { label: "SEO & Organik Büyüme", href: "/services#seo" },
          { label: "Pazaryeri Yönetimi", href: "/services#marketplace" },
          { label: "Operasyon & Lojistik", href: "/services#operations" },
          { label: "AI Otomasyon", href: "/services#ai" },
        ];

  const companyLinks: FooterLink[] =
    data?.companyLinks && data.companyLinks.length > 0
      ? data.companyLinks
      : [
          { label: "Hakkımızda", href: "/about" },
          { label: "Referanslar", href: "/work" },
          { label: "Blog", href: "/blog" },
          { label: "İletişim", href: "/contact" },
        ];

  return (
    <footer className="relative mt-24 border-t border-border/60">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-2/40 to-transparent" />

      <Container size="wide">
        <div className="grid gap-10 py-16 md:grid-cols-12 md:gap-8 lg:gap-12">
          {/* Brand */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="flex items-center gap-4">
              <Logo />
              <div className="flex items-center gap-2">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted transition hover:border-brand hover:text-foreground"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted transition hover:border-brand hover:text-foreground"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              {tagline}
            </p>
          </div>

          {/* Services */}
          <div className="md:col-span-3 lg:col-span-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-muted">
              {servicesHeading}
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              {servicesLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-foreground/80 transition hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-4 lg:col-span-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-muted">
              {companyHeading}
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-foreground/80 transition hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-12 lg:col-span-4">
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-muted">
              {contactHeading}
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-2 text-foreground/80 transition hover:text-foreground"
                >
                  <Mail className="h-4 w-4 text-muted" />
                  {email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-foreground/80 transition hover:text-foreground"
                >
                  <MessageCircle className="h-4 w-4 text-muted" />
                  {phoneDisplay}
                </a>
              </li>
              <li>
                <span className="inline-flex items-center gap-2 text-foreground/80">
                  <MapPin className="h-4 w-4 text-muted" />
                  {location}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border/60 py-6 text-xs text-muted md:flex-row">
          <p>
            © {new Date().getFullYear()} Enterbird AI Digital. {rights}
          </p>
          <p className="opacity-80">{madeWith}</p>
        </div>
      </Container>
    </footer>
  );
}
