import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { ContactForm, type ContactFormData } from "@/components/ContactForm";
import { Mail, MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { getContactInfo } from "@/lib/contactInfo";

import { getGlobalContent } from "@/lib/cms";
import type { AppLocale } from "@/cms/localization";
import type { ContactPageDoc } from "@/cms/types/globals";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("contact") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Telefon/e-posta/sosyal medya artık panelden geliyor (Footer → İletişim).
  const [contact, info] = await Promise.all([
    getGlobalContent<ContactPageDoc>("contact-page", locale as AppLocale),
    getContactInfo(locale as AppLocale),
  ]);
  const t = await getTranslations({ locale, namespace: "nav" });

  if (!contact) {
    return (
      <Section>
        <Container>
          <p className="text-muted">Contact page content not yet configured.</p>
        </Container>
      </Section>
    );
  }

  const contacts = [
    {
      icon: MessageCircle,
      label: contact.labels.whatsapp,
      value: info.whatsappDisplay,
      href: `https://wa.me/${info.whatsappNumber}`,
    },
    {
      icon: Mail,
      label: contact.labels.email,
      value: info.email,
      href: `mailto:${info.email}`,
    },
    {
      icon: Phone,
      label: contact.labels.phone,
      value: info.whatsappDisplay,
      href: `tel:${info.phoneHref}`,
    },
    {
      icon: MapPin,
      label: contact.labels.office,
      value: contact.values.office,
    },
    {
      icon: Clock,
      label: contact.labels.hours,
      value: contact.values.hours,
    },
  ];

  const formData: ContactFormData = {
    name: contact.form.name,
    namePlaceholder: contact.form.namePlaceholder,
    email: contact.form.email,
    emailPlaceholder: contact.form.emailPlaceholder,
    company: contact.form.company,
    companyPlaceholder: contact.form.companyPlaceholder,
    phone: contact.form.phone,
    phonePlaceholder: contact.form.phonePlaceholder,
    service: contact.form.service,
    message: contact.form.message,
    messagePlaceholder: contact.form.messagePlaceholder,
    submit: contact.form.submit,
    privacy: contact.form.privacy,
    services: contact.form.services,
    successTitle: contact.form.successTitle,
    successMessage: contact.form.successMessage,
  };

  return (
    <>
      <PageHeader
        eyebrow={t("contact")}
        title={
          <>
            {contact.pageTitle}{" "}
            <span className="text-gradient">{contact.pageTitleHighlight}</span>
            {contact.pageTitleSuffix}
          </>
        }
        description={contact.pageDescription}
      />

      <Section>
        <Container>
          <div className="grid gap-12 md:grid-cols-5">
            <div className="md:col-span-2 space-y-6">
              <div className="space-y-2">
                {contacts.map((c) => {
                  const Icon = c.icon;
                  const inner = (
                    <div className="flex items-start gap-4">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border bg-surface/60 text-brand">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-wider text-muted">
                          {c.label}
                        </div>
                        <div className="mt-1 text-base text-foreground">
                          {c.value}
                        </div>
                      </div>
                    </div>
                  );
                  return c.href ? (
                    <a
                      key={c.label}
                      href={c.href}
                      className="block rounded-2xl border border-transparent p-3 transition hover:border-border hover:bg-surface/40"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div key={c.label} className="block p-3">
                      {inner}
                    </div>
                  );
                })}
              </div>

              <div className="rounded-2xl border border-border bg-surface/40 p-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted">
                  {contact.labels.social}
                </div>
                <div className="mt-4 flex flex-col gap-3">
                  <a
                    href={info.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-background/60 px-4 py-3 transition hover:border-brand-2/60 hover:bg-surface"
                  >
                    <span className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-fuchsia-500 to-amber-400 text-white">
                        <InstagramGlyph className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block text-xs uppercase tracking-wider text-muted">
                          Instagram
                        </span>
                        <span className="block text-sm text-foreground">
                          {info.instagramHandle}
                        </span>
                      </span>
                    </span>
                    <span className="text-muted transition group-hover:text-foreground">
                      ↗
                    </span>
                  </a>
                  <a
                    href={info.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-background/60 px-4 py-3 transition hover:border-brand-2/60 hover:bg-surface"
                  >
                    <span className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#0A66C2] text-white">
                        <LinkedinGlyph className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block text-xs uppercase tracking-wider text-muted">
                          LinkedIn
                        </span>
                        <span className="block text-sm text-foreground">
                          /{info.linkedinHandle}
                        </span>
                      </span>
                    </span>
                    <span className="text-muted transition group-hover:text-foreground">
                      ↗
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="md:col-span-3">
              <ContactForm data={formData} />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function InstagramGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedinGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
