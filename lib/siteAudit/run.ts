import { safeFetch, normalizeUrl, AuditUrlError } from "./safeFetch";
import { runPageSpeed } from "./pagespeed";
import { issue, PASSED, type IssueId } from "./copy";
import type { AuditResult, Issue, Locale } from "./types";

const SEVERITY_ORDER = { critical: 0, high: 1, medium: 2, low: 3 } as const;

/** Site içi kontrollerin ağırlıkları (toplam 100). */
const WEIGHTS: Partial<Record<IssueId, number>> = {
  noHttps: 15,
  noindex: 15,
  noViewport: 12,
  noStructuredData: 10,
  noAnalytics: 10,
  noTitle: 8,
  noDescription: 6,
  noMetaPixel: 5,
  noSitemap: 5,
  imagesNoAlt: 4,
  noCanonical: 3,
  noOg: 2,
  noH1: 2,
  noRobots: 1,
  noLang: 1,
  badTitle: 1,
};

function attr(tag: string, name: string): string | null {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  return m ? (m[1] ?? m[2] ?? m[3] ?? "") : null;
}

function metaContent(html: string, key: string, by: "name" | "property" = "name"): string | null {
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    if ((attr(tag, by) ?? "").toLowerCase() === key) return attr(tag, "content");
  }
  return null;
}

