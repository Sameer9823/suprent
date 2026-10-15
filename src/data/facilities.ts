import type { Facility } from "@/types/facility";
import { img } from "./images";

/**
 * Facility copy is deliberately generic. Services and hours below are PLACEHOLDERS
 * until SUPGS confirms them. Edit here or via /admin (demo). Hours with `hours: null`
 * render as "To be confirmed".
 *
 * Facilities 4-7 currently have no confirmed photos and therefore use an icon cover
 * instead of an image. Add photos (or upload via the admin demo) once they are ready.
 */
export const facilities: Facility[] = [
  {
    id: "fac-library",
    slug: "my-dream-library",
    name: "My Dream Library",
    tagline: "A quiet place to read and study.",
    description:
      "My Dream Library is a calm environment for reading and focused study, with study-friendly seating and an atmosphere that helps you concentrate. The facility is covered by 24-hour CCTV monitoring. Details such as services, hours and contact information are being finalised.",
    category: "study",
    images: [
      img("library", "Quiet library with tall shelves and reading tables"),
      img("libraryStudy", "Students studying at a library table"),
    ],
    services: [
      "Quiet reading and study space",
      "Study-friendly seating",
      "24-hour CCTV monitoring",
      "Focused, distraction-free atmosphere",
      "Service list to be confirmed",
    ],
    operatingHours: [{ label: "Daily", hours: null }],
    isPublished: true,
  },
  {
    id: "fac-washing",
    slug: "digital-washing-center",
    name: "Digital Car Washing Center",
    tagline: "Laundry and vehicle care that fits around your day.",
    description:
      "The Digital Car Washing Center offers a convenient washing and laundry service, including vehicle care. Available washing options, service details and hours are being finalised and will be published here once confirmed.",
    category: "laundry",
    images: [
      img("laundry", "Row of washing machines in a laundry room"),
      img("laundryMachines", "Clean laundry facility with front-loading machines"),
    ],
    services: [
      "Convenient washing and laundry service",
      "Vehicle washing options to be confirmed",
      "Service details to be confirmed",
    ],
    operatingHours: [{ label: "Daily", hours: null }],
    isPublished: true,
  },
  {
    id: "fac-fitness",
    slug: "ujjwal-fitness-center",
    name: "Ujjwal Fitness Center",
    tagline: "Space to exercise, train and stay consistent.",
    description:
      "Ujjwal Fitness Center is a fitness facility for health, exercise and training. Timings, equipment and membership details are being finalised; use the inquiry form to ask about membership.",
    category: "fitness",
    images: [
      img("gym", "Fitness center with weights and training equipment"),
      img("gymFloor", "Open gym floor with exercise machines"),
    ],
    services: [
      "Fitness and exercise space",
      "Training environment",
      "Membership inquiries welcome",
      "Equipment list to be confirmed",
    ],
    operatingHours: [{ label: "Daily", hours: null }],
    isPublished: true,
  },
  {
    id: "fac-stationery",
    slug: "stationery-photocopy-shop",
    name: "Stationery & Photocopy Shop",
    tagline: "Stationery, printing and copying for everyday needs.",
    description:
      "The on-site stationery and photocopy shop provides everyday supplies, printing and copying services. Product range, pricing and timings are being finalised and will be published once confirmed.",
    category: "stationery",
    images: [],
    services: [
      "Stationery supplies to be confirmed",
      "Printing and photocopy services to be confirmed",
      "Operating hours to be confirmed",
    ],
    operatingHours: [{ label: "Daily", hours: null }],
    isPublished: true,
  },
  {
    id: "fac-hair",
    slug: "hair-salon",
    name: "Hair Salon",
    tagline: "Grooming and styling in a comfortable setting.",
    description:
      "The on-site hair salon offers grooming and styling services. Services, timings and pricing are being finalised; use the inquiry form to ask about appointments.",
    category: "beauty",
    images: [],
    services: [
      "Haircutting and styling to be confirmed",
      "Grooming services to be confirmed",
      "Operating hours to be confirmed",
    ],
    operatingHours: [{ label: "Daily", hours: null }],
    isPublished: true,
  },
  {
    id: "fac-stitching",
    slug: "stitching-center",
    name: "Stitching Center",
    tagline: "Sewing, alterations and tailoring services.",
    description:
      "The on-site stitching center provides sewing, alterations and tailoring services. Service range, turnaround times and pricing are being finalised; use the inquiry form to ask about services.",
    category: "tailoring",
    images: [],
    services: [
      "Sewing and alterations to be confirmed",
      "Tailoring service range to be confirmed",
      "Operating hours to be confirmed",
    ],
    operatingHours: [{ label: "Daily", hours: null }],
    isPublished: true,
  },
  {
    id: "fac-tuition",
    slug: "tuition-service-center",
    name: "Tuition Service Center",
    tagline: "Learning support for school students.",
    description:
      "The on-site tuition service center offers learning support for school students. Subjects, teaching approach and timings are being finalised; use the inquiry form to ask for details.",
    category: "tuition",
    images: [],
    services: [
      "Learning support subjects to be confirmed",
      "Teaching approach to be confirmed",
      "Operating hours to be confirmed",
    ],
    operatingHours: [{ label: "Daily", hours: null }],
    isPublished: true,
  },
];
