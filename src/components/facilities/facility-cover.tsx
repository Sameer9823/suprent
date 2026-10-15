"use client";

import { BookOpen, BookMarked, Car, Dumbbell, GraduationCap, Scissors, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Facility } from "@/types/facility";
import { cn } from "@/lib/utils";
import { SafeImage } from "@/components/ui/safe-image";

export const FACILITY_CATEGORY_ICONS: Record<Facility["category"], LucideIcon> = {
  study: BookOpen,
  laundry: Car,
  fitness: Dumbbell,
  stationery: BookMarked,
  beauty: Sparkles,
  tailoring: Scissors,
  tuition: GraduationCap,
};

interface Props {
  facility: Facility;
  className?: string;
  sizes?: string;
  iconSize?: "sm" | "md" | "lg";
  priority?: boolean;
}

/**
 * Renders a facility cover: a photo when one is available, or a category-appropriate
 * icon cover when the facility has no images yet.
 */
export function FacilityCover({ facility, className, sizes = "(min-width: 768px) 50vw, 100vw", iconSize = "md", priority }: Props) {
  const cover = facility.images[0];
  const Icon = FACILITY_CATEGORY_ICONS[facility.category];
  const iconClass = { sm: "size-8", md: "size-12", lg: "size-16" }[iconSize];

  if (cover) {
    return <SafeImage src={cover.src} alt={cover.alt} sizes={sizes} className={className} priority={priority} />;
  }

  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center bg-sage/40",
        className,
      )}
      aria-label={facility.name}
    >
      <Icon aria-hidden className={cn(iconClass, "text-forest/50")} strokeWidth={1.5} />
    </div>
  );
}
