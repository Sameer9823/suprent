import type { ImageAsset } from "./property";

export type FacilityCategory = "study" | "laundry" | "fitness" | "stationery" | "beauty" | "tailoring" | "tuition";

export interface OperatingHours {
  label: string;
  /** `null` means the hours are not confirmed yet. */
  hours: string | null;
}

export interface Facility {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: FacilityCategory;
  images: ImageAsset[];
  services: string[];
  operatingHours: OperatingHours[];
  isPublished: boolean;
}
