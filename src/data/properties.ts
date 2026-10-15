import type { Amenity, Property } from "@/types/property";
import { img } from "./images";

/**
 * SAMPLE / DEMO LISTINGS. Every record is fictional placeholder inventory:
 * - locations are "Sample Location" (no real address is implied)
 * - areas are illustrative, not measured
 * - prices are "Price on Request"
 * - amenities flagged `verified: false` must be confirmed on a site visit
 * Replace this file (or the admin demo data) with real inventory when available.
 */
const CREATED = "2026-01-01T00:00:00.000Z";
const LOCATION = "Sample Location";

const sample = (...labels: string[]): Amenity[] => labels.map((label) => ({ label, verified: false }));

type Seed = Pick<
  Property,
  "slug" | "title" | "category" | "description" | "area" | "images" | "suitableFor"
> &
  Partial<Pick<Property, "status" | "featured" | "notes">> & { amenities: Amenity[] };

const make = (n: number, s: Seed): Property => ({
  id: `prop-${String(n).padStart(3, "0")}`,
  slug: s.slug,
  title: s.title,
  category: s.category,
  description: s.description,
  area: s.area,
  areaUnit: "sq.ft.",
  areaIsIllustrative: true,
  location: LOCATION,
  price: null,
  priceType: "on-request",
  status: s.status ?? "available",
  images: s.images,
  amenities: s.amenities,
  suitableFor: s.suitableFor,
  notes:
    s.notes ??
    "This is a sample listing used to demonstrate the website. Area, layout and availability are illustrative and will be confirmed with the SUPGS team.",
  featured: s.featured ?? false,
  isSample: true,
  createdAt: CREATED,
  updatedAt: CREATED,
});

