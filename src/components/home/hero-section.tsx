"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Check, Play } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SafeImage } from "@/components/ui/safe-image";
import { img } from "@/data/images";
import { infrastructure } from "@/data/site";
import { HeroSearch } from "./hero-search";

const hero = img("heroBuilding", "Glass-fronted commercial building seen from below against a clear sky", 2400);
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const headline = ["Find the Right Space", "to Build Your Next", "Big Idea."];
const onSite = infrastructure.filter((i) => i.verified).slice(0, 4);

/** Each word slides up out of a mask, line by line. This is the page's opening moment. */
function HeadlineLines() {
  let n = 0;
  return (
    <h1 id="hero-title" className="text-[2.5rem] leading-[1.06] text-white sm:text-6xl lg:text-[4rem] xl:text-[4.5rem]">
      {headline.map((line) => (
        <span key={line} className="sm:block">
          {line.split(" ").map((word) => {
            const delay = 0.2 + n++ * 0.07;
            return (
              <span key={`${line}-${word}`}>
                <span className="-my-[0.08em] inline-block overflow-hidden py-[0.08em] align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "115%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.85, ease: EASE, delay }}
                  >
                    {word}
                  </motion.span>
                </span>{" "}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE, delay },
});

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  return (
    <section aria-labelledby="hero-title" className="relative">
      <div ref={ref} data-on-dark className="relative isolate overflow-hidden bg-ink">
        {/* Photo: settles from a slight zoom on load, then drifts slower than the page on scroll. */}
        <motion.div aria-hidden style={{ y: parallaxY }} className="absolute inset-x-0 -top-[8%] -z-20 h-[116%]">
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.14 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.6, ease: EASE }}
          >
            <SafeImage src={hero.src} alt="" priority sizes="100vw" className="object-[50%_40%]" />
          </motion.div>
        </motion.div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/65 to-ink/10" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-ink/70 to-transparent" />

        <Container className="grid min-h-[640px] items-center gap-10 pb-32 pt-16 sm:pt-20 lg:min-h-[780px] lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:pb-40">
          <motion.div style={{ y: textY }}>
            <motion.p
              {...rise(0.05)}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 py-1.5 pl-3 pr-4 text-sm font-medium text-white backdrop-blur-sm"
            >
              <span aria-hidden className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-300 opacity-70" />
                <span className="relative inline-flex size-2.5 rounded-full bg-emerald-300" />
              </span>
              Commercial spaces open for inquiry
            </motion.p>

            <div className="mt-6">
              <HeadlineLines />
            </div>

            <motion.p {...rise(0.85)} className="mt-6 max-w-xl text-lg text-white/85">
              Discover commercial spaces for rent and explore useful everyday facilities at SUPGS. Whether you&apos;re starting a business, expanding your operations, or looking for a suitable commercial location, find a space that fits your plans.
            </motion.p>

            <motion.div {...rise(1.0)} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/spaces" variant="light" size="lg" arrow>
                Explore Rental Spaces
              </ButtonLink>
              <ButtonLink href="#tour" variant="glass" size="lg">
                <Play aria-hidden className="size-4 fill-current" /> Watch the Property Tour
              </ButtonLink>
            </motion.div>
          </motion.div>

          {/* Floating summary of what is already confirmed on site. */}
          <motion.aside
            aria-label="On-site facilities"
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.2 }}
            className="hidden justify-self-end lg:block"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, delay: 2.2 }}
              className="w-72 rounded-xl border border-white/20 bg-white/10 p-5 text-white shadow-lift backdrop-blur-md"
            >
              <p className="font-display text-base font-bold text-white">Already on site</p>
              <ul className="mt-4 space-y-3">
                {onSite.map(({ id, label }, i) => (
                  <motion.li
                    key={id}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 1.5 + i * 0.12 }}
                    className="flex items-center gap-3 text-[0.95rem]"
                  >
                    <span aria-hidden className="grid size-6 shrink-0 place-items-center rounded-full bg-emerald-300/90 text-forest-dark">
                      <Check className="size-3.5" strokeWidth={3} />
                    </span>
                    {label}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.aside>
        </Container>
      </div>

      <Container className="relative z-20 -mt-12 sm:-mt-14 lg:-mt-16">
        <motion.div {...rise(1.3)}>
          <HeroSearch />
        </motion.div>
      </Container>
    </section>
  );
}
