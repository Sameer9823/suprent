"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Clapperboard, Play } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SafeImage } from "@/components/ui/safe-image";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { img } from "@/data/images";
import { propertyVideo } from "@/data/site";
import { embedUrl, parseVideoUrl } from "@/lib/video";

const fallbackPoster = img("aboutBuilding", "Commercial building exterior at SUPGS", 2000);

export function PropertyVideo() {
  const source = useMemo(() => parseVideoUrl(propertyVideo.url), []);
  const poster = propertyVideo.poster ?? fallbackPoster.src;
  const [playing, setPlaying] = useState(false);

  // The frame grows into place as it scrolls into view.
  const frameRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [32, 16]);

  return (
    <section
      id="tour"
      aria-labelledby="tour-title"
      data-on-dark
      className="relative mt-24 scroll-mt-16 overflow-hidden bg-forest py-20 text-white sm:py-28"
    >
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 size-[34rem] rounded-full bg-forest-dark/70 blur-3xl" />

      <Container className="relative">
        <Reveal className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
          <h2 id="tour-title" className="text-3xl text-white sm:text-5xl">
            {propertyVideo.title}
          </h2>
          <p className="max-w-xl text-base text-white/85 sm:text-lg">{propertyVideo.description}</p>
        </Reveal>

        <motion.div
          ref={frameRef}
          style={{ scale, borderRadius: radius }}
          className="relative mt-12 aspect-video w-full overflow-hidden bg-ink shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)] ring-1 ring-white/15"
        >
          {playing && source ? (
            source.kind === "file" ? (
              <video
                src={source.src}
                poster={poster}
                autoPlay
                controls
                playsInline
                preload="metadata"
                className="absolute inset-0 size-full bg-black object-contain"
              >
                Your browser cannot play this video.
              </video>
            ) : (
              <iframe
                src={embedUrl(source)}
                title="SUPGS property video"
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                allowFullScreen
                className="absolute inset-0 size-full border-0"
              />
            )
          ) : (
            <>
              <motion.div
                aria-hidden
                className="absolute inset-0"
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
              >
                <SafeImage src={poster} alt="" sizes="(min-width: 1280px) 1216px, 100vw" />
              </motion.div>
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/30" />

              {source ? (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  aria-label="Play property video"
                  className="group absolute inset-0 grid place-items-center focus-visible:outline-white"
                >
                  <span className="relative grid size-20 place-items-center sm:size-28">
                    <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-white/40 [animation-duration:2.4s]" />
                    <span aria-hidden className="absolute -inset-3 rounded-full border border-white/40 transition-transform duration-300 group-hover:scale-110" />
                    <span className="relative grid size-full place-items-center rounded-full bg-white text-forest shadow-lift transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
                      <Play aria-hidden className="ml-1 size-8 fill-current sm:size-10" />
                    </span>
                  </span>
                </button>
              ) : (
                <div className="absolute inset-0 grid place-items-center p-6 text-center">
                  <div className="max-w-sm">
                    <span className="mx-auto grid size-14 place-items-center rounded-full border border-white/40 bg-white/10 backdrop-blur-sm">
                      <Clapperboard aria-hidden strokeWidth={1.5} className="size-6" />
                    </span>
                    <p className="mt-4 font-display text-xl font-bold text-white">Property video coming soon</p>
                    <p className="mt-1.5 text-sm text-white/80">
                      We are preparing a walkthrough of the site. Request a visit if you would like to see it in person.
                    </p>
                  </div>
                </div>
              )}

              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-8">
                <p className="font-display text-base font-bold text-white sm:text-xl">Property walkthrough</p>
              </div>
            </>
          )}
        </motion.div>

        <RevealGroup className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between" gap={0.1}>
          <RevealItem>
            <ul className="flex flex-wrap gap-3">
              {propertyVideo.highlights.map((h) => (
                <li key={h} className="rounded-full border border-white/25 bg-white/5 px-4 py-2 text-sm font-medium text-white">
                  {h}
                </li>
              ))}
            </ul>
          </RevealItem>
          <RevealItem>
            <ButtonLink href="/contact?type=site-visit" variant="light" size="lg" arrow>
              Request a Site Visit
            </ButtonLink>
          </RevealItem>
        </RevealGroup>
      </Container>
    </section>
  );
}
