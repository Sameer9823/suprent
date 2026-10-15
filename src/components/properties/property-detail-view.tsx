"use client";

import Link from "next/link";
import { useMemo } from "react";
import { CalendarCheck, Check, Info, MapPin, Maximize2, Tag as TagIcon } from "lucide-react";
import { CATEGORY_LABELS } from "@/data/categories";
import { infrastructure } from "@/data/site";
import { useProperties } from "@/lib/use-demo-data";
import { formatArea, formatPrice, isEnquirable, relatedProperties } from "@/lib/property-service";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { StatusBadge, Tag } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PropertyGallery } from "./property-gallery";
import { PropertyGrid } from "./property-grid";
import { InquiryForm } from "./inquiry-form";

export function PropertyDetailView({ slug }: { slug: string }) {
  const all = useProperties();
  const property = all.find((p) => p.slug === slug);
  const related = useMemo(() => (property ? relatedProperties(all, property, 3) : []), [all, property]);

  if (!property) {
    return (
      <Container className="py-24 text-center">
        <h1 className="text-3xl">We couldn&apos;t find this space</h1>
        <p className="mx-auto mt-3 max-w-md text-body">It may have been removed or the link may be wrong.</p>
        <ButtonLink href="/spaces" className="mt-8" arrow>
          Browse all spaces
        </ButtonLink>
      </Container>
    );
  }

  const p = property;
  const enquirable = isEnquirable(p);
  const confirmed = infrastructure.filter((i) => i.verified);
  const pending = infrastructure.filter((i) => !i.verified);

  return (
    <>
      <div className="border-b border-line bg-white">
        <Container className="py-6">
          <Breadcrumbs items={[{ label: "Rental Spaces", href: "/spaces" }, { label: p.title }]} />
        </Container>
      </div>

      <Container className="grid gap-10 py-10 pb-28 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-14 lg:pb-14">
        <div className="min-w-0 space-y-12">
          <header>
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={p.status} />
              <Tag>{CATEGORY_LABELS[p.category]}</Tag>
              {p.isSample && <Tag className="bg-amber-wash text-amber-ink">Sample listing</Tag>}
            </div>
            <h1 className="mt-4 text-4xl sm:text-5xl">{p.title}</h1>
          </header>

          <PropertyGallery images={p.images} priority />

          <dl className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
            {[
              { icon: Maximize2, label: "Area", value: formatArea(p) },
              { icon: MapPin, label: "Location", value: p.location },
              { icon: TagIcon, label: "Rent", value: formatPrice(p) },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-white p-5">
                <dt className="flex items-center gap-2 text-sm text-body">
                  <Icon aria-hidden className="size-4 text-forest" /> {label}
                </dt>
                <dd className="mt-1 font-display text-lg font-bold text-ink">{value}</dd>
              </div>
            ))}
          </dl>

          <section aria-labelledby="about">
            <h2 id="about" className="text-2xl sm:text-3xl">About this space</h2>
            <p className="mt-4 max-w-2xl text-lg">{p.description}</p>
          </section>

          <section aria-labelledby="uses">
            <h2 id="uses" className="text-2xl sm:text-3xl">Potential business uses</h2>
            <p className="mt-2 text-sm text-body">Ideas for how this space could be used. Not a confirmation of permitted use.</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {p.suitableFor.map((u) => (
                <li key={u} className="rounded-md border border-line bg-white px-3.5 py-2 text-ink">
                  {u}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="infra">
            <h2 id="infra" className="text-2xl sm:text-3xl">Infrastructure</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {confirmed.map(({ id, label, detail, icon: Icon }) => (
                  <li key={id} className="flex items-start gap-3 rounded-md border border-line bg-white p-4">
                    <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-forest" />
                    <span>
                      <span className="block font-semibold text-ink">{label}</span>
                      <span className="text-sm">{detail}</span>
                    </span>
                  </li>
                ))}
              {pending.map(({ id, label, detail, icon: Icon }) => (
                <li key={id} className="flex items-start gap-3 rounded-md border border-dashed border-amber-ink/40 bg-amber-wash/60 p-4">
                  <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-amber-ink" />
                  <span>
                    <span className="block font-semibold text-ink">
                      {label} <span className="text-xs font-medium text-amber-ink">(to be verified)</span>
                    </span>
                    <span className="text-sm">{detail}</span>
                  </span>
                </li>
              ))}
            </ul>
            {p.amenities.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg">Listing details</h3>
                <ul className="mt-3 space-y-2">
                  {p.amenities.map((a) => (
                    <li key={a.label} className="flex items-start gap-2.5">
                      <Check aria-hidden className="mt-1 size-4 shrink-0 text-forest" />
                      <span>
                        {a.label}
                        {!a.verified && <span className="text-sm text-body"> (to confirm on a site visit)</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {p.notes && (
            <section aria-labelledby="notes" className="rounded-lg bg-sand/70 p-6">
              <h2 id="notes" className="flex items-center gap-2 text-xl">
                <Info aria-hidden className="size-5 text-forest" /> Additional notes
              </h2>
              <p className="mt-3 text-ink/85">{p.notes}</p>
            </section>
          )}
        </div>

        <aside id="enquire" aria-labelledby="enquire-heading" className="scroll-mt-24 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-lg border border-line bg-white p-6 shadow-card">
            {enquirable ? (
              <>
                <h2 id="enquire-heading" className="text-2xl">Enquire about this space</h2>
                <p className="mt-2 text-sm text-body">Share your details and we will get back to you about availability and terms.</p>
                <div className="mt-6">
                  <InquiryForm idPrefix="prop" compact allowedTypes={["rental", "site-visit"]} defaults={{ inquiryType: "rental", referenceSlug: p.slug }} />
                </div>
              </>
            ) : (
              <>
                <h2 id="enquire-heading" className="text-2xl">Currently {p.status}</h2>
                <p className="mt-2">
                  This space is {p.status === "reserved" ? "reserved for another business" : "already rented"}, so we are not taking inquiries for it. You can look at similar spaces or tell us what you need.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <ButtonLink href="/spaces?status=available" arrow>
                    See available spaces
                  </ButtonLink>
                  <ButtonLink href="/contact?type=rental" variant="outline">
                    Share your requirement
                  </ButtonLink>
                </div>
              </>
            )}
          </div>
          {enquirable && (
            <ButtonLink href={`/contact?type=site-visit&ref=${p.slug}`} variant="outline" className="mt-4 w-full">
              <CalendarCheck aria-hidden className="size-4" /> Request a site visit
            </ButtonLink>
          )}
        </aside>
      </Container>

      {related.length > 0 && (
        <section aria-labelledby="related" className="border-t border-line bg-white py-14">
          <Container>
            <h2 id="related" className="text-2xl sm:text-3xl">Related spaces</h2>
            <div className="mt-8">
              <PropertyGrid properties={related} />
            </div>
          </Container>
        </section>
      )}

      {enquirable && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 p-3 backdrop-blur-sm lg:hidden">
          <Link
            href="#enquire"
            className="flex h-12 w-full items-center justify-center rounded-md bg-forest text-base font-semibold text-white hover:bg-forest-dark"
          >
            Enquire about this space
          </Link>
        </div>
      )}
    </>
  );
}
