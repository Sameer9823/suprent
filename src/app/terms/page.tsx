import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";

export const metadata = pageMetadata({
  title: "Terms & Conditions",
  description: "Terms for using the SUPGS website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHeader title="Terms & Conditions" crumbs={[{ label: "Terms & Conditions" }]} />
      <Container className="max-w-3xl py-12">
        <p className="rounded-md bg-amber-wash p-4 text-sm text-amber-ink">
          Placeholder. This page is a template and is not legal advice. SUPGS must replace it with terms reviewed by a qualified professional before launch.
        </p>
        <div className="mt-8 space-y-8">
          <section>
            <h2 className="text-2xl">Listings are informational</h2>
            <p className="mt-3">Listings, areas, availability and prices on this site are for information only. Sample listings are fictional examples. Nothing here is an offer, and terms are agreed directly with SUPGS.</p>
          </section>
          <section>
            <h2 className="text-2xl">Approvals and permitted use</h2>
            <p className="mt-3">Potential uses shown for a space are ideas, not confirmation that a use is permitted. Tenants are responsible for the licences and approvals their business needs.</p>
          </section>
          <section>
            <h2 className="text-2xl">Changes</h2>
            <p className="mt-3">SUPGS may update the website and these terms at any time.</p>
          </section>
        </div>
      </Container>
    </>
  );
}
