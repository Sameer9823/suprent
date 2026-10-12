"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { LayoutGrid, List, SearchX, SlidersHorizontal } from "lucide-react";
import { useProperties } from "@/lib/use-demo-data";
import {
  DEFAULT_FILTERS,
  SORT_OPTIONS,
  countActiveFilters,
  filterProperties,
  filtersToSearch,
  parseFilters,
  sortProperties,
  type Filters,
} from "@/lib/property-service";
import { cn } from "@/lib/utils";
import { Button, ButtonLink } from "@/components/ui/button";
import { PropertyFilters } from "./property-filters";
import { PropertyGrid } from "./property-grid";

export function SpacesBrowser() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const properties = useProperties();
  const [panelOpen, setPanelOpen] = useState(false);

  const filters = useMemo(() => parseFilters(searchParams), [searchParams]);
  const results = useMemo(() => sortProperties(filterProperties(properties, filters), filters.sort), [properties, filters]);
  const active = countActiveFilters(filters);

  const update = (patch: Partial<Filters>) => {
    const qs = filtersToSearch({ ...filters, ...patch });
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };
  const reset = () => update({ ...DEFAULT_FILTERS, sort: filters.sort, view: filters.view });

  return (
    <div className="grid gap-8 lg:grid-cols-[290px_minmax(0,1fr)] lg:gap-12">
      {/* Filters: always visible on desktop, expandable on mobile */}
      <aside aria-label="Filters" className="lg:sticky lg:top-24 lg:self-start">
        <Button
          variant="outline"
          className="w-full justify-between lg:hidden"
          aria-expanded={panelOpen}
          aria-controls="filters-panel"
          onClick={() => setPanelOpen((v) => !v)}
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal aria-hidden className="size-4" /> Filters{active ? ` (${active})` : ""}
          </span>
          <span className="text-sm font-normal text-body">{panelOpen ? "Hide" : "Show"}</span>
        </Button>

        <div className="hidden lg:block">
          <div className="rounded-lg border border-line bg-white p-5 shadow-card">
            <PropertyFilters filters={filters} onChange={update} onReset={reset} />
          </div>
        </div>

        <AnimatePresence initial={false}>
          {panelOpen && (
            <motion.div
              id="filters-panel"
              key="panel"
              className="overflow-hidden lg:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mt-3 rounded-lg border border-line bg-white p-5">
                <PropertyFilters filters={filters} onChange={update} onReset={reset} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </aside>

      <section aria-label="Results">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
          <p role="status" aria-live="polite" className="text-sm font-medium text-ink">
            {results.length} {results.length === 1 ? "space" : "spaces"} found
            {active > 0 && <span className="font-normal text-body"> · {active} {active === 1 ? "filter" : "filters"} applied</span>}
          </p>
          <div className="flex items-center gap-3">
            <div>
              <label htmlFor="sort" className="sr-only">
                Sort by
              </label>
              <select
                id="sort"
                value={filters.sort}
                onChange={(e) => update({ sort: e.target.value as Filters["sort"] })}
                className="rounded-md border border-line bg-white px-3 py-2 text-sm text-ink focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/25"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div role="group" aria-label="Layout" className="hidden overflow-hidden rounded-md border border-line bg-white sm:flex">
              {(["grid", "list"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  aria-pressed={filters.view === v}
                  aria-label={v === "grid" ? "Grid view" : "List view"}
                  onClick={() => update({ view: v })}
                  className={cn("grid size-9 place-items-center transition-colors", filters.view === v ? "bg-forest text-white" : "text-ink hover:bg-sage/50")}
                >
                  {v === "grid" ? <LayoutGrid aria-hidden className="size-4" /> : <List aria-hidden className="size-4" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6">
          {results.length > 0 ? (
            <PropertyGrid properties={results} layout={filters.view} columns={2} />
          ) : (
            <div className="rounded-lg border border-dashed border-line bg-white px-6 py-14 text-center">
              <SearchX aria-hidden className="mx-auto size-10 text-forest/70" />
              <h2 className="mt-4 text-2xl">No spaces match these filters</h2>
              <p className="mx-auto mt-2 max-w-md text-body">
                Try removing a filter or changing your search. If you do not see what you need, tell us what you are looking for.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button onClick={reset}>Reset Filters</Button>
                <ButtonLink href="/contact?type=rental" variant="outline" arrow>
                  Share your requirement
                </ButtonLink>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
