import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/** Logo with the official SUPGS image from /public/logo.jpeg, paired with a text wordmark. */
export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <Link href="/" aria-label="SUPGS home" className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        aria-hidden
        className={cn(
          "grid size-10 place-items-center rounded-md",
          inverted ? "bg-white" : "bg-forest",
        )}
      >
        <Image src="/logo.jpeg" alt="SUPGS" width={28} height={28} className="rounded" />
      </span>
      <span
        className={cn(
          "font-display text-xl font-extrabold tracking-[0.04em]",
          inverted ? "text-white" : "text-ink",
        )}
      >
        SUPGS
      </span>
    </Link>
  );
}
