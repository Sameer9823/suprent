"use client";

import { Check, Clock, MapPin } from "lucide-react";
import type { Facility } from "@/types/facility";
import { useFacilities } from "@/lib/use-demo-data";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SafeImage } from "@/components/ui/safe-image";
import { PropertyGallery } from "@/components/properties/property-gallery";
import { InquiryForm } from "@/components/properties/inquiry-form";

export function FacilityDetailView({ slug }: { slug: string }) {
  const facility: Facility | undefined = useFacilities().find((f) => f.slug === slug);

  if (!facility || !facility.isPublished) {
    return (
      <Container className="py-24 text-center">
        <h1 className="text-3xl">This facility isn&apos;t available right now</h1>
        <p className="mx-auto mt-3 max-w-md text-body">It may be unpublished or the link may be wrong.</p>
        <ButtonLink href="/facilities" className="mt-8" arrow>
          See all facilities
        </ButtonLink>
      </Container>
    );
  }
  const cover = facility.images[0];

  return (
    <>
      <section className="relative isolate overflow-hidden bg-charcoal text-white" data-on-dark>
        <div className="absolute inset-0 -z-10">
          {cover && <SafeImage src={cover.src} alt={cover.alt} priority sizes="100vw" />}
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/65 to-ink/25" />
        </div>
        <Container className="py-14 sm:py-20 lg:py-28">
          <div className="[&_*]:!text-white/85 [&_a:hover]:!text-white">
            <Breadcrumbs items={[{ label: "Our Facilities", href: "/facilities" }, { label: facility.name }]} />
          </div>
          <h1 className="mt-6 max-w-2xl text-4xl text-white sm:text-5xl">{facility.name}</h1>
          <p className="mt-4 max-w-xl text-lg text-white/90">{facility.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={`/contact?type=facility&ref=${facility.slug}`} variant="light" size="lg" arrow>
              Make an inquiry
            </ButtonLink>
          </div>
        </Container>
      </section>

      <Container className="grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-16">
        <div className="space-y-12">
          <section aria-labelledby="overview">
            <h2 id="overview" className="text-2xl sm:text-3xl">Overview</h2>
            <p className="mt-4 max-w-2xl text-lg">{facility.description}</p>
          </section>

          <section aria-labelledby="services">
            <h2 id="services" className="text-2xl sm:text-3xl">Services and features</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {facility.services.map((s) => (
                <li key={s} className="flex items-start gap-3 rounded-md border border-line bg-white p-4 text-ink">
                  <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-forest" />
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-body">Service details are editable placeholders until SUPGS confirms them.</p>
          </section>

          <section aria-labelledby="hours">
            <h2 id="hours" className="text-2xl sm:text-3xl">Operating hours</h2>
            <ul className="mt-5 divide-y divide-line rounded-lg border border-line bg-white">
              {facility.operatingHours.map((h) => (
                <li key={h.label} className="flex items-center justify-between gap-4 px-5 py-4">
                  <span className="flex items-center gap-2 font-medium text-ink">
                    <Clock aria-hidden className="size-4 text-forest" /> {h.label}
                  </span>
                  <span className={h.hours ? "text-ink" : "text-body"}>{h.hours ?? "To be confirmed"}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="gallery">
            <h2 id="gallery" className="mb-5 text-2xl sm:text-3xl">Gallery</h2>
            <PropertyGallery images={facility.images} />
          </section>

          <section aria-labelledby="location">
            <h2 id="location" className="text-2xl sm:text-3xl">Location</h2>
            <p className="mt-4 flex items-start gap-3">
              <MapPin aria-hidden className="mt-1 size-5 shrink-0 text-forest" />
              The exact address will be published here once SUPGS confirms it. Ask us for directions using the inquiry form.
            </p>
          </section>
        </div>

        <aside id="enquire" aria-labelledby="enquire-heading" className="scroll-mt-24 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-lg border border-line bg-white p-6 shadow-card">
            <h2 id="enquire-heading" className="text-2xl">Ask about {facility.name}</h2>
            <p className="mt-2 text-sm text-body">Questions about timings, membership or services? Send them here.</p>
            <div className="mt-6">
              <InquiryForm idPrefix="fac" compact allowedTypes={["facility", "general"]} defaults={{ inquiryType: "facility", referenceSlug: facility.slug }} />
            </div>
          </div>
        </aside>
      </Container>
    </>
  );
}
