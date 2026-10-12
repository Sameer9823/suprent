"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { PROPERTY_GROUPS } from "@/data/categories";
import { DEFAULT_FILTERS, filtersToSearch } from "@/lib/property-service";
import { Button } from "@/components/ui/button";

const control =
  "h-11 w-full rounded-md border border-line bg-white px-3 text-[0.95rem] text-ink placeholder:text-body/60 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/25";

export function HeroSearch() {
  const router = useRouter();
  const [searching, setSearching] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const qs = filtersToSearch({
      ...DEFAULT_FILTERS,
      type: String(data.get("type") ?? ""),
    });
    setSearching(true);
    router.push(qs ? `/spaces?${qs}` : "/spaces");
  };

  return (
    <form onSubmit={onSubmit} role="search" aria-label="Search rental spaces" className="grid gap-4 rounded-lg border border-line bg-white p-5 shadow-lift sm:grid-cols-2 lg:grid-cols-[1.5fr_1.5fr_auto] lg:items-end lg:p-6">
      <div>
        <label htmlFor="hs-type" className="mb-1.5 block text-sm font-semibold text-ink">Property type</label>
        <select id="hs-type" name="type" className={control} defaultValue="">
          <option value="">All types</option>
          {PROPERTY_GROUPS.map((g) => (
            <option key={g.id} value={g.id}>{g.label}</option>
          ))}
        </select>
      </div>
      <Button type="submit" size="lg" loading={searching} className="sm:col-span-2 lg:col-span-1">
        <Search aria-hidden className="size-4" /> Search
      </Button>
    </form>
  );
}
