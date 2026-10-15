import type { PropertyCategory } from "@/types/property";
import { img } from "./images";

export const CATEGORY_LABELS: Record<PropertyCategory, string> = {
  "retail-shop": "Retail shop",
  showroom: "Commercial showroom",
  "mobile-showroom": "Mobile phone showroom",
  "automobile-dealership": "Two-wheeler / four-wheeler dealership",
  "tractor-dealership": "Tractor dealership",
  healthcare: "Healthcare premises",
  "hotel-restaurant": "Hotel & restaurant",
  "event-venue": "Marriage hall & event venue",
  "bank-office": "Bank & office premises",
  "bank-atm": "Bank and ATM facility",
  "professional-office": "Professional office",
  "coaching-education": "Coaching & education centre",
  "warehouse-logistics": "Warehouse & logistics",
  storage: "General storage",
  other: "Other commercial use",
};

export interface PropertyGroup {
  id: string;
  label: string;
  description: string;
  categories: PropertyCategory[];
  image: { src: string; alt: string };
}

/** Groups power the homepage cards and the type filter on /spaces. */
export const PROPERTY_GROUPS: PropertyGroup[] = [
  {
    id: "shops-showrooms",
    label: "Shops & Showrooms",
    description: "Retail shops, phone showrooms and vehicle or tractor dealerships.",
    categories: ["retail-shop", "showroom", "mobile-showroom", "automobile-dealership", "tractor-dealership"],
    image: img("storeInterior", "Bright retail store interior with displays", 1200),
  },
  {
    id: "office-bank",
    label: "Office & Bank Spaces",
    description: "Professional offices, branch counters and bank premises.",
    categories: ["bank-office", "professional-office"],
    image: img("officeTowers", "Glass office buildings against the sky", 900),
  },
  {
    id: "healthcare",
    label: "Healthcare Premises",
    description: "Clinics, diagnostics and hospital-style layouts.",
    categories: ["healthcare"],
    image: img("hospital", "Hospital building exterior", 900),
  },
  {
    id: "banking-atm",
    label: "Bank & ATM Facility",
    description: "Spaces suited to bank branches, ATM kiosks and financial service outlets.",
    categories: ["bank-atm"],
    image: img("aboutBuilding", "Modern commercial building with a glass and concrete facade", 900),
  },
  {
    id: "education-coaching",
    label: "Education & Coaching",
    description: "Classrooms and coaching centres with room to grow.",
    categories: ["coaching-education"],
    image: img("classroom", "Classroom with rows of desks", 900),
  },
  {
    id: "warehousing-storage",
    label: "Warehousing & Storage",
    description: "E-commerce fulfilment, logistics and general storage.",
    categories: ["warehouse-logistics", "storage"],
    image: img("warehouse", "Warehouse interior with tall shelving", 1200),
  },
  {
    id: "hotels-events",
    label: "Hotels & Event Spaces",
    description: "Hotels, restaurants, marriage halls and event venues.",
    categories: ["hotel-restaurant", "event-venue"],
    image: img("eventHall", "Decorated event hall set for a celebration", 900),
  },
  {
    id: "other",
    label: "Other opportunities",
    description: "Anything that does not fit the usual categories.",
    categories: ["other"],
    image: img("officeOpen", "Open commercial interior", 900),
  },
];

export function groupOfCategory(category: PropertyCategory): PropertyGroup {
  return PROPERTY_GROUPS.find((g) => g.categories.includes(category)) ?? PROPERTY_GROUPS[PROPERTY_GROUPS.length - 1];
}
