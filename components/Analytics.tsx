import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/site";

/**
 * Google Analytics 4.
 *
 * Yalnızca canlı sitede yüklenir: local geliştirme ve Vercel önizlemeleri
 * raporu kirletmesin. Kimlik `lib/site.ts` içinde durur.
 *
 * Sayfa geçişlerini ayrıca göndermeye gerek yok: GA4'ün gelişmiş ölçümü
 * tarayıcı geçmişini dinliyor, Next.js'in sayfa geçişleri de öyle çalışıyor.
 */

// Kimlik script metnine giriyor; yalnızca beklenen biçim kabul edilsin.
const GA_ID_FORMAT = /^G-[A-Z0-9]+$/;

export function GoogleAnalytics() {
  if (process.env.VERCEL_ENV !== "production") return null;
  if (!GA_ID_FORMAT.test(GA_MEASUREMENT_ID)) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-gtag" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');`}
      </Script>
    </>
  );
}
