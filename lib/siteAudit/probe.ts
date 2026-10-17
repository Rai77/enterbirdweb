import { connect } from "node:tls";
import { lookup } from "node:dns/promises";
import { assertPublicHost } from "./safeFetch";

/**
 * Hafif adres denemesi: gövdeyi indirmeden durum kodunu ve yönlendirmeleri
 * öğrenir. Her adımda hedefin herkese açık bir adres olduğu doğrulanır
 * (bkz. safeFetch.ts — SSRF koruması).
 */

const UA = "Mozilla/5.0 (compatible; EnterbirdSiteAudit/1.0; +https://enterbird.com/tr/site-analizi)";

export type ProbeResult = {
  /** Son durum kodu; ağ hatası ya da zaman aşımında 0. */
  status: number;
  finalUrl: string;
  /** İzlenen yönlendirme sayısı. */
  hops: number;
  /** Zincirdeki her adres (ilki başlangıç). */
  chain: string[];
  /** Son yanıttaki Location başlığı (follow: false ile yönlendirme hedefi). */
  location: string | null;
};

export async function probe(start: URL, opts: { follow?: boolean; timeoutMs?: number; maxHops?: number } = {}): Promise<ProbeResult> {
  const follow = opts.follow ?? true;
  const maxHops = opts.maxHops ?? 5;
  let url = start;
  const chain = [url.toString()];
  for (let hop = 0; hop <= maxHops; hop++) {
    try {
      await assertPublicHost(url);
    } catch {
      return { status: 0, finalUrl: url.toString(), hops: hop, chain, location: null };
    }
    // HEAD yerine GET: bazı sunucular HEAD'e farklı cevap veriyor (ör. ana
    // sayfaya yönlendiriyor). Gövde okunmadan bırakıldığı için yine hafif.
    let res: Response | null = null;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), opts.timeoutMs ?? 6000);
    try {
      res = await fetch(url, { method: "GET", redirect: "manual", signal: controller.signal, headers: { "User-Agent": UA, Accept: "text/html,image/*,*/*;q=0.8" } });
      await res.body?.cancel().catch(() => {});
    } catch {
      res = null;
    } finally {
      clearTimeout(timer);
    }
    if (!res) return { status: 0, finalUrl: url.toString(), hops: hop, chain, location: null };
    const loc = res.headers.get("location");
    if (follow && res.status >= 300 && res.status < 400 && loc) {
      const next = new URL(loc, url);
      if (next.protocol !== "http:" && next.protocol !== "https:") return { status: res.status, finalUrl: url.toString(), hops: hop, chain, location: next.toString() };
      url = next;
      chain.push(url.toString());
      continue;
    }
    return { status: res.status, finalUrl: url.toString(), hops: hop, chain, location: loc ? new URL(loc, url).toString() : null };
  }
  return { status: 0, finalUrl: url.toString(), hops: maxHops, chain, location: null };
}

/** Sınırlı eşzamanlılıkla bir listeyi işler. */
export async function mapLimit<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let next = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const i = next++;
      out[i] = await fn(items[i]);
    }
  });
  await Promise.all(workers);
  return out;
}

/** SSL sertifikasının bitiş tarihi. Okunamazsa null. */
export async function certificateExpiry(host: string): Promise<{ validTo: Date; daysLeft: number; authorized: boolean } | null> {
  try {
    await assertPublicHost(new URL(`https://${host}/`));
    const [{ address }] = await lookup(host, { all: true });
    return await new Promise((resolve) => {
      const socket = connect({ host: address, port: 443, servername: host, rejectUnauthorized: false, timeout: 6000 }, () => {
        const cert = socket.getPeerCertificate();
        const authorized = socket.authorized;
        socket.end();
        if (!cert?.valid_to) return resolve(null);
        const validTo = new Date(cert.valid_to);
        resolve({ validTo, daysLeft: Math.floor((validTo.getTime() - Date.now()) / 86_400_000), authorized });
      });
      socket.on("error", () => resolve(null));
      socket.on("timeout", () => {
        socket.destroy();
        resolve(null);
      });
    });
  } catch {
    return null;
  }
}
