import type { NextConfig } from "next";
import path from "node:path";
import createNextIntlPlugin from "next-intl/plugin";
import { withPayload } from "@payloadcms/next/withPayload";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
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
