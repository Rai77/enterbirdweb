import { probe, mapLimit, certificateExpiry } from "./probe";
import { safeFetch } from "./safeFetch";
import type { IssueId } from "./copy";
import type { PASSED } from "./copy";

/**
 * Derin kontroller: site hataları, güven unsurları ve ürün sayfası.
 * Hepsi süre sınırlı; toplam analiz 60 sn'lik sunucu sınırına sığmalı
 * (Google hız ölçümüyle paralel çalışır).
 */

export type Finding = { id: IssueId; items?: string[] };
export type CheckOutput = { found: Finding[]; passed: (keyof typeof PASSED)[] };

const MAX_LINKS = 40;
const MAX_IMAGES = 25;

function attrValues(html: string, tagRe: RegExp, attrName: string): string[] {
  const out: string[] = [];
  for (const tag of html.match(tagRe) ?? []) {
    const m = tag.match(new RegExp(`\\s${attrName}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
    const v = m ? (m[1] ?? m[2] ?? m[3] ?? "").trim() : "";
    if (v) out.push(v.replace(/&amp;/g, "&"));
  }
  return out;
}

function sameSite(a: URL, b: URL): boolean {
  return a.hostname.replace(/^www\./, "") === b.hostname.replace(/^www\./, "");
}

function resolve(href: string, base: URL): URL | null {
  if (/^(mailto|tel|javascript|data|sms|whatsapp):/i.test(href) || href.startsWith("#")) return null;
  try {
    const u = new URL(href, base);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    u.hash = "";
    return u;
  } catch {
    return null;
  }
}

function shortUrl(u: string): string {
  try {
    const x = new URL(u);
    const s = x.pathname + x.search;
    return s.length > 90 ? `${s.slice(0, 87)}…` : s || "/";
  } catch {
    return u.slice(0, 90);
  }
}

function isBroken(status: number): boolean {
  // 401/403/429 genellikle bot koruması ya da giriş gerektiren sayfa; kırık sayılmaz.
  return status === 404 || status === 410 || status >= 500;
}

// ── Site hataları ────────────────────────────────────────────────────
export async function errorChecks(html: string, finalUrl: URL, chain: { hops: number }): Promise<CheckOutput & { linksChecked: number; imagesChecked: number; sslDaysLeft: number | null }> {
  const found: Finding[] = [];
  const passed: CheckOutput["passed"] = [];

  // Bağlantılar (yalnız site içi) ve görseller
  const links = [...new Set(attrValues(html, /<a\b[^>]*>/gi, "href").map((h) => resolve(h, finalUrl)).filter((u): u is URL => !!u && sameSite(u, finalUrl)).map((u) => u.toString()))]
    .filter((u) => u !== finalUrl.toString())
    .slice(0, MAX_LINKS);
  const images = [...new Set(attrValues(html, /<img\b[^>]*>/gi, "src").map((h) => resolve(h, finalUrl)).filter((u): u is URL => !!u).map((u) => u.toString()))].slice(0, MAX_IMAGES);

  const host = finalUrl.hostname;
  const altHost = host.startsWith("www.") ? host.slice(4) : `www.${host}`;
  const randomPath = new URL(`/enterbird-site-analizi-404-${Math.random().toString(36).slice(2, 8)}`, finalUrl);

  const [linkResults, imageResults, httpProbe, altProbe, notFoundProbe, cert] = await Promise.all([
    mapLimit(links, 8, (u) => probe(new URL(u), { timeoutMs: 6000 })),
    mapLimit(images, 8, (u) => probe(new URL(u), { timeoutMs: 6000 })),
    finalUrl.protocol === "https:" ? probe(new URL(`http://${host}/`), { follow: false, timeoutMs: 6000 }) : Promise.resolve(null),
    probe(new URL(`${finalUrl.protocol}//${altHost}/`), { follow: false, timeoutMs: 6000 }),
    probe(randomPath, { timeoutMs: 6000 }),
    finalUrl.protocol === "https:" ? certificateExpiry(host) : Promise.resolve(null),
  ]);

  const brokenLinks = links.filter((_, i) => isBroken(linkResults[i].status));
  if (brokenLinks.length) found.push({ id: "brokenLinks", items: brokenLinks.map(shortUrl) });
  else if (links.length) passed.push("links");

  const brokenImages = images.filter((_, i) => isBroken(imageResults[i].status));
  if (brokenImages.length) found.push({ id: "brokenImages", items: brokenImages.map(shortUrl) });
  else if (images.length) passed.push("images");

  // Karışık içerik
  if (finalUrl.protocol === "https:") {
    const insecure = [
      ...attrValues(html, /<(?:img|script|iframe|source|video|audio)\b[^>]*>/gi, "src"),
      ...attrValues(html, /<link\b[^>]*rel=["']?stylesheet[^>]*>/gi, "href"),
    ].filter((u) => /^http:\/\//i.test(u));
    const unique = [...new Set(insecure)];
    if (unique.length) found.push({ id: "mixedContent", items: unique.slice(0, 10).map((u) => u.slice(0, 100)) });
    else passed.push("mixed");
  }

  // http → https
  if (httpProbe) {
    const loc = httpProbe.status >= 300 && httpProbe.status < 400 ? httpProbe.location ?? "" : "";
    if (httpProbe.status === 0) {
      // http kapalı (bağlantı reddi) da kabul edilebilir; uyarı verme.
    } else if (!loc.startsWith("https://")) found.push({ id: "noHttpsRedirect" });
    else passed.push("httpsRedirect");
  }

  // www / www'suz
  if (altProbe.status === 0) found.push({ id: "wwwBroken", items: [altHost] });
  else if (altProbe.status >= 200 && altProbe.status < 300) found.push({ id: "wwwDuplicate", items: [host, altHost] });
  else passed.push("www");

  if (chain.hops >= 3) found.push({ id: "redirectChain" });

  // Olmayan sayfa 404 dönmeli
  if (notFoundProbe.status >= 200 && notFoundProbe.status < 300) found.push({ id: "soft404" });
  else if (notFoundProbe.status === 404 || notFoundProbe.status === 410) passed.push("notFound");

  // SSL
  let sslDaysLeft: number | null = null;
  if (cert) {
    sslDaysLeft = cert.daysLeft;
    if (!cert.authorized) found.push({ id: "sslInvalid" });
    else if (cert.daysLeft < 21) found.push({ id: "sslExpiring", items: [cert.validTo.toISOString().slice(0, 10)] });
    else passed.push("ssl");
  }

  return { found, passed, linksChecked: links.length, imagesChecked: images.length, sslDaysLeft };
}

// ── Güven ve satış ───────────────────────────────────────────────────
export function trustChecks(html: string, locale: "tr" | "en"): CheckOutput {
  const found: Finding[] = [];
  const passed: CheckOutput["passed"] = [];
  // Bağlantı adresleri + görünen metin üzerinden arama (Türkçe/İngilizce).
  const hrefs = attrValues(html, /<a\b[^>]*>/gi, "href").join(" ").toLowerCase();
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .toLocaleLowerCase("tr");
  const has = (re: RegExp) => re.test(hrefs) || re.test(text);

  if (has(/iade|de(ğ|g)i(ş|s)im|return|refund|exchange|cayma/)) passed.push("returns");
  else found.push({ id: "noReturnPolicy" });

  if (has(/kvkk|ki(ş|s)isel veri|gizlilik|ayd(ı|i)nlatma|privacy|(ç|c)erez politika|cookie polic/)) passed.push("privacy");
  else found.push({ id: "noPrivacy" });

  // Mesafeli satış sözleşmesi yalnız Türkiye'ye satan siteler için sorulur.
  const turkish = /lang=["']tr|\.com\.tr|\btl\b|₺|sepet/i.test(html.slice(0, 200_000));
  if (turkish || locale === "tr") {
    if (has(/mesafeli|(ö|o)n bilgilendirme|sat(ı|i)(ş|s) s(ö|o)zle(ş|s)me|terms|kullan(ı|i)m ko(ş|s)ul/)) passed.push("terms");
    else found.push({ id: "noTerms" });
  }

  if (/href=["']tel:|href=["']mailto:/i.test(html) || has(/ileti(ş|s)im|contact|bize ula(ş|s)/)) passed.push("contact");
  else found.push({ id: "noContact" });

  if (/wa\.me\/|api\.whatsapp\.com|whatsapp/i.test(html)) passed.push("whatsapp");
  else found.push({ id: "noWhatsapp" });

  if (/visa|mastercard|troy|iyzico|paytr|paypal|stripe|amex|g(ü|u)venli (ö|o)deme|secure (checkout|payment)|taksit|klarna|apple pay|google pay/i.test(html)) passed.push("payment");
  else found.push({ id: "noPaymentTrust" });

  return { found, passed };
}

// ── Ürün sayfası ─────────────────────────────────────────────────────
type JsonLdNode = Record<string, unknown>;

function jsonLdNodes(html: string): JsonLdNode[] {
  const out: JsonLdNode[] = [];
  const walk = (v: unknown) => {
    if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === "object") {
      const o = v as JsonLdNode;
      out.push(o);
      if (o["@graph"]) walk(o["@graph"]);
    }
  };
  for (const m of html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      walk(JSON.parse(m[1].trim()));
    } catch {
      // Bozuk JSON-LD: yok sayılır.
    }
  }
  return out;
}

function isProductNode(n: JsonLdNode): boolean {
  const t = n["@type"];
  return t === "Product" || (Array.isArray(t) && t.includes("Product")) || t === "ProductGroup";
}

// Altyapılara göre ürün adresi kalıpları.
const PRODUCT_HREF = [
  /\/products?\/[^/?#]+/i, // Shopify, WooCommerce, genel
  /\/urun(ler)?\/[^/?#]+/i, // IdeaSoft, Türkçe siteler
  /-p-\d+/i, // Trendyol tarzı
  /,PR-\d+/i, // Ticimax
  /\/p\/[^/?#]+/i,
  /\/item\/[^/?#]+/i,
];

export function findProductUrl(html: string, base: URL): string | null {
  const candidates = attrValues(html, /<a\b[^>]*>/gi, "href")
    .map((h) => resolve(h, base))
    .filter((u): u is URL => !!u && sameSite(u, base))
    .map((u) => u.toString());
  for (const re of PRODUCT_HREF) {
    const hit = candidates.find((u) => re.test(new URL(u).pathname + new URL(u).search) && !/\/(collections?|kategori|category)\/?$/i.test(new URL(u).pathname));
    if (hit) {
      // Kampanya/takip parametreleri (ör. ?banner_id=...) rapora gerekmez.
      const u = new URL(hit);
      u.search = "";
      return u.toString();
    }
  }
  return null;
}

export async function productChecks(homeHtml: string, homeUrl: URL): Promise<CheckOutput & { productUrl: string | null }> {
  const found: Finding[] = [];
  const passed: CheckOutput["passed"] = [];

  // Girilen adres zaten bir ürün sayfasıysa onu incele.
  let productUrl: string | null = jsonLdNodes(homeHtml).some(isProductNode) ? homeUrl.toString() : findProductUrl(homeHtml, homeUrl);
  if (!productUrl) return { found, passed, productUrl: null };

  let html = homeHtml;
  if (productUrl !== homeUrl.toString()) {
    try {
      const page = await safeFetch(new URL(productUrl), { maxBytes: 2_500_000 });
      if (page.status >= 400) return { found, passed, productUrl: null };
      html = page.body;
      productUrl = page.finalUrl.toString();
    } catch {
      return { found, passed, productUrl: null };
    }
  }

  const product = jsonLdNodes(html).find(isProductNode);
  const microdata = /itemtype=["']https?:\/\/schema\.org\/Product["']/i.test(html);
  if (!product && !microdata) {
    found.push({ id: "productNoSchema" });
  } else {
    passed.push("productSchema");
    if (product) {
      const offersRaw = product.offers ?? (product.hasVariant as JsonLdNode[] | undefined)?.[0]?.offers;
      const offer = (Array.isArray(offersRaw) ? offersRaw[0] : offersRaw) as JsonLdNode | undefined;
      const missing: string[] = [];
      if (!product.image) missing.push("image");
      if (!offer) missing.push("offers");
      else {
        if (offer.price === undefined && offer.lowPrice === undefined) missing.push("offers.price");
        if (!offer.priceCurrency) missing.push("offers.priceCurrency");
        if (!offer.availability) missing.push("offers.availability");
      }
      // Puan bilgisi bazen ayrı bir JSON-LD bloğunda verilir; sayfada hiç yoksa eksik say.
      if (!product.aggregateRating && !product.review && !/"aggregateRating"/.test(html)) missing.push("aggregateRating");
      if (!product.brand) missing.push("brand");
      if (missing.length) found.push({ id: "productSchemaIncomplete", items: missing });

      const imgs = product.image;
      const imgCount = Array.isArray(imgs) ? imgs.length : imgs ? 1 : 0;
      if (imgCount > 0 && imgCount < 3) found.push({ id: "productFewImages" });
    }
  }

  const lower = html.toLocaleLowerCase("tr");
  if (/sepete ekle|sepete at|add to cart|add to bag|şimdi al|hemen al|satın al|buy now|name=["']add["']|\/cart\/add/.test(lower)) passed.push("cart");
  else found.push({ id: "productNoCart" });

  const ratingInSchema = product && (product.aggregateRating || product.review);
  if (ratingInSchema || /yorum|de(ğ|g)erlendirme|reviews?|rating|yıldız/.test(lower)) passed.push("reviews");
  else found.push({ id: "productNoReviews" });

  return { found, passed, productUrl };
}
