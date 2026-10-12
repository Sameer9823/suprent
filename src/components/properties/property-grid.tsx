import type { Property } from "@/types/property";
import { cn } from "@/lib/utils";
import { PropertyCard } from "./property-card";

export function PropertyGrid({
  properties,
  layout = "grid",
  columns = 3,
  priorityCount = 0,
}: {
  properties: Property[];
  layout?: "grid" | "list";
  columns?: 2 | 3;
  priorityCount?: number;
}) {
  return (
    <ul
      className={cn(
        "grid gap-6",
        layout === "list" ? "grid-cols-1" : columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3",
      )}
    >
      {properties.map((p, i) => (
        <li key={p.id} className="flex">
          <div className="w-full">
            <PropertyCard property={p} layout={layout} priority={i < priorityCount} />
          </div>
        </li>
      ))}
    </ul>
  );
}
