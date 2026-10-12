import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { FacilitiesList } from "@/components/facilities/facilities-list";
import { ButtonLink } from "@/components/ui/button";

export const metadata = pageMetadata({
  title: "Our Facilities",
  description: "Explore SUPGS facilities: My Dream Library, Digital Washing Center and Ujjwal Fitness Center.",
  path: "/facilities",
});

export default function FacilitiesPage() {
  return (
    <>
      <PageHeader
        title="Facilities for everyday life."
        description="A library for focused study, a washing center for convenient laundry, and a fitness center for training. These are run by SUPGS and are not rental listings."
        crumbs={[{ label: "Our Facilities" }]}
      />
      <Container className="py-12 sm:py-16">
        <FacilitiesList variant="feature" />
        <div className="mt-12 rounded-lg bg-sand/70 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl">Details are being finalised</h2>
          <p className="mt-2 max-w-2xl">Services, timings and contact information shown on these pages are placeholders until SUPGS confirms them. Ask us anything using the inquiry form.</p>
          <ButtonLink href="/contact?type=facility" className="mt-5" arrow>
            Make a facility inquiry
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
