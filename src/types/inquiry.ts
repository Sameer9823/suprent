export const INQUIRY_TYPES = ["rental", "facility", "site-visit", "general"] as const;
export type InquiryType = (typeof INQUIRY_TYPES)[number];

export const INQUIRY_STATUSES = ["new", "contacted", "resolved"] as const;
export type InquiryStatus = (typeof INQUIRY_STATUSES)[number];

export const BUDGET_RANGES = [
  "Not decided",
  "Under ₹25,000 / month",
  "₹25,000 – ₹75,000 / month",
  "₹75,000 – ₹2,00,000 / month",
  "Above ₹2,00,000 / month",
] as const;

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  inquiryType: InquiryType;
  propertyType: string;
  requiredArea: string;
  budget: string;
  preferredVisitDate: string;
  message: string;
  referenceSlug: string;
  referenceTitle: string;
  status: InquiryStatus;
  /** "delivered" = accepted by a configured backend; "local" = saved in this browser only. */
  delivery: "delivered" | "local";
  createdAt: string;
}

export const INQUIRY_TYPE_LABELS: Record<InquiryType, string> = {
  rental: "Rental inquiry",
  facility: "Facility inquiry",
  "site-visit": "Site visit request",
  general: "General question",
};
