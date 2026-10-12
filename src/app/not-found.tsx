import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="py-28 text-center">
      <p className="font-display text-6xl font-extrabold text-forest">404</p>
      <h1 className="mt-4 text-3xl sm:text-4xl">We couldn&apos;t find that page</h1>
      <p className="mx-auto mt-3 max-w-md text-body">The link may be outdated, or the listing may have been removed.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/spaces" arrow>
          Browse rental spaces
        </ButtonLink>
        <ButtonLink href="/" variant="outline">
          Back to home
        </ButtonLink>
      </div>
    </Container>
  );
}
