"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import type { ImageAsset } from "@/types/property";
import { cn } from "@/lib/utils";
import { SafeImage } from "@/components/ui/safe-image";

/**
 * Gallery with thumbnails, previous/next controls, arrow-key navigation and a full-screen view.
 * The full-screen view uses a native <dialog>, which gives focus trapping, Escape-to-close and
 * focus return for free.
 */
export function PropertyGallery({ images, priority = false }: { images: ImageAsset[]; priority?: boolean }) {
  const [index, setIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const count = images.length;
  const safeIndex = Math.min(index, Math.max(count - 1, 0));
  const current = images[safeIndex];
  if (!current) return null;

  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  return (
    <div role="group" aria-roledescription="carousel" aria-label="Image gallery" onKeyDown={onKey}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-sage sm:aspect-[16/10]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={safeIndex}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SafeImage src={current.src} alt={current.alt} priority={priority && safeIndex === 0} sizes="(min-width: 1024px) 760px, 100vw" />
          </motion.div>
        </AnimatePresence>

        {count > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label="Previous image" className="absolute left-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-md bg-white/95 text-ink shadow hover:bg-white">
              <ChevronLeft aria-hidden className="size-5" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next image" className="absolute right-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-md bg-white/95 text-ink shadow hover:bg-white">
              <ChevronRight aria-hidden className="size-5" />
            </button>
          </>
        )}
        <button
          ref={openerRef}
          type="button"
          onClick={() => dialogRef.current?.showModal()}
          className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-md bg-white/95 px-3 py-2 text-sm font-semibold text-ink shadow hover:bg-white"
        >
          <Expand aria-hidden className="size-4" /> Full screen
        </button>
        <p className="absolute bottom-3 left-3 rounded bg-ink/70 px-2 py-1 text-xs font-medium text-white" aria-live="polite">
          {safeIndex + 1} / {count}
        </p>
      </div>

      {count > 1 && (
        <ul className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-5">
          {images.map((img, i) => (
            <li key={`${img.src}-${i}`}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show image ${i + 1}: ${img.alt}`}
                aria-current={i === safeIndex}
                className={cn("relative block aspect-[4/3] w-full overflow-hidden rounded-md border-2 bg-sage transition-opacity", i === safeIndex ? "border-forest" : "border-transparent opacity-70 hover:opacity-100")}
              >
                <SafeImage src={img.src} alt="" sizes="140px" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <dialog
        ref={dialogRef}
        aria-label="Image viewer"
        onKeyDown={onKey}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
        className="m-auto h-[100dvh] max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-ink/90"
      >
        <div className="relative flex h-full w-full items-center justify-center p-4 sm:p-10">
          <div className="relative h-full w-full">
            <SafeImage src={current.src} alt={current.alt} sizes="100vw" className="object-contain" />
          </div>
          <button type="button" onClick={() => dialogRef.current?.close()} aria-label="Close full screen" className="absolute right-4 top-4 grid size-11 place-items-center rounded-md bg-white text-ink">
            <X aria-hidden className="size-5" />
          </button>
          {count > 1 && (
            <>
              <button type="button" onClick={() => go(-1)} aria-label="Previous image" className="absolute left-4 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-md bg-white text-ink">
                <ChevronLeft aria-hidden className="size-5" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next image" className="absolute right-4 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-md bg-white text-ink">
                <ChevronRight aria-hidden className="size-5" />
              </button>
            </>
          )}
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded bg-white/90 px-3 py-1 text-sm text-ink">
            {safeIndex + 1} / {count}: {current.alt}
          </p>
        </div>
      </dialog>
    </div>
  );
}
