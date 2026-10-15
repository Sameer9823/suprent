import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { FacilitiesList } from "@/components/facilities/facilities-list";
import { ButtonLink } from "@/components/ui/button";

export const metadata = pageMetadata({
  title: "Our Facilities",
  description:
    "Explore SUPGS facilities: My Dream Library with 24-hour CCTV monitoring, Digital Car Washing Center, Ujjwal Fitness Center, a stationery and photocopy shop, a hair salon, a stitching center and a tuition center.",
  path: "/facilities",
});

export default function FacilitiesPage() {
  return (
    <>
      <PageHeader
        title="Facilities for everyday life."
        description="SUPGS runs everyday on-site facilities: a library, a digital car washing center, a fitness center, a stationery and photocopy shop, a hair salon, a stitching center and a tuition center. These are not rental listings."
        crumbs={[{ label: "Our Facilities" }]}
      />
      <Container className="py-12 sm:py-16">
        <FacilitiesList />
        <div className="mt-12 rounded-lg bg-sand/70 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl">Details are being finalised</h2>
          <p className="mt-2 max-w-2xl">Services, timings and contact information shown on these pages are placeholders until SUPGS confirms them. Facilities listed without photos will use a category icon cover until real photos are added. Ask us anything using the inquiry form.</p>
          <ButtonLink href="/contact?type=facility" className="mt-5" arrow>
            Make a facility inquiry
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
