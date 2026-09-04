"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

export type ContactFormData = {
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
  services: { label: string }[] | string[];
  successTitle: string;
  successMessage: string;
};

function normaliseServices(services: ContactFormData["services"]): string[] {
  if (!services) return [];
  return services.map((s) =>
    typeof s === "string" ? s : (s?.label ?? ""),
  ).filter(Boolean);
}

/**
 * Sunucudan gelen hata kodunu ziyaretçinin anlayacağı bir cümleye çevirir.
 * Kod tarafı asla ham hata metnini göstermez — içinde yapılandırma detayı olabilir.
 */
function errorText(code: string, locale: string): string {
  const tr = locale === "tr";
  switch (code) {
    case "TOO_MANY_REQUESTS":
      return tr
        ? "Çok fazla mesaj gönderdiniz. Lütfen bir dakika bekleyip tekrar deneyin."
        : "Too many messages. Please wait a minute and try again.";
    case "MISSING_FIELDS":
      return tr
        ? "Ad, e-posta ve mesaj alanları zorunludur."
        : "Name, email and message are required.";
    case "INVALID_EMAIL":
      return tr
        ? "E-posta adresi geçerli görünmüyor. Kontrol eder misiniz?"
        : "That email address doesn't look valid. Could you check it?";
    default:
      return tr
        ? "Mesaj gönderilemedi. Lütfen tekrar deneyin — sorun sürerse hello@enterbird.com adresine yazabilirsiniz."
        : "We couldn't send your message. Please try again — if it keeps failing, email hello@enterbird.com.";
  }
}

export function ContactForm({ data }: { data?: ContactFormData } = {}) {
  // Legacy fallback: read from i18n when the parent didn't provide CMS data.
  const t = useTranslations("contact.form");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const labels: ContactFormData = data ?? {
    name: t("name"),
    namePlaceholder: t("namePlaceholder"),
    email: t("email"),
    emailPlaceholder: t("emailPlaceholder"),
    company: t("company"),
    companyPlaceholder: t("companyPlaceholder"),
    phone: t("phone"),
    phonePlaceholder: t("phonePlaceholder"),
    service: t("service"),
    message: t("message"),
    messagePlaceholder: t("messagePlaceholder"),
    submit: t("submit"),
    privacy: t("privacy"),
    services: t.raw("services") as string[],
    successTitle: t("successTitle"),
    successMessage: t("successMessage"),
  };
  const services = normaliseServices(labels.services);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      company: String(fd.get("company") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      service: String(fd.get("service") ?? ""),
      message: String(fd.get("message") ?? ""),
      // Honeypot — ekranda görünmez, yalnız botlar doldurur.
      website: String(fd.get("website") ?? ""),
      locale,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !json.ok) {
        throw new Error(json.error ?? "SERVER_ERROR");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      // Sunucu artık ham hata metni değil, sabit bir kod döndürüyor. Ziyaretçiye
      // ne olduğunu ve ne yapabileceğini söyleyen kendi metnimizi gösteriyoruz.
      const code = err instanceof Error ? err.message : "SERVER_ERROR";
      setErrorMessage(errorText(code, locale));
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-border bg-surface/40 p-12 text-center">
        <CheckCircle2 className="h-12 w-12 text-brand" />
        <h3 className="mt-4 text-2xl font-semibold tracking-tight">
          {labels.successTitle}
        </h3>
        <p className="mt-2 max-w-sm text-sm text-muted">
          {labels.successMessage}
        </p>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 rounded-3xl border border-border bg-surface/40 p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label={labels.name}
          name="name"
          placeholder={labels.namePlaceholder}
          required
          disabled={submitting}
        />
        <Field
          label={labels.email}
          name="email"
          type="email"
          placeholder={labels.emailPlaceholder}
          required
          disabled={submitting}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label={labels.company}
          name="company"
          placeholder={labels.companyPlaceholder}
          disabled={submitting}
        />
        <Field
          label={labels.phone}
          name="phone"
          placeholder={labels.phonePlaceholder}
          disabled={submitting}
        />
      </div>
      <div>
        <label
          htmlFor="contact-service"
          className="block text-xs font-medium uppercase tracking-wider text-muted"
        >
          {labels.service}
        </label>
        <select
          id="contact-service"
          name="service"
          disabled={submitting}
          className="mt-2 w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground focus:border-brand focus:outline-none disabled:opacity-60"
        >
          {services.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="contact-message"
          className="block text-xs font-medium uppercase tracking-wider text-muted"
        >
          {labels.message}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          maxLength={5000}
          disabled={submitting}
          placeholder={labels.messagePlaceholder}
          className="mt-2 w-full resize-none rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted/80 focus:border-brand focus:outline-none disabled:opacity-60"
        />
      </div>

      {/*
        Honeypot: ekranda görünmez, klavye ile sekmelenmez, ekran okuyucuya
        gizlidir. İnsan asla dolduramaz; formu otomatik dolduran botlar doldurur.
        Dolu geldiğinde sunucu mesajı sessizce çöpe atar.
      */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
      >
        <label htmlFor="contact-website">Web sitesi</label>
        <input
          id="contact-website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status === "error" && errorMessage && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {labels.submit}…
          </>
        ) : (
          <>
            {labels.submit}
            <Send className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </>
        )}
      </button>
      <p className="text-xs text-muted">{labels.privacy}</p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  disabled,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}) {
  // `htmlFor` ↔ `id` bağı olmadan ekran okuyucular kutunun ne olduğunu
  // söyleyemez. Alan adı zaten benzersiz, id olarak onu kullanıyoruz.
  const id = `contact-${name}`;
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-medium uppercase tracking-wider text-muted"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="mt-2 w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted/80 focus:border-brand focus:outline-none disabled:opacity-60"
      />
    </div>
  );
}
