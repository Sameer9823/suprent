"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

const OPTIMISED_HOST = "https://images.unsplash.com/";

interface SafeImageProps {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}

/**
 * Fill-mode image with a graceful fallback. The parent must be `relative` and have a
 * fixed aspect ratio so nothing shifts while the image loads. Images from hosts that are
 * not configured in next.config.ts (admin-entered URLs, uploads) are served unoptimised
 * instead of crashing.
 */
export function SafeImage({ src, alt, sizes, className, priority }: SafeImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (failedSrc === src) {
    return (
      <div role="img" aria-label={alt} className="absolute inset-0 flex items-center justify-center bg-sage text-forest/70">
        <ImageOff aria-hidden className="size-8" />
      </div>
    );
  }
  const optimise = src.startsWith(OPTIMISED_HOST) || src.startsWith("/");
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={!optimise}
      onError={() => setFailedSrc(src)}
      className={cn("object-cover", className)}
    />
  );
}
