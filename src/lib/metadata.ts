import type { Metadata } from "next";
import { unsplash, photo } from "@/data/images";

/** Page-level metadata with canonical + Open Graph + Twitter, resolved against metadataBase. */
export function pageMetadata({
  title,
  description,
  path,
  image,
  noIndex,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const images = [{ url: image ?? unsplash(photo.heroBuilding, 1200), width: 1200, height: 800, alt: title }];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: "SUPGS", title: `${title} | SUPGS`, description, url: path, images },
    twitter: { card: "summary_large_image", title: `${title} | SUPGS`, description, images: images.map((i) => i.url) },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
