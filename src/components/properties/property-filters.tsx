"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { PROPERTY_GROUPS } from "@/data/categories";
import { PROPERTY_STATUSES } from "@/types/property";
import { STATUS_LABELS, countActiveFilters, type Filters } from "@/lib/property-service";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const control =
  "w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-body/60 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/25";

/** Text input that keeps what you type locally and commits to the URL after a short pause. */
function TextField({
  id,
  label,
  value,
  onCommit,
  numeric,
  placeholder,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onCommit: (v: string) => void;
  numeric?: boolean;
  placeholder?: string;
  type?: string;
}) {
  const [draft, setDraft] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-xs font-semibold text-ink">
        {label}
      </label>
      <input
        id={id}
        type={type}
        inputMode={numeric ? "numeric" : undefined}
        placeholder={placeholder}
        value={draft ?? value}
        className={control}
        onChange={(e) => {
          const next = numeric ? e.target.value.replace(/\D/g, "").slice(0, 9) : e.target.value;
          setDraft(next);
          clearTimeout(timer.current);
          timer.current = setTimeout(() => onCommit(next), 350);
        }}
        onBlur={() => {
          if (draft === null) return;
          clearTimeout(timer.current);
          onCommit(draft);
          setDraft(null);
        }}
      />
    </div>
  );
}

export function PropertyFilters({
  filters,
  onChange,
  onReset,
}: {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
  onReset: () => void;
}) {
  // Bumping this remounts the text inputs so their local drafts clear on reset.
  const [nonce, setNonce] = useState(0);
  const active = countActiveFilters(filters);

  return (
    <div key={nonce} className="space-y-6">
      <TextField id="f-q" label="Search" value={filters.q} onCommit={(q) => onChange({ q })} placeholder="Showroom, warehouse, clinic…" type="search" />

      <fieldset>
        <legend className="mb-2 text-xs font-semibold text-ink">Property type</legend>
        <div className="flex flex-wrap gap-2">
          {[{ id: "", label: "All types" }, ...PROPERTY_GROUPS].map((g) => {
            const selected = filters.type === g.id;
            return (
              <button
                key={g.id || "all"}
                type="button"
                aria-pressed={selected}
                onClick={() => onChange({ type: g.id })}
                className={cn(
                  "rounded-md border px-3 py-1.5 text-sm font-medium transition-colors",
                  selected ? "border-forest bg-forest text-white" : "border-line bg-white text-ink hover:border-forest/50 hover:bg-sage/40",
                )}
              >
                {g.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor="f-status" className="mb-1 block text-xs font-semibold text-ink">
          Availability
        </label>
        <select id="f-status" className={control} value={filters.status} onChange={(e) => onChange({ status: e.target.value as Filters["status"] })}>
          <option value="">Any status</option>
          {PROPERTY_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </div>

      <Button
        variant="outline"
        className="w-full"
        disabled={active === 0}
        onClick={() => {
          setNonce((n) => n + 1);
          onReset();
        }}
      >
        <RotateCcw aria-hidden className="size-4" /> Reset filters{active > 0 ? ` (${active})` : ""}
      </Button>
    </div>
  );
}
