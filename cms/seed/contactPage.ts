import type { Payload } from "payload";
import trMessages from "../../messages/tr.json";
import enMessages from "../../messages/en.json";

type ContactSrc = {
  pageTitle: string;
  pageTitleHighlight: string;
  pageTitleSuffix: string;
  pageDescription: string;
  labels: Record<string, string>;
  values: Record<string, string>;
  form: {
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    company: string;
    companyPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    service: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    privacy: string;
    services: string[];
    successTitle: string;
    successMessage: string;
  };
};

function mapContact(src: ContactSrc) {
  return {
    pageTitle: src.pageTitle,
    pageTitleHighlight: src.pageTitleHighlight,
    pageTitleSuffix: src.pageTitleSuffix,
    pageDescription: src.pageDescription,
    labels: {
      whatsapp: src.labels.whatsapp,
      email: src.labels.email,
      phone: src.labels.phone,
      office: src.labels.office,
      hours: src.labels.hours,
      social: src.labels.social,
    },
    values: {
      office: src.values.office,
      hours: src.values.hours,
    },
    form: {
      name: src.form.name,
      namePlaceholder: src.form.namePlaceholder,
      email: src.form.email,
      emailPlaceholder: src.form.emailPlaceholder,
      company: src.form.company,
      companyPlaceholder: src.form.companyPlaceholder,
      phone: src.form.phone,
      phonePlaceholder: src.form.phonePlaceholder,
      service: src.form.service,
      message: src.form.message,
      messagePlaceholder: src.form.messagePlaceholder,
      submit: src.form.submit,
      privacy: src.form.privacy,
      services: (src.form.services ?? []).map((label) => ({ label })),
      successTitle: src.form.successTitle,
      successMessage: src.form.successMessage,
    },
  };
}

export async function seedContactPage(
  payload: Payload,
  { reset = false }: { reset?: boolean } = {},
): Promise<void> {
  const cTr = trMessages.contact as unknown as ContactSrc;
  const cEn = enMessages.contact as unknown as ContactSrc;

  await payload.updateGlobal({
    slug: "contact-page",
    locale: "tr",
    data: mapContact(cTr),
  });

  await payload.updateGlobal({
    slug: "contact-page",
    locale: "en",
    data: mapContact(cEn),
  });

  void reset;
}
