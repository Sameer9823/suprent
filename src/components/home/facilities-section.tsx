import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FacilitiesList } from "@/components/facilities/facilities-list";

export function FacilitiesSection() {
  return (
    <section aria-labelledby="fac-title" className="mt-24 bg-sage/50 py-20">
      <Container>
        <SectionHeading
          title="Our facilities"
          description="Everyday places run by SUPGS. These are not rental listings."
          action={<ButtonLink href="/facilities" variant="outline" arrow>All facilities</ButtonLink>}
          className="mb-10"
        />
        <FacilitiesList variant="tall" />
      </Container>
    </section>
  );
}
