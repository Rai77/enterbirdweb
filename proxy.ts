import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

/**
 * Dil öneki olmadan açılabilen gerçek bölümler. `/services` gibi bir adres
 * `/en/services`'e yönlenir; bu listede olmayan her öneksiz adres (eski
 * WordPress sitesinden kalan `/2019/11/`, `/category/...`, `/wp-content/...`)
 * yönlendirilmeden doğrudan "410 Kalıcı olarak silindi" döner.
 *
 * Böylece Google bu adresleri "yönlendirme → 404" zinciriyle uğraşmadan
 * dizinden çabuk düşürür. Siteye yeni bir üst düzey bölüm eklenirse buraya da
 * eklenmeli; eklenmezse yalnızca öneksiz kısa adresi 410 verir.
 */
const SECTIONS = new Set([
  "services",
  "work",
  "about",
  "contact",
  "blog",
  "loom",
  "sozluk",
]);

const LOCALES = new Set<string>(routing.locales);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (first && !LOCALES.has(first) && !SECTIONS.has(first)) {
    return new NextResponse(null, {
      status: 410,
      headers: { "X-Robots-Tag": "noindex" },
    });
  }

  // Sözlük terimleri yalnızca Türkçe yazıldı. İngilizce adresi ayrı bir sayfa
  // olarak bırakmak yerine kalıcı olarak Türkçe sürüme gönderiyoruz.
  if (first === "en" && segments[1] === "sozluk" && segments.length === 3) {
    const url = request.nextUrl.clone();
    url.pathname = `/tr/sozluk/${segments[2]}`;
    return NextResponse.redirect(url, 308);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|admin|_next|_vercel|media|.*\\..*).*)",
    // Eski WordPress dosya adresleri (nokta içerdiği için yukarıda atlanıyor).
    "/wp-:path*",
    "/xmlrpc.php",
  ],
};
