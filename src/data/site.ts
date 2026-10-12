import { Car, Route, TrainFront, Lightbulb, Toilet } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const digits = (v?: string) => (v ? v.replace(/\D/g, "") : "");

export const siteConfig = {
  name: "SUPGS",
  tagline: "Commercial spaces and everyday facilities",
  description:
    "SUPGS brings together commercial spaces for rent and useful everyday facilities: a library, a washing center and a fitness center.",
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

/** From the current property notes. Flip `verified` once each detail is confirmed. */
export const infrastructure: InfraItem[] = [
  { id: "parking", label: "Parking space", detail: "On-site parking is available.", icon: Car, verified: true },
  { id: "restrooms", label: "Restrooms", detail: "Restroom facilities are available.", icon: Toilet, verified: true },
  { id: "road", label: "Road connectivity", detail: "Access by road.", icon: Route, verified: true },
  {
    id: "uses",
    label: "Flexible use",
    detail: "Suited to many kinds of commercial use.",
    icon: Lightbulb,
    verified: true,
  },
  {
    id: "rail",
    label: "Railway access",
    detail: "Reported as about 8 km from a railway station. Station name and distance are being confirmed.",
    icon: TrainFront,
    verified: false,
  },
];

export const footerLegal = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
] as const;
