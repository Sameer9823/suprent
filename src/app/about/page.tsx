import { Building2, Home, Layers, MessageSquare } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { PROPERTY_GROUPS } from "@/data/categories";
import { facilities } from "@/data/facilities";
import { infrastructure } from "@/data/site";
import { img } from "@/data/images";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { SafeImage } from "@/components/ui/safe-image";
import { Reveal } from "@/components/ui/reveal";

export const metadata = pageMetadata({
  title: "About SUPGS",
  description: "SUPGS brings together commercial space opportunities and useful everyday facilities in one accessible destination.",
  path: "/about",
});

const aboutImage = img("aboutBuilding", "Modern commercial building with a glass and concrete facade", 1600);

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="Creating Space for Better Business Opportunities."
        description="SUPGS brings together commercial space opportunities and useful everyday facilities in one accessible destination. Our goal is to make it easier for businesses, professionals, and individuals to explore suitable spaces, understand available infrastructure, and connect with our team."
        crumbs={[{ label: "About Us" }]}
      />

      <Container className="grid items-center gap-12 py-16 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-sage">
            <SafeImage src={aboutImage.src} alt={aboutImage.alt} sizes="(min-width: 1024px) 560px, 100vw" />
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-3xl sm:text-4xl">Two parts, one place</h2>
          <div className="mt-6 space-y-6">
            <div className="flex gap-4">
              <Building2 aria-hidden strokeWidth={1.5} className="mt-1 size-7 shrink-0 text-forest" />
              <div>
                <h3 className="text-xl">Spaces for rent</h3>
                <p className="mt-1.5">Commercial spaces that businesses can rent, from compact shops to large warehouses. The listings on this site are sample data until real inventory is published.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Home aria-hidden strokeWidth={1.5} className="mt-1 size-7 shrink-0 text-forest" />
              <div>
                <h3 className="text-xl">Our facilities</h3>
                <p className="mt-1.5">{facilities.map((f) => f.name).join(", ")}: everyday places promoted by SUPGS for study, laundry and fitness.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>

      <section className="bg-sage/50 py-16">
        <Container>
          <h2 className="text-3xl sm:text-4xl">What a space could be used for</h2>
          <p className="mt-3 max-w-2xl">These are possible uses, not a promise that every type is available today.</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROPERTY_GROUPS.map((g) => (
              <li key={g.id} className="rounded-lg border border-line bg-white p-5">
                <h3 className="text-lg">{g.label}</h3>
                <p className="mt-1.5 text-[0.95rem]">{g.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Container className="py-16">
        <h2 className="text-3xl sm:text-4xl">Infrastructure at a glance</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {infrastructure.map(({ id, label, detail, icon: Icon, verified }) => (
            <li key={id} className="flex gap-4 rounded-lg border border-line bg-white p-5">
              <Icon aria-hidden strokeWidth={1.5} className="size-7 shrink-0 text-forest" />
              <div>
                <p className="font-display font-bold text-ink">{label}</p>
                <p className="mt-1 text-sm">{detail}</p>
                {!verified && <p className="mt-2 inline-block rounded bg-amber-wash px-2 py-0.5 text-xs font-semibold text-amber-ink">To be verified</p>}
              </div>
            </li>
          ))}
        </ul>
      </Container>

      <Container className="pb-4">
        <div data-on-dark className="flex flex-col items-start justify-between gap-6 rounded-xl bg-charcoal p-8 text-white sm:p-12 md:flex-row md:items-center">
          <div>
            <h2 className="flex items-center gap-3 text-2xl text-white sm:text-3xl">
              <MessageSquare aria-hidden className="size-7" /> Talk to the SUPGS team
            </h2>
            <p className="mt-2 max-w-xl text-white/85">Tell us what you are looking for and we will help you explore suitable options.</p>
          </div>
          <ButtonLink href="/contact" variant="light" size="lg" arrow>
            <Layers aria-hidden className="size-4" /> Send an inquiry
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
