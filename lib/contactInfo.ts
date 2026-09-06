import { getGlobalContent } from "@/lib/cms";
import type { AppLocale } from "@/cms/localization";
import {
  WHATSAPP_NUMBER,
  WHATSAPP_DISPLAY,
  PHONE_HREF,
  EMAIL,
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  LINKEDIN_URL,
  LINKEDIN_HANDLE,
} from "@/lib/contact";

/**
 * İletişim bilgilerinin TEK kaynağı.
 *
 * Değerler panelden gelir: **Footer → İletişim** grubu. Panelde bir alan boş
 * bırakılırsa `lib/contact.ts` içindeki sabit devreye girer — yani site hiçbir
 * durumda numarasız kalmaz.
 *
 * Neden Footer globali? Çünkü orada bu alanlar zaten tanımlıydı ve numaranın
 * iki ayrı yerden yönetilmesi, ikisinin farklı kalmasıyla biter.
 */

export type ContactInfo = {
  email: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  phoneHref: string;
  instagramUrl: string;
  instagramHandle: string;
  linkedinUrl: string;
  linkedinHandle: string;
};

type FooterContactDoc = {
  contact?: {
    email?: string | null;
    phoneDisplay?: string | null;
    phoneE164?: string | null;
    whatsappNumber?: string | null;
    instagramUrl?: string | null;
    linkedinUrl?: string | null;
  };
};

/** Boş string'i de "yok" say — panelde alan silinince "" gelir, null değil. */
function pick(value: string | null | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

/**
 * URL'den görünen kullanıcı adını türetir:
 *   https://instagram.com/enterbird                    → @enterbird
 *   https://linkedin.com/company/x                     → x
 *   https://linkedin.com/company/x/about/              → x
 * Böylece panelde ayrıca "handle" alanı doldurmak gerekmiyor.
 *
 * Panele adres kopyalanırken sonuna sekme adı takılı kalıyor ("/about/",
 * "/posts/"). Son parçayı almak bu durumda hesap adı yerine sekme adını
 * gösteriyordu; o yüzden önce hesap adının nerede olduğunu arıyoruz.
 */
const PROFILE_ROOTS = new Set(["company", "in", "school", "showcase"]);
const PROFILE_TABS = new Set([
  "about",
  "posts",
  "jobs",
  "people",
  "life",
  "videos",
  "events",
  "featured",
  "reels",
]);

function handleFromUrl(url: string, prefix: string): string | null {
  try {
    const segments = new URL(url).pathname.split("/").filter(Boolean);

    // linkedin.com/company/<ad>/... — hesap adı işaretçinin hemen ardından gelir.
    const marker = segments.findIndex((s) =>
      PROFILE_ROOTS.has(s.toLowerCase()),
    );
    if (marker >= 0 && segments[marker + 1]) {
      return `${prefix}${segments[marker + 1]}`;
    }

    // Aksi halde sondan başlayıp sekme adı olmayan ilk parçayı al.
    const name = [...segments]
      .reverse()
      .find((s) => !PROFILE_TABS.has(s.toLowerCase()));
    return name ? `${prefix}${name}` : null;
  } catch {
    return null;
  }
}

export async function getContactInfo(locale: AppLocale): Promise<ContactInfo> {
  const footer = await getGlobalContent<FooterContactDoc>("footer", locale);
  const c = footer?.contact;

  const instagramUrl = pick(c?.instagramUrl, INSTAGRAM_URL);
  const linkedinUrl = pick(c?.linkedinUrl, LINKEDIN_URL);

  return {
    email: pick(c?.email, EMAIL),
    whatsappNumber: pick(c?.whatsappNumber, WHATSAPP_NUMBER),
    whatsappDisplay: pick(c?.phoneDisplay, WHATSAPP_DISPLAY),
    phoneHref: pick(c?.phoneE164, PHONE_HREF),
    instagramUrl,
    instagramHandle: handleFromUrl(instagramUrl, "@") ?? INSTAGRAM_HANDLE,
    linkedinUrl,
    linkedinHandle: handleFromUrl(linkedinUrl, "") ?? LINKEDIN_HANDLE,
  };
}
