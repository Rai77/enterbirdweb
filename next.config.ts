import type { NextConfig } from "next";
import path from "node:path";
import createNextIntlPlugin from "next-intl/plugin";
import { withPayload } from "@payloadcms/next/withPayload";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Hangi yazılımla çalıştığımızı saldırganlara söylemeyelim.
  poweredByHeader: false,
  // Tarayıcıya verilen temel güvenlik talimatları: site (ve yönetim paneli)
  // başka bir sitenin içine gömülemez, dosya türleri tahmin edilmez, diğer
  // sitelere giden bağlantılarda tam adres paylaşılmaz, kamera/mikrofon/konum
  // gibi izinler hiç istenmez.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
  // www.enterbird.com ayrı bir site gibi aynı sayfaları gösteriyordu; Google
  // bunları kopya sayıyordu. Tüm www adresleri kalıcı olarak ana alana gider.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.enterbird.com" }],
        destination: "https://enterbird.com/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default withPayload(withNextIntl(nextConfig), { devBundleServerPackages: false });
