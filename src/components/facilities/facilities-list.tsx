"use client";

import { useFacilities } from "@/lib/use-demo-data";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { FacilityCard } from "./facility-card";

export function FacilitiesList() {
  const facilities = useFacilities().filter((f) => f.isPublished);

  if (facilities.length === 0) {
    return <p className="rounded-lg border border-dashed border-line bg-white p-8 text-center text-body">No facilities are published right now. Please check back soon.</p>;
  }

  const featured = facilities.slice(0, 3);
  const more = facilities.slice(3);

  return (
    <div className="grid gap-12">
      {featured.length > 0 && (
        <RevealGroup>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((f) => (
              <RevealItem key={f.id} className="flex">
                <li className="w-full">
                  <FacilityCard facility={f} variant="tall" />
                </li>
              </RevealItem>
            ))}
          </ul>
        </RevealGroup>
      )}

      {more.length > 0 && (
        <div>
          <RevealGroup>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {more.map((f) => (
                <RevealItem key={f.id} className="flex">
                  <li className="w-full">
                    <FacilityCard facility={f} variant="compact" />
                  </li>
                </RevealItem>
              ))}
            </ul>
          </RevealGroup>
        </div>
      )}
    </div>
  );
}
