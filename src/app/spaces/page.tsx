import { Suspense } from "react";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { SpacesBrowser } from "@/components/properties/spaces-browser";

export const metadata = pageMetadata({
  title: "Rental Spaces",
  description: "Browse commercial spaces for rent: shops, showrooms, offices, healthcare premises, warehouses, event venues and more. Filter by type, area and availability.",
  path: "/spaces",
});

function ResultsSkeleton() {
  return (
    <div aria-hidden className="grid gap-8 lg:grid-cols-[290px_1fr] lg:gap-12">
      <div className="hidden h-[520px] animate-pulse rounded-lg bg-sage/60 lg:block" />
      <div className="grid gap-6 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-[340px] animate-pulse rounded-lg bg-sage/60" />
        ))}
      </div>
    </div>
  );
}

export default function SpacesPage() {
  return (
    <>
      <PageHeader
        title="Spaces That Fit Your Business."
        description="Browse sample listings across shops, offices, healthcare, education, storage and events. Use the filters to narrow down, and share the page link to share your view."
        crumbs={[{ label: "Rental Spaces" }]}
      />
      <Container className="py-10 sm:py-14">
        {/* useSearchParams needs a Suspense boundary; the skeleton shows while it resolves. */}
        <Suspense fallback={<ResultsSkeleton />}>
          <SpacesBrowser />
        </Suspense>
      </Container>
    </>
  );
}
