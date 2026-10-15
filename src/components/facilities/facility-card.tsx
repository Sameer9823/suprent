"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import type { Facility } from "@/types/facility";
import { cn } from "@/lib/utils";
import { FacilityCover } from "./facility-cover";
import { SafeImage } from "@/components/ui/safe-image";

/**
 * "tall" = large lifestyle poster card (homepage + /facilities first three).
 * "compact" = smaller card for facilities without a full photo showcase.
 * "feature" = wide alternating row for the /facilities page list view.
 */
export function FacilityCard({ facility: f, variant = "tall", reverse = false }: { facility: Facility; variant?: "tall" | "compact" | "feature"; reverse?: boolean }) {
  const cover = f.images[0];
  const href = `/facilities/${f.slug}`;

  if (variant === "feature") {
    return (
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25 }}
        className="group relative grid overflow-hidden rounded-lg border border-line bg-white shadow-card transition-shadow hover:shadow-lift md:grid-cols-2"
      >
        <div className={cn("relative aspect-[4/3] overflow-hidden bg-sage md:aspect-auto md:min-h-[360px]", reverse && "md:order-2")}>
          {cover && <SafeImage src={cover.src} alt={cover.alt} sizes="(min-width: 768px) 50vw, 100vw" className="transition-transform duration-300 group-hover:scale-[1.04]" />}
        </div>
        <div className="flex flex-col justify-center p-6 sm:p-7 sm:py-10">
          <h2 className="text-2xl sm:text-3xl">
            <Link href={href} className="rounded after:absolute after:inset-0 after:content-['']">
              {f.name}
            </Link>
          </h2>
          <p className="mt-2 text-lg font-medium text-forest">{f.tagline}</p>
          <p className="mt-4 text-sm text-body sm:text-base">{f.description}</p>
          <ul className="mt-5 space-y-2">
            {f.services.slice(0, 3).map((s) => (
              <li key={s} className="flex items-start gap-2 text-sm text-ink">
                <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-forest" />
                {s}
              </li>
            ))}
          </ul>
          <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-forest">
            Explore Facility <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </motion.article>
    );
  }

  if (variant === "compact") {
    return (
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25 }}
        className="group relative flex flex-col overflow-hidden rounded-lg border border-line bg-white shadow-card transition-[border-color,box-shadow] duration-300 hover:border-forest/40 hover:shadow-lift"
      >
        <div className="relative aspect-[4/3] shrink-0 overflow-hidden sm:aspect-[16/9]">
          <FacilityCover facility={f} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" iconSize="md" className="transition-transform duration-300 group-hover:scale-[1.04]" />
        </div>
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <h3 className="text-lg sm:text-xl">
            <Link href={href} className="rounded after:absolute after:inset-0 after:content-['']">
              {f.name}
            </Link>
          </h3>
          <p className="mt-1 text-xs text-body sm:text-sm">{f.tagline}</p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {f.services.slice(0, 2).map((s) => (
              <li key={s} className="rounded bg-sage/50 px-2 py-1 text-xs text-ink">
                {s}
              </li>
            ))}
          </ul>
          <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-forest sm:text-sm">
            Explore Facility <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-lg bg-charcoal text-white shadow-card sm:aspect-[4/5] lg:aspect-[3/4]"
    >
      <FacilityCover facility={f} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" iconSize="lg" className="transition-transform duration-300 group-hover:scale-[1.04]" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
      <div className="relative p-5 sm:p-6">
        <h3 className="text-xl sm:text-2xl text-white">
          <Link href={href} className="rounded after:absolute after:inset-0 after:content-[''] focus-visible:outline-white">
            {f.name}
          </Link>
        </h3>
        <p className="mt-2 text-xs text-white/85 sm:text-sm">{f.tagline}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {f.services.slice(0, 2).map((s) => (
            <li key={s} className="rounded bg-white/15 px-2 py-1 text-xs text-white backdrop-blur-sm">
              {s}
            </li>
          ))}
        </ul>
        <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold sm:text-sm">
          Explore Facility <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </motion.article>
  );
}
