import { CalendarCheck, MessageSquareText, Search } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { DrawLine } from "@/components/ui/draw-line";

const steps = [
  { icon: Search, title: "Explore", text: "Browse spaces and facilities." },
  { icon: MessageSquareText, title: "Enquire", text: "Share your business needs and preferred space." },
  { icon: CalendarCheck, title: "Visit & Discuss", text: "Arrange a site visit and discuss availability and terms." },
];

export function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="pt-24">
      <Container>
        <SectionHeading title="How it works" description="Three steps from first look to a conversation about terms." className="mb-12" />
        <RevealGroup>
          <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
            <DrawLine axis="y" className="absolute bottom-6 left-[27px] top-6 w-px bg-forest/40 md:hidden" />
            <DrawLine className="absolute left-[16%] right-[16%] top-[27px] hidden h-px bg-forest/40 md:block" />
            {steps.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="group/step">
                <RevealItem className="relative flex gap-5 md:flex-col md:items-center md:text-center">
                  <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-full border border-forest/30 bg-white text-forest shadow-card transition-colors duration-300 group-hover/step:bg-forest group-hover/step:text-white">
                    <Icon aria-hidden strokeWidth={1.5} className="size-6" />
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold text-forest">Step {i + 1}</p>
                    <h3 className="text-xl">{title}</h3>
                    <p className="mt-1.5 max-w-xs text-[0.95rem]">{text}</p>
                  </div>
                </RevealItem>
              </li>
            ))}
          </ol>
        </RevealGroup>
      </Container>
    </section>
  );
}
