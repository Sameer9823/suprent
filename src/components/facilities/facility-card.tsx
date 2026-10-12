"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import type { Facility } from "@/types/facility";
import { cn } from "@/lib/utils";
import { SafeImage } from "@/components/ui/safe-image";

/** "tall" = lifestyle poster card for the homepage; "feature" = wide alternating row for /facilities. */
export function FacilityCard({ facility: f, variant = "tall", reverse = false }: { facility: Facility; variant?: "tall" | "feature"; reverse?: boolean }) {
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
        <div className="flex flex-col justify-center p-7 sm:p-10">
          <h2 className="text-3xl">
            <Link href={href} className="rounded after:absolute after:inset-0 after:content-['']">
              {f.name}
            </Link>
          </h2>
          <p className="mt-2 text-lg font-medium text-forest">{f.tagline}</p>
          <p className="mt-4 text-body">{f.description}</p>
          <ul className="mt-5 space-y-2">
            {f.services.slice(0, 3).map((s) => (
              <li key={s} className="flex items-start gap-2 text-sm text-ink">
                <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-forest" />
                {s}
              </li>
            ))}
          </ul>
          <span className="mt-7 inline-flex items-center gap-2 font-semibold text-forest">
            Explore Facility <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
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
      {cover && <SafeImage src={cover.src} alt={cover.alt} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="transition-transform duration-300 group-hover:scale-[1.04]" />}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
      <div className="relative p-6">
        <h3 className="text-2xl text-white">
          <Link href={href} className="rounded after:absolute after:inset-0 after:content-[''] focus-visible:outline-white">
            {f.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-white/85">{f.tagline}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {f.services.slice(0, 2).map((s) => (
            <li key={s} className="rounded bg-white/15 px-2 py-1 text-xs text-white backdrop-blur-sm">
              {s}
            </li>
          ))}
        </ul>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
          Explore Facility <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </motion.article>
  );
}
