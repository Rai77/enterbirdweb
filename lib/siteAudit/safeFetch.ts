import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

/**
 * Kullanıcının yazdığı adrese sunucudan istek atıyoruz. Bu, kötü niyetli
 * birinin sunucumuza iç ağdaki adresleri (127.0.0.1, 169.254.169.254 bulut
 * meta verisi, 10.x vb.) okutmaya çalışmasına kapı açar (SSRF). Bu dosya
 * her istekten ve her yönlendirmeden önce hedefin herkese açık bir adres
 * olduğunu doğrular.
 */

export class AuditUrlError extends Error {
  constructor(public code: "INVALID_URL" | "BLOCKED_HOST" | "UNREACHABLE" | "TOO_LARGE" | "NOT_HTML" | "BLOCKED_BY_SITE") {
    super(code);
  }
}

const MAX_BYTES = 3_000_000;
const MAX_REDIRECTS = 4;
const TIMEOUT_MS = 12_000;

function isPrivateIPv4(ip: string): boolean {
  const [a, b] = ip.split(".").map(Number);
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 198 && (b === 18 || b === 19)) ||
    a >= 224
  );
}

function isPrivateIPv6(ip: string): boolean {
  const v = ip.toLowerCase();
  if (v === "::" || v === "::1") return true;
  if (v.startsWith("fc") || v.startsWith("fd") || v.startsWith("fe8") || v.startsWith("fe9") || v.startsWith("fea") || v.startsWith("feb")) {
    return true;
  }
  const mapped = v.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  return mapped ? isPrivateIPv4(mapped[1]) : false;
}

function isPrivateIp(ip: string): boolean {
  return isIP(ip) === 4 ? isPrivateIPv4(ip) : isPrivateIPv6(ip);
}

/** Kullanıcı girdisini düzgün bir http(s) adresine çevirir. */
export function normalizeUrl(input: string): URL {
  let raw = input.trim();
  if (!raw || raw.length > 300) throw new AuditUrlError("INVALID_URL");
  if (!/^https?:\/\//i.test(raw)) raw = `https://${raw}`;
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new AuditUrlError("INVALID_URL");
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") throw new AuditUrlError("INVALID_URL");
  if (url.username || url.password) throw new AuditUrlError("INVALID_URL");
  if (url.port && url.port !== "80" && url.port !== "443") throw new AuditUrlError("BLOCKED_HOST");
  const host = url.hostname;
  if (!host.includes(".") || host.endsWith(".local") || host.endsWith(".internal") || host === "localhost") {
    throw new AuditUrlError("BLOCKED_HOST");
  }
  url.hash = "";
  return url;
}

async function assertPublicHost(url: URL): Promise<void> {
  const host = url.hostname.replace(/^\[|\]$/g, "");
  if (isIP(host)) {
    if (isPrivateIp(host)) throw new AuditUrlError("BLOCKED_HOST");
    return;
  }
  let addresses: { address: string }[];
  try {
    addresses = await lookup(host, { all: true });
  } catch {
    throw new AuditUrlError("UNREACHABLE");
  }
  if (addresses.length === 0 || addresses.some((a) => isPrivateIp(a.address))) {
    throw new AuditUrlError("BLOCKED_HOST");
  }
}

export type FetchedPage = {
  finalUrl: URL;
  status: number;
  headers: Headers;
  body: string;
  redirectedFromHttp: boolean;
  elapsedMs: number;
};

const UA =
  "Mozilla/5.0 (Linux; Android 12; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Mobile Safari/537.36 EnterbirdSiteAudit/1.0 (+https://enterbird.com/tr/site-analizi)";

/** Yönlendirmeleri tek tek, her adımda adresi doğrulayarak takip eder. */
export async function safeFetch(start: URL, opts: { maxBytes?: number; acceptNonHtml?: boolean } = {}): Promise<FetchedPage> {
  const maxBytes = opts.maxBytes ?? MAX_BYTES;
  let url = start;
  let redirectedFromHttp = false;
  const t0 = Date.now();

  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    await assertPublicHost(url);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    let res: Response;
    try {
      res = await fetch(url, {
        redirect: "manual",
        signal: controller.signal,
        headers: { "User-Agent": UA, Accept: "text/html,application/xhtml+xml,*/*;q=0.8", "Accept-Language": "tr,en;q=0.8" },
      });
    } catch {
      clearTimeout(timer);
      throw new AuditUrlError("UNREACHABLE");
    }

    if (res.status >= 300 && res.status < 400 && res.headers.get("location")) {
      clearTimeout(timer);
      const next = new URL(res.headers.get("location")!, url);
      if (next.protocol !== "http:" && next.protocol !== "https:") throw new AuditUrlError("UNREACHABLE");
      if (url.protocol === "http:" && next.protocol === "https:") redirectedFromHttp = true;
      url = next;
      continue;
    }

    const type = res.headers.get("content-type") ?? "";
    if (!opts.acceptNonHtml && !type.includes("html")) {
      clearTimeout(timer);
      throw new AuditUrlError("NOT_HTML");
    }

    // Gövdeyi parça parça oku; tavanı aşarsa kes.
    const reader = res.body?.getReader();
    const chunks: Uint8Array[] = [];
    let total = 0;
    if (reader) {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          total += value.byteLength;
          if (total > maxBytes) {
            await reader.cancel();
            break;
          }
          chunks.push(value);
        }
      } catch {
        clearTimeout(timer);
        throw new AuditUrlError("UNREACHABLE");
      }
    }
    clearTimeout(timer);
    const body = new TextDecoder("utf-8").decode(Buffer.concat(chunks));
    return { finalUrl: url, status: res.status, headers: res.headers, body, redirectedFromHttp, elapsedMs: Date.now() - t0 };
  }
  throw new AuditUrlError("UNREACHABLE");
}