// Altyapı yalnız sayfanın yüklediği dosya adreslerinden (src/href) ve yanıt
// başlıklarından tespit edilir; metinde geçen bir marka adı (ör. referans
// logosu) yanlış tespite yol açmasın.
const PLATFORM_SIGNATURES: [string, RegExp][] = [
  ["Shopify", /cdn\.shopify\.com|\/cdn\/shop\//i],
  ["ikas", /cdn\.myikas\.com|myikas\.com/i],
  ["Ticimax", /ticimax\.cloud|static\.ticimax|\/Uploads\/UrunResimleri\//i],
  ["IdeaSoft", /ideacdn\.net|\.myideasoft\.com|ideasoft\.com\.tr/i],
  ["T-Soft", /tsoftstatic\.com|cdn\.t-soft|\/theme\/v\d+\/assets\/t-soft/i],
  ["WooCommerce", /\/plugins\/woocommerce\//i],
  ["Magento", /\/static\/version\d+\/frontend\//i],
  ["Wix", /static\.wixstatic\.com|static\.parastorage\.com/i],
  ["Squarespace", /static1\.squarespace\.com/i],
  ["WordPress", /\/wp-content\/|\/wp-includes\//i],
  ["Next.js", /\/_next\/static\//i],
];

function detectPlatform(html: string, headers: Headers): string | null {
  if (headers.get("x-shopid") || headers.get("x-shopify-stage")) return "Shopify";
  const refs = (html.match(/\s(?:src|href)\s*=\s*["'][^"']+["']/gi) ?? []).join(" ");
  for (const [name, re] of PLATFORM_SIGNATURES) {
    if (re.test(refs)) return name;
  }
  return null;
}

/** Dosya varsa gövdesini, yoksa null döndürür (HTML hata sayfaları yok sayılır). */
async function fetchText(url: URL): Promise<string | null> {
  try {
    const r = await safeFetch(url, { maxBytes: 200_000, acceptNonHtml: true });
    const ok = r.status >= 200 && r.status < 300 && r.body.length > 0 && !/<html/i.test(r.body.slice(0, 500));
    return ok ? r.body : null;
  } catch {
    return null;
  }
}

// Bot koruması (Akamai, Cloudflare vb.) gerçek sayfa yerine engel sayfası
// döndürür; onu analiz etmek yanlış rapor üretir.
function isBlockedPage(status: number, html: string): boolean {
  if (status === 401 || status === 403 || status === 429 || status === 503) return true;
  const head = html.slice(0, 5000);
  return (
    html.length < 3000 && /access denied|forbidden|request blocked/i.test(head)
  ) || /cf-chl-|challenge-platform|Just a moment\.\.\.|captcha-delivery|_Incapsula_Resource|px-captcha/i.test(head);
}

export async function runAudit(input: string, locale: Locale): Promise<AuditResult> {
  const start = normalizeUrl(input);
  const page = await safeFetch(start);
  const html = page.body;
  const finalUrl = page.finalUrl;
  if (isBlockedPage(page.status, html)) throw new AuditUrlError("BLOCKED_BY_SITE");
  if (page.status >= 400) throw new AuditUrlError("UNREACHABLE");

  // Hız ölçümü uzun sürer; diğer kontrollerle paralel başlatılır.
  const speedPromise = runPageSpeed(finalUrl.toString(), locale);
  const [robotsTxt, sitemapXml] = await Promise.all([
    fetchText(new URL("/robots.txt", finalUrl)),
    fetchText(new URL("/sitemap.xml", finalUrl)),
  ]);
  const hasRobots = robotsTxt !== null;
  // Site haritası farklı bir adreste olabilir; robots.txt'teki Sitemap: satırı da sayılır.
  const hasSitemap = sitemapXml !== null || /^\s*sitemap\s*:\s*https?:\/\//im.test(robotsTxt ?? "");

  const found = new Set<IssueId>();
  const passed: string[] = [];
  const pass = (key: keyof typeof PASSED) => passed.push(PASSED[key][locale]);

  // Güvenli bağlantı
  if (finalUrl.protocol !== "https:") found.add("noHttps");
  else pass("https");

  // noindex
  const robotsMeta = (metaContent(html, "robots") ?? "") + " " + (page.headers.get("x-robots-tag") ?? "");
  if (/noindex/i.test(robotsMeta)) found.add("noindex");
  else pass("indexable");

  // Mobil
  if (!metaContent(html, "viewport")) found.add("noViewport");
  else pass("viewport");

  // Başlık
  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "").replace(/\s+/g, " ").trim();
  if (!title) found.add("noTitle");
  else if (title.length < 15 || title.length > 70) found.add("badTitle");
  else pass("title");

  // Açıklama
  const desc = (metaContent(html, "description") ?? "").trim();
  if (desc.length < 50) found.add("noDescription");
  else pass("description");

  // Canonical
  const hasCanonical = (html.match(/<link\b[^>]*>/gi) ?? []).some((t) => /canonical/i.test(attr(t, "rel") ?? ""));
  if (!hasCanonical) found.add("noCanonical");
  else pass("canonical");

  // H1
  if (!/<h1[\s>]/i.test(html)) found.add("noH1");
  else pass("h1");

  // Dil
  const lang = attr(html.match(/<html\b[^>]*>/i)?.[0] ?? "", "lang");
  if (!lang) found.add("noLang");
  else pass("lang");

  // Yapılandırılmış veri
  if (!/application\/ld\+json/i.test(html) && !/itemtype=["']https?:\/\/schema\.org/i.test(html)) found.add("noStructuredData");
  else pass("schema");

  // Open Graph
  if (!metaContent(html, "og:image", "property") && !metaContent(html, "og:title", "property")) found.add("noOg");
  else pass("og");

  // Ölçüm
  if (!/googletagmanager\.com|google-analytics\.com|gtag\(|G-[A-Z0-9]{6,}|GTM-[A-Z0-9]{4,}/.test(html)) found.add("noAnalytics");
  else pass("analytics");
  // Piksel çoğu zaman Tag Manager içinden yüklenir ve HTML'de görünmez; GTM
  // varken "piksel yok" demek yanlış alarm olur.
  const hasGtm = /googletagmanager\.com\/gtm\.js|GTM-[A-Z0-9]{4,}/.test(html);
  if (/connect\.facebook\.net|fbq\(/.test(html)) pass("pixel");
  else if (!hasGtm) found.add("noMetaPixel");

  // Görsel alt metinleri
  const imgs = html.match(/<img\b[^>]*>/gi) ?? [];
  if (imgs.length >= 5) {
    const missing = imgs.filter((t) => !(attr(t, "alt") ?? "").trim()).length;
    if (missing / imgs.length > 0.5) found.add("imagesNoAlt");
    else pass("alt");
  }

  if (!hasRobots) found.add("noRobots");
  else pass("robots");
  if (!hasSitemap) found.add("noSitemap");
  else pass("sitemap");

  if (html.length > 1_500_000) found.add("heavyHtml");

  // Site içi puan
  const lost = [...found].reduce((sum, id) => sum + (WEIGHTS[id] ?? 0), 0);
  const checksScore = Math.max(0, 100 - lost);

  // Hız
  const speedOutcome = await speedPromise;
  const speed = "failed" in speedOutcome ? null : speedOutcome;
  const speedIssue = "failed" in speedOutcome ? speedOutcome : null;
  if (speed) {
    if (speed.performance < 50) found.add("slow");
    else if (speed.performance < 90) found.add("mediumSpeed");
    else pass("speed");
    const rating = (id: string) => speed.metrics.find((m) => m.id === id)?.rating;
    if (rating("lcp") === "poor") found.add("poorLcp");
    if (rating("cls") !== undefined && rating("cls") !== "good") found.add("poorCls");
    if (rating("tbt") === "poor") found.add("poorTbt");
  }

  const score = speed ? Math.round(speed.performance * 0.5 + checksScore * 0.5) : checksScore;

  const issues: Issue[] = [...found]
    .map((id) => issue(id, locale))
    .sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity]);

  return {
    url: start.toString(),
    finalUrl: finalUrl.toString(),
    checkedAt: new Date().toISOString(),
    score,
    performance: speed?.performance ?? null,
    checksScore,
    metrics: speed?.metrics ?? [],
    fieldVerdict: speed?.fieldVerdict ?? null,
    platform: detectPlatform(html, page.headers),
    issues,
    passed,
    speedMeasured: Boolean(speed),
    speedError: speedIssue ? { keyConfigured: speedIssue.keyConfigured, reason: speedIssue.reason } : null,
  };
}
