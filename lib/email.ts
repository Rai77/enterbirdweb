type Locale = "en" | "tr";

type Fields = {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
  locale: Locale;
  receivedAt: Date;
};

const COPY = {
  tr: {
    preheader: "Web sitenden yeni bir iletişim formu geldi.",
    badge: "Yeni mesaj",
    heading: "Sana yeni bir mesaj var.",
    subheading: "İletişim formundan geldi.",
    from: "Gönderen",
    via: "enterbird.com üzerinden",
    company: "Şirket",
    phone: "Telefon",
    service: "Hizmet",
    received: "Alındı",
    messageTitle: "Mesaj",
    primaryCta: "E-posta ile yanıtla",
    secondaryCta: "Ara",
    whatsappCta: "WhatsApp",
    footerTitle: "Enterbird AI Digital",
    footerTagline: "Markaların online dünyasını AI ile büyüten yaratıcı ekip.",
    footerNote:
      "Bu mesaja doğrudan yanıt verirsen cevabın gönderen kişiye ulaşır.",
    rights: "Tüm hakları saklıdır.",
  },
  en: {
    preheader: "A new contact form submission from your website.",
    badge: "New message",
    heading: "You have a new message.",
    subheading: "It came from the contact form.",
    from: "From",
    via: "via enterbird.com",
    company: "Company",
    phone: "Phone",
    service: "Service",
    received: "Received",
    messageTitle: "Message",
    primaryCta: "Reply by email",
    secondaryCta: "Call",
    whatsappCta: "WhatsApp",
    footerTitle: "Enterbird AI Digital",
    footerTagline:
      "A creative team growing brands' online world with AI-powered strategies.",
    footerNote:
      "If you reply directly to this message, your answer reaches the sender.",
    rights: "All rights reserved.",
  },
};

