import { Car, Route, ShieldCheck, Toilet, TreePine, ShoppingBasket, Bus } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const digits = (v?: string) => (v ? v.replace(/\D/g, "") : "");

export const siteConfig = {
  name: "SUPGS",
  tagline: "Commercial spaces and everyday facilities",
  description:
    "SUPGS brings together commercial spaces for rent and useful everyday facilities: a library, a digital car washing center, a fitness center, a stationery and photocopy shop, a hair salon, a stitching center and a tuition center.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  /** All contact values stay empty until the business verifies them. */
  whatsappNumber: digits(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER) || null,
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || null,
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || null,
} as const;

/**
 * The property video on the home page. Set NEXT_PUBLIC_PROPERTY_VIDEO_URL to a file in
 * /public/videos (e.g. /videos/property-tour.mp4), a hosted .mp4/.webm, or a YouTube/Vimeo link.
 * Until it is set, the section shows a "coming soon" state instead of a broken player.
 */
export const propertyVideo = {
  url: process.env.NEXT_PUBLIC_PROPERTY_VIDEO_URL || null,
  poster: process.env.NEXT_PUBLIC_PROPERTY_VIDEO_POSTER || null,
  title: "See the property before you visit",
  description:
    "A short walkthrough of the site: how you arrive, what the spaces look like inside, and the surroundings. Watch it first, then arrange a visit for the details.",
  highlights: ["Approach and parking", "Inside the spaces", "Surroundings and road access"],
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/spaces", label: "Rental Spaces" },
  { href: "/facilities", label: "Our Facilities" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
] as const;

export interface InfraItem {
  id: string;
  label: string;
  detail: string;
  icon: LucideIcon;
  /** Unverified items are labelled "To be verified" wherever they appear. */
  verified: boolean;
}

/** On-site infrastructure details for SUPGS. */
export const infrastructure: InfraItem[] = [
  { id: "parking", label: "Parking space", detail: "On-site parking is available.", icon: Car, verified: true },
  {
    id: "restrooms",
    label: "Restrooms (boys & girls)",
    detail: "Separate restroom facilities for boys and girls are available on site.",
    icon: Toilet,
    verified: true,
  },
  {
    id: "cctv",
    label: "24-hour CCTV monitoring",
    detail: "24-hour CCTV monitoring covers the property.",
    icon: ShieldCheck,
    verified: true,
  },
  { id: "road", label: "Road connectivity", detail: "Good road connectivity and access.", icon: Route, verified: true },
  {
    id: "environment",
    label: "Healthy environment",
    detail: "A clean and healthy environment is maintained on site.",
    icon: TreePine,
    verified: true,
  },
];

/** Nearby connectivity features. `verified: false` shows "To be verified". */
export interface LocationNote {
  id: string;
  label: string;
  detail: string;
  icon: LucideIcon;
  verified: boolean;
}

export const locationNotes: LocationNote[] = [
  {
    id: "market",
    label: "Big market",
    detail: "A big market is located near the property.",
    icon: ShoppingBasket,
    verified: true,
  },
  {
    id: "bus-stop",
    label: "Bus stop",
    detail: "A bus stop is in front of the property.",
    icon: Bus,
    verified: false,
  },
];

/** Approximate distances from the property. Shown as proportional bars on the home page. */
export interface DistanceItem {
  id: string;
  label: string;
  distance: number;
}

export const distances: DistanceItem[] = [
  { id: "ramgarh", label: "Ramgarh", distance: 8 },
  { id: "mohania", label: "Mohania", distance: 9 },
  { id: "bhabua-road", label: "Bhabua Road Railway Station", distance: 9.5 },
  { id: "sasaram", label: "Sasaram, Bihar", distance: 40 },
  { id: "varanasi", label: "Varanasi", distance: 80 },
];

export const footerLegal = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
] as const;
