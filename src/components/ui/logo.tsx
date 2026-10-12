import Link from "next/link";
import { Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

/** Text wordmark with a Lucide building glyph. Swap the body of this component for the official logo later. */
export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <Link href="/" aria-label="SUPGS home" className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        aria-hidden
        className={cn(
          "grid size-9 place-items-center rounded-md",
          inverted ? "bg-white text-forest" : "bg-forest text-white",
        )}
      >
        <Building2 className="size-5" strokeWidth={1.75} />
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
