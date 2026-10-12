import type { Metadata } from "next";
import { getPropertyBySlug, properties } from "@/data/properties";
import { CATEGORY_LABELS } from "@/data/categories";
import { pageMetadata } from "@/lib/metadata";
import { formatArea } from "@/lib/property-service";
import { PropertyDetailView } from "@/components/properties/property-detail-view";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPropertyBySlug(slug);
  // Listings created in the demo admin only exist in that browser, so they are not indexed.
  if (!p) return pageMetadata({ title: "Rental space", description: "Rental space details at SUPGS.", path: `/spaces/${slug}`, noIndex: true });
  return pageMetadata({
    title: p.title,
    description: `${CATEGORY_LABELS[p.category]}, ${formatArea(p)}. ${p.description.slice(0, 110).trim()}…`,
    path: `/spaces/${p.slug}`,
    image: p.images[0]?.src,
  });
}

export default async function PropertyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  return <PropertyDetailView slug={slug} />;
}
