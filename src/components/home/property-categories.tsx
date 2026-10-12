import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROPERTY_GROUPS } from "@/data/categories";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SafeImage } from "@/components/ui/safe-image";
import { Reveal } from "@/components/ui/reveal";

// Different tile proportions keep the grid from reading as six identical cards.
const layout: Record<string, string> = {
  "shops-showrooms": "md:col-span-2 md:row-span-2 min-h-[320px] md:min-h-[460px]",
  "office-bank": "min-h-[220px]",
  healthcare: "min-h-[220px]",
  "education-coaching": "min-h-[220px]",
  "warehousing-storage": "md:col-span-2 min-h-[240px]",
  "hotels-events": "min-h-[240px]",
};

export function PropertyCategories() {
  const groups = PROPERTY_GROUPS.filter((g) => g.id !== "other");
  return (
    <section aria-labelledby="cat-title" className="pt-24">
      <Container>
        <SectionHeading
          title="Browse by property type"
          description="Start with the kind of business you run and see the spaces that suit it."
          className="mb-10"
        />
        <Reveal>
          <ul className="grid gap-4 md:grid-cols-4 md:auto-rows-[minmax(220px,auto)]">
            {groups.map((g, i) => (
              <li key={g.id} className={cn("group relative overflow-hidden rounded-lg bg-charcoal", layout[g.id])}>
                <SafeImage src={g.image.src} alt={g.image.alt} sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 100vw"} className="transition-transform duration-300 group-hover:scale-[1.04]" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <h3 className="text-xl text-white sm:text-2xl">
                    <Link href={`/spaces?type=${g.id}`} className="rounded after:absolute after:inset-0 after:content-[''] focus-visible:outline-white">
                      {g.label}
                    </Link>
                  </h3>
                  <p className="mt-1.5 max-w-sm text-sm text-white/85">{g.description}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold">
                    Explore Spaces <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
