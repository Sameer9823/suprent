import { groupOfCategory, PROPERTY_GROUPS } from "@/data/categories";
import type { Property, PropertyStatus } from "@/types/property";
import { PROPERTY_STATUSES } from "@/types/property";
import { formatNumber } from "./utils";

/* ---------- Display helpers ---------- */

export const STATUS_LABELS: Record<PropertyStatus, string> = {
  available: "Available",
  reserved: "Reserved",
  rented: "Rented",
};

export function formatPrice(p: Pick<Property, "price" | "priceType">): string {
  if (p.priceType === "fixed" && p.price != null) return `₹${formatNumber(p.price)} / month`;
  return "Price on Request";
}

export function formatArea(p: Pick<Property, "area" | "areaUnit" | "areaIsIllustrative">): string {
  return `${formatNumber(p.area)} ${p.areaUnit}${p.areaIsIllustrative ? " (illustrative)" : ""}`;
}

export const hasPublishedPrice = (p: Pick<Property, "price" | "priceType">) =>
  p.priceType === "fixed" && p.price != null;

/** Area normalised to sq. ft. so ranges compare across units. */
export const areaInSqFt = (p: Pick<Property, "area" | "areaUnit">) =>
  p.areaUnit === "sq.m." ? p.area * 10.7639 : p.area;

export const isEnquirable = (p: Pick<Property, "status">) => p.status === "available";

/* ---------- Filters (URL <-> state) ---------- */

export const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "area-asc", label: "Area: Low to High" },
  { value: "area-desc", label: "Area: High to Low" },
  { value: "price-asc", label: "Price: Low to High" },
] as const;
export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

export interface Filters {
  q: string;
  type: string; // group id or ""
  status: PropertyStatus | "";
  sort: SortValue;
  view: "grid" | "list";
}

export const DEFAULT_FILTERS: Filters = {
  q: "",
  type: "",
  status: "",
  sort: "recommended",
  view: "grid",
};

type ParamReader = { get(name: string): string | null };

/** Reads and sanitises URL params. Unknown or malformed values fall back to defaults. */
export function parseFilters(params: ParamReader): Filters {
  const type = params.get("type") ?? "";
  const status = params.get("status") ?? "";
  const sort = params.get("sort") ?? "";
  return {
    q: (params.get("q") ?? "").slice(0, 80),
    type: PROPERTY_GROUPS.some((g) => g.id === type) ? type : "",
    status: (PROPERTY_STATUSES as readonly string[]).includes(status) ? (status as PropertyStatus) : "",
    sort: SORT_OPTIONS.some((s) => s.value === sort) ? (sort as SortValue) : "recommended",
    view: params.get("view") === "list" ? "list" : "grid",
  };
}

/** Only non-default values are written, which keeps shared URLs short. */
export function filtersToSearch(f: Filters): string {
  const sp = new URLSearchParams();
  (Object.keys(DEFAULT_FILTERS) as (keyof Filters)[]).forEach((k) => {
    if (f[k] !== DEFAULT_FILTERS[k]) sp.set(k, f[k]);
  });
  return sp.toString();
}

export function countActiveFilters(f: Filters): number {
  return (["q", "type", "status"] as const).filter((k) => f[k] !== "").length;
}

/* ---------- Filtering & sorting ---------- */

const statusRank: Record<PropertyStatus, number> = { available: 0, reserved: 1, rented: 2 };

export function filterProperties(list: Property[], f: Filters): Property[] {
  const q = f.q.trim().toLowerCase();
  const group = PROPERTY_GROUPS.find((g) => g.id === f.type);

  return list.filter((p) => {
    if (group && !group.categories.includes(p.category)) return false;
    if (f.status && p.status !== f.status) return false;
    if (q) {
      const hay = [p.title, p.description, p.location, ...p.suitableFor].join(" ").toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

export function sortProperties(list: Property[], sort: SortValue): Property[] {
  const copy = [...list];
  const recommended = (a: Property, b: Property) =>
    Number(b.featured) - Number(a.featured) ||
    statusRank[a.status] - statusRank[b.status] ||
    a.createdAt.localeCompare(b.createdAt);

  switch (sort) {
    case "area-asc":
      return copy.sort((a, b) => areaInSqFt(a) - areaInSqFt(b));
    case "area-desc":
      return copy.sort((a, b) => areaInSqFt(b) - areaInSqFt(a));
    case "price-asc":
      // Listings with a published price first (cheapest first); unpriced keep recommended order after them.
      return copy.sort((a, b) => {
        const pa = hasPublishedPrice(a);
        const pb = hasPublishedPrice(b);
        if (pa && pb) return a.price! - b.price!;
        if (pa !== pb) return pa ? -1 : 1;
        return recommended(a, b);
      });
    default:
      return copy.sort(recommended);
  }
}

export function relatedProperties(all: Property[], current: Property, limit = 3): Property[] {
  const group = groupOfCategory(current.category);
  const others = all.filter((p) => p.id !== current.id);
  const same = others.filter((p) => group.categories.includes(p.category));
  const rest = others.filter((p) => !group.categories.includes(p.category));
  return sortProperties([...same, ...rest].slice(0, 12), "recommended")
    .sort((a, b) => Number(group.categories.includes(b.category)) - Number(group.categories.includes(a.category)))
    .slice(0, limit);
}

export function propertyStats(list: Property[]) {
  return {
    total: list.length,
    available: list.filter((p) => p.status === "available").length,
    reserved: list.filter((p) => p.status === "reserved").length,
    rented: list.filter((p) => p.status === "rented").length,
  };
}
