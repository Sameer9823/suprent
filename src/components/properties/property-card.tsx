"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, MapPin, Maximize2 } from "lucide-react";
import type { Property } from "@/types/property";
import { CATEGORY_LABELS } from "@/data/categories";
import { formatArea, formatPrice, isEnquirable, STATUS_LABELS } from "@/lib/property-service";
import { cn } from "@/lib/utils";
import { Button, ButtonLink } from "@/components/ui/button";
import { SafeImage } from "@/components/ui/safe-image";
import { StatusBadge, Tag } from "@/components/ui/badge";

interface Props {
  property: Property;
  layout?: "grid" | "list";
  /** Priority is for genuinely above-the-fold cards only. */
  priority?: boolean;
}

export function PropertyCard({ property: p, layout = "grid", priority }: Props) {
  const list = layout === "list";
  const enquirable = isEnquirable(p);
  const cover = p.images[0];
  const detailHref = `/spaces/${p.slug}`;

  return (
    <motion.article
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative flex overflow-hidden rounded-lg border border-line bg-white shadow-card transition-[border-color,box-shadow] duration-300 hover:border-forest/40 hover:shadow-lift",
        list ? "flex-col sm:flex-row" : "flex-col",
        !enquirable && "bg-white/70",
      )}
    >
      <div className={cn("relative shrink-0 overflow-hidden bg-sage", list ? "aspect-[16/10] sm:aspect-auto sm:w-[320px]" : "aspect-[4/3]")}>
        {cover && (
          <SafeImage
            src={cover.src}
            alt={cover.alt}
            priority={priority}
            sizes={list ? "(min-width: 640px) 320px, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
            className={cn("transition-transform duration-300 ease-out group-hover:scale-[1.04]", !enquirable && "grayscale-[35%]")}
          />
        )}
        <div className="absolute left-3 top-3 flex gap-2">
          <StatusBadge status={p.status} />
          {p.isSample && <Tag className="bg-white/95">Sample listing</Tag>}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm font-medium text-forest">{CATEGORY_LABELS[p.category]}</p>
        <h3 className="mt-1 text-xl">
          <Link
            href={detailHref}
            className="rounded after:absolute after:inset-0 after:z-0 after:content-[''] focus-visible:after:outline-2"
          >
            {p.title}
            <span className="sr-only"> ({STATUS_LABELS[p.status]})</span>
          </Link>
        </h3>

        <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm">
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Area</dt>
            <Maximize2 aria-hidden className="size-4 text-body/70" />
            <dd>{formatArea(p)}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Location</dt>
            <MapPin aria-hidden className="size-4 text-body/70" />
            <dd>{p.location}</dd>
          </div>
        </dl>

        <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-5">
          <p className="font-display text-lg font-bold text-ink">{formatPrice(p)}</p>
          <div className="relative z-10 flex flex-col gap-2 sm:flex-row sm:gap-2">
            <ButtonLink href={detailHref} variant="outline" size="sm">
              View Details
              <ArrowUpRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </ButtonLink>
            {enquirable ? (
              <ButtonLink href={`/contact?type=rental&ref=${encodeURIComponent(p.slug)}`} size="sm">
                Enquire Now
              </ButtonLink>
            ) : (
              <Button size="sm" disabled title={`This space is currently ${p.status}.`}>
                Not available
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
