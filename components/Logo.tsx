import Image from "next/image";
import { Michroma } from "next/font/google";
import { Link } from "@/i18n/navigation";

// Logodaki ENTERBIRD yazısına en yakın geniş, geometrik yazı karakteri.
const michroma = Michroma({ weight: "400", subsets: ["latin"], display: "swap" });

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Enterbird AI"
      className={`group inline-flex items-center ${className ?? ""}`}
    >
      <span className="relative inline-flex h-40 items-center">
        <Image
          src="/logo_tr.png"
          alt="Enterbird AI"
          width={260}
          height={104}
          priority
          className="h-40 w-auto object-contain transition duration-300 group-hover:brightness-110 group-hover:drop-shadow-[0_0_18px_rgba(99,102,241,0.55)]"
        />
        <LogoAI />
      </span>
    </Link>
  );
}

/**
 * ENTERBIRD yazısının sağındaki "AI".
 *
 * Logo görseli 1024x1024; yazı görselde x 242–775, y 624–668 aralığında ve
 * harf kalınlığı ~11px. SVG aynı 1024'lük koordinatlarla görselin üstüne
 * oturduğu için logo hangi boyutta gösterilirse gösterilsin hizası kaymaz.
 * Michroma logodaki harflerden ince olduğu için aynı renkte bir kontur
 * kalınlığı eşitliyor; renk, yazının "D" harfinde bittiği maviden devam ediyor.
 */
function LogoAI() {
  return (
    <svg
      viewBox="0 0 1024 1024"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible transition duration-300 group-hover:brightness-110"
    >
      <defs>
        <linearGradient
          id="logo-ai-fill"
          gradientUnits="userSpaceOnUse"
          x1="797"
          y1="0"
          x2="872"
          y2="0"
        >
          <stop offset="0" stopColor="#1289F8" />
          <stop offset="1" stopColor="#22A8F6" />
        </linearGradient>
        <filter id="logo-ai-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>
      <g
        style={{ fontFamily: michroma.style.fontFamily }}
        fontSize="54"
        letterSpacing="4"
        fill="url(#logo-ai-fill)"
        stroke="url(#logo-ai-fill)"
        strokeWidth="4.5"
        strokeLinejoin="round"
      >
        <text x="797" y="665.75" opacity="0.45" filter="url(#logo-ai-glow)">
          AI
        </text>
        <text x="797" y="665.75">
          AI
        </text>
      </g>
    </svg>
  );
}
