import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How SUPGS handles the information you submit through this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHeader title="Privacy Policy" crumbs={[{ label: "Privacy Policy" }]} />
      <Container className="max-w-3xl py-12">
        <p className="rounded-md bg-amber-wash p-4 text-sm text-amber-ink">
          Placeholder. This page is a template and is not legal advice. SUPGS must replace it with a policy reviewed by a qualified professional before the site collects real inquiries.
        </p>
        <div className="mt-8 space-y-8">
          <section>
            <h2 className="text-2xl">Information you provide</h2>
            <p className="mt-3">When you send an inquiry, you may provide your name, phone number, email address, requirements and a preferred visit date. This is used to respond to your inquiry.</p>
          </section>
          <section>
            <h2 className="text-2xl">Demo mode</h2>
            <p className="mt-3">While the site is in demo mode, inquiry details are stored only in your own browser and are not sent to SUPGS unless you use a delivery option that says so.</p>
          </section>
          <section>
            <h2 className="text-2xl">Contact</h2>
            <p className="mt-3">Contact details for privacy questions will be added here by SUPGS.</p>
          </section>
        </div>
      </Container>
    </>
  );
}
