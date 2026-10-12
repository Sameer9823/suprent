import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { AmbientGlow } from "@/components/ui/ambient-glow";

export function CustomRequirementCta() {
  return (
    <section aria-labelledby="cta-title" className="pt-24">
      <Container>
        <Reveal>
          <div data-on-dark className="relative isolate overflow-hidden rounded-xl bg-forest px-7 py-14 text-white sm:px-14 sm:py-20">
            <AmbientGlow />
            <h2 id="cta-title" className="relative max-w-2xl text-3xl text-white sm:text-5xl">Looking for Something Specific?</h2>
            <p className="relative mt-5 max-w-2xl text-lg text-white/90">
              Tell us about your business, the space you need, and your preferred budget. Our team can review your requirements and help you explore suitable options.
            </p>
            <div className="relative mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact?type=rental" variant="light" size="lg" arrow>
                Share Your Requirement
              </ButtonLink>
              <ButtonLink href="/spaces" variant="glass" size="lg">
                Browse Spaces First
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
