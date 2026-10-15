"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { viewportOnce } from "@/lib/motion";
import { locationNotes, distances } from "@/data/site";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Horizontal bars that grow to proportional widths, animated once on scroll. */
function DistanceBars() {
  const max = Math.max(...distances.map((d) => d.distance));
  const reduced = useReducedMotion();

  return (
    <ul className="space-y-4">
      {distances.map((d, i) => {
        const pct = (d.distance / max) * 100;
        return (
          <li key={d.id} className="space-y-1.5">
            <div className="flex items-baseline justify-between">
              <dt className="text-xs font-medium text-ink sm:text-sm">{d.label}</dt>
              <dd className="text-xs text-body sm:text-sm">{d.distance} km</dd>
            </div>
            {reduced ? (
              <div className="h-2 w-full rounded bg-forest/60" style={{ width: `${pct}%` }} />
            ) : (
              <motion.div
                className="relative h-2 w-full rounded bg-sage"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
              >
                <motion.div
                  className="h-full rounded bg-forest"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.15 + i * 0.08 }}
                />
              </motion.div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function LocationConnectivity() {
  return (
    <section aria-labelledby="loc-title" className="pt-20 sm:pt-24">
      <Container>
        <SectionHeading
          title="Location & connectivity"
          description="What is near the property and how far key places are."
          className="mb-8 sm:mb-10"
        />

        <RevealGroup className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <RevealItem>
            <ul className="divide-y divide-line rounded-lg border border-line bg-white">
              {locationNotes.map(({ id, label, detail, icon: Icon, verified }) => (
                <li key={id} className="flex gap-3 p-4 sm:gap-4 sm:p-5">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-sage text-forest sm:size-10">
                    <Icon aria-hidden strokeWidth={1.5} className="size-4 sm:size-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-sm font-bold text-ink sm:text-base">{label}</p>
                    <p className={`mt-1 text-xs leading-snug sm:text-sm ${verified ? "text-ink" : "text-body"}`}>{detail}</p>
                    {!verified && (
                      <p className="mt-1.5 inline-block rounded bg-amber-wash px-1.5 py-0.5 text-[0.7rem] font-semibold text-amber-ink sm:text-xs">To be verified</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </RevealItem>

          <RevealItem>
            <div className="rounded-lg border border-line bg-white p-5 sm:p-6">
              <h3 className="text-sm font-semibold text-ink sm:text-base">Approximate distances</h3>
              <DistanceBars />
              <p className="mt-5 text-xs text-body sm:text-sm">Distances are approximate and will be confirmed.</p>
            </div>
          </RevealItem>
        </RevealGroup>
      </Container>
    </section>
  );
}
