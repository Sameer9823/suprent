import { z } from "zod";
import {
  AREA_UNITS,
  PRICE_TYPES,
  PROPERTY_CATEGORIES,
  PROPERTY_STATUSES,
} from "@/types/property";
import { INQUIRY_STATUSES, INQUIRY_TYPES } from "@/types/inquiry";

/* ---------- Shared pieces ---------- */

/** Accepts +91 / 91 / 0 prefixes, spaces and dashes. Indian mobiles start with 6-9. */
export const normalizePhone = (value: string) => value.replace(/[\s\-()]/g, "");
export const INDIAN_MOBILE = /^(?:\+?91|0)?[6-9]\d{9}$/;

const imageSrc = z
  .string()
  .trim()
  .min(1)
  .max(2_000_000)
  .refine(
    (v) =>
      /^https:\/\/\S+$/i.test(v) ||
      /^\/[^\s]*$/.test(v) ||
      /^data:image\/(png|jpe?g|webp|gif);base64,[A-Za-z0-9+/=]+$/.test(v),
    "Use an https:// image URL, a /path, or an uploaded image.",
  );

const imageAsset = z.object({ src: imageSrc, alt: z.string().trim().min(1).max(200) });

/* ---------- Inquiry (used by the form AND the API route) ---------- */

export const inquiryInputSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name.").max(100),
  phone: z
    .string()
    .trim()
    .min(1, "Enter your phone number.")
    .refine((v) => INDIAN_MOBILE.test(normalizePhone(v)), "Enter a valid 10-digit Indian mobile number."),
  email: z.union([z.literal(""), z.email("Enter a valid email address.")]),
  inquiryType: z.enum(INQUIRY_TYPES, { error: "Choose an inquiry type." }),
  propertyType: z.string().trim().max(80),
  requiredArea: z
    .string()
    .trim()
    .max(10)
    .refine((v) => v === "" || /^\d{2,6}$/.test(v), "Use whole numbers only, in sq. ft."),
  budget: z.string().trim().max(60),
  preferredVisitDate: z
    .string()
    .trim()
    .refine((v) => v === "" || /^\d{4}-\d{2}-\d{2}$/.test(v), "Pick a valid date.")
    .refine((v) => v === "" || v >= new Date().toISOString().slice(0, 10), "Choose today or a future date."),
  message: z.string().trim().min(10, "Tell us a little more (at least 10 characters).").max(2000),
  referenceSlug: z.string().trim().max(120),
  referenceTitle: z.string().trim().max(160),
  consent: z.boolean().refine((v) => v === true, "Please agree so we can contact you about this inquiry."),
  /** Honeypot. Real people leave this empty. */
  website: z.string().max(0).optional(),
});
export type InquiryInput = z.infer<typeof inquiryInputSchema>;

/* ---------- Stored (untrusted browser) data ---------- */

export const storedInquirySchema = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string(),
  email: z.string(),
  inquiryType: z.enum(INQUIRY_TYPES),
  propertyType: z.string(),
  requiredArea: z.string(),
  budget: z.string(),
  preferredVisitDate: z.string(),
  message: z.string(),
  referenceSlug: z.string(),
  referenceTitle: z.string(),
  status: z.enum(INQUIRY_STATUSES),
  delivery: z.enum(["delivered", "local"]),
  createdAt: z.string(),
});

export const propertySchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1).max(120),
  title: z.string().trim().min(3, "Enter a title.").max(120),
  category: z.enum(PROPERTY_CATEGORIES),
  description: z.string().trim().min(10, "Add a short description.").max(3000),
  area: z.number().positive("Area must be greater than zero.").max(10_000_000),
  areaUnit: z.enum(AREA_UNITS),
  areaIsIllustrative: z.boolean(),
  location: z.string().trim().min(2, "Enter a location.").max(160),
  price: z.number().positive().max(1_000_000_000).nullable(),
  priceType: z.enum(PRICE_TYPES),
  status: z.enum(PROPERTY_STATUSES),
  images: z.array(imageAsset).min(1, "Add at least one image.").max(12),
  amenities: z.array(z.object({ label: z.string().min(1).max(120), verified: z.boolean() })).max(30),
  suitableFor: z.array(z.string().min(1).max(120)).max(30),
  notes: z.string().max(2000),
  featured: z.boolean(),
  isSample: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const facilitySchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1).max(120),
  name: z.string().trim().min(2).max(120),
  tagline: z.string().trim().max(200),
  description: z.string().trim().min(10, "Add a short description.").max(3000),
  category: z.enum(["study", "laundry", "fitness", "stationery", "beauty", "tailoring", "tuition"]),
  images: z.array(imageAsset).max(12),
  services: z.array(z.string().min(1).max(160)).max(30),
  operatingHours: z
    .array(z.object({ label: z.string().min(1).max(60), hours: z.string().max(80).nullable() }))
    .max(14),
  isPublished: z.boolean(),
});

export const propertiesArraySchema = z.array(propertySchema);
export const facilitiesArraySchema = z.array(facilitySchema);
export const inquiriesArraySchema = z.array(storedInquirySchema);
