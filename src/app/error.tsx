"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Container className="py-28 text-center">
      <h1 className="text-3xl sm:text-4xl">Something went wrong</h1>
      <p className="mx-auto mt-3 max-w-md text-body">The page failed to load. Try again, and if it keeps happening, contact the SUPGS team.</p>
      <Button className="mt-8" onClick={reset}>
        Try again
      </Button>
    </Container>
  );
}
