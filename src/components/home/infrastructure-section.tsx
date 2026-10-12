import { infrastructure } from "@/data/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function InfrastructureSection() {
  return (
    <section aria-labelledby="infra-title" className="pt-20 sm:pt-24">
      <Container>
        <h2 id="infra-title" className="sr-only">Property infrastructure highlights</h2>
        <Reveal>
        <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {infrastructure.map(({ id, label, detail, icon: Icon, verified }) => (
            <li key={id} className="group flex gap-4 bg-white p-5 transition-colors duration-300 hover:bg-sage/40 lg:flex-col lg:gap-3">
              <Icon aria-hidden strokeWidth={1.5} className="size-7 shrink-0 text-forest transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" />
              <div>
                <p className="font-display text-base font-bold text-ink">{label}</p>
                <p className="mt-1 text-sm leading-snug">{detail}</p>
                {!verified && <p className="mt-2 inline-block rounded bg-amber-wash px-2 py-0.5 text-xs font-semibold text-amber-ink">To be verified</p>}
              </div>
            </li>
          ))}
        </ul>
        </Reveal>
      </Container>
    </section>
  );
}
