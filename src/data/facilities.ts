import type { Facility } from "@/types/facility";
import { img } from "./images";

/**
 * Facility copy is deliberately generic. Services and hours below are PLACEHOLDERS
 * until SUPGS confirms them. Edit here or via /admin (demo). Hours with `hours: null`
 * render as "To be confirmed".
 */
export const facilities: Facility[] = [
  {
    id: "fac-library",
    slug: "my-dream-library",
    name: "My Dream Library",
    tagline: "A quiet place to read and study.",
    description:
      "My Dream Library is a calm environment for reading and focused study, with study-friendly seating and an atmosphere that helps you concentrate. Details such as services, hours and contact information are being finalised.",
    category: "study",
    images: [
      img("library", "Quiet library with tall shelves and reading tables"),
      img("libraryStudy", "Students studying at a library table"),
    ],
    services: [
      "Quiet reading and study space",
      "Study-friendly seating",
      "Focused, distraction-free atmosphere",
      "Service list to be confirmed",
    ],
    operatingHours: [{ label: "Daily", hours: null }],
    isPublished: true,
  },
  {
    id: "fac-washing",
    slug: "digital-washing-center",
    name: "Digital Washing Center",
    tagline: "Laundry that fits around your day.",
    description:
      "The Digital Washing Center offers a convenient washing and laundry service. Available washing options, service details and hours are being finalised and will be published here once confirmed.",
    category: "laundry",
    images: [
      img("laundry", "Row of washing machines in a laundry room"),
      img("laundryMachines", "Clean laundry facility with front-loading machines"),
    ],
    services: [
      "Convenient washing and laundry service",
      "Washing options to be confirmed",
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
];