export const properties: Property[] = [
  make(1, {
    slug: "commercial-showroom",
    title: "Commercial Showroom",
    category: "showroom",
    area: 2000,
    featured: true,
    description:
      "A large open floor suited to displaying products to walk-in customers. Use it as a brand showroom, furniture gallery or electronics display. Layout and frontage details will be confirmed on a site visit.",
    images: [
      img("storeInterior", "Spacious showroom floor with product displays"),
      img("shopping", "Shopfront with large display windows"),
      img("retailStore", "Retail interior with shelving and lighting"),
    ],
    suitableFor: ["Brand showroom", "Furniture and home décor", "Electronics display", "Experience store"],
    amenities: sample("Open floor plan", "Display-friendly frontage", "Space for signage"),
  }),
  make(2, {
    slug: "office-coaching-space",
    title: "Office / Coaching Space",
    category: "coaching-education",
    area: 1200,
    featured: true,
    description:
      "A flexible interior that can be arranged as classrooms, a reception and staff offices, or as a professional office. A good starting point for coaching classes, tuition centres or small teams.",
    images: [
      img("officeInterior", "Bright modern office interior with desks"),
      img("classroom", "Classroom with desks arranged in rows"),
      img("officeOpen", "Open-plan workspace with natural light"),
    ],
    suitableFor: ["Coaching classes", "Tuition centre", "Training institute", "Professional office"],
    amenities: sample("Partitionable layout", "Natural light", "Reception area"),
  }),
  make(3, {
    slug: "warehouse-storage-space",
    title: "Warehouse / Storage",
    category: "warehouse-logistics",
    area: 5000,
    featured: true,
    description:
      "A high-volume space for storing goods and handling dispatch. Suitable for e-commerce fulfilment, distribution or stock holding. Loading access and clear height will be confirmed during a site visit.",
    images: [
      img("warehouse", "Warehouse interior with tall racks"),
      img("warehouseShelves", "Shelving racks stacked with boxes"),
    ],
    suitableFor: ["E-commerce fulfilment", "Logistics and dispatch", "Distribution stock", "Bulk storage"],
    amenities: sample("Large open floor", "Vehicle access to be confirmed", "Racking space"),
  }),
  make(4, {
    slug: "retail-shop",
    title: "Retail Shop",
    category: "retail-shop",
    area: 800,
    featured: true,
    description:
      "A compact street-facing shop for everyday retail. A practical choice for grocery, apparel, pharmacy or service businesses that depend on walk-in trade.",
    images: [
      img("shopping", "Retail shopfront with glass windows"),
      img("retailStore", "Compact shop interior with shelves"),
    ],
    suitableFor: ["General store", "Apparel and accessories", "Pharmacy or service counter", "Food retail"],
    amenities: sample("Street-facing frontage", "Storage nook"),
  }),
  make(5, {
    slug: "mobile-phone-showroom",
    title: "Mobile Phone Showroom",
    category: "mobile-showroom",
    area: 600,
    description:
      "A well-lit showroom sized for a mobile retail brand with a counter, display wall and service desk.",
    images: [
      img("phone", "Hands holding a smartphone in a retail setting"),
      img("storeInterior", "Showroom with illuminated display wall"),
    ],
    suitableFor: ["Mobile retail", "Accessories store", "Service and repair desk"],
    amenities: sample("Display wall space", "Counter area"),
  }),
  make(6, {
    slug: "automobile-showroom",
    title: "Automobile Showroom",
    category: "automobile-dealership",
    area: 3500,
    status: "reserved",
    description:
      "A wide showroom with room for vehicle display, a customer lounge and a sales office. Shown here as reserved to illustrate how reserved listings appear.",
    images: [
      img("car", "Car parked inside a bright showroom"),
      img("officeTowers", "Commercial building exterior"),
    ],
    suitableFor: ["Car or two-wheeler dealership", "Vehicle display", "Sales office"],
    amenities: sample("Large vehicle display area", "Customer lounge space"),
  }),
  make(7, {
    slug: "tractor-dealership-yard",
    title: "Tractor Dealership Space",
    category: "tractor-dealership",
    area: 4500,
    description:
      "An open display area with an indoor sales counter, suited to tractor and farm-equipment dealerships that need outdoor display and easy road access.",
    images: [
      img("tractor", "Tractor parked in an open display yard"),
      img("warehouse", "Covered area for equipment storage"),
    ],
    suitableFor: ["Tractor dealership", "Farm equipment display", "Spare parts counter"],
    amenities: sample("Open display yard", "Indoor sales counter"),
  }),
  make(8, {
    slug: "healthcare-premises",
    title: "Healthcare Premises",
    category: "healthcare",
    area: 2500,
    description:
      "A multi-room layout that can be adapted for a clinic, diagnostics centre or small hospital. Any healthcare use requires its own licences and approvals, to be arranged by the tenant.",
    images: [
      img("hospital", "Hospital building exterior"),
      img("hospitalCorridor", "Clean hospital corridor"),
    ],
    suitableFor: ["Clinic or polyclinic", "Diagnostic centre", "Small hospital", "Pharmacy"],
    amenities: sample("Multiple rooms possible", "Waiting area"),
    notes:
      "Sample listing. Healthcare operators are responsible for obtaining all regulatory approvals. SUPGS makes no statement here about the suitability of any specific premises.",
  }),
  make(9, {
    slug: "hotel-restaurant-premises",
    title: "Hotel & Restaurant Premises",
    category: "hotel-restaurant",
    area: 3000,
    description:
      "A hospitality-ready space for a restaurant, a hotel floor or a banquet-style dining operation. Kitchen and service access will be confirmed on a site visit.",
    images: [
      img("restaurant", "Restaurant dining room with set tables"),
      img("hotel", "Hotel lobby with seating"),
    ],
    suitableFor: ["Restaurant", "Café", "Hotel or lodging", "Banquet dining"],
    amenities: sample("Dining area", "Kitchen space to be confirmed"),
  }),
  make(10, {
    slug: "marriage-hall-event-venue",
    title: "Marriage Hall / Event Venue",
    category: "event-venue",
    area: 6000,
    status: "rented",
    description:
      "A large hall for weddings, receptions and community events. Shown as rented to illustrate how unavailable listings appear.",
    images: [
      img("eventHall", "Event hall decorated for a celebration"),
      img("banquet", "Banquet tables set for a wedding reception"),
    ],
    suitableFor: ["Marriage hall", "Receptions", "Community events", "Corporate gatherings"],
    amenities: sample("Large open hall", "Stage area to be confirmed"),
  }),
  make(11, {
    slug: "bank-branch-office",
    title: "Bank Branch / Office Premises",
    category: "bank-office",
    area: 1500,
    description:
      "A professional ground-floor space for a branch or a corporate office, with room for a counter, a customer waiting area and back-office work.",
    images: [
      img("officeTowers", "Office building facade"),
      img("officeInterior", "Professional office interior"),
    ],
    suitableFor: ["Bank branch", "Financial services office", "Corporate office"],
    amenities: sample("Customer waiting area", "Back-office room"),
  }),
  make(12, {
    slug: "general-storage-unit",
    title: "General Storage Unit",
    category: "storage",
    area: 1000,
    description:
      "A plain, practical storage space for goods, equipment or records that need a secure, dry place to sit.",
    images: [
      img("warehouseShelves", "Storage shelves with boxes"),
      img("warehouse", "Bare storage hall"),
    ],
    suitableFor: ["Household or business storage", "Equipment storage", "Records and inventory"],
    amenities: sample("Open floor", "Shelving possible"),
  }),
  make(13, {
    slug: "flexible-commercial-block",
    title: "Flexible Commercial Block",
    category: "other",
    area: 1800,
    description:
      "A versatile block for uses that do not fit a standard category, such as a studio, a showroom with workshop, or a mixed-use operation. Tell us what you have in mind.",
    images: [img("officeOpen", "Open flexible commercial interior"), img("aboutBuilding", "Modern commercial building")],
    suitableFor: ["Studio or workshop", "Mixed-use operation", "Pop-up or experience space"],
    amenities: sample("Flexible layout"),
  }),
  make(14, {
    slug: "bank-atm-kiosk",
    title: "Bank & ATM Kiosk",
    category: "bank-atm",
    area: 400,
    featured: true,
    description:
      "A compact, secure space suited to a bank branch, an ATM kiosk or a financial service outlet. Security and visibility details will be confirmed on a site visit.",
    images: [
      img("aboutBuilding", "Modern commercial building facade"),
      img("officeInterior", "Bright professional interior"),
    ],
    suitableFor: ["Bank branch kiosk", "ATM gallery", "Financial services counter"],
    amenities: sample("Security-ready layout", "Street visibility"),
  }),
  make(15, {
    slug: "professional-office-suite",
    title: "Professional Office Suite",
    category: "professional-office",
    area: 1000,
    description:
      "A clean office suite for a small team, consultant or professional practice, with separate reception and work areas. Exact layout and fit-out will be confirmed on a site visit.",
    images: [
      img("officeInterior", "Bright modern office interior with desks"),
      img("officeOpen", "Open-plan workspace with natural light"),
    ],
    suitableFor: ["Professional practice", "Consultancy office", "Small team workspace"],
    amenities: sample("Reception-ready", "Partitionable layout"),
  }),
];

export const getPropertyBySlug = (slug: string) => properties.find((p) => p.slug === slug);
