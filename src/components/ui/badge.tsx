import { cn } from "@/lib/utils";
import { STATUS_LABELS } from "@/lib/property-service";
import type { PropertyStatus } from "@/types/property";

const statusStyles: Record<PropertyStatus, { wrap: string; dot: string }> = {
  available: { wrap: "bg-sage text-forest", dot: "bg-forest" },
  reserved: { wrap: "bg-amber-wash text-amber-ink", dot: "bg-amber-ink" },
  rented: { wrap: "bg-charcoal text-white", dot: "bg-white/70" },
};

export function StatusBadge({ status, className }: { status: PropertyStatus; className?: string }) {
  const s = statusStyles[status];
  return (
    <span
      className={cn("inline-flex items-center gap-1.5 rounded px-2 py-1 text-xs font-semibold", s.wrap, className)}
    >
      <span aria-hidden className={cn("size-1.5 rounded-full", s.dot)} />
      {STATUS_LABELS[status]}
    </span>
  );
}

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded bg-sand px-2 py-1 text-xs font-medium text-ink", className)}>
      {children}
    </span>
  );
}
