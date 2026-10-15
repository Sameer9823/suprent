export const PROPERTY_CATEGORIES = [
  "retail-shop",
  "showroom",
  "mobile-showroom",
  "automobile-dealership",
  "tractor-dealership",
  "healthcare",
  "hotel-restaurant",
  "event-venue",
  "bank-office",
  "bank-atm",
  "professional-office",
  "coaching-education",
  "warehouse-logistics",
  "storage",
  "other",
] as const;
export type PropertyCategory = (typeof PROPERTY_CATEGORIES)[number];

export const PROPERTY_STATUSES = ["available", "reserved", "rented"] as const;
export type PropertyStatus = (typeof PROPERTY_STATUSES)[number];

export const PRICE_TYPES = ["on-request", "fixed"] as const;
export type PriceType = (typeof PRICE_TYPES)[number];

export const AREA_UNITS = ["sq.ft.", "sq.m."] as const;
export type AreaUnit = (typeof AREA_UNITS)[number];

export interface ImageAsset {
  src: string;
  alt: string;
}

/** A listing-level detail. `verified: false` is shown as "confirm on site visit". */
export interface Amenity {
  label: string;
  verified: boolean;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  category: PropertyCategory;
  description: string;
  area: number;
  areaUnit: AreaUnit;
  /** True while the area is a demo figure and not a measured value. */
  areaIsIllustrative: boolean;
  location: string;
  /** Monthly rent in INR. `null` whenever priceType is "on-request". */
  price: number | null;
  priceType: PriceType;
  status: PropertyStatus;
  images: ImageAsset[];
  amenities: Amenity[];
  suitableFor: string[];
  notes: string;
  featured: boolean;
  /** Marks fictional/demo inventory. Clear this flag when real data replaces it. */
  isSample: boolean;
  createdAt: string;
  updatedAt: string;
}
