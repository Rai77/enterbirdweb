/**
 * Basit, bağımlılıksız hız sınırlayıcı (rate limiter).
 *
 * Amaç: iletişim formunun bir bot tarafından bombalanmasını engellemek.
 * Sayaç sunucunun belleğinde tutulur — Vercel'de her serverless örneğinin
 * kendi sayacı olur, yani koruma mutlak değil ama pratikte spam dalgasını
 * kırmaya yeter. Gerçek dağıtık limit gerekirse Upstash/Redis'e taşınır.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/** Bellekte sonsuza kadar büyümesin diye ara sıra süresi geçenleri temizle. */
function sweep(now: number) {
  if (buckets.size < 500) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export type RateLimitResult = {
  ok: boolean;
  /** Limit dolduysa kaç saniye sonra tekrar denenebilir. */
  retryAfter: number;
};

/**
 * @param key       Sayacın kimliği (genelde IP adresi).
 * @param limit     Pencere başına izin verilen istek sayısı.
 * @param windowMs  Pencere uzunluğu (ms).
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  if (bucket.count >= limit) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  bucket.count += 1;
  return { ok: true, retryAfter: 0 };
}

/**
 * İstemci IP'sini header'lardan çıkarır. Vercel `x-forwarded-for` gönderir;
 * ilk değer gerçek istemcidir. Bulunamazsa hepsi tek kovaya düşer — bu da
 * kötü senaryoda global bir limit demek, güvenli taraf.
 */
export function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}