function esc(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function fmtDate(d: Date, locale: Locale): string {
  try {
    return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(d);
  } catch {
    return d.toISOString();
  }
}

function phoneTelHref(phone: string): string {
  return phone.replace(/[^+\d]/g, "");
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("") || "•";
}

export function renderContactEmail(fields: Fields): { subject: string; html: string; text: string } {
  const { name, email, company, phone, service, message, locale, receivedAt } = fields;
  const c = COPY[locale];
  const subject =
    locale === "tr" ? `Yeni mesaj · ${name}` : `New message · ${name}`;

  const received = fmtDate(receivedAt, locale);
  const telHref = phone ? phoneTelHref(phone) : "";
  const avatarText = esc(initials(name));

  const metaRow = (label: string, value: string) =>
    value
      ? `<tr>
            <td style="padding:10px 0;border-bottom:1px solid #1c2647;color:#94a3c8;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;width:90px;vertical-align:top">${esc(label)}</td>
            <td style="padding:10px 0;border-bottom:1px solid #1c2647;color:#f5f7ff;font-size:15px;vertical-align:top">${esc(value)}</td>
          </tr>`
      : "";

  const html = `<!doctype html>
<html lang="${locale}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark light">
<meta name="supported-color-schemes" content="dark light">
<title>${esc(subject)}</title>
<style>
  @media (max-width: 620px) {
    .container { width: 100% !important; padding: 16px !important; }
    .card { padding: 24px !important; border-radius: 16px !important; }
    .hero { padding: 24px !important; }
    .cta-wrap a { display: block !important; margin: 8px 0 !important; }
    .hero-name { font-size: 22px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:#04070f;color:#f5f7ff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">

<!-- Preheader -->
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${esc(c.preheader)}</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#04070f;padding:32px 0">
  <tr>
    <td align="center">
      <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px">

        <!-- Brand strip -->
        <tr>
          <td style="padding:0 8px 16px">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="left" style="color:#f5f7ff;font-size:15px;font-weight:600;letter-spacing:0.02em">
                  <span style="display:inline-block;width:10px;height:10px;border-radius:3px;background:linear-gradient(135deg,#22d3ee,#6366f1 45%,#a855f7);vertical-align:middle;margin-right:8px"></span>
                  Enterbird
                </td>
                <td align="right" style="color:#64748b;font-size:12px;letter-spacing:0.08em;text-transform:uppercase">
                  ${esc(c.via)}
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Main card -->
        <tr>
          <td class="card" style="background:#0b1124;border:1px solid #1c2647;border-radius:20px;padding:36px;overflow:hidden">

            <!-- Badge + heading -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td>
                  <div style="display:inline-block;padding:4px 10px;border-radius:999px;border:1px solid rgba(168,85,247,0.35);background:rgba(168,85,247,0.1);color:#e9d5ff;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;font-weight:600">
                    ${esc(c.badge)}
                  </div>
                  <h1 style="margin:16px 0 6px;font-size:28px;line-height:1.2;letter-spacing:-0.01em;color:#f5f7ff;font-weight:700">
                    ${esc(c.heading)}
                  </h1>
                  <p style="margin:0;color:#94a3c8;font-size:14px">${esc(c.subheading)}</p>
                </td>
              </tr>
            </table>

            <!-- Sender hero -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px">
              <tr>
                <td class="hero" style="background:linear-gradient(135deg,rgba(34,211,238,0.12),rgba(99,102,241,0.12) 50%,rgba(168,85,247,0.12));border:1px solid #1c2647;border-radius:16px;padding:22px">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="56" valign="top" style="width:56px">
                        <div style="width:48px;height:48px;border-radius:999px;background:linear-gradient(135deg,#22d3ee,#6366f1 55%,#a855f7);color:#ffffff;font-size:18px;font-weight:700;line-height:48px;text-align:center">${avatarText}</div>
                      </td>
                      <td valign="middle" style="padding-left:16px">
                        <div style="color:#94a3c8;font-size:11px;letter-spacing:0.12em;text-transform:uppercase">${esc(c.from)}</div>
                        <div class="hero-name" style="margin-top:2px;color:#f5f7ff;font-size:20px;font-weight:700;letter-spacing:-0.01em">${esc(name)}</div>
                        <div style="margin-top:2px">
                          <a href="mailto:${esc(email)}" style="color:#22d3ee;font-size:14px;text-decoration:none">${esc(email)}</a>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Meta table -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:24px">
              ${[metaRow(c.company, company), metaRow(c.phone, phone), metaRow(c.service, service), metaRow(c.received, received)].join("")}
            </table>

            <!-- Message -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px">
              <tr>
                <td>
                  <div style="color:#94a3c8;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:10px">${esc(c.messageTitle)}</div>
                  <div style="position:relative;padding:20px 22px;background:#060912;border:1px solid #1c2647;border-radius:14px;color:#e2e8f0;font-size:15px;line-height:1.65;white-space:pre-wrap;border-left:3px solid #a855f7">${esc(message)}</div>
                </td>
              </tr>
            </table>

            <!-- CTA -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px">
              <tr>
                <td class="cta-wrap" align="left">
                  <a href="mailto:${esc(email)}?subject=Re:%20Enterbird" style="display:inline-block;background:#f5f7ff;color:#060912;text-decoration:none;padding:12px 20px;border-radius:999px;font-size:14px;font-weight:600;letter-spacing:-0.01em">
                    ${esc(c.primaryCta)} &nbsp;→
                  </a>
                  ${
                    telHref
                      ? `<a href="tel:${esc(telHref)}" style="display:inline-block;margin-left:8px;background:transparent;color:#f5f7ff;text-decoration:none;padding:12px 20px;border-radius:999px;border:1px solid #1c2647;font-size:14px;font-weight:600;letter-spacing:-0.01em">${esc(c.secondaryCta)} · ${esc(phone)}</a>
                    <a href="https://wa.me/${esc(telHref.replace(/^\+/, ""))}" style="display:inline-block;margin-left:8px;background:transparent;color:#25D366;text-decoration:none;padding:12px 20px;border-radius:999px;border:1px solid rgba(37,211,102,0.35);font-size:14px;font-weight:600;letter-spacing:-0.01em">${esc(c.whatsappCta)}</a>`
                      : ""
                  }
                </td>
              </tr>
            </table>

            <!-- Divider note -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px">
              <tr>
                <td style="padding-top:20px;border-top:1px solid #1c2647;color:#64748b;font-size:12px;line-height:1.6">
                  ${esc(c.footerNote)}
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 8px 0">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="left" style="color:#64748b;font-size:12px;line-height:1.5">
                  <div style="color:#94a3c8;font-weight:600">${esc(c.footerTitle)}</div>
                  <div style="margin-top:2px">${esc(c.footerTagline)}</div>
                </td>
                <td align="right" style="color:#475569;font-size:11px;letter-spacing:0.04em">
                  © ${receivedAt.getFullYear()} · ${esc(c.rights)}
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>

</body>
</html>`;

  const text =
    `${subject}\n` +
    `${c.via}\n\n` +
    `${c.from}: ${name} <${email}>\n` +
    (company ? `${c.company}: ${company}\n` : "") +
    (phone ? `${c.phone}: ${phone}\n` : "") +
    (service ? `${c.service}: ${service}\n` : "") +
    `${c.received}: ${received}\n\n` +
    `${c.messageTitle}\n${"-".repeat(c.messageTitle.length)}\n${message}\n\n` +
    `${c.footerNote}\n`;

  return { subject, html, text };
}
