"use client";

import { useMemo } from "react";
import { useProperties } from "@/lib/use-demo-data";
import { sortProperties } from "@/lib/property-service";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PropertyGrid } from "@/components/properties/property-grid";

export function FeaturedSpaces() {
  const all = useProperties();
  const featured = useMemo(() => sortProperties(all.filter((p) => p.featured), "recommended").slice(0, 6), [all]);

  return (
    <section aria-labelledby="featured-title" className="pt-24">
      <Container>
        <SectionHeading
          title="Featured rental spaces"
          description="Sample listings that show how spaces will appear. Areas are illustrative until real inventory is added."
          action={<ButtonLink href="/spaces" variant="outline" arrow>View All Spaces</ButtonLink>}
          className="mb-10"
        />
        {featured.length > 0 ? (
          <PropertyGrid properties={featured} columns={2} />
        ) : (
          <p className="rounded-lg border border-dashed border-line bg-white p-8 text-center">No featured spaces right now. Browse all spaces instead.</p>
        )}
      </Container>
    </section>
  );
}
