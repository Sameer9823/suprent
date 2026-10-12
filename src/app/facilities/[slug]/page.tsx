import type { Metadata } from "next";
import { facilities } from "@/data/facilities";
import { pageMetadata } from "@/lib/metadata";
import { FacilityDetailView } from "@/components/facilities/facility-detail-view";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return facilities.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const f = facilities.find((x) => x.slug === slug);
  if (!f) return {};
  return pageMetadata({ title: f.name, description: `${f.tagline} ${f.description}`.slice(0, 200), path: `/facilities/${f.slug}`, image: f.images[0]?.src });
}

export default async function FacilityPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  return <FacilityDetailView slug={slug} />;
}
