"use client";

import { useFacilities } from "@/lib/use-demo-data";
import { FacilityCard } from "./facility-card";

export function FacilitiesList({ variant }: { variant: "tall" | "feature" }) {
  const facilities = useFacilities().filter((f) => f.isPublished);

  if (facilities.length === 0) {
    return <p className="rounded-lg border border-dashed border-line bg-white p-8 text-center text-body">No facilities are published right now. Please check back soon.</p>;
  }
  if (variant === "feature") {
    return (
      <div className="space-y-8">
        {facilities.map((f, i) => (
          <FacilityCard key={f.id} facility={f} variant="feature" reverse={i % 2 === 1} />
        ))}
      </div>
    );
  }
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {facilities.map((f, i) => (
        <li key={f.id} className={i === 1 ? "lg:mt-10" : undefined}>
          <FacilityCard facility={f} />
        </li>
      ))}
    </ul>
  );
}
