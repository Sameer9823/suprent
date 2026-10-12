import { Building, CalendarCheck, MessagesSquare, Route, ShieldCheck, Layers } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

const reasons = [
  { icon: Layers, title: "Many possible uses", text: "One site, many kinds of business: retail, offices, healthcare, education, storage and events." },
  { icon: Building, title: "Space for different needs", text: "From a compact shop to a large warehouse, so you can match the space to your plans." },
  { icon: ShieldCheck, title: "Simple inquiry", text: "A short form, no account needed. Tell us what you need and we will respond." },
  { icon: CalendarCheck, title: "Site visits", text: "Request a visit to see a space in person before you decide." },
  { icon: Route, title: "Access and infrastructure", text: "Parking, restrooms and road access are listed up front, and anything unconfirmed is marked." },
  { icon: MessagesSquare, title: "Direct conversation", text: "Talk straight to the property team about availability and terms." },
];

export function WhyChoose() {
  return (
    <section aria-labelledby="why-title" className="pt-24">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading title="Why choose SUPGS?" description="Clear information and a direct line to the people who manage the space." as="h2" />
        </div>
        <RevealGroup className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
          {reasons.map(({ icon: Icon, title, text }) => (
            <RevealItem key={title} className="group">
              <span className="grid size-12 place-items-center rounded-lg bg-sage text-forest transition-colors duration-300 group-hover:bg-forest group-hover:text-white">
                <Icon aria-hidden strokeWidth={1.5} className="size-6" />
              </span>
              <h3 className="mt-4 text-lg">{title}</h3>
              <p className="mt-2 text-[0.95rem]">{text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
