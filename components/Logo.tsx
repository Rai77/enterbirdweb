import Image from "next/image";
import { Link } from "@/i18n/navigation";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Enterbird"
      className={`group inline-flex items-center ${className ?? ""}`}
    >
      <span className="relative inline-flex h-40 items-center">
        <Image
          src="/logo_tr.png"
          alt="Enterbird"
          width={260}
          height={104}
          priority
          className="h-40 w-auto object-contain transition duration-300 group-hover:brightness-110 group-hover:drop-shadow-[0_0_18px_rgba(99,102,241,0.55)]"
        />
      </span>
    </Link>
  );
}
