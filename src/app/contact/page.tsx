import { CalendarCheck, Clock, MapPin, Phone } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { INQUIRY_TYPES, type InquiryType } from "@/types/inquiry";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { InquiryForm } from "@/components/properties/inquiry-form";

export const metadata = pageMetadata({
  title: "Contact & Site Visits",
  description: "Send a rental inquiry, ask about a facility, or request a site visit with the SUPGS team.",
  path: "/contact",
});

const pick = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export default async function ContactPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const type = pick(sp.type) as InquiryType;
  const ref = pick(sp.ref).replace(/[^a-z0-9-]/gi, "").slice(0, 120);

  return (
    <>
      <PageHeader
        title="Tell us what you need."
        description="Send a rental inquiry, ask about a facility or request a site visit. We will use your details only to respond."
        crumbs={[{ label: "Contact" }]}
      />
      <Container className="grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16 sm:py-16">
        <div className="rounded-lg border border-line bg-white p-6 shadow-card sm:p-9">
          <h2 className="text-2xl sm:text-3xl">Inquiry form</h2>
          <div className="mt-7">
            <InquiryForm
              idPrefix="contact"
              defaults={{ inquiryType: (INQUIRY_TYPES as readonly string[]).includes(type) ? type : "rental", referenceSlug: ref }}
            />
          </div>
        </div>

        <aside className="space-y-6" aria-label="Contact information">
          <div className="rounded-lg bg-sage/60 p-6">
            <h2 className="text-xl">Contact details</h2>
            <ul className="mt-4 space-y-4 text-[0.95rem]">
              <li className="flex gap-3">
                <Phone aria-hidden className="mt-0.5 size-5 shrink-0 text-forest" />
                {siteConfig.phone ? <a href={`tel:${siteConfig.phone}`} className="text-ink underline underline-offset-4">{siteConfig.phone}</a> : "Phone number to be added"}
              </li>
              <li className="flex gap-3">
                <MapPin aria-hidden className="mt-0.5 size-5 shrink-0 text-forest" />
                Address to be added
              </li>
              <li className="flex gap-3">
                <Clock aria-hidden className="mt-0.5 size-5 shrink-0 text-forest" />
                Office hours to be added
              </li>
            </ul>
          </div>
          <div className="rounded-lg border border-line bg-white p-6">
            <h2 className="flex items-center gap-2 text-xl">
              <CalendarCheck aria-hidden className="size-5 text-forest" /> Want to see a space?
            </h2>
            <p className="mt-2 text-[0.95rem]">Choose “Site visit request” as the inquiry type and add a preferred date. The team will confirm a time with you.</p>
          </div>
        </aside>
      </Container>
    </>
  );
}
